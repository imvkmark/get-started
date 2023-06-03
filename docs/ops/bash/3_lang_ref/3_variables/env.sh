#!/usr/bin/env bash

# 系统命令输出变量
#--------------------------------------------
echo "# 系统命令输出变量 ..... .. ."

# 输出系统命令输出变量
folder=$(pwd)
echo "current path: ${folder}"
# Output : current path: /Users/duoli/.../lang/note

# 系统变量
#--------------------------------------------
echo "# 系统变量 ..... .. ."

echo "UID:$UID"
echo "LOGNAME:$LOGNAME"
echo "User:$USER"
echo "HOME:$HOME"
echo "PATH:$PATH"
echo "HOSTNAME:$HOSTNAME"
echo "SHELL:$SHELL"
echo "LANG:$LANG"
# UID:501
# LOGNAME:duoli
# User:duoli
# HOME:/Users/duoli
# PATH:/Users/duoli/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
# HOSTNAME:Op-Zhaodianyou.local
# SHELL:/bin/zsh
# LANG:
