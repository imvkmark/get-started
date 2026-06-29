---
description: '本指南详细介绍了Laravel插件包的完整开发流程，包括初始化、创建服务提供者、配置文件、自定义类、视图和门面，本地测试后发布至Git及Packagist，并最终安装使用。'
lastUpdated: '2026-06-17 22:33:32'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel 插件包开发'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本指南详细介绍了Laravel插件包的完整开发流程，包括初始化、创建服务提供者、配置文件、自定义类、视图和门面，本地测试后发布至Git及Packagist，并最终安装使用。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/laravel/packages/development.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/74ec094b0e6e8690e9b8b7c05cff9dfc.png'
---
# Laravel 插件包开发

## 准备工作

这里要求你对 composer 的包封装有所了解, 本文仅仅对封装 laravel 包进行说明

- 需要阅读并弄清楚 composer 包的封装方式, 参考 怎样创建 PSR-4 的 Php 包
- 必须对 laravel版本且有一定的基础,了解服务提供者/门面概念

## 包初始化以及创建

详细文档查看 怎样创建 PSR-4 的 Php 包

**新建文件夹**

在新建的 laravel 项目中建立如下目录:

```Plaintext
packages/toastr/src
```

packages 目录和 app 目录同级。我们开发包的代码都放在这个 `src` 目录中,toastr 作为包的名称可以自定义其命名

**设定命名空间**

修改项目的composer.json,设定PSR-4命名空间:

```Plaintext
"autoload": {
    "classmap": [
        "database"
    ],
    "psr-4": {
        "App\\": "app/",
        "Duoli\\Toastr\\": "packages/toastr/src/"
    }
},
```

## Laravel 配置相关

### 创建服务提供者Service Provider

```Plaintext
php artisan make:provider ToastrServiceProvider
```

将生成的 `app/Providers/ToastrServiceProvider.php` 文件移动到我们的 `packages/toastr/src` 目录下面，并注册 ToastrServiceProvider 到 config/app.php 的 providers 中。

```Plaintext
'providers' => [
    /*
     * Laravel Framework Service Providers...
     */
     ......
    /*
     * Application Service Providers...
     */
     ......
    Duoli\Toastr\ToastrServiceProvider::class,
],
```

### 创建配置文件

新建 `packages/toastr/src/config/toastr.php` 来保存 `toastr.js` 的 options

```Plaintext
<?php
return [
 'options' => []
];
```

---

### 创建自定义类

新建Toastr类，来实现toastr 的info，success，error，warning的相关实现，代码还是很简单的

```PHP
<?php 

namespace Duoli\Toastr;
use Illuminate\Session\SessionManager;
use Illuminate\Config\Repository;
class Toastr
{
                /**
                 * @var SessionManager
                 */
                protected $session;
                /**
                 * @var Repository
                 */
                protected $config;
                /**
                 * @var array
                 */
                protected $notifications = [];
                /**
                 * Toastr constructor.
                 * @param SessionManager $session
                 * @param Repository $config
                 */
                public function __construct(SessionManager $session, Repository $config)
                {
                    $this->session = $session;
                    $this->config = $config;
                }
                public function render()
                {
                    $notifications = $this->session->get('toastr:notifications');
                    if(!$notifications) {
                        return '';
                    }
                    foreach ($notifications as $notification) {
                        $config = $this->config->get('toastr.options');
                        $javascript = '';
                        $options = [];
                        if($config) {
                            $options = array_merge($config, $notification['options']);
                        }
                        if($options) {
                            $javascript = 'toastr.options = ' . json_encode($options) . ';';
                        }
                        $message = str_replace("'", "\\'", $notification['message']);
                        $title = $notification['title'] ? str_replace("'", "\\'", $notification['title']) : null;
                        $javascript .= " toastr.{$notification['type']}('$message','$title');";
                    }
                    return view('Toastr::toastr', compact('javascript'));
                }
                /**
                 * Add notification
                 * @param $type
                 * @param $message
                 * @param null $title
                 * @param array $options
                 * @return bool
                 */
                public function add($type, $message, $title = null, $options = [])
                {
                    $types = ['info', 'warning', 'success', 'error'];
                    if(!in_array($type, $types)) {
                        return false;
                    }
                    $this->notifications[] = [
                        'type' => $type,
                        'title' => $title,
                        'message' => $message,
                        'options' => $options
                    ];
                    $this->session->flash('toastr:notifications', $this->notifications);
                }
                /**
                 * Add info notification
                 * @param $message
                 * @param null $title
                 * @param array $options
                 */
                public function info($message, $title = null, $options = [])
                {
                    $this->add('info', $message, $title, $options);
                }
                /**
                 * Add warning notification
                 * @param $message
                 * @param null $title
                 * @param array $options
                 */
                public function warning($message, $title = null, $options = [])
                {
                    $this->add('warning', $message, $title, $options);
                }
                /**
                 * Add success notification
                 * @param $message
                 * @param null $title
                 * @param array $options
                 */
                public function success($message, $title = null, $options = [])
                {
                    $this->add('success', $message, $title, $options);
                }
                /**
                 * Add error notification
                 * @param $message
                 * @param null $title
                 * @param array $options
                 */
                public function error($message, $title = null, $options = [])
                {
                    $this->add('error', $message, $title, $options);
                }
                /**
                 * Clear notifications
                 */
                public function clear()
                {
                    $this->notifications = [];
                }
}
```

### 创建视图文件

新建 `packages/toastr/src/views/toastr.blade.php` 视图文件：

```HTML
<link href="http://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
<script type="text/javascript">{!! $javascript !!}</script>
```

### 创建门面Facade

建立 Facade, 新建 `packages/toastr/src/Facades/Toastr.php` 就是引入了 toastr 插件，输出我们render 方法中的 `$javascript`

```PHP
<?php 

namespace Duoli\Toastr\Facades;
use Illuminate\Support\Facades\Facade;
class Toastr extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'toastr';
    }
}
```

### 修改服务提供者

```PHP
<?php 
namespace Duoli\Toastr;
use Illuminate\Support\ServiceProvider;
class ToastrServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/views', 'Toastr');
        $this->publishes([
            __DIR__.'/views' => base_path('resources/views/vendor/toastr'),
            __DIR__.'/config/toastr.php' => config_path('toastr.php'),
        ]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app['toastr'] = $this->app->share(function ($app) {
            return new Toastr($app['session'], $app['config']);
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['toastr'];
    }
}
```

`$this->loadViewsFrom(__DIR__ . '/views', 'Toastr')`

就是表示 Toastr 命名空间的视图文件冲当前目录的views目录中渲染，所以我们上面用

```PHP
return view('Toastr::toastr', compact(‘javascript’)); 
```

`this->publishes` 在执行 `php artisan vendor:publish` 时会将对应的目录和文件复制到对应的位置

### 本地测试

修改 config/app.php 添加服务提供者如下:

```Plaintext
'aliases' => [
    ......
    'Toastr' => Duoli\Toastr\Facades\Toastr::class,
],
```

创建测试控制器

```Plaintext
$ php artisan make:controller TestController
```

```PHP
<?php
namespace App\Http\Controllers;
use App\Http\Requests;
use Illuminate\Http\Request;
use Toastr;
class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        Toastr::error('你好啊','标题');
         dd(session('toastr:notifications'));
        return view('home');
    }
}
```

到此结束，大功告成，这样一个Laravel 的 composer 包就开发完成了。

修改命名空间到包的composer.json, 因为别人安装这个包的时候不可能也去改项目 composer.json 的 PSR-4 的 autoload ，所以我们把PSR-4的命名空间加到这个包的 composer.json 中去，修改`packages/toastr/src/composer.json`

如下：

```JSON
{
    "name": "duoli/toastr.js",
    "description": "toastr.js for laravel",
    "authors": [
        {
            "name": "Duoli",
            "email": "i@wulicode.com"
        }
    ],
    "require": {},
    "autoload": {
        "psr-4": {
            "Duoli\\Toastr\\": "src/"
        }
    }
}
```

### 发布到 git 并发布到 packagist 上

使用 git 发布到 github, 然后在 packagist 上增加这个包即可就OK

## 使用

### 安装使用

在发布到公有包的情况下可以使用, 如果想要发布到私有包可以查看 使用 packeton 来管理私有包

```Plaintext
composer require duoli/toastr.js
```

### Demo视图

```HTML
<!DOCTYPE html>
<html>
<head>
    <title>Laravel</title>
</head>
<body>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
{!! Toastr::render() !!}
</body>
</html>
```

![](https://file.wulicode.com/feishu-images/74ec094b0e6e8690e9b8b7c05cff9dfc.png)

## 参考

教程的源码和这个包的安装使用方法详见github https://github.com/yuansir/toastr-for-laravel5

- [Laravel Composer Package 开发简明教程](https://laravel-china.org/articles/1714/laravel-composer-package-development-concise-tutorial)
- [Laravel Composer Package 开发简明教程2](http://jellybook.me/articles/2017/01/laravel-composer-package)