/**
 * Context mappings for different coding assistants, IDEs, and providers
 * Centralized configuration to avoid duplication
 */

export interface ContextMapping {
  keys: string[];
  ruleFile: string;
  contextDir: string | null;
  type: 'extension' | 'ide' | 'model' | 'provider';
  agentsMD: boolean; 
}

export const contextMappings: ContextMapping[] = [
  // Extensions (priority 1)
  { keys: ["roo code", "roo-code", "roo"], ruleFile: "./ROO.md", contextDir: null, type: "extension", agentsMD: true },
  { keys: ["cline"], ruleFile: ".clinerules", contextDir: "./.cline/", type: "extension", agentsMD: true },
  { keys: ["kilo code", "kilo-code", "kilocode"], ruleFile: "./KILOCODE.md", contextDir: null, type: "extension", agentsMD: true },
  { keys: ["github copilot", "copilot"], ruleFile: "copilot-instructions.md", contextDir: "./.github/", type: "extension", agentsMD: true },
  { keys: ["claude code"], ruleFile: "./CLAUDE.md", contextDir: null, type: "extension", agentsMD: true },
  { keys: ["gemini cli"], ruleFile: "./GEMINI.md", contextDir: null, type: "extension", agentsMD: true },
  { keys: ["kiro", "kiro ai", "kiro ai assistant"], ruleFile: "context-master-instructions.md", contextDir: "./.kiro/steering/", type: "extension", agentsMD: false },
  { keys: ["warp"], ruleFile: "./WARP.md", contextDir: null, type: "extension", agentsMD: false },
  { keys: ["windsurf"], ruleFile: "./WINDSURF.md", contextDir: null, type: "extension", agentsMD: true },
  { keys: ["auggie"], ruleFile: "./AUGMENT.md", contextDir: null, type: "extension", agentsMD: true },
  { keys: ["opencode"], ruleFile: "./OPENCODE.md", contextDir: null, type: "extension", agentsMD: true },
  { keys: ["codex"], ruleFile: "./CODEX.md", contextDir: null, type: "extension", agentsMD: true },
  { keys: ["antigravity"], ruleFile: "./ANTIGRAVITY.md", contextDir: null, type: "extension", agentsMD: true },
  // { keys: ["antigravity"], ruleFile: "./ANTIGRAVITY.md", contextDir: null, type: "extension", agentsMD: true },

  // IDEs (priority 2)
  { keys: ["cursor"], ruleFile: ".cursorrules", contextDir: "./.cursor/", type: "ide", agentsMD: true },
  { keys: ["vs code", "vscode", "visual studio code"], ruleFile: "./VSCODE.md", contextDir: null, type: "ide", agentsMD: true },
  { keys: ["kiro", "kiro ai", "kiro ai assistant"], ruleFile: "context-master-instructions.md", contextDir: "./.kiro/steering/", type: "ide", agentsMD: false },
  { keys: ["zed"], ruleFile: "./ZED.md", contextDir: null, type: "ide", agentsMD: true },

  // Models (priority 3)
  { keys: ["gemini"], ruleFile: "./GEMINI.md", contextDir: null, type: "model", agentsMD: true },
  { keys: ["claude"], ruleFile: "./CLAUDE.md", contextDir: null, type: "model", agentsMD: true },
  { keys: ["gpt"], ruleFile: "./OPENAI.md", contextDir: null, type: "model", agentsMD: true },
  { keys: ["copilot"], ruleFile: "copilot-instructions.md", contextDir: "./.github/", type: "model", agentsMD: true },
  { keys: ["qwen"], ruleFile: "./QWEN.md", contextDir: null, type: "model", agentsMD: true },

  // Providers (priority 4)
  { keys: ["google"], ruleFile: "./GEMINI.md", contextDir: null, type: "provider", agentsMD: true },
  { keys: ["anthropic"], ruleFile: "./CLAUDE.md", contextDir: null, type: "provider", agentsMD: true },
  { keys: ["openai"], ruleFile: "./OPENAI.md", contextDir: null, type: "provider", agentsMD: true },
];

/**
 * Helper functions for context mapping operations
 */
export class ContextMappingHelper {
  static isValid(val?: string): boolean {
    return val !== undefined && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";
  }

  static findMatch(value: string, type: string): ContextMapping | undefined {
    const lowerValue = value.toLowerCase().trim();
    return contextMappings.find(mapping =>
      mapping.type === type &&
      mapping.keys.some(key => {
        const lowerKey = key.toLowerCase();
        // Exact match or contains match
        return lowerValue === lowerKey || lowerValue.includes(lowerKey);
      })
    );
  }

  static buildContextFilePath(match: ContextMapping): string {
    if (!match.contextDir) return match.ruleFile;
    return `${match.contextDir}${match.ruleFile}`.replace(/\\/g, '/');
  }
}