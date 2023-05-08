#!/usr/bin/env bash

# 单引号
#--------------------------------------------
printf '%d %s\n' 1 "abc"
#  Output:1 abc

# 双引号
#--------------------------------------------
printf "%d %s\n" 1 "abc"
#  Output:1 abc

# 无引号
#--------------------------------------------
printf %s abcdef
printf '\n'
#  Output: abcdef(并不会换行)

# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出
# 但是不建议传递多个参数, 这样会让大家认为你没有控制力
#--------------------------------------------
printf "%s\n" abc def
#  Output:
#  abc
#  def

printf "%s %s %s\n" a b c d e f g h i j
#  Output:
#  a b c
#  d e f
#  g h i
#  j

# 如果没有参数，那么 %s 用 NULL 代替，%d 用 0 代替
printf "%s and %d \n"
#  Output:
#   and 0

# 格式化输出
#--------------------------------------------
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg
printf "%-10s %-8s %-4.2f\n" 巧笑 女 47.5210
printf "%-10s %-8s %-4.2f\n" 乾槑 男 66.5432
#  Output:
# 姓名     性别   体重kg
# 巧笑     女      47.52
# 乾槑     男      66.54
