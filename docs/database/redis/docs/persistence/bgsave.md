---
description: 'BGSAVE命令在后台异步保存当前数据库数据到磁盘，时间复杂度O(N)。执行后立即返回OK，Redis fork子进程处理保存，父进程继续响应客户端。可通过LASTSAVE判断是否成功。'
lastUpdated: '2026-06-21 21:33:03'
head:
  - - meta
    - name: 'og:title'
      content: 'BGSAVE'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'BGSAVE命令在后台异步保存当前数据库数据到磁盘，时间复杂度O(N)。执行后立即返回OK，Redis fork子进程处理保存，父进程继续响应客户端。可通过LASTSAVE判断是否成功。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/persistence/bgsave.html'
---
# BGSAVE

> 可用版本： >= 1.0.0

> 时间复杂度： O(N)， `N` 为要保存到数据库中的 key 的数量。

在后台异步(Asynchronously)保存当前数据库的数据到磁盘。

BGSAVE 命令执行之后立即返回 `OK` ，然后 Redis fork 出一个新子进程，原来的 Redis 进程(父进程)继续处理客户端请求，而子进程则负责将数据保存到磁盘，然后退出。

客户端可以通过 [LASTSAVE](https://lastsave.md#lastsave) 命令查看相关信息，判断 BGSAVE 命令是否执行成功。

请移步 [持久化文档](http://redis.io/topics/persistence) 查看更多相关细节。

## 返回值

反馈信息。

## 代码示例

```Plaintext
redis> BGSAVE
Background saving started
```