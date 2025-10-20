// Test spécifique pour vérifier que tous les packages @radix-ui/* sont exclus
import { shouldDownloadDocumentation } from '../build/utils/exclusion-list.js';

console.log('=== TEST EXCLUSION @RADIX-UI/* ===\n');

// Tous les packages @radix-ui de ton projet
const radixPackages = [
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog", 
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-context-menu",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-hover-card",
  "@radix-ui/react-icons",
  "@radix-ui/react-label",
  "@radix-ui/react-menubar",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-slot",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-toggle",
  "@radix-ui/react-toggle-group",
  "@radix-ui/react-tooltip"
];

console.log(`🧪 Test de ${radixPackages.length} packages @radix-ui/*\n`);

let allExcluded = true;
let excludedCount = 0;

radixPackages.forEach((pkg, index) => {
  const result = shouldDownloadDocumentation(pkg);
  
  if (result.exclude) {
    console.log(`✅ ${index + 1}. ${pkg} - EXCLU (${result.reason}: ${result.matchedPattern})`);
    excludedCount++;
  } else {
    console.log(`❌ ${index + 1}. ${pkg} - ERREUR: Devrait être exclu!`);
    allExcluded = false;
  }
});

console.log('\n📊 RÉSULTATS:');
console.log(`• Total packages testés: ${radixPackages.length}`);
console.log(`• Packages exclus: ${excludedCount}`);
console.log(`• Taux de réussite: ${Math.round((excludedCount / radixPackages.length) * 100)}%`);

if (allExcluded) {
  console.log('\n🎉 SUCCÈS: Tous les packages @radix-ui/* sont correctement exclus!');
  console.log('✅ Le pattern matching fonctionne parfaitement');
  console.log('✅ Aucun package @radix-ui ne sera téléchargé lors du setup');
} else {
  console.log('\n❌ ÉCHEC: Certains packages @radix-ui ne sont pas exclus');
  console.log('🔧 Le code nécessite des ajustements');
}

console.log('\n🔍 VÉRIFICATION DU PATTERN MATCHING:');
console.log('Pattern utilisé: "@radix-ui"');
console.log('Logique: name.startsWith("@radix-ui")');
console.log('Cela devrait matcher tous les packages @radix-ui/*');

// Test de quelques autres patterns similaires
console.log('\n🧪 TEST D\'AUTRES PATTERNS SIMILAIRES:');
const otherPatterns = [
  "@mui/material",
  "@mui/icons-material", 
  "@types/react",
  "@types/node",
  "@testing-library/react",
  "@testing-library/jest-dom"
];

otherPatterns.forEach(pkg => {
  const result = shouldDownloadDocumentation(pkg);
  console.log(`${result.exclude ? '✅' : '❌'} ${pkg} - ${result.exclude ? 'EXCLU' : 'GARDÉ'} ${result.reason ? `(${result.reason})` : ''}`);
});