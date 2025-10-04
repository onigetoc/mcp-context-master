#!/usr/bin/env node

import { SearchService } from '../build/services/search.service.js';
import dotenv from 'dotenv';

dotenv.config();

async function testServiceHomepage() {
  console.log('🧪 Testing SearchService with homepage data\n');
  
  const service = new SearchService();
  const testPackages = ['tailwindcss', 'react', 'vue', 'express'];
  
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

testServiceHomepage();