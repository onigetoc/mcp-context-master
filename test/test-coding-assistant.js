import { handleCodingAssistantTool } from '../build/tools/coding-assistant.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

function determineExpectedFile(realJson) {
  if (!realJson || typeof realJson !== 'object') return 'AGENTS.md';

  // Helper function to check if value is valid (not empty, not "unknown")
  const isValid = (val) => val && val.trim() !== "" && val.trim().toLowerCase() !== "unknown";

  // Mapping robuste avec includes (même logique que le tool principal)
  const contextMappings = [
    // Extensions (priorité 1)
    { keys: ["roo code", "roo-code", "roo"], ruleFile: "ROO.md", type: "extension" },
    { keys: ["cline"], ruleFile: ".clinerules", type: "extension" },
    { keys: ["kilo code", "kilo-code", "kilocode"], ruleFile: "KILOCODE.md", type: "extension" },
    { keys: ["github copilot", "copilot"], ruleFile: ".github/copilot-instructions.md", type: "extension" },
    { keys: ["claude code"], ruleFile: "CLAUDE.md", type: "extension" },
    { keys: ["gemini cli"], ruleFile: "GEMINI.md", type: "extension" },
    { keys: ["warp"], ruleFile: "WARP.md", type: "extension" },
    { keys: ["windsurf"], ruleFile: "WINDSURF.md", type: "extension" },
    { keys: ["auggie"], ruleFile: "AUGMENT.md", type: "extension" },
    { keys: ["opencode"], ruleFile: "OPENCODE.md", type: "extension" },
    { keys: ["codex"], ruleFile: "CODEX.md", type: "extension" },
    
    // IDEs (priorité 2)
    { keys: ["cursor"], ruleFile: ".cursorrules", type: "ide" },
    { keys: ["vs code", "vscode", "visual studio code"], ruleFile: "VSCODE.md", type: "ide" },
    { keys: ["kiro"], ruleFile: "kiro/steering/context-master-instructions.md", type: "ide" },
    { keys: ["zed"], ruleFile: "ZED.md", type: "ide" },
    
    // Models (priorité 3)
    { keys: ["gemini"], ruleFile: "GEMINI.md", type: "model" },
    { keys: ["claude"], ruleFile: "CLAUDE.md", type: "model" },
    { keys: ["gpt"], ruleFile: "OPENAI.md", type: "model" },
    { keys: ["copilot"], ruleFile: "copilot-instructions.md", type: "model" },
    { keys: ["qwen"], ruleFile: "QWEN.md", type: "model" },
    
    // Providers (priorité 4)
    { keys: ["google"], ruleFile: "GEMINI.md", type: "provider" },
    { keys: ["anthropic"], ruleFile: "CLAUDE.md", type: "provider" },
    { keys: ["openai"], ruleFile: "OPENAI.md", type: "provider" },
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
    if (match) return match.ruleFile;
  }

  // Priorité 2: IDE
  if (isValid(realJson.ide)) {
    const match = findMatch(realJson.ide, "ide");
    if (match) return match.ruleFile;
  }

  // Priorité 3: Model
  if (isValid(realJson.model)) {
    const match = findMatch(realJson.model, "model");
    if (match) return match.ruleFile;
  }

  // Priorité 4: Provider
  if (isValid(realJson.provider)) {
    const match = findMatch(realJson.provider, "provider");
    if (match) return match.ruleFile;
  }

  return 'AGENTS.md';
}

async function runTest() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '..');
  const yamlPath = path.join(projectRoot, '.context-master', 'cm-ai-infos.yaml');
  const jsonPath = path.join(projectRoot, '.context-master', 'ai-infos.json');

  try {
    console.log('--- Starting Coding Assistant Tool Test ---');

    let realJson;
    let fileType;

    // Check for YAML file first (priority)
    if (await fs.pathExists(yamlPath)) {
      const raw = await fs.readFile(yamlPath, 'utf8');
      realJson = yaml.load(raw);
      fileType = 'YAML';
      console.log('cm-ai-infos.yaml:', JSON.stringify(realJson, null, 2));
    } else if (await fs.pathExists(jsonPath)) {
      const raw = await fs.readFile(jsonPath, 'utf8');
      realJson = JSON.parse(raw);
      fileType = 'JSON';
      console.log('ai-infos.json:', JSON.stringify(realJson, null, 2));
    } else {
      console.error('ERROR: No configuration file found. Expected cm-ai-infos.yaml or ai-infos.json in .context-master/');
      return;
    }

    console.log(`Configuration loaded from ${fileType}`);

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
      console.error('ERROR: Configuration file not found. Create cm-ai-infos.yaml or ai-infos.json in .context-master/');
    } else {
      console.error('Test failed with error:', err && err.message ? err.message : err);
    }
  }
}

runTest();
