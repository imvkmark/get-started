# 「译」 如何在 Rocky Linux 9 上安装 Nginx

::: info 原文
[How To Install Nginx on Rocky Linux 9](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-rocky-linux-9)
:::

![image.png](https://file.wulicode.com/yuque/202211/08/15/0512zk3KN4tT.png?x-oss-process=image/resize,h_357)

[Nginx](https://www.nginx.com/)是世界上最受欢迎的网络服务器之一，负责托管互联网上一些最大和流量最高的网站。这是一个轻量级的选择，可以用作 Web 服务器或反向代理。

在本文中，将了解如何在 Rocky Linux 9 服务器上安装 Nginx、调整防火墙、管理 Nginx 进程以及设置服务器代码以从一台服务器托管多个域名和服务的访问。

## 准备

在开始本文章之前，您应该在您的服务器上配置一个具有 sudo 权限的常规非 root
用户。[您可以按照我们的 Rocky Linux 9 初始服务器设置指南](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-rocky-linux-9)
来了解如何配置普通用户账户。

您还可以选择在完成本教程的最后一步之前注册一个域名。要了解有关使用 DigitalOcean
设置域名的更多信息，请参阅我们的 [DigitalOcean DNS 简介](https://www.digitalocean.com/community/tutorials/an-introduction-to-digitalocean-dns)。

当有可用帐户时，请以非 root 用户身份登录开始, 当然也可以使用 root 用户(一般运维不建议这么操作)

## 第 1 步 – 安装 Nginx

由于 Nginx 在 Rocky 的默认存储库中可用，因此可以在包管理器通过单个命令安装

```
$ sudo dnf install nginx
```

出现提示时，输入`Y`以确认安装`nginx`，这样`dnf`将在服务器上安装 Nginx 和依赖项

安装完成后，运行以下命令启用并启动 Web 服务器：

```
# 自启动
$ sudo systemctl enable nginx
# 启动
$ sudo systemctl start nginx
```

这会使 Nginx 在服务器启动时自动重新启动。现在 Web 服务器应该已启动并运行，但在对其进行测试之前，可能需要配置防火墙。

## 第 2 步 – 调整防火墙

更多内容可参考 : [Centos 7 - firewalld 常用命令](../../ops/centos/firewalld.md)

如果您在[Rocky Linux 9 的初始服务器设置指南中](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-rocky-linux-9)`firewalld`
启用了防火墙，则需要调整防火墙设置以允许`80`端口通过

运行以下命令以永久启用端口上的 HTTP 的 `80` 端口：

```
$ sudo firewall-cmd --permanent --add-service=http
```

要验证`http`防火墙服务是否正确添加，可以运行：

```
$ sudo firewall-cmd --permanent --list-all

public
  target: default
  icmp-block-inversion: no
  interfaces: 
  sources: 
  services: cockpit dhcpv6-client http ssh
  ports: 
  protocols: 
  masquerade: no
  forward-ports: 
  source-ports: 
  icmp-blocks: 
  rich rules: 
```

要保存更改，需要重新加载：

```
$ sudo firewall-cmd --reload
```

现在 Web 服务器可供外部访问

## 第 3 步 – 检查 Web 服务器

此时，Web 服务器应该已启动并正在运行。

可以使用`systemctl status`命令来验证服务运行状态

```
$ systemctl status nginx

nginx.service - The nginx HTTP and reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
     Active: active (running) since Wed 2022-09-14 21:03:46 UTC; 7min ago
    Process: 18384 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
    Process: 18385 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
    Process: 18386 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
   Main PID: 18387 (nginx)
      Tasks: 3 (limit: 10938)
     Memory: 2.8M
        CPU: 43ms
     CGroup: /system.slice/nginx.service
             ├─18387 "nginx: master process /usr/sbin/nginx"
             ├─18388 "nginx: worker process"
             └─18389 "nginx: worker process"
```

如果看到以上输出则服务已成功启动(状态为绿色)。然而，最好的测试方法是打开nginx 服务的一个页面

您可以访问默认的 Nginx 登录页面，通过打开服务器的 IP 地址确认该软件是否正常运行。如果不知道服务器的 IP 地址, 可以使用 `curl cip.cc`找到它，该工具会为提供外网地址以及相关运营商信息

```
curl cip.cc
IP      : 47.99.1.1
地址    : 中国  浙江  杭州
运营商  : 阿里云/电信/联通/移动/铁通/教育网

数据二  : 浙江省杭州市 | 阿里云

数据三  : 中国浙江省杭州市 | 阿里云

URL     : http://www.cip.cc/47.99.1.1
```

获得服务器的 IP 地址后，将其输入浏览器的地址栏中：

会看到默认的 Nginx 页面：

![](https://file.wulicode.com/yuque/202211/08/15/0013MfxB8Uy6.png?x-oss-process=image/resize,h_525)

如果看到此页面上，则表明服务器运行正常

## 第 4 步 - 管理 Nginx 进程

现在您的 Web 服务器已启动并正在运行，让我们回顾一些服务管理命令。

```
# 停止
$ sudo systemctl stop nginx

# 启动
$ sudo systemctl start nginx

# 重启
$ sudo systemctl restart nginx

# 重载(进行配置更改, 不会断开链接)
$ sudo systemctl reload nginx
# 或者
$ nginx -s reload

# 禁用
$ sudo systemctl disable nginx

# 启用
$ sudo systemctl disable nginx
```

## 第 5 步 - 熟悉重要的 Nginx 文件和目录

现在您已经知道如何管理 Nginx 服务，应该花几分钟时间熟悉一些重要的目录和文件。

### 内容

- `/usr/share/nginx/html`

默认的 Web 内容存储目录，可以通过更改 Nginx 配置文件来修改

### 配置

- `/etc/nginx`
- Nginx 配置目录。所有 Nginx 配置文件都可以在这个目录找到
- `/etc/nginx/nginx.conf`

主要的 Nginx 配置文件。可以对其进行修改以更改 Nginx 全局配置

- `/etc/nginx/conf.d/`：

此目录包含服务器配置文件，可以在其中定义网站信息。常用的方法是将每个网站按照不同的业务进行独立文件存放, 或者文件以网站的域名命名，例如`your_domain.conf`.

### 服务器日志

> 更多信息可以查看 [Nginx 日志](./log.md) 部分

- `/var/log/nginx/access.log`

对 Web 服务器的每个请求都记录在此日志文件中，除非 Nginx 配置不存储

- `/var/log/nginx/error.log`

任何 Nginx 错误都会记录在这个日志中

## 结论

现在您已经安装了 Web 服务器，对于要提供的内容类型和用于创建更丰富体验的技术，您有很多选择。

_要使用 Let's Encrypt _使用免费 SSL 证书为您的域名设置 HTTPS
，您应该继续 [阅读如何在 Rocky Linux 9 上使用 Let's Encrypt 保护 Nginx](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-rocky-linux-9)

## 问题

### (未解决) : SSL_do_handshake() failed | SSL_read() failed

> 出现日志 :
> 2022/11/09 10:49:33 [crit] 112572#112572: *1818791 SSL_do_handshake() failed (SSL: error:0A000126:SSL routines::unexpected eof while reading) while SSL
> handshaking, client: 223.104.239.202, server: 0.0.0.0:443
> 2022/11/09 10:49:37 [crit] 112572#112572: *1818796 SSL_read() failed (SSL: error:0A000126:SSL routines::unexpected eof while reading) while waiting for
> request, client: 223.104.239.202, server: 0.0.0.0:443

当前问题已经存在记录的 Issue: [https://github.com/openssl/openssl/issues/18866](https://github.com/openssl/openssl/issues/18866)

![image.png](https://file.wulicode.com/yuque/202211/09/11/0013zj2HjKuJ.png?x-oss-process=image/resize,h_621)

参考文章 : [ssl_protocols协议导致网站和小程序无法正常提供服务|封尘网](https://www.58jb.com/html/nginx_ssl_error.html)


