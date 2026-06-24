---
description: '针对Sentry系统，PostgreSQL日志占用磁盘空间的问题，可通过手动或定时清理垃圾数据解决。配置crontab定期执行清理命令，如定义分钟、小时、日、月、星期及执行用户，以自动释放磁盘。'
lastUpdated: '2026-06-21 17:34:32'
head:
  - - meta
    - name: 'og:title'
      content: 'Sentry 磁盘空间清理'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '针对Sentry系统，PostgreSQL日志占用磁盘空间的问题，可通过手动或定时清理垃圾数据解决。配置crontab定期执行清理命令，如定义分钟、小时、日、月、星期及执行用户，以自动释放磁盘。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/sentry/sentry-disk-space-cleanup-at-pg.html'
---
# Sentry 磁盘空间清理

### 保留日志

Sentry 在运行时候会产生大量的日志, 日志存在 PG 数据库中所以需要先从 pg 数据库中删除, 项目中考虑保留 90 天的日志

```Plaintext
docker-compose run --rm worker cleanup --days 30
```

在 postgre 数据库删除后依然占用磁盘空间

### `postgre` 占用磁盘问题

[https://github.com/getsentry/self-hosted/issues/783](https://github.com/getsentry/self-hosted/issues/783)

`postgre` 删除数据后,并没有释放磁盘空间,可以使用以下命令来进行释放

```Plaintext
vacuumdb -U postgres -d postgres -v -f --analyze
```

### 手动清理

1. 保留30天的数据

```Plaintext
delete from nodestore_node where "timestamp" < NOW() - '30 days'::interval;
```

1. 释放磁盘空间

```Plaintext
vacuumdb -U postgres -d postgres -v -f --analyze
```

### 定时清理 `postgre` 垃圾数据

命令如下 :

```Plaintext
docker exec $(docker ps --format "table {{.Names}}"|grep postgres) vacuumdb -U postgres -d postgres -v -f --analyze;
```

### crontab配置

每隔3天的9点执行一次清理

```Plaintext
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed

0 9 */3 * * docker exec -i $(docker ps --format "table {{.Names}}"|grep postgres) vacuumdb -U postgres -d postgres -v -f --analyze &> /webdata/logs/docker-vacuumdb.log
```