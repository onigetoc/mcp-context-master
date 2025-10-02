## Context Master (mcp-context-master) Instructions

### Overview
Context Master is an MCP server designed to enhance AI coding assistance by providing up-to-date, contextual documentation for libraries and frameworks. It leverages Context7's documentation service and GitHub and NPM registry search API to deliver relevant information precisely when needed during development.

### Core Philosophy: Use Selectively

✅ **DO use for:**
- Specialized libraries (Remotion, Clerk, tRPC, Prisma)
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
Check .context-master/context/ for existing files
    ↓
Exists? → YES: Read once
    ↓ NO
add_project_context(absolute_path, library, specific_topic)
```

### Critical: Absolute Paths Required

**⚠️ ALWAYS use absolute paths, never relative paths:**

```typescript
// ✅ CORRECT
add_project_context(
  "C:\\Users\\username\\projects\\my-app",  // Windows
  "remotion",
  "srt captions"
)

add_project_context(
  "/Users/username/projects/my-app",  // macOS/Linux
  "remotion",
  "srt captions"
)

// ❌ WRONG - Will fail
add_project_context(
  "./my-app",           // Relative path
  "remotion",
  "srt captions"
)
```

**How to get absolute path:**
- Ask user for project path if not obvious
- Use workspace root from IDE context
- Never assume or use relative paths

### Available Commands

- `/cm-init` or `/cm-setup`: Initialize (requires absolute project path)
- `/cm-add [library] [topic]`: Add documentation
- `/cm-search [library]`: Find on GitHub
- `/cm-npm [package]`: Search NPM
- `/cm-list`: List contexts
- `/cm-read [file]`: Read context

### Available MCP Tools

#### `add_project_context` - Main tool
```typescript
add_project_context(
  project_path: string,    // MUST be absolute path
  library: string,         // GitHub name (e.g., "remotion")
  topic: string           // Specific feature (e.g., "srt captions")
)
```

**Returns:** Path to created file: `cm-[library]-[topic]-[YYYY-MM-DD].md`

**What it does automatically:**
1. Searches GitHub for library
2. Gets repo URL
3. Downloads Context7 docs (~3000 tokens)
4. Saves to `.context-master/context/`

#### `setup_project_context` - Project initialization
```typescript
setup_project_context(
  project_path: string     // MUST be absolute path
)
```

**Critical:** If path is wrong, entire setup fails.

**What it does:**
1. Scans package.json, requirements.txt at `project_path`
2. Verifies packages via NPM
3. Creates `.context-master/` structure at `project_path`
4. Returns dependency list with stats

**Before calling:**
- Verify `project_path` exists
- Ensure it's the project root (contains package.json)
- Use absolute path only

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
View downloaded contexts (or browse `.context-master/context/` directly)

#### `read_specific_context` - Read file
Read context content (or open file directly)

### Workflow Examples

#### Example 1: Specialized Library

User: "Help me add SRT captions to Remotion"

```typescript
// 1. Check .context-master/context/ - not found
// 2. Get absolute path (critical!)
const projectPath = "C:\\Users\\dev\\remotion-project"

// 3. Download focused docs
add_project_context(projectPath, "remotion", "srt captions")

// 4. Read once: cm-remotion-srt-captions-2025-01-15.md
// 5. Provide guidance
```

#### Example 2: Well-Known Library (Skip)

User: "Create React component with useState"

```typescript
// ❌ DON'T use Context Master
// ✅ Answer directly - React basics are known
```

#### Example 3: Project Setup

User: "Initialize Context Master"

```typescript
// 1. CRITICAL: Get absolute project path
// Ask: "What's your project's absolute path?"
// User provides: "C:\\Users\\dev\\my-app"

// 2. Verify path exists and has package.json
// 3. Initialize
setup_project_context("C:\\Users\\dev\\my-app")

// 4. System scans dependencies
// 5. Suggest contexts for specialized libraries only
```

#### Example 4: Library Name Variations

User: "Help with React Query mutations"

```typescript
// Context Master finds repo automatically
add_project_context(
  absoluteProjectPath,
  "React Query",    // Finds: TanStack/query
  "mutations"
)
```

### Best Practices

#### 1. Always Use Absolute Paths
```typescript
// ✅ Correct
"C:\\Users\\name\\project"
"/home/user/project"
"/Users/name/project"

// ❌ Wrong
"./project"
"../project"
"project"
```

#### 2. Verify Before Setup
```typescript
// Before setup_project_context:
// 1. Confirm path exists
// 2. Check for package.json or requirements.txt
// 3. Use absolute path
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

**Location:** `.context-master/context/` (at project root)
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
// 2. You: "What's your project's absolute path?"
// 3. User: "C:\\Users\\dev\\my-app"
// 4. Verify path exists
// 5. Call setup
setup_project_context("C:\\Users\\dev\\my-app")

// 6. Review dependencies
// 7. Suggest contexts for specialized libs only
// Example: "I see you use Remotion (specialized) and React (mainstream).
//           Should I download Remotion context? React doesn't need it."
```

#### During Development

```typescript
// User: "How do I use feature X in library Y?"
// 1. Assess: Is Y well-known? → Skip if yes
// 2. Check existing contexts
// 3. If needed:
add_project_context(absoluteProjectPath, "library-y", "feature x")
```

### Advanced Usage

#### Multiple Libraries
```typescript
// For complex features spanning libraries:
add_project_context(path, "next-auth", "credentials provider")
add_project_context(path, "prisma", "user authentication")
add_project_context(path, "trpc", "protected procedures")

// Then synthesize from all three contexts
```

#### Updating Docs
```typescript
// Docs age - to refresh:
// 1. Note old file date
// 2. Re-run with same params
add_project_context(path, "remotion", "srt captions")
// Creates: cm-remotion-srt-captions-2025-01-20.md (new date)

// 3. Old file can be removed
```

#### Custom Topics
```typescript
// Combine keywords for specialized docs:
add_project_context(path, "next", "server actions authentication")
add_project_context(path, "react", "hooks typescript patterns")
```

### Summary

**Key Rules:**
1. **Absolute paths only** - Never relative
2. **Verify path before setup** - Check package.json exists
3. **Use for specialized libs** - Skip well-known ones
4. **One read per conversation** - Don't re-read
5. **Specific topics** - Better results

**Critical for LLM:**
- Always ask for absolute project path
- Verify path before calling setup
- Trust your knowledge on mainstream libs
- Check existing contexts before downloading
- Read each context file only once per conversation

**Path Examples:**
- Windows: `C:\\Users\\name\\project`
- macOS: `/Users/name/project`
- Linux: `/home/user/project`

### Context Handling Rules for MCP-Context-Master

Before responding to the user, always follow these steps:

1. **Check for Library or API References**  
   Determine if the user prompt is related to a specific **library** or **API** that may require documentation support.

2. **Verify Existing Context**  
   - First, check if the relevant documentation is already available in the  
     `.context-master/context` folder or already stored in memory.  
   - If it is found, use that existing context directly.

3. **Add Missing Context**  
   - If the required documentation is **not** available, use the `add_project_context` tool.  
   - This tool automatically downloads and stores the retrieved documentation inside `.context-master/context`.  
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