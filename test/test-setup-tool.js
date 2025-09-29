#!/usr/bin/env node

// Test script for setup_project_context tool
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleSetupProjectContextTool } from '../build/tools/setup.tool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing setup_project_context tool\n');

async function testSetupTool() {
    const projectRoot = path.resolve(__dirname, '..');
    const testProjectPath = path.join(projectRoot, 'test-project-temp');

    try {
        // 1. Create a temporary test project
        console.log('📁 Creating temporary test project...');
        await fs.ensureDir(testProjectPath);

        // Create a mock package.json
        const mockPackageJson = {
            name: "test-project",
            version: "1.0.0",
            dependencies: {
                "react": "^18.0.0",
                "next": "^14.0.0",
                "tailwindcss": "^3.0.0"
            },
            devDependencies: {
                "typescript": "^5.0.0",
                "@types/react": "^18.0.0"
            }
        };

        await fs.writeFile(
            path.join(testProjectPath, 'package.json'),
            JSON.stringify(mockPackageJson, null, 2)
        );
        console.log('✅ Created mock package.json with dependencies');

        // 2. Test the setup tool
        console.log('\n🚀 Testing setup_project_context tool...');

        const mockRequest = {
            params: {
                arguments: {
                    projectPath: testProjectPath,
                    maxDependencies: 3
                }
            }
        };

        const result = await handleSetupProjectContextTool(mockRequest);

        // 3. Verify results
        console.log('\n📋 Setup tool result:');
        console.log(result.content[0].text);

        // 4. Verify created structure
        console.log('\n🔍 Verifying created structure...');

        const contextMasterDir = path.join(testProjectPath, '.context-master');
        const contextDir = path.join(contextMasterDir, 'context');
        const commandsDir = path.join(contextMasterDir, 'commands');

        // Check directories
        const checks = [
            { path: contextMasterDir, name: '.context-master directory' },
            { path: contextDir, name: 'context directory' },
            { path: commandsDir, name: 'commands directory' },
            { path: path.join(contextMasterDir, 'ai-infos.json'), name: 'ai-infos.json' },
            { path: path.join(contextMasterDir, 'cm-init.md'), name: 'cm-init.md template' },
            { path: path.join(contextMasterDir, 'cm-analyze.md'), name: 'cm-analyze.md template' },
            { path: path.join(contextMasterDir, 'cm-status.md'), name: 'cm-status.md template' },
            { path: path.join(commandsDir, 'cm-commands.md'), name: 'cm-commands.md' },
            { path: path.join(commandsDir, 'command-dispatcher.md'), name: 'command-dispatcher.md' },
            { path: path.join(contextDir, 'context-manifest.yaml'), name: 'context-manifest.yaml' }
        ];

        let allPassed = true;
        for (const check of checks) {
            const exists = await fs.pathExists(check.path);
            if (exists) {
                console.log(`✅ ${check.name} created successfully`);
            } else {
                console.log(`❌ ${check.name} NOT found`);
                allPassed = false;
            }
        }

        // 5. Check file contents
        console.log('\n📄 Checking file contents...');

        // Check ai-infos.json
        try {
            const aiInfos = await fs.readJson(path.join(contextMasterDir, 'ai-infos.json'));
            console.log('✅ ai-infos.json structure:', aiInfos);
        } catch (error) {
            console.log('❌ Failed to read ai-infos.json:', error.message);
            allPassed = false;
        }

        // Check context-manifest.yaml
        try {
            const manifestContent = await fs.readFile(path.join(contextDir, 'context-manifest.yaml'), 'utf8');
            console.log('✅ context-manifest.yaml content:');
            console.log(manifestContent);
        } catch (error) {
            console.log('❌ Failed to read context-manifest.yaml:', error.message);
            allPassed = false;
        }

        // 6. Check if context files were downloaded
        try {
            const contextFiles = await fs.readdir(contextDir);
            const mdFiles = contextFiles.filter(file => file.endsWith('.md') && file.startsWith('cm-'));
            console.log(`✅ Found ${mdFiles.length} context files:`, mdFiles);
        } catch (error) {
            console.log('❌ Failed to list context files:', error.message);
        }

        // 7. Final result
        console.log('\n🎯 Test Summary:');
        if (allPassed) {
            console.log('✅ ALL TESTS PASSED! Setup tool is working correctly.');
        } else {
            console.log('❌ Some tests failed. Check the output above.');
        }

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
        console.error('Stack trace:', error.stack);
    } finally {
        // Cleanup
        console.log('\n🧹 Cleaning up temporary files...');
        try {
            await fs.remove(testProjectPath);
            console.log('✅ Cleanup completed');
        } catch (cleanupError) {
            console.log('⚠️  Cleanup failed:', cleanupError.message);
        }
    }
}

// Test with empty project (no package.json)
async function testEmptyProject() {
    const projectRoot = path.resolve(__dirname, '..');
    const testProjectPath = path.join(projectRoot, 'test-empty-project-temp');

    try {
        console.log('\n🧪 Testing with empty project (no package.json)...');

        // Create empty directory
        await fs.ensureDir(testProjectPath);

        const mockRequest = {
            params: {
                arguments: {
                    projectPath: testProjectPath,
                    maxDependencies: 5
                }
            }
        };

        const result = await handleSetupProjectContextTool(mockRequest);

        console.log('\n📋 Empty project setup result:');
        console.log(result.content[0].text);

        // Verify basic structure was created
        const contextMasterDir = path.join(testProjectPath, '.context-master');
        const exists = await fs.pathExists(contextMasterDir);

        if (exists) {
            console.log('✅ Empty project setup successful - basic structure created');
        } else {
            console.log('❌ Empty project setup failed - no structure created');
        }

    } catch (error) {
        console.error('❌ Empty project test failed:', error.message);
    } finally {
        // Cleanup
        try {
            await fs.remove(testProjectPath);
        } catch (cleanupError) {
            console.log('⚠️  Empty project cleanup failed:', cleanupError.message);
        }
    }
}

// Run tests
async function runAllTests() {
    console.log('🎯 Starting Context Master Setup Tool Tests\n');

    await testSetupTool();
    await testEmptyProject();

    console.log('\n🏁 All tests completed!');
}

runAllTests().catch(console.error);