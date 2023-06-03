#!/usr/bin/env bash

# 从变量读取列表 ..... .. .
colors="Red Yellow Blue"
colors=("${colors[@]}"" White Black")

for color in "${colors[@]}"; do
    echo " $color"
done
