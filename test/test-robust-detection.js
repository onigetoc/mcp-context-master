import { handleCodingAssistantTool } from '../build/tools/coding-assistant.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Test cases avec différentes variations
const testCases = [
  {
    name: "Kiro exact",
    data: { provider: "Anthropic", model: "claude", ide: "Kiro", extension: "unknown" },
    expected: ".kiro/steering"
  },
  {
    name: "Kiro AI Assistant extension",
    data: { provider: "Anthropic", model: "claude", ide: "VS Code", extension: "Kiro AI Assistant" },
    expected: ".kiro/steering" // Should match on extension containing "kiro"
  },
  {
    name: "VS Code variations",
    data: { provider: "Microsoft", model: "gpt-4", ide: "Visual Studio Code", extension: "GitHub Copilot" },
    expected: ".COPILOT.md" // Extension priority over IDE
  },
  {
    name: "Cursor IDE",
    data: { provider: "Anthropic", model: "claude", ide: "cursor", extension: "unknown" },
    expected: ".CURSOR.md"
  },
  {
    name: "Gemini model fallback",
    data: { provider: "Google", model: "gemini-pro", ide: "unknown", extension: "unknown" },
    expected: ".GEMINI.md"
  },
  {
    name: "Provider fallback only",
    data: { provider: "OpenAI", model: "unknown", ide: "unknown", extension: "unknown" },
    expected: ".OPENAI.md"
  }
];

async function runRobustnessTest() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '..');
  const aiInfoPath = path.join(projectRoot, '.context-master', 'ai-infos.json');
  
  console.log('🧪 Testing Robust AI Assistant Detection\n');
  
  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    try {
      // Write test data
      await fs.writeFile(aiInfoPath, JSON.stringify(testCase.data, null, 2));
      
      // Execute tool
      const result = await handleCodingAssistantTool({});
      const resultText = result.content[0].text;
      
      // Check result
      const success = resultText.includes(testCase.expected);
      
      console.log(`${success ? '✅' : '❌'} ${testCase.name}`);
      console.log(`   Data: ${JSON.stringify(testCase.data)}`);
      console.log(`   Expected: ${testCase.expected}`);
      console.log(`   Got: ${resultText}`);
      console.log('');
      
      if (success) {
        passed++;
      } else {
        failed++;
      }
      
    } catch (error) {
      console.log(`❌ ${testCase.name} - ERROR: ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  
  // Restore original ai-infos.json
  const originalData = {
    "provider": "Anthropic",
    "model": "claude-3-5-sonnet-20241022", 
    "ide": "Kiro",
    "extension": "Kiro AI Assistant"
  };
  await fs.writeFile(aiInfoPath, JSON.stringify(originalData, null, 2));
}

runRobustnessTest();