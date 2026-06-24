---
description: 'RENAMENX命令用于当新键名不存在时，将键重命名为新名称；若新键已存在则操作失败。'
lastUpdated: '2026-06-21 21:30:11'
head:
  - - meta
    - name: 'og:title'
      content: 'RENAMENX key newkey'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'RENAMENX命令用于当新键名不存在时，将键重命名为新名称；若新键已存在则操作失败。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/renamenx.html'
---
# RENAMENX key newkey

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

当且仅当 `newkey` 不存在时，将 `key` 改名为 `newkey` 。

当 `key` 不存在时，返回一个错误。

## 返回值

修改成功时，返回 `1` ；  
如果 `newkey` 已经存在，返回 `0` 。

## 代码示例

```Plaintext
# newkey 不存在，改名成功

redis> SET player "MPlyaer"
OK

redis> EXISTS best_player
(integer) 0

redis> RENAMENX player best_player
(integer) 1

# newkey存在时，失败

redis> SET animal "bear"
OK

redis> SET favorite_animal "butterfly"
OK

redis> RENAMENX animal favorite_animal
(integer) 0

redis> get animal
"bear"

redis> get favorite_animal
"butterfly"
```