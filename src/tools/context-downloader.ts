import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';
import yaml from 'js-yaml';
import { ensureDir } from 'fs-extra';

export const contextDownloaderTool = {
  name: "download_context",
  description: "Download Context7 content and save as .md file in .agents/context/ folder",
  inputSchema: {
    type: 'object',
    properties: {
      context7Url: {
        type: 'string',
        description: 'Context7 URL to download (e.g., https://context7.com/vercel/ai/llms.txt)',
        pattern: '^https://context7\.com/.+/llms\.txt'
      },
      outputFilename: {
        type: 'string',
        description: 'Output filename without extension (e.g., "vercel-ai-context")',
        pattern: '^[a-zA-Z0-9_-]+$'
      }
    },
    required: ['context7Url', 'outputFilename'],
  },
} as const;

interface DownloadParams {
  context7Url: string;
  outputFilename: string;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function updateContextManifest(): Promise<void> {
  const contextDir = path.join(process.cwd(), '.agents', 'context');
  const manifestPath = path.join(contextDir, 'context-manifest.yaml');

  if (!await pathExists(contextDir)) {
    return; // No directory, no manifest
  }

  const files = await fs.readdir(contextDir);
  const cmFiles = files.filter(file => file.startsWith('cm-') && file.endsWith('.md'));

  const manifest = {
    lastUpdated: new Date().toISOString(),
    files: cmFiles,
  };

  await fs.writeFile(manifestPath, yaml.dump(manifest));
}

async function downloadContext(params: DownloadParams): Promise<string> {
  const { context7Url, outputFilename } = params;
  
  try {
    // Ensure .agents/context directory exists
    const docsDir = path.join(process.cwd(), '.agents', 'context');
    await ensureDir(docsDir);
    
    // Download content from Context7
    const response = await axios.get(context7Url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'MCP-Context-Master/1.0.0'
      }
    });
    
    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const content = response.data;
    if (typeof content !== 'string') {
      throw new Error('Invalid response format - expected text content');
    }
    
    // Create filename with .md extension
    const filename = `cm-${outputFilename}.md`;
    const filePath = path.join(docsDir, filename);
    
    // Add metadata header to the content
    const urlObj = new URL(context7Url);
    const repoPath = urlObj.pathname.replace('/llms.txt', '');
    const metadata = [
      `# Context Documentation`,
      ``,
      `**Source:** ${context7Url}`,
      `**Repository:** https://github.com${repoPath}`,
      `**Downloaded:** ${new Date().toISOString()}`,
      ``,
      `---`,
      ``,
      content
    ].join('\n');
    
    // Save the file
    await fs.writeFile(filePath, metadata, 'utf8');
    
    return filePath;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw new Error('Network error: Unable to connect to Context7. Please check your internet connection.');
      }
      if (error.response?.status === 404) {
        throw new Error('Context7 URL not found. The repository may not be available on Context7 or the URL is incorrect.');
      }
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait before making another request.');
      }
      throw new Error(`HTTP error: ${error.response?.status || 'Unknown'} - ${error.message}`);
    }
    throw error;
  }
}

export async function handleContextDownloaderTool(request: any): Promise<McpToolResponse> {
  const { context7Url, outputFilename } = request.params.arguments || {};
  
  if (!context7Url) {
    throw new McpError(ErrorCode.InvalidRequest, 'Missing Context7 URL');
  }
  
  if (!outputFilename) {
    throw new McpError(ErrorCode.InvalidRequest, 'Missing output filename');
  }

  try {
    const filePath = await downloadContext({ context7Url, outputFilename });
    await updateContextManifest(); // Update the manifest after a successful download
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Get file stats for additional info
    const stats = await fs.stat(filePath);
    const fileSizeKB = Math.round(stats.size / 1024);
    
    return {
      content: [{
        type: "text",
        text: [
          `**Context Downloaded Successfully!**`,
          ``,
          `Source URL: ${context7Url}`,
          `Saved to: ${relativePath}`,
          `File size: ${fileSizeKB} KB`,
          ``,
          `The context documentation is now available in your .agents/context/ folder and ready for use in your project development.`
        ].join('\n')
      }]
    };
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Download failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}