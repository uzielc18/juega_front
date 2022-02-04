@echo off

git status
git add .
git status
set /p message="Ingresa el mensaje del commit: "
git commit -m "%message%"
git pull
git pull origin develop