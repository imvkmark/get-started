---
description: 'Laravel 8.x升级至9.x涉及getFacadeAccessor方法；7.0升8.x包括index.php维护模式、failed_jobs uuid字段、分页默认tailwindcss、队列方法调整、Seeder/Factory独立命名空间、任务链支持。6.x升7.0涉及Symfony 5、Resource类移除、ThrottlesLogins traits移除、日期序列化、邮件配置、队列移除--daemon标记。5.5升6.0包括缓存选择、日志错误、fire方法、helper函数等。'
lastUpdated: '2026-06-21 20:39:30'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel 升级记录'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Laravel 8.x升级至9.x涉及getFacadeAccessor方法；7.0升8.x包括index.php维护模式、failed_jobs uuid字段、分页默认tailwindcss、队列方法调整、Seeder/Factory独立命名空间、任务链支持。6.x升7.0涉及Symfony 5、Resource类移除、ThrottlesLogins traits移除、日期序列化、邮件配置、队列移除--daemon标记。5.5升6.0包括缓存选择、日志错误、fire方法、helper函数等。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/primer/upgrade-logs.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/e43d772a174428bc5996904ba9e383ce.png'
---
# Laravel 升级记录

## Laravel 8.x 升级到 9.x

### getFacadeAccessor 方法

该 getFacadeAccessor 方法必须始终返回容器绑定键。在之前的 Laravel 版本中，这个方法可以返回一个对象实例；但是，不再支持此行为。如果您已经编写了自己的外观，则应确保此方法返回容器绑定字符串：

```Plaintext
/**
 * Get the registered name of the component.
 *
 * @return string
 */
protected static function getFacadeAccessor()
{
    return Example::class;
}
```

## Laravel 7.0 升级到 8.x 记录

### index.php 增加维护模式

```Plaintext
define('LARAVEL_START', microtime(true));

if (file_exists(__DIR__.'/../storage/framework/maintenance.php')) {
    require __DIR__.'/../storage/framework/maintenance.php';
}
```

### 增加 `failed_jobs` 的 uuid 字段

- 需要执行 failed_jobs 的 migration
- 修改 `queue` 配置文件中的 `failed.driver` 配置项的值为 `database-uuids`

### 导出的分页工具默认使用 tailwindcss

需要重新导出

```Plaintext
php artisan vendor:publish --force

| Provider: Illuminate\Pagination\PaginationServiceProvider  
```

### 队列的两个方法调整

- **`retryAfter` → `backoff`**
- **`timeoutAt` → `retryUntil`**

### 8.5 Seeder 和 Factory 有独立的命名空间

移除 autoload 的 classmap, 增加新的目录映射关系

```JSON
{
  "autoload": {
    "psr-4": {
      "App\\": "app/",
      "Database\\Factories\\": "database/factories/",
      "Database\\Seeders\\": "database/seeders/"
    }
  }
}
```

### 8.5 支持任务链使用

任务链一起使用的 `allOnQueue()` 和 `allOnConnection()` 方法已经移除。您可以使用 `onQueue()` 和 `onConnection()` 方法代替

```PHP
ProcessPodcast::withChain([
    new OptimizePodcast,
    new ReleasePodcast
])->onConnection('redis')->onQueue('podcasts')->dispatch();
```

## Laravel 6.x 升级到 7.0 记录

### symfony 5 相关更新

**App\Exceptions\Handler**

`App\Exceptions\Handler` 的 `report` 和 `render` 方法之前接受 `Exception` 实例, 现在接收 `Throwable` 接口

```PHP
use Throwable;

public function report(Throwable $exception);
public function render($request, Throwable $exception);
```

**session 配置文件更新**

`session.php` 中的 `secure` 选项, 让其拥有一个值为 `null` 的默认值, 并更新 `same_site` 的值为 `lax`

```PHP
'secure' => env('SESSION_SECURE_COOKIE', null),

'same_site' => 'lax',
```

参考

[Cookie 的 SameSite 属性 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)

Cookie 的 SameSite 属性

### Illuminate\Http\Resources\Json\Resource 移除

弃用的 `Illuminate\Http\Resources\Json\Resource` 类已被正式移除。你的资源应当继承 `Illuminate\Http\Resources\Json\JsonResource` 类作为替代

### traits `ThrottlesLogins` 移除

使用 `\Poppy\Core\Classes\Traits\ThrottlesLogins` 替代, 这是因为脚手架工具都已经移动到 `laravel/ui` 仓库, 但是我们的登录中是用到这个限流的, 所以进行了更新, 源文件

[ui/auth-backend/ThrottlesLogins.php at 2.x · laravel/ui](https://github.com/laravel/ui/blob/2.x/auth-backend/ThrottlesLogins.php)

### 日期序列化

在 `Eloquent` 模型上使用 `toArray` 或 `toJson` 方法时，Laravel 7 将使用新的日期序列化格式。Laravel 将会使用 Carbon 的 toJSON 方法，该方法将生成与 ISO-8601 兼容的日期，包括时区信息及小数秒, 这里表现在后台展示数据并且使用 carbon 进行序列化之后的数据显示为 `2020-03-04T20:01:00.283041Z` 格式

::: warning ⚠️
 该更改仅影响序列化为数组和 JSON 的模型和模型集合，对数据库中的日期没有影响
:::

### 邮件配置文件更新

配置文件更新为 mailers 数组, 配置文件参考 [laravel/config/mail.php at 7.x · laravel/laravel](https://github.com/laravel/laravel/blob/7.x/config/mail.php)

markdown 邮件更新, 但是并未出现期望的样式

```HTML
@component('mail::message')
    # Order Shipped

    Your order has been shipped!

    @component('mail::button', ['url' => 'https://laravel.com'])
        Visit Laravel.com
    @endcomponent

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
```

![](https://file.wulicode.com/feishu-images/e43d772a174428bc5996904ba9e383ce.png)

### 队列移除 **`--daemon` 标记**

队列 `queue:work` 默认以值守方式运行

### 路由

Laravel 7 不允许定义重复的路由

## Laravel 6.0 升级到 6.x 记录

### composer 2.0

> composer 2.0 版本和 laravel 6.0 版本不兼容

这个是 laravel 6.0 lts 版本的问题, 由于更改了加载方式, 这个方式在 6.0 版本中没有被修复导致的问题, 可以查看 :

[https://github.com/composer/composer/issues/9340](https://github.com/composer/composer/issues/9340)

对于 laravel 版本的支持程度可以查看

![](https://file.wulicode.com/feishu-images/19edc5492a32ece6ed6aec3436e4eddd.png)

这里的解决问题的办法是强制使用 composer 1.x 版本

```Plaintext
$ composer self-update --1
```

### 相关组件

为了使用 composer 2.x, 我把 laravel 6.0 升级到 6.x , 因为 laravel 自 6.18 之后才支持 composer 2, 同时升级的组件还有

```JSON
{
  ...
  "require": {
    tucker-eric/eloquentfilter : "~2" => "3"
  },
  "require-dev": {
    "itsgoingd/clockwork": "~4.0"  => "~5.0"
    "barryvdh/laravel-ide-helper": "~2.7" => "~2.*"
    "doctrine/dbal": "^2.5" => "^3"
  }
  ...
}
```

### Method Monolog::addDebug() does not exist

重新命名一下之前的 `ide-helper.php` 重新发布一下配置

```Plaintext
$ php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
```

移除 Log 部分

```Plaintext
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

`phpredis` : 指的是使用 pecl 安装的 php 扩展 redis

`predis`   : 指的是 github 上的 predis/predis 的包

Laravel 推荐使用 `phpredis` 来代替 `predis`。原因是 `predis` 包很长时间没有更新所以要记得先安装 `phpredis`, 然后在 `config/app.php` 中去掉 `Redis` 别名

**Mac 安装**

```Plaintext
# 这里需要将当前版本设置为主版本才可以, 如果不是主版本则安装会太费劲
$ brew link --force php@{version}
$ pecl install igbinary
$ pecl install redis
$ brew services restart php@7.2
```

**其他平台**

应该是直接安装即可(未测试)项目中在考虑兼容的情况下, 使用 predis, 暂时不启用 phpredis.

### 2. Unable to create configured logger. Using emergency logger

在 5.6 之后已经将配置文件独立 [config/logging.php](https://github.com/laravel/laravel/blob/master/config/logging.php), 将这个文件放置到指定目录, 然后 `app.php` 移除日志的配置 `Logging Configuration`

### 3. Call to undefined method Illuminate::fire()

在 (5.8 升级指南)([https://laravel.com/docs/5.8/upgrade](https://laravel.com/docs/5.8/upgrade)) 指出,*Likelihood Of Impact: Low*

```Plaintext
deprecated and removed 
Events The fire Method
```

使用 dispatch 方法替代 `You should use the dispatch method instead.`

### 4. Class ‘Illuminate’ not found

使用 Request 替代 Input, `Input` no longer exists. Either use the `Request` facade or alias that instead of `Input`.

### 5. str_contains 等 helper 函数

这些函数均需要替换成静态函数方法 `Str::contains`

下面是 辅助函数列表

[5.1 辅助函数列表](https://learnku.com/docs/laravel/5.1/helpers/1068)