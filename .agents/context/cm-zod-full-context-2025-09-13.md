========================
CODE SNIPPETS
========================
TITLE: Install Zod Canary with Bun (Shell)
DESCRIPTION: Demonstrates installing the canary version of Zod with Bun.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_8

LANGUAGE: Shell
CODE:
```
bun add zod@canary
```

----------------------------------------

TITLE: VSCode Dev Container Setup
DESCRIPTION: Steps to set up a development environment using VSCode Dev Containers. This provides an isolated environment with dependencies automatically installed.

SOURCE: https://github.com/colinhacks/zod/blob/main/CONTRIBUTING.md#_snippet_8

LANGUAGE: bash
CODE:
```
F1
Dev Containers: Clone Repository in Named Container Volume
git@github.com:{your_username}/zod.git
Create a new volume...
zod
zod
```

----------------------------------------

TITLE: Peer Dependencies for Zod Integration (JSON)
DESCRIPTION: Example JSON configuration for setting up `peerDependencies` to allow consumers to provide their own Zod instance, preventing duplicate installs.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/core.mdx#_snippet_16

LANGUAGE: json
CODE:
```
{
  "peerDependencies": {
    "zod/v4/core": "*"
  }
}
```

----------------------------------------

TITLE: VSCode Dev Container Setup
DESCRIPTION: Instructions for setting up a VSCode Dev Container to clone the Zod repository and automatically install dependencies.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/CONTRIBUTING.md#_snippet_7

LANGUAGE: typescript
CODE:
```
F1
Dev Containers: Clone Repository in Named Container Volume
git@github.com:{your_username}/zod.git
zod
zod
```

----------------------------------------

TITLE: Install Zod Canary with Yarn (Shell)
DESCRIPTION: Shows how to install the canary version of Zod using Yarn.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_6

LANGUAGE: Shell
CODE:
```
yarn add zod@canary
```

----------------------------------------

TITLE: Install Zod Canary with pnpm (Shell)
DESCRIPTION: Shows how to install the canary version of Zod using pnpm.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_10

LANGUAGE: Shell
CODE:
```
pnpm add zod@canary
```

----------------------------------------

TITLE: Install Zod with Bun (Shell)
DESCRIPTION: Provides the command to install Zod using Bun, a fast JavaScript runtime and package manager.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_7

LANGUAGE: Shell
CODE:
```
bun add zod
```

----------------------------------------

TITLE: Install Dependencies
DESCRIPTION: Installs project dependencies using Yarn.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/CONTRIBUTING.md#_snippet_2

LANGUAGE: sh
CODE:
```
yarn
```

----------------------------------------

TITLE: Install Zod with Yarn (Shell)
DESCRIPTION: Provides the command to install Zod using Yarn, a popular JavaScript package manager.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_5

LANGUAGE: Shell
CODE:
```
yarn add zod
```

----------------------------------------

TITLE: Install Zod with pnpm (Shell)
DESCRIPTION: Provides the command to install Zod using pnpm, a performant Node.js package manager.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_9

LANGUAGE: Shell
CODE:
```
pnpm add zod
```

----------------------------------------

TITLE: Install Zod Dependencies
DESCRIPTION: Installs the necessary dependencies for Zod development using pnpm. This command should be run after cloning the repository.

SOURCE: https://github.com/colinhacks/zod/blob/main/CONTRIBUTING.md#_snippet_1

LANGUAGE: bash
CODE:
```
pnpm i
```

----------------------------------------

TITLE: Install Zod Mini
DESCRIPTION: Installs Zod version 4.0.0 or higher, which includes Zod Mini.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/mini.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
npm install zod@^4.0.0
```

----------------------------------------

TITLE: Install Zod with Deno (Shell)
DESCRIPTION: Shows how to add Zod to a Deno project using the `deno add` command with npm specifiers.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_3

LANGUAGE: Shell
CODE:
```
deno add npm:zod
```

----------------------------------------

TITLE: Install Zod Canary with Deno (Shell)
DESCRIPTION: Demonstrates adding the canary version of Zod to a Deno project.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_4

LANGUAGE: Shell
CODE:
```
deno add npm:zod@canary
```

----------------------------------------

TITLE: Install Zod
DESCRIPTION: Installs the specified version of Zod using npm.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/v4/index.mdx#_snippet_8

LANGUAGE: sh
CODE:
```
npm install zod@^3.25.0
```

----------------------------------------

TITLE: Install Zod with npm (Shell)
DESCRIPTION: Provides the command to install the stable version of Zod using npm. This is the standard way to add Zod to a Node.js project.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_1

LANGUAGE: Shell
CODE:
```
npm install zod
```

----------------------------------------

TITLE: Install Zod
DESCRIPTION: This snippet shows how to install Zod using npm, a package manager for Node.js. Zod is a zero-dependency library suitable for Node.js and modern browsers.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README_ZH.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install zod
```

----------------------------------------

TITLE: Infer Input and Output Types with Transform
DESCRIPTION: Demonstrates how to infer independent input and output types from a Zod schema that uses `.transform()`. `z.input<>` gets the type before transformation, and `z.output<>` (or `z.infer<>`) gets the type after transformation.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/basics.mdx#_snippet_7

LANGUAGE: typescript
CODE:
```
const mySchema = z.string().transform((val) => val.length);

type MySchemaIn = z.input<typeof mySchema>;
// => string

type MySchemaOut = z.output<typeof mySchema>; // equivalent to z.infer<typeof mySchema>
// number
```

----------------------------------------

TITLE: Install Zod Canary with npm (Shell)
DESCRIPTION: Provides the command to install the canary (latest development) version of Zod using npm. This is useful for testing the newest features or bug fixes.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/index.mdx#_snippet_2

LANGUAGE: Shell
CODE:
```
npm install zod@canary
```

----------------------------------------

TITLE: Install Zod via npm
DESCRIPTION: Instructions for installing the Zod package using various package managers like npm, yarn, bun, and pnpm. It also shows the command for Deno.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README_ZH.md#_snippet_23

LANGUAGE: Shell
CODE:
```
npm install zod
den add npm:zod      # deno
yarn add zod          # yarn
bun add zod           # bun
pnpm add zod          # pnpm
```

----------------------------------------

TITLE: Install Zod via npm, deno, yarn, bun, pnpm
DESCRIPTION: Demonstrates how to install Zod using various package managers, including the standard and canary versions.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_54

LANGUAGE: bash
CODE:
```
npm install zod       # npm
deno add npm:zod      # deno
yarn add zod          # yarn
bun add zod           # bun
pnpm add zod          # pnpm
```

LANGUAGE: bash
CODE:
```
npm install zod@canary       # npm
deno add npm:zod@canary      # deno
yarn add zod@canary          # yarn
bun add zod@canary           # bun
pnpm add zod@canary          # pnpm
```

----------------------------------------

TITLE: Zod Mini Bundle Size Example (Simple)
DESCRIPTION: Shows a simple boolean parsing example and its resulting bundle size difference between Zod and Zod Mini, highlighting Zod Mini's 64% reduction.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/packages/mini.mdx#_snippet_4

LANGUAGE: typescript
CODE:
```
z.boolean().parse(true)
```

----------------------------------------

TITLE: Zod: Installation via npm
DESCRIPTION: Provides the command to install the Zod library using npm, the Node Package Manager. This is the standard way to add Zod to a Node.js or frontend project.

SOURCE: https://github.com/colinhacks/zod/blob/main/README.md#_snippet_4

LANGUAGE: Shell
CODE:
```
npm install zod
```

----------------------------------------

TITLE: Zod: Installation via npm
DESCRIPTION: Provides the command to install the Zod library using npm, the Node Package Manager. This is the standard way to add Zod to a Node.js or frontend project.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/zod/README.md#_snippet_4

LANGUAGE: Shell
CODE:
```
npm install zod
```

----------------------------------------

TITLE: Install Zod via npm
DESCRIPTION: This snippet shows how to install the Zod library using npm, a package manager for Node.js and the JavaScript runtime. Zod has zero dependencies and works in both Node.js and browsers.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install zod
```

----------------------------------------

TITLE: Development Workflow Example
DESCRIPTION: Steps for the typical development workflow in the Zod project, emphasizing experimentation, testing, and code quality checks.

SOURCE: https://github.com/colinhacks/zod/blob/main/CLAUDE.md#_snippet_6

LANGUAGE: shell
CODE:
```
# 1. Experiment with play.ts
pnpm dev play.ts

# 2. Write tests
# (Tests located in src/*/tests/ directories)

# 3. Build before testing changes
pnpm build

# 4. Run linting/formatting
pnpm fix

# 5. Ensure all tests and type checks pass
```

----------------------------------------

TITLE: Extend Zod GlobalMeta Interface
DESCRIPTION: Provides an example of extending the Zod `GlobalMeta` interface using TypeScript's declaration merging to add custom fields like 'examples'.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/metadata.mdx#_snippet_4

LANGUAGE: ts
CODE:
```
declare module "zod" {
  interface GlobalMeta {
    // add new fields here
    examples?: unknown[];
  }
}
```

----------------------------------------

TITLE: Global Error Customization with setErrorMap
DESCRIPTION: Demonstrates how to globally customize error messages in Zod 3 by providing a custom error map to `z.setErrorMap()`.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/MIGRATION.md#_snippet_3

LANGUAGE: javascript
CODE:
```
z.setErrorMap(myErrorMap);
```

----------------------------------------

TITLE: Zod Pipe for String Length Transformation
DESCRIPTION: Demonstrates chaining a string schema with a transformation using Zod's `.pipe()` method to extract the length of a string. The example shows how to parse a string and get its length as the output.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs/content/api.mdx#_snippet_131

LANGUAGE: typescript
CODE:
```
const stringToLength = z.string().pipe(z.transform(val => val.length));

stringToLength.parse("hello"); // => 5
```

----------------------------------------

TITLE: Zod Type Inference with z.infer
DESCRIPTION: Explains how to extract TypeScript types from Zod schemas using `z.infer`. This allows developers to get the static type definition corresponding to a Zod schema, ensuring type safety. The example shows inferring a string type and attempting to assign an incorrect type to it.

SOURCE: https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README.md#_snippet_164

LANGUAGE: TypeScript
CODE:
```
const A = z.string();
type A = z.infer<typeof A>; // string

const u: A = 12; // TypeError
const u: A = "asdf"; // compiles
```