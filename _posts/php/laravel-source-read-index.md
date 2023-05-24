---
title: "源码阅读 - 初始 : (1) 入口文件 index"
date: 2022-04-20 19:01:08
toc: true
categories:
- ["Php","源码阅读","Laravel"]
---

**入口文件 public/index.php**



```php
// 1) Composer 自动加载: 无需关心类库是如何被引入的
require __DIR__.'/../bootstrap/autoload.php';
// -- 定义 LARAVEL_START
// -- 加载 vendor/autoload.php
// 2) 加载App入口文件并初始化
$app = require_once __DIR__.'/../bootstrap/app.php';
// 3) 创建 kernel
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
// 4) 处理请求
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
// 5) 发送响应
$response->send();
// 6) 终止
$kernel->terminate($request, $response);
```

## 1) 自动加载
**bootstrap/autoload.php**
```php
// 定义 LARAVEL_START
define('LARAVEL_START', microtime(true));
// 1) 加载 bootstrap 下的自动加载
require __DIR__.'/../vendor/autoload.php';
```
bootstrap 下的 自动加载

**~/vendor/autoload.php**
```php
# 加载指定定义文件
vendor/composer/autoload_real.php
# 调用 loader
ComposerAutoloaderInitXX::getLoader();
    # ? autoload_static.php
    # : autoload_namespaces.php  # 命名空间
        autoload_psr4.php        # 自行加载
        autoload_classmap.php    # 类的映射
        
    # 加载文件
    # autoload_files.php
```

## 2) 应用程序加载
**bootstrap/app.php**
```php
// 1) 初始化 app
$app = new Illuminate\Foundation\Application(
	realpath(__DIR__ . '/../')
);
/* 2) 绑定重要接口, 来源请求来自于 web 和 CLI
 * 将两个类绑定, 进行自动加载的时候进行存储对象的获取
 -------------------------------------------- */
// Http 核心
$app->singleton(
	Illuminate\Contracts\Http\Kernel::class,
	App\Http\Kernel::class
);
// 命令行核心
$app->singleton(
	Illuminate\Contracts\Console\Kernel::class,
	App\Console\Kernel::class
);
// 异常处理
$app->singleton(
	Illuminate\Contracts\Debug\ExceptionHandler::class,
	App\Exceptions\Handler::class
);
// 返回应用实例 
return $app;
```

## 3) 生成加载器
```php
// 创建 Kernel
$app->make(Illuminate\Contracts\Http\Kernel::class)
```
```php
// 获取引用
$abstract = $this->getAlias($abstract);
// 未加载则进行加载
if (isset($this->deferredServices[$abstract]) && ! isset($this->instances[$abstract])) {
    $this->loadDeferredProvider($abstract);
    # 注册 provider
}
// 返回实例化的对象
return parent::make($abstract, $parameters);
```

## 4) 处理请求
```php
try {
    // 启用 Http 方法重写
    // 支持 在 post 方法下, 使用 _method 替代 PUT, DELETE 等方法
    $request->enableHttpMethodParameterOverride();
    // 1) 通过路由发送请求
    $response = $this->sendRequestThroughRouter($request);
} catch (Exception $e) {
    // 2) 异常处理和渲染
    $this->reportException($e);
    $response = $this->renderException($request, $e);
} catch (Throwable $e) {
    $this->reportException($e = new FatalThrowableError($e));
    $response = $this->renderException($request, $e);
}
// 3) 触发请求处理事件
$this->app['events']->dispatch(
    new Events\RequestHandled($request, $response)
);
return $response;
```

## 5) 发送响应
```php
// 1) 发送 Header
$this->sendHeaders();
// 2) 发送内容
$this->sendContent();
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
} elseif ('cli' !== PHP_SAPI) {
    static::closeOutputBuffers(0, true);
}
return $this;
```

## 6) 终止程序
```php
// 1) 终止中间件
$this->terminateMiddleware($request, $response);
// 2) 终止 App
$this->app->terminate();
```

