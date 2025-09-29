#!/usr/bin/env pwsh

Write-Host "Testing MCP Context Master Server Protocol Compliance..." -ForegroundColor Cyan
Write-Host ""

# Change to project directory
Set-Location "c:\Users\LENOVO\APPS\0-MCP\mcp-context-master"

Write-Host "Starting server for 3 seconds to check logging..."

# Start the server and capture output
$job = Start-Job -ScriptBlock { 
    Set-Location "c:\Users\LENOVO\APPS\0-MCP\mcp-context-master"
    node build\index.js 2>&1 
}

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

# Check for initialization
if ($output -match "\[Setup\] Initializing server") {
    Write-Host "✅ [Setup] Server initialization: PASS" -ForegroundColor Green
} else {
    Write-Host "❌ [Setup] Server initialization: FAIL" -ForegroundColor Red
}

# Check for successful setup
if ($output -match "\[Setup\] Server initialized successfully") {
    Write-Host "✅ [Setup] Server setup complete: PASS" -ForegroundColor Green
} else {
    Write-Host "❌ [Setup] Server setup complete: FAIL" -ForegroundColor Red
}

# Check for transport connection
if ($output -match "\[Setup\] MCP server transport connected") {
    Write-Host "✅ [Setup] Transport connection: PASS" -ForegroundColor Green
} else {
    Write-Host "❌ [Setup] Transport connection: FAIL" -ForegroundColor Red
}

Write-Host ""
Write-Host "MCP Context Master protocol compliance test complete." -ForegroundColor Cyan