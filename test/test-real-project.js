// Test avec le vrai package.json de l'utilisateur
import { shouldDownloadDocumentation } from '../build/utils/exclusion-list.js';

console.log('=== TEST AVEC TON PROJET RÉEL ===\n');

// Tes dépendances exactes
const dependencies = {
  "@hookform/resolvers": "^3.9.0",
  "@mistralai/mistralai": "^1.10.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-alert-dialog": "^1.1.1",
  "@radix-ui/react-aspect-ratio": "^1.1.0",
  "@radix-ui/react-avatar": "^1.1.0",
  "@radix-ui/react-checkbox": "^1.1.1",
  "@radix-ui/react-collapsible": "^1.1.0",
  "@radix-ui/react-context-menu": "^2.2.1",
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-dropdown-menu": "^2.1.1",
  "@radix-ui/react-hover-card": "^1.1.1",
  "@radix-ui/react-icons": "^1.3.0",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-menubar": "^1.1.1",
  "@radix-ui/react-navigation-menu": "^1.2.0",
  "@radix-ui/react-popover": "^1.1.1",
  "@radix-ui/react-progress": "^1.1.0",
  "@radix-ui/react-radio-group": "^1.2.0",
  "@radix-ui/react-scroll-area": "^1.1.0",
  "@radix-ui/react-select": "^2.1.1",
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-slider": "^1.2.0",
  "@radix-ui/react-slot": "^1.1.0",
  "@radix-ui/react-switch": "^1.1.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.1",
  "@radix-ui/react-toggle": "^1.1.0",
  "@radix-ui/react-toggle-group": "^1.1.0",
  "@radix-ui/react-tooltip": "^1.1.2",
  "@supabase/supabase-js": "^2.58.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "cmdk": "^1.0.0",
  "date-fns": "^3.6.0",
  "embla-carousel-react": "^8.3.0",
  "file-type": "^21.0.0",
  "input-otp": "^1.2.4",
  "jszip": "^3.10.1",
  "katex": "^0.16.25",
  "lucide-react": "^0.446.0",
  "next-themes": "^0.3.0",
  "react": "^18.3.1",
  "react-day-picker": "^8.10.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.53.0",
  "react-markdown": "^10.1.0",
  "react-resizable-panels": "^2.1.3",
  "recharts": "^2.12.7",
  "rehype-katex": "^7.0.1",
  "rehype-raw": "^7.0.0",
  "remark-gfm": "^4.0.1",
  "remark-math": "^6.0.0",
  "sonner": "^1.5.0",
  "tailwind-merge": "^2.5.2",
  "tailwindcss-animate": "^1.0.7",
  "vaul": "^1.0.0",
  "zod": "^3.23.8"
};

const allPackages = Object.keys(dependencies);
const totalPackages = allPackages.length;

console.log(`📦 Analyse de ${totalPackages} dépendances de ton projet\n`);

const toDocument = [];
const excluded = [];

allPackages.forEach(pkg => {
  const result = shouldDownloadDocumentation(pkg);
  
  if (result.exclude) {
    excluded.push({
      name: pkg,
      reason: result.reason,
      pattern: result.matchedPattern
    });
  } else {
    toDocument.push(pkg);
  }
});

console.log('✅ LIBRAIRIES QUI SERONT DOCUMENTÉES:');
toDocument.forEach((pkg, index) => {
  console.log(`   ${index + 1}. ${pkg}`);
});

console.log('\n🚫 LIBRAIRIES EXCLUES:');
excluded.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.name} (${item.reason}: ${item.pattern})`);
});

// Grouper les exclusions par raison
const exclusionsByReason = {};
excluded.forEach(item => {
  if (!exclusionsByReason[item.reason]) {
    exclusionsByReason[item.reason] = [];
  }
  exclusionsByReason[item.reason].push(item.name);
});

console.log('\n📊 EXCLUSIONS PAR CATÉGORIE:');
Object.entries(exclusionsByReason).forEach(([reason, packages]) => {
  console.log(`   • ${reason}: ${packages.length} packages`);
  packages.slice(0, 3).forEach(pkg => console.log(`     - ${pkg}`));
  if (packages.length > 3) {
    console.log(`     ... et ${packages.length - 3} autres`);
  }
});

const reductionPercent = Math.round((excluded.length / totalPackages) * 100);

console.log('\n📈 STATISTIQUES FINALES:');
console.log(`   • Total packages: ${totalPackages}`);
console.log(`   • À documenter: ${toDocument.length}`);
console.log(`   • Exclus: ${excluded.length}`);
console.log(`   • Réduction: ${reductionPercent}%`);

console.log('\n🎯 IMPACT:');
if (reductionPercent >= 50) {
  console.log(`   ✅ EXCELLENT: ${reductionPercent}% de réduction du bruit!`);
} else if (reductionPercent >= 30) {
  console.log(`   ✅ BON: ${reductionPercent}% de réduction`);
} else {
  console.log(`   ⚠️  FAIBLE: Seulement ${reductionPercent}% de réduction`);
}

console.log(`   🚀 Context Master téléchargera seulement ${toDocument.length} librairies au lieu de ${totalPackages}`);
console.log(`   ⚡ Gain de temps et de pertinence significatif`);

// Vérifier spécifiquement les @radix-ui
const radixPackages = allPackages.filter(pkg => pkg.startsWith('@radix-ui/'));
const radixExcluded = excluded.filter(item => item.name.startsWith('@radix-ui/')).length;

console.log('\n🎨 VÉRIFICATION SPÉCIALE @RADIX-UI:');
console.log(`   • Packages @radix-ui trouvés: ${radixPackages.length}`);
console.log(`   • Packages @radix-ui exclus: ${radixExcluded}`);
console.log(`   • Taux d'exclusion @radix-ui: ${Math.round((radixExcluded / radixPackages.length) * 100)}%`);

if (radixExcluded === radixPackages.length) {
  console.log('   ✅ PARFAIT: Tous les @radix-ui sont exclus!');
} else {
  console.log('   ❌ PROBLÈME: Certains @radix-ui ne sont pas exclus');
}