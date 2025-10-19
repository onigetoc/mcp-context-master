# Context Master Documentation

## Overview

This directory contains comprehensive documentation for the Context Master MCP server.

## Documentation Index

### Getting Started

1. **[INITIALIZATION-WORKFLOW.md](INITIALIZATION-WORKFLOW.md)**
   - Complete guide to the two-step initialization process
   - Step-by-step workflow examples
   - Error handling and troubleshooting
   - Benefits and rationale

2. **[MIGRATION-TO-INITIALIZE-TOOL.md](MIGRATION-TO-INITIALIZE-TOOL.md)**
   - Migration guide for existing users
   - Backward compatibility information
   - Common questions and troubleshooting
   - Step-by-step migration instructions

### Technical Documentation

3. **[INITIALIZE-TOOL-IMPLEMENTATION.md](INITIALIZE-TOOL-IMPLEMENTATION.md)**
   - Technical implementation details
   - Design decisions and rationale
   - Integration points
   - Future enhancements

4. **[CODING-ASSISTANT-SERVICE-USAGE.md](CODING-ASSISTANT-SERVICE-USAGE.md)**
   - Service API documentation
   - Usage examples
   - Integration patterns
   - Future enhancements

### Reference

5. **[CONTEXT-MAPPING-REFERENCE.md](CONTEXT-MAPPING-REFERENCE.md)**
   - Complete mapping of AI assistants to context files
   - Priority system explanation
   - Supported assistants and IDEs

## Quick Links

### For Users

- **First Time Setup**: See [INITIALIZATION-WORKFLOW.md](INITIALIZATION-WORKFLOW.md)
- **Migrating Existing Projects**: See [MIGRATION-TO-INITIALIZE-TOOL.md](MIGRATION-TO-INITIALIZE-TOOL.md)
- **Troubleshooting**: See error handling sections in workflow docs

### For Developers

- **Implementation Details**: See [INITIALIZE-TOOL-IMPLEMENTATION.md](INITIALIZE-TOOL-IMPLEMENTATION.md)
- **Service Usage**: See [CODING-ASSISTANT-SERVICE-USAGE.md](CODING-ASSISTANT-SERVICE-USAGE.md)
- **Context Mapping**: See [CONTEXT-MAPPING-REFERENCE.md](CONTEXT-MAPPING-REFERENCE.md)

## Documentation Structure

```
docs/
├── README.md (this file)
├── INITIALIZATION-WORKFLOW.md
├── MIGRATION-TO-INITIALIZE-TOOL.md
├── INITIALIZE-TOOL-IMPLEMENTATION.md
├── CODING-ASSISTANT-SERVICE-USAGE.md
└── CONTEXT-MAPPING-REFERENCE.md
```

## Key Concepts

### Two-Step Initialization

Context Master uses a two-step initialization process:

1. **Initialize**: Downloads template and creates directory
2. **Setup**: Analyzes dependencies and downloads documentation

This ensures proper configuration before downloading documentation.

### AI Assistant Detection

The system detects which AI assistant is being used based on configuration:

- **Provider**: Anthropic, OpenAI, Google, etc.
- **Model**: claude-sonnet-4, gpt-4, gemini-2.0-flash, etc.
- **IDE**: VS Code, Cursor, Kiro, Zed, etc.
- **Extension**: Claude Code, Roo Code, Cline, GitHub Copilot, etc.

### Context File Mapping

Based on the detected assistant, the system recommends the appropriate context file:

- Cursor → `.cursorrules`
- Claude Code → `CLAUDE.md`
- Roo Code → `ROO.md`
- Kiro → `.kiro/steering/context-master-instructions.md`
- etc.

## Common Workflows

### First-Time Setup

```typescript
// Step 1: Initialize
initialize_context_master(projectPath)

// Step 2: LLM creates cm-ai-infos.yaml

// Step 3: Complete setup
setup_project_context(projectPath)
```

### Adding Documentation

```typescript
// Add documentation for a specific library
add_project_context(libraryName, projectPath, topic, tokens)
```

### Reading Context

```typescript
// List available contexts
list_available_contexts()

// Read specific context
read_specific_context(fileName)
```

## Configuration Files

### YAML Format (Preferred)

**File**: `.context-master/cm-ai-infos.yaml`

```yaml
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

### JSON Format (Legacy)

**File**: `.context-master/ai-infos.json`

```json
{
  "provider": "Anthropic",
  "model": "claude-sonnet-4-20250514",
  "ide": "Kiro",
  "extension": "Kiro"
}
```

## Tools Overview

### Primary Tools

1. **`initialize_context_master`**
   - First-time setup
   - Downloads template only
   - Guides configuration

2. **`setup_project_context`**
   - Complete project setup
   - Analyzes dependencies
   - Downloads documentation

3. **`add_project_context`**
   - Add documentation for specific library
   - Supports topic filtering
   - Configurable token count

### Supporting Tools

4. **`list_available_contexts`**
   - List downloaded documentation

5. **`read_specific_context`**
   - Read specific documentation file

6. **`search_library_advisor`**
   - Search for libraries on GitHub
   - Get workflow recommendations

7. **`read_template`**
   - Read template files

8. **`update_agents_file`**
   - Update AGENTS.md with instructions

## Services

### CodingAssistantService

Internal service for detecting AI assistant:

```typescript
class CodingAssistantService {
  async detectAssistant(projectPath: string): Promise<DetectionResult>
  async getContextFilePath(projectPath: string): Promise<string>
}
```

## Error Handling

### Common Errors

1. **Missing Project Path**
   - Error: "projectPath parameter is REQUIRED"
   - Solution: Provide absolute path to project

2. **Invalid Project Path**
   - Error: "Project path does not exist"
   - Solution: Verify path exists and is accessible

3. **Configuration Not Found**
   - Error: "No configuration file found"
   - Solution: Run `initialize_context_master` first

4. **Invalid Configuration**
   - Error: "Could not parse configuration file"
   - Solution: Check YAML/JSON syntax

## Testing

### Test Files

- `test/test-initialize-tool.js` - Test initialize tool
- `test/test-setup-tool.js` - Test setup tool
- `test/test-coding-assistant.js` - Test assistant detection

### Running Tests

```bash
# Test initialize tool
node test/test-initialize-tool.js

# Test setup tool
node test/test-setup-tool.js

# Test coding assistant detection
node test/test-coding-assistant.js
```

## Contributing

When adding new documentation:

1. Follow the existing structure
2. Include code examples
3. Add error handling sections
4. Update this README index
5. Cross-reference related docs

## Version History

### v1.0.0 (Current)
- Two-step initialization process
- `initialize_context_master` tool
- `CodingAssistantService` service
- Comprehensive documentation

## Support

For issues or questions:

1. Check the relevant documentation file
2. Review error handling sections
3. Check troubleshooting guides
4. Review test files for examples

## License

See main project LICENSE file.
