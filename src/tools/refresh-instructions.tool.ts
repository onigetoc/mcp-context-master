import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import path from 'path';

export const refreshInstructionsTool = {
  name: "refresh_context_master_instructions",
  description: "🔄 Refresh Context Master instructions for the current conversation. Call this after initialization/setup to get the latest instructions that were added to AGENTS.md or other context files. This ensures the LLM has access to the complete Context Master workflow.",
  inputSchema: {
    type: 'object',
    properties: {
      projectPath: {
        type: 'string',
        description: 'Absolute path to the user\'s project directory'
      }
    },
    required: ['projectPath']
  }
} as const;

export async function handleRefreshInstructionsTool(request: any): Promise<McpToolResponse> {
  const { projectPath } = request.params.arguments || {};

  if (!projectPath) {
    return {
      content: [{
        type: "text",
        text: "❌ Missing required parameter: projectPath"
      }]
    };
  }

  try {
    const fullPath = path.resolve(projectPath);
    const contextMasterDir = path.join(fullPath, '.context-master');
    
    // Read the instructions that were added to the project
    const instructionsPath = path.join(contextMasterDir, 'cm-instructions.md');
    
    if (!await fs.pathExists(instructionsPath)) {
      return {
        content: [{
          type: "text",
          text: `# ⚠️ Context Master Not Set Up

Context Master instructions not found. Please run initialization first:

\`\`\`typescript
initialize_context_master("${fullPath}")
setup_project_context("${fullPath}")
\`\`\``
        }]
      };
    }

    const instructions = await fs.readFile(instructionsPath, 'utf8');
    
    return {
      content: [{
        type: "text",
        text: `# 🔄 Context Master Instructions Refreshed

## Instructions for This Conversation

${instructions}

---

**These instructions are now active for the remainder of this conversation.**
**Use the workflow and tools described above when helping with library-related questions.**`
      }]
    };

  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `# ❌ Error Refreshing Instructions

Could not refresh Context Master instructions: ${error instanceof Error ? error.message : String(error)}

Please ensure Context Master is properly set up in your project.`
      }]
    };
  }
}