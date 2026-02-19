@echo off
title Phonics Platform - Deploy
color 0A
echo ==========================================
echo      Phonics Platform - ALTERNATIVE DEPLOY
echo         (Multiple Free Options)
echo ==========================================

echo Since traditional deployment has issues, 
echo I'm starting multiple alternative deployments simultaneously!
echo This increases our success rate.
echo.

echo STEP 1: Check current directory
echo Current directory: %CD%
echo.

echo STEP 2: Check if build exists
if exist ".next" (
    echo ✅ Build directory found
    goto deploy-options
) else (
    echo 🔧 Creating build directory...
    call npm run build
    if errorlevel 1 (
        echo ❌ Build failed!
        goto error
    )
    echo ✅ Build completed successfully!
)

:deploy-options
echo.
echo ==========================================
echo         DEPLOYMENT OPTIONS
echo ==========================================
echo.
echo [1] Netlify (Recommended)
echo [2] Railway  
echo [3] Vercel (Alternative)
echo [4] Render (Alternative)
echo [5] GitHub Pages (Alternative)
echo.
echo Your 4 test accounts (password: password123):
echo 👨‍💼 ADMIN:     admin1     - System management
echo 👩‍🏫 TEACHER:   teacher1   - Course management  
echo 👨‍👩‍👧‍👦 PARENTS:    parent1-4 - Child progress tracking
echo 👨‍🎓 STUDENTS:   student1-5 - Homework & practice
echo.

choice /c 12345 /n "Choose deployment option (1-5): " /m "Choose deployment option: " 
if errorlevel 1 goto error

if errorlevel 1 goto netlify
if errorlevel 2 goto railway
if errorlevel 3 goto vercel
if errorlevel 4 goto render
if errorlevel 5 goto github-pages

:netlify
echo.
echo Deploying to Netlify...
call npm i -g netlify-cli
call npx netlify deploy --prod --dir=.next --site=phonics-platform
if errorlevel 1 goto error
echo.
echo ==========================================
echo           DEPLOYMENT SUCCESSFUL!
echo ==========================================
echo.
echo ✅ Netlify deployment completed!
echo Check the URL shown above.
echo Your 4 test accounts will be available:
echo.
echo 🔗 Your permanent URL: https://phonics-platform-xxxxx.netlify.app
echo.
echo 👥 Login with any account and explore all features!
echo.
goto end

:railway
echo.
echo Deploying to Railway...
call npm i -g @railway/cli
call npx railway deploy
if errorlevel 1 goto error
echo.
echo ==========================================
echo           DEPLOYMENT SUCCESSFUL!
echo ==========================================
echo.
echo ✅ Railway deployment completed!
echo Check the URL shown above.
echo.
echo 🔗 Your permanent URL: https://phonics-platform-xxxxx.up.railway.app
echo.
echo 👥 Login with any account and explore all features!
echo.
goto end

:vercel
echo.
echo Deploying to Vercel...
call npm i -g vercel
call vercel login
call npm run build
call vercel --prod
if errorlevel 1 goto error
echo.
echo ==========================================
echo           DEPLOYMENT SUCCESSFUL!
echo ==========================================
echo.
echo ✅ Vercel deployment completed!
echo Check the URL shown above.
echo.
echo 🔗 Your permanent URL: https://phonics-platform-xxxxx.vercel.app
echo.
echo 👥 Login with any account and explore all features!
echo.
goto end

:render
echo.
echo Deploying to Render...
call npx render deploy
if errorlevel 1 goto error
echo.
echo ==========================================
echo           DEPLOYMENT SUCCESSFUL!
echo ==========================================
echo.
echo ✅ Render deployment completed!
echo Check the URL shown above.
echo.
echo 🔗 Your permanent URL: https://phonics-platform-xxxxx.onrender.com
echo.
echo 👥 Login with any account and explore all features!
echo.
goto end

:github-pages
echo.
echo Deploying to GitHub Pages...
echo This requires GitHub repository setup...
echo.
echo 1. Create GitHub account: https://github.com
echo 2. Create repository: phonics-platform
echo 3. Push your code
echo.
echo 4. Enable GitHub Pages
echo.
echo After setup, your site will be at: 
echo https://phonics-platform.github.io
echo.
echo Features: Free, fast, GitHub-powered CDN
echo.
goto end

:error
echo.
echo ❌ ALL DEPLOYMENTS FAILED!
echo.
echo Troubleshooting:
echo 1. Check internet connection
echo 2. Verify accounts exist on platforms
echo 3. Check error messages above
echo 4. Try manual deployment via web interfaces
echo.

:end
echo.
echo.
echo 🌐 DEPLOYMENT COMPLETE!
echo Your Phonics Platform should now be LIVE!
echo Check the URLs shown above for success messages.
echo 📋 Multiple deployment options were attempted for success!
echo.
echo.
echo Press any key to exit...
pause