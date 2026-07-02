---
description: 'nscd.conf是名称服务缓存守护程序nscd的配置文件。与sssd等二级缓存同时运行可能导致意外行为。支持配置日志、线程数、用户、缓存开关及生命周期等参数。当前支持的缓存服务包括passwd、group、hosts和services。'
lastUpdated: '2026-07-02 12:26:52'
head:
  - - meta
    - name: 'og:title'
      content: 'nscd conf (5) - 名称服务缓存守护程序配置文件'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'nscd.conf是名称服务缓存守护程序nscd的配置文件。与sssd等二级缓存同时运行可能导致意外行为。支持配置日志、线程数、用户、缓存开关及生命周期等参数。当前支持的缓存服务包括passwd、group、hosts和services。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/man/conf/nscd-conf-5.html'
---
# nscd conf (5) - 名称服务缓存守护程序配置文件

文件 */etc/nscd.conf* 在启动时从 nscd (8) - 名称服务缓存守护程序 读取。每行指定一个属性和一个值，或者指定一个属性、服务和一个值。字段由空格或制表符分隔。`#`（数字符号）表示注释的开头; nscd 不会解释后面的字符，直到行尾。

有效的服务是 *passwd*, *group*, *hosts*, *services* 或者 *netgroup*.

`logfile <debug-file-name>`

指定应将调试信息写入的文件的名称

`debug-level <value>`

设置所需的调试级别。默认值为 0

`threads <number>`

这是启动等待请求的线程数。将始终至少创建五个线程

`max-threads <number>`

指定最大线程数。默认值为 32

`server-user <user>`

如果设置了此选项，nscd 将以此用户身份运行，而不是以 root 用户身份运行。如果为每个用户使用单独的缓存（-S 参数），则忽略此选项。

`stat-user <user>`

指定允许请求统计信息的用户

`reload-count unlimited | <number>`

限制缓存条目在被删除之前未被使用而重新加载的次数。默认值为 5

`paranoia <yes|no>`

启用偏执模式会导致 nscd 定期重新启动。默认值为 `no`

`restart-interval <time>`

如果通过启用**偏执狂**模式启用了定期重新启动，则将重新启动间隔设置为时间秒。默认值为 3600

`enable-cache <service <yes|no>>`

启用或禁用指定的_服务_缓存。默认值为 `no`.

`positive-time-to-live <service value>`

为服务的指定缓存中的正条目（成功的查询）设置 TTL（Time-To-Live）。值以秒为单位。值越大，缓存命中率越高，平均响应时间越短，但缓存一致性问题越大

`*negative-time-to-live <service value>*`

为 *服务的* 指定缓存中的负条目（不成功的查询）设置 TTL（生存时间）。值以秒为单位。如果 UID（用户 ID）拥有的多个文件不在系统数据库中（例如，将 Linux 内核源代码解压缩为 root），则可以显著提高性能;应保持较小以减少缓存一致性问题。

`*suggested-size <service value>*`

这是内部哈希表的大小，值 应保持为素数以获得最佳效率。默认值为 211

`*check-files <service <yes|no>>*`

启用或禁用检查属于指定 服务 的文件是否有更改。这些文件是 /etc/passwd、/etc/group\_、/etc/hosts、/etc/services 和 /etc/netgroup。默认值为 yes

`persistent <service <yes|no>>`

保留缓存的内容，以便在服务器重新启动时_提供服务\_;在设置**偏执**模式时很有用。默认值为 no

`shared <service <yes|no>>`

用于_服务的\_ nscd 数据库的内存映射与客户端共享，以便它们可以直接在其中进行搜索，而不必在每次执行查找时都通过套接字询问守护程序。默认值为 no

`max-db-size <service bytes>`

服务的数据库文件允许的最大大小（以字节为单位）。默认值为 33554432

`*auto-propagate <service <yes|no>>*`

如果为 passwd 或 *组* 服务设置为 no，则不会将 .byname 请求添加到 passwd.byuid 或 group.bygid 缓存中。这可以帮助表包含同一 ID 的多个记录。默认值为 yes。此选项仅对服务 passwd 和 组 有效

## 文件内容

```Plaintext
#
# /etc/nscd.conf
#
# An example Name Service Cache config file.  This file is needed by nscd.
#
# WARNING: Running nscd with a secondary caching service like sssd may lead to
#          unexpected behaviour, especially with how long entries are cached.
#
# Legal entries are:
#
#   logfile         <file>
#   debug-level     <level>
#   threads         <initial #threads to use>
#   max-threads     <maximum #threads to use>
#   server-user             <user to run server as instead of root>
#       server-user is ignored if nscd is started with -S parameters
#       stat-user               <user who is allowed to request statistics>
#   reload-count        unlimited|<number>
#   paranoia        <yes|no>
#   restart-interval    <time in seconds>
#
#       enable-cache        <service> <yes|no>
#   positive-time-to-live   <service> <time in seconds>
#   negative-time-to-live   <service> <time in seconds>
#       suggested-size      <service> <prime number>
#   check-files     <service> <yes|no>
#   persistent      <service> <yes|no>
#
#   shared          <service> <yes|no>
#   NOTE: Setting 'shared' to a value of 'yes' will accelerate the lookup
#         with the help of the client, but these lookups will not be
#         counted as cache hits i.e. 'nscd -g' may show '0%'.
#
#   max-db-size     <service> <number bytes>
#   auto-propagate      <service> <yes|no>
#
# Currently supported cache names (services): passwd, group, hosts, services
#

#   logfile         /var/log/nscd.log
#   threads         4
#   max-threads     32
    server-user     nscd
#   stat-user       somebody
    debug-level     0
#   reload-count        5
    paranoia        no
#   restart-interval    3600

    enable-cache        passwd      yes
    positive-time-to-live   passwd      600
    negative-time-to-live   passwd      20
    suggested-size      passwd      211
    check-files     passwd      yes
    persistent      passwd      yes
    shared          passwd      yes
    max-db-size     passwd      33554432
    auto-propagate      passwd      yes

    enable-cache        group       yes
    positive-time-to-live   group       3600
    negative-time-to-live   group       60
    suggested-size      group       211
    check-files     group       yes
    persistent      group       yes
    shared          group       yes
    max-db-size     group       33554432
    auto-propagate      group       yes

    enable-cache        hosts       yes
    positive-time-to-live   hosts       3600
    negative-time-to-live   hosts       20
    suggested-size      hosts       211
    check-files     hosts       yes
    persistent      hosts       yes
    shared          hosts       yes
    max-db-size     hosts       33554432

    enable-cache        services    yes
    positive-time-to-live   services    28800
    negative-time-to-live   services    20
    suggested-size      services    211
    check-files     services    yes
    persistent      services    yes
    shared          services    yes
    max-db-size     services    33554432

    enable-cache        netgroup    yes
    positive-time-to-live   netgroup    28800
    negative-time-to-live   netgroup    20
    suggested-size      netgroup    211
    check-files     netgroup    yes
    persistent      netgroup    yes
    shared          netgroup    yes
    max-db-size     netgroup    33554432
```

## Ref

[https://linux.die.net/man/5/nscd.conf](https://linux.die.net/man/5/nscd.conf)