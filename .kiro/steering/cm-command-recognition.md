---
inclusion: always
---

# Context Master Command Recognition

## Command System

When you see a message starting with `/cm-`, this is a Context Master command that should be executed immediately.

### Available Commands

- `/cm-help` - Show numbered list of available commands
- `/cm-init` - Initialize AI assistant configuration  
- `/cm-analyze` - Analyze project dependencies and suggest documentation
- `/cm-download` - Download high-priority documentation
- `/cm-status` - Show current project context status
- `/cm-clean` - Clean up downloaded documentation
- `/cm-selective` - Interactive selection of documentation to download

### Execution Pattern

1. **Recognize the command** (starts with `/cm-`)
2. **Load the corresponding task file** from `src/tasks/`
3. **Execute the instructions** in the task file exactly
4. **Provide progress feedback** to the user
5. **Suggest next steps** when complete

### Command Files Location

- Command definitions: `templates/commands/`
- Task instructions: `src/tasks/`
- Templates: `src/templates/`

### Integration with MCP Tools

These commands are designed to work with:
- **Context7 MCP Server** - For documentation downloads
- **File system tools** - For project analysis
- **Configuration management** - For AI assistant setup

### User Experience

- Commands work in any AI coding assistant (Cursor, Copilot, Cline, etc.)
- Numbered selection available after `/cm-help`
- Clear progress indicators and error handling
- Contextual next-step suggestions

## Implementation Note

This command system transforms Context Master from a manual tool into an interactive assistant that can be controlled through simple slash commands, similar to Discord bots or CLI interfaces.