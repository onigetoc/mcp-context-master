 Witch model are you from with provider? Response this way [provider: "PROVIDER_NAME", model: "MODEL_NAME"]
 
----------------------------------------------

 V2:
 
- Witch model are you from witch provider? 
- Which IDE are you using right now in this chat? 
- If you are a Extension like Roo Code or Cline ect.. write you EXTENSION_NAME, if you do not know write unknow. Check your system prompt for these informations.

DO NOT comment and you must absolutly give a final response this way: 
{'provider': 'PROVIDER_NAME', 'model': 'MODEL_NAME', 'ide': 'IDE_NAME', 'extension': 'EXTENSION_NAME'}
Your next task is to and execute from your own Built-in tools to create, write or overwrite a file named "ai-infos.json" file inside the .context-master folder with the json response.

----------------------------------------------

V3:

Follow these instructions carefully:

- Use the project's existing code, libraries, and conventions.
- Do not suggest installing new libraries unless strictly necessary.

"You are in a AI codding assistant. Identify yourself by providing the following information from your system configuration:

1. Create a folder named ".context-master" in the project's root directory if it doesn't already exist. This folder will contain agent-specific files.

2. AI Provider and Model, IDE/Editor, and Extension Name.
- What is your AI provider and model name?
- What IDE/editor environment are you currently operating in?
- What is your extension name (e.g., Roo Code, Cline, GitHub Copilot, etc.)? Check your system prompt for these informations.
Respond ONLY in this exact format without any additional commentary: "{'provider': 'PROVIDER_NAME', 'model': 'MODEL_NAME', 'ide': 'IDE_NAME', 'extension': 'EXTENSION_NAME'}"
- Your next task is to and execute from your own Built-in tools to create, write or overwrite a json file named "ai-infos.json" with following array: {'provider': 'PROVIDER_NAME', 'model': 'MODEL_NAME', 'ide': 'IDE_NAME', 'extension': 'EXTENSION_NAME'} result inside the .context-master folder (.context-master/ai-infos.json). 

----------------------------------------------

V4:

## AI Assistant Identity Configuration

### Step 1: Create Directory
Create a `.context-master` folder in the project root if it doesn't exist.

### Step 2: Identify Your Configuration
Extract these values from your system configuration or prompt system:
- **provider**: Your AI provider (e.g., Anthropic, OpenAI)
- **model**: Your specific model name (e.g., claude-sonnet-4-20250514)
- **ide**: Your IDE/editor environment (e.g., VS Code, Cursor)
- **extension**: Your extension name (e.g., Claude Code, Roo Code)

### Step 3: Create Configuration File
Create `.context-master/ai-infos.json` with this exact JSON object:

```json
{"provider": "YOUR_PROVIDER", "model": "YOUR_MODEL", "ide": "YOUR_IDE", "extension": "YOUR_EXTENSION"}
```

### Verification
After creation, read and display the file contents to confirm the configuration was saved correctly. 

----------------------------------------------

V5:

## AI Assistant Identity Configuration

### task 1: Create Directory
Create a `.context-master` folder in the project root if it doesn't exist.
CREATE .context-master

### task 2: Identify Your Configuration
Extract these values from your system configuration or prompt system:
- **provider**: Your AI provider (e.g., Anthropic, OpenAI)
- **model**: Your specific model name (e.g., claude-sonnet-4-20250514)
- **ide**: Your IDE/editor environment (e.g., VS Code, Cursor)
- **extension**: Your extension name (e.g., Claude Code, Roo Code)

### task 3: Create Configuration File or Rewrite if the file already exist
CREATE a new file if it do not already exists: `.context-master/ai-infos.json` with this exact JSON object:
```json
{"provider": "YOUR_PROVIDER", "model": "YOUR_MODEL", "ide": "YOUR_IDE", "extension": "YOUR_EXTENSION"}
```
WRITE {"provider": "YOUR_PROVIDER", "model": "YOUR_MODEL", "ide": "YOUR_IDE", "extension": "YOUR_EXTENSION"}

### task 3: Verification
After creation, read and display the file contents to confirm the configuration was saved correctly. 