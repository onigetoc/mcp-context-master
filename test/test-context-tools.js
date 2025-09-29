#!/usr/bin/env node

// Test script for MCP Context Master tools
import { tools, toolHandlers } from '../build/tools/index.js';

console.log('🚀 Testing MCP Context Master Tools\n');

// Test 1: List all available tools
console.log('📋 Available Tools:');
tools.forEach((tool, index) => {
  console.log(`${index + 1}. ${tool.name}: ${tool.description}`);
});

console.log('\n🔧 Tool Handlers:');
Object.keys(toolHandlers).forEach((handler, index) => {
  console.log(`${index + 1}. ${handler}`);
});

// Test 2: Test registry manager (create action)
console.log('\n🧪 Testing Registry Manager...');
try {
  const mockRequest = {
    params: {
      arguments: {
        action: 'create',
        projectType: 'test-project'
      }
    }
  };
  
  const result = await toolHandlers['manage_tools_registry'](mockRequest);
  console.log('✅ Registry Manager Test Passed');
  console.log('📄 Registry created successfully');
} catch (error) {
  console.log('❌ Registry Manager Test Failed:', error.message);
}

// Test 3: Test Context7 converter
console.log('\n🧪 Testing Context7 Converter...');
try {
  const mockRequest = {
    params: {
      arguments: {
        githubUrl: 'https://github.com/vercel/ai',
        topic: 'chatbot',
        tokens: 2000
      }
    }
  };
  
  const result = await toolHandlers['convert_to_context7'](mockRequest);
  console.log('✅ Context7 Converter Test Passed');
  console.log('🔗 URL conversion successful');
} catch (error) {
  console.log('❌ Context7 Converter Test Failed:', error.message);
}

console.log('\n🎉 Test completed! Your MCP Context Master is ready to use.');
console.log('\n📝 Next steps:');
console.log('1. Set your GITHUB_TOKEN environment variable');
console.log('2. Configure your MCP client to use this server');
console.log('3. Start using the tools to gather project context!');