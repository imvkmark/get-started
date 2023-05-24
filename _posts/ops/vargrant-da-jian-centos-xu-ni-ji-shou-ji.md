---
title: "vargrant 搭建 centos 虚拟机手记"
date: 2021-06-26 10:30:29
toc: true
categories:
- ["Ops","CentOS"]
---

## 搭建 vargrant 虚拟机

安装位置 `D:\vagrant\centos`


`Vagrantfile` 配置文件




```ruby
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "centos"
  config.vm.box_url = "../box/centos65.box"
  config.vm.network :private_network, ip: "192.168.18.23"
  # 目录挂载
  config.vm.synced_folder "G:/wamp/www", "/home/www"
  # 映射 2201 来访问 guest 机器上的 22 端口
  config.vm.network "forwarded_port", guest: 22, host: 2201
end
```

账号


`vagrant` 账号, 使用 密钥来登陆


`root` 账号, 密码是 `vagrant`


## centos 安装软件

```sh
# 先确定是否有 fastestmirror 这个插件, 对于以后安装速度有影响的
# 没有的话,需要安装
yum install yum-plugin-fastestmirror
# 由于这里已经有阿里云的镜像站. 所以速度非常快,无需配置多余的 fastmirror 插件

# 升级系统
yum upgrade

# 更新最新软件
yum update
```

