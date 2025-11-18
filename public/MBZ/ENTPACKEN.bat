@echo off
chcp 65001 >nul
echo.
echo ============================================================
echo   AdLer MBZ Extraction Tool
echo ============================================================
echo.
echo Suche nach MBZ-Dateien...
echo.

cd /d "%~dp0..\.."
node scripts/extractLearningWorlds.js

echo.
echo ============================================================
echo   Vorgang abgeschlossen!
echo ============================================================
echo.
echo Die entpackten Welten befinden sich in:
echo   public/LearningWorlds/
echo.
pause
