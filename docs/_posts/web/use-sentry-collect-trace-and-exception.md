---
title: "客户端安装 Sentry 进行错误/性能跟踪"
date: 2022-04-20 19:01:16
toc: true
categories:
- ["前端","Javascript"]
---

Sentry 是一个日志平台，分为客户端和服务端，客户端(目前客户端有Python, PHP,C#, Ruby等多种语言)就嵌入在你的应用程序中间，程序出现异常就向服务端发送消息，服务端将消息记录到数据库中并提供一个web节目方便查看。Sentry由python编写，源码开放，性能卓越，易于扩展，目前著名的用户有Disqus, Path, mozilla, Pinterest等
> - 性能监控(trace)
> - 错误定位(source-map)
> - 性能监控



## 1. 安装并配置命令行工具

### 安装 sentry-cli
```bash
# 安装 命令行工具 / 全局安装
$ npm install @sentry/cli -g
```

### 新建配置文件 `.sentryclirc`
在工程根目录下新建 `.sentryclirc` 文件, sentry_cli 会默认读取文件，配置如下：
```
[defaults]
url=http://sentry.demo-domain.com
org='组织名'
project='项目名称'
[auth]
token=AccountApiToken
```
Token 的获取地址 `Account > API> Create New Token`<br />![](https://file.wulicode.com/note/2021/10-22/00-05-09813.png#id=anoeU&originHeight=541&originWidth=909&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />如果这里上传 source-map , 则需要 `project:releases`权限

### 获取项目 Dsn
dsn 是项目上报错误的地址, **该 dsn（数据源）告诉 SDK 将事件发送到哪里。如果未提供此值，SDK 将尝试从 SENTRY_DSN 环境变量中读取它。如果该变量也不存在，则 SDK 将不会发送任何事件。请在 sentry.io 中查看“设置”->“项目”->“客户端密钥（DSN）”**<br />![](https://file.wulicode.com/note/2021/10-22/00-04-46427.png#id=bEfet&originHeight=693&originWidth=909&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 2. 使用 Webpack 组件包配置

### 2.1 Umi/React 示例

#### 1) 项目安装
Sentry 通过在应用程序的运行时中使用 SDK 捕获数据。使用 yarn 或 npm 将 Sentry SDK 添加为依赖项
```bash
$ npm install --save-dev @sentry/webpack-plugin
$ npm install --save @sentry/react
```

#### 2) 项目对接 Dsn
在项目的根 layout 文件中引入并初始化 Sentry React SDK 和 ErrorBoundary
```jsx
import React from "react";
import * as Sentry from "@sentry/react";
// 这里的版本号使用 env+version 方式, 更方便定位问题
Sentry.init({
	dsn: "数据源",
	release: "版本号",
	environment: "环境，比如生产或者测试",
});
const Base = (props: any) => {
	const children = props.children;
	return (
		<Sentry.ErrorBoundary fallback={() => console.log("An error has occurred")}>{children}</Sentry.ErrorBoundary>
	);
};
export default Base;
```
注: ErrorBoundary 是定义遇到错误时应用程序行为的必要工具。该@sentry/react 软件包公开了一个 ErrorBoundary 组件，该组件自动将 JavaScript 错误从 React 组件树内部发送到 Sentry。像常规 React 组件一样使用 ErrorBoundary . 完成此操作后，Sentry 会自动捕获所有未处理的异常<br />可以通过在应用程序内的某个地方引发异常来触发开发环境中的第一个事件。例如，呈现一个按钮：
```jsx
return <button onClick={methodDoesNotExist}>Break the world</button>;
```

#### 3) 部署 source-map
构建项目时，我们会将代码进行压缩混淆，为了在进行日志分析的时候更清楚看到错误发生的原因，我们要对代码进行还原，因此需要 sourcemap 文件，使用 Sentry 的 Webpack 插件在项目构建时会自动上传 sourcemap 文件. 此操作需要身份认证, 这里会使用到之前配置的 sentry-cli 以及其 Token<br />**在 umirc.ts 配置文件中引入并使用**<br />配置文件中增加 SentryWebpackPlugin 和 devtool 配置项, devtool 值设置为"source-map".
> 注意 : 这里的版本号使用的是 env + version 的方式, 更方便定位问题

```javascript
{
    devtool: "source-map",
    chainWebpack(config : any, { webpack }: { webpack: any }) {
        config.plugin('sentry').use(SentryWebpackPlugin, [
            {
                include: './dist',
                release: `${env}-${version}`,
                ignore: ['node_modules'],
                org: 'org',
                sourceMapReference: true,
            },
        ]);
    }
}
```

### 2.2) Vite 安装

#### 1) 安装组件
安装组件, 因为官方没有提供 对 vite 的对接, 所以使用三方插件
```bash
$ yarn add vite-plugin-sentry
$ yarn add @sentry/vue
```

#### 2) 项目对接 dsn
在主项目入口引入并配置
```javascript
import * as Sentry from "@sentry/vue";
import { appMode, appVersion, sentryDsnUrl } from "@/utils/conf";
const app = createApp(App);
Sentry.init({
	app,
	dsn: sentryDsnUrl,
	release: `${appMode}-${appVersion}`,
	environment: appMode,
});
```

#### 3) 部署 source-map
这里需要注意

1. 开启 sourcemap 才可以上传

`build.sourcemap` 这个选项是开启 source map 的, 根据实际情况来进行开关

2. sourceMap 的 UrlPrefix 需要填写正确

`plugins.viteSentry.sourceMaps.urlPrefix` (为了标识路径), 是根据 `~`(访问目录代表网站, `~/` 代表项目部署的目录), 如果是子目录则需要在填写子目录的位置, 例如我的部署目录是 `webapp/`, 这里应该配置 `~/webapp/assets`
```javascript
// vite.config.ts
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        ...
        plugins: [
            ...
            // 使用 NODE_ENV, production 时候才会执行错误搜集
            viteSentry({
                debug: true,
                url: process.env.VITE_SENTRY_URL,
                authToken: process.env.VITE_SENTRY_TOKEN,
                org: 'dadi',
                project: 'proj',
                release: `${mode}-${pkgJson.version}`,
                deploy: {
                    env: `${mode}`
                },
                setCommits: {
                    auto: false
                },
                sourceMaps: {
                    include: [
                        `build/proj-${mode}/assets`
                    ],
                    ignore: ['node_modules'],
                    urlPrefix: '~/assets'
                }
            })
        ],
        build: {
            outDir: `build/proj-${mode}`,
            sourcemap: (mode === 'prod' || mode === 'dev'),
            ...
        },
        ...
    }
});
```
这样在执行打包的时候即可进行 source-map 的上传
```javascript
...
    ~/assets/vant.31618c38.js (sourcemap at vant.31618c38.js.map)
    ~/assets/vue3-clipboard-es.f4fdbc1a.js (sourcemap at vue3-clipboard-es.f4fdbc1a.js.map)
  Source Maps
    ~/assets/Auto.f5325f0e.js.map
    ~/assets/Buy.cca58b67.js.map
...
```

## 3 Sentry 性能监控
性能监控是搜集当前项目性能的一个组件工具, 可选安装, 这里简要介绍

### 3.1 安装跟踪软件包
```bash
$ yarn add @sentry/tracing
```

### 3.2 配置
通过以下两种方式在应用中启用性能监控：

- tracesSampleRate 统一采样率,设置为 0 和之间的数字 1。（例如，20% 的 transactions 抽样率，设置 tracesSampleRate 为 0.2。）
- tracesSampler 基于 transactions 本身及其捕获的上下文动态控制采样率(两者同时配置时,优先级高)

#### 1) 自动检测
@sentry/tracing 提供了 BrowserTracing 集成,该 BrowserTracing 集成会为每个页面加载和导航事件生成一个新的事务(transactions)，并为每一个 XMLHttpRequest 或 fetch 创建一个 child span(子跨度)。<br />要启用此自动跟踪，需要在 SDK 配置选项中添加 BrowserTracing integrations 配置.
```javascript
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing"; // Must import second
Sentry.init({
	app,
	dsn: sentryDsnUrl,
	release: `${appMode}-${appVersion}`,
	environment: appMode,
	integrations: [
		new Integrations.BrowserTracing({
			routingInstrumentation: Sentry.vueRouterInstrumentation(router),
			tracingOrigins: ["domain.com", "dev.domain.com", /^\//],
		}),
	],
	/**
	 * 线上环境捕捉 1%, 开发环境捕捉完整
	 * https://docs.sentry.io/platforms/javascript/guides/vue/configuration/sampling/#setting-a-sampling-function
	 * @param samplingContext
	 */
	tracesSampler: (samplingContext) => {
		if (appMode === "prod") {
			return 0.01;
		} else {
			return 1;
		}
	},
});
```
**配置选项**

- tracingOrigins<br />tracingOrigins 默认值是['localhost', /^//]。<br />JavaScript SDK 将 sentry-trace 标头附加到所有输出 XHR / fetch 请求中，这些请求的目的地在列表中包含字符串或与列表中的正则表达式匹配。如果您的前端向其他域发出请求，则需要在其中添加它，<br />以将 sentry-trace 标头传播到后端服务，这是将事务链接在一起作为单个跟踪的一部分所必需的。该 tracingOrigins 选项与整个请求 URL 匹配，而不仅仅是域。使用更严格的正则表达式来匹配 URL 的某些部分，可以确保请求不必 sentry-trace 附加标头。<br />例如<br />前端应用程序 example.com<br />后端服务 api.example.com<br />前端应用程序对后端进行 API 调用<br />因此，该选项需要这样配置： new Integrations.BrowserTracing({tracingOrigins: ['api.example.com']})<br />现在发出的 XHR / fetch 请求 api.example.com 将 sentry-trace 附加标头<br />您将需要配置 Web 服务器 CORS 以允许 sentry-trace 标头。该配置看起来像"Access-Control-Allow-Headers: sentry-trace"，但是该配置取决于您的设置。如果您不允许 sentry-trace 标题，则该请求可能会被阻止。
- beforeNavigate<br />对于 pageload 和 navigation 事务，BrowserTracing 集成使用浏览器的 window.locationAPI 生成事务名称。需要自定义名称可以提供一个 beforeNavigate 选项，使用此选项可以修改事务名称以使其更通用，例如，命名为 GET /users/12312012 的事务和 GET /users/11212012 都可以重命名 GET /users/:userid，以便它们可以组合在一起。
- shouldCreateSpanForRequest<br />此功能可用于过滤掉不需要的跨度，例如 XHR 的运行状况检查或类似的检查。默认情况下，shouldCreateSpanForRequest 已经过滤掉了除 tracingOrigins 之外的所有.

#### 2) 手动检测
要手动检测代码的某些区域，可以创建事务来捕获它们。<br />这是适用于所有的 JavaScript 的 SDK（包括后端和前端）和独立工作的的 Express，Http 和 BrowserTracing 集成。
```
const transaction = Sentry.startTransaction({ name: "test-transaction" });
const span = transaction.startChild({ op: "functionX" }); // This function returns a Span
// functionCallX
span.finish(); // Remember that only finished spans will be sent with the transaction
transaction.finish(); // Finishing the transaction will send it to Sentry
```
例如，如果要为页面上的用户交互创建事务，请执行以下操作：
```
// Let's say this function is invoked when a user clicks on the checkout button of your shop
shopCheckout() {
  // This will create a new Transaction for you
  const transaction = Sentry.startTransaction('shopCheckout');
  // set the transaction on the scope so it picks up any errors
  hub.configureScope(scope => scope.setSpan(transaction));
  // Assume this function makes an xhr/fetch call
  const result = validateShoppingCartOnServer();
  const span = transaction.startChild({
    data: {
      result
    },
    op: 'task',
    description: `processing shopping cart result`,
  });
  processAndValidateShoppingCart(result);
  span.finish();
  transaction.finish();
}
```
此示例将向 shopCheckoutSentry 发送事务。交易将包含一个 task 跨度，用于衡量 processAndValidateShoppingCart 花费了多长时间。最后，调用 transaction.finish()完成交易并将其发送给 Sentry。<br />在为异步操作创建跨度时，还可以利用 Promise。但是跨度必须在 transaction.finish()调用之前完成。
```bash
function processItem(item, transaction) {
  const span = transaction.startChild({
    op: "http",
    description: `GET /items/:item-id`,
  });
  return new Promise((resolve, reject) => {
    http.get(`/items/${item.id}`, response => {
      response.on("data", () => {});
      response.on("end", () => {
        span.setTag("http.status_code", response.statusCode);
        span.setData("http.foobarsessionid", getFoobarSessionid(response));
        span.finish();
        resolve(response);
      });
    });
  });
}
```

## 4. QA

### 1. 出现错误 (http status: 413)
> error: API request failed
> caused by: sentry reported an error: unknown error (http status: 413)

上传的 sourceMap 太多，有可能会导致 413 Request Entity Too Large 错误, 这里需要更改后端对上传的大小限制即可, 如果是 nginx, 需要在指定的配置段中增加
```nginx
client_max_body_size 20m;
```

### 2. SentryCli 安装太慢

#### 方式 1: ~/.npmrc
找到并编辑 `~/.npmrc`
```
$ vim .npmrc
```
```
sentrycli_cdnurl=https://npmmirror.com/mirrors/sentry-cli/
```

#### 方式 2:~/.zshrc
添加环境变量, 这个在安装的时候可以进行识别的
```
# @sentry/cli
export SENTRYCLI_CDNURL=https://npmmirror.com/mirrors/sentry-cli/
```
之前地址 [~~https://cdn.npm.taobao.org/dist/sentry-cli~~](https://cdn.npm.taobao.org/dist/sentry-cli) 已经废弃<br />作为渲染展示的 Url 不可以使用 [~~https://registry.npmmirror.com/binary.html?path=sentry-cli/~~](https://registry.npmmirror.com/binary.html?path=sentry-cli/) , 不要去使用

### 3. 嵌入sentry 之后在 baiduappbox 打开出现白屏
由于 baiduboxapp 不支持 sentry 不分代码, 所以在 baiduapp 中需要隐藏掉 sentry 实例的初始化
```jsx
if (ua.getBrowser().name !== 'baiduboxapp') {
    Sentry.init({
        ...
    });
}
```

## 参考

- [Javascript @ Sentry](https://docs.sentry.io/platforms/javascript/)
- [手把手教你 安装 Sentry + 部署 Vue](https://juejin.cn/post/6854573216808861710)

