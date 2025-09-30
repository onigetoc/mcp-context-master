import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import { SearchService } from '../services/search.service.js';
import { debugLog } from '../utils/logger.js';

export const searchAdvisorTool = {
  name: "search_library_advisor",
  description: "Search for libraries and get guidance on the correct workflow for adding context. Use this when you're unsure about exact library names or when users mention features/topics. This tool will find the correct repository and suggest the proper Context7 workflow with appropriate topics. Example: search for 'Remotion' to find 'remotion-dev/remotion', then suggest using Context7 with topic 'captions' or 'srt'.",
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query for the library (e.g., "Remotion", "React Query", "Framer Motion")'
      },
      topic: {
        type: 'string',
        description: 'Optional topic to focus on (e.g., "captions", "routing", "animations")',
        default: ''
      }
    },
    required: ['query']
  }
} as const;

export async function handleSearchAdvisorTool(request: any): Promise<McpToolResponse> {
  const args = request.params?.arguments || {};
  const { query, topic = '' } = args;

  if (!query) {
    throw new McpError(ErrorCode.InvalidParams, 'query is required');
  }

  try {
    debugLog(`Searching for library: ${query}`);

    const searcher = new SearchService();
    const searchResults = await searcher.searchDependencies([query], false);

    if (searchResults.length === 0) {
      return {
        content: [{
          type: 'text',
          text: `❌ No repository found for "${query}".

**Suggestions:**
1. Try a different search term (e.g., "React Query" instead of "@tanstack/react-query")
2. Check if the library exists on GitHub
3. Verify the spelling of the library name

**Next Steps:**
- Use more general terms (e.g., "Remotion" instead of "Remotion captions")
- Search for the main library name, then use topics for specific features`
        }]
      };
    }

    const result = searchResults[0];
    const repoName = result.url.split('/').slice(-2).join('/'); // Extract username/repo

    let guidance = `✅ **Found Library: ${query}**

**Repository:** ${repoName}
**GitHub URL:** ${result.url}
**Context7 URL:** ${result.context7Url}

**Recommended Workflow:**
1. Use Context7 MCP tools for best results:
   - \`resolve_library_id\` with "${query}"
   - \`get_library_docs\` with the resolved ID`;

    if (topic) {
      guidance += `
   - Add topic: "${topic}" for focused documentation`;
    }

    guidance += `

**Alternative (Internal Tool):**
- Use \`add_project_context\` with exact name: "${result.originalPackageName}"

**Context7 Direct URL:**
\`https://context7.com/${repoName}/llms.txt\``;

    if (topic) {
      guidance += `?topic=${encodeURIComponent(topic)}&tokens=3000`;
    }

    return {
      content: [{
        type: 'text',
        text: guidance
      }]
    };

  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Search failed for ${query}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}