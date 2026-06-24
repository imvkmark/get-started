---
description: 'PTTL命令用于获取键的剩余生存时间（毫秒）。返回值为：-2表示键不存在，-1表示键存在但未设置过期时间，其他正整数表示剩余毫秒数。'
lastUpdated: '2026-06-21 21:31:12'
head:
  - - meta
    - name: 'og:title'
      content: 'PTTL key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PTTL命令用于获取键的剩余生存时间（毫秒）。返回值为：-2表示键不存在，-1表示键存在但未设置过期时间，其他正整数表示剩余毫秒数。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/expire/pttl.html'
---
# PTTL key

> 可用版本： >= 2.6.0

> 复杂度： O(1)

这个命令类似于 `TTL` 命令，但它以毫秒为单位返回 `key` 的剩余生存时间，而不是像 `TTL` 命令那样，以秒为单位。

## 返回值

- 当 `key` 不存在时，返回 `-2` 。
- 当 `key` 存在但没有设置剩余生存时间时，返回 `-1` 。
- 否则，以毫秒为单位，返回 `key` 的剩余生存时间。

Note

在 Redis 2.8 以前，当 `key` 不存在，或者 `key` 没有设置剩余生存时间时，命令都返回 `-1` 。

## 代码示例

```Plaintext
# 不存在的 key

redis> FLUSHDB
OK

redis> PTTL key
(integer) -2

# key 存在，但没有设置剩余生存时间

redis> SET key value
OK

redis> PTTL key
(integer) -1

# 有剩余生存时间的 key

redis> PEXPIRE key 10086
(integer) 1

redis> PTTL key
(integer) 6179
```