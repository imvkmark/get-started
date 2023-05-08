#!/usr/bin/env bash

# 使用单引号拼接
#--------------------------------------------
name1='boy'
str1='hello, '${name1}''
echo "${str1}"
# Output:
# hello, boy

# 使用双引号拼接
#--------------------------------------------
name2="girl"
str4="hello, ${name2}"
echo "${str4}"
# Output:
# hello, girl
