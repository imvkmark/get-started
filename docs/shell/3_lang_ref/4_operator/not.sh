#!/usr/bin/env bash

x=10

# 如果string 非空(非0），返回0(true)  
# ----------------------------------------
if [ ! -n "$x" ]; then
    echo "x 是空"
else
    echo "x 不是空"
fi
