// Test script for coding assistant detection
import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';

async function testCodingAssistantDetection() {
  console.log('🧪 Testing Coding Assistant Detection...');
  
  // Test data
  const testData = {
    provider: 'anthropic',
    model: 'claude-sonnet-4',
    ide: 'kiro',
    extension: 'kiro'
  };
  
  // Expected result for Kiro
  const expectedContextFile = '.kiro/steering/context-master-instructions.md';
  const expectedAgentsMD = false; // Kiro doesn't need AGENTS.md
  
  console.log('📝 Test data:', testData);
  console.log('🎯 Expected context file:', expectedContextFile);
  console.log('📄 Expected AGENTS.md update:', expectedAgentsMD);
  
  // Context mappings (copied from setup.tool.ts)
  const contextMappings = [
    { keys: ["kiro"], ruleFile: "context-master-instructions.md", contextDir: ".kiro/steering/", type: "ide", agentsMD: false },
    { keys: ["gemini"], ruleFile: "GEMINI.md", contextDir: null, type: "model", agentsMD: true },
    { keys: ["github copilot", "copilot"], ruleFile: "copilot-instructions.md", contextDir: ".github/", type: "extension", agentsMD: true },
    // Add other mappings as needed for testing
  ];
  
  // Detection logic (simplified)
  const isValid = (val) => val && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";
  const findMatch = (value, type) => {
    const lowerValue = value.toLowerCase();
    return contextMappings.find(mapping => 
      mapping.type === type && 
      mapping.keys.some(key => lowerValue.includes(key))
    );
  };
  
  let match = null;
  
  if (isValid(testData.extension)) {
    match = findMatch(testData.extension, "extension");
  }
  
  if (!match && isValid(testData.ide)) {
    match = findMatch(testData.ide, "ide");
  }
  
  if (match) {
    const contextFile = match.contextDir ? path.join(match.contextDir, match.ruleFile).replace(/\\/g, '/') : match.ruleFile;
    console.log('✅ Detection successful!');
    console.log('📁 Detected context file:', contextFile);
    console.log('📄 Should update AGENTS.md:', match.agentsMD);
    
    if (contextFile === expectedContextFile && match.agentsMD === expectedAgentsMD) {
      console.log('🎉 Test PASSED! Detection working correctly for Kiro.');
    } else {
      console.log('❌ Test FAILED! Expected:', expectedContextFile, 'Got:', contextFile);
    }
  } else {
    console.log('❌ No match found - test failed');
  }
}

testCodingAssistantDetection().catch(console.error);