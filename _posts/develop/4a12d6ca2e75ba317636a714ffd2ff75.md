---
title: "SameSite 设置导致的 SessionId 重新生成"
date: 2022-04-20 18:58:27
toc: true
categories:
- ["开发","http"]
---

首先需要知道的是: 什么是 SameSite ? 这里有文章做了详细的描述

- [Cookie 的 SameSite 属性]()
- [SameSite cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

![](https://file.wulicode.com/note/2021/10-22/13-42-22407.png#)

本来计划的是使用 Session 来进行中间存储, 但是由于 Cookie 的安全性问题导致 Session 一直没有获取到, 因为是 严格模式, 所以三方过来的时候是不带任何 Cookie 的, 导致服务器一直生成 SessionID.

