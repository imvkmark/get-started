#!/usr/bin/env bash

# 字串长度
#--------------------------------------------
name1='boy'
str1='hello, '${name1}''
echo "${#str1}"
# Output:
# 10
