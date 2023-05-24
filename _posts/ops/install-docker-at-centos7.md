---
title: "在 Docker 中安装 CentOS 7"
date: 2021-06-26 11:16:59
toc: true
categories:
- ["Ops","软件","Docker"]
---

获取镜像, 这里获取的是 7 版本, 如果想获取更高, 在 [https://hub.docker.com/_/centos](https://hub.docker.com/_/centos) 查询




```
$ docker pull centos:7
```

启动


## 安装数据库并可以进行后台启动

安装数据库就根据 centos 安装 mysql 来即可

```
# 创建容器：
$ docker run -d -name centos-xtra --privileged=true centos:7 /usr/sbin/init

# 进入容器：
$ docker exec -it centos-xtra /bin/bash
```

这样便可以运行 systemctl 了


## 设置 aliyun 密码并进行登录

设定 aliyun 固定密码

![](https://file.wulicode.com/yuque/202209/22/21/1010iHkSvqFq.jpeg?x-oss-process=image/resize,h_391)

```
#  进行登录
$ docker login --username=username registry.cn-shanghai.aliyuncs.com
```

