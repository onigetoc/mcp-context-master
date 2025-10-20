import { updateKnowledgeManifest } from '../build/services/registry.service.js';
import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';

async function testUpdateKnowledgeManifest() {
  console.log('=== TESTING updateKnowledgeManifest ===');
  
  // Test with current directory (should find .context-master if it exists)
  console.log('\n1. Testing with current directory...');
  try {
    await updateKnowledgeManifest();
    console.log('✅ updateKnowledgeManifest() completed without error');
  } catch (e) {
    console.log('⚠️  updateKnowledgeManifest() failed:', e.message);
  }

  // Test with explicit project path (if .context-master exists)
  const contextMasterPath = path.join(process.cwd(), '.context-master');
  if (await fs.pathExists(contextMasterPath)) {
    console.log('\n2. Testing with explicit project path...');
    try {
      await updateKnowledgeManifest(process.cwd());
      console.log('✅ updateKnowledgeManifest(projectPath) completed without error');
      
      // Check if manifest was created/updated
      const manifestPath = path.join(process.cwd(), '.context-master', 'knowledge', 'knowledge-manifest.yaml');
      if (await fs.pathExists(manifestPath)) {
        const manifestContent = await fs.readFile(manifestPath, 'utf8');
        const manifest = yaml.load(manifestContent);
        console.log('📄 Manifest content:', JSON.stringify(manifest, null, 2));
      } else {
        console.log('⚠️  Manifest file not found at:', manifestPath);
      }
    } catch (e) {
      console.log('❌ updateKnowledgeManifest(projectPath) failed:', e.message);
    }
  } else {
    console.log('\n2. Skipping explicit path test - no .context-master directory found');
  }

  // List actual files in knowledge directory
  const knowledgePath = path.join(process.cwd(), '.context-master', 'knowledge');
  if (await fs.pathExists(knowledgePath)) {
    console.log('\n3. Actual files in knowledge directory:');
    try {
      const files = await fs.readdir(knowledgePath);
      const mdFiles = files.filter(file => file.endsWith('.md'));
      console.log('📁 .md files found:', mdFiles);
      console.log('📁 All files:', files);
    } catch (e) {
      console.log('❌ Error reading knowledge directory:', e.message);
    }
  } else {
    console.log('\n3. No knowledge directory found at:', knowledgePath);
  }
}

testUpdateKnowledgeManifest().catch(console.error);