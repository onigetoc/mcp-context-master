# Référence des Mappings de Contexte

## Vue d'ensemble

Ce document décrit le système de mapping utilisé par Context Master pour déterminer quel fichier de règles utiliser en fonction de l'assistant IA, de l'IDE, du modèle ou du fournisseur.

## Structure du Mapping

Chaque mapping contient :

```typescript
{
  keys: string[],        // Mots-clés de recherche (case-insensitive)
  ruleFile: string,      // Nom du fichier de règles
  contextDir: string,    // Répertoire de contexte
  type: string,          // Type de mapping
  agentsMD: boolean      // Support du fichier AGENTS.md
}
```

## Types de Mapping

### 1. Extensions (Priorité 1)

Extensions ou outils d'IA qui s'exécutent dans un IDE.

| Extension | Mots-clés | Fichier de règles | Répertoire |
|-----------|-----------|-------------------|------------|
| Roo Code | `roo code`, `roo-code`, `roo` | `ROO.md` | `.roo/` |
| Cline | `cline` | `.clinerules` | `.cline/` |
| Kilo Code | `kilo code`, `kilo-code`, `kilocode` | `KILOCODE.md` | `.kilocode/` |
| GitHub Copilot | `github copilot`, `copilot` | `copilot-instructions.md` | `.github/` |
| Claude Code | `claude code` | `CLAUDE.md` | `.claude/` |
| Gemini CLI | `gemini cli` | `GEMINI.md` | `.gemini/` |
| Warp | `warp` | `WARP.md` | `.warp/` |
| Windsurf | `windsurf` | `WINDSURF.md` | `.windsurf/` |
| Auggie | `auggie` | `AUGMENT.md` | `.augment/` |
| OpenCode | `opencode` | `OPENCODE.md` | `.opencode/` |
| Codex | `codex` | `CODEX.md` | `.codex/` |

### 2. IDEs (Priorité 2)

Environnements de développement intégrés.

| IDE | Mots-clés | Fichier de règles | Répertoire |
|-----|-----------|-------------------|------------|
| Cursor | `cursor` | `.cursorrules` | `.cursor/` |
| VS Code | `vs code`, `vscode`, `visual studio code` | `VSCODE.md` | `.vscode/` |
| Kiro | `kiro` | `kiro/steering/context-master-instructions.md` | `.kiro/` |
| Zed | `zed` | `ZED.md` | `.zed/` |

### 3. Models (Priorité 3)

Modèles d'IA spécifiques.

| Modèle | Mots-clés | Fichier de règles | Répertoire |
|--------|-----------|-------------------|------------|
| Gemini | `gemini` | `GEMINI.md` | `.gemini/` |
| Claude | `claude` | `CLAUDE.md` | `.claude/` |
| GPT | `gpt` | `OPENAI.md` | `.openai/` |
| Copilot | `copilot` | `copilot-instructions.md` | `.github/` |
| Qwen | `qwen` | `QWEN.md` | `.qwen/` |

### 4. Providers (Priorité 4)

Fournisseurs de services d'IA.

| Fournisseur | Mots-clés | Fichier de règles | Répertoire |
|-------------|-----------|-------------------|------------|
| Google | `google` | `GEMINI.md` | `.gemini/` |
| Anthropic | `anthropic` | `CLAUDE.md` | `.claude/` |
| OpenAI | `openai` | `OPENAI.md` | `.openai/` |

### 5. Shared (Fallback)

Fichier partagé utilisé comme fallback.

| Type | Mots-clés | Fichier de règles | Répertoire |
|------|-----------|-------------------|------------|
| Agents | `agents.md`, `agents` | `AGENTS.md` | `null` |

## Logique de Résolution

### Ordre de priorité

1. **Extension** - Vérifie d'abord l'extension
2. **IDE** - Si pas d'extension, vérifie l'IDE
3. **Model** - Si pas d'IDE, vérifie le modèle
4. **Provider** - Si pas de modèle, vérifie le fournisseur
5. **Fallback** - Si rien ne correspond, utilise `AGENTS.md`

### Algorithme de matching

```typescript
function findMatch(value: string, type: string) {
  const lowerValue = value.toLowerCase();
  return contextMappings.find(mapping => 
    mapping.type === type && 
    mapping.keys.some(key => lowerValue.includes(key))
  );
}
```

**Caractéristiques:**
- **Case-insensitive** - `Kiro`, `kiro`, `KIRO` sont équivalents
- **Substring matching** - `GitHub Copilot` matche `copilot`
- **Multiple keywords** - Plusieurs mots-clés par mapping

### Validation des valeurs

```typescript
function isValid(val?: string) {
  return val && 
         val.trim() !== "" && 
         val.trim().toLowerCase() !== "unknown";
}
```

**Valeurs ignorées:**
- `undefined`
- `null`
- Chaîne vide `""`
- `"unknown"` (case-insensitive)

## Exemples de Configuration

### Exemple 1 : Kiro

```yaml
provider: Anthropic
model: claude-sonnet-4-20250514
ide: Kiro
extension: Kiro
```

**Résolution:**
1. Extension `Kiro` → Match `kiro` → `kiro/steering/context-master-instructions.md`

### Exemple 2 : GitHub Copilot

```yaml
provider: GitHub
model: GitHub Copilot
ide: VS Code
extension: GitHub Copilot
```

**Résolution:**
1. Extension `GitHub Copilot` → Match `copilot` → `copilot-instructions.md`

### Exemple 3 : Cursor

```yaml
provider: Anthropic
model: claude-sonnet-4
ide: Cursor
extension: UNKNOWN
```

**Résolution:**
1. Extension `UNKNOWN` → Ignoré (invalide)
2. IDE `Cursor` → Match `cursor` → `.cursorrules`

### Exemple 4 : Gemini CLI

```yaml
provider: Google
model: gemini-2.0-flash
ide: VS Code
extension: Gemini CLI
```

**Résolution:**
1. Extension `Gemini CLI` → Match `gemini cli` → `GEMINI.md`

### Exemple 5 : Fallback

```yaml
provider: Custom
model: custom-model
ide: Custom IDE
extension: Custom Extension
```

**Résolution:**
1. Extension `Custom Extension` → Pas de match
2. IDE `Custom IDE` → Pas de match
3. Model `custom-model` → Pas de match
4. Provider `Custom` → Pas de match
5. Fallback → `AGENTS.md`

## Cas d'usage spéciaux

### Copilot (Ambiguïté)

Le mot-clé `copilot` apparaît dans deux types :
- **Extension:** `github copilot` → `copilot-instructions.md`
- **Model:** `copilot` → `copilot-instructions.md`

**Résolution:** Les deux pointent vers le même fichier, donc pas de conflit.

### Gemini (Multiple mappings)

Le mot-clé `gemini` apparaît dans :
- **Extension:** `gemini cli` → `GEMINI.md`
- **Model:** `gemini` → `GEMINI.md`
- **Provider:** `google` → `GEMINI.md`

**Résolution:** Tous pointent vers `GEMINI.md`, cohérence garantie.

### Kiro (Chemin spécial)

Kiro utilise un chemin de fichier spécial :
- **Fichier:** `kiro/steering/context-master-instructions.md`
- **Répertoire:** `.kiro/`

**Note:** Le fichier est dans un sous-répertoire de `.kiro/`.

## Ajout d'un nouveau mapping

### Étape 1 : Identifier le type

Déterminez si c'est une extension, un IDE, un modèle ou un fournisseur.

### Étape 2 : Choisir les mots-clés

Choisissez des mots-clés uniques et descriptifs :
- Nom complet : `"my awesome tool"`
- Nom court : `"mat"`
- Variations : `"my-awesome-tool"`, `"myawesometool"`

### Étape 3 : Définir les chemins

- **ruleFile:** Nom du fichier de règles (ex: `MYTOOL.md`)
- **contextDir:** Répertoire de contexte (ex: `.mytool/`)

### Étape 4 : Ajouter au mapping

```typescript
// Dans src/tools/coding-assistant.ts
const contextMappings = [
  // ... autres mappings
  
  // Votre nouveau mapping
  { 
    keys: ["my awesome tool", "mat", "my-awesome-tool"], 
    ruleFile: "MYTOOL.md", 
    contextDir: ".mytool/", 
    type: "extension", 
    agentsMD: true 
  },
];
```

### Étape 5 : Tester

```bash
# Créer un fichier de test
echo "provider: Custom
model: custom-model
ide: Custom IDE
extension: My Awesome Tool" > .context-master/cm-ai-infos.yaml

# Compiler et tester
npm run build
node test/test-coding-assistant.js
```

## Support AGENTS.md

Le champ `agentsMD` indique si le mapping supporte le fichier `AGENTS.md` :

- `true` : Le fichier de règles peut être combiné avec `AGENTS.md`
- `false` : Le fichier de règles est autonome

**Exemple:**
- Kiro : `agentsMD: false` (utilise son propre système de steering)
- Warp : `agentsMD: false` (configuration spécifique)
- Autres : `agentsMD: true` (peuvent utiliser AGENTS.md)

## Dépannage

### Problème : Mauvais fichier de règles

**Symptôme:** Le système utilise le mauvais fichier de règles.

**Solutions:**
1. Vérifiez l'ordre de priorité (extension > ide > model > provider)
2. Vérifiez les mots-clés dans le mapping
3. Vérifiez la valeur dans `cm-ai-infos.yaml`
4. Testez avec `node test/test-coding-assistant.js`

### Problème : Fallback vers AGENTS.md

**Symptôme:** Le système utilise toujours `AGENTS.md`.

**Solutions:**
1. Vérifiez que les valeurs ne sont pas `UNKNOWN`
2. Vérifiez que les mots-clés correspondent
3. Vérifiez la casse (case-insensitive mais doit contenir le mot-clé)

### Problème : Nouveau mapping non reconnu

**Symptôme:** Votre nouveau mapping n'est pas utilisé.

**Solutions:**
1. Recompilez avec `npm run build`
2. Vérifiez la syntaxe du mapping
3. Vérifiez que le type est correct
4. Testez avec des valeurs de debug

## Ressources

- **Code source:** `src/tools/coding-assistant.ts`
- **Tests:** `test/test-coding-assistant.js`
- **Documentation:** `docs/YAML-MIGRATION-GUIDE.md`

---

**Dernière mise à jour:** 2025-01-08  
**Version:** 1.1.0
