@echo off

set date = [System.DateTime]::Now.ToString("yyyy-MM-dd-HH-mm-ss.fff")

git status
git add .
git status
set /p message="Ingresa el mensaje del commit: "
git commit -m "%date% -> %message%"
git pull
git pull origin develop