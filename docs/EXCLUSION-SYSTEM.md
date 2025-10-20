# Système d'Exclusion des Librairies

## Vue d'ensemble

Le système d'exclusion de Context Master permet de filtrer intelligemment les dépendances lors du setup automatique, évitant de télécharger de la documentation pour des librairies trop communes ou déjà bien connues des LLM.

## Objectifs

- **Réduire le bruit** : Éviter les librairies trop communes (React, Express, Lodash)
- **Économiser les ressources** : Moins de téléchargements inutiles
- **Améliorer la pertinence** : Se concentrer sur les librairies spécialisées
- **Maintenir la performance** : Réduire la taille du contexte

## Catégories d'Exclusion

### 🚫 **UI Libraries Communes**
- `@radix-ui/*`, `@mui/*`, `bootstrap`, `tailwindcss`
- **Raison** : Bien documentées, génèrent beaucoup de CSS inutile

### 🚫 **Node.js Built-ins**
- `fs`, `path`, `http`, `crypto`, `util`, etc.
- **Raison** : Déjà inclus dans Node.js, bien connus des LLM

### 🚫 **Frameworks Très Communs**
- `react`, `vue`, `express`, `lodash`, `axios`
- **Raison** : Parfaitement maîtrisés par les LLM

### 🚫 **Testing Libraries**
- `jest`, `cypress`, `@testing-library/*`
- **Raison** : Documentation extensive disponible

### 🚫 **Build Tools**
- `webpack`, `babel`, `eslint`, `prettier`, `typescript`
- **Raison** : Plus de configuration que de code

### 🚫 **Type Definitions**
- `@types/*`
- **Raison** : Pas besoin de documentation pour les types

### 🚫 **CSS Frameworks**
- `bootstrap`, `tailwindcss`, `@mui/*`
- **Raison** : Trop de contenu styling inutile

### 🚫 **Utilities Basiques**
- `uuid`, `chalk`, `debug`, `classnames`
- **Raison** : Simples et bien documentées

## Librairies Spécialisées (Toujours Gardées)

### ✅ **Extensions Node.js**
- `fs-extra`, `path-extra`

### ✅ **ORM & Databases**
- `prisma`, `@prisma/client`

### ✅ **API Frameworks Spécialisés**
- `trpc`, `@trpc/server`, `graphql`, `@apollo/client`

### ✅ **Librairies Métier**
- `remotion` (vidéo), `stripe` (paiement), `clerk` (auth)
- `supabase`, `firebase` (backend)

### ✅ **Spécialisations Techniques**
- `three` (3D), `d3` (visualisation), `sharp` (images)
- `electron` (desktop), `puppeteer` (automation)

### ✅ **Processing Spécialisé**
- `pdf-lib`, `xml2js`, `csv-parser`, `cheerio`

### ✅ **Security & Middleware**
- `bcrypt`, `jsonwebtoken`, `helmet`, `passport`

### ✅ **Job Queues & Communication**
- `bull`, `socket.io`, `nodemailer`

## Résultats

### Exemple Concret
**Projet avec 24 dépendances** → **11 documentées** (54% de réduction)

**Exclues (13)** :
- react, lodash, axios, uuid (communes)
- @radix-ui/react-dialog, tailwindcss (UI/CSS)
- @types/node, @types/react (types)
- typescript, eslint, prettier (build)
- jest, @testing-library/react (test)

**Gardées (11)** :
- next, prisma, @prisma/client (spécialisées)
- trpc, @trpc/server (API spécialisé)
- remotion, stripe (métier)
- fs-extra, sharp, three, zustand (techniques)

## Configuration

### Fichier Principal
`src/utils/exclusion-list.ts`

### Fonctions Principales
```typescript
// Vérifier si une librairie doit être exclue
shouldDownloadDocumentation(libraryName: string): ExclusionResult

// Vérifier si une librairie est spécialisée
isSpecializedLibrary(libraryName: string): boolean
```

### Intégration
Le système est automatiquement utilisé dans :
- `src/parsers/package-parser.ts` (Node.js)
- `src/parsers/package-parser.ts` (Python)

## Logs de Debug

Le système fournit des logs clairs :
```
DEBUG: ⏭️  Skipping react: commonFrameworks (react)
DEBUG: ⏭️  Skipping @types/node: typeDefinitions (@types/)
DEBUG: ✓ Found 11 dependencies to search for
```

## Maintenance

### Ajouter une Exclusion
```typescript
// Dans MCP_EXCLUSION_LIST
newCategory: [
  "library-name", "another-lib"
]
```

### Ajouter une Spécialisation
```typescript
// Dans SPECIALIZED_LIBRARIES
"new-specialized-lib", "@scope/specialized"
```

### Priorité
Les librairies spécialisées **overrident** les exclusions.

## Avantages

1. **Performance** : Moins de téléchargements
2. **Pertinence** : Contexte plus ciblé
3. **Maintenance** : Logs clairs des décisions
4. **Flexibilité** : Système facilement extensible
5. **Intelligence** : Distinction commune/spécialisée

## Tests

```bash
# Tester le système d'exclusion
node test/test-exclusion-system.js

# Tester avec un package.json réel
node test/test-package-parsing.js
```

Le système d'exclusion transforme Context Master d'un outil qui télécharge tout en un assistant intelligent qui sait quoi documenter et quoi ignorer.