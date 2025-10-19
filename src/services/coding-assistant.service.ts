// Service to detect and identify the coding assistant being used
// Based on cm-ai-infos.yaml or ai-infos.json configuration

import { z } from "zod";
import fs from "fs-extra";
import path from "path";
import yaml from "js-yaml";

// --- Schema Definition ---
const InfoSchema = z.object({
    provider: z.string(),
    model: z.string(),
    ide: z.string().optional(),
    extension: z.string().optional(),
});

// --- Context Mappings ---
const contextMappings = [
    // Extensions (priority 1)
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

    // IDEs (priority 2)
    { keys: ["cursor"], ruleFile: ".cursorrules", contextDir: ".cursor/", type: "ide", agentsMD: true },
    { keys: ["vs code", "vscode", "visual studio code"], ruleFile: "VSCODE.md", contextDir: ".vscode/", type: "ide", agentsMD: true },
    { keys: ["kiro"], ruleFile: ".kiro/steering/context-master-instructions.md", contextDir: ".kiro/", type: "ide", agentsMD: false },
    { keys: ["zed"], ruleFile: "ZED.md", contextDir: ".zed/", type: "ide", agentsMD: true },

    // Models (priority 3)
    { keys: ["gemini"], ruleFile: "GEMINI.md", contextDir: ".gemini/", type: "model", agentsMD: true },
    { keys: ["claude"], ruleFile: "CLAUDE.md", contextDir: ".claude/", type: "model", agentsMD: true },
    { keys: ["gpt"], ruleFile: "OPENAI.md", contextDir: ".openai/", type: "model", agentsMD: true },
    { keys: ["copilot"], ruleFile: "copilot-instructions.md", contextDir: ".github/", type: "model", agentsMD: true },
    { keys: ["qwen"], ruleFile: "QWEN.md", contextDir: ".qwen/", type: "model", agentsMD: true },

    // Providers (priority 4)
    { keys: ["google"], ruleFile: "GEMINI.md", contextDir: ".gemini/", type: "provider", agentsMD: true },
    { keys: ["anthropic"], ruleFile: "CLAUDE.md", contextDir: ".claude/", type: "provider", agentsMD: true },
    { keys: ["openai"], ruleFile: "OPENAI.md", contextDir: ".openai/", type: "provider", agentsMD: true },

    // Shared standard
    { keys: ["agents.md", "agents"], ruleFile: "AGENTS.md", contextDir: null, type: "shared", agentsMD: true },
];

// --- Parse configuration with Zod ---
function parseInfo(json: any) {
    const result = InfoSchema.safeParse(json);
    if (!result.success) {
        console.error("❌ Invalid configuration:", result.error.format());
        return null;
    }
    return result.data;
}

// --- Find the appropriate context file ---
function getContextFile(info: z.infer<typeof InfoSchema>) {
    const isValid = (val?: string) => val && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";
    
    const findMatch = (value: string, type: string) => {
        const lowerValue = value.toLowerCase();
        return contextMappings.find(mapping => 
            mapping.type === type && 
            mapping.keys.some(key => lowerValue.includes(key))
        );
    };

    const buildPath = (match: typeof contextMappings[0]) => {
        if (!match.contextDir) return match.ruleFile;
        return path.join(match.contextDir, match.ruleFile).replace(/\\/g, '/');
    };

    // Priority 1: Extension
    if (isValid(info.extension)) {
        const match = findMatch(info.extension!, "extension");
        if (match) return buildPath(match);
    }

    // Priority 2: IDE
    if (isValid(info.ide)) {
        const match = findMatch(info.ide!, "ide");
        if (match) return buildPath(match);
    }

    // Priority 3: Model
    if (isValid(info.model)) {
        const match = findMatch(info.model, "model");
        if (match) return buildPath(match);
    }

    // Priority 4: Provider
    if (isValid(info.provider)) {
        const match = findMatch(info.provider, "provider");
        if (match) return buildPath(match);
    }

    return "AGENTS.md";
}

export class CodingAssistantService {
    /**
     * Read and parse the AI assistant configuration
     * @param projectPath - Absolute path to the project directory
     * @returns Configuration info and recommended context file
     */
    async detectAssistant(projectPath: string): Promise<{
        success: boolean;
        fileType?: 'YAML' | 'JSON';
        info?: z.infer<typeof InfoSchema>;
        contextFile?: string;
        error?: string;
    }> {
        const yamlPath = path.join(projectPath, '.context-master', 'cm-ai-infos.yaml');
        const jsonPath = path.join(projectPath, '.context-master', 'ai-infos.json');

        try {
            let data: any;
            let fileType: 'YAML' | 'JSON';

            // Priority to YAML file
            if (await fs.pathExists(yamlPath)) {
                const fileContent = await fs.readFile(yamlPath, 'utf-8');
                data = yaml.load(fileContent);
                fileType = 'YAML';
            } else if (await fs.pathExists(jsonPath)) {
                const fileContent = await fs.readFile(jsonPath, 'utf-8');
                data = JSON.parse(fileContent);
                fileType = 'JSON';
            } else {
                return {
                    success: false,
                    error: "No configuration file found. Expected cm-ai-infos.yaml or ai-infos.json in .context-master/"
                };
            }

            const info = parseInfo(data);

            if (!info) {
                return {
                    success: false,
                    fileType,
                    error: `Could not parse configuration file (${fileType}).`
                };
            }

            const contextFile = getContextFile(info);

            return {
                success: true,
                fileType,
                info,
                contextFile
            };
        } catch (error: any) {
            return {
                success: false,
                error: `Error reading or parsing configuration: ${error.message}`
            };
        }
    }

    /**
     * Get the recommended context file path based on assistant configuration
     * @param projectPath - Absolute path to the project directory
     * @returns Path to the recommended context file
     */
    async getContextFilePath(projectPath: string): Promise<string> {
        const result = await this.detectAssistant(projectPath);
        return result.contextFile || "AGENTS.md";
    }
}
