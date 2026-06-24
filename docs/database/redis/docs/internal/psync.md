---
description: '这是Redis 2.8.0版本中用于复制功能的内部命令PSYNC，其时间复杂度不明确。该命令用于进行数据序列化，示例中展示了执行PSYNC ? -1后返回的REDIS序列化数据。'
lastUpdated: '2026-06-21 21:32:02'
head:
  - - meta
    - name: 'og:title'
      content: 'PSYNC master\_run\_id offset'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '这是Redis 2.8.0版本中用于复制功能的内部命令PSYNC，其时间复杂度不明确。该命令用于进行数据序列化，示例中展示了执行PSYNC ? -1后返回的REDIS序列化数据。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/internal/psync.html'
---
# PSYNC master\\\_run\\\_id offset

> 可用版本： >= 2.8.0

> 时间复杂度： 不明确

用于复制功能(replication)的内部命令。

更多信息请参考 复制（Replication） 文档。

## 返回值

序列化数据。

## 代码示例

```Plaintext
127.0.0.1:6379> PSYNC ? -1
"REDIS0006\xfe\x00\x00\x02kk\x02vv\x00\x03msg\x05hello\xff\xc3\x96P\x12h\bK\xef"
```