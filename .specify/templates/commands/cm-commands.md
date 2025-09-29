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