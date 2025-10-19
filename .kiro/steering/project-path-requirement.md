# 🚨 CRITICAL: Project Path Requirement

## For AI Assistants Using Context Master

### The Rule

**ALWAYS provide the absolute project path when calling Context Master tools.**

### Why?

MCP servers run in their own directory (`~/.mcp/context-master/`), NOT in the user's project directory. The server has NO WAY to automatically detect where the user's project is located.

### You Already Know the Path!

As an AI assistant, you have access to:
- The user's current working directory
- The workspace root
- The project context

**Just pass it to the tool!**

### Correct Usage

```typescript
// ✅ ALWAYS DO THIS
add_project_context(
  "remotion",                           // library
  "C:\\Users\\Name\\projects\\my-app",  // YOU KNOW THIS!
  "srt captions",                       // topic (optional)
  5000                                  // tokens (optional)
)

setup_project_context(
  "C:\\Users\\Name\\projects\\my-app",  // YOU KNOW THIS!
  20                                    // maxDependencies (optional)
)
```

### Wrong Usage

```typescript
// ❌ NEVER DO THIS - Will fail with error
add_project_context("remotion", "srt captions")
setup_project_context()
```

### Platform Examples

```typescript
// Windows
"C:\\Users\\Name\\projects\\my-app"

// Linux
"/home/user/projects/my-app"

// Mac
"/Users/name/projects/my-app"

// WSL
"/mnt/c/Users/Name/projects/my-app"
```

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
