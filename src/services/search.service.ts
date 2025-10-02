import { searchGithubRepos } from '../apis/github-api.js';
import { lookupPackageRepository } from '../apis/npm-registry.js';
import { PackageParser } from '../parsers/package-parser.js';
import { debugLog } from '../utils/logger.js';
import { convertToContext7Url } from './converter.service.js';
import * as path from 'path';

export interface SearchResult {
    originalPackageName: string;
    repoName: string;
    url: string;
    context7Url: string;
    downloaded: boolean;
}

export class SearchService {
    public async searchDependencies(dependencies: string[], npmOnly = false, topic?: string, tokens?: number): Promise<SearchResult[]> {
        debugLog('===== SEARCHING DEPENDENCIES =====');
        const results: SearchResult[] = [];
        
        const SEARCH_DELAY = 10; // 10 milisecond between searches
        
        for (let i = 0; i < dependencies.length; i++) {
            const dep = dependencies[i];
            debugLog(`Searching for dependency ${i + 1}/${dependencies.length}: ${dep}`);
            
            try {
                let repoUrl: string | undefined;
                const npmLookup = await lookupPackageRepository(dep).catch(() => null);
                if (npmLookup && npmLookup.repositoryUrl) {
                    repoUrl = npmLookup.repositoryUrl;
                    debugLog(`✓ npm registry lookup matched for ${dep}: ${repoUrl}`);
                } else if (npmOnly) {
                    debugLog(`✗ npm registry lookup failed for ${dep} and npm-only mode is active; skipping GitHub fallback`);
                } else {
                    const token = process.env.GITHUB_TOKEN;
                    const searchQuery = PackageParser.normalizePackageForSearch(dep);
                    const searchResults = await searchGithubRepos(searchQuery, token, 1);
                    if (searchResults.length > 0) {
                        repoUrl = searchResults[0].html_url;
                        debugLog(`✓ GitHub search matched for ${dep}: ${repoUrl}`);
                    } else {
                        debugLog(`✗ No GitHub search results for: ${dep}`);
                    }
                }

                if (repoUrl) {
                    const context7Url = convertToContext7Url({githubUrl: repoUrl, topic: topic || 'programming', tokens: tokens || 5000});

                    results.push({
                        originalPackageName: dep,
                        repoName: path.basename(repoUrl),
                        url: repoUrl,
                        context7Url,
                        downloaded: false
                    });
                }

                if (i < dependencies.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, SEARCH_DELAY));
                }

            } catch (error) {
                debugLog(`✗ Search failed for ${dep}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        return results;
    }
}
