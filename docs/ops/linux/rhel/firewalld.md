---
description: 'firewalld防火墙常用命令包括：永久打开或关闭端口（如`--add-port`/`--remove-port`）、永久启用或禁用服务（`--add-service`/`--remove-service`）、配置端口转发（`--add-forward-port`）及允许转发到其他地址。使用`--reload`重载规则，`systemctl start/stop/disable`控制服务启停，`--state`查看状态，`--version`查看版本，`--help`获取帮助。管理区域信息用`--list-all-zones`，查看接口所属区域用`--get-zone-of-interface`。拒绝所有包用`--panic-on`，取消拒绝用`--panic-off`，检查是否拒绝用`--query-panic`。'
lastUpdated: '2026-07-01 13:33:41'
head:
  - - meta
    - name: 'og:title'
      content: 'firewalld 常用命令'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'firewalld防火墙常用命令包括：永久打开或关闭端口（如`--add-port`/`--remove-port`）、永久启用或禁用服务（`--add-service`/`--remove-service`）、配置端口转发（`--add-forward-port`）及允许转发到其他地址。使用`--reload`重载规则，`systemctl start/stop/disable`控制服务启停，`--state`查看状态，`--version`查看版本，`--help`获取帮助。管理区域信息用`--list-all-zones`，查看接口所属区域用`--get-zone-of-interface`。拒绝所有包用`--panic-on`，取消拒绝用`--panic-off`，检查是否拒绝用`--query-panic`。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/linux/rhel/firewalld.html'
---
# firewalld 常用命令

::: info ℹ️

原文地址 : https://xiaoguo.net/wiki/centos-7-firewalld.html

:::

- [Firewalld Home](https://firewalld.org/)

firewalld 是 RHEL 7 的一大特性，最大的好处有两个

- 支持动态更新，不用重启服务
- 加入了防火墙的 `zone` 概念

打开端口 / 关闭端口

```Bash
# 永久打开一个端口
firewall-cmd --permanent --add-port=8080/tcp

# 永久关闭一个端口
firewall-cmd --permanent --remove-port=8080/tcp

# 永久打开某项服务
firewall-cmd --permanent --add-service=http

# 永久关闭某项服务
firewall-cmd --permanent --remove-service=http
```

端口转发

```Bash
# 进行端口转发
firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080:toaddr=192.0.2.55

# 允许转发到其他地址
firewall-cmd --permanent --add-masquerade

# 重新加载防火墙
firewall-cmd --reload
```

运行、停止、禁用firewalld

```Bash
# 启动
systemctl start firewalld

# 查看状态
systemctl status firewalld
firewall-cmd –state

# 停止
systemctl disable firewalld

# 禁用
systemctl stop firewalld
```

帮助

```Bash
# 查看版本
firewall-cmd --version

# 查看帮助
firewall-cmd --help
```

查看区域信息

```Bash
# 查看区域信息:
firewall-cmd --get-active-zones

# 查看指定接口所属区域：
firewall-cmd --get-zone-of-interface=eth0

# 拒绝所有包：
firewall-cmd --panic-on

# 取消拒绝状态：
firewall-cmd --panic-off

# 查看是否拒绝：
firewall-cmd --query-panic
```