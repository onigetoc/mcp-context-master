================
CODE SNIPPETS
================
TITLE: Running Example Applications for TypeScript SDK
DESCRIPTION: These commands allow contributors to run the example server and client applications locally. This is useful for testing new features, demonstrating functionality, and understanding how the SDK interacts with a live environment.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/CONTRIBUTING.md#_snippet_2

LANGUAGE: Shell
CODE:
```
npm run server
```

LANGUAGE: Shell
CODE:
```
npm run client
```

--------------------------------

TITLE: Initial Setup and Build Commands for TypeScript SDK
DESCRIPTION: These commands guide contributors through the initial setup of the Model Context Protocol TypeScript SDK, including cloning the repository, installing dependencies, building the project, and running initial tests to ensure a working environment.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/CONTRIBUTING.md#_snippet_0

LANGUAGE: Shell
CODE:
```
git clone https://github.com/YOUR-USERNAME/typescript-sdk.git
```

LANGUAGE: Shell
CODE:
```
npm install
```

LANGUAGE: Shell
CODE:
```
npm run build
```

LANGUAGE: Shell
CODE:
```
npm test
```

--------------------------------

TITLE: Development Workflow Commands for TypeScript SDK
DESCRIPTION: Commands used during the development process to ensure code quality and functionality. This includes running linting checks for code style compliance and executing tests to verify that all changes work as expected and do not introduce regressions.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/CONTRIBUTING.md#_snippet_1

LANGUAGE: Shell
CODE:
```
npm run lint
```

LANGUAGE: Shell
CODE:
```
npm test
```

--------------------------------

TITLE: Create a Simple MCP Server with Tools and Resources (TypeScript)
DESCRIPTION: This example demonstrates how to initialize an MCP server, register a tool for addition with input validation, and define a dynamic greeting resource. It then connects the server to a standard I/O transport, enabling it to process incoming MCP messages and respond via stdout.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Add an addition tool
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Add a dynamic greeting resource
server.registerResource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  { 
    title: "Greeting Resource",      // Display name for UI
    description: "Dynamic greeting generator"
  },
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
```

--------------------------------

TITLE: Registering Tools in TypeScript SDK
DESCRIPTION: This section illustrates how to register various tools using the `server.registerTool` method in the Model Context Protocol TypeScript SDK. Tools enable LLMs to perform actions that can involve computation and side effects, such as calculating BMI, fetching external data, or listing files and returning `ResourceLinks`.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_4

LANGUAGE: typescript
CODE:
```
// Simple tool with parameters
server.registerTool(
  "calculate-bmi",
  {
    title: "BMI Calculator",
    description: "Calculate Body Mass Index",
    inputSchema: {
      weightKg: z.number(),
      heightM: z.number()
    }
  },
  async ({ weightKg, heightM }) => ({
    content: [{
      type: "text",
      text: String(weightKg / (heightM * heightM))
    }]
  })
);

// Async tool with external API call
server.registerTool(
  "fetch-weather",
  {
    title: "Weather Fetcher",
    description: "Get weather data for a city",
    inputSchema: { city: z.string() }
  },
  async ({ city }) => {
    const response = await fetch(`https://api.weather.com/${city}`);
    const data = await response.text();
    return {
      content: [{ type: "text", text: data }]
    };
  }
);

// Tool that returns ResourceLinks
server.registerTool(
  "list-files",
  {
    title: "List Files",
    description: "List project files",
    inputSchema: { pattern: z.string() }
  },
  async ({ pattern }) => ({
    content: [
      { type: "text", text: `Found files matching "${pattern}":` },
      // ResourceLinks let tools return references without file content
      {
        type: "resource_link",
        uri: "file:///project/README.md",
        name: "README.md",
        mimeType: "text/markdown",
        description: 'A README file'
      },
      {
        type: "resource_link",
        uri: "file:///project/src/index.ts",
        name: "index.ts",
        mimeType: "text/typescript",
        description: 'An index file'
      }
    ]
  })
);
```

--------------------------------

TITLE: Dynamically Manage Tools and Resources in MCP TypeScript Server
DESCRIPTION: This example illustrates how to dynamically add, update, enable, disable, and remove tools and resources on an `McpServer` after it has been connected. It highlights the automatic emission of `listChanged` notifications when server capabilities are modified based on external state or user actions.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_16

LANGUAGE: typescript
CODE:
```
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "Dynamic Example",
  version: "1.0.0"
});

const listMessageTool = server.tool(
  "listMessages",
  { channel: z.string() },
  async ({ channel }) => ({
    content: [{ type: "text", text: await listMessages(channel) }]
  })
);

const putMessageTool = server.tool(
  "putMessage",
  { channel: z.string(), message: z.string() },
  async ({ channel, message }) => ({
    content: [{ type: "text", text: await putMessage(channel, message) }]
  })
);
// Until we upgrade auth, `putMessage` is disabled (won't show up in listTools)
putMessageTool.disable()

const upgradeAuthTool = server.tool(
  "upgradeAuth",
  { permission: z.enum(["write", "admin"])},
  // Any mutations here will automatically emit `listChanged` notifications
  async ({ permission }) => {
    const { ok, err, previous } = await upgradeAuthAndStoreToken(permission)
    if (!ok) return {content: [{ type: "text", text: `Error: ${err}` }]}

    // If we previously had read-only access, 'putMessage' is now available
    if (previous === "read") {
      putMessageTool.enable()
    }

    if (permission === 'write') {
      // If we've just upgraded to 'write' permissions, we can still call 'upgradeAuth' 
      // but can only upgrade to 'admin'. 
      upgradeAuthTool.update({
        paramsSchema: { permission: z.enum(["admin"]) }, // change validation rules
      })
    } else {
      // If we're now an admin, we no longer have anywhere to upgrade to, so fully remove that tool
      upgradeAuthTool.remove()
    }
  }
)

// Connect as normal
const transport = new StdioServerTransport();
await server.connect(transport);
```

--------------------------------

TITLE: Implement Streamable HTTP Server with Dynamic Notifications
DESCRIPTION: This server demonstrates how to send server notifications using Streamable HTTP. It showcases resource list change notifications with dynamically added resources. The example also includes automatic resource creation on a timed interval.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/src/examples/README.md#_snippet_4

LANGUAGE: Bash
CODE:
```
npx tsx src/examples/server/standaloneSseWithGetStreamableHttp.ts
```

--------------------------------

TITLE: Requesting Argument Completions from Model Context Protocol Client
DESCRIPTION: This snippet illustrates how a client application can request argument completions for prompts or resources using the `client.complete` method in the Model Context Protocol (MCP) SDK. It demonstrates specifying the reference type (prompt or resource), the argument name, the current partial value, and optional context for more accurate suggestions.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_6

LANGUAGE: typescript
CODE:
```
// Request completions for any argument
const result = await client.complete({
  ref: {
    type: "ref/prompt",  // or "ref/resource"
    name: "example"      // or uri: "template://..."
  },
  argument: {
    name: "argumentName",
    value: "partial"     // What the user has typed so far
  },
  context: {             // Optional: Include previously resolved arguments
    arguments: {
      previousArg: "value"
    }
  }
});
```

--------------------------------

TITLE: Initialize and Interact with MCP Client in TypeScript
DESCRIPTION: Shows how to initialize an MCP client using the TypeScript SDK, connect it via a transport (e.g., StdioClientTransport), and perform common client operations such as listing prompts, getting a specific prompt, listing resources, reading a resource, and calling a tool.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_21

LANGUAGE: typescript
CODE:
```
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

await client.connect(transport);

// List prompts
const prompts = await client.listPrompts();

// Get a prompt
const prompt = await client.getPrompt({
  name: "example-prompt",
  arguments: {
    arg1: "value"
  }
});

// List resources
const resources = await client.listResources();

// Read a resource
const resource = await client.readResource({
  uri: "file:///example.txt"
});

// Call a tool
const result = await client.callTool({
  name: "example-tool",
  arguments: {
    arg1: "value"
  }
});
```

--------------------------------

TITLE: Execute Build and Test Commands for MCP TypeScript SDK
DESCRIPTION: This snippet provides a collection of common shell commands used for developing the Model Context Protocol (MCP) TypeScript SDK. It covers building the project, running code linting, executing the entire test suite, and options for running specific test files or tests by name using Jest.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/CLAUDE.md#_snippet_0

LANGUAGE: sh
CODE:
```
npm run build        # Build ESM and CJS versions
npm run lint         # Run ESLint
npm test             # Run all tests
npx jest path/to/file.test.ts  # Run specific test file
npx jest -t "test name"        # Run tests matching pattern
```

--------------------------------

TITLE: Registering Resources in TypeScript SDK
DESCRIPTION: This section demonstrates how to register different types of resources (static, dynamic, and context-aware) using the `server.registerResource` method in the Model Context Protocol TypeScript SDK. Resources are used to expose data to Large Language Models (LLMs) and are designed to be side-effect free, similar to GET requests in a REST API.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_3

LANGUAGE: typescript
CODE:
```
// Static resource
server.registerResource(
  "config",
  "config://app",
  {
    title: "Application Config",
    description: "Application configuration data",
    mimeType: "text/plain"
  },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "App configuration here"
    }]
  })
);

// Dynamic resource with parameters
server.registerResource(
  "user-profile",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  {
    title: "User Profile",
    description: "User profile information"
  },
  async (uri, { userId }) => ({
    contents: [{
      uri: uri.href,
      text: `Profile data for user ${userId}`
    }]
  })
);

// Resource with context-aware completion
server.registerResource(
  "repository",
  new ResourceTemplate("github://repos/{owner}/{repo}", {
    list: undefined,
    complete: {
      // Provide intelligent completions based on previously resolved parameters
      repo: (value, context) => {
        if (context?.arguments?.["owner"] === "org1") {
          return ["project1", "project2", "project3"].filter(r => r.startsWith(value));
        }
        return ["default-repo"].filter(r => r.startsWith(value));
      }
    }
  }),
  {
    title: "GitHub Repository",
    description: "Repository information"
  },
  async (uri, { owner, repo }) => ({
    contents: [{
      uri: uri.href,
      text: `Repository: ${owner}/${repo}`
    }]
  })
);
```

--------------------------------

TITLE: Create an MCP Echo Server with Resources, Tools, and Prompts
DESCRIPTION: This example illustrates how to build a simple 'echo' server using the Model Context Protocol (MCP) SDK. It registers a resource that echoes messages as URIs, a tool that echoes messages as text content, and a prompt that generates a user message for processing. This demonstrates the core functionalities of `McpServer` for defining interactive components.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_14

LANGUAGE: typescript
CODE:
```
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "echo-server",
  version: "1.0.0"
});

server.registerResource(
  "echo",
  new ResourceTemplate("echo://{message}", { list: undefined }),
  {
    title: "Echo Resource",
    description: "Echoes back messages as resources"
  },
  async (uri, { message }) => ({
    contents: [{
      uri: uri.href,
      text: `Resource echo: ${message}`
    }]
  })
);

server.registerTool(
  "echo",
  {
    title: "Echo Tool",
    description: "Echoes back the provided message",
    inputSchema: { message: z.string() }
  },
  async ({ message }) => ({
    content: [{ type: "text", text: `Tool echo: ${message}` }]
  })
);

server.registerPrompt(
  "echo",
  {
    title: "Echo Prompt",
    description: "Creates a prompt to process a message",
    argsSchema: { message: z.string() }
  },
  ({ message }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please process this message: ${message}`
      }
    }]
  })
);
```

--------------------------------

TITLE: Implement Streamable HTTP Client with MCP TypeScript SDK
DESCRIPTION: This example demonstrates a full-featured interactive client connecting to a Streamable HTTP server. It showcases establishing and managing connections, listing and calling tools, handling notifications via SSE, and managing prompts and resources. The client also supports session termination, reconnection, and resumability with Last-Event-ID tracking.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/src/examples/README.md#_snippet_0

LANGUAGE: Bash
CODE:
```
npx tsx src/examples/client/simpleStreamableHttp.ts
```

LANGUAGE: Bash
CODE:
```
npx tsx src/examples/client/simpleOAuthClient.js
```

--------------------------------

TITLE: Elicit User Input on MCP Server with TypeScript
DESCRIPTION: Demonstrates how an MCP server can request additional information from users using the elicitation feature. This example shows a restaurant booking tool checking availability and asking for alternative dates if the initial request fails, using a Zod schema for input validation.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_19

LANGUAGE: typescript
CODE:
```
// Server-side: Restaurant booking tool that asks for alternatives
server.tool(
  "book-restaurant",
  {
    restaurant: z.string(),
    date: z.string(),
    partySize: z.number()
  },
  async ({ restaurant, date, partySize }) => {
    // Check availability
    const available = await checkAvailability(restaurant, date, partySize);
    
    if (!available) {
      // Ask user if they want to try alternative dates
      const result = await server.server.elicitInput({
        message: `No tables available at ${restaurant} on ${date}. Would you like to check alternative dates?`,
        requestedSchema: {
          type: "object",
          properties: {
            checkAlternatives: {
              type: "boolean",
              title: "Check alternative dates",
              description: "Would you like me to check other dates?"
            },
            flexibleDates: {
              type: "string",
              title: "Date flexibility",
              description: "How flexible are your dates?",
              enum: ["next_day", "same_week", "next_week"],
              enumNames: ["Next day", "Same week", "Next week"]
            }
          },
          required: ["checkAlternatives"]
        }
      });

      if (result.action === "accept" && result.content?.checkAlternatives) {
        const alternatives = await findAlternatives(
          restaurant,
          date,
          partySize,
          result.content.flexibleDates as string
        );
        return {
          content: [{
            type: "text",
            text: `Found these alternatives: ${alternatives.join(", ")}`
          }]
        };
      }
      
      return {
        content: [{
          type: "text",
          text: "No booking made. Original date not available."
        }]
      };
    }
    
    // Book the table
    await makeBooking(restaurant, date, partySize);
    return {
      content: [{
        type: "text",
        text: `Booked table for ${partySize} at ${restaurant} on ${date}`
      }]
    };
  }
);
```

--------------------------------

TITLE: Integrate SQLite Database with MCP TypeScript Server
DESCRIPTION: This example demonstrates how to connect an `McpServer` to an SQLite database. It registers a 'schema' resource to expose the database schema and a 'query' tool to execute arbitrary SQL queries, showcasing database interaction within the MCP framework.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_15

LANGUAGE: typescript
CODE:
```
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import sqlite3 from "sqlite3";
import { promisify } from "util";
import { z } from "zod";

const server = new McpServer({
  name: "sqlite-explorer",
  version: "1.0.0"
});

// Helper to create DB connection
const getDb = () => {
  const db = new sqlite3.Database("database.db");
  return {
    all: promisify<string, any[]>(db.all.bind(db)),
    close: promisify(db.close.bind(db))
  };
};

server.registerResource(
  "schema",
  "schema://main",
  {
    title: "Database Schema",
    description: "SQLite database schema",
    mimeType: "text/plain"
  },
  async (uri) => {
    const db = getDb();
    try {
      const tables = await db.all(
        "SELECT sql FROM sqlite_master WHERE type='table'"
      );
      return {
        contents: [{
          uri: uri.href,
          text: tables.map((t: {sql: string}) => t.sql).join("\n")
        }]
      };
    } finally {
      await db.close();
    }
  }
);

server.registerTool(
  "query",
  {
    title: "SQL Query",
    description: "Execute SQL queries on the database",
    inputSchema: { sql: z.string() }
  },
  async ({ sql }) => {
    const db = getDb();
    try {
      const results = await db.all(sql);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(results, null, 2)
        }]
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    } finally {
      await db.close();
    }
  }
);
```

--------------------------------

TITLE: Handle Elicitation Requests on MCP Client with TypeScript
DESCRIPTION: Illustrates how an MCP client should handle elicitation requests from the server. It shows a placeholder function `getInputFromUser` that needs to be implemented based on the UI framework to gather user input, and how the client's request handler processes the elicited data.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_20

LANGUAGE: typescript
CODE:
```
// This is a placeholder - implement based on your UI framework
async function getInputFromUser(message: string, schema: any): Promise<{
  action: "accept" | "decline" | "cancel";
  data?: Record<string, any>;
}> {
  // This should be implemented depending on the app
  throw new Error("getInputFromUser must be implemented for your platform");
}

client.setRequestHandler(ElicitRequestSchema, async (request) => {
  const userResponse = await getInputFromUser(
    request.params.message,
    request.params.requestedSchema
  );
  
  return {
    action: userResponse.action,
    content: userResponse.action === "accept" ? userResponse.data : undefined
  };
});
```