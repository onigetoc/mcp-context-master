@echo off
title Configuration MCP Sécurisée - Context Master
color 0A

echo.
echo ========================================
echo 🔧 Configuration MCP Sécurisée
echo ========================================
echo.

REM Vérifier si le template existe
if not exist ".gemini\settings.template.json" (
    echo ❌ Erreur: .gemini\settings.template.json introuvable
    echo    Le projet n'est pas correctement configuré
    pause
    exit /b 1
)

REM Créer le dossier .gemini si nécessaire
if not exist ".gemini" mkdir ".gemini"

REM Copier le template vers settings.json
echo 📋 Copie du template de configuration...
copy ".gemini\settings.template.json" ".gemini\settings.json" >nul
if %errorlevel% equ 0 (
    echo ✅ Template copié vers .gemini\settings.json
) else (
    echo ❌ Erreur lors de la copie du template
    pause
    exit /b 1
)

REM Copier .env.example vers .env si pas existant
if not exist ".env" (
    echo 📋 Copie du template d'environnement...
    copy ".env.example" ".env" >nul
    if %errorlevel% equ 0 (
        echo ✅ Template .env créé
    ) else (
        echo ❌ Erreur lors de la copie de .env.example
    )
) else (
    echo ℹ️  Fichier .env existe déjà
)

echo.
echo ========================================
echo ⚠️  CONFIGURATION REQUISE
echo ========================================
echo.
echo 1️⃣  Édite .gemini\settings.json
echo     Remplace ${GITHUB_TOKEN} par ton vrai token
echo.
echo 2️⃣  Édite .env (optionnel)
echo     Configure tes variables d'environnement
echo.
echo 3️⃣  Obtenir un GitHub Token:
echo     https://github.com/settings/tokens
echo     Permissions: public_repo, read:user
echo.
echo 📖 Guide complet: docs\MCP-SECURITY-GUIDE.md
echo.
echo ========================================
echo 🔒 SÉCURITÉ
echo ========================================
echo.
echo ✅ .gemini\settings.json est ignoré par Git
echo ✅ .env est ignoré par Git
echo ✅ Seuls les templates sont publics
echo.
echo ❌ JAMAIS committer settings.json avec vraies clés!
echo.

REM Vérifier le .gitignore
findstr /C:".gemini/" .gitignore >nul
if %errorlevel% equ 0 (
    echo ✅ .gitignore protège .gemini/
) else (
    echo ⚠️  Attention: .gitignore ne protège pas .gemini/
)

echo.
echo Appuie sur une touche pour continuer...
pause >nul

REM Ouvrir les fichiers à éditer (optionnel)
echo.
choice /C YN /M "Ouvrir settings.json pour édition"
if %errorlevel% equ 1 (
    start notepad ".gemini\settings.json"
)

echo.
echo ✅ Configuration terminée!
echo    N'oublie pas de configurer tes clés API
echo.
pause