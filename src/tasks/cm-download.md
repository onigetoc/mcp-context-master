# Download High-Priority Documentation

## Task: Download Documentation for Recommended Libraries

### Step 1: Check Prerequisites
Verify that:
- Project has been analyzed (`/cm-analyze` completed)
- High-priority libraries have been identified
- MCP Context7 server is available and configured

### Step 2: Download High-Priority Documentation
For each library marked as HIGH PRIORITY (🔴):

1. **Resolve Library ID**
   - Use `mcp_upstashcontext7_mcp_resolve_library_id` to get the Context7-compatible library ID
   - Handle cases where library is not found in Context7

2. **Download Documentation**
   - Use `mcp_upstashcontext7_mcp_get_library_docs` with the resolved library ID
   - Set appropriate token limits (default: 5000 tokens)
   - Focus on relevant topics if specified

3. **Save Documentation**
   - Create organized folder structure: `docs/context7/[library-name]/`
   - Save documentation with clear naming convention
   - Include metadata about download date and version

### Step 3: Progress Reporting
For each library:
- ✅ Successfully downloaded: [library-name]
- ⚠️ Partially available: [library-name] (limited documentation)
- ❌ Not available: [library-name] (not in Context7)

### Step 4: Summary Report
Provide final summary:
- **Successfully downloaded**: X libraries
- **Partially available**: X libraries  
- **Not available**: X libraries
- **Total documentation size**: X tokens/files
- **Storage location**: `docs/context7/`

### Step 5: Next Steps
Suggest follow-up actions:
- `/cm-status` - View current context status
- `/cm-selective` - Download additional libraries
- `/cm-config` - Update configuration settings

### Error Handling
If Context7 MCP server is not available:
- Provide clear error message
- Suggest checking MCP configuration
- Offer alternative documentation sources