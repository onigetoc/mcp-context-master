import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';

// --- Tool 1: List Available Contexts ---

export const listAvailableContextsTool = {
  name: "list_available_contexts",
  description: "Lists all available context files from the context manifest.",
  inputSchema: {
    type: 'object',
    properties: {},
  }
} as const;

export async function handleListAvailableContextsTool(request: any): Promise<McpToolResponse> {
  const manifestPath = path.join(process.cwd(), '.context-master', 'context', 'context-manifest.yaml');

  try {
    if (!await fs.pathExists(manifestPath)) {
      return { content: [{ type: 'text', text: 'Context manifest not found. Run setup_project_context to generate it.' }] };
    }

    const manifestContent = await fs.readFile(manifestPath, 'utf8');
    const manifest = yaml.load(manifestContent) as { files: string[] };

    if (!manifest.files || manifest.files.length === 0) {
        return { content: [{ type: 'text', text: 'No context files found in the manifest.' }] };
    }

    const fileList = manifest.files.join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `Available context files:\n${fileList}`
        }
      ]
    };
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to list available contexts: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

// --- Tool 2: Read Specific Context ---

export const readSpecificContextTool = {
  name: "read_specific_context",
  description: "Reads the content of a specific context file.",
  inputSchema: {
    type: 'object',
    properties: {
      fileName: {
        type: 'string',
        description: 'The exact name of the context file to read (e.g., \'cm-react-context-2023-10-27.md\').'
      }
    },
    required: ['fileName']
  }
} as const;

export async function handleReadSpecificContextTool(request: any): Promise<McpToolResponse> {
  const { fileName } = request.params.arguments || {};

  if (!fileName) {
    throw new McpError(ErrorCode.InvalidParams, 'fileName is required');
  }

  const filePath = path.join(process.cwd(), '.context-master', 'context', fileName);

  try {
    if (!await fs.pathExists(filePath)) {
      return { content: [{ type: 'text', text: `Context file not found: ${fileName}` }] };
    }

    const fileContent = await fs.readFile(filePath, 'utf8');

    return {
      content: [
        {
          type: 'text',
          text: fileContent
        }
      ]
    };
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to read context file ${fileName}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
