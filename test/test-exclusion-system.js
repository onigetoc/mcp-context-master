// Test du système d'exclusion des librairies
import { shouldDownloadDocumentation, isSpecializedLibrary } from '../build/utils/exclusion-list.js';

console.log('=== TEST DU SYSTÈME D\'EXCLUSION ===\n');

// Test des librairies à exclure
const librariesToExclude = [
  '@radix-ui/react-dialog',
  'react',
  'express',
  'lodash',
  'jest',
  'webpack',
  'bootstrap',
  'uuid',
  'chalk',
  'mysql',
  'core-js',
  'redux',
  'framer-motion',
  'joi',
  'winston',
  'requests', // Python
  'django',   // Python
  'numpy'     // Python
];

console.log('🚫 LIBRAIRIES À EXCLURE:');
librariesToExclude.forEach(lib => {
  const result = shouldDownloadDocumentation(lib);
  if (result.exclude) {
    console.log(`✅ ${lib} - EXCLU (${result.reason}: ${result.matchedPattern})`);
  } else {
    console.log(`❌ ${lib} - ERREUR: Devrait être exclu mais ne l'est pas!`);
  }
});

console.log('\n✅ LIBRAIRIES SPÉCIALISÉES À GARDER:');
const specializedLibraries = [
  'fs-extra',
  'prisma',
  '@prisma/client',
  'trpc',
  '@trpc/server',
  'remotion',
  '@remotion/renderer',
  'clerk',
  '@clerk/nextjs',
  'stripe',
  '@stripe/stripe-js',
  'supabase',
  '@supabase/supabase-js',
  'three',
  '@react-three/fiber',
  'd3',
  'electron',
  'sharp',
  'pdf-lib',
  'nodemailer',
  'bcrypt',
  'jsonwebtoken',
  'multer',
  'cheerio',
  'xml2js',
  'csv-parser',
  'helmet',
  'bull',
  'passport',
  'swagger-ui-express'
];

specializedLibraries.forEach(lib => {
  const result = shouldDownloadDocumentation(lib);
  const isSpecialized = isSpecializedLibrary(lib);
  
  if (!result.exclude) {
    console.log(`✅ ${lib} - GARDÉ (spécialisé: ${isSpecialized})`);
  } else {
    console.log(`❌ ${lib} - ERREUR: Devrait être gardé mais est exclu! (${result.reason})`);
  }
});

console.log('\n🔍 TEST DE CAS LIMITES:');
const edgeCases = [
  'react-router', // Devrait être exclu (react)
  'express-rate-limit', // Devrait être gardé (spécialisé)
  '@types/node', // Devrait être exclu (types)
  'next', // Cas intéressant - commun mais peut-être utile
  'tailwindcss', // Devrait être exclu (CSS framework)
  'zustand' // Dans exclusion mais aussi spécialisé - lequel gagne?
];

edgeCases.forEach(lib => {
  const result = shouldDownloadDocumentation(lib);
  const isSpecialized = isSpecializedLibrary(lib);
  
  console.log(`${result.exclude ? '🚫' : '✅'} ${lib} - ${result.exclude ? 'EXCLU' : 'GARDÉ'} (spécialisé: ${isSpecialized}${result.reason ? ', raison: ' + result.reason : ''})`);
});

console.log('\n=== RÉSUMÉ ===');
console.log('Le système d\'exclusion permet de:');
console.log('1. ⏭️  Ignorer les librairies trop communes (React, Express, etc.)');
console.log('2. ⏭️  Ignorer les outils de build (Webpack, Babel, etc.)');
console.log('3. ⏭️  Ignorer les frameworks CSS (Bootstrap, Tailwind, etc.)');
console.log('4. ✅ Garder les librairies spécialisées (Prisma, Remotion, etc.)');
console.log('5. 📊 Fournir des raisons claires pour chaque décision');