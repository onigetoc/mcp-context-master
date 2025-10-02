#!/usr/bin/env node

import { CleanupService } from '../build/services/cleanup.service.js';
import * as path from 'path';

async function testRealCleanup() {
    console.log('Testing cleanup on real context directory...\n');
    
    const contextDir = path.join(process.cwd(), '.context-master', 'context');
    
    try {
        const cleanupService = new CleanupService();
        
        console.log('=== Testing cleanup on real directory ===');
        console.log(`Directory: ${contextDir}\n`);
        
        // Nettoyer spécifiquement fs-extra
        console.log('Cleaning fs-extra files...');
        const deletedFsExtra = await cleanupService.cleanupOldContextFiles(contextDir, 'fs-extra', 1);
        console.log(`Deleted fs-extra files: ${deletedFsExtra.join(', ')}\n`);
        
        // Nettoyer globalement
        console.log('Cleaning all libraries globally...');
        const deletedAll = await cleanupService.cleanupAllOldContextFiles(contextDir, 1);
        console.log(`Deleted files globally: ${deletedAll.join(', ')}\n`);
        
        console.log('✅ Real cleanup test completed');
        
    } catch (error) {
        console.error('❌ Real cleanup test failed:', error);
    }
}

testRealCleanup().catch(console.error);