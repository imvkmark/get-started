---
description: '该文档集包含四个Redis命令的详细说明：DUMP（序列化键值）、MIGRATE（迁移数据至目标实例）、PSYNC（主从同步）、RESTORE（反序列化恢复数据）。可用于数据迁移、备份恢复和主从复制场景。'
lastUpdated: '2026-06-21 21:41:21'
head:
  - - meta
    - name: 'og:title'
      content: 'Internal / 内部命令'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档集包含四个Redis命令的详细说明：DUMP（序列化键值）、MIGRATE（迁移数据至目标实例）、PSYNC（主从同步）、RESTORE（反序列化恢复数据）。可用于数据迁移、备份恢复和主从复制场景。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/internal/index.html'
---
# Internal / 内部命令

- [DUMP key](/database/redis/docs/internal/dump.md)
- [MIGRATE host port key destination-db timeout [COPY] [REPLACE]](/database/redis/docs/internal/migrate.md)
- [PSYNC master\_run\_id offset](/database/redis/docs/internal/psync.md)
- [RESTORE key ttl serialized-value [REPLACE]](/database/redis/docs/internal/restore.md)
- [SYNC](/database/redis/docs/internal/sync.md)