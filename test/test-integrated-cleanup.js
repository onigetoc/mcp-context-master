#!/usr/bin/env node

import { DownloaderService } from '../build/services/downloader.service.js';
import * as fs from 'fs/promises';
import * as path from 'path';

async function testIntegratedCleanup() {
    console.log('Testing integrated cleanup in DownloaderService...\n');
    
    const testDir = './test-integrated-cleanup';
    const contextDir = path.join(testDir, '.context-master', 'context');
    
    try {
        // Créer le dossier de test
        await fs.mkdir(contextDir, { recursive: true });
        
        // Créer manuellement quelques anciens fichiers pour fs-extra
        const oldFiles = [
            'cm-fs-extra-full-context-2025-09-01.md',
            'cm-fs-extra-full-context-2025-09-15.md',
        ];
        
        console.log('Creating old files to test cleanup:');
        for (const file of oldFiles) {
            const content = `# Old context for ${file}\nGenerated for testing`;
            await fs.writeFile(path.join(contextDir, file), content, 'utf8');
            console.log(`✓ Created old file: ${file}`);
        }
        
        // Simuler un SearchResult pour fs-extra
        const mockSearchResult = {
            originalPackageName: 'fs-extra',
            repoName: 'node-fs-extra',
            url: 'https://github.com/jprichardson/node-fs-extra',
            context7Url: 'https://httpbin.org/json', // URL qui retourne du JSON valide pour test
            downloaded: false
        };
        
        console.log('\nFiles before download:');
        const beforeFiles = await fs.readdir(contextDir);
        beforeFiles.forEach(file => console.log(`  - ${file}`));
        
        // Tester le téléchargement avec nettoyage intégré
        console.log('\n=== Testing DownloaderService with integrated cleanup ===');
        const downloader = new DownloaderService();
        
        // Note: Le downloadDocumentation va essayer de télécharger depuis httpbin.org
        // et va réussir, puis déclencher le nettoyage automatique
        const downloadedFiles = await downloader.downloadDocumentation([mockSearchResult], contextDir, true);
        
        console.log(`\nDownloaded files: ${downloadedFiles.join(', ')}`);
        
        console.log('\nFiles after download and automatic cleanup:');
        const afterFiles = await fs.readdir(contextDir);
        afterFiles.forEach(file => console.log(`  - ${file}`));
        
        console.log('\n✅ Expected: Only the newly downloaded file should remain');
        console.log('✅ All old fs-extra files should have been automatically cleaned up');
        
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

testIntegratedCleanup().catch(console.error);