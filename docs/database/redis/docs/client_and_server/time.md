---
description: 'TIME命令时间复杂度O(1)，返回包含UNIX时间戳和当前秒内逝去微秒数的字符串列表。'
lastUpdated: '2026-06-21 21:29:14'
head:
  - - meta
    - name: 'og:title'
      content: 'TIME'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'TIME命令时间复杂度O(1)，返回包含UNIX时间戳和当前秒内逝去微秒数的字符串列表。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/client_and_server/time.html'
---
# TIME

> 可用版本： >= 2.6.0

> 时间复杂度： O(1)

返回当前服务器时间。

## 返回值

一个包含两个字符串的列表： 第一个字符串是当前时间(以 UNIX 时间戳格式表示)，而第二个字符串是当前这一秒钟已经逝去的微秒数。

## 代码示例

```Plaintext
redis> TIME
1) "1332395997"
2) "952581"

redis> TIME
1) "1332395997"
2) "953148"
```