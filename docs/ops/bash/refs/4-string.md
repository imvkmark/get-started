---
description: '该内容展示了字符串的基本操作：使用单引号和双引号拼接字符串得到"hello, boy"和"hello, girl"；获取字符串长度为10；从第3个字符开始截取2个字符得到"34"；查找子串"ll"在"hello"中的起始位置为3，但Mac系统中expr报语法错误。'
lastUpdated: '2026-07-02 09:30:25'
head:
  - - meta
    - name: 'og:title'
      content: '4. 字符串'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该内容展示了字符串的基本操作：使用单引号和双引号拼接字符串得到"hello, boy"和"hello, girl"；获取字符串长度为10；从第3个字符开始截取2个字符得到"34"；查找子串"ll"在"hello"中的起始位置为3，但Mac系统中expr报语法错误。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/bash/refs/4-string.html'
---
# 4. 字符串

## 单引号和双引号

shell 字符串可以用单引号 `'` ，也可以用双引号 `"` ，也可以不用引号。

- 单引号的特点
- 双引号的特点

综上，推荐使用双引号。

## 拼接字符串

```Plaintext
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

```Plaintext
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

```Plaintext
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

```Plaintext
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