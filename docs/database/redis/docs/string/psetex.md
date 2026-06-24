---
description: '`PSETEX`命令与`SETEX`类似，但以毫秒为单位设置 key 的生存时间。设置成功返回 OK。示例：`PSETEX mykey 1000 "Hello"` 设置 1000 毫秒，`PTTL mykey` 返回 999 毫秒，`GET mykey` 返回 "Hello"。'
lastUpdated: '2026-06-21 21:37:37'
head:
  - - meta
    - name: 'og:title'
      content: 'PSETEX key milliseconds value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '`PSETEX`命令与`SETEX`类似，但以毫秒为单位设置 key 的生存时间。设置成功返回 OK。示例：`PSETEX mykey 1000 "Hello"` 设置 1000 毫秒，`PTTL mykey` 返回 999 毫秒，`GET mykey` 返回 "Hello"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/psetex.html'
---
# PSETEX key milliseconds value

> 可用版本： >= 2.6.0

> 时间复杂度： O(1)

这个命令和 `SETEX` 命令相似，  
但它以毫秒为单位设置 `key` 的生存时间，  
而不是像 `SETEX` 命令那样以秒为单位进行设置。

## 返回值

命令在设置成功时返回 `OK` 。

## 代码示例

```Plaintext
redis> PSETEX mykey 1000 "Hello"
OK

redis> PTTL mykey
(integer) 999

redis> GET mykey
"Hello"
```