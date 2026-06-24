---
description: 'Redis HSET命令（版本2.0.0，时间复杂度O(1)）用于设置哈希表指定域的值。若哈希表不存在则自动创建；若域已存在则覆盖旧值。新设域成功返回1，覆盖成功返回0。'
lastUpdated: '2026-06-21 21:31:48'
head:
  - - meta
    - name: 'og:title'
      content: 'HSET hash field value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis HSET命令（版本2.0.0，时间复杂度O(1)）用于设置哈希表指定域的值。若哈希表不存在则自动创建；若域已存在则覆盖旧值。新设域成功返回1，覆盖成功返回0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hash/hset.html'
---
# HSET hash field value

> 可用版本： >= 2.0.0

> 时间复杂度： O(1)

将哈希表 `hash` 中域 `field` 的值设置为 `value` 。

如果给定的哈希表并不存在，  
那么一个新的哈希表将被创建并执行 `HSET` 操作。

如果域 `field` 已经存在于哈希表中，  
那么它的旧值将被新值 `value` 覆盖。

## 返回值

当 `HSET` 命令在哈希表中新创建 `field` 域并成功为它设置值时，  
命令返回 `1` ；  
如果域 `field` 已经存在于哈希表，  
并且 `HSET` 命令成功使用新值覆盖了它的旧值，  
那么命令返回 `0` 。

## 代码示例

设置一个新域：

```Plaintext
redis> HSET website google "www.g.cn"
(integer) 1

redis> HGET website google
"www.g.cn"
```

对一个已存在的域进行更新：

```Plaintext
redis> HSET website google "www.google.com"
(integer) 0

redis> HGET website google
"www.google.com"
```