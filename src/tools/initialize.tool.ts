import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { PathResolverService } from '../services/path-resolver.service.js';
import { debugLog } from '../utils/logger.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import axios from 'axios';

export const initializeContextMasterTool = {
  name: "initialize_context_master",
  description: "🚨 MANDATORY STEP 1: Initialize Context Master. When user says 'init context master' or '/cm-init', call this tool FIRST, then IMMEDIATELY call setup_project_context. DO NOT ask user for confirmation between steps. DO NOT ask user to create files manually. This tool auto-creates all required files including cm-ai-infos.yaml. CRITICAL: After this tool completes, you MUST call setup_project_context with the same projectPath. No exceptions.",
  inputSchema: {
    type: 'object',
    properties: {
      projectPath: {
        type: 'string',
        description: 'REQUIRED: Absolute path to the user\'s project directory (e.g., C:\\Users\\Name\\projects\\my-app or /home/user/projects/my-app). The MCP server cannot automatically detect the user\'s project location - you must provide it explicitly.'
      }
    },
    required: []
  }
} as const;

async function downloadTemplate(projectPath: string): Promise<{ logs: string[], templatePath: string }> {
  const fullPath = path.resolve(projectPath);
  const logs: string[] = [];

  // Check if project exists
  if (!await fs.pathExists(fullPath)) {
    throw new Error(`Project path does not exist: ${fullPath}`);
  }

  // Create .context-master directory
  const contextMasterDir = path.join(fullPath, '.context-master');
  await fs.ensureDir(contextMasterDir);
  logs.push(`✅ Created .context-master directory: ${contextMasterDir}`);

  // Download cm-ai-infos.md template from GitHub
  const githubBaseUrl = 'https://raw.githubusercontent.com/Onigetoc/mcp-context-master/main/templates';
  const templateFile = 'cm-ai-infos.md';

  try {
    const response = await axios.get(`${githubBaseUrl}/${templateFile}`);
    const templatePath = path.join(contextMasterDir, templateFile);
    await fs.writeFile(templatePath, response.data, 'utf8');
    logs.push(`✅ Downloaded template: ${templateFile}`);
    logs.push(`📄 Template location: ${templatePath}`);

    return { logs, templatePath };
  } catch (error) {
    throw new Error(`Failed to download template ${templateFile}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function handleInitializeContextMasterTool(request: any): Promise<McpToolResponse> {
  const { projectPath } = request.params.arguments || {};

  if (!projectPath) {
    return {
      content: [{
        type: "text",
        text: `# ❌ Missing Required Parameter: projectPath

## Error
The projectPath parameter is REQUIRED. MCP servers run in their own directory and cannot automatically detect the user's project location.

## Required Usage
\`\`\`typescript
initialize_context_master(
  "C:\\\\Users\\\\Name\\\\projects\\\\my-app"  // Windows
)

// Or on Linux/Mac:
initialize_context_master(
  "/home/user/projects/my-app"
)
\`\`\`

## Platform Examples
- **Windows**: \`C:\\\\Users\\\\Name\\\\projects\\\\my-app\`
- **Linux**: \`/home/user/projects/my-app\`
- **Mac**: \`/Users/name/projects/my-app\`

## Note
The AI assistant knows the user's current project directory. You must pass it explicitly as the projectPath parameter.

## Current MCP Server Location
- **MCP Server CWD**: ${process.cwd()}
- **Platform**: ${os.platform()}

This is NOT the user's project directory - you must provide the correct path.`
      }]
    };
  }

  // Use PathResolverService to validate the project path
  const pathResolver = new PathResolverService();
  let fullPath: string;

  try {
    fullPath = await pathResolver.resolveProjectPath(projectPath, false, {
      toolName: 'initialize_context_master',
      providedPath: projectPath
    });
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `# ❌ Project Path Resolution Failed

## Error
Could not resolve project directory: ${error instanceof Error ? error.message : String(error)}

## Details
- **Provided Path**: ${projectPath}
- **MCP Server CWD**: ${process.cwd()}
- **Platform**: ${os.platform()}

## Troubleshooting
1. Verify the provided path exists and is accessible
2. Ensure you're using an absolute path (not relative)
3. Check path format matches your OS:
   - Windows: C:\\\\Users\\\\Name\\\\projects\\\\my-app
   - Linux/Mac: /home/user/projects/my-app`
      }]
    };
  }

  try {
    // Download the template
    const { logs, templatePath } = await downloadTemplate(fullPath);
    debugLog('Context Master initialization started.', logs);

    // Read the template content to show to the LLM
    const templateContent = await fs.readFile(templatePath, 'utf8');

    // Create the YAML file automatically with default values
    const yamlPath = path.join(fullPath, '.context-master', 'cm-ai-infos.yaml');
    const defaultYamlContent = `provider: openai
model: gpt-4
ide: vscode
extension: github copilot
`;
    
    await fs.writeFile(yamlPath, defaultYamlContent, 'utf8');
    logs.push(`✅ Created cm-ai-infos.yaml with default values`);

    // Include the key instructions directly in the response
    const keyInstructions = `
## 🚨 CONTEXT MASTER INSTRUCTIONS FOR THIS CONVERSATION

### MANDATORY EXECUTION SEQUENCE
When user says "init context master":
1. Call \`initialize_context_master("ABSOLUTE_PATH")\` ✅ (DONE)
2. **IMMEDIATELY** call \`setup_project_context("ABSOLUTE_PATH")\` ⚠️ (DO THIS NOW)

### CRITICAL RULES FOR FUTURE USE
- **ALWAYS** provide absolute project path: "${fullPath}"
- **USE FOR**: Specialized libraries (Remotion, Clerk, tRPC, Prisma)
- **SKIP FOR**: Well-known libraries (React, Express, Axios, Lodash)
- **CHECK FIRST**: .context-master/knowledge/ for existing files
- **READ ONCE**: Each context file per conversation

### AVAILABLE TOOLS
- \`add_project_context("library", "${fullPath}", "topic")\` - Download specific library docs
- \`list_available_contexts()\` - See downloaded contexts
- \`read_specific_context("filename")\` - Read context file

### DECISION WORKFLOW
\`\`\`
User asks about library → Already know well? → YES: Answer directly
                      ↓ NO
Already read in conversation? → YES: Use existing knowledge  
                      ↓ NO
Check .context-master/knowledge/ → Exists? → YES: Read once
                      ↓ NO
add_project_context(library, "${fullPath}", topic)
\`\`\`

**Remember these instructions for the rest of this conversation.**
`;

    const initGuide = `# ✅ Context Master Initialization Complete

## Results
${logs.map(log => `${log}`).join('\n')}

## 🚨 MANDATORY NEXT STEP

**YOU MUST NOW call setup_project_context:**

\`\`\`typescript
setup_project_context("${fullPath}")
\`\`\`

**⚠️ DO NOT skip this step. The initialization is incomplete without setup.**

${keyInstructions}

**Call setup_project_context now to finish initialization.**`

    return {
      content: [{ type: "text", text: initGuide }]
    };

  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Context Master initialization failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
