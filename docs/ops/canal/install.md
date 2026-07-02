---
description: 'MySQL配置了二进制日志（bin-log），设定格式为ROW，并指定serverid=1。重启后在MySQL数据目录（如mac下的/usr/local/var/mysql）生成了mysql-bin.000001和mysql-bin.index文件。同时附带了阿里巴巴Canal项目的简介和QuickStart链接。'
lastUpdated: '2026-07-02 12:20:51'
head:
  - - meta
    - name: 'og:title'
      content: '安装 Canal'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'MySQL配置了二进制日志（bin-log），设定格式为ROW，并指定serverid=1。重启后在MySQL数据目录（如mac下的/usr/local/var/mysql）生成了mysql-bin.000001和mysql-bin.index文件。同时附带了阿里巴巴Canal项目的简介和QuickStart链接。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/canal/install.html'
---
# 安装 Canal

## Mysql 开启binlog

```Plaintext
[mysqld]
# open bin log
log-bin=mysql-bin
binlog-format=ROW

# server id
server_id=1
```

重启之后 在 mysql 的数据库目录存在 bin-log, mac 位置: `/usr/local/var/mysql`

```Plaintext
-rw-r-----    1 duoli  admin   154B  2 18 18:01 mysql-bin.000001
-rw-r-----    1 duoli  admin    19B  2 18 18:01 mysql-bin.index
```

## 参考地址

- [简介](https://github.com/alibaba/canal/wiki)
- [QuickStart](https://github.com/alibaba/canal/wiki/QuickStart)