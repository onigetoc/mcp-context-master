#!/usr/bin/env node

/**
 * Test du tool add_project_context avec le fallback "websites" pour TailwindCSS
 */

import { handleAddProjectContextTool } from './build/tools/add_context.tool.js';

async function testAddProjectContextWithFallback() {
    console.log('🧪 Test add_project_context avec fallback "websites"');
    
    const mockRequest = {
        params: {
            arguments: {
                libraryName: 'tailwindcss',
                topic: 'full context',
                tokens: 3000
                // Pas de projectPath - utilise process.cwd() automatiquement
            }
        }
    };
    
    console.log('📦 Paramètres de test:');
    console.log(JSON.stringify(mockRequest.params.arguments, null, 2));
    
    try {
        console.log('\n🚀 Exécution du tool...');
        const result = await handleAddProjectContextTool(mockRequest);
        
        if (result.content && result.content[0]) {
            const responseText = result.content[0].text;
            const response = JSON.parse(responseText);
            
            console.log('\n📋 Résultat:');
            console.log(`Success: ${response.success}`);
            
            if (response.success) {
                console.log('🎉 Test réussi !');
                console.log(`Message: ${response.message}`);
                console.log(`Fichiers téléchargés: ${response.downloadedFiles?.length || 0}`);
                console.log(`Path de contexte: ${response.contextPath}`);
                console.log(`Source: ${response.source}`);
                
                if (response.downloadedFiles && response.downloadedFiles.length > 0) {
                    console.log('\n📁 Fichiers créés:');
                    response.downloadedFiles.forEach(file => {
                        console.log(`  - ${file}`);
                    });
                }
            } else {
                console.log('❌ Test échoué');
                console.log(`Erreur: ${response.error}`);
                console.log(`Message: ${response.message}`);
                if (response.suggestions) {
                    console.log('Suggestions:');
                    response.suggestions.forEach(suggestion => {
                        console.log(`  - ${suggestion}`);
                    });
                }
            }
        }
    } catch (error) {
        console.error('❌ Erreur lors du test:', error.message);
        if (error.stack) {
            console.error('Stack:', error.stack.split('\n').slice(0, 5).join('\n'));
        }
    }
}

console.log('🎯 Test du fallback "websites" dans add_project_context');
console.log(`Working directory: ${process.cwd()}`);
await testAddProjectContextWithFallback();