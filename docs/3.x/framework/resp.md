---
description: '系统支持JSON和Web格式的错误码返回，错误码说明清晰，允许开发者自定义错误码以满足业务需求。'
lastUpdated: '2026-06-29 23:04:13'
head:
  - - meta
    - name: 'og:title'
      content: '错误码'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '系统支持JSON和Web格式的错误码返回，错误码说明清晰，允许开发者自定义错误码以满足业务需求。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/3.x/framework/resp.html'
---
# 错误码

## 返回格式

Api 以 Json 格式返回: 其中代表的含义如下:

- `status`服务器错误码, 代表服务器出现错误, `500` 代表内部查询出现问题, `404` 代表页面不存在, 等
- `message`服务返回的提示信息, 如果存在 `status` , 则代表服务报错信息, 如果是自定义的 code, 这里返回的是自定义的提示信息
- `data`返回正确的时候, `data` 中会存在附加数据, 附加数据说明放置在 api 文档中, 这里不做任何补充提示.

下边是示例代码:

**有服务器错误**

```JSON
{
        "status": 500,
        "message": "Internal Server Error"
}
```

**服务器无错误**

```JSON
{
        "status": 0,
        "message": "获取用户信息成功!",
        "data": {
                "username": "dashou001",
                "userid": 123354
        }
}
```

## 错误码说明

```Plaintext
0   : 操作成功
1   : 操作失败
2   : 凭据超时
3   : 凭据不存在
4   : 凭据错误
5   : 请求参数错误
6   : 签名错误
7   : 无权限操作
99  : 接口内部错误
```

## 支持 json/web

如果是 web 页面进行使用则调用定义的正确/错误的页面进行显示.

## 自定义错误码

如果需要自定义错误码, 错误码需要定义在 Action 中 错误码是 6 位的数字, 其中代表含义如下

```Plaintext
100101  : 错误码拆分为 3 部分
10   : 模块
01   : Action (业务逻辑)
01   : 该业务逻辑下错误码序列号
```

其中错误的语言描述可以使用 语言包来编写