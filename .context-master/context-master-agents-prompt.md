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