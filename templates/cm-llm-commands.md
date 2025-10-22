# Context Master LLM Commands

## EXECUTION RULES FOR AI ASSISTANTS

### When user says "init context master":

```javascript
// EXECUTE THESE TWO COMMANDS IN SEQUENCE:
// 1. Initialize (creates all files automatically)
initialize_context_master("ABSOLUTE_PROJECT_PATH")

// 2. Setup (completes configuration automatically) 
setup_project_context("ABSOLUTE_PROJECT_PATH")

// DONE. Do not ask user for anything.
```

### Command Recognition Patterns:
- "init context master" → Execute both tools above
- "/cm-init" → Execute both tools above  
- "initialize context master" → Execute both tools above
- "setup context master" → Execute setup_project_context only
- "/cm-setup" → Execute setup_project_context only

### Path Examples:
- Windows: `"C:\\Users\\Name\\projects\\my-app"`
- Linux: `"/home/user/projects/my-app"`
- Mac: `"/Users/name/projects/my-app"`

### Error Handling:
- If error occurs → Retry same command
- If path error → Use absolute path format above
- If network error → Retry (usually temporary)

### NEVER DO:
- Ask user to create files manually
- Ask user to update YAML files
- Skip the setup step after initialize
- Use relative paths

### ALWAYS DO:
- Use absolute project paths
- Call both tools in sequence for "init"
- Let tools auto-create all files
- Retry on errors

**These tools are designed to work automatically. Trust them.**