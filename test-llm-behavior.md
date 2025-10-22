# Test LLM Behavior - Context Master

## Test Scenarios for GPT-4.1 and Weaker LLMs

### Scenario 1: Basic Initialization
**User Input**: "init context master"

**Expected LLM Behavior**:
```typescript
// Should execute BOTH commands automatically:
initialize_context_master("C:\\Users\\LENOVO\\APPS\\0-crawler-scraper\\docs-crawler")
setup_project_context("C:\\Users\\LENOVO\\APPS\\0-crawler-scraper\\docs-crawler")
```

**Should NOT**:
- Ask user to create YAML files
- Skip the setup step
- Ask for confirmation between steps
- Use relative paths

### Scenario 2: Error Recovery
**User Input**: "init context master" (with network error)

**Expected LLM Behavior**:
```typescript
// Should retry automatically:
initialize_context_master("ABSOLUTE_PATH")
// If still fails, retry again
setup_project_context("ABSOLUTE_PATH")
```

**Should NOT**:
- Give up after first error
- Ask user to fix network issues
- Skip to manual file creation

### Scenario 3: Missing Files
**User Input**: "setup context master" (without init)

**Expected Tool Behavior**:
- Auto-initialize if not done
- Create missing YAML with defaults
- Continue with setup automatically

**Should NOT**:
- Fail with error message
- Ask user to run init manually
- Request manual file creation

## Improvements Made

### 1. Auto-Creation Instead of Manual Requests
- ✅ Tools now auto-create cm-ai-infos.yaml with defaults
- ✅ No more "please create file manually" messages
- ✅ Setup auto-initializes if needed

### 2. Stricter Tool Descriptions
- ✅ Added 🚨 MANDATORY keywords
- ✅ Clear "IMMEDIATELY call" instructions
- ✅ "DO NOT ask user" directives

### 3. Forced Action Messages
- ✅ "YOU MUST NOW call" format
- ✅ Executable code blocks
- ✅ No ambiguous instructions

### 4. Error Recovery
- ✅ Auto-retry on network errors
- ✅ Auto-fix invalid configurations
- ✅ Fallback to defaults when needed

### 5. Path Handling
- ✅ Clear absolute path examples
- ✅ Platform-specific formats
- ✅ Auto-resolution where possible

## Expected Results

After these changes, GPT-4.1 should:
1. ✅ Always call both tools in sequence for "init"
2. ✅ Never ask for manual file creation
3. ✅ Retry automatically on errors
4. ✅ Use absolute paths correctly
5. ✅ Complete initialization without user intervention

## Testing Commands

Test with these exact user inputs:
- "init context master"
- "/cm-init"
- "initialize context master"

All should result in automatic execution of both tools.