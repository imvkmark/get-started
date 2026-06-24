---
description: 'Redis MULTI开启事务后，PING和SET命令被加入队列。执行DISCARD则取消事务，丢弃队列中的所有命令，同时取消所有监视（等同UNWATCH），最终返回OK。'
lastUpdated: '2026-06-21 21:38:40'
head:
  - - meta
    - name: 'og:title'
      content: 'DISCARD'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis MULTI开启事务后，PING和SET命令被加入队列。执行DISCARD则取消事务，丢弃队列中的所有命令，同时取消所有监视（等同UNWATCH），最终返回OK。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/transaction/discard.html'
---
# DISCARD

> 可用版本： >= 2.0.0

> 时间复杂度： O(1)。

取消事务，放弃执行事务块内的所有命令。

如果正在使用 `WATCH` 命令监视某个(或某些) key，那么取消所有监视，等同于执行命令 `UNWATCH` 。

## 返回值

总是返回 `OK` 。

## 代码示例

```Plaintext
redis> MULTI
OK

redis> PING
QUEUED

redis> SET greeting "hello"
QUEUED

redis> DISCARD
OK
```