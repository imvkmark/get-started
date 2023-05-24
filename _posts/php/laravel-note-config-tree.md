---
title: "laravel 学习记录 02 - 配置和文件及目录说明"
date: 2022-04-14 22:15:01
toc: true
categories:
- ["Php","Laravel"]
---

## 数据库配置和 app.php 配置




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

## 配置文件

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

