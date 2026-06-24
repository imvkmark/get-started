---
description: '本内容介绍了在RHEL/CentOS/Rocky Linux上使用pip3安装和升级supervisor的方法，包括生成配置文件、添加systemd服务管理、启动supervisord，以及卸载旧版Python2的supervisor、使用非root用户管理、通过nginx反向代理实现日志访问等操作。'
lastUpdated: '2026-06-21 20:15:44'
head:
  - - meta
    - name: 'og:title'
      content: 'RHEL 安装 / 升级 supervisor'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本内容介绍了在RHEL/CentOS/Rocky Linux上使用pip3安装和升级supervisor的方法，包括生成配置文件、添加systemd服务管理、启动supervisord，以及卸载旧版Python2的supervisor、使用非root用户管理、通过nginx反向代理实现日志访问等操作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/supervisor/install-at-rhel.html'
---
# RHEL 安装 / 升级 supervisor

> 安装的时候, 因为国内外访问环境不同, 可能会出现国内访问速度慢情况, 可以考虑更换源

> 更换镜像源 , 加速 python 安装

[Supervisor: A Process Control System — Supervisor 4.2.5 documentation](http://supervisord.org/)

## 安装

### **RockyLinux**

已经内置, pip 默认调用 python 3 的 pip

```Bash
pip3 install supervisor
```

### **CentOS**

```Bash
yum install vim git yum-utils python3 python3-devel
pip3 install --upgrade pip
pip3 install supervisor
```

## 说明

这里安装完成之后, 执行文件在 `/usr/local/bin/` 目录下, 这个目录下存在三个文件

```Plaintext
echo_supervisord_conf    # 输出配置文件
supervisorctl            # supervisor 控制
supervisord              # supervisor 守护进程
```

如果使用 `sudo pip3 install --user supervisor` 进行安装,则安装的目录会在 `~/.local/bin` 目录下, 这里我们选择使用 root 用户来安装, 然后运行.

使用之前版本或者是 yum 安装的版本安装的位置一般会在 `/usr/bin` 目录下, 如果是多版本 `supervisor` 可以通过路径来进行区分

### 增加配置文件

```Bash
# 生成配置文件
echo_supervisord_conf > /etc/supervisord.conf
```

修改配置文件, 对于项目的配置文件建议使用子目录管理, 每个进程一个独立的文件

```Plaintext
- ;[include]
- ;files = relative/directory/*.ini

+ [include]
+ files = supervisor.d/*.ini
```

某些情况下我们可能使用 pipenv 来管理 python 的版本, 那我们的 supervisor 可能在另外一个目录下, 这样需要我们使用软链接的方式在目标位置放置一个快捷方式

```Bash
ln /home/liexiang/.pyenv/shims/supervisord /usr/local/bin/supervisord
ln /home/liexiang/.pyenv/shims/supervisorctl /usr/local/bin/supervisorctl
```

### 增加服务管理

使用 `systemctl` 来启动 supervisor，增加服务地址

**一键命令**

```Plaintext
wget https://i.wulicode.com/op/file/supervisord.service -O /usr/lib/systemd/system/supervisord.service
systemctl daemon-reload
systemctl restart supervisord
```

**手动编辑**

文件地址: [initscripts/centos-systemd-etcs](https://github.com/Supervisor/initscripts/blob/master/centos-systemd-etcs)

```Bash
vim /usr/lib/systemd/system/supervisord.service
```

此脚本在 RHEL 上依旧可用

```Plaintext
# supervisord service for systemd (CentOS 7.0+)
# by ET-CS (https://github.com/ET-CS)
[Unit]
Description=Supervisor daemon

[Service]
Type=forking
ExecStart=/usr/local/bin/supervisord -c /etc/supervisord.conf
ExecStop=/usr/local/bin/supervisorctl $OPTIONS shutdown
ExecReload=/usr/local/bin/supervisorctl $OPTIONS reload
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target
```

### 启动 Supervisord

```Bash
# 如果对 supervisord.service 中更改了路径, 则需要重新加载内容
systemctl daemon-reload
systemctl start supervisord
```

## 参考

### 常用的命令

```Plaintext
supervisorctl stop program
supervisorctl start program
supervisorctl restart program
supervisorctl status
supervisorctl reload
```

### CentOS 升级

升级的逻辑是安装新的版本, 然后删除旧版本

如果是通过 yum 安装或者 pip(2.x) 版本安装的, 则可以对老版本进行删除

```Plaintext
$ yum remove supervisor

# 移除 python2 版本的, 如果 pip 链接到 pip3 , 则无法使用这个进行卸载
$ pip uninstall supervisor
```

### 使用非 root 用户来管理supervisor

由于默认使用非 root 用户启动服务，所以需要单独配置允许其使用。官方这个 Issue 中提到了解决方法：

[Permession denied error when use supervisorctl · Issue #173 · Supervisor/supervisor · GitHub](https://github.com/Supervisor/supervisor/issues/173#issuecomment-186128727)

```Bash
groupadd supervisor

# duoli is a user
usermod -aG supervisor duoli

sed -i "s/;chmod=0700/chmod=0770/" /etc/supervisord.conf
sed -i "s/;chown=nobody:nogroup/chown=root:supervisor/" /etc/supervisord.conf
```

### 使用 nginx 反向代理 supervisor 日志

> Supervisor输出的日志在web端可通过端口查看，但是又不想把supervisor的服务IP暴露出去，这个时候就需要Nginx走反向代理，只把supervisor的输出日志暴露外部查看, 但是 nginx 一般的反向代理配置不支持这个功能

Nginx 默认使用的 HTTP 协议版本为 **HTTP 1.0**。其中，HTTP 1.0 与 HTTP 1.1 最核心的区别在于：HTTP 1.0 本身不支持 `keep-alive` 机制；但 Supervisor 的输出日志功能依赖 `keep-alive` 机制才能正常工作。因此，需要将 Nginx 的 HTTP 协议版本配置为 **HTTP 1.1**，同时确保 `keep-alive` 功能已启用。

```Plaintext
server{
     listen 80;
     server_name op-supervisor.domain.com;

     location / {
         proxy_pass http://127.0.0.1:9024;
         proxy_http_version 1.1;
         proxy_set_header Connection "";
     }

     access_log off;
     error_log off;
 }
```