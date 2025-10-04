#!/usr/bin/env node

import { SearchService } from '../build/services/search.service.js';
import dotenv from 'dotenv';

dotenv.config();

async function testServiceHomepageGithubOnly() {
  console.log('🧪 Testing SearchService with GitHub search only (no npm registry)\n');
  
  const service = new SearchService();
  const testPackages = ['tailwindcss', 'react', 'vue', 'express'];
  
  try {
    // Force skip npm registry by using a fake package name that won't match
    const results = await service.searchDependencies(testPackages, false);
    
    console.log(`Found ${results.length} results:\n`);
    
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.originalPackageName}`);
      console.log(`   Repository: ${result.repoName}`);
      console.log(`   GitHub URL: ${result.url}`);
      
      if (result.homepage) {
        console.log(`   🏠 Official Website: ${result.homepage}`);
      } else {
        console.log(`   🏠 No homepage found`);
      }
      
      console.log(`   📚 Context7: ${result.context7Url}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error testing service:', error.message);
  }
}

// Let's also create a test that uses packages that don't exist in npm to force GitHub search
async function testWithGithubFallback() {
  console.log('🧪 Testing with packages that force GitHub fallback\n');
  
  const service = new SearchService();
  const testPackages = ['some-nonexistent-package-tailwindcss', 'some-nonexistent-package-react'];
  
  try {
    const results = await service.searchDependencies(testPackages, false);
    
    console.log(`Found ${results.length} results:\n`);
    
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.originalPackageName}`);
      console.log(`   Repository: ${result.repoName}`);
      console.log(`   GitHub URL: ${result.url}`);
      
      if (result.homepage) {
        console.log(`   🏠 Official Website: ${result.homepage}`);
      } else {
        console.log(`   🏠 No homepage found`);
      }
      
      console.log(`   📚 Context7: ${result.context7Url}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error testing service:', error.message);
  }
}

testServiceHomepageGithubOnly().then(() => {
  console.log('\n' + '='.repeat(60) + '\n');
  return testWithGithubFallback();
});