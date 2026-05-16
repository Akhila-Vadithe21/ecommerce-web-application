@echo off
echo ========================================
echo 🚀 TECHMART E-COMMERCE PLATFORM
echo ========================================
echo Setting up environment variables...
echo.

REM Check if .env file exists
if exist .env (
    echo ✅ .env file already exists
    echo.
    echo Current .env file contents:
    echo ----------------------------------------
    type .env
    echo ----------------------------------------
    echo.
    echo Do you want to overwrite it? (y/n)
    set /p choice=
    if /i "%choice%"=="y" (
        echo Creating new .env file...
    ) else (
        echo Keeping existing .env file
        goto :end
    )
) else (
    echo Creating new .env file...
)

REM Copy config.env to .env
copy config.env .env >nul
if %errorlevel%==0 (
    echo ✅ Successfully created .env file
    echo.
    echo 📝 Next steps:
    echo 1. Edit .env file with your actual values
    echo 2. Never commit .env to version control
    echo 3. Use strong, unique secrets in production
    echo.
    echo 🔧 Required variables to update:
    echo - MONGODB_URI (your database connection)
    echo - JWT_SECRET (strong random string)
    echo - SMTP_PASS (your email password)
    echo - Payment gateway keys (Stripe, PayPal, etc.)
    echo.
    echo 🚀 Your TechMart e-commerce platform is ready!
) else (
    echo ❌ Failed to create .env file
    echo Please check if config.env exists
)

:end
echo.
echo Press any key to exit...
pause >nul

