@echo off
title Phonics Platform - Quick Deploy
color 0B
echo.
echo ========================================
echo      Phonics Platform - QUICK DEPLOY
echo ========================================
echo.
echo One-click deployment to Netlify!
echo FREE global access with NO PASSWORD!
echo.
echo Your 4 test accounts are ready:
echo.
echo ACCOUNTS (Password: password123)
echo Admin:     admin1
echo Teacher:   teacher1
echo Parents:    parent1, parent2, parent3, parent4
echo Students:   student1, student2, student3, student4, student5
echo.

echo Starting deployment...
echo Building and deploying to Netlify...
echo This may take 2-3 minutes...
echo.

call npm run build && npx netlify deploy --prod --dir=.next --site=phonics-platform

echo.
echo ========================================
echo         DEPLOYMENT COMPLETE
echo ========================================
echo.
echo Check the URL shown above.
echo If successful, you'll see:
echo https://phonics-platform-xxxxx.netlify.app
echo.
echo Test with your 4 accounts!
echo Share with friends!
echo.
echo Press any key to exit...
pause