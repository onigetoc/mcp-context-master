import { handleCodingAssistantTool } from '../build/tools/coding-assistant.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

function determineExpectedFile(realJson) {
  if (!realJson || typeof realJson !== 'object') return '.DEFAULT.md';

  // 1. Check Extension
  if (realJson.extension && realJson.extension !== 'unknown') {
    if (realJson.extension === 'Roo Code') return '.roorules';
    if (realJson.extension === 'Cline') return '.clinerules';
    if (realJson.extension === 'Claude Code') return '.CLAUDE.md';
  }

  // 2. Check IDE
  if (realJson.ide) {
    if (realJson.ide === 'Cursor') return '.CURSOR.md';
    if (realJson.ide === 'VS Code') return '.VSCODE.md';
  }

  // 3. Check Model/Provider
  if (realJson.model) {
    const model = String(realJson.model).toLowerCase();
    if (model.includes('claude')) return '.CLAUDE.md';
    if (model.includes('gemini')) return '.GEMINI.md';
  }
  if (realJson.provider) {
    if (realJson.provider === 'Anthropic') return '.CLAUDE.md';
    if (realJson.provider === 'Google') return '.GEMINI.md';
  }

  return '.DEFAULT.md';
}

async function runTest() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '..');
  const aiInfoPath = path.join(projectRoot, '.agents', 'ai-infos.json');

  try {
    console.log('--- Starting Coding Assistant Tool Test ---');

    // Ensure file exists
    const exists = await fs.pathExists(aiInfoPath);
    if (!exists) {
      console.error('ERROR: .agents/ai-infos.json not found. Create it or run a generator tool.');
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
      console.error('ERROR: .agents/ai-infos.json not found. Create it or run a generator tool.');
    } else {
      console.error('Test failed with error:', err && err.message ? err.message : err);
    }
  }
}

runTest();
