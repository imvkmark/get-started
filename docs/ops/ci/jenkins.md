# 在 CentOS 上安装 Jenkins

> Jenkins是一款由Java编写的开源的持续集成工具。
>

在此之前需要安装 Java, 详情查看[安装 JDK 和相关软件](../../java/tech/install.md)

## 安装 java

由于使用 java 写成, 所以运行 jenkins 需要有java 环境, 所以我们需要在机器上安装 java(Java 版本是 1.8.0 , 也就是平常说的 java8), 通过

## 安装 Jenkins

下载地址 : https://www.jenkins.io/download/

安装时候可以选择 [稳定版](https://pkg.jenkins.io/redhat-stable/) 和 [通用发行版](https://pkg.jenkins.io/redhat/)
我们安装稳定版本

官方说明 : [Redhat Jenkins Packages](https://pkg.origin.jenkins.io/redhat-stable/)

```shell
# 获取 repo
$ wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo

# 获取key, 如果你之前导入 jenkins 的key, 这一步可以忽略
$ rpm --import https://pkg.jenkins.io/redhat/jenkins.io-2023.key

$ yum update && yum install jenkins
```

这里我们先保障以下目录是有权限的, 默认的用户是 jenkins, 如果运行时候没有日志生成, 首先检查下日志是否有权限生成

### 更换 jenkins 的运行目录端口和用户

> 如果需要可以更改配置文件的几个参数
>

```
# Jenkins安装目录
/var/lib/jenkins/

# Jenkins配置文件地址, 这就是Jenkins的配置文件，可以在这里查看Jenkins默认的配置
/etc/sysconfig/jenkins

# Jenkins 日志文件位置
/var/log/jenkins/

# Jenkins 缓存位置
/var/cache/jenkins
```

这里有三个比较重要的配置

```
# 安装目录
## Description: Jenkins Continuous Integration Server
## Type:    string
## Default:   "/var/lib/jenkins"
## ServiceRestart: jenkins
#
# Directory where Jenkins store its configuration and working
# files (checkouts, build reports, artifacts, ...).
#
JENKINS_HOME="/var/lib/jenkins"

# 运行用户
## Default:   "jenkins"
## ServiceRestart: jenkins
#
# Unix user account that runs the Jenkins daemon
# Be careful when you change this, as you need to update
# permissions of $JENKINS_HOME and /var/log/jenkins.
#
JENKINS_USER="jenkins"

# 端口号
## Default:   8080
## ServiceRestart: jenkins
#
# Port Jenkins is listening on.
# Set to -1 to disable
#
JENKINS_PORT="8080"
```

启动 jenkins

```bash
$ systemctl start jenkins
```

到这一步我们已经安装并启动了jenkins, 下面看下 jenkins 的启动参数 `ps -ef |grep jenkins`

```
/etc/alternatives/java
    -Dcom.sun.akuma.Daemon=daemonized
    -Djava.awt.headless=true
    -DJENKINS_HOME=/var/lib/jenkins
    -jar /usr/lib/jenkins/jenkins.war
    --logfile=/var/log/jenkins/jenkins.log
    --webroot=/var/cache/jenkins/war
    --daemon
    --httpPort=8080
    --debug=5
    --handlerCountMax=100
    --handlerCountMaxIdle=20
```

这里监听的默认端口是 8080 , 如果没有开启服务端端口防火墙的, 去进行开启, 如果开启, 可以通过 ip:8080 开进行访问.这里我们通过地址来进行访问.

## 配置 Nginx 反向代理

如果是线上服务器, 我们可能不方便直接开启 8080 端口这里就需要nginx 反向代理

```
server{
    listen 80;
    server_name domain-of-jenkins.io;
    location / {
        proxy_pass http://127.0.0.1:8080;
    }

    access_log off;
    error_log off;
}
```

这里我们便可以使用域名通过 80 端口访问 nginx

## 初始化 Jenkins

### 更改下载插件的源

因为默认的插件地址是 jenkins 官方, 检测的地址是 google.com, 有很大程度上在第一步就卡死了.

![](https://file.wulicode.com/doc/20230621/1687334405642.png)

死在这个页面, 这里我们替换下插件的地址和检测地址, 这里替换为 [清华镜像](https://mirrors.tuna.tsinghua.edu.cn/jenkins/),
也有可选的[腾讯镜像(默认)](https://mirrors.cloud.tencent.com/jenkins/)

`default.json` 的位置是 `/var/lib/jenkins/updates/default.json`

```
$ sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins\//g' default.json
$ sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
```

这里替换成功后需要 **重启 jenkins** , 否则不生效

如果还出现这样的情况则需要修改下配置文件，因为你所在网络被限制。需要你进入jenkins的工作目录 `/var/lib/jenkins/`，打开 `hudson.model.UpdateCenter.xml`把

```
http://updates.jenkins-ci.org/update-center.json
```

改成

```
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
```

### 配置密码并进入 jenkins

这里我们打开地址 {ip:8080} 这个地址, 会出现这个页面, 如果没有访问或者出错, 请检查下 jenkins 服务是否开启,或者端口是否已经打开.

![](https://file.wulicode.com/doc/20230621/1687334435345.png)

我们在服务器上使用

```
$ cat /var/lib/jenkins/secrets/initialAdminPassword
9d5174aacaec4795ae53356d1f18bcf1
```

来查看下密码, 然后把密码填写到 `管理员密码` 栏, 然后点击继续

随后服务端进入 配置界面, 耐心等候

### 安装插件

接下来提示安装插件

![](https://file.wulicode.com/doc/20230621/1687334455892.png)

这一步我们安装推荐的插件.

![](https://file.wulicode.com/yuque/202208/04/14/504202osZUs7.jpeg)

这一步我们等待服务端自行安装, 然后进入创建管理员界面

### 创建管理员

![](https://file.wulicode.com/yuque/202208/04/14/50427y0KFksx.jpeg)

如果不想创建, 则使用 admin 账号继续, 否则自己创建一个, 然后点击 保存并完成

> 建议创建一个, 默认的管理员容易被猜到, 不安全
>

### 配置实例地址

如果没有什么需要确认的. 这个默认的地址就是你以后的访问地址了. 保存就可以, 如果有配置需要域名啥的. 根据自己需要来进行配置

![](https://file.wulicode.com/yuque/202208/04/14/50430IAzlEwH.jpeg)

然后就真的完成了. 这个真是最后一步了

![](https://file.wulicode.com/yuque/202208/04/14/50438pQlEqn5.jpeg)

![](https://file.wulicode.com/yuque/202208/04/14/50430QsGtRru.jpeg)

## 安装问题

### 1. [Errno 12] Timeout on https://pkg.jenkins.io/redhat-stable/repodata/repomd.xml

> 错误信息 [Errno 12] Timeout on https://pkg.jenkins.io/redhat-stable/repodata/repomd.xml


这个原因是国内的某些服务器对国外的部分 jenkins.io 的节点访问异常导致解决方案 : 打开测速工具寻找国内可以访问的 jenkins
ip : https://tool.chinaz.com/speedtest/pkg.jenkins.io

修改 host, 对可以访问的ip 进行host 映射

```
# vim /etc/hosts
151.101.110.133 pkg.jenkins.io
```