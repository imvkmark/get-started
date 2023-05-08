#!/usr/bin/env bash

# 查找文字在字串中的位置
# 查找 ``ll`` 子字符在 ``hello`` 字符串中的起始位置。
#--------------------------------------------

text="hello"
echo $(expr index "${text}" ll)

# Output:
# 3
# Mac Output:
# expr: syntax error
