import { PackageParser } from '../parsers/package-parser.js';
import { ReadmeParser } from '../parsers/readme-parser.js';
import { debugLog } from '../utils/logger.js';
import * as path from 'path';

export interface ProjectInfo {
  name: string;
  type: 'node' | 'python' | 'unknown';
  dependencies: string[];
}

export class ProjectAnalyzer {
  private packageParser: PackageParser;
  private readmeParser: ReadmeParser;

  constructor() {
    this.packageParser = new PackageParser();
    this.readmeParser = new ReadmeParser();
  }

  public async analyze(projectPath: string): Promise<ProjectInfo | null> {
    debugLog('===== ANALYZING PROJECT =====');
    
    try {
      // Check for package.json (Node.js)
      const packageInfo = await this.packageParser.parsePackageJson(projectPath);
      if (packageInfo) {
        return {
          name: packageInfo.name,
          type: 'node',
          dependencies: packageInfo.allDependencies
        };
      }

      // Check for requirements.txt (Python)
      const pythonDeps = await this.packageParser.parseRequirementsTxt(projectPath);
      if (pythonDeps && pythonDeps.length > 0) {
        return {
          name: path.basename(projectPath),
          type: 'python',
          dependencies: pythonDeps
        };
      }

      // Fallback: try to extract from README
      const readmeContent = await this.readmeParser.readLocalReadme(projectPath);
      if (readmeContent) {
        const mcpInfo = this.readmeParser.extractPythonMcpJsonAndInstall(readmeContent);
        if (mcpInfo?.pipInstall) {
          const packageName = mcpInfo.pipInstall.replace('pip install ', '').trim();
          return {
            name: packageName,
            type: 'python',
            dependencies: [packageName]
          };
        }
      }

      debugLog('Could not determine project type');
      return null;

    } catch (error) {
      debugLog(`Error analyzing project: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }
}
