// Service to detect and identify the coding assistant being used
// Based on cm-ai-infos.yaml or ai-infos.json configuration

import { z } from "zod";
import fs from "fs-extra";
import path from "path";
import yaml from "js-yaml";
import { ContextMappingHelper } from "../config/context-mappings.js";

// --- Schema Definition ---
const InfoSchema = z.object({
    provider: z.string(),
    model: z.string(),
    ide: z.string().optional(),
    extension: z.string().optional(),
});

// --- Parse configuration with Zod ---
function parseInfo(json: any) {
    const result = InfoSchema.safeParse(json);
    if (!result.success) {
        console.error("❌ Invalid configuration:", result.error.format());
        return null;
    }
    return result.data;
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

            const contextFile = this.getContextFile(info);

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

    /**
     * Find the appropriate context file based on AI assistant configuration
     * @param info - Parsed AI assistant configuration
     * @returns Path to the context file
     */
    private getContextFile(info: z.infer<typeof InfoSchema>): string {
        // Priority matching: Extension > IDE > Model > Provider
        let match = null;
        
        if (ContextMappingHelper.isValid(info.extension)) {
            match = ContextMappingHelper.findMatch(info.extension!, "extension");
        }
        
        if (!match && ContextMappingHelper.isValid(info.ide)) {
            match = ContextMappingHelper.findMatch(info.ide!, "ide");
        }
        
        if (!match && ContextMappingHelper.isValid(info.model)) {
            match = ContextMappingHelper.findMatch(info.model, "model");
        }
        
        if (!match && ContextMappingHelper.isValid(info.provider)) {
            match = ContextMappingHelper.findMatch(info.provider, "provider");
        }

        if (match) {
            return ContextMappingHelper.buildContextFilePath(match);
        }

        return "AGENTS.md";
    }
}
