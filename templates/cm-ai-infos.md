## AI Assistant Identity Configuration

### task 1: Create Directory
Create a `.context-master` folder in the project root if it doesn't exist.
CREATE .context-master

### task 2: Identify Your Configuration
Extract these values from your system configuration or prompt system:
- **provider**: Your AI provider (e.g., Anthropic, OpenAI, Google)
- **model**: Your specific model name (e.g., claude-sonnet-4-20250514, gpt-4, gemini-2.0-flash)
- **ide**: Your IDE/editor environment (e.g., VS Code, Cursor, Zed, Kiro)
- **extension**: Your extension name (e.g., Claude Code, Roo Code, Cline, GitHub Copilot)

### task 3: Create Configuration File or ALWA Update if it already exists
**ALWAYS UPDATE** the YAML file named: `.context-master/cm-ai-infos.yaml` with this following exact YAML structure:

```yaml
provider: YOUR_PROVIDER
model: YOUR_MODEL
ide: YOUR_IDE
extension: YOUR_EXTENSION
```

**CRITICAL NOTES:**
- If the file already exists with old values (like Gemini CLI, VS Code, etc.), you MUST replace it with YOUR CURRENT configuration
- Use lowercase values for better detection (kiro, not Kiro)
- Do NOT keep old values from previous sessions
- This file determines which context files get updated

**Examples:**
For Kiro:
```yaml
provider: anthropic
model: claude-sonnet-4
ide: kiro
extension: kiro
```

For Cursor with Claude:
```yaml
provider: anthropic
model: claude-sonnet-4
ide: cursor
extension: claude code
```

### task 4: Verification
After creation, read and display the file contents to confirm the configuration was saved correctly. 

### task 5: calling the context master setup tool
Call Context Master tool `setup_project_context` to initiate the setup and configure Context Master for your project.