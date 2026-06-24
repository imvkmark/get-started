---
description: 'RENAME命令用于将键名改为新键名。若原键不存在则返回错误；若新键已存在则覆盖旧值。成功时返回OK。'
lastUpdated: '2026-06-21 21:30:10'
head:
  - - meta
    - name: 'og:title'
      content: 'RENAME key newkey'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'RENAME命令用于将键名改为新键名。若原键不存在则返回错误；若新键已存在则覆盖旧值。成功时返回OK。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/rename.html'
---
# RENAME key newkey

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

将 `key` 改名为 `newkey` 。

当 `key` 和 `newkey` 相同，或者 `key` 不存在时，返回一个错误。

当 `newkey` 已经存在时， RENAME 命令将覆盖旧值。

## 返回值

改名成功时提示 `OK` ，失败时候返回一个错误。

## 代码示例

```Plaintext
# key 存在且 newkey 不存在

redis> SET message "hello world"
OK

redis> RENAME message greeting
OK

redis> EXISTS message               # message 不复存在
(integer) 0

redis> EXISTS greeting              # greeting 取而代之
(integer) 1

# 当 key 不存在时，返回错误

redis> RENAME fake_key never_exists
(error) ERR no such key

# newkey 已存在时， RENAME 会覆盖旧 newkey

redis> SET pc "lenovo"
OK

redis> SET personal_computer "dell"
OK

redis> RENAME pc personal_computer
OK

redis> GET pc
(nil)

redis:1> GET personal_computer      # 原来的值 dell 被覆盖了
"lenovo"
```