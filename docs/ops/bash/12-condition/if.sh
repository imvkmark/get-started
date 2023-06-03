#!/usr/bin/env bash

# if 语句
# ----------------------------------------
# 一行的表达式
# 表达式结果为真，则返回 0，if 把 0 值引向then
if [ 1 -eq 1 ]; then
    echo "1 -eq 1 result is: true"
fi

# Test 方法
# 表达式结果为假，则返回非 0，if把非 0值引向then
if test 1 -eq 1; then
    echo "1 -eq 1 result is: true"
fi

# 换行写法
# 命令执行成功，等于返回 0, 这里实际上是命令的执行xie'fa
if
    1 -eq 1
then
    echo "1 -eq 1 result is: true"
fi
# Output: 1 -eq 1 result is: true

# if 快捷写法
# ----------------------------------------
[ 1 -eq 1 ] && echo '1 = 1'

# 条件是 0 也会输出数据, 因为 shell 返回 0 则认为是 shell 正常执行
# if [ i –ne 0 ] 可以替代为 0 的情况
# ----------------------------------------
i=0
if [ $i ]; then
    echo "即使是 0 , 这里也会输出"
fi

# 字符串, 这里字符串变量 非 0 为 True
var='abc'
if [ "${var}" ]; then
    echo "abc result is: true"
fi
# Output: abc -eq abc result is: true
