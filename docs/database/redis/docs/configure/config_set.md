---
description: 'Redis 的 CONFIG SET 命令可动态调整服务器配置，无需重启。修改由 CONFIG GET 列出的参数，立即生效，成功返回 OK，否则返回错误。例如：CONFIG SET slowlog-max-len 10086。'
lastUpdated: '2026-06-21 21:29:49'
head:
  - - meta
    - name: 'og:title'
      content: 'CONFIG SET parameter value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis 的 CONFIG SET 命令可动态调整服务器配置，无需重启。修改由 CONFIG GET 列出的参数，立即生效，成功返回 OK，否则返回错误。例如：CONFIG SET slowlog-max-len 10086。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/configure/config_set.html'
---
# CONFIG SET parameter value

> 可用版本： >= 2.0.0

> 时间复杂度：O(1)

`CONFIG SET` 命令可以动态地调整 Redis 服务器的配置(configuration)而无须重启。

你可以使用它修改配置参数，或者改变 Redis 的持久化(Persistence)方式。

`CONFIG SET` 可以修改的配置参数可以使用命令 `CONFIG GET *` 来列出，所有被 `CONFIG SET` 修改的配置参数都会立即生效。

关于 `CONFIG SET` 命令的更多消息，请参见命令 `CONFIG GET` 的说明。

关于如何使用 `CONFIG SET` 命令修改 Redis 持久化方式，请参见 [Redis Persistence](http://redis.io/topics/persistence) 。

## 返回值

当设置成功时返回 `OK` ，否则返回一个错误。

## 代码示例

```Plaintext
redis> CONFIG GET slowlog-max-len
1) "slowlog-max-len"
2) "1024"

redis> CONFIG SET slowlog-max-len 10086
OK

redis> CONFIG GET slowlog-max-len
1) "slowlog-max-len"
2) "10086"
```