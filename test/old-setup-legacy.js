#!/usr/bin/env node

// Setup script for MCP Context Master
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up MCP Context Master...\n');

async function setup() {
  try {
    // 1. Ensure .context-master/context directory exists
    const contextDir = path.join(__dirname, '.context-master', 'context');
    await fs.ensureDir(contextDir);
    console.log('✅ Created .context-master/context/ directory');

    // 2. Create initial tools registry
    const registryPath = path.join(__dirname, 'tools-registry.json');
    if (!(await fs.pathExists(registryPath))) {
      const defaultRegistry = {
        projectType: "mcp-context-master",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tools: [
          {
            name: "search_github",
            description: "Search GitHub repositories for project context",
            category: "search",
            required: true
          },
          {
            name: "convert_to_context7",
            description: "Convert GitHub URL to Context7 format",
            category: "conversion",
            required: true
          },
          {
            name: "download_context",
            description: "Download Context7 content as .md file",
            category: "download",
            required: true
          },
          {
            name: "manage_tools_registry",
            description: "Manage the tools registry JSON file",
            category: "management",
            required: false
          }
        ]
      };
      
      await fs.writeFile(registryPath, JSON.stringify(defaultRegistry, null, 2));
      console.log('✅ Created tools-registry.json');
    } else {
      console.log('ℹ️  tools-registry.json already exists');
    }

    // 3. Check for GitHub token
    const hasGithubToken = process.env.GITHUB_TOKEN;
    if (hasGithubToken) {
      console.log('✅ GitHub token found in environment');
    } else {
      console.log('⚠️  GitHub token not found in environment');
      console.log('   Set GITHUB_TOKEN for full functionality');
    }

    // 4. Display configuration example
    console.log('\n📋 MCP Client Configuration Example:');
    console.log('Add this to your MCP client config (e.g., Claude Desktop, Cursor, Clinet, etc.):');
    console.log('\n```json');
    console.log(JSON.stringify({
      "mcpServers": {
        "mcp-context-master": {
          "command": "node",
          "args": [path.join(__dirname, "build", "index.js")],
          "env": {
            "GITHUB_TOKEN": "your_github_token_here"
          }
        }
      }
    }, null, 2));
    console.log('```\n');

    // 5. Next steps
    console.log('🎉 Setup completed successfully!\n');
    console.log('📝 Next steps:');
    console.log('1. Get a GitHub token: https://github.com/settings/tokens');
    console.log('2. Add the configuration to your MCP client');
    console.log('3. Start using the tools to gather project context!');
    console.log('\n🔧 Available commands:');
    console.log('- npm run build    # Build the project');
    console.log('- npm run test     # Test the tools');
    console.log('- npm start        # Start MCP server');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setup();