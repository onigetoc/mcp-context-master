#!/usr/bin/env pwsh

Write-Host "🧹 Nettoyage des tests obsolètes..." -ForegroundColor Cyan
Write-Host ""

# Fichiers à supprimer (probablement obsolètes)
$FilesToDelete = @(
    "cli-test.js",
    "test-coding-assistant.js", 
    "test-context-tools.js",
    "test-github-search.js",
    "test-init-tool.js",
    "test-manifest-debug.js",
    "test-project-master.js",
    "test-simple.js"
)

# Fichiers à garder (essentiels)
$FilesToKeep = @(
    "test-server.ps1",
    "test-server.bat", 
    "test-tools.js",
    "test-manifest.js",
    "search-test.js",
    "test-server-template.bat",
    "test-server-template.ps1",
    "README-TESTS.md",
    "cleanup-tests.ps1"
)

Write-Host "📋 Fichiers qui seront SUPPRIMÉS :" -ForegroundColor Red
$FilesToDelete | ForEach-Object { Write-Host "  ❌ $_" -ForegroundColor Red }

Write-Host ""
Write-Host "📋 Fichiers qui seront GARDÉS :" -ForegroundColor Green  
$FilesToKeep | ForEach-Object { Write-Host "  ✅ $_" -ForegroundColor Green }

Write-Host ""
$confirmation = Read-Host "Voulez-vous continuer le nettoyage ? (y/N)"

if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
    Write-Host ""
    Write-Host "🗑️ Suppression en cours..." -ForegroundColor Yellow
    
    foreach ($file in $FilesToDelete) {
        $filePath = Join-Path "test" $file
        if (Test-Path $filePath) {
            Remove-Item $filePath -Force
            Write-Host "  ✅ Supprimé: $file" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️ Déjà absent: $file" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    Write-Host "🎉 Nettoyage terminé !" -ForegroundColor Green
    Write-Host "📁 Fichiers restants dans test/ :" -ForegroundColor Cyan
    Get-ChildItem test/ | ForEach-Object { Write-Host "  📄 $($_.Name)" -ForegroundColor White }
    
} else {
    Write-Host "❌ Nettoyage annulé." -ForegroundColor Yellow
}