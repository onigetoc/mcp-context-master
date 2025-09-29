# Context Selection Guide for MCP Context Master

## 🎯 Objective

This guide helps LLMs make intelligent decisions when using MCP Context Master to download project documentation.

## 🧠 Dependency Priority Logic

### 🔴 HIGH PRIORITY - Download absolutely

These libraries need contextual documentation because they are:

- Specialized or lesser-known
- Have complex or unique APIs
- Poorly documented on the general web

**Examples:**

- `remotion` - Library de vidéo programmatique très spécialisée
- `zustand` - State management moins connu que Redux
- `framer-motion` - Animations complexes avec API spécifique
- `@tanstack/react-query` - Patterns spécifiques de data fetching
- `prisma` - ORM avec syntaxe unique
- `trpc` - Type-safe APIs avec patterns spécifiques
- `solid-js` - Framework moins mainstream
- `qwik` - Framework avec concepts uniques

### 🟡 MEDIUM PRIORITY - Evaluate based on context

These libraries are known but can benefit from context depending on the project:

- Popular libraries with extensive APIs
- Frameworks with lots of configuration
- Tools with specific patterns

**Examples:**

- `tailwindcss` - If advanced usage or custom components
- `next.js` - If using advanced features (middleware, edge, etc.)
- `typescript` - If advanced patterns or complex configuration
- `webpack` - If custom configuration
- `vite` - If plugins or advanced configuration

### 🟢 LOW PRIORITY - Generally not necessary

These libraries are very well documented everywhere and have stable APIs:

- Mainstream frameworks with tons of web content
- Libraries with simple and stable APIs
- Standard ecosystem tools

**Examples:**

- `react` - Extremely documented everywhere
- `express` - Simple and stable API
- `lodash` - Well-known utility functions
- `axios` - Simple HTTP client
- `moment` / `date-fns` - Well-documented date APIs
- `jest` - Standard testing framework

## 📊 Automatic Decision Criteria

### Factors that increase priority:

- **GitHub Stars < 10,000** → +2 points
- **Last release < 6 months** → +1 point
- **Limited official documentation** → +2 points
- **Complex or unique API** → +2 points
- **Specialized framework/library** → +3 points

### Factors that decrease priority:

- **GitHub Stars > 50,000** → -2 points
- **Massive Stack Overflow presence** → -1 point
- **Extensive official documentation** → -2 points
- **Simple and stable API** → -1 point
- **Industry standard** → -2 points

## 🎯 Recommended LLM Prompts

### Initial Analysis

```
"I'm analyzing this [TYPE] project. It contains [X] dependencies.
Based on priority criteria, I recommend downloading documentation for: [HIGH PRIORITY LIST].

Libraries like [LOW PRIORITY LIST] are already very well documented
and probably don't need additional context.

Would you like to proceed with these recommendations or adjust the selection?"
```

### Choice Justification

```
"Remotion → HIGH priority because it's a very specialized library for programmatic video
Next.js → LOW priority because it's extremely documented everywhere
Zustand → HIGH priority because of specific state management patterns"
```

## 🔍 Project Type Detection

### Frontend React/Next.js

- **High Priority:** Framer Motion, Zustand, React Query, Custom Styled Components
- **Low Priority:** React, Next.js (except advanced features), Basic CSS frameworks

### Backend Node.js

- **High Priority:** Prisma, tRPC, GraphQL libraries, Specialized ORMs
- **Low Priority:** Express, Basic middleware, Standard npm packages

### Full-stack

- **High Priority:** Monorepo tools, Specialized deployment tools, Custom configs
- **Low Priority:** Standard frameworks on both sides

## ⚠️ Warning Signals

### DO NOT download if:

- Library is deprecated or archived
- Last update > 2 years ago
- Many unresolved issues
- More popular alternatives available

### Download even if popular if:

- Recent major version with breaking changes
- Very specific usage patterns for the project
- Complex configuration required

## 🎯 Final Objective

The LLM should be able to say:

> "I've analyzed your project. Out of 12 dependencies, I recommend downloading documentation for **3 specialized libraries** that will truly benefit from additional context, rather than downloading everything and cluttering your workspace."

---

**Usage:** This guide is automatically included in context when using MCP Context Master.
