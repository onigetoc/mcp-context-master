import { readFile } from 'fs/promises';
import * as path from 'path';
import { debugLog } from '../utils/logger.js';

export interface PackageInfo {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  allDependencies: string[];
}

export class PackageParser {
  /**
   * Reads and parses package.json from a directory
   */
  async parsePackageJson(directory: string): Promise<PackageInfo | null> {
    debugLog('===== PARSING PACKAGE.JSON =====');
    debugLog(`Directory: ${directory}`);
    
    const packagePath = path.join(directory, 'package.json');
    
    try {
      const content = await readFile(packagePath, 'utf8');
      const packageData = JSON.parse(content);
      
      const dependencies = packageData.dependencies || {};
      const devDependencies = packageData.devDependencies || {};
      
      // Combine all dependencies for searching
      const allDependencies = [
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies)
      ].filter(dep => !this.shouldSkipDependency(dep));
      
      const packageInfo: PackageInfo = {
        name: packageData.name || 'unknown',
        version: packageData.version || '0.0.0',
        dependencies,
        devDependencies,
        allDependencies
      };
      
      debugLog(`✓ Found ${allDependencies.length} dependencies to search for`);
      debugLog(`Dependencies: ${allDependencies.join(', ')}`);
      
      return packageInfo;
    } catch (error) {
      debugLog(`Failed to parse package.json: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }

  /**
   * Determines if a dependency should be skipped from Context7 search
   */
  private shouldSkipDependency(dep: string): boolean {
    const skipPatterns = [
      // Type definitions
      /^@types\//,
      // Build tools that rarely have useful docs
      /^(typescript|webpack|babel|eslint|prettier)$/,
      // Very common utilities that don't need context
      /^(lodash|moment|uuid|debug)$/,
      // Test frameworks (usually well documented)
      /^(jest|mocha|chai|sinon)$/
    ];
    
    return skipPatterns.some(pattern => pattern.test(dep));
  }

  /**
   * Converts scoped package names to searchable terms
   */
  static normalizePackageForSearch(packageName: string): string {
    // Handle scoped packages like @modelcontextprotocol/sdk
    if (packageName.startsWith('@')) {
      const parts = packageName.split('/');
      if (parts.length === 2) {
        const [scope, name] = parts;
        // Remove @ and combine with space for better search
        return `${scope.substring(1)} ${name}`;
      }
    }
    
    return packageName;
  }

  /**
   * Extracts dependencies from requirements.txt (Python)
   */
  async parseRequirementsTxt(directory: string): Promise<string[] | null> {
    debugLog('===== PARSING REQUIREMENTS.TXT =====');
    
    const requirementsPath = path.join(directory, 'requirements.txt');
    
    try {
      const content = await readFile(requirementsPath, 'utf8');
      const dependencies = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
        .map(line => line.split(/[>=<]/)[0].trim())
        .filter(dep => !this.shouldSkipPythonDependency(dep));
      
      debugLog(`✓ Found ${dependencies.length} Python dependencies`);
      return dependencies;
    } catch (error) {
      debugLog(`No requirements.txt found or failed to parse: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }

  private shouldSkipPythonDependency(dep: string): boolean {
    const skipPatterns = [
      /^(pip|setuptools|wheel)$/,
      /^pytest/,
      /^(black|flake8|mypy)$/
    ];
    
    return skipPatterns.some(pattern => pattern.test(dep));
  }
}