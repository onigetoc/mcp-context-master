import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { ProjectAnalyzer } from '../services/analyzer.service.js';
import { SearchService } from '../services/search.service.js';
import { DownloaderService } from '../services/downloader.service.js';
import { PathResolverService } from '../services/path-resolver.service.js';
import { updateKnowledgeManifest } from '../services/registry.service.js';
import { debugLog } from '../utils/logger.js';
// We'll implement the coding assistant detection inline since we need the logic, not the MCP tool
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import axios from 'axios';
import yaml from 'js-yaml';
import { z } from 'zod';

export const setupProjectContextTool = {
  name: "setup_project_context",
  description: "Initialize and setup Context Master for a project. Use when user says init context master, setup context master, or /cm-ai-infos or /cm-setup. Creates .context-master directory, downloads templates from GitHub, analyzes project dependencies, and downloads documentation for important libraries. IMPORTANT: Always provide the absolute path to the user's project directory as projectPath parameter.",
  inputSchema: {
    type: 'object',
    properties: {
      projectPath: {
        type: 'string',
        description: 'REQUIRED: Absolute path to the user\'s project directory (e.g., C:\\Users\\Name\\projects\\my-app or /home/user/projects/my-app). The MCP server cannot automatically detect the user\'s project location - you must provide it explicitly.'
      },
      maxDependencies: {
        type: 'number',
        description: 'Maximum number of dependencies to search for (default: 20)',
        default: 20,
        minimum: 10,
        maximum: 50
      },
    },
    required: []
  }
} as const;



// Schema for AI info validation
const InfoSchema = z.object({
  provider: z.string(),
  model: z.string(),
  ide: z.string().optional(),
  extension: z.string().optional(),
});

// Context mappings from coding-assistant.ts
const contextMappings = [
  // Extensions (priorité 1)
  { keys: ["roo code", "roo-code", "roo"], ruleFile: "ROO.md", contextDir: ".roo/", type: "extension", agentsMD: true },
  { keys: ["cline"], ruleFile: ".clinerules", contextDir: ".cline/", type: "extension", agentsMD: true },
  { keys: ["kilo code", "kilo-code", "kilocode"], ruleFile: "KILOCODE.md", contextDir: ".kilocode/", type: "extension", agentsMD: true },
  { keys: ["github copilot", "copilot"], ruleFile: ".github/copilot-instructions.md", contextDir: ".github/", type: "extension", agentsMD: true },
  { keys: ["claude code"], ruleFile: "CLAUDE.md", contextDir: ".claude/", type: "extension", agentsMD: true },
  { keys: ["gemini cli"], ruleFile: "GEMINI.md", contextDir: ".gemini/", type: "extension", agentsMD: true },
  { keys: ["warp"], ruleFile: "WARP.md", contextDir: ".warp/", type: "extension", agentsMD: false },
  { keys: ["windsurf"], ruleFile: "WINDSURF.md", contextDir: ".windsurf/", type: "extension", agentsMD: true },
  { keys: ["auggie"], ruleFile: "AUGMENT.md", contextDir: ".augment/", type: "extension", agentsMD: true },
  { keys: ["opencode"], ruleFile: "OPENCODE.md", contextDir: ".opencode/", type: "extension", agentsMD: true },
  { keys: ["codex"], ruleFile: "CODEX.md", contextDir: ".codex/", type: "extension", agentsMD: true },

  // IDEs (priorité 2)
  { keys: ["cursor"], ruleFile: ".cursorrules", contextDir: ".cursor/", type: "ide", agentsMD: true },
  { keys: ["vs code", "vscode", "visual studio code"], ruleFile: "VSCODE.md", contextDir: ".vscode/", type: "ide", agentsMD: true },
  { keys: ["kiro"], ruleFile: "context-master-instructions.md", contextDir: ".kiro/steering/", type: "ide", agentsMD: false },
  { keys: ["zed"], ruleFile: "ZED.md", contextDir: ".zed/", type: "ide", agentsMD: true },

  // Models (priorité 3)
  { keys: ["gemini"], ruleFile: "GEMINI.md", contextDir: ".gemini/", type: "model", agentsMD: true },
  { keys: ["claude"], ruleFile: "CLAUDE.md", contextDir: ".claude/", type: "model", agentsMD: true },
  { keys: ["gpt"], ruleFile: "OPENAI.md", contextDir: ".openai/", type: "model", agentsMD: true },
  { keys: ["copilot"], ruleFile: "copilot-instructions.md", contextDir: ".github/", type: "model", agentsMD: true },
  { keys: ["qwen"], ruleFile: "QWEN.md", contextDir: ".qwen/", type: "model", agentsMD: true },

  // Providers (priorité 4)
  { keys: ["google"], ruleFile: "GEMINI.md", contextDir: ".gemini/", type: "provider", agentsMD: true },
  { keys: ["anthropic"], ruleFile: "CLAUDE.md", contextDir: ".claude/", type: "provider", agentsMD: true },
  { keys: ["openai"], ruleFile: "OPENAI.md", contextDir: ".openai/", type: "provider", agentsMD: true },
];

async function detectCodingAssistantAndGetContextFile(projectPath: string): Promise<{ contextFile: string | null, shouldUpdateAgentsMD: boolean, logs: string[] }> {
  const logs: string[] = [];
  const yamlPath = path.join(projectPath, '.context-master', 'cm-ai-infos.yaml');
  
  try {
    if (!await fs.pathExists(yamlPath)) {
      logs.push(`No cm-ai-infos.yaml found, will only update AGENTS.md`);
      return { contextFile: null, shouldUpdateAgentsMD: true, logs };
    }

    const fileContent = await fs.readFile(yamlPath, 'utf-8');
    const data = yaml.load(fileContent);
    const result = InfoSchema.safeParse(data);
    
    if (!result.success) {
      logs.push(`Invalid cm-ai-infos.yaml format, will only update AGENTS.md`);
      return { contextFile: null, shouldUpdateAgentsMD: true, logs };
    }

    const info = result.data;
    logs.push(`Detected coding assistant: provider=${info.provider}, model=${info.model}, ide=${info.ide}, extension=${info.extension}`);

    // Helper functions
    const isValid = (val?: string) => val && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";
    const findMatch = (value: string, type: string) => {
      const lowerValue = value.toLowerCase();
      return contextMappings.find(mapping => 
        mapping.type === type && 
        mapping.keys.some(key => lowerValue.includes(key))
      );
    };

    // Priority matching: Extension > IDE > Model > Provider
    let match = null;
    
    if (isValid(info.extension)) {
      match = findMatch(info.extension!, "extension");
      if (match) logs.push(`Found extension match: ${info.extension} -> ${match.contextDir}${match.ruleFile}`);
    }
    
    if (!match && isValid(info.ide)) {
      match = findMatch(info.ide!, "ide");
      if (match) logs.push(`Found IDE match: ${info.ide} -> ${match.contextDir}${match.ruleFile}`);
    }
    
    if (!match && isValid(info.model)) {
      match = findMatch(info.model, "model");
      if (match) logs.push(`Found model match: ${info.model} -> ${match.contextDir}${match.ruleFile}`);
    }
    
    if (!match && isValid(info.provider)) {
      match = findMatch(info.provider, "provider");
      if (match) logs.push(`Found provider match: ${info.provider} -> ${match.contextDir}${match.ruleFile}`);
    }

    if (match) {
      const contextFile = match.contextDir ? path.join(match.contextDir, match.ruleFile).replace(/\\/g, '/') : match.ruleFile;
      return { 
        contextFile, 
        shouldUpdateAgentsMD: match.agentsMD, 
        logs 
      };
    } else {
      logs.push(`No specific context mapping found, will only update AGENTS.md`);
      return { contextFile: null, shouldUpdateAgentsMD: true, logs };
    }

  } catch (error) {
    logs.push(`Error reading cm-ai-infos.yaml: ${error instanceof Error ? error.message : String(error)}, will only update AGENTS.md`);
    return { contextFile: null, shouldUpdateAgentsMD: true, logs };
  }
}

async function updateContextFile(projectPath: string, contextFile: string, contextMasterInstructions: string): Promise<string[]> {
  const logs: string[] = [];
  const fullPath = path.resolve(projectPath);
  const contextFilePath = path.join(fullPath, contextFile);
  
  // Ensure the directory exists
  const contextDir = path.dirname(contextFilePath);
  await fs.ensureDir(contextDir);
  logs.push(`Ensured directory exists: ${contextDir}`);
  
  // Check if context file exists
  const contextFileExists = await fs.pathExists(contextFilePath);
  
  if (!contextFileExists) {
    // Create new context file with Context Master instructions
    await fs.writeFile(contextFilePath, contextMasterInstructions, 'utf8');
    logs.push(`Created new context file: ${contextFile}`);
  } else {
    // Read existing context file content
    const existingContent = await fs.readFile(contextFilePath, 'utf8');
    
    // Check if Context Master instructions already exist
    const startMarker = '<!-- START: CONTEXT-MASTER -->';
    const endMarker = '<!-- END: CONTEXT-MASTER -->';
    
    const startIndex = existingContent.indexOf(startMarker);
    const endIndex = existingContent.indexOf(endMarker);
    
    let updatedContent: string;
    
    if (startIndex !== -1 && endIndex !== -1) {
      // Replace existing Context Master section
      const beforeSection = existingContent.substring(0, startIndex);
      const afterSection = existingContent.substring(endIndex + endMarker.length);
      updatedContent = beforeSection + contextMasterInstructions + afterSection;
      logs.push(`Replaced existing Context Master section in ${contextFile}`);
    } else if (startIndex !== -1) {
      // Found start marker but no end marker - replace from start marker to end of file
      const beforeSection = existingContent.substring(0, startIndex);
      updatedContent = beforeSection + contextMasterInstructions;
      logs.push(`Updated Context Master section from start marker to end of file in ${contextFile}`);
    } else {
      // No existing Context Master section - append to end
      updatedContent = existingContent + '\n\n' + contextMasterInstructions;
      logs.push(`Appended Context Master instructions to existing ${contextFile}`);
    }
    
    // Write updated content back to file
    await fs.writeFile(contextFilePath, updatedContent, 'utf8');
  }

  logs.push(`Context file updated successfully: ${contextFilePath}`);
  return logs;
}

async function updateAgentsFileWithTemplate(projectPath: string): Promise<string[]> {
  const logs: string[] = [];
  const fullPath = path.resolve(projectPath);
  
  // Check if .context-master directory exists
  const contextMasterDir = path.join(fullPath, '.context-master');
  if (!await fs.pathExists(contextMasterDir)) {
    logs.push(`Context Master directory not found, skipping AGENTS.md update`);
    return logs;
  }

  // Read the template from .context-master directory
  const templatePath = path.join(contextMasterDir, 'cm-instructions.md');
  if (!await fs.pathExists(templatePath)) {
    logs.push(`Template file not found: ${templatePath}, skipping AGENTS.md update`);
    return logs;
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
    const startMarker = '<!-- START: CONTEXT-MASTER -->';
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

async function initializeContextMaster(projectPath: string): Promise<{ logs: string[], dependencies: string[], projectType: string }> {
  const fullPath = path.resolve(projectPath);
  const logs: string[] = [];

  // Check if project exists
  if (!await fs.pathExists(fullPath)) {
    throw new Error(`Project path does not exist: ${fullPath}`);
  }

  // Create .context-master directory
  const contextMasterDir = path.join(fullPath, '.context-master');
  await fs.ensureDir(contextMasterDir);
  logs.push(`Created .context-master directory: ${contextMasterDir}`);

  // Download templates from GitHub
  const githubBaseUrl = 'https://raw.githubusercontent.com/Onigetoc/mcp-context-master/main/templates';
  const templateFiles = [
    'cm-ai-infos.md',
    'cm-analyze.md',
    'cm-status.md',
    'cm-instructions.md'
  ];

  const downloadedTemplates: string[] = [];

  for (const templateFile of templateFiles) {
    try {
      const response = await axios.get(`${githubBaseUrl}/${templateFile}`);
      
      // All template files go to .context-master directory
      const templatePath = path.join(contextMasterDir, templateFile);
      await fs.writeFile(templatePath, response.data, 'utf8');
      logs.push(`Downloaded template: ${templateFile}`);
      
      downloadedTemplates.push(templateFile);
    } catch (error) {
      logs.push(`Failed to download template ${templateFile}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Create commands directory and download command files
  const commandsDir = path.join(contextMasterDir, 'commands');
  await fs.ensureDir(commandsDir);
  logs.push(`Created commands directory: ${commandsDir}`);

  const commandFiles = [
    'cm-commands.md',
    'command-dispatcher.md'
  ];

  const downloadedCommands: string[] = [];

  for (const commandFile of commandFiles) {
    try {
      // Try to copy from local templates first
      const localTemplatePath = path.join(fullPath, 'templates', 'commands', commandFile);
      const commandPath = path.join(commandsDir, commandFile);

      if (await fs.pathExists(localTemplatePath)) {
        await fs.copy(localTemplatePath, commandPath);
        downloadedCommands.push(commandFile);
        logs.push(`Copied local command: ${commandFile}`);
      } else {
        // Fallback to GitHub download
        const response = await axios.get(`${githubBaseUrl}/commands/${commandFile}`);
        await fs.writeFile(commandPath, response.data, 'utf8');
        downloadedCommands.push(commandFile);
        logs.push(`Downloaded command: ${commandFile}`);
      }
    } catch (error) {
      logs.push(`Failed to get command ${commandFile}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Create knowledge directory and initial manifest
  const knowledgeDir = path.join(contextMasterDir, 'knowledge');
  await fs.ensureDir(knowledgeDir);
  logs.push(`Created knowledge directory: ${knowledgeDir}`);

  // Create initial knowledge-manifest.yaml
  const manifestPath = path.join(knowledgeDir, 'knowledge-manifest.yaml');
  const initialManifest = `lastUpdated: '${new Date().toISOString()}'
files:
`;
  await fs.writeFile(manifestPath, initialManifest, 'utf8');
  logs.push(`Created initial knowledge-manifest.yaml`);

  // Create initial cm-ai-infos.yaml placeholder (only if neither YAML nor JSON exists)
  const yamlInfosPath = path.join(contextMasterDir, 'cm-ai-infos.yaml');
  const jsonInfosPath = path.join(contextMasterDir, 'ai-infos.json');
  const yamlExists = await fs.pathExists(yamlInfosPath);
  const jsonExists = await fs.pathExists(jsonInfosPath);
  
  if (!yamlExists && !jsonExists) {
    const initialAiInfos = `provider: UNKNOWN
model: UNKNOWN
ide: UNKNOWN
extension: UNKNOWN
`;
    await fs.writeFile(yamlInfosPath, initialAiInfos, 'utf8');
    logs.push(`Created initial cm-ai-infos.yaml placeholder`);
  } else if (yamlExists) {
    logs.push(`cm-ai-infos.yaml already exists, preserving existing configuration`);
  } else {
    logs.push(`ai-infos.json already exists, preserving existing configuration (consider migrating to cm-ai-infos.yaml)`);
  }

  // Detect coding assistant and update appropriate context files
  try {
    // Read the template content
    const templatePath = path.join(contextMasterDir, 'cm-instructions.md');
    let contextMasterInstructions = '';
    
    if (await fs.pathExists(templatePath)) {
      contextMasterInstructions = await fs.readFile(templatePath, 'utf8');
      logs.push(`Read template from: ${templatePath}`);
    } else {
      logs.push(`Template file not found: ${templatePath}, skipping context file updates`);
    }

    if (contextMasterInstructions) {
      // Detect which coding assistant/IDE the user is using
      const { contextFile, shouldUpdateAgentsMD, logs: detectionLogs } = await detectCodingAssistantAndGetContextFile(fullPath);
      logs.push(...detectionLogs);

      // Update IDE-specific context file if detected
      if (contextFile) {
        const contextLogs = await updateContextFile(fullPath, contextFile, contextMasterInstructions);
        logs.push(...contextLogs);
      }

      // Update AGENTS.md if required by the detected assistant or as fallback
      if (shouldUpdateAgentsMD || !contextFile) {
        const agentsLogs = await updateAgentsFileWithTemplate(fullPath);
        logs.push(...agentsLogs);
      } else {
        logs.push(`Skipping AGENTS.md update as ${contextFile} was updated instead`);
      }
    }
  } catch (error) {
    logs.push(`Failed to update context files: ${error instanceof Error ? error.message : String(error)}`);
    // Fallback to AGENTS.md update
    try {
      const agentsLogs = await updateAgentsFileWithTemplate(fullPath);
      logs.push(...agentsLogs);
    } catch (fallbackError) {
      logs.push(`Fallback AGENTS.md update also failed: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`);
    }
  }

  // Analyze project type and dependencies
  const packageJsonPath = path.join(fullPath, 'package.json');
  const hasPackageJson = await fs.pathExists(packageJsonPath);

  let projectType = 'Unknown';
  let dependencies: string[] = [];

  if (hasPackageJson) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      projectType = 'Node.js/JavaScript';
      dependencies = [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.devDependencies || {})
      ];
      logs.push(`Found ${dependencies.length} dependencies in package.json`);
    } catch (error) {
      logs.push(`Error reading package.json: ${error instanceof Error ? error.message : String(error)}`);
    }
  } else {
    logs.push('No package.json found - project type unknown');
  }

  return { logs, dependencies, projectType };
}



export async function handleSetupProjectContextTool(request: any): Promise<McpToolResponse> {
  const { projectPath, maxDependencies = 10 } = request.params.arguments || {};

  if (!projectPath) {
    return {
      content: [{
        type: "text",
        text: `# ❌ Missing Required Parameter: projectPath

## Error
The projectPath parameter is REQUIRED. MCP servers run in their own directory and cannot automatically detect the user's project location.

## Required Usage
\`\`\`typescript
setup_project_context(
  "C:\\\\Users\\\\Name\\\\projects\\\\my-app",  // Windows
  20  // maxDependencies (optional)
)

// Or on Linux/Mac:
setup_project_context(
  "/home/user/projects/my-app",
  20
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

  // Use PathResolverService to intelligently resolve the project path
  const pathResolver = new PathResolverService();
  let fullPath: string;
  
  try {
    // PathResolverService will validate the provided path
    fullPath = await pathResolver.resolveProjectPath(projectPath, true, {
      toolName: 'setup_project_context',
      maxDependencies,
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
3. Check that the directory contains a valid project (package.json, etc.)
4. Verify path format matches your OS:
   - Windows: C:\\\\Users\\\\Name\\\\projects\\\\my-app
   - Linux/Mac: /home/user/projects/my-app`
      }]
    };
  }

  try {
    // 1. Initialize Context Master (create directory, download templates, update AGENTS.md)
    const { logs: initLogs, dependencies, projectType } = await initializeContextMaster(fullPath);
    debugLog('Context Master initialization complete.', initLogs);

    // 2. If no dependencies found, return initialization result only
    if (dependencies.length === 0) {
      const initGuide = `# Context Master Initialization Complete

## Setup Results
- **Project Path**: ${path.resolve(projectPath)}
- **Project Type**: ${projectType}
- **Dependencies Found**: 0
- **Templates Downloaded**: Check .context-master directory
- **Commands Downloaded**: Check .context-master/commands directory
- **Knowledge Directory**: .context-master/knowledge created
- **Initial Files**: knowledge-manifest.yaml and cm-ai-infos.yaml created

## Initialization Logs
${initLogs.map(log => `- ${log}`).join('\n')}

## Available Commands
Use these slash commands to interact with Context Master:
- \\\`/cm-help\\\` - Show all available commands
- \\\`/cm-analyze\\\` - Analyze project dependencies
- \\\`/cm-status\\\` - Show current context status

## Next Steps
1. Update \\\`.context-master/cm-ai-infos.yaml\\\` with your AI assistant information
2. Add context for specific libraries using: \\\`add_project_context\\\` with libraryName: "[library-name]"
3. Check your updated AGENTS.md file for Context Master integration

---
**Context Master is ready!**`;

      return {
        content: [{ type: "text", text: initGuide }]
      };
    }

    // 3. Execute dependency analysis and context gathering
    const analyzer = new ProjectAnalyzer();
    const searcher = new SearchService();
    const downloader = new DownloaderService();

    const projectInfo = await analyzer.analyze(fullPath);
    if (!projectInfo) {
      throw new Error('Could not determine project type or dependencies');
    }

    let dependenciesToSearch = projectInfo.dependencies.slice(0, maxDependencies);
    const searchResults = await searcher.searchDependencies(dependenciesToSearch, projectInfo.type === 'node', undefined, undefined);

    const docsPath = path.join(fullPath, '.context-master', 'knowledge');
    await downloader.ensureDocsFolder(docsPath);
    const downloadedFiles = await downloader.downloadDocumentation(searchResults, docsPath, true);

    if (downloadedFiles.length > 0) {
      await updateKnowledgeManifest();
      
      // Nettoyage final pour s'assurer qu'il n'y a pas de doublons
      try {
        const { CleanupService } = await import('../services/cleanup.service.js');
        const cleanupService = new CleanupService();
        const globalCleanedFiles = await cleanupService.cleanupAllOldKnowledgeFiles(docsPath, 1);
        if (globalCleanedFiles.length > 0) {
          debugLog(`Setup cleanup: Removed ${globalCleanedFiles.length} additional old files`);
        }
      } catch (cleanupError) {
        debugLog(`Setup cleanup warning: ${cleanupError instanceof Error ? cleanupError.message : String(cleanupError)}`);
      }
    }

    // 4. Generate comprehensive result
    const successGuide = `# Context Master Setup Complete ✅

## Initialization Results
${initLogs.map(log => `- ${log}`).join('\n')}

## Project Analysis
- **Project Type**: ${projectInfo.type}
- **Total Dependencies**: ${projectInfo.dependencies.length}
- **Analyzed Dependencies**: ${dependenciesToSearch.length}

## Documentation Downloaded
${downloadedFiles.length > 0 ? downloadedFiles.map(file => `- ${file}`).join('\n') : 'No documentation downloaded'}

## Search Results Summary
${searchResults.map(result => `- **${result.originalPackageName}**: ${result.repoName} - ${result.url}`).join('\n')}

## Created/Updated Files
- **Templates**: cm-ai-infos.md, cm-analyze.md, cm-status.md, cm-instructions.md
- **Commands**: cm-commands.md, command-dispatcher.md  
- **Knowledge**: knowledge-manifest.yaml (updated with new files)
- **Configuration**: cm-ai-infos.yaml (configured for your coding assistant)
- **Context Files**: Updated IDE-specific files and/or AGENTS.md with Context Master instructions

## Available Commands
Use these slash commands to interact with Context Master:
- \\\`/cm-help\\\` - Show all available commands
- \\\`/cm-analyze\\\` - Analyze project dependencies  
- \\\`/cm-status\\\` - Show current context status
- \\\`/cm-download\\\` - Download high-priority documentation
- \\\`/cm-clean\\\` - Clean up downloaded documentation

## Available MCP Tools
1. **add_project_context** - Download documentation for additional libraries
2. **list_available_contexts** - See what documentation is available
3. **read_specific_context** - Read downloaded documentation

## Next Steps
1. Review the updated AGENTS.md file for Context Master integration
2. Update cm-ai-infos.yaml with your AI assistant details

---
**Context Master is fully configured and ready to use!**`;

    return {
      content: [{ type: "text", text: successGuide }]
    };

  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Context Master setup failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}