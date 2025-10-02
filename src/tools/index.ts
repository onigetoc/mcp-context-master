import { setupProjectContextTool, handleSetupProjectContextTool } from './setup.tool.js';
import { addProjectContextTool, handleAddProjectContextTool } from './add_context.tool.js';
import { listAvailableContextsTool, handleListAvailableContextsTool, readSpecificContextTool, handleReadSpecificContextTool } from './read_context.tool.js';
import { readTemplateTool, handleReadTemplateTool } from './read-template.tool.js';
import { searchAdvisorTool, handleSearchAdvisorTool } from './search-advisor.tool.js';
import { updateAgentsTool, handleUpdateAgentsTool } from './agents-updater.tool.js';
import { ToolHandler } from '../types/mcp-types.js';

// Tool registry for easy access
export const tools = [
  setupProjectContextTool,
  addProjectContextTool,
  searchAdvisorTool,
  listAvailableContextsTool,
  readSpecificContextTool,
  readTemplateTool,
  updateAgentsTool
];

// Handler registry
export const toolHandlers: Record<string, ToolHandler> = {
  'setup_project_context': handleSetupProjectContextTool,
  'add_project_context': handleAddProjectContextTool,
  'search_library_advisor': handleSearchAdvisorTool,
  'list_available_contexts': handleListAvailableContextsTool,
  'read_specific_context': handleReadSpecificContextTool,
  'read_template': handleReadTemplateTool,
  'update_agents_file': handleUpdateAgentsTool,
};