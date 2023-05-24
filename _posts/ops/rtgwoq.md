---
title: "[转] Ubuntu下ssh服务的安装与登陆（ssh远程登陆）"
date: 2021-06-09 14:20:21
toc: true
categories:
- ["Ops","Ubuntu"]
---

Ubuntu默认并没有安装ssh服务，如果通过ssh远程连接到Ubuntu，需要自己手动安装ssh-server。

判断是否安装ssh服务，可以通过如下命令进行：




```
ps -e|grep ssh
```

输出如下：

```
$ ps -e|grep ssh
  864 ?        00:00:00 sshd
19970 ?        00:00:00 sshd
20079 ?        00:00:00 ssh-agent
```

`ssh-agent`表示 `ssh-client`启动，`sshd`表示`ssh-server`启动了。如果缺少`sshd`，说明`ssh`服务没有启动或者没有安装。

```
# 安装ssh-client命令
sudo apt-get install openssh-client
# 安装ssh-server命令：
sudo apt-get install openssh-server
# 安装完成以后，先启动服务
sudo /etc/init.d/ssh start
```

启动后，可以通过`ps -e|grep ssh`查看是否正确启动。

`ssh`服务默认的端口是`22`，可以更改端口，使用如下命令打开ssh配置文件：

```
sudo vim /etc/ssh/sshd_config
```

配置文件内容如下：

```bash
# Package generated configuration file     
# See the sshd(8) manpage for details     
# What ports, IPs and protocols we listen for    
Port 22  
# Package generated configuration file  
# See the sshd(8) manpage for details  
# What ports, IPs and protocols we listen for
```

修改端口号（Port）后，重启ssh服务即可生效，命令如下：

`sudo /etc/init.d/ssh restart`

`ssh`服务启动后，即可登陆，登陆命令格式为：`ssh 帐号@IP地址`

例如：`ssh test@192.168.135.249`

根据提示输入`test`的密码，即可远程登陆。

退出远程登陆命令：`exit`

演示如下图所示：

![image.png](https://file.wulicode.com/yuque/202208/04/14/4930s451aL9o.png?x-oss-process=image/resize,h_185)

## 参考文章

- [Ubuntu下ssh服务的安装与登陆（ssh远程登陆）](http://blog.csdn.net/zht666/article/details/9340633)

