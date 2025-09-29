@echo off
echo Testing MCP Context Master Server Protocol Compliance...
echo.

cd /d "c:\Users\LENOVO\APPS\0-MCP\mcp-context-master"

echo Starting server for 3 seconds to check logging...
start /b node build\index.js > server-output.txt 2>&1
echo Waiting 3 seconds...
timeout /t 3
taskkill /f /im node.exe > nul 2>&1

echo.
echo Server logs captured:
type server-output.txt
echo.

echo Checking protocol compliance:
findstr /C:"[Setup] Initializing server" server-output.txt > nul
if %errorlevel% == 0 (
    echo [OK] [Setup] Server initialization: PASS
) else (
    echo [FAIL] [Setup] Server initialization: FAIL
)

findstr /C:"[Setup] Server initialized successfully" server-output.txt > nul
if %errorlevel% == 0 (
    echo [OK] [Setup] Server setup complete: PASS
) else (
    echo [FAIL] [Setup] Server setup complete: FAIL
)

findstr /C:"[Setup] MCP server transport connected" server-output.txt > nul
if %errorlevel% == 0 (
    echo [OK] [Setup] Transport connection: PASS
) else (
    echo [FAIL] [Setup] Transport connection: FAIL
)

del server-output.txt > nul 2>&1
echo.
echo MCP Context Master protocol compliance test complete.
