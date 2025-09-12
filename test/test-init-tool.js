
import { handleInitTool } from '../build/tools/init-tool.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock the console.log to capture its output
let consoleOutput = [];
const originalLog = console.log;
console.log = (output) => {
  consoleOutput.push(output);
  originalLog(output);
};

async function runTest() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '..');
  
  // Define paths for cleanup
  const agentsFilePath = path.join(projectRoot, 'AGENTS.md');
  const agentsDirPath = path.join(projectRoot, '.agents');
  const cmInitFilePath = path.join(agentsDirPath, 'cm-init.md');

  try {
    console.log('--- Starting Init Tool Test ---');

    // 1. Clean up before the test
    console.log('Cleaning up previous test artifacts...');
    await fs.remove(agentsFilePath);
    await fs.remove(agentsDirPath);
    console.log('Cleanup complete.');

    // 2. Run the tool handler
    console.log('Executing handleInitTool...');
    const result = await handleInitTool({});
    console.log('Execution finished.');

    // 3. Assertions
    console.log('--- Verifying Results ---');

    // Check if AGENTS.md was created
    if (await fs.pathExists(agentsFilePath)) {
      console.log('✅ SUCCESS: AGENTS.md was created.');
    } else {
      console.error('❌ FAILURE: AGENTS.md was NOT created.');
    }

    // Check if .agents directory was created
    if (await fs.pathExists(agentsDirPath)) {
      console.log('✅ SUCCESS: .agents directory was created.');
    } else {
      console.error('❌ FAILURE: .agents directory was NOT created.');
    }

    // Check if cm-init.md was created inside .agents
    if (await fs.pathExists(cmInitFilePath)) {
      console.log('✅ SUCCESS: .agents/cm-init.md was created.');
    } else {
      console.error('❌ FAILURE: .agents/cm-init.md was NOT created.');
    }
    
    // Check console output for OS info
    const osInfoLogged = consoleOutput.some(line => line.includes('Operating System:'));
    if (osInfoLogged) {
        console.log('✅ SUCCESS: OS info was logged to the console.');
    } else {
        console.error('❌ FAILURE: OS info was NOT logged to the console.');
    }

    // Check the tool's response text
    const responseText = result.content[0].text;
    if (responseText.includes('Operating System:')) {
        console.log('✅ SUCCESS: OS info is present in the tool response.');
    } else {
        console.error('❌ FAILURE: OS info is NOT present in the tool response.');
    }

    console.log('--- Test Complete ---');

  } catch (error) {
    console.error('Test failed with an error:', error);
  } finally {
    // Restore original console.log
    console.log = originalLog;
  }
}

runTest();
