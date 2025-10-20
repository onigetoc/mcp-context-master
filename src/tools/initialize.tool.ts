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
  description: "First step to initialize Context Master. Downloads the cm-ai-infos.md template from GitHub, creates .context-master directory, and guides the LLM to configure the AI assistant identity. Use when user says 'init context master', 'initialize context master', or '/cm-init' calling the `initialize_context_master` tool to Get AI assistant informations. the LLM should read cm-ai-infos.md and follow its instructions to create cm-ai-infos.yaml, then call setup_project_context. IMPORTANT: Always provide the absolute path to the user's project directory as projectPath parameter.",
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

    const initGuide = `# 🎯 Context Master Initialization - Step 1 Complete

## ✅ Initialization Results
${logs.map(log => `${log}`).join('\n')}

## 📋 Next Steps - IMPORTANT

You must now follow the instructions in the downloaded template to configure the AI assistant identity:

### Task 1: Read the Template
The template has been downloaded to: \`${templatePath}\`

### Task 2: Create Configuration File
Based on the template instructions, you need to:

1. **Identify Your Configuration** from your system:
   - **provider**: Your AI provider (e.g., Anthropic, OpenAI, Google)
   - **model**: Your specific model name (e.g., claude-sonnet-4, gpt-4, gemini-2.0-flash)
   - **ide**: Your IDE/editor (e.g., VS Code, Cursor, Zed, Kiro)
   - **extension**: Your extension name (e.g., Claude Code, Roo Code, Cline, GitHub Copilot)

2. **Create \`.context-master/cm-ai-infos.yaml\`** with this structure:
\`\`\`yaml
provider: YOUR_PROVIDER
model: YOUR_MODEL
ide: YOUR_IDE
extension: YOUR_EXTENSION
\`\`\`

### Task 3: Call Setup Tool
After creating the YAML configuration file, you MUST call:
\`\`\`typescript
setup_project_context("${fullPath}")
\`\`\`

This will complete the Context Master setup by:
- Downloading additional templates
- Analyzing project dependencies
- Downloading documentation for important libraries
- Creating the knowledge manifest
- Updating AGENTS.md

---

## 📄 Template Content

Here is the content of cm-ai-infos.md for your reference:

${templateContent}

---

## ⚠️ Important
Do NOT proceed to other tasks until you have:
1. Created the cm-ai-infos.yaml file with correct values
2. Called setup_project_context with the project path

This ensures Context Master is properly configured for your specific AI assistant.`

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
