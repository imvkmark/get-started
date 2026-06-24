---
description: 'Python运行程序的方式包括：交互式命令行（通过两次回车执行多行嵌套语句，注意缩进）、运行脚本（如python first.py）、Unix风格的可执行脚本、模块的导入与重载，以及使用IDLE环境。'
lastUpdated: '2026-06-17 23:32:52'
head:
  - - meta
    - name: 'og:title'
      content: '第二 三章 运行程序'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Python运行程序的方式包括：交互式命令行（通过两次回车执行多行嵌套语句，注意缩进）、运行脚本（如python first.py）、Unix风格的可执行脚本、模块的导入与重载，以及使用IDLE环境。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/python/python-manual/2-3-run.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/9dc5bddb584ec6f0d3b7841825c4d3f6.png'
---
# 第二 三章 运行程序

## Python 如何运行

![](https://file.wulicode.com/feishu-images/9dc5bddb584ec6f0d3b7841825c4d3f6.png)

Python 的各种实现

- CPython - 标准 Python
- Jython - Java 编程语言集成
- IronPython - .net 的 Python
- Stackless - 注重并发的 python
- PyPy : 注重速度的Python

## 你如何运行

### 交互式命令运行

```Plaintext
% python
>>> print('Hello world')    # 加入 print
'Hello World'
>>> 'Hello World'           # 不加入 print
'Hello World'
>>> hw = 'hello world'      # 变量输出
>>> hw
'hello world'
```

无需声明变量, 但是变量必须在访问值之前复制

### 交互式命令行

可以导入模块来运行

```Plaintext
>>> import os
>>> os.getcwd()
.../lang/python/get-started'
```

交互式命令行需要注意的的点

- 只输入python 命令
- 可以不用输入 print
- 无需缩进(没有嵌套语句的情况下)
- 注意多行复合语句的执行, 并且可以用空行来结束复合语句
- 一次运行一条语句 ### 存在嵌套语句的输入示例

```Plaintext
# 两次 enter 执行多行
# 嵌套语句需要缩进
>>> for x in 'spam':
...     print(x)
...
s
p
a
m
```

## 第一个脚本

### 普通脚本

```Plaintext
# first script   first.py
# python first.py 来运行
import sys              # 导入模块
print(sys.platform)     # 运行模块函数
print('hello world')    # 输出文字
print(2 ** 100)         # 数学运算
x = 'spam.'
print(x * 8)            # 字串重复
```

在 `windows` 中, 直接运行以上的程序会让程序一闪而过, 所以可以加入

```Plaintext
input()    # 来中断输出
```

![](https://file.wulicode.com/feishu-images/7c1192f3012713a78774d5a643c29a63.png)

### unix 风格的可执行脚本

这样便可以运行来执行 python, 文件需要有 `x` 权限

```Plaintext
#!/usr/bin/env python
import sys              # 导入模块
print(sys.platform)     # 运行模块函数
```

## 模块的导入和重载

每个 `py` 扩展的 python 源代码文件都是一个模块, 不需要特殊的代码来让其成为一个模块导入者得到了模块文件中在顶层所定义的所有的变量名的访问权限, 表面上看, 可以通过 import 和from 以及 reload 调用

```Plaintext
# article.py
title = 'First Title'
```

```Plaintext
import article               # 加载完整的模块
print(article.title)
```

```Plaintext
from article import title    # 复制变量名
print(title)
```

一旦在模块中编写变量名, 内置的 dir 函数也就开始起作用了例如一下便是模块内部全部变量名

```Plaintext
>>> import article                # 双下划线代表系统内置变量名称
>>> dir(article)                  # 返回模块内部所有的属性
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'title']
```

## IDLE

- 一个命令行
- 一个简单的编辑器
- 一个运行器
- debugger 工具

```Plaintext
python -m idlelib.idle
```

![](https://file.wulicode.com/feishu-images/20181e0b60fd42fc533ca401db65da81.png)