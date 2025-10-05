import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export const updateAgentsTool = {
  name: "update_agents_file",
  description: "Update project's AGENTS.md file with Context Master instructions. Reads the template from .context-master directory and updates the project's AGENTS.md file. Automatically detects the current project directory.",
  inputSchema: {
    type: 'object',
    properties: {
      projectPath: {
        type: 'string',
        description: 'Optional project directory path, if not provided, automatically detects the current working directory.'
      },
    },
    required: []
  }
} as const;



async function updateAgentsFileWithTemplate(projectPath: string): Promise<string[]> {
  const logs: string[] = [];
  const fullPath = path.resolve(projectPath);
  
  // Check if project exists
  if (!await fs.pathExists(fullPath)) {
    throw new Error(`Project path does not exist: ${fullPath}`);
  }

  // Check if .context-master directory exists
  const contextMasterDir = path.join(fullPath, '.context-master');
  if (!await fs.pathExists(contextMasterDir)) {
    throw new Error(`Context Master not initialized. Run setup_project_context first.`);
  }

  // Read the template from .context-master directory
  const templatePath = path.join(contextMasterDir, 'context-master-agents-prompt.md');
  if (!await fs.pathExists(templatePath)) {
    throw new Error(`Template file not found: ${templatePath}. Run setup_project_context first.`);
  }

  const contextMasterInstructions = await fs.readFile(templatePath, 'utf8');
  logs.push(`Read template from: ${templatePath}`);

  // Path to AGENTS.md in project root
  const agentsFilePath = path.join(fullPath, 'AGENTS.md');
  
  // Check if AGENTS.md exists
  const agentsFileExists = await fs.pathExists(agentsFilePath);
  
  if (!agentsFileExists) {
    // Create new AGENTS.md file with Context Master instructions
    await fs.writeFile(agentsFilePath, contextMasterInstructions, 'utf8');
    logs.push(`Created new AGENTS.md file with Context Master instructions`);
  } else {
    // Read existing AGENTS.md content
    const existingContent = await fs.readFile(agentsFilePath, 'utf8');
    
    // Check if Context Master instructions already exist
    const startMarker = '## Context Master (mcp-context-master) Instructions';
    const endMarker = '<!-- END: CONTEXT-MASTER -->';
    
    const startIndex = existingContent.indexOf(startMarker);
    const endIndex = existingContent.indexOf(endMarker);
    
    let updatedContent: string;
    
    if (startIndex !== -1 && endIndex !== -1) {
      // Replace existing Context Master section
      const beforeSection = existingContent.substring(0, startIndex);
      const afterSection = existingContent.substring(endIndex + endMarker.length);
      updatedContent = beforeSection + contextMasterInstructions + afterSection;
      logs.push(`Replaced existing Context Master section in AGENTS.md`);
    } else if (startIndex !== -1) {
      // Found start marker but no end marker - replace from start marker to end of file
      const beforeSection = existingContent.substring(0, startIndex);
      updatedContent = beforeSection + contextMasterInstructions;
      logs.push(`Updated Context Master section from start marker to end of file`);
    } else {
      // No existing Context Master section - append to end
      updatedContent = existingContent + '\n\n' + contextMasterInstructions;
      logs.push(`Appended Context Master instructions to existing AGENTS.md`);
    }
    
    // Write updated content back to file
    await fs.writeFile(agentsFilePath, updatedContent, 'utf8');
  }

  logs.push(`AGENTS.md updated successfully: ${agentsFilePath}`);
  return logs;
}

export async function handleUpdateAgentsTool(request: any): Promise<McpToolResponse> {
  const { projectPath } = request.params.arguments || {};

  // Use process.cwd() if no path provided, otherwise use provided path
  const resolvedPath = projectPath ? path.resolve(projectPath) : process.cwd();

  try {
    const logs = await updateAgentsFileWithTemplate(resolvedPath);

    const successGuide = `# AGENTS.md Updated Successfully ✅

## Update Results
- **Project Path**: ${resolvedPath}
- **Template Source**: .context-master/context-master-agents-prompt.md
- **Target File**: AGENTS.md

## Update Logs
${logs.map(log => `- ${log}`).join('\n')}

## What Happened
The Context Master instructions have been integrated into your project's AGENTS.md file. This provides AI assistants with the necessary context about:

- Available MCP tools and commands
- Project structure and setup
- Context Master workflow and best practices
- How to use the .context-master directory and its contents

## Next Steps
1. Review the updated AGENTS.md file
2. Commit the changes to your repository
3. AI assistants will now have Context Master context when working on this project

---
**Your project's AGENTS.md is now Context Master ready!**`;

    return {
      content: [{ type: "text", text: successGuide }]
    };

  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to update AGENTS.md: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}