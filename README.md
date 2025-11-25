# MCP Context Master

An intelligent Model Context Protocol (MCP) server that revolutionizes project bootstrapping by automatically discovering and downloading the most relevant contextual documentation for your development projects.

## Overview

Context Master transforms how developers start new projects by providing intelligent context gathering through:

1. **Smart Project Analysis** - Automatically analyzes your project dependencies
2. **Intelligent Priority System** - Advanced scoring to recommend only the most valuable documentation
3. **Automated Documentation** - Downloads comprehensive project context as organized markdown files
4. **Project Intelligence** - Understands your tech stack and suggests the best resources

## Key Features

- **🧠 Intelligent Analysis**: Automatically analyzes package.json, requirements.txt, and project structure
- **🎯 Smart Prioritization**: Advanced scoring system that identifies which libraries truly need documentation
- **🔍 Enhanced GitHub Search**: Multi-criteria search with relevance scoring and health indicators
- **📥 Automated Downloads**: Bulk download of prioritized documentation with smart naming
- **📊 Project Intelligence**: Understands your tech stack and provides tailored recommendations
- **🚀 One-Command Setup**: Complete project context setup with a single `setup_project_context` call

## Structure

- **Context Files**: Downloaded `.md` files containing comprehensive project documentation
- **Project Documentation**: Additional documentation for understanding your project dependencies

## Installation

### Quick Start

```bash
# Clone the repository
git clone https://github.com/onigetoc/mcp-context-master.git
cd mcp-context-master

# Install dependencies
npm install

# Build the project
npm run build
```

### Environment Setup

Create a `.env` file with your GitHub token:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

Get your GitHub token from: https://github.com/settings/tokens

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
      }
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

### 1. `setup_project_context` ⭐ **Main Tool**

Initialize and setup Context Master for a project. Analyzes your project dependencies and downloads documentation for important libraries.

### 2. `add_project_context`

Fetch and download context for a single library and add it to the project.

### 3. `list_available_contexts`

List all available context files in your project.

### 4. `read_specific_context`

Read the content of a specific context file.

### 5. `read_template`

Read a Context Master template file from your project.

### 6. `search_github`

Search GitHub repositories for project context.

### 7. `coding_assistant`

Detect your current coding assistant and determine the appropriate context to use.

## Usage Examples

### Initialize a New Project

To set up Context Master for your project:

```
User: "Initialize context master for my project"
Tool: setup_project_context will analyze your package.json/requirements.txt and download relevant documentation
```

### Add Context for a Specific Library

To add documentation for a library:

```
User: "Add project context for remotion"
Tool: add_project_context will search and download remotion documentation
```

### List Downloaded Context

To see what documentation you have:

```
User: "List available contexts"
Tool: list_available_contexts will show all downloaded context files
```

### View Documentation

To read a specific context file:

```
User: "Read the react context"
Tool: read_specific_context will display the documentation
```

## Requirements

- Node.js 18+
- GitHub token (for repository search)
- Internet connection (for documentation downloads)
- MCP client (Claude Desktop, VSCode, Kiro, etc.)

## License

MIT
