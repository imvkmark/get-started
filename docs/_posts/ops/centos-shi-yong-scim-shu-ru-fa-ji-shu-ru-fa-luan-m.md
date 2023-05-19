---
title: "CentOS 使用 scim 输入法及输入法乱码解决"
date: 2021-06-26 10:30:53
toc: true
categories:
- ["Ops","CentOS"]
---

由于默认安装为IBUS输入法，想使用SCIM


```sh
yum install -y scim-table scim-table-chinese
```

scim-setup 可进行相关配置。<br />
然而可以看到scim图标，但是却切换不出输入法。解决办法如下<br />
依次点击 `system->preferences->input method` ,在弹出的对话框中在 `Enable input method feature` 前打上勾，然后选择`Use scim`(没有安装scim,请安装好后再设置),再点 `close` ,重启系统，你就可看到开机自动启动了scim，并可以切换出相应的输入法。.

输入法乱码解决方法

在终端中敲入：

```
yum install fonts-chinese.noarch 
yum install fonts-ISO8859-2.noarch
```

然后注销系统就可以了

