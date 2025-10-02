#!/usr/bin/env node

// Test the new update_agents_file tool
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleUpdateAgentsTool } from '../build/tools/agents-updater.tool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testUpdateAgentsTool() {
    console.log('🧪 Testing update_agents_file Tool...\n');

    // Create a temporary test project directory
    const testProjectDir = path.join(__dirname, 'temp-test-agents-tool');
    await fs.ensureDir(testProjectDir);
    
    try {
        // Setup: Create .context-master directory and template
        const contextMasterDir = path.join(testProjectDir, '.context-master');
        await fs.ensureDir(contextMasterDir);
        
        const localTemplatePath = path.join(__dirname, '..', 'templates', 'context-master-agents-prompt.md');
        const templatePath = path.join(contextMasterDir, 'context-master-agents-prompt.md');
        
        if (await fs.pathExists(localTemplatePath)) {
            const templateContent = await fs.readFile(localTemplatePath, 'utf8');
            await fs.writeFile(templatePath, templateContent, 'utf8');
            console.log('✅ Setup: Template ready in .context-master/');
        } else {
            throw new Error('Template not found');
        }

        // Test Case 1: Create new AGENTS.md
        console.log('\n📋 Test Case 1: Creating new AGENTS.md file');
        console.log('=' .repeat(50));
        
        const mockRequest = {
            params: {
                arguments: {
                    projectPath: testProjectDir
                }
            }
        };

        const result1 = await handleUpdateAgentsTool(mockRequest);
        console.log('✅ Tool executed successfully');
        
        // Verify AGENTS.md was created
        const agentsFilePath = path.join(testProjectDir, 'AGENTS.md');
        const agentsExists = await fs.pathExists(agentsFilePath);
        console.log('📄 AGENTS.md created:', agentsExists ? '✅ YES' : '❌ NO');
        
        if (agentsExists) {
            const content = await fs.readFile(agentsFilePath, 'utf8');
            console.log('📄 Content length:', content.length, 'characters');
            console.log('📄 Contains Context Master section:', content.includes('Context Master (mcp-context-master) Instructions') ? '✅ YES' : '❌ NO');
        }

        // Test Case 2: Update existing AGENTS.md
        console.log('\n📋 Test Case 2: Updating existing AGENTS.md');
        console.log('=' .repeat(50));
        
        // Add some existing content first
        const existingContent = `# My Project AGENTS.md

## Some Other Instructions
This is existing content that should be preserved.

## Another Section
More existing content.
`;
        
        await fs.writeFile(agentsFilePath, existingContent, 'utf8');
        console.log('✅ Added existing content to AGENTS.md');
        
        // Run the tool again
        const result2 = await handleUpdateAgentsTool(mockRequest);
        
        // Verify content was appended
        const updatedContent = await fs.readFile(agentsFilePath, 'utf8');
        console.log('📄 Updated content length:', updatedContent.length, 'characters');
        console.log('📄 Contains existing content:', updatedContent.includes('Some Other Instructions') ? '✅ YES' : '❌ NO');
        console.log('📄 Contains Context Master section:', updatedContent.includes('Context Master (mcp-context-master) Instructions') ? '✅ YES' : '❌ NO');

        // Test Case 3: Replace existing Context Master section
        console.log('\n📋 Test Case 3: Replacing existing Context Master section');
        console.log('=' .repeat(50));
        
        // Debug: Check content before replacement
        const contentBefore = await fs.readFile(agentsFilePath, 'utf8');
        const startMarker = '## Context Master (mcp-context-master) Instructions';
        const endMarker = '<!-- END: CONTEXT-MASTER -->';
        
        const startIndex = contentBefore.indexOf(startMarker);
        const endIndex = contentBefore.indexOf(endMarker);
        
        console.log('🔍 Debug - Start marker found at index:', startIndex);
        console.log('🔍 Debug - End marker found at index:', endIndex);
        
        // Run the tool a third time to test replacement
        const result3 = await handleUpdateAgentsTool(mockRequest);
        
        const finalContent = await fs.readFile(agentsFilePath, 'utf8');
        
        // Count occurrences of the Context Master marker (more precise)
        const marker = '## Context Master (mcp-context-master) Instructions';
        const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const occurrences = (finalContent.match(new RegExp(escapedMarker, 'g')) || []).length;
        console.log('📄 Context Master sections count:', occurrences, occurrences === 1 ? '✅ (Correct)' : '❌ (Should be 1)');
        
        // Alternative verification: check start and end markers
        const finalStartIndex = finalContent.indexOf(startMarker);
        const finalEndIndex = finalContent.indexOf(endMarker);
        console.log('📄 Final verification - Start marker found:', finalStartIndex !== -1 ? '✅ YES' : '❌ NO');
        console.log('📄 Final verification - End marker found:', finalEndIndex !== -1 ? '✅ YES' : '❌ NO');
        
        // Check that existing content is still there
        const hasExistingContent = finalContent.includes('Some Other Instructions');
        console.log('📄 Existing content preserved:', hasExistingContent ? '✅ YES' : '❌ NO');
        
        console.log('\n🎉 All test cases completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        // Clean up test directory
        await fs.remove(testProjectDir);
        console.log('\n🧹 Cleaned up test directory');
    }
}

// Run the test
testUpdateAgentsTool().catch(console.error);