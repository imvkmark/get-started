---
title: "发布 npm 包 - FAQ"
date: 2021-06-10 22:21:04
toc: true
categories:
- ["前端","包管理"]
---

关于如何发布可以查看  [「译」 创建并发布一个小而美的 npm 包 - 掘金](https://juejin.im/post/6844903751833092104)

关于如何搭建一个 npm 包并进行单元测试, 这里有个解决方案 [jslib-base](https://github.com/yanhaijing/jslib-base/blob/master/README.zh-CN.md)

在发布包的时候遇到的常见问题如下




## 常见问题


### 1. [no_perms] Private mode enable
> PUT [https://registry.npm.taobao.org/@](https://registry.npm.taobao.org/@)... - [no_perms] Private mode enable, only admin can publish this module


使用 `npm publish` 或者使用 `yarn publish` 出现 couldn't publish package:"https://registry.npm.taobao.org/包...:unauthorized

出现原因：使用的是淘宝源 cnpm,登陆到的是 cnpm

解决方法：切换到 npmjs 的网址，代码如下

```
npm config set registry http://registry.npmjs.org/

# 切换回淘宝源
npm config set registry https://registry.npm.taobao.org/
```


### 2. You must sign up for private packages

这里代表发布的时候必须要加入 `--access public`, 因为默认的 `@` 符号开始的必须是私有包, 如果默认需要显式的传成公共方法, 则需要自己主动约定


### 3. Couldn't publish package: Scope not found"

如果是用户名, 这里不需要创建 scope, 如果是除了自己用户名之外的, 需要确认 scope 是否存在, 如果不存在, 则可以创建一个 organization

参考地址 [How to publish NPM Scoped Packages / NPM scope not found?](https://stackoverflow.com/questions/43824012/how-to-publish-npm-scoped-packages-npm-scope-not-found)


### 4. 取消发布

```
$ yarn unpublish @pkg/name --force
```

