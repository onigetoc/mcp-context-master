// Test script for path resolution
import fs from 'fs-extra';
import path from 'path';

async function testPathResolution() {
  console.log('🧪 Testing Path Resolution for Different Assistants...');
  
  // Test cases
  const testCases = [
    {
      name: 'Kiro',
      data: { provider: 'anthropic', model: 'claude-sonnet-4', ide: 'kiro', extension: 'kiro' },
      expected: '.kiro/steering/context-master-instructions.md',
      expectedAgentsMD: false
    },
    {
      name: 'Gemini CLI',
      data: { provider: 'google', model: 'gemini', ide: 'unknown', extension: 'gemini cli' },
      expected: 'GEMINI.md', // Should be at root
      expectedAgentsMD: true
    },
    {
      name: 'GitHub Copilot',
      data: { provider: 'openai', model: 'gpt-4', ide: 'vs code', extension: 'github copilot' },
      expected: '.github/copilot-instructions.md', // Should be in .github folder
      expectedAgentsMD: true
    },
    {
      name: 'Claude Code',
      data: { provider: 'anthropic', model: 'claude', ide: 'unknown', extension: 'claude code' },
      expected: 'CLAUDE.md', // Should be at root
      expectedAgentsMD: true
    }
  ];
  
  // Context mappings (updated)
  const contextMappings = [
    { keys: ["roo code", "roo-code", "roo"], ruleFile: "ROO.md", contextDir: null, type: "extension", agentsMD: true },
    { keys: ["cline"], ruleFile: ".clinerules", contextDir: ".cline/", type: "extension", agentsMD: true },
    { keys: ["github copilot", "copilot"], ruleFile: "copilot-instructions.md", contextDir: ".github/", type: "extension", agentsMD: true },
    { keys: ["claude code"], ruleFile: "CLAUDE.md", contextDir: null, type: "extension", agentsMD: true },
    { keys: ["gemini cli"], ruleFile: "GEMINI.md", contextDir: null, type: "extension", agentsMD: true },
    { keys: ["kiro"], ruleFile: "context-master-instructions.md", contextDir: ".kiro/steering/", type: "ide", agentsMD: false },
    { keys: ["gemini"], ruleFile: "GEMINI.md", contextDir: null, type: "model", agentsMD: true },
    { keys: ["claude"], ruleFile: "CLAUDE.md", contextDir: null, type: "model", agentsMD: true },
  ];
  
  // Detection logic
  const isValid = (val) => val && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";
  const findMatch = (value, type) => {
    const lowerValue = value.toLowerCase();
    return contextMappings.find(mapping => 
      mapping.type === type && 
      mapping.keys.some(key => lowerValue.includes(key))
    );
  };
  
  const buildPath = (match) => {
    if (!match.contextDir) return match.ruleFile;
    return path.join(match.contextDir, match.ruleFile).replace(/\\/g, '/');
  };
  
  // Test each case
  for (const testCase of testCases) {
    console.log(`\n📝 Testing: ${testCase.name}`);
    console.log(`   Data:`, testCase.data);
    
    let match = null;
    
    // Priority: Extension > IDE > Model > Provider
    if (isValid(testCase.data.extension)) {
      match = findMatch(testCase.data.extension, "extension");
      if (match) console.log(`   ✅ Found extension match: ${testCase.data.extension}`);
    }
    
    if (!match && isValid(testCase.data.ide)) {
      match = findMatch(testCase.data.ide, "ide");
      if (match) console.log(`   ✅ Found IDE match: ${testCase.data.ide}`);
    }
    
    if (!match && isValid(testCase.data.model)) {
      match = findMatch(testCase.data.model, "model");
      if (match) console.log(`   ✅ Found model match: ${testCase.data.model}`);
    }
    
    if (match) {
      const contextFile = buildPath(match);
      console.log(`   📁 Resolved path: ${contextFile}`);
      console.log(`   📄 Update AGENTS.md: ${match.agentsMD}`);
      
      if (contextFile === testCase.expected && match.agentsMD === testCase.expectedAgentsMD) {
        console.log(`   🎉 ✅ PASSED!`);
      } else {
        console.log(`   ❌ FAILED!`);
        console.log(`      Expected: ${testCase.expected} (AGENTS.md: ${testCase.expectedAgentsMD})`);
        console.log(`      Got: ${contextFile} (AGENTS.md: ${match.agentsMD})`);
      }
    } else {
      console.log(`   ❌ No match found`);
    }
  }
}

testPathResolution().catch(console.error);