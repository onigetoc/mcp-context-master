import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { ProjectAnalyzer } from '../services/analyzer.service.js';
import { SearchService } from '../services/search.service.js';
import { DownloaderService } from '../services/downloader.service.js';
import { PathResolverService } from '../services/path-resolver.service.js';
import { updateContextManifest } from '../services/registry.service.js';
import { debugLog } from '../utils/logger.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import axios from 'axios';

export const setupProjectContextTool = {
  name: "setup_project_context",
  description: "Initialize and setup Context Master for a project. Use when user says init context master, setup context master, or /cm-init or /cm-setup. Creates .context-master directory, downloads templates from GitHub, analyzes project dependencies, and downloads documentation for important libraries. Automatically detects the current project directory.",
  inputSchema: {
    type: 'object',
    properties: {
      projectPath: {
        type: 'string',
        description: 'Optional project directory path. If not provided, automatically detects the current working directory.'
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
  const templatePath = path.join(contextMasterDir, 'context-master-agents-prompt.md');
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
    'cm-init.md',
    'cm-analyze.md',
    'cm-status.md',
    'context-master-agents-prompt.md'
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

  // Create context directory and initial manifest
  const contextDir = path.join(contextMasterDir, 'context');
  await fs.ensureDir(contextDir);
  logs.push(`Created context directory: ${contextDir}`);

  // Create initial context-manifest.yaml
  const manifestPath = path.join(contextDir, 'context-manifest.yaml');
  const initialManifest = `lastUpdated: '${new Date().toISOString()}'
files:
`;
  await fs.writeFile(manifestPath, initialManifest, 'utf8');
  logs.push(`Created initial context-manifest.yaml`);

  // Create initial ai-infos.json placeholder
  const aiInfosPath = path.join(contextMasterDir, 'ai-infos.json');
  const initialAiInfos = {
    provider: "UNKNOWN",
    model: "UNKNOWN",
    ide: "UNKNOWN",
    extension: "UNKNOWN"
  };
  await fs.writeFile(aiInfosPath, JSON.stringify(initialAiInfos, null, 2), 'utf8');
  logs.push(`Created initial ai-infos.json placeholder`);

  // Update AGENTS.md with Context Master instructions
  try {
    const agentsLogs = await updateAgentsFileWithTemplate(fullPath);
    logs.push(...agentsLogs);
  } catch (error) {
    logs.push(`Failed to update AGENTS.md: ${error instanceof Error ? error.message : String(error)}`);
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

  // Use PathResolverService to intelligently resolve the project path
  const pathResolver = new PathResolverService();
  let fullPath: string;
  
  try {
    // PathResolverService will use process.cwd() if projectPath is undefined or invalid
    fullPath = await pathResolver.resolveProjectPath(projectPath, true, {
      toolName: 'setup_project_context',
      maxDependencies,
      providedPath: projectPath || 'none (auto-detect)'
    });
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `# ❌ Project Path Resolution Failed

## Error
Could not resolve project directory: ${error instanceof Error ? error.message : String(error)}

## Details
- **Provided Path**: ${projectPath || 'none (auto-detecting)'}
- **Current Working Directory**: ${process.cwd()}
- **Platform**: ${os.platform()}

## Troubleshooting
1. Ensure you're running this command from your project directory
2. If you provided a path, verify it exists and is accessible
3. Check that the directory contains a valid project (package.json, etc.)

The tool will automatically use your current working directory if no path is provided.`
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
- **Context Directory**: .context-master/context created
- **Initial Files**: context-manifest.yaml and ai-infos.json created

## Initialization Logs
${initLogs.map(log => `- ${log}`).join('\n')}

## Available Commands
Use these slash commands to interact with Context Master:
- \\\`/cm-help\\\` - Show all available commands
- \\\`/cm-analyze\\\` - Analyze project dependencies
- \\\`/cm-status\\\` - Show current context status

## Next Steps
1. Update \\\`.context-master/ai-infos.json\\\` with your AI assistant information
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

    const docsPath = path.join(fullPath, '.context-master', 'context');
    await downloader.ensureDocsFolder(docsPath);
    const downloadedFiles = await downloader.downloadDocumentation(searchResults, docsPath, true);

    if (downloadedFiles.length > 0) {
      await updateContextManifest();
      
      // Nettoyage final pour s'assurer qu'il n'y a pas de doublons
      try {
        const { CleanupService } = await import('../services/cleanup.service.js');
        const cleanupService = new CleanupService();
        const globalCleanedFiles = await cleanupService.cleanupAllOldContextFiles(docsPath, 1);
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
- **Templates**: cm-init.md, cm-analyze.md, cm-status.md, context-master-agents-prompt.md
- **Commands**: cm-commands.md, command-dispatcher.md  
- **Context**: context-manifest.yaml (updated with new files)
- **Configuration**: ai-infos.json (placeholder - needs update)
- **AGENTS.md**: Created or updated with Context Master instructions

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
2. Update ai-infos.json with your AI assistant details

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