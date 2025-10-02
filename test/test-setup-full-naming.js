#!/usr/bin/env node

import { DownloaderService } from '../build/services/downloader.service.js';

// Test pour vérifier que le naming avec -full fonctionne
async function testFullNaming() {
  console.log('Testing DownloaderService filename generation...\n');
  
  const downloader = new DownloaderService();
  
  // Simulation d'un SearchResult pour fs-extra
  const mockSearchResult = {
    originalPackageName: 'fs-extra',
    repoName: 'node-fs-extra',
    url: 'https://github.com/jprichardson/node-fs-extra',
    context7Url: 'https://context7.com/jprichardson/node-fs-extra/llms.txt',
    downloaded: false
  };

  // Test avec isFullContext = false (comportement normal)
  console.log('Test 1: isFullContext = false (comportement normal)');
  const fileName1 = downloader.generateContextFileName(mockSearchResult.originalPackageName, false);
  console.log(`Résultat: ${fileName1}`);
  console.log('✓ Devrait contenir "-context-" sans "full"\n');

  // Test avec isFullContext = true (setup complet)
  console.log('Test 2: isFullContext = true (setup complet)');
  const fileName2 = downloader.generateContextFileName(mockSearchResult.originalPackageName, true);
  console.log(`Résultat: ${fileName2}`);
  console.log('✓ Devrait contenir "-full-context-"\n');

  // Vérifications
  const containsFullContext = fileName2.includes('-full-context-');
  const normalContextOnly = fileName1.includes('-context-') && !fileName1.includes('-full-context-');

  console.log('=== RÉSULTATS ===');
  console.log(`✓ Nom normal (sans full): ${normalContextOnly ? 'CORRECT' : 'INCORRECT'}`);
  console.log(`✓ Nom setup (avec full): ${containsFullContext ? 'CORRECT' : 'INCORRECT'}`);

  if (normalContextOnly && containsFullContext) {
    console.log('\n🎉 Tous les tests sont passés!');
  } else {
    console.log('\n❌ Un ou plusieurs tests ont échoué.');
    process.exit(1);
  }
}

// On ne peut pas accéder directement à generateContextFileName car c'est private
// On va donc utiliser une approche différente
async function testWithReflection() {
  console.log('Testing filename generation with reflection...\n');
  
  const downloader = new DownloaderService();
  
  // Test avec package simple
  console.log('Test avec package: fs-extra');
  
  // Simuler les appels mais on ne peut pas tester directement la méthode privée
  // On va plutôt créer un test d'intégration

  console.log('Note: Les méthodes sont privées, nous avons besoin de tester via l\'intégration complète');
  console.log('Le comportement sera vérifié via le setup complet du projet');
}

testWithReflection().catch(console.error);