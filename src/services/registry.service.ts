import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';

async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export async function updateKnowledgeManifest(projectPath?: string): Promise<void> {
  // If no projectPath provided, try to find it from the current working directory
  // This is a fallback for backward compatibility
  let knowledgeDir: string | null = null;
  
  if (projectPath) {
    knowledgeDir = path.join(projectPath, '.context-master', 'knowledge');
  } else {
    // Fallback: try to find .context-master directory in current working directory or parent directories
    let currentDir = process.cwd();
    
    // Search up to 5 levels up for .context-master directory
    for (let i = 0; i < 5; i++) {
      const testPath = path.join(currentDir, '.context-master', 'knowledge');
      if (await pathExists(testPath)) {
        knowledgeDir = testPath;
        break;
      }
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) break; // Reached root
      currentDir = parentDir;
    }
    
    if (!knowledgeDir) {
      console.log(`[context-master] Warning: Could not find .context-master/knowledge directory. Skipping manifest update.`);
      return;
    }
  }

  const manifestPath = path.join(knowledgeDir, 'knowledge-manifest.yaml');

  if (!await pathExists(knowledgeDir)) {
    console.log(`[context-master] Knowledge directory does not exist: ${knowledgeDir}`);
    return; // No directory, no manifest
  }

  try {
    // TOUJOURS scanner le dossier physique
    const files = await fs.readdir(knowledgeDir);
    const mdFiles = files
      .filter((file: string) => file.endsWith('.md') && file !== 'knowledge-manifest.yaml')
      .sort((a: string, b: string) => a.localeCompare(b));

    console.log(`[context-master] Physical scan found ${mdFiles.length} .md files in ${knowledgeDir}:`, mdFiles);

    const manifest = {
      lastUpdated: new Date().toISOString(),
      files: mdFiles,
    };

    await fs.writeFile(manifestPath, yaml.dump(manifest));
    console.log(`[context-master] Successfully updated manifest with ${mdFiles.length} files at ${manifestPath}`);
  } catch (error) {
    console.error(`[context-master] Error updating knowledge manifest:`, error);
    throw error;
  }
}