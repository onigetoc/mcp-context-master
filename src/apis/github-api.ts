import { Octokit } from '@octokit/rest';

interface SearchResult {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

// Enhanced query builder for better GitHub search results
function enhanceSearchQuery(query: string): string {
  // If query doesn't already contain search qualifiers, enhance it
  if (!query.includes(':')) {
    // Replace spaces with + to match GitHub web search behavior
    return query.replace(/\s+/g, '+');
  }

  // Return query as-is if it already has qualifiers
  return query;
}

export async function searchGithubRepos(
  query: string,
  token?: string,
  per_page: number = 5
): Promise<SearchResult[]> {
  if (!token) {
    throw new Error('GitHub token is required. Please set GITHUB_TOKEN in your MCP server configuration.');
  }

  const octokit = new Octokit({ auth: token });

  try {
    // Enhance the query for better results
    const enhancedQuery = enhanceSearchQuery(query);

    console.log(`🔍 Searching GitHub with enhanced query: "${enhancedQuery}"`);

    const { data } = await octokit.rest.search.repos({
      q: enhancedQuery,
      per_page: Math.min(per_page, 100) // GitHub API limit
      // No sort parameter = GitHub's default relevance sorting
    });

    return data.items.map((repo: GithubRepo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count
    }));
  } catch (error: any) {
    if (error.status === 401) {
      throw new Error('GitHub authentication failed. Your token may be invalid or expired. Please update your GITHUB_TOKEN in the MCP server configuration.');
    }
    if (error.status === 403) {
      throw new Error('GitHub API rate limit exceeded or token permissions issue. Please check your token has the necessary permissions.');
    }
    console.error('GitHub search error:', error);
    throw new Error(`GitHub search failed: ${error.message || 'Unknown error'}`);
  }
}