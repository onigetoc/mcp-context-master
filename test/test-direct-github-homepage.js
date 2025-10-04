#!/usr/bin/env node

import { searchGithubRepos } from '../build/apis/github-api.js';
import { convertToContext7Url } from '../build/services/converter.service.js';
import dotenv from 'dotenv';

dotenv.config();

async function testDirectGithubHomepage() {
  console.log('🧪 Testing GitHub API directly for homepage data\n');
  
  const token = process.env.GITHUB_TOKEN;
  const testQueries = ['tailwindcss', 'react', 'vue', 'nextjs', 'express'];
  
  for (const query of testQueries) {
    console.log(`🔍 Searching: ${query}`);
    console.log('-'.repeat(40));
    
    try {
      const results = await searchGithubRepos(query, token, 1);
      
      if (results.length > 0) {
        const repo = results[0];
        const context7Url = convertToContext7Url({
          githubUrl: repo.html_url, 
          topic: 'programming', 
          tokens: 5000
        });
        
        console.log(`   📦 ${repo.name} (${repo.full_name})`);
        console.log(`   ⭐ ${repo.stargazers_count} stars`);
        console.log(`   📝 ${repo.description || 'No description'}`);
        console.log(`   🔗 ${repo.html_url}`);
        
        if (repo.homepage) {
          console.log(`   🏠 HOMEPAGE: ${repo.homepage}`);
        } else {
          console.log(`   🏠 No homepage`);
        }
        
        console.log(`   📚 Context7: ${context7Url}`);
        
        // Now let's create a SearchResult-like object with homepage
        const searchResult = {
          originalPackageName: query,
          repoName: repo.name,
          url: repo.html_url,
          homepage: repo.homepage || undefined,
          context7Url: context7Url,
          downloaded: false,
          topic: 'programming',
          tokens: 5000
        };
        
        console.log(`   ✅ With homepage: ${searchResult.homepage ? 'YES' : 'NO'}`);
      } else {
        console.log(`   ❌ No results found`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }
}

testDirectGithubHomepage();