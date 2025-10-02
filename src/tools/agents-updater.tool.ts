import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export const updateAgentsTool = {
  name: "update_agents_file",
  description: "Update project's AGENTS.md file with Context Master instructions. Reads the template from .context-master directory and updates the project's AGENTS.md file.",
  inputSchema: {
    type: 'object',
    properties: {
      projectPath: {
        type: 'string',
        description: 'Full absolute path to the project directory where AGENTS.md should be updated',
        default: '.'
      },
    },
    required: ['projectPath']
  }
} as const;

function validateAbsolutePath(projectPath: string): { isValid: boolean; errorMessage?: string } {
  // Check for obviously invalid relative paths
  const invalidPaths = ['.', './', '../', './project', '../project', '~/'];
  if (invalidPaths.includes(projectPath) || projectPath.startsWith('./') || projectPath.startsWith('../')) {
    return {
      isValid: false,
      errorMessage: `Invalid relative path detected: "${projectPath}". You must provide the full absolute project path.`
    };
  }

  // Check if path is absolute based on OS
  const isWindows = os.platform() === 'win32';
  
  if (isWindows) {
    const windowsAbsoluteRegex = /^[A-Za-z]:\\/;
    if (!windowsAbsoluteRegex.test(projectPath)) {
      return {
        isValid: false,
        errorMessage: `Invalid Windows path: "${projectPath}". Must be absolute path starting with drive letter`
      };
    }
  } else {
    if (!projectPath.startsWith('/')) {
      return {
        isValid: false,
        errorMessage: `Invalid path: "${projectPath}". Must be absolute path starting with /`
      };
    }
  }

  return { isValid: true };
}

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
  const { projectPath = '.' } = request.params.arguments || {};

  // Validate absolute path
  const pathValidation = validateAbsolutePath(projectPath);
  if (!pathValidation.isValid) {
    const platform = os.platform();
    const examplePath = platform === 'win32' 
      ? 'C:\\Users\\YourName\\Projects\\MyProject'
      : '/Users/yourname/projects/myproject';

    const errorGuide = `# ❌ Invalid Project Path

## Error
${pathValidation.errorMessage}

## Required Format
You MUST provide the **full absolute path** to your project directory.

### Example for ${platform}:
\`${examplePath}\`

### How to get your project path:
1. **VS Code**: Right-click on your project folder → "Copy Path"
2. **Terminal**: Run \`pwd\` (macOS/Linux) or \`cd\` (Windows) in your project directory
3. **File Explorer**: Copy the full path from the address bar

Please retry with the correct absolute path.`;

    return {
      content: [{ type: "text", text: errorGuide }]
    };
  }

  try {
    const logs = await updateAgentsFileWithTemplate(projectPath);

    const successGuide = `# AGENTS.md Updated Successfully ✅

## Update Results
- **Project Path**: ${path.resolve(projectPath)}
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