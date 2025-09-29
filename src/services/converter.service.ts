import { URLSearchParams } from 'url';

interface Context7Params {
  githubUrl: string;
  topic?: string;
  tokens?: number;
}

function parseGitHubUrl(url: string): { owner: string; repo: string } {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') {
      throw new Error('URL must be from github.com');
    }

    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) {
      throw new Error('Invalid GitHub URL format');
    }

    return {
      owner: pathParts[0],
      repo: pathParts[1]
    };
  } catch (error) {
    throw new Error(`Invalid GitHub URL: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function convertToContext7Url(params: Context7Params): string {
  const { owner, repo } = parseGitHubUrl(params.githubUrl);
  let url = `https://context7.com/${owner}/${repo}/llms.txt`;

  const queryParams = new URLSearchParams();
  if (params.topic) queryParams.set('topic', params.topic);
  if (params.tokens) queryParams.set('tokens', params.tokens.toString());

  return queryParams.toString() ? `${url}?${queryParams}` : url;
}
