# Coding Assistant Service Usage Guide

## Overview

The `CodingAssistantService` is an internal service that detects and identifies the AI coding assistant being used. This guide explains how to use it in your tools and potential future enhancements.

## Service Location

**File**: `src/services/coding-assistant.service.ts`

## Why a Service?

The coding assistant detection logic was refactored from a tool to a service because:

1. **Not User-Facing**: Never called directly by users
2. **Internal Utility**: Used by other tools internally
3. **Reusable Logic**: Can be used across multiple tools
4. **Proper Architecture**: Services for internal logic, tools for user actions

## Current API

### Class: `CodingAssistantService`

```typescript
class CodingAssistantService {
  /**
   * Detect AI assistant from configuration
   * @param projectPath - Absolute path to project directory
   * @returns Detection result with assistant info
   */
  async detectAssistant(projectPath: string): Promise<DetectionResult>

  /**
   * Get recommended context file path
   * @param projectPath - Absolute path to project directory
   * @returns Path to recommended context file
   */
  async getContextFilePath(projectPath: string): Promise<string>
}
```

### Types

```typescript
interface DetectionResult {
  success: boolean;
  fileType?: 'YAML' | 'JSON';
  info?: AssistantInfo;
  contextFile?: string;
  error?: string;
}

interface AssistantInfo {
  provider: string;   // e.g., "Anthropic", "OpenAI", "Google"
  model: string;      // e.g., "claude-sonnet-4", "gpt-4"
  ide?: string;       // e.g., "Kiro", "VS Code", "Cursor"
  extension?: string; // e.g., "Kiro", "Claude Code", "Roo Code"
}
```

## Usage Examples

### Example 1: Detect Assistant in Setup Tool

```typescript
// In setup.tool.ts
import { CodingAssistantService } from '../services/coding-assistant.service.js';

export async function handleSetupProjectContextTool(request: any) {
  const { projectPath } = request.params.arguments;
  
  // Detect the AI assistant
  const assistantService = new CodingAssistantService();
  const result = await assistantService.detectAssistant(projectPath);
  
  if (result.success) {
    console.log(`Detected: ${result.info.extension} on ${result.info.ide}`);
    console.log(`Using model: ${result.info.model}`);
    console.log(`Recommended context file: ${result.contextFile}`);
    
    // Use this info to provide tailored instructions
    const instructions = getTailoredInstructions(result.info);
    
    // Continue with setup...
  } else {
    console.warn(`Could not detect assistant: ${result.error}`);
    // Continue with default behavior
  }
}
```

### Example 2: Get Context File Path

```typescript
// In agents-updater.tool.ts
import { CodingAssistantService } from '../services/coding-assistant.service.js';

export async function handleUpdateAgentsTool(request: any) {
  const { projectPath } = request.params.arguments;
  
  // Get the recommended context file
  const assistantService = new CodingAssistantService();
  const contextFile = await assistantService.getContextFilePath(projectPath);
  
  console.log(`Updating context file: ${contextFile}`);
  
  // Update the appropriate file based on assistant
  // e.g., .cursorrules, CLAUDE.md, GEMINI.md, etc.
}
```

### Example 3: Validate Configuration

```typescript
// In add_context.tool.ts
import { CodingAssistantService } from '../services/coding-assistant.service.js';

export async function handleAddProjectContextTool(request: any) {
  const { projectPath } = request.params.arguments;
  
  // Check if configuration exists and is valid
  const assistantService = new CodingAssistantService();
  const result = await assistantService.detectAssistant(projectPath);
  
  if (!result.success) {
    return {
      content: [{
        type: "text",
        text: `⚠️ Configuration not found or invalid.
        
Please run initialize_context_master first to set up your configuration.`
      }]
    };
  }
  
  // Continue with adding context...
}
```

## Configuration File Formats

### YAML Format (Preferred)

**File**: `.context-master/cm-ai-infos.yaml`

```yaml
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

### JSON Format (Legacy)

**File**: `.context-master/ai-infos.json`

```json
{
  "provider": "Anthropic",
  "model": "claude-sonnet-4-20250514",
  "ide": "Kiro",
  "extension": "Kiro"
}
```

**Note**: If both files exist, YAML takes precedence.

## Context File Mapping

The service uses a priority-based mapping system:

### Priority 1: Extension
```typescript
{ keys: ["roo code", "roo-code", "roo"], ruleFile: "ROO.md" }
{ keys: ["cline"], ruleFile: ".clinerules" }
{ keys: ["claude code"], ruleFile: "CLAUDE.md" }
{ keys: ["github copilot", "copilot"], ruleFile: ".github/copilot-instructions.md" }
```

### Priority 2: IDE
```typescript
{ keys: ["cursor"], ruleFile: ".cursorrules" }
{ keys: ["vs code", "vscode"], ruleFile: "VSCODE.md" }
{ keys: ["kiro"], ruleFile: ".kiro/steering/context-master-instructions.md" }
```

### Priority 3: Model
```typescript
{ keys: ["gemini"], ruleFile: "GEMINI.md" }
{ keys: ["claude"], ruleFile: "CLAUDE.md" }
{ keys: ["gpt"], ruleFile: "OPENAI.md" }
```

### Priority 4: Provider
```typescript
{ keys: ["google"], ruleFile: "GEMINI.md" }
{ keys: ["anthropic"], ruleFile: "CLAUDE.md" }
{ keys: ["openai"], ruleFile: "OPENAI.md" }
```

### Fallback
```typescript
// If no match found
return "AGENTS.md"
```

## Error Handling

### Configuration Not Found

```typescript
const result = await assistantService.detectAssistant(projectPath);

if (!result.success) {
  console.error(result.error);
  // "No configuration file found. Expected cm-ai-infos.yaml or ai-infos.json"
}
```

### Invalid Configuration

```typescript
const result = await assistantService.detectAssistant(projectPath);

if (!result.success) {
  console.error(result.error);
  // "Could not parse configuration file (YAML)."
}
```

### Graceful Degradation

```typescript
const result = await assistantService.detectAssistant(projectPath);

if (!result.success) {
  // Use default behavior
  const defaultContextFile = "AGENTS.md";
  console.log(`Using default context file: ${defaultContextFile}`);
}
```

## Future Enhancements

### 1. Configuration Validation

```typescript
class CodingAssistantService {
  /**
   * Validate configuration format and values
   */
  async validateConfiguration(projectPath: string): Promise<ValidationResult> {
    const result = await this.detectAssistant(projectPath);
    
    if (!result.success) {
      return { valid: false, errors: [result.error] };
    }
    
    const errors: string[] = [];
    
    // Check for placeholder values
    if (result.info.provider === 'UNKNOWN') {
      errors.push('Provider is set to UNKNOWN');
    }
    
    if (result.info.model === 'UNKNOWN') {
      errors.push('Model is set to UNKNOWN');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
```

### 2. Auto-Detection from Environment

```typescript
class CodingAssistantService {
  /**
   * Attempt to detect assistant from environment variables
   */
  async detectFromEnvironment(): Promise<AssistantInfo | null> {
    // Check environment variables
    const provider = process.env.AI_PROVIDER;
    const model = process.env.AI_MODEL;
    const ide = process.env.IDE_NAME;
    const extension = process.env.EXTENSION_NAME;
    
    if (provider && model) {
      return { provider, model, ide, extension };
    }
    
    // Check for specific IDE markers
    if (process.env.CURSOR_IDE) {
      return {
        provider: 'Anthropic',
        model: 'claude-sonnet-4',
        ide: 'Cursor',
        extension: 'Cursor'
      };
    }
    
    return null;
  }
}
```

### 3. Configuration Suggestions

```typescript
class CodingAssistantService {
  /**
   * Suggest configuration based on detected environment
   */
  async suggestConfiguration(): Promise<AssistantInfo> {
    // Try auto-detection first
    const detected = await this.detectFromEnvironment();
    if (detected) return detected;
    
    // Return common defaults
    return {
      provider: 'Anthropic',
      model: 'claude-sonnet-4',
      ide: 'VS Code',
      extension: 'Claude Code'
    };
  }
}
```

### 4. Configuration Update

```typescript
class CodingAssistantService {
  /**
   * Update configuration file
   */
  async updateConfiguration(
    projectPath: string,
    info: AssistantInfo
  ): Promise<void> {
    const yamlPath = path.join(projectPath, '.context-master', 'cm-ai-infos.yaml');
    
    const yamlContent = `provider: ${info.provider}
model: ${info.model}
ide: ${info.ide || 'UNKNOWN'}
extension: ${info.extension || 'UNKNOWN'}
`;
    
    await fs.writeFile(yamlPath, yamlContent, 'utf8');
  }
}
```

### 5. Migration from JSON to YAML

```typescript
class CodingAssistantService {
  /**
   * Migrate from JSON to YAML format
   */
  async migrateFromJSON(projectPath: string): Promise<void> {
    const jsonPath = path.join(projectPath, '.context-master', 'ai-infos.json');
    const yamlPath = path.join(projectPath, '.context-master', 'cm-ai-infos.yaml');
    
    // Check if JSON exists and YAML doesn't
    if (await fs.pathExists(jsonPath) && !await fs.pathExists(yamlPath)) {
      const jsonContent = await fs.readJson(jsonPath);
      
      const yamlContent = `provider: ${jsonContent.provider}
model: ${jsonContent.model}
ide: ${jsonContent.ide || 'UNKNOWN'}
extension: ${jsonContent.extension || 'UNKNOWN'}
`;
      
      await fs.writeFile(yamlPath, yamlContent, 'utf8');
      console.log('Migrated from JSON to YAML format');
    }
  }
}
```

## Integration with Tools

### Recommended Pattern

```typescript
// 1. Import the service
import { CodingAssistantService } from '../services/coding-assistant.service.js';

// 2. Create instance
const assistantService = new CodingAssistantService();

// 3. Detect assistant
const result = await assistantService.detectAssistant(projectPath);

// 4. Use the information
if (result.success) {
  // Provide tailored instructions
  const instructions = getTailoredInstructions(result.info);
  
  // Update appropriate context file
  const contextFile = result.contextFile;
  
  // Log for debugging
  console.log(`Detected: ${result.info.extension} on ${result.info.ide}`);
}
```

### Error Handling Pattern

```typescript
const result = await assistantService.detectAssistant(projectPath);

if (!result.success) {
  // Log warning but continue
  console.warn(`Could not detect assistant: ${result.error}`);
  
  // Use default behavior
  const defaultContextFile = "AGENTS.md";
  
  // Or return error to user
  return {
    content: [{
      type: "text",
      text: `⚠️ Configuration not found. Please run initialize_context_master first.`
    }]
  };
}
```

## Testing

### Unit Test Example

```typescript
import { CodingAssistantService } from '../services/coding-assistant.service.js';
import fs from 'fs-extra';
import path from 'path';

describe('CodingAssistantService', () => {
  const testProjectPath = path.join(__dirname, 'test-project');
  const service = new CodingAssistantService();
  
  beforeEach(async () => {
    await fs.ensureDir(path.join(testProjectPath, '.context-master'));
  });
  
  afterEach(async () => {
    await fs.remove(testProjectPath);
  });
  
  it('should detect assistant from YAML', async () => {
    const yamlPath = path.join(testProjectPath, '.context-master', 'cm-ai-infos.yaml');
    await fs.writeFile(yamlPath, `provider: Anthropic
model: claude-sonnet-4
ide: Kiro
extension: Kiro
`, 'utf8');
    
    const result = await service.detectAssistant(testProjectPath);
    
    expect(result.success).toBe(true);
    expect(result.info.provider).toBe('Anthropic');
    expect(result.info.model).toBe('claude-sonnet-4');
  });
  
  it('should return error for missing configuration', async () => {
    const result = await service.detectAssistant(testProjectPath);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('No configuration file found');
  });
});
```

## Summary

The `CodingAssistantService` provides:

- ✅ **AI Assistant Detection**: Identifies which assistant is being used
- ✅ **Context File Mapping**: Recommends appropriate context file
- ✅ **Format Support**: Handles both YAML and JSON
- ✅ **Error Handling**: Graceful degradation on errors
- ✅ **Reusability**: Can be used across multiple tools
- ✅ **Extensibility**: Easy to add new features

This service is a foundation for future enhancements that leverage AI assistant information to provide tailored experiences.
