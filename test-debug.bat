@echo off
echo Current directory: %CD%
echo.
echo Checking if build/index.js exists...
if exist "build\index.js" (
    echo ✅ build\index.js found
) else (
    echo ❌ build\index.js NOT found
)
echo.
echo Testing simple node command...
node --version