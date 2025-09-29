# Context Master - Quick Start Guide

## For AI Assistants Using This MCP Server

When a user asks for Context Master help, follow this simple pattern:

### 1. User Says `/cm-init` or "initialize context"
→ **Use the `cm_init` tool immediately**

```json
{
  "name": "cm_init",
  "arguments": {
    "projectPath": "."
  }
}
```

This will give you complete instructions on what to do next.

### 2. User Wants Full Project Analysis
→ **Use `setup_project_context`**

```json
{
  "name": "setup_project_context",
  "arguments": {
    "projectPath": ".",
    "maxDependencies": 10
  }
}
```

### 3. User Wants Specific Library Documentation
→ **Use `add_project_context`**

```json
{
  "name": "add_project_context", 
  "arguments": {
    "libraryName": "zustand"
  }
}
```

## Priority Decision Tree

```
Is the library specialized/unique? (remotion, zustand, framer-motion)
├─ YES → HIGH PRIORITY → Download documentation
└─ NO → Is it extremely popular? (react, express, lodash)
    ├─ YES → LOW PRIORITY → Skip documentation  
    └─ NO → MEDIUM PRIORITY → Ask user or download if unsure
```

## Common User Requests & Responses

| User Says | You Do | Tool to Use |
|-----------|---------|-------------|
| "/cm-init" | Initialize project | `cm_init` |
| "analyze my project" | Full analysis | `setup_project_context` |
| "add context for X" | Download X docs | `add_project_context` |
| "what's downloaded?" | List contexts | `list_available_contexts` |
| "show me X docs" | Read X context | `read_specific_context` |

## Success Pattern

1. **Always start with `cm_init`** for new users
2. **Follow the instructions** it provides
3. **Be selective** - don't download everything
4. **Explain your reasoning** for priority decisions

That's it! The `cm_init` tool will guide you through everything else.