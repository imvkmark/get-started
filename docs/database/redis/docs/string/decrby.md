---
description: 'DECRBY 命令将键的整数值减去指定减量。若键不存在，则先初始化为 0 再执行减法。值需为64位有符号整数，否则返回错误。返回执行后的新值。'
lastUpdated: '2026-06-21 21:36:55'
head:
  - - meta
    - name: 'og:title'
      content: 'DECRBY key decrement'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'DECRBY 命令将键的整数值减去指定减量。若键不存在，则先初始化为 0 再执行减法。值需为64位有符号整数，否则返回错误。返回执行后的新值。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/decrby.html'
---
# DECRBY key decrement

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

将键 `key` 储存的整数值减去减量 `decrement` 。

如果键 `key` 不存在，  
那么键 `key` 的值会先被初始化为 `0` ，  
然后再执行 `DECRBY` 命令。

如果键 `key` 储存的值不能被解释为数字，  
那么 `DECRBY` 命令将返回一个错误。

本操作的值限制在 64 位(bit)有符号数字表示之内。

关于更多递增(increment) / 递减(decrement)操作的更多信息，  
请参见 `INCR` 命令的文档。

## 返回值

`DECRBY` 命令会返回键在执行减法操作之后的值。

## 代码示例

对已经存在的键执行 `DECRBY` 命令：

```Plaintext
redis> SET count 100
OK

redis> DECRBY count 20
(integer) 80
```

对不存在的键执行 `DECRBY` 命令：

```Plaintext
redis> EXISTS pages
(integer) 0

redis> DECRBY pages 10
(integer) -10
```