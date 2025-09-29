# Selective Documentation Download

## Task: Interactive Selection of Documentation to Download

### Step 1: Load Available Libraries
Show all detected dependencies with their priority scores:

```
📦 Available Libraries for Download:

🔴 HIGH PRIORITY (Recommended)
[ ] remotion - Specialized video library (⭐ 8.2k)
[ ] zustand - State management patterns (⭐ 15.1k)
[ ] framer-motion - Complex animation API (⭐ 22.3k)

🟡 MEDIUM PRIORITY (Consider)
[ ] tailwindcss - Advanced usage patterns (⭐ 68.5k)
[ ] next.js - Advanced features only (⭐ 98.2k)

🟢 LOW PRIORITY (Skip recommended)
[ ] react - Extensively documented (⭐ 201k)
[ ] express - Simple stable API (⭐ 58.9k)
```

### Step 2: Interactive Selection
Allow user to select libraries using:
- **Checkbox format**: `[x]` for selected, `[ ]` for unselected
- **Number selection**: "Select numbers: 1,3,5"
- **Range selection**: "Select range: 1-4"
- **Category selection**: "Select all HIGH priority"
- **Custom input**: User can type library names

### Step 3: Selection Validation
For each selected library:
- **Availability check**: Verify library exists in Context7
- **Size estimation**: Estimate documentation size
- **Dependency check**: Check for related libraries
- **Conflict detection**: Identify potential conflicts

### Step 4: Download Confirmation
Show final selection summary:
```
📋 Selected for Download:
✅ remotion (estimated: 1,200 tokens)
✅ zustand (estimated: 800 tokens)
✅ framer-motion (estimated: 1,500 tokens)

📊 Total: 3 libraries, ~3,500 tokens
💾 Estimated size: ~2.1 MB
⏱️ Estimated time: 30 seconds
```

### Step 5: Execute Downloads
For each selected library:
1. **Resolve library ID** using Context7 MCP
2. **Download documentation** with progress indicator
3. **Save to organized structure** in `docs/context7/`
4. **Report status**: Success/Partial/Failed

### Step 6: Download Report
Show final results:
```
📥 Download Complete:

✅ remotion - Successfully downloaded (1,245 tokens)
✅ zustand - Successfully downloaded (823 tokens)  
⚠️ framer-motion - Partial download (limited docs)

📊 Summary:
- Successfully downloaded: 2/3 libraries
- Total tokens: 2,068
- Storage location: docs/context7/
```

### Step 7: Next Steps
Suggest follow-up actions:
- `/cm-status` - View updated context status
- `/cm-download` - Download remaining high-priority libraries
- `/cm-analyze` - Re-analyze with new context

### Advanced Options
- **Topic filtering**: Download specific topics only
- **Token limits**: Set custom token limits per library
- **Update mode**: Re-download existing documentation
- **Batch processing**: Queue multiple downloads