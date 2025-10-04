#!/usr/bin/env node

import { SearchService } from '../build/services/search.service.js';
import dotenv from 'dotenv';

dotenv.config();

async function testRealGithubFallback() {
  console.log('🧪 Testing with packages that really force GitHub API usage\n');
  
  const service = new SearchService();
  // Using names that definitely don't exist in npm to trigger GitHub search
  const testPackages = ['xxxxxx-tailwindcss-test', 'yyyyyyy-react-test'];
  
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

// Test with terms that will definitely trigger GitHub search
async function testDirectGithubTerms() {
  console.log('🧪 Testing with search terms that should find repos with homepages\n');
  
  const service = new SearchService();
  const testPackages = ['zzzzzz-nonexistent-tailwind-search', 'zzzzzz-nonexistent-next-search'];
  
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

testRealGithubFallback().then(() => {
  console.log('\n' + '='.repeat(60) + '\n');
  return testDirectGithubTerms();
});