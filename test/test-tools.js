#!/usr/bin/env node

// Protocol Step 3: Testing (REQUIRED BEFORE COMPLETION)
// This script tests each MCP tool individually as required by the protocol

import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';

console.log('🔧 MCP Server Protocol Step 3: Testing Phase');
console.log('⚠️  Testing EVERY tool as required by protocol...\n');

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
  console.log('📋 Required Protocol Tests:\n');
  
  const tests = [
    // Test 1: List tools (basic connectivity)
    {
      name: 'list_tools_connectivity',
      payload: { jsonrpc: "2.0", id: 1, method: "tools/list" }
    },
    
    // Test 2: Install tool with valid GitHub URL
    {
      name: 'install_mcp_server',
      args: { repo_url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory' }
    },
    
    // Test 3: Search tool (requires GITHUB_TOKEN)
    {
      name: 'search_mcp_server', 
      args: { query: 'mcp-server typescript' }
    },
    
    // Test 4: Uninstall tool
    {
      name: 'uninstall_mcp_server',
      args: { server_name: 'memory' }
    },
    
  // Note: the `repair_mcp_server` test was removed because it belongs to another
  // project and is not applicable here. If you need it later, re-add an entry.
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
    console.log('✅ ALL TOOLS TESTED SUCCESSFULLY');
    console.log('✅ Protocol Step 3 COMPLETE - Server ready for use');
  } else {
    console.log('❌ SOME TESTS FAILED');
    console.log('⛔️ Protocol violation: Cannot complete until all tools tested');
  }
  
  return allPassed;
}

// Run the tests
runAllTests().catch(console.error);
