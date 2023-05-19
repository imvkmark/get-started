---
title: "iOS - FAQ"
date: 2022-04-14 22:14:59
toc: true
categories:
- ["手机端","ios"]
---

## idfa 获取到的是 一串 00000 
服务器统计活跃数的时候会出现<br />![](https://file.wulicode.com/yuque/202208/24/23/0806tfThS4QO.png?x-oss-process=image/resize,h_78)<br />统计到的数据是 一串 000000的情况, 据查询
> ios10更新之后一旦开启了 设置->隐私->广告->限制广告跟踪之后 获取到的idfa将会是一串00000

下图是同一个设备，开启与关闭后登录账号在数据库中的记录：<br />![](https://file.wulicode.com/yuque/202208/24/23/0807Hpdlr7q8.png?x-oss-process=image/resize,h_83)

