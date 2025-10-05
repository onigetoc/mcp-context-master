# AI Assistant Identity Configuration

## Goal
The goal is to create a JSON configuration file at `.context-master/ai-infos.json` that contains information about the running AI assistant (you).

## Instructions

### Step 1: Identify Your Configuration
First, determine the following values about yourself from your system configuration:
- **provider**: Your AI provider (e.g., "Google", "OpenAI").
- **model**: Your specific model name (e.g., "Gemini", "claude-sonnet-4-20250514").
- **ide**: The IDE/editor environment you are interacting with (e.g., "VS Code", "Cursor").
- **extension**: The name of the extension facilitating this interaction (e.g., "Gemini CLI", "Claude Code").

### Step 2: Create and Write the Configuration File
Next, create a new file (or overwrite the existing one) at `.context-master/ai-infos.json`.

Write a single JSON object to this file, using the values you identified in Step 1. The structure must be as follows:

```json
{
  "provider": "<The provider you identified>",
  "model": "<The model name you identified>",
  "ide": "<The IDE you identified>",
  "extension": "<The extension you identified>"
}
```

### Step 3: Verify the Result
After writing the file, read its contents back and display them to confirm that the configuration was saved correctly and contains your actual information, not the placeholder text.