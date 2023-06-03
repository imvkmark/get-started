# 字符串

## 单引号和双引号

shell 字符串可以用单引号 `'` ，也可以用双引号 `"` ，也可以不用引号。

- 单引号的特点
    - 单引号里不识别变量
    - 单引号里不能出现单独的单引号（使用转义符也不行），但可成对出现，作为字符串拼接使用。
- 双引号的特点
    - 双引号里识别变量
    - 双引号里可以出现转义字符

综上，推荐使用双引号。

## 拼接字符串

<<< @/ops/bash/3_lang_ref/2_types/string/join.sh

## 获取字符串长度

<<< @/ops/bash/3_lang_ref/2_types/string/length.sh

## 截取子字符串

<<< @/ops/bash/3_lang_ref/2_types/string/sub.sh

## 查找子字符串

<<< @/ops/bash/3_lang_ref/2_types/string/find.sh


> mac 下会出现语法错误

