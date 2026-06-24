---
description: 'EXISTS 命令用于检查 Redis 中指定 key 是否存在，时间复杂度 O(1)。可用版本 1.0.0。key 存在返回 1，不存在返回 0。示例：先 SET db "redis"，EXISTS db 返回 1；DEL db 后，EXISTS db 返回 0。'
lastUpdated: '2026-06-21 21:29:58'
head:
  - - meta
    - name: 'og:title'
      content: 'EXISTS key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'EXISTS 命令用于检查 Redis 中指定 key 是否存在，时间复杂度 O(1)。可用版本 1.0.0。key 存在返回 1，不存在返回 0。示例：先 SET db "redis"，EXISTS db 返回 1；DEL db 后，EXISTS db 返回 0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/exists.html'
---
# EXISTS key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

检查给定 `key` 是否存在。

## 返回值

若 `key` 存在，返回 `1` ，否则返回 `0` 。

## 代码示例

```Plaintext
redis> SET db "redis"
OK

redis> EXISTS db
(integer) 1

redis> DEL db
(integer) 1

redis> EXISTS db
(integer) 0
```