# Changelog - Migration JSON vers YAML

## Version 1.1.0 - Migration YAML (2025-01-08)

### 🎉 Nouveautés

#### Nouveau format de configuration YAML
- **Fichier:** `.context-master/cm-ai-infos.yaml` (remplace `ai-infos.json`)
- **Format:** YAML au lieu de JSON pour une meilleure lisibilité
- **Rétrocompatibilité:** Support complet du format JSON legacy

#### Script de migration automatique
- **Commande:** `npm run migrate`
- **Fonctionnalités:**
  - Détection automatique des fichiers existants
  - Conversion JSON → YAML
  - Option de suppression du fichier JSON (`--delete-json`)
  - Messages d'aide et de progression

### 🔧 Modifications techniques

#### `src/tools/coding-assistant.ts`
- ✅ Ajout du support YAML avec `js-yaml`
- ✅ Lecture prioritaire du fichier YAML
- ✅ Fallback automatique vers JSON si YAML absent
- ✅ Correction du bug `contextDir` dupliqué pour Kiro
- ✅ Correction `match.file` → `match.ruleFile`
- ✅ Correction paramètre `request` non utilisé → `_request`

#### `src/tools/setup.tool.ts`
- ✅ Création de `cm-ai-infos.yaml` au lieu de `ai-infos.json`
- ✅ Détection des deux formats (YAML et JSON)
- ✅ Messages mis à jour dans les logs
- ✅ Documentation mise à jour

#### `test/test-coding-assistant.js`
- ✅ Support de la lecture YAML et JSON
- ✅ Mappings mis à jour avec `ruleFile` au lieu de `file`
- ✅ Messages d'erreur améliorés
- ✅ Affichage du type de fichier utilisé

#### `test/test-setup-tool.js`
- ✅ Vérification de `cm-ai-infos.yaml` au lieu de `ai-infos.json`
- ✅ Lecture et affichage du contenu YAML

#### `templates/cm-ai-infos.md`
- ✅ Template mis à jour pour générer du YAML
- ✅ Instructions clarifiées
- ✅ Exemples mis à jour

### 📚 Documentation

#### Nouveaux fichiers
- `docs/YAML-MIGRATION-GUIDE.md` - Guide complet de migration
- `.context-master/README-YAML-MIGRATION.md` - Documentation technique
- `scripts/migrate-to-yaml.js` - Script de migration automatique
- `CHANGELOG-YAML-MIGRATION.md` - Ce fichier

#### Fichiers mis à jour
- `README.md` - Exemples et références mis à jour
- `package.json` - Ajout du script `migrate`

### 🐛 Corrections de bugs

1. **Kiro contextDir dupliqué**
   - Avant: `contextDir: ".KIRO.md", contextDir: ".kiro/"`
   - Après: `contextDir: ".kiro/"`

2. **Propriété `file` inexistante**
   - Avant: `match.file`
   - Après: `match.ruleFile`

3. **Paramètre non utilisé**
   - Avant: `request: any`
   - Après: `_request: any`

4. **Fichier copie obsolète**
   - Suppression de `src/tools/coding-assistant copy.ts`

### 📊 Mapping mis à jour

Tous les mappings utilisent maintenant une structure cohérente :

```typescript
{
  keys: string[],        // Mots-clés de recherche
  ruleFile: string,      // Nom du fichier de règles
  contextDir: string,    // Répertoire de contexte
  type: string,          // Type (extension, ide, model, provider)
  agentsMD: boolean      // Support AGENTS.md
}
```

### 🔄 Rétrocompatibilité

#### Priorité de lecture
1. **Priorité 1:** `.context-master/cm-ai-infos.yaml`
2. **Priorité 2:** `.context-master/ai-infos.json`
3. **Erreur:** Message si aucun fichier trouvé

#### Migration transparente
- Les projets existants continuent de fonctionner avec JSON
- Aucune action requise pour les utilisateurs
- Migration optionnelle avec `npm run migrate`

### 🎯 Avantages du YAML

1. **Lisibilité améliorée**
   - Pas de guillemets ni d'accolades
   - Syntaxe minimaliste et claire

2. **Maintenance simplifiée**
   - Support natif des commentaires
   - Moins d'erreurs de syntaxe (pas de virgules)

3. **Standard industriel**
   - Utilisé par Docker, Kubernetes, GitHub Actions
   - Familier pour les développeurs

4. **Fonctionnalités avancées**
   - Support des chaînes multilignes
   - Ancres et références YAML

### 📝 Exemples

#### Avant (JSON)
```json
{
  "provider": "Anthropic",
  "model": "claude-sonnet-4-20250514",
  "ide": "Kiro",
  "extension": "Kiro"
}
```

#### Après (YAML)
```yaml
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

#### Avec commentaires (YAML)
```yaml
# Configuration de l'assistant IA
provider: Anthropic  # Fournisseur d'IA
model: claude-sonnet-4-20250514  # Modèle spécifique
ide: Kiro  # Environnement de développement
extension: Kiro  # Extension utilisée
```

### 🧪 Tests

#### Tests réussis
- ✅ Lecture du fichier YAML
- ✅ Fallback vers JSON
- ✅ Parsing des données
- ✅ Identification du fichier de règles
- ✅ Création du fichier YAML lors du setup
- ✅ Script de migration

#### Commandes de test
```bash
npm run build
node test/test-coding-assistant.js
node test/test-setup-tool.js
npm run migrate
```

### 🚀 Migration

#### Option 1 : Automatique
```bash
npm run migrate
```

#### Option 2 : Manuelle
```bash
# Créer le fichier YAML
echo "provider: YOUR_PROVIDER
model: YOUR_MODEL
ide: YOUR_IDE
extension: YOUR_EXTENSION" > .context-master/cm-ai-infos.yaml
```

#### Option 3 : Conversion Node.js
```bash
node -e "const fs=require('fs');const yaml=require('js-yaml');const json=JSON.parse(fs.readFileSync('.context-master/ai-infos.json','utf8'));fs.writeFileSync('.context-master/cm-ai-infos.yaml',yaml.dump(json));"
```

### 📦 Dépendances

#### Nouvelles dépendances
Aucune - `js-yaml` était déjà installé

#### Versions
- `js-yaml`: ^4.1.0
- `@types/js-yaml`: ^4.0.9

### 🔮 Prochaines étapes

1. Dépréciation progressive du format JSON
2. Migration automatique lors du setup
3. Avertissement si JSON utilisé
4. Suppression du support JSON dans v2.0.0 (optionnel)

### 📞 Support

Pour toute question ou problème :
1. Consultez `docs/YAML-MIGRATION-GUIDE.md`
2. Vérifiez `.context-master/README-YAML-MIGRATION.md`
3. Exécutez `npm run migrate` pour une migration automatique
4. Ouvrez une issue sur GitHub

---

**Date de release:** 2025-01-08  
**Version:** 1.1.0  
**Type:** Feature + Bugfix  
**Breaking changes:** Non (rétrocompatible)
