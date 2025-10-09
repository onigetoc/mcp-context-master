# Guide de Migration JSON vers YAML

## Vue d'ensemble

Context Master a migré de JSON vers YAML pour le fichier de configuration de l'assistant IA. Cette migration améliore la lisibilité et simplifie la maintenance.

## Changements principaux

### 1. Nouveau nom de fichier

| Ancien | Nouveau |
|--------|---------|
| `.context-master/ai-infos.json` | `.context-master/cm-ai-infos.yaml` |

### 2. Nouveau format

**Ancien format (JSON):**
```json
{
  "provider": "Anthropic",
  "model": "claude-sonnet-4-20250514",
  "ide": "Kiro",
  "extension": "Kiro"
}
```

**Nouveau format (YAML):**
```yaml
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

### 3. Rétrocompatibilité

Le système supporte les deux formats :
1. **Priorité 1:** Cherche `cm-ai-infos.yaml`
2. **Priorité 2:** Si absent, cherche `ai-infos.json`
3. **Erreur:** Si aucun n'existe, affiche un message d'erreur

## Modifications du code

### Fichiers modifiés

1. **`src/tools/coding-assistant.ts`**
   - Ajout du support YAML avec `js-yaml`
   - Lecture prioritaire du fichier YAML
   - Correction des bugs (contextDir dupliqué, match.file → match.ruleFile)

2. **`src/tools/setup.tool.ts`**
   - Création de `cm-ai-infos.yaml` au lieu de `ai-infos.json`
   - Messages mis à jour

3. **`test/test-coding-assistant.js`**
   - Support de la lecture YAML et JSON
   - Mappings mis à jour avec `ruleFile`

4. **`templates/cm-ai-infos.md`**
   - Template mis à jour pour générer du YAML

5. **`README.md`**
   - Documentation mise à jour

### Mapping mis à jour

Tous les mappings utilisent maintenant :
- `ruleFile` : Nom du fichier de règles (ex: "CLAUDE.md", ".cursorrules")
- `contextDir` : Répertoire de contexte (ex: ".claude/", ".cursor/")
- `type` : Type de mapping ("extension", "ide", "model", "provider")
- `agentsMD` : Support du fichier AGENTS.md

## Migration pour les utilisateurs

### Option 1 : Nouveau projet

Lors de l'exécution de `setup_project_context`, le fichier `cm-ai-infos.yaml` sera créé automatiquement.

### Option 2 : Projet existant avec JSON

Votre fichier `ai-infos.json` continuera de fonctionner. Aucune action requise.

### Option 3 : Migration manuelle

Créez le nouveau fichier YAML :

```yaml
# .context-master/cm-ai-infos.yaml
provider: YOUR_PROVIDER
model: YOUR_MODEL
ide: YOUR_IDE
extension: YOUR_EXTENSION
```

Vous pouvez ensuite supprimer l'ancien fichier JSON.

### Option 4 : Conversion automatique

```bash
# Convertir JSON vers YAML
node -e "const fs=require('fs');const yaml=require('js-yaml');const json=JSON.parse(fs.readFileSync('.context-master/ai-infos.json','utf8'));fs.writeFileSync('.context-master/cm-ai-infos.yaml',yaml.dump(json));"
```

## Tests

### Test du coding assistant

```bash
npm run build
node test/test-coding-assistant.js
```

### Test du setup

```bash
npm run build
node test/test-setup-tool.js
```

## Avantages du YAML

1. **Plus lisible** : Pas de guillemets ni d'accolades
2. **Plus simple** : Syntaxe minimaliste
3. **Standard** : Utilisé par Docker, Kubernetes, GitHub Actions
4. **Commentaires** : Support natif des commentaires
5. **Moins d'erreurs** : Pas de virgules oubliées
6. **Multilignes** : Support natif des chaînes multilignes

## Exemples

### Exemple basique

```yaml
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

### Exemple avec commentaires

```yaml
# Configuration de l'assistant IA
provider: Anthropic  # Fournisseur d'IA (Anthropic, OpenAI, Google)
model: claude-sonnet-4-20250514  # Modèle spécifique utilisé
ide: Kiro  # Environnement de développement (VS Code, Cursor, Kiro, Zed)
extension: Kiro  # Extension ou outil utilisé (Roo Code, Cline, GitHub Copilot)
```

### Exemple avec valeurs inconnues

```yaml
provider: UNKNOWN
model: UNKNOWN
ide: UNKNOWN
extension: UNKNOWN
```

## Dépannage

### Erreur : "No configuration file found"

**Cause:** Aucun fichier `cm-ai-infos.yaml` ou `ai-infos.json` trouvé.

**Solution:**
```bash
# Créer le fichier manuellement
echo "provider: YOUR_PROVIDER
model: YOUR_MODEL
ide: YOUR_IDE
extension: YOUR_EXTENSION" > .context-master/cm-ai-infos.yaml
```

### Erreur : "Could not parse configuration file"

**Cause:** Syntaxe YAML invalide.

**Solution:** Vérifiez l'indentation et la syntaxe :
```yaml
# ✅ Correct
provider: Anthropic
model: claude-sonnet-4

# ❌ Incorrect (guillemets inutiles)
provider: "Anthropic"
model: "claude-sonnet-4"

# ❌ Incorrect (indentation)
  provider: Anthropic
model: claude-sonnet-4
```

### Le fichier JSON est toujours utilisé

**Cause:** Le fichier YAML n'existe pas, donc le système utilise le JSON.

**Solution:** Créez le fichier YAML pour qu'il soit prioritaire.

## Compatibilité

### Versions supportées

- **YAML:** Nouveau format recommandé (depuis v1.0.0)
- **JSON:** Format legacy supporté pour rétrocompatibilité

### Dépendances

- `js-yaml` : ^4.1.0 (déjà installé)
- `@types/js-yaml` : ^4.0.9 (déjà installé)

## Ressources

- [Spécification YAML](https://yaml.org/spec/)
- [js-yaml Documentation](https://github.com/nodeca/js-yaml)
- [YAML vs JSON](https://www.cloudbees.com/blog/yaml-vs-json)

## Support

Pour toute question ou problème :
1. Vérifiez ce guide de migration
2. Consultez `.context-master/README-YAML-MIGRATION.md`
3. Ouvrez une issue sur GitHub
