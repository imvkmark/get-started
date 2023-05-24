---
title: "Ubuntu Faq"
date: 2022-10-25 09:11:35
toc: true
categories:
- ["Ops","Ubuntu"]
---

## do-release-upgrade 之后出现的无官方镜像源的提示
我们为了加速云机的软件更新速度, 常常将三方源更新为清华或者阿里云, 并同时禁用掉官方的源, 于是在升级的时候便会有这样的提示



```
Checking package manager
Reading package lists... Done
Building dependency tree
Reading state information... Done

Invalid package information

After updating your package information, the essential package
'ubuntu-minimal' could not be located. This may be because you have
no official mirrors listed in your software sources, or because of
excessive load on the mirror you are using. See /etc/apt/sources.list
for the current list of configured software sources.
In the case of an overloaded mirror, you may want to try the upgrade
again later.
```
解决: 

在 `/etc/apt/sources.list`中添加一行
```
deb http://archive.ubuntu.com/ubuntu bionic universe main
```
这里的 bionic 根据系统的版本进行不同的命名替换, 然后再运行即可
```
# do-release-upgrade
```

