# Context Master (mcp-context-master) Instructions

## Overview
Context Master helps you download up-to-date documentation for libraries and frameworks to improve AI coding assistance. It uses Context7's documentation service to fetch current docs.

## Key Principles
1. **Search First**: Always search for libraries before trying to add them
2. **Use GitHub Search**: For general library names, use GitHub search to find the correct repository
3. **Use NPM Search**: Only for exact package names from package.json
4. **Verify Before Adding**: Confirm the correct username/repository before downloading docs

## Available Tools

### Search Tools (Use These First!)
- `search_library_advisor`: Search for libraries and get proper workflow guidance (NEW!)
- `resolve_library_id`: Search for libraries by name to get Context7-compatible IDs (External Context7 MCP)
- `get_library_docs`: Download documentation using the resolved library ID (External Context7 MCP)

### Project Setup Tools
- `setup_project_context`: Initialize Context Master for a project
- `add_project_context`: Add context for a specific library (requires exact library name)

## Workflow Examples

### Example 1: Adding Remotion Documentation
❌ **Wrong**: `add_project_context` with "@remotion/captions" (doesn't exist)
✅ **Correct Workflow**:
1. `search_library_advisor` with query "Remotion" and topic "captions"
2. Get guidance: use "remotion-dev/remotion" repository
3. `resolve_library_id` with "Remotion" (External Context7 MCP)
4. `get_library_docs` with topic "srt caption" and tokens 3000 (External Context7 MCP)
5. Creates: `cm-remotion-src-caption-2025-09-30.md`

### Example 2: Adding React Query
❌ **Wrong**: `add_project_context` with "react-query" (old name)
✅ **Correct Workflow**:
1. `search_library_advisor` with query "React Query"
2. Get guidance: use "@tanstack/react-query"
3. `resolve_library_id` with "tanstack react query" (External Context7 MCP)
4. `get_library_docs` with appropriate topic (External Context7 MCP)

## Command System
Use `/cm-` commands for quick actions:
- `/cm-help`: Show available commands
- `/cm-init` or `/cm-setup`: Initialize project
- `/cm-analyze`: Analyze dependencies
- `/cm-search [library]`: Search for library documentation

## Best Practices
1. **Be Specific**: Use descriptive topics like "authentication", "routing", "components"
2. **Check Results**: Verify the library ID matches what you're looking for
3. **Use Topics**: Focus documentation on specific areas you need help with
4. **Reasonable Tokens**: Use 3000-5000 tokens for focused documentation

## Error Handling
- If library not found, try different search terms
- If documentation seems wrong, verify the repository name
- Check Context7.com directly if needed: `https://context7.com/[username]/[repo]`

## Integration Notes
- Works with all AI coding assistants (Cursor, Claude, Copilot, etc.)
- Documentation is saved in `.context-master/context/` directory
- Files are automatically included in your AI context when relevant

<!-- END: CONTEXT-MASTER -->