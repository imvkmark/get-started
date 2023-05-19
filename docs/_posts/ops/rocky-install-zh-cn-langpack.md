---
title: "RockyLinux 设置中文语言支持"
date: 2022-09-19 11:21:51
toc: true
categories:
- ["Ops","RockyLinux"]
---

在默认的 rocky linux 是没有中文语言包的, 这样在某些情况下查看中文会产生乱码, 如下是查看 git 日志时候出现的乱码<br />![83b16820-193b-45ac-9f34-68c3b57d6787.png](https://file.wulicode.com/yuque/202209/19/12/1011Uuue5pOf.png?x-oss-process=image/resize,h_317)<br />可能不同的发行方对系统做了一些更新导致会存在中文语言包
> 参考命令 :  [localectl(https://wulicode.com/man/localectl.1.html)

为了解决类似的这种问题, 我们需要安装我们需要的语言包


## 查看当前支持的语言包
查看是否存在中文语言, 可以看到没有中文语言
```
[root@duoli]# localectl list-locales |grep zh
C.utf8
en_AG
en_AU
en_AU.utf8
en_BW
en_BW.utf8
en_CA
en_CA.utf8
en_DK
en_DK.utf8
.....
.....
.....
en_ZA
en_ZA.utf8
en_ZM
en_ZW
en_ZW.utf8
```
查看可用的语言包
```
[root@duoli ~]# dnf list |grep glibc-langpack
Failed to set locale, defaulting to C.UTF-8
glibc-langpack-en.x86_64                                          2.28-189.5.el8_6                                          @baseos
glibc-langpack-aa.x86_64                                          2.28-189.5.el8_6                                          baseos
glibc-langpack-af.x86_64                                          2.28-189.5.el8_6                                          baseos
glibc-langpack-anp.x86_64                                         2.28-189.5.el8_6                                          baseos
...
glibc-langpack-zh.x86_64                                          2.28-189.5.el8_6                                          baseos

```

## 安装并设置中文语言
安装中文语言包
```
[root@duoli ~]# dnf install glibc-langpack-zh
...

Installed:
  glibc-langpack-zh-2.28-189.5.el8_6.x86_64

Complete!
```
查看可用的中文语言包
```
[root@duoli ~]# localectl list-locales |grep zh
zh_CN
zh_CN.gb18030
zh_CN.gbk
zh_CN.utf8
zh_HK
zh_HK.utf8
zh_SG
zh_SG.gbk
zh_SG.utf8
zh_TW
zh_TW.euctw
zh_TW.utf8
```
设置当前的语言包
```
[root@ ~]# localectl set-locale LANG="zh_CN.utf8"
```

## 验证
这样, 我们就可以看到语言是正确的了, bingo
```
[root@duoli web]# git log
commit ae59cb3ff6533612f435c679b3c34bf7b602212a (HEAD -> master, origin/master, origin/HEAD)
Author: 多厘 <zhaody901@126.com>
Date:   Mon Sep 19 00:16:35 2022 +0800

    题目的编辑和错题的数据展示错误

commit 21a9287b72da0e32d6199823b6f6e939fff89583
Author: 多厘 <zhaody901@126.com>
Date:   Sun Sep 18 10:44:39 2022 +0800

    错误数据的定义
```

## 参考文章

- [Rocky Linux 8安装中文支持 - Best Yii | PHP Yii 开发框架最佳实践](https://www.bestyii.com/topic/250)
- [树莓派玩RockyLinux之设置语言](https://www.bilibili.com/read/cv14668480/)

