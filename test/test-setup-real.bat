@echo off
echo 🧪 Testing Context Master Setup on REAL project
echo.

cd /d "%~dp0\.."
node test/test-setup-real.js

echo.
echo Press any key to exit...
pause > nul