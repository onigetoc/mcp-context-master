---
inclusion: always
---

# Context Master Development Guidelines

## 🚨 CRITICAL: File Structure Understanding

### Source vs Generated Files

**NEVER modify files in `.context-master/` directory directly!**

- **`.context-master/`** = Generated files from initialization and setup (READ-ONLY)
- **`templates/`** = Source files that get copied during initialization and setup (MODIFY HERE)

### File Flow
```
templates/ (SOURCE) → setup_project_context() → .context-master/ (GENERATED)
```

### Development Rules

1. **To modify templates**: Edit files in `templates/` directory
2. **To modify commands**: Edit files in `templates/commands/` directory  
3. **To test changes**: Run initialization again to regenerate `.context-master/`
4. **Never edit**: Files in `.context-master/` - they get overwritten

### Template Files Location
- `templates/cm-instructions.md` → `.context-master/cm-instructions.md`
- `templates/cm-ai-infos.md` → `.context-master/cm-ai-infos.md`
- `templates/commands/` → `.context-master/commands/`

This ensures proper MCP server development workflow.