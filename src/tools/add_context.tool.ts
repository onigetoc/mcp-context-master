import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { SearchService } from '../services/search.service.js';
import { DownloaderService } from '../services/downloader.service.js';
import { updateContextManifest } from '../services/registry.service.js';
import { debugLog } from '../utils/logger.js';
import * as path from 'path';

export const addProjectContextTool = {
  name: "add_project_context",
  description: "Adds context for a library using EXACT package names from package.json or confirmed library names. IMPORTANT: This tool requires exact, confirmed library names. If you're unsure about the exact name, use the search workflow first: 1) Search GitHub for the library, 2) Confirm the correct repository, 3) Use this tool with the exact name. For example: Use 'remotion' (not '@remotion/captions'), 'react' (not 'react-dom'), '@tanstack/react-query' (not 'react-query'). If the user mentions a feature or topic (like 'captions', 'routing'), that should be used as a topic parameter in Context7, not as part of the library name.",
  inputSchema: {
    type: 'object',
    properties: {
      libraryName: {
        type: 'string',
        description: 'The name of the library to add (e.g., \'react\', \'@reduxjs/toolkit\').'
      },
      projectPath: {
        type: 'string',
        description: 'Path to the project directory',
        default: '.'
      }
    },
    required: ['libraryName']
  }
} as const;

export async function handleAddProjectContextTool(request: any): Promise<McpToolResponse> {
  const args = request.params?.arguments || {};
  const { libraryName, projectPath = '.' } = args;

  if (!libraryName) {
    throw new McpError(ErrorCode.InvalidParams, 'libraryName is required');
  }

  debugLog(`Using projectPath: ${projectPath} (type: ${typeof projectPath})`);

  try {
    debugLog(`Adding context for library: ${libraryName}`);

    const searcher = new SearchService();
    const downloader = new DownloaderService();

    // Search for the single library
    const searchResults = await searcher.searchDependencies([libraryName], false);

    if (searchResults.length === 0) {
      return { content: [{ type: 'text', text: `Could not find a repository for library: ${libraryName}` }] };
    }

    // Download the context - ensure projectPath is a string
    const finalProjectPath = projectPath || '.';
    debugLog(`Final projectPath: ${finalProjectPath}`);
    const docsPath = path.join(finalProjectPath, '.context-master', 'context');
    debugLog(`Generated docsPath: ${docsPath}`);
    await downloader.ensureDocsFolder(docsPath);
    const downloadedFiles = await downloader.downloadDocumentation(searchResults, docsPath);

    if (downloadedFiles.length === 0) {
        return { content: [{ type: 'text', text: `Found repository for ${libraryName}, but failed to download the context.` }] };
    }

    // Update the manifest
    await updateContextManifest();

    const result = {
        message: `Successfully added context for ${libraryName}.`,
        downloadedFiles
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
