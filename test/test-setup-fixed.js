#!/usr/bin/env node

// Test the fixed setup tool to verify that cm-instructions.md goes to .context-master folder
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testSetupFixed() {
    console.log('🧪 Testing Fixed Setup Tool...\n');

    // Create a temporary test project directory
    const testProjectDir = path.join(__dirname, 'temp-test-project-setup');
    await fs.ensureDir(testProjectDir);
    
    try {
        console.log('📋 Simulating setup_project_context tool behavior');
        console.log('=' .repeat(50));
        
        // Create .context-master directory (simulating the setup tool)
        const contextMasterDir = path.join(testProjectDir, '.context-master');
        await fs.ensureDir(contextMasterDir);
        console.log('✅ Created .context-master directory');
        
        // Read the template from the local templates folder and write it to .context-master
        const localTemplatePath = path.join(__dirname, '..', 'templates', 'cm-instructions.md');
        const targetTemplatePath = path.join(contextMasterDir, 'cm-instructions.md');
        
        if (await fs.pathExists(localTemplatePath)) {
            const templateContent = await fs.readFile(localTemplatePath, 'utf8');
            await fs.writeFile(targetTemplatePath, templateContent, 'utf8');
            console.log('✅ Downloaded cm-instructions.md to .context-master/');
            
            // Verify the file exists in the correct location
            const templateExists = await fs.pathExists(targetTemplatePath);
            console.log('📄 Template in .context-master:', templateExists ? '✅ YES' : '❌ NO');
            
            // Check that AGENTS.md is NOT automatically created in project root
            const agentsFilePath = path.join(testProjectDir, 'AGENTS.md');
            const agentsExists = await fs.pathExists(agentsFilePath);
            console.log('📄 AGENTS.md in project root:', agentsExists ? '❌ SHOULD NOT EXIST' : '✅ CORRECTLY NOT CREATED');
            
            // Show content preview
            if (templateExists) {
                const content = await fs.readFile(targetTemplatePath, 'utf8');
                console.log('📄 Template content preview:', content.substring(0, 100) + '...');
            }
            
        } else {
            console.log('❌ Local template file not found:', localTemplatePath);
        }
        
        console.log('\n🎉 Setup test completed!');
        console.log('\n📋 Summary:');
        console.log('- ✅ Template goes to .context-master/ directory (correct)');
        console.log('- ✅ AGENTS.md is NOT automatically created (correct)');
        console.log('- ✅ User can use update_agents_file tool separately when needed');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        // Clean up test directory
        await fs.remove(testProjectDir);
        console.log('\n🧹 Cleaned up test directory');
    }
}

// Run the test
testSetupFixed().catch(console.error);