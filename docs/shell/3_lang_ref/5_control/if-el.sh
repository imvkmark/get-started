#!/usr/bin/env bash

# if else 语句
# ----------------------------------------
if [[ 2 -ne 1 ]]; then
    echo "true"
else
    echo "false"
fi
# Output: true

# if elif else 语句
# ----------------------------------------
x=10
y=20
if [[ ${x} > ${y} ]]; then
    echo "${x} > ${y}"
elif [[ ${x} < ${y} ]]; then
    echo "${x} < ${y}"
else
    echo "${x} = ${y}"
fi
# Output: 10 < 20
