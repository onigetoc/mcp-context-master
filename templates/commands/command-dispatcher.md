# Context Master Command Dispatcher

## Command Recognition System

When you encounter a message starting with `/cm-`, execute the corresponding task:

### Command Mapping

| Command | Task File | Description |
|---------|-----------|-------------|
| `/cm-help` | `.context-master/tasks/cm-help.md` | Show available commands |
| `/cm-ai-infos` | `.context-master/cm-ai-infos.md` | Get AI assistant informations |
| `/cm-setup` | `.context-master/commands/cm-setup_project_context.md` | Tool calling `setup_project_context` to Initialize project
| `/cm-analyze` | `.context-master/commands/cm-analyze.md` | Analyze dependencies |
| `/cm-download` | `.context-master/commands/cm-download.md` | Download high-priority docs |
| `/cm-status` | `.context-master/commands/cm-status.md` | Show project status |
| `/cm-clean` | `.context-master/commands/cm-clean.md` | Clean up documentation |
| `/cm-config` | `.context-master/commands/cm-config.md` | Manage configuration |
| `/cm-priority` | `.context-master/tasks/cm-priority.md` | Show priority analysis |
| `/cm-search` | `.context-master/commands/cm-search.md` | Search for library docs |
| `/cm-bulk` | `.context-master/commands/cm-bulk.md` | Bulk download all docs |

### Execution Pattern

1. **Detect Command**: Look for `/cm-` prefix
2. **Load Task**: Read the corresponding markdown file
3. **Execute Instructions**: Follow the task steps exactly
4. **Provide Feedback**: Show progress and results
5. **Suggest Next**: Recommend follow-up commands

### Numbered Selection Support

When user types a number (1-13) after seeing `/cm-help`, map to:
1. `/cm-ai-infos` # Get AI assistant informations
2. `/cm-setup` # Setup project with knowledge base and get assistant info (execute setup `setup_project_context` tool and cm-ai-infos.md)
3. `/cm-analyze` # Analyze project dependencies and suggest documentation downloads
4. `/cm-download` # Download documentation for high-priority dependencies
5. `/cm-status` # Show current project context status and configuration
6. `/cm-clean` # Clean up downloaded documentation and reset context
7. `/cm-config` # Show or update Context Master configuration
8. `/cm-priority` # Show dependency priority analysis with scoring
9. `/cm-search` # Search for specific library documentation 

### Error Handling

- **Unknown Command**: Show `/cm-help` and available options
- **Missing Task File**: Provide error message and suggest alternatives
- **Prerequisites Not Met**: Guide user to required setup steps

### Integration Notes

This system works with:
- **Cursor**: Recognizes `/cm-` as custom commands
- **GitHub Copilot**: Treats as structured prompts
- **Cline**: Executes as task instructions
- **Roo Code**: Follows markdown task patterns
- **Claude Code**: Interprets as workflow steps