#!/usr/bin/env node

import { handleAddProjectContextTool } from '../build/tools/add_context.tool.js';
import dotenv from 'dotenv';

dotenv.config();

async function testMcpHomepageFallback() {
  console.log('🧪 Testing MCP Context Addition with Homepage Fallback\n');
  
  // Test avec Expo (on sait que le homepage fallback fonctionne)
  const testRequest = {
    params: {
      arguments: {
        libraryName: 'expo',
        projectPath: process.cwd(),
        topic: 'react native',
        tokens: 3000
      }
    }
  };
  
  try {
    console.log('📦 Testing add_project_context with "expo"...\n');
    
    const result = await handleAddProjectContextTool(testRequest);
    
    console.log('🎯 MCP Tool Result:');
    if (result.content && result.content[0]) {
      const content = result.content[0];
      if (content.type === 'text') {
        try {
          const parsed = JSON.parse(content.text);
          console.log(`✅ Success: ${parsed.success}`);
          console.log(`📄 File: ${parsed.downloadedFile || 'N/A'}`);
          console.log(`🔗 Source: ${parsed.sourceUrl || 'N/A'}`);
          
          if (parsed.homepage) {
            console.log(`🏠 Homepage: ${parsed.homepage}`);
          }
          
          if (parsed.fallbackUsed) {
            console.log(`🔄 Fallback used: ${parsed.fallbackUsed}`);
          }
        } catch {
          console.log('📝 Raw result:', content.text.substring(0, 300));
        }
      } else {
        console.log('📝 Non-text result:', content);
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing MCP tool:', error.message);
    console.error('Stack:', error.stack);
  }
}

testMcpHomepageFallback();