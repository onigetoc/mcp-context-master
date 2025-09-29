# MCP Context Master - Development Tasks

## 🎯 **Project Vision**

Create an intelligent MCP server that helps developers bootstrap projects by automatically finding and downloading the most relevant contextual documentation.

## ✅ **Completed Features**

### Core Functionality

- [x] Automatic project analysis (package.json, requirements.txt)
- [x] GitHub search with scoped package normalization (@scope/package)
- [x] Context7 URL generation with parameters (topic, tokens)
- [x] Automatic documentation download
- [x] Smart filename generation (cm-modelcontextprotocol-sdk-context.md)
- [x] Error handling and rate limiting
- [x] CLI test script with download capability (`search-test.js`)

### Architecture

- [x] Complete MCP structure with tools and handlers
- [x] Modular parsers (package.json, requirements.txt, README)
- [x] Node.js and Python project support
- [x] Comprehensive logging and debugging

## 🚧 **Current Sprint - Priority High**

### Intelligent Result Validation

- [ ] **Task 1.1:** Implement automatic repository scoring system

  - [ ] Score based on stars, forks, recent activity
  - [ ] Detect archived/abandoned repositories
  - [ ] Evaluate documentation quality
  - [ ] Name/query match scoring (exact vs fuzzy)

- [ ] **Task 1.2:** Enrich result metadata
  - [ ] Add `relevanceScore`, `lastUpdated`, `isActive` fields
  - [ ] Project health indicators
  - [ ] Selection reasoning (`matchReasons`)

### LLM Guidance System

- [ ] **Task 1.3:** Create dependency priority logic
  - [ ] High priority: Specialized libraries (< 10k stars)
  - [ ] Medium priority: Popular but complex APIs
  - [ ] Low priority: Well-documented mainstream libraries
- [ ] **Task 1.4:** Integrate guidance into MCP responses
  - [ ] Add "guidance" section with evaluation criteria
  - [ ] Include red flags to avoid
  - [ ] Suggest next steps for LLMs

## 📋 **Next Sprint - Priority Medium**

### Enhanced Project Detection

- [ ] **Task 2.1:** Advanced project analysis

  - [ ] Detect if project already started (src/, lib/, app/ folders)
  - [ ] Analyze project complexity (dependency count, types)
  - [ ] Identify main framework/technology stack

- [ ] **Task 2.2:** Support additional languages
  - [ ] Go (go.mod)
  - [ ] Rust (Cargo.toml)
  - [ ] Java (pom.xml, build.gradle)
  - [ ] C# (.csproj, packages.config)
  - [ ] PHP (composer.json)
  - [ ] Ruby (Gemfile)

### Smart Search Improvements

- [ ] **Task 2.3:** Multi-criteria search filtering

  - [ ] Filter by programming language
  - [ ] Filter by license type
  - [ ] Filter by last activity date
  - [ ] Search by GitHub topics

- [ ] **Task 2.4:** Query enhancement
  - [ ] Synonym and alternative term handling
  - [ ] Description/README content search
  - [ ] Exclude irrelevant keywords

## 🔮 **Future Backlog - Priority Low**

### Advanced Intelligence

- [ ] **Task 3.1:** Transitive dependency analysis

  - [ ] Analyze dependencies of dependencies
  - [ ] Detect potential conflicts
  - [ ] Suggest alternatives

- [ ] **Task 3.2:** User preference learning
  - [ ] Download history tracking
  - [ ] Usage-based scoring
  - [ ] Personalized recommendations

### Integration & UX

- [ ] **Task 3.3:** Enhanced CLI interface

  - [ ] Interactive mode for result selection
  - [ ] Content preview before download
  - [ ] Batch download multiple results

- [ ] **Task 3.4:** Configuration system
  - [ ] User preference config file
  - [ ] Package blacklist management
  - [ ] Custom filename templates

## 🎯 **Immediate Next Steps (This Week)**

### **Day 1-2: Implement Priority Logic**

```typescript
// Add to project-master.ts
interface DependencyPriority {
  name: string;
  priority: "high" | "medium" | "low";
  reason: string;
  score: number;
}
```

### **Day 3-4: Enhanced Metadata**

```typescript
// Enrich search results
interface EnhancedSearchResult {
  originalPackageName: string;
  repoName: string;
  url: string;
  context7Url: string;
  priority: DependencyPriority;
  healthScore: number;
  lastUpdated: string;
  downloaded: boolean;
}
```

### **Day 5: LLM Guidance Integration**

```typescript
// Add guidance to MCP responses
interface ProjectStarterResult {
  // ... existing fields
  guidance: {
    recommendedDownloads: string[];
    skipReasons: Record<string, string>;
    nextSteps: string[];
  };
}
```

## 📊 **Success Metrics**

- **Setup Time:** New project context setup < 2 minutes
- **Relevance:** Search result accuracy > 80%
- **Efficiency:** Only download truly needed documentation
- **Adoption:** Positive feedback from MCP community

## 🔧 **Technical Decisions**

### Architecture Principles

- Keep MCP logic simple and focused
- Avoid direct LLM calls (not in MCP scope)
- Prioritize rich metadata to guide LLMs
- Maintain compatibility with all AI IDEs (Cursor, Kiro, Cline, etc.)

### Example LLM Interaction Flow

```
1. LLM calls project_starter tool
2. System analyzes project dependencies
3. System applies priority logic
4. System returns results with guidance
5. LLM makes informed decisions based on metadata
6. LLM can call again with specific selections
```

## 💡 **Key Insights**

### Priority Examples

- `remotion` → **HIGH** (specialized video library)
- `next.js` → **LOW** (extremely well documented)
- `zustand` → **HIGH** (specific state management patterns)
- `axios` → **LOW** (simple, stable API)
- `@tanstack/react-query` → **HIGH** (complex data fetching patterns)

### LLM Guidance Strategy

Instead of asking LLMs to choose, provide them with:

- Clear priority rankings
- Justification for each decision
- Contextual recommendations
- Override capabilities

---

**Last Updated:** August 19, 2025
**Current Version:** 1.0.0
**Next Version:** 1.1.0 (Priority Logic + Enhanced Metadata)
