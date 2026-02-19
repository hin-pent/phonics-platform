@echo off
title Phonics Platform - Simple Deployment
color 0A
echo.
echo ==========================================
echo      Phonics Platform - SIMPLE DEPLOY
echo         (Multiple Free Options)
echo ==========================================
echo.
echo Since multiple platforms need accounts,
echo let's try the easiest manual method!
echo.
echo Your 4 test accounts (password: password123):
echo.
echo 👨‍💼 ADMIN:     admin1     - System management
echo 👩‍🏫 TEACHER:   teacher1   - Course management  
echo 👨‍👩‍👧‍👦 PARENTS:  parent1-4 - Child progress tracking
echo 👨‍🎓 STUDENTS:  student1-5 - Homework & practice
echo.
echo ==========================================
echo         DEPLOYMENT OPTIONS
echo ==========================================
echo.
echo [1] Cloudflare Pages (NEW - Fast & Free)
echo     URL: https://phonics-platform.pages.dev
echo     Upload method: Direct file upload
echo.
echo [2] Netlify Drop (Simple)
echo     URL: https://phonics-platform-xxxxx.netlify.app
echo     Upload method: Drag and drop
echo.
echo [3] Render Web Service (Full Stack)
echo     URL: https://phonics-platform.onrender.com
echo     Upload method: GitHub import
echo.
echo [4] Vercel (GitHub Integration)
echo     URL: https://phonics-platform.vercel.app
echo     Upload method: GitHub import
echo.
echo [5] Firebase Hosting (Google)
echo     URL: https://phonics-platform.web.app
echo     Upload method: Firebase console upload
echo.
echo All options are:
echo ✅ FREE hosting
echo ✅ NO password required for site access
echo ✅ HTTPS secure connection
echo ✅ Global accessibility
echo ✅ Mobile-friendly
echo ✅ 4 role accounts ready
echo.
echo Ready to choose deployment option?
set /p choice="Choose option (1-5): " 
if /i "%choice%"=="1" goto cloudflare
if /i "%choice%"=="2" goto netlify
if /i "%choice%"=="3" goto render
if /i "%choice%"=="4" goto vercel
if /i "%choice%"=="5" goto firebase

:cloudflare
echo.
echo Opening Cloudflare Pages...
echo Instructions:
echo 1. Upload your entire phonics-platform folder
echo 2. Your site will be live at: https://phonics-platform.pages.dev
echo 3. Perfect for Next.js applications!
goto end

:netlify
echo.
echo Opening Netlify drop page...
echo Instructions:
echo 1. Drag the ENTIRE phonics-platform folder
echo 2. Site will be at: https://phonics-platform-xxxxx.netlify.app
echo 3. Great for static sites with functions!
goto end

:render
echo.
echo Opening Render...
echo Instructions:
echo 1. Connect GitHub or upload folder
echo 2. Site will be at: https://phonics-platform.onrender.com
echo 3. Perfect for full-stack applications!
goto end

:vercel
echo.
echo Opening Vercel...
echo Instructions:
echo 1. Connect your GitHub account
echo 2. Import phonics-platform repository
echo 3. Site will be at: https://phonics-platform.vercel.app
echo 4. Excellent for Next.js projects!
goto end

:firebase
echo.
echo Opening Firebase console...
echo Instructions:
echo 1. Go to console.firebase.google.com
echo 2. Create new project: phonics-platform
echo 3. Use Firebase Hosting
echo 4. Site will be at: https://phonics-platform.web.app
echo 5. Great for Google integration!
goto end

:end
echo.
echo ==========================================
echo         DEPLOYMENT INSTRUCTIONS
echo ==========================================
echo.
echo After successful deployment:
echo ✅ Your Phonics Platform will be LIVE!
echo ✅ All 4 role accounts will be available
echo ✅ Global HTTPS access
echo ✅ Mobile-friendly design
echo ✅ Share your URL with friends!
echo.
echo Test accounts (password: password123):
echo 👨‍💼 ADMIN:     admin1
echo 👩‍🏫 TEACHER:   teacher1  
echo 👨‍👩‍👧‍👦 PARENTS:  parent1-4
echo 👨‍🎓 STUDENTS:   student1-5
echo.
echo Ready to continue?
pause