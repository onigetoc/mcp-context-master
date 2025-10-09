# Migration JSON vers YAML pour cm-ai-infos

## Changements effectués

### 1. Nouveau format de fichier

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

### 2. Nom du fichier

- **Ancien:** `.context-master/ai-infos.json`
- **Nouveau:** `.context-master/cm-ai-infos.yaml`

### 3. Rétrocompatibilité

Le système supporte les deux formats avec priorité au YAML :
1. Cherche d'abord `cm-ai-infos.yaml`
2. Si absent, cherche `ai-infos.json`
3. Si aucun n'existe, affiche un message d'erreur

### 4. Modifications du code

#### `src/tools/coding-assistant.ts`
- Ajout de l'import `js-yaml`
- Support de la lecture YAML et JSON
- Correction des bugs :
  - `contextDir` dupliqué pour Kiro
  - `match.file` → `match.ruleFile`
  - Paramètre `request` non utilisé → `_request`

#### `test/test-coding-assistant.js`
- Support de la lecture YAML et JSON
- Mise à jour des mappings avec `ruleFile` au lieu de `file`
- Messages d'erreur mis à jour

#### `templates/cm-ai-infos.md`
- Template mis à jour pour générer du YAML
- Instructions clarifiées

### 5. Mapping mis à jour

Tous les mappings utilisent maintenant :
- `ruleFile` : Nom du fichier de règles
- `contextDir` : Répertoire de contexte
- Plus de propriété `file` obsolète

## Migration pour les utilisateurs

### Option 1 : Créer un nouveau fichier YAML

```yaml
# .context-master/cm-ai-infos.yaml
provider: YOUR_PROVIDER
model: YOUR_MODEL
ide: YOUR_IDE
extension: YOUR_EXTENSION
```

### Option 2 : Garder le fichier JSON existant

Le système continuera à fonctionner avec `ai-infos.json` si vous ne créez pas le fichier YAML.

### Option 3 : Convertir automatiquement

```bash
# Lire le JSON existant et créer le YAML
node -e "const fs=require('fs');const yaml=require('js-yaml');const json=JSON.parse(fs.readFileSync('.context-master/ai-infos.json','utf8'));fs.writeFileSync('.context-master/cm-ai-infos.yaml',yaml.dump(json));"
```

## Tests

Pour tester la configuration :

```bash
npm run build
node test/test-coding-assistant.js
```

Le test vérifie :
- Lecture du fichier YAML ou JSON
- Parsing correct des données
- Identification du bon fichier de règles
- Affichage des informations de debug

## Avantages du YAML

1. **Plus lisible** : Pas de guillemets ni d'accolades
2. **Plus simple** : Syntaxe minimaliste
3. **Standard** : Utilisé par Docker, Kubernetes, GitHub Actions
4. **Commentaires** : Support natif des commentaires
5. **Moins d'erreurs** : Pas de virgules oubliées

## Exemple avec commentaires

```yaml
# Configuration de l'assistant IA
provider: Anthropic  # Fournisseur d'IA
model: claude-sonnet-4-20250514  # Modèle spécifique
ide: Kiro  # Environnement de développement
extension: Kiro  # Extension utilisée
```
