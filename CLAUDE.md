# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Model Context Protocol (MCP) server** that provides intelligent GitHub repository search and Context7 integration capabilities. It helps developers find relevant projects and download comprehensive documentation for programming project initialization.

## Core Architecture

The project follows a modular MCP server architecture with these key components:

- **MCP Server** (`src/server/mcp-server.ts`) - Main server handler using `@modelcontextprotocol/sdk`
- **Tool Registry** (`src/tools/`) - Modular tool system with registry management
- **GitHub API Integration** (`src/apis/github-api.ts`) - Octokit REST API client for repository search
- **Documentation Processing** (`src/parsers/`) - README and documentation parsers
- **Context7 Integration** - External service for enhanced documentation
- **Services Layer** (`src/services/`) - Business logic abstractions

## Directory Structure

```
src/
├── apis/           # GitHub API integration & external services
├── parsers/        # README and documentation parsers
├── server/         # MCP server implementation
├── services/       # Business logic services
├── tools/          # MCP tool definitions and handlers
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── index.ts        # Entry point
```

## Development Commands

### Primary Development
```bash
# Build TypeScript
bun run build              # Compile to ./build/

# Testing
bun run test               # Run test suite
bun run test-tools         # Test specific tools
bun run search             # Test GitHub search capabilities
```

### Development Workflow
1. **Always build before testing**: `bun run build`
2. **Test tools**: `bun run test-tools`
3. **Test search**: `bun run search`

### Package Management
⚠️ **Important**: Always use **Bun** instead of npm commands:
- `bun install` (not `npm install`)
- `bun add <package>` (not `npm install <package>`)
- `bun remove <package>` (not `npm uninstall <package>`)
- `bun run build` (not `npm run build`)

## Key Entry Points

- **Main**: `src/index.ts` (imports and starts MCP server)
- **Server**: `src/server/mcp-server.ts` (MCP protocol implementation)
- **Tools**: `src/tools/index.ts` (tool definitions and registry)

## Configuration

Create `.env` file in root:
```
GITHUB_TOKEN=your_github_token_here
```

## File Size Limits

**Maximum length per file: 500 lines**
If a file exceeds this, refactor into smaller modules/components.

## MCP Tool Registry

Tools are defined in `src/tools/` and registered in `src/tools/index.ts`:

1. **Search** - GitHub repository search with intelligent ranking
2. **Download** - README and documentation parsers
3. **Context** - Context7 documentation integration
4. **Setup** - MCP server installation tools

## Code Architecture Patterns

### Tool Interface
All tools follow this pattern:
```typescript
export const tool = {
  name: 'tool-name',
  description: 'Tool description',
  inputSchema: z.object({ ... }),
  handler: async (input) => {
    // Tool logic
    return { content: [...] };
  }
};
```

### Service Layer
Services abstract external dependencies:
- Repository search → `search.service.ts`
- Documentation download → `downloader.service.ts`
- Registry management → `registry.service.ts`

### Parser Pattern
Parsers handle different documentation formats:
- README files → `readme-parser.ts`
- Package.json → `package-parser.ts`
- Context7 responses → `context-parser.ts`

## Development Guidelines

### OS Compatibility
- Windows: Use PowerShell-compatible commands
- Paths: Use Windows separators or forward slashes
- No Unix-specific commands

### TypeScript Standards
- Strict mode enabled
- ES2020 target
- ESM modules
- Type hints for all functions

### Testing Structure
- Tests in `test/` directory
- Run `bun run build` before any tests
- Use JSON responses for MCP protocol validation

## Common Development Tasks

### 1. Add New GitHub Search Feature
```bash
# 1. Extend GitHub API
edit src/apis/github-api.ts

# 2. Add tool definition
edit src/tools/search.tool.ts

# 3. Register tool
edit src/tools/index.ts

# 4. Test
bun run build && bun run test-tools
```

### 2. Modify Documentation Processing
```bash
# Update parser
edit src/parsers/readme-parser.ts

# Test parsing
bun run build && bun run test
```

### 3. Add New Tool
```bash
# Create new tool file
edit src/tools/new-tool.ts

# Register in tools/index.ts

# Test
bun run build && bun run test-tools
```

## Build Process

1. **TypeScript compilation** from `src/` to `build/`
2. **ESM modules** only
3. **Type checking** enabled
4. **Source maps** available for debugging
5. **Output directory** ignored in git

## MCP Protocol Implementation

- **Transport**: stdio only
- **Protocol**: JSON RPC 2.0
- **Tools**: ListTools/CallTool handlers
- **Errors**: McpError class
- **Registration**: Via tool registry

## Quick Reference

| Task | Command |
|------|---------|
| Build | `bun run build` |
| Test tools | `bun run test-tools` |
| Test search | `bun run search` |
| Install deps | `bun install` |
| Add package | `bun add pkg-name` |
| Test all | `bun run test` |

## File Size Guidelines

- **Maximum**: 500 lines per file
- **Refactor**: Split large files into modules
- **Import**: Use clean imports/exports
- **Modular**: Keep each module focused


## Context Master Instructions
Use and follow the Context Master instructions from here: .context-master/context-master-agents-instructions.md