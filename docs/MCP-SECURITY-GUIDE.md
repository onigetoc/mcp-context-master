# Guide de Sécurité MCP - Gestion des Clés API

## 🚨 Problème Identifié

**Situation dangereuse :** Les fichiers de configuration MCP contiennent des clés API sensibles qui peuvent être accidentellement commitées sur Git.

**Conséquences :**
- Exposition des tokens GitHub, Brave API, etc.
- Blocage Git pendant 15+ minutes
- Risque de sécurité majeur

## ✅ Solution Complète

### 1. **Structure de Fichiers Sécurisée**

```
.gemini/
├── settings.json          ← IGNORÉ par Git (contient tes vraies clés)
├── settings.template.json ← PUBLIQUE (variables ${...})
└── README.md             ← Instructions de setup
```

### 2. **Workflow de Configuration**

#### **Première Installation :**
```bash
# 1. Clone le projet
git clone [ton-repo]
cd mcp-context-master

# 2. Copie le template
copy .gemini\settings.template.json .gemini\settings.json

# 3. Configure tes variables d'environnement (voir section suivante)

# 4. Remplace les ${VARIABLES} par tes vraies clés dans settings.json
```

#### **Variables d'Environnement Windows :**
```batch
# Méthode 1: Variables système (permanent)
setx GITHUB_TOKEN "ghp_ton_token_github_ici"
setx BRAVE_API_KEY "ton_brave_api_key_ici"

# Méthode 2: Variables session (temporaire)
set GITHUB_TOKEN=ghp_ton_token_github_ici
set BRAVE_API_KEY=ton_brave_api_key_ici
```

#### **Fichier .env (Alternative recommandée) :**
```env
# Fichier .env dans le root du projet
GITHUB_TOKEN=ghp_ton_token_github_ici
BRAVE_API_KEY=ton_brave_api_key_ici
```

### 3. **Configuration MCP Sécurisée**

#### **Template Public (settings.template.json) :**
```json
{
  "mcpServers": {
    "mcp-context-master": {
      "command": "node",
      "args": ["C:\\Users\\LENOVO\\APPS\\0-MCP\\mcp-context-master\\build\\index.js"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

#### **Configuration Réelle (settings.json - PRIVÉE) :**
```json
{
  "mcpServers": {
    "mcp-context-master": {
      "command": "node",
      "args": ["C:\\Users\\LENOVO\\APPS\\0-MCP\\mcp-context-master\\build\\index.js"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

### 4. **Protection Git (.gitignore)**

```gitignore
# Configuration directories avec clés API (SÉCURISÉ)
.gemini/
.kiro/settings/
.roo/settings/
.serena/settings/
.specify/settings/

# Fichiers de configuration avec secrets
*settings.json
*config.json
*.env*
!.env.example

# Mots-clés dangereux
*secret*
*token*
*api-key*
```

## 🛠️ Commandes d'Urgence

### **Si tu as déjà commité des clés API :**

```bash
# 1. Supprimer du cache Git
git rm --cached .gemini/settings.json
git rm --cached -r .gemini/

# 2. Ajouter au .gitignore si pas fait
echo ".gemini/" >> .gitignore

# 3. Commit la suppression
git add .gitignore
git commit -m "🔒 Sécuriser les configurations MCP - Supprimer les clés API"

# 4. Nettoyer l'historique (DANGEREUX - sauvegarde avant!)
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch .gemini/settings.json' \
--prune-empty --tag-name-filter cat -- --all
```

### **Révoquer les Clés Compromises :**

1. **GitHub Token :** https://github.com/settings/tokens
2. **Brave API :** https://api.search.brave.com/app/keys
3. **Autres APIs :** Vérifier les dashboards respectifs

## 📋 Checklist de Sécurité

### **Avant Chaque Commit :**
- [ ] Vérifier `git status` - aucun fichier `*settings.json`
- [ ] Vérifier `git diff --cached` - aucune clé API visible
- [ ] Tester `git add .` puis `git reset` pour voir ce qui serait ajouté

### **Configuration Initiale :**
- [ ] `.gitignore` contient `.gemini/` et `*settings.json`
- [ ] `settings.template.json` utilise `${VARIABLES}`
- [ ] Variables d'environnement configurées
- [ ] `settings.json` existe et fonctionne (ignoré par Git)

### **Partage du Projet :**
- [ ] Seul `settings.template.json` est dans le repo
- [ ] Documentation claire pour setup
- [ ] `.env.example` fourni si nécessaire

## 🚀 Workflow Recommandé

### **Développeur Principal (toi) :**
1. Travaille avec `.gemini/settings.json` (tes vraies clés)
2. Met à jour `.gemini/settings.template.json` si structure change
3. Commit seulement le template et la doc

### **Nouveaux Développeurs :**
1. Clone le repo
2. Copie `settings.template.json` → `settings.json`
3. Configure ses propres clés API
4. N'oublie jamais de commit `settings.json`

## ⚡ Script d'Installation Automatique

```batch
@echo off
echo 🔧 Configuration MCP sécurisée...

REM Copier le template
copy .gemini\settings.template.json .gemini\settings.json

echo ✅ Template copié vers settings.json
echo ⚠️  IMPORTANT: Configure tes clés API dans .gemini\settings.json
echo 📖 Voir: docs\MCP-SECURITY-GUIDE.md

pause
```

## 🎯 Résumé

**Règle d'or :** Sépare toujours les configurations publiques (templates) des configurations privées (avec vraies clés).

**En cas de doute :** Plutôt deux fois qu'une, vérifier `git status` avant `git add`.