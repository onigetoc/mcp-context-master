#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleSetupProjectContextTool } from '../build/tools/setup.tool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testAiInfosPreservation() {
    console.log('🧪 Testing ai-infos.json preservation during setup...\n');
    
    const testProjectDir = path.join(__dirname, 'test-preserve-ai-infos');
    const contextMasterDir = path.join(testProjectDir, '.context-master');
    const aiInfosPath = path.join(contextMasterDir, 'ai-infos.json');
    
    try {
        // 1. Create test project directory
        await fs.ensureDir(testProjectDir);
        console.log('✅ Created test project directory');
        
        // 2. Create a package.json to make it look like a real project
        const packageJson = {
            name: "test-preserve-project",
            version: "1.0.0",
            dependencies: {
                "react": "^18.0.0",
                "axios": "^1.0.0"
            }
        };
        await fs.writeJson(path.join(testProjectDir, 'package.json'), packageJson, { spaces: 2 });
        console.log('✅ Created package.json');
        
        // 3. Run setup first time (should create ai-infos.json)
        console.log('\n🔧 Running first setup (should create ai-infos.json)...');
        const firstRequest = {
            params: {
                arguments: {
                    projectPath: testProjectDir
                }
            }
        };
        
        const firstResult = await handleSetupProjectContextTool(firstRequest);
        console.log('✅ First setup completed');
        
        // 4. Verify ai-infos.json was created
        const exists = await fs.pathExists(aiInfosPath);
        if (!exists) {
            throw new Error('ai-infos.json was not created during first setup');
        }
        console.log('✅ ai-infos.json was created');
        
        // 5. Modify ai-infos.json with custom values
        const customAiInfos = {
            provider: "GitHub",
            model: "GitHub Copilot",
            ide: "VS Code",
            extension: "GitHub Copilot"
        };
        await fs.writeJson(aiInfosPath, customAiInfos, { spaces: 2 });
        console.log('✅ Modified ai-infos.json with custom values');
        console.log('   Custom values:', JSON.stringify(customAiInfos, null, 2));
        
        // 6. Run setup second time (should preserve existing ai-infos.json)
        console.log('\n🔧 Running second setup (should preserve ai-infos.json)...');
        const secondResult = await handleSetupProjectContextTool(firstRequest);
        console.log('✅ Second setup completed');
        
        // 7. Verify ai-infos.json was preserved
        const preservedAiInfos = await fs.readJson(aiInfosPath);
        console.log('📄 ai-infos.json after second setup:', JSON.stringify(preservedAiInfos, null, 2));
        
        // 8. Check if values were preserved
        const valuesPreserved = 
            preservedAiInfos.provider === customAiInfos.provider &&
            preservedAiInfos.model === customAiInfos.model &&
            preservedAiInfos.ide === customAiInfos.ide &&
            preservedAiInfos.extension === customAiInfos.extension;
        
        if (valuesPreserved) {
            console.log('✅ SUCCESS: ai-infos.json values were preserved!');
        } else {
            console.log('❌ FAILURE: ai-infos.json values were overwritten');
            console.log('Expected:', customAiInfos);
            console.log('Got:', preservedAiInfos);
        }
        
        // 9. Check setup logs
        const setupLogs = secondResult.content[0].text;
        const preservationLogged = setupLogs.includes('already exists, preserving existing configuration');
        
        if (preservationLogged) {
            console.log('✅ SUCCESS: Setup logs confirm preservation');
        } else {
            console.log('❌ FAILURE: Setup logs do not mention preservation');
            console.log('Setup logs preview:', setupLogs.substring(0, 500) + '...');
        }
        
        console.log('\n📋 Test Summary:');
        console.log(`   Values preserved: ${valuesPreserved ? '✅' : '❌'}`);
        console.log(`   Preservation logged: ${preservationLogged ? '✅' : '❌'}`);
        
        if (valuesPreserved && preservationLogged) {
            console.log('\n🎉 ALL TESTS PASSED! ai-infos.json preservation works correctly.');
        } else {
            console.log('\n❌ SOME TESTS FAILED! Check the logs above.');
        }
        
    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        // Cleanup
        try {
            await fs.remove(testProjectDir);
            console.log('\n🧹 Cleaned up test directory');
        } catch (cleanupError) {
            console.warn('⚠️ Failed to cleanup test directory:', cleanupError.message);
        }
    }
}

testAiInfosPreservation();