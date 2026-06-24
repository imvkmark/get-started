---
description: 'TTL命令用于查询键的剩余生存时间。若键不存在，返回-2；若存在但未设置过期时间，返回-1；若设置了过期时间，返回剩余秒数。代码示例：`TTL mykey`。'
lastUpdated: '2026-06-21 21:31:13'
head:
  - - meta
    - name: 'og:title'
      content: 'TTL key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'TTL命令用于查询键的剩余生存时间。若键不存在，返回-2；若存在但未设置过期时间，返回-1；若设置了过期时间，返回剩余秒数。代码示例：`TTL mykey`。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/expire/ttl.html'
---
# TTL key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

以秒为单位，返回给定 `key` 的剩余生存时间(TTL, time to live)。

## 返回值

当 `key` 不存在时，返回 `-2` 。  
当 `key` 存在但没有设置剩余生存时间时，返回 `-1` 。  
否则，以秒为单位，返回 `key` 的剩余生存时间。

Note

在 Redis 2.8 以前，当 `key` 不存在，或者 `key` 没有设置剩余生存时间时，命令都返回 `-1` 。

## 代码示例

```Plaintext
# 不存在的 key

redis> FLUSHDB
OK

redis> TTL key
(integer) -2

# key 存在，但没有设置剩余生存时间

redis> SET key value
OK

redis> TTL key
(integer) -1

# 有剩余生存时间的 key

redis> EXPIRE key 10086
(integer) 1

redis> TTL key
(integer) 10084
```