# Analysis: Replacing "context" folder with "knowledge" folder

## Project Overview
This is an MCP (Model Context Protocol) server called Context Master that helps developers find and download contextual documentation for their projects. The project uses TypeScript and creates a `.context-master` directory structure with a `context` subdirectory for storing downloaded documentation.

## Files that need to be updated

### 1. TypeScript Source Files (src/**/*.ts)
Key files that reference the context directory:
- `src/parsers/context-parser.ts` - hardcoded path `.context-master/context`
- `src/services/context-service.ts` - hardcoded path `.context-master/context`
- `src/services/registry.service.ts` - hardcoded path `.context-master/context`
- `src/tools/add_context.tool.ts` - path to `.context-master/context`
- `src/tools/read_context.tool.ts` - paths to `.context-master/context`
- `src/tools/setup.tool.ts` - creates and references context directory

### 2. Documentation Files (.md)
- `README.md` - mentions `.context-master/context` folder
- `AGENTS.md` - multiple references to `.context-master/context/`
- `CLAUDE.md` - references context directory
- `.context-master/cm-status.md` - references context directory

### 3. Template Files (templates/**)
- `templates/agent-prompt.md`
- `templates/cm-context-reader-APG.md` - extensive references
- `templates/cm-instructions.md` - multiple references

### 4. Test Files
- `test/old-setup-legacy.js` - creates context directory

### 5. Configuration Files
- `.claude/agents/context-reader.md` - references context directory
- `.github/copilot-instructions.md` - references context-master instructions

## Key Patterns to Replace
- `.context-master/context` → `.context-master/knowledge`
- `context/` → `knowledge/` (in appropriate contexts)
- `contextDir` variable names → `knowledgeDir`
- `knowledge-manifest.yaml` → `knowledge-manifest.yaml`
- References to "context files" → "knowledge files"
- References to "context directory" → "knowledge directory"

## Strategy
1. Update TypeScript source files first
2. Update documentation and templates
3. Update configuration files
4. Test the changes