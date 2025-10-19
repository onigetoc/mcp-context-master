# Context Master Initialization Workflow

## Overview

Context Master now uses a two-step initialization process to ensure proper configuration before downloading documentation:

1. **Initialize** - Downloads template and creates directory structure
2. **Setup** - Analyzes dependencies and downloads documentation

This approach ensures the AI assistant is properly identified before proceeding with project analysis.

## Why Two Steps?

The two-step process solves several problems:

1. **AI Assistant Detection**: The system needs to know which AI assistant is being used to provide tailored instructions
2. **Configuration Validation**: Ensures proper configuration before downloading potentially large amounts of documentation
3. **User Control**: Gives users a chance to review and customize settings before automatic downloads
4. **Error Prevention**: Catches configuration issues early in the process

## Step 1: Initialize Context Master

### Tool: `initialize_context_master`

**Purpose**: Downloads the configuration template and creates the basic directory structure.

**Usage**:
```typescript
initialize_context_master(
  projectPath: string  // REQUIRED: Absolute path to user's project
)
```

**What it does**:
1. Creates `.context-master` directory in the project root
2. Downloads `cm-ai-infos.md` template from GitHub
3. Returns the template content and instructions for the LLM

**Example**:
```typescript
initialize_context_master("C:\\Users\\Name\\projects\\my-app")
```

**Output**:
- Creates: `.context-master/cm-ai-infos.md`
- Returns: Template content and next-step instructions

### LLM Responsibilities After Initialize

After `initialize_context_master` completes, the LLM must:

1. **Read the template** (`cm-ai-infos.md`)
2. **Identify the AI assistant** from system configuration:
   - Provider (e.g., Anthropic, OpenAI, Google)
   - Model (e.g., claude-sonnet-4, gpt-4, gemini-2.0-flash)
   - IDE (e.g., VS Code, Cursor, Kiro)
   - Extension (e.g., Claude Code, Roo Code, Cline)

3. **Create configuration file** (`.context-master/cm-ai-infos.yaml`):
```yaml
provider: Anthropic
model: claude-sonnet-4
ide: Kiro
extension: Kiro
```

4. **Call setup tool** to complete initialization

## Step 2: Setup Project Context

### Tool: `setup_project_context`

**Purpose**: Analyzes project dependencies and downloads relevant documentation.

**Usage**:
```typescript
setup_project_context(
  projectPath: string,      // REQUIRED: Absolute path to user's project
  maxDependencies?: number  // Optional: Max dependencies to analyze (default: 20)
)
```

**What it does**:
1. Downloads additional templates (cm-analyze.md, cm-status.md, cm-instructions.md)
2. Creates commands directory with command files
3. Creates knowledge directory and manifest
4. Analyzes project dependencies (package.json, requirements.txt)
5. Searches GitHub for relevant repositories
6. Downloads documentation for high-priority libraries
7. Updates AGENTS.md with Context Master instructions

**Example**:
```typescript
setup_project_context("C:\\Users\\Name\\projects\\my-app", 20)
```

**Output**:
- Creates: Multiple template files, commands, knowledge directory
- Downloads: Documentation for important dependencies
- Updates: AGENTS.md with integration instructions

## Complete Workflow Example

### User Request
```
"Initialize Context Master for my project"
```

### LLM Actions

#### Action 1: Initialize
```typescript
// Call initialize tool
const result = await initialize_context_master("C:\\Users\\Name\\projects\\my-app");

// Result includes:
// - Template content
// - Instructions for next steps
```

#### Action 2: Read Template
```typescript
// LLM reads the downloaded cm-ai-infos.md
// Template explains what information is needed
```

#### Action 3: Create Configuration
```typescript
// LLM identifies from system:
// - Provider: Anthropic
// - Model: claude-sonnet-4-20250514
// - IDE: Kiro
// - Extension: Kiro

// Creates .context-master/cm-ai-infos.yaml:
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

#### Action 4: Complete Setup
```typescript
// Call setup tool
const setupResult = await setup_project_context("C:\\Users\\Name\\projects\\my-app");

// Result includes:
// - Dependency analysis
// - Downloaded documentation files
// - Setup completion status
```

## Benefits of This Approach

### 1. Proper Configuration
- Ensures AI assistant is identified before proceeding
- Validates configuration before downloading documentation
- Prevents errors from missing or incorrect configuration

### 2. User Control
- Users can review and customize configuration
- Clear separation between setup steps
- Easy to troubleshoot if issues occur

### 3. Efficient Resource Usage
- Downloads template first (small file)
- Only proceeds with full setup after configuration
- Avoids wasted downloads if configuration is incorrect

### 4. Better Error Handling
- Configuration errors caught early
- Clear error messages at each step
- Easy to retry individual steps

## Error Handling

### Missing Project Path
```
Error: projectPath parameter is REQUIRED
Solution: Provide absolute path to project directory
```

### Invalid Project Path
```
Error: Project path does not exist
Solution: Verify path exists and is accessible
```

### Configuration File Missing
```
Error: cm-ai-infos.yaml not found
Solution: Run initialize_context_master first
```

### Invalid Configuration Format
```
Error: Could not parse configuration file
Solution: Check YAML syntax in cm-ai-infos.yaml
```

## Migration from Old Workflow

### Old Workflow (Single Step)
```typescript
// Old: Everything in one call
setup_project_context("C:\\Users\\Name\\projects\\my-app")
```

### New Workflow (Two Steps)
```typescript
// New: Initialize first
initialize_context_master("C:\\Users\\Name\\projects\\my-app")

// LLM creates cm-ai-infos.yaml

// Then complete setup
setup_project_context("C:\\Users\\Name\\projects\\my-app")
```

### Backward Compatibility

The `setup_project_context` tool still works independently if:
- `.context-master` directory already exists
- `cm-ai-infos.yaml` is already configured

This ensures existing projects continue to work without changes.

## Testing

### Test Initialize Tool
```bash
node test/test-initialize-tool.js
```

### Test Complete Workflow
```bash
# 1. Test initialize
node test/test-initialize-tool.js

# 2. Manually create cm-ai-infos.yaml

# 3. Test setup
node test/test-setup-tool.js
```

## Summary

The two-step initialization process provides:
- ✅ Proper AI assistant identification
- ✅ Configuration validation before downloads
- ✅ Clear separation of concerns
- ✅ Better error handling
- ✅ User control over the process
- ✅ Efficient resource usage

This approach ensures Context Master is properly configured and ready to provide the best possible documentation for your project.
