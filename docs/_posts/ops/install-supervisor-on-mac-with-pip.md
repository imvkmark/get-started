---
title: "Mac 上使用 brew 安装 Supervisor"
date: 2022-04-14 22:14:37
toc: true
categories:
- ["Ops","软件","Supervisor"]
---

在 Mac 上, 你可以使用 brew 很方便的安装 mongo, redis 等服务. 并且将这些服务加入启动项目中, 由于 supervisor 必须是以 root 用户方式去运行的, 所以加入到启动项目的时候需要加入到可以以 root 进行的目录, 否则 supervisor 运行没有相关权限会报错的.


## 安装 supervisor
推荐使用这种方式, 这种方式安装上的是最新版本
```
$ pip install supervisor
```
除了安装可执行程序本身, 还会创建默认的配置文件和目录:
```
/etc/supervisord.conf
/etc/supervisor/conf.d/
```
在 Mac 上, 可以使用 brew 安装
```
$ brew install supervisor
```
这样安装完成之后的目录在
```
# 安装目录, 包含有 plist 文件, 程序文件
/usr/local/Cellar/supervisor/4.x.x/
# 配置文件目录
/usr/local/etc/supervisord.ini
# 程序配置文件目录
/usr/local/etc/supervisor.d/
```

## 管理启动程序
编辑配置文件 `/usr/local/etc/supervisord.ini`
```
; 开启 web 访问进程
[inet_http_server]         
port=:9001
```

## 使用 brew 管理服务
```
brew services restart supervisor  # 重启
brew services stop supervisor     # 停止
brew services start supervisor    # 启动服务
```
![](https://file.wulicode.com/yuque/202208/04/22/5808Y69jCaWE.png?x-oss-process=image/resize,h_440)

