---
description: 'PING返回值代码示例：若客户端与服务器连接正常（网络和服务器均正常运行），则返回成功响应；若连接不正常（网络异常或服务器未运行），则返回失败响应。'
lastUpdated: '2026-06-21 21:30:43'
head:
  - - meta
    - name: 'og:title'
      content: 'PING'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PING返回值代码示例：若客户端与服务器连接正常（网络和服务器均正常运行），则返回成功响应；若连接不正常（网络异常或服务器未运行），则返回失败响应。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/debug/ping.html'
---
# PING

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

使用客户端向 Redis 服务器发送一个 `PING` ，如果服务器运作正常的话，会返回一个 `PONG` 。

通常用于测试与服务器的连接是否仍然生效，或者用于测量延迟值。

## 返回值

如果连接正常就返回一个 `PONG` ，否则返回一个连接错误。

## 代码示例

```Plaintext
# 客户端和服务器连接正常

redis> PING
PONG

# 客户端和服务器连接不正常(网络不正常或服务器未能正常运行)

redis 127.0.0.1:6379> PING
Could not connect to Redis at 127.0.0.1:6379: Connection refused
```