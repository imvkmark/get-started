---
description: 'STRLEN 命令用于返回键 key 所储存字符串值的长度，复杂度为 O(1)，可用版本 2.2.0 起。若 key 不存在则返回 0；若 key 储存的不是字符串则返回错误。例如，SET mykey "Hello world" 后执行 STRLEN 返回 11，而查询不存在的键返回 0。'
lastUpdated: '2026-06-21 21:37:58'
head:
  - - meta
    - name: 'og:title'
      content: 'STRLEN key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'STRLEN 命令用于返回键 key 所储存字符串值的长度，复杂度为 O(1)，可用版本 2.2.0 起。若 key 不存在则返回 0；若 key 储存的不是字符串则返回错误。例如，SET mykey "Hello world" 后执行 STRLEN 返回 11，而查询不存在的键返回 0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/strlen.html'
---
# STRLEN key

> 可用版本： >= 2.2.0

> 复杂度： O(1)

返回键 `key` 储存的字符串值的长度。

## 返回值

`STRLEN` 命令返回字符串值的长度。

当键 `key` 不存在时，  
命令返回 `0` 。

当 `key` 储存的不是字符串值时，  
返回一个错误。

## 代码示例

获取字符串值的长度：

```Plaintext
redis> SET mykey "Hello world"
OK

redis> STRLEN mykey
(integer) 11
```

不存在的键的长度为 `0` ：

```Plaintext
redis> STRLEN nonexisting
(integer) 0
```