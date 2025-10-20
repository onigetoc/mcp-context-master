# Corrections pour la détection de Kiro et l'initialisation

## Problèmes identifiés et corrigés

### 1. **Tool Selection Problem**
**Problème**: Kiro appelait directement `setup_project_context` au lieu de `initialize_context_master` pour "init context master"

**Corrections**:
- ✅ Amélioré la description de `initialize_context_master` avec "FIRST STEP" et "MUST be called FIRST"
- ✅ Amélioré la description de `setup_project_context` avec "SECOND STEP" et "ONLY be called AFTER initialize_context_master"
- ✅ Ajouté une vérification dans `setup_project_context` pour s'assurer que l'initialization a été faite

### 2. **Kiro Detection Problem**
**Problème**: Kiro n'était pas détecté correctement dans les mappings

**Corrections**:
- ✅ Ajouté "kiro ai" et "kiro ai assistant" aux clés de détection
- ✅ Ajouté Kiro comme extension ET comme IDE dans les mappings
- ✅ Amélioré la fonction `findMatch` pour être plus robuste avec la casse
- ✅ Ajouté des logs de debug détaillés pour tracer la détection

### 3. **YAML Update Problem**
**Problème**: Le fichier YAML existant n'était pas mis à jour avec les nouvelles valeurs

**Corrections**:
- ✅ Amélioré les instructions dans `initialize_context_master` pour insister sur la mise à jour
- ✅ Mis à jour le template `cm-ai-infos.md` avec des instructions plus claires
- ✅ Ajouté des exemples spécifiques pour Kiro et d'autres assistants

### 4. **File Path Problem**
**Problème**: Les fichiers étaient créés au mauvais endroit (ex: `.gemini/GEMINI.md` au lieu de `./GEMINI.md`)

**Corrections**:
- ✅ La logique de `buildContextFilePath` était déjà correcte
- ✅ Le problème venait de la non-détection de Kiro, maintenant corrigé

## Mappings mis à jour

### Extensions (priorité 1)
```typescript
{ keys: ["kiro", "kiro ai", "kiro ai assistant"], ruleFile: "context-master-instructions.md", contextDir: "./.kiro/steering/", type: "extension", agentsMD: false }
```

### IDEs (priorité 2)
```typescript
{ keys: ["kiro", "kiro ai", "kiro ai assistant"], ruleFile: "context-master-instructions.md", contextDir: "./.kiro/steering/", type: "ide", agentsMD: false }
```

## Configuration YAML recommandée pour Kiro

```yaml
provider: anthropic
model: claude-sonnet-4
ide: kiro
extension: kiro
```

## Workflow corrigé

1. **User**: "init context master"
2. **AI**: Appelle `initialize_context_master(projectPath)`
3. **AI**: Lit le template et met à jour/crée `cm-ai-infos.yaml` avec les bonnes valeurs
4. **AI**: Appelle `setup_project_context(projectPath)`
5. **System**: Détecte Kiro correctement et met à jour `.kiro/steering/context-master-instructions.md`

## Tests recommandés

Pour tester les corrections :

1. Supprimer le dossier `.context-master` existant
2. Dire "init context master" 
3. Vérifier que `initialize_context_master` est appelé en premier
4. Vérifier que le YAML est créé/mis à jour avec les bonnes valeurs Kiro
5. Vérifier que `setup_project_context` est appelé ensuite
6. Vérifier que le fichier est créé dans `.kiro/steering/context-master-instructions.md`
7. Vérifier qu'aucun fichier n'est créé dans des dossiers incorrects

## Logs de debug

Les logs de détection montreront maintenant :
```
Detected coding assistant: provider=anthropic, model=claude-sonnet-4, ide=kiro, extension=kiro
Checking extension: "kiro"
✅ Found extension match: kiro -> ./.kiro/steering/context-master-instructions.md
```

Au lieu de créer des fichiers au mauvais endroit ou de ne pas détecter Kiro.