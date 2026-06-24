---
description: 'ZINCRBY 命令用于为有序集 key 中成员 member 的 score 增加增量 increment（可为负）；若 key 或 member 不存在则等同于 ZADD；score 支持整数或双精度浮点数；返回新 score 的字符串形式。'
lastUpdated: '2026-06-21 21:35:44'
head:
  - - meta
    - name: 'og:title'
      content: 'ZINCRBY key increment member'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ZINCRBY 命令用于为有序集 key 中成员 member 的 score 增加增量 increment（可为负）；若 key 或 member 不存在则等同于 ZADD；score 支持整数或双精度浮点数；返回新 score 的字符串形式。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zincrby.html'
---
# ZINCRBY key increment member

> 可用版本： >= 1.2.0

> 时间复杂度: O(log(N))

为有序集 `key` 的成员 `member` 的 `score` 值加上增量 `increment` 。

可以通过传递一个负数值 `increment` ，让 `score` 减去相应的值，比如 `ZINCRBY key -5 member` ，就是让 `member` 的 `score` 值减去 `5` 。

当 `key` 不存在，或 `member` 不是 `key` 的成员时， `ZINCRBY key increment member` 等同于 `ZADD key increment member` 。

当 `key` 不是有序集类型时，返回一个错误。

`score` 值可以是整数值或双精度浮点数。

## 返回值

`member` 成员的新 `score` 值，以字符串形式表示。

## 代码示例

```Plaintext
redis> ZSCORE salary tom
"2000"

redis> ZINCRBY salary 2000 tom   # tom 加薪啦！
"4000"
```