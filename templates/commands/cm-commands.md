# Context Master Commands

## Available Commands

When you see `/cm-` followed by a command, execute the corresponding action:

### Core Commands

- **`/cm-help`**: Show this numbered list of available commands for selection
- **`/cm-init`**: Initialize project with AI assistant configuration (execute cm-init.md)
- **`/cm-analyze`**: Analyze project dependencies and suggest documentation downloads
- **`/cm-download`**: Download documentation for high-priority dependencies
- **`/cm-status`**: Show current project context status and configuration
- **`/cm-clean`**: Clean up downloaded documentation and reset context
- **`/cm-config`**: Show or update Context Master configuration

### Advanced Commands

- **`/cm-priority`**: Show dependency priority analysis with scoring
- **`/cm-search`**: Search for specific library documentation
- **`/cm-bulk`**: Bulk download all recommended documentation
- **`/cm-selective`**: Interactive selection of documentation to download

### Utility Commands

- **`/cm-version`**: Show Context Master version and system info
- **`/cm-debug`**: Show debug information and troubleshooting
- **`/cm-exit`**: Complete current Context Master session

## Command Recognition

These commands are designed to be recognized by:
- Cursor IDE
- GitHub Copilot
- Cline
- Roo Code
- Claude Code
- Other AI coding assistants

## Usage Pattern

1. Type `/cm-help` to see available commands
2. Select a numbered option or type the full command
3. The AI assistant will execute the corresponding task
4. Follow any additional prompts or instructions

## Implementation Note

Each command corresponds to a specific markdown file in the `src/tasks/` directory that contains the execution instructions for the AI assistant.