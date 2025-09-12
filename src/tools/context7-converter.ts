import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';

export const context7ConverterTool = {
  name: "convert_to_context7",
  description: "Convert GitHub URL to Context7 format with optional topic and token parameters",
  inputSchema: {
    type: 'object',
    properties: {
      githubUrl: {
        type: 'string',
        description: 'GitHub repository URL (e.g., https://github.com/vercel/ai)',
        pattern: '^https://github\\.com/[^/]+/[^/]+/?$'
      },
      topic: {
        type: 'string',
        description: 'Optional topic to filter context (e.g., "chatbot", "api", "components")'
      },
      tokens: {
        type: 'number',
        description: 'Optional token limit for context (e.g., 2000, 5000)',
        minimum: 100,
        maximum: 50000
      }
    },
    required: ['githubUrl'],
  },
} as const;

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

function convertToContext7Url(params: Context7Params): string {
  const { owner, repo } = parseGitHubUrl(params.githubUrl);
  let url = `https://context7.com/${owner}/${repo}/llms.txt`;

  const queryParams = new URLSearchParams();
  if (params.topic) queryParams.set('topic', params.topic);
  if (params.tokens) queryParams.set('tokens', params.tokens.toString());

  return queryParams.toString() ? `${url}?${queryParams}` : url;
}

export async function handleContext7ConverterTool(request: any): Promise<McpToolResponse> {
  const { githubUrl, topic, tokens } = request.params.arguments || {};

  if (!githubUrl) {
    throw new McpError(ErrorCode.InvalidRequest, 'Missing GitHub URL');
  }

  try {
    const context7Url = convertToContext7Url({ githubUrl, topic, tokens });
    const { owner, repo } = parseGitHubUrl(githubUrl);

    return {
      content: [{
        type: "text",
        text: [
          `**Context7 URL Generated:**`,
          ``,
          `Original GitHub: ${githubUrl}`,
          `Repository: ${owner}/${repo}`,
          `Context7 URL: ${context7Url}`,
          ``,
          topic ? `Topic Filter: ${topic}` : '',
          tokens ? `Token Limit: ${tokens}` : '',
          ``,
          `You can now use this Context7 URL to download comprehensive project context.`
        ].filter(Boolean).join('\n')
      }]
    };
  } catch (error) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      `URL conversion failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}