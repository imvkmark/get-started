---
description: 'SREM命令用于从集合中移除一个或多个指定成员，返回实际被移除的元素数量。移除不存在的成员时忽略该操作。支持单元素、多元素以及处理不存在元素的场景。'
lastUpdated: '2026-06-21 21:35:16'
head:
  - - meta
    - name: 'og:title'
      content: 'SREM key member [member …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SREM命令用于从集合中移除一个或多个指定成员，返回实际被移除的元素数量。移除不存在的成员时忽略该操作。支持单元素、多元素以及处理不存在元素的场景。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/srem.html'
---
# SREM key member [member …]

> 可用版本： >= 1.0.0

> 时间复杂度: O(N)， `N` 为给定 `member` 元素的数量。

移除集合 `key` 中的一个或多个 `member` 元素，不存在的 `member` 元素会被忽略。

当 `key` 不是集合类型，返回一个错误。

Note

在 Redis 2.4 版本以前， SREM 只接受单个 `member` 值。

## 返回值

被成功移除的元素的数量，不包括被忽略的元素。

## 代码示例

```Plaintext
# 测试数据

redis> SMEMBERS languages
1) "c"
2) "lisp"
3) "python"
4) "ruby"

# 移除单个元素

redis> SREM languages ruby
(integer) 1

# 移除不存在元素

redis> SREM languages non-exists-language
(integer) 0

# 移除多个元素

redis> SREM languages lisp python c
(integer) 3

redis> SMEMBERS languages
(empty list or set)
```