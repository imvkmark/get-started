---
description: 'SMOVE命令原子性地将member元素从source集合移动到destination集合，若source不存在或不包含member则返回0，否则移除并添加，若destination已有member则仅删除source中的元素，非集合类型报错。成功返回1，否则返回0。'
lastUpdated: '2026-06-21 21:35:03'
head:
  - - meta
    - name: 'og:title'
      content: 'SMOVE source destination member'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SMOVE命令原子性地将member元素从source集合移动到destination集合，若source不存在或不包含member则返回0，否则移除并添加，若destination已有member则仅删除source中的元素，非集合类型报错。成功返回1，否则返回0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/smove.html'
---
# SMOVE source destination member

> 可用版本： >= 1.0.0

> 时间复杂度: O(1)

将 `member` 元素从 `source` 集合移动到 `destination` 集合。

SMOVE 是原子性操作。

如果 `source` 集合不存在或不包含指定的 `member` 元素，则 SMOVE 命令不执行任何操作，仅返回 `0` 。否则， `member` 元素从 `source` 集合中被移除，并添加到 `destination` 集合中去。

当 `destination` 集合已经包含 `member` 元素时， SMOVE 命令只是简单地将 `source` 集合中的 `member` 元素删除。

当 `source` 或 `destination` 不是集合类型时，返回一个错误。

## 返回值

如果 `member` 元素被成功移除，返回 `1` 。  
如果 `member` 元素不是 `source` 集合的成员，并且没有任何操作对 `destination` 集合执行，那么返回 `0` 。

## 代码示例

```Plaintext
redis> SMEMBERS songs
1) "Billie Jean"
2) "Believe Me"

redis> SMEMBERS my_songs
(empty list or set)

redis> SMOVE songs my_songs "Believe Me"
(integer) 1

redis> SMEMBERS songs
1) "Billie Jean"

redis> SMEMBERS my_songs
1) "Believe Me"
```