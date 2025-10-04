#!/usr/bin/env node

import { searchGithubRepos } from '../build/apis/github-api.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function testHomepageFallback() {
  console.log('🧪 Testing homepage fallback for /llms.txt\n');
  
  const token = process.env.GITHUB_TOKEN;
  const testQueries = ['expo', 'tailwindcss', 'nextjs'];
  
  for (const query of testQueries) {
    console.log(`🔍 Testing: ${query}`);
    console.log('='.repeat(50));
    
    try {
      const results = await searchGithubRepos(query, token, 1);
      
      if (results.length > 0) {
        const repo = results[0];
        console.log(`📦 ${repo.name} (${repo.full_name})`);
        console.log(`🔗 GitHub: ${repo.html_url}`);
        
        if (repo.homepage) {
          console.log(`🏠 Homepage: ${repo.homepage}`);
          
          // Test homepage + /llms.txt
          const homepageUrl = repo.homepage.endsWith('/') 
            ? repo.homepage.slice(0, -1) 
            : repo.homepage;
          const llmsUrl = `${homepageUrl}/llms.txt`;
          
          console.log(`📄 Testing: ${llmsUrl}`);
          
          try {
            const response = await axios.get(llmsUrl, { 
              timeout: 5000,
              validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
              }
            });
            
            if (response.status === 200) {
              const content = response.data;
              const preview = typeof content === 'string' 
                ? content.substring(0, 200) 
                : JSON.stringify(content).substring(0, 200);
              
              console.log(`✅ SUCCESS! Homepage /llms.txt found!`);
              console.log(`📝 Content preview: ${preview}...`);
              console.log(`📊 Size: ${typeof content === 'string' ? content.length : 'Unknown'} characters`);
            } else {
              console.log(`❌ Homepage /llms.txt returned ${response.status}`);
            }
          } catch (error) {
            console.log(`❌ Homepage /llms.txt failed: ${error.message}`);
          }
          
          // Also test Context7
          const context7Url = `https://context7.com/${repo.full_name}/llms.txt`;
          console.log(`📄 Testing Context7: ${context7Url}`);
          
          try {
            const response = await axios.get(context7Url, { 
              timeout: 5000,
              validateStatus: function (status) {
                return status < 500;
              }
            });
            
            if (response.status === 200) {
              console.log(`✅ Context7 SUCCESS!`);
            } else {
              console.log(`❌ Context7 returned ${response.status}`);
            }
          } catch (error) {
            console.log(`❌ Context7 failed: ${error.message}`);
          }
          
        } else {
          console.log(`🏠 No homepage found`);
        }
      } else {
        console.log(`❌ No results found for ${query}`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`Error testing ${query}:`, error.message);
    }
  }
}

testHomepageFallback();