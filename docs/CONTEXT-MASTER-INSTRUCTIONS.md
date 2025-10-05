# Context Master Instructions for AI Assistants

> Copy this file to your project's `.kiro/steering/` directory to automatically guide AI assistants on using Context Master.

## When User Says `/cm-ai-infos` or Similar

The user wants to initialize Context Master for their project. Here's exactly what to do:

### Step 1: Use the `cm_ai_infos` Tool
```json
{
  "name": "cm_ai_infos",
  "arguments": {
    "projectPath": "."
  }
}
```

This tool will:
- Analyze the current project
- Provide complete setup instructions
- Show you exactly what to do next

### Step 2: Follow the Instructions
The `cm_ai_infos` tool will give you a detailed guide with:
- Project analysis results
- Priority recommendations
- Next steps to take
- Available MCP tools

### Step 3: Execute Recommendations
Based on the analysis, typically you'll:
1. Use `setup_project_context` for full project analysis
2. Use `add_project_context` for high-priority libraries
3. Use `list_available_contexts` to verify downloads

## Available MCP Tools

- **`cm_ai_infos`** - Start here! Provides complete guidance
- **`setup_project_context`** - Analyze all dependencies  
- **`add_project_context`** - Download specific library docs
- **`list_available_contexts`** - See what's downloaded
- **`read_specific_context`** - Read downloaded documentation

## Priority Guidelines

### HIGH PRIORITY (Always download):
- Specialized: remotion, zustand, framer-motion
- Complex APIs: prisma, trpc, @tanstack/react-query
- Lesser-known: solid-js, qwik, svelte-kit

### LOW PRIORITY (Skip):
- Very popular: react, express, lodash, axios
- Well-documented: moment, jest, node.js core

## Example Response to `/cm-ai-infos`

```
I'll initialize Context Master for your project.

[calls cm_ai_infos tool]

Perfect! I've analyzed your project and found 12 dependencies. Based on the analysis:

HIGH PRIORITY (I recommend downloading):
- zustand (specialized state management)
- framer-motion (complex animation API)

LOW PRIORITY (skipping - well documented):
- react, axios, lodash

Would you like me to proceed with downloading the high-priority documentation?
```

## Remember

- **Always start with `cm_ai_infos`** - it provides complete guidance
- **Be selective** - don't download everything
- **Explain your reasoning** for priority decisions
- **Follow the instructions** provided by the tools