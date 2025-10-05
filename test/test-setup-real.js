#!/usr/bin/env node

// Test script for setup_project_context tool on REAL project
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleSetupProjectContextTool } from '../build/tools/setup.tool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing setup_project_context tool on REAL project\n');

async function testRealSetup() {
  const projectRoot = path.resolve(__dirname, '..');
  
  try {
    console.log('🚀 Testing setup_project_context on current project...');
    console.log(`📁 Project path: ${projectRoot}`);
    
    // Check if .context-master already exists
    const contextMasterDir = path.join(projectRoot, '.context-master');
    const alreadyExists = await fs.pathExists(contextMasterDir);
    
    if (alreadyExists) {
      console.log('⚠️  .context-master already exists. Backing it up...');
      const backupDir = path.join(projectRoot, '.context-master-backup-' + Date.now());
      await fs.move(contextMasterDir, backupDir);
      console.log(`✅ Backed up to: ${backupDir}`);
    }

    // Test the setup tool on current project
    const mockRequest = {
      params: {
        arguments: {
          projectPath: '.',  // Current directory
          maxDependencies: 5
        }
      }
    };

    console.log('\n🔧 Running setup_project_context...');
    const result = await handleSetupProjectContextTool(mockRequest);
    
    // Display results
    console.log('\n📋 Setup Results:');
    console.log('=' .repeat(50));
    console.log(result.content[0].text);
    console.log('=' .repeat(50));

    // Verify the structure was created in the current project
    console.log('\n🔍 Verifying structure in current project...');
    
    const checks = [
      { path: contextMasterDir, name: '.context-master directory' },
      { path: path.join(contextMasterDir, 'context'), name: 'context directory' },
      { path: path.join(contextMasterDir, 'commands'), name: 'commands directory' },
      { path: path.join(contextMasterDir, 'ai-infos.json'), name: 'ai-infos.json' },
      { path: path.join(contextMasterDir, 'cm-ai-infos.md'), name: 'cm-ai-infos.md template' },
      { path: path.join(contextMasterDir, 'context', 'context-manifest.yaml'), name: 'context-manifest.yaml' }
    ];

    let allPassed = true;
    for (const check of checks) {
      const exists = await fs.pathExists(check.path);
      if (exists) {
        console.log(`✅ ${check.name}`);
      } else {
        console.log(`❌ ${check.name} NOT found`);
        allPassed = false;
      }
    }

    // List what was actually created
    if (await fs.pathExists(contextMasterDir)) {
      console.log('\n📂 Contents of .context-master:');
      const contents = await fs.readdir(contextMasterDir);
      for (const item of contents) {
        const itemPath = path.join(contextMasterDir, item);
        const stats = await fs.stat(itemPath);
        if (stats.isDirectory()) {
          console.log(`  📁 ${item}/`);
          const subContents = await fs.readdir(itemPath);
          for (const subItem of subContents) {
            console.log(`    📄 ${subItem}`);
          }
        } else {
          console.log(`  📄 ${item}`);
        }
      }
    }

    // Check package.json dependencies that were processed
    const packageJsonPath = path.join(projectRoot, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      const deps = [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.devDependencies || {})
      ];
      console.log(`\n📦 Project has ${deps.length} dependencies:`, deps.slice(0, 10));
    }

    console.log('\n🎯 Test Summary:');
    if (allPassed) {
      console.log('✅ SUCCESS! .context-master was created in the current project');
      console.log('🎉 Setup tool is working correctly on real projects');
    } else {
      console.log('❌ Some files were not created properly');
    }

    // Ask user what to do with the created .context-master
    console.log('\n❓ What would you like to do with the created .context-master folder?');
    console.log('   - Keep it for actual use');
    console.log('   - Delete it (it was just a test)');
    console.log('   - The folder is now ready for real use!');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testRealSetup().catch(console.error);