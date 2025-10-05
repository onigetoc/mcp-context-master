#!/usr/bin/env node

/**
 * Test spécifique pour vérifier le fallback "websites" de Context7
 * Exemple: TailwindCSS qui utilise https://context7.com/websites/tailwindcss/llms.txt
 */

import axios from 'axios';

async function testContext7Fallback() {
    console.log('🧪 Test Context7 Fallback "websites" - TailwindCSS');
    
    // URL normale (qui ne fonctionne pas)
    const normalUrl = 'https://context7.com/tailwindlabs/tailwindcss/llms.txt?tokens=2000';
    console.log(`\n❌ URL normale (échec attendu): ${normalUrl}`);
    
    try {
        const response = await axios.get(normalUrl, {
            timeout: 5000,
            validateStatus: () => true  // Accept any status code
        });
        console.log(`Status: ${response.status}`);
        if (response.status === 404) {
            console.log('✅ Échec confirmé (404) - comme attendu');
        }
    } catch (error) {
        console.log(`Erreur: ${error.message}`);
    }
    
    // URL avec fallback "websites" (qui devrait fonctionner)
    const websitesUrl = 'https://context7.com/websites/tailwindcss/llms.txt?tokens=2000';
    console.log(`\n✅ URL avec fallback "websites": ${websitesUrl}`);
    
    try {
        const response = await axios.get(websitesUrl, {
            timeout: 10000,
            validateStatus: () => true
        });
        console.log(`Status: ${response.status}`);
        
        if (response.status === 200) {
            console.log('🎉 Succès ! Le fallback "websites" fonctionne');
            console.log(`Taille du contenu: ${response.data?.length || 0} caractères`);
            
            // Afficher un extrait du contenu
            if (response.data && response.data.length > 0) {
                const preview = response.data.substring(0, 200);
                console.log(`\nAperçu du contenu:\n${preview}...`);
            }
        } else {
            console.log(`❌ Échec avec status: ${response.status}`);
        }
    } catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
    }
    
    console.log('\n🔍 Test terminé');
}

// Tests d'autres libraries qui pourraient utiliser le fallback websites
async function testOtherLibraries() {
    console.log('\n🧪 Test d\'autres libraries avec fallback "websites"');
    
    const testLibraries = [
        'bootstrap',
        'bulma',
        'foundation'
    ];
    
    for (const lib of testLibraries) {
        const websitesUrl = `https://context7.com/websites/${lib}/llms.txt?tokens=1000`;
        console.log(`\n🔍 Test ${lib}: ${websitesUrl}`);
        
        try {
            const response = await axios.head(websitesUrl, { timeout: 5000 });
            console.log(`✅ ${lib}: Status ${response.status} - Disponible`);
        } catch (error) {
            if (error.response?.status === 404) {
                console.log(`❌ ${lib}: Non disponible (404)`);
            } else {
                console.log(`❌ ${lib}: Erreur - ${error.message}`);
            }
        }
    }
}

// Exécuter les tests
console.log('🚀 Démarrage des tests Context7 Fallback');
await testContext7Fallback();
await testOtherLibraries();