---
description: 'GETRANGE 命令返回字符串指定范围（包含 start 和 end），支持负数偏移（-1 为末尾字符），时间复杂度 O(N)，自动处理超范围请求。Redis 2.0 前称 SUBSTR。示例：GETRANGE greeting 0 4 返回 "hello"；负数索引如 -3 -1 返回 "end"。不支持回绕。'
lastUpdated: '2026-06-21 21:37:04'
head:
  - - meta
    - name: 'og:title'
      content: 'GETRANGE key start end'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'GETRANGE 命令返回字符串指定范围（包含 start 和 end），支持负数偏移（-1 为末尾字符），时间复杂度 O(N)，自动处理超范围请求。Redis 2.0 前称 SUBSTR。示例：GETRANGE greeting 0 4 返回 "hello"；负数索引如 -3 -1 返回 "end"。不支持回绕。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/getrange.html'
---
# GETRANGE key start end

> 可用版本： >= 2.4.0

> 时间复杂度： O(N)，其中 N 为被返回的字符串的长度。

返回键 `key` 储存的字符串值的指定部分，  
字符串的截取范围由 `start` 和 `end` 两个偏移量决定  
(包括 `start` 和 `end` 在内)。

负数偏移量表示从字符串的末尾开始计数，  
`-1` 表示最后一个字符，  
`-2` 表示倒数第二个字符，  
以此类推。

`GETRANGE` 通过保证子字符串的值域(range)不超过实际字符串的值域来处理超出范围的值域请求。

Note

`GETRANGE` 命令在 Redis 2.0 之前的版本里面被称为 `SUBSTR` 命令。

## 返回值

`GETRANGE` 命令会返回字符串值的指定部分。

## 代码示例

```Plaintext
redis> SET greeting "hello, my friend"
OK

redis> GETRANGE greeting 0 4          # 返回索引0-4的字符，包括4。
"hello"

redis> GETRANGE greeting -1 -5        # 不支持回绕操作
""

redis> GETRANGE greeting -3 -1        # 负数索引
"end"

redis> GETRANGE greeting 0 -1         # 从第一个到最后一个
"hello, my friend"

redis> GETRANGE greeting 0 1008611    # 值域范围不超过实际字符串，超过部分自动被符略
"hello, my friend"
```