# Project Path Requirement - Critical Update

## Summary

Updated Context Master MCP tools to **require explicit project path** in all operations. This fixes the fundamental issue where `process.cwd()` returns the MCP server's directory, not the user's project directory.

## The Problem

### Why Auto-Detection Doesn't Work

```
User's Project:     C:\Users\Name\projects\my-app\
MCP Server:         C:\Users\Name\.mcp\context-master\
process.cwd():      C:\Users\Name\.mcp\context-master\  ❌ WRONG!
```

**MCP servers run in their own directory**, completely separate from the user's project. There's no way for the server to automatically know where the user's project is located.

### Previous Behavior (Broken)

```typescript
// This would create files in the WRONG location
add_project_context("remotion", "srt captions")
// Files created at: C:\Users\Name\.mcp\context-master\.context-master\
// Expected location: C:\Users\Name\projects\my-app\.context-master\
```

## The Solution

### New Behavior (Fixed)

```typescript
// ✅ CORRECT - Always provide project path
add_project_context(
  "remotion",
  "C:\\Users\\Name\\projects\\my-app",  // REQUIRED
  "srt captions"
)

setup_project_context("C:\\Users\\Name\\projects\\my-app")
```

## Changes Made

### 1. Tool Descriptions Updated

Both `add_project_context` and `setup_project_context` now:
- Mark `projectPath` as **REQUIRED** in descriptions
- Explain WHY it's required (MCP server limitation)
- Provide clear examples for Windows/Linux/Mac

### 2. Error Handling Added

If `projectPath` is missing, tools now return helpful error messages:

```json
{
  "success": false,
  "error": "Missing required parameter: projectPath",
  "message": "MCP servers cannot auto-detect user's project location",
  "instructions": {
    "windows": "C:\\Users\\Name\\projects\\my-app",
    "linux": "/home/user/projects/my-app"
  }
}
```

### 3. Documentation Updated

Updated all guides:
- `.kiro/steering/context-master-guide.md`
- `.kiro/steering/cm-initialization.md`
- All code examples now include explicit project paths

### 4. PathResolverService Behavior

The `PathResolverService` still exists but now:
- Validates the provided path
- Normalizes it to OS-specific format
- Writes debug logs for troubleshooting
- **Does NOT** fall back to `process.cwd()` silently

## Why This Approach

### Alternative Considered: Smart Detection

We could try to detect the project by:
- Looking for `.git` directories
- Scanning for `package.json` files
- Using environment variables

**Why we didn't do this:**
- Unreliable (multiple projects on system)
- Slow (filesystem scanning)
- Confusing (which project to choose?)
- Not how MCP is designed to work

### The Right Way: Explicit Parameters

MCP tools are designed to receive all necessary context from the AI assistant. The AI assistant:
- Knows the user's current working directory
- Has access to the workspace context
- Can easily pass this information to tools

## Impact on Users

### For AI Assistants (LLMs)

**Before:**
```typescript
add_project_context("remotion", "srt captions")  // Broken
```

**After:**
```typescript
add_project_context(
  "remotion",
  userWorkspaceDirectory,  // You already know this!
  "srt captions"
)
```

### For End Users

No change - they still just ask questions. The AI assistant handles passing the correct path.

## Testing

To verify the fix works:

1. **Test with correct path:**
```bash
node test/test-add-context.js "C:\Users\Name\projects\my-app" "remotion"
```

2. **Test without path (should fail with helpful error):**
```bash
node test/test-add-context.js "" "remotion"
```

3. **Verify files created in correct location:**
```bash
dir "C:\Users\Name\projects\my-app\.context-master\knowledge"
```

## Migration Guide

### For Existing Integrations

If you have existing code calling these tools:

**Old (broken):**
```typescript
await mcp.callTool('add_project_context', {
  libraryName: 'remotion',
  topic: 'srt captions'
});
```

**New (fixed):**
```typescript
await mcp.callTool('add_project_context', {
  libraryName: 'remotion',
  projectPath: 'C:\\Users\\Name\\projects\\my-app',  // ADD THIS
  topic: 'srt captions'
});
```

### For AI Assistant Prompts

Update your system prompts to include:

```
When using Context Master tools, always provide the absolute path to the user's 
project directory as the projectPath parameter. You have access to this information 
through the workspace context.
```

## Technical Details

### Path Resolution Logic

```typescript
// 1. Check if projectPath provided
if (!projectPath) {
  return helpfulError();  // Don't silently fail
}

// 2. Validate path exists
if (!await fs.pathExists(projectPath)) {
  return pathNotFoundError();
}

// 3. Normalize to OS format
const normalized = path.normalize(projectPath);

// 4. Use normalized path
const contextDir = path.join(normalized, '.context-master');
```

### Cross-Platform Support

Handles all path formats:
- **Windows**: `C:\Users\Name\projects\my-app`
- **Linux**: `/home/user/projects/my-app`
- **Mac**: `/Users/name/projects/my-app`
- **WSL**: `/mnt/c/Users/Name/projects/my-app`

## FAQ

### Q: Why not use environment variables?

A: Environment variables are set when the MCP server starts, not when the user switches projects. They would be stale.

### Q: Can we detect the project from the MCP client?

A: The MCP protocol doesn't provide this information. The AI assistant must pass it explicitly.

### Q: What if the user has multiple projects open?

A: The AI assistant knows which project the user is currently working in and passes that path.

### Q: Is this a breaking change?

A: Yes, but the previous behavior was broken anyway (files created in wrong location). This fixes it properly.

## Conclusion

This update makes Context Master work correctly by acknowledging the fundamental limitation of MCP servers: **they don't know where the user's project is located**.

By requiring explicit project paths, we:
- ✅ Fix the broken auto-detection
- ✅ Make behavior predictable
- ✅ Provide clear error messages
- ✅ Follow MCP best practices
- ✅ Enable proper cross-platform support

The AI assistant already has this information - we just need to pass it along.

---

**Updated:** 2025-01-19
**Status:** ✅ Complete
**Breaking Change:** Yes (but fixes broken behavior)
