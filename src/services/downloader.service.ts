import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';
import { debugLog } from '../utils/logger.js';
import { 
    downloadWithRetry, 
    validateContext7Url, 
    isValidContext7Content,
    analyzeNetworkError 
} from '../utils/network-utils.js';
import { CleanupService } from './cleanup.service.js';

export interface SearchResult {
    originalPackageName: string;
    repoName: string;
    url: string;
    context7Url: string;
    downloaded: boolean;
    topic?: string;  // Added to support topic-based file naming
    tokens?: number; // Added to track token limit used
}

export class DownloaderService {
    private cleanupService = new CleanupService();

    public async downloadDocumentation(
        searchResults: SearchResult[], 
        docsPath: string,
        isFullContext: boolean = false
    ): Promise<string[]> {
        debugLog('===== DOWNLOADING DOCUMENTATION =====');
        const downloadedFiles: string[] = [];
        const failedDownloads: Array<{package: string, reason: string}> = [];

        for (let i = 0; i < searchResults.length; i++) {
            const result = searchResults[i];
            
            try {
                const fileName = this.generateContextFileName(
                    result.originalPackageName, 
                    isFullContext,
                    result.topic
                );
                const filePath = path.join(docsPath, fileName);
                
                debugLog(`📦 [${i+1}/${searchResults.length}] Processing: ${result.originalPackageName} (${result.repoName})`);
                
                // Step 1: Quick validation (skip if obviously invalid)
                const isValid = await validateContext7Url(result.context7Url);
                if (!isValid) {
                    debugLog(`⚠️  Context7 URL validation failed, trying next result if available...`);
                    failedDownloads.push({
                        package: result.originalPackageName,
                        reason: 'Library not found on Context7 (404)'
                    });
                    
                    // Try next result if this was a GitHub search with multiple results
                    continue;
                }
                
                // Step 2: Download with retry logic
                let response;
                try {
                    response = await downloadWithRetry(result.context7Url, {}, {
                        maxRetries: 3,
                        initialDelay: 2000,
                        backoffMultiplier: 2
                    });
                } catch (downloadError) {
                    const errorInfo = analyzeNetworkError(downloadError);
                    debugLog(`❌ Download failed after retries: ${errorInfo.message}`);
                    
                    // Try URL variants for .js repos
                    if (errorInfo.type === 'not_found') {
                        debugLog(`🔄 Trying URL variants...`);
                        const variantResponse = await this.tryUrlVariants(result);
                        if (variantResponse) {
                            response = variantResponse;
                        } else {
                            failedDownloads.push({
                                package: result.originalPackageName,
                                reason: errorInfo.message
                            });
                            continue;
                        }
                    } else {
                        // Network/server error - fail this download
                        failedDownloads.push({
                            package: result.originalPackageName,
                            reason: errorInfo.message
                        });
                        continue;
                    }
                }

                // Step 3: Validate content
                if (!response || !response.data) {
                    debugLog(`❌ No response data received`);
                    failedDownloads.push({
                        package: result.originalPackageName,
                        reason: 'Empty response from Context7'
                    });
                    continue;
                }
                
                const content = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
                
                if (!isValidContext7Content(content)) {
                    debugLog(`❌ Invalid content detected (error page or too short)`);
                    failedDownloads.push({
                        package: result.originalPackageName,
                        reason: 'Context7 returned error message or invalid content'
                    });
                    continue;
                }

                // Step 4: Save file
                await fs.writeFile(filePath, content, 'utf8');
                
                result.downloaded = true;
                downloadedFiles.push(fileName);
                debugLog(`✅ Downloaded: ${fileName}`);

                // Step 5: Cleanup old files
                try {
                    const deletedFiles = await this.cleanupService.cleanupOldContextFiles(
                        docsPath, 
                        result.originalPackageName, 
                        1
                    );
                    if (deletedFiles.length > 0) {
                        debugLog(`🧹 Cleanup: Removed ${deletedFiles.length} old files for ${result.originalPackageName}`);
                    }
                } catch (cleanupError) {
                    debugLog(`⚠️  Cleanup warning: ${cleanupError instanceof Error ? cleanupError.message : String(cleanupError)}`);
                }

                // Rate limiting: small delay between downloads
                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (error) {
                const errorInfo = analyzeNetworkError(error);
                debugLog(`❌ Unexpected error for ${result.originalPackageName}: ${errorInfo.message}`);
                failedDownloads.push({
                    package: result.originalPackageName,
                    reason: errorInfo.message
                });
            }
        }

        // Log summary
        debugLog('===== DOWNLOAD SUMMARY =====');
        debugLog(`✅ Successful: ${downloadedFiles.length}`);
        debugLog(`❌ Failed: ${failedDownloads.length}`);
        
        if (failedDownloads.length > 0) {
            debugLog('Failed downloads:');
            failedDownloads.forEach(f => debugLog(`  - ${f.package}: ${f.reason}`));
        }

        return downloadedFiles;
    }

    /**
     * Tries URL variants for repositories ending with .js (e.g., next.js -> next)
     */
    private async tryUrlVariants(result: SearchResult): Promise<any> {
        const variants: string[] = [];
        const m = result.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        
        if (m) {
            const owner = m[1];
            const repo = m[2];
            
            // Generate variants
            if (repo.endsWith('.js')) {
                variants.push(`https://context7.com/${owner}/${repo.replace(/\.js$/, '')}/llms.txt`);
            }
            variants.push(`https://context7.com/${owner}/${repo}/llms.txt`);
        }

        const origParams = result.context7Url.split('?')[1] || '';
        
        for (const variantUrl of variants) {
            const fullUrl = origParams ? `${variantUrl}?${origParams}` : variantUrl;
            
            try {
                debugLog(`🔄 Trying variant: ${fullUrl}`);
                const response = await downloadWithRetry(fullUrl, {}, { maxRetries: 1 });
                
                if (response && response.data && isValidContext7Content(response.data)) {
                    debugLog(`✅ Variant succeeded: ${fullUrl}`);
                    return response;
                }
            } catch (error) {
                debugLog(`❌ Variant failed: ${fullUrl}`);
            }
        }
        
        return null;
    }

    private generateContextFileName(packageName: string, isFullContext: boolean = false, topic?: string): string {
        let cleanName = packageName;
        cleanName = cleanName.replace('@', '').replace('/', '-');
        cleanName = cleanName.replace(/[<>:"|?*]/g, '-');
        const date = new Date().toISOString().split('T')[0];
        
        // If topic is provided, include it in the filename (similar to search-test.js)
        if (topic) {
            const topicSlug = topic.replace(/[<>:"|?*@/\\]/g, '-').replace(/\s+/g, '-').toLowerCase();
            return `cm-${cleanName}-${topicSlug}-${date}.md`;
        }
        
        if (isFullContext) {
            return `cm-${cleanName}-full-context-${date}.md`;
        }
        return `cm-${cleanName}-context-${date}.md`;
    }

    public async ensureDocsFolder(docsPath: string): Promise<void> {
        try {
            await fs.access(docsPath);
            debugLog(`✓ Docs folder exists: ${docsPath}`);
        } catch {
            await fs.mkdir(docsPath, { recursive: true });
            debugLog(`✓ Created docs folder: ${docsPath}`);
        }
    }
}
