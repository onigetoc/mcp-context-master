#!/usr/bin/env node

// CLI Test script pour MCP Context Master
import { searchGithubRepos } from "../build/apis/github-api.js";
import { handleSearchTool } from "../build/tools/search-tool.js";
import { handleContext7ConverterTool } from "../build/tools/context7-converter.js";
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

function parseArgs() {
  const result = {
    query: "",
    topic: "",
    tokens: 10000,
  };

  // Arguments, excluding the command itself
  const commandArgs = args.slice(1);

  // Find query (first non-flag argument after the command)
  const queryIndex = commandArgs.findIndex((arg) => !arg.startsWith("--"));
  if (queryIndex !== -1) {
    result.query = commandArgs[queryIndex];
  }

  // Parse --topic flag
  const topicIndex = args.findIndex((arg) => arg === "--topic");
  if (topicIndex !== -1 && args[topicIndex + 1]) {
    // Join multiple words after --topic until next flag or end
    const topicWords = [];
    for (let i = topicIndex + 1; i < args.length; i++) {
      if (args[i].startsWith("--")) break;
      topicWords.push(args[i]);
    }
    result.topic = topicWords.join(" ");
  }

  // Parse --token or --tokens flag (both formats supported)
  const tokenIndex = args.findIndex((arg) => arg === "--token" || arg === "--tokens");
  const tokenEqualIndex = args.findIndex((arg) => arg.startsWith("--tokens=") || arg.startsWith("--token="));

  if (tokenIndex !== -1 && args[tokenIndex + 1]) {
    // Format: --token 3000
    result.tokens = parseInt(args[tokenIndex + 1]) || 1000;
  } else if (tokenEqualIndex !== -1) {
    // Format: --token=3000 or --tokens=3000
    const value = args[tokenEqualIndex].split("=")[1];
    result.tokens = parseInt(value) || 1000;
  }

  return result;
}

function displayUsage() {
  console.log(`
🚀 MCP Context Master - CLI Test Tool

Usage:
  bun test/cli-test.js searchTool <query> [--topic <topic>] [--token <number>]

Examples:
  bun test/cli-test.js searchTool "Remotion"
  bun test/cli-test.js searchTool "Remotion" --topic "caption from srt"
  bun test/cli-test.js searchTool "react components" --topic "ui library" --token 3000
  bun test/cli-test.js searchTool "Remotion" --topic "caption from srt" --tokens=2000

Arguments:
  <query>           GitHub search query (required)
  --topic <topic>   Context7 topic filter (optional)
  --token <num>     Token limit for Context7 (default: 1000)
  --tokens=<num>    Alternative format for token limit

Commands:
  searchTool        Search GitHub and show Context7 URLs
  help              Show this help message
`);
}

async function runSearchTool() {
  const { query, topic, tokens } = parseArgs();

  if (!query) {
    console.error("❌ Error: Search query is required");
    displayUsage();
    process.exit(1);
  }

  const github_token = process.env.GITHUB_TOKEN;
  if (!github_token) {
    console.error("❌ Error: GITHUB_TOKEN environment variable is required");
    console.log("💡 Get a token from: https://github.com/settings/tokens");
    process.exit(1);
  }

  try {
    console.log(`🔍 Searching GitHub for: "${query}"`);
    if (topic) console.log(`🎯 Context7 topic filter: "${topic}"`);
    console.log(`🔢 Token limit: ${tokens}`);
    console.log("");

    // Search GitHub repositories
    const results = await searchGithubRepos(query, github_token, 5);

    if (results.length === 0) {
      console.log("❌ No repositories found for your search query.");
      return;
    }

    console.log(`✅ Found ${results.length} repositories:\n`);

    // Display results with Context7 URLs
    results.forEach((repo, index) => {
      const baseContext7Url = `https://context7.com/${repo.full_name}/llms.txt`;

      // Build Context7 URL with parameters
      const params = new URLSearchParams();
      if (topic) params.set("topic", topic);
      if (tokens) params.set("tokens", tokens.toString());

      const context7Url = params.toString()
        ? `${baseContext7Url}?${params.toString()}`
        : baseContext7Url;

      console.log(`${index + 1}. 📦 ${repo.name} (${repo.full_name})`);
      console.log(`   📝 ${repo.description || "No description"}`);
      console.log(
        `   🌟 ${repo.stargazers_count} stars | 🍴 ${repo.forks_count
        } forks | 💻 ${repo.language || "Unknown"}`
      );
      console.log(`   🔗 GitHub: ${repo.html_url}`);
      console.log(`   📚 Context7: ${context7Url}`);
      console.log("");
    });

    console.log("🎉 Search completed successfully!");
    console.log("\n💡 Next steps:");
    console.log("1. Copy any Context7 URL above");
    console.log("2. Use the download_context tool to save the documentation");
    console.log("3. Start your project with comprehensive context!");
  } catch (error) {
    console.error("❌ Search failed:", error.message);
    process.exit(1);
  }
}

// Main execution
async function main() {
  if (!command || command === "help") {
    displayUsage();
    return;
  }

  switch (command) {
    case "searchTool":
      await runSearchTool();
      break;
    default:
      console.error(`❌ Unknown command: ${command}`);
      displayUsage();
      process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Fatal error:", error.message);
  process.exit(1);
});
