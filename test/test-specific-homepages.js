#!/usr/bin/env node

import axios from 'axios';

async function testSpecificHomepages() {
  const testUrls = [
    'https://nextjs.org/llms.txt',
    'https://react.dev/llms.txt', 
    'https://expressjs.com/llms.txt',
    'https://docs.expo.dev/llms.txt' // On sait que celui-ci fonctionne
  ];
  
  for (const url of testUrls) {
    console.log(`\n🔍 Testing: ${url}`);
    
    try {
      const response = await axios.get(url, { 
        timeout: 5000,
        validateStatus: function (status) {
          return status < 500;
        }
      });
      
      if (response.status === 200) {
        const content = response.data;
        const size = typeof content === 'string' ? content.length : 0;
        const preview = typeof content === 'string' 
          ? content.substring(0, 150).replace(/\n/g, ' ') 
          : 'Not text content';
        
        console.log(`✅ SUCCESS! (${size} characters)`);
        console.log(`📝 Preview: ${preview}...`);
      } else {
        console.log(`❌ HTTP ${response.status}`);
      }
      
    } catch (error) {
      if (error.response) {
        console.log(`❌ HTTP ${error.response.status}: ${error.response.statusText}`);
      } else {
        console.log(`❌ Error: ${error.message}`);
      }
    }
  }
}

testSpecificHomepages();