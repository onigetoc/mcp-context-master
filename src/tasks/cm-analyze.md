# Analyze Project Dependencies

## Task: Dependency Analysis and Documentation Recommendations

### Step 1: Read Project Configuration
Read and analyze the following files if they exist:
- `package.json` (Node.js dependencies)
- `requirements.txt` (Python dependencies)  
- `Cargo.toml` (Rust dependencies)
- `go.mod` (Go dependencies)

### Step 2: Apply Priority Scoring
For each dependency found, apply the priority scoring system from the context selection guide:

**HIGH PRIORITY (🔴)** - Download absolutely:
- Specialized or lesser-known libraries
- Complex or unique APIs
- Poorly documented libraries
- GitHub Stars < 10,000
- Specialized frameworks

**MEDIUM PRIORITY (🟡)** - Evaluate based on context:
- Popular libraries with extensive APIs
- Frameworks with lots of configuration
- Tools with specific patterns

**LOW PRIORITY (🟢)** - Generally not necessary:
- Mainstream frameworks (React, Express, etc.)
- Libraries with simple and stable APIs
- Industry standards with extensive documentation

### Step 3: Generate Recommendations
Create a prioritized list showing:
- **Library name**
- **Priority level** (🔴/🟡/🟢)
- **Reasoning** (why this priority was assigned)
- **Recommendation** (download/skip/conditional)

### Step 4: Summary Report
Provide a summary with:
- Total dependencies found: X
- High priority recommendations: X
- Medium priority for consideration: X
- Low priority (can skip): X

### Step 5: Next Steps
Suggest the next command:
- `/cm-download` - Download high priority documentation
- `/cm-selective` - Choose specific libraries to download
- `/cm-bulk` - Download all recommended documentation