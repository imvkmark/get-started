---
description: 'Redis APPEND命令（可用版本2.0.0，平摊O(1)）将value追加到已存在的字符串key末尾；若key不存在则等同于SET。返回追加后字符串长度。例如：对不存在key执行APPEND myphone "nokia"得长度5；对已有值"nokia"追加" - 1110"得长度12，最终值为"nokia - 1110"。'
lastUpdated: '2026-06-21 21:36:51'
head:
  - - meta
    - name: 'og:title'
      content: 'APPEND key value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis APPEND命令（可用版本2.0.0，平摊O(1)）将value追加到已存在的字符串key末尾；若key不存在则等同于SET。返回追加后字符串长度。例如：对不存在key执行APPEND myphone "nokia"得长度5；对已有值"nokia"追加" - 1110"得长度12，最终值为"nokia - 1110"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/append.html'
---
# APPEND key value

> 可用版本： >= 2.0.0

> 时间复杂度： 平摊O(1)

如果键 `key` 已经存在并且它的值是一个字符串，  
`APPEND` 命令将把 `value` 追加到键 `key` 现有值的末尾。

如果 `key` 不存在，  
`APPEND` 就简单地将键 `key` 的值设为 `value` ，  
就像执行 `SET key value` 一样。

## 返回值

追加 `value` 之后，  
键 `key` 的值的长度。

## 示例代码

对不存在的 `key` 执行 `APPEND` ：

```Plaintext
redis> EXISTS myphone               # 确保 myphone 不存在
(integer) 0

redis> APPEND myphone "nokia"       # 对不存在的 key 进行 APPEND ，等同于 SET myphone "nokia"
(integer) 5                         # 字符长度
```

对已存在的字符串进行 `APPEND` ：

```Plaintext
redis> APPEND myphone " - 1110"     # 长度从 5 个字符增加到 12 个字符
(integer) 12

redis> GET myphone
"nokia - 1110"
```