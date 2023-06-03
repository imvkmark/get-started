#!/usr/bin/env bash

# 输出普通字符串
#--------------------------------------------
echo "hello, world"

# 输出含变量的字符串
#--------------------------------------------
name="duoli"
echo "hello, \"${name}\""
# Output: hello, "duoli"

# 输出含换行符的字符串
#--------------------------------------------
echo -e "YES\nNO" # -e 开启转义
#  Output:
#  YES
#  NO

echo "YES"
echo "NO"
#  Output:
#  YES
#  NO

echo -e "YES\c" # -e 开启转义 \c 不换行
echo "NO"
#  Output:
#  YESNO
