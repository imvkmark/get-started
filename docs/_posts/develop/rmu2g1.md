---
title: "清理 SourceTree 已经保存的 git 推送密码"
date: 2021-06-10 23:13:26
toc: true
categories:
- ["开发","Git"]
---

**Mac 端**<br />找到


```
$ cd ~/Library/Application\ Support/SourceTree
```

找到符合条件的, 然后进行删除处理

```
drwxr-xr-x  3 duoli  staff    96B  7  6 23:58 ImageCache
-rw-r--r--  1 duoli  staff   9.9K  7  8 08:57 browser.plist
-rw-r--r--  1 duoli  staff    82B  7  7 11:47 username@STAuth-code.aliyun.com
-rw-r--r--@ 1 duoli  staff   1.1K  7  7 11:46 hgrc_sourcetree
-rw-r--r--  1 duoli  staff   1.2K  6 25 22:38 hostingservices_new.plist
```

**Windows 端**

```
~\AppData\Local\Atlassian\SourceTree\userhost
~\AppData\Local\Atlassian\SourceTree\passwd
```

在 `偏好设置` -> `账户` -> `高级` 中删除指定用户以及用户名即可

![](https://file.wulicode.com/yuque/202208/04/22/4553VCJQX9gl.jpeg?x-oss-process=image/resize,h_448)

![](https://file.wulicode.com/yuque/202208/04/22/4553RI0LfdfM.jpeg?x-oss-process=image/resize,h_527)

