---
title: "Redux DevTools 扩展的使用说明"
date: 2021-06-26 10:44:57
toc: true
categories:
- ["前端","React"]
---

> 原文：[Redux DevTools extension](https://github.com/zalmoxisus/redux-devtools-extension#usage)


> ps : 如果这个项目没有处理好, 则会出现<br />
there is a warning ("Unresolved variable REDUX_DEVTOOLS_EXTENSION and REDUX_DEVTOOLS_EXTENSION) in webstorm<br />
类似这样的报错




## 安装


### 1. Chrome、Firefox

可以在浏览器网上商店中下载安装该扩展

- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)


### 2. 其它浏览器和非浏览器环境

- 使用[remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools)


## 用法


### 使用Redux


#### 1). store普通用法 对于基础的redux store只加添加：

```diff
 const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
```

注：`preloadedState`在`createStore`中是可选的

> 对于通用（“同构”）应用程序，请在其前面加上`typeof window !== 'undefined' &&`。


出现ESLint报错时，可以如下配置：

```diff
+ /* eslint-disable no-underscore-dangle */
  const store = createStore(
   reducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
+ /* eslint-enable */
```

> 支持redux>=3.1.0 版本



#### 2). store高级用法 如果store使用了中间件 `middleware` 和增强器 `enhaners`，代码要修改下：

```
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, /* preloadedState, */ 
    composeEnhancers(
        applyMiddleware(...middleware)
  ));
```

当有特殊扩展选项时，用这么使用：

```diff
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  // 有指定扩展选项，像name, actionsBlacklist, actionsCreators, serialize...
}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // 其他store增强器（如果有的话）
);

const store = createStore(reducer, enhancer);
```


#### 3). 使用`redux-devtools-extension`包 为了简化操作需要安装个npm包 `npm install --save-dev redux-devtools-extension` 使用

```
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, 
    composeWithDevTools(
        applyMiddleware(...middleware),
        // 其他store增强器（如果有的话）
));
```

指定扩展名选项：

```
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
  // 如果需要，在这里指定名称，actionsBlacklist，actionsCreators和其他选项
});
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware),
  // 其他store增强器（如果有的话）
));
```

如果你没有包含其它增强器和中间件的话，只需要使用devToolsEnhancer

```
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(reducer, /* preloadedState, */ devToolsEnhancer(
  // 需要的话，在这里指定名称，actionsBlacklist，actionsCreators和其他选项
));
```


#### 4). 在生产环境中使用 这个扩展在生产环境也是有用的，但一般都是在开发环境中使用它。 如果你想限制它的使用，可以用 `redux-devtools-extension/logOnlyInProduction`：

```
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const store = createStore(reducer, /* preloadedState, */         devToolsEnhancer(
    // actionSanitizer, stateSanitizer等选项
));
```

使用中间件和增强器时：

```
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const composeEnhancers = composeWithDevTools({
  // actionSanitizer, stateSanitizer选项
});
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware),
  // 其它增强器
));
```

> 你将不得不在 webpack 的生产环境打包配置中加上`process.env.NODE_ENV': JSON.stringify('production')`。如果你用的是`create-react-app`，那么它已经帮你配置好了


如果你在创建store时检查过`process.env.NODE_ENV`，那么也包括了生产环境的`redux-devtools-extension/logOnly` 如果不想在生产环境使用扩展，那就只开启`redux-devtools-extension/developmentOnly`就好

> 点击[文章](https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f)查看更多细节



#### 5). 对于`react-native`, `hybrid`, `desktop` 和 服务端的redux应用程序

- 
`react-native` 可以用和redux DevTools Extension一样api的react-native-debugger工具。

- 
大多数平台，包括`remote redux devtool's` 的store增强器，可以通过扩展上下文的菜单中选择`'open remote devtools'` 来远程监控。



### 没有使用Redux

关于怎么使用体系结构的扩展，请参考以下[集合链接](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Integrations.md)和[博客文章](https://medium.com/@zalmoxis/redux-devtools-without-redux-or-how-to-have-a-predictable-state-with-any-architecture-61c5f5a7716f)


## 备注

2020-02-25 : 删除 2.7 之前的提示

