import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { SearchService } from '../services/search.service.js';
import { DownloaderService } from '../services/downloader.service.js';
import { updateContextManifest } from '../services/registry.service.js';
import { debugLog } from '../utils/logger.js';
import * as path from 'path';
import fs from 'fs-extra';

export const addProjectContextTool = {
  name: "add_project_context",
  description: "Adds context for a library using EXACT package names from package.json or confirmed library names. IMPORTANT: This tool requires exact, confirmed library names. If you're unsure about the exact name, use the search workflow first: 1) Search GitHub for the library, 2) Confirm the correct repository, 3) Use this tool with the exact name. For example: Use 'remotion' (not '@remotion/captions'), 'react' (not 'react-dom'), '@tanstack/react-query' (not 'react-query'). If the user mentions a feature or topic (like 'captions', 'routing'), that should be used as a topic parameter in Context7, not as part of the library name.",
  inputSchema: {
    type: 'object',
    properties: {
      libraryName: {
        type: 'string',
        description: 'The name of the library to add (e.g., \'react\', \'@reduxjs/toolkit\', \'remotion\').'
      },
      projectPath: {
        type: 'string',
        description: 'Absolute path to the project directory (REQUIRED for proper context placement)'
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
    required: ['libraryName', 'projectPath']
}
} as const;

export async function handleAddProjectContextTool(request: any): Promise<McpToolResponse> {
  const args = request.params?.arguments || {};
  const { libraryName, projectPath, topic, tokens = 3000 } = args;

  if (!libraryName) {
    throw new McpError(ErrorCode.InvalidParams, 'libraryName is required');
  }

  if (!projectPath) {
    throw new McpError(ErrorCode.InvalidParams, 'projectPath is required - must be absolute path to project directory');
  }

  // Validate and resolve project path
  const fullPath = path.resolve(projectPath);
  
  if (!await fs.pathExists(fullPath)) {
    throw new McpError(
      ErrorCode.InvalidParams, 
      `Project path does not exist: ${fullPath}`
    );
  }

  // Validate tokens range
  const finalTokens = Math.min(Math.max(tokens || 3000, 2000), 10000);
  
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
      return { content: [{ type: 'text', text: `Could not find a repository for library: ${libraryName}` }] };
    }

    // Download the context with topic and tokens
    const docsPath = path.join(fullPath, '.context-master', 'context');
    debugLog(`Generated docsPath: ${docsPath}`);
    await downloader.ensureDocsFolder(docsPath);
    
    // Download the documentation (topic and finalTokens will be handled in the URL construction)
    const downloadedFiles = await downloader.downloadDocumentation(searchResults, docsPath);

    if (downloadedFiles.length === 0) {
        return { content: [{ type: 'text', text: `Found repository for ${libraryName}, but failed to download the context.` }] };
    }

    // Update the manifest
    await updateContextManifest();

    const result = {
        message: `Successfully added context for ${libraryName}${topic ? ` (topic: ${topic})` : ''} with ${finalTokens} tokens.`,
        downloadedFiles,
        contextPath: docsPath
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
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to add context for ${libraryName}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
