# needle

@ECHO off SETLOCAL CALL :find\_dp0

IF EXIST "%dp0%\node.exe" \( SET "\_prog=%dp0%\node.exe" \) ELSE \( SET "\_prog=node" SET PATHEXT=%PATHEXT:;.JS;=;% \)

"%\_prog%" "%dp0%..\needle\bin\needle" %\* ENDLOCAL EXIT /b %errorlevel% :find\_dp0 SET dp0=%~dp0 EXIT /b

