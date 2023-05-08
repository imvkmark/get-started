#!/usr/bin/env bash

colors=(red yellow "dark blue")

# `${array[@]}` 扩展为整个数组， `:0:2` 取出了数组中从 0 开始，长度为 2 的元素。

echo "${colors[@]:0:2}"
# Output:
# red yellow


# 访问数组长度
# 这两个输出相同的结果

echo "${#colors[@]}"
echo "${#colors[*]}"
# Output:
# 3
# 3