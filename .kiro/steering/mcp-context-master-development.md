---
inclusion: always
---

# MCP Context Master Development Guidelines

## Project Context
This is the development workspace for the MCP Context Master server itself. Files created here are for developing the MCP server, not for end-user projects.

## Important Distinctions

### AGENTS.md Files
- `templates/AGENTS.md` - Template file for end-user projects (modify this)
- `AGENTS.md` (root) - Instructions for this development project (ignore for Context Master features)
- `.context-master/AGENTS.md` - Generated file for testing (ignore)

### Development Rules
1. When working on Context Master MCP server features, ignore the root `AGENTS.md`
2. The `templates/AGENTS.md` is the source template that gets copied to user projects
3. Focus on MCP server functionality, not the instructions meant for end users
4. Test Context Master features by running setup, but don't use the generated instructions for development

This ensures clear separation between MCP server development and end-user guidance.