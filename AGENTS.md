# AGENTS.md

# Project: mcp-context-master

## Project Overview

MCP Context Master is an intelligent TypeScript-based Model Context Protocol (MCP) server that revolutionizes how developers bootstrap new projects. Unlike simple search tools, it provides intelligent context gathering through advanced dependency analysis, smart prioritization, and automated documentation discovery.

**Core Intelligence Features:**

- **Smart Project Analysis**: Automatically parses package.json, requirements.txt, and project structure
- **Intelligent Prioritization**: Advanced scoring system that identifies which libraries truly need documentation
- **Context7 Integration**: Seamless conversion to structured context with topic filtering
- **Bulk Operations**: One-command setup for complete project context gathering
- **Multi-language Support**: Node.js, Python, and expanding to other ecosystems

The project follows modern TypeScript architecture with modular design, comprehensive error handling, and extensive CLI testing capabilities. It's optimized for Windows development environments using Bun as the preferred package manager.

## Building and Running

### Dependencies

The project's dependencies are listed in the `package.json` file. Key dependencies include:

- `@modelcontextprotocol/sdk`: For MCP server functionality.
- `@octokit/rest`: For GitHub API access.
- `axios`: For making HTTP requests.
- `dotenv`: For managing environment variables.
- `fs-extra`: For file system operations.
- `zod`: For schema validation.

### Building the Project

**Always use Bun for this project (Windows optimized):**

```bash
# Install dependencies
bun install

# Build the project
bun run build
```

This compiles TypeScript files from `src/` to `build/` directory with full type checking and ES2020 module support.

### Running the Server

```bash
# Start the MCP server
bun start

# Or for development with auto-rebuild
bun run dev
```

The server listens for MCP requests on stdin and provides 7 main tools for intelligent project bootstrapping.

### Running Tests

Comprehensive test suite with CLI scripts:

```bash
# Full test suite
bun test

# Individual test components
node test/test-project-master.js    # Test intelligent project analysis
node test/search-test.js "React"    # Test GitHub search with prioritization
node test/test-tools.js             # Test all MCP tools
node test/test-simple.js            # Basic connectivity test
```

## Development Conventions

**Architecture Principles:**

- **Modular Design**: Each MCP tool is self-contained in `src/tools/`
- **Service Layer**: Business logic separated in `src/services/`
- **Type Safety**: Comprehensive TypeScript with Zod schema validation
- **Error Handling**: Graceful degradation with detailed error messages
- **Windows First**: Optimized for Windows development with Bun

**Code Organization:**

- `src/tools/` - MCP tool implementations (search, download, analysis)
- `src/services/` - Core business logic (GitHub API, file operations)
- `src/parsers/` - Project file parsers (package.json, requirements.txt)
- `src/apis/` - External API integrations (GitHub, Context7)
- `src/types/` - TypeScript definitions and Zod schemas

**Environment Requirements:**

- `GITHUB_TOKEN` - Required for GitHub API access (public_repo permissions)
- Windows-compatible paths and commands throughout

## Key Files & Architecture

### Core MCP Implementation

- `src/index.ts` - Main entry point, starts MCP server
- `src/server/mcp-server.ts` - MCP server initialization and tool registration
- `src/tools/index.ts` - Central tool registry and handler exports

### MCP Tools (7 Main Tools)

- `src/tools/search-tool.ts` - GitHub repository search with intelligent filtering
- `src/tools/context7-converter.ts` - GitHub to Context7 URL conversion
- `src/tools/context-downloader.ts` - Automated documentation download
- `src/tools/project-master.ts` - **★ Main tool** - Complete project analysis and setup
- `src/tools/registry-manager.ts` - Tools registry management
- `src/tools/init-tool.ts` - Environment initialization
- `src/tools/coding-assistant.ts` - AI assistant detection and configuration

### Business Logic Services

- `src/services/search.service.ts` - GitHub API integration with advanced search
- `src/services/registry.service.ts` - Tools registry management
- `src/parsers/package-parser.ts` - Smart package.json analysis with priority scoring
- `src/parsers/readme-parser.ts` - README content extraction and analysis

### Configuration & Types

- `src/types/schemas.ts` - Zod validation schemas for all inputs/outputs
- `src/types/mcp-types.ts` - MCP-specific type definitions
- `tsconfig.json` - TypeScript configuration (ES2020, strict mode)
- `.env` - Environment variables (GITHUB_TOKEN required)

[comment]: <> (source Gist: https://gist.github.com/onigetoc/767989d2fdaae43d389f16c4b657b9b5)

## System Specifications

- **Operating System**: Windows 10/11 (primary development environment)
- **Package Manager**: Bun (preferred) - significantly faster than npm
- **Node.js**: 18+ with ES2020 module support
- **TypeScript**: 5.0+ with strict type checking

## Package Management Rules

**ALWAYS use `bun` for optimal performance:**

```bash
# Installation & Setup
bun install                    # Install dependencies
bun run setup                  # Initialize environment

# Development
bun run build                  # Compile TypeScript
bun start                      # Start MCP server
bun run dev                    # Development mode
bun test                       # Run test suite

# Package Management
bun add <package>              # Add dependency
bun remove <package>           # Remove dependency
```

## Windows Development Conventions

- **Path Separators**: Use `/` or `\` (Node.js handles both)
- **Environment Variables**: Windows-compatible `.env` file
- **Commands**: PowerShell and cmd.exe compatible
- **File Operations**: Use `fs-extra` for cross-platform compatibility

# Instructions for AI Assistants: MCP Context Master Workflow

You are an AI assistant specialized in MCP Context Master - an intelligent project bootstrapping system.  
Your main objective is to help developers quickly gather comprehensive project context through intelligent analysis and automated documentation discovery.

## Core Capabilities

**Primary Tool**: `project_starter` - The main tool that:

1. Analyzes project dependencies (package.json, requirements.txt)
2. Applies intelligent priority scoring to identify valuable documentation
3. Searches GitHub with advanced filtering and relevance scoring
4. Bulk downloads Context7 documentation for high-priority libraries
5. Provides LLM guidance on which libraries need context vs. well-documented ones

**Task Management**: Update todo lists in `./.gemini/todos.md` for tracking progress.

**Context Awareness**: Always consider the priority guidance system:

- **HIGH Priority**: Specialized libraries (< 10k stars), unique APIs, poor web documentation
- **MEDIUM Priority**: Popular but complex libraries, framework-specific patterns
- **LOW Priority**: Mainstream libraries with extensive documentation (React, Express, etc.)

## Intelligent Workflow Methodology

### 1. **Smart Analysis & Planning**

- Analyze user requests in context of MCP Context Master capabilities
- Prioritize using the intelligent scoring system (HIGH/MEDIUM/LOW priority)
- Create actionable task lists with concrete, verifiable steps
- Consider project type, complexity, and existing documentation quality

### 2. **MCP-Aware Task Execution**

- Use `project_starter` for comprehensive project setup
- Apply priority logic: focus on specialized libraries, skip well-documented ones
- Leverage bulk operations for efficiency
- Track progress with checkbox format: `- [x] Completed task description`

### 3. **Context-Driven Recommendations**

- **For New Projects**: Use `project_starter` to analyze and download essential context
- **For Existing Projects**: Focus on missing or specialized dependencies
- **For Learning**: Prioritize libraries with unique patterns or poor web documentation

### 4. **Quality Assurance**

- Verify downloaded context is relevant and current
- Check that high-priority libraries received proper documentation
- Ensure low-priority mainstream libraries were appropriately skipped

**Example MCP Context Master Workflow:**

- [ ] Analyze project dependencies using `project_starter`
- [ ] Review priority recommendations (HIGH: Remotion, Zustand; LOW: React, Express)
- [ ] Download Context7 documentation for specialized libraries only
- [ ] Verify context quality and relevance
- [ ] Update project documentation with gathered insights


**MCP Context Master** - Intelligent project bootstrapping through automated context discovery.

### Current Project State

- **Type**: TypeScript MCP Server for intelligent project analysis
- **Architecture**: Modular MCP tools with advanced GitHub integration
- **Key Innovation**: Smart priority system that identifies which libraries need documentation
- **Target Users**: Developers starting new projects or exploring unfamiliar codebases

### Core Technology Stack

- **Runtime**: Node.js 18+ with ES2020 modules
- **Language**: TypeScript 5.0+ with strict type checking
- **Package Manager**: Bun (Windows optimized)
- **MCP Framework**: @modelcontextprotocol/sdk
- **APIs**: GitHub REST API, Context7 integration
- **Validation**: Zod schemas for type-safe operations
- **File Operations**: fs-extra for cross-platform compatibility

### Project Intelligence Features

- **Dependency Analysis**: Automatic parsing of package.json, requirements.txt
- **Priority Scoring**: Advanced algorithm to identify valuable vs. redundant documentation
- **Bulk Operations**: One-command project setup with intelligent filtering
- **Multi-language Support**: Node.js, Python (expanding to Go, Rust, Java)

### Development Constraints

- **File Size Limit**: Maximum 500 lines per file (enforced for maintainability)
- **Windows First**: All commands and paths optimized for Windows development
- **Type Safety**: Comprehensive TypeScript with runtime validation
- **Error Handling**: Graceful degradation with detailed error messages

TEMPLATE  
Output the entire project as a directory tree with file contents in Markdown code blocks. Each file path is a level-3 heading (###) followed by a TypeScript or JSON code block. Example:

### package.json

{ ... }

### src/index.ts

```ts
...
```

### project structure is already created

but you can create more folders and files as needed along the project developement

```bash
/api/prompts
├── /core
│   ├── apgPersona.md (always included)
│   └── systemRules.md (base constraints)
├── /persona
│   └── (LLM-generated, context-specific personas)
├── /depth
│   ├── basic.md
│   ├── advanced.md
│   ├── enhancer.md
│   └── stepbystep.md
├── /archetype (universal roles - the smart core)
│   ├── coder.md
│   ├── writer.md
│   ├── analyst.md
│   ├── teacher.md
│   ├── planner.md
│   ├── researcher.md
│   ├── consultant.md
│   ├── creator.md
│   ├── brainstormer.md  ← NEW!
│   └── problem_solver.md
├── /strategy (approach methodology)
│   ├── decomposition.md
│   ├── iterative.md
│   ├── comparative.md
│   └── synthesis.md
├── /format (output format)
│   ├── markdown.md
│   ├── json.md
│   ├── code.md
│   └── structured.md
├── /modifiers (enhancement layers)
│   ├── examples.md
│   ├── constraints.md
│   └── validation.md
├── /closure
│   ├── remember.md
│   ├── important.md
│   ├── validation_check.md
│   └── final_reminder.md
└── /static-prompts (complete standalone prompts)
    ├── prd_generator.md
    ├── user_story_mapper.md
    ├── technical_spec_writer.md
    ├── api_documentation.md
    └── architecture_reviewer.md
```

End the response with a one-line usage example showing how a host would call the tool.

## Example Start

**User Request:** "Refactor the `Button.tsx` component to use `cva`."

**Expected Response:**

Perfect, I will refactor the component. Here is my plan:

**Create or update the Readme.md file according the the new final task update**

---

_This is our basic instruction. Always follow this methodology for each request._

## Serena Starting MCP server with 25 tools:

Let Serena take care of: ['read_file', 'create_text_file', 'list_dir', 'find_file', 'replace_regex', 'search_for_pattern', 'get_symbols_overview', 'find_symbol', 'find_referencing_symbols', 'replace_symbol_body', 'insert_after_symbol', 'insert_before_symbol', 'write_memory', 'read_memory', 'list_memories', 'delete_memory', 'execute_shell_command', 'activate_project', 'switch_modes', 'check_onboarding_performed', 'onboarding', 'think_about_collected_information', 'think_about_task_adherence', 'think_about_whether_you_are_done', 'prepare_for_new_conversation']


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