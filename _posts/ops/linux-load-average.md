---
title: " 「转+」 Linux系统平均负载3个数字的含义"
date: 2022-04-14 22:26:39
toc: true
categories:
- ["Ops","Linux"]
---

原文地址: [Linux系统平均负载3个数字的含义](https://www.slyar.com/blog/linux-load-average-three-numbers.html)

越来越多人开始接触Linux操作系统，从VPS到无线路由的刷机系统(如OpenWRT、Tomato)，同时也必不可少地会在各式各样的探针和系统监测界面上看到"系统平均负载"或者"Load Average"这样的字眼，但是它并不像我们习惯中Windows、Mac操作系统提供百分比显示CPU、内存占用率，而是以几个用空格隔开的浮点数来表示系统平均负载，那么它们到底是什么意思呢？又如何衡量系统负载及系统的稳定性呢？




### 系统平均负载-基本解释
在Linux shell下，有很多命令可以看到Load Average，例如：
```
$ uptime
23:18:33 up 1 day,  4:51,  2 users,  load average: 1.48, 1.26, 1.18
$ w
 23:19:11 up 1 day,  4:52,  2 users,  load average: 1.47, 1.29, 1.20
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     tty1                      Sat19   27:29m  0.00s  0.00s -bash
root     pts/0    60.217.212.136   23:15    7.00s  0.00s  0.00s w
$ top
 23:19:11 up 1 day,  4:52,  2 users,  load average: 1.47, 1.29, 1.20
```
先大致给一下这3个数字的含义：分别表示系统在过去1分钟、5分钟、15分钟内运行进程队列中的平均进程数量。

运行队列嘛，没有等待IO，没有WAIT，没有KILL的进程通通都进这个队列。

另外还有一个最直接的显示系统平均负载的命令
```
$ cat /proc/loadavg
1.34 1.36 1.24 1/239 5901
```
除了前3个数字表示平均进程数量外，后面的1个分数，分母表示系统进程总数，分子表示正在运行的进程数；最后一个数字表示最近运行的进程ID.

### 系统平均负载-进阶解释
只是上面那一句话的解释，基本等于没解释。写这篇文章的缘由就是因为看到了一篇老外写的关于Load Average的文章，觉得解释的很好，所以才打算摘取一部分用自己的话翻译一下。

@scoutapp Thanks for your article [Understanding Linux CPU Load](http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages), I just translate and share it to Chinese audiences.

为了更好地理解系统负载，我们用交通流量来做类比。

#### 1、单核CPU - 单车道 - 数字在0.00-1.00之间正常
路况管理员会告知司机，如果前面比较拥堵，那司机就要等待，如果前面一路畅通，那么司机就可以驾车直接开过。

![](https://file.wulicode.com/yuque/202208/04/14/5744S3ElccKH.jpg?x-oss-process=image/resize,h_173)

具体来说：

0.00-1.00 之间的数字表示此时路况非常良好，没有拥堵，车辆可以毫无阻碍地通过。

1.00 表示道路还算正常，但有可能会恶化并造成拥堵。此时系统已经没有多余的资源了，管理员需要进行优化。

1.00-*** 表示路况不太好了，如果到达2.00表示有桥上车辆一倍数目的车辆正在等待。这种情况你必须进行检查了。

#### 2、多核CPU - 多车道 - 数字/CPU核数 在0.00-1.00之间正常
![](https://file.wulicode.com/yuque/202208/04/14/5744qPQ6alFZ.jpg?x-oss-process=image/resize,h_65)

多核CPU的话，满负荷状态的数字为 "1.00 * CPU核数"，即双核CPU为2.00，四核CPU为4.00。

#### 3、安全的系统平均负载
作者认为单核负载在0.7以下是安全的，超过0.7就需要进行优化了。

#### 4、应该看哪一个数字，1分钟，5分钟还是15分钟？
作者认为看5分钟和15分钟的比较好，即后面2个数字。

#### 5、怎样知道我的CPU是几核呢？
使用以下命令可以直接获得CPU核心数目
```
grep 'model name' /proc/cpuinfo | wc -l
```
或者使用 `top` 命令, 然后输入 `1` 来查看当前cpu 的个数

![](https://file.wulicode.com/yuque/202208/04/14/5745p5Vmv1K4.jpg?x-oss-process=image/resize,h_197)

取得CPU核心数目N，观察后面2个数字，用数字/N，如果得到的值小于0.7即可无忧。

