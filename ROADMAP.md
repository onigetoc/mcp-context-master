# MCP Context Master - Roadmap & Task List

## 🎯 **Vision du projet**
Créer un MCP server intelligent qui aide les développeurs à démarrer leurs projets en trouvant et téléchargeant automatiquement la documentation contextuelle la plus pertinente.

## ✅ **Fonctionnalités actuelles (Terminées)**

### Core Features
- [x] Analyse automatique des projets (package.json, requirements.txt)
- [x] Recherche GitHub avec normalisation des packages scoped (@scope/package)
- [x] Génération d'URLs Context7 avec paramètres (topic, tokens)
- [x] Téléchargement automatique de documentation
- [x] Noms de fichiers intelligents (modelcontextprotocol-sdk-context.md)
- [x] Gestion des erreurs et rate limiting
- [x] Script CLI de test avec téléchargement (`search-test.js`)

### Architecture
- [x] Structure MCP complète avec tools et handlers
- [x] Parsers modulaires (package.json, requirements.txt, README)
- [x] Support Node.js et Python
- [x] Logging et debugging

## 🚧 **En cours / Priorité haute**

### Validation et qualité des résultats
- [ ] **Système de scoring automatique des repos**
  - [ ] Score basé sur stars, forks, activité récente
  - [ ] Détection des repos archivés/abandonnés
  - [ ] Évaluation de la qualité de documentation
  - [ ] Correspondance nom/query (exact match vs fuzzy)

- [ ] **Métadonnées enrichies dans les résultats**
  - [ ] Ajout de `relevanceScore`, `lastUpdated`, `isActive`
  - [ ] Indicateurs de santé du projet
  - [ ] Raisons de la sélection (`matchReasons`)

### Guidance pour LLMs
- [ ] **Steering files pour critères d'évaluation**
  - [ ] `.kiro/steering/project-validation-criteria.md`
  - [ ] `.kiro/steering/dependency-selection-guidelines.md`
  - [ ] Critères spécifiques par langage/framework

- [ ] **Instructions intégrées dans les réponses MCP**
  - [ ] Section "guidance" avec critères d'évaluation
  - [ ] Red flags à éviter
  - [ ] Suggestions de next steps

## 📋 **Backlog / Priorité moyenne**

### Amélioration de la recherche
- [ ] **Support de plus de langages**
  - [ ] Go (go.mod)
  - [ ] Rust (Cargo.toml)
  - [ ] Java (pom.xml, build.gradle)
  - [ ] C# (.csproj, packages.config)

- [ ] **Recherche multi-critères**
  - [ ] Filtrage par langage de programmation
  - [ ] Filtrage par licence
  - [ ] Filtrage par date de dernière activité
  - [ ] Recherche par topics GitHub

- [ ] **Amélioration des queries de recherche**
  - [ ] Synonymes et termes alternatifs
  - [ ] Recherche par description/README
  - [ ] Exclusion de mots-clés non pertinents

### Gestion des téléchargements
- [ ] **Organisation intelligente des fichiers**
  - [ ] Sous-dossiers par catégorie (web-frameworks/, ui-libraries/)
  - [ ] Métadonnées dans les noms de fichiers (axios-http-client-context.md)
  - [ ] Index automatique des fichiers téléchargés

- [ ] **Gestion des versions et mises à jour**
  - [ ] Détection des fichiers existants
  - [ ] Mise à jour automatique si nouvelle version
  - [ ] Historique des versions téléchargées

### Interface et UX
- [ ] **Amélioration du CLI**
  - [ ] Mode interactif pour sélectionner les résultats
  - [ ] Preview du contenu avant téléchargement
  - [ ] Batch download de plusieurs résultats

- [ ] **Configuration utilisateur**
  - [ ] Fichier de config pour préférences par défaut
  - [ ] Blacklist de packages à ignorer
  - [ ] Templates de noms de fichiers personnalisés

## 🔮 **Idées futures / Priorité basse**

### Intelligence avancée
- [ ] **Analyse de dépendances transitive**
  - [ ] Analyse des dépendances des dépendances
  - [ ] Détection des conflits potentiels
  - [ ] Suggestions d'alternatives

- [ ] **Apprentissage des préférences**
  - [ ] Historique des téléchargements
  - [ ] Scoring basé sur l'utilisation
  - [ ] Recommandations personnalisées

### Intégrations
- [ ] **Support d'autres sources de documentation**
  - [ ] npm registry pour packages Node.js
  - [ ] PyPI pour packages Python
  - [ ] Documentation officielle (MDN, etc.)

- [ ] **Intégration avec d'autres outils**
  - [ ] Export vers Obsidian/Notion
  - [ ] Génération de README automatique
  - [ ] Intégration avec package managers

## 🎯 **Prochaines étapes immédiates**

1. **Implémenter le système de scoring** (1-2 jours)
2. **Créer les steering files de base** (1 jour)
3. **Enrichir les métadonnées des résultats** (1 jour)
4. **Tester avec différents types de projets** (1 jour)

## 📝 **Notes de développement**

### Décisions architecturales
- Garder la logique MCP simple et focalisée
- Éviter les appels LLM directs (pas dans le scope MCP)
- Privilégier les métadonnées riches pour guider les LLMs
- Maintenir la compatibilité avec tous les IDE AI (Cursor, Kiro, Cline, etc.)

### Métriques de succès
- Temps de setup d'un nouveau projet < 2 minutes
- Pertinence des résultats > 80%
- Adoption par la communauté MCP
- Feedback positif des développeurs

---

**Dernière mise à jour :** 19 août 2025
**Version actuelle :** 1.0.0
**Prochaine version :** 1.1.0 (scoring + validation)