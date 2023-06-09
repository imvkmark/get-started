# Centos 7 - firewalld 常用命令

原文地址： [Centos 7 firewalld常用命令](https://xiaoguo.net/wiki/centos-7-firewalld.html)

参考地址： [firewall-cmd - firewalld command line client](http://linuxmanpages.net/manpages/fedora20/man1/firewall-cmd.1.html)

firewalld是centos7的一大特性，最大的好处有两个：支持动态更新，不用重启服务；第二个就是加入了防火墙的“zone”概念。

- 打开端口 / 关闭端口

```shell
# 永久打开一个端口
$ firewall-cmd --permanent --add-port=8080/tcp
# 永久关闭一个端口
$ firewall-cmd --permanent --remove-port=8080/tcp
# 永久打开某项服务
$ firewall-cmd --permanent --add-service=http
# 永久关闭某项服务
$ firewall-cmd --permanent --remove-service=http
```

- 端口转发

```shell
# 进行端口转发
$ firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080:toaddr=192.0.2.55
# 允许转发到其他地址
$ firewall-cmd --permanent --add-masquerade
# 重新加载防火墙
$ firewall-cmd --reload
```

- 运行、停止、禁用firewalld

```shell
# 启动
$ systemctl start firewalld
# 查看状态
$ systemctl status firewalld
$ firewall-cmd –state
# 停止
$ systemctl disable firewalld
# 禁用
$ systemctl stop firewalld
```

- 帮助

```shell
# 查看版本
$ firewall-cmd --version
# 查看帮助
$ firewall-cmd --help
```

- 查看区域信息

```shell
# 查看区域信息: 
$ firewall-cmd –get-active-zones
# 查看指定接口所属区域：
$ firewall-cmd –get-zone-of-interface=eth0
# 拒绝所有包：
$ firewall-cmd –panic-on
# 取消拒绝状态：
$ firewall-cmd –panic-off
# 查看是否拒绝：
$ firewall-cmd –query-panic
```

