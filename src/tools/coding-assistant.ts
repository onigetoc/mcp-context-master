// MAY USE PROJECT RULES FOLDER LIKE: .clinerules/ OR .cursor/rules ect.
// https://docs.cursor.com/en/context/rules
// https://docs.cline.bot/features/cline-rules
// OTHER RULES INTERESTING INFOS:
// https://github.com/cannuri/roo-code-dynamic-rules
// 

import { z } from "zod";
import fs from "fs-extra";
import path from "path";

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
    { keys: ["roo code", "roo-code", "roo"], file: ".roo/", type: "extension" },
    { keys: ["cline"], file: ".clinerules", type: "extension" },
    { keys: ["kilo code", "kilo-code", "kilocode"], file: ".kilocode/", type: "extension" },
    { keys: ["github copilot", "copilot"], file: ".github/", type: "extension" },
    { keys: ["claude code"], file: ".claude/", type: "extension" },
    { keys: ["gemini cli"], file: ".gemini/", type: "extension" },
    { keys: ["warp"], file: ".WARP.md", type: "extension" },
    { keys: ["windsurf"], file: ".windsurf/", type: "extension" },
    { keys: ["auggie"], file: ".augment/", type: "extension" },
    { keys: ["opencode"], file: ".opencode/", type: "extension" },
    { keys: ["codex"], file: ".codex/", type: "extension" },
    
    // IDEs (priorité 2)
    { keys: ["cursor"], file: ".cursor/", type: "ide" },
    { keys: ["vs code", "vscode", "visual studio code"], file: ".VSCODE.md", type: "ide" },
    { keys: ["kiro"], file: ".kiro/steering", type: "ide" },
    { keys: ["zed"], file: ".ZED.md", type: "ide" },
    
    // Models (priorité 3)
    { keys: ["gemini"], file: ".gemini/", type: "model" },
    { keys: ["claude"], file: ".claude/", type: "model" },
    { keys: ["gpt"], file: ".OPENAI.md", type: "model" },
    { keys: ["copilot"], file: ".github/", type: "model" },
    { keys: ["qwen"], file: ".qwen/", type: "model" },
    
    // Providers (priorité 4)
    { keys: ["google"], file: ".gemini/", type: "provider" },
    { keys: ["anthropic"], file: ".claude/", type: "provider" },
    { keys: ["openai"], file: ".OPENAI.md", type: "provider" },
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
        if (match) return match.file;
    }

    // Priorité 2: IDE
    if (isValid(info.ide)) {
        const match = findMatch(info.ide!, "ide");
        if (match) return match.file;
    }

    // Priorité 3: Model
    if (isValid(info.model)) {
        const match = findMatch(info.model, "model");
        if (match) return match.file;
    }

    // Priorité 4: Provider
    if (isValid(info.provider)) {
        const match = findMatch(info.provider, "provider");
        if (match) return match.file;
    }

    // fallback final
    return "AGENTS.md";
}

const readAiInfos = async () => {
    const aiInfoPath = path.resolve(process.cwd(), '.context-master', 'ai-infos.json');

    try {
        const fileContent = await fs.readFile(aiInfoPath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        const info = parseInfo(jsonData);

        if (info) {
            const contextFile = getContextFile(info);
            return `Context file to use: ${contextFile}`;
        } else {
            return "Could not parse ai-infos.json.";
        }
    } catch (error: any) {
        return `Error reading or parsing ai-infos.json: ${error.message}`;
    }
};

export const codingAssistantTool = {
    name: "coding_assistant",
    description: "Reads the .context-master/ai-infos.json file to determine the user's current coding assistant.",
    run: readAiInfos
};

export const handleCodingAssistantTool = async (request: any) => {
    const result = await readAiInfos();
    return { content: [{ type: "text", text: result }] };
};