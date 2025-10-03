# Configuration MCP - Context Master

## 🔒 Sécurité

**IMPORTANT :** Ce dossier contient des fichiers de configuration avec clés API sensibles.

- ✅ `settings.template.json` - Template public (sans clés réelles)
- ❌ `settings.json` - Configuration privée (IGNORÉ par Git)

## 🚀 Setup Rapide

### 1. Première installation :
```bash
# Exécuter le script automatique
.\setup-mcp-security.bat
```

### 2. Configuration manuelle :
```bash
# Copier le template
copy settings.template.json settings.json

# Éditer settings.json avec tes vraies clés
notepad settings.json
```

## 🔑 Clés API Requises

### GitHub Token (Obligatoire)
- **Où l'obtenir :** https://github.com/settings/tokens
- **Permissions :** `public_repo`, `read:user`
- **Format :** `ghp_xxxxxxxxxxxxxxxxxx`

### Brave Search API (Optionnel)
- **Où l'obtenir :** https://api.search.brave.com/app/keys
- **Usage :** Recherche web dans les outils MCP

## 📋 Checklist de Sécurité

Avant chaque commit Git :
- [ ] `git status` ne montre pas `settings.json`
- [ ] Seul `settings.template.json` est dans le repo
- [ ] Variables d'environnement configurées

## 🛠️ Exemple de Configuration

### Template Public (settings.template.json)
```json
{
  "mcpServers": {
    "mcp-context-master": {
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Configuration Réelle (settings.json)
```json
{
  "mcpServers": {
    "mcp-context-master": {
      "env": {
        "GITHUB_TOKEN": "ghp_ton_vrai_token_ici"
      }
    }
  }
}
```

## 🆘 Support

- **Guide complet :** `docs/MCP-SECURITY-GUIDE.md`
- **Variables d'env :** `.env.example`
- **Script setup :** `setup-mcp-security.bat`

---

**Règle d'or :** Ne jamais committer `settings.json` avec de vraies clés API !