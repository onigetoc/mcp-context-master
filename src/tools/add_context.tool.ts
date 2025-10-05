import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { SearchService } from '../services/search.service.js';
import { DownloaderService } from '../services/downloader.service.js';
import { PathResolverService } from '../services/path-resolver.service.js';
import { updateContextManifest } from '../services/registry.service.js';
import { debugLog } from '../utils/logger.js';
import { analyzeNetworkError } from '../utils/network-utils.js';
import * as path from 'path';

export const addProjectContextTool = {
  name: "add_project_context",
  description: "Adds context for a library using EXACT package names from package.json or confirmed library names. If you're unsure about the exact library name, use the search workflow first: 1) Search GitHub for the library, 2) Confirm the correct repository, 3) Use this tool with the exact name. For example: Use 'remotion' (not '@remotion/captions'), 'react' (not 'react-dom'), '@tanstack/react-query' (not 'react-query'). If the user mentions a feature or topic (like 'captions', 'routing'), that should be used as a topic parameter, not as part of the library name.",
  inputSchema: {
    type: 'object',
    properties: {
      libraryName: {
        type: 'string',
        description: 'The name of the library to add (e.g., \'react\', \'@reduxjs/toolkit\', \'remotion\').'
      },
      projectPath: {
        type: 'string',
        description: 'Optional project directory path, if not provided, automatically detects the current working directory.'
      },
      topic: {
        type: 'string',
        description: 'Optional topic to focus the documentation (e.g., \'srt caption\', \'authentication\', \'routing\'). This helps Context7 provide targeted documentation and saves tokens.'
      },
      tokens: {
        type: 'number',
        description: 'Number of tokens to request from Context7 (between 2000 and 10000). Default: 3000. Use higher values for broader overviews, lower values for specific features.',
        minimum: 2000,
        maximum: 10000,
        default: 3000
      }
    },
    required: ['libraryName']
}
} as const;

export async function handleAddProjectContextTool(request: any): Promise<McpToolResponse> {
  const args = request.params?.arguments || {};
  const { libraryName, projectPath, topic, tokens = 3000 } = args;

  if (!libraryName) {
    throw new McpError(ErrorCode.InvalidParams, 'libraryName is required');
  }

  // Validate tokens range
  const finalTokens = Math.min(Math.max(tokens || 3000, 2000), 10000);

  // Use PathResolverService for intelligent path resolution
  const pathResolver = new PathResolverService();
  const fullPath = await pathResolver.resolveProjectPath(
    projectPath,
    true,  // Enable debug logging
    {      // Additional debug info
      library: libraryName,
      topic: topic || 'none',
      tokens: finalTokens,
      toolName: 'add_project_context'
    }
  );
  
  debugLog(`Using projectPath: ${fullPath}`);
  debugLog(`Adding context for library: ${libraryName}`);
  debugLog(`Topic: ${topic || 'none (full context)'}`);
  debugLog(`Tokens: ${finalTokens}`);

  try {
    debugLog(`Adding context for library: ${libraryName}`);

    const searcher = new SearchService();
    const downloader = new DownloaderService();

    // Search for the single library with topic and tokens
    const searchResults = await searcher.searchDependencies([libraryName], false, topic, finalTokens);

    if (searchResults.length === 0) {
      return { 
        content: [{ 
          type: 'text', 
          text: JSON.stringify({
            success: false,
            error: 'Library not found',
            message: `Could not find a repository for library: ${libraryName}`,
            suggestions: [
              'Check the library name spelling',
              'Try searching on GitHub: https://github.com/search',
              'Verify the library exists on npm or PyPI'
            ]
          }, null, 2)
        }] 
      };
    }

    // Download the context with topic and tokens
    const docsPath = path.join(fullPath, '.context-master', 'context');
    debugLog(`Generated docsPath: ${docsPath}`);
    await downloader.ensureDocsFolder(docsPath);
    
    // Download the documentation (topic and finalTokens will be handled in the URL construction)
    const downloadedFiles = await downloader.downloadDocumentation(searchResults, docsPath);

    if (downloadedFiles.length === 0) {
        return { 
          content: [{ 
            type: 'text', 
            text: JSON.stringify({
              success: false,
              error: 'Download failed',
              message: `Found repository for ${libraryName}, but failed to download the context.`,
              details: `Searched: ${searchResults.map(r => r.repoName).join(', ')}`,
              suggestions: [
                'The library may not be available on Context7 yet',
                'Try adding it at: https://context7.com/add-library',
                'Check if the repository is public and accessible',
                'Retry in a moment (might be temporary network issue)'
              ],
              troubleshooting: {
                githubUrl: searchResults[0]?.url,
                context7Url: searchResults[0]?.context7Url
              }
            }, null, 2)
          }] 
        };
    }

    // Update the manifest
    await updateContextManifest();

    const result = {
        success: true,
        message: `Successfully added context for ${libraryName}${topic ? ` (topic: ${topic})` : ''} with ${finalTokens} tokens.`,
        downloadedFiles,
        contextPath: docsPath,
        source: searchResults[0]?.url
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };

  } catch (error) {
    // Analyze the error
    const errorInfo = analyzeNetworkError(error);
    
    // Network/connectivity errors
    if (errorInfo.type === 'network' || errorInfo.type === 'timeout') {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: 'Network error',
            message: errorInfo.message,
            libraryName,
            suggestions: [
              'Check your internet connection',
              'Verify you can access GitHub and Context7',
              'Try again in a few moments',
              'Check firewall/proxy settings if on corporate network'
            ],
            troubleshooting: {
              githubStatus: 'https://www.githubstatus.com/',
              context7: 'https://context7.com/',
              testConnection: 'Try opening these URLs in your browser'
            }
          }, null, 2)
        }]
      };
    }
    
    // Rate limiting
    if (errorInfo.type === 'rate_limit') {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: 'Rate limit exceeded',
            message: 'Too many requests to GitHub or Context7. Please wait and try again.',
            libraryName,
            suggestions: [
              'Wait 1-2 minutes before retrying',
              'Check your GitHub API rate limit: https://api.github.com/rate_limit',
              'Ensure your GITHUB_TOKEN is valid'
            ]
          }, null, 2)
        }]
      };
    }
    
    // Path resolution errors
    if (error instanceof Error && error.message.includes('Cannot resolve project path')) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: 'Invalid project path',
            message: error.message,
            libraryName,
            suggestions: [
              'Provide an absolute path to your project',
              'Ensure the directory exists',
              'Example: C:\\Users\\YourName\\projects\\my-app or /home/user/projects/my-app'
            ]
          }, null, 2)
        }]
      };
    }
    
    // MCP-specific errors (re-throw to preserve error codes)
    if (error instanceof McpError) {
      throw error;
    }
    
    // Generic/unexpected errors
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          success: false,
          error: 'Unexpected error',
          message: error instanceof Error ? error.message : String(error),
          libraryName,
          suggestions: [
            'This is an unexpected error. Please report it if it persists.',
            'Check the MCP server logs for more details',
            'Try with a different library to see if the issue is specific'
          ],
          debug: {
            errorType: error?.constructor?.name,
            stack: error instanceof Error ? error.stack?.split('\n').slice(0, 3) : undefined
          }
        }, null, 2)
      }]
    };
  }
}
