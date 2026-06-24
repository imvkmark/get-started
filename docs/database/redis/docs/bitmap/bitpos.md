---
description: 'Redis的BITPOS命令用于查找位图中第一个值为指定bit的二进制位位置，时间复杂度O(N)。默认检测整个位图，可通过start和end参数限定范围，返回整数结果。'
lastUpdated: '2026-06-21 21:28:55'
head:
  - - meta
    - name: 'og:title'
      content: 'BITPOS key bit [start] [end]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的BITPOS命令用于查找位图中第一个值为指定bit的二进制位位置，时间复杂度O(N)。默认检测整个位图，可通过start和end参数限定范围，返回整数结果。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/bitmap/bitpos.html'
---
# BITPOS key bit [start] [end]

> 可用版本： >= 2.8.7

> 时间复杂度： O(N)，其中 N 为位图包含的二进制位数量

返回位图中第一个值为 `bit` 的二进制位的位置。

在默认情况下，  
命令将检测整个位图，  
但用户也可以通过可选的 `start` 参数和 `end` 参数指定要检测的范围。

## 返回值

整数回复。

## 代码示例

```Plaintext
127.0.0.1:6379> SETBIT bits 3 1    # 1000
(integer) 0

127.0.0.1:6379> BITPOS bits 0
(integer) 0

127.0.0.1:6379> BITPOS bits 1
(integer) 3
```