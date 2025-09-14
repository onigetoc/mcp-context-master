import { readdir } from 'fs/promises';
import * as path from 'path';
import { debugLog } from '../utils/logger.js';

export class ContextParser {
  private contextDir: string;

  constructor(contextDir?: string) {
    this.contextDir = contextDir || path.join(process.cwd(), '.agents', 'context');
  }

  /**
   * Get all context files from the directory
   */
  async getContextFiles(): Promise<string[]> {
    debugLog('===== GETTING CONTEXT FILES =====');
    debugLog(`Context directory: ${this.contextDir}`);
    
    try {
      const entries = await readdir(this.contextDir);
      return entries
        .filter(file => file.endsWith('.md') && file !== 'context-manifest.yaml')
        .sort();
    } catch (error) {
      debugLog(`Failed to read context directory: ${error instanceof Error ? error.message : String(error)}`);
      return [];
    }
  }

  /**
   * Check if a file is a valid context file
   */
  isValidContextFile(filename: string): boolean {
    return filename.endsWith('.md') && filename !== 'context-manifest.yaml';
  }
}