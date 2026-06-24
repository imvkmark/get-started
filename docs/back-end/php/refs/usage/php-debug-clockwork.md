---
description: '通过Composer安装 Clockwork 库。恭喜，你完成了！要启用命令或队列作业分析等更多功能，请通过 Artisan 命令发布配置文件vendor:publish注意：如果使用 Laravel 路由缓存，则需要使用route:cache命令更新路由它。对于早于 5.5 的 Laravel 版本，您需要在您的config/app.php 中手动注册服务如果您想使用 Facade，请将以下内容添加到您的config/app.php：通过Composer安装 Clockwork 库。安装 Clockwork 后，您需要在以下位置注册 Clockwork 服务提供商'
lastUpdated: '2025-12-12 13:46:00'
head: 
  - - meta
    - name: 'og:title'
      content: '[WIP]Clockwork - 在浏览器中调试 PHP'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '通过Composer安装 Clockwork 库。恭喜，你完成了！要启用命令或队列作业分析等更多功能，请通过 Artisan 命令发布配置文件vendor:publish注意：如果使用 Laravel 路由缓存，则需要使用route:cache命令更新路由它。对于早于 5.5 的 Laravel 版本，您需要在您的config/app.php 中手动注册服务如果您想使用 Facade，请将以下内容添加到您的config/app.php：通过Composer安装 Clockwork 库。安装 Clockwork 后，您需要在以下位置注册 Clockwork 服务提供商'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/php/refs/usage/php-debug-clockwork.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/f4/f459ba931e5bc1459638fa6838cc7660.png?x-oss-process=image/resize,m_mfit,w_400'
---
# [WIP]Clockwork - 在浏览器中调试 PHP



## 介绍

![](https://file.wulicode.com/notion/f4/f459ba931e5bc1459638fa6838cc7660.png)

##  **安装** 

### Laravel

[通过Composer](https://getcomposer.org/)安装 Clockwork 库。

```javascript
$ composer require itsgoingd/clockwork
```

恭喜，你完成了！要启用命令或队列作业分析等更多功能，请通过 Artisan 命令发布配置文件 `vendor:publish`

**注意：** 如果使用 Laravel 路由缓存，则需要使用 `route:cache` 命令更新路由它。

对于早于 5.5 的 Laravel 版本，您需要在您的 `config/app.php`  中手动注册服务

```php
'providers' => [
    ...
    Clockwork\Support\Laravel\ClockworkServiceProvider::class
]
```

如果您想使用 Facade，请将以下内容添加到您的 `config/app.php` ：

```php
'aliases' => [
    ...
    'Clockwork' => Clockwork\Support\Laravel\Facade::class,
]
```

### Lumen

[通过Composer](https://getcomposer.org/)安装 Clockwork 库。

```
$ composer require itsgoingd/clockwork
```

安装 Clockwork 后，您需要在以下位置注册 Clockwork 服务提供商 `bootstrap/app.php` ：

```
$app->register(Clockwork\Support\Lumen\ClockworkServiceProvider::class);
```

要启用命令或队列作业分析等更多功能，请使用环境变量，请参阅 [可用设置的完整列表](https://raw.githubusercontent.com/itsgoingd/clockwork/master/Clockwork/Support/Laravel/config/clockwork.php)。

**注意：** 要收集数据库查询，您需要在  `bootstrap/app.php`  中启用  `$app->withEloquent()` ，如果应用对大多数请求都执行了数据库查询，也不会影响性能。

###  **Vanilla** 

[通过Composer](https://getcomposer.org/)安装 Clockwork 库。

```
$ composer require itsgoingd/clockwork
```

在应用程序中尽早初始化 Clockwork。

```
$clockwork = Clockwork\Support\Vanilla\Clockwork::init();
```

如果正在使用依赖注入容器，那么注册 Clockwork 实例可能是个好主意。

在发送响应之前，我们需要告诉 Clockwork 解析和存储当前请求的元数据。

```
$clockwork->requestProcessed();
```

我们还需要设置一个 Clockwork REST API 端点。Clockwork 客户端使用此端点为您的应用程序请求加载元数据。

默认情况下，Clockwork 客户端期望 URI 中的数据 `/__clockwork` 。如果您的应用程序使用路由，您只需为此 URI 设置 GET 路由并将 URL 的其余部分传递给 Clockwork。

```
$router->get('/__clockwork/{request:.+}', function ($request) {
     $clockwork = Clockwork\Support\Vanilla\Clockwork::init();
 
     return new JsonResponse($clockwork->getMetadata($request));
}};
```

在没有路由的简单的应用中，可以使用单独的脚本。在这种情况下，我们还需要使用该选项告诉 Clockwork 从何处加载数据 `api` 。

```
// clockwork.php
$clockwork = Clockwork\Support\Vanilla\Clockwork::init([ 'api' => '/clockwork.php?request=' ]);
$clockwork->returnMetadata();
```

在第一个示例中，我们使用了 `getMetadata` 将元数据作为数组返回的方法， `returnMetadata` 还将对数据进行 json-ecncode，将其发送到输出并设置适当的标头。

**PSR-7 应用程序**

PSR-7 应用程序中的 Clockwork 支持可以使用中间件实现。

```
return $clockwork->usePsrMessage($request, $response)->requestProcessed();
```

在这种情况下，Clockwork 将使用来自 PSR-7 请求的数据并返回使用 Clockwork 标头扩展的 PSR-7 响应。

**配置**

可以通过将配置数组传递给 `init` 方法来配置 Clockwork 集成。

```
$clockwork = Clockwork\Support\Vanilla\Clockwork::init([
   'storage_files_path' => __DIR__ . '/storage/clockwork'
]);
```

[您可以在配置文件](https://github.com/itsgoingd/clockwork/blob/master/Clockwork/Support/Vanilla/config.php)中找到带有说明的完整选项列表。

您还可以通过环境变量配置大多数选项，在这种情况下，您不必将它们传递给方法 `init` 。

c **lock helper**

Clockwork 包括一个 `clock` 全局辅助功能，可以从应用程序的任何位置轻松访问 Clockwork 功能。

`clock` 集成中默认禁用助手，要启用助手，请使用该选项 `register_helpers` 。

```
$clockwork = Clockwork\Support\Vanilla\Clockwork::init([ 'register_helpers' => true ]);
clock('Log', 'something');
clock()->addDatabaseQuery('SELECT * FROM users WHERE id = 1', [], 10);
```

**注册数据库查询**

在 vanilla PHP 应用程序中进行数据库查询的方法有很多种。这就是为什么与框架集成不同，注册执行的数据库查询取决于您。

为此，您可以 `addDatabaseQuery` 在数据库抽象层中使用 Clockwork 方法。如果没有，可以编写一个简单的辅助函数或类来进行查询，例如这个辅助函数用于使用 PDO 执行查询并将它们记录到 Clockwork。

```
function database_query($pdo, $query, $bindings) {
   $time = microtime(true);
 
   $stmt = $pdo->prepare($query);
   $stmt->execute($bindings);
 
   $results = $stmt->fetchAll();
 
   clock()->addDatabaseQuery($query, $bindings, (microtime(true) - $time) * 1000);
 
   return $results;
}
```

可以使用类似的方法来记录缓存查询、事件、发送的电子邮件等。请参阅[主 Clockwork 类的源代码](https://github.com/itsgoingd/clockwork/blob/23aa928f00a93f1e2febfe3eb3eaaad1d67a200b/Clockwork/Clockwork.php)以获取所有可用方法的列表。

### Symfony

[通过Composer](https://getcomposer.org/)安装 Clockwork 库。

```
$ composer require itsgoingd/clockwork
```

安装 Clockwork 后，您需要在以下位置注册 Clockwork 捆绑包 `config/bundles.php` ：

```
return [
    ...
    Clockwork\Support\Symfony\ClockworkBundle::class => ['dev' => true]
]
```

Clockwork 时间线还需要在以下位置注册 `config/routes.yaml` ：

```
clockwork:
    resource: '@ClockworkBundle/Resources/config/routing/clockwork.php'
```

Clockwork 使用 Symfony 分析器作为数据提供者，确保它已启用：

```
framework:
    profiler: { collect: true }
```

**注意：**  Symfony 集成使用内置的 Symfony 分析器。这意味着我们只能显示与 Symfony Web Profiler 相同的信息，其他 Clockwork 功能不可用。

### Slim

[通过Composer](https://getcomposer.org/)安装 Clockwork 库。

```
$ composer require itsgoingd/clockwork
```

安装 Clockwork 后，您需要将 Slim 中间件添加到您的应用程序，指定 Clockwork 元数据的路径：

```
$app = AppFactory::create();
$app->add(new Clockwork\Support\Slim\ClockworkMiddleware($app, __DIR__ . '/storage/clockwork'));
```

还支持 Slim 3：

```
$app = new Slim\App(...);
$app->add(new Clockwork\Support\Slim\Legacy\ClockworkMiddleware(__DIR__ . '/storage/clockwork'));
```

还支持 Slim 2：

```
$app = new Slim(...);
$app->add(new Clockwork\Support\Slim\Old\ClockworkMiddleware(__DIR__ . '/storage/clockwork'));
```

###  **升级指南** 

**配置文件**

Clockwork 配置文件包含多项更改。请检查并重新发布配置文件。

**所需的 PHP 版本**

最低要求的 PHP 版本现在是 5.6，之前是 5.5。如果你不能升级，你可以无限期地使用 Clockwork 4。

**时间轴接口**

时间线 api 已完全改写，请参阅文档中的“时间线”部分了解详细信息。

一般来说，旧的调用可以很容易地转换为新的 api，例如：

```
clock()->startEvent('twitter-api-call', "Loading user's latest tweets via Twitter API");
    ...
clock()->endEvent('twitter-api-call');
```

```
clock()->event("Loading user's latest tweets via Twitter API")->start();
    ...
clock()->event("Loading user's latest tweets via Twitter API")->end();
```

**全局日志和时间线实例**

全局日志和时间线实例已移至请求实例。

```
// old api
$log = clock()->getLog();
 
// new api
$log = clock()->getRequest()->log();
```

不应在自定义数据源中手动修改请求的 log 和 timelineData 属性，应改用 log 或 timeline 实例，例如：

```
// old api
$request->log = array_merge($request->log, $localLog->toArray());
 
// new api
$request->log()->merge($localLog);
```

不再在 Laravel 容器中注册 `clockwork.log` 。 `Clockwork\Request\Log::class`

和事件不再使用，可以删除 `clockwork.controller.start` 。 `clockwork.controller.end`

**核心 Clockwork 类 api**

核心 Clockwork 类的 getter 和 setter 被一个统一的方法所取代，例如。 `getRequest() -> request()` ,  `setRequest($request) -> request($request)` .

旧的 getter 和 setter 仍然可用，但已弃用。

删除了弃用的 `Clockwork::subrequest()` 方法，使用 `Clockwork::addSubrequest()` .

**Slim 4 支持**

添加了 Slim 4 支持，更改了原始中间件命名空间。

```
use Clockwork\Support\Slim\ClockworkMiddleware; // for Slim 4
use Clockwork\Support\Slim\Legacy\ClockworkMiddleware; // for Slim 3
use Clockwork\Support\Slim\Old\ClockworkMiddleware; // for Slim 2
```

另请参阅文档中的 Slim 安装部分。

##  **特征** 

Clockwork 是一款适用于 PHP 的开发工具，可直接在浏览器中使用。Clockwork 可以深入了解应用程序运行时 - 包括请求数据、性能指标、日志条目、数据库查询、缓存查询、redis 命令、调度事件、队列运行、视图渲染等 - 用于 HTTP 请求、命令行、队列和测试

**收集数据**

通过 Composer 安装 Clockwork 服务器端组件以收集所有指标。

包括快捷方便的 Laravel 支持，可轻松与普通或自定义应用程序集成。

**调试和配置文件**

打开 `your.app/clockwork` 以查看收集的数据并与之交互。

浏览器开发工具扩展也可用于 Chrome 和 Firefox。

### 记录

通过帮助程序  `clock()`  可以记录从简单字符串记录到复杂对象的任何类型的数据

对象和数组显示为交互式树结构，每条消息还包括堆栈跟踪

来自应用程序的日志的消息也会显示

![](https://file.wulicode.com/notion/e1/e1ec2905f905a0b3aeb2deb62edb60fc.png)

###  **数据库相关** 

了解您的应用程序正在使用各种收集的数据做什么，所有这些数据都可以通过堆栈跟踪进行搜索。

切换配置文件中的每个功能并设置一些高级选项，例如标记缓慢或重复的数据库查询。

![](https://file.wulicode.com/notion/62/6281d805add1ec5125510f90914b6465.png)

**用户数据和可扩展性**

添加自己的选项卡，例如在电子商务应用程序中显示购物车内容的购物车选项卡。

使用新的数据源、框架集成扩展 Clockwork，或者在您自己的工具中使用 Clockwork REST api 和元数据格式。

**Xdebug 分析器**

使用我们功能齐全的 Xdebug 配置文件查看器获取更详细的性能指标。

简单设置后，您可以直接从 Clockwork 应用程序切换收集配置文件。

**分享**

共享可以让你把元数据上传到 Clockwork 共享服务，并为您提供公共链接以与他人共享。

分享服务是免费使用的，点击侧边栏的分享按钮开始。

### 命令、队列和测试

Clockwork 现在支持除 HTTP 请求之外的多种请求类型——命令、队列作业和测试。

支持所有功能，查看你的队列运行了哪些数据库查询，或者找出单元测试失败的原因，从而使 TDD 变得更加容易。

![](https://file.wulicode.com/notion/7c/7c837590ec7428e6ddfcd9520d2ca457.png)

###  **收集数据** 

Clockwork 服务器端组件收集并存储有关您的应用程序的数据。

默认情况下，Clockwork 仅在您的应用处于调试模式时才处于活动状态。您可以选择明确启用或禁用 Clockwork，甚至可以将 Clockwork 设置为始终收集数据而不公开数据以供进一步分析。

默认情况下，我们会收集一大堆有用的数据，但你可以在配置文件中启用更多功能或禁用不需要的功能。

某些功能可能允许高级选项，例如。对于数据库查询，您可以设置慢速查询阈值或启用重复 (N+1) 查询检测。查看配置文件以查看 Clockwork 可以执行的所有操作。

有几个选项允许您选择 Clockwork 激活的请求。

按需模式只会在 Clockwork 应用程序打开时收集数据。您甚至可以在应用程序设置中指定一个秘密来收集请求。仅错误将仅记录以 4xx 和 5xx 响应结尾的请求。仅慢速将仅收集响应高于设置的慢速阈值的请求。您还可以通过自定义闭包过滤收集和记录的请求。默认情况下不会收集 CORS 飞行前请求。

Clockwork 4.1 中的新功能，工匠命令、队列作业和测试现在也可以收集，您需要在配置文件中启用它。

Clockwork 还收集日志消息或数据库查询等数据的堆栈跟踪。默认情况下收集跟踪的最后 10 帧。您可以在配置文件中更改帧限制或禁用此功能。

**命令**

Clockwork 支持收集有关已执行的 Artisan 命令的数据，并可选择支持收集命令输出。这是默认禁用的，需要在配置文件中启用。

**队列作业**

Clockwork 支持收集有关已执行队列作业的数据，同时支持默认的 Laravel 队列工作程序和 Laravel Horizon。这是默认禁用的，需要在配置文件中启用。

**测试**

Clockwork 支持收集有关运行测试的数据，支持默认的 Laravel PHPUnit 测试设置。这是默认禁用的，需要在配置文件中启用。

要收集有关运行测试的数据，您还需要在您的中添加并启动 Clockwork 测试特征 `tests/TestCase.php` ：

```
use Clockwork\Support\Laravel\Tests\UsesClockwork;
 
abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, RefreshDatabase, UsesClockwork;
 
    protected function setUp() :void
    {
       parent::setUp();
       $this->setUpClockwork();
    }
}
```

###  **查看数据** 

**网页界面**

打开 `your.app/clockwork` 以查看收集的数据并与之交互。

该应用程序将显示所有已执行的请求，这在请求不是由浏览器发出时很有用，例如您正在为其开发 API 的移动应用程序。

**浏览器扩展**

浏览器开发工具扩展也可用于 Chrome 和 Firefox：

- [Chrome 网上应用店](https://chrome.google.com/webstore/detail/clockwork/dmggabnehkmmfmdffgajcflpdjlnoemp)
- [Firefox 插件](https://addons.mozilla.org/en-US/firefox/addon/clockwork-dev-tools/)

![](https://file.wulicode.com/notion/f4/f459ba931e5bc1459638fa6838cc7660.png)

**工具栏**

Clockwork 现在为您提供了一个选项，可以在您的应用程序中以工具栏的形式显示基本请求信息。

工具栏完全在客户端呈现，需要安装一个小型 javascript 库。

![](https://file.wulicode.com/notion/aa/aad035c87a7734b510c5038fb0fa8db2.png)

使用以下脚本标签从 cdn 加载库：

```
<script src="https://cdn.jsdelivr.net/gh/underground-works/clockwork-browser@1/dist/toolbar.js"></script>
```

cdn 构建被转换为支持所有市场份额超过 1% 的浏览器。metrics.js 的 cdn 包大小为 7.11K，toolbar.js 的大小为 24.2K。

或者，您可以通过 npm 安装库：

```
npm install clockwork-browser
```

并导入到您的 javascript 包中，无需进一步配置：

```
import 'clockwork-browser/toolbar'
```

工具栏实现使用 cookie，如果您的网站不能使用 cookie，您可能希望禁用此功能。

### 日志

您可以通过帮助器记录任何变量 `clock()` ，从简单的字符串到数组或对象，甚至是多个值：

```
clock(User::first(), auth()->user(), $username)
```

辅助 `clock()` 函数返回它的第一个参数，因此您可以轻松地将内联调试语句添加到您的代码中：

```
User::create(clock($request->all()))
```

如果要指定日志级别，可以使用长格式调用：

```
clock()->info("User {$username} logged in!")
```

您可以通过第二个参数向日志消息添加上下文，序列化程序选项可以在上下文数组中传递：

```
clock()->info("Trace this message!", [ 'trace' => true ])
```

您可以使用该 `performance` 选项使日志消息显示在性能选项卡中。

```
clock()->info("Api request {$method} {$uri}, took too long! ({$time})", [ 'performance' => true ])
```

使用标准 Laravel 日志方法记录的所有数据也将被收集。

###  **时间线** 

时间线为您提供应用程序运行时的可视化表示。Clockwork 收集的所有数据都显示在时间轴上，可以按其种类进行搜索和过滤。

另外还可以收集自定义的事件

![](https://file.wulicode.com/notion/04/0434ad243df7e1408c5445dca3028528.png)

要将事件添加到时间线 - 从描述开始，执行跟踪代码并完成事件。Fluent api 可用于进一步配置事件。

```
// using timeline api with begin/end and fluent configuration
clock()->event('Importing tweets')->color('purple')->begin();
...
clock()->event('Importing tweets')->end();
```

或者，您可以将跟踪的代码块作为闭包执行。您还可以选择使用基于数组的配置而不是流畅的 api。

```
// using timeline api with run and array-based configuration
clock()->event('Updating cache', [ 'color' => 'green' ])->run(function () {
    ...
});
```

事件有一个可选的唯一名称，以防描述不唯一。

```
foreach ($users as $i => $user) {
    clock()->event('Importing tweets')->name("importing-tweets-{$i}")->begin();
    ...
    clock()->event("importing-tweets-{$i}")->end();
}
```

所有可能的事件属性都是 - 描述、名称、开始、结束、持续时间、颜色和数据。

```
// manually adding event with start and end time
clock()->event('Importing tweets')
    ->start($startTime)
    ->end($endTime)
    ->color('purple');
```

```
// manually adding event with start time and duration (in ms)
clock()->event('Updating cache')
    ->start($startTime)
    ->duration($durationMs)
    ->color('green');
```

###  **客户端性能** 

Clockwork 可帮助您控制服务器端性能。不过，优化后端只是成功的一半。Javascript 处理仍然会使您的应用程序感觉反应迟钝。幸运的是，我们有一些很棒的 Web 性能计划，例如 Web Vitals 和浏览器 API 来帮助我们衡量我们在这方面的表现。

使用 Clockwork 5，您现在可以收集这些客户端性能指标。支持导航计时（例如 DOM 交互或完成事件花费的时间）和网络数据。您将在性能选项卡的新客户端部分中找到收集的指标。

收集客户端指标需要安装一个小型 javascript 库。

![](https://file.wulicode.com/notion/ff/fff2369f08d7baee1fbc3b24b406c5a9.png)

**工具栏**

Clockwork 提供了一个选项，可以在应用程序中以工具栏的形式显示基本请求信息。单击蓝色按钮将在 Clockwork 应用程序中显示完整详细信息。

工具栏通过一个小的 javascript 组件显示在客户端

![](https://file.wulicode.com/notion/da/da2e98ab99000423762860398d1ce047.png)

使用以下脚本标签从 cdn 加载库：

```
<script src="https://cdn.jsdelivr.net/gh/underground-works/clockwork-browser@1/dist/metrics.js"></script>
```

cdn 构建被转换为支持所有市场份额超过 1% 的浏览器。metrics.js 的 cdn 包大小为 7.11K，toolbar.js 的大小为 24.2K。

或者，您可以通过 npm 安装库：

```
npm install clockwork-browser
```

并导入到您的 javascript 包中，无需进一步配置：

```
import 'clockwork-browser/metrics'
```

指标实施使用 cookie，如果您的网站不能使用 cookie，您可能希望禁用此功能。

###  **分享** 

共享请求会将元数据上传到 Clockwork 共享服务，并为您提供公共链接以与他人共享。在此链接上，您将找到一个功能完备的 Clockwork 应用程序，其中显示了您共享的请求。将 .png 附加到 url，您将获得性能选项卡的屏幕截图，您可以轻松地将其嵌入到 GitHub 问题中。您还可以选择仅共享请求的一部分，例如数据库选项卡。

共享服务可免费使用。共享数据托管在 DigitalOcean 服务器上，绝不会与第三方共享。旧股票将不时被清除。您也可以随时手动删除共享请求。

有时您可能只想链接到您自己的 Clockwork 实例上的请求。您会发现侧边栏底部的请求 ID 现在链接到当前请求。

###  **用户数据** 

虽然您可以使用丰富的日志记录功能记录任何内容或添加自定义时间轴事件，但有时您的应用程序具有您希望每个请求都能轻松访问的特定数据。

使用用户数据，您可以添加自定义数据，在 Clockwork 应用程序中显示为新选项卡，格式为表格或计数器（类似于性能选项卡）。

假设我们正在构建一个 eshop 应用程序。我们可以创建一个新的“购物车”选项卡来显示一些统计信息和购物车内容，而不是记录购物车内容并在日志选项卡中查找它们：

```
$cart = clock()->userData('cart')
    ->title('Cart');
 
$cart->counters([
    'Products' => 3,
    'Value' => '949.80€'
]);
 
$cart->table('Products', [
    [ 'Product' => 'iPad Pro 10.5" 256G Silver', 'Price' => '849 €' ],
    [ 'Product' => 'Smart Cover iPad Pro 10.5 White', 'Price' => '61.90 €' ],
    [ 'Product' => 'Apple Lightning to USB 3 Camera Adapter', 'Price' => '38.90 €' ]
]);
```

我们使用静态数据进行演示，在实际实现中，数据将来自基于您的购物车实现的数据库或会话。

## 高级

###  **验证** 

Clockwork 收集了大量敏感数据。通常，您只会在本地开发环境中运行 Clockwork，这不是问题。但在某些情况下，您可能有一个共享的开发或登台服务器。

对于这些情况，Clockwork 带有使用单个共享密码的简单身份验证。要使用身份验证，请启用它并在 Clockwork 配置文件中设置密码。

身份验证系统是可扩展的，要了解如何添加您自己的身份验证方法，请参阅“扩展身份验证”部分。

仍然不建议在生产环境或可能包含敏感客户数据的环境中运行 Clockwork。如果您计划在敏感环境中使用它，请确保您了解身份验证实施的细节。

###  **元数据存储** 

Clockwork 以持久的方式存储收集的数据。

旧数据会在指定的清理间隔后自动清理，默认为 30 天。

默认情况下，我们将元数据存储在一个平面 JSON 文件存储中，位于 `storage/clockwork` . 这是既简单又快速的存储，不需要任何特定的 PHP 扩展。

Clockwork 还包括一个 SQL 存储实现。SQL 存储适用于简单的 Sqlite 数据库，但也支持 MySQL 和 PostgreSQL。这在您需要在 Clockwork 之外使用收集的元数据的情况下也很有用，例如。您可以构建一个管理 UI，显示对您的应用程序的所有请求。

您还可以使用自己的元数据存储实现来扩展 Clockwork，要了解如何操作，请查看“扩展元数据存储”。

###  **Xdebug 分析器** 

虽然 Clockwork 提供了许多性能指标和分析功能（如时间线事件），但在您的应用程序中找到问题点仍然很困难。Xdebug 是一个 PHP 扩展，它提供了一个高级分析器，收集有关每个函数调用的指标。Clockwork 带有功能齐全的 Xdebug 分析器 UI，您可以在性能选项卡中找到它。

探查器 UI 将向您显示所有函数调用的明细及其自身和包含的成本。您可以在执行时间或内存使用指标、精确或百分比表示之间切换，当然数据是可排序和可过滤的。

**设置**

通过 PECL 安装 Xdebug 扩展（PHP 安装的一部分）：

```
$ pecl install xdebug
```

`php.ini` 在您的（位置 `php.ini` 和 xdebug 扩展路径将取决于您的操作系统）中启用 PHP 扩展：

```
zend_extension="/usr/local/php/modules/xdebug.so"
```

现在我们需要启用 Xdebug 分析器本身。您可以为所有请求启用分析，但收集 Xdebug 配置文件会显着减慢响应时间。这就是为什么只对某些请求启用 Xdebug 分析是个好主意。为此，将以下设置添加到您的设置中， `php.ini` 您将能够切换是否应在 Clockwork 分析器 UI 本身中收集 Xdebug 配置文件：

```
; Xdebug 3
xdebug.mode = profile
xdebug.start_with_request = trigger
 
; Xdebug 2
xdebug.profiler_enable_trigger = 1
```

有关安装和其他很棒的 Xdebug 功能的更多详细信息，请查看[Xdebug 网站](https://xdebug.org/)。

## 扩展

###  **执行** 

本节介绍 Clockwork 内部构件的工作原理。虽然正常使用不需要，但如果您计划使用自定义数据源、存储实现扩展 Clockwork，为您的自定义应用程序或不受支持的框架添加更深入的支持，甚至编写自定义 Clockwork 客户端应用程序，这将很有用。

Clockwork 由两部分组成：

- 服务器端库 - 负责收集数据并将其公开给客户端
- 客户端应用程序——负责将收集到的数据呈现给用户

两个组件之间的通信通过使用 JSON 元数据格式的类似 rest 的 HTTP API 进行。

**服务器端库**

Clockwork 服务器端库由几个组件组成：

- DataSources - 负责元数据收集本身的类
- Request - 用于存储元数据的数据对象
- 存储 - 负责保存和检索元数据的类
- 支持 - 框架和库的各种支持文件，如服务提供者、中间件等。

Clockwork 还有一个主要的 Clockwork 类，它将所有东西联系在一起，并包括一堆辅助方法。

虽然不同的 Clockwork 集成以不同的方式工作，但典型的用法如下所示：

-  _应用程序收到新请求_ 
- Clockwork 类被实例化，这会自动创建新的 Request 实例来保存元数据
-  `$clockwork->addDataSource` 
-  `$clockwork->setStorage` 
-  _应用程序运行_ 
-  `$clockwork->resolveRequest`  `resolve` 
-  `$clockwork->storeRequest` 
-  `X-Clockwork-Version`  `X-Clockwork-Id` 

查看“扩展数据源”和“扩展元数据存储”以获取有关编写自定义数据源和存储实现的信息。

**元数据 HTTP API**

元数据 HTTP API 是服务器端数据收集库和呈现数据的应用程序之间的粘合剂。通过拥有一个明确指定的类似 rest 的 API，我们可以保持不同版本的 Clockwork 应用程序和服务器端库兼容，并且您甚至可以编写与官方服务器端兼容的完全自定义的 Clockwork 应用程序，反之亦然。

`/__clockwork/{id}` 是主要和最重要的 API 端点。应用程序请求有关由特定 ID 标识的请求的元数据，服务器端以 JSON 格式返回元数据。

虽然这是浏览器扩展工作真正需要的唯一端点，也是第一个版本中唯一可用的端点，但各种应用程序功能还需要更多的端点。

`/__clockwork/latest` 返回关于最后执行的请求的元数据。在扩展中使用以在第一次打开时显示最后一个请求，并且是 Web UI 所必需的。

`/__clockwork/{id}|latest/next/{limit?}` 返回在具有指定 ID 的请求或最新请求之后执行的请求的元数据，具有可选限制。Web UI 需要。

`/__clockwork/{id}|latest/previous/{limit?}` 返回在具有指定 ID 的请求或最新请求之前执行的请求的元数据，具有可选限制。用于加载应用程序中的旧请求。

**浏览器扩展**

浏览器扩展检查 `X-Clockwork-Version` 和 `X-Clockwork-Id` 标头的 HTTP 响应。header `X-Clockwork-Version` 包含服务端组件的版本，header是必需的，内容不重要，仅用于新版本通知。更重要的是， `X-Clockwork-Id` 它包含当前 HTTP 请求的唯一标识符。

一旦收到包含这两个标头的请求，Clockwork 就会通过 HTTP GET 请求检索请求元数据 `/__clockwork/{ID}` 。元数据端点 URI 可以通过标头覆盖 `X-Clockwork-Path` ，如果存在，请求 ID 将附加到标头值的末尾。[此端点应以Clockwork 元数据格式](https://underground.works/docs/metadata-specification)返回请求元数据。

**网络用户界面**

Web UI 使用与浏览器扩展相同的代码，唯一不同的是元数据检索。由于我们没有作为浏览器扩展程序运行并且无法观察所有执行的 HTTP 请求，因此我们改用 ajax 轮询。

打开后，应用程序向端点发出请求 `/__clockwork/latest` 以加载最新请求。之后，我们使用 `/__clockwork/{id}/next` 最后一个请求 ID 轮询端点以获取所有较新的请求。

###  **数据源** 

数据源是一种模式，用于在 Clockwork 服务器端库中以可扩展的方式收集元数据。每个数据源收集有关特定主题的数据，例如。PhpDataSource、LaravelDataSource 或 DoctrineDataSource。

创建一个新的数据源就像创建一个实现 `Clockwork\DataSource\DataSourceInterface` 接口的类一样简单。虽然我们建议扩展基类而不是实现接口 `Clockwork\DataSource\DataSource` ，这将使您能够适应未来的接口更改。

您需要实现一个 `resolve(Request $request)` 方法来接收 `Request` 数据对象并使用您的自定义数据对其进行扩展。

例如，我们的应用程序使用自定义会话实现，让我们创建一个将会话数据添加到 Clockwork 的数据源：

```
use Clockwork\DataSource\DataSource;
use Clockwork\Helpers\Request;
 
class SessionDataSource extends DataSource
{
    public function resolve(Request $request)
    {
        $request->session = session()->all();
    }
}
```

要使用新的数据源，我们需要在主 Clockwork 类中注册它：

`clock()->addDataSource(new SessionDataSource);`

如需更多灵感，请查看 Clockwork 中包含的现有数据源。

###  **元数据存储** 

Clockwork 以持久的方式存储收集的数据。

默认情况下，我们使用平面 JSON 文件存储实现，我们还包括一个可选的 SQL 存储实现。要了解如何使用包含的实现，请参阅“高级元数据存储”部分。

虽然在大多数情况下您会希望使用包含的选项之一，但您可以编写自定义选项（例如，使用 Redis 或不受支持的 SQL 数据库）。

要创建存储实现，您需要实现接口 `Clockwork\Storage\StorageInterface` ，但建议改为扩展 `Clockwork\Storage\Storage` 基类。

该接口包含一堆用于读取请求的方法、一个保存方法和一个清理方法。所有读取方法都应返回单个实例或实例数组 `Clockwork\Helpers\Request` 。

-  `all()`  _所有_ 
-  `find($id)` 
-  `latest()` 
-  `previous($id, $count = null)` 
-  `next($id, $count = null)` 
-  `store(Request $request)` 
-  `cleanup()` 

要使用自定义存储实现，我们需要在主 Clockwork 类上设置它：

`clock()->setStorage(new RedisStorage);`

请随意查看现有的存储实现以获取灵感。

###  **验证** 

Clockwork 中的身份验证工作非常简单。每个元数据请求都包含一个身份验证令牌，该令牌将传递给身份验证器以决定我们是否应该返回元数据。如果 Clockwork 应用程序收到禁止响应，它将假设需要身份验证，并根据身份验证器的要求要求用户名、密码或两者。提交此表单将对身份验证器进行身份验证尝试，成功后将返回一个新的身份验证令牌。

要创建身份验证器实现，您需要实现该 `Clockwork\Authentication\AuthenticatorInterface` 接口。

-  `attempt(array $credentials)`  接收一个凭证数组 ( `username` ,  `password`  或者其他),如果凭据有效，则返回身份验证令牌，对于无效凭据返回 null
-  `check($token)` 
-  `requires()`  返回一组必需的凭据，这将是  `AuthenticatorInterface::REQUIRES_USERNAME`  或 `AuthenticatorInterface::REQUIRES_PASSWORD`  , 然后 Clockwork 应用程序将显示一个或两个字段

要使用自定义验证器，我们需要在主 Clockwork 类上进行设置：

```
clock()->setAuthenticator(new EloquentAuthenticator);
```

请随意查看现有的身份验证器实现以获取灵感。



