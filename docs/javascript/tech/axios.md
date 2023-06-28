---
title: " 「转+」 axios 简介"
date: 2022-04-14 22:26:37
toc: true
categories:
  - [ "前端","其他","axios" ]
---

原文地址: [axios全攻略](https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/)

axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端

## 它具有以下特征：

- 从浏览器中创建 XMLHttpRequest
- 从 node.js 发出 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
-
客户端支持防御  [CSRF/XSRF](http://baike.baidu.com/link?url=iUceAfgyfJOacUtjPgT4ifaSOxDULAc_MzcLEOTySflAn5iLlHfMGsZMtthBm5sK4y6skrSvJ1HOO2qKtV1ej_)

## 浏览器兼容性

![](https://file.wulicode.com/yuque/202208/04/15/3525aPhzRMI7.png?x-oss-process=image/resize,h_272)

## 安装

```
# npm
$ npm install axios
# cnpm
# taobao mirror
$ cnpm install axios
# bower
$ bower install axios
```

或者使用cdn：

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 举个栗子：

---

### 执行 GET 请求

```
// 向具有指定ID的用户发出请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// 也可以通过 params 对象传递参数
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 执行 POST 请求

```
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 执行多个并发请求

```
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
    // 两个请求现已完成
  }));
```

## axios API

可以通过将相关配置传递给 axios 来进行请求。

### axios(config)

```
// 发送一个 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

```
// get 方法请求远程图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```

### axios(url[, config])

```
// 发送一个 GET 请求 (GET请求是默认请求模式)
axios('/user/12345');
```

### 请求方法别名

为了方便起见，已经为所有支持的请求方法提供了别名。

- axios.request（config）
- axios.get（url [，config]）
- axios.delete（url [，config]）
- axios.head（url [，config]）
- axios.post（url [，data [，config]]）
- axios.put（url [，data [，config]]）
- axios.patch（url [，data [，config]]）

**注意**

当使用别名方法时，不需要在 config 中指定 `url`，`method` 和 `data` 属性。

### 并发

帮助函数处理并发请求。

- axios.all（iterable）
- axios.spread（callback）

### 创建实例

您可以使用自定义配置创建axios的新实例。

axios.create（[config]）

```
var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 实例方法

可用的实例方法如下所示。 指定的配置将与实例配置合并。

```
axios＃request（config）
axios＃get（url [，config]）
axios＃delete（url [，config]）
axios＃head（url [，config]）
axios＃post（url [，data [，config]]）
axios＃put（url [，data [，config]]）
axios＃patch（url [，data [，config]]）
```

## 请求配置

---

这些是用于发出请求的可用配置选项。 只有url是必需的。 如果未指定方法，请求将默认为GET。

```
{
  // `url`是将用于请求的服务器URL
  url: '/user',
  // `method`是发出请求时使用的请求方法
  method: 'get', // 默认
  // `baseURL`将被添加到`url`前面，除非`url`是绝对路径
  // 可以方便地为 axios 的实例设置`baseURL`，以便将相对 URL 传递给该实例的方法。
  baseURL: 'https://some-domain.com/api/',
  // `transformRequest`允许在请求数据发送到服务器之前对其进行更改
  // 这只适用于请求方法'PUT'，'POST'和'PATCH'
  // 数组中的最后一个函数必须返回一个字符串，一个 ArrayBuffer或一个 Stream
  transformRequest: [function (data) {
    // 做任何你想要的数据转换
    return data;
  }],
  // `transformResponse`允许在 then / catch之前对响应数据进行更改
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],
  // `headers`是要发送的自定义 headers
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  // `params`是要与请求一起发送的URL参数
  // 必须是纯对象或URLSearchParams对象
  params: {
    ID: 12345
  },
  // `paramsSerializer`是一个可选的函数，负责序列化`params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // `data`是要作为请求主体发送的数据
  // 仅适用于请求方法“PUT”，“POST”和“PATCH”
  // 当没有设置`transformRequest`时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream
  data: {
    firstName: 'Fred'
  },
  // `timeout`指定请求超时之前的毫秒数。
  // 如果请求的时间超过'timeout'，请求将被中止。
  timeout: 1000,
  // `withCredentials`指示是否跨站点访问控制请求
  // should be made using credentials
  withCredentials: false, // default
  // `adapter'允许自定义处理请求，这使得测试更容易。
  // 返回一个promise并提供一个有效的响应（参见[response docs]（＃response-api））
  adapter: function (config) {
    /* ... */
  },
  // `auth'表示应该使用 HTTP 基本认证，并提供凭据。
  // 这将设置一个`Authorization'头，覆盖任何现有的`Authorization'自定义头，使用`headers`设置。
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },
  // “responseType”表示服务器将响应的数据类型
  // 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  //`xsrfCookieName`是要用作 xsrf 令牌的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default
  // `xsrfHeaderName`是携带xsrf令牌值的http头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  // `onUploadProgress`允许处理上传的进度事件
  onUploadProgress: function (progressEvent) {
    // 使用本地 progress 事件做任何你想要做的
  },
  // `onDownloadProgress`允许处理下载的进度事件
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  // `maxContentLength`定义允许的http响应内容的最大大小
  maxContentLength: 2000,
  // `validateStatus`定义是否解析或拒绝给定的promise
  // HTTP响应状态码。如果`validateStatus`返回`true`（或被设置为`null` promise将被解析;否则，promise将被拒绝。
  validateStatus: function (status) {
    return status >= 200 && status 300; // default
  },
  // `maxRedirects`定义在node.js中要遵循的重定向的最大数量。
  // 如果设置为0，则不会遵循重定向。
  maxRedirects: 5, // 默认
  // `httpAgent`和`httpsAgent`用于定义在node.js中分别执行http和https请求时使用的自定义代理。
  // 允许配置类似`keepAlive`的选项，
  // 默认情况下不启用。
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  // 'proxy'定义代理服务器的主机名和端口
  // `auth`表示HTTP Basic auth应该用于连接到代理，并提供credentials。
  // 这将设置一个`Proxy-Authorization` header，覆盖任何使用`headers`设置的现有的`Proxy-Authorization` 自定义 headers。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },
  // “cancelToken”指定可用于取消请求的取消令牌
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

## 响应语法

请求响应包含以下信息

```
{
  // `data` 是服务器提供的响应
  data: {},
  // `status` 是服务器响应的 Http 状态码
  status: 200,
  // `statusText` 服务器响应的 HTTP 状态信息
  statusText: 'OK',
  // `headers` 服务器响应的 header 信息
  // 所有请求的 header 都转换为小写
  headers: {},
  // `config` 是提供给 `axios` 请求的配置信息
  config: {},
  // `request` 生成本次响应的请求
  // 在 node.js 中是最后一次客户端请求
  // 在浏览器中是一个 XMLHttpRequest 实例
  request: {}
}
```

使用 then 时，您将收到如下响应：

```
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

当使用 `catch` 时，或将 注入回调 作为第二个参数传递时，响应将通过 `error` 对象提供，正如在处理错误部分中所解释的那样。

## 配置默认值

您可以指定将应用于每个请求的配置默认值。

### 全局axios默认值

```
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 自定义实例默认值

```
//在创建实例时设置配置默认值
var instance = axios.create({
  baseURL: 'https://api.example.com'
});
//在实例创建后改变默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 配置优先级顺序

配置将与优先顺序合并。 顺序是 `lib/defaults.js`中的库默认值，然后是实例的`defaults` 属性，最后是请求的 `config` 参数。
后者将优先于前者。 这里有一个例子。

```
//使用库提供的配置默认值创建实例
//此时，超时配置值为`0`，这是库的默认值
var instance = axios.create（）;
//覆盖库的超时默认值
//现在所有请求将在超时前等待2.5秒
instance.defaults.timeout = 2500;
//覆盖此请求的超时，因为它知道需要很长时间
instance.get（'/ longRequest'，{
     timeout：5000
}）;
```

## 拦截器

你可以截取请求或响应在被 then 或者 catch 处理之前

```
//添加请求拦截器
axios.interceptors.request.use（function（config）{
         //在发送请求之前做某事         return config;
     }，function（error）{
         //请求错误时做些事         return Promise.reject（error）;
     }）;
//添加响应拦截器
axios.interceptors.response.use（function（response）{
         //对响应数据做些事          return response;
     }，function（error）{
         //请求错误时做些事         return Promise.reject（error）;
     }）;
```

如果你以后可能需要删除拦截器。

```
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

你可以将拦截器添加到axios的自定义实例。

```
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

## 处理错误

```
axios.get（'/ user / 12345'）
     .catch（function（error）{
         if（error.response）{
             //请求已发出，但服务器使用状态代码进行响应             //落在2xx的范围之外             console.log（error.response.data）;
             console.log（error.response.status）;
             console.log（error.response.headers）;
         } else {
             //在设置触发错误的请求时发生了错误             console.log（'Error'，error.message）;
         }}
         console.log（error.config）;
     }）;
```

您可以使用validateStatus配置选项定义自定义HTTP状态码错误范围。

```
axios.get（'/ user / 12345'，{
     validateStatus：function（status）{
         return status 500; //仅当状态代码大于或等于500时拒绝
     }}
}）
```

## 取消请求

您可以使用取消令牌取消请求。
> axios cancel token API基于可取消的promise提议，目前处于阶段1。

您可以使用CancelToken.source工厂创建一个取消令牌，如下所示：

```
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});
// cancel the request (the message parameter is optional)
// 取消请求（消息参数是可选的）
source.cancel('Operation canceled by the user.');
```

您还可以通过将执行器函数传递给CancelToken构造函数来创建取消令牌：

```
var CancelToken = axios.CancelToken;
var cancel;
axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    //  一个执行器函数接收一个取消函数作为参数
    cancel = c;
  })
});
// cancel the request
cancel();
```

> 注意：您可以使用相同的取消令牌取消几个请求。

## 使用application / x-www-form-urlencoded格式

默认情况下，axios 将 JavaScript 对象序列化为JSON。 要以 `application/x-www-form-urlencoded` 格式发送数据，您可以使用以下选项之一。

### 浏览器

在浏览器中，您可以使用URLSearchParams API，如下所示：

```
var params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

> 请注意，所有浏览器都不支持URLSearchParams，但是有一个polyfill可用（确保polyfill全局环境）。

或者，您可以使用qs库对数据进行编码：

```
var qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

### Node.js

在node.js中，可以使用 `querystring` 模块，如下所示：

```
var querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

你也可以使用qs库。

## Semver

在 axios 发布 1.0 版本之前，将会发布一个新的小版本。例如 0.5.1 和 0.5.4 将具有相同的 API，但是 0.6.0 将会有不同的变动。

## Promise

axios 依赖本机要支持 ES6 Promise 实现。 如果您的环境不支持 ES6 Promises ，您可以使用 polyfill。

## TypeScript

axios包括TypeScript定义。

```
import axios from 'axios';
axios.get('/user?ID=12345');
```

axios 在很大程度上受到 Angular 提供的 `$http` 服务的启发。 最终，axios 努力提供一个在Angular外使用的独立的 `$http`-like
服务。

## 返回数据的错误处理

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
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
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
    "config": {
        // ...
    }
}
```

**请求超时**
> 无 response 返回

```json
{
    "message": "timeout of 2000ms exceeded",
    "name": "Error",
    "stack": "Error: timeout of 2000ms exceeded...",
    "config": {
        // ...
    },
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
    "config": {
        ...
    }
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

