========================
CODE SNIPPETS
========================
TITLE: Next Steps After Installation
DESCRIPTION: Suggests immediate actions after successful installation, including verifying system health, configuring AI providers, and starting to use Task Master commands.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/install-taskmaster.md#_snippet_11

LANGUAGE: shell
CODE:
```
After installation:
1. Run /project:utils:check-health to verify setup
2. Configure AI providers with /project:task-master:models
3. Start using Task Master commands!
```

----------------------------------------

TITLE: Quick Test with Task Master
DESCRIPTION: Performs a quick test by creating a simple 'hello world' API requirement and then parsing it using Task Master to ensure functionality.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/install-taskmaster.md#_snippet_6

LANGUAGE: bash
CODE:
```
# Create a test PRD
echo "Build a simple hello world API" > test-prd.txt

# Try parsing it
task-master parse-prd test-prd.txt -n 3
```

----------------------------------------

TITLE: Add First Task from Scratch
DESCRIPTION: Command for the AI assistant to help users add their first task by providing a description, starting the task management process without a PRD.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/llms-install.md#_snippet_3

LANGUAGE: APIDOC
CODE:
```
> Can you help me add my first task: [describe the task]
```

----------------------------------------

TITLE: Task Master Setup Check
DESCRIPTION: Checks the status of AI provider setup for Task Master. If no AI provider is configured, it prompts the user to set up an API key.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/quick-install-taskmaster.md#_snippet_1

LANGUAGE: bash
CODE:
```
# Quick setup check
task-master models --status || echo "Note: You'll need to set up an AI provider API key"
```

----------------------------------------

TITLE: Troubleshooting Network Issues
DESCRIPTION: Offers a solution for network-related installation problems by specifying an alternative npm registry.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/install-taskmaster.md#_snippet_8

LANGUAGE: bash
CODE:
```
# Use different registry
npm install -g task-master-ai --registry https://registry.npmjs.org/
```

----------------------------------------

TITLE: Install and Verify Task Master
DESCRIPTION: Installs the Task Master CLI globally using npm if it's not already installed, and then verifies the installation by checking the version.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/quick-install-taskmaster.md#_snippet_0

LANGUAGE: bash
CODE:
```
# Check and install in one command
task-master --version 2>/dev/null || npm install -g task-master-ai

# Verify installation
task-master --version
```

----------------------------------------

TITLE: System Requirements Check
DESCRIPTION: Ensures that Node.js and npm are installed and meet the minimum version requirements (Node.js 16+).

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/install-taskmaster.md#_snippet_1

LANGUAGE: bash
CODE:
```
# Verify Node.js is installed
node --version

# Verify npm is installed  
npm --version

# Check Node version (need 16+)
```

----------------------------------------

TITLE: Migration Example: Before and After Mock Setup
DESCRIPTION: Illustrates the reduction in mock setup complexity by comparing the 'before' (multiple `jest.mock` calls) and 'after' (configuration-driven) approaches.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/tests/unit/scripts/modules/commands/README.md#_snippet_3

LANGUAGE: javascript
CODE:
```
// Before: 20+ jest.mock() calls
jest.mock('module1', () => ({ ... }));
jest.mock('module2', () => ({ ... }));
// ... many more

// After: Configuration-driven
const mockConfig = {
  core: {
    requiredFunction1: true,
    requiredFunction2: true
  }
};
const mocks = setupMocks(mockConfig);
```

----------------------------------------

TITLE: Project Setup and Dependency Installation (Windows)
DESCRIPTION: Sets up a new Python project directory, creates and activates a virtual environment using 'uv', and installs necessary packages ('mcp[cli]' and 'httpx'). It also creates the main server file 'weather.py'.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/context/mcp-protocol-repo.txt#_snippet_110

LANGUAGE: powershell
CODE:
```
# Create a new directory for our project
uv init weather
cd weather

# Create virtual environment and activate it
uv venv
.venv\Scripts\activate

# Install dependencies
uv add mcp[cli] httpx

# Create our server file
new-item weather.py
```

----------------------------------------

TITLE: Java Client Setup and Requirements
DESCRIPTION: Details system requirements and setup steps for the Java client, including installing npx and cloning the repository. Mentions Spring AI MCP auto-configuration.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/context/mcp-protocol-repo.txt#_snippet_99

LANGUAGE: bash
CODE:
```
# Install npx
npm install -g npx

# Clone the repository
# git clone <repository_url>
```

----------------------------------------

TITLE: Initialize Task Master Project (Global Install)
DESCRIPTION: Initializes a new Task Master project using the command-line interface after a global installation of the task-master-ai package.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/docs/tutorial.md#_snippet_2

LANGUAGE: bash
CODE:
```
task-master init
```

----------------------------------------

TITLE: Initialize Task Master Project (Local Install)
DESCRIPTION: Initializes a new Task Master project using npx after a local installation of the task-master-ai package within a project.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/docs/tutorial.md#_snippet_3

LANGUAGE: bash
CODE:
```
npx task-master init
```

----------------------------------------

TITLE: Project Setup and Dependency Installation (MacOS/Linux)
DESCRIPTION: Sets up a new Python project directory, creates and activates a virtual environment using 'uv', and installs necessary packages ('mcp[cli]' and 'httpx'). It also creates the main server file 'weather.py'.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/context/mcp-protocol-repo.txt#_snippet_109

LANGUAGE: bash
CODE:
```
# Create a new directory for our project
uv init weather
cd weather

# Create virtual environment and activate it
uv venv
source .venv/bin/activate

# Install dependencies
uv add "mcp[cli]" httpx

# Create our server file
touch weather.py
```

----------------------------------------

TITLE: Task Master Command Reference - Setup & Configuration
DESCRIPTION: API documentation for Task Master commands related to setup and configuration, including installation and AI model setup.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/TM_COMMANDS_GUIDE.md#_snippet_5

LANGUAGE: APIDOC
CODE:
```
TaskMaster Setup & Configuration:

/project:tm/setup/install
  - Description: Provides a full installation guide for Task Master.

/project:tm/setup/quick-install
  - Description: Executes a one-line installation command for Task Master.

/project:tm/init
  - Description: Initializes a new project with Task Master.

/project:tm/init/quick
  - Description: Initializes a project quickly using the -y flag for default confirmations.

/project:tm/models
  - Description: Displays the current AI configuration settings.

/project:tm/models/setup
  - Description: Configures the AI settings for Task Master.
```

----------------------------------------

TITLE: Task Master Quick Start Commands
DESCRIPTION: Provides essential bash commands for installing, initializing, parsing requirements, and starting work with Task Master.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/TM_COMMANDS_GUIDE.md#_snippet_0

LANGUAGE: bash
CODE:
```
# Install Task Master
/project:tm/setup/quick-install

# Initialize project
/project:tm/init/quick

# Parse requirements
/project:tm/parse-prd requirements.md

# Start working
/project:tm/next
```

----------------------------------------

TITLE: VS Code MCP Configuration Example
DESCRIPTION: An example JSON configuration for integrating Task Master with VS Code via the MCP extension. It specifies server commands, working directories, and environment variables for the Task Master MCP server.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/docs/mcp-provider-guide.md#_snippet_18

LANGUAGE: json
CODE:
```
{
  "servers": {
    "task-master-dev": {
      "command": "node",
      "args": ["mcp-server/server.js"],
      "cwd": "/path/to/your/task-master-project",
      "env": {
        "NODE_ENV": "development",
        "ANTHROPIC_API_KEY": "${env:ANTHROPIC_API_KEY}",
        "TASK_MASTER_PROJECT_ROOT": "/path/to/your/project"
      }
    }
  }
}
```

----------------------------------------

TITLE: Implementing a Specific Task
DESCRIPTION: An example prompt to get guidance on understanding and approaching the implementation of a specific task.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/docs/tutorial.md#_snippet_28

LANGUAGE: Prompt
CODE:
```
I'd like to implement task 4. Can you help me understand what needs to be done and how to approach it?
```

----------------------------------------

TITLE: Project Setup and Execution
DESCRIPTION: Commands to clone the project, set environment variables for API keys, build the application using Maven, and run it.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/context/mcp-protocol-repo.txt#_snippet_100

LANGUAGE: bash
CODE:
```
git clone https://github.com/spring-projects/spring-ai-examples.git
cd model-context-protocol/brave-chatbot
export ANTHROPIC_API_KEY='your-anthropic-api-key-here'
export BRAVE_API_KEY='your-brave-api-key-here'
./mvnw clean install
./mvnw spring-boot:run
```

----------------------------------------

TITLE: Verify Task Master Installation
DESCRIPTION: Confirms that Task Master has been successfully installed by checking its version and ensuring the command is accessible.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/install-taskmaster.md#_snippet_3

LANGUAGE: bash
CODE:
```
# Check version
task-master --version

# Verify command is available
which task-master
```

----------------------------------------

TITLE: Starting a New Project with Task Master
DESCRIPTION: An example prompt for initializing a new project, parsing a Product Requirements Document (PRD), and setting up initial tasks using Task Master.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/docs/tutorial.md#_snippet_26

LANGUAGE: Prompt
CODE:
```
I've just initialized a new project with Claude Task Master. I have a PRD at .taskmaster/docs/prd.txt.
Can you help me parse it and set up the initial tasks?
```

----------------------------------------

TITLE: Troubleshooting Node Version Issues
DESCRIPTION: Guides users on how to resolve issues related to Node.js version compatibility by installing and using a specific Node.js version (e.g., 18+) via nvm.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/install-taskmaster.md#_snippet_9

LANGUAGE: bash
CODE:
```
# Install Node 18+ via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

----------------------------------------

TITLE: Check Task Master Installation
DESCRIPTION: Verifies if the 'task-master' command is available in the system's PATH and checks globally installed npm packages for 'task-master-ai'.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/assets/claude/commands/tm/setup/install-taskmaster.md#_snippet_0

LANGUAGE: bash
CODE:
```
# Check if task-master command exists
which task-master || echo "Task Master not found"

# Check npm global packages
npm list -g task-master-ai
```

----------------------------------------

TITLE: Project Setup (Windows)
DESCRIPTION: Commands to create a new project directory, initialize an npm project, install dependencies, and set up the project structure for Windows using PowerShell.

SOURCE: https://github.com/eyaltoledano/claude-task-master/blob/main/context/mcp-protocol-repo.txt#_snippet_124

LANGUAGE: powershell
CODE:
```
# Create a new directory for our project
md weather
cd weather

# Initialize a new npm project
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk zod
npm install -D @types/node typescript

# Create our files
md src
new-item src\index.ts
```