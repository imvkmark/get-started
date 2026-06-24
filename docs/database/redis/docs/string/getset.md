---
description: 'GETSET命令将键的值设为新值并返回旧值。时间复杂度O(1)。若键不存在则返回nil，若键非字符串类型则报错。示例：设键db为mongodb，GET返回"mongodb"；执行GETSET db redis返回旧值"mongodb"，再GET db得"redis"。'
lastUpdated: '2026-06-21 21:37:06'
head:
  - - meta
    - name: 'og:title'
      content: 'GETSET key value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'GETSET命令将键的值设为新值并返回旧值。时间复杂度O(1)。若键不存在则返回nil，若键非字符串类型则报错。示例：设键db为mongodb，GET返回"mongodb"；执行GETSET db redis返回旧值"mongodb"，再GET db得"redis"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/getset.html'
---
# GETSET key value

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

将键 `key` 的值设为 `value` ，  
并返回键 `key` 在被设置之前的旧值。

## 返回值

返回给定键 `key` 的旧值。

如果键 `key` 没有旧值，  
也即是说，  
键 `key` 在被设置之前并不存在，  
那么命令返回 `nil` 。

当键 `key` 存在但不是字符串类型时，  
命令返回一个错误。

## 代码示例

```Plaintext
redis> GETSET db mongodb    # 没有旧值，返回 nil
(nil)

redis> GET db
"mongodb"

redis> GETSET db redis      # 返回旧值 mongodb
"mongodb"

redis> GET db
"redis"
```