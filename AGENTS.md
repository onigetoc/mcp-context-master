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
Context Master is an MCP server designed to enhance AI coding assistance by providing up-to-date, contextual documentation for libraries and frameworks. It leverages Context7's documentation service and GitHub search to deliver relevant information precisely when needed during development.

### Core Philosophy
This MCP server operates on a **context-on-demand** model. Instead of loading all documentation at once, it intelligently fetches and integrates specific documentation based on your current coding needs, keeping your AI assistant's context focused and relevant.

### Understanding the Command System
Context Master uses **slash commands** (prefixed with `/cm-`) for quick actions. When you or the LLM detects a command starting with `/cm-`, it should be processed as a Context Master directive.

**Available Commands:**
- `/cm-help`: Display all available commands and usage examples
- `/cm-init` or `/cm-setup`: Initialize Context Master for the current project (reads package.json and requirements files)
- `/cm-add [library/api]`: Add documentation context for a specific library, API, or framework
- `/cm-search [library]`: Search for library documentation and get guidance on proper integration
- `/cm-list`: List all downloaded context files available in the project
- `/cm-read [context-file]`: Read the content of a specific context file

### Critical Workflow Rules for LLMs

#### Rule 1: Understanding the Context Retrieval Process
When a user needs help with a library feature, the LLM should use Context Master tools. Here's what happens behind the scenes (the LLM doesn't need to know all these details, but should understand when to use the tools):

**What the LLM needs to do:**
1. User requests help with a library/topic (e.g., "Help me use captions with Remotion")
2. LLM identifies: library name ("Remotion") and topic ("captions" or "srt caption")
3. LLM calls `add_project_context` with three parameters:
   - Project absolute path
   - Library name (e.g., "remotion")
   - Topic/keywords (e.g., "srt caption", "authentication", "routing")

**What Context Master does automatically (internal process):**
1. Searches GitHub API for the library name (e.g., "Remotion")
2. Gets the repository URL (e.g., https://github.com/remotion-dev/remotion)
3. Extracts username/repo (remotion-dev/remotion)
4. Fetches targeted documentation from Context7: `https://context7.com/remotion-dev/remotion/llms.txt?topic=srt+caption&tokens=3000`
5. Saves as: `cm-remotion-srt-caption-2025-09-30.md`

**Important:** Context Master optimizes token usage by downloading only the relevant portion of documentation based on the topic, rather than the full 10,000+ token context. If the specific context doesn't contain enough information, the LLM should consider requesting the broader context or a different topic.

#### Rule 2: Contextual Intelligence
When a user asks for help with a specific library feature, the LLM must:

1. **Check existing context files**: Look in `.context-master/context/` directory
   - Use native file browsing capabilities OR `list_available_contexts` tool
   - Check if relevant documentation already exists (e.g., `cm-remotion-*-*.md`)

2. **Identify knowledge gaps**: Determine what specific documentation is missing
   - Is there a context file for this library?
   - Does the existing context cover the specific topic needed?
   - Is the context too broad (10,000 tokens) when a focused one would be better?

3. **Fetch targeted docs**: Use `add_project_context` tool if needed
   - Only fetch new context if existing files don't cover the topic
   - Use specific topics to get focused documentation (3000-5000 tokens)
   - Example: Instead of using `cm-remotion-context-2025-09-15.md` (full docs), get `cm-remotion-srt-caption-2025-09-30.md` (focused)

4. **Apply context**: Use the documentation to provide accurate assistance
   - Read the relevant context file from `.context-master/context/`
   - If focused context is insufficient, fall back to broader context or request different topic

**Example Scenario:**

User: "Help me use captions with Remotion"

LLM Thought Process:
1. Check `.context-master/context/` directory
2. Found: `cm-remotion-basic-2025-09-15.md` (10,000 tokens - too broad)
3. Missing: Caption-specific documentation
4. Call: `add_project_context(project_path, "Remotion", "srt caption")`
5. New file created: `.context-master/context/cm-remotion-srt-caption-2025-09-30.md`
6. Read and use the focused documentation to provide specific guidance

### Available MCP Tools

#### Primary Tools (Context Master)

- **`add_project_context`**: Add documentation for a specific library and topic
  - **Parameters:**
    - `project_path`: Absolute path to the user's project
    - `library`: Library name (e.g., "Remotion", "NextAuth.js", "React Query")
    - `topic`: Keywords or topic to focus the documentation (e.g., "srt caption", "authentication", "mutations")
  - **What it does internally:**
    - Searches GitHub API for the library
    - Extracts username/repo from GitHub URL
    - Fetches targeted docs from Context7 with specified topic and ~3000 tokens
    - Saves as `cm-[library]-[topic]-[date].md`
  - **Output:** Path to downloaded documentation file

- **`search_library_advisor`**: Get guidance on which library to use (optional helper)
  - Input: library name, optional topic
  - Output: Recommended search terms and workflow guidance

- **`setup_project_context`**: Initialize Context Master for a project
  - Scans package.json, requirements.txt, and other dependency files
  - Creates .context-master directory structure
  - Returns: List of detected dependencies

- **`list_available_contexts`**: List all downloaded context files
  - Returns: Array of context files with metadata (library, topic, date, size)
  - Alternative: LLMs with native file browsing can directly check `.context-master/context/` directory

- **`read_specific_context`**: Read content of a specific context file
  - Input: filename from `.context-master/context/` directory
  - Output: Full markdown content of the documentation
  - Alternative: LLMs with native file reading can directly open files from `.context-master/context/`

#### External Tools (Context7 MCP - Integrated)
Context Master uses GitHub API and Context7 internally. The LLM doesn't need to call these directly:
- GitHub API searches for library repositories
- Context7 provides focused documentation via `https://context7.com/[username]/[repo]/llms.txt?topic=[topic]&tokens=3000`

Future integrations may include:
- Brave Search API for additional documentation sources
- NPM registry for package-specific searches

### Workflow Examples

#### Example 1: User Requests Help with a New Library Feature

User: "I need to implement authentication with NextAuth.js"

LLM Actions:
1. Identify: library="NextAuth.js", topic="authentication"

2. Call: add_project_context(
     project_path="/absolute/path/to/project",
     library="NextAuth.js",
     topic="authentication"
   )

3. Context Master automatically:
   - Searches GitHub for "NextAuth.js"
   - Finds: https://github.com/next-auth/next-auth
   - Fetches: https://context7.com/next-auth/next-auth/llms.txt?topic=authentication&tokens=3000
   - Creates: cm-nextauth-authentication-2025-09-30.md

4. Use the downloaded documentation to provide specific implementation guidance

#### Example 2: User Works on Existing Project

User: "How do I add captions to my Remotion video?"

LLM Actions:
1. Check existing contexts: list_available_contexts()
   → Found: cm-remotion-basic-2025-09-15.md (10,000 tokens - full context)

2. Identify gap: Caption-specific documentation would be more efficient

3. Call: add_project_context(
     project_path="/absolute/path/to/project",
     library="Remotion",
     topic="srt caption"
   )

4. Context Master automatically:
   - Searches GitHub for "Remotion"
   - Finds: https://github.com/remotion-dev/remotion
   - Fetches: https://context7.com/remotion-dev/remotion/llms.txt?topic=srt+caption&tokens=3000
   - Creates: cm-remotion-srt-caption-2025-09-30.md (3,000 tokens - focused context)

5. Use the focused caption documentation to provide specific guidance

Note: If the focused context doesn't contain enough information, the LLM can fall back to the full context file (cm-remotion-basic-2025-09-15.md) or request a different topic.

#### Example 3: Handling Library Name Variations

User: "Help me with React Query mutations"

LLM Actions:
1. Identify: library="React Query", topic="mutations"

2. Call: add_project_context(
     project_path="/absolute/path/to/project",
     library="React Query",
     topic="mutations"
   )

3. Context Master automatically:
   - Searches GitHub for "React Query"
   - Finds: https://github.com/TanStack/query (the current repo name)
   - Fetches: https://context7.com/TanStack/query/llms.txt?topic=mutations&tokens=3000
   - Creates: cm-tanstack-query-mutations-2025-09-30.md

4. Use the documentation to provide mutation guidance

Note: Context Master handles library name changes automatically through GitHub search (e.g., "React Query" → "TanStack/query")

### Best Practices for LLMs

#### 1. Topic Specificity
Use focused, descriptive topics to get the most relevant documentation:
- ✅ Good: "authentication", "routing setup", "useQuery hook", "srt captions"
- ❌ Too broad: "basics", "documentation", "help"

#### 2. Token Management
- Use 3000-5000 tokens for focused documentation on a specific feature
- Use 5000-8000 tokens for broader overviews or complex topics
- Avoid requesting more than 10000 tokens unless absolutely necessary

#### 3. Context File Naming
Generated files follow this pattern: `cm-[library]-[topic]-[date].md`
- Example: `cm-remotion-srt-captions-2025-09-30.md`
- This makes it easy to identify what documentation covers what topic

#### 4. Verification Steps
Before adding context:
1. Check if similar context already exists
2. Verify the library name matches the actual package
3. Confirm the repository path is correct
4. Use specific topics to avoid duplicate broad documentation

### Error Handling and Troubleshooting

#### Library Not Found
1. Try alternative search terms (abbreviations, full names, old names)
2. Check if the library has been renamed (e.g., React Query → TanStack Query)
3. Verify spelling and capitalization
4. Search GitHub directly if needed

#### Documentation Seems Incorrect
1. Verify the repository path matches the official library
2. Check Context7 directly: `https://context7.com/[username]/[repo]`
3. Try a more specific topic to get different documentation sections

#### Context File Not Loading
1. Confirm file exists in `.context-master/context/` directory
   - Use `list_available_contexts()` tool OR browse the directory directly
2. Check the file naming pattern: `cm-[library]-[topic]-[date].md`
3. Use `read_specific_context()` to manually load OR open the file directly if needed
4. Verify the `context-manifest.yaml` is up-to-date (if your setup uses it)

### Integration and Setup

#### Initial Project Setup
When starting with a new project:

1. User: "Initialize Context Master" or uses /cm-init
2. LLM: setup_project_context()
3. System scans package.json, requirements.txt, etc.
4. Returns list of detected dependencies
5. LLM can proactively suggest adding context for key libraries

#### Where to Find Context Files

Context Master automatically organizes files in the `.context-master/` directory:

- **`.context-master/context/`**: Contains all downloaded library documentation
  - Files are named: `cm-[library]-[topic]-[date].md`
  - Check this directory to see what context is already available
  - Each file contains focused documentation (typically 3000-5000 tokens)

- **`.context-master/context/context-manifest.yaml`**: Tracks available context files (optional)
  - Quick reference to see all downloaded contexts without browsing
  - Most modern LLMs can browse directories directly, making this optional

- **`.context-master/commands/`**: Contains command documentation
  - Reference for available Context Master commands

#### AI Assistant Integration
- Context Master works with Cursor, Claude Code, Gemini, Cline, and other AI coding assistants
- Configure the MCP server in your AI assistant's MCP settings
- Documentation files are saved in `.context-master/context/` directory
- LLMs can access context files either:
  - Using `list_available_contexts` and `read_specific_context` tools
  - Directly browsing `.context-master/context/` directory (most modern AI assistants support this)
- The optional `context-manifest.yaml` tracks available files but isn't required if the LLM has native file browsing

### Advanced Usage

#### Combining Multiple Contexts
When working on features that span multiple libraries:
1. Add context for each relevant library with specific topics
2. Let the LLM synthesize information from multiple context files
3. Example: Building auth with NextAuth.js + Prisma + tRPC

#### Updating Context
Documentation becomes outdated. To refresh:
1. Note the date in existing context filenames
2. Re-run the same search/add process
3. New file with current date will be created
4. Old files can be manually removed if desired

#### Custom Topics
Create highly specialized context by combining topic keywords:
- "server-side rendering authentication"
- "react hooks typescript best practices"
- "error handling retry logic"

### Summary
Context Master transforms how AI coding assistants access documentation by:
1. Providing on-demand, focused documentation
2. Keeping AI context clean and relevant
3. Ensuring documentation is current and accurate
4. Enabling intelligent, context-aware coding assistance

The key is **search first, add specifically, use intelligently**.

<!-- END: CONTEXT-MASTER -->