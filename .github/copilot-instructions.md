## Project Overview

This is a **Model Context Protocol (MCP) server** that provides intelligent GitHub repository search and Context7 integration capabilities. It helps developers find relevant projects and download comprehensive documentation for programming project initialization.

## Architecture Overview

### Core Components
- **MCP Server (`src/server/mcp-server.ts`)**: Main server handler using `@modelcontextprotocol/sdk`
- **Tool Registry (`src/tools/`)**: Modular tool system with registry management
- **GitHub Integration (`src/apis/github-api.ts`)**: Octokit REST API client for repository search
- **Documentation Processing (`src/parsers/`)**: README and documentation parsers
- **Context7 Integration**: External service integration for enhanced documentation

### Directory Structure
```
src/
├── apis/           # GitHub API integration
├── parsers/        # README and documentation parsers
├── server/         # MCP server implementation
├── services/       # Business logic services
├── tools/          # MCP tool definitions and handlers
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Development Commands

### Primary Commands
```bash
# Development
bun run dev        # Build and start MCP server (via build/index.js)
bun run build      # TypeScript compilation to ./build/

# Testing
bun run test       # Run test suite
bun run test-tools  # Test specific tools functionality
npm run search      # Test GitHub search capabilities

# Setup
bun run setup      # Install dependencies and initial configuration
```

### Server Operations
The server runs as an MCP server and communicates via stdio. For testing:
- Use `npm run build` first to compile TypeScript
- The server reads from stdin and writes JSON responses to stdout
- Configure as MCP client (Cursor, Claude Desktop, Kiro etc.) using the executable path

### Key Tools Available
- `search_repositories` - Search GitHub repos with intelligent ranking
- `download_readme` - Download and parse README files
- `get_context7_docs` - Download Context7 documentation
- `install_mcp_server` - Install other MCP servers
- `repair_mcp_server` - Repair broken MCP installations

## API Integration

### GitHub API (Octokit)
- Uses `@octokit/rest` v21.1.1
- Implements repository search with star count and relevance ranking
- Rate limiting handled through octokit client

### External Services
- **Context7**: Documentation enhancement service integration
- GitHub OAuth tokens read from environment variables

## Configuration

### Environment Variables
Create `.env` file in root:
```
GITHUB_TOKEN=your_github_token_here
```
## System Specifications
- **Operating System**: Windows 10/11
- **Package Manager**: Bun (always use `bun` commands, never `npm`)
- **No Linux/macOS commands**: Only use Windows-compatible commands and paths

## Package Management Rules
- **ALWAYS use `bun` instead of `npm`**:
  - `bun install` instead of `npm install`
  - `bun add` instead of `npm install package`
  - `bun remove` instead of `npm uninstall`
  - `bun run` instead of `npm run`
  - `bun run dev` instead of `npm run dev`
  - `bun run build` instead of `npm run build`

### Package.json Key Points
- **Entry**: `build/index.js` (compiled from src/index.ts)
- **Type**: ESM modules
- **TypeScript**: Strict mode enabled with ES2020 target
- **Prerequisites**: Node.js v16+ recommended

## Windows Path Conventions
- Use Windows path separators (`\` or `/`)
- Use Windows environment variables when needed
- Avoid Unix-style commands and paths
- Use `cmd.exe` or PowerShell compatible commands

+++
# --- Basic Metadata ---
id = "RURU-RULE-OS-AWARE-CMDS-V3" # Incremented version
title = "Rule: Generate OS-Aware and Syntactically Correct Commands"
context_type = "rules"
scope = "Command generation for execute_command tool based on detected OS"
target_audience = ["all"] # Apply to all modes using execute_command
granularity = "procedure" # Changed from ruleset to procedure as it defines steps
status = "active"
last_updated = "2025-04-22" # Use current date
tags = ["rules", "shell", "commands", "os-awareness", "powershell", "bash", "execute_command", "windows", "linux", "macos", "syntax", "chaining", "conditional-execution"] # Added tags
template_schema_doc = ".ruru/templates/toml-md/16_ai_rule.README.md"
related_context = [".roo/rules/03-standard-tool-use-xml-syntax.md"]
relevance = "Critical: Prevents command execution errors"
+++

# Mandatory Rule: Generate OS-Aware and Syntactically Correct Commands

Context: Commands executed via `execute_command` run within the user's VS Code integrated terminal environment. The underlying operating system significantly impacts required command syntax. Assume the host OS is provided via context (e.g., `environment_details.os` with values like `win32`, `darwin`, `linux`).

Rule:

When formulating commands intended for execution via the `execute_command` tool, you MUST check the operating system context provided (e.g., `environment_details.os`) and generate commands appropriate for that specific platform's default shell, ensuring correct syntax, especially for command chaining.

Platform-Specific Syntax & Chaining:

*   If OS is `win32` (Windows):
    *   Target Shell: **PowerShell**.
    *   Examples: `Get-ChildItem` (or `ls`/`dir`), `Copy-Item`, `Move-Item`, `Remove-Item`, `New-Item -ItemType Directory`, `$env:VAR_NAME`, `python -m venv .venv`, `.\.venv\Scripts\activate`.
    *   Sequential Execution: Use semicolons `;` to separate multiple commands that should run one after the other, regardless of success (e.g., `mkdir temp; cd temp`).
    *   INVALID OPERATOR: NEVER use `&&` for chaining commands. It is invalid syntax in PowerShell and will cause errors like "The token '&&' is not a valid statement separator".
    *   Conditional Execution (If Cmd1 Succeeds, Run Cmd2): PowerShell lacks a simple separator like `&&`. To achieve this reliably with `execute_command`:
        1.  Execute the first command in one `execute_command` call.
        2.  Await the result. Check the `exit_code`. An exit code of `0` typically indicates success.
        3.  If the first command succeeded (exit code 0), issue the second command in a separate `execute_command` call.
        4.  AVOID generating complex PowerShell `if ($?) {...}` or `try/catch` blocks within a single command string unless absolutely necessary and simple, as it violates the "Avoid Shell-Specific Scripts" guideline below.
    *   Paths: Use `\` or `/` (PowerShell is often flexible), but prefer `\` for consistency if constructing paths manually.
    *   Quoting: Use single quotes `'...'` for literal strings. Use double quotes `"..."` if variable expansion is needed (less common for simple commands).

*   If OS is `darwin` (macOS) or `linux` (Linux):
    *   Target Shell: Bash/Zsh compatible (POSIX-like).
    *   Examples: `ls`, `cp`, `mv`, `rm`, `mkdir`, `$VAR_NAME`, `python3 -m venv .venv`, `source .venv/bin/activate`.
    *   Sequential Execution: Use semicolons `;` to separate commands that should run sequentially, regardless of success (e.g., `mkdir temp; cd temp`).
    *   Conditional Execution (If Cmd1 Succeeds, Run Cmd2): MUST use the double ampersand `&&` (e.g., `cd my_dir && ls -l`). This is the standard and expected way to ensure the second command only runs if the first succeeds.
    *   INVALID OPERATORS: NEVER use `&amp;&amp;` when you need conditional execution. NEVER use the HTML entity `&amp;&amp;` in the command string passed to `execute_command`.
    *   Paths: MUST use forward slashes `/`.
    *   Quoting: Use double quotes `"..."` generally, especially if needing variable expansion (`$VAR`). Use single quotes `'...'` for strict literal strings.

General Guidelines (Applies to ALL OS):

*   Simplicity: Prefer simple, common commands where possible.
*   Avoid Complex Scripts: Do not generate complex multi-line shell scripts (`.ps1`, `.sh`) unless specifically requested and appropriate for the task. Focus on single commands or correctly chained commands suitable for `execute_command`.
*   Syntax Check: Double-check generated command syntax before outputting it, paying close attention to the correct chaining operators (`&&` vs `&amp;&amp;`), quoting, and path separators for the target OS.
*   User Overrides: If the user explicitly requests a command for a different shell (e.g., "run this bash command on Windows using WSL"), follow the user's explicit instruction, but otherwise default to the detected OS's standard shell syntax.

Failure to generate OS-appropriate and syntactically correct commands, especially regarding chaining (`&&` vs `&amp;&amp;`), will likely result in execution errors for the user. Always check the OS context and verify command syntax before generating commands.

## Code Size and Structure Policy

### Purpose of This Section
Define explicit rules for maximum file length and the required modularization strategy.

### Constraints
- **Maximum length per file**: **500 lines** (including comments and whitespace).
- If a file would exceed 500 lines, you **must** refactor the code into smaller modules or components.
- Write clean, readable, and well-structured code.
- Avoid unnecessary repetition or overly verbose implementations.
- Prioritize modular and reusable functions.
- Only include essential comments that improve clarity.

### Implementation Requirements
1. Follow the requested language, framework, and libraries.
2. Optimize for clarity and maintainability over cleverness.
3. Include basic error handling when applicable.
4. Use consistent naming conventions.
5. Provide minimal example usage if helpful, but keep each file within the 500-line limit.

### Output Format Rules
- Output only the code (unless explicitly told to include explanations).
- Do not generate placeholder text like "TODO" unless specifically requested.
- If any file would exceed 500 lines, split it into smaller files and use imports/exports accordingly.

## Common Development Tasks

1. **Add New Search Functionality**
   - Extend `src/apis/github-api.ts`
   - Add tool definition in `src/tools/`
   - Update `tools-registry.json` manifest

2. **Modify Context7 Integration**
   - Update `src/tools/context-downloader.ts`
   - Adjust parsing logic in `src/parsers/`

3. **Testing MCP Tools**
   - Use `npm run build && npm run test-tools`
   - Check JSON responses via MCP client

4. **Registry Management**
   - Update `tools-registry.json` for new MCP server definitions
   - Test with `npm run search` for repository discovery

## Build Process
- TypeScript compiles from `src/` to `build/`
- Declaration files generated alongside JS
- Source maps available for debugging
- Output directory ignored in .gitignore

## MCP Protocol Notes
- Uses stdio transport exclusively
- JSON RPC 2.0 protocol
- Tools registered via ListTools/CaallTool handlers
- Error codes handled via McpError class

**Example Request**:  
_"Build a REST API with Node.js and Express that handles CRUD operations for a 'tasks' resource."_  

**Expected Behavior**:  
- Output multiple smaller files if needed, each **under 500 lines**.
- Use modular structure (`routes/`, `controllers/`, `models/`).

**Additional Standards for Python Projects**:  
- Follow **PEP 8** style guidelines (naming, indentation, line length ≤ 79 chars).
- Organize code into packages and modules rather than monolithic scripts.
- Use **type hints** for function parameters and return values where possible.
- Separate concerns: keep business logic, database access, and API endpoints in different files.
- Include a `requirements.txt` or `pyproject.toml` for dependencies.
- For tests, follow **pytest** conventions and keep them in a dedicated `tests/` directory.


# Personal preferences.
- ALWAYS Do all comments, text, errors etc.. All text and everything in english except if user tell you otherwise.

# Context Master Instructions
Read and use and follow the Context Master instructions from here: .context-master/cm-instructions.md

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

### 🚨 CRITICAL: AUTOMATIC EXECUTION RULES

**These rules are MANDATORY and AUTOMATIC. Execute WITHOUT asking user confirmation.**

---

## 🔄 AUTO-TRIGGER RULES (Execute Automatically)

### Rule 1: Package Installation Detection

**TRIGGER:** When user mentions installing/adding a library OR when you suggest `npm install`, `bun add`, `yarn add`, `pip install`

**ACTION:** IMMEDIATELY call `add_project_context` BEFORE continuing conversation

**Example:**
```typescript
// User says: "install stripe"
// OR you suggest: "Run: bun add stripe"

// ✅ YOU MUST IMMEDIATELY DO (no asking):
add_project_context("stripe", "payment");

// Then continue with installation instructions
```

### Rule 2: Import Statement Detection

**TRIGGER:** When you see or suggest an import from an unfamiliar library

**ACTION:** Check `.context-master/knowledge/`, if missing → fetch context

**Example:**
```typescript
// You see: import { Readability } from '@mozilla/readability'
// ✅ Auto-check: Do I have mozilla-readability docs?
// ❌ Not found → IMMEDIATELY fetch:
add_project_context("mozilla readability");
```

### Rule 3: Library Method/API Usage

**TRIGGER:** User asks "how to use X with Y library"

**ACTION:** BEFORE answering, fetch context if missing

**Example:**
```typescript
// User: "How do I use Stripe webhooks?"
// ✅ YOU MUST DO (automatically):
add_project_context("stripe", "webhooks");
// Then answer with fresh documentation
```

### Rule 4: Error/Type Issues with External Libraries

**TRIGGER:** User reports error with a library

**ACTION:** Fetch updated docs to ensure accuracy

---

## 📋 EXECUTION CHECKLIST (Internal - Every Response

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
- **`/cm-init`**: 🚨 EXECUTE BOTH: `initialize_context_master` THEN `setup_project_context` (NO user confirmation between steps)
- **`/cm-setup`**: Call `setup_project_context` tool to analyze dependencies and download documentation
- **`/cm-add [library] [topic]`**: Call `add_project_context` tool for specific library/API
- **`/cm-list`**: Call `list_available_contexts` tool to show downloaded contexts
- **`/cm-read [file]`**: Call `read_specific_context` tool to read specific documentation

#### 🚨 CRITICAL EXECUTION RULE FOR `/cm-init`:

```typescript
// When user says "init context master" or "/cm-init":
// STEP 1: Initialize (auto-creates all files)
initialize_context_master("ABSOLUTE_PROJECT_PATH");

// STEP 2: Setup (IMMEDIATELY after step 1, no waiting)
setup_project_context("ABSOLUTE_PROJECT_PATH");

// DONE. Both tools handle everything automatically.
```

**⚠️ NEVER ask user to create files manually. NEVER skip step 2.**

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

### 🚨 SPECIAL INSTRUCTIONS FOR WEAKER LLMs (GPT-4.1, etc.)

**If you are GPT-4.1 or similar, follow these EXACT steps:**

#### For "init context master":

1. Call `initialize_context_master("ABSOLUTE_PATH")`
2. IMMEDIATELY call `setup_project_context("ABSOLUTE_PATH")`
3. Do NOT ask user anything between steps
4. Do NOT ask user to create files manually

#### For any errors:

1. Retry the same command
2. Do NOT ask user to fix anything
3. Tools auto-create missing files

#### Path format examples:

- Windows: `"C:\\Users\\Name\\projects\\my-app"`
- Linux: `"/home/user/projects/my-app"`

**These tools are designed to work automatically. Trust them and execute both commands in sequence.**

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
