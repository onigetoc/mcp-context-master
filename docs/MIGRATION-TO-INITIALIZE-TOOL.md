# Migration Guide: Initialize Tool

## Overview

Context Master now uses a two-step initialization process. This guide explains what changed and how it affects existing users.

## What Changed?

### Before (Single Step)
```typescript
// Old: Everything in one call
setup_project_context("C:\\Users\\Name\\projects\\my-app")
```

### After (Two Steps)
```typescript
// New: Initialize first
initialize_context_master("C:\\Users\\Name\\projects\\my-app")

// LLM creates cm-ai-infos.yaml

// Then complete setup
setup_project_context("C:\\Users\\Name\\projects\\my-app")
```

## Do I Need to Migrate?

### ✅ No Migration Needed If:

1. **You already have Context Master configured**
   - `.context-master` directory exists
   - `cm-ai-infos.yaml` or `ai-infos.json` exists
   - You can continue using `setup_project_context` directly

2. **You're adding documentation to existing projects**
   - Use `add_project_context` as before
   - No changes to your workflow

3. **You're using other tools**
   - `list_available_contexts`
   - `read_specific_context`
   - `search_library_advisor`
   - All work exactly as before

### ⚠️ Migration Recommended If:

1. **Your `cm-ai-infos.yaml` has placeholder values**
   ```yaml
   provider: UNKNOWN
   model: UNKNOWN
   ide: UNKNOWN
   extension: UNKNOWN
   ```
   
   **Action**: Update with correct values:
   ```yaml
   provider: Anthropic
   model: claude-sonnet-4-20250514
   ide: Kiro
   extension: Kiro
   ```

2. **You're still using `ai-infos.json`**
   - The system supports both formats
   - YAML is now preferred
   - Consider migrating to `cm-ai-infos.yaml`

## Migration Scenarios

### Scenario 1: Fresh Project (No Context Master)

**Before**:
```
User: "Setup Context Master"
LLM: setup_project_context(projectPath)
```

**After**:
```
User: "Initialize Context Master"
LLM: 
  1. initialize_context_master(projectPath)
  2. Create cm-ai-infos.yaml
  3. setup_project_context(projectPath)
```

**Impact**: Better configuration, proper AI assistant detection

### Scenario 2: Existing Project (Context Master Configured)

**Before**:
```
User: "Add Remotion documentation"
LLM: add_project_context("remotion", projectPath, "srt captions")
```

**After**:
```
User: "Add Remotion documentation"
LLM: add_project_context("remotion", projectPath, "srt captions")
```

**Impact**: None - works exactly the same

### Scenario 3: Existing Project (Placeholder Configuration)

**Current State**:
```yaml
# .context-master/cm-ai-infos.yaml
provider: UNKNOWN
model: UNKNOWN
ide: UNKNOWN
extension: UNKNOWN
```

**Recommended Action**:
```
User: "Update my Context Master configuration"
LLM: 
  1. Read current cm-ai-infos.yaml
  2. Identify actual AI assistant from system
  3. Update cm-ai-infos.yaml with correct values
```

**Updated Configuration**:
```yaml
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

## Step-by-Step Migration

### For Projects with Placeholder Configuration

#### Step 1: Check Current Configuration
```bash
# View current configuration
cat .context-master/cm-ai-infos.yaml
```

#### Step 2: Identify Your AI Assistant
- **Provider**: Anthropic, OpenAI, Google, etc.
- **Model**: claude-sonnet-4, gpt-4, gemini-2.0-flash, etc.
- **IDE**: VS Code, Cursor, Kiro, Zed, etc.
- **Extension**: Claude Code, Roo Code, Cline, GitHub Copilot, etc.

#### Step 3: Update Configuration
```yaml
# .context-master/cm-ai-infos.yaml
provider: YOUR_PROVIDER
model: YOUR_MODEL
ide: YOUR_IDE
extension: YOUR_EXTENSION
```

#### Step 4: Verify
```
User: "Verify my Context Master configuration"
LLM: Read and confirm cm-ai-infos.yaml values
```

### For Projects Using JSON Format

#### Step 1: Check Current Format
```bash
# Check if using JSON
cat .context-master/ai-infos.json
```

#### Step 2: Create YAML Version
```yaml
# .context-master/cm-ai-infos.yaml
provider: YOUR_PROVIDER
model: YOUR_MODEL
ide: YOUR_IDE
extension: YOUR_EXTENSION
```

#### Step 3: (Optional) Remove JSON
```bash
# After verifying YAML works
rm .context-master/ai-infos.json
```

**Note**: Both formats are supported, but YAML is preferred.

## Backward Compatibility

### What Still Works

1. **All existing tools**
   - `setup_project_context`
   - `add_project_context`
   - `list_available_contexts`
   - `read_specific_context`
   - `search_library_advisor`

2. **Existing configurations**
   - `cm-ai-infos.yaml`
   - `ai-infos.json` (legacy)

3. **Existing workflows**
   - Adding documentation
   - Reading contexts
   - Searching libraries

### What's New

1. **`initialize_context_master` tool**
   - First-time setup
   - Downloads template only
   - Guides configuration

2. **`CodingAssistantService`**
   - Internal service (not user-facing)
   - Detects AI assistant
   - Recommends context files

## Benefits of Migration

### For New Projects

1. **Proper Configuration**: No more UNKNOWN placeholders
2. **AI Assistant Detection**: System knows which assistant you're using
3. **Better Instructions**: Tailored to your specific setup
4. **Validation**: Catches configuration issues early

### For Existing Projects

1. **Improved Accuracy**: Correct AI assistant identification
2. **Better Context**: Recommendations based on your setup
3. **Future Features**: New features will leverage this information
4. **Consistency**: Same configuration format across all projects

## Common Questions

### Q: Do I need to reinstall Context Master?
**A**: No, just update to the latest version and rebuild.

### Q: Will my existing documentation be affected?
**A**: No, all existing documentation in `.context-master/knowledge/` remains unchanged.

### Q: Can I still use the old workflow?
**A**: Yes, `setup_project_context` still works if configuration exists.

### Q: What if I don't know my AI assistant details?
**A**: The LLM can usually detect this from system configuration. If not, check your IDE/extension settings.

### Q: Is the JSON format deprecated?
**A**: No, both formats are supported. YAML is preferred for new projects.

### Q: Do I need to update all my projects?
**A**: No, only if you want to benefit from proper AI assistant detection.

## Troubleshooting

### Issue: "cm-ai-infos.yaml not found"

**Solution**: Run initialize tool first:
```typescript
initialize_context_master(projectPath)
```

### Issue: "Configuration has placeholder values"

**Solution**: Update with correct values:
```yaml
provider: Anthropic  # Not UNKNOWN
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

### Issue: "Both YAML and JSON exist"

**Solution**: YAML takes precedence. You can safely remove JSON:
```bash
rm .context-master/ai-infos.json
```

### Issue: "Don't know my AI assistant details"

**Solution**: Check your IDE/extension:
- Look at your IDE name (VS Code, Cursor, Kiro, etc.)
- Check which extension you're using (Claude Code, Roo Code, etc.)
- Check your model in extension settings

## Testing After Migration

### Verify Configuration
```
User: "Show my Context Master configuration"
LLM: Read and display cm-ai-infos.yaml
```

### Test Adding Documentation
```
User: "Add documentation for React Query"
LLM: add_project_context("React Query", projectPath, "mutations")
```

### Test Complete Setup
```
User: "Setup Context Master for new project"
LLM: 
  1. initialize_context_master(projectPath)
  2. Create cm-ai-infos.yaml
  3. setup_project_context(projectPath)
```

## Summary

- ✅ **Backward Compatible**: Existing projects work without changes
- ✅ **Optional Migration**: Only needed for better configuration
- ✅ **Easy Update**: Simple YAML file update
- ✅ **No Data Loss**: All existing documentation preserved
- ✅ **Better Experience**: Proper AI assistant detection
- ✅ **Future Ready**: Foundation for new features

The migration is optional and only recommended if you want to benefit from proper AI assistant detection and improved configuration management.
