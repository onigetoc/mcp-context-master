import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';
import { debugLog } from '../utils/logger.js';
import { CleanupService } from './cleanup.service.js';

export interface SearchResult {
    originalPackageName: string;
    repoName: string;
    url: string;
    context7Url: string;
    downloaded: boolean;
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

        for (const result of searchResults) {
            try {
                const fileName = this.generateContextFileName(result.originalPackageName, isFullContext);
                const filePath = path.join(docsPath, fileName);
                
                debugLog(`Downloading: ${result.originalPackageName} (${result.repoName})`);
                
                let response;
                try {
                    response = await axios.get(result.context7Url, {
                        timeout: 30000,
                        headers: {
                            'User-Agent': 'MCP-Context-Master/1.0.0'
                        }
                    });
                } catch (err: any) {
                    const status = err && err.response && err.response.status;
                    if (status === 404) {
                        debugLog(`Primary Context7 URL returned 404 for ${result.originalPackageName}, trying variants`);
                        const variants: string[] = [];
                        const m = result.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                        if (m) {
                            const owner = m[1];
                            const repo = m[2];
                            if (repo.endsWith('.js')) variants.push(`https://context7.com/${owner}/${repo.replace(/\.js$/,'')}/llms.txt`);
                            variants.push(`https://context7.com/${owner}/${repo.replace(/\.js$/,'')}/llms.txt`);
                            variants.push(`https://context7.com/${owner}/${repo}/llms.txt`);
                        }

                        const origParams = result.context7Url.split('?')[1] || '';
                        let tried = false;
                        for (const v of variants) {
                            const candidate = origParams ? `${v}?${origParams}` : v;
                            try {
                                response = await axios.get(candidate, { timeout: 30000, headers: { 'User-Agent': 'MCP-Context-Master/1.0.0' } });
                                debugLog(`✓ Context7 variant succeeded: ${candidate}`);
                                tried = true;
                                break;
                            } catch (err2) {
                                debugLog(`✗ Variant failed: ${candidate}`);
                            }
                        }

                        if (!tried) throw err;
                    } else {
                        throw err;
                    }
                }

                if (!response || !response.data) {
                    throw new Error(`No response data when downloading ${result.context7Url}`);
                }

                await fs.writeFile(filePath, response.data, 'utf8');
                
                result.downloaded = true;
                downloadedFiles.push(fileName);
                debugLog(`✓ Downloaded: ${fileName}`);

                // Nettoyer les anciens fichiers de la même bibliothèque
                try {
                    const deletedFiles = await this.cleanupService.cleanupOldContextFiles(
                        docsPath, 
                        result.originalPackageName, 
                        1 // Garder seulement le plus récent
                    );
                    if (deletedFiles.length > 0) {
                        debugLog(`✓ Cleanup: Removed ${deletedFiles.length} old files for ${result.originalPackageName}`);
                    }
                } catch (cleanupError) {
                    debugLog(`✗ Cleanup warning for ${result.originalPackageName}: ${cleanupError instanceof Error ? cleanupError.message : String(cleanupError)}`);
                }

                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (error) {
                debugLog(`✗ Download failed for ${result.originalPackageName}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        return downloadedFiles;
    }

    private generateContextFileName(packageName: string, isFullContext: boolean = false): string {
        let cleanName = packageName;
        cleanName = cleanName.replace('@', '').replace('/', '-');
        cleanName = cleanName.replace(/[<>:"|?*]/g, '-');
        const date = new Date().toISOString().split('T')[0];
        
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
