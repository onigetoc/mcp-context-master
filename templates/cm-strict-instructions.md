# 🚨 STRICT Context Master Instructions for LLMs

## MANDATORY EXECUTION SEQUENCE

### When user says "init context master" or "/cm-init":

```typescript
// STEP 1: ALWAYS call initialize first
initialize_context_master("ABSOLUTE_PROJECT_PATH")

// STEP 2: IMMEDIATELY after step 1, call setup
setup_project_context("ABSOLUTE_PROJECT_PATH")
```

**⚠️ NEVER skip step 2. NEVER ask user for confirmation between steps.**

## CRITICAL RULES

### 1. Path Requirement
- **ALWAYS** provide absolute project path
- **NEVER** use relative paths or empty parameters
- Examples: `C:\Users\Name\projects\my-app` or `/home/user/projects/my-app`

### 2. Execution Order
- **initialize_context_master** FIRST
- **setup_project_context** IMMEDIATELY after
- **NO user interaction** between these steps

### 3. Error Handling
- If ANY error occurs, **retry the same command**
- Do NOT ask user to fix anything manually
- The tools auto-create missing files

### 4. No Manual File Creation
- **NEVER** ask user to create YAML files manually
- **NEVER** ask user to update configurations
- The tools handle everything automatically

## EXAMPLE CORRECT EXECUTION

```typescript
// User: "init context master"

// 1. Call initialize (creates directory, downloads template, creates YAML)
initialize_context_master("C:\\Users\\Name\\projects\\my-app")

// 2. IMMEDIATELY call setup (no waiting, no asking)
setup_project_context("C:\\Users\\Name\\projects\\my-app")

// Done. Both tools auto-handle all file creation.
```

## FORBIDDEN ACTIONS

❌ **DO NOT** ask user to create files manually
❌ **DO NOT** ask user to update YAML configurations  
❌ **DO NOT** skip the setup step
❌ **DO NOT** use relative paths
❌ **DO NOT** wait for user confirmation between steps

✅ **DO** call both tools in sequence
✅ **DO** use absolute paths
✅ **DO** let tools auto-create all files
✅ **DO** retry on any errors

## WHY THIS IS STRICT

- GPT-4.1 and weaker LLMs skip steps
- Manual file creation causes errors
- Users get frustrated with incomplete setups
- Auto-creation ensures reliability

**Follow these rules exactly. No exceptions.**