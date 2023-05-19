---
title: "/var/run/yum.pid 已被锁定 解决办法"
date: 2021-06-26 10:29:55
toc: true
categories:
- ["Ops","CentOS","Dnf \/ Yum \/ Repo 仓库"]
---

```

# yum install glibc.i686
已加载插件：fastestmirror, langpacks
/var/run/yum.pid 已被锁定，PID 为 49901 的另一个程序正在运行。
Another app is currently holding the yum lock; waiting for it to exit...
  另一个应用程序是：PackageKit
    内存：103 M RSS （432 MB VSZ）
    已启动： Mon Jan 11 10:43:58 2016 - 02:36之前
    状态  ：睡眠中，进程ID：49901
```

解决办法：直接在终端运行 `rm -f /var/run/yum.pid` 将该文件删除，然后再次运行yum

```
# rm -f /var/run/yum.pid 
# yum install glibc.i686
已加载插件：fastestmirror, langpacks
Loading mirror speeds from cached hostfile
 * base: mirrors.163.com
 * extras: mirrors.163.com
 * updates: mirrors.163.com
```

