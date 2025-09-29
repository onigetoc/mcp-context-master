import { handleCodingAssistantTool } from '../build/tools/coding-assistant.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

function determineExpectedFile(realJson) {
  if (!realJson || typeof realJson !== 'object') return 'AGENTS.md';

  // Helper function to check if value is valid (not empty, not "unknown")
  const isValid = (val) => val && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";

  // Mapping robuste avec includes (même logique que le tool principal)
  const contextMappings = [
    // Extensions (priorité 1)
    { keys: ["roo code", "roo-code", "roo"], file: ".roo/", type: "extension" },
    { keys: ["cline"], file: ".clinerules", type: "extension" },
    { keys: ["kilo code", "kilo-code", "kilocode"], file: ".kilocode/", type: "extension" },
    { keys: ["github copilot", "copilot"], file: ".github/", type: "extension" },
    { keys: ["claude code"], file: ".claude/", type: "extension" },
    { keys: ["gemini cli"], file: ".gemini/", type: "extension" },
    { keys: ["warp"], file: ".WARP.md", type: "extension" },
    { keys: ["windsurf"], file: ".windsurf/", type: "extension" },
    { keys: ["auggie"], file: ".augment/", type: "extension" },
    { keys: ["opencode"], file: ".opencode/", type: "extension" },
    { keys: ["codex"], file: ".codex/", type: "extension" },
    
    // IDEs (priorité 2)
    { keys: ["cursor"], file: ".cursor/", type: "ide" },
    { keys: ["vs code", "vscode", "visual studio code"], file: ".VSCODE.md", type: "ide" },
    { keys: ["kiro"], file: ".kiro/steering", type: "ide" },
    { keys: ["zed"], file: ".ZED.md", type: "ide" },
    
    // Models (priorité 3)
    { keys: ["gemini"], file: ".gemini/", type: "model" },
    { keys: ["claude"], file: ".claude/", type: "model" },
    { keys: ["gpt"], file: ".OPENAI.md", type: "model" },
    { keys: ["copilot"], file: ".github/", type: "model" },
    { keys: ["qwen"], file: ".qwen/", type: "model" },
    
    // Providers (priorité 4)
    { keys: ["google"], file: ".gemini/", type: "provider" },
    { keys: ["anthropic"], file: ".claude/", type: "provider" },
    { keys: ["openai"], file: ".OPENAI.md", type: "provider" },
  ];
  
  // Helper pour vérifier si une valeur contient une des clés
  const findMatch = (value, type) => {
    const lowerValue = value.toLowerCase();
    return contextMappings.find(mapping => 
      mapping.type === type && 
      mapping.keys.some(key => lowerValue.includes(key))
    );
  };

  // Priorité 1: Extension
  if (isValid(realJson.extension)) {
    const match = findMatch(realJson.extension, "extension");
    if (match) return match.file;
  }

  // Priorité 2: IDE
  if (isValid(realJson.ide)) {
    const match = findMatch(realJson.ide, "ide");
    if (match) return match.file;
  }

  // Priorité 3: Model
  if (isValid(realJson.model)) {
    const match = findMatch(realJson.model, "model");
    if (match) return match.file;
  }

  // Priorité 4: Provider
  if (isValid(realJson.provider)) {
    const match = findMatch(realJson.provider, "provider");
    if (match) return match.file;
  }

  return 'AGENTS.md';
}

async function runTest() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '..');
  const aiInfoPath = path.join(projectRoot, '.context-master', 'ai-infos.json');

  try {
    console.log('--- Starting Coding Assistant Tool Test ---');

    // Ensure file exists
    const exists = await fs.pathExists(aiInfoPath);
    if (!exists) {
      console.error('ERROR: .context-master/ai-infos.json not found. Create it or run a generator tool.');
      return;
    }

    // Read and parse ai-infos.json
    const raw = await fs.readFile(aiInfoPath, 'utf8');
    const realJson = JSON.parse(raw);
    console.log('ai-infos.json:', JSON.stringify(realJson, null, 2));

    const expectedFile = determineExpectedFile(realJson);
    console.log('Expected marker:', expectedFile);

    // Execute tool
    const result = await handleCodingAssistantTool({});

    // Safe extraction of text
    let resultText = '';
    if (result && Array.isArray(result.content) && result.content[0] && typeof result.content[0].text === 'string') {
      resultText = result.content[0].text;
    } else if (typeof result === 'string') {
      resultText = result;
    } else {
      resultText = JSON.stringify(result);
      console.warn('Warning: unexpected tool result structure; dumping JSON.');
    }

    console.log('Tool result:', resultText);

    // Compare
    if (resultText.includes(expectedFile)) {
      console.log(`✅ SUCCESS: Tool correctly identified ${expectedFile}`);
    } else {
      console.log(`❌ FAILURE: Expected ${expectedFile} but tool returned different result`);
    }

    // Debug info
    console.log('\n--- Debug Information ---');
    console.log('Provider:', realJson.provider);
    console.log('Model:', realJson.model);
    console.log('IDE:', realJson.ide);
    console.log('Extension:', realJson.extension);

  } catch (err) {
    if (err && err.code === 'ENOENT') {
      console.error('ERROR: .context-master/ai-infos.json not found. Create it or run a generator tool.');
    } else {
      console.error('Test failed with error:', err && err.message ? err.message : err);
    }
  }
}

runTest();
