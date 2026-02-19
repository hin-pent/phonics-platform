@echo off
title Phonics Platform - Alternative Deploy
color 0A
echo.
echo ===============================================
echo      Phonics Platform - ALTERNATIVE DEPLOY
echo              (Free Hosting Options)
echo ===============================================
echo.
echo Since Netlify login has issues, let's try alternatives!
echo All are FREE and NO PASSWORD required!
echo.

echo Step 1: Try Railway (Recommended)
echo =================================
echo.
echo Railway deployment starting...
echo This will use Railway's free tier!
echo.

call npm i -g @railway/cli
if errorlevel 1 goto try-netlify

echo.
echo Deploying to Railway...
echo This will create a permanent deployment...
call npx railway login
if errorlevel 1 goto railway-error
call npx railway deploy
if errorlevel 1 goto railway-error

echo.
echo ===============================================
echo           DEPLOYMENT SUCCESSFUL!
echo ===============================================
echo.
echo Your Phonics Platform is LIVE!
echo Check the URL shown above.
echo.
echo ✅ FEATURES:
echo     - Permanent HTTPS URL
echo     - Free hosting
echo     - No password required
echo     - Global accessibility
echo     - 4 role accounts ready
echo.
echo TEST ACCOUNTS (Password: password123):
echo.
echo     👨‍💼 ADMIN:     admin1     - System management
echo     👨‍🏫 TEACHER:   teacher1   - Course management  
echo     👨‍👩‍👧‍👦 PARENTS:    parent1-4 - Child progress tracking
echo     👨‍🎓 STUDENTS:   student1-5 - Homework & practice
echo.
echo Ready to test all 4 roles!
echo.
goto end

:try-netlify
echo.
echo Step 2: Try Netlify (Alternative)
echo =================================
echo.
echo Trying Netlify deployment with GitHub authentication...
call npm i -g netlify-cli
if errorlevel 1 goto try-vercel

echo.
echo Deploying to Netlify with GitHub...
echo This method should avoid login issues!
call npx netlify init
echo y | npx netlify login --github
call npm run build
call npx netlify deploy --prod --site=phonics-platform --dir=.next
if errorlevel 1 goto netlify-error

echo.
echo ===============================================
echo           DEPLOYMENT SUCCESSFUL!
echo ===============================================
echo.
echo Your Phonics Platform is LIVE!
echo Check the URL shown above.
echo.
echo ✅ FEATURES:
echo     - Permanent HTTPS URL
echo     - Free hosting
echo     - No password required
echo     - Global accessibility
echo     - 4 role accounts ready
echo.
echo TEST ACCOUNTS (Password: password123):
echo.
echo     👨‍💼 ADMIN:     admin1     - System management
echo     👨‍🏫 TEACHER:   teacher1   - Course management  
echo     👨‍👩‍👧‍👦 PARENTS:    parent1-4 - Child progress tracking
echo     👨‍🎓 STUDENTS:   student1-5 - Homework & practice
echo.
echo Ready to test all 4 roles!
echo.
goto end

:try-vercel
echo.
echo Step 3: Try Vercel (Alternative)
echo ==================================
echo.
echo Trying Vercel deployment...
call npm i -g vercel
call vercel login
if errorlevel 1 goto error

call npm run build
call vercel --prod
if errorlevel 1 goto error

echo.
echo ===============================================
echo           DEPLOYMENT SUCCESSFUL!
echo ===============================================
echo.
echo Your Phonics Platform is LIVE!
echo Check the URL shown above.
echo.
echo ✅ FEATURES:
echo     - Permanent HTTPS URL
echo     - Free hosting
echo     - No password required
echo     - Global accessibility
echo     - 4 role accounts ready
echo.
echo TEST ACCOUNTS (Password: password123):
echo.
echo     👨‍💼 ADMIN:     admin1     - System management
echo     👨‍🏫 TEACHER:   teacher1   - Course management  
echo     👨‍👩‍👧‍👦 PARENTS:    parent1-4 - Child progress tracking
echo     👨‍🎓 STUDENTS:   student1-5 - Homework & practice
echo.
echo Ready to test all 4 roles!
echo.
goto end

:railway-error
echo.
echo ❌ Railway deployment failed!
echo.
echo Trying next method...
goto try-netlify

:netlify-error
echo.
echo ❌ Netlify deployment failed!
echo.
echo Trying next method...
goto try-vercel

:error
echo.
echo ❌ DEPLOYMENT FAILED!
echo.
echo.
echo Troubleshooting:
echo 1. Check internet connection
echo 2. Verify hosting account
echo 3. Check error messages above
echo 4. Try manual deployment via websites
echo 5. Check if Node.js and npm are working
echo.
echo.
echo Try these alternatives:
echo - https://render.com (Free tier)
echo - https://pages.dev (GitHub Pages)
echo - https://surge.sh (Simple)
echo.

:end
echo.
echo Press any key to exit...
pause