---
title: "nscd.conf (5) - 名称服务缓存守护程序配置文件"
date: 2022-08-16 19:23:49
toc: true
categories:
- ["Man","conf(5)"]
---

文件 _/etc/nscd.conf_ 在启动时从 [nscd - 名称服务缓存守护程序](https://wulicode.com/man/nscd.html) 读取。每行指定一个属性和一个值，或者指定一个属性、服务和一个值。字段由空格或制表符分隔。`#`（数字符号）表示注释的开头; nscd 不会解释后面的字符，直到行尾。<br />有效的服务是 _passwd_, _group_, _hosts_, _services_ 或者 _netgroup_.<br />`**logfile** _debug-file-name_`<br />指定应将调试信息写入的文件的名称<br />`**debug-level** _value_`<br />设置所需的调试级别。默认值为 0<br />`**threads** _number_`<br />这是启动等待请求的线程数。将始终至少创建五个线程<br />`**max-threads** _number_`<br />指定最大线程数。默认值为 32<br />`**server-user** _user_`<br />如果设置了此选项，nscd 将以此用户身份运行，而不是以 root 用户身份运行。如果为每个用户使用单独的缓存（-S 参数），则忽略此选项。<br />`**stat-user** _user_`<br />指定允许请求统计信息的用户<br />`**reload-count** unlimited | _number_`<br />限制缓存条目在被删除之前未被使用而重新加载的次数。默认值为 5<br />`**paranoia** _<yes|no>_`<br />启用偏执模式会导致 nscd 定期重新启动。默认值为 `no`<br />`**restart-interval** _time_`<br />如果通过启用**偏执狂**模式启用了定期重新启动，则将重新启动间隔设置为_时间_秒。默认值为 3600<br />`**enable-cache** _service <yes|no>_`<br />启用或禁用指定的_服务_缓存。默认值为 `no`.<br />`**positive-time-to-live** _service value_`<br />为_服务的_指定缓存中的正条目（成功的查询）设置 TTL（Time-To-Live）。_值_以秒为单位。值越大，缓存命中率越高，平均响应时间越短，但缓存一致性问题越大<br />`**negative-time-to-live** _service value_`<br />为_服务的_指定缓存中的负条目（不成功的查询）设置 TTL（生存时间）。_值_以秒为单位。如果 UID（用户 ID）拥有的多个文件不在系统数据库中（例如，将 Linux 内核源代码解压缩为 root），则可以显著提高性能;应保持较小以减少缓存一致性问题。<br />`**suggested-size** _service value_`<br />这是内部哈希表的大小，_值_应保持为素数以获得最佳效率。默认值为 211<br />`**check-files** _service <yes|no>_`<br />启用或禁用检查属于指定_服务_的文件是否有更改。这些文件是 _/etc/passwd_、_/etc/group_、_/etc/hosts_、_/etc/services_ 和 _/etc/netgroup_。默认值为 yes<br />`**persistent** _service <yes|no>_`<br />保留缓存的内容，以便在服务器重新启动时_提供服务_;在设置**偏执**模式时很有用。默认值为 no<br />`**shared** _service <yes|no>_`<br />用于_服务的_ nscd 数据库的内存映射与客户端共享，以便它们可以直接在其中进行搜索，而不必在每次执行查找时都通过套接字询问守护程序。默认值为 no<br />`**max-db-size** _service bytes_`<br />_服务的_数据库文件允许的最大大小（以字节为单位）。默认值为 33554432<br />`**auto-propagate** _service <yes|no>_`<br />如果为 _passwd_  或_组_服务设置为 _no_，则不会将 _.byname_ 请求添加到 _passwd.byuid_ 或 _group.bygid_ 缓存中。这可以帮助表包含同一 ID 的多个记录。默认值为 yes。此选项仅对服务 _passwd_ 和_组_有效


## 文件内容
```
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
#	logfile			<file>
#	debug-level		<level>
#	threads			<initial #threads to use>
#	max-threads		<maximum #threads to use>
#	server-user             <user to run server as instead of root>
#		server-user is ignored if nscd is started with -S parameters
#       stat-user               <user who is allowed to request statistics>
#	reload-count		unlimited|<number>
#	paranoia		<yes|no>
#	restart-interval	<time in seconds>
#
#       enable-cache		<service> <yes|no>
#	positive-time-to-live	<service> <time in seconds>
#	negative-time-to-live   <service> <time in seconds>
#       suggested-size		<service> <prime number>
#	check-files		<service> <yes|no>
#	persistent		<service> <yes|no>
#
#	shared			<service> <yes|no>
#	NOTE: Setting 'shared' to a value of 'yes' will accelerate the lookup
#	      with the help of the client, but these lookups will not be
#	      counted as cache hits i.e. 'nscd -g' may show '0%'.
#
#	max-db-size		<service> <number bytes>
#	auto-propagate		<service> <yes|no>
#
# Currently supported cache names (services): passwd, group, hosts, services
#


#	logfile			/var/log/nscd.log
#	threads			4
#	max-threads		32
	server-user		nscd
#	stat-user		somebody
	debug-level		0
#	reload-count		5
	paranoia		no
#	restart-interval	3600

	enable-cache		passwd		yes
	positive-time-to-live	passwd		600
	negative-time-to-live	passwd		20
	suggested-size		passwd		211
	check-files		passwd		yes
	persistent		passwd		yes
	shared			passwd		yes
	max-db-size		passwd		33554432
	auto-propagate		passwd		yes

	enable-cache		group		yes
	positive-time-to-live	group		3600
	negative-time-to-live	group		60
	suggested-size		group		211
	check-files		group		yes
	persistent		group		yes
	shared			group		yes
	max-db-size		group		33554432
	auto-propagate		group		yes

	enable-cache		hosts		yes
	positive-time-to-live	hosts		3600
	negative-time-to-live	hosts		20
	suggested-size		hosts		211
	check-files		hosts		yes
	persistent		hosts		yes
	shared			hosts		yes
	max-db-size		hosts		33554432

	enable-cache		services	yes
	positive-time-to-live	services	28800
	negative-time-to-live	services	20
	suggested-size		services	211
	check-files		services	yes
	persistent		services	yes
	shared			services	yes
	max-db-size		services	33554432

	enable-cache		netgroup	yes
	positive-time-to-live	netgroup	28800
	negative-time-to-live	netgroup	20
	suggested-size		netgroup	211
	check-files		netgroup	yes
	persistent		netgroup	yes
	shared			netgroup	yes
	max-db-size		netgroup	33554432
```

## Ref
[https://linux.die.net/man/5/nscd.conf](https://linux.die.net/man/5/nscd.conf)

