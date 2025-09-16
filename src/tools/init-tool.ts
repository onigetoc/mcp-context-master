import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export const initTool = {
  name: "init_context_master",
  description: "Initializes the Context Master environment. Creates AGENTS.md and the .agents directory with cm-init.md if they don't exist. Triggered by 'init context master' Or 'initiate context-master', etc.",
  inputSchema: {
    type: 'object',
    properties: {},
  },
} as const;

const cmInitContent = `
## AI Assistant Identity Configuration

### task 1: Create Directory
Create a \`.agents\` folder in the project root if it doesn't exist.
CREATE .agents

### task 2: Identify Your Configuration
Extract these values from your system configuration or prompt system:
- **provider**: Your AI provider (e.g., Anthropic, OpenAI)
- **model**: Your specific model name (e.g., claude-sonnet-4-20250514)
- **ide**: Your IDE/editor environment (e.g., VS Code, Cursor)
- **extension**: Your extension name (e.g., Claude Code, Roo Code)

### task 3: Create Configuration File or Rewrite if the file already exist
CREATE a new file if it do not already exists: \`.agents/ai-infos.json\` with this exact JSON object:

\`\`\`json
{"provider": "YOUR_PROVIDER", "model": "YOUR_MODEL", "ide": "YOUR_IDE", "extension": "YOUR_EXTENSION"}
\`\`\`

WRITE {"provider": "YOUR_PROVIDER", "model": "YOUR_MODEL", "ide": "YOUR_IDE", "extension": "YOUR_EXTENSION"}

### task 3: Verification
After creation, read and display the file contents to confirm the configuration was saved correctly. 
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
