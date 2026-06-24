---
description: 'Laravel生命周期从加载项目依赖开始，创建应用实例并绑定内核、注册异常处理。随后接收请求，解析内核程序并处理HTTP请求，最终发送响应并终止程序。'
lastUpdated: '2026-06-17 22:49:04'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel 生命周期'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Laravel生命周期从加载项目依赖开始，创建应用实例并绑定内核、注册异常处理。随后接收请求，解析内核程序并处理HTTP请求，最终发送响应并终止程序。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/refs/core-request-life-cycle.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ceff506f0a646398d52d6349e38396d5.png'
---
# Laravel 生命周期

公共文件入口 *public/index.php*

```Plaintext
bootstrap/autoload.php
自动加载机制
    vendor/autoload.php
    加载 composer 扩展包的自动加载机制
    storage/framework/compiled.php
    如果存在编译文件则加载编译文件
bootstrap/app.php
    创建 `$app` = new Illuminate\Foundation\Application
        注册基础绑定 registerBaseBindings
            实例化 app
            实例化 Illuminate\Container\Container
        注册基础服务绑定    registerBaseServiceProviders
            注册 事件绑定
            注册 路由绑定
        注册核心容器 alias 关联 registerCoreContainerAliases
    App\Http\Kernel
    App\Console\Kernel
    App\Exceptions\Handler
kernel 的处理
- 创建 `kernel`
- 创建 `response`
- 发出 `response`
- 终止 `kernel`
```

![](https://file.wulicode.com/feishu-images/ceff506f0a646398d52d6349e38396d5.png)

laravel 的生命周期主要分为 3 个主要阶段:

- 加载项目依赖,
- 创建应用实例,
- 接受请求并响应

入口文件实现的代码:

```PHP
<?php
// 一
require __DIR__ . '/../vendor/autoload.php';
// 二
$app = require_once __DIR__ . '/../bootstrap/app.php';
// 三
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
$response->send();
$kernel->terminate($request, $response);
```

## 1. 加载项目依赖

> php 依赖于 composer 包管理,通过引入由 composer 包管理器自动生成的类加载程序,进行注册并加载第三方组件.

```PHP
<?php    require __DIR__ . '/../vendor/autoload.php';
```

## 2. 创建应用实例

```Plaintext
创建应用实例/服务容器,执行代码位于bootstrap/app.php文件,创建应用实例过程包括:注册项目基础服务、注册项目服务提供者别名、注册目录路径等等一系列操作
如下为app.php的代码,主要完成创建应用实例和绑定核心内容到服务容器:
```

```PHP
<?php
/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
*/
$app = new Illuminate\Foundation\Application(
    realpath(__DIR__.'/../')
);
/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
*/
$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);
$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);
$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);
/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
*/
return $app;
```

### 2.1 创建应用实例

即对 Illuminate进行实例化,称之为 app 容器。在实例化 app 容器的时候,完成以下几个工作:

- 注册应用基础路径并绑定到 app 服务容器;
- 注册基础服务提供者至 app 服务容器;
- 注册核心容器别名到 app 服务容器;

```PHP
/**
 * Create a new Illuminate application instance.
 *
 * @param  string|null  $basePath
 * @return void
 */
public function __construct($basePath = null)
{
    if ($basePath) {
        $this->setBasePath($basePath);
    }
    $this->registerBaseBindings();
    $this->registerBaseServiceProviders();
    $this->registerCoreContainerAliases();
}
```

### 2.2 绑定内核

laravel 根据 http 请求的环境,将请求分别发送至相应的http内核 `Http\Kernel::class` 和 console内核 `Console\Kernel::class`,  
无论 HTTP内核还是 Console内核,它们都是接收一个 HTTP请求,随后返回一个响应。  
在http内核中定义了【中间件】相关数组,在`Illuminate\Foundation\Http\Kernel` 类中,定义了属性 `$bootstrappers` 的引导程序数组

- 中间件 : 提供了一种方便的机制来过滤进入应用的 HTTP 请求。
- 引导程序:包括完成环境检测、配置加载、异常处理、Facades 注册、服务提供者注册、启动服务这六个引导程序。

```PHP
protected $bootstrappers = [
    \Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables::class,
    \Illuminate\Foundation\Bootstrap\LoadConfiguration::class,
    \Illuminate\Foundation\Bootstrap\HandleExceptions::class,
    \Illuminate\Foundation\Bootstrap\RegisterFacades::class,
    \Illuminate\Foundation\Bootstrap\RegisterProviders::class,
    \Illuminate\Foundation\Bootstrap\BootProviders::class,
];
```

### 2.3 注册异常处理

## 3.接收请求并响应

```PHP
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
$response->send();
```

### 3.1 解析内核程序

第二阶段已经将 http 内核和 console 内核绑定到了 app 服务容器,使用 app 服务容器的 make 方法,将内核解析出来

```Plaintext
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
```

- 内核实例化的时候又进行了哪些操作呢,进一步查看 Illuminate内核的\_\_construct(Illuminate$app, $router)构造方法，
- 它接收 APP 容器和路由器两个参数：在实例化内核时，构造函数内将在 HTTP 内核定义的「中间件组」注册到 路由器，注册完后就可以在实际处理 HTTP 请求前调用这些「中间件」实现 过滤 请求的目的。

```PHP
<?php
/**
 * Create a new HTTP kernel instance. 创建 HTTP 内核实例
 *
 * @class Illuminate\Foundation\Http\Kernel
 * @param  \Illuminate\Contracts\Foundation\Application  $app
 * @param  \Illuminate\Routing\Router  $router
 * @return void
 */
public function __construct(Application $app, Router $router)
{
    $this->app = $app;
    $this->router = $router;
    $router->middlewarePriority = $this->middlewarePriority;
    foreach ($this->middlewareGroups as $key => $middleware) {
        $router->middlewareGroup($key, $middleware);
    }
    foreach ($this->routeMiddleware as $key => $middleware) {
        $router->aliasMiddleware($key, $middleware);
    }
}
```

```PHP
<?php
/**
 * Register a group of middleware. 注册中间件组
 *
 * @class \Illuminate\Routing\Router
 * @param  string  $name
 * @param  array  $middleware
 * @return $this
 */
public function middlewareGroup($name, array $middleware)
{
    $this->middlewareGroups[$name] = $middleware;
    return $this;
}
/**
 * Register a short-hand name for a middleware. 注册中间件别名
 *
 * @class \Illuminate\Routing\Router
 * @param  string  $name
 * @param  string  $class
 * @return $this
 */
public function aliasMiddleware($name, $class)
{
    $this->middleware[$name] = $class;
    return $this;
}
```

### 3.2 处理 http 请求

之前的所有处理，基本都是围绕在配置变量、注册服务等运行环境的构建上，构建完成后才开始处理一个「HTTP 请求」。

处理请求包含两个阶段：

- 创建请求实例
- 处理请求

```PHP
<?php
// 处理请求
$response = $kernel->handle(
    // 创建请求实例
    $request = Illuminate\Http\Request::capture()
);
```

3.2.1 创建请求实例

```PHP
/**
 * Create a new Illuminate HTTP request from server variables.
 *
 * @class Illuminate\Http\Request
 * @return static
 */
public static function capture()
{
    static::enableHttpMethodParameterOverride();
    return static::createFromBase(SymfonyRequest::createFromGlobals());
}
/**
 * Create an Illuminate request from a Symfony instance.
 *
 * @see https://github.com/symfony/symfony/blob/master/src/Symfony/Component/HttpFoundation/Request.php
 * @param  \Symfony\Component\HttpFoundation\Request  $request
 * @return \Illuminate\Http\Request
 */
public static function createFromBase(SymfonyRequest $request)
{
    if ($request instanceof static) {
        return $request;
    }
    $content = $request->content;
    $request = (new static)->duplicate(
        $request->query->all(), $request->request->all(), $request->attributes->all(),
        $request->cookies->all(), $request->files->all(), $request->server->all()
    );
    $request->content = $content;
    $request->request = $request->getInputSource();
    return $request;
}
```

3.2.2 处理请求

```PHP
/**
 * Handle an incoming HTTP request.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
public function handle($request)
{
    try {
        $request->enableHttpMethodParameterOverride();
        $response = $this->sendRequestThroughRouter($request);
    } catch (Exception $e) {
        $this->reportException($e);
        $response = $this->renderException($request, $e);
    } catch (Throwable $e) {
        $this->reportException($e = new FatalThrowableError($e));
        $response = $this->renderException($request, $e);
    }
    $this->app['events']->dispatch(
        new Events\RequestHandled($request, $response)
    );
    return $response;
}
```

handle() 方法接收一个 HTTP 请求，并最终生成一个 HTTP 响应。继续深入到处理 HTTP 请求的方法 `$this->sendRequestThroughRouter($request)` 内部。

```PHP
/**
 * Send the given request through the middleware / router.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
protected function sendRequestThroughRouter($request)
{
    $this->app->instance('request', $request);
    Facade::clearResolvedInstance('request');
    $this->bootstrap();
    return (new Pipeline($this->app))
                ->send($request)
                ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
                ->then($this->dispatchToRouter());
}
```

这段代码完成了如下操作:

- 将 \$request 实例注册到 APP 容器 供后续使用;
- 清除之前 \$request 实例缓存;
- 启动「引导程序」;
- 发送请求至路由。3.2.2.1 启动引导程序

上述\$this->bootstrap();进行了引导程序的启动,调用了 app 容器的 bootstrapWith();

```PHP
/**
 * The bootstrap classes for the application. 应用的引导程序
 *
 * @var array
 */
protected $bootstrappers = [
    \Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables::class,
    \Illuminate\Foundation\Bootstrap\LoadConfiguration::class,
    \Illuminate\Foundation\Bootstrap\HandleExceptions::class,
    \Illuminate\Foundation\Bootstrap\RegisterFacades::class,
    \Illuminate\Foundation\Bootstrap\RegisterProviders::class,
    \Illuminate\Foundation\Bootstrap\BootProviders::class,
];
/**
 * Bootstrap the application for HTTP requests.
 *
 * @class Illuminate\Foundation\Http\Kernel
 * @return void
 */
public function bootstrap()
{
    if (! $this->app->hasBeenBootstrapped()) {
        $this->app->bootstrapWith($this->bootstrappers());
    }
}
/**
 * Get the bootstrap classes for the application.
 *
 * @return array
 */
protected function bootstrappers()
{
    return $this->bootstrappers;
}
/**
 * Get the bootstrap classes for the application.
 *
 * @return array
 */
protected function bootstrappers()
{
    return $this->bootstrappers;
}
```

看一下 Illuminate的 bootstrapWith()方法是如何来启动这些引导程序。

```PHP
/**
 * Run the given array of bootstrap classes.
 *
 * @class  Illuminate\Foundation\Application
 * @param  array  $bootstrappers
 * @return void
 */
public function bootstrapWith(array $bootstrappers)
{
    $this->hasBeenBootstrapped = true;
    foreach ($bootstrappers as $bootstrapper) {
        $this['events']->fire('bootstrapping: '.$bootstrapper, [$this]);
        $this->make($bootstrapper)->bootstrap($this);
        $this['events']->fire('bootstrapped: '.$bootstrapper, [$this]);
    }
}
```

我们看到在 APP 容器内，会先解析对应的「引导程序」,随后调用「引导程序」的 bootstrap() 完成的「引导程序」的启动操作。

- 引导程序列表:

```PHP
protected $bootstrappers = [
    /*
    |--------------------------------------------------------------------------
    | 环境检测,将.env配置信息载入到$_ENV变量中
    |--------------------------------------------------------------------------
    |Detect if a custom environment file matching the APP_ENV exists,
    */
    \Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables::class,
    /*
    |--------------------------------------------------------------------------
    | 加载配置文件
    |--------------------------------------------------------------------------
    |Load the configuration items from all of the files,
    */
    \Illuminate\Foundation\Bootstrap\LoadConfiguration::class,
    /*
    |--------------------------------------------------------------------------
    | 异常处理
    |--------------------------------------------------------------------------
    |Convert PHP errors to ErrorException instances
    */
    \Illuminate\Foundation\Bootstrap\HandleExceptions::class,
    /*
    |--------------------------------------------------------------------------
    | 注册Facades
    |--------------------------------------------------------------------------
    |注册完成后可以以别名的方式访问具体的类
    */
    \Illuminate\Foundation\Bootstrap\RegisterFacades::class,
    /*
    |--------------------------------------------------------------------------
    | 注册服务提供者
    |--------------------------------------------------------------------------
    |在「创建应用实例」已经将基础服务提供者注册到APP容器。在这里会将配置在 app.php文件夹下
    |providers节点的服务器提供者注册到 APP 容器,供请求处理阶段使用；
    */
    \Illuminate\Foundation\Bootstrap\RegisterProviders::class,
    //启动服务
    \Illuminate\Foundation\Bootstrap\BootProviders::class,
];
```

我们选取 Illuminate::class,来查看一下启动的原理,它的功能是加载配置文件。

```PHP
/**
 * Bootstrap the given application.
 *
 * @param  \Illuminate\Contracts\Foundation\Application  $app
 * @return void
 */
public function bootstrap(Application $app)
{
    $items = [];
    if (file_exists($cached = $app->getCachedConfigPath())) {
        $items = require $cached;
        $loadedFromCache = true;
    }
    $app->instance('config', $config = new Repository($items));
    if (! isset($loadedFromCache)) {
        $this->loadConfigurationFiles($app, $config);
    }
    $app->detectEnvironment(function () use ($config) {
        return $config->get('app.env', 'production');
    });
    date_default_timezone_set($config->get('app.timezone', 'UTC'));
    mb_internal_encoding('UTF-8');
}
/**
 * Load the configuration items from all of the files.
 *
 * @param  \Illuminate\Contracts\Foundation\Application  $app
 * @param  \Illuminate\Contracts\Config\Repository  $repository
 * @return void
 * @throws \Exception
 */
protected function loadConfigurationFiles(Application $app, RepositoryContract $repository)
{
    $files = $this->getConfigurationFiles($app);
    if (! isset($files['app'])) {
        throw new Exception('Unable to load the "app" configuration file.');
    }
    foreach ($files as $key => $path) {
        $repository->set($key, require $path);
    }
}
```

「创建 Laravel 应用实例」的时候执行了一步「注册应用的基础路径并将路径绑定到 APP 容器」的操作。当前,LoadConfiguration 类就是将 config 目录下的所有配置文件读取到一个集合中,这样我们就可以使用 config()辅助函数获取配置数据

- 以下为 config()助手函数的代码:

```PHP
if (! function_exists('config')) {
    /**
     * Get / set the specified configuration value.
     *
     * If an array is passed as the key, we will assume you want to set an array of values.
     *
     * @param  array|string  $key
     * @param  mixed  $default
     * @return mixed|\Illuminate\Config\Repository
     */
    function config($key = null, $default = null)
    {
        if (is_null($key)) {
            return app('config');
        }
        if (is_array($key)) {
            return app('config')->set($key);
        }
        return app('config')->get($key, $default);
    }
}
```

3.2.2.2 发送请求至路由

```PHP
/**
 * Send the given request through the middleware / router.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
protected function sendRequestThroughRouter($request)
{
    $this->app->instance('request', $request);
    Facade::clearResolvedInstance('request');
    $this->bootstrap();
    return (new Pipeline($this->app))
                ->send($request)
                ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
                ->then($this->dispatchToRouter());
}
```

在 「发送请求至路由」这行代码中,完成了四个不同的操作：

- 管道（pipeline）创建
- 将 \$request 传入管道
- 对 \$request 执行「中间件」处理
- 实际的请求处理先来看看\$this->dispatchToRouter() 这个方法:

```PHP
/**
 * Get the route dispatcher callback. 获取一个路由分发器匿名函数
 *
 * @return \Closure
 */
protected function dispatchToRouter()
{
    return function ($request) {
        $this->app->instance('request', $request);
        return $this->router->dispatch($request);
    };
}
```

在进行「解析内核实例」的时候已经将 Illuminate对象赋值给\$this->router 属性;

```PHP
<?php
class Router implements RegistrarContract, BindingRegistrar
{
    use Macroable {
        __call as macroCall;
    }
    /**
     * Dispatch the request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function dispatch(Request $request)
    {
        $this->currentRequest = $request;
        return $this->dispatchToRoute($request);
    }
    /**
     * Dispatch the request to a route and return the response. 将请求分发到路由并返回响应
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function dispatchToRoute(Request $request)
    {
        return $this->runRoute($request, $this->findRoute($request));
    }
    /**
     * Find the route matching a given request. 查找对应的路由实例
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Routing\Route
     */
    protected function findRoute($request)
    {
        $this->current = $route = $this->routes->match($request);
        $this->container->instance(Route::class, $route);
        return $route;
    }
    /**
     * Return the response for the given route. 运行给定的路由
     *
     * @param  Route  $route
     * @param  Request  $request
     * @return mixed
     */
    protected function runRoute(Request $request, Route $route)
    {
        $request->setRouteResolver(function () use ($route) {
            return $route;
        });
        $this->events->dispatch(new Events\RouteMatched($route, $request));
        return $this->prepareResponse($request,
            $this->runRouteWithinStack($route, $request)
        );
    }
    /**
     * Run the given route within a Stack "onion" instance. 通过一个实例栈运行给定的路由
     *
     * @param  \Illuminate\Routing\Route  $route
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    protected function runRouteWithinStack(Route $route, Request $request)
    {
        $shouldSkipMiddleware = $this->container->bound('middleware.disable') &&
                                $this->container->make('middleware.disable') === true;
        $middleware = $shouldSkipMiddleware ? [] : $this->gatherRouteMiddleware($route);
        return (new Pipeline($this->container))
                        ->send($request)
                        ->through($middleware)
                        ->then(function ($request) use ($route) {
                            return $this->prepareResponse(
                                $request, $route->run()
                            );
                        });
    }
}
```

执行\$route->run()的方法定义在 Illuminate类中,最终执行在「routes/web.php 配置的匹配到的控制器或匿名函数」:

```PHP
/**
 * Run the route action and return the response. 执行路由方法并返回响应
 *
 * @return mixed
 */
public function run()
{
    $this->container = $this->container ?: new Container;
    try {
        if ($this->isControllerAction()) {
            return $this->runController();
        }
        return $this->runCallable();
    } catch (HttpResponseException $e) {
        return $e->getResponse();
    }
}
```

其执行结果会通过 Illuminate::prepareResponse($request, $response)生一个响应实例并返回。至此,Laravel 就完成了一个 HTTP 请求的请求处理。

## 4.发送响应

```PHP
<?php
// 一
require __DIR__ . '/../vendor/autoload.php';
//二
$app = require_once __DIR__ . '/../bootstrap/app.php';
//三
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
$response->send();
$kernel->terminate($request, $response);
```

发送响应由 Illuminate父类 Symfony中的 send() 方法完成。

```PHP
/**
 * Sends HTTP headers and content.
 *
 * @return $this
 */
public function send()
{
    //发送响应头
    $this->sendHeaders();
    //发送报文主题
    $this->sendContent();
    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    } elseif (!\in_array(PHP_SAPI, array('cli', 'phpdbg'), true)) {
        static::closeOutputBuffers(0, true);
    }
    return $this;
}
```

## 5.程序终止

```PHP
/**
 * Call the terminate method on any terminable middleware.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \Illuminate\Http\Response  $response
 * @return void
 */
public function terminate($request, $response)
{
    $this->terminateMiddleware($request, $response);
    $this->app->terminate();
}
/**
 * Call the terminate method on any terminable middleware.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \Illuminate\Http\Response  $response
 * @return void
 */
protected function terminateMiddleware($request, $response)
{
    $middlewares = $this->app->shouldSkipMiddleware() ? [] : array_merge(
        $this->gatherRouteMiddleware($request),
        $this->middleware
    );
    foreach ($middlewares as $middleware) {
        if (! is_string($middleware)) {
            continue;
        }
        list($name) = $this->parseMiddleware($middleware);
        $instance = $this->app->make($name);
        if (method_exists($instance, 'terminate')) {
            $instance->terminate($request, $response);
        }
    }
}
```

以上便是 Laravel 的请求生命周期的始末。