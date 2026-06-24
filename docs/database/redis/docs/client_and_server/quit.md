---
description: 'Redis QUIT命令用于请求服务器关闭与当前客户端的连接，等待所有回复写入后即关闭连接，始终返回OK但不会显示在Redis-cli中。'
lastUpdated: '2026-06-21 21:29:11'
head:
  - - meta
    - name: 'og:title'
      content: 'QUIT'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis QUIT命令用于请求服务器关闭与当前客户端的连接，等待所有回复写入后即关闭连接，始终返回OK但不会显示在Redis-cli中。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/client_and_server/quit.html'
---
# QUIT

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

请求服务器关闭与当前客户端的连接。

一旦所有等待中的回复(如果有的话)顺利写入到客户端，连接就会被关闭。

## 返回值

总是返回 `OK` (但是不会被打印显示，因为当时 Redis-cli 已经退出)。

## 代码示例

```Plaintext
$ redis

redis> QUIT

$
```