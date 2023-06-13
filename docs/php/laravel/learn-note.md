# 学习笔记

## composer 安装

### 介绍

composer 是一个便于管理php 框架的工具, 因为有很多的教程来介绍这个 `composer` 所以这里不会介绍

### 学习资料

1. 入门
    - [PHP 开发者该知道的 5 个 Composer 小技巧](http://www.phpcomposer.com/)
    - [简介](http://docs.phpcomposer.com/00-intro.html)
    - [基本用法](http://docs.phpcomposer.com/01-basic-usage.html)
    - [库（资源包）](http://docs.phpcomposer.com/02-libraries.html)
    - [命令行](http://docs.phpcomposer.com/03-cli.html)
    - [composer.json 架构](http://docs.phpcomposer.com/04-schema.html)
    - [资源库](http://docs.phpcomposer.com/05-repositories.html)
    - [社区](http://docs.phpcomposer.com/06-community.html)
2. [下载](http://docs.phpcomposer.com/download/)
3. [安装包列表](https://packagist.org/)

### 安装

下载并且指定安装目录, 并且确定 win 平台的的环境变量中有这个目录, 使用 `composer` 命令能够直接调用

### 设置镜像

参考 : [Composer 安装 / 加速](https://wulicode.com/php/composer-install-and-use-mirror.html)

## 安装 Laravel

### 安装 Laravel installer

- 使用 composer 下载运行需要的文件

```
composer global require "laravel/installer=~1.1"
```

- 将 `~/.composer/vendor/bin` 放入到环境变量中

### 使用 `new` 方法来创建项目

测试的目录为 `laravelRun`

```
laravel new laravelRun
```

这是初始化之后的文件目录结构

![](https://file.wulicode.com/yuque/202208/04/23/08517ntIai6o.png?x-oss-process=image/resize,h_565)

### 检测权限(linux)

同时检测下 `./storage` 有没有权限, 否则可能报错 `Error in exception handler`.由于 5.0 版本和 4.* 版本的差别. 5.0版本的存储位置被放置在 `./storage` 目录下

## 测试运行

### 系统需求

- PHP >= 5.4
- Mcrypt PHP Extension
- OpenSSL PHP Extension
- Mbstring PHP Extension

### 配置

- 设置 `key`, 这里生成的key 放在 `.env` 文件中, 用于数据的加密

**生成key**

```
cd laravelRun
php artisan key:generate
# Application key [1hSm25JlcusKQGdShlbnZlgVaCb3DetR] set successfully.
```

**配置.env 文件**

```
APP_KEY=1hSm25JlcusKQGdShlbnZlgVaCb3DetR
```

- 设置 `config/app.php`文件

### Apache 虚拟主机方式运行

- 配置Apache

我这里是 apache , 这里以 apache 为例, 这里需要配置 apache 对重写的支持 [使用 MOD_REWRITE 启用 url rewrite/url重写](http://my.oschina.net/duoli/blog/389248)

配置域名为 `www.lartest.com`

```
<VirtualHost *:80>
  ServerName www.lartest.com
  DocumentRoot "G:/wamp/www/mark/laravelRun/public"
  Options FollowSymLinks Indexes
</VirtualHost>
```

- 运行成功

[http://www.lartest.com](http://www.lartest.com/)

![](https://file.wulicode.com/yuque/202208/04/23/08510Zn21MMz.png?x-oss-process=image/resize,h_524)

### 使用artisan 服务器方式运行

```
php artisan serve
# Laravel development server started on http://localhost:8000
```

然后运行 `http://localhost:8000/` 也会访问到这个位置, 以后我使用Apache方式运行

### 使用 nginx 配置 Laravel

```nginx
server {
    listen 80;
    server_name l.start.duoli.com;
    index index.php index.html index.htm default.html default.htm default.php;
    root /data/workbench/www/laravelRun/public;
    client_max_body_size 20m;
    location ~ .*\.(php|php5)?$ {
        fastcgi_pass 127.0.0.1:9000;
	      # fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        include fastcgi.conf;
    }
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location ~ .*\.(js|css)?$ {
        expires 12h;
    }
    # more_set_headers 'Access-Control-Allow-Origin *';
    # more_set_headers 'Access-Control-Allow-Headers X-Requested-With,X-ACCESS-TOKEN,Content-Type';
    # more_set_headers 'Access-Control-Allow-Methods GET,POST,OPTIONS';
    access_log /data/workbench/logs/wulihub_access.log;
    error_log /data/workbench/logs/wulihub_error.log;
}
```

## 事件监听

### 设置监听事件

在 `app/Providers/EventServiceProvider` 中设置需要监听的事件

```
class EventServiceProvider extends ServiceProvider {
    protected $listen = [
        'admin.login_ip_banned' => [
            'App\Handlers\Events\Admin\LoginIpBannedLog',
        ],
        'admin.login_ok' => [
            'App\Handlers\Events\Admin\LoginOkLog',
        ],
    ];
    // ...
}
```

### 设置处理函数

`LoginIpBannedLog`

```
class LoginIpBannedLog {
    // 处理事件的函数
    public function handle($ip, $user) {
        PamLog::create([
            'account_id' => $user->account_id,
            'account_name' => $user->account_name,
            'account_type' => $user->account_type,
            'log_type' => 'error',
            'log_ip'  => $ip,
            'log_content' => 'ip 禁止登陆',
        ]);
    }
}
```

### 设置触发条件

在需要触发的时候触发条件, 并用数组传入需要传递的值

`\Event::fire('admin.login_ip_banned', [$this->ip, \Auth::user()]);`

## 配置文件

### 配置 `config/app.php`

`timezone` 为 `RPC`、`locale` 为 `zh`

### 数据库配置 `config/database.php`

由于数据库中定义调用了 `.env` 的方法, 所以这里使用 `.env` 的方式来加载配置

之前的配置, 这里只是修改一个前缀

**数据库前缀**

```
'mysql' => [
	// ...
	'prefix'    => 'mk_',
	// ...
],
```

数据库链接 **.env** 文件

创建在服务器中创建数据库 ``

```
DB_HOST=127.0.0.1
DB_DATABASE=mark_laravel
DB_USERNAME=root
DB_PASSWORD=
```

### .env 文件

[PHP dotenv](http://my.oschina.net/duoli/blog/388959) 是这个 env 文件的详细说明

```
APP_ENV=local
APP_DEBUG=true
APP_KEY=1hSm25JlcusKQGdShlbnZlgVaCb3DetR
DB_HOST=127.0.0.1
DB_DATABASE=mark_laravel
DB_USERNAME=root
DB_PASSWORD=
CACHE_DRIVER=file
SESSION_DRIVER=file
```

### 配置文件 `app.php`

- `debug`

当应用处于 debug 模式, 出错的时候将详细的错误信息和trace信息, 关闭将显示公共的错误信息

- `url`

应用url. 使用命令行的时候生成url使用, 例如在运行 Artisan 计划任务的时候

- `timezone`

给应用指定默认时区, 这个配置会被 php 的日期函数调用

- `locale`

地区

- `fallback_locale`

回滚地区

- `key`

生成的加密key

- `cipher`

加密方式

- `log`

日志配置

- `providers`

自动加载的服务提供者

## 文件树

### 框架文件目录树

```
laravel
├ app 代码目录
│ ├─ Http 应用程序的 HTTP 传输层
│ │ ├─ Controllers  控制器: 用于提供基本的逻辑、 数据模型交互以及加载应用程序的视图文件的控制器类
│ │ ├─ Middleware   中间件
│ │ ├─ Controllers  请求
│ │ ├─ Kernel.php
│ │ └─ routes.php   路由文件
├ resources 应用程序的语言文件和视图
│ ├ lang         应用程序易于本地化的字符串的数组, 默认包含英语语言的分页和表单验证的语言行
│ └ views        视图资源模版, 请注意，这个文件夹下你只能放置模版文件
├ config
│ ├ app.php      应用程序级设置，即时区、 区域设置（语言环境）
│ ├ auth.php     身份验证驱动
│ ├ cache.php    如果应用程序利用缓存来加快响应时间，要在此配置该功能
│ ├ compile.php  可以指定一些额外类，去包含由 `artisan optimize` 命令声称的编译文件。这些应该是被包括在基本上每个请求到应用程序中的类
│ ├ database.php 包含数据库的相关配置信息，即默认数据库引擎和连接信息。
│ ├ mail.php     为电子邮件发件引擎的配置文件，即 SMTP 服务器，From:标头
│ ├ session.php  控制Laravel怎样管理用户sessions,即session driver, session lifetime
│ └ view.php     模板系统的杂项配置
├ database
│ ├ migrations   保持所有版本的数据库的同步的迁移文件
│ └ seeds        允许Artisan工具用关系数据来填充数据库表的 PHP 文件
├ tests     该文件夹给你提供了一个方便的位置，用来做单元测试。如果你使用PHPUnit，你可以使用Artisan工具一次执行所有的测试
├ public    web 服务器的绑定目录, 静态资源文件如css, javascript和images文件应该放在这里
└ vendor    用来存放所有的第三方代码，在一个典型的 Laravel 应用程序，这包括 Laravel 源代码及其相关，并含有额外的预包装功能的插件
```

### 框架加载文件树

```
└ illuminate
  ├contracts   主要组件实现所用的接口
```

## 集合

### macro 示例

在运行时候动态添加函数

```
use Illuminate\Support\Collection;
Collection::macro('someMethod', function ($arg1 = 1, $arg2 = 1) {
    return $this->count() + $arg1 + $arg2;
});
$coll = new Collection([1, 2, 3]);
echo $coll->someMethod(1, 2);
// 6      = 3 + (1 + 2)
echo $coll->someMethod();
// 5      = 3 + (1 + 1)
```

## 事件调度(定时任务)

Laravel 5 新增了一个框架内置的 cron 风格的令人难以置信的调度程序（与  [Indatus 的 Dispatcher](https://github.com/indatus/dispatcher)
类似）。只要在服务器上设置一个每分钟调用  `artisan schedule:run`  的 cron job, 一切就准备就绪了。

```
* * * * * php /path/to/artisan schedule:run
```

举个例子，通过绑定下面的事件，可以实现每天自动清理密码提示记录：

```
$schedule
    ->command('auth:clear-reminders') // 清理密码提示
    ->daily() // 每天执行
    ->sendOutputTo($logPath) // 把输出写入日志
    ->emailOutputTo('me@me.com'); // 把输出发到指定邮箱
```

你可以通过  `command()`  来调用 artisan 命令,  `call`  来调用方法或函数， 或者  `terminal()`  来执行单行命令脚本：

```
$schedule->call('YourClass@someMethod')->twiceDaily();
 
$schedule->call(function() {
    // Do stuff
})->everyFiveMinutes();
```

还可以借助回调来决定什么时候执行或不执行某些操作，通过  `when()`  或者  `skip()`  实现：

```
$schedule
    ->call('Mailer@BusinessDayMailer') // 执行类方法
    ->weekdays() // 周一到周五执行
    ->skip(function(TypeHintedDeciderClass $decider) { // 如果是节假日则跳过
        return $decider->isHoliday();
    });
```


