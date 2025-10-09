# Documentation Context Master

## 📚 Index de la documentation

### 🚀 Guides de démarrage

1. **[README principal](../README.md)** - Vue d'ensemble et installation
2. **[AGENTS.md](../AGENTS.md)** - Instructions pour les assistants IA
3. **[ROADMAP.md](../ROADMAP.md)** - Feuille de route du projet

### 🔄 Migration YAML

1. **[Guide de migration YAML](YAML-MIGRATION-GUIDE.md)** - Guide complet de migration JSON → YAML
2. **[Changelog migration](../CHANGELOG-YAML-MIGRATION.md)** - Historique des changements
3. **[Résumé migration](../MIGRATION-SUMMARY.md)** - Résumé des tâches accomplies
4. **[README migration](.context-master/README-YAML-MIGRATION.md)** - Documentation technique

### 📖 Références techniques

1. **[Référence des mappings](CONTEXT-MAPPING-REFERENCE.md)** - Système de mapping des contextes
2. **[Configuration AI](cm-ai-infos.md)** - Configuration de l'assistant IA (legacy)
3. **[Analyse de projet](cm-ai-infos-V7.md)** - Analyse et configuration avancée

### 🛠️ Outils et scripts

1. **[Script de migration](../scripts/migrate-to-yaml.js)** - Migration automatique JSON → YAML
2. **[Tests](../test/)** - Suite de tests
3. **[Templates](../templates/)** - Templates de configuration

## 📋 Documentation par sujet

### Configuration

- **Format YAML** : [Guide de migration](YAML-MIGRATION-GUIDE.md)
- **Format JSON (legacy)** : [cm-ai-infos.md](cm-ai-infos.md)
- **Mappings** : [Référence des mappings](CONTEXT-MAPPING-REFERENCE.md)

### Utilisation

- **Setup initial** : [README principal](../README.md#installation)
- **Commandes** : [README principal](../README.md#available-tools)
- **Tests** : [README tests](../test/README-TESTS.md)

### Développement

- **Architecture** : [README principal](../README.md#architecture)
- **Contribution** : [ROADMAP.md](../ROADMAP.md)
- **Changelog** : [CHANGELOG-YAML-MIGRATION.md](../CHANGELOG-YAML-MIGRATION.md)

## 🎯 Guides par cas d'usage

### Je débute avec Context Master

1. Lisez le [README principal](../README.md)
2. Suivez les instructions d'installation
3. Configurez votre assistant avec [cm-ai-infos.yaml](YAML-MIGRATION-GUIDE.md#exemples)

### J'ai un projet existant avec JSON

1. Lisez le [Guide de migration](YAML-MIGRATION-GUIDE.md)
2. Exécutez `npm run migrate`
3. Vérifiez avec `node test/test-coding-assistant.js`

### Je veux ajouter un nouveau mapping

1. Consultez la [Référence des mappings](CONTEXT-MAPPING-REFERENCE.md#ajout-dun-nouveau-mapping)
2. Modifiez `src/tools/coding-assistant.ts`
3. Testez avec `npm run build && node test/test-coding-assistant.js`

### Je veux comprendre le système de mapping

1. Lisez la [Référence des mappings](CONTEXT-MAPPING-REFERENCE.md)
2. Consultez les exemples de configuration
3. Testez avec différentes configurations

## 📝 Formats de fichiers

### YAML (Recommandé)

```yaml
# .context-master/cm-ai-infos.yaml
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

**Avantages:**
- Plus lisible
- Support des commentaires
- Standard industriel
- Moins d'erreurs de syntaxe

### JSON (Legacy)

```json
{
  "provider": "Anthropic",
  "model": "claude-sonnet-4-20250514",
  "ide": "Kiro",
  "extension": "Kiro"
}
```

**Note:** Toujours supporté pour rétrocompatibilité.

## 🔧 Commandes utiles

```bash
# Compiler le projet
npm run build

# Tester le coding assistant
node test/test-coding-assistant.js

# Tester le setup
node test/test-setup-tool.js

# Migrer vers YAML
npm run migrate

# Lancer tous les tests
npm test
```

## 📊 Structure de la documentation

```
docs/
├── README.md                          # Ce fichier
├── YAML-MIGRATION-GUIDE.md           # Guide de migration
├── CONTEXT-MAPPING-REFERENCE.md      # Référence des mappings
├── cm-ai-infos.md                    # Config AI (legacy)
├── cm-ai-infos-V6.md                 # Config AI v6
├── cm-ai-infos-V7.md                 # Config AI v7
└── 01-GET-MODEL-PROVIDER-PROMPT.md   # Prompt de configuration

.context-master/
└── README-YAML-MIGRATION.md          # Documentation technique

Root/
├── README.md                          # README principal
├── AGENTS.md                          # Instructions pour IA
├── ROADMAP.md                         # Feuille de route
├── CHANGELOG-YAML-MIGRATION.md       # Changelog migration
└── MIGRATION-SUMMARY.md              # Résumé migration
```

## 🆘 Support

### Problèmes courants

1. **Fichier de configuration non trouvé**
   - Solution : [Guide de migration - Dépannage](YAML-MIGRATION-GUIDE.md#dépannage)

2. **Mauvais fichier de règles utilisé**
   - Solution : [Référence des mappings - Dépannage](CONTEXT-MAPPING-REFERENCE.md#dépannage)

3. **Erreur de parsing YAML**
   - Solution : [Guide de migration - Dépannage](YAML-MIGRATION-GUIDE.md#dépannage)

### Ressources externes

- [Spécification YAML](https://yaml.org/spec/)
- [js-yaml Documentation](https://github.com/nodeca/js-yaml)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 🔄 Mises à jour

### Dernières modifications

- **2025-01-08** : Migration vers YAML
- **2025-01-08** : Ajout de la référence des mappings
- **2025-01-08** : Création de cet index

### Prochaines étapes

- Validation du schéma YAML
- Templates pré-configurés
- Configuration interactive
- Documentation vidéo

## 📞 Contact

Pour toute question ou suggestion :
1. Ouvrez une issue sur GitHub
2. Consultez la documentation
3. Testez avec les scripts fournis

---

**Dernière mise à jour:** 2025-01-08  
**Version:** 1.1.0  
**Mainteneur:** Context Master Team
