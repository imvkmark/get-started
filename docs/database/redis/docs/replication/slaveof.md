---
description: 'SLAVEOF命令可在Redis运行时动态修改复制行为。执行SLAVEOF host port使服务器成为指定主机的从属，丢弃旧数据并同步新数据；执行SLAVEOF NO ONE则关闭复制，从从属变回主服务器且保留同步数据。利用此特性可在主服务器故障时提升从属为主服务器，实现无间断运行。'
lastUpdated: '2026-06-21 21:33:48'
head:
  - - meta
    - name: 'og:title'
      content: 'SLAVEOF host port'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SLAVEOF命令可在Redis运行时动态修改复制行为。执行SLAVEOF host port使服务器成为指定主机的从属，丢弃旧数据并同步新数据；执行SLAVEOF NO ONE则关闭复制，从从属变回主服务器且保留同步数据。利用此特性可在主服务器故障时提升从属为主服务器，实现无间断运行。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/replication/slaveof.html'
---
# SLAVEOF host port

> 可用版本： >= 1.0.0

> 时间复杂度： `SLAVEOF host port` 的复杂度为 O(N)，其中 `N` 为要同步的数据数量； `SLAVEOF NO ONE` 命令的复杂度为 O(1) 。

SLAVEOF 命令用于在 Redis 运行时动态地修改复制(replication)功能的行为。

通过执行 `SLAVEOF host port` 命令，可以将当前服务器转变为指定服务器的从属服务器(slave server)。

如果当前服务器已经是某个主服务器(master server)的从属服务器，那么执行 `SLAVEOF host port` 将使当前服务器停止对旧主服务器的同步，丢弃旧数据集，转而开始对新主服务器进行同步。

另外，对一个从属服务器执行命令 `SLAVEOF NO ONE` 将使得这个从属服务器关闭复制功能，并从从属服务器转变回主服务器，原来同步所得的数据集*不会*被丢弃。

利用“`SLAVEOF NO ONE` 不会丢弃同步所得数据集”这个特性，可以在主服务器失败的时候，将从属服务器用作新的主服务器，从而实现无间断运行。

## 返回值

总是返回 `OK` 。

## 代码示例

```Plaintext
redis> SLAVEOF 127.0.0.1 6379
OK

redis> SLAVEOF NO ONE
OK
```