# npm faq

## yarn 下载包提示 : "There appears to be trouble with your network connection. Retrying..."

**问题**

![](https://file.wulicode.com/doc/20230712/1689126001803.png)

今天早上准备使用 taro 的时候无法下载, 提示网络问题, 但是网络的访问都是正常的, npm, pnpm 都是正常的

**解决**

一般网上给到的方法都是设置超时时间, 但是不起作用

```
yarn install --network-timeout 1000000
```

当然, 前提是确保没有设置代理

```
npm config rm proxy
npm config rm https-proxy
```

我这里的问题是前两天使用 pnpm 下载东西的时候给 npm 设置了一个代理, 因为代理的模式 yarn 不支持, 所以出现的问题,
解决方法就是换一个支持的代理或者移除代理

## 环境管理最佳实践

**mac 系统**

- node 使用 brew 进行管理, 如果需要切换版本, 直接 brew link 既可
- npm 全局包使用 npm 进行管理
- yarn 使用 npm 安装
- pnpm 使用 npm 安装, 不使用 pnpm 管理 node 环境