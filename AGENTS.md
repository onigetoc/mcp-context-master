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

## PROJECT CONTEXT

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



