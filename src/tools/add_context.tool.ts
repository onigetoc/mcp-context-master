import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { SearchService } from '../services/search.service.js';
import { DownloaderService } from '../services/downloader.service.js';
import { updateContextManifest } from '../services/registry.service.js';
import { debugLog } from '../utils/logger.js';
import * as path from 'path';

export const addProjectContextTool = {
  name: "add_project_context",
  description: "Fetches and downloads the context for a single, new library and adds it to the project. if user talk about adding context for a library, or adding context for a package, or adding context for a framework, or adding context for a tool, or adding context for a sdk, or adding context for a api, or adding context for a cli, or adding context for a module, or adding context for a dependency, or adding context for a plugin, or adding context for a package name, or adding context for a library name, etc. Example: 'add project context for react' or 'add project context for @reduxjs/toolkit' or 'add project context for lodash' etc. Quick access: Type '/cm-add $ARGUMENTS'",
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
