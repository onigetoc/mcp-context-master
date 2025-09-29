# Show Context Master Status

## Task: Display Current Project Context Status

### Step 1: AI Assistant Configuration
Read and display information from `.context-master/ai-infos.json`:
- **Provider**: [provider name]
- **Model**: [model name]  
- **IDE**: [IDE name]
- **Extension**: [extension name]
- **Configuration Status**: ✅ Configured / ❌ Not configured

### Step 2: Project Analysis Status
Check if project has been analyzed:
- **Package Files**: List detected package files (package.json, requirements.txt, etc.)
- **Dependencies Found**: X total
- **Last Analysis**: [timestamp or "Not analyzed"]

### Step 3: Documentation Status
Show downloaded documentation:
- **Documentation Folder**: `docs/context7/` (exists/missing)
- **Downloaded Libraries**: List with file sizes
- **Total Context Size**: X tokens/MB
- **Last Download**: [timestamp or "No downloads"]

### Step 4: MCP Server Status
Check MCP Context7 server availability:
- **Context7 Server**: ✅ Available / ❌ Not available
- **Connection Status**: Connected/Disconnected
- **Last Used**: [timestamp]

### Step 5: Priority Analysis Summary
If analysis has been completed:
- **High Priority Libraries**: X (🔴)
- **Medium Priority Libraries**: X (🟡)  
- **Low Priority Libraries**: X (🟢)
- **Recommendations Pending**: X libraries

### Step 6: Storage Information
Show disk usage:
- **Context Folder Size**: X MB
- **Available Space**: X GB
- **Cleanup Recommended**: Yes/No

### Step 7: Quick Actions
Suggest relevant next commands based on status:
- If not initialized: `/cm-init`
- If not analyzed: `/cm-analyze`
- If analysis complete but no downloads: `/cm-download`
- If everything complete: `/cm-clean` or `/cm-selective`

### Status Legend
- ✅ Complete/Available
- ⚠️ Partial/Warning
- ❌ Missing/Error
- 🔄 In Progress