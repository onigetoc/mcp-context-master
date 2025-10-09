#!/usr/bin/env node

/**
 * Script de migration automatique de ai-infos.json vers cm-ai-infos.yaml
 * Usage: node scripts/migrate-to-yaml.js
 */

import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

async function migrate() {
  console.log('🔄 Migration de JSON vers YAML...\n');

  const jsonPath = path.join(projectRoot, '.context-master', 'ai-infos.json');
  const yamlPath = path.join(projectRoot, '.context-master', 'cm-ai-infos.yaml');

  try {
    // Vérifier si le fichier YAML existe déjà
    if (await fs.pathExists(yamlPath)) {
      console.log('✅ Le fichier cm-ai-infos.yaml existe déjà.');
      console.log('   Aucune migration nécessaire.\n');
      
      // Afficher le contenu
      const yamlContent = await fs.readFile(yamlPath, 'utf8');
      console.log('📄 Contenu actuel:');
      console.log(yamlContent);
      return;
    }

    // Vérifier si le fichier JSON existe
    if (!(await fs.pathExists(jsonPath))) {
      console.log('❌ Aucun fichier ai-infos.json trouvé.');
      console.log('   Création d\'un nouveau fichier cm-ai-infos.yaml...\n');
      
      // Créer un fichier YAML par défaut
      const defaultContent = `provider: UNKNOWN
model: UNKNOWN
ide: UNKNOWN
extension: UNKNOWN
`;
      await fs.writeFile(yamlPath, defaultContent, 'utf8');
      console.log('✅ Fichier cm-ai-infos.yaml créé avec des valeurs par défaut.');
      console.log('   Veuillez le mettre à jour avec vos informations.\n');
      return;
    }

    // Lire le fichier JSON
    console.log('📖 Lecture de ai-infos.json...');
    const jsonContent = await fs.readFile(jsonPath, 'utf8');
    const jsonData = JSON.parse(jsonContent);
    
    console.log('   Données JSON:');
    console.log('   ', JSON.stringify(jsonData, null, 2).replace(/\n/g, '\n   '));
    console.log();

    // Convertir en YAML
    console.log('🔄 Conversion en YAML...');
    const yamlContent = yaml.dump(jsonData, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    });

    // Écrire le fichier YAML
    await fs.writeFile(yamlPath, yamlContent, 'utf8');
    console.log('✅ Fichier cm-ai-infos.yaml créé avec succès!\n');

    // Afficher le contenu YAML
    console.log('📄 Nouveau contenu YAML:');
    console.log(yamlContent);

    // Demander si on doit supprimer le fichier JSON
    console.log('ℹ️  Le fichier ai-infos.json peut maintenant être supprimé.');
    console.log('   Pour le supprimer automatiquement, exécutez:');
    console.log('   node scripts/migrate-to-yaml.js --delete-json\n');

    // Si l'option --delete-json est présente
    if (process.argv.includes('--delete-json')) {
      await fs.remove(jsonPath);
      console.log('🗑️  Fichier ai-infos.json supprimé.\n');
    }

    console.log('✅ Migration terminée avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error.message);
    process.exit(1);
  }
}

// Exécuter la migration
migrate();
