---
description: 'SETEX 命令以原子操作设置键值对并指定秒级过期时间，时间复杂度 O(1)，效果等同于 SET 加 EXPIRE。成功返回 OK，seconds 非法时返回错误。适用于缓存场景。'
lastUpdated: '2026-06-21 21:37:45'
head:
  - - meta
    - name: 'og:title'
      content: 'SETEX key seconds value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SETEX 命令以原子操作设置键值对并指定秒级过期时间，时间复杂度 O(1)，效果等同于 SET 加 EXPIRE。成功返回 OK，seconds 非法时返回错误。适用于缓存场景。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/setex.html'
---
# SETEX key seconds value

> 可用版本： >= 2.0.0

> 时间复杂度： O(1)

将键 `key` 的值设置为 `value` ，  
并将键 `key` 的生存时间设置为 `seconds` 秒钟。

如果键 `key` 已经存在，  
那么 `SETEX` 命令将覆盖已有的值。

`SETEX` 命令的效果和以下两个命令的效果类似：

```Plaintext
SET key value
EXPIRE key seconds  # 设置生存时间
```

`SETEX` 和这两个命令的不同之处在于 `SETEX` 是一个原子（atomic）操作，  
它可以在同一时间内完成设置值和设置过期时间这两个操作，  
因此 `SETEX` 命令在储存缓存的时候非常实用。

## 返回值

命令在设置成功时返回 `OK` 。  
当 `seconds` 参数不合法时，  
命令将返回一个错误。

## 代码示例

在键 `key` 不存在的情况下执行 `SETEX` ：

```Plaintext
redis> SETEX cache_user_id 60 10086
OK

redis> GET cache_user_id  # 值
"10086"

redis> TTL cache_user_id  # 剩余生存时间
(integer) 49
```

键 `key` 已经存在，  
使用 `SETEX` 覆盖旧值：

```Plaintext
redis> SET cd "timeless"
OK

redis> SETEX cd 3000 "goodbye my love"
OK

redis> GET cd
"goodbye my love"

redis> TTL cd
(integer) 2997
```