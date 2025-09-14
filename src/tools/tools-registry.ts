import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { 
  contextDownloaderTool, 
  contextReaderTool, 
  contextManifestRebuildTool,
  contextManifestDiagnoseTool,
  contextListFilesTool,
  handleContextDownloaderTool,
  handleContextReaderTool, 
  handleRebuildContextManifestTool,
  handleDiagnoseContextManifestTool,
  handleListContextFilesTool
} from './context-downloader.js';

// ...existing imports...

export const AVAILABLE_TOOLS = [
  // ...existing tools...
  contextDownloaderTool,
  contextReaderTool,
  contextManifestRebuildTool,
  contextManifestDiagnoseTool,
  contextListFilesTool,
  // ...existing tools...
] as const;

// ...existing code...

export async function handleToolCall(toolName: string, request: any): Promise<McpToolResponse> {
  switch (toolName) {
    // ...existing cases...
    case 'download_context':
      return handleContextDownloaderTool(request);
    case 'read_context':
      return handleContextReaderTool(request);
    case 'rebuild_context_manifest':
      return handleRebuildContextManifestTool();
    case 'diagnose_context_manifest':
      return handleDiagnoseContextManifestTool();
    case 'list_context_files':
      return handleListContextFilesTool();
    // ...existing cases...
    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${toolName}`);
  }
}