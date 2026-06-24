---
description: 'UNSUBSCRIBE（可用版本2.0.0，时间复杂度O(N)，N为订阅频道数）指示客户端退订指定频道；无参数时退订所有使用SUBSCRIBE订阅的频道，并返回被退订频道信息。不同客户端表现略有差异。'
lastUpdated: '2026-06-21 21:33:38'
head:
  - - meta
    - name: 'og:title'
      content: 'UNSUBSCRIBE [channel [channel …]]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'UNSUBSCRIBE（可用版本2.0.0，时间复杂度O(N)，N为订阅频道数）指示客户端退订指定频道；无参数时退订所有使用SUBSCRIBE订阅的频道，并返回被退订频道信息。不同客户端表现略有差异。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/pubsub/unsubscribe.html'
---
# UNSUBSCRIBE [channel [channel …]]

> 可用版本： >= 2.0.0

> 时间复杂度： O(N) ， `N` 是客户端已订阅的频道的数量。

指示客户端退订给定的频道。

如果没有频道被指定，也即是，一个无参数的 `UNSUBSCRIBE` 调用被执行，那么客户端使用 `SUBSCRIBE` 命令订阅的所有频道都会被退订。在这种情况下，命令会返回一个信息，告知客户端所有被退订的频道。

## 返回值

这个命令在不同的客户端中有不同的表现。