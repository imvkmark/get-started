---
title: "Centrifugo 介绍"
date: 2021-06-26 17:14:36
toc: true
categories:
- ["Ops","软件","Centrifugo"]
---

## Centrifugo 说明

Centrifugo 是一个实时消息发送方, 我们项目中将其作为一个服务方来使用, 聊天室的实时通知, 项目中的消息推送到客户端都可以用其来实现, 因为后端使用的是 Go语言所以暂时无法和服务端进行通讯, 只能单向发送

此项目需要了解

1. Centrifugo 项目

存储了各个平台的配置文件以及 Mac/Linux Centrifugo 运行模块

目录树如下




```
.
├── README.md
├── play   # 伙玩项目配置文件
│   ├── play-centrifugo.ini
│   ├── v1_config.json       # 1942
│   └── v2_config.json       # 1943
├── v1     # V1 版本的执行文件以及web 目录
│   ├── centrifugo_amd64     # linux
│   ├── centrifugo_darwin    # mac
│   └── web
│       ├── LICENSE
│       ├── app              # 配置中使用的web 目录
│       └── ...              # 其他打包文件
└── v2
    ├── centrifugo_amd64     # linux 
    └── centrifugo_darwin    # 目录
```

2. Centrifugo 配置文件

这里请详细查阅官方文档

- [V2 配置文件](https://centrifugal.github.io/centrifugo/server/configuration/)
- [V2 客户端库](https://centrifugal.github.io/centrifugo/libraries/client/)

