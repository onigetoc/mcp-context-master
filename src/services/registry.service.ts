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

export async function updateKnowledgeManifest(): Promise<void> {
  const knowledgeDir = path.join(process.cwd(), '.context-master', 'knowledge');
  const manifestPath = path.join(knowledgeDir, 'knowledge-manifest.yaml');

  if (!await pathExists(knowledgeDir)) {
    return; // No directory, no manifest
  }

  // TOUJOURS scanner le dossier physique
  const files = await fs.readdir(knowledgeDir);
  const mdFiles = files
    .filter((file: string) => file.endsWith('.md') && file !== 'knowledge-manifest.yaml')
    .sort((a: string, b: string) => a.localeCompare(b));

  console.log(`[project-master] Physical scan found ${mdFiles.length} .md files:`, mdFiles);

  const manifest = {
    lastUpdated: new Date().toISOString(),
    files: mdFiles,
  };

  await fs.writeFile(manifestPath, yaml.dump(manifest));
  console.log(`[project-master] FORCE updated manifest with ${mdFiles.length} files`);
}