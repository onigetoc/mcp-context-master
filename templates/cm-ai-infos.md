## AI Assistant Identity Configuration

### task 1: Create Directory
Create a `.context-master` folder in the project root if it doesn't exist.
CREATE .context-master

### task 2: Identify Your Configuration
Extract these values from your system configuration or prompt system:
- **provider**: Your AI provider (e.g., Anthropic, OpenAI)
- **model**: Your specific model name (e.g., claude-sonnet-4-20250514)
- **ide**: Your IDE/editor environment (e.g., VS Code, Cursor. Zed)
- **extension**: Your extension name (e.g., Claude Code, Roo Code)

### task 3: Create Configuration File or Rewrite if the file already exist
UPDATE or CREATE a .json file if it do not already exists nammed: `.context-master/ai-infos.json` with this following exact JSON object:

```json
{"provider": "YOUR_PROVIDER", "model": "YOUR_MODEL", "ide": "YOUR_IDE", "extension": "YOUR_EXTENSION"}
```

Do not read this file, only write it with the json structure asked.

### task 3: Verification
After creation, read and display the file contents to confirm the configuration was saved correctly. 
