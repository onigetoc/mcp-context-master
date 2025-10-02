#!/usr/bin/env node

import { CleanupService } from '../build/services/cleanup.service.js';
import * as fs from 'fs/promises';
import * as path from 'path';

async function testContextGrouping() {
    console.log('Testing context grouping by library + topic...\n');
    
    const testDir = './test-context-grouping';
    const contextDir = path.join(testDir, '.context-master', 'context');
    
    try {
        // Créer le dossier de test
        await fs.mkdir(contextDir, { recursive: true });
        
        // Créer des fichiers de test avec différents scénarios
        const testFiles = [
            // Remotion avec 2 contextes différents (à garder tous les deux)
            'cm-remotion-full-context-2025-09-15.md',
            'cm-remotion-full-context-2025-10-01.md', // Plus récent pour full-context
            'cm-remotion-srt-captions-2025-09-20.md',
            'cm-remotion-srt-captions-2025-10-02.md', // Plus récent pour srt-captions
            
            // React avec doublons du même contexte (supprimer les anciens)
            'cm-react-authentication-2025-08-15.md',
            'cm-react-authentication-2025-09-10.md',
            'cm-react-authentication-2025-10-01.md', // Plus récent - à garder
            
            // FS-Extra avec contextes différents
            'cm-fs-extra-context-2025-09-01.md',
            'cm-fs-extra-context-2025-10-01.md', // Plus récent pour context
            'cm-fs-extra-full-context-2025-09-15.md',
            'cm-fs-extra-full-context-2025-10-02.md', // Plus récent pour full-context
        ];
        
        console.log('Creating test files:');
        for (const file of testFiles) {
            const content = `# Test context for ${file}\nGenerated on ${new Date().toISOString()}`;
            await fs.writeFile(path.join(contextDir, file), content, 'utf8');
            console.log(`✓ Created: ${file}`);
        }
        
        console.log('\nFiles before cleanup:');
        const beforeFiles = await fs.readdir(contextDir);
        beforeFiles.sort().forEach(file => console.log(`  - ${file}`));
        
        // Tester le nettoyage global
        const cleanupService = new CleanupService();
        
        console.log('\n=== Testing global cleanup with context grouping ===');
        const deletedFiles = await cleanupService.cleanupAllOldContextFiles(contextDir, 1);
        console.log(`\nDeleted files: ${deletedFiles.join(', ')}`);
        
        console.log('\nFiles after cleanup:');
        const afterFiles = await fs.readdir(contextDir);
        afterFiles.sort().forEach(file => console.log(`  - ${file}`));
        
        console.log('\n✅ Expected results:');
        console.log('  - cm-remotion-full-context-2025-10-01.md (kept - latest full-context)');
        console.log('  - cm-remotion-srt-captions-2025-10-02.md (kept - latest srt-captions)');
        console.log('  - cm-react-authentication-2025-10-01.md (kept - latest authentication)');
        console.log('  - cm-fs-extra-context-2025-10-01.md (kept - latest context)');
        console.log('  - cm-fs-extra-full-context-2025-10-02.md (kept - latest full-context)');
        
        // Vérifier que nous avons bien 5 fichiers restants (1 par groupe de contexte)
        if (afterFiles.length === 5) {
            console.log('\n🎉 Perfect! We have exactly 5 files (1 per context group)');
        } else {
            console.log(`\n⚠️  Expected 5 files, got ${afterFiles.length}`);
        }
        
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

testContextGrouping().catch(console.error);