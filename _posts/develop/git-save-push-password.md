---
title: "[转+] Git 保存请求的账号密码的方式"
date: 2022-04-14 22:27:41
toc: true
categories:
- ["开发","Git"]
---

https方式每次都要输入密码，按照如下设置即可输入一次就可以很长时间不用再手输入密码。

第一步：设置邮箱和密码




```bash
$ git config --global user.email "your email"
$ git config --global user.name  "your username"
```

根据自己的需求执行下面的任意一条命令

第二步：

```bash
# 设置记住密码（默认15分钟）：
$ git config --global credential.helper cache

# 如果想自己设置时间，可以这样做, 这样就设置一个小时之后失效
$ git config credential.helper 'cache --timeout=3600'

# 长期存储密码：
$ git config --global credential.helper store

# 增加远程地址的时候带上密码也是可以的。(推荐)
$ http://yourname:password@git.oschina.net/name/project.git
```

第三步：

运行相关命令, 输入账号密码, 如果正确则下次不必重新输入

当完成上面的操作之后，我们可以发现项目目录中会出现如下图的文件夹

                     ![](https://file.wulicode.com/yuque/202208/04/23/3534b6GaGIvK.png?x-oss-process=image/resize,h_237)                                                     

该文件夹会有如下两个文件，这两个文件夹就记录着账号密码相关的信息

                     ![](https://file.wulicode.com/yuque/202208/04/23/3535BO5ISep2.png?x-oss-process=image/resize,h_67)                                                     



## 参考

