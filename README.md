# MCP Context Master

An intelligent Model Context Protocol (MCP) server that revolutionizes project bootstrapping by automatically discovering and downloading the most relevant contextual documentation for your development projects.

## Overview

Context Master transforms how developers start new projects by providing intelligent context gathering through:

1. **Smart GitHub Discovery** - Automatically analyzes your project dependencies and finds relevant repositories
2. **Intelligent Priority System** - Uses advanced scoring to recommend only the most valuable documentation
3. **Context7 Integration** - Converts GitHub repositories to rich, structured context with topic filtering
4. **Automated Documentation** - Downloads comprehensive project context as organized markdown files
5. **Project Intelligence** - Understands your tech stack and suggests the best resources

## Key Features

- **🧠 Intelligent Analysis**: Automatically analyzes package.json, requirements.txt, and project structure
- **🎯 Smart Prioritization**: Advanced scoring system that identifies which libraries truly need documentation
- **🔍 Enhanced GitHub Search**: Multi-criteria search with relevance scoring and health indicators
- **🔄 Context7 Integration**: Seamless conversion to Context7 format with topic and token filtering
- **📥 Automated Downloads**: Bulk download of prioritized documentation with smart naming
- **📊 Project Intelligence**: Understands your tech stack and provides tailored recommendations
- **🚀 One-Command Setup**: Complete project context setup with a single `project_starter` call
- **📋 Tools Registry**: Comprehensive tracking of available project tools and dependencies

This directory contains context documentation downloaded from Context7 and other project-related documentation.

## Structure

- **Context Files**: Downloaded `.md` files from Context7 containing comprehensive project context
- **Project Documentation**: Additional documentation for understanding and using this MCP server

## Usage

When you use the `download_context` tool, files will be automatically saved in .context-master/context folder with metadata headers including:
- Source Context7 URL
- Original GitHub repository
- Download timestamp
- Full context content

## Example Files

After downloading context, you might see files like:
- `cm-vercel-ai-context.md` - Context for Vercel AI SDK
- `cm-react-components-context.md` - Context for React component libraries
- `cm-nodejs-api-context.md` - Context for Node.js API frameworks
- `cm-nextjs-2025-09-11.md` - Next.js info about app-router
- `cm-nextjs-TOPIC-app-router-2025-09-11.md` - Next.js info about app-router

Each file contains structured information to help you understand and start working with the respective projects.

## AI Assistant Information

The `.context-master/ai-infos.json` file stores information about the AI assistant currently in use. This allows the MCP server to be aware of the provider, model, IDE, and extension being used.

Example content of `.context-master/ai-infos.json`:
```json
{
  "provider": "Google",
  "model": "Gemini",
  "ide": "VS Code",
  "extension": "Gemini CLI"
}
```

## mcp-context-master Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Configure your MCP client to use this server

## Configuration

### MCP Client Configuration

Add to your MCP client configuration:

**For Kiro IDE (.kiro/settings/mcp.json):**
```json
{
  "mcpServers": {
    "mcp-context-master": {
      "command": "node",
      "args": [
        "C:\\path\\to\\mcp-context-master\\build\\index.js"
      ],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      },
      "disabled": false,
      "alwaysAllow": ["setup_project_context", "add_project_context", "list_available_contexts"]
    }
  }
}
```

**For Claude Desktop:**
```json
{
  "mcpServers": {
    "mcp-context-master": {
      "command": "node",
      "args": ["/path/to/mcp-context-master/build/index.js"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

## Available Tools

### Core Tools

### 1. `setup_project_context` ⭐ **Main Tool**

Initialize and setup Context Master for a project. Creates .context-master directory, downloads templates from GitHub, analyzes project dependencies, and downloads documentation for important libraries.

**Parameters:**
- `projectPath` (optional): Path to the project directory to analyze (default: ".")
- `maxDependencies` (optional): Maximum number of dependencies to search for (default: 10)

**Usage:** Use when user says 'init context master', 'setup context master', or '/cm-init'

### 2. `add_project_context`

Fetches and downloads the context for a single, new library and adds it to the project.

**Parameters:**
- `libraryName` (required): The name of the library to add (e.g., 'react', '@reduxjs/toolkit')
- `projectPath` (optional): Path to the project directory (default: ".")

**Usage:** 'add project context for react' or 'add project context for @reduxjs/toolkit'

### Context Management Tools

### 3. `list_available_contexts`

Lists all available context files from the context manifest.

**Parameters:** None

### 4. `read_specific_context`

Reads the content of a specific context file.

**Parameters:**
- `fileName` (required): The exact name of the context file to read

### 5. `read_template`

Read a Context Master template file from the user's project .context-master directory.

**Parameters:**
- `templateName` (required): Name of the template file to read
- `projectPath` (optional): Path to the project directory (default: ".")

### Legacy Tools (Deprecated)

### 6. `search_github`

Search GitHub repositories for project context.

**Parameters:**
- `query` (required): Search query (e.g., "ai sdk", "react components")
- `sort` (optional): Sort by "stars", "forks", or "updated" (default: "stars")
- `per_page` (optional): Number of results (1-100, default: 10)

### 7. `convert_to_context7`

Convert GitHub URL to Context7 format.

**Parameters:**
- `githubUrl` (required): GitHub repository URL
- `topic` (optional): Topic filter for context
- `tokens` (optional): Token limit for context (100-50000)

### 8. `download_context`

Download Context7 content as .md file.

**Parameters:**
- `context7Url` (required): Context7 URL to download
- `outputFilename` (required): Output filename (without extension)

### 9. `coding_assistant`

Reads the `.context-master/ai-infos.json` file to determine the user's current coding assistant and the appropriate context file to use.

**Parameters:** None

## Usage Examples

### 1. Search for AI SDK repositories

```typescript
// Search for AI-related repositories
const results = await searchGithub({
  query: "ai sdk language:typescript",
  sort: "stars",
  per_page: 5,
});
```

### 2. Convert to Context7 URL

```typescript
// Convert GitHub URL to Context7 format
const context7Url = convertToContext7({
  githubUrl: "https://github.com/vercel/ai",
  topic: "chatbot",
  tokens: 2000,
});
// Result: https://context7.com/vercel/ai/llms.txt?topic=chatbot&tokens=2000
```

### 3. Download context documentation

```typescript
// Download and save context
const filePath = await downloadContext({
  context7Url: "https://context7.com/vercel/ai/llms.txt",
  outputFilename: "vercel-ai-context",
});
// Creates: docs/vercel-ai-context.md
```

## Workflow Example

1. **Search for relevant projects**:

   ```
   search_github: "react component library"
   ```

2. **Convert interesting repositories to Context7**:

   ```
   convert_to_context7: "https://github.com/chakra-ui/chakra-ui"
   ```

3. **Download comprehensive context**:

   ```
   download_context: context7_url + "chakra-ui-components"
   ```

4. **Create tools registry for your project**:
   ```
   manage_tools_registry: action="create", projectType="react"
   ```

## File Structure

```
mcp-context-master/
├── src/
│   ├── apis/
│   │   └── github-api.ts
│   ├── parsers/
│   │   ├── package-parser.ts
│   │   └── readme-parser.ts
│   ├── server/
│   │   └── mcp-server.ts
│   ├── services/
│   ├── tools/
│   │   ├── context-downloader.ts
│   │   ├── context7-converter.ts
│   │   ├── index.ts
│   │   ├── init-tool.ts
│   │   ├── project-master.ts
│   │   ├── registry-manager.ts
│   │   └── search-tool.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── mcp-types.ts
│   │   └── schemas.ts
│   ├── utils/
│   │   ├── file-system.ts
│   │   └── logger.ts
│   └── index.ts
│   ├── docs/                           # Downloaded context files
│   ├── tools-registry.json            # JSON registry of tools
│   └── README.md
```

## Requirements

- Node.js 18+
- GitHub token (for repository search)
- Internet connection (for Context7 downloads)
- MCP client (Claude Desktop, VSCode, etc.)

## Environment Variables

- `GITHUB_TOKEN`: Required for GitHub API access

## Error Handling

The server includes comprehensive error handling for:

- Invalid GitHub tokens
- Network connectivity issues
- Context7 API rate limits
- File system operations
- Invalid input parameters

## Quick Start

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/onigetoc/mcp-context-master.git
cd mcp-context-master

# Install dependencies (use bun for better performance)
bun install

# Setup environment
bun run setup

# Build the project
bun run build
```

### Environment Configuration

Create a `.env` file with your GitHub token:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

Get your GitHub token from: https://github.com/settings/tokens

### CLI Testing Commands

Test the MCP server functionality:

```bash
# Complete project analysis and setup
node test/test-project-master.js

# Quick search with intelligent prioritization
node test/search-test.js "AI SDK"
node test/search-test.js "Next.js" --topic "app-router"
node test/search-test.js "Remotion" --topic "srt caption" --tokens 2000

# Read-only mode (preview without downloading)
node test/search-test.js "React components" --readonly

# Test all MCP tools
bun run test-tools

# Simple connectivity test
node test/test-simple.js

# View current coding assistant info
node test/test-coding-assistant.js
```

### Test Examples

**Basic GitHub Search:**

```bash
node test/search-test.js "Remotion"
```

**Search with Context7 Topic Filter:**

```bash
node test/search-test.js "Next.js" --topic "app-router"
```

**Advanced CLI Tool Testing:**

```bash
node test/search-test.js "react components" --topic "ui library" --tokens=2000
```

**Simple Test (no token required):**

```bash
node test/test-simple.js
```

**Protocol Testing (all tools):**

```bash
node test/test-tools.js
```

**AI Assistant Detection Test:**

```bash
node test/test-coding-assistant.js
```

### Environment Setup

Create a `.env` file with your GitHub token:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

Get your GitHub token from: https://github.com/settings/tokens

## Development

### System Requirements

- **Operating System**: Windows 10/11 (optimized for Windows development)
- **Package Manager**: Bun (preferred) or npm
- **Node.js**: 18+ 
- **TypeScript**: 5.0+

### Development Workflow

```bash
# Development mode with auto-rebuild
bun run dev

# Run tests
bun test

# Build for production
bun run build

# Start the MCP server
bun start
```

### Project Structure

```
mcp-context-master/
├── src/
│   ├── apis/           # GitHub API integration
│   ├── parsers/        # Project file parsers (package.json, etc.)
│   ├── server/         # MCP server implementation
│   ├── services/       # Business logic services
│   ├── tools/          # MCP tool implementations
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── test/               # CLI test scripts
├── context-master/     # Project documentation and roadmap
├── .context-master/    # AI assistant context files
└── build/              # Compiled output
```

### Recent Updates

- **2025-09-17**: Enhanced README and AGENTS documentation with current project state
- **2025-09-16**: Fixed build errors in context-master tool and registry service
- **2025-09-15**: Implemented intelligent priority system for dependency analysis
- **2025-09-14**: Added comprehensive project starter tool with bulk operations

## License

MIT
