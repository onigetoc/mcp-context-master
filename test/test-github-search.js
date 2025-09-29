#!/usr/bin/env node

// Test script pour la recherche GitHub uniquement
import { searchGithubRepos } from '../build/apis/github-api.js';

console.log('🔍 Test de recherche GitHub\n');

// Configuration du test
const testQueries = [
  {
    query: 'react ai chatbot',
    sort: 'stars',
    per_page: 3,
    description: 'Recherche de chatbots AI en React'
  },
  {
    query: 'mcp server',
    sort: 'updated',
    per_page: 5,
    description: 'Recherche de serveurs MCP'
  },
  {
    query: 'typescript api framework',
    sort: 'stars',
    per_page: 3,
    description: 'Frameworks API TypeScript'
  }
];

async function testGithubSearch() {
  // Vérifier le token GitHub
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    console.log('❌ GITHUB_TOKEN non trouvé dans les variables d\'environnement');
    console.log('💡 Pour tester avec un token GitHub :');
    console.log('   Windows: set GITHUB_TOKEN=your_token && node test-github-search.js');
    console.log('   Linux/Mac: GITHUB_TOKEN=your_token node test-github-search.js');
    console.log('\n🔗 Obtenir un token : https://github.com/settings/tokens\n');
    
    // Test sans token (va échouer mais montre la structure)
    console.log('🧪 Test de structure sans token...');
    try {
      await searchGithubRepos('test', undefined, 'stars', 1);
    } catch (error) {
      console.log('✅ Erreur attendue :', error.message);
    }
    return;
  }

  console.log('✅ Token GitHub trouvé, démarrage des tests...\n');

  // Tester chaque requête
  for (let i = 0; i < testQueries.length; i++) {
    const test = testQueries[i];
    console.log(`📋 Test ${i + 1}/3: ${test.description}`);
    console.log(`   Requête: "${test.query}"`);
    console.log(`   Tri: ${test.sort}, Résultats: ${test.per_page}`);
    
    try {
      const results = await searchGithubRepos(
        test.query,
        githubToken,
        test.sort,
        test.per_page
      );

      console.log(`✅ Trouvé ${results.length} résultats :\n`);
      
      results.forEach((repo, index) => {
        console.log(`   ${index + 1}. ${repo.name} (${repo.full_name})`);
        console.log(`      📝 ${repo.description || 'Pas de description'}`);
        console.log(`      ⭐ ${repo.stargazers_count} stars | 🍴 ${repo.forks_count} forks`);
        console.log(`      🔗 ${repo.html_url}`);
        console.log(`      🌐 Context7: https://context7.com/${repo.full_name}/llms.txt`);
        console.log('');
      });
      
    } catch (error) {
      console.log(`❌ Erreur: ${error.message}\n`);
    }
    
    // Pause entre les tests pour éviter le rate limiting
    if (i < testQueries.length - 1) {
      console.log('⏳ Pause de 2 secondes...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

// Test avec paramètres personnalisés depuis la ligne de commande
async function testCustomQuery() {
  const args = process.argv.slice(2);
  if (args.length === 0) return;
  
  const query = args.join(' ');
  const githubToken = process.env.GITHUB_TOKEN;
  
  if (!githubToken) {
    console.log('❌ GITHUB_TOKEN requis pour la recherche personnalisée');
    return;
  }
  
  console.log(`🔍 Recherche personnalisée: "${query}"\n`);
  
  try {
    const results = await searchGithubRepos(query, githubToken, 'stars', 5);
    
    console.log(`✅ Trouvé ${results.length} résultats :\n`);
    
    results.forEach((repo, index) => {
      console.log(`${index + 1}. **${repo.name}** (${repo.full_name})`);
      console.log(`   📝 ${repo.description || 'Pas de description'}`);
      console.log(`   🏷️  ${repo.language || 'Langage inconnu'}`);
      console.log(`   ⭐ ${repo.stargazers_count} stars | 🍴 ${repo.forks_count} forks`);
      console.log(`   🔗 GitHub: ${repo.html_url}`);
      console.log(`   🌐 Context7: https://context7.com/${repo.full_name}/llms.txt`);
      console.log('');
    });
    
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
  }
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Recherche personnalisée avec arguments
    await testCustomQuery();
  } else {
    // Tests prédéfinis
    await testGithubSearch();
  }
  
  console.log('🎉 Test terminé !');
  console.log('\n💡 Utilisation :');
  console.log('   node test-github-search.js                    # Tests prédéfinis');
  console.log('   node test-github-search.js "votre recherche"  # Recherche personnalisée');
}

main().catch(error => {
  console.error('💥 Erreur fatale:', error.message);
  process.exit(1);
});