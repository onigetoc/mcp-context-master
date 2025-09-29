========================
CODE SNIPPETS
========================
TITLE: General Standalone Function Usage Pattern
DESCRIPTION: Illustrates the general pattern for using standalone functions within an application. It covers importing a function, initializing a client, calling the function, and explicitly checking the `result.ok` property to handle either the successful `result.value` or the typed `result.error`.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/FUNCTIONS.md#_snippet_1

LANGUAGE: typescript
CODE:

```
import { Core } from "<sdk-package-name>";
import { fetchSomething } from "<sdk-package-name>/funcs/fetchSomething.js";

const client = new Core();

async function run() {
  const result = await fetchSomething(client, { id: "123" });
  if (!result.ok) {
    // You can throw the error or handle it. It's your choice now.
    throw result.error;
  }

  console.log(result.value);
}

run();
```

---

TITLE: TypeScript Pagination Model Example
DESCRIPTION: Demonstrates how to import and use the Pagination model in TypeScript. This example shows the structure of a typical Pagination object, including current page, page size, total pages, and total count.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/pagination.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { Pagination } from "@smithery/registry/models/components";

let value: Pagination = {
  currentPage: 1,
  pageSize: 10,
  totalPages: 5,
  totalCount: 47
};
```

---

TITLE: TypeScript ToolType Example
DESCRIPTION: Demonstrates importing the `ToolType` from the Smithery SDK and assigning a valid string literal value to it. This type represents the classification of tools within the registry.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/tooltype.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { ToolType } from "@smithery/registry/models/components";

let value: ToolType = "object";
```

---

TITLE: Use serversList Standalone Function
DESCRIPTION: Demonstrates how to import and use the `serversList` standalone function from the SDK. It shows initializing the `SmitheryRegistryCore` client and handling the asynchronous response, including iterating through paginated results or logging errors.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/FUNCTIONS.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { SmitheryRegistryCore } from "@smithery/registry/core.js";
import { serversList } from "@smithery/registry/funcs/serversList.js";

// Use `SmitheryRegistryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const smitheryRegistry = new SmitheryRegistryCore({
  bearerAuth: process.env["SMITHERY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await serversList(smitheryRegistry, {
    q: "owner:mem0ai is:verified memory",
  });
  if (res.ok) {
    const { value: result } = res;
    for await (const page of result) {
    console.log(page);
  }
  } else {
    console.log("serversList failed:", res.error);
  }
}

run();
```

---

TITLE: Pagination with Async Iterables
DESCRIPTION: Demonstrates how to consume paginated API responses using async iterables. The SDK returns an async iterable for endpoints supporting pagination, allowing consumption with the `for await...of` syntax.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/README.md#_snippet_6

LANGUAGE: typescript
CODE:

```
import { SmitheryRegistry } from "@smithery/registry";

const smitheryRegistry = new SmitheryRegistry({
  bearerAuth: process.env["SMITHERY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await smitheryRegistry.servers.list({
    q: "owner:mem0ai is:verified memory",
  });

  for await (const page of result) {
    console.log(page);
  }
}

run();

```

---

TITLE: List Servers (Standalone Function)
DESCRIPTION: Shows how to list servers using the standalone `serversList` function with `SmitheryRegistryCore`. This approach is optimized for tree-shaking and provides a more direct functional interface.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/sdks/servers/README.md#_snippet_1

LANGUAGE: typescript
CODE:

```
import { SmitheryRegistryCore } from "@smithery/registry/core.js";
import { serversList } from "@smithery/registry/funcs/serversList.js";

// Use `SmitheryRegistryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const smitheryRegistry = new SmitheryRegistryCore({
  bearerAuth: process.env["SMITHERY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await serversList(smitheryRegistry, {
    q: "owner:mem0ai is:verified memory",
  });
  if (res.ok) {
    const { value: result } = res;
    for await (const page of result) {
    console.log(page);
  }
  } else {
    console.log("serversList failed:", res.error);
  }
}

run();
```

---

TITLE: Recommended TypeScript Compiler Options
DESCRIPTION: Specifies essential tsconfig.json compiler options for projects using this SDK. These settings enable static type support for modern JavaScript features like async iterables, streams, and fetch-related APIs, ensuring better developer experience and code safety.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/RUNTIMES.md#_snippet_0

LANGUAGE: jsonc
CODE:

```
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["es2020", "dom", "dom.iterable"]
  }
}
```

---

TITLE: List Servers (SmitheryRegistry)
DESCRIPTION: Demonstrates listing servers using the main SmitheryRegistry client. It handles paginated results and allows for query-based filtering.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/sdks/servers/README.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { SmitheryRegistry } from "@smithery/registry";

const smitheryRegistry = new SmitheryRegistry({
  bearerAuth: process.env["SMITHERY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await smitheryRegistry.servers.list({
    q: "owner:mem0ai is:verified memory",
  });

  for await (const page of result) {
    console.log(page);
  }
}

run();
```

---

TITLE: Run Example Script
DESCRIPTION: Builds the project and then executes an example TypeScript file using `tsx`. Ensure Node.js (v18+) and npm are installed and the `.env` file is configured.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/examples/README.md#_snippet_1

LANGUAGE: bash
CODE:

```
npm run build && npx tsx example.ts
```

---

TITLE: Pagination Model Fields
DESCRIPTION: Defines the structure and properties of the Pagination object used for API responses. Each field specifies its data type, whether it is required, and a brief description.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/pagination.md#_snippet_1

LANGUAGE: APIDOC
CODE:

```
Pagination:
  description: Represents pagination metadata for API results.
  fields:
    currentPage:
      type: number
      required: true
      description: The current page number of the results.
      example: 1
    pageSize:
      type: number
      required: true
      description: The number of items to display per page.
      example: 10
    totalPages:
      type: number
      required: true
      description: The total number of pages available for the results.
      example: 5
    totalCount:
      type: number
      required: true
      description: The total number of items across all pages.
      example: 47
```

---

TITLE: API Pagination Parameters
DESCRIPTION: These parameters are used for paginating results from API endpoints. They allow clients to request specific subsets of data, improving performance and manageability for large datasets.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/operations/listserversrequest.md#_snippet_2

LANGUAGE: APIDOC
CODE:

```
Pagination Parameters:

`page`
  - Type: *number*
  - Description: Page number for pagination. Specifies which page of results to retrieve.
  - Constraints: Must be a positive integer.

`pageSize`
  - Type: *number*
  - Description: Number of items per page. Determines how many results are returned in a single response.
  - Constraints: Must be a positive integer, often with a defined maximum limit.
```

---

TITLE: ListServersRequest Example (TypeScript)
DESCRIPTION: This snippet demonstrates how to import and create an instance of the ListServersRequest object. It shows a typical usage pattern for filtering server listings.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/operations/listserversrequest.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { ListServersRequest } from "@smithery/registry/models/operations";

let value: ListServersRequest = {
  q: "owner:mem0ai is:verified memory",
};
```

---

TITLE: SmitheryRegistryCore/serversGet: Get Server Info (TypeScript)
DESCRIPTION: Shows how to use the standalone `serversGet` function with `SmitheryRegistryCore` for improved tree-shaking. It illustrates making the call and handling potential success or error responses.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/sdks/servers/README.md#_snippet_4

LANGUAGE: typescript
CODE:

```
import { SmitheryRegistryCore } from "@smithery/registry/core.js";
import { serversGet } from "@smithery/registry/funcs/serversGet.js";

// Use `SmitheryRegistryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const smitheryRegistry = new SmitheryRegistryCore({
  bearerAuth: process.env["SMITHERY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await serversGet(smitheryRegistry, {
    qualifiedName: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("serversGet failed:", res.error);
  }
}

run();
```

---

TITLE: Install SDK with Bun
DESCRIPTION: Installs the Smithery Registry SDK using the bun package manager.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/README.md#_snippet_2

LANGUAGE: bash
CODE:

```
bun add @smithery/registry
```

---

TITLE: Smithery AI SDK: Server Request Parameters and Response
DESCRIPTION: Details the parameters required for making a server request, the expected response object, and potential error types with their corresponding status codes.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/sdks/servers/README.md#_snippet_5

LANGUAGE: APIDOC
CODE:

```
GetServerRequest:
  Description: Makes a request to the server.
  Parameters:
    request: The request object to use for the request.
      Type: operations.GetServerRequest
      Required: Yes
    options: Used to set various options for making HTTP requests.
      Type: RequestOptions
      Required: No
      fetchOptions: Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed.
        Type: RequestInit (https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)
        Required: No
      retries: Enables retrying HTTP requests under certain failure conditions.
        Type: RetryConfig
        Required: No
  Response:
    Type: Promise<components.ServerDetailResponse>
  Errors:
    errors.UnauthorizedError:
      StatusCode: 401
      ContentType: application/json
    errors.NotFoundError:
      StatusCode: 404
      ContentType: application/json
    errors.ServerError:
      StatusCode: 500
      ContentType: application/json
    errors.APIError:
      StatusCode: 4XX, 5XX
      ContentType: */*
```

---

TITLE: ListServersResponse Example Usage (TypeScript)
DESCRIPTION: Demonstrates how to instantiate and use the ListServersResponse object in TypeScript. It shows the expected structure for servers and pagination data.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/operations/listserversresponse.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { ListServersResponse } from "@smithery/registry/models/operations";

let value: ListServersResponse = {
  result: {
    servers: [
      {
        qualifiedName: "smithery-ai/fetch",
        displayName: "Fetch",
        description: "A server for fetching web content",
        homepage: "https://smithery.ai/server/smithery-ai/fetch",
        useCount: 12345,
        createdAt: new Date("2023-01-01T12:00:00Z"),
      },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 5,
      totalCount: 47,
    },
  },
};
```

---

TITLE: ServerListResponse Example Usage
DESCRIPTION: Demonstrates how to use the ServerListResponse type in TypeScript, showing the structure for servers and pagination.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/serverlistresponse.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { ServerListResponse } from "@smithery/registry/models/components";

let value: ServerListResponse = {
  servers: [
    {
      qualifiedName: "smithery-ai/fetch",
      displayName: "Fetch",
      description: "A server for fetching web content",
      homepage: "https://smithery.ai/server/smithery-ai/fetch",
      useCount: 12345,
      createdAt: new Date("2023-01-01T12:00:00Z"),
    },
  ],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 5,
    totalCount: 47,
  },
};
```

---

TITLE: GetServerRequest Model Usage (TypeScript)
DESCRIPTION: Demonstrates how to import and instantiate the GetServerRequest model in TypeScript. This model represents a request to get server information.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/operations/getserverrequest.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { GetServerRequest } from "@smithery/registry/models/operations";

let value: GetServerRequest = {
  qualifiedName: "<value>",
};
```

---

TITLE: NotFoundError TypeScript Example
DESCRIPTION: Demonstrates the import statement for the NotFoundError class from the @smithery/registry/models/errors module. No specific usage examples are currently available.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/errors/notfounderror.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { NotFoundError } from "@smithery/registry/models/errors";

// No examples available for this model
```

---

TITLE: Setup Environment File
DESCRIPTION: Copies the template environment file (`.env.template`) to a new file (`.env`). This new file should be edited to include actual credentials and configuration details.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/examples/README.md#_snippet_0

LANGUAGE: bash
CODE:

```
cp .env.template .env
```

---

TITLE: List Servers with Smithery SDK (TypeScript)
DESCRIPTION: This example demonstrates initializing the Smithery Registry client using a bearer token from an environment variable. It then calls the `servers.list` method with a query to find specific servers and iterates through the paginated results, logging each page to the console.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/USAGE.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { SmitheryRegistry } from "@smithery/registry";

const smitheryRegistry = new SmitheryRegistry({
  bearerAuth: process.env["SMITHERY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await smitheryRegistry.servers.list({
    q: "owner:mem0ai is:verified memory",
  });

  for await (const page of result) {
    console.log(page);
  }
}

run();

```

---

TITLE: TypeScript UnauthorizedError Example
DESCRIPTION: Demonstrates how to import and potentially use the UnauthorizedError class from the Smithery AI SDK. This error signifies issues with authentication credentials.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/errors/unauthorizederror.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { UnauthorizedError } from "@smithery/registry/models/errors";

// No examples available for this model

// Fields:
// error: string (Optional) - Example: Unauthorized: Invalid API key
```

---

TITLE: ServerListItem Model Usage Example
DESCRIPTION: Demonstrates how to import and instantiate the ServerListItem model with sample data in TypeScript.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/serverlistitem.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { ServerListItem } from "@smithery/registry/models/components";

let value: ServerListItem = {
  qualifiedName: "smithery-ai/fetch",
  displayName: "Fetch",
  description: "A server for fetching web content",
  homepage: "https://smithery.ai/server/smithery-ai/fetch",
  useCount: 12345,
  createdAt: new Date("2023-01-01T12:00:00Z"),
};
```

---

TITLE: Security Model Initialization (TypeScript)
DESCRIPTION: Demonstrates how to import and initialize the Security model from the smithery-ai SDK in TypeScript. The model is typically initialized as an empty object.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/security.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { Security } from "@smithery/registry/models/components";

let value: Security = {};
```

---

TITLE: Collect Environment Information
DESCRIPTION: This snippet shows how to collect detailed environment information using the `envinfo` command, which is useful for reporting issues. It requires Node.js to be installed.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/CONTRIBUTING.md#_snippet_0

LANGUAGE: bash
CODE:

```
npx envinfo
```

---

TITLE: Install SDK with PNPM
DESCRIPTION: Installs the Smithery Registry SDK using the pnpm package manager.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/README.md#_snippet_1

LANGUAGE: bash
CODE:

```
pnpm add @smithery/registry
```

---

TITLE: Tool Object Schema Definition
DESCRIPTION: Defines the structure and properties of the 'Tool' object used in the Smithery AI SDK. It outlines each field, its data type, whether it's required, and provides a brief description and example.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/tool.md#_snippet_1

LANGUAGE: APIDOC
CODE:

```
Tool Object:
  Represents a callable tool within the Smithery AI SDK.

  Fields:
    name:
      Type: string
      Required: Yes
      Description: The unique identifier or name of the tool.
      Example: fetch_url

    description:
      Type: string
      Required: No
      Description: A human-readable description of what the tool does.
      Example: Fetches content from a URL

    inputSchema:
      Type: components.InputSchema (JSON Schema)
      Required: Yes
      Description: A JSON Schema defining the expected input parameters for the tool.
      Example: {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "description": "URL to fetch content from"
          }
        },
        "required": [
          "url"
        ]
      }
```

---

TITLE: StdioFunction Definition for Server
DESCRIPTION: Defines a lambda Javascript function used for configuring stdio connections within the SDK. This function accepts a configuration object and is expected to return a StdioConnection object, typically used in server-side operations like 'run_server'.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/connectioninfo.md#_snippet_2

LANGUAGE: javascript
CODE:

```
const stdioFunction = (config) => {
  // Implementation to create and return a StdioConnection object
  // based on the provided config.
  // Example:
  // return new StdioConnection(config.stdioOptions);
};

// Usage context:
// run_server({ stdioFunction: stdioFunction });
```

---

TITLE: ListServersResponse API Structure
DESCRIPTION: Defines the structure of the ListServersResponse object, detailing its fields, their types, and whether they are required.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/operations/listserversresponse.md#_snippet_1

LANGUAGE: APIDOC
CODE:

```
ListServersResponse:
  description: Response object containing a list of servers and pagination information.
  fields:
    result:
      type: components.ServerListResponse
      required: true
      description: The main payload containing server list and pagination details.

components.ServerListResponse:
  description: Contains the list of servers and pagination metadata.
  fields:
    servers:
      type: array
      items:
        type: object
        properties:
          qualifiedName:
            type: string
            description: Unique identifier for the server.
          displayName:
            type: string
            description: Human-readable name for the server.
          description:
            type: string
            description: A brief description of the server's functionality.
          homepage:
            type: string
            format: url
            description: URL to the server's homepage.
          useCount:
            type: integer
            description: Number of times the server has been used.
          createdAt:
            type: string
            format: date-time
            description: Timestamp when the server was created.
      required: true
    pagination:
      type: object
      properties:
        currentPage:
          type: integer
          description: The current page number of the results.
        pageSize:
          type: integer
          description: The number of items per page.
        totalPages:
          type: integer
          description: The total number of pages available.
        totalCount:
          type: integer
          description: The total number of items across all pages.
      required: true
```

---

TITLE: Install Smithery SDK
DESCRIPTION: Installs the necessary packages for the Smithery SDK and the Model Context Protocol (MCP) SDK using npm. These packages are required to build Smithery-compatible servers and clients.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/sdk/README.md#_snippet_0

LANGUAGE: bash
CODE:

```
npm install @smithery/sdk @modelcontextprotocol/sdk
```

---

TITLE: Define Tool Object in TypeScript
DESCRIPTION: Demonstrates how to create a 'Tool' object in TypeScript for the Smithery AI SDK. This includes specifying the tool's name, description, and its input schema using JSON Schema.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/tool.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { Tool } from "@smithery/registry/models/components";

let value: Tool = {
  name: "fetch_url",
  description: "Fetches content from a URL",
  inputSchema: {
    type: "object",
    properties: {
      "url": {
        "type": "string",
        "description": "URL to fetch content from",
      },
    },
    additionalProperties: {
      "required": [
        "url",
      ],
    },
  },
};
```

---

TITLE: List Servers with Smithery SDK
DESCRIPTION: Demonstrates initializing the SmitheryRegistry client and listing servers with a specific query. It includes error handling for SmitheryRegistryError and its subclasses, showing how to access error details like message, status code, and body.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/README.md#_snippet_10

LANGUAGE: typescript
CODE:

```
import { SmitheryRegistry } from "@smithery/registry";
import * as errors from "@smithery/registry/models/errors";

const smitheryRegistry = new SmitheryRegistry({
  bearerAuth: process.env["SMITHERY_BEARER_AUTH"] ?? "",
});

async function run() {
  try {
    const result = await smitheryRegistry.servers.list({
      q: "owner:mem0ai is:verified memory",
    });

    for await (const page of result) {
      console.log(page);
    }
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.SmitheryRegistryError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.UnauthorizedError) {
        console.log(error.data$.error); // string
      }
    }
  }
}

run();

```

---

TITLE: Spawn Smithery Stateless Server (TypeScript)
DESCRIPTION: Demonstrates how to create a basic stateless MCP server using the Smithery SDK. It defines a function to instantiate an McpServer and then uses createStatelessServer to launch the application, listening on a specified port.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/sdk/README.md#_snippet_1

LANGUAGE: typescript
CODE:

```
import { createStatelessServer } from '@smithery/sdk/server/stateless.js'
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

// Create your MCP server function
function createMcpServer({ config }) {
  // Create and return a server instance
  // https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#core-concepts
  const mcpServer = new McpServer({
    name: "My App",
    version: "1.0.0"
  })

  // ...

  return mcpServer.server
}

// Create the stateless server using your MCP server function.
createStatelessServer(createMcpServer)
  .app
  .listen(process.env.PORT || 3000)
```

---

TITLE: ServerError Model Usage
DESCRIPTION: Demonstrates how to import the ServerError model from the SDK. Currently, no specific usage examples are provided for this model.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/errors/servererror.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { ServerError } from "@smithery/registry/models/errors";

// No examples available for this model
```

---

TITLE: TypeScript Example: InputSchema Definition
DESCRIPTION: Demonstrates how to define an InputSchema object in TypeScript. This schema specifies the structure and properties required for tool inputs, including a URL field.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/docs/models/components/inputschema.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { InputSchema } from "@smithery/registry/models/components";

let value: InputSchema = {
  type: "object",
  properties: {
    "url": {
      "type": "string",
      "description": "URL to fetch content from",
    },
  },
  additionalProperties: {
    "required": [
      "url"
    ],
  },
};
```

========================
QUESTIONS AND ANSWERS
========================
TOPIC: Supported JavaScript Runtimes
Q: What benefits do the recommended TypeScript compiler options provide?
A: These options provide static type support for features used by the SDK, such as async iterables, streams, and fetch-related APIs like `for await...of`, `AbortSignal`, `Request`, and `Response`.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/RUNTIMES.md#_qa_4

---

TOPIC: Supported JavaScript Runtimes
Q: What specific JavaScript features does this SDK rely on?
A: The SDK utilizes the Web Fetch API, the Web Streams API (specifically `ReadableStream`), and async iterables which use `Symbol.asyncIterator`.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/RUNTIMES.md#_qa_1

---

TOPIC: Standalone Functions
Q: What is the typical pattern for calling a standalone function and handling its result?
A: You call the standalone function with the client instance and parameters, then check the `ok` property of the returned result. If `!result.ok`, you handle the `result.error`; otherwise, you access the `result.value`.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/FUNCTIONS.md#_qa_8

---

TOPIC: Contributing to Smithery AI SDK Repository
Q: How can I get further assistance or ask questions about this repository?
A: If you have any questions or need further assistance, you can reach out by opening an issue on GitHub.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/CONTRIBUTING.md#_qa_6

---

TOPIC: Smithery AI SDK - TypeScript Example
Q: How does the `servers.list` method handle paginated results?
A: The `servers.list` method returns an async iterator that allows you to iterate over paginated results. You can use a `for await...of` loop to process each page of the results.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/USAGE.md#_qa_3

---

TOPIC: Standalone Functions
Q: How does the `Result<Value, Error>` type help in error handling?
A: By returning errors as part of the `Result` type, standalone functions allow application code to maintain clear control flow and handle errors as a regular part of the application's logic, rather than relying on try-catch blocks for all potential issues.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/FUNCTIONS.md#_qa_4

---

TOPIC: Supported JavaScript Runtimes
Q: What TypeScript compiler options are recommended for this SDK?
A: It is recommended to set `"target": "es2020"` (or higher) and include `"lib": ["es2020", "dom", "dom.iterable"]` in your `tsconfig.json`.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/RUNTIMES.md#_qa_3

---

TOPIC: Standalone Functions
Q: How do you import and use a standalone function like `serversList`?
A: You import the specific function from its dedicated path, for example, `import { serversList } from "@smithery/registry/funcs/serversList.js";`. You then call it with an instance of the SDK's core class and any necessary parameters.

SOURCE: https://github.com/smithery-ai/sdk/blob/main/typescript/registry/FUNCTIONS.md#_qa_7
