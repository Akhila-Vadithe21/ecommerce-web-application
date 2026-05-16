# ========================================
# 🚀 TECHMART E-COMMERCE PLATFORM
# ========================================
# PowerShell script to setup environment variables
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 TECHMART E-COMMERCE PLATFORM" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up environment variables..." -ForegroundColor Yellow
Write-Host ""

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
    Write-Host ""
    Write-Host "Current .env file contents:" -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Gray
    Get-Content ".env"
    Write-Host "----------------------------------------" -ForegroundColor Gray
    Write-Host ""
    
    $choice = Read-Host "Do you want to overwrite it? (y/n)"
    if ($choice -eq "y" -or $choice -eq "Y") {
        Write-Host "Creating new .env file..." -ForegroundColor Yellow
    } else {
        Write-Host "Keeping existing .env file" -ForegroundColor Yellow
        exit
    }
} else {
    Write-Host "Creating new .env file..." -ForegroundColor Yellow
}

# Copy config.env to .env
try {
    Copy-Item "config.env" ".env" -Force
    Write-Host "✅ Successfully created .env file" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "📝 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Edit .env file with your actual values" -ForegroundColor White
    Write-Host "2. Never commit .env to version control" -ForegroundColor White
    Write-Host "3. Use strong, unique secrets in production" -ForegroundColor White
    Write-Host ""
    
    Write-Host "🔧 Required variables to update:" -ForegroundColor Cyan
    Write-Host "- MONGODB_URI (your database connection)" -ForegroundColor White
    Write-Host "- JWT_SECRET (strong random string)" -ForegroundColor White
    Write-Host "- SMTP_PASS (your email password)" -ForegroundColor White
    Write-Host "- Payment gateway keys (Stripe, PayPal, etc.)" -ForegroundColor White
    Write-Host ""
    
    Write-Host "🚀 Your TechMart e-commerce platform is ready!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Failed to create .env file" -ForegroundColor Red
    Write-Host "Please check if config.env exists" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

