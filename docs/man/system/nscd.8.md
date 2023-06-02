# nscd (8) - 名称服务缓存守护程序

Nscd 是一个守护程序，它为最常见的名称服务请求提供缓存。默认配置文件 `/etc/nscd.conf` 确定缓存守护程序的行为。参见
[nscd.conf](../conf/nscd.conf.5.md)

Nscd 通过标准的 libc 接口（如 getpwnam（3）、getpwuid（3）、getgrnam（3）、getgrnam（3）、getgrgid（3）、gethostbyname（3）等）为 passwd（5）、group（5） 和 hosts（5） 数据库的访问提供缓存。

每个数据库有两个缓存：一个正缓存用于找到的项目，一个负缓存用于未找到的项目。每个缓存的数据都有一个单独的 TTL（生存时间）时间段。请注意，影子文件特别不缓存。因此，getspnam（3）
调用保持未缓存状态。

## 选项

`--help`

    帮助文件

`-i <database>`

    清空名称服务缓存

## 笔记

守护程序将尝试监视适用于每个数据库的配置文件中的更改（例如，/etc/passwd 用于 passwd 数据库或 /etc/hosts 和 /etc/resolv.conf
用于主机数据库），并在这些更改时刷新缓存。但是，只有在短暂的延迟之后才会发生这种情况（除非 inotify（7） 机制可用且 glibc 2.9 或更高版本可用），并且此自动检测不会涵盖非标准
NSS 模块所需的配置文件（如果在 /etc/nsswitch.conf 中指定了任何配置文件）。在这种情况下，你需要在更改数据库的配置文件后运行以下命令，以便 nscd 使其缓存失效

```
$ nscd -i <database>
```

## 实例

### centos 清空dns 缓存

```
安装 nscd
# yum -y install nscd

启动服务
# systemctl start nscd

# 清空 dns 缓存
# nscd -i hosts
```

