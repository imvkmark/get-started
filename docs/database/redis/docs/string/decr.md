---
description: 'DECR 命令将键的数字值减一，若键不存在则初始化为0再减一，值必须在64位有符号整数范围内，否则返回错误。返回操作后的值，如已存在键减一后为9，不存在的键减一后为-1。'
lastUpdated: '2026-06-21 21:36:53'
head:
  - - meta
    - name: 'og:title'
      content: 'DECR key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'DECR 命令将键的数字值减一，若键不存在则初始化为0再减一，值必须在64位有符号整数范围内，否则返回错误。返回操作后的值，如已存在键减一后为9，不存在的键减一后为-1。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/decr.html'
---
# DECR key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

为键 `key` 储存的数字值减去一。

如果键 `key` 不存在，  
那么键 `key` 的值会先被初始化为 `0` ，  
然后再执行 `DECR` 操作。

如果键 `key` 储存的值不能被解释为数字，  
那么 `DECR` 命令将返回一个错误。

本操作的值限制在 64 位(bit)有符号数字表示之内。

关于递增(increment) / 递减(decrement)操作的更多信息，  
请参见 `INCR` 命令的文档。

## 返回值

`DECR` 命令会返回键 `key` 在执行减一操作之后的值。

## 代码示例

对储存数字值的键 `key` 执行 `DECR` 命令：

```Plaintext
redis> SET failure_times 10
OK

redis> DECR failure_times
(integer) 9
```

对不存在的键执行 `DECR` 命令：

```Plaintext
redis> EXISTS count
(integer) 0

redis> DECR count
(integer) -1
```