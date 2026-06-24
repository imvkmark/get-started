---
description: 'INCRBY命令为指定键的值增加整数增量，键不存在时初始化为0后再操作。值必须为数字且在64位有符号范围内，否则返回错误。命令返回增加后的新值。示例展示了对存在键、不存在键以及非数字值键的操作结果。'
lastUpdated: '2026-06-21 21:37:17'
head:
  - - meta
    - name: 'og:title'
      content: 'INCRBY key increment'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'INCRBY命令为指定键的值增加整数增量，键不存在时初始化为0后再操作。值必须为数字且在64位有符号范围内，否则返回错误。命令返回增加后的新值。示例展示了对存在键、不存在键以及非数字值键的操作结果。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/incrby.html'
---
# INCRBY key increment

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

为键 `key` 储存的数字值加上增量 `increment` 。

如果键 `key` 不存在，  
那么键 `key` 的值会先被初始化为 `0` ，  
然后再执行 `INCRBY` 命令。

如果键 `key` 储存的值不能被解释为数字，  
那么 `INCRBY` 命令将返回一个错误。

本操作的值限制在 64 位(bit)有符号数字表示之内。

关于递增(increment) / 递减(decrement)操作的更多信息，  
请参见 `INCR` 命令的文档。

## 返回值

在加上增量 `increment` 之后，  
键 `key` 当前的值。

## 代码示例

键存在，并且值为数字：

```Plaintext
redis> SET rank 50
OK

redis> INCRBY rank 20
(integer) 70

redis> GET rank
"70"
```

键不存在：

```Plaintext
redis> EXISTS counter
(integer) 0

redis> INCRBY counter 30
(integer) 30

redis> GET counter
"30"
```

键存在，但值无法被解释为数字：

```Plaintext
redis> SET book "long long ago..."
OK

redis> INCRBY book 200
(error) ERR value is not an integer or out of range
```