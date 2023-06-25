# CentOS 使用 docker 安装 sentry

服务器配置不能低于 4U 8G

Sentry 是一个开源的实时错误追踪系统，可以帮助开发者实时监控并修复异常问题。它主要专注于持续集成、提高效率并且提升用户体验。Sentry 分为服务端和客户端
SDK，前者可以直接使用提供的在线服务，也可以本地自行搭建；后者提供了对多种主流语言和框架的支持，包括 React、Angular、Node、Django、RoR、PHP、Laravel、Android、.NET、JAVA
等。同时它可提供了和其他流行服务集成的方案，例如 GitHub、GitLab、bitbuck、heroku、slack、Trello 等。

Sentry 本身是基于 Django 开发的，而且也依赖到其他的如 Postgresql、 Redis 等组件，所以一般有两种途径进行安装：通过 Docker 或用 Python 搭建。官网下分别有以下的两个介绍：

如果你选择了通过 Docker 进行安装，其实还有更加便捷的方式 —— docker-compose 。在 github 上有一个开源项目用于部署 Sentry ，我们可以直接使用该项目进行部署，首先是克隆该项目：

地址 : https://github.com/getsentry/onpremise/

## 安装环境

**安装 docker**

```bash
# 安装/更新 Docker
$ yum remove docker docker-common docker-selinux docker-engine
# 安装依赖
$ yum install -y yum-utils device-mapper-persistent-data lvm2
# 添加 docker yum 源
$ yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 官方源比较慢的话可以更换为 Aliyun 的源
$ yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 允许拓展最新的不稳定的repository
$ yum-config-manager --enable docker-ce-edge
# 安装docker
# yum -y install docker-ce
# 开机启动 & 启动 Docker
$ systemctl enable docker
$ systemctl start docker
```

**安装 docker-composer**

这里推荐使用 Python 的 pip3 管理工具来安装 docker-compose,

这里不推荐使用 pip, 因为这是 2.0 的包管理

```bash
# 使用普通用户安装
$ pip3 install --user -U docker-compose
# 查看docker compose版本
$ docker-compose version
docker-compose version 1.29.2, build unknown
docker-py version: 5.0.0
CPython version: 3.6.8
OpenSSL version: OpenSSL 1.0.2k-fips  26 Jan 2017
# 查看 pip version
$ pip3 -V
pip 21.2.4 from /usr/local/lib/python3.6/site-packages/pip (python 3.6)
```

**如果没有 pip, 则按照以下步骤安装 pip**

```bash
#上一条语句没有显示版本信息则运行下面语句安装 python-pip3
$ yum -y install epel-release
$ yum -y install python-pip
#查看pip版本
$ pip -v
#pip进行升级
$ pip install --upgrade pip
#进行安装compose 第一条语句报错执行第二条，执行成功则跳过第二条
$ pip install docker-compose
$ pip install docker-compose --ignore-installed requests
$ docker-compose -version
```

## 安装 senty 到 docker

**克隆 sentry 并安装**

```
$ git clone https://github.com/getsentry/onpremise.git
$ ./install.sh
Checking minimum requirements...
Removing network onpremise_default
...
Created internal Sentry project (slug=internal, id=1)
Would you like to create a user account now? [Y/n]: y
Email: username@domain.com
Password:
Repeat for confirmation:
User created: username@domain.com
Added to organization: sentry
Cleaning up...
You're all done! Run the following command to get Sentry running:
  docker-compose up -d
# docker images 检查安装结果
$ docker images
REPOSITORY                             TAG                 IMAGE ID            CREATED             SIZE
symbolicator-cleanup-onpremise-local   latest              aa9f529b9bba        6 minutes ago       168MB
sentry-cleanup-onpremise-local         latest              c8ce20926772        15 minutes ago      832MB
snuba-cleanup-onpremise-local          latest              899555aa0198        15 minutes ago      417MB
sentry-onpremise-local                 latest              7b49912508f3        15 minutes ago      830MB
getsentry/snuba                        latest              c278520d8aa3        2 hours ago         415MB
getsentry/sentry                       latest              5351ca5b79c7        3 hours ago         830MB
getsentry/symbolicator                 latest              857ed4c4c3bb        15 hours ago        167MB
getsentry/relay                        latest              cf4553a1852c        15 hours ago        186MB
busybox                                latest              c7c37e472d31        3 days ago          1.22MB
postgres                               9.6                 51e37c2850c7        3 weeks ago         200MB
tianon/exim4                           latest              f077f7830685        3 weeks ago         176MB
redis                                  5.0-alpine          58084f18c7ec        4 weeks ago         29.7MB
alpine                                 latest              a24bb4013296        4 weeks ago         5.57MB
nginx                                  1.16                dfcfd8e9a5d3        2 months ago        127MB
confluentinc/cp-kafka                  5.5.0               89e8e98718a8        2 months ago        598MB
confluentinc/cp-zookeeper              5.5.0               124ff6469e3d        2 months ago        598MB
yandex/clickhouse-server               19.17               f0fa9b979b63        4 months ago        435MB
memcached                              1.5-alpine          0dbf6b4c454b        4 months ago        9.19MB
```

**创建项目的 superuser**

```bash
$ docker-compose run --rm web upgrade
Starting sentry_onpremise_redis_1        ... done
Starting sentry_onpremise_smtp_1         ... done
...
Creating missing DSNs
Correcting Group.num_comments counter
09:49:46 [INFO] sentry.plugins.github: apps-not-configured
Email: 1222@qq.com
Password:
Repeat for confirmation:
```

**创建账号和密码**

```bash
# 创建自己的用户, 根据提示输入邮箱和密码
$ docker-compose run --rm web createuser
Starting onpremise_smtp_1 ... done
Starting onpremise_postgres_1 ... done
Starting onpremise_redis_1 ... done
Starting onpremise_memcached_1 ... done
09:49:39 [WARNING] sentry.utils.geo: settings.GEOIP_PATH_MMDB not configured.
09:49:46 [INFO] sentry.plugins.github: apps-not-configured
Email: 1222@qq.com
Password:
Repeat for confirmation:
Should this user be a superuser? [y/N]: y
```

**生成 key 并设置**

```bash
$ docker-compose run --rm web config generate-secret-key
# 编辑 .env 文件
# 添加到 .env 的 SENTRY_SECRET_KEY 里面
```

**启动 Docker Compose**

```bash
$ docker-compose up -d
sentry_onpremise_smtp_1 is up-to-date
...
Recreating sentry_onpremise_nginx_1 ... done
```

**使用 docker ps 检查**

```
$ docker ps
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                          NAMES
7c86739e1904        nginx:1.16             "nginx -g 'daemon of…"   26 minutes ago      Up 26 minutes       0.0.0.0:9080->80/tcp           sentry_onpremise_nginx_1
...
a85aff3465f8        redis:5.0-alpine       "docker-entrypoint.s…"   47 minutes ago      Up 39 minutes       6379/tcp                       sentry_onpremise_redis_1
```

**这样在内网便可以访问**

```
# 由于没有开放 9080 端口到外网, 所以使用 wget 方式访问, 如果已经开放, 则直接访问 ip:9080 即可访问
$ wget 127.0.0.1:9080
--2020-07-03 10:30:24--  http://127.0.0.1:9080/
正在连接 127.0.0.1:9080... 已连接。
已发出 HTTP 请求，正在等待回应... 302 Found
位置：/auth/login/ [跟随至新的 URL]
--2020-07-03 10:30:25--  http://127.0.0.1:9080/auth/login/
再次使用存在的到 127.0.0.1:9080 的连接。
已发出 HTTP 请求，正在等待回应... 302 Found
位置：/auth/login/sentry/ [跟随至新的 URL]
--2020-07-03 10:30:26--  http://127.0.0.1:9080/auth/login/sentry/
再次使用存在的到 127.0.0.1:9080 的连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：9690 (9.5K) [text/html]
正在保存至: “index.html”
```

## 配置 nginx 反向代理

```nginx
server {
    listen       80;
    server_name sentry.domain.com;
    return 301 https://sentry.domain.com$request_uri;
}
server{
    listen 443 ssl;
    server_name sentry.domain.com;
    # 由于以后会上传 source-map, 需要将sourcemap 上传大小进行放开
    client_max_body_size 20m;
    location / {
        proxy_pass http://127.0.0.1:9080;
    }
    ## ssl
    ssl_certificate https/sentry.domain.com.pem;
    ssl_certificate_key https/sentry.domain.com.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    access_log off;
    error_log off;
}
```

这里即可通过域名来进行访问

![](https://file.wulicode.com/note/2021/10-23/11-27-33337.png#id=gApK6&originHeight=629&originWidth=1020&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 出现问题

### 1. Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock

解决方法 : 将用户加入 docker 组, 可以让其进行访问

```bash
# 把用户加入 docker 组
$ usermod -aG docker $USER
# logout : 注销
$ systemctl restart docker
```

### 2. docker-compose 启动报错

> ERROR: for sentry_onpremise_nginx_1 Cannot start service nginx: driver failed programming external connectivity on endpoint sentry_onpremise_nginx_1 (
> 9ee80c3b3949749bdb529f949574f6169a4f993c9a0d50aa621228bd57d579fb): Error starting userland proxy: listen tcp 0.0.0.0:9000: bind: address already in use
> ERROR: Encountered errors while bringing up the project.

解决方法:

这里一般是端口冲突

参考 [.env](https://github.com/getsentry/onpremise/blob/master/.env) 文件配置端口映射

```diff
...
- SENTRY_BIND=9000
+ SENTRY_BIND=9080
...
```

### 3. 配置 Sentry 可以发送邮件

编辑 `./sentry/config.yml` 文件

```yaml
mail.backend : "smtp" # Use dummy if you want to disable email entirely
mail.host : "smtpdm.aliyun.com"
mail.port : 25
mail.username : "automail@demo.domain.com"
mail.password : "********"
mail.use-tls : false
# The email address to send on behalf of
mail.from : "automail@demo.domain.com"
# 备注: host 就是stmp服务地址
# port 端口和 tls对应 port  25 对应 tls false  port 587 对应 tls true
```

然后运行

```bash
$ docker-compose build
$ docker-compose stop
$ docker-compose start -d
```

这样看下 管理员中的 邮箱配置

![](https://file.wulicode.com/note/2021/10-23/11-27-45956.png#id=BmCJt&originHeight=633&originWidth=971&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

测试下收到邮件就配置成功了

![](https://file.wulicode.com/note/2021/10-23/11-27-55804.png#id=ntwsa&originHeight=221&originWidth=799&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
> ps : 这里用的是网易的客户端

### 4. 这里配置 register mirror, 加速国内访问

打开 https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors , 这里将镜像设置为使用 aliyun
的加速镜像

针对 Docker 客户端版本大于 1.10.0 的用户

您可以通过修改 daemon 配置文件/etc/docker/daemon.json 来使用加速器

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://******.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 5. Sentry 对接上之后无法收集日志

需要验证

```bash
# 验证服务器是否接收到请求
$ tail -20f /var/logs/nginx/access.log
# 验证 docker 镜像是否收到日志
$ docker-compose logs -f -t --tail=100
```

下面是一次执行服务的日志

```
# 接收
nginx_1                    | 172.18.0.1 - - [18/Jul/2020:03:10:02 +0000] "POST /api/4/store/ HTTP/1.0" 200 41 "-" "sentry.php.laravel/1.8.0"
# kafka 进行消费
ingest-consumer_1          | 03:10:03 [INFO] batching-kafka-consumer: Flushing 2 items (from {(u'ingest-events', 0): [138L, 139L]}): forced:False size:False time:True
# snuba 进行处理
snuba-cleanup_1            | 2020-07-18 03:10:03,574 Dropped 0 partitions on None
snuba-consumer_1           | 2020-07-18 03:10:04,600 Flushing 2 items (from {Partition(topic=Topic(name='events'), index=0): Offsets(lo=154, hi=156)}): forced:False size:False time:True
snuba-outcomes-consumer_1  | 2020-07-18 03:10:04,603 Flushing 2 items (from {Partition(topic=Topic(name='outcomes'), index=0): Offsets(lo=140, hi=142)}): forced:False size:False time:True
snuba-outcomes-consumer_1  | 2020-07-18 03:10:04,623 Worker flush took 18ms
snuba-consumer_1           | 2020-07-18 03:10:04,730 Worker flush took 129ms
```

如果出现异常则可以进行重启

```bash
$ docker-compose restart
```

