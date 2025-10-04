#!/usr/bin/env node

import { searchGithubRepos } from '../build/apis/github-api.js';
import dotenv from 'dotenv';

dotenv.config();

async function testHomepage() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN required');
    process.exit(1);
  }

  const testQueries = ['tailwindcss', 'react', 'vue', 'nextjs', 'express'];

  for (const query of testQueries) {
    console.log(`\n🔍 Testing: ${query}`);
    console.log('='.repeat(50));
    
    try {
      const results = await searchGithubRepos(query, token, 2);
      
      results.forEach((repo, index) => {
        console.log(`${index + 1}. ${repo.name} (${repo.full_name})`);
        console.log(`   ⭐ ${repo.stargazers_count} stars`);
        console.log(`   📝 ${repo.description || 'No description'}`);
        console.log(`   🔗 ${repo.html_url}`);
        
        if (repo.homepage) {
          console.log(`   🏠 HOMEPAGE: ${repo.homepage}`);
        } else {
          console.log(`   🏠 No homepage`);
        }
        console.log('');
      });
    } catch (error) {
      console.error(`Error testing ${query}:`, error.message);
    }
  }
}

testHomepage();