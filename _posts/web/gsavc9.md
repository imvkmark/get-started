---
title: "Axios 返回错误的处理"
date: 2022-09-30 09:53:49
toc: true
categories:
- ["前端","其他","axios"]
---

官方链接 : [错误处理](https://axios-http.com/zh/docs/handling_errors)



```javascript
axios.get("/user/12345").catch(function (error) {
    if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
    } else {
        // 发送请求时出了点问题
        console.log("Error", error.message);
    }
    console.log(error.config);
});
```
**无网络**
> 无 response 返回

```json
{
    "message": "Network Error",
    "name": "Error",
    "stack": "Error: Network Error...",
    "config": {        // ...    }
}
```
**请求超时**
> 无 response 返回

```json
{
    "message": "timeout of 2000ms exceeded",
    "name": "Error",
    "stack": "Error: timeout of 2000ms exceeded...",
    "config": {        // ...    },
    "code": "ECONNABORTED"
}
```
**返回错误码**
> 返回 response

```json
{
    "message": "Request failed with status code 401",    
    "name": "Error",
    "stack": "Error: Request failed with status code 401...",
    "config": {        ...    }
}
```
> response 数据

```json
{
    "data": "Unauthorized Jwt.",
    "status": 401,
    "statusText": "Unauthorized",
    "headers": {
        "cache-control": "no-cache, private",
        "content-type": "text/html; charset=UTF-8"
    },
    "config": {
        ...
    },
    "request": {
        ...
    }
}
```
对于 config 中的结构格式查看 [请求配置](https://axios-http.com/zh/docs/req_config)

