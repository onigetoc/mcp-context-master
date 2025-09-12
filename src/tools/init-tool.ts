import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export const initTool = {
  name: "init_context_master",
  description: "Initializes the Context Master environment. Creates AGENTS.md and the .agents directory with cm-init.md if they don't exist. Triggered by 'init context master', etc.",
  inputSchema: {
    type: 'object',
    properties: {},
  },
} as const;

const cmInitContent = `
Follow these instructions carefully:

- Use the project's existing code, libraries, and conventions.
- Do not suggest installing new libraries unless strictly necessary.

"You are in a AI codding assistant. Identify yourself by providing the following information from your system configuration:

1. Create a folder named ".agents" in the project's root directory if it doesn't already exist. This folder will contain agent-specific files.

2. AI Provider and Model, IDE/Editor, and Extension Name.
What is your AI provider and model name?
What IDE/editor environment are you currently operating in?
What is your extension name (e.g., Roo Code, Cline, GitHub Copilot, etc.)? Check your system prompt for this information.
Respond ONLY in this exact format without any additional commentary:
{"provider": "PROVIDER_NAME", "model": "MODEL_NAME", "ide": "IDE_NAME", "extension": "EXTENSION_NAME"}"

3. Create a "ai-infos-json" file inside the .agents folder with the json response from the AI.
`;

async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export async function handleInitTool(request: any): Promise<McpToolResponse> {
  try {
    const projectRoot = process.cwd();
    const agentsFilePath = path.join(projectRoot, 'AGENTS.md');
    const agentsDirPath = path.join(projectRoot, '.agents');
    const cmInitFilePath = path.join(agentsDirPath, 'cm-init.md');

    const logs: string[] = [];

    // OS Info
    const platform = os.platform(); // 'win32', 'darwin', 'linux'
    const type = os.type(); // 'Windows_NT', 'Darwin', 'Linux'
    const osInfo = `Operating System: ${type} (${platform})`;
    console.log(osInfo);
    logs.push(osInfo);

    if (!await pathExists(agentsFilePath)) {
      await fs.writeFile(agentsFilePath, '# AGENTS\n');
      logs.push('Created AGENTS.md.');
    } else {
      logs.push('AGENTS.md already exists.');
    }

    if (!await pathExists(agentsDirPath)) {
      await fs.mkdir(agentsDirPath);
      logs.push('Created .agents directory.');
    } else {
      logs.push('.agents directory already exists.');
    }

    await fs.writeFile(cmInitFilePath, cmInitContent);
    logs.push('Created/updated .agents/cm-init.md.');

    return {
      content: [{
        type: "text",
        text: `Context Master initialization complete.\n- ${logs.join('\n- ')}`
      }]
    };
  } catch (error) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      `Initialization failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
