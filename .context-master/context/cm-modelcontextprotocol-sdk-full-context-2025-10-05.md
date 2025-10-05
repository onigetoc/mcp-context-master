================
CODE SNIPPETS
================
TITLE: Registering a Simple Tool with Parameters in TypeScript
DESCRIPTION: This TypeScript code demonstrates registering a simple tool, 'calculate-bmi', that accepts parameters (`weightKg`, `heightM`) defined by an `inputSchema` using `z.number()`. Tools are designed to perform computations and can have side effects, returning their output as content. This tool calculates and returns the Body Mass Index.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_6

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
```

--------------------------------

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

TITLE: Registering an Asynchronous Tool with External API Call in TypeScript
DESCRIPTION: This TypeScript example illustrates registering an asynchronous tool, 'fetch-weather', that interacts with an external API. The tool takes a `city` parameter and fetches weather data, showcasing how tools can integrate with external services and perform I/O operations. It returns the API response as text content.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_7

LANGUAGE: typescript
CODE:
```
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
      content: [{
        type: "text",
        text: data
      }]
    };
  }
);
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

TITLE: MCP Server with SQLite Database Integration (TypeScript)
DESCRIPTION: This TypeScript example demonstrates setting up an MCP server that integrates with an SQLite database. It registers a 'schema' resource to expose the database's DDL and a 'query' tool to execute SQL queries and return results, using `promisify` for asynchronous database operations.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_23

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

TITLE: Create a Basic MCP Server with Tool and Resource (TypeScript)
DESCRIPTION: Demonstrates how to initialize an MCP server, register a simple addition tool with a Zod-defined input schema, and register a dynamic greeting resource. The server then connects to the standard I/O transport, enabling it to receive and send messages via stdin/stdout.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_1

LANGUAGE: typescript
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

TITLE: Registering a Tool That Returns ResourceLinks in TypeScript
DESCRIPTION: This TypeScript code demonstrates registering a tool, 'list-files', that returns `ResourceLink` objects instead of embedding full file content. This is crucial for performance and scalability when dealing with large or numerous resources. Clients can then use these links to selectively fetch resource content as needed.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_8

LANGUAGE: typescript
CODE:
```
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

TITLE: Registering a Context-Aware Resource with Completions in TypeScript
DESCRIPTION: This TypeScript example shows how to register a resource that provides intelligent, context-aware completions for its parameters. The 'repository' resource uses a `ResourceTemplate` with a `complete` function for the `repo` parameter, suggesting relevant repositories based on the `owner` argument. This enhances user experience by guiding input.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_5

LANGUAGE: typescript
CODE:
```
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

TITLE: Initialize and Interact with MCP Client (TypeScript)
DESCRIPTION: This snippet demonstrates the basic setup and common interactions with an MCP client using the TypeScript SDK. It shows how to import necessary modules, configure a 'StdioClientTransport' for communication, initialize the client, connect to the transport, and then perform operations such as listing prompts, getting specific prompts, listing resources, reading resources, and calling tools.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_29

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

TITLE: MCP Server Elicit User Input for Restaurant Booking (TypeScript)
DESCRIPTION: This server-side code demonstrates how an MCP server can use the 'elicitInput' feature to request additional information from the user. It's shown within a 'book-restaurant' tool, where if no availability is found, the server asks the user if they want to check alternative dates and their date flexibility, defining a schema for the expected user response.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_27

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
      }
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

TITLE: Dynamically Managing MCP Server Tools (TypeScript)
DESCRIPTION: This TypeScript example illustrates how to dynamically manage tools on an MCP server. It shows how to register, disable, enable, update, and remove tools after the server has connected, enabling adaptive server behavior based on user permissions or state changes. Changes automatically trigger `listChanged` notifications.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_24

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

TITLE: Requesting Completions from MCP Client
DESCRIPTION: Illustrates how to make a client-side request for argument completions for a given prompt or resource reference. It shows how to specify the reference type, name, partial argument value, and optional context with previously resolved arguments to get relevant suggestions.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_10

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

TITLE: Registering an LLM Sampling Tool in MCP TypeScript Server
DESCRIPTION: This code demonstrates how to set up an MCP server in TypeScript and register a tool named 'summarize'. This tool uses the server's `createMessage` method to interact with an LLM for text summarization, showcasing how to leverage LLM sampling within an MCP tool. It also includes the server connection setup using `StdioServerTransport`.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_13

LANGUAGE: typescript
CODE:
```
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const mcpServer = new McpServer({
  name: "tools-with-sample-server",
  version: "1.0.0",
});

// Tool that uses LLM sampling to summarize any text
mcpServer.registerTool(
  "summarize",
  {
    description: "Summarize any text using an LLM",
    inputSchema: {
      text: z.string().describe("Text to summarize"),
    },
  },
  async ({ text }) => {
    // Call the LLM through MCP sampling
    const response = await mcpServer.server.createMessage({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please summarize the following text concisely:\n\n${text}`,
          },
        },
      ],
      maxTokens: 500,
    });

    return {
      content: [
        {
          type: "text",
          text: response.content.type === "text" ? response.content.text : "Unable to generate summary",
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("MCP server is running...");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
```

--------------------------------

TITLE: Implement Custom Request Handlers with Low-Level TypeScript Server
DESCRIPTION: This example illustrates how to use the low-level `Server` class from `@modelcontextprotocol/sdk/server` to gain fine-grained control over request handling. It shows how to initialize a server with specific capabilities, register custom request handlers for `ListPromptsRequestSchema` and `GetPromptRequestSchema`, and connect the server using `StdioServerTransport`. This approach allows for detailed customization of how the server responds to different requests.

SOURCE: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md#_snippet_26

LANGUAGE: typescript
CODE:
```
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {}
    }
  }
);

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [{
      name: "example-prompt",
      description: "An example prompt template",
      arguments: [{
        name: "arg1",
        description: "Example argument",
        required: true
      }]
    }]
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== "example-prompt") {
    throw new Error("Unknown prompt");
  }
  return {
    description: "Example prompt",
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: "Example prompt text"
      }
    }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
```