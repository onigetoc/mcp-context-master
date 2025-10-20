import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'zod';
import { ContextMappingHelper, contextMappings } from '../config/context-mappings.js';

// Schema for AI info validation
const InfoSchema = z.object({
  provider: z.string(),
  model: z.string(),
  ide: z.string().optional(),
  extension: z.string().optional(),
});

export interface AssistantDetectionResult {
  contextFile: string | null;
  shouldUpdateAgentsMD: boolean;
  logs: string[];
}

/**
 * Detect coding assistant and determine which context file to update
 * @param projectPath - Absolute path to the project directory
 * @returns Detection result with context file path and update flags
 */
export async function detectCodingAssistantAndGetContextFile(projectPath: string): Promise<AssistantDetectionResult> {
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

    // Priority matching: Extension > IDE > Model > Provider
    let match = null;
    
    if (ContextMappingHelper.isValid(info.extension)) {
      logs.push(`Checking extension: "${info.extension}"`);
      match = ContextMappingHelper.findMatch(info.extension!, "extension");
      if (match) {
        logs.push(`✅ Found extension match: ${info.extension} -> ${ContextMappingHelper.buildContextFilePath(match)}`);
      } else {
        logs.push(`❌ No extension match found for: ${info.extension}`);
      }
    }
    
    if (!match && ContextMappingHelper.isValid(info.ide)) {
      logs.push(`Checking IDE: "${info.ide}"`);
      match = ContextMappingHelper.findMatch(info.ide!, "ide");
      if (match) {
        logs.push(`✅ Found IDE match: ${info.ide} -> ${ContextMappingHelper.buildContextFilePath(match)}`);
      } else {
        logs.push(`❌ No IDE match found for: ${info.ide}`);
      }
    }
    
    if (!match && ContextMappingHelper.isValid(info.model)) {
      logs.push(`Checking model: "${info.model}"`);
      match = ContextMappingHelper.findMatch(info.model, "model");
      if (match) {
        logs.push(`✅ Found model match: ${info.model} -> ${ContextMappingHelper.buildContextFilePath(match)}`);
      } else {
        logs.push(`❌ No model match found for: ${info.model}`);
      }
    }
    
    if (!match && ContextMappingHelper.isValid(info.provider)) {
      logs.push(`Checking provider: "${info.provider}"`);
      match = ContextMappingHelper.findMatch(info.provider, "provider");
      if (match) {
        logs.push(`✅ Found provider match: ${info.provider} -> ${ContextMappingHelper.buildContextFilePath(match)}`);
      } else {
        logs.push(`❌ No provider match found for: ${info.provider}`);
      }
    }

    if (match) {
      const contextFile = ContextMappingHelper.buildContextFilePath(match);
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