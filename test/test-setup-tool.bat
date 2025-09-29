@echo off
echo 🧪 Testing Context Master Setup Tool
echo.

cd /d "%~dp0\.."
node test/test-setup-tool.js

echo.
echo Press any key to exit...
pause > nul