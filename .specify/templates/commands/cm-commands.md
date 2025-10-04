# Context Master Commands

## Available Commands

When you see `/cm-` followed by a command, execute the corresponding action:

### Core Commands

- **`/cm-help`**: Show this numbered list of available commands for selection
- **`/cm-init`**: First, read and follow all instructions in ".context-master/cm-init.md" before proceeding
- **`/cm-setup`**: Initialize and Setup the current project with the Context Master Tool `setup_project_context` (requires current project absolute project path)
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

<!-- NOT SURE OF THE FOLLOWING -->

# MCP Context Master Commands Template

**Purpose**: Define standardized command patterns for all MCP server commands to align with constitutional principles.

## Core Requirements (NON-NEGOTIABLE)
1. **CLI Interface**: All commands MUST follow `cm-[verb]` naming (e.g., `cm-analyze`, `cm-download`).
2. **Security**: Commands handling sensitive operations MUST require explicit confirmation (`--force` flag).
3. **Help Text**: Every command MUST include `--help` output with:
   - Short description
   - Required parameters
   - Example usage
4. **Error Handling**: Fail gracefully with actionable error messages
5. **Logging**: Include `--verbose` flag for debug output

## Command Structure Template
```markdown
<command name="[COMMAND_NAME]">
Description: Brief purpose (≤80 chars)

**Parameters**:
- `[PARAM]`: Description (required)
- `[OPTIONAL_PARAM]?`: Description (optional)

**Security Constraints**:
- Requires `[PRIVILEGE_LEVEL]` access
- Validates `[INPUT_TYPE]` against `[VALIDATION_RULE]`

**Execution Flow**:
1. Validate inputs
2. Perform core operation
3. Generate output files
4. Update status logs

**Example Usage**:
```bash
cm-analyze --project-path ./my-project --output report.md
```

**Compliance Notes**:
- Aligns with Principle #[X] (Library-First)
- Implements Principle #[Y] (Security Policies)
</command>
```

## Prohibited Patterns
- Avoid `sudo`/elevated permissions unless absolutely necessary
- No hardcoded API keys - use environment variables
- Commands MUST NOT modify files outside `.specify/` directory without `--force`

## Versioning
- Minor version bumps for new commands
- Major version bumps for command naming changes
- Patch fixes for critical bugs