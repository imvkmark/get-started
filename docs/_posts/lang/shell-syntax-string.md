---
title: "字符串"
date: 2022-08-24 22:11:54
toc: true
categories:
- ["Lang","Shell","Shell 入门","语法"]
---

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
[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/string/join.sh)
```shell
#!/usr/bin/env bash

# 使用单引号拼接
#--------------------------------------------
name1='boy'
str1='hello, '${name1}''
echo "${str1}"
# Output:
# hello, boy

# 使用双引号拼接
#--------------------------------------------
name2="girl"
str4="hello, ${name2}"
echo "${str4}"
# Output:
# hello, girl
```

## 获取字符串长度
[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/string/length.sh)
```shell
#!/usr/bin/env bash

# 字串长度
#--------------------------------------------
name1='boy'
str1='hello, '${name1}''
echo "${#str1}"
# Output:
# 10
```

## 截取子字符串
[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/string/sub.sh)
```shell
#!/usr/bin/env bash

# 截取字符串
#--------------------------------------------

# 从第 3 个字符开始，截取 2 个字符
text="12345"
echo ${text:2:2}
# Output:
# 34
```

## 查找子字符串
[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/2_types/string/find.sh)
```shell
#!/usr/bin/env bash

# 查找文字在字串中的位置
# 查找 ``ll`` 子字符在 ``hello`` 字符串中的起始位置。
#--------------------------------------------

text="hello"
echo $(expr index "${text}" ll)

# Output:
# 3
# Mac Output:
# expr: syntax error
```

> mac 下会出现语法错误

