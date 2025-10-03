import * as path from 'path';
import fs from 'fs-extra';
import { debugLog } from '../utils/logger.js';

/**
 * Service for resolving and validating project paths in a cross-platform way.
 * Handles path normalization for Windows, Linux, and macOS.
 */
export class PathResolverService {
  
  /**
   * Resolves and validates a project path with intelligent fallback to process.cwd()
   * 
   * @param projectPathHint - Optional path hint from LLM or user input
   * @param writeDebugLog - Whether to write debug info to .context-master/debug-path.txt
   * @param additionalInfo - Optional additional context to include in debug log
   * @returns Normalized, absolute, validated project path
   * @throws Error if no valid path can be determined
   */
  public async resolveProjectPath(
    projectPathHint?: string,
    writeDebugLog: boolean = false,
    additionalInfo?: Record<string, any>
  ): Promise<string> {
    
    const cwd = process.cwd();
    let resolvedPath: string;
    let pathSource: 'hint' | 'cwd' | 'fallback';

    // Strategy 1: Use provided path hint if valid
    if (projectPathHint) {
      const normalizedHint = path.normalize(projectPathHint);
      const resolvedHint = path.resolve(normalizedHint);
      
      if (await fs.pathExists(resolvedHint)) {
        resolvedPath = resolvedHint;
        pathSource = 'hint';
        debugLog(`✓ Using provided project path: ${resolvedPath}`);
      } else {
        debugLog(`✗ Provided path does not exist: ${resolvedHint}`);
        // Fall through to next strategy
        resolvedPath = cwd;
        pathSource = 'fallback';
      }
    } else {
      // Strategy 2: Use process.cwd() as fallback
      resolvedPath = cwd;
      pathSource = 'cwd';
      debugLog(`✓ Using process.cwd() as project path: ${resolvedPath}`);
    }

    // Validate the resolved path exists
    if (!await fs.pathExists(resolvedPath)) {
      throw new Error(
        `Cannot resolve project path. Tried: ${projectPathHint || 'none'}, cwd: ${cwd}`
      );
    }

    // Normalize to OS-specific format (Windows backslashes, Unix forward slashes)
    const normalizedPath = path.normalize(resolvedPath);

    // Optional: Write debug information
    if (writeDebugLog) {
      await this.writeDebugInfo({
        cwd,
        projectPathHint,
        resolvedPath: normalizedPath,
        pathSource,
        additionalInfo
      });
    }

    return normalizedPath;
  }

  /**
   * Writes debug information to .context-master/debug-path.txt
   * This is temporary and will be removed after validation
   */
  private async writeDebugInfo(info: {
    cwd: string;
    projectPathHint?: string;
    resolvedPath: string;
    pathSource: 'hint' | 'cwd' | 'fallback';
    additionalInfo?: Record<string, any>;
  }): Promise<void> {
    try {
      const debugLogPath = path.join(info.resolvedPath, '.context-master', 'debug-path.txt');
      await fs.ensureDir(path.dirname(debugLogPath));

      const debugContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 DEBUG Path Resolution - ${new Date().toISOString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 process.cwd()              : ${info.cwd}
📂 projectPath (hint from LLM): ${info.projectPathHint || '❌ NOT PROVIDED'}
📂 resolvedPath (final)       : ${info.resolvedPath}
📂 Path source                : ${info.pathSource}

🔄 Comparisons:
   cwd === hint?              : ${info.cwd === info.projectPathHint ? '✅ YES' : '❌ NO'}
   cwd === resolved?          : ${info.cwd === info.resolvedPath ? '✅ YES' : '❌ NO'}
   hint === resolved?         : ${info.projectPathHint === info.resolvedPath ? '✅ YES' : '❌ NO'}

🖥️  Platform Info:
   OS Platform                : ${process.platform}
   Path separator             : ${path.sep}
   Node.js version            : ${process.version}

${info.additionalInfo ? `📦 Additional Info:\n${JSON.stringify(info.additionalInfo, null, 2)}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

      await fs.appendFile(debugLogPath, debugContent);
      debugLog(`✓ Debug path info written to: ${debugLogPath}`);
    } catch (err) {
      debugLog(`✗ Failed to write debug path info: ${err}`);
    }
  }

  /**
   * Normalizes a path to the OS-specific format
   * - Windows: C:\Users\... (backslashes)
   * - Linux/Mac: /home/... (forward slashes)
   */
  public normalizePath(inputPath: string): string {
    return path.normalize(inputPath);
  }

  /**
   * Checks if a path exists and is a directory
   */
  public async isValidDirectory(dirPath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(dirPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  }

  /**
   * Finds project root by looking for marker files (package.json, .git, etc.)
   * This is a fallback strategy if direct path resolution fails
   */
  public async findProjectRoot(startDir?: string): Promise<string | null> {
    const markers = [
      'package.json',
      'requirements.txt',
      'pyproject.toml',
      'Cargo.toml',
      'go.mod',
      'composer.json',
      'pom.xml',
      '.git'
    ];

    let dir = startDir || process.cwd();
    const root = path.parse(dir).root;

    while (dir !== root) {
      for (const marker of markers) {
        if (await fs.pathExists(path.join(dir, marker))) {
          debugLog(`✓ Found project root by marker (${marker}): ${dir}`);
          return dir;
        }
      }
      dir = path.dirname(dir);
    }

    debugLog('✗ Could not find project root by markers');
    return null;
  }
}
