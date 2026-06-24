---
description: 'BRPOPLPUSH命令用于原子性地从source列表尾部弹出元素并推入destination列表头部，支持超时阻塞。返回弹出的元素，若列表为空则超时后返回nil。该命令常用于实现安全队列（保证消息可靠传递）或循环列表（元素在多个列表间流转）。'
lastUpdated: '2026-06-21 21:32:15'
head:
  - - meta
    - name: 'og:title'
      content: 'BRPOPLPUSH source destination timeout'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'BRPOPLPUSH命令用于原子性地从source列表尾部弹出元素并推入destination列表头部，支持超时阻塞。返回弹出的元素，若列表为空则超时后返回nil。该命令常用于实现安全队列（保证消息可靠传递）或循环列表（元素在多个列表间流转）。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/list/brpoplpush.html'
---
# BRPOPLPUSH source destination timeout

> 可用版本： >= 2.2.0

> 时间复杂度： O(1)

BRPOPLPUSH 是 [RPOPLPUSH source destination](https://rpoplpush.md#rpoplpush) 的阻塞版本，当给定列表 `source` 不为空时， BRPOPLPUSH 的表现和 [RPOPLPUSH source destination](https://rpoplpush.md#rpoplpush) 一样。

当列表 `source` 为空时， BRPOPLPUSH 命令将阻塞连接，直到等待超时，或有另一个客户端对 `source` 执行 [LPUSH key value [value …]](https://lpush.md#lpush) 或 [RPUSH key value [value …]](https://rpush.md#rpush) 命令为止。

超时参数 `timeout` 接受一个以秒为单位的数字作为值。超时参数设为 `0` 表示阻塞时间可以无限期延长(block indefinitely) 。

更多相关信息，请参考 [RPOPLPUSH source destination](https://rpoplpush.md#rpoplpush) 命令。

## 返回值

假如在指定时间内没有任何元素被弹出，则返回一个 `nil` 和等待时长。  
反之，返回一个含有两个元素的列表，第一个元素是被弹出元素的值，第二个元素是等待时长。

## 代码示例

```Plaintext
# 非空列表

redis> BRPOPLPUSH msg reciver 500
"hello moto"                        # 弹出元素的值
(3.38s)                             # 等待时长

redis> LLEN reciver
(integer) 1

redis> LRANGE reciver 0 0
1) "hello moto"

# 空列表

redis> BRPOPLPUSH msg reciver 1
(nil)
(1.34s)
```

## 模式：安全队列

参考 [RPOPLPUSH source destination](https://rpoplpush.md#rpoplpush) 命令的《安全队列》一节。

## 模式：循环列表

参考 [RPOPLPUSH source destination](https://rpoplpush.md#rpoplpush) 命令的《循环列表》一节。