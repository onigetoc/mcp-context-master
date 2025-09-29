# 🧪 Testing Guide - MCP Context Master

## 🎯 ESSENTIAL Tests (keep these)

### ✅ MCP Server Tests

- **`test-server.ps1`** - Main server test (RECOMMENDED)
- **`test-server.bat`** - CMD version of server test
- **`test-tools.js`** - Test for the 4 main MCP tools

**Usage:** `test\test-server.ps1` to verify the server works

### ✅ Feature Tests

- **`test-setup-tool.js`** ⭐ **NEW** - Complete setup_project_context tool test
- **`test-manifest.js`** - Test for context manifest system
- **`search-test.js`** - GitHub search functionality test
- **`test-coding-assistant.js`** - Tests AI assistant detection and context file mapping

## 🗂️ Templates (useful for other projects)

- **`test-server-template.bat`** - Template for new MCP projects
- **`test-server-template.ps1`** - PowerShell template for new projects

## ❓ OBSOLETE/CONFUSING Tests (candidates for deletion)

### 🤔 Tests that appear obsolete

- **`cli-test.js`** - CLI test (this project is MCP, not CLI)
- **`test-context-tools.js`** - Probable duplicate
- **`test-github-search.js`** - Duplicate of search-test.js?
- **`test-init-tool.js`** - Initialization test (obsolete?)
- **`test-manifest-debug.js`** - Manifest debug (duplicate?)
- **`test-project-master.js`** - Project master test (obsolete?)
- **`test-simple.js`** - Simple test (redundant?)

## 🚀 Cleanup Recommendation

### Keep only:

1. `test-server.ps1` (main test)
2. `test-setup-tool.js` ⭐ (setup tool test)
3. `test-tools.js` (MCP tools test)
4. `test-manifest.js` (manifest test)
5. `search-test.js` (search test)
6. `test-coding-assistant.js` (AI assistant detection test)
7. Templates (for future projects)

### Delete the rest (8 obsolete files)

## 🎯 Tests to use regularly

```powershell
# Complete server test
test\test-server.ps1

# Setup tool test (NEW - tests complete initialization)
node test\test-setup-tool.js

# Individual MCP tools test
node test\test-tools.js

# Manifest system test
node test\test-manifest.js

# AI assistant detection test
node test\test-coding-assistant.js
```

## 📊 Expected Result

After cleanup: **7 files** instead of 15!

- Clearer structure
- Easier to maintain
- Only relevant tests
