# Clean Up Context Master

## Task: Clean Up Downloaded Documentation and Reset Context

### Step 1: Show Current Status
Display what will be cleaned:
- **Documentation folder**: `docs/context7/` (size: X MB)
- **Downloaded libraries**: List all downloaded documentation
- **Configuration files**: `.context-master/ai-infos.json` (keep/remove option)
- **Cache files**: Any temporary or cache files

### Step 2: Confirmation Prompt
Ask user to confirm cleanup scope:
- **Option 1**: Clean only documentation (`docs/context7/`)
- **Option 2**: Clean documentation + reset analysis cache
- **Option 3**: Full reset (documentation + configuration)
- **Option 4**: Cancel cleanup

### Step 3: Execute Cleanup
Based on user selection:

**Option 1 - Documentation Only:**
- Remove `docs/context7/` folder and contents
- Keep AI configuration and analysis results

**Option 2 - Documentation + Cache:**
- Remove `docs/context7/` folder
- Clear any cached analysis results
- Keep AI configuration

**Option 3 - Full Reset:**
- Remove `docs/context7/` folder
- Remove `.context-master/ai-infos.json`
- Clear all cached data
- Reset to initial state

### Step 4: Cleanup Report
Show what was removed:
- **Freed disk space**: X MB
- **Files removed**: X files
- **Folders removed**: X folders
- **Configuration status**: Kept/Removed

### Step 5: Post-Cleanup Status
Display new status:
- **Project state**: Clean/Reset
- **Next recommended action**: `/cm-init` or `/cm-analyze`
- **Available commands**: Show relevant next steps

### Step 6: Verification
Confirm cleanup was successful:
- Verify folders/files were actually removed
- Check for any remaining artifacts
- Ensure system is in expected clean state

### Safety Measures
- **Backup prompt**: Offer to backup important files before cleanup
- **Selective cleanup**: Allow user to keep specific documentation
- **Undo information**: Explain what cannot be undone
- **Confirmation required**: Require explicit confirmation for destructive actions