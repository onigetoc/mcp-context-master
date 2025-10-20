import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';

// --- Tool 1: List Available Contexts ---

export const listAvailableContextsTool = {
  name: "list_available_contexts", 
  description: "Lists all available knowledge files from the knowledge manifest.",
  inputSchema: {
    type: 'object',
    properties: {},
  }
} as const;

export async function handleListAvailableContextsTool(request: any): Promise<McpToolResponse> {
  // Try to find .context-master directory in current working directory or parent directories
  let manifestPath: string | null = null;
  let currentDir = process.cwd();
  
  // Search up to 5 levels up for .context-master directory
  for (let i = 0; i < 5; i++) {
    const testPath = path.join(currentDir, '.context-master', 'knowledge', 'knowledge-manifest.yaml');
    if (await fs.pathExists(testPath)) {
      manifestPath = testPath;
      break;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break; // Reached root
    currentDir = parentDir;
  }
  
  if (!manifestPath) {
    return { content: [{ type: 'text', text: 'Knowledge manifest not found. Run setup_project_context to generate it, or ensure you are in the correct project directory.' }] };
  }

  try {

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
  description: "Reads the content of a specific knowledge file.",
  inputSchema: {
    type: 'object',
    properties: {
      fileName: {
        type: 'string',
        description: 'The exact name of the knowledge file to read (e.g., \'cm-react-context-2023-10-27.md\'). inside .context-master/knowledge directory.'
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

  // Try to find .context-master directory in current working directory or parent directories
  let filePath: string | null = null;
  let currentDir = process.cwd();
  
  // Search up to 5 levels up for .context-master directory
  for (let i = 0; i < 5; i++) {
    const testPath = path.join(currentDir, '.context-master', 'knowledge', fileName);
    if (await fs.pathExists(testPath)) {
      filePath = testPath;
      break;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break; // Reached root
    currentDir = parentDir;
  }
  
  if (!filePath) {
    return { content: [{ type: 'text', text: `Knowledge file not found: ${fileName}. Ensure you are in the correct project directory.` }] };
  }

  try {

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
