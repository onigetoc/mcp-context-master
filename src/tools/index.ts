// Export all tools
export { searchTool, handleSearchTool } from './search-tool.js';
export { context7ConverterTool, handleContext7ConverterTool } from './context7-converter.js';
export { contextDownloaderTool, handleContextDownloaderTool } from './context-downloader.js';
export { registryManagerTool, handleRegistryManagerTool } from './registry-manager.js';
export { projectStarterTool, handleProjectMasterTool } from './project-master.js';
export { initTool, handleInitTool } from './init-tool.js';

// Import for local use
import { searchTool, handleSearchTool } from './search-tool.js';
import { context7ConverterTool, handleContext7ConverterTool } from './context7-converter.js';
import { contextDownloaderTool, handleContextDownloaderTool } from './context-downloader.js';
import { registryManagerTool, handleRegistryManagerTool } from './registry-manager.js';
import { projectStarterTool, handleProjectMasterTool } from './project-master.js';
import { initTool, handleInitTool } from './init-tool.js';

// Tool registry for easy access
export const tools = [
  searchTool,
  context7ConverterTool,
  contextDownloaderTool,
  registryManagerTool,
  projectStarterTool,
  initTool
];

// Import types
import { ToolHandler } from '../types/mcp-types.js';

// Handler registry
export const toolHandlers: Record<string, ToolHandler> = {
  'search_github': handleSearchTool,
  'convert_to_context7': handleContext7ConverterTool,
  'download_context': handleContextDownloaderTool,
  'manage_tools_registry': handleRegistryManagerTool,
  'project_starter': handleProjectMasterTool,
  'init_context_master': handleInitTool,
};