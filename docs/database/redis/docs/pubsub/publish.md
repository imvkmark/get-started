---
description: 'PUBLISH命令用于向指定频道发送消息，返回值为接收订阅者数量。支持无订阅者、单一订阅者或多订阅者场景，并通过示例展示不同情况下的使用。'
lastUpdated: '2026-06-21 21:33:21'
head:
  - - meta
    - name: 'og:title'
      content: 'PUBLISH channel message'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PUBLISH命令用于向指定频道发送消息，返回值为接收订阅者数量。支持无订阅者、单一订阅者或多订阅者场景，并通过示例展示不同情况下的使用。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/pubsub/publish.html'
---
# PUBLISH channel message

> 可用版本： >= 2.0.0

> 时间复杂度： O(N+M)，其中 `N` 是频道 `channel` 的订阅者数量，而 `M` 则是使用模式订阅(subscribed patterns)的客户端的数量。

将信息 `message` 发送到指定的频道 `channel` 。

## 返回值

接收到信息 `message` 的订阅者数量。

## 代码示例

```Plaintext
# 对没有订阅者的频道发送信息

redis> publish bad_channel "can any body hear me?"
(integer) 0

# 向有一个订阅者的频道发送信息

redis> publish msg "good morning"
(integer) 1

# 向有多个订阅者的频道发送信息

redis> publish chat_room "hello~ everyone"
(integer) 3
```