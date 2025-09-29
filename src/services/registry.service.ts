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

export async function updateContextManifest(): Promise<void> {
  const contextDir = path.join(process.cwd(), '.context-master', 'context');
  const manifestPath = path.join(contextDir, 'context-manifest.yaml');

  if (!await pathExists(contextDir)) {
    return; // No directory, no manifest
  }

  // TOUJOURS scanner le dossier physique
  const files = await fs.readdir(contextDir);
  const mdFiles = files
    .filter((file: string) => file.endsWith('.md') && file !== 'context-manifest.yaml')
    .sort((a: string, b: string) => a.localeCompare(b));

  console.log(`[project-master] Physical scan found ${mdFiles.length} .md files:`, mdFiles);

  const manifest = {
    lastUpdated: new Date().toISOString(),
    files: mdFiles,
  };

  await fs.writeFile(manifestPath, yaml.dump(manifest));
  console.log(`[project-master] FORCE updated manifest with ${mdFiles.length} files`);
}