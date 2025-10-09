---
inclusion: always
priority: high
---

# Context Master - Initialization Instructions

## 🎯 Read This First in Every New Conversation

When starting a new conversation, you should be aware of Context Master capabilities and workflow.

## 📚 What is Context Master?

Context Master is an MCP server that provides intelligent, up-to-date documentation for libraries and frameworks. It helps you make smart decisions about which documentation to download and when.

## 🚀 Core Workflow

### 1. Automatic Path Detection
All Context Master tools automatically detect the current project directory. No need to ask users for paths.

```typescript
// ✅ Simple - works automatically
add_project_context("remotion", "srt captions")
setup_project_context()
```

### 2. Smart Documentation Strategy

**✅ USE Context Master for:**
- Specialized libraries (Remotion, Clerk, tRPC, Prisma)
- Complex APIs with unique patterns
- Libraries with poor web documentation
- Specific features you're uncertain about

**❌ SKIP Context Master for:**
- Well-known libraries (React, Express, Axios, Lodash)
- Basic operations (useState, map, filter)
- Libraries already covered in current conversation
- Mainstream frameworks with extensive documentation

### 3. Decision Tree

```
User asks about library feature
    ↓
Already know this well? → YES: Answer directly
    ↓ NO
Already read in conversation? → YES: Use existing knowledge
    ↓ NO
Check .context-master/knowledge/ for existing files
    ↓
Exists? → YES: Read once
    ↓ NO
add_project_context(library, specific_topic)
```

## 🛠️ Available MCP Tools

### Primary Tools

1. **`add_project_context(library, topic?, tokens?)`**
   - Downloads focused documentation for a specific library
   - Auto-detects project path
   - Saves to `.context-master/knowledge/`
   - Example: `add_project_context("remotion", "srt captions", 5000)`

2. **`setup_project_context(maxDependencies?)`**
   - Analyzes entire project dependencies
   - Auto-detects project path
   - Downloads docs for high-priority libraries only
   - Example: `setup_project_context(20)`

3. **`list_available_contexts()`**
   - Lists all downloaded documentation files
   - Check before downloading to avoid duplicates

4. **`read_specific_context(fileName)`**
   - Reads a specific context file
   - Use only once per conversation per file

### Supporting Tools

- `search_repositories(query)` - Find libraries on GitHub
- `search_npm_packages(query)` - Search NPM registry

## 📋 Best Practices

### 1. Check Before Download
Always check `.context-master/knowledge/` or use `list_available_contexts()` before downloading new documentation.

### 2. Use Specific Topics
- ✅ Good: "authentication", "srt captions", "server actions"
- ❌ Bad: "docs", "help", "guide"

### 3. One Read Per Conversation
Don't re-read files already loaded in the current conversation.

### 4. Token Management
- 3000-5000 tokens: Focused feature (default: 3000)
- 5000-8000 tokens: Broader overview
- Avoid >10000 tokens

### 5. Library Name Variations
Context Master automatically finds the correct repository:
- "React Query" → finds TanStack/query
- "Vercel AI SDK" → finds vercel/ai
- "Next.js" → finds vercel/next.js

## 🎯 Priority System

### 🔴 HIGH PRIORITY - Always Download
- Specialized frameworks (remotion, zustand)
- Complex APIs (prisma, trpc)
- Lesser-known libraries (< 10k GitHub stars)
- Recent or rapidly changing libraries

### 🟡 MEDIUM PRIORITY - Evaluate Based on Context
- Popular libraries with extensive APIs
- Configuration-heavy tools
- Framework-specific patterns

### 🟢 LOW PRIORITY - Skip
- Mainstream frameworks (react, express)
- Simple utility libraries (lodash, axios)
- Industry standards (jest, webpack basics)

## 📁 File Organization

**Location:** `.context-master/knowledge/` (at project root)
**Pattern:** `cm-[library]-[topic]-[YYYY-MM-DD].md`
**Size:** Typically 3000-5000 tokens

Check file dates - newer files have more current documentation.

## 🔄 Typical Workflows

### Starting New Project
```typescript
// 1. User: "Initialize Context Master"
setup_project_context()

// 2. Review dependencies automatically
// 3. Suggest contexts for specialized libs only
// Example: "I see you use Remotion (specialized) and React (mainstream).
//           Should I download Remotion context? React doesn't need it."
```

### During Development
```typescript
// User: "How do I use feature X in library Y?"
// 1. Assess: Is Y well-known? → Skip if yes
// 2. Check existing contexts
// 3. If needed:
add_project_context("library-y", "feature x")
```

### Multiple Related Libraries
```typescript
// For complex features spanning libraries:
add_project_context("next-auth", "credentials provider")
add_project_context("prisma", "user authentication")
add_project_context("trpc", "protected procedures")

// Then synthesize from all three contexts
```

## ⚠️ Important Reminders

1. **Automatic Path Detection** - Tools detect current working directory automatically
2. **Run from Project Root** - Best results when running from where package.json is located
3. **Trust Your Knowledge** - Don't download docs for libraries you already know well
4. **Check Existing Contexts** - Avoid duplicate downloads
5. **Read Once** - Each context file should be read only once per conversation

## 🎯 Summary

**Key Rules for Every Conversation:**
- Tools automatically detect current project directory
- Use Context Master for specialized libraries only
- Check existing contexts before downloading
- Read each context file only once per conversation
- Focus on libraries that truly need documentation

---

**This guide is automatically included at the start of every conversation to ensure optimal Context Master usage.**
