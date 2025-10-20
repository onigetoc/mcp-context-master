# AI Agent Instructions for Context Master

## Overview

This project uses **Context Master** - an MCP server that provides up-to-date documentation for libraries and frameworks. This file contains instructions for AI coding assistants on how to effectively use Context Master.

## Quick Reference

### Available Context Files

Check `.context-master/knowledge/` for downloaded documentation:

**🎯 File Type Recognition (IMPORTANT):**
- **Files with `topic-`** = Focused, specific documentation (PREFERRED)
- **Files with `full-context`** = Broad, general documentation (10k tokens)
- **Files with just `context`** = Basic documentation (avoid when possible)

**File Naming Patterns:**
- `cm-[library]-topic-[keywords]-[YYYY-MM-DD].md` - **Focused documentation** (3000-5000 tokens) for specific features/topics
- `cm-[library]-full-context-[YYYY-MM-DD].md` - **General documentation** (10,000 tokens) for broad library overview
- `cm-[library]-context-[YYYY-MM-DD].md` - **Basic documentation** (default when no topic specified)

**Examples:**
- `cm-axios-topic-http-requests-2025-10-20.md` - Focused on HTTP requests with Axios
- `cm-react-topic-hooks-2025-10-20.md` - Focused on React hooks
- `cm-remotion-topic-srt-captions-2025-10-20.md` - Focused on SRT captions in Remotion
- `cm-nextjs-full-context-2025-10-20.md` - General Next.js documentation (10k tokens)
- `cm-lodash-context-2025-10-20.md` - Basic Lodash documentation (no specific topic)

### Key Commands

- `/cm-add [library] [topic]` - Add documentation for a library
- `/cm-list` - List available contexts
- `/cm-read [file]` - Read specific context file
- `/cm-search [library]` - Find library on GitHub

## Usage Guidelines for AI Assistants

### When to Use Context Master

✅ **DO use for:**

- Specialized libraries (Remotion, Clerk, tRPC, Prisma, Supabase)
- Complex integrations or advanced patterns
- Libraries you're uncertain about
- New or rapidly evolving frameworks
- **Specific features** within well-known libraries (e.g., React hooks, Axios interceptors)

❌ **DON'T use for:**

- Well-known libraries for basic operations (React useState, Express routing basics)
- Simple operations (map, filter, console.log)
- Libraries already covered in current conversation
- General knowledge you already possess

### Decision Workflow

```
User asks about library feature
    ↓
Already know this well? → YES: Answer directly
    ↓ NO
Already read in conversation? → YES: Use existing knowledge
    ↓ NO
Check .context-master/knowledge/ for existing files
    ↓
Exists? → YES: Read once and use
    ↓ NO
Use Context Master to add documentation
```

### Best Practices

1. **Prefer Topic-Specific Files**

   - ✅ **Always specify a topic** when requesting documentation (1-2 keywords)
   - ✅ **Good topics**: "authentication", "srt captions", "server actions", "hooks", "interceptors"
   - ❌ **Avoid generic**: "docs", "help", "general", "overview"
   - **Topic files are smaller, faster, and more focused** (3000-5000 tokens vs 10,000)

2. **Check Existing Files First**

   - Look in `.context-master/knowledge/` before requesting new docs
   - **Prefer topic-specific files** over "full-context" files when available
   - File dates indicate freshness (newer = more current)

3. **Use Full Context Sparingly**

   - Only request "full-context" files when you need **broad library overview**
   - Use when exploring a completely new library
   - Avoid for specific feature questions

4. **Read Once Per Conversation**

   - Don't re-read the same context file multiple times
   - Trust the information you've already loaded

5. **Smart Topic Selection**
   - **For React**: "hooks", "context", "performance", "testing"
   - **For Axios**: "interceptors", "error-handling", "authentication"
   - **For Next.js**: "app-router", "server-actions", "middleware"
   - **For Remotion**: "srt-captions", "animations", "rendering"

## Context Master Integration

### Automatic Setup

Context Master has already analyzed this project's dependencies and downloaded relevant documentation. The available contexts are listed in `.context-master/knowledge/`.

### Adding New Context

When you encounter a library that needs documentation:

1. **Check existing files** in `.context-master/knowledge/`
   - **Look for topic-specific files first**: `cm-[library]-topic-[keywords]-[date].md`
   - **Check for full-context files**: `cm-[library]-full-context-[date].md`
   - **Avoid basic context files**: `cm-[library]-context-[date].md` (prefer topic-specific)

2. **If not found**, use Context Master with **specific topics**:
   - ✅ `add_project_context("axios", "interceptors")` → `cm-axios-topic-interceptors-2025-10-20.md`
   - ✅ `add_project_context("react", "hooks")` → `cm-react-topic-hooks-2025-10-20.md`
   - ❌ `add_project_context("axios")` → `cm-axios-context-2025-10-20.md` (generic)

3. **Only use full context when needed**:
   - For completely new libraries you're unfamiliar with
   - When you need broad understanding before focusing on specifics

4. **Read the generated file** once and use that knowledge for the conversation

### File Organization

- **Location**: `.context-master/knowledge/`
- **Naming**: `cm-[library]-[topic]-[YYYY-MM-DD].md`
- **Size**: Typically 3000-5000 tokens of focused documentation

## Project-Specific Context

### Dependencies Analysis

Context Master has analyzed this project's `package.json`/`requirements.txt` and identified key dependencies. Check the knowledge folder for pre-downloaded documentation.

### Specialized Libraries Detected

The following specialized libraries were found and may have context available:

- Check `.context-master/knowledge/` for specific documentation files
- Use `/cm-list` to see all available contexts

## Integration Tips

### For Complex Features

When working on features that span multiple libraries:

1. Load context for each relevant specialized library
2. Synthesize information from multiple sources
3. Focus on integration patterns and best practices

### For New Libraries

When the user mentions a library not in the knowledge base:

1. **Assess the need**: Is it specialized enough to warrant documentation?
2. **Choose the right approach**:
   - **For specific features**: Use topic-focused documentation
   - **For new libraries**: Consider full-context first, then topic-specific as needed
3. **Examples**:
   - User asks about "Axios error handling" → `add_project_context("axios", "error-handling")` → `cm-axios-topic-error-handling-2025-10-20.md`
   - User asks about "What is Remotion?" → `add_project_context("remotion")` → `cm-remotion-context-2025-10-20.md` (basic)
   - User asks about "Remotion SRT captions" → `add_project_context("remotion", "srt-captions")` → `cm-remotion-topic-srt-captions-2025-10-20.md`

### For Updates

If documentation seems outdated:

1. Note the file date in `.context-master/knowledge/`
2. Request updated documentation if needed
3. Compare with existing knowledge for changes

## Remember

- Context Master provides **focused, up-to-date documentation**
- Use it **selectively** for specialized libraries
- **Trust your existing knowledge** for mainstream tools
- **Read context files once** and apply throughout the conversation

This system ensures you have the right documentation at the right time, without overwhelming you with unnecessary information.
