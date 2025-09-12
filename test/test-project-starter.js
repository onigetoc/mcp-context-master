#!/usr/bin/env node

import { handleProjectMasterTool } from '../build/tools/project-master.js';

async function testProjectStarter() {
  console.log('🚀 Testing Project Starter...\n');
  
  try {
    const mockRequest = {
      params: {
        arguments: {
          projectPath: '.',
          maxDependencies: 2, // Limit to 2 for faster testing
          downloadDocs: true, // Enable downloads for full test
          
        }
      }
    };
    
    const response = await handleProjectMasterTool(mockRequest);
    const result = JSON.parse(response.content[0].text);
    
    console.log('✅ Project Starter Results:');
    console.log('==========================');
    console.log(`Success: ${result.success}`);
    
    if (result.projectInfo) {
      console.log(`\n📦 Project Info:`);
      console.log(`  Name: ${result.projectInfo.name}`);
      console.log(`  Type: ${result.projectInfo.type}`);
      console.log(`  Dependencies: ${result.projectInfo.dependencies.length}`);
      console.log(`  Dependencies: ${result.projectInfo.dependencies.join(', ')}`);
    }
    
    if (result.searchResults && result.searchResults.length > 0) {
      console.log(`\n🔍 Search Results (${result.searchResults.length}):`);
      result.searchResults.forEach((repo, i) => {
        console.log(`  ${i + 1}. ${repo.originalPackageName} → ${repo.repoName}`);
        console.log(`     GitHub: ${repo.url}`);
        console.log(`     Context7: ${repo.context7Url}`);
        console.log(`     Downloaded: ${repo.downloaded}`);
        console.log('');
      });
    }
    
    if (result.errors && result.errors.length > 0) {
      console.log(`\n❌ Errors:`);
      result.errors.forEach(error => console.log(`  - ${error}`));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testProjectStarter();