---
description: 'Redis 的 EVALSHA 命令通过给定的 SHA1 校验码，执行已缓存在服务器中的 Lua 脚本。脚本可通过 SCRIPT LOAD 命令缓存。参数传递方式与 EVAL 命令相同。示例：SCRIPT LOAD "return ''hello moto''" 返回校验码，随后 EVALSHA 即可执行该脚本。'
lastUpdated: '2026-06-21 21:33:57'
head:
  - - meta
    - name: 'og:title'
      content: 'EVALSHA sha1 numkeys key [key …] arg [arg …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis 的 EVALSHA 命令通过给定的 SHA1 校验码，执行已缓存在服务器中的 Lua 脚本。脚本可通过 SCRIPT LOAD 命令缓存。参数传递方式与 EVAL 命令相同。示例：SCRIPT LOAD "return ''hello moto''" 返回校验码，随后 EVALSHA 即可执行该脚本。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/script/evalsha.html'
---
# EVALSHA sha1 numkeys key [key …] arg [arg …]

> 可用版本： >= 2.6.0

> 时间复杂度： 根据脚本的复杂度而定。

根据给定的 sha1 校验码，对缓存在服务器中的脚本进行求值。

将脚本缓存到服务器的操作可以通过 [SCRIPT LOAD script](https://script_load.md#script-load) 命令进行。

这个命令的其他地方，比如参数的传入方式，都和 [EVAL script numkeys key [key …] arg [arg …]](https://eval.md#eval) 命令一样。

```Plaintext
redis> SCRIPT LOAD "return 'hello moto'"
"232fd51614574cf0867b83d384a5e898cfd24e5a"

redis> EVALSHA "232fd51614574cf0867b83d384a5e898cfd24e5a" 0
"hello moto"
```