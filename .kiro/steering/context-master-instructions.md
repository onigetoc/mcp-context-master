
<!-- START: CONTEXT-MASTER -->

## Context Master (mcp-context-master) Instructions

### Overview

Context Master is an MCP server designed to enhance AI coding assistance by providing up-to-date, contextual documentation for libraries and frameworks. It leverages Context7's documentation service and GitHub and NPM registry search API to deliver relevant information precisely when needed during development.

### Core Philosophy: Use Selectively

✅ **DO use for:**

- Specialized libraries (eg: Remotion, Clerk, tRPC, Prisma)
- Specific features you're uncertain about
- Complex integrations or advanced patterns

❌ **DON'T use for:**

- Well-known libraries (React, Express, Axios, Lodash)
- Basic operations (useState, map, filter)
- Libraries already covered in current conversation

### Quick Decision Workflow

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
add_project_context(absolute_path, library, specific_topic)
```

# 🚨 CRITICAL: Project Path Requirement

## For AI Assistants Using Context Master

### The Rule

**ALWAYS provide the absolute project path when calling Context Master tools.**

### Why?

MCP servers run in their own directory (`~/.mcp/context-master/`), NOT in the user's project directory. The server has NO WAY to automatically detect where the user's project is located.

### You Already Know the Path!

As an AI assistant, you have access to:

- The user's current working directory
- The workspace root
- The project context

**Just pass it to the tool!**

### Correct Usage

```typescript
// ✅ ALWAYS DO THIS
add_project_context(
  "remotion", // library
  "C:\\Users\\Name\\projects\\my-app", // YOU KNOW THIS!
  "srt captions", // topic (optional)
  5000 // tokens (optional)
);

setup_project_context(
  "C:\\Users\\Name\\projects\\my-app", // YOU KNOW THIS!
  20 // maxDependencies (optional)
);
```

### Wrong Usage

```typescript
// ❌ NEVER DO THIS - Will fail with error
add_project_context("remotion", "srt captions");
setup_project_context();
```

### Platform Examples

```typescript
// Windows
"C:\\Users\\Name\\projects\\my-app";

// Linux
"/home/user/projects/my-app";

// Mac
"/Users/name/projects/my-app";

// WSL
"/mnt/c/Users/Name/projects/my-app";
```

### What Happens If You Forget?

The tool will return a helpful error message:

```json
{
  "success": false,
  "error": "Missing required parameter: projectPath",
  "message": "MCP servers cannot auto-detect user's project location",
  "instructions": { ... }
}
```

### Quick Checklist

Before calling Context Master tools:

- [ ] Do I have the user's project path?
- [ ] Is it an absolute path (not relative)?
- [ ] Am I passing it as the `projectPath` parameter?

### Remember

**The MCP server is blind to the user's project location. You are its eyes. Always tell it where to work.**

---

This is a fundamental limitation of how MCP servers work, not a bug. The server runs in isolation and relies on you to provide context.

### Automatic Path Detection

**✅ The tools now automatically detect your current project directory:**

```typescript
// ✅ SIMPLE - No path needed
add_project_context(
  "remotion", // Library name
  "srt captions" // Topic (optional)
);

// ✅ WITH OPTIONS
add_project_context(
  "remotion",
  "srt captions",
  5000 // Tokens (optional)
);
```

**Path Resolution:**

- Automatically uses `process.cwd()` (current working directory)
- Works from any directory where your project is located
- No need to manually specify paths in most cases

### Available Commands

When you see `/cm-` followed by a command, execute the corresponding MCP tool or action:

#### Core Commands

- **`/cm-help`**: Show numbered list of available commands for selection
- **`/cm-init`**: Call `initialize_context_master` tool to get AI assistant informations and setup
- **`/cm-setup`**: Call `setup_project_context` tool to analyze dependencies and download documentation
- **`/cm-add [library] [topic]`**: Call `add_project_context` tool for specific library/API
- **`/cm-list`**: Call `list_available_contexts` tool to show downloaded contexts
- **`/cm-read [file]`**: Call `read_specific_context` tool to read specific documentation

#### Utility Commands

- **`/cm-search [library]`**: Call `search_library_advisor` tool to find library on GitHub
- **`/cm-status`**: Show current project context status and configuration
- **`/cm-clean`**: Clean up downloaded documentation and reset context

#### Command Recognition

These commands work in any AI coding assistant (Cursor, Copilot, Cline, etc.). When you see a `/cm-` command:

1. Recognize the command pattern
2. Execute the corresponding MCP tool or provide the requested information
3. Give clear feedback to the user
4. Suggest next steps when appropriate

### Available MCP Tools

#### `add_project_context` - Main tool

```typescript
add_project_context(
  library: string,         // GitHub name (e.g., "remotion")
  topic?: string,          // Optional specific feature (e.g., "srt captions")
  tokens?: number          // Optional token count (default: 3000)
)
```

**Returns:** Path to created file: `cm-[library]-[topic]-[YYYY-MM-DD].md`

**What it does automatically:**

1. Detects current project directory
2. Searches GitHub for library
3. Gets repo URL
4. Downloads Context7 docs (~3000 tokens)
5. Saves to `.context-master/knowledge/`

#### `setup_project_context` - Project initialization

```typescript
setup_project_context(
  maxDependencies?: number // Optional max deps to analyze (default: 20)
)
```

**What it does:**

1. Detects current project directory automatically
2. Scans package.json, requirements.txt
3. Verifies packages via NPM
4. Creates `.context-master/` structure
5. Downloads documentation for important dependencies
6. Returns dependency analysis and setup results

#### `search_npm_packages` - Compare packages

```typescript
search_npm_packages(query: string, limit?: number)
```

**Use for:** Comparing libraries before choosing

#### `search_repositories` - Find on GitHub

```typescript
search_repositories(query: string, limit?: number)
```

**Use for:** Finding unclear library names

#### `list_available_contexts` - List files

View downloaded contexts (or browse `.context-master/knowledge/` directly)

#### `read_specific_context` - Read file

Read context content (or open file directly)

### Workflow Examples

#### Example 1: Specialized Library

User: "Help me add SRT captions to Remotion"

```typescript
// 1. Check .context-master/knowledge/ - not found
// 2. Download focused docs (auto-detects project path)
add_project_context("remotion", "srt captions");

// 3. Read once: cm-remotion-srt-captions-2025-01-15.md
// 4. Provide guidance
```

#### Example 2: Well-Known Library (Skip)

User: "Create React component with useState"

```typescript
// ❌ DON'T use Context Master
// ✅ Answer directly - React basics are known
```

## When adding documentations, try to use the full Github library name.

**Examples**

- Use "Vercel AI SDK" instead of Vercel.
- Use "Next.js" instead of "Next".
- Use "Tailwind CSS" instead of "tailwind"

#### Example 3: Project Setup

User: "Initialize Context Master"

```typescript
// 1. Auto-detect project directory and initialize
setup_project_context();

// 2. System scans dependencies automatically
// 3. Suggest contexts for specialized libraries only
```

#### Example 4: Library Name Variations

User: "Help with React Query mutations"

```typescript
// Context Master finds repo automatically
add_project_context(
  "React Query", // Finds: TanStack/query
  "mutations"
);
```

#### Example 5: JSON example for LLMs

User: "add stripe react payment and checkout to my project"

```json
// Context Master finds repo and project path automatically
{
  "libraryName": "React Stripe js",
  "topic": "payment checkout",
  "tokens": 5000
}
```

### Best Practices

#### 1. Automatic Path Detection

```typescript
// ✅ Simple and automatic
add_project_context("library-name", "topic");
setup_project_context();

// ✅ Works from any project directory
// The tools detect your current working directory automatically
```

#### 2. Run from Project Root

```typescript
// Best results when running from project root directory
// (where package.json or requirements.txt are located)
// Tools work from any directory but project root is optimal
```

#### 3. Use Specific Topics

- ✅ Good: "authentication", "srt captions", "server actions"
- ❌ Bad: "docs", "help", "guide"

#### 4. One Read Per Conversation

Don't re-read files already loaded

#### 5. Token Management

- 3000-5000 tokens: Focused feature
- 5000-8000 tokens: Broader overview
- Avoid >10000 tokens

### File Organization

**Location:** `.context-master/knowledge/` (at project root)
**Pattern:** `cm-[library]-[topic]-[YYYY-MM-DD].md`
**Size:** Typically 3000-5000 tokens

Check dates - newer = more current docs

### NPM vs GitHub

**NPM** (via `search_npm_packages`):

- Package names: `@tanstack/react-query`
- For comparing/choosing libraries
- Used by `setup_project_context` automatically

**GitHub** (via `add_project_context`):

- Repo names: "React Query", "TanStack/query"
- For downloading docs
- Context Master finds repo automatically

### Error Handling

#### Wrong Project Path

```typescript
// Symptom: "package.json not found"
// Fix: Use absolute path to project root

// ❌ Wrong
add_project_context("./src", ...)

// ✅ Correct
add_project_context("C:\\Users\\dev\\my-app", ...)
```

#### Library Not Found

1. Try alternative names
2. Check for renames (React Query → TanStack Query)
3. Use `search_repositories`

#### Documentation Incorrect

1. Verify repo matches library
2. Try more specific topic
3. Re-download with current date

### Integration Flow

#### Starting New Project

```typescript
// 1. User: "Initialize Context Master"
// 2. Auto-setup (detects current directory)
setup_project_context();

// 3. Review dependencies automatically
// 4. Suggest contexts for specialized libs only
// Example: "I see you use Remotion (specialized) and React (mainstream).
//           Should I download Remotion context? React doesn't need it."
```

#### During Development

```typescript
// User: "How do I use feature X in library Y?"
// 1. Assess: Is Y well-known? → Skip if yes
// 2. Check existing contexts
// 3. If needed:
add_project_context("library-y", "feature x");
```

### Advanced Usage

#### Multiple Libraries

```typescript
// For complex features spanning libraries:
add_project_context("next-auth", "credentials provider");
add_project_context("prisma", "user authentication");
add_project_context("trpc", "protected procedures");

// Then synthesize from all three contexts
```

#### Updating Docs

```typescript
// Docs age - to refresh:
// 1. Note old file date
// 2. Re-run with same params
add_project_context("remotion", "srt captions");
// Creates: cm-remotion-srt-captions-2025-01-20.md (new date)

// 3. Old file can be removed
```

#### Custom Topics

```typescript
// Combine keywords for specialized docs:
add_project_context("next", "server actions authentication");
add_project_context("react", "hooks typescript patterns");
```

### Summary

**Key Rules:**

1. **Automatic path detection** - No need to ask for paths
2. **Use for specialized libs** - Skip well-known ones
3. **One read per conversation** - Don't re-read
4. **Specific topics** - Better results
5. **Run from project root** - For best results

**Critical for LLM:**

- Tools automatically detect current project directory
- Trust your knowledge on mainstream libs (React, Express, etc.)
- Check existing contexts before downloading
- Read each context file only once per conversation
- Focus on specialized libraries that need documentation

### Context Integration During Package Installation

Whenever you install a library or dependency — whether it’s **NodeJS (npm, yarn, pnpm)**, **Python (pip, poetry) or any API added by you or asked by the user available on Github and/or Context7**, or any other package manager — you must always request **Context Master** to add the appropriate project context.  
This ensures that the downloaded documentation and metadata remain synchronized with the current project environment.

#### Context Addition Rules

- **Never use more than two keywords** in a single topic when calling `add_project_context` tool.
- If multiple new contexts need to be added, it’s better to **invoke the `add_project_context` tool multiple times**, each time using **only one or two highly specific keywords**.  
  This guarantees **fine-grained and precise context mapping**, instead of broad or ambiguous additions.

### Context Handling Rules for MCP-Context-Master

Before responding to the user, always follow these steps:

1. **Check for Library or API References**  
   Determine if the user prompt is related to a specific **library** or **API** that may require documentation support.

2. **Verify Existing Context**

   - First, check if the relevant documentation is already available in the  
     `.context-master/knowledge` folder or already stored in memory.
   - If it is found, use that existing context directly.

3. **Add Missing Context**

   - If the required documentation is **not** available, use the `add_project_context` tool.
   - This tool automatically downloads and stores the retrieved documentation inside `.context-master/knowledge`.
   - Example usage:
     ```
     library: remotion
     topic: srt
     ```

4. **Consult and Reuse Context Anytime**
   - At any point, you may consult the available documents or run `add_project_context` again if additional material is needed.
   - This ensures that the MCP server always provides the most relevant and up-to-date documentation.

---

By following these rules, MCP-Context-Master ensures that coding LLMs (such as GitHub Copilot, Cursor, Roo Code, Cline, Gemini CLI, Claude Code, etc.) always have the right context and documentation to assist the user effectively.

<!-- END: CONTEXT-MASTER -->


