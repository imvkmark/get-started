---
title: "「译」Laravel 5.0 之方法注入"
date: 2022-04-14 22:27:40
toc: true
categories:
- ["Php","Laravel"]
---

# 「译」Laravel 5.0 之方法注入
[暂无评论](http://www.ofcss.com/2015/02/15/laravel-5-method-injection.html#respond)

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

Laravel 5.0 中, 容器可以对其解析的方法进行自动分析, 然后根据类型限制把方法所需要的依赖项自动注入. 本文将介绍这一机制的原理, 何时解析, 如何注入等.




## 依赖注入的背景知识
在现代编程实践中, PHP 开发者要学会的首要知识之一就是使用依赖注入. 这就是 SOLID(**单一功能**,  **开闭原则**,  **里氏替换**,  **接口隔离**以及**依赖反转**) 中的  **依赖反转(Dependency Inversion)**.

Laravel 的  [容器](http://laravel.com/docs/4.2/ioc)  被称为 IOC(Inversion of Control) 容器, 之所以如此命名, 是因为它允许开发者掌控应用底层所发生的事件: 在顶层代码(controllers, 扩展类等)中请求一个实例, 比如 "mailer", 容器就会返回一个 "mailer" 的实例. 这样, 顶层代码不关注底层到底是由哪个服务来发送邮件--不管是 Mandrill, Mailgun 还是 SendMail, 都不重要, 因为所有 mailer 类都实现相同的接口.

## Laravel 4 中的构造函数注入
下面是一个以前的依赖注入的示例:

| `...`

`class` `Listener`

`{`

`        ``protected` `$mailer``;`

  

`        ``public` `function` `__construct(Mailer  ``$mailer``)`

`        ``{`

`                ``$this``->mailer =  ``$mailer``;`

`        ``}`

  

`        ``public` `function` `userWasAdded(User  ``$user``)`

`        ``{`

`                ``// Do some stuff...`

  

`                ``$this``->mailer->send(``'emails.welcome'``, [``'user'` `=>  ``$user``],  ``function``(``$message``)`

`                ``{`

`                        ``$message``->to(``$user``->email,  ``$user``->name)->subject(``'Welcome!'``);`

`                ``});`

`        ``}`

`}` |
| --- |

从例子中可以看到, 可以通过构造函数把 Mailer 类注入到对象. Laravel 的容器让实例化这样的一个类变得很容易, 因为它会自动把依赖项注入构造函数. 比如, 我们可以创建该类的一个新实例, 但不需要传入 Mailer. 因为 Laravel 自动分析构造函数, 知道并且自动替我们注入了这个对象.

| `$listener` `= App::make(``'Listener'``);` |
| --- |

这很方便, 因为

1. 在应用中可以只定义一次 Mailer 的具体实现, 而不是每次都要指定.
2. 由于采用了依赖注入, 更便于进行测试.

## 冲突
假如只是对象中的某一个方法需要用到注入的类呢? 构造函数会因为很多只用到一次的注入变得非常凌乱.

另一种情况, 假如需要通过注入类执行某些操作, 但只针对特定的方法执行呢? 比如 FormRequests 和 ValidatesUponResolved.

## 解决方案
上述问题的解决方案就是方法注入: 类似构造函数注入, 但允许容器要调用某个方法的时候直接给该方法注入依赖项.

我觉得方法注入最普遍的应用场景就是控制器(controllers). 比如前文提到的 FormRequests 就是一个最好的例子. 但有关 FormRequests 之前已经有详细的介绍, 所以这次我们举点别的例子:

| `...`

`class` `DashboardController  ``extends` `Controller`

`{`

`        ``public` `function` `showMoneyDashboard(MoneyRepository  ``$money``)`

`        ``{`

`                ``$usefulMoneyStuff` `=  ``$money``->getUsefulStuff();`

`                ``return` `View::make(``'dashboards.money'``)`

`                        ``->with(``'stuff'``,  ``$usefulMoneyStuff``);`

`        ``}`

  

`        ``public` `function` `showTasksDashboard(TasksRepository  ``$tasks``)`

`        ``{`

`                ``$usefulTasksStuff` `=  ``$tasks``->getUsefulStuff();`

`                ``return` `View::make(``'dashboards.tasks'``)`

`                        ``->with(``'stuff'``,  ``$usefulTasksStuff``);              `

`        ``}`

  

`        ``public` `function` `showSupervisionDashboard(SupervisionRepository  ``$supervision``)`

`        ``{`

`                ``$usefulSupervisionStuff` `=  ``$supervision``->getUsefulStuff();`

`                ``return` `View::make(``'dashboards.supervision'``)`

`                        ``->with(``'stuff'``,  ``$usefulSupervisionStuff``);`

`        ``}`

`}` |
| --- |

我们把控制器的 public methods 映射到路由, 用户访问对应的路由时, 容器会调用这些方法, 并自动注入指定的依赖项. 非常棒, 非常简洁.

## 容器在什么时候会解析方法
前文介绍的控制器方法会被容器解析. ServiceProvider 的  `boot`  方法也会. 实际上你可以根据你的需要指定容器对任何方法进行解析. 比如:

| `...`

`class` `ThingDoer`

`{`

`        ``public` `function` `doThing(``$thing_key``, ThingRepository  ``$repository``)`

`        ``{`

`                ``$thing` `=  ``$repository``->getThing(``$thing_key``);`

`                ``$thing``->``do``();`

`        ``}`

`}` |
| --- |

然后可以在控制器中通过  `App::call()`  来调用它.  `App::call()`  的第二个参数是可选的, 它接受以数组方式提供的被调用方法所需的参数:

| `namespace` `App\Http\Controllers;`

  

`use` `Illuminate\Contracts\Container\Container;`

`use` `Illuminate\Routing\Controller;`

  

`class` `ThingController  ``extends` `Controller`

`{`

`        ``public` `function` `doThing(Container  ``$container``)`

`        ``{`

`                ``$thingDoer` `=  ``$container``->make(``'ThingDoer'``);`

  

`                ``// 调用 $thingDoer 对象的 doThing 方法, 并传入 $thing_key 参数,`

`                ``// 参数的值是 'awesome-parameter-here'`

`                ``$container``->call(`

`                        ``[``$thingDoer``,  ``'doThing'``],`

`                        ``[``'thing_key'` `=>  ``'awesome-parameter-here'``]`

`                ``);`

`        ``}`

`}` |
| --- |


## 写在最后
在 Laravel 核心代码中, 用方法注入实现了一些有用的系统功能, 比如 FormRequest. 但别让这些案例局限了你的思维. 它只是让代码保持精简的一个手段, 而我们都需要简洁的代码.

