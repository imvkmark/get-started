---
title : "Percona 系列工具介绍以及在 CentOS 安装"
date : 2022-04-20 19:00:44
toc : true
categories :
  - [ "Mysql","Percona Toolkit" ]
---

## 下载和安装 percona toolkit 的包

**Step1 : 安装 Repo**

```
# 清华源(稳定)
$ yum install https://mirrors.tuna.tsinghua.edu.cn/percona/yum/percona-release-latest.noarch.rpm
# 官方
$ yum install https://repo.percona.com/yum/percona-release-latest.noarch.rpm
```

**Step2 : 替换 Release 更新地址并更新 yum 的 repo 缓存**

```
# 腾讯云
$ sed -i 's/http:\/\/repo.percona.com/https:\/\/mirrors.cloud.tencent.com\/percona/g' /etc/yum.repos.d/percona-original-release.repo
# 清华
$ sed -i 's/http:\/\/repo.percona.com/https:\/\/mirrors.tuna.tsinghua.edu.cn/g' /etc/yum.repos.d/percona-original-release.repo
```

更新缓存, 启用 tools 工具

```
$ yum update
$ yum list | grep percona-toolkit
$ percona-release enable tools
```

更新 tools 的源地址
> 需要启用 tools 之后才能更新源地址

```
# 腾讯云
$ sed -i 's/http:\/\/repo.percona.com/https:\/\/mirrors.cloud.tencent.com\/percona/g' /etc/yum.repos.d/percona-tools-release.repo
# 清华
$ sed -i 's/http:\/\/repo.percona.com/https:\/\/mirrors.tuna.tsinghua.edu.cn\/percona/g' /etc/yum.repos.d/percona-tools-release.repo
```

**Step3 : 安装工具**

```
$ yum install -y percona-toolkit
```

## percona-toolkit 介绍

使用文档 [Percona Release Usage](https://www.percona.com/doc/percona-repo-config/percona-release.html#percona-release-usage)

`percona-toolkit` 是一组高级命令行工具的集合，可以查看当前服务的摘要信息，磁盘检测，分析慢查询日志，查找重复索引，实现表同步等等

`percona-toolkit` 源自 Maatkit 和 Aspersa 工具，这两个工具是管理 mysql 的最有名的
工具，！这些工具主要包括开发、性能、配置、监控、复制、系统、实用六大类，作为一个优秀的 DBA，里面有的工具非常有用，如果能掌握并加以灵活应用，将能极大的提高工作效率。

**命令说明**

有的 32 个命令，可以分为 7 大类

| 工具命令                     | 工具作用                    | 备注          |
|--------------------------|-------------------------|-------------|
| pt-duplicate-key-checker | 列出并删除重复的索引和外键           |             |
| pt-online-schema-change  | 在线修改表结构                 |             |
| pt-query-advisor         | 分析查询语句，并给出建议，有 bug      | 已废弃         |
| pt-show-grants           | 规范化和打印权限                |             |
| pt-upgrade               | 在多个服务器上执行查询，并比较不同       |             |
| pt-index-usage           | 分析日志中索引使用情况，并出报告        |             |
| pt-pmp                   | 为查询结果跟踪，并汇总跟踪结果         |             |
| pt-visual-explain        | 格式化执行计划                 |             |
| pt-table-usage           | 分析日志中查询并分析表使用情况         | pt 2.2 新增命令 |
| pt-config-diff           | 比较配置文件和参数               |             |
| pt-mysql-summary         | 对 mysql 配置和 status 进行汇总 |             |
| pt-variable-advisor      | 分析参数，并提出建议              |             |
| pt-deadlock-logger       | 提取和记录 mysql 死锁信息        |             |
| pt-fk-error-logger       | 提取和记录外键信息               |             |
| pt-mext                  | 并行查看 status 样本信息        |             |
| pt-query-digest          | 分析查询日志，并产生报告            | 常用命令        |
| pt-trend                 | 按照时间段读取 slow 日志信息       | 已废弃         |
| pt-heartbeat             | 监控 mysql 复制延迟           |             |
| pt-slave-delay           | 设定从落后主的时间               |             |
| pt-slave-find            | 查找和打印所有 mysql 复制层级关系    |             |
| pt-slave-restart         | 监控 salve 错误，并尝试重启 salve |             |
| pt-table-checksum        | 校验主从复制一致性               |             |
| pt-table-sync            | 高效同步表数据                 |             |
| pt-diskstats             | 查看系统磁盘状态                |             |
| pt-fifo-split            | 模拟切割文件并输出               |             |
| pt-summary               | 收集和显示系统概况               |             |
| pt-stalk                 | 出现问题时，收集诊断数据            |             |
| pt-sift                  | 浏览由 pt-stalk 创建的文件      | pt 2.2 新增命令 |
| pt-ioprofile             | 查询进程 IO 并打印一个 IO 活动表    | pt 2.2 新增命令 |
| pt-archiver              | 将表数据归档到另一个表或文件中         |             |
| pt-find                  | 查找表并执行命令                |             |
| pt-kill                  | Kill 掉符合条件的 sql         | 常用命令        |
| pt-align                 | 对齐其他工具的输出               | pt 2.2 新增命令 |
| pt-fingerprint           | 将查询转成密文                 | pt 2.2 新增命令 |

上面是 pt 工具各个命令的基本功能介绍，可以使用 command –help 来查看每个命令的具体作用和使用方法；

有的命令也可以使用 man command 命令查询相关命令详细信息。

## Xtrabackup

对于 Percona-xtrabackup , 有这几个版本

```
percona-xtrabackup-22
percona-xtrabackup-24       # for 5.6/5.7
percona-xtrabackup-80       # for 8.0
```

