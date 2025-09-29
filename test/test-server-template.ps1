#!/usr/bin/env pwsh

Write-Host "Testing MCP Server Protocol Compliance..." -ForegroundColor Cyan
Write-Host ""

# ========================================
# TODO: Modifier ce chemin pour votre projet
# ========================================
$ProjectPath = "C:\PATH\TO\YOUR\MCP\PROJECT"
Set-Location $ProjectPath

Write-Host "Starting server for 3 seconds to check logging..."

# Start the server and capture output
$job = Start-Job -ScriptBlock { 
    param($path)
    Set-Location $path
    node build\index.js 2>&1 
} -ArgumentList $ProjectPath

# Wait 3 seconds
Start-Sleep -Seconds 3

# Stop the job and get output
Stop-Job $job -ErrorAction SilentlyContinue
$output = Receive-Job $job
Remove-Job $job -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Server logs captured:"
$output | ForEach-Object { Write-Host $_ }
Write-Host ""

Write-Host "Checking protocol compliance:"

# ========================================
# TODO: Adapter ces regex selon votre serveur
# Regardez d'abord les logs pour voir quels messages votre serveur affiche
# ========================================

# Test 1: Server initialization
if ($output -match "(Initializing|Starting|setup)") {
    Write-Host "✅ [Setup] Server initialization: PASS" -ForegroundColor Green
} else {
    Write-Host "❌ [Setup] Server initialization: FAIL" -ForegroundColor Red
}

# Test 2: Setup complete
if ($output -match "(initialized|ready|success)") {
    Write-Host "✅ [Setup] Server setup complete: PASS" -ForegroundColor Green
} else {
    Write-Host "❌ [Setup] Server setup complete: FAIL" -ForegroundColor Red
}

# Test 3: Transport connection
if ($output -match "(transport|connected|listening)") {
    Write-Host "✅ [Setup] Transport connection: PASS" -ForegroundColor Green
} else {
    Write-Host "❌ [Setup] Transport connection: FAIL" -ForegroundColor Red
}

Write-Host ""
Write-Host "MCP Server protocol compliance test complete." -ForegroundColor Cyan

# Save output for debugging
$output | Out-File -FilePath "server-output.txt" -Encoding UTF8
Write-Host "DEBUG: Logs saved to server-output.txt" -ForegroundColor Yellow