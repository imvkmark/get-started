---
description: 'Redis的ECHO命令（版本1.0.0，时间复杂度O(1)）用于打印给定的消息，常用于测试。示例：执行`ECHO "Hello Moto"`返回`"Hello Moto"`。'
lastUpdated: '2026-06-21 21:30:29'
head:
  - - meta
    - name: 'og:title'
      content: 'ECHO message'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的ECHO命令（版本1.0.0，时间复杂度O(1)）用于打印给定的消息，常用于测试。示例：执行`ECHO "Hello Moto"`返回`"Hello Moto"`。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/debug/echo.html'
---
# ECHO message

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

打印一个特定的信息 `message` ，测试时使用。

## 返回值

`message` 自身。

## 代码示例

```Plaintext
redis> ECHO "Hello Moto"
"Hello Moto"

redis> ECHO "Goodbye Moto"
"Goodbye Moto"
```