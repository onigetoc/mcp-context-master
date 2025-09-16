
import { z } from "zod";
import fs from "fs-extra";
import path from "path";
import { ErrorCode, type Tool } from '@modelcontextprotocol/sdk/types.js';
import { type ToolHandler, type McpToolResponse } from '../types/mcp-types.js';

// --- 1. Définir le schéma attendu ---
const InfoSchema = z.object({
  provider: z.string(),
  model: z.string(),
  ide: z.string().optional(),
  extension: z.string().optional(),
});

type Info = z.infer<typeof InfoSchema>;

// --- 2. Mapping des extensions / IDEs / Terminals / Providers ---
const contextTargets: Record<string, string> = {
  // Extensions
  "Roo": ".ROO.md",
  "Claude Code": ".CLAUDE.md",
  "GitHub Copilot": ".COPILOT.md",
  "Gemini CLI": ".GEMINI.md",

  // IDEs
  "Cursor": ".CURSOR.md",
  "VS Code": ".VSCODE.md", // fallback si pas d’extension spéciale
  "Kiro": ".KIRO.md",
  "Zed": ".ZED.md",
  "CLine": ".CLINE.md",
  "Kilo Code": ".KILO.md",

  // Terminals
  "Warp": ".WARP.md",

  // Providers fallback
  "Google": ".GEMINI.md",
  "Anthropic": ".CLAUDE.md",
  "OpenAI": ".OPENAI.md",
};

// --- 3. Mapping par modèle (contains) ---
const modelContains: { key: string; file: string }[] = [
  { key: "Gemini", file: ".GEMINI.md" },
  { key: "claude", file: ".CLAUDE.md" },
  { key: "gpt", file: ".OPENAI.md" },
  { key: "copilot", file: ".COPILOT.md" },
];

// --- 4. Parse JSON avec Zod ---
function parseInfo(json: unknown): Info | null {
  const result = InfoSchema.safeParse(json);
  if (!result.success) {
    console.error("❌ Invalid JSON:", result.error.format());
    return null;
  }
  return result.data;
}

// --- 5. Trouver le bon fichier de contexte ---
function getContextFile(info: Info): string {
  // helper: Unknown ou vide = inutile
  const isValid = (val?: string) =>
    val && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";

  // priorité: extension > ide > model (contains) > provider
  if (isValid(info.extension) && contextTargets[info.extension!]) {
    return contextTargets[info.extension!];
  }
  if (isValid(info.ide) && contextTargets[info.ide!]) {
    return contextTargets[info.ide!];
  }

  // Vérifier le model par "contains"
  for (const { key, file } of modelContains) {
    if (info.model.toLowerCase().includes(key.toLowerCase())) {
      return file;
    }
  }

  // fallback par provider
  if (contextTargets[info.provider]) {
    return contextTargets[info.provider];
  }

  // fallback final
  return ".DEFAULT.md";
}

const readAiInfos = async (): Promise<string> => {
    const aiInfoPath = path.resolve(process.cwd(), '.agents', 'ai-infos.json');
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


export const contextSelectorTool: Tool = {
    name: "context_selector",
    description: "Reads the .agents/ai-infos.json file to determine the correct provider context file.",
    inputSchema: {
        type: "object",
        properties: {}
    }
};

export const handleContextSelectorTool: ToolHandler = async (request: any): Promise<McpToolResponse> => {
    const result = await readAiInfos();
    return {
        content: [{
            type: "text",
            text: result
        }]
    };
};
