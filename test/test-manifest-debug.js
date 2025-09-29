import * as fs from 'fs/promises';
import * as path from 'path';

async function debugManifest() {
  const contextDir = path.join(process.cwd(), '.context-master', 'context');
  
  console.log('=== DEBUGGING MANIFEST ISSUE ===');
  console.log(`Context directory: ${contextDir}`);
  
  try {
    const entries = await fs.readdir(contextDir);
    console.log(`\nAll files found in directory:`, entries);
    
    const mdFiles = entries.filter(f => f.endsWith('.md') && f !== 'context-manifest.yaml');
    console.log(`\nMarkdown files (should ALL be included):`, mdFiles);
    
    // Vérifier le contenu du manifest actuel
    const manifestPath = path.join(contextDir, 'context-manifest.yaml');
    try {
      const manifestContent = await fs.readFile(manifestPath, 'utf8');
      console.log(`\nCurrent manifest content:\n${manifestContent}`);
    } catch (e) {
      console.log(`\nNo manifest file found or error reading it: ${e.message}`);
    }
    
    // Tester si il y a des caractères spéciaux ou problèmes d'encoding
    for (const file of mdFiles) {
      const fullPath = path.join(contextDir, file);
      const stats = await fs.stat(fullPath);
      console.log(`File: ${file} - Size: ${stats.size} bytes - Modified: ${stats.mtime}`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugManifest();
