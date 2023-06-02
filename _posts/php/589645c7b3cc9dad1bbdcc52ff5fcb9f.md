---
title: " 「转+」 Laravel 中间件的介绍以及使用"
date: 2022-04-20 19:01:03
toc: true
categories:
- ["Php","Laravel","深度阅读"]
---

## 介绍
Laravel 中间件提供了一种方便的机制来过滤进入应用的 HTTP 请求。

例如，Laravel 内置了一个中间件来验证用户的身份认证。如果用户没有通过身份认证，中间件会将用户重定向到登录界面。但是，如果用户被认证，中间件将允许该请求进一步进入该应用。

Laravel 自带了一些中间件，包括身份验证、CSRF 保护等。所有这些中间件都位于** app/Http/Middleware**``** **目录。




## 中间件的执行顺序说明
![](https://file.wulicode.com/note/2021/11-11/15-49-50888.png)

## 定义中间件
通过运行 `make:middleware` Artisan 命令来创建新的中间件：
```
php artisan make:middleware CheckAge
```
该命令将会在 `app/Http/Middleware` 目录下创建一个新的 `CheckAge`类，在这个中间件中，我们仅允许 `age` 参数大于 `200` 的请求对此路由进行访问，否则，我们将此用户重定向到 `home` 。
```
<?php
namespace App\Http\Middleware;
use Closure;
class CheckAge
{
    /**
     * 处理传入的请求
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
```
正如你所见，假如给定的 `age` 参数小于或等于 `200` ，这个中间件将返回一个 HTTP 重定向到客户端；否则，请求将进一步传递到应用中。要让请求继续传递到应用程序中（即允许「通过」中间件验证的），只需使用 `$request` 作为参数去调用回调函数 `$next` 。

最好将中间件想象为一系列 HTTP 请求必须经过才能进入你应用的「层」。每一层都会检查请求（是否符合某些条件），（如果不符合）甚至可以（在请求访问你的应用之前）完全拒绝掉。

### 前置 & 后置中间件
一个中间件在请求之前或者之后进行任务处理，取决于中间件的代码逻辑放置的位置。

前置中间件
```
<?php
namespace App\Http\Middleware;
use Closure;
class BeforeMiddleware
{
    public function handle($request, Closure $next)
    {
        // Perform action
        return $next($request);
    }
}
```
后置中间件
```
<?php
namespace App\Http\Middleware;
use Closure;
class AfterMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        // 执行操作
        return $response;
    }
}
```

## 注册中间件

### 全局中间件
假设你想让中间件在应用处理每个 HTTP 请求期间运行，只需要在 `app/Http/Kernel.php` 中的 `$middleware`属性中列出这个中间件

### 为路由分配中间件
假设你想为指定的路由分配中间件，首先应该在 `app/Http/Kernel.php` 文件内为该中间件分配一个 `键` 。默认情况下， `Kernel` 类的 `$routeMiddleware` 属性下包含了 Laravel 内置的中间件。若要加入自定义的中间件，只需把它附加到列表后并为其分配一个自定义 `键` 即可。例如：
```
// 在 App\Http\Kernel 类中
protected $routeMiddleware = [
    'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
];
```
一旦在 `Kernel` 类中定义好了中间件，就可以通过 `middleware` 方法将为路由分配中间件：
```
Route::get('admin/profile', function () {
    //
})->middleware('auth');
```
你也可以为路由分配多个中间件：
```
Route::get('/', function () {
    //
})->middleware('first', 'second');
```
分配中间件时，你还可以传递完整的类名：
```
use App\Http\Middleware\CheckAge;
Route::get('admin/profile', function () {
    //
})->middleware(CheckAge::class);
```

### 中间件群组
某些时候你可能希望使用一个 key 把多个中间件打包成一个组，方便将他们应用到路由中。你可以使用 Http kernel 的 `$middlewareGroups` 属性。

Laravel 内置了 `web` 和 `api` 两个中间件组，它们包含了常用的中间件,你可能会想应用到 web UI 和 API 路由中：
```
/**
 * 应用程序的路由中间件组
 *
 * @var array
 */
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
    'api' => [
        'throttle:60,1',
        'auth:api',
    ],
];
```
中间件组和单个中间件一样可以被应用到路由和控制器行为中。同时，中间组很方便得将多个中间件一次性应用到路由上：
```
Route::get('/', function () {
    //
})->middleware('web');
Route::group(['middleware' => ['web']], function () {
    //
});
```

## 中间件参数
中间件也可以接受额外的参数。举个例子，假如你的应用需要在执行特定操作之前验证用户是否为给定的 「角色」，你可以通过创建一个 `CheckRole` 中间件，由它来接收「角色」名称作为附加参数。他应该是放在$next 之后

附加的中间件参数应该在 `$next` 参数之后被传递：
```
<?php
namespace App\Http\Middleware;
use Closure;
class CheckRole
{
    /**
     * 处理传入的参数
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (! $request->user()->hasRole($role)) {
            // 重定向
        }
        return $next($request);
    }
}
```
定义路由时通过一个 `:` 来隔开中间件名称和参数来指定中间件参数。多个参数就使用逗号分隔：
```
Route::put('post/{id}', function ($id) {
    //
})->middleware('role:editor');
```

## Terminable 中间件
有时中间件可能需要在 HTTP 响应发送到浏览器之后处理一些工作。比如，Laravel 内置的「session」中间件会在响应发送到浏览器之后将会话数据写入存储器中。如果你在中间件中定义一个 `terminate` 方法，则会在响应发送到浏览器后自动调用：
```
<?php
namespace Illuminate\Session\Middleware;
use Closure;
class StartSession
{
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
    public function terminate($request, $response)
    {
        // Store the session data...
    }
}
```
`terminate` 方法应该同时接收和响应。一旦定义了这个中间件，你应该将它添加到路由列表或 `app/Http/Kernel.php` 文件的全局中间件中。

在你的中间件上调用 `terminate` 调用时，Laravel 会从 [服务容器](https://laravel-china.org/docs/laravel/5.6/container) 中解析出一个新的中间件实例。如果要在调用 `handle` 和 `terminate` 方法时使用同一个中间件实例，就使用容器的 singleton 方法向容器注册中间件。

## 参考文章

- https://www.cnblogs.com/lxwphp/p/9143495.html
- [https://learnku.com/laravel/t/3218/laravel53-middleware-and-controller-construction-method-execution-sequence-problem](https://learnku.com/laravel/t/3218/laravel53-middleware-and-controller-construction-method-execution-sequence-problem)

