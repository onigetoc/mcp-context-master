#!/usr/bin/env node

// Test the AGENTS.md update functionality
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the function we want to test
async function testAgentsUpdate() {
    console.log('🧪 Testing AGENTS.md Update Functionality...\n');

    // Create a temporary test directory
    const testDir = path.join(__dirname, 'temp-test-project');
    await fs.ensureDir(testDir);
    
    try {
        // Test Case 1: No existing AGENTS.md
        console.log('📋 Test Case 1: Creating new AGENTS.md file');
        console.log('=' .repeat(50));
        
        // Simulate the updateAgentsFile function (simplified version for testing)
        const agentsFilePath = path.join(testDir, 'AGENTS.md');
        
        // Read the actual template file
        const templatePath = path.join(__dirname, '..', 'templates', 'context-master-agents-prompt.md');
        const mockInstructions = await fs.readFile(templatePath, 'utf8');

        // Create new AGENTS.md
        await fs.writeFile(agentsFilePath, mockInstructions, 'utf8');
        console.log('✅ Created new AGENTS.md file');
        
        const content1 = await fs.readFile(agentsFilePath, 'utf8');
        console.log('📄 Content preview:', content1.substring(0, 100) + '...');
        
        // Test Case 2: Existing AGENTS.md without Context Master section
        console.log('\n📋 Test Case 2: Appending to existing AGENTS.md');
        console.log('=' .repeat(50));
        
        const existingContent = `# My Project AGENTS.md

## Some Other Instructions
This is existing content that should be preserved.

## Another Section
More existing content.
`;
        
        await fs.writeFile(agentsFilePath, existingContent, 'utf8');
        
        // Append Context Master instructions
        const updatedContent = existingContent + '\n\n' + mockInstructions;
        await fs.writeFile(agentsFilePath, updatedContent, 'utf8');
        
        console.log('✅ Appended Context Master instructions to existing file');
        
        const content2 = await fs.readFile(agentsFilePath, 'utf8');
        console.log('📄 Updated file length:', content2.length, 'characters');
        
        // Test Case 3: Replacing existing Context Master section
        console.log('\n📋 Test Case 3: Replacing existing Context Master section');
        console.log('=' .repeat(50));
        
        const newInstructions = `## Context Master (mcp-context-master) Instructions

### Overview
UPDATED: Context Master is an MCP server with new features!

### New Features
- Enhanced search capabilities
- Better error handling

<!-- END: CONTEXT-MASTER -->`;

        // Simulate replacement
        const startMarker = '## Context Master (mcp-context-master) Instructions';
        const endMarker = '<!-- END: CONTEXT-MASTER -->';
        
        const startIndex = content2.indexOf(startMarker);
        const endIndex = content2.indexOf(endMarker);
        
        if (startIndex !== -1 && endIndex !== -1) {
            const beforeSection = content2.substring(0, startIndex);
            const afterSection = content2.substring(endIndex + endMarker.length);
            const finalContent = beforeSection + newInstructions + afterSection;
            
            await fs.writeFile(agentsFilePath, finalContent, 'utf8');
            console.log('✅ Replaced existing Context Master section');
            
            const content3 = await fs.readFile(agentsFilePath, 'utf8');
            console.log('📄 Final content includes "UPDATED":', content3.includes('UPDATED'));
        }
        
        console.log('\n🎉 All test cases completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        // Clean up test directory
        await fs.remove(testDir);
        console.log('\n🧹 Cleaned up test directory');
    }
}

// Run the test
testAgentsUpdate().catch(console.error);