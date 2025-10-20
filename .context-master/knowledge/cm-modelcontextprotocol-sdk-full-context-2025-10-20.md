### Tool: fetch-weather

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md

Retrieves current weather data for a specified city. This tool makes an external API call to get temperature and conditions, which are then returned as structured content.

```APIDOC
## CALL /tools/fetch-weather

### Description
Get weather data for a specified city. This tool interacts with an external weather API to retrieve current temperature and conditions.

### Method
CALL

### Endpoint
/tools/fetch-weather

### Parameters
#### Request Body
- **city** (string) - Required - The name of the city for which to fetch weather data.

### Request Example
{
  "city": "London"
}

### Response
#### Success Response (200)
- **temperature** (number) - The current temperature in the city.
- **conditions** (string) - A description of the current weather conditions.

#### Response Example
{
  "temperature": 15.5,
  "conditions": "Partly Cloudy"
}
```

--------------------------------

### Tool: calculate-bmi

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md

Calculates the Body Mass Index (BMI) given a person's weight and height. This tool accepts numerical values for weight in kilograms and height in meters, returning the computed BMI.

```APIDOC
## CALL /tools/calculate-bmi

### Description
Calculate Body Mass Index based on weight and height. This tool takes two numerical inputs: weight in kilograms and height in meters, and returns the calculated BMI.

### Method
CALL

### Endpoint
/tools/calculate-bmi

### Parameters
#### Request Body
- **weightKg** (number) - Required - Weight of the person in kilograms.
- **heightM** (number) - Required - Height of the person in meters.

### Request Example
{
  "weightKg": 70,
  "heightM": 1.75
}

### Response
#### Success Response (200)
- **bmi** (number) - The calculated Body Mass Index.

#### Response Example
{
  "bmi": 22.857142857142858
}
```

--------------------------------

### Register Simple Tool with McpServer in TypeScript

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md

This snippet illustrates how to register a basic tool named 'calculate-bmi' with the McpServer. It defines input (weightKg, heightM) and output (bmi) schemas using Zod for validation and provides an asynchronous function to perform the calculation, returning both text and structured content.

```typescript
server.registerTool(
    'calculate-bmi',
    {
        title: 'BMI Calculator',
        description: 'Calculate Body Mass Index',
        inputSchema: {
            weightKg: z.number(),
            heightM: z.number()
        },
        outputSchema: { bmi: z.number() }
    },
    async ({ weightKg, heightM }) => {
        const output = { bmi: weightKg / (heightM * heightM) };
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(output)
                }
            ],
            structuredContent: output
        };
    }
);
```

--------------------------------

### Running Example Applications for TypeScript SDK

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/CONTRIBUTING.md

These commands allow contributors to run the example server and client applications locally. This is useful for testing new features, demonstrating functionality, and understanding how the SDK interacts with a live environment.

```Shell
npm run server
```

```Shell
npm run client
```

--------------------------------

### Initial Setup and Build Commands for TypeScript SDK

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/CONTRIBUTING.md

These commands guide contributors through the initial setup of the Model Context Protocol TypeScript SDK, including cloning the repository, installing dependencies, building the project, and running initial tests to ensure a working environment.

```Shell
git clone https://github.com/YOUR-USERNAME/typescript-sdk.git
```

```Shell
npm install
```

```Shell
npm run build
```

```Shell
npm test
```

--------------------------------

### Register Async Tool for External API Call with McpServer in TypeScript

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md

This example demonstrates registering an asynchronous tool 'fetch-weather' that interacts with an external API. It takes a city as input, fetches weather data using `fetch`, and returns the temperature and conditions as structured output, making it suitable for LLM-controlled actions.

```typescript
server.registerTool(
    'fetch-weather',
    {
        title: 'Weather Fetcher',
        description: 'Get weather data for a city',
        inputSchema: { city: z.string() },
        outputSchema: { temperature: z.number(), conditions: z.string() }
    },
    async ({ city }) => {
        const response = await fetch(`https://api.weather.com/${city}`);
        const data = await response.json();
        const output = { temperature: data.temp, conditions: data.conditions };
        return {
            content: [{ type: 'text', text: JSON.stringify(output) }],
            structuredContent: output
        };
    }
);
```

--------------------------------

### Register Tool with User Input Elicitation (MCP Server, TypeScript)

Source: https://context7.com/modelcontextprotocol/typescript-sdk/llms.txt

This snippet demonstrates how to register a tool with an `McpServer` instance that can elicit user input during its execution. It defines input and output schemas using Zod and shows how to use `server.server.elicitInput` to prompt the user for additional information (e.g., alternative dates) when a condition is met. The tool simulates a restaurant booking process.

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'interactive-server',
    version: '1.0.0'
});

server.registerTool(
    'book-restaurant',
    {
        title: 'Book Restaurant',
        description: 'Make a restaurant reservation',
        inputSchema: {
            restaurant: z.string(),
            date: z.string(),
            partySize: z.number()
        },
        outputSchema: {
            success: z.boolean(),
            booking: z.object({
                restaurant: z.string(),
                date: z.string(),
                confirmationCode: z.string()
            }).optional(),
            alternatives: z.array(z.string()).optional()
        }
    },
    async ({ restaurant, date, partySize }) => {
        const available = Math.random() > 0.5; // Simulate availability check

        if (!available) {
            // Ask user for alternatives
            const result = await server.server.elicitInput({
                message: `No tables available at ${restaurant} on ${date}. Check alternative dates?`,
                requestedSchema: {
                    type: 'object',
                    properties: {
                        checkAlternatives: {
                            type: 'boolean',
                            title: 'Check alternative dates',
                            description: 'Would you like to check other dates?'
                        },
                        flexibility: {
                            type: 'string',
                            title: 'Date flexibility',
                            enum: ['next_day', 'same_week', 'next_week'],
                            enumNames: ['Next day only', 'Same week', 'Next week']
                        }
                    },
                    required: ['checkAlternatives']
                }
            });

            if (result.action === 'accept' && result.content?.checkAlternatives) {
                const alternatives = ['2024-12-20', '2024-12-21', '2024-12-22'];
                const output = { success: false, alternatives };
                return {
                    content: [{ type: 'text', text: JSON.stringify(output) }],
                    structuredContent: output
                };
            }

            const output = { success: false };
            return {
                content: [{ type: 'text', text: JSON.stringify(output) }],
                structuredContent: output
            };
        }

        const booking = {
            restaurant,
            date,
            confirmationCode: 'ABC-' + Math.random().toString(36).substring(7).toUpperCase()
        };
        const output = { success: true, booking };

        return {
            content: [{ type: 'text', text: JSON.stringify(output) }],
            structuredContent: output
        };
    }
);
```

--------------------------------

### Implement Low-Level Server API with Tool Handling in TypeScript

Source: https://context7.com/modelcontextprotocol/typescript-sdk/llms.txt

This TypeScript code demonstrates how to create a low-level server using the Model Context Protocol SDK. It manually sets up request handlers for listing and calling tools, specifically a 'multiply' tool, defining its input schema and logic. The server then connects via a StdioServerTransport, enabling communication over standard I/O.

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    ListToolsRequestSchema,
    CallToolRequestSchema,
    CallToolResult
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
    { name: 'low-level-server', version: '1.0.0' },
    { capabilities: { tools: { listChanged: true } } }
);

// Manually handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [{
            name: 'multiply',
            description: 'Multiply two numbers',
            inputSchema: {
                type: 'object',
                properties: {
                    a: { type: 'number' },
                    b: { type: 'number' }
                },
                required: ['a', 'b']
            }
        }]
    };
});

// Manually handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request): Promise<CallToolResult> => {
    if (request.params.name === 'multiply') {
        const { a, b } = request.params.arguments as { a: number; b: number };
        const result = a * b;
        return {
            content: [{
                type: 'text',
                text: `Result: ${result}`
            }]
        };
    }
    throw new Error('Unknown tool');
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

--------------------------------

### Development Workflow Commands for TypeScript SDK

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/CONTRIBUTING.md

Commands used during the development process to ensure code quality and functionality. This includes running linting checks for code style compliance and executing tests to verify that all changes work as expected and do not introduce regressions.

```Shell
npm run lint
```

```Shell
npm test
```

--------------------------------

### Registering a tool with server-side input elicitation in TypeScript

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md

This TypeScript code demonstrates how an MCP server registers a tool that can elicit user input. It defines input/output schemas for a 'Book Restaurant' tool. If a booking is unavailable, it uses `server.elicitInput` to prompt the user for alternative date preferences, returning a structured response based on user interaction.

```typescript
// Server-side: Restaurant booking tool that asks for alternatives
server.registerTool(
    'book-restaurant',
    {
        title: 'Book Restaurant',
        description: 'Book a table at a restaurant',
        inputSchema: {
            restaurant: z.string(),
            date: z.string(),
            partySize: z.number()
        },
        outputSchema: {
            success: z.boolean(),
            booking: z
                .object({
                    restaurant: z.string(),
                    date: z.string(),
                    partySize: z.number()
                })
                .optional(),
            alternatives: z.array(z.string()).optional()
        }
    },
    async ({ restaurant, date, partySize }) => {
        // Check availability
        const available = await checkAvailability(restaurant, date, partySize);

        if (!available) {
            // Ask user if they want to try alternative dates
            const result = await server.server.elicitInput({
                message: `No tables available at ${restaurant} on ${date}. Would you like to check alternative dates?`,
                requestedSchema: {
                    type: 'object',
                    properties: {
                        checkAlternatives: {
                            type: 'boolean',
                            title: 'Check alternative dates',
                            description: 'Would you like me to check other dates?'
                        },
                        flexibleDates: {
                            type: 'string',
                            title: 'Date flexibility',
                            description: 'How flexible are your dates?',
                            enum: ['next_day', 'same_week', 'next_week'],
                            enumNames: ['Next day', 'Same week', 'Next week']
                        }
                    },
                    required: ['checkAlternatives']
                }
            });

            if (result.action === 'accept' && result.content?.checkAlternatives) {
                const alternatives = await findAlternatives(restaurant, date, partySize, result.content.flexibleDates as string);
                const output = { success: false, alternatives };
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(output)
                        }
                    ],
                    structuredContent: output
                };
            }

            const output = { success: false };
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(output)
                    }
                ],
                structuredContent: output
            };
        }

        // Book the table
        await makeBooking(restaurant, date, partySize);
        const output = {
            success: true,
            booking: { restaurant, date, partySize }
        };
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(output)
                }
            ],
            structuredContent: output
        };
    }
);
```

--------------------------------

### Integrate SQLite Database with MCP Server for Schema and Query Tools (TypeScript)

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md

This TypeScript code provides a more complex example of integrating an SQLite database with an MCP server. It defines a `schema` resource to expose the database's table definitions and a `query` tool to execute arbitrary SQL queries. The implementation uses `sqlite3` and `promisify` for asynchronous database operations, allowing the server to interact with and expose database functionality.

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import { z } from 'zod';

const server = new McpServer({
    name: 'sqlite-explorer',
    version: '1.0.0'
});

// Helper to create DB connection
const getDb = () => {
    const db = new sqlite3.Database('database.db');
    return {
        all: promisify<string, any[]>(db.all.bind(db)),
        close: promisify(db.close.bind(db))
    };
};

server.registerResource(
    'schema',
    'schema://main',
    {
        title: 'Database Schema',
        description: 'SQLite database schema',
        mimeType: 'text/plain'
    },
    async uri => {
        const db = getDb();
        try {
            const tables = await db.all("SELECT sql FROM sqlite_master WHERE type='table'");
            return {
                contents: [
                    {
                        uri: uri.href,
                        text: tables.map((t: { sql: string }) => t.sql).join('\n')
                    }
                ]
            };
        } finally {
            await db.close();
        }
    }
);

server.registerTool(
    'query',
    {
        title: 'SQL Query',
        description: 'Execute SQL queries on the database',
        inputSchema: { sql: z.string() },
        outputSchema: {
            rows: z.array(z.record(z.any())),
            rowCount: z.number()
        }
    },
    async ({ sql }) => {
        const db = getDb();
        try {
            const results = await db.all(sql);
            const output = { rows: results, rowCount: results.length };
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(output, null, 2)
                    }
                ],
                structuredContent: output
            };
        } catch (err: unknown) {
            const error = err as Error;
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error: ${error.message}`
                    }
                ],
                isError: true
            };
        } finally {
            await db.close();
        }
    }
);
```

--------------------------------

### Initialize and Interact with MCP Client (TypeScript)

Source: https://context7.com/modelcontextprotocol/typescript-sdk/llms.txt

This TypeScript example demonstrates how to initialize an MCP client, connect using a streamable HTTP transport, list and call tools, manage resources (list/read), interact with prompts (list/get), and request argument completions. It showcases a full client lifecycle, from connection to closing, and requires the `@modelcontextprotocol/sdk` package.

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const client = new Client({
    name: 'my-client',
    version: '1.0.0'
});

// Connect to server
const transport = new StreamableHTTPClientTransport(
    new URL('http://localhost:3000/mcp')
);
await client.connect(transport);

// List available tools
const toolsList = await client.listTools();
console.log('Available tools:', toolsList.tools.map(t => t.name));

// Call a tool
const result = await client.callTool({
    name: 'add',
    arguments: { a: 5, b: 3 }
});
console.log('Tool result:', result.content[0].text);
console.log('Structured output:', result.structuredContent);

// List and read resources
const resources = await client.listResources();
console.log('Available resources:', resources.resources.map(r => r.uri));

const resourceData = await client.readResource({
    uri: 'app://configuration'
});
console.log('Resource content:', resourceData.contents[0].text);

// Get prompts
const prompts = await client.listPrompts();
const prompt = await client.getPrompt({
    name: 'review-code',
    arguments: { code: 'function add(a, b) { return a + b; }' }
});
console.log('Prompt message:', prompt.messages[0].content.text);

// Request argument completion
const completions = await client.complete({
    ref: { type: 'ref/prompt', name: 'team-greeting' },
    argument: { name: 'department', value: 'eng' },
    context: { arguments: {} }
});
console.log('Suggestions:', completions.completion.values);

await client.close();
```

--------------------------------

### Create an Echo Server with MCP Tools, Resources, and Prompts (TypeScript)

Source: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md

This TypeScript example illustrates how to build a simple 'echo' server using the MCP SDK. It registers an 'echo' tool, resource, and prompt, each demonstrating basic interaction patterns. The tool echoes back messages, the resource provides content based on a URI, and the prompt structures a user message, showcasing the core functionalities of the MCP framework for defining server capabilities.

```typescript
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const server = new McpServer({
    name: 'echo-server',
    version: '1.0.0'
});

server.registerTool(
    'echo',
    {
        title: 'Echo Tool',
        description: 'Echoes back the provided message',
        inputSchema: { message: z.string() },
        outputSchema: { echo: z.string() }
    },
    async ({ message }) => {
        const output = { echo: `Tool echo: ${message}` };
        return {
            content: [{ type: 'text', text: JSON.stringify(output) }],
            structuredContent: output
        };
    }
);

server.registerResource(
    'echo',
    new ResourceTemplate('echo://{message}', { list: undefined }),
    {
        title: 'Echo Resource',
        description: 'Echoes back messages as resources'
    },
    async (uri, { message }) => ({
        contents: [
            {
                uri: uri.href,
                text: `Resource echo: ${message}`
            }
        ]
    })
);

server.registerPrompt(
    'echo',
    {
        title: 'Echo Prompt',
        description: 'Creates a prompt to process a message',
        argsSchema: { message: z.string() }
    },
    ({ message }) => ({
        messages: [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: `Please process this message: ${message}`
                }
            }
        ]
    })
);
```