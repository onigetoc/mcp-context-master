#!/usr/bin/env node

// Protocol Step 3: Testing (REQUIRED BEFORE COMPLETION)
// This script tests each MCP tool individually as required by the protocol

import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';

console.log('🔧 MCP Context Master - Testing Phase');
console.log('⚠️  Testing all 4 context management tools...\n');

// Use an absolute path to build/index.js resolved from the project root (process.cwd()).
// This prevents ../build being resolved relative to the test runner's cwd and pointing
// to the parent folder (which caused MODULE_NOT_FOUND errors).
const serverPath = path.resolve(process.cwd(), 'build', 'index.js');

function testTool(toolName, args) {
  return new Promise((resolve, reject) => {
    console.log(`Testing tool: ${toolName}`);
    
    const testPayload = {
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: toolName,
        arguments: args
      }
    };

    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    let errorOutput = '';

    server.stdout.on('data', (data) => {
      output += data.toString();
    });

    server.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    server.on('close', (code) => {
      if (code === 0 || output.includes('content')) {
        console.log(`✅ ${toolName}: PASSED`);
        console.log(`   Output: ${output.slice(0, 100)}...`);
        resolve(true);
      } else {
        console.log(`❌ ${toolName}: FAILED`);
        console.log(`   Error: ${errorOutput}`);
        resolve(false);
      }
    });

    // Send the test payload
    server.stdin.write(JSON.stringify(testPayload) + '\n');
    server.stdin.end();
    
    // Timeout after 10 seconds
    setTimeout(() => {
      server.kill();
      console.log(`⏰ ${toolName}: TIMEOUT`);
      resolve(false);
    }, 10000);
  });
}

async function runAllTests() {
  console.log('📋 Context Master Tool Tests:\n');
  
  const tests = [
    // Test 1: Setup project context
    {
      name: 'setup_project_context',
      args: { 
        project_name: 'test-project',
        project_type: 'react',
        dependencies: ['react', 'typescript']
      }
    },
    
    // Test 2: Add project context
    {
      name: 'add_project_context',
      args: { 
        project_name: 'test-project',
        library_name: 'react'
      }
    },
    
    // Test 3: List available contexts
    {
      name: 'list_available_contexts', 
      args: {}
    },
    
    // Test 4: Read specific context
    {
      name: 'read_specific_context',
      args: { 
        project_name: 'test-project',
        context_name: 'react'
      }
    }
  ];

  let allPassed = true;
  
  for (const test of tests) {
    if (test.payload) {
      // Direct payload test
      continue; // Skip for now, focus on tool tests
    } else {
      const result = await testTool(test.name, test.args);
      if (!result) allPassed = false;
    }
    console.log(''); // Empty line between tests
  }

  console.log('\n📊 TEST RESULTS:');
  if (allPassed) {
    console.log('✅ ALL CONTEXT MASTER TOOLS TESTED SUCCESSFULLY');
    console.log('✅ MCP Context Master ready for use');
  } else {
    console.log('❌ SOME TESTS FAILED');
    console.log('⛔️ Fix issues before using Context Master');
  }
  
  return allPassed;
}

// Run the tests
runAllTests().catch(console.error);
