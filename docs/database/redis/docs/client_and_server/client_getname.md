---
description: 'CLIENT GETNAME返回当前连接的名字，新连接默认没有名字；使用CLIENT SETNAME可设置名字，再次调用GETNAME则返回设置的名字。'
lastUpdated: '2026-06-21 21:29:03'
head:
  - - meta
    - name: 'og:title'
      content: 'CLIENT GETNAME'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'CLIENT GETNAME返回当前连接的名字，新连接默认没有名字；使用CLIENT SETNAME可设置名字，再次调用GETNAME则返回设置的名字。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/client_and_server/client_getname.html'
---
# CLIENT GETNAME

> 可用版本： >= 2.6.9

> 时间复杂度： O(1)

返回 `CLIENT SETNAME` 命令为连接设置的名字。

因为新创建的连接默认是没有名字的，  
对于没有名字的连接，  
`CLIENT GETNAME` 返回空白回复。

## 返回值

如果连接没有设置名字，那么返回空白回复；  
如果有设置名字，那么返回名字。

## 代码示例

```Plaintext
# 新连接默认没有名字

redis 127.0.0.1:6379> CLIENT GETNAME
(nil)

# 设置名字

redis 127.0.0.1:6379> CLIENT SETNAME hello-world-connection
OK

# 返回名字

redis 127.0.0.1:6379> CLIENT GETNAME
"hello-world-connection"
```