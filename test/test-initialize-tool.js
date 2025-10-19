/**
 * Test script for initialize_context_master tool
 * 
 * This tests the first-time initialization flow:
 * 1. Downloads cm-ai-infos.md template
 * 2. Creates .context-master directory
 * 3. Returns instructions for LLM
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test project path - use a test directory
const TEST_PROJECT_PATH = path.join(__dirname, '..', 'test-project-init');

console.log('🧪 Testing initialize_context_master tool\n');
console.log('Test project path:', TEST_PROJECT_PATH);
console.log('---\n');

// Create test request
const testRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: {
    name: 'initialize_context_master',
    arguments: {
      projectPath: TEST_PROJECT_PATH
    }
  }
};

console.log('📤 Sending request:');
console.log(JSON.stringify(testRequest, null, 2));
console.log('\n---\n');

// Spawn the MCP server
const serverPath = path.join(__dirname, '..', 'build', 'index.js');
const serverProcess = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'inherit']
});

let responseData = '';

// Handle server output
serverProcess.stdout.on('data', (data) => {
  responseData += data.toString();
  
  // Try to parse each line as JSON
  const lines = responseData.split('\n');
  responseData = lines.pop() || ''; // Keep incomplete line
  
  for (const line of lines) {
    if (line.trim()) {
      try {
        const response = JSON.parse(line);
        console.log('📥 Received response:');
        console.log(JSON.stringify(response, null, 2));
        
        // Check if this is our response
        if (response.id === 1) {
          console.log('\n✅ Test completed successfully!');
          console.log('\n📋 Next steps for LLM:');
          console.log('1. Read the downloaded cm-ai-infos.md template');
          console.log('2. Create cm-ai-infos.yaml with proper values');
          console.log('3. Call setup_project_context to complete setup');
          
          serverProcess.kill();
          process.exit(0);
        }
      } catch (e) {
        // Not JSON, ignore
      }
    }
  }
});

// Handle errors
serverProcess.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

serverProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Server exited with code ${code}`);
    process.exit(code || 1);
  }
});

// Send the request
setTimeout(() => {
  serverProcess.stdin.write(JSON.stringify(testRequest) + '\n');
}, 1000);

// Timeout after 30 seconds
setTimeout(() => {
  console.error('❌ Test timeout');
  serverProcess.kill();
  process.exit(1);
}, 30000);
