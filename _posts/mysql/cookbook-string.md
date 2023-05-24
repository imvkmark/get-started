---
title: "5. 与字符串共舞"
date: 2022-04-20 19:00:44
toc: true
categories:
- ["Mysql","阅读: Mysql Cookbook"]
---

### 5.1 字符串属性
**字符集**



```shell
# 看看系统中有哪些字符集
mysql > Show Character Set;
+----------+---------------------------------+---------------------+--------+
| Charset  | Description                     | Default collation   | Maxlen |
+----------+---------------------------------+---------------------+--------+
| big5     | Big5 Traditional Chinese        | big5_chinese_ci     |      2 |
| dec8     | DEC West European               | dec8_swedish_ci     |      1 |
| cp850    | DOS West European               | cp850_general_ci    |      1 |
| hp8      | HP West European                | hp8_english_ci      |      1 |
| koi8r    | KOI8-R Relcom Russian           | koi8r_general_ci    |      1 |
| latin1   | cp1252 West European            | latin1_swedish_ci   |      1 |
...
| utf8     | UTF-8 Unicode                   | utf8_general_ci     |      3 |
| ucs2     | UCS-2 Unicode                   | ucs2_general_ci     |      2 |
...
```
**Length 和 Char_Length 差别**
```
mysql> Set @s = Convert('abc' Using ucs2);
mysql> Select Length(@s), Char_Length(@s);
+------------+-----------------+
| Length(@s) | Char_Length(@s) |
+------------+-----------------+
|          6 |               3 |
+------------+-----------------+
mysql> Set @s = Convert('abc' Using utf8);
mysql> Select Length(@s), Char_Length(@s);
+------------+-----------------+
| Length(@s) | Char_Length(@s) |
+------------+-----------------+
|          3 |               3 |
+------------+-----------------+
```
**Collation**

如果没有指明哪种 Collation, 则 Default 为 Yes 的则为默认的字符集.
```
mysql> Show Collation Like 'utf8\_%';
+--------------------------+---------+-----+---------+----------+---------+
| Collation                | Charset | Id  | Default | Compiled | Sortlen |
+--------------------------+---------+-----+---------+----------+---------+
| utf8_general_ci          | utf8    |  33 | Yes     | Yes      |       1 |
| utf8_bin                 | utf8    |  83 |         | Yes      |       1 |
| utf8_unicode_ci          | utf8    | 192 |         | Yes      |       8 |
| utf8_icelandic_ci        | utf8    | 193 |         | Yes      |       8 |
| utf8_latvian_ci          | utf8    | 194 |         | Yes      |       8 |
| utf8_romanian_ci         | utf8    | 195 |         | Yes      |       8 |
| utf8_slovenian_ci        | utf8    | 196 |         | Yes      |       8 |
| utf8_polish_ci           | utf8    | 197 |         | Yes      |       8 |
| utf8_estonian_ci         | utf8    | 198 |         | Yes      |       8 |
| utf8_spanish_ci          | utf8    | 199 |         | Yes      |       8 |
| utf8_swedish_ci          | utf8    | 200 |         | Yes      |       8 |
| utf8_turkish_ci          | utf8    | 201 |         | Yes      |       8 |
| utf8_czech_ci            | utf8    | 202 |         | Yes      |       8 |
| utf8_danish_ci           | utf8    | 203 |         | Yes      |       8 |
| utf8_lithuanian_ci       | utf8    | 204 |         | Yes      |       8 |
| utf8_slovak_ci           | utf8    | 205 |         | Yes      |       8 |
| utf8_spanish2_ci         | utf8    | 206 |         | Yes      |       8 |
| utf8_roman_ci            | utf8    | 207 |         | Yes      |       8 |
| utf8_persian_ci          | utf8    | 208 |         | Yes      |       8 |
| utf8_esperanto_ci        | utf8    | 209 |         | Yes      |       8 |
| utf8_hungarian_ci        | utf8    | 210 |         | Yes      |       8 |
| utf8_sinhala_ci          | utf8    | 211 |         | Yes      |       8 |
| utf8_german2_ci          | utf8    | 212 |         | Yes      |       8 |
| utf8_croatian_ci         | utf8    | 213 |         | Yes      |       8 |
| utf8_unicode_520_ci      | utf8    | 214 |         | Yes      |       8 |
| utf8_vietnamese_ci       | utf8    | 215 |         | Yes      |       8 |
| utf8_general_mysql500_ci | utf8    | 223 |         | Yes      |       1 |
+--------------------------+---------+-----+---------+----------+---------+
27 rows in set (0.01 sec)
```
名称后缀的说明

- ci : (case insensitive) 大小写不敏感
- cs : (case sensitive) 大小写敏感
- bin: (binary) 二进制

对于不同的语种也有不同的排序方法.
```
# 排序 A, a, b, B (大小写不敏感, a 在 b 前边即可)
Select c From tb_name Order By c Collate latin_swedish_ci;
# A, a, B, b (大小写敏感, A 在 a 前, B 在 b 前)
.... Collate latin_swedish_cs;
# A, B, a, b
.... Collate latin_swedish_bin;
```

### 5.2 选择字符串数据类型
**根据这几个来进行判定**

- 是否二进制
- 是否大小写敏感
- 字串的最大长度是多少
- 定长值还是变长值
- 是否需要保留尾部空格
- 是否有固定的允许值集合

**字串长度**

| 二进制数据类型 | 普通文本 | 最大长度 | 说明 |
| --- | --- | --- | --- |
| Binary | Char | 255 | 2^8 |
| VarBinary | VarChar | 65535 | 2^16 |
| TinyBlob | TinyText | 255 | 2^8 |
| Blob | Text | 65535 | 2^16 |
| MediumBlob | MediumText | 16777215 | 2^24 |
| LongBlob | LongText | 4294967295 | 2^32 |

**字串空格保留**

如果你想保留出现在储存的原始字符串尾部的填充值, 那就应该使用一个没有截除动作发生的数据类型, 例如, 如果你正存储可能以空格结尾的字串(普通文本), 并且想保留这个空格, 就应该使用 `VarChar` 或者 `Text` 数据类型之一.

### 5.3 正确设置连接字符集
**配置文件**
```properties
[mysql]
default-character-set=utf8
```
**应用程序中使用**
```
mysql> Set Names 'utf8';
mysql> Set Names 'utf8' Collate 'utf8-general_ci'
```
**连接时候指定**
```
jdbc:mysql://{host}/{db}?characterEncoding=UTF-8
```

### 5.4 查询字符串
**字串放在单引号或者双引号内**

启用 `ANSI_QUOTES` SQL 模式时候不得使用双引号, 一般来讲使用单引号会比较保险

**16 进制字符的表示**
```
0x61625ad43
x'61625ad43'
X'61625ad43'
```
```
mysql> select 0x61;
+------+
| 0x61 |
+------+
| a    |
+------+
```
**使用由字符集加下划线('_') 前缀组成的引入器**
```
_latin1 'abcd'
_ucs2 'abcd'
```
**查询过程中使用转义**
```
Select "He said, \"Boo!\"";
```

### 5.5 检查字符集和字符排序
使用 `Charset()` 或 `Collation()` 函数来检查字符集和排序

使用 `Convert()` 转换字符串的字符集
```
mysql> Set @s1 = 'my';
mysql> Set @s2 = Convert(@s1 Using latin1);
mysql> Select Charset(@s1), Charset(@s2);
+--------------+--------------+
| Charset(@s1) | Charset(@s2) |
+--------------+--------------+
| utf8         | latin1       |
+--------------+--------------+
1 row in set (0.00 sec)
```
使用 `Collate` 操作符改变字符串的 Collation
```
mysql> Set @s2 = @s1 Collate latin1_spanish_ci;
```
使用 `Binary` 操作符来进行二进制转换, 同 `Convert(@s1 Using binary)` 相同.

### 5.6 字串操作函数
`Upper()` : 更改为大写

`Lower()` : 更改为小写

`Left(str, 2)` : 左侧截取

`Right(str, 2)` : 右侧截取

`Mid(str, 3, 1)` : 中间截取

`SubString(str, 2, 3)` : 字符随意截取

`SubString_Index(str, c, n)` : 左侧查找 c 在第 n 次出现的位置

`Concat()` : 字符串拼接

`Locate(search, subject)` : 确定一个字串中是否含有另一个字串

### 5.7 使用 SQL 模式进行匹配
```
# Like
... Like 'co%';     # 开头
... Like '%er';     # 结尾
... Like '%er%';    # 包含
# _
... Like '___per';  # 完全匹配
# 模式匹配和字串函数的使用比较
Year(d) = 1976       d Like '1976-%'
Month(d) = 4         d Like '%-04-%'
DayOfMonth(d) = 1    d Like '%-01'
str Like 'abc%'      Left(str, 3) = 'abc'
str Like '%abc'      Right(str, 3) = 'abc'
```

### 5.8 使用正则表达式进行匹配
```
^         : 开始
$         : 结束
.         : 匹配任何字符
[...]     : 匹配括号内任意字符
[^...]    : 不匹配括号内任意字符
p1|p2|p3  : 多选1
*         : 0+
+         : 1+
{n}       : 匹配 n 次
{m, n}    : 最少 m, 最多 n 个
```
使用方法, 使用 `Regexp` 关键词进行匹配
```
... Regexp '^co';
```
支持 Posix 类

| 类 | 对应说明 |
| --- | --- |
| [:alnum:] | Alphanumeric characters |
| [:alpha:] | Alphabetic characters |
| [:blank:] | Whitespace characters |
| [:cntrl:] | Control characters |
| [:digit:] | Digit characters |
| [:graph:] | Graphic characters |
| [:lower:] | Lowercase alphabetic characters |
| [:print:] | Graphic or space characters |
| [:punct:] | Punctuation characters |
| [:space:] | Space, tab, newline, and carriage return |
| [:upper:] | Uppercase alphabetic characters |
| [:xdigit:] | Hexadecimal digit characters |

正则表达式匹配不要求目标串与模式串完全匹配

### 5.9 使用 FullText 查询
**标准语法**
```
# 单列
... Match (Column) Against ('str');
# 多单词查询, 并不是单词越多越精确
... Match (Column) Against ('str1 str2 str3')
# 多列, 多词
... Match (Column, Column2) Against ('str1 str2 str3')
```
**配置最小单词**
```
[mysqld]
ft_min_word_len=3
```
**禁止搜索的单词**

这种方法可以匹配多词, 单词, 移除部分单词
```
... Match(Column) Against('+David -Mark' In Boolean Mode)
```
**特殊字符匹配**
```
... Match(Column) Against('David*' In Boolean Mode)
```
**词组查询**
```
... Match(Column) Against('"Disk Path"' In Boolean Mode)
```

