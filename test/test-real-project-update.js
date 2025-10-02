#!/usr/bin/env node

// Test the update_agents_file tool on the REAL mcp-context-master project
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleUpdateAgentsTool } from '../build/tools/agents-updater.tool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testRealProject() {
    console.log('🧪 Testing update_agents_file on REAL mcp-context-master project...\n');

    const realProjectPath = path.join(__dirname, '..');
    const agentsFilePath = path.join(realProjectPath, 'AGENTS.md');
    
    try {
        // Check if AGENTS.md exists and get initial state
        const initialExists = await fs.pathExists(agentsFilePath);
        let initialLineCount = 0;
        let initialHasContextMaster = false;
        
        if (initialExists) {
            const initialContent = await fs.readFile(agentsFilePath, 'utf8');
            initialLineCount = initialContent.split('\n').length;
            initialHasContextMaster = initialContent.includes('## Context Master (mcp-context-master) Instructions');
        }
        
        console.log('📋 Initial state:');
        console.log('- AGENTS.md exists:', initialExists ? '✅' : '❌');
        console.log('- Initial line count:', initialLineCount);
        console.log('- Has Context Master section:', initialHasContextMaster ? '✅' : '❌');
        
        // Check if .context-master directory and template exist
        const contextMasterDir = path.join(realProjectPath, '.context-master');
        const templatePath = path.join(contextMasterDir, 'context-master-agents-prompt.md');
        
        const contextDirExists = await fs.pathExists(contextMasterDir);
        const templateExists = await fs.pathExists(templatePath);
        
        console.log('\n📋 Prerequisites:');
        console.log('- .context-master directory exists:', contextDirExists ? '✅' : '❌');
        console.log('- Template exists:', templateExists ? '✅' : '❌');
        
        if (!templateExists) {
            console.log('\n❌ Cannot run test: Template not found');
            console.log('💡 Run setup_project_context first to create the template');
            return;
        }
        
        // Run the update_agents_file tool on the real project
        console.log('\n📋 Running update_agents_file tool...');
        console.log('=' .repeat(50));
        
        const mockRequest = {
            params: {
                arguments: {
                    projectPath: realProjectPath
                }
            }
        };

        const result = await handleUpdateAgentsTool(mockRequest);
        console.log('✅ Tool executed successfully');
        
        // Check the result
        const finalExists = await fs.pathExists(agentsFilePath);
        let finalLineCount = 0;
        let finalHasContextMaster = false;
        
        if (finalExists) {
            const finalContent = await fs.readFile(agentsFilePath, 'utf8');
            finalLineCount = finalContent.split('\n').length;
            finalHasContextMaster = finalContent.includes('## Context Master (mcp-context-master) Instructions');
        }
        
        console.log('\n📋 Final state:');
        console.log('- AGENTS.md exists:', finalExists ? '✅' : '❌');
        console.log('- Final line count:', finalLineCount);
        console.log('- Has Context Master section:', finalHasContextMaster ? '✅' : '❌');
        console.log('- Line count change:', finalLineCount - initialLineCount);
        
        console.log('\n🎉 Real project test completed!');
        
        if (finalHasContextMaster && !initialHasContextMaster) {
            console.log('✅ SUCCESS: Context Master section was added to the real AGENTS.md');
        } else if (finalHasContextMaster && initialHasContextMaster) {
            console.log('✅ SUCCESS: Context Master section was updated in the real AGENTS.md');
        } else {
            console.log('❌ ISSUE: Context Master section not found after update');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack:', error.stack);
    }
}

// Run the test
testRealProject().catch(console.error);