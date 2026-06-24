---
description: 'Redis 的 GET 命令用于获取指定键的字符串值，时间复杂度 O(1)。若键不存在返回 nil，若值非字符串类型则返回错误。该命令仅适用于字符串类型。'
lastUpdated: '2026-06-21 21:36:59'
head:
  - - meta
    - name: 'og:title'
      content: 'GET key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis 的 GET 命令用于获取指定键的字符串值，时间复杂度 O(1)。若键不存在返回 nil，若值非字符串类型则返回错误。该命令仅适用于字符串类型。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/get.html'
---
# GET key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

返回与键 `key` 相关联的字符串值。

## 返回值

如果键 `key` 不存在，  
那么返回特殊值 `nil` ；  
否则，  
返回键 `key` 的值。

如果键 `key` 的值并非字符串类型，  
那么返回一个错误，  
因为 `GET` 命令只能用于字符串值。

## 代码示例

对不存在的键 `key` 或是字符串类型的键 `key` 执行 `GET` 命令：

```Plaintext
redis> GET db
(nil)

redis> SET db redis
OK

redis> GET db
"redis"
```

对不是字符串类型的键 `key` 执行 `GET` 命令：

```Plaintext
redis> DEL db
(integer) 1

redis> LPUSH db redis mongodb mysql
(integer) 3

redis> GET db
(error) ERR Operation against a key holding the wrong kind of value
```