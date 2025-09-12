#!/usr/bin/env node

// Test simple pour la recherche GitHub
import { searchGithubRepos } from './build/apis/github-api.js';

console.log('🔍 Test Simple - Recherche GitHub\n');

async function testSimple() {
  // Exemple de test avec différents scénarios
  console.log('📋 Scénarios de test disponibles :\n');
  
  console.log('1. Test sans token (montre l\'erreur attendue)');
  console.log('2. Test avec token (si GITHUB_TOKEN est défini)');
  console.log('3. Test de requête personnalisée\n');
  
  // Test 1: Sans token
  console.log('🧪 Test 1: Sans token GitHub...');
  try {
    await searchGithubRepos('test query', undefined, 'stars', 1);
  } catch (error) {
    console.log('✅ Erreur attendue:', error.message);
  }
  
  // Test 2: Avec token (si disponible)
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    console.log('\n🧪 Test 2: Avec token GitHub...');
    try {
      const results = await searchGithubRepos('mcp server', token, 'stars', 2);
      console.log(`✅ Succès! Trouvé ${results.length} résultats`);
      
      results.forEach((repo, i) => {
        console.log(`   ${i+1}. ${repo.name} - ${repo.stargazers_count} ⭐`);
        console.log(`      Context7: https://context7.com/${repo.full_name}/llms.txt`);
      });
    } catch (error) {
      console.log('❌ Erreur:', error.message);
    }
  } else {
    console.log('\n⚠️  Test 2: Ignoré (pas de GITHUB_TOKEN)');
  }
  
  console.log('\n🎯 Pour tester avec votre token :');
  console.log('   Windows: set GITHUB_TOKEN=ghp_xxxx && node test-simple.js');
  console.log('   PowerShell: $env:GITHUB_TOKEN="ghp_xxxx"; node test-simple.js');
  console.log('   Linux/Mac: GITHUB_TOKEN=ghp_xxxx node test-simple.js');
  
  console.log('\n🔗 Obtenir un token GitHub :');
  console.log('   https://github.com/settings/tokens');
  console.log('   (Permissions: public_repo pour les repos publics)');
}

// Arguments de ligne de commande
const args = process.argv.slice(2);
if (args.length > 0) {
  const query = args.join(' ');
  const token = process.env.GITHUB_TOKEN;
  
  if (token) {
    console.log(`🔍 Recherche: "${query}"\n`);
    
    searchGithubRepos(query, token, 'stars', 3)
      .then(results => {
        console.log(`✅ ${results.length} résultats trouvés :\n`);
        results.forEach((repo, i) => {
          console.log(`${i+1}. ${repo.name} (${repo.full_name})`);
          console.log(`   📝 ${repo.description || 'Pas de description'}`);
          console.log(`   ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}`);
          console.log(`   🔗 ${repo.html_url}`);
          console.log('');
        });
      })
      .catch(error => {
        console.log('❌ Erreur:', error.message);
      });
  } else {
    console.log('❌ GITHUB_TOKEN requis pour la recherche personnalisée');
  }
} else {
  testSimple();
}