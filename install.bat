@echo off
title install Package ....
:top
cls
    echo Please wait while the modules are installed !
    call npm install discord.js-self
    call npm install chalk@4.1.2
    call npm install ms
pause
cls
exit