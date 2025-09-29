import { spawn } from 'child_process';

console.log('🔧 Testing MCP Server Protocol Compliance...\n');

// Test 1: Server starts without errors
const testServerStart = () => {
  return new Promise((resolve) => {
    console.log('Test 1: Server startup and logging compliance');
    
    const server = spawn('node', ['build/index.js'], {
      cwd: 'c:\\Users\\LENOVO\\APPS\\0-MCP\\mcp-easy-installer',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stderrOutput = '';
    
    server.stderr.on('data', (data) => {
      stderrOutput += data.toString();
      console.log('  Server log:', data.toString().trim());
    });

    server.stdout.on('data', (data) => {
      console.log('  Server output:', data.toString().trim());
    });

    // Give server 3 seconds to start and show logs
    setTimeout(() => {
      server.kill();
      
      // Check for protocol-compliant logging
      const hasSetupLog = stderrOutput.includes('[Setup] Initializing server');
      const hasConnectedLog = stderrOutput.includes('[Setup] MCP server transport connected');
      
      console.log('\n  📊 Protocol Compliance Check:');
      console.log(`  ✅ [Setup] Initialization logging: ${hasSetupLog ? 'PASS' : 'FAIL'}`);
      console.log(`  ✅ [Setup] Connection logging: ${hasConnectedLog ? 'PASS' : 'FAIL'}`);
      
      if (hasSetupLog && hasConnectedLog) {
        console.log('  🎉 Server startup: PROTOCOL COMPLIANT\n');
        resolve(true);
      } else {
        console.log('  ❌ Server startup: PROTOCOL VIOLATION\n');
        resolve(false);
      }
    }, 3000);
  });
};

// Test 2: Tool listing
const testToolListing = () => {
  return new Promise((resolve) => {
    console.log('Test 2: Tool listing functionality');
    
    const server = spawn('node', ['build/index.js'], {
      cwd: 'c:\\Users\\LENOVO\\APPS\\0-MCP\\mcp-easy-installer',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let responseData = '';
    
    server.stdout.on('data', (data) => {
      responseData += data.toString();
    });

    server.stderr.on('data', (data) => {
      const log = data.toString();
      if (log.includes('[API]')) {
        console.log('  API log:', log.trim());
      }
    });

    // Send tools/list request
    setTimeout(() => {
      const request = {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list"
      };
      
      server.stdin.write(JSON.stringify(request) + '\n');
      
      setTimeout(() => {
        server.kill();
        
        const hasResponse = responseData.length > 0;
        const hasTools = responseData.includes('install_mcp_server');
        
        console.log('  📊 Tool Listing Check:');
        console.log(`  ✅ Response received: ${hasResponse ? 'PASS' : 'FAIL'}`);
        console.log(`  ✅ Tools present: ${hasTools ? 'PASS' : 'FAIL'}`);
        
        if (hasResponse && hasTools) {
          console.log('  🎉 Tool listing: WORKING\n');
          resolve(true);
        } else {
          console.log('  ❌ Tool listing: FAILED\n');
          resolve(false);
        }
      }, 2000);
    }, 1000);
  });
};

// Run all tests
async function runTests() {
  console.log('🚀 Starting Protocol Compliance Tests...\n');
  
  const startupTest = await testServerStart();
  const toolTest = await testToolListing();
  
  console.log('📋 FINAL RESULTS:');
  console.log(`Server Startup: ${startupTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Tool Listing: ${toolTest ? '✅ PASS' : '❌ FAIL'}`);
  
  if (startupTest && toolTest) {
    console.log('\n🎉 MCP SERVER IS PROTOCOL COMPLIANT!');
    console.log('✅ Ready for MCP Desktop integration');
  } else {
    console.log('\n❌ PROTOCOL VIOLATIONS FOUND');
    console.log('⛔️ Server may not work properly in MCP Desktop');
  }
}

runTests().catch(console.error);
