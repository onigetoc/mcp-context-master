========================
CODE SNIPPETS
========================
TITLE: Configure Sampling Handler for LLM Interactions
DESCRIPTION: Sets up a sampling handler for LLM interactions (completions/generations) via the MCP client. This handler interfaces with the LLM and processes requests and results.

SOURCE: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/sdk/java/mcp-client.mdx#_snippet_7

LANGUAGE: java
CODE:
```
// Configure sampling handler
Function<CreateMessageRequest, CreateMessageResult> samplingHandler = request -> {
    // Sampling implementation that interfaces with LLM
    return new CreateMessageResult(response);
};

// Create client with sampling support
var client = McpClient.sync(transport)
    .capabilities(ClientCapabilities.builder()
        .sampling()
        .build())
    .sampling(samplingHandler)
    .build();
```

----------------------------------------

TITLE: Interactive Chat Loop (Kotlin)
DESCRIPTION: Implements the main interactive loop for the client. It prompts the user for input, processes the query using `processQuery`, and displays the response until the user types 'quit'.

SOURCE: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/quickstart/client.mdx#_snippet_40

LANGUAGE: kotlin
CODE:
```
suspend fun chatLoop() {
    println("\nMCP Client Started!")
    println("Type your queries or 'quit' to exit.")

    while (true) {
        print("\nQuery: ")
        val message = readLine() ?: break
        if (message.lowercase() == "quit") break
        val response = processQuery(message)
        println("\n$response")
    }
}
```

----------------------------------------

TITLE: Mermaid Sequence Diagram: Session Initialization and Interaction
DESCRIPTION: Illustrates the Model Context Protocol's session initialization and interaction flow between Host, Client, and Server. It visualizes capability negotiation, client/server requests, and notifications.

SOURCE: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/draft/architecture/index.mdx#_snippet_1

LANGUAGE: mermaid
CODE:
```
sequenceDiagram
    participant Host
    participant Client
    participant Server

    Host->>+Client: Initialize client
    Client->>+Server: Initialize session with capabilities
    Server-->>Client: Respond with supported capabilities

    Note over Host,Server: Active Session with Negotiated Features

    loop Client Requests
        Host->>Client: User- or model-initiated action
        Client->>Server: Request (tools/resources)
        Server-->>Client: Response
        Client-->>Host: Update UI or respond to model
    end

    loop Server Requests
        Server->>Client: Request (sampling)
        Client->>Host: Forward to AI
        Host-->>Client: AI response
        Client-->>Server: Response
    end

    loop Notifications
        Server--)Client: Resource updates
        Client--)Server: Status changes
    end

    Host->>Client: Terminate
    Client->>-Server: End session
    deactivate Server
```

----------------------------------------

TITLE: Model Context Protocol (MCP) Tool Interaction
DESCRIPTION: Defines the JSON-RPC methods for interacting with tools in the Model Context Protocol. Includes listing available tools, invoking a specific tool with arguments, and receiving notifications when the tool list changes.

SOURCE: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2024-11-05/server/tools.mdx#_snippet_1

LANGUAGE: json
CODE:
```
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {
    "cursor": "optional-cursor-value"
  }
}
```

LANGUAGE: json
CODE:
```
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "get_weather",
        "description": "Get current weather information for a location",
        "inputSchema": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "City name or zip code"
            }
          },
          "required": ["location"]
        }
      }
    ],
    "nextCursor": "next-page-cursor"
  }
}
```

LANGUAGE: json
CODE:
```
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "New York"
    }
  }
}
```

LANGUAGE: json
CODE:
```
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Current weather in New York:\nTemperature: 72°F\nConditions: Partly cloudy"
      }
    ],
    "isError": false
  }
}
```

LANGUAGE: json
CODE:
```
{
  "jsonrpc": "2.0",
  "method": "notifications/tools/list_changed"
}
```

----------------------------------------

TITLE: Interactive Chat Loop and Cleanup
DESCRIPTION: Manages the interactive chat session with the user and ensures proper resource cleanup. The chat loop prompts for user input, processes queries, displays responses, and handles exit commands. The cleanup function closes all managed resources.

SOURCE: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/quickstart/client.mdx#_snippet_5

LANGUAGE: python
CODE:
```
async def chat_loop(self):
    """Run an interactive chat loop"""
    print("\nMCP Client Started!")
    print("Type your queries or 'quit' to exit.")

    while True:
        try:
            query = input("\nQuery: ").strip()

            if query.lower() == 'quit':
                break

            response = await self.process_query(query)
            print("\n" + response)

        except Exception as e:
            print(f"\nError: {str(e)}")

async def cleanup(self):
    """Clean up resources"""
    await self.exit_stack.aclose()
```

----------------------------------------

TITLE: Interactive Chat Loop and Cleanup (TypeScript)
DESCRIPTION: Manages the user interaction for the client. It starts the chat, prompts the user for input, calls the query processing logic, displays responses, and handles exiting the application gracefully by cleaning up resources. It uses Node.js's 'readline' module for console input.

SOURCE: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/tutorials/building-a-client-node.mdx#_snippet_7

LANGUAGE: typescript
CODE:
```
  async chatLoop(): Promise<void> {
    console.log("\nMCP Client Started!");
    console.log("Type your queries or 'quit' to exit.");

    // Using Node's readline for console input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askQuestion = () => {
      rl.question("\nQuery: ", async (query: string) => {
        try {
          if (query.toLowerCase() === "quit") {
            await this.cleanup();
            rl.close();
            return;
          }

          const response = await this.processQuery(query);
          console.log("\n" + response);
          askQuestion();
        } catch (error) {
          console.error("\nError:", error);
          askQuestion();
        }
      });
    };

    askQuestion();
  }

  async cleanup(): Promise<void> {
    if (this.transport) {
      await this.transport.close();
    }
  }
```

----------------------------------------

TITLE: Interactive Chat Loop and Cleanup
DESCRIPTION: Provides the functionality for an interactive command-line chat interface. It uses the `readline` module to handle user input and displays responses from the `processQuery` method. The loop continues until the user types 'quit'. The `cleanup` method ensures the MCP client connection is properly closed upon exiting.

SOURCE: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/quickstart/client.mdx#_snippet_17

LANGUAGE: typescript
CODE:
```
async chatLoop() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("\nMCP Client Started!");
    console.log("Type your queries or 'quit' to exit.");

    while (true) {
      const message = await rl.question("\nQuery: ");
      if (message.toLowerCase() === "quit") {
        break;
      }
      const response = await this.processQuery(message);
      console.log("\n" + response);
    }
  } finally {
    rl.close();
  }
}

async cleanup() {
  await this.mcp.close();
}
```

----------------------------------------

TITLE: Query Processing with Anthropic Client
DESCRIPTION: Initializes the Anthropic client for chat interactions, configures it for tool invocation, and processes user queries in a loop, displaying responses from the server.

SOURCE: https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/quickstart/client.mdx#_snippet_50

LANGUAGE: csharp
CODE:
```
using var anthropicClient = new AnthropicClient(new APIAuthentication(builder.Configuration["ANTHROPIC_API_KEY"]))
    .Messages
    .AsBuilder()
    .UseFunctionInvocation()
    .Build();

var options = new ChatOptions
{
    MaxOutputTokens = 1000,
    ModelId = "claude-3-5-sonnet-20241022",
    Tools = [.. tools]
};

Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine("MCP Client Started!");
Console.ResetColor();

PromptForInput();
while(Console.ReadLine() is string query && !"exit".Equals(query, StringComparison.OrdinalIgnoreCase))
{
    if (string.IsNullOrWhiteSpace(query))
    {
        PromptForInput();
        continue;
    }

    await foreach (var message in anthropicClient.GetStreamingResponseAsync(query, options))
    {
        Console.Write(message);
    }
    Console.WriteLine();

    PromptForInput();
}

static void PromptForInput()
{
    Console.WriteLine("Enter a command (or 'exit' to quit):");
    Console.ForegroundColor = ConsoleColor.Cyan;
    Console.Write("> ");
    Console.ResetColor();
}
```