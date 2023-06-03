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