# 🎯 Context Master AI Assistant Configuration

## MANDATORY STEPS TO COMPLETE INITIALIZATION

### Step 1: Identify Your AI Assistant Configuration

You need to identify these 4 values from your current AI assistant:

| Field | Description | Examples |
|-------|-------------|----------|
| **provider** | Your AI provider | `anthropic`, `openai`, `google` |
| **model** | Your specific model | `claude-sonnet-4`, `gpt-4`, `gemini-2.0-flash` |
| **ide** | Your IDE/editor | `kiro`, `cursor`, `vscode`, `zed` |
| **extension** | Your extension name | `kilo code`, `roo code`, `cline`, `kiro` |

### Step 2: Create/Update YAML Configuration File

**🚨 MANDATORY ACTION**: Create or update `.context-master/cm-ai-infos.yaml`

**Even if this file already exists, you MUST update it with your current configuration.**

```yaml
provider: YOUR_PROVIDER    # Replace with actual value
model: YOUR_MODEL          # Replace with actual value  
ide: YOUR_IDE              # Replace with actual value
extension: YOUR_EXTENSION  # Replace with actual value (see table below)
```

### Step 3: Extension Names Reference

**⚠️ CRITICAL: Use EXACT extension names (case-sensitive):**

| AI Assistant | Extension Value |
|--------------|----------------|
| Kilo Code | `kilo code` |
| Roo Code | `roo code` |
| Cline | `cline` |
| Claude Code | `claude code` |
| Kiro | `kiro` |
| GitHub Copilot | `github copilot` |
| Cursor | `cursor` |

### Step 4: Configuration Examples

**For Kilo Code users:**
```yaml
provider: anthropic
model: claude-sonnet-4
ide: vscode
extension: kilo code
```

**For Roo Code users:**
```yaml
provider: anthropic
model: claude-sonnet-4
ide: vscode
extension: roo code
```

**For Kiro users:**
```yaml
provider: anthropic
model: claude-sonnet-4
ide: kiro
extension: kiro
```

### Step 5: Verify Configuration

After creating the file, verify it contains your actual values (not placeholders like `YOUR_PROVIDER`).

### Step 6: Complete Setup

Call the setup tool to finish Context Master configuration:
```typescript
setup_project_context()
```

---

## 🎯 Why This Matters

The `extension` value determines which context files get created:
- `kilo code` → Creates `KILOCODE.md`
- `roo code` → Creates `ROO.md`  
- `cline` → Creates `.clinerules`
- `kiro` → Creates `.kiro/steering/context-master-instructions.md`

**Wrong extension = Wrong context files created!**