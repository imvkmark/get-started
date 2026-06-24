---
description: 'PEXPIRE命令以毫秒为单位设置键的生存时间，类似EXPIRE（秒级）。设置成功返回1，键不存在或失败返回0。示例中设置mykey生存时间1500毫秒，TTL返回秒数2，PTTL返回精确毫秒数1499。'
lastUpdated: '2026-06-21 21:31:08'
head:
  - - meta
    - name: 'og:title'
      content: 'PEXPIRE key milliseconds'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PEXPIRE命令以毫秒为单位设置键的生存时间，类似EXPIRE（秒级）。设置成功返回1，键不存在或失败返回0。示例中设置mykey生存时间1500毫秒，TTL返回秒数2，PTTL返回精确毫秒数1499。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/expire/pexpire.html'
---
# PEXPIRE key milliseconds

> 可用版本： >= 2.6.0

> 时间复杂度： O(1)

这个命令和 `EXPIRE` 命令的作用类似，但是它以毫秒为单位设置 `key` 的生存时间，而不像 `EXPIRE` 命令那样，以秒为单位。

## 返回值

设置成功，返回 `1`  
`key` 不存在或设置失败，返回 `0`

## 代码示例

```Plaintext
redis> SET mykey "Hello"
OK

redis> PEXPIRE mykey 1500
(integer) 1

redis> TTL mykey    # TTL 的返回值以秒为单位
(integer) 2

redis> PTTL mykey   # PTTL 可以给出准确的毫秒数
(integer) 1499
```