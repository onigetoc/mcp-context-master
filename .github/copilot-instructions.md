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