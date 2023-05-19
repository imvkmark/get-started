---
title: "fiddle 使用"
date: 2021-06-26 10:48:52
toc: true
categories:
- ["开发","抓包工具"]
---

Fiddler应用在安卓和IOS抓包，具体使用如下：<br />1.<br />
安装fiddler

![](https://file.wulicode.com/yuque/202208/09/23/4010Va12rCul.png)

2. 

点击tools-option 按如下配置勾选 启用远程访问 等并且设置端口，这里设置8888

![](https://file.wulicode.com/yuque/202208/09/23/4010yNXGwz1x.png)

修改了fiddler配置之后需要重新启动该工具<br />3.<br />修改手机网络的代理；打开手机 设置-无线局域网 点进去连接的电脑wifi右边的“圆圈i”，设置代理IP 端口号<br />
![](https://file.wulicode.com/yuque/202208/09/23/4011m1ZRU3G9.png)

查看电脑IP的办法：

1. 
cmd-ipconfig（ipv4地址即是）

2. 
打开fiddler工具，电竞右上角的online，可显示出该电脑的IP地址<br />如上配置完成，可以打开fiddler抓取手机上的操作：<br />如下是最简单的一个登陆操作


![](https://file.wulicode.com/yuque/202208/09/23/4011HyB3DDvl.png)

遇到问题可以抓包看下是否漏传参数

