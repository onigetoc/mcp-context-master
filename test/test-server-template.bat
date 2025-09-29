@echo off
echo Testing MCP Server Protocol Compliance...
echo.

REM ========================================
REM TODO: Modifier ce chemin pour votre projet
REM ========================================
cd /d "c:\Users\LENOVO\APPS\0-MCP\mcp-context-master"

echo Starting server for 3 seconds to check logging...
start /b node build\index.js > server-output.txt 2>&1
timeout /t 3 > nul
taskkill /f /im node.exe > nul 2>&1

echo.
echo Server logs captured:
type server-output.txt
echo.

echo Checking protocol compliance:

REM ========================================
REM TODO: Adapter ces messages selon votre serveur
REM Regardez d'abord les logs pour voir quels messages votre serveur affiche
REM ========================================

REM Test 1: Vérifier que le serveur démarre
findstr /C:"Initializing" server-output.txt > nul
if %errorlevel% == 0 (
    echo ✅ [Setup] Server initialization: PASS
) else (
    echo ❌ [Setup] Server initialization: FAIL
)

REM Test 2: Vérifier que l'initialisation réussit
findstr /C:"initialized successfully" server-output.txt > nul
if %errorlevel% == 0 (
    echo ✅ [Setup] Server setup complete: PASS
) else (
    echo ❌ [Setup] Server setup complete: FAIL
)

REM Test 3: Vérifier la connexion transport
findstr /C:"transport connected" server-output.txt > nul
if %errorlevel% == 0 (
    echo ✅ [Setup] Transport connection: PASS
) else (
    echo ❌ [Setup] Transport connection: FAIL - Message not found in logs
)

REM Garder le fichier pour debug (optionnel)
REM del server-output.txt > nul 2>&1

echo.
echo MCP Server protocol compliance test complete.
echo.
echo DEBUG: Check server-output.txt for detailed logs