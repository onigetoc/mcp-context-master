# MCP Context Master - Project Planning Document

## 1. Project Overview

**What is being built:**
MCP Context Master is a Model Context Protocol (MCP) server that streamlines the project initialization process by automatically gathering comprehensive context from GitHub repositories and Context7 integration. It serves as a bridge between repository discovery and contextual documentation for development projects.

**Problem being solved:**
- Developers spend significant time manually searching for relevant repositories and documentation when starting new projects
- Lack of structured context gathering leads to incomplete understanding of project dependencies and best practices
- Manual conversion between different documentation formats creates workflow friction
- No centralized tool registry for tracking available project resources

**Target users:**
- Software developers starting new projects
- Development teams needing comprehensive project context
- MCP client users (Claude Desktop, VSCode extensions)
- DevOps engineers setting up project environments

**Key value proposition:**
- Automated GitHub repository discovery based on project requirements
- Seamless integration with Context7 for enhanced documentation
- One-click context downloading with structured metadata
- Comprehensive project analysis including dependency mapping
- Centralized tools registry for project resource management

## 2. Tech Stack

**Programming Language:**
- **TypeScript** - Primary language for type safety, better IDE support, and maintainable code
- **Node.js** - Runtime environment for server-side execution

**Core Frameworks & Libraries:**
- **Model Context Protocol (MCP)** - Core protocol implementation
- **GitHub REST API** - Repository search and metadata retrieval
- **Axios/Fetch** - HTTP client for API requests
- **Zod** - Runtime type validation and schema definition
- **fs-extra** - Enhanced file system operations

**Development Tools:**
- **npm/pnpm** - Package management
- **TSC** - TypeScript compiler
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Jest/Vitest** - Unit testing framework
- **Nodemon** - Development server with hot reload

**Build & Deployment:**
- **esbuild/SWC** - Fast TypeScript compilation
- **GitHub Actions** - CI/CD pipeline
- **npm registry** - Package distribution

**Technology Justification:**
- TypeScript chosen for type safety in complex API integrations
- Node.js provides excellent ecosystem for CLI tools and server applications
- MCP protocol ensures compatibility with various AI development environments
- Modular architecture supports easy extension and maintenance

## 3. Key Requirements

### Must-Have Features (Priority 1)
- **GitHub Repository Search**
  - Search repositories by query with filtering options
  - Sort by stars, forks, or last updated
  - Configurable result limits (1-100 repositories)
  
- **Context7 Integration**
  - Convert GitHub URLs to Context7 format
  - Apply topic filters for targeted context
  - Configure token limits for context size

- **Context Download System**
  - Download Context7 content as structured markdown
  - Automatic file organization in `.agents/context` directory
  - Metadata headers with source URLs and timestamps

- **Environment Initialization**
  - Create project structure (`AGENTS.md`, `.agents` directory)
  - Initialize configuration files
  - Setup documentation templates

### High-Priority Features (Priority 2)
- **Project Starter Tool**
  - Analyze existing project dependencies
  - Automatic dependency-based repository search
  - Bulk context downloading
  - Project type detection

- **Tools Registry Management**
  - JSON-based tools registry creation and updates
  - Project type categorization
  - Tool availability tracking

### Nice-to-Have Features (Priority 3)
- **Advanced Filtering**
  - Language-specific repository filtering
  - License-based filtering
  - Activity-based filtering

- **Caching System**
  - Local caching of search results
  - Context file versioning
  - Offline mode support

### Non-Functional Requirements
- **Performance**: API responses within 3 seconds
- **Reliability**: 99% uptime for core functionality
- **Security**: Secure GitHub token handling
- **Scalability**: Handle 100+ concurrent requests
- **Usability**: CLI interface with clear error messages
- **Compatibility**: Node.js 18+ support

## 4. Constraints

### Technical Constraints
- **GitHub API Rate Limits**
  - 5,000 requests/hour for authenticated users
  - 60 requests/hour for unauthenticated users
  - Requires proper rate limit handling and caching

- **Context7 API Limitations**
  - Token limits (100-50,000 tokens per request)
  - Potential rate limiting on external service
  - Dependency on external service availability

- **File System Constraints**
  - Local disk space for context file storage
  - File naming convention limitations
  - Cross-platform path handling requirements

- **MCP Protocol Compliance**
  - Strict adherence to MCP specification
  - JSON-RPC message format requirements
  - Tool schema validation constraints

### Business Constraints
- **Open Source License Requirements**
  - MIT license compatibility
  - Third-party library license compliance
  - Attribution requirements for external APIs

- **Maintenance Considerations**
  - Single maintainer initially
  - Community contribution guidelines needed
  - Documentation maintenance overhead

### Integration Constraints
- **Environment Dependencies**
  - GitHub token requirement for full functionality
  - Internet connectivity required for API access
  - MCP client compatibility requirements

- **Version Compatibility**
  - Node.js version support matrix
  - Backward compatibility with existing MCP implementations
  - TypeScript version constraints

## 5. Coding Style

### Code Organization & Architecture
- **Modular Architecture**
  - Separate modules for APIs, parsers, services, and tools
  - Clear separation of concerns between data access and business logic
  - Plugin-style tool registration system

- **Directory Structure**
  ```
  src/
  ├── apis/          # External API integrations
  ├── parsers/       # Data parsing utilities
  ├── server/        # MCP server implementation
  ├── services/      # Business logic services
  ├── tools/         # Individual tool implementations
  ├── types/         # TypeScript type definitions
  └── utils/         # Shared utilities
  ```

### Coding Conventions
- **Naming Conventions**
  - PascalCase for classes and interfaces
  - camelCase for functions and variables
  - UPPER_SNAKE_CASE for constants
  - kebab-case for file names

- **TypeScript Standards**
  - Strict type checking enabled
  - Explicit return types for public functions
  - Interface-first design for public APIs
  - Zod schemas for runtime validation

### Code Quality Standards
- **Linting & Formatting**
  - ESLint configuration with TypeScript support
  - Prettier for consistent code formatting
  - Pre-commit hooks for code quality enforcement

- **Error Handling**
  - Comprehensive try-catch blocks for async operations
  - Structured error types with context
  - User-friendly error messages
  - Proper logging for debugging

### Testing Strategy
- **Unit Testing**
  - Minimum 80% code coverage
  - Mock external API dependencies
  - Test both success and failure scenarios

- **Integration Testing**
  - End-to-end tool functionality testing
  - MCP protocol compliance testing
  - File system operation testing

### Documentation Standards
- **Code Documentation**
  - JSDoc comments for all public functions
  - README files for each major module
  - Inline comments for complex logic

- **API Documentation**
  - OpenAPI specification for tool schemas
  - Usage examples for each tool
  - Error code documentation

### Version Control Practices
- **Git Workflow**
  - Feature branch workflow
  - Conventional commit messages
  - Semantic versioning for releases

- **Code Review Guidelines**
  - Mandatory peer review for all changes
  - Security review for API integrations
  - Performance impact assessment


## Tools

### All disponible tools

├── tools/
│   ├── context-downloader.ts
│   ├── context7-converter.ts
│   ├── index.ts
│   ├── init-tool.ts
│   ├── project-master.ts
│   ├── registry-manager.ts
│   └── search-tool.ts

### Tools to add to the project.
- **Project planner, **
    - Project Starter Tool (Read these files: the README.md file, package.json, main project file, etc)
    - Create a MD file explaining the project and the objectives based on the user prompt with Advanced Prompt Generator API (APG).
    - 

## Tools to add to the project.
    - Project Starter Tool (Read these files: the README.md file, package.json, main project file, etc)
    - Create a MD file explaining the project and the objectives based on the user prompt with Advanced Prompt Generator API (APG).
    - 

