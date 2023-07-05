---
title: "「译」Laravel 5.0 之 Middleware (Filter-Style)"
date: 2022-04-14 22:27:38
toc: true
categories:
- ["Php","Laravel"]
---

# 「译」Laravel 5.0 之 Middleware (Filter-Style)
[暂无评论](http://www.ofcss.com/2015/02/21/laravel-5-middleware-filter-style.html#respond)

本文译自  [Matt Stauffer](http://mattstauffer.co/)  的[系列文章](http://mattstauffer.co/tags/laravel+5).

- [Laravel 5.0 之表单验证](http://www.ofcss.com/2015/02/10/laravel-5-form-requests.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-form-requests)
- [Laravel 5.0 之 ValidatesWhenResolved](http://www.ofcss.com/2015/02/11/laravel-5-validateswhenresolved.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-validateswhenresolved)
- [Laravel 5.0 之目录结构与命名空间](http://www.ofcss.com/2015/02/12/laravel-5-directory-structure-and-namespace.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-directory-structure-and-namespace)
- [Laravel 5.0 之路由缓存](http://www.ofcss.com/2015/02/12/laravel-6-route-caching.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-route-caching)
- [Laravel 5.0 之云存储驱动](http://www.ofcss.com/2015/02/13/laravel-5-cloud-file-drivers.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-cloud-file-drivers)
- [Laravel 5.0 之方法注入](http://www.ofcss.com/2015/02/15/laravel-5-method-injection.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-method-injection)
- [Laravel 5.0 之 Middleware (Filter-Style)](http://www.ofcss.com/2015/02/21/laravel-5-middleware-filter-style.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-middleware-filter-style)
- [Laravel 5.0 之 运行环境及环境变量](http://www.ofcss.com/2015/02/22/laravel-5-environment-detection-and-environment-variables.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-environment-detection-and-environment-variables)
- [Laravel 5.0 之事件调度程序 (定时任务)](http://www.ofcss.com/2015/02/22/laravel-5-event-scheduling.html)[  [查看原文]](http://mattstauffer.co/blog/laravel-5.0-event-scheduling)
- [Upgrading from Laravel 4 to Laravel 5 (待译...)](http://mattstauffer.co/blog/upgrading-from-laravel-4-to-laravel-5)
- [Bringing Whoops Back to Laravel 5 (待译...)](http://mattstauffer.co/blog/bringing-whoops-back-to-laravel-5)
- [Laravel 5.0 - Commands & Handlers (待译...)](http://mattstauffer.co/blog/laravel-5.0-commands-and-handlers)
- [Laravel 5.0 - Events & Handlers (待译...)](http://mattstauffer.co/blog/laravel-5.0-events-and-handlers)
- [Laravel 5.0 - Generating Missing Events (待译...)](http://mattstauffer.co/blog/laravel-5.0-generating-missing-events)
- [Laravel 5.0 - Custom Error Pages (待译...)](http://mattstauffer.co/blog/laravel-5.0-custom-error-pages)
- [Laravel 5.0 - Eloquent Attribute Casting (待译...)](http://mattstauffer.co/blog/laravel-5.0-eloquent-attribute-casting)

---

如果你有阅读我之前的 Laravel 5.0 系列文章，你可能已经注意到路由过滤器(route filters)的变化：它们先是移到了单独的目录和类结构，然后就莫名其妙地消失了。你可能还留意到在原本应该是路由过滤器的地方，变成了对 Middleware 的引用。

实际上给 Laravel 应用添加自定义的 Middleware 在以前的版本中就有了。 Chris Fidao 的  [HTTP Middleware in Laravel 4.1](http://fideloper.com/laravel-http-middleware)  对 middleware 做了全面的介绍，包括 middleware 在 Laravel 4.1 版本中的工作机制。
> 提示：过滤器在 Laravel 核心代码中依然存在，所以你依然可以使用。但是在需要对路由进行修饰时，更推荐采用的是 middleware.





## Middleware 是什么？
Middleware 有点不好理解。你可以先看看下面这张从  [StackPHP](http://stackphp.com/)  借来的图。假设你的应用——路由，控制器，业务逻辑——是图中的绿色部分，从图中可以清晰地看到，用户请求先经由多个中间层才能到达你的应用，然后再经由更多的中间层进行处理。每个特定的中间层都可以在应用逻辑之前、之后进行处理，或者同时在应用逻辑之前和之后进行处理。

[![](https://file.wulicode.com/yuque/202208/04/14/58267YzFumUM.png?x-oss-process=image/resize,h_329)](http://file.ofcdn.com/attachments/2015/02/onion.png)

这就是 middleware 实现修饰模式的工作方式：它捕获请求，做一些处理，然后把处理后的请求对象返回给下一个堆栈层。

Laravel 默认使用 middleware 来处理加密/解密和 cookies 队列、读取和写入 sessions, 但除此之外你还可以用 middleware 来向请求/响应环中加入你需要的任何一种操作层。比如速率限制、自定义请求解析等。

## 怎么编写 middleware?
通过执行 artisan 命令：

| `$ php artisan  ``make``:middleware MyMiddleware` |
| --- |

这条命令会生成一个简单的 middleware 文件，代码如下：

| `namespace` `App\Http\Middleware;`

  

`use` `Closure;`

`use` `Illuminate\Contracts\Routing\Middleware;`

  

`class` `MyMiddleware  ``implements` `Middleware {`

  

`        ``/**`

`        ``* 处理输入请求`

`        ``*`

`        ``* @param   \Illuminate\Http\Request   $request`

`        ``* @param   \Closure   $next`

`        ``* @return mixed`

`        ``*/`

`        ``public` `function` `handle(``$request``, Closure  ``$next``)`

`        ``{`

`                ``//`

`        ``}`

  

`}` |
| --- |

如你所见，所有 middleware 的基础是  `handle`  方法，它接受两个参数：

- `$request`: Illuminate Request 对象
- `$next`: Closure(匿名函数), 该函数把 request 对象传递给后续的 middleware.

还记得之前那个荒谬的[“阻止奇数端口请求的 ValidatesWhenResolved 对象”](http://www.ofcss.com/2015/02/11/laravel-5-validateswhenresolved.html)的例子吗？很好，现在再把它拿过来，改成 middleware 风格的：

| `namespace` `App\Http\Middleware;`

  

`use` `Closure;`

`use` `Illuminate\Contracts\Routing\Middleware;`

  

`class` `MyMiddleware  ``implements` `Middleware {`

  

`        ``/**`

`          ``* Handle an incoming request.`

`          ``*`

`          ``* @param   \Illuminate\Http\Request   $request`

`          ``* @param   \Closure   $next`

`          ``* @return mixed`

`          ``*/`

`        ``public` `function` `handle(``$request``, Closure  ``$next``)`

`        ``{`

`                ``// Test for an even vs. odd remote port`

`                ``if` `((``$request``->server->get(``'REMOTE_PORT'``) / 2) % 2 > 0)`

`                ``{`

`                        ``throw` `new` `\Exception(``"WE DON'T LIKE ODD REMOTE PORTS"``);`

`                ``}`

  

`                ``return` `$next``(``$request``);`

`        ``}`

  

`}` |
| --- |


## 如何使用 Middleware?
在 Laravel 5 中有两种主要的方法可以绑定 middleware. 两种方法都从  `App\Http\Kernel`  开始。

你可能注意到了，新的  `Kernel`  类有两个属性：  `$middleware`  和  `$routeMiddleware`. 这两个属性都是 middleware 为元素的数组。在  `$middleware`  中的 middleware 会在每次请求时运行，而`$routeMiddleware`  中的 middleware 必须被启用才会运行。

在本文写作时，`$middleware`  中默认包含的有五个 middlewares:

| `protected` `$middleware` `= [`

`                ``'Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode'``,`

`                ``'Illuminate\Cookie\Middleware\EncryptCookies'``,`

`                ``'Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse'``,`

`                ``'Illuminate\Session\Middleware\StartSession'``,`

`                ``'Illuminate\View\Middleware\ShareErrorsFromSession'``,`

`                ``'Illuminate\Foundation\Http\Middleware\VerifyCsrfToken'``,`

`        ``];` |
| --- |

此外还有三个可选的 middlewares:

| `protected` `$routeMiddleware` `= [`

`                ``'auth'` `=  ``'App\Http\Middleware\Authenticate'``,`

`                ``'auth.basic'` `=>  ``'Illuminate\Auth\Middleware\AuthenticateWithBasicAuth'``,`

`                ``'guest'` `=>  ``'App\Http\Middleware\RedirectIfAuthenticated'``,`

`        ``];` |
| --- |

从上面的代码中可以看到， 在新版本中默认可用的可选路由 middleware 与旧版本中默认可用的可选过滤器(filter)是一样的，除了一个例外——CSRF 表单保护在新版本中默认是对所有路由默认启用的——这非常重要。

## 在每次请求时执行 middleware
下面，我们从让自己的 middleware 在每次请求时都执行开始。很简单，只要把它加到  `$middleware`  数组中：

| `protected` `$middleware` `= [`

`                ``'App\Http\Middleware\MyMiddleware'``,  ``// 这是自定义的`

`                ``'Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode'``,`

`                ``'Illuminate\Cookie\Middleware\EncryptCookies'``,`

`                ``'Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse'``,`

`                ``'Illuminate\Session\Middleware\StartSession'``,`

`                ``'Illuminate\View\Middleware\ShareErrorsFromSession'``,`

`                ``'Illuminate\Foundation\Http\Middleware\VerifyCsrfToken'``,`

`        ``];` |
| --- |

现在每次请求时它都会被执行了。

## 在特定的路由上执行 middleware
OK, 接下来把我们的自定义 middleware 移到可选堆栈，要给它指定一个 key:

| `protected` `$routeMiddleware` `= [`

`                ``'auth'` `=  ``'App\Http\Middleware\Authenticate'``,`

`                ``'auth.basic'` `=>  ``'Illuminate\Auth\Middleware\AuthenticateWithBasicAuth'``,`

`                ``'guest'` `=>  ``'App\Http\Middleware\RedirectIfAuthenticated'``,`

`                ``'absurd'` `=>  ``'App\Http\Middleware\MyMiddleware'``,  ``// 这是自定义的`

`        ``];` |
| --- |

现在我们可以在 routes.php 文件中或者在基础控制器(BaseController)中用  `$this->middleware()`  方法来调用自定义的 middleware 了。

### 在控制器中调用：
| `...`

`use` `Illuminate\Routing\Controller;`

  

`class` `AwesomeController  ``extends` `Controller {`

  

`        ``public` `function` `__construct()`

`        ``{`

`                ``$this``->middleware(``'csrf'``);`

`                ``$this``->middleware(``'auth'``, [``'only'` `=>  ``'update'``])`

`        ``}`

  

`}` |
| --- |


### 在 routes.php 文件中调用：
| `// Routes.php`

  

`// Single route`

`$router``->get(``"/awesome/sauce"``,  ``"AwesomeController@sauce"``, [``'middleware'` `=>  ``'auth'``]);`

  

`// Route group`

`$router``->group([``'middleware'` `=>  ``'auth'``],  ``function``() {`

`        ``// lots of routes that require auth middleware`

`});` |
| --- |


## 如何通过 middleware 实现  `before`  和  `after`  过滤器？
我花了一些时间来研究这个问题，但 Taylor(译注：Laravel 框架作者) 指出了 "before" middleware 和 "after" middleware 的区别在于 middleware 的行为是发生在它调用  `$next()`  之前还是之后：

| `...`

`class` `BeforeMiddleware  ``implements` `Middleware {`

  

`        ``public` `function` `handle(``$request``, Closure  ``$next``)`

`        ``{`

`                ``// Do Stuff`

`                ``return` `$next``(``$request``);`

`        ``}`

  

`}` |
| --- |

| `...`

`class` `AfterMiddleware  ``implements` `Middleware {`

  

`        ``public` `function` `handle(``$request``, Closure  ``$next``)`

`        ``{`

`                ``$response` `=  ``$next``(``$request``);`

`                ``// Do stuff`

`                ``return` `$response``;`

`        ``}`

  

`}` |
| --- |

如你所见， "before" middleware 先执行操作，然后把请求向堆栈传递。而 "after" middleware 是先调用`$next()`  方法让请求被堆栈处理，之后再对它执行操作。

## 写在最后
如果你还不熟悉 middleware, 你的大脑可能会被它的概念纠缠一会儿。从我们考虑控制器及路由请求的常规思维方式的角度来说，过滤器(filter)会更容易理解一些。但 middleware ——这种在堆栈中传递单一请求，让它一点一点被处理的概念——其实更整洁、更简单、更灵活。

不仅如此，middleware 不只是在 Laravel 应用中处理请求的额外的一种强大而高效的手段，它在其它方面也能有很好的表现。Laravel 5.0 中的 middleware 语法与 StackPHP 的语法不完全兼容。但如果你采用基于 middleware 的架构来组织你的请求/响应堆栈，这是在依赖关系分离方向上的一个进步。而且要修改一个 Laravel middleware 使之可以在单独的 StackPHP 风格的语法下工作，也花不了多少工夫。

有任何意见，欢迎留下评论或者通过 Twitter 与  [@stauffermatt](http://twitter.com/stauffermatt)  进行交流。
