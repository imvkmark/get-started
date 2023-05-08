#!/usr/bin/env bash

# 输出重定向到文件
# 输出到 ./output.txt 文件中
#--------------------------------------------
work_path=$(cd "$(dirname "$0")" && pwd)
echo "test" >"${work_path}/_output.tmp"
