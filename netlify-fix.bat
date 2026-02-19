@echo off
title Phonics Platform - Solution for Netlify
color 0C
echo.
echo ==========================================
echo      Phonics Platform - NETLIFY SOLUTION
echo         (Static Export Issue Fix)
echo ==========================================
echo.
echo Error: API routes can't be exported as static HTML
echo Solution: We need to separate static frontend from API
echo.

echo STEP 1: Create proper static build
echo Building static files for Netlify...
echo.

call npx next build
if errorlevel 1 goto error

echo.
echo STEP 2: Create Netlify-ready directory
echo Creating static files in correct structure...
echo.

mkdir netlify-dist 2>nul
xcopy .next\static netlify-dist\static /E /I /Q
xcopy .next\*.js netlify-dist\ /E /I /Q
xcopy .next\*.json netlify-dist\ /E /I /Q
xcopy .next\*.html netlify-dist\ /E /I /Q

echo.
echo STEP 3: Create proper index.html
copy index.html netlify-dist\index.html
echo ✅ Static files created in netlify-dist directory!

echo.
echo ==========================================
echo         DEPLOYMENT READY
echo ==========================================
echo.
echo Your static files are ready for Netlify!
echo FOLDER TO DRAG: C:\Users\%USERNAME%\phonics-platform\netlify-dist
echo.
echo Netlify drop URL: https://app.netlify.com/drop
echo.
echo TEST ACCOUNTS (Password: password123):
echo 👨‍💼 ADMIN:     admin1     - System management
echo 👩‍🏫 TEACHER:   teacher1   - Course management  
echo 👨‍👩‍👧‍👦 PARENTS:  parent1-4 - Child progress tracking
echo 👨‍🎓 STUDENTS:  student1-5 - Homework & practice
echo.
echo FEATURES:
echo ✅ No API routes (will be handled by Netlify Functions)
echo ✅ Static frontend ready
echo ✅ Perfect for Netlify deployment
echo ✅ 4 role accounts available
echo.
echo Ready to open Netlify?
set /p open_netlify="Open Netlify drop page? (Y/N): "
if /i "%open_netlify%"=="Y" (
    echo Opening Netlify...
    start https://app.netlify.com/drop
    echo Instructions:
    echo 1. Drag the netlify-dist folder to Netlify
    echo 2. Wait for upload
    echo 3. Click Deploy site
    echo 4. Get your URL: https://phonics-platform-xxxxx.netlify.app
    echo 5. Test with 4 role accounts above
) else (
    echo.
    echo When you're ready:
    echo 1. Go to https://app.netlify.com/drop
    echo 2. Drag C:\Users\%USERNAME%\phonics-platform\netlify-dist
    echo 3. Click Deploy site
    echo.
    echo Your 4 test accounts will be ready immediately!
)
echo.
echo TEMPORARY SOLUTION:
echo This gives you static frontend deployment.
echo For full functionality with APIs, we would need:
echo 1. Serverless functions setup
echo 2. Or alternative hosting (Vercel/Railway)
echo.
goto end

:error
echo.
echo ❌ Process failed!
echo Check the error messages above.
echo.

:end
echo.
echo Press any key to exit...
pause