import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { searchGithubRepos } from '../apis/github-api.js';
import { McpToolResponse } from '../types/mcp-types.js';

export const searchTool = {
  name: "search_github",
  description: "Search GitHub repositories to find the most relevant projects for development context. Returns detailed information including stars, descriptions, and Context7 URLs. Use specific queries like 'react video editor', 'python machine learning', or 'typescript api framework'. Results are sorted by relevance (like GitHub web search) to show the most appropriate repositories first.",
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Specific search query for GitHub repositories. Be precise: use technology + purpose (e.g. "react video editor remotion", "typescript rest api framework", "python data visualization"). Include relevant keywords like language, framework, or specific library names for better results.',
      },

      per_page: {
        type: 'number',
        description: 'Number of results to return (1-100)',
        default: 5,
        minimum: 1,
        maximum: 100
      }
    },
    required: ['query'],
  },
} as const;

export async function handleSearchTool(request: any): Promise<McpToolResponse> {
  const { query, per_page = 5 } = request.params.arguments || {};
  if (!query) {
    throw new McpError(ErrorCode.InvalidRequest, 'Missing search query');
  }

  const github_token = process.env.GITHUB_TOKEN;
  if (!github_token) {
    throw new McpError(ErrorCode.InvalidRequest, 'GitHub token not found in environment. Please set GITHUB_TOKEN in your MCP server config.');
  }

  try {
    if (typeof query !== 'string') {
      throw new McpError(ErrorCode.InvalidRequest, 'Search query must be a string');
    }

    const results = await searchGithubRepos(query, github_token, per_page);
    
    const formattedResults = results.map(repo => ({
      name: repo.name,
      full_name: repo.full_name || `${repo.name}`,
      title: repo.name,
      description: repo.description || 'No description available',
      html_url: repo.html_url,
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      context7_url: `https://context7.com/${repo.full_name || repo.name}/llms.txt`
    }));

    return {
      content: [{
        type: "text",
        text: [
          `Found ${results.length} repositories for "${query}":`,
          "",
          `**ANALYSIS GUIDE**: Look for repositories with:`,
          `- High star count (indicates popularity and quality)`,
          `- Recent activity and good documentation`,
          `- Clear description matching your needs`,
          `- Active community (high fork count)`,
          "",
          `**REPOSITORIES (sorted by relevance):**`,
          "",
          ...formattedResults.map((repo, index) => [
            `**${index + 1}. ${repo.title}** (${repo.full_name})`,
            `   📝 **Description**: ${repo.description}`,
            `   📊 **Popularity**: ⭐ ${repo.stars} stars | 🍴 ${repo.forks} forks | 💻 ${repo.language}`,
            `   🔗 **GitHub**: ${repo.html_url}`,
            `   📚 **Context7**: ${repo.context7_url}`,
            `   ${index < 3 ? '🏆 **TOP CHOICE** - Highly recommended based on relevance' : ''}`,
            ""
          ].join('\n')),
          `**RECOMMENDATION**: The top 3 repositories are the most relevant matches for your query. `,
          `GitHub's relevance algorithm considers name matching, description, popularity, and activity.`
        ].join('\n')
      }]
    };
  } catch (error) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      `GitHub search failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}