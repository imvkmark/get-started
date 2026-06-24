---
description: 'EXPIREAT命令为键设置生存时间，参数为UNIX时间戳。成功返回1，键不存在或无法设置时返回0。示例中为“cache”键设置过期时间为2012.12.12，返回1，TTL查询显示剩余秒数。'
lastUpdated: '2026-06-21 21:30:59'
head:
  - - meta
    - name: 'og:title'
      content: 'EXPIREAT key timestamp'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'EXPIREAT命令为键设置生存时间，参数为UNIX时间戳。成功返回1，键不存在或无法设置时返回0。示例中为“cache”键设置过期时间为2012.12.12，返回1，TTL查询显示剩余秒数。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/expire/expireat.html'
---
# EXPIREAT key timestamp

> 可用版本： >= 1.2.0

> 时间复杂度： O(1)

`EXPIREAT` 的作用和 `EXPIRE` 类似，都用于为 `key` 设置生存时间。

不同在于 `EXPIREAT` 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。

## 返回值

如果生存时间设置成功，返回 `1` ；  
当 `key` 不存在或没办法设置生存时间，返回 `0` 。

## 代码示例

```Plaintext
redis> SET cache www.google.com
OK

redis> EXPIREAT cache 1355292000     # 这个 key 将在 2012.12.12 过期
(integer) 1

redis> TTL cache
(integer) 45081860
```