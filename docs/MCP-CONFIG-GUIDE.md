# Guide des Configurations MCP - Qui Utilise Quoi ?

## 🤔 **Le Problème : Trop de Fichiers de Config !**

Il y a effectivement plein de façons d'ajouter des serveurs MCP avec différents fichiers JSON. Voici qui utilise vraiment quoi :

## 📁 **Configurations par IDE/Outil**

### **Claude Desktop**
- **Fichier :** `.gemini/settings.json` (dans le projet)
- **Format :** `{ "mcpServers": {...} }`
- **OU Alternative :** `C:\Users\LENOVO\APPS\0-MCP\mcp-configs\claude-settings.json` (externe - recommandé)
- **Import :** Settings → MCP → Import Configuration

### **Cursor IDE**
- **Fichier :** `cursor-settings.json` (à créer)
- **Format :** Similar à Claude
- **Configuration :** Via settings Cursor

### **Cline (VS Code Extension)**
- **Fichier :** Configuration via l'interface de l'extension
- **Pas de fichier JSON direct**

### **GitHub Copilot**
- **Fichier :** `.github/copilot-instructions.md`
- **Contenu :** Instructions de contexte, PAS de config MCP
- **Usage :** Copilot lit ce fichier pour comprendre le projet

### **Extension Kiro (VS Code)**
- **Fichier :** `.kiro/settings/mcp.json`
- **Format :** Spécifique à Kiro

## ❌ **Fichiers qui ne servent à RIEN**

### **`.vscode/mcp.json`** ← SUPPRIMÉ !
- **Utilisé par :** Rien du tout
- **Problème :** Contenait des clés API et allait être commité
- **Action :** Effacé, c'était un reste d'ancien test

## ✅ **Configuration Recommandée (Sécurisée)**

### **Approche 1 : Dans le Projet**
```
.gemini/
├── settings.json          ← IGNORÉ par Git (tes vraies clés)
└── settings.template.json ← PUBLIC (template sans clés)
```

### **Approche 2 : Externe (MEILLEURE)**
```
C:\Users\LENOVO\APPS\0-MCP\
├── mcp-context-master\           ← Projet Git
│   └── .gemini\settings.template.json  ← Template public
└── mcp-configs\                  ← HORS Git
    ├── claude-settings.json      ← Claude Desktop
    ├── cursor-settings.json      ← Cursor IDE
    └── cline-settings.json       ← Cline
```

## 🎯 **Règles Simples**

### **Pour éviter la confusion :**
1. **Claude Desktop :** Utilise `mcp-configs/claude-settings.json` (externe)
2. **Autres IDEs :** Crée des fichiers séparés dans `mcp-configs/`
3. **GitHub Copilot :** Utilise `.github/copilot-instructions.md`
4. **Projet Git :** Seulement les templates publics (`.template.json`)

### **Sécurité :**
- ❌ Jamais de vraies clés API dans le dépôt Git
- ✅ Configurations externes dans `mcp-configs/`
- ✅ Templates publics pour documentation

## 🔧 **Test Rapide : Vérifier ce qui fonctionne**

### **Claude Desktop**
```bash
# Test si tes MCP servers marchent
# Dans Claude: "List my available MCP tools"
# Tu devrais voir: mcp-context-master, mcp-easy-installer, etc.
```

### **VS Code Extensions**
```bash
# Vérifier si Cline/Kiro utilisent leur config respective
# Test dans l'interface de chaque extension
```

## 📝 **Résumé Final**

**Configurations ACTIVES dans ton projet :**

| Fichier | Utilisé par | Sécurité | Status |
|---------|-------------|----------|---------|
| `.gemini/settings.json` | Claude Desktop | ✅ Ignoré par Git | ACTIF |
| `mcp-configs/claude-settings.json` | Claude (externe) | ✅ Hors Git | RECOMMANDÉ |
| `.kiro/settings/mcp.json` | Extension Kiro | ⚠️ À vérifier | INCERTAIN |
| `.github/copilot-instructions.md` | GitHub Copilot | ✅ Public | ACTIF |

**Supprimé :**
- ~~`.vscode/mcp.json`~~ → Ne servait à rien, contenait des clés API

---

**🎯 Conclusion :** Utilise la méthode externe (`mcp-configs/`) pour éviter tout problème !