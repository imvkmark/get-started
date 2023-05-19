---
title: "基于 Umi & Ant Design Pro 的最佳实践"
date: 2021-06-16 18:22:07
toc: true
categories:
- ["前端","React"]
---

本文是基于 : [https://www.yuque.com/duoli/web-fe/umi-best-practice](https://wulicode.com/web-fe/umi-best-practice.html) 的基础上发展出来的规范, 本文原则旨在之前文章的补充



## 注意

1. 使用[ typescript ](https://www.typescriptlang.org/)作为编写语言, 需要学习 typescript : 强类型化的Js

## 初始化

```shell
# 创建文件夹
$ mkdir react_pc

# 初始化 umi
$ yarn create umi

? Select the boilerplate type ant-design-pro
? 🧙 Be the first to experience the new umi@3 ? Pro V5
? 🤓 Which language do you want to use? TypeScript
? 🚀 Do you need all the blocks or a simple scaffold? complete

# 安装 组件
$ yarn

# 运行
$ yarn start 
```

## 组件变化

### 移除 i18n 国际化组件
```shell
$ yarn i18n-remove
yarn run v1.22.5
$ pro i18n-remove --locale=zh-CN --write
✔ 🕵️‍  find js or ts files
✔ 📦  load all locale file and build ts 
✔ ✂️  ...
✨  Done in 23.56s.
```

### 配置其支持加密和 Token
在 app.tsx 中配置使用拦截器<br />_app.tsx_
```javascript
export const request: RequestConfig = {
    ...
    requestInterceptors: [
        requestHeaderInterceptor
    ]
};

// header 拦截器
const requestHeaderInterceptor = (url: string, options: any) => {
    // Token
    let token = localStore(storageKey.TOKEN) ?? '';

    // params
    let params = clone(requestParam(options['params'] ?? {}));
    params['timestamp'] = Math.round(new Date().getTime() / 1000);
    params['sign'] = requestSign(params, token);
    options.params = {};
    options.data = params;

    // headers
    let headers = options.headers ?? {};
    headers['Content-Type'] = 'application/json';
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return {
        url: `${url}`,
        options: {...options, interceptors: true, headers}
    };
}
```
请求参考地址 : 

- [Umi-Request @Github](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md)
- [@umijs/plugin-request](https://umijs.org/zh-CN/plugins/plugin-request)
- [useRequest](https://hooks.umijs.org/zh-CN/hooks/async)
- [ProV5 网络请求](https://beta-pro.ant.design/docs/request-cn/)
- [ProV5 的开始使用](https://pro.ant.design/docs/getting-started-cn)

### 关于布局的联合使用
Url : [https://procomponents.ant.design/components/layout](https://procomponents.ant.design/components/layout)

