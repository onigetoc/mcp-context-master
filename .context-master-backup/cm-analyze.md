# Project Analysis Results

## 📊 Dependency Analysis

**Total Dependencies**: {TOTAL_DEPS}
**Production Dependencies**: {PROD_DEPS}
**Development Dependencies**: {DEV_DEPS}

## 🎯 Priority Recommendations

### 🔴 HIGH PRIORITY - Download Documentation
{HIGH_PRIORITY_LIST}

**Reasoning**: These libraries are specialized, have complex APIs, or are poorly documented elsewhere.

### 🟡 MEDIUM PRIORITY - Consider Based on Usage
{MEDIUM_PRIORITY_LIST}

**Reasoning**: Popular libraries that might benefit from context depending on your specific usage.

### 🟢 LOW PRIORITY - Skip Documentation
{LOW_PRIORITY_LIST}

**Reasoning**: Very well documented everywhere with stable, simple APIs.

## 📈 Analysis Criteria

### Factors Increasing Priority:
- GitHub Stars < 10,000
- Specialized or niche functionality
- Complex or unique API patterns
- Limited official documentation
- Recent major version changes

### Factors Decreasing Priority:
- GitHub Stars > 50,000
- Extensive Stack Overflow presence
- Simple and stable API
- Industry standard tools
- Massive official documentation

## 🚀 Recommended Next Steps

1. **Download High-Priority Documentation**
   ```
   add_project_context for each high-priority library
   ```

2. **Selective Medium-Priority Downloads**
   ```
   Choose based on your specific project needs
   ```

3. **Verify Context Setup**
   ```
   list_available_contexts to confirm downloads
   ```

---

**Smart context selection saves time and improves code quality!** ⚡