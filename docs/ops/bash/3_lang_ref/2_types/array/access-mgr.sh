#!/usr/bin/env bash


# 添加元素
#--------------------------------------------
echo '# 添加元素 ..... .. .'

colors=(red yellow "dark blue")

# 上面的例子中，`${colors[@]}` 扩展为整个数组，并被置换到复合赋值语句中，接着，对数组 `colors` 的赋值覆盖了它原来的值。

colorsA=(white "${colors[@]}" green black)
echo "${colorsA[@]}"
echo "${#colorsA[@]}"
# Output:
# white red yellow dark blue green black
# 6

echo '# ..... .. .'

# 这里我们使用 `*` 方式来访问, 可以看到把这个当成了一个值来输出
colorsB=(white "${colors[*]}" green black)
printf "+ %s\n" "${colorsB[@]}"
echo "${#colorsB[*]}"
# Output:
# + white
# + red yellow dark blue
# + green
# + black
# 4

# 删除元素
#--------------------------------------------
echo '# 删除元素 ..... .. .'

# 用 `unset` 命令来从数组中删除一个元素：

unset "colors[2]"
echo "${colors[@]}"
# Output:
# red yellow