---
description: 'PUNSUBSCRIBE命令用于退订给定模式，时间复杂度O(N+M)。无参数调用时，退订客户端所有通过PSUBSCRIBE订阅的模式，并返回退订信息。不同客户端实现可能有差异。'
lastUpdated: '2026-06-21 21:33:27'
head:
  - - meta
    - name: 'og:title'
      content: 'PUNSUBSCRIBE [pattern [pattern …]]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PUNSUBSCRIBE命令用于退订给定模式，时间复杂度O(N+M)。无参数调用时，退订客户端所有通过PSUBSCRIBE订阅的模式，并返回退订信息。不同客户端实现可能有差异。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/pubsub/punsubscribe.html'
---
# PUNSUBSCRIBE [pattern [pattern …]]

> 可用版本： >= 2.0.0

> 时间复杂度： O(N+M) ，其中 `N` 是客户端已订阅的模式的数量， `M` 则是系统中所有客户端订阅的模式的数量。

指示客户端退订所有给定模式。

如果没有模式被指定，也即是，一个无参数的 `PUNSUBSCRIBE` 调用被执行，那么客户端使用 [PSUBSCRIBE pattern [pattern …]](https://psubscribe.md#psubscribe) 命令订阅的所有模式都会被退订。在这种情况下，命令会返回一个信息，告知客户端所有被退订的模式。

## 返回值

这个命令在不同的客户端中有不同的表现。