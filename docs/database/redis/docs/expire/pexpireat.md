---
description: 'PEXPIREAT命令以毫秒为单位设置key的过期UNIX时间戳，成功返回1，失败返回0。与EXPIREAT区别在于时间单位。示例演示了设置及TTL/PTTL检查。'
lastUpdated: '2026-06-21 21:31:08'
head:
  - - meta
    - name: 'og:title'
      content: 'PEXPIREAT key milliseconds-timestamp'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PEXPIREAT命令以毫秒为单位设置key的过期UNIX时间戳，成功返回1，失败返回0。与EXPIREAT区别在于时间单位。示例演示了设置及TTL/PTTL检查。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/expire/pexpireat.html'
---
# PEXPIREAT key milliseconds-timestamp

> 可用版本： >= 2.6.0

> 时间复杂度： O(1)

这个命令和 `expireat` 命令类似，但它以毫秒为单位设置 `key` 的过期 unix 时间戳，而不是像 `expireat` 那样，以秒为单位。

## 返回值

如果生存时间设置成功，返回 `1` 。  
当 `key` 不存在或没办法设置生存时间时，返回 `0` 。(查看 [EXPIRE key seconds](https://expire.md) 命令获取更多信息)

## 代码示例

```Plaintext
redis> SET mykey "Hello"
OK

redis> PEXPIREAT mykey 1555555555005
(integer) 1

redis> TTL mykey           # TTL 返回秒
(integer) 223157079

redis> PTTL mykey          # PTTL 返回毫秒
(integer) 223157079318
```