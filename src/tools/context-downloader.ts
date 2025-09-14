import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { McpToolResponse } from '../types/mcp-types.js';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';
import yaml from 'js-yaml';
import { ensureDir } from 'fs-extra';

// Tool definitions
export const contextDownloaderTool = {
  name: 'download_context',
  description: 'Download Context7 content and save as .md file in .agents/context/. If readOnly=true returns inline instead of writing. Example: { context7Url, outputFilename, readOnly: true }',
  inputSchema: {
    type: 'object',
    properties: {
      context7Url: { type: 'string', description: 'Context7 URL (https://context7.com/.../llms.txt)', pattern: '^https://context7\\.com/.+/llms\\.txt' },
      outputFilename: { type: 'string', description: 'Output filename without extension', pattern: '^[a-zA-Z0-9_.-]+$' },
      readOnly: { type: 'boolean', description: 'If true, do not write; return content inline.' }
    },
    required: ['context7Url', 'outputFilename']
  }
} as const;

export const contextReaderTool = {
  name: 'read_context',
  description: 'Read Context7 content and return it (no file writing).',
  inputSchema: {
    type: 'object',
    properties: {
      context7Url: { type: 'string', description: 'Context7 URL (https://context7.com/.../llms.txt)', pattern: '^https://context7\\.com/.+/llms\\.txt' }
    },
    required: ['context7Url']
  }
} as const;

export const contextManifestRebuildTool = {
  name: 'rebuild_context_manifest',
  description: 'Rescan .agents/context and rebuild context-manifest.yaml with ALL markdown files (every *.md except the manifest itself). Only rewrites if changes detected.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false }
} as const;

export const contextManifestDiagnoseTool = {
  name: 'diagnose_context_manifest',
  description: 'Return a diff between actual *.md files in .agents/context and the current manifest list to detect omissions.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false }
} as const;

interface DownloadParams { context7Url: string; outputFilename: string; }

async function pathExists(p: string): Promise<boolean> {
  try { await fs.access(p); return true; } catch { return false; }
}

// Scan ALL markdown files (no prefix requirement) - FORCE RESCAN
async function updateContextManifest(): Promise<void> {
  const contextDir = path.join(process.cwd(), '.agents', 'context');
  const manifestPath = path.join(contextDir, 'context-manifest.yaml');
  const debug = true; // Force debug temporairement
  
  if (debug) console.log(`[DEBUG] === FORCE SCANNING CONTEXT DIRECTORY ===`);
  if (debug) console.log(`[DEBUG] Scanning directory: ${contextDir}`);
  
  if (!await pathExists(contextDir)) { 
    if (debug) console.warn('[context-manifest] context dir missing at:', contextDir); 
    return; 
  }
  
  // TOUJOURS scanner le dossier physique - ne pas se fier au manifest existant
  const entries = await fs.readdir(contextDir);
  if (debug) console.log(`[DEBUG] ALL physical files found:`, entries);
  
  const mdFiles = entries
    .filter(f => {
      const isMarkdown = f.endsWith('.md');
      const isNotManifest = f !== 'context-manifest.yaml' && f !== 'context-manifest.yml';
      if (debug) console.log(`[DEBUG] File ${f}: isMarkdown=${isMarkdown}, isNotManifest=${isNotManifest}`);
      return isMarkdown && isNotManifest;
    })
    .sort((a, b) => a.localeCompare(b));
  
  if (debug) console.log(`[DEBUG] Physical .md files found:`, mdFiles);
  if (debug) console.log(`[DEBUG] Total .md files count:`, mdFiles.length);
  
  // TOUJOURS réécrire le manifest avec les fichiers trouvés physiquement
  if (debug) console.log(`[DEBUG] FORCE writing new manifest with all physical files...`);
  const manifest = { 
    lastUpdated: new Date().toISOString(), 
    files: mdFiles // Utilise TOUJOURS les fichiers trouvés physiquement
  };
  if (debug) console.log(`[DEBUG] New manifest object:`, manifest);
  
  await fs.writeFile(manifestPath, yaml.dump(manifest), 'utf8');
  if (debug) console.log('[context-manifest] manifest FORCE updated successfully');
  
  // Verify the write worked
  if (debug) {
    try {
      const verification = await fs.readFile(manifestPath, 'utf8');
      console.log(`[DEBUG] Verification - file written:`, verification);
      const verifyParsed = yaml.load(verification) as any;
      console.log(`[DEBUG] Verification - parsed files:`, verifyParsed?.files);
      console.log(`[DEBUG] Verification - files count:`, verifyParsed?.files?.length);
    } catch (e) {
      console.error(`[DEBUG] Verification failed:`, e);
    }
  }
}

// Download without forcing any prefix; only ensure .md extension
async function downloadContext(params: DownloadParams): Promise<string> {
  const { context7Url, outputFilename } = params;
  const docsDir = path.join(process.cwd(), '.agents', 'context');
  await ensureDir(docsDir);

  const response = await axios.get(context7Url, { timeout: 30000, headers: { 'User-Agent': 'MCP-Context-Master/1.0.0' } });
  if (response.status !== 200) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  if (typeof response.data !== 'string') throw new Error('Invalid response format - expected text content');

  const filename = outputFilename.endsWith('.md') ? outputFilename : `${outputFilename}.md`;
  const filePath = path.join(docsDir, filename);
  const urlObj = new URL(context7Url);
  const repoPath = urlObj.pathname.replace('/llms.txt', '');
  const metadata = [
    '# Context Documentation',
    '',
    `**Source:** ${context7Url}`,
    `**Repository:** https://github.com${repoPath}`,
    `**Downloaded:** ${new Date().toISOString()}`,
    '',
    '---',
    '',
    response.data
  ].join('\n');
  await fs.writeFile(filePath, metadata, 'utf8');
  return filePath;
}

export async function handleContextDownloaderTool(request: any): Promise<McpToolResponse> {
  const { context7Url, outputFilename, readOnly } = request.params.arguments || {};
  if (!context7Url) throw new McpError(ErrorCode.InvalidRequest, 'Missing Context7 URL');
  if (!outputFilename) throw new McpError(ErrorCode.InvalidRequest, 'Missing output filename');

  try {
    if (readOnly) {
      const resp = await axios.get(context7Url, { timeout: 30000, headers: { 'User-Agent': 'MCP-Context-Master/1.0.0' } });
      if (resp.status !== 200 || typeof resp.data !== 'string') throw new Error(`Invalid response: HTTP ${resp.status}`);
      const now = new Date().toISOString();
      return {
        content: [
          { type: 'text', text: JSON.stringify({ result: { status: 'success', text: 'Read-only content', timestamp: now } }) },
          { type: 'text', text: resp.data }
        ]
      };
    }

    const filePath = await downloadContext({ context7Url, outputFilename });
    await updateContextManifest();

    let topic = 'unspecified';
    try { const u = new URL(context7Url); topic = u.searchParams.get('topic') || topic; } catch { /* ignore */ }

    const now = new Date().toISOString();
    return {
      content: [{ type: 'text', text: JSON.stringify({ result: { status: 'success', text: `File ${path.basename(filePath)} stored (topic ${topic})`, timestamp: now } }) }]
    };
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `Download failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function handleContextReaderTool(request: any): Promise<McpToolResponse> {
  const { context7Url } = request.params.arguments || {};
  if (!context7Url) throw new McpError(ErrorCode.InvalidRequest, 'Missing Context7 URL');
  try {
    const resp = await axios.get(context7Url, { timeout: 30000, headers: { 'User-Agent': 'MCP-Context-Master/1.0.0' } });
    if (resp.status !== 200 || typeof resp.data !== 'string') throw new Error(`Invalid response: HTTP ${resp.status}`);
    const urlObj = new URL(context7Url);
    const repoPath = urlObj.pathname.replace('/llms.txt', '');
    return {
      content: [{ type: 'text', text: [
        '**Context7 Content (read-only)**',
        `Source: ${context7Url}`,
        `Repository: https://github.com${repoPath}`,
        `Fetched: ${new Date().toISOString()}`,
        '',
        resp.data
      ].join('\n') }]
    };
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `Read failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function handleRebuildContextManifestTool(): Promise<McpToolResponse> {
  try {
    await updateContextManifest();
    return {
      content: [{ type: 'text', text: JSON.stringify({ result: { status: 'success', text: 'context-manifest.yaml rebuilt if changes detected', timestamp: new Date().toISOString() } }) }]
    };
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `Rebuild failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function handleDiagnoseContextManifestTool(): Promise<McpToolResponse> {
  try {
    const contextDir = path.join(process.cwd(), '.agents', 'context');
    const manifestPath = path.join(contextDir, 'context-manifest.yaml');
    const exists = await pathExists(contextDir);
    if (!exists) return { content: [{ type: 'text', text: JSON.stringify({ result: { status: 'error', text: 'context directory missing' } }) }] };
    const entries = await fs.readdir(contextDir);
    const actual = entries.filter(f => f.endsWith('.md') && f !== 'context-manifest.yaml').sort((a,b)=>a.localeCompare(b));
    let listed: string[] = [];
    if (await pathExists(manifestPath)) {
      try {
        const raw = await fs.readFile(manifestPath, 'utf8');
        const parsed: any = yaml.load(raw);
        if (parsed && Array.isArray(parsed.files)) listed = parsed.files as string[];
      } catch {/* ignore */}
    }
    const missingInManifest = actual.filter(f => !listed.includes(f));
    const staleInManifest = listed.filter(f => !actual.includes(f));
    return {
      content: [{ type: 'text', text: JSON.stringify({ result: { status: 'success', actual, listed, missingInManifest, staleInManifest, suggestion: 'Call rebuild_context_manifest if missingInManifest or staleInManifest not empty.' } }) }]
    };
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `Diagnose failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const contextListFilesTool = {
  name: 'list_context_files',
  description: 'List all files in .agents/context directory with detailed analysis',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false }
} as const;

export async function handleListContextFilesTool(): Promise<McpToolResponse> {
  try {
    const contextDir = path.join(process.cwd(), '.agents', 'context');
    const manifestPath = path.join(contextDir, 'context-manifest.yaml');
    
    if (!await pathExists(contextDir)) {
      return {
        content: [{ type: 'text', text: JSON.stringify({ 
          result: { 
            status: 'error', 
            text: 'Context directory does not exist',
            contextDir 
          } 
        }) }]
      };
    }
    
    const entries = await fs.readdir(contextDir, { withFileTypes: true });
    const allFiles = entries.map(entry => ({
      name: entry.name,
      isFile: entry.isFile(),
      isDirectory: entry.isDirectory(),
      isMarkdown: entry.name.endsWith('.md'),
      isManifest: entry.name === 'context-manifest.yaml'
    }));
    
    const mdFiles = allFiles
      .filter(f => f.isMarkdown && !f.isManifest)
      .map(f => f.name)
      .sort();
    
    let manifestContent = null;
    let manifestFiles: string[] = [];
    if (await pathExists(manifestPath)) {
      try {
        const raw = await fs.readFile(manifestPath, 'utf8');
        manifestContent = yaml.load(raw) as any;
        if (manifestContent && Array.isArray(manifestContent.files)) {
          manifestFiles = manifestContent.files;
        }
      } catch (e) {
        manifestContent = { error: (e as Error).message };
      }
    }
    
    const missingInManifest = mdFiles.filter(f => !manifestFiles.includes(f));
    const extraInManifest = manifestFiles.filter(f => !mdFiles.includes(f));
    
    return {
      content: [{ type: 'text', text: JSON.stringify({ 
        result: { 
          status: 'success',
          contextDir,
          allFiles,
          mdFilesFound: mdFiles,
          manifestExists: await pathExists(manifestPath),
          manifestContent,
          manifestFiles,
          missingInManifest,
          extraInManifest,
          analysis: {
            totalFiles: allFiles.length,
            markdownFiles: mdFiles.length,
            manifestFilesCount: manifestFiles.length,
            needsUpdate: missingInManifest.length > 0 || extraInManifest.length > 0
          }
        } 
      }, null, 2) }]
    };
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `List failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}