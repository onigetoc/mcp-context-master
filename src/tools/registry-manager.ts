import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import * as path from 'path';

export const registryManagerTool = {
  name: "manage_tools_registry",
  description: "Create and manage a JSON registry of all available tools for the project",
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['create', 'read', 'update'],
        description: 'Action to perform on the tools registry'
      },
      projectType: {
        type: 'string',
        description: 'Type of project (e.g., "react", "nodejs", "python", "mcp-server")'
      },
      tools: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            required: { type: 'boolean' }
          }
        },
        description: 'Array of tools to add/update in registry'
      }
    },
    required: ['action'],
  },
} as const;

interface ToolRegistryEntry {
  name: string;
  description: string;
  category: string;
  required: boolean;
  inputSchema?: any;
}

interface ToolsRegistry {
  projectType?: string;
  createdAt: string;
  updatedAt: string;
  tools: ToolRegistryEntry[];
}

const REGISTRY_FILE = 'tools-registry.json';

async function createDefaultRegistry(projectType?: string): Promise<ToolsRegistry> {
  const defaultTools: ToolRegistryEntry[] = [
    {
      name: "search_github",
      description: "Search GitHub repositories to find the most relevant projects for development context. Returns detailed analysis with popularity metrics and Context7 URLs.",
      category: "search",
      required: true,
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string" },
          sort: { type: "string", enum: ["stars", "forks", "updated"] },
          per_page: { type: "number" }
        },
        required: ["query"]
      }
    },
    {
      name: "convert_to_context7",
      description: "Convert GitHub URL to Context7 url, providing a direct link to the Context7 llms.txt content for that repository.",
      category: "conversion",
      required: true,
      inputSchema: {
        type: "object",
        properties: {
          githubUrl: { type: "string" },
          topic: { type: "string" },
          tokens: { type: "number" }
        },
        required: ["githubUrl"]
      }
    },
    {
      name: "download_context",
      description: "Download Context7 content as .md file",
      category: "download",
      required: true,
      inputSchema: {
        type: "object",
        properties: {
          context7Url: { type: "string" },
          outputFilename: { type: "string" }
        },
        required: ["context7Url", "outputFilename"]
      }
    },
    {
      name: "manage_tools_registry",
      description: "Manage the tools registry JSON file",
      category: "management",
      required: false
    }
  ];

  return {
    projectType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tools: defaultTools
  };
}

async function readRegistry(): Promise<ToolsRegistry> {
  const registryPath = path.join(process.cwd(), REGISTRY_FILE);
  
  if (await fs.pathExists(registryPath)) {
    const content = await fs.readFile(registryPath, 'utf8');
    return JSON.parse(content);
  }
  
  // Create default registry if it doesn't exist
  return createDefaultRegistry();
}

async function writeRegistry(registry: ToolsRegistry): Promise<void> {
  const registryPath = path.join(process.cwd(), REGISTRY_FILE);
  registry.updatedAt = new Date().toISOString();
  await fs.writeFile(registryPath, JSON.stringify(registry, null, 2), 'utf8');
}

export async function handleRegistryManagerTool(request: any): Promise<McpToolResponse> {
  const { action, projectType, tools } = request.params.arguments || {};
  
  if (!action) {
    throw new McpError(ErrorCode.InvalidRequest, 'Missing action parameter');
  }

  try {
    let registry: ToolsRegistry;
    
    switch (action) {
      case 'create':
        registry = await createDefaultRegistry(projectType);
        await writeRegistry(registry);
        return {
          content: [{
            type: "text",
            text: [
              `**Tools Registry Created Successfully!**`,
              ``,
              `Project Type: ${registry.projectType || 'Generic'}`,
              `Created: ${registry.createdAt}`,
              `Total Tools: ${registry.tools.length}`,
              ``,
              `**Available Tools:**`,
              ...registry.tools.map(tool => 
                `- **${tool.name}** (${tool.category}): ${tool.description}`
              ),
              ``,
              `Registry saved to: ${REGISTRY_FILE}`
            ].join('\n')
          }]
        };
        
      case 'read':
        registry = await readRegistry();
        return {
          content: [{
            type: "text",
            text: [
              `**Current Tools Registry:**`,
              ``,
              `Project Type: ${registry.projectType || 'Generic'}`,
              `Last Updated: ${registry.updatedAt}`,
              `Total Tools: ${registry.tools.length}`,
              ``,
              `**Tools by Category:**`,
              ...Object.entries(
                registry.tools.reduce((acc, tool) => {
                  if (!acc[tool.category]) acc[tool.category] = [];
                  acc[tool.category].push(tool);
                  return acc;
                }, {} as Record<string, ToolRegistryEntry[]>)
              ).map(([category, categoryTools]) => [
                ``,
                `**${category.toUpperCase()}:**`,
                ...categoryTools.map(tool => 
                  `  - ${tool.name}: ${tool.description} ${tool.required ? '(Required)' : '(Optional)'}`
                )
              ].flat()).flat()
            ].join('\n')
          }]
        };
        
      case 'update':
        registry = await readRegistry();
        if (projectType) {
          registry.projectType = projectType;
        }
        if (tools && Array.isArray(tools)) {
          // Add or update tools
          tools.forEach(newTool => {
            const existingIndex = registry.tools.findIndex(t => t.name === newTool.name);
            if (existingIndex >= 0) {
              registry.tools[existingIndex] = { ...registry.tools[existingIndex], ...newTool };
            } else {
              registry.tools.push(newTool);
            }
          });
        }
        await writeRegistry(registry);
        return {
          content: [{
            type: "text",
            text: [
              `**Tools Registry Updated Successfully!**`,
              ``,
              `Project Type: ${registry.projectType || 'Generic'}`,
              `Updated: ${registry.updatedAt}`,
              `Total Tools: ${registry.tools.length}`,
              ``,
              tools ? `Added/Updated ${tools.length} tools` : 'Project type updated'
            ].join('\n')
          }]
        };
        
      default:
        throw new McpError(ErrorCode.InvalidRequest, `Unknown action: ${action}`);
    }
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Registry operation failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}