#!/usr/bin/env node
/**
 * Test rapide pour vérifier process.cwd() dans un contexte MCP simulé
 * Usage: node test/test-process-cwd.js
 */

import path from 'path';

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 TEST process.cwd() - MCP Server Context');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const cwd = process.cwd();
const serverRoot = path.resolve(import.meta.dirname, '..');
const isInServerDir = cwd === serverRoot;

console.log('📂 process.cwd()              :', cwd);
console.log('📂 Server root (expected)     :', serverRoot);
console.log('🔄 Running from server dir?   :', isInServerDir ? '✅ YES' : '❌ NO');

console.log('\n💡 Interprétation:');
if (isInServerDir) {
  console.log('   ⚠️  process.cwd() pointe vers le serveur MCP');
  console.log('   ⚠️  Il faut que le LLM fournisse projectPath explicitement');
} else {
  console.log('   ✅ process.cwd() pointe vers un autre répertoire');
  console.log('   ✅ Pourrait être utilisé comme fallback');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Simuler ce qui se passe quand un MCP tool est appelé
console.log('🧪 Simulation: Si un projet utilisateur appelle le MCP server...');
console.log('   Le process.cwd() du serveur MCP sera probablement:');
console.log('   ', serverRoot);
console.log('   Et NON le projet de l\'utilisateur.\n');
