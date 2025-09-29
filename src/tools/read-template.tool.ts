import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import path from 'path';

export const readTemplateTool = {
  name: "read_template",
  description: "Read a Context Master template file from the user's project .context-master directory",
  inputSchema: {
    type: 'object',
    properties: {
      templateName: {
        type: 'string',
        description: 'Name of the template file to read (e.g., "cm-init.md", "cm-analyze.md")'
      },
      projectPath: {
        type: 'string',
        description: 'Path to the project directory (default: current directory)',
        default: '.'
      }
    },
    required: ['templateName']
  }
};

export async function handleReadTemplateTool(request: any): Promise<McpToolResponse> {
  try {
    const { templateName, projectPath = '.' } = request.params.arguments || {};
    
    if (!templateName) {
      throw new McpError(ErrorCode.InvalidRequest, 'Template name is required');
    }

    // Build path to template in user's project
    const fullPath = path.resolve(projectPath);
    const contextMasterDir = path.join(fullPath, '.context-master');
    const templatePath = path.join(contextMasterDir, templateName);

    // Check if template exists
    if (!await fs.pathExists(templatePath)) {
      throw new McpError(
        ErrorCode.InvalidRequest, 
        `Template not found: ${templateName}. Run cm_init first to download templates.`
      );
    }

    // Read template content
    const templateContent = await fs.readFile(templatePath, 'utf8');

    return {
      content: [
        {
          type: "text",
          text: templateContent
        }
      ]
    };

  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to read template: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}