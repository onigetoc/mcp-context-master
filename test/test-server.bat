@echo off
echo Testing MCP Server Protocol Compliance...
echo.

cd /d "c:\Users\LENOVO\APPS\0-MCP\mcp-easy-installer"

echo Starting server for 3 seconds to check logging...
start /b node build\index.js 2>&1 > server-output.txt
timeout /t 3 > nul
taskkill /f /im node.exe > nul 2>&1

echo.
echo Server logs captured:
type server-output.txt
echo.

echo Checking protocol compliance:
findstr /C:"[Setup] Initializing server" server-output.txt > nul
if %errorlevel% == 0 (
    echo ✅ [Setup] Initialization logging: PASS
) else (
    echo ❌ [Setup] Initialization logging: FAIL
)

findstr /C:"[Setup] MCP server transport connected" server-output.txt > nul
if %errorlevel% == 0 (
    echo ✅ [Setup] Connection logging: PASS
) else (
    echo ❌ [Setup] Connection logging: FAIL
)

del server-output.txt > nul 2>&1
echo.
echo Protocol compliance test complete.
