---
description: '本文档为集群配置的命令参考，涵盖集群能力相关命令的使用说明及版权声明，旨在帮助用户理解并执行集群管理操作。'
lastUpdated: '2026-06-24 19:01:55'
head:
  - - meta
    - name: 'og:title'
      content: '文档'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文档为集群配置的命令参考，涵盖集群能力相关命令的使用说明及版权声明，旨在帮助用户理解并执行集群管理操作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/database/redis/docs/index.html'
---
# 文档

## 命令参考

### 关于

[Topic / 主题]([object Object].md)

### 配置 / 集群

[配置选项]([object Object].md)

[客户端和服务器]([object Object].md)

[集群]([object Object].md)

[数据库]([object Object].md)

[Debug / 调试]([object Object].md)

[Expire / 自动过期]([object Object].md)

### 能力

[String / 字符串]([object Object].md)

[Bitmap / 位图]([object Object].md)

[Geo / 地理位置]([object Object].md)

[Hash]([object Object].md)

[Hyperloglog]([object Object].md)

[Internal / 内部命令]([object Object].md)

[List / 列表]([object Object].md)

[Persistence / 持久化]([object Object].md)

[Pubsub / 发布与订阅]([object Object].md)

[Replication / 复制]([object Object].md)

[Script / Lua 脚本]([object Object].md)

[Sentinel]([object Object].md)

[Set / 集合]([object Object].md)

[Sorted Set / 有序集合]([object Object].md)

[Transaction]([object Object].md)

> 本文档是 Redis 命令参考手册的中文翻译版，

## 版权声明

本文档由 [黄健宏（huangz）](http://huangz.me) 翻译，版权归 Redis 官方所有。

---

::: info 📆

更新记录
2019 年 2 月 8 日（Redis 3+）
- 更换了新皮肤
- 全面更新了命令的样式
- 添加了 `BITMAP` 、 `SWAPDB` 、 `ROLE` 命令的文档翻译
2016 年 7 月 27 日（Redis 3.2）
- 添加 `HSTRLEN` 命令的文档翻译。
2016 年 7 月 21 日（Redis 3.2）
- 添加 `BITFIELD` 命令的文档翻译。
2015 年 8 月 10 日（Redis 3.2）
- 添加 `GEOADD` 、 `GEOPOS` 、 `GEORADIUS` 、 `GEORADIUSBYMEMBER` 和 `GEOHASH` 这五个 GEO 特性命令的文档翻译。
2015 年 8 月 3 日
- [云巴（yunba.io）](http://yunba.io/) 成为本文档的赞助商。
2014 年 12 月 31 日（Redis 2.8）
- 添加 `PFADD key element [element …]` 、 `PFCOUNT key [key …]` 和 `PFMERGE destkey sourcekey [sourcekey …]` 三个 HyperLogLog 命令。
- 添加 `ZRANGEBYLEX key min max [LIMIT offset count]` 、 `ZLEXCOUNT key min max` 和 `ZREMRANGEBYLEX key min max` 三个有序集合命令。
2013 年 12 月(Redis 2.8)
- Redis 2.8 带来的更新：
- 添加 `SCAN cursor [MATCH pattern] [COUNT count]` 命令、 `SSCAN key cursor [MATCH pattern] [COUNT count]` 命令、 HSCAN 命令和 `ZSCAN key cursor [MATCH pattern] [COUNT count]` 命令。
- 添加 CONFIG REWRITE 命令。
- 添加 `PUBSUB <subcommand> [argument [argument …]]` 命令。
- 添加 CLIENT SETNAME connection-name 命令和 CLIENT GETNAME 命令。
- 修改 TTL key 和 PTTL key 命令的返回值。
- 目前已经完成了 集群教程 、 Sentinel 、 复制（Replication） 、 持久化（persistence） 等主要文档，  
未来还会翻译更多主题文档。
2012 年 5 月（Redis 2.6）
- [42区VPS（vps.42qu.com）](http://vps.42qu.com) 成为本文档的赞助商。
2012 年 4 月(Redis 2.6)
- 此次更新的主要内容来自于 Redis 2.6 版本：
- 2.6 版本新增的所有命令(EVAL 、 SCRIPT \* 、 TIME 、 PTTL 等)的相关文档全部翻译完毕。
- 2.6 版本新添加的几个应用模式，比如 INCR 命令的计数器模式和限速器模式、 EXPIRE 命令的导航会话模型等，全部翻译完毕。
- 2.6 版本对旧有命令的改进，比如为 SHUTDOWN 添加修饰符、为 INFO 设置新的输出格式 、 CONFIG RESETSTAT 的变动等，这些命令的文档全部翻译/更新完毕。
- 对代码示例及其注释进行了很多修改和重排版，让代码示例更直观。
- 命令不再按类型分页，而是每个命令各一页，载入速度更快。
- 添加进度表，随时了解项目最新动态。
2011 年 12 月(Redis 2.4)
- 完成 pub/sub 、 transaction 、 connection 和 server 四个部分的翻译。
2011 年 10 月(Redis 2.4)
- 更新命令到 Redis 2.4 版本。
2011 年 6 月(Redis 2.2)
- 完成 keys 、 string 、 list 、 set 和 sorted set 六个部分的翻译。
2011 年 4 月(Redis 2.2)
- 开始进行 Redis 命令参考的翻译工作。

:::