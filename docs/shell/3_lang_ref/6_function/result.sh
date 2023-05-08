#!/usr/bin/env bash

# 获取运行结果
# ----------------------------------------
grep <"$(dirname "$0")"/_tmp.txt 'duoli'

echo $?
# Output : 0
