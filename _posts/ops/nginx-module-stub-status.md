---
title: "stub_status : 提供访问基础状态信息"
date: 2022-06-08 17:14:44
toc: true
categories:
- ["Ops","Nginx","模块"]
---

`ngx_http_stub_status_module`模块提供访问的基础信息

该模块不是默认构建的，应该使用配置参数 `--with-http_stub_status_module`启用




## 示例
```nginx
location = /basic_status {
  stub_status;
}
```
此配置创建一个简单的网页返回如下的 nginx 基础状态信息
```
Active connections: 291
server accepts handled requests
  16630948 16630948 31070465
Reading: 6 Writing: 179 Waiting: 106
```

## 声明
```
Syntax:	stub_status;
Default:	—
Context:	server, location
```
基本状态信息将可以从 location 访问
> 在1.7.5之前的版本中，指令语法需要参数，例如 `stub_status on`


## 数据
提供以下状态信息：

`Active connections` 

当前的活动客户端连接数，包括等待的连接数。

`accepts`

接受的客户端连接总数。

`handled`

已处理的连接总数。通常，除非达到某些资源限制(例如，Worker_Connections限制)，否则参数值与Accept相同。

`requests`

客户端请求的总数。

`Reading`

Nginx正在读取请求标头的当前连接数。

`Writing`

Nginx正在将响应写回客户端的当前连接数。

`Waiting`

当前等待请求的空闲客户端连接数。

## 嵌入变量
`ngx_http_stub_status_module` 模块支持以下嵌入式变量(1.3.14)：

`$connections_active`

与 `Active connections`相同

`connections_reading`

与 `Reading` 相同

`$connections_writing`

与 `Writing` 相同

`$connections_waiting`

与 `Waiting` 相同

