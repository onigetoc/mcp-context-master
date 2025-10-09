// MAY USE PROJECT RULES FOLDER LIKE: .clinerules/ OR .cursor/rules ect.
// https://docs.cursor.com/en/context/rules
// https://docs.cline.bot/features/cline-rules
// OTHER RULES INTERESTING INFOS:
// https://github.com/cannuri/roo-code-dynamic-rules
// 

import { z } from "zod";
import fs from "fs-extra";
import path from "path";
import yaml from "js-yaml";

// --- 1. Définir le schéma attendu ---
const InfoSchema = z.object({
    provider: z.string(),
    model: z.string(),
    ide: z.string().optional(),
    extension: z.string().optional(),
});

// --- 2. Mapping robuste avec includes (case-insensitive) ---
const contextMappings = [
    // Extensions (priorité 1)
    // Extensions (priorité 1)
    { keys: ["roo code", "roo-code", "roo"], ruleFile: "ROO.md", contextDir: ".roo/", type: "extension", agentsMD: true },
    { keys: ["cline"], ruleFile: ".clinerules", contextDir: ".cline/", type: "extension", agentsMD: true },
    { keys: ["kilo code", "kilo-code", "kilocode"], ruleFile: "KILOCODE.md", contextDir: ".kilocode/", type: "extension", agentsMD: true },
    { keys: ["github copilot", "copilot"], ruleFile: "copilot-instructions.md", contextDir: ".github/", type: "extension", agentsMD: true },
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
    { keys: ["kiro"], ruleFile: "kiro/steering/context-master-instructions.md", contextDir: ".kiro/", type: "ide", agentsMD: false },
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

    // Standard partagé entre plusieurs outils
    { keys: ["agents.md", "agents"], ruleFile: "AGENTS.md", contextDir: null, type: "shared", agentsMD: true },
];

// --- 4. Parse JSON avec Zod ---
function parseInfo(json: any) {
    const result = InfoSchema.safeParse(json);
    if (!result.success) {
        console.error("❌ Invalid JSON:", result.error.format());
        return null;
    }
    return result.data;
}

// --- 5. Trouver le bon fichier de contexte (robuste avec includes) ---
function getContextFile(info: z.infer<typeof InfoSchema>) {
    // helper: Unknown ou vide = inutile
    const isValid = (val?: string) => val && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";
    
    // Helper pour vérifier si une valeur contient une des clés
    const findMatch = (value: string, type: string) => {
        const lowerValue = value.toLowerCase();
        return contextMappings.find(mapping => 
            mapping.type === type && 
            mapping.keys.some(key => lowerValue.includes(key))
        );
    };

    // Priorité 1: Extension
    if (isValid(info.extension)) {
        const match = findMatch(info.extension!, "extension");
        if (match) return match.ruleFile;
    }

    // Priorité 2: IDE
    if (isValid(info.ide)) {
        const match = findMatch(info.ide!, "ide");
        if (match) return match.ruleFile;
    }

    // Priorité 3: Model
    if (isValid(info.model)) {
        const match = findMatch(info.model, "model");
        if (match) return match.ruleFile;
    }

    // Priorité 4: Provider
    if (isValid(info.provider)) {
        const match = findMatch(info.provider, "provider");
        if (match) return match.ruleFile;
    }

    // fallback final
    return "AGENTS.md";
}

const readAiInfos = async () => {
    const yamlPath = path.resolve(process.cwd(), '.context-master', 'cm-ai-infos.yaml');
    const jsonPath = path.resolve(process.cwd(), '.context-master', 'ai-infos.json');

    try {
        let data: any;
        let fileType: string;

        // Priorité au fichier YAML
        if (await fs.pathExists(yamlPath)) {
            const fileContent = await fs.readFile(yamlPath, 'utf-8');
            data = yaml.load(fileContent);
            fileType = 'YAML';
        } else if (await fs.pathExists(jsonPath)) {
            const fileContent = await fs.readFile(jsonPath, 'utf-8');
            data = JSON.parse(fileContent);
            fileType = 'JSON';
        } else {
            return "No configuration file found. Expected cm-ai-infos.yaml or ai-infos.json in .context-master/";
        }

        const info = parseInfo(data);

        if (info) {
            const contextFile = getContextFile(info);
            return `Configuration loaded from ${fileType}. Context file to use: ${contextFile}`;
        } else {
            return `Could not parse configuration file (${fileType}).`;
        }
    } catch (error: any) {
        return `Error reading or parsing configuration: ${error.message}`;
    }
};

export const codingAssistantTool = {
    name: "coding_assistant",
    description: "Reads the .context-master/cm-ai-infos.yaml (or ai-infos.json) file to determine the user's current coding assistant.",
    run: readAiInfos
};

export const handleCodingAssistantTool = async (_request: any) => {
    const result = await readAiInfos();
    return { content: [{ type: "text", text: result }] };
};