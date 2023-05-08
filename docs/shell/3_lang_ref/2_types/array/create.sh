#!/usr/bin/env bash

nums=([2]=2 [0]=0 [1]=1)
colors=(red yellow "dark blue")

# 访问数组的单个元素 | 基于下标
echo "${nums[1]}"
# Output: 1

# 访问数组的所有元素
echo "${colors[*]}"
# Output : red yellow dark blue
star
echo "${colors[@]}"
# Output : red yellow dark blue