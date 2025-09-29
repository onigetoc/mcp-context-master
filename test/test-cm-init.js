#!/usr/bin/env node

import { handleSetupProjectContextTool } from '../build/tools/setup.tool.js';

async function testCmInit() {
  console.log('Testing cm_init tool...');
  
  try {
    const request = {
      params: {
        arguments: {
          projectPath: '.'
        }
      }
    };
    
    const result = await handleSetupProjectContextTool(request);
    console.log('✅ Success!');
    console.log(result);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testCmInit();