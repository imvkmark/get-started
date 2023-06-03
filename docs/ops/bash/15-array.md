# 数组

bash 只支持一维数组。

数组下标从 0 开始，下标可以是整数或算术表达式，其值应大于或等于 0。

## 创建数组

<<< @/ops/bash/src/15-array/create.sh

## 访问数组元素的区别

`${colors[*]}` 和 `${colors[@]}` 这两个有比较明显的区别, 下边来说明下

<<< @/ops/bash/src/15-array/access.sh

## 访问数组的元素和长度

<<< @/ops/bash/src/15-array/access-length.sh

## 数组中元素的添加和删除

<<< @/ops/bash/src/15-array/access-mgr.sh

## 循环读取数组的数据

<<< @/ops/bash/src/15-array/list.sh

## 帮助链接

- [sprintf](https://www.runoob.com/linux/linux-shell-printf.html)

