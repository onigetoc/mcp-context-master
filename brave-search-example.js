// Test API Brave Search avec Axios
// Assurez-vous d'avoir votre clé API de https://api.brave.com/

const axios = require('axios');

// Configuration de base
const BRAVE_API_BASE = 'https://api.brave.com/search/v1/search';
const API_KEY = 'YOUR_API_KEY_HERE'; // Remplacez par votre vraie clé

// Headers requis
const headers = {
  'X-Subscription-Token': API_KEY,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

async function testBraveSearch() {
  try {
    console.log('🔍 Test de l\'API Brave Search...\n');

    // Test 1: Recherche simple
    console.log('📋 Test 1: Recherche simple');
    const response1 = await axios.get(BRAVE_API_BASE, {
      headers,
      params: {
        q: 'brave browser',
        limit: 5
      }
    });
    
    console.log('✅ Résultats:', response1.data.results?.length || 0, 'trouvés');
    console.log('🔗 Premier résultat:', response1.data.results?.[0]?.title || 'Aucun');
    console.log('');

    // Test 2: Recherche avec filtres
    console.log('📋 Test 2: Recherche d\'actualités');
    const response2 = await axios.get(BRAVE_API_BASE, {
      headers,
      params: {
        q: 'AI technology',
        count: 3,
        result_filter: 'news',
        country: 'US',
        search_lang: 'en'
      }
    });
    
    console.log('✅ Actualités trouvées:', response2.data.results?.length || 0);
    console.log('');

    // Test 3: Recherche d'images
    console.log('📋 Test 3: Recherche d\'images');
    const response3 = await axios.get(BRAVE_API_BASE, {
      headers,
      params: {
        q: 'javascript programming',
        count: 5,
        result_filter: 'images'
      }
    });
    
    console.log('✅ Images trouvées:', response3.data.results?.length || 0);
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.status, error.response?.statusText);
    console.error('📝 Message:', error.response?.data?.message || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Solution: Vérifiez votre clé API dans la variable API_KEY');
    }
    if (error.response?.status === 429) {
      console.log('\n💡 Solution: Vous avez atteint la limite de requêtes');
    }
  }
}

// Structure de réponse typique de l'API Brave
console.log('📊 Structure de réponse attendue:');
console.log(`
{
  "query": "brave browser",
  "results": [
    {
      "title": "Titre du résultat",
      "url": "https://exemple.com",
      "description": "Description du résultat",
      "age": "2024-01-01T00:00:00Z",
      "language": "en",
      "family_friendly": true
    }
  ],
  "type": "search",
  "discussions": {...},
  "faq": {...},
  "infobox": {...},
  "locations": {...},
  "mixed": {...},
  "news": {...},
  "videos": {...}
}
`);

// Paramètres disponibles
console.log('⚙️ Paramètres disponibles:');
console.log(`
- q (obligatoire): Terme de recherche
- count/limit: Nombre de résultats (1-20)
- offset: Pagination 
- country: Code pays (US, FR, DE, etc.)
- search_lang: Langue (en, fr, de, etc.)  
- ui_lang: Langue de l'interface
- result_filter: web, news, images, videos
- freshness: pw (semaine), pm (mois), py (année)
- text_decorations: true/false
- spellcheck: true/false
- goggles_id: ID des lunettes personnalisées
`);

console.log('\n🚀 Lancez le test avec: node brave-search-example.js');
console.log('📝 N\'oubliez pas de remplacer YOUR_API_KEY_HERE par votre vraie clé!\n');

// Lancer le test si la clé API est configurée
if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
  testBraveSearch();
} else {
  console.log('⚠️  Configurez d\'abord votre clé API dans la variable API_KEY');
}