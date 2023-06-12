# Laravel - FAQ

## Laravel 6.0 升级到 6.x 记录

### composer 2.0

> composer 2.0 版本和 laravel 6.0 版本不兼容

这个是 laravel 6.0 lts 版本的问题, 由于更改了加载方式, 这个方式在 6.0 版本中没有被修复导致的问题,
可以查看 : [https://github.com/composer/composer/issues/9340](https://github.com/composer/composer/issues/9340)

对于 laravel 版本的支持程度可以查看

![image.png](https://file.wulicode.com/yuque/202210/26/15/2012UOTsUYCG.png?x-oss-process=image/resize,h_355)

这里的解决问题的办法是强制使用 composer 1.x 版本

```
$ composer self-update --1
```

### 相关组件

为了使用 composer 2.x, 我把 laravel 6.0 升级到 6.x , 因为 laravel 自 6.18 之后才支持 composer 2, 同时升级的组件还有

```json
{
    ...
    "require": {
        tucker-eric/eloquentfilter: "~2"
        =>
        "3"
    },
    "require-dev": {
        "itsgoingd/clockwork": "~4.0"
        =>
        "~5.0"
        "barryvdh/laravel-ide-helper": "~2.7"
        =>
        "~2.*"
        "doctrine/dbal": "^2.5"
        =>
        "^3"
    }
    ...
}
```

### Method Monolog\Logger::addDebug() does not exist

重新命名一下之前的 `ide-helper.php` 重新发布一下配置

```
$ php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
```

移除 Log 部分

```diff
'magic' => [
-   'Log' => [
-     'debug'     => 'Monolog\Logger::addDebug',
-     'info'      => 'Monolog\Logger::addInfo',
-     'notice'    => 'Monolog\Logger::addNotice',
-     'warning'   => 'Monolog\Logger::addWarning',
-     'error'     => 'Monolog\Logger::addError',
-     'critical'  => 'Monolog\Logger::addCritical',
-     'alert'     => 'Monolog\Logger::addAlert',
-     'emergency' => 'Monolog\Logger::addEmergency',
-  ],
],
```

## Laravel 5.5 升级到 6.0 记录

### 1. 可以选择缓存使用 phpredis/predis

phpredis : 指的是使用 pecl 安装的 php 扩展 redis

predis   : 指的是 github 上的 predis/predis 的包

Laravel 推荐使用 `phpredis` 来代替 `predis`。原因是 `predis` 包很长时间没有更新

所以要记得先安装 `phpredis`, 然后在 `config/app.php` 中去掉 `Redis` 别名

**Mac 安装**

```shell
# 这里需要将当前版本设置为主版本才可以, 如果不是主版本则安装会太费劲
$ brew link --force php@{version}
$ pecl install igbinary
$ pecl install redis
$ brew services restart php@7.2
```

**其他平台**

应该是直接安装即可(未测试)

项目中在考虑兼容的情况下, 使用 predis, 暂时不启用 phpredis.

### 2. Unable to create configured logger. Using emergency logger

在 5.6 之后已经将配置文件独立 [config/logging.php](https://github.com/laravel/laravel/blob/master/config/logging.php), 将这个文件放置到指定目录, 然后 `app.php`
移除日志的配置 `Logging Configuration`

### 3. Call to undefined method Illuminate\Events\Dispatcher::fire()

在 (5.8 升级指南)([https://laravel.com/docs/5.8/upgrade](https://laravel.com/docs/5.8/upgrade)) 指出,

_Likelihood Of Impact: Low_

```
deprecated and removed
Events The fire Method
```

使用 dispatch 方法替代 `You should use the dispatch method instead.`

### 4. Class 'Illuminate\Support\Facades\Input' not found

使用 Request 替代 Input

`Input` no longer exists. Either use the `Request` facade or alias that instead of `Input`.

### 5. str_contains 等 helper 函数

这些函数均需要替换成静态函数方法 `Str::contains`

下面是 辅助函数列表

[5.1 辅助函数列表](https://learnku.com/docs/laravel/5.1/helpers/1068)

## Laravel 使用

### Laravel 错误 Class log does not exist ...

> Fatal error: Uncaught exception 'ReflectionException' with message 'Class log does not exist' in
> /Users/freek/dev/laravel/vendor/laravel/framework/src/Illuminate/Container/Container.php:776

出现这种问题的原因是不能够加载 log 方法. 原因是在加载的时候会加载 config 文件的数据, 而 config 文件中的配置是批量加载的, 所以在自己加载的时候 config
文件的写法不支持自定义的函数变量/ 常量/ 自定义方法.

所以从配置文件入手, 删除未加载的配置文件, 删除未导入包的配置文件.

这种问题一般出现在 复制项目, 并且删除了包的情况下.

### 控制器数值类不能使用 int 类型

> Argument 1 passed to Poppy\Sms\Http\Request\Backend\SmsController::destroy() must be of the type int or null, string given, called in
> /Users/duoli/Documents/workbench/dl.poppy/dev-v4/vendor/laravel/framework/src/Illuminate/Routing/Controller.php on line 54

需要对控制器进行如下调整

```diff
- public function destroy(int $id = null)
+ public function destroy(string $id = null)
{
...
}
```

### Laravel 5.3+ 控制器里如何获取登录用户

原文地址: [Laravel 5.3+ 控制器里如何获取登录用户](https://laravel-china.org/topics/3355/how-to-get-login-user-in-laravel-53-controller)

应该不少同学都遇到这个问题了：5.3 起，由于框架运行流程的修改，你无法在控制器的构造函数里获取登录用户，那么我们怎么办呢？以下是几个方法：

- 不再从构造函数取用户

我们可以从 request 中获取登录用户：`request()->user()`。

- 或者在控制器方法里我们使用  `Auth::user()`

除了上面的折中的办法，我们一定要在构造函数搞定的话那么请看这里：

```
protected $user;
public function __construct()
{
    $this->middleware(function ($request, $next) {
        $this->user = $request->user();
        return $next($request);
    });
}
```

这样你就可以在其它方法里使用  `$this->user`  来访问当前登录用户了。

FYI:  [[5.3] Controller closure middleware](https://github.com/laravel/framework/pull/15080)

### 使用 Faker 获取假数据

`Laravel`  源码中是在  `DatabaseServiceProvider`  中注册的国际化支持。

```
// vendor/laravel/framework/src/Illuminate/Database/DatabaseServiceProvider.php
protected function registerEloquentFactory()
{
    $this->app->singleton(FakerGenerator::class, function ($app) {
        return FakerFactory::create($app['config']->get('app.faker_locale', 'en_US'));
    });
    $this->app->singleton(EloquentFactory::class, function ($app) {
        return EloquentFactory::construct(
            $app->make(FakerGenerator::class), $this->app->databasePath('factories')
        );
    });
}
```

```
$ php artisan tinker
Psy Shell v0.9.9 (PHP 7.2.15 — cli) by Justin Hileman
>>> app(\Faker\Generator::class)->phoneNumber
=> "13977433809"
```

## 参考

- [Class log does not exist](https://laracasts.com/discuss/channels/general-discussion/class-log-does-not-exist)