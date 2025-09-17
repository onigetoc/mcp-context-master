# MCP Context Master

Context Master is a Model Context Protocol (MCP) server for GitHub search and Context7 integration to help start programming projects with comprehensive context.

## Overview

This MCP server helps developers quickly gather comprehensive context for starting new projects by:

1. **Searching GitHub repositories** based on project requirements
2. **Converting GitHub URLs** to Context7 format for enhanced context
3. **Downloading rich context** as markdown files for project documentation
4. **Managing a tools registry** to track available project tools

## Features

- **🔍 GitHub Search**: Find relevant repositories with title, description, and URLs
- **🔄 Context7 Integration**: Convert GitHub URLs to Context7 format with topic/token filtering
- **📥 Context Download**: Download comprehensive project context as .md files
- **📋 Tools Registry**: Maintain a JSON registry of all available tools

This directory contains context documentation downloaded from Context7 and other project-related documentation.

## Structure

- **Context Files**: Downloaded `.md` files from Context7 containing comprehensive project context
- **Project Documentation**: Additional documentation for understanding and using this MCP server

## Usage

When you use the `download_context` tool, files will be automatically saved in .agents/context folder with metadata headers including:
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

## mcp-context-master Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Configure your MCP client to use this server

## Configuration

Add to your MCP client configuration (e.g., Claude Desktop):

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

### 1. `search_github`

Search GitHub repositories for project context.

**Parameters:**

- `query` (required): Search query (e.g., "ai sdk", "react components")
- `sort` (optional): Sort by "stars", "forks", or "updated" (default: "stars")
- `per_page` (optional): Number of results (1-100, default: 10)

### 2. `convert_to_context7`

Convert GitHub URL to Context7 format.

**Parameters:**

- `githubUrl` (required): GitHub repository URL
- `topic` (optional): Topic filter for context
- `tokens` (optional): Token limit for context (100-50000)

### 3. `download_context`

Download Context7 content as .md file.

**Parameters:**

- `context7Url` (required): Context7 URL to download
- `outputFilename` (required): Output filename (without extension)

### 4. `manage_tools_registry`

Create and manage tools registry.

**Parameters:**

- `action` (required): "create", "read", or "update"
- `projectType` (optional): Type of project
- `tools` (optional): Array of tools to add/update

### 5. `init_context_master`

Initializes the Context Master environment. Creates `AGENTS.md` and the `.agents` directory with `cm-init.md` if they don't exist.

**Parameters:**

- This tool takes no parameters.

### 6. `project_starter`

A comprehensive project starter that analyzes dependencies, searches GitHub, and downloads Context7 documentation in one go.

**Parameters:**

- `projectPath` (required): Path to the project directory to analyze (e.g., ".", "./my-project").
- `searchQuery` (optional): A search query to use if no package.json is found.
- `maxDependencies` (optional): Maximum number of dependencies to search for (default: 10).
- `downloadDocs` (optional): Whether to download Context7 documentation (default: true).
- `docsFolder` (optional): Folder to store downloaded docs (default: .agents/context).

### 7. `coding_assistant`

Reads the `.agents/ai-infos.json` file to determine the user's current coding assistant and the appropriate context file to use.

**Parameters:**

- This tool takes no parameters.

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

## CLI Testing Commands

Test the MCP server functionality using these CLI commands:

```bash
# Clone the repository
git clone https://github.com/onigetoc/mcp-context-master.git

# Navigate to the directory
cd mcp-context-master

# Install dependencies
npm install

# Build the project
npm run build

# Test all tools (comprehensive testing)
npm run test-tools

# Quick search test(defaut tokens 10 000)
node test/search-test.js "AI SDK"
node test/test-simple.js "mcp server typescript"

# Quick search test with topic filter (defaut tokens 10 000) and tokens
node test/search-test.js "Next.js" --topic "app-router"
node test/search-test.js "Remotion" --topic "caption from srt"
node test/search-test.js "Next.js" --topic "app-router" --tokens 2000

# Quick search & read test (--read | --readonly) will work
node test/search-test.js "Remotion" --topic "caption from srt" --read
node test/search-test.js "Next.js" --topic "app-router" --tokens 2000 --readonly

# Advanced CLI testing with multiple options

# Test the initialization tool
node test/test-init-tool.js

# Setup environment
node setup.js

# Simple connectivity test
node test/test-simple.js

# Protocol compliance testing
node test/test-tools.js

# Test the project starter tool
node test/test-project-master.js

# Test to view coding assistant
node test/test-coding-assistant.js
# example: [{"provider": "Anthropic", "model": "claude-sonnet-4-20250514", "ide": "VS Code", "extension": "Claude Code"}]
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

### Environment Setup

Create a `.env` file with your GitHub token:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

Get your GitHub token from: https://github.com/settings/tokens

## License

MIT
