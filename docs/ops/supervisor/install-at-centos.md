# Centos 使用 pip3 安装/升级 supervisor

> 安装的时候, 因为国内外访问环境不同, 可能会出现国内访问速度慢情况,
> 可以考虑更换源 —- [更换镜像源 , 加速 python 安装](../../python/install/use-mirror-to-speed.md)

## 安装 Python3

```
$ yum install vim git yum-utils python3 python3-devel
$ pip3 install --upgrade pip
```

## 安装 Supervisor

### 安装 Supervisor

```
$ pip3 install supervisor
```

这里安装完成之后, 执行文件在 `/usr/local/bin/` 目录下, 这个目录下存在三个文件

```
echo_supervisord_conf    # 输出配置文件
supervisorctl            # supervisor 控制
supervisord              # supervisor 守护进程
```

如果使用 `sudo pip3 install --user supervisor` 进行安装,则安装的目录会在 `~/.local/bin` 目录下, 这里我们选择使用 root 用户来安装, 然后运行.

使用之前版本或者是 yum 安装的版本安装的位置一般会在 `/usr/bin` 目录下, 如果是多版本 `supervisor` 可以通过路径来进行区分

### 增加配置文件

```
# 生成配置文件
$ echo_supervisord_conf > /etc/supervisord.conf
```

某些情况下我们可能使用 pipenv 来管理 python 的版本, 那我们的 supervisor 可能在另外一个目录下, 这样需要我们使用软链接的方式在目标位置放置一个快捷方式

```bash
# ln /home/liexiang/.pyenv/shims/supervisord /usr/local/bin/supervisord
# ln /home/liexiang/.pyenv/shims/supervisorctl /usr/local/bin/supervisorctl
```

### 增加服务管理

使用 `systemctl` 来启动 supervisor，文件内容

文件地址: [initscripts/centos-systemd-etcs](https://github.com/Supervisor/initscripts/blob/master/centos-systemd-etcs)

```
$ vim /usr/lib/systemd/system/supervisord.service
```

```
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

```
# 如果对 supervisord.service 中更改了路径, 则需要重新加载内容
$ systemctl daemon-reload
$ systemctl start supervisord
```

## 参考

### 常用的命令

```
supervisorctl stop program
supervisorctl start program
supervisorctl restart program
supervisorctl status
supervisorctl reload
```

### 升级

升级的逻辑是安装新的版本, 然后删除旧版本

如果是通过 yum 安装或者 pip(2.x) 版本安装的, 则可以对老版本进行删除

```
$ yum remove supervisor

# 移除 python2 版本的, 如果 pip 链接到 pip3 , 则无法使用这个进行卸载
$ pip uninstall supervisor
```

### 使用非 root 用户来管理supervisor

由于默认使用非 root 用户启动服务，所以需要单独配置允许其使用。官方这个 Issue 中提到了解决方法：

[Permession denied error when use supervisorctl · Issue #173 · Supervisor/supervisor · GitHub](https://github.com/Supervisor/supervisor/issues/173#issuecomment-186128727)

```
$ groupadd supervisor
$ usermod -aG supervisor doraemon

$ sed -i "s/;chmod=0700/chmod=0770/" /etc/supervisord.conf
$ sed -i "s/;chown=nobody:nogroup/chown=root:supervisor/" /etc/supervisord.conf
```

### 使用 nginx 访问 supervisorUI 并支持 tail 访问

> Supervisor输出的日志在web端可通过端口查看，但是又不想把supervisor的服务IP暴露出去，这个时候就需要Nginx走反向代理，只把supervisor的输出日志暴露外部查看, 但是
> nginx 一般的反向代理配置不支持这个功能
>

首先，确保您的 Supervisor 配置文件(默认位于 `/etc/supervisord.conf`中)包含以下内容, 用来开启内部的服务, 这里用户名和密码是可选的

```
[inet_http_server]
port=127.0.0.1:9001
username=your_username
password=your_password
```

Nginx 默认的 http 协议为 http 1.0，其中http 1.0与1.1最大的区别在于1.0 是不支持keep-alive的，但是supervisor的输出日志是需要keep-alive，所以需要启用 http
1.1，同时要支持keep-alive

```
server{
     listen 80;
     server_name op-supervisor.domain.com;

     location / {
         proxy_pass http://127.0.0.1:9001;
         proxy_http_version 1.1;
         proxy_set_header Connection "";
     }

     access_log off;
     error_log off;
 }
```