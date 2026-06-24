---
description: 'RANDOMKEY命令从当前数据库随机返回一个键。数据库不为空时返回一个随机键名，为空时返回nil。示例：数据库有键时执行RANDOMKEY返回"key1"；数据库为空时返回(nil)。'
lastUpdated: '2026-06-21 21:30:07'
head:
  - - meta
    - name: 'og:title'
      content: 'RANDOMKEY'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'RANDOMKEY命令从当前数据库随机返回一个键。数据库不为空时返回一个随机键名，为空时返回nil。示例：数据库有键时执行RANDOMKEY返回"key1"；数据库为空时返回(nil)。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/randomkey.html'
---
# RANDOMKEY

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

从当前数据库中随机返回(不删除)一个 `key` 。

## 返回值

当数据库不为空时，返回一个 `key` 。  
当数据库为空时，返回 `nil` 。

## 代码示例

```Plaintext
# 数据库不为空

redis> MSET fruit "apple" drink "beer" food "cookies"   # 设置多个 key
OK

redis> RANDOMKEY
"fruit"

redis> RANDOMKEY
"food"

redis> KEYS *    # 查看数据库内所有key，证明 RANDOMKEY 并不删除 key
1) "food"
2) "drink"
3) "fruit"

# 数据库为空

redis> FLUSHDB  # 删除当前数据库所有 key
OK

redis> RANDOMKEY
(nil)
```