================
CODE SNIPPETS
================
TITLE: Run AI SDK Example Application with pnpm
DESCRIPTION: This set of `pnpm` commands guides users through setting up and running an example application. It includes navigating to the example directory, configuring the OpenAI API key in an environment file, and starting the development servers for both Angular and Express.

SOURCE: https://github.com/vercel/ai/blob/main/packages/angular/README.md#_snippet_16

LANGUAGE: bash
CODE:
```
# Navigate to example
cd examples/angular-chat

# Set up environment
echo "OPENAI_API_KEY=your_key_here" > .env

# Start development (Angular + Express)
pnpm start
```

--------------------------------

TITLE: Install Dependencies and Build AI SDK Project
DESCRIPTION: These commands are used to install project dependencies using `pnpm` and then build the AI SDK project, preparing it for execution.

SOURCE: https://github.com/vercel/ai/blob/main/examples/hono/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
pnpm build
```

--------------------------------

TITLE: Install AI SDK and OpenAI Provider
DESCRIPTION: Installs the necessary packages for AI SDK, the OpenAI provider, and AI SDK React components using pnpm, preparing your project for AI-powered features.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/23-gpt-5.mdx#_snippet_8

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/openai @ai-sdk/react
```

--------------------------------

TITLE: Install Dependencies and Configure Environment for Next.js AI App
DESCRIPTION: This command sequence facilitates the initial setup of the project by installing all necessary dependencies using pnpm. Following installation, it copies the example environment file to `.env.local`, which is essential for local development. Users are then required to manually populate this new `.env.local` file with specific configuration values.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-openai-kasada-bot-protection/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
pnpm i
cp .env.local.example .env.local # and fill in the required values
```

--------------------------------

TITLE: Install Dependencies and Build AI SDK Project
DESCRIPTION: Commands to set up the AI SDK project by installing necessary dependencies and then building the project. These steps should be executed from the root directory of the AI SDK repository.

SOURCE: https://github.com/vercel/ai/blob/main/examples/ai-core/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
pnpm build
```

--------------------------------

TITLE: Install AI SDK and Google Generative AI Provider
DESCRIPTION: Instructions for installing the necessary AI SDK and Google Generative AI provider packages using pnpm for a new Next.js application.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/17-gemini-2-5.mdx#_snippet_4

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/google
```

--------------------------------

TITLE: Install Dependencies and Build AI SDK Project
DESCRIPTION: Installs project dependencies using pnpm and then builds the AI SDK project. These steps are necessary to prepare the application for execution and ensure all required modules are available.

SOURCE: https://github.com/vercel/ai/blob/main/examples/fastify/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
pnpm build
```

--------------------------------

TITLE: Install Dependencies and Start Angular AI Chat App
DESCRIPTION: This snippet provides the necessary commands to set up and run the Angular AI chat application. It covers installing project dependencies using pnpm, creating an environment file for the OpenAI API key, and starting both the Angular frontend (localhost:4200) and Express backend (localhost:3000) concurrently.

SOURCE: https://github.com/vercel/ai/blob/main/examples/angular/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
# Install dependencies
pnpm install

# Create .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_key_here" > .env

# Start the app
pnpm start
```

--------------------------------

TITLE: Install Project Dependencies with pnpm
DESCRIPTION: Install all necessary project dependencies using pnpm. This command must be executed from the root directory of the AI SDK repository to ensure all required packages are installed.

SOURCE: https://github.com/vercel/ai/blob/main/examples/node-http-server/README.md#_snippet_1

LANGUAGE: shell
CODE:
```
pnpm install
```

--------------------------------

TITLE: Build AI SDK Project with pnpm
DESCRIPTION: These commands demonstrate how to install project dependencies and build the AI SDK project using `pnpm`. `pnpm install` fetches all required packages, and `pnpm build` compiles the project, preparing it for execution.

SOURCE: https://github.com/vercel/ai/blob/main/examples/mcp/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
```

LANGUAGE: sh
CODE:
```
pnpm build
```

--------------------------------

TITLE: Run AI SDK with SSE Transport (Legacy)
DESCRIPTION: This section outlines the commands for starting a server and running a client using the legacy SSE transport. `pnpm sse:server` starts the server, and `pnpm sse:client` runs the client to interact via SSE.

SOURCE: https://github.com/vercel/ai/blob/main/examples/mcp/README.md#_snippet_4

LANGUAGE: sh
CODE:
```
pnpm sse:server
```

LANGUAGE: sh
CODE:
```
pnpm sse:client
```

--------------------------------

TITLE: Install Dependencies and Build AI SDK Project
DESCRIPTION: These commands are used to install all required project dependencies and then build the AI SDK project. This prepares the application for execution by compiling source code and resolving modules.

SOURCE: https://github.com/vercel/ai/blob/main/examples/express/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
pnpm build
```

--------------------------------

TITLE: Install AI SDK and related dependencies for Expo
DESCRIPTION: Installs the core AI SDK package, the OpenAI provider, the React integration, and `zod` for schema validation using various package managers.

SOURCE: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/07-expo.mdx#_snippet_2

LANGUAGE: pnpm
CODE:
```
pnpm add ai @ai-sdk/openai @ai-sdk/react zod
```

LANGUAGE: npm
CODE:
```
npm install ai @ai-sdk/openai @ai-sdk/react zod
```

LANGUAGE: yarn
CODE:
```
yarn add ai @ai-sdk/openai @ai-sdk/react zod
```

LANGUAGE: bun
CODE:
```
bun add ai @ai-sdk/openai @ai-sdk/react zod
```

--------------------------------

TITLE: Start Node.js Development Server with pnpm
DESCRIPTION: Run the Node.js development server. This command typically starts the HTTP server that utilizes the AI SDK for text and object generation capabilities.

SOURCE: https://github.com/vercel/ai/blob/main/examples/node-http-server/README.md#_snippet_2

LANGUAGE: shell
CODE:
```
pnpm dev
```

--------------------------------

TITLE: Initialize Next.js Project with AI SDK Example
DESCRIPTION: These commands demonstrate how to bootstrap a new Next.js application using `create-next-app` and an example from the Vercel AI repository, specifically for integrating AI SDK with Next.js and FastAPI. Choose your preferred package manager: npm, Yarn, or pnpm.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-fastapi/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-fastapi next-fastapi-app
```

LANGUAGE: bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-fastapi next-fastapi-app
```

LANGUAGE: bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-fastapi next-fastapi-app
```

--------------------------------

TITLE: Install AI SDK and DeepSeek Provider for Next.js
DESCRIPTION: This command installs the necessary AI SDK packages (`ai`, `@ai-sdk/deepseek`, `@ai-sdk/react`) required to build AI-powered applications with DeepSeek models in a Next.js environment.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/25-r1.mdx#_snippet_3

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/deepseek @ai-sdk/react
```