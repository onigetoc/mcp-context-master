import { readdir } from 'fs/promises';
import * as path from 'path';
import { debugLog } from '../utils/logger.js';

export class KnowledgeParser {
  private knowledgeDir: string;

  constructor(knowledgeDir?: string) {
    this.knowledgeDir = knowledgeDir || path.join(process.cwd(), '.context-master', 'knowledge');
  }

  /**
   * Get all knowledge files from the directory
   */
  async getKnowledgeFiles(): Promise<string[]> {
    debugLog('===== GETTING KNOWLEDGE FILES =====');
    debugLog(`Knowledge directory: ${this.knowledgeDir}`);
    
    try {
      const entries = await readdir(this.knowledgeDir);
      return entries
        .filter(file => file.endsWith('.md') && file !== 'knowledge-manifest.yaml')
        .sort();
    } catch (error) {
      debugLog(`Failed to read knowledge directory: ${error instanceof Error ? error.message : String(error)}`);
      return [];
    }
  }

  /**
   * Check if a file is a valid knowledge file
   */
  isValidKnowledgeFile(filename: string): boolean {
    return filename.endsWith('.md') && filename !== 'knowledge-manifest.yaml';
  }
}