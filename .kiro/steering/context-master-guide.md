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
Check .context-master/knowledge/ for existing files
    ↓
Exists? → YES: Read once
    ↓ NO
add_project_context(absolute_path, library, specific_topic)
```

### Path Requirement - CRITICAL

**⚠️ You MUST always provide the absolute project path:**

```typescript
// ✅ CORRECT - Always include projectPath
add_project_context(
  "remotion",                           // Library name
  "C:\\Users\\Name\\projects\\my-app",  // Project path (REQUIRED)
  "srt captions",                       // Topic (optional)
  5000                                  // Tokens (optional)
)

// ❌ WRONG - Missing projectPath will fail
add_project_context(
  "remotion",
  "srt captions"
)
```

**Why projectPath is required:**
- MCP servers run in their own directory (e.g., `C:\Users\Name\.mcp\context-master`)
- `process.cwd()` returns the MCP server's location, NOT the user's project
- The AI assistant knows the user's project location - you must pass it explicitly
- Without the correct path, files will be created in the wrong location

### Available Commands
- `/cm-init`: calling the `initialize_context_master` tool to Initialize Context Master (first-time setup - downloads template only)
- `/cm-ai-infos`: Configure AI assistant information (creates cm-ai-infos.yaml)
- `/cm-setup`: Complete setup - analyze dependencies and download documentation
- `/cm-add [library] [topic]`: Add documentation for a specific library/API
- `/cm-search [library]`: Find library on GitHub
- `/cm-npm [package]`: Search NPM registry
- `/cm-list`: List available contexts
- `/cm-read [file]`: Read context file

### Available MCP Tools

#### `initialize_context_master` - First-time setup
```typescript
initialize_context_master(
  projectPath: string      // REQUIRED: Absolute path to user's project
)
```

**Returns:** Instructions for LLM to create cm-ai-infos.yaml

**CRITICAL: Always provide projectPath**
- This is the FIRST tool to call when setting up Context Master
- Downloads only cm-ai-infos.md template from GitHub
- Creates .context-master directory
- Guides LLM to configure AI assistant identity
- After completion, LLM must create cm-ai-infos.yaml and call setup_project_context

**What it does:**
1. Creates .context-master directory
2. Downloads cm-ai-infos.md template from GitHub
3. Returns template content and instructions for LLM
4. LLM should then create cm-ai-infos.yaml with proper values
5. LLM should then call setup_project_context to complete setup

#### `add_project_context` - Main tool
```typescript
add_project_context(
  library: string,         // GitHub name (e.g., "remotion")
  projectPath: string,     // REQUIRED: Absolute path to user's project
  topic?: string,          // Optional specific feature (e.g., "srt captions")
  tokens?: number          // Optional token count (default: 3000)
)
```

**Returns:** Path to created file: `cm-[library]-[topic]-[YYYY-MM-DD].md`

**CRITICAL: Always provide projectPath**
- MCP servers run in their own directory, not the user's project
- You MUST explicitly pass the absolute path to the user's project
- Example: `C:\Users\Name\projects\my-app` or `/home/user/projects/my-app`

**What it does:**
1. Uses provided project directory path
2. Searches GitHub for library
3. Gets repo URL
4. Downloads Context7 docs (~3000 tokens)
5. Saves to `.context-master/knowledge/`

#### `setup_project_context` - Project initialization
```typescript
setup_project_context(
  projectPath: string,     // REQUIRED: Absolute path to user's project
  maxDependencies?: number // Optional max deps to analyze (default: 20)
)
```

**CRITICAL: Always provide projectPath**
- MCP servers run in their own directory, not the user's project
- You MUST explicitly pass the absolute path to the user's project
- Example: `C:\Users\Name\projects\my-app` or `/home/user/projects/my-app`

**What it does:**
1. Uses provided project directory path
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
// 2. Download focused docs (MUST provide project path)
add_project_context(
  "remotion",
  "C:\\Users\\Name\\projects\\my-video-app",  // User's project path
  "srt captions"
)

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


#### Example 3: Project Setup (First Time)

User: "Initialize Context Master"

```typescript
// Step 1: Initialize (downloads template only)
initialize_context_master("C:\\Users\\Name\\projects\\my-app")

// Step 2: LLM reads template and creates cm-ai-infos.yaml with:
// provider: anthropic
// model: claude-sonnet-4
// ide: kiro
// extension: kiro

// Step 3: Complete setup (scans dependencies, downloads docs)
setup_project_context("C:\\Users\\Name\\projects\\my-app")

// System scans dependencies automatically
// Suggests contexts for specialized libraries only
```

#### Example 4: Library Name Variations

User: "Help with React Query mutations"

```typescript
// Context Master finds repo automatically
add_project_context(
  "React Query",                        // Finds: TanStack/query
  "C:\\Users\\Name\\projects\\my-app",  // Project path (REQUIRED)
  "mutations"
)
```

#### Example 5: JSON example for LLMs

User: "add stripe react payment and checkout to my project"

```json
// Context Master finds repo automatically, but needs project path
{
  "libraryName": "React Stripe js",
  "projectPath": "C:\\Users\\Name\\projects\\my-app",
  "topic": "payment checkout",
  "tokens": 5000
}
```

### Best Practices

#### 1. Always Provide Project Path
```typescript
// ✅ CORRECT - Always include absolute project path
add_project_context(
  "library-name",
  "C:\\Users\\Name\\projects\\my-app",
  "topic"
)

setup_project_context("C:\\Users\\Name\\projects\\my-app")

// ❌ WRONG - Missing project path
add_project_context("library-name", "topic")
setup_project_context()
```

#### 2. Use Absolute Paths
```typescript
// ✅ CORRECT - Absolute paths
"C:\\Users\\Name\\projects\\my-app"  // Windows
"/home/user/projects/my-app"         // Linux/Mac

// ❌ WRONG - Relative paths won't work
"./my-app"
"../projects/my-app"
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

#### Starting New Project (First Time)

```typescript
// 1. User: "Initialize Context Master"
const projectPath = "C:\\Users\\Name\\projects\\my-app";  // REQUIRED

// Step 1: Initialize (downloads template only)
initialize_context_master(projectPath)

// Step 2: LLM creates cm-ai-infos.yaml based on template instructions
// Example content:
// provider: anthropic
// model: claude-sonnet-4
// ide: kiro
// extension: kiro

// Step 3: Complete setup (scans dependencies, downloads docs)
setup_project_context(projectPath)

// 4. Review dependencies automatically
// 5. Suggest contexts for specialized libs only
// Example: "I see you use Remotion (specialized) and React (mainstream).
//           Should I download Remotion context? React doesn't need it."
```

#### During Development

```typescript
// User: "How do I use feature X in library Y?"
// 1. Assess: Is Y well-known? → Skip if yes
// 2. Check existing contexts
// 3. If needed:
add_project_context(
  "library-y",
  "C:\\Users\\Name\\projects\\my-app",  // REQUIRED
  "feature x"
)
```

### Advanced Usage

#### Multiple Libraries
```typescript
// For complex features spanning libraries:
const projectPath = "C:\\Users\\Name\\projects\\my-app";
add_project_context("next-auth", projectPath, "credentials provider")
add_project_context("prisma", projectPath, "user authentication")
add_project_context("trpc", projectPath, "protected procedures")

// Then synthesize from all three contexts
```

#### Updating Docs
```typescript
// Docs age - to refresh:
// 1. Note old file date
// 2. Re-run with same params
add_project_context(
  "remotion",
  "C:\\Users\\Name\\projects\\my-app",
  "srt captions"
)
// Creates: cm-remotion-srt-captions-2025-01-20.md (new date)

// 3. Old file can be removed
```

#### Custom Topics
```typescript
// Combine keywords for specialized docs:
const projectPath = "C:\\Users\\Name\\projects\\my-app";
add_project_context("next", projectPath, "server actions authentication")
add_project_context("react", projectPath, "hooks typescript patterns")
```

### Summary

**Key Rules:**
1. **ALWAYS provide projectPath** - MCP servers can't auto-detect user's project location
2. **Use absolute paths** - Never use relative paths
3. **Use for specialized libs** - Skip well-known ones
4. **One read per conversation** - Don't re-read
5. **Specific topics** - Better results

**Critical for LLM:**
- **YOU MUST ALWAYS PASS THE PROJECT PATH** - The MCP server runs in its own directory
- The AI assistant knows the user's project location - pass it explicitly
- Trust your knowledge on mainstream libs (React, Express, etc.)
- Check existing contexts before downloading
- Read each context file only once per conversation
- Focus on specialized libraries that need documentation

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