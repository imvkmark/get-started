---
description: '第四章介绍了Python核心对象类型，包括数字、字符串、序列操作、不可变性、列表推导、字典键值赋值与排序、元组、文件编码、二进制、集合及类自定义等，并强调如何避免破坏代码灵活性。'
lastUpdated: '2026-06-17 19:06:56'
head:
  - - meta
    - name: 'og:title'
      content: '第四章 介绍 python 对象类型'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '第四章介绍了Python核心对象类型，包括数字、字符串、序列操作、不可变性、列表推导、字典键值赋值与排序、元组、文件编码、二进制、集合及类自定义等，并强调如何避免破坏代码灵活性。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/python/python-manual/4-object-type.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/df6ec045db908bdae5076f58da72a409.png'
---
# 第四章 介绍 python 对象类型

对象类型便是 python 的内置类型

- 容易编写
- 可扩展
- 有效率
- 语言标准

## 类型

或者是可以称之为核心数据类型, 担心不能明确说明, 这里采用截图

![](https://file.wulicode.com/feishu-images/df6ec045db908bdae5076f58da72a409.png)

程序单元类型也可以称之为对象 : 函数, 模块, 类

Python 是动态类型(无需自己进行声明, 自己可以判定类型), 同时也是强类型, 对类型进行适合改类型的有效操作

## 数字

### 类型

整数

浮点数

有虚数的复数

固定精度的十进制

有理分数(带分子和分母的)

全功能集合

### 运算

+, -, \*, /, \*\*(幂运算)

math 包的数学模块

## 字符串

`dir` 方法可以列出内置的函数列表

### 定义

```Plaintext
>>> S = 'Spam'
>>> S = "Spam"
>>> S = """
new
line
"""
>>> S = 'A\n\B\tC'     # 元字符
>>> ord('\n')          # 返回位置
>>> S = u'sp\xc4m'     # unicode 文本
>>> S = b'z\x01c'      # 原始字节值 | bytes 字符串
>>> S = 'sp\xc4\u00c4\U000000c4m'
                       # 非 ascii 字符 \x 16 进制 \u 短 unicode  \U 长 unicode
```

### 序列操作

```Plaintext
>>> S = 'Spam'
>>> S[0]
'S'
>>> S[-1]
'm'
>>> S[1:3]
'pa'         # 分片操作(1-2) 字串返回, 不包含 3
>>> S[:]
'Spam'       # 分片左右没有默认值, 则左为第一个, 又为最后一个
>>> S + '-my'
'Spam-my'    # 字串拼接
>>> S * 2
'SpamSpam'   # 字串的重复, 这里使用了多态的概念来实现
```

### 不可变性

这里的不可变性是数字, 字符串, 元组

```Plaintext
>>> S[0] = 'A'         # 字串不能被部分赋值, 也就是他的不可变性
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'str' object does not support item assignment
>>> S = 'z' + S[1:]    # 字串变量可以覆盖
>>> S
'zpam'
```

对于列表, 字典, 即可是可以完全自由的被改变的

在Php 中, 部分赋值是可以的

```Plaintext
$str = 'abc';
$this->assertEquals('b', $str[1]);
$str[1] = 'a';
$this->assertEquals('aac', $str);
```

### 特定类型的方法

其他的使用参考字符串章节

```Plaintext
>>> S.find('p')          # 查找并返回索引
1
>>> S.replace('p', 'b')  # 替换
'zbam'
```

### 帮助

这几个方法提供的是原始的文档

```Plaintext
>>> dir(S)           # 函数列表
['__add__', '__class__', ..., 'translate', 'upper', 'zfill']
>>> help(S.split)    # 函数帮助
Help on built-in function split:
split(sep=None, maxsplit=-1) method of builtins.str instance
    Return a list of the words in the string, using sep as the delimiter string.
    ...
>>> help(str)        # 数据类型的帮助 str, list, dict
Help on class str in module builtins:
class str(object)
 |  str(object='') -> str
 |  str(bytes_or_buffer[, encoding[, errors]]) -> str
 |
 |  Create a new string object from the given object. If encoding or
 |  errors is specified, then the object must expose a data buffer
 |  that will be decoded using the given encoding and error handler.
 |  Otherwise, returns the result of object.__str__() (if defined)
 |  or repr(object).
 ....
```

### f-string

格式化 `{}` 内容，不在 `{}` 内的照常展示输出，如果你想输出 `{}`，那就用双层 `{{}}` 将想输出的内容包起来

```Plaintext
lis = [1,2,3]
print(lis, f'has a length of {len(lis)}.')
# [1,2,3] has a length of 3.
```

## 列表

### 定义

```Plaintext
>>> L = [1, '1', 1.0]    # 定义
>>> len(L)
3
>>> L[:-1]               # 分片
[1, '1']
>>> L + [2]              # 附加
[1, '1', 1.0, 2]
>>> L * 2                # 重复
[1, '1', 1.0, 1, '1', 1.0]
>>> L[1] = 'num'         # 支持赋值
>>> L
[1, 'num', 1.0]
>>> L = [[1,2], [3,4], [5,6]]
                         # 嵌套
```

特定类型的操作见后续操作

### 推导

```Plaintext
>>> L = [[1,2], [3,4], [5,6]]
# 把 M 中的每个 row 中的 row[0] 拿出来放到一个列表中
>>> M = [row[0] for row in L]
>>> M
[1, 3, 5]
# 数据做运算
>>> M = [row[0] * 2 for row in L]
>>> M
[2, 6, 10]
# 数据进行条件取值
>>> M = [row[0] * 2 for row in L if row[1] % 4 == 0]
>>> M
[6]
# 搜集并赋值
>>> M = [L[i][i] for i in [0, 1]]
>>> M
[1, 4]
# 拆解字串
>>> M = [c * 2 for c in 'spam']
>>> M
['ss', 'pp', 'aa', 'mm']
# 生成集合
>>> M = {L[i][0] for i in [0,1,2]}
>>> M
{1, 3, 5}
# 生成字典
>>> M = {i : L[i][0] for i in [0,1,2]}
>>> M
{0: 1, 1: 3, 2: 5}
```

## 字典

具有可变性的映射类型

### 定义

```Plaintext
>>> D = {'a' : 'apple', 'b' : 'banana'}
>>> D['a'] +='s'               # 支持改写
>>> D
{'a': 'apples', 'b': 'banana'}
# kv 赋值
>>> D = dict(a='apple', b='banana')
{'a': 'apple', 'b': 'banana'}
# 映射赋值
>>> D = dict(zip(['a', 'b'], ['apple', 'banana']))
{'a': 'apple', 'b': 'banana'}
```

### 取数据和检查

```Plaintext
# 检查键是否存在
>>> 'a' in D
True
>>> if not 'c' in D:
...     print('c not in D')
...
c not in D
>>> value = D.get('c', 0)
>>> value
0
>>> value = D['c'] if 'c' in D else 0
>>> value
0
```

### 键排序

python 中的键顺序不一定和定义顺序相符, 所以需要使用 sort 进行排序

```Plaintext
# 获取 keys
>>> K = list(D.keys())
>>> K
# 排序
>>> K.sort()
# 循环输出
>>> for key in K:
...    print(key, '=>', D[key])
```

## 元组

像不可变的列表, 提供了一种完整性约束

### 定义

```Plaintext
>>> T = (1, 2, 3, 4)
>>> T + (5, 6)
```

## 文件

### 定义

```Plaintext
>>> f = open('data.txt', 'w')   # 打开文件, 写入模式
>>> f.write("Hello World \n")   # 返回写入文本的数量
>>> f.close()                   # 关闭并输入到磁盘
>>> f = open('data.txt')
>>> text = f.read()
>>> text
Hello World \n
# 编码
>>> f = open('data.txt', 'w', encoding='utf-8')
```

### 二进制

💡

这里是看不懂的, 所以截图记录下来, 暂时也不知道如何去使用

对于二进制文件的写入和读取

![](https://file.wulicode.com/feishu-images/f682bde0e140d392d86d535259d7b587.png)

读取并还原二进制数据实际上是一个对称的过程, 并非所有的程序都需要触及如此底层的字节领域, 但 Python 的二进制文件简化了这个过程

![](https://file.wulicode.com/feishu-images/8066e56a7b21f1517ebb81236e98b428.png)

## 其他核心类型

### 集合

唯一的不可变的对象的无序集合, 集合通过调用内置函数而创建, 或者通过新的集合字面量和表达式创建, 并且支持一般的数学集合操作, 集合可使用 `{...}` 语法, 更像是没有值的字典

```Plaintext
>>> X = set('spam')               # 字面量创建
>>> X
{'a', 's', 'm', 'p'}
>>> Y = {'a', '4'}                # 语法创建
>>> X, Y
({'a', 's', 'm', 'p'}, {'a', '4'})
>>> X & Y                         # 位操作...
{'a'}
>>> X | Y
{'a', 'm', 'p', '4', 's'}
>>> X - Y                         # 数学操作
{'s', 'm', 'p'}
>>> X > Y                         # 超集操作
False
>>> 'm' in X                      # in 判定
True
```

集合在数学上用作过滤重复对象, 分离集合间差异, 进行非顺序等价判断的利器

```Plaintext
>>> 1 / 3                     # 浮点数
>>> import decimal            # 固定精度数值
>>> decimal.Decimal('3.141')
Decimal('3.141')
>>> from fractions import Fraction
>>> f = Fraction(1, 3)        # 分数 (1 / 3) + 1 = (4 / 3)
>>> f + 1
Fraction(4, 3)
>>> 1 > 2                     # 布尔值, Python 布尔值写法是傲娇的, 首字母永远大写
False
>>> X = None                  # 特殊的占位符对象, 用来初始化变量和对象
```

### 如何破坏代码的灵活性

降低灵活性的一个操作就是类型判定

```Plaintext
>>> L = []                    # 定义
>>> type(L)
<class 'list'>
>>> type(type(L))             # 返回
<class 'type'>
>>> type(L) == list           # 判定
True
>>> type(L) == type([])
True
>>> isinstance(L, list)
True
```

## 类的自定义

```Plaintext
class Worker:
    def __init__(self, name, pay) :     # self 是隐含的对象, 一个类中总有一个隐含的对象
                                self.name = name
                                self.pay  = pay
                def lastName(self):
                                return self.name.split()[-1]
                def giveRaise(self, percent):
                                self.pay *= (1.0 + percent)
>>> bob = Worker('Mark Zhao', 428)
>>> bob.lastName()
'Zhao'
>>> bob.giveRaise(.1)
>>> self.pay
470.8
```