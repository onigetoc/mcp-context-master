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

### 1. Project Path Requirement - CRITICAL
All Context Master tools REQUIRE the absolute path to the user's project directory. MCP servers run in their own directory and cannot auto-detect the user's project location.

```typescript
// ✅ CORRECT - Always provide project path
add_project_context(
  "remotion",
  "C:\\Users\\Name\\projects\\my-app",  // REQUIRED
  "srt captions"
)
setup_project_context("C:\\Users\\Name\\projects\\my-app")

// ❌ WRONG - Missing project path will fail
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

1. **`add_project_context(library, projectPath, topic?, tokens?)`**
   - Downloads focused documentation for a specific library
   - **REQUIRES absolute project path** (MCP server can't auto-detect)
   - Saves to `.context-master/knowledge/`
   - Example: `add_project_context("remotion", "C:\\Users\\Name\\projects\\my-app", "srt captions", 5000)`

2. **`setup_project_context(projectPath, maxDependencies?)`**
   - Analyzes entire project dependencies
   - **REQUIRES absolute project path** (MCP server can't auto-detect)
   - Downloads docs for high-priority libraries only
   - Example: `setup_project_context("C:\\Users\\Name\\projects\\my-app", 20)`

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
const projectPath = "C:\\Users\\Name\\projects\\my-app";  // REQUIRED
setup_project_context(projectPath)

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
const projectPath = "C:\\Users\\Name\\projects\\my-app";  // REQUIRED
add_project_context("library-y", projectPath, "feature x")
```

### Multiple Related Libraries
```typescript
// For complex features spanning libraries:
const projectPath = "C:\\Users\\Name\\projects\\my-app";  // REQUIRED
add_project_context("next-auth", projectPath, "credentials provider")
add_project_context("prisma", projectPath, "user authentication")
add_project_context("trpc", projectPath, "protected procedures")

// Then synthesize from all three contexts
```

## ⚠️ Important Reminders

1. **ALWAYS Provide Project Path** - MCP servers can't auto-detect the user's project location
2. **Use Absolute Paths** - Never use relative paths (e.g., `./my-app` won't work)
3. **Trust Your Knowledge** - Don't download docs for libraries you already know well
4. **Check Existing Contexts** - Avoid duplicate downloads
5. **Read Once** - Each context file should be read only once per conversation

## 🎯 Summary

**Key Rules for Every Conversation:**
- **ALWAYS provide the absolute project path** - MCP servers can't auto-detect it
- The AI assistant knows the user's project location - pass it explicitly
- Use Context Master for specialized libraries only
- Check existing contexts before downloading
- Read each context file only once per conversation
- Focus on libraries that truly need documentation

---

**This guide is automatically included at the start of every conversation to ensure optimal Context Master usage.**
