/**
 * Test des différents formats YAML et JSON
 * Vérifie que le système supporte correctement les deux formats
 */

import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const contextMasterDir = path.join(projectRoot, '.context-master');

// Configurations de test
const testConfigs = [
  {
    name: 'Kiro',
    data: {
      provider: 'Anthropic',
      model: 'claude-sonnet-4-20250514',
      ide: 'Kiro',
      extension: 'Kiro'
    },
    expectedFile: 'kiro/steering/context-master-instructions.md'
  },
  {
    name: 'GitHub Copilot',
    data: {
      provider: 'GitHub',
      model: 'GitHub Copilot',
      ide: 'VS Code',
      extension: 'GitHub Copilot'
    },
    expectedFile: 'copilot-instructions.md'
  },
  {
    name: 'Cursor',
    data: {
      provider: 'Anthropic',
      model: 'claude-sonnet-4',
      ide: 'Cursor',
      extension: 'UNKNOWN'
    },
    expectedFile: '.cursorrules'
  },
  {
    name: 'Gemini CLI',
    data: {
      provider: 'Google',
      model: 'gemini-2.0-flash',
      ide: 'VS Code',
      extension: 'Gemini CLI'
    },
    expectedFile: 'GEMINI.md'
  },
  {
    name: 'Roo Code',
    data: {
      provider: 'Anthropic',
      model: 'claude-sonnet-4',
      ide: 'VS Code',
      extension: 'Roo Code'
    },
    expectedFile: 'ROO.md'
  },
  {
    name: 'Fallback',
    data: {
      provider: 'Custom',
      model: 'custom-model',
      ide: 'Custom IDE',
      extension: 'Custom Extension'
    },
    expectedFile: 'AGENTS.md'
  }
];

async function testFormat(config, format) {
  const fileName = format === 'yaml' ? 'cm-ai-infos.yaml' : 'ai-infos.json';
  const filePath = path.join(contextMasterDir, fileName);

  try {
    // Créer le fichier de test
    if (format === 'yaml') {
      const yamlContent = yaml.dump(config.data);
      await fs.writeFile(filePath, yamlContent, 'utf8');
    } else {
      await fs.writeFile(filePath, JSON.stringify(config.data, null, 2), 'utf8');
    }

    // Importer dynamiquement le module
    const { handleCodingAssistantTool } = await import('../build/tools/coding-assistant.js');
    
    // Exécuter le tool
    const result = await handleCodingAssistantTool({});
    
    // Extraire le texte
    let resultText = '';
    if (result && Array.isArray(result.content) && result.content[0]) {
      resultText = result.content[0].text;
    }

    // Vérifier le résultat
    const success = resultText.includes(config.expectedFile);
    
    return {
      success,
      resultText,
      format
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      format
    };
  }
}

async function runTests() {
  console.log('🧪 Test des formats YAML et JSON\n');
  console.log('='.repeat(60));

  let totalTests = 0;
  let passedTests = 0;

  // Sauvegarder les fichiers existants
  const yamlPath = path.join(contextMasterDir, 'cm-ai-infos.yaml');
  const jsonPath = path.join(contextMasterDir, 'ai-infos.json');
  
  let yamlBackup = null;
  let jsonBackup = null;

  if (await fs.pathExists(yamlPath)) {
    yamlBackup = await fs.readFile(yamlPath, 'utf8');
  }
  if (await fs.pathExists(jsonPath)) {
    jsonBackup = await fs.readFile(jsonPath, 'utf8');
  }

  try {
    for (const config of testConfigs) {
      console.log(`\n📋 Test: ${config.name}`);
      console.log('-'.repeat(60));

      // Test YAML
      console.log('  Format YAML...');
      // Supprimer le JSON pour tester uniquement le YAML
      if (await fs.pathExists(jsonPath)) {
        await fs.remove(jsonPath);
      }
      
      const yamlResult = await testFormat(config, 'yaml');
      totalTests++;
      
      if (yamlResult.success) {
        console.log(`  ✅ YAML: ${config.expectedFile}`);
        passedTests++;
      } else {
        console.log(`  ❌ YAML: Échec`);
        if (yamlResult.error) {
          console.log(`     Erreur: ${yamlResult.error}`);
        } else {
          console.log(`     Attendu: ${config.expectedFile}`);
          console.log(`     Reçu: ${yamlResult.resultText}`);
        }
      }

      // Test JSON
      console.log('  Format JSON...');
      // Supprimer le YAML pour tester uniquement le JSON
      if (await fs.pathExists(yamlPath)) {
        await fs.remove(yamlPath);
      }
      
      const jsonResult = await testFormat(config, 'json');
      totalTests++;
      
      if (jsonResult.success) {
        console.log(`  ✅ JSON: ${config.expectedFile}`);
        passedTests++;
      } else {
        console.log(`  ❌ JSON: Échec`);
        if (jsonResult.error) {
          console.log(`     Erreur: ${jsonResult.error}`);
        } else {
          console.log(`     Attendu: ${config.expectedFile}`);
          console.log(`     Reçu: ${jsonResult.resultText}`);
        }
      }

      // Nettoyer
      if (await fs.pathExists(yamlPath)) {
        await fs.remove(yamlPath);
      }
      if (await fs.pathExists(jsonPath)) {
        await fs.remove(jsonPath);
      }
    }

    // Résumé
    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 Résumé des tests`);
    console.log(`   Total: ${totalTests}`);
    console.log(`   Réussis: ${passedTests}`);
    console.log(`   Échoués: ${totalTests - passedTests}`);
    console.log(`   Taux de réussite: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

    if (passedTests === totalTests) {
      console.log('\n✅ Tous les tests sont passés!');
    } else {
      console.log('\n❌ Certains tests ont échoué.');
    }

  } finally {
    // Restaurer les fichiers originaux
    if (yamlBackup) {
      await fs.writeFile(yamlPath, yamlBackup, 'utf8');
      console.log('\n🔄 Fichier YAML original restauré');
    }
    if (jsonBackup) {
      await fs.writeFile(jsonPath, jsonBackup, 'utf8');
      console.log('🔄 Fichier JSON original restauré');
    }
  }
}

// Exécuter les tests
runTests().catch(error => {
  console.error('❌ Erreur lors des tests:', error);
  process.exit(1);
});
