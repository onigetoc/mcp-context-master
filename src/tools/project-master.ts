import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { searchGithubRepos } from '../apis/github-api.js';
import { lookupPackageRepository } from '../apis/npm-registry.js';
import { PackageParser } from '../parsers/package-parser.js';
import { ReadmeParser } from '../parsers/readme-parser.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { debugLog } from '../utils/logger.js';
import * as path from 'path';
import * as fs from 'fs/promises';
import axios from 'axios';
import dotenv from 'dotenv';
import yaml from 'js-yaml';

// Load environment variables
dotenv.config();

export interface ProjectStarterResult {
  success: boolean;
  projectInfo?: {
    name: string;
    type: 'node' | 'python' | 'unknown';
    dependencies: string[];
  };
  searchResults?: Array<{
    originalPackageName: string; // Le nom original du package (ex: @modelcontextprotocol/sdk)
    repoName: string; // Le nom du repo trouvé (ex: sdk)
    url: string;
    context7Url: string;
    downloaded: boolean;
  }>;
  downloadedFiles?: string[];
  errors?: string[];
}

export const projectStarterTool = {
  name: "project_starter",
  description: "Comprehensive project starter that analyzes dependencies, searches GitHub, and downloads Context7 documentation in one go. Perfect for setting up development context for any project.",
  inputSchema: {
    type: 'object',
    properties: {
      projectPath: {
        type: 'string',
        description: 'Path to the project directory to analyze (e.g., ".", "./my-project", "/path/to/project")'
      },
      searchQuery: {
        type: 'string',
        description: 'Optional search query if no package.json found (e.g., "react", "fastapi")'
      },
      maxDependencies: {
        type: 'number',
        description: 'Maximum number of dependencies to search for (default: 10)',
        default: 25,
        minimum: 1,
        maximum: 50
      },
      downloadDocs: {
        type: 'boolean',
        description: 'Whether to download Context7 documentation (default: true)',
        default: true
      },
      docsFolder: {
        type: 'string',
        description: 'Folder name to store downloaded docs (default: .agents/context)',
        default: '.agents/context'
      }
    },
    required: ['projectPath']
  }
} as const;

async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function updateContextManifest(): Promise<void> {
  const contextDir = path.join(process.cwd(), '.agents', 'context');
  const manifestPath = path.join(contextDir, 'context-manifest.yaml');

  if (!await pathExists(contextDir)) {
    return; // No directory, no manifest
  }

  // TOUJOURS scanner le dossier physique
  const files = await fs.readdir(contextDir);
  const mdFiles = files
    .filter(file => file.endsWith('.md') && file !== 'context-manifest.yaml')
    .sort((a, b) => a.localeCompare(b));

  console.log(`[project-master] Physical scan found ${mdFiles.length} .md files:`, mdFiles);

  const manifest = {
    lastUpdated: new Date().toISOString(),
    files: mdFiles,
  };

  await fs.writeFile(manifestPath, yaml.dump(manifest));
  console.log(`[project-master] FORCE updated manifest with ${mdFiles.length} files`);
}

export async function handleProjectMasterTool(request: any): Promise<McpToolResponse> {
  // EARLY DIAGNOSTICS: inspect request object and prototypes before any code runs
  try {
    console.log('HANDLER EARLY: typeof request =', typeof request);
    console.log('HANDLER EARLY: request.params =', request.params);
    if (request && request.params && request.params.arguments) {
      console.log('HANDLER EARLY: params.arguments keys =', Object.keys(request.params.arguments));
      console.log('HANDLER EARLY: params.arguments raw =', request.params.arguments);
      console.log('HANDLER EARLY: params.arguments proto =', Object.getPrototypeOf(request.params.arguments));
    }
  } catch (e) { }
  debugLog(`handleProjectMasterTool received arguments: ${JSON.stringify(request.params?.arguments)}`);
  // Extra explicit logging to stdout to help debug argument mutation between caller and handler
  try {
    // Use console.log (stdout) in addition to debugLog (stderr) so test output shows both
    console.log('HANDLER: raw request.params.arguments =', request.params?.arguments);
    console.log('HANDLER: maxDependencies (raw) =', request.params?.arguments?.maxDependencies, 'typeof=', typeof request.params?.arguments?.maxDependencies);
    // If the value is unexpectedly small, emit additional diagnostics
    const md = request.params?.arguments?.maxDependencies;
    if (typeof md === 'number' && md < 5) {
      try {
        console.log('HANDLER: maxDependencies is <5 — printing property descriptor and stack trace');
        const desc = Object.getOwnPropertyDescriptor(request.params.arguments, 'maxDependencies');
        console.log('HANDLER: property descriptor =', desc);
      } catch (e) {
        // ignore
      }
      console.trace('HANDLER: stack trace for diagnostics');
    }
  } catch (e) {
    // ignore logging errors
  }
  const { 
    projectPath, 
    searchQuery, 
    maxDependencies = 10, 
    downloadDocs = true, 
    docsFolder = '.agents/context' 
  } = request.params.arguments || {};

  if (!projectPath) {
    throw new McpError(ErrorCode.InvalidParams, 'projectPath is required');
  }

  const starter = new ProjectStarterExecutor();
  const result = await starter.execute({
    projectPath,
    searchQuery,
    maxDependencies,
    downloadDocs,
    docsFolder
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}

class ProjectStarterExecutor {
  private packageParser: PackageParser;
  private readmeParser: ReadmeParser;

  constructor() {
    this.packageParser = new PackageParser();
    this.readmeParser = new ReadmeParser();
  }

  async execute(args: {
    projectPath: string;
    searchQuery?: string;
    maxDependencies: number;
    downloadDocs: boolean;
    docsFolder: string;
  }): Promise<ProjectStarterResult> {
    debugLog('===== PROJECT STARTER EXECUTION =====');
    debugLog(`Project path: ${args.projectPath}`);
  debugLog(`maxDependencies passed: ${args.maxDependencies}`);
    
    const result: ProjectStarterResult = {
      success: false,
      searchResults: [],
      downloadedFiles: [],
      errors: []
    };

    try {
      // Step 1: Analyze project structure
      const projectInfo = await this.analyzeProject(args.projectPath);
      
      if (!projectInfo) {
        result.errors?.push('Could not determine project type or dependencies');
        return result;
      }
      
      result.projectInfo = projectInfo;

      // Step 2: Determine dependencies to search for
      let dependenciesToSearch = projectInfo.dependencies;
      
      // If no dependencies found and search query provided, use that
      if (dependenciesToSearch.length === 0 && args.searchQuery) {
        dependenciesToSearch = [args.searchQuery];
      }

      if (dependenciesToSearch.length === 0) {
        result.errors?.push('No dependencies found to search for');
        return result;
      }

      // Limit dependencies to avoid rate limits
      dependenciesToSearch = dependenciesToSearch.slice(0, args.maxDependencies);
      debugLog(`Searching for ${dependenciesToSearch.length} dependencies`);

  // Step 3: Resolve repository URLs for each dependency.
  // If project is a Node project (package.json), prefer npm registry lookup only (no GitHub fallback)
  const enforceNpmOnly = projectInfo?.type === 'node';
  const searchResults = await this.searchDependencies(dependenciesToSearch, enforceNpmOnly);
      result.searchResults = searchResults || [];

      // Step 4: Download Context7 documentation if requested
      if (args.downloadDocs && result.searchResults.length > 0) {
        const docsPath = path.join(args.projectPath, '.agents', 'context');
        await this.ensureDocsFolder(docsPath);
        
        const downloadedFiles = await this.downloadDocumentation(result.searchResults, docsPath);
        result.downloadedFiles = downloadedFiles;

        if (downloadedFiles.length > 0) {
          await updateContextManifest(); // Update manifest after downloads
        }
      }

      result.success = true;
      debugLog(`✓ Project starter completed successfully`);
      debugLog(`✓ Found ${result.searchResults.length} repositories`);
      debugLog(`✓ Downloaded ${result.downloadedFiles?.length || 0} documentation files`);

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      result.errors?.push(errorMsg);
      debugLog(`✗ Project starter failed: ${errorMsg}`);
    }

    return result;
  }

  private async analyzeProject(projectPath: string): Promise<ProjectStarterResult['projectInfo'] | null> {
    debugLog('===== ANALYZING PROJECT =====');
    
    try {
      // Check for package.json (Node.js)
      const packageInfo = await this.packageParser.parsePackageJson(projectPath);
      if (packageInfo) {
        return {
          name: packageInfo.name,
          type: 'node',
          dependencies: packageInfo.allDependencies
        };
      }

      // Check for requirements.txt (Python)
      const pythonDeps = await this.packageParser.parseRequirementsTxt(projectPath);
      if (pythonDeps && pythonDeps.length > 0) {
        return {
          name: path.basename(projectPath),
          type: 'python',
          dependencies: pythonDeps
        };
      }

      // Fallback: try to extract from README
      const readmeContent = await this.readmeParser.readLocalReadme(projectPath);
      if (readmeContent) {
        const mcpInfo = this.readmeParser.extractPythonMcpJsonAndInstall(readmeContent);
        if (mcpInfo?.pipInstall) {
          const packageName = mcpInfo.pipInstall.replace('pip install ', '').trim();
          return {
            name: packageName,
            type: 'python',
            dependencies: [packageName]
          };
        }
      }

      debugLog('Could not determine project type');
      return null;

    } catch (error) {
      debugLog(`Error analyzing project: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }

  private async searchDependencies(dependencies: string[], npmOnly = false): Promise<ProjectStarterResult['searchResults']> {
    debugLog('===== SEARCHING DEPENDENCIES =====');
    const results: NonNullable<ProjectStarterResult['searchResults']> = [];
    
    // Add delay between searches to respect rate limits
    const SEARCH_DELAY = 100; // 1 second between searches
    
    for (let i = 0; i < dependencies.length; i++) {
      const dep = dependencies[i];
      debugLog(`Searching for dependency ${i + 1}/${dependencies.length}: ${dep}`);
      
      try {
        // Try npm registry lookup first
        let repoUrl: string | undefined;
        const npmLookup = await lookupPackageRepository(dep).catch(() => null);
        if (npmLookup && npmLookup.repositoryUrl) {
          repoUrl = npmLookup.repositoryUrl;
          debugLog(`✓ npm registry lookup matched for ${dep}: ${repoUrl}`);
        } else if (npmOnly) {
          // If we're enforcing npm-only (project init from package.json) and npm lookup failed,
          // record a debug message and skip fallback to GitHub search.
          debugLog(`✗ npm registry lookup failed for ${dep} and npm-only mode is active; skipping GitHub fallback`);
        } else {
          // Fallback to GitHub search when not in npmOnly mode
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
          const context7Url = this.convertGitHubToContext7(repoUrl, {
            topic: 'programming',
            tokens: 5000
          });

          results.push({
            originalPackageName: dep, // Garde le nom original du package
            repoName: path.basename(repoUrl),
            url: repoUrl,
            context7Url,
            downloaded: false
          });
        }

        // Rate limiting delay (except for last item)
        if (i < dependencies.length - 1) {
          await new Promise(resolve => setTimeout(resolve, SEARCH_DELAY));
        }

      } catch (error) {
        debugLog(`✗ Search failed for ${dep}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return results;
  }

  private convertGitHubToContext7(githubUrl: string, params?: { topic?: string; tokens?: number }): string {
    // Convert GitHub URL to Context7 format
    // https://github.com/owner/repo -> https://context7.com/owner/repo/llms.txt
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return githubUrl;
    
    const [, owner, repo] = match;
    let context7Url = `https://context7.com/${owner}/${repo}/llms.txt`;
    
    const queryParams = new URLSearchParams();
    if (params?.topic) queryParams.append('topic', params.topic);
    if (params?.tokens) queryParams.append('tokens', params.tokens.toString());
    
    if (queryParams.toString()) {
      context7Url += `?${queryParams.toString()}`;
    }
    
    return context7Url;
  }

  private async downloadDocumentation(
    searchResults: NonNullable<ProjectStarterResult['searchResults']>, 
    docsPath: string
  ): Promise<string[]> {
    debugLog('===== DOWNLOADING DOCUMENTATION =====');
    const downloadedFiles: string[] = [];

    for (const result of searchResults) {
      try {
        const fileName = this.generateContextFileName(result.originalPackageName);
        const filePath = path.join(docsPath, fileName);
        
        debugLog(`Downloading: ${result.originalPackageName} (${result.repoName})`);
        
        // Download using axios
        // Try primary context7 URL, if 404 try simple variants (strip .js suffix from repo name, etc.)
        let response;
        try {
          response = await axios.get(result.context7Url, {
            timeout: 30000,
            headers: {
              'User-Agent': 'MCP-Context-Master/1.0.0'
            }
          });
        } catch (err: any) {
          // If 404, attempt simple fallbacks by mutating the github URL pattern
          const status = err && err.response && err.response.status;
          if (status === 404) {
            debugLog(`Primary Context7 URL returned 404 for ${result.originalPackageName}, trying variants`);
            // Derive candidate repo variants
            const variants: string[] = [];
            const m = result.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
            if (m) {
              const owner = m[1];
              const repo = m[2];
              // If repo ends with .js, try without
              if (repo.endsWith('.js')) variants.push(`https://context7.com/${owner}/${repo.replace(/\.js$/,'')}/llms.txt`);
              // Try without .js even if it doesn't end with it (some packages use rest.js vs rest)
              variants.push(`https://context7.com/${owner}/${repo.replace(/\.js$/,'')}/llms.txt`);
              // Try repo name only (owner/repo)
              variants.push(`https://context7.com/${owner}/${repo}/llms.txt`);
            }

            // add query params from original context7Url
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
                // continue trying
                debugLog(`✗ Variant failed: ${candidate}`);
              }
            }

            if (!tried) throw err; // rethrow original error if no variant succeeded
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

        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        debugLog(`✗ Download failed for ${result.originalPackageName}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return downloadedFiles;
  }

  private generateContextFileName(packageName: string): string {
    // Convert package name to a clean filename
    let cleanName = packageName;
    
    // Remove @ symbol and replace / with -
    cleanName = cleanName.replace('@', '').replace('/', '-');
    
    // Replace any other problematic characters for filenames
    cleanName = cleanName.replace(/[<>:"|?*]/g, '-');
    
    // GÉNÉRATION: Force le préfixe "cm-" pour les fichiers auto-générés
    return `cm-${cleanName}-context-${new Date().toISOString().split('T')[0]}.md`;
  }

  private async ensureDocsFolder(docsPath: string): Promise<void> {
    try {
      await fs.access(docsPath);
      debugLog(`✓ Docs folder exists: ${docsPath}`);
    } catch {
      await fs.mkdir(docsPath, { recursive: true });
      debugLog(`✓ Created docs folder: ${docsPath}`);
    }
  }
}