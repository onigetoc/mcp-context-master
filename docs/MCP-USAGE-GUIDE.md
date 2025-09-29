# Context Master MCP Server - Usage Guide for AI Assistants

## Overview

This MCP server provides intelligent GitHub repository search and Context7 integration for downloading comprehensive documentation. It helps AI assistants understand when and how to download project context.

## Available Tools

### 1. `cm_init` - Start Here!
**When to use**: When user says `/cm-init`, "initialize context master", "setup context", or similar.

```json
{
  "name": "cm_init",
  "arguments": {
    "projectPath": "." // optional, defaults to current directory
  }
}
```

**What it does**: 
- Analyzes the current project
- Provides step-by-step instructions
- Lists all available tools
- Shows priority guidelines

### 2. `setup_project_context` - Full Analysis
**When to use**: After `cm_init`, or when user wants complete project analysis.

```json
{
  "name": "setup_project_context", 
  "arguments": {
    "projectPath": ".",
    "maxDependencies": 10
  }
}
```

**What it does**:
- Scans package.json for dependencies
- Searches GitHub for each dependency
- Provides priority recommendations
- Downloads high-priority documentation automatically

### 3. `add_project_context` - Single Library
**When to use**: To download documentation for a specific library.

```json
{
  "name": "add_project_context",
  "arguments": {
    "libraryName": "zustand" // or "react", "@tanstack/react-query", etc.
  }
}
```

**What it does**:
- Searches GitHub for the library
- Downloads comprehensive documentation
- Adds to project context

### 4. `list_available_contexts` - See What's Downloaded
**When to use**: To check what documentation is already available.

```json
{
  "name": "list_available_contexts",
  "arguments": {}
}
```

### 5. `read_specific_context` - Read Documentation
**When to use**: To read downloaded documentation for a specific library.

```json
{
  "name": "read_specific_context",
  "arguments": {
    "fileName": "cm-zustand-context-2024-01-15.md"
  }
}
```

## Priority Guidelines for AI Assistants

### 🔴 HIGH PRIORITY - Always Download
- **Specialized libraries**: remotion, zustand, framer-motion
- **Complex APIs**: prisma, trpc, @tanstack/react-query
- **Lesser-known frameworks**: solid-js, qwik, svelte-kit
- **Unique patterns**: jotai, valtio, xstate

### 🟡 MEDIUM PRIORITY - Context Dependent
- **Popular but complex**: next.js (advanced features), tailwindcss (custom)
- **Configuration-heavy**: webpack, vite, typescript (advanced)

### 🟢 LOW PRIORITY - Skip These
- **Extremely popular**: react, express, lodash, axios
- **Well-documented everywhere**: moment, jest, node.js core
- **Simple APIs**: date-fns, uuid, chalk

## Typical Workflow

### For New Projects:
1. User says `/cm-init` → Use `cm_init` tool
2. Follow the provided instructions
3. Use `setup_project_context` for full analysis
4. Use `add_project_context` for specific high-priority libraries

### For Existing Projects:
1. Use `list_available_contexts` to see what's already downloaded
2. Use `add_project_context` for missing libraries
3. Use `read_specific_context` to access documentation

## Error Handling

- If GitHub API fails → Suggest checking GITHUB_TOKEN
- If library not found → Try alternative names or manual search
- If download fails → Check network connection and retry

## Best Practices

1. **Always start with `cm_init`** for new users
2. **Explain the priority system** to users
3. **Don't download everything** - be selective
4. **Check existing contexts** before downloading
5. **Provide clear next steps** after each operation

## Example Conversations

### User: "/cm-init"
```
AI: I'll initialize Context Master for your project.

[calls cm_init tool]

Based on the analysis, I found 15 dependencies in your React project. Here's what I recommend:

HIGH PRIORITY (download documentation):
- zustand (state management)
- framer-motion (animations) 
- @tanstack/react-query (data fetching)

LOW PRIORITY (skip - well documented):
- react, axios, lodash

Would you like me to download the high-priority documentation?
```

### User: "Add context for zustand"
```
AI: I'll download the documentation for zustand.

[calls add_project_context with libraryName: "zustand"]

Successfully downloaded zustand documentation! The library provides a small, fast, and scalable state management solution. You can now use zustand patterns in your code with full context.
```

## Integration Notes

- This server works with any MCP-compatible AI assistant
- Requires GITHUB_TOKEN environment variable
- Downloads are stored in `~/.context-master/contexts/`
- Context files are named with timestamps for versioning