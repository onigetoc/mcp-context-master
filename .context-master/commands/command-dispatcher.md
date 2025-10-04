# Context Master Command Dispatcher

## Command Recognition System

When you encounter a message starting with `/cm-`, execute the corresponding task:

### Command Mapping

| Command | Task File | Description |
|---------|-----------|-------------|
| `/cm-help` | `.context-master/tasks/cm-help.md` | Show available commands |
| `/cm-init` | `.context-master/templates/cm-init.md` | Initialize AI configuration setup |
| `/cm-setup` | `setup_project_context` | Use this setup_project_context from MCP Context Master tool |
| `/cm-analyze` | `.context-master/tasks/cm-analyze.md` | Analyze dependencies |
| `/cm-download` | `.context-master/tasks/cm-download.md` | Download high-priority docs |
| `/cm-status` | `.context-master/tasks/cm-status.md` | Show project status |
| `/cm-clean` | `.context-master/tasks/cm-clean.md` | Clean up documentation |
| `/cm-config` | `.context-master/tasks/cm-config.md` | Manage configuration |
| `/cm-priority` | `src/tasks/cm-priority.md` | Show priority analysis |
| `/cm-search` | `.context-master/tasks/cm-search.md` | Search for library docs |
| `/cm-bulk` | `.context-master/tasks/cm-bulk.md` | Bulk download all docs |

### Execution Pattern

1. **Detect Command**: Look for `/cm-` prefix
2. **Load Task**: Read the corresponding markdown file
3. **Execute Instructions**: Follow the task steps exactly
4. **Provide Feedback**: Show progress and results
5. **Suggest Next**: Recommend follow-up commands

### Numbered Selection Support

When user types a number (1-13) after seeing `/cm-help`, map to:
1. `/cm-init`
2. `/cm-analyze`  
3. `/cm-download`
4. `/cm-status`
5. `/cm-clean`
6. `/cm-config`
7. `/cm-priority`
8. `/cm-search`

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