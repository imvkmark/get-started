---
title: "数组"
date: 2022-08-24 22:10:49
toc: true
categories:
- ["Lang","Shell","Shell 入门","语法"]
---

bash 只支持一维数组。

数组下标从 0 开始，下标可以是整数或算术表达式，其值应大于或等于 0。




## 创建数组
[Link](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/array/create.sh)
```shell
#!/usr/bin/env bash

nums=([2]=2 [0]=0 [1]=1)
colors=(red yellow "dark blue")

# 访问数组的单个元素 | 基于下标
echo "${nums[1]}"
# Output: 1

# 访问数组的所有元素
echo "${colors[*]}"
# Output : red yellow dark blue

echo "${colors[@]}"
# Output : red yellow dark blue
```

## 访问数组元素的区别
`${colors[*]}` 和 `${colors[@]}` 这两个有比较明显的区别, 下边来说明下

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/array/access.sh)
```shell
#!/usr/bin/env bash

colors=(red yellow "dark blue")

# 为了将数组中每个元素单独一行输出，我们用 `printf` 命令：
# 因为 shell 建议加上 `"` 来访问数组元素避免空白的分割, 所以这里便不对没有 `"` 进行测试

printf "+ %s\n" "${colors[*]}"
# Output:
# + red yellow dark blue

# 现在所有的元素都在一行输出, 让我们试试 `${colors[@]}`

printf "+ %s\n" "${colors[@]}"
# Output:
# + red
# + yellow
# + dark blue

# 在引号内， `${colors[@]}` 将数组中的每个元素扩展为一个单独的参数；数组元素中的空格得以保留。
```

## 访问数组的元素和长度
[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/array/access-length.sh)
```shell
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
```

## 数组中元素的添加和删除
[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/array/access-mgr.sh)
```shell
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
```

## 循环读取数组的数据
[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/array/list.sh)
```shell
#!/usr/bin/env bash

# 从变量读取列表 ..... .. .
colors="Red Yellow Blue"
colors=("${colors[@]}"" White Black")

for color in "${colors[@]}"; do
    echo " $color"
done
```

## 帮助链接

- [sprintf](https://www.runoob.com/linux/linux-shell-printf.html)

