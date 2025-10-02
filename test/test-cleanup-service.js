#!/usr/bin/env node

import { CleanupService } from '../build/services/cleanup.service.js';
import * as fs from 'fs/promises';
import * as path from 'path';

async function testCleanup() {
    console.log('Testing CleanupService...\n');
    
    const testDir = './test-cleanup';
    const contextDir = path.join(testDir, '.context-master', 'context');
    
    try {
        // Créer le dossier de test
        await fs.mkdir(contextDir, { recursive: true });
        
        // Créer des fichiers de test avec différentes dates
        const testFiles = [
            'cm-fs-extra-full-context-2025-09-01.md',
            'cm-fs-extra-full-context-2025-09-15.md',
            'cm-fs-extra-full-context-2025-10-01.md', // Plus récent
            'cm-react-context-2025-08-20.md',
            'cm-react-full-context-2025-09-10.md',
            'cm-react-full-context-2025-10-01.md', // Plus récent
            'cm-lodash-authentication-2025-09-05.md',
            'cm-lodash-context-2025-10-01.md', // Plus récent
        ];
        
        console.log('Creating test files:');
        for (const file of testFiles) {
            const content = `# Test context for ${file}\nGenerated on ${new Date().toISOString()}`;
            await fs.writeFile(path.join(contextDir, file), content, 'utf8');
            console.log(`✓ Created: ${file}`);
        }
        
        console.log('\nFiles before cleanup:');
        const beforeFiles = await fs.readdir(contextDir);
        beforeFiles.forEach(file => console.log(`  - ${file}`));
        
        // Tester le nettoyage
        const cleanupService = new CleanupService();
        
        console.log('\n=== Testing cleanup for fs-extra ===');
        const deletedFsExtra = await cleanupService.cleanupOldContextFiles(contextDir, 'fs-extra', 1);
        console.log(`Deleted files for fs-extra: ${deletedFsExtra.join(', ')}`);
        
        console.log('\n=== Testing cleanup for react ===');
        const deletedReact = await cleanupService.cleanupOldContextFiles(contextDir, 'react', 1);
        console.log(`Deleted files for react: ${deletedReact.join(', ')}`);
        
        console.log('\n=== Testing global cleanup ===');
        const deletedAll = await cleanupService.cleanupAllOldContextFiles(contextDir, 1);
        console.log(`Deleted files globally: ${deletedAll.join(', ')}`);
        
        console.log('\nFiles after cleanup:');
        const afterFiles = await fs.readdir(contextDir);
        afterFiles.forEach(file => console.log(`  - ${file}`));
        
        console.log('\n✅ Expected: Only the most recent file for each library should remain');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        // Nettoyer le dossier de test
        try {
            await fs.rm(testDir, { recursive: true, force: true });
            console.log('\n🧹 Cleaned up test directory');
        } catch (e) {
            console.log('Warning: Could not clean up test directory');
        }
    }
}

testCleanup().catch(console.error);