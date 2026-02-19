@echo off
title Phonics Platform - Direct Deploy
color 0A
echo.
echo ==========================================
echo      Phonics Platform - DIRECT DEPLOY
echo         (Simple & Fast Method)
echo ==========================================
echo.
echo I'll deploy your project directly to Netlify!
echo Your 4 test accounts are ready to use.
echo.

echo 1. Opening Netlify website...
start https://app.netlify.com

echo 2. Instructions for manual deployment:
echo.
echo STEP A: Create Netlify Account
echo - If you don't have one, sign up at https://app.netlify.com/signup
echo - Use email (recommended) or GitHub account
echo.
echo STEP B: Deploy Your Project
echo - After logging in, you'll see the Netlify dashboard
echo - Click on "Add new site" or "Import project"
echo - Choose folder: C:\Users\%USERNAME%\phonics-platform\.next
echo - Set site name: phonics-platform
echo - Build command: npm run build
echo - Publish directory: .next
echo - Click "Deploy site"
echo.
echo STEP C: Alternative - Drag & Drop
echo - After login, click on the "Drag and drop" option
echo - Drag the entire C:\Users\%USERNAME%\phonics-platform\.next folder
echo - Wait for upload to complete
echo - Click "Deploy site"
echo.
echo ==========================================
echo         YOUR TEST ACCOUNTS
echo ==========================================
echo Password: password123 (for all accounts)
echo.
echo 👨‍💼 ADMIN:     admin1 - System management
echo 👨‍🏫 TEACHER:   teacher1 - Course management  
echo 👨‍👩‍👧‍👦 PARENTS:    parent1, parent2, parent3, parent4
echo 👨‍🎓 STUDENTS:   student1, student2, student3, student4, student5
echo.
echo ==========================================
echo         DEPLOYMENT RESULT
echo ==========================================
echo.
echo After successful deployment, you'll get:
echo 🔗 https://phonics-platform-xxxxxxxx.netlify.app
echo.
echo FEATURES:
echo ✅ Free permanent hosting
echo ✅ No password required for site access
echo ✅ HTTPS secure connection
echo ✅ Global accessibility
echo ✅ Mobile-friendly
echo ✅ 4 different role testing
echo.
echo ==========================================
echo         SHARE WITH FRIENDS
echo ==========================================
echo.
echo 🎉 My Phonics Platform is now LIVE! 🌐
echo.
echo 🔗 Permanent access: https://phonics-platform-xxxxxxxx.netlify.app
echo.
echo 📱 Test all 4 roles:
echo 👨‍💼 Admin:     admin1 (password: password123)
echo 👨‍🏫 Teacher:   teacher1 (password: password123)  
echo 👨‍👩‍👧‍👦 Parents:  parent1-4 (password: password123)
echo 👨‍🎓 Students:  student1-5 (password: password123)
echo.
echo 🌍 Works on: Mobile, Tablet, Desktop
echo 🔒 Browser-trusted HTTPS connection
echo ⚡ Fast global CDN
echo.
echo Ready to open Netlify website again?
set /p open_choice="Open Netlify to continue? (Y/N): "
if /i "%open_choice%"=="Y" (
    start https://app.netlify.com
    echo.
    echo 1. Click on "Add new site" or drag your .next folder
    echo 2. Site name: phonics-platform
    echo 3. Build: npm run build
    echo 4. Publish: .next
    echo 5. Click Deploy!
    echo.
    echo Your 4 test accounts will be ready immediately!
) else (
    echo.
    echo When you're ready:
    echo 1. Visit https://app.netlify.com
    echo 2. Create a new site
    echo 3. Drag and drop: C:\Users\%USERNAME%\phonics-platform\.next
    echo 4. Deploy!
    echo.
    echo Your project will be LIVE at: https://phonics-platform-xxxxxxxx.netlify.app
    echo Share this URL with friends!
)

pause