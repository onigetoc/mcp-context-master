# Context Master - Project Analysis

## Dependency Analysis Instructions

When analyzing a project for Context Master, follow these steps:

### 1. Scan Dependencies
- Check package.json for dependencies and devDependencies
- Look for other package managers (requirements.txt, Cargo.toml, etc.)
- Identify the project type and framework

### 2. Apply Priority Scoring

#### HIGH PRIORITY (Score 8-10) - Always Download
- **Specialized libraries**: remotion, zustand, framer-motion
- **Complex APIs**: prisma, trpc, @tanstack/react-query
- **Lesser-known frameworks**: solid-js, qwik, svelte-kit
- **Unique patterns**: jotai, valtio, xstate

#### MEDIUM PRIORITY (Score 5-7) - Context Dependent
- **Popular but complex**: next.js (advanced features), tailwindcss (custom)
- **Configuration-heavy**: webpack, vite, typescript (advanced)
- **Framework-specific**: nuxt, gatsby, remix

#### LOW PRIORITY (Score 1-4) - Skip
- **Extremely popular**: react, express, lodash, axios
- **Well-documented**: moment, jest, node.js core
- **Simple APIs**: date-fns, uuid, chalk

### 3. Generate Recommendations

Provide a clear list of:
- High-priority libraries to download
- Medium-priority libraries (with reasoning)
- Low-priority libraries to skip
- Total estimated download size/time

### 4. Next Actions

Suggest specific commands:
- `setup_project_context` for full analysis
- `add_project_context` for individual libraries
- `list_available_contexts` to check status