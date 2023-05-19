---
title: "Laravel 升级记录"
date: 2022-10-25 16:29:00
toc: true
categories:
- ["Php","Laravel"]
---

## Laravel 6.0 升级到 6.x 记录


### composer 2.0
> composer 2.0 版本和 laravel 6.0 版本不兼容

这个是 laravel 6.0 lts 版本的问题, 由于更改了加载方式, 这个方式在 6.0 版本中没有被修复导致的问题, 可以查看 : [https://github.com/composer/composer/issues/9340](https://github.com/composer/composer/issues/9340)<br />对于 laravel 版本的支持程度可以查看<br />![image.png](https://file.wulicode.com/yuque/202210/26/15/2012UOTsUYCG.png?x-oss-process=image/resize,h_355)<br />这里的解决问题的办法是强制使用 composer 1.x 版本
```
$ composer self-update --1
```

### 相关组件
为了使用 composer 2.x, 我把 laravel 6.0 升级到 6.x , 因为 laravel 自 6.18 之后才支持 composer 2, 同时升级的组件还有
```json
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
phpredis : 指的是使用 pecl 安装的 php 扩展 redis<br />predis   : 指的是 github 上的 predis/predis 的包<br />Laravel 推荐使用 `phpredis` 来代替 `predis`。原因是 `predis` 包很长时间没有更新<br />所以要记得先安装 `phpredis`, 然后在 `config/app.php` 中去掉 `Redis` 别名<br />**Mac 安装**
```shell
# 这里需要将当前版本设置为主版本才可以, 如果不是主版本则安装会太费劲
$ brew link --force php@{version}
$ pecl install igbinary
$ pecl install redis
$ brew services restart php@7.2
```
**其他平台**<br />应该是直接安装即可(未测试)<br />项目中在考虑兼容的情况下, 使用 predis, 暂时不启用 phpredis.

### 2. Unable to create configured logger. Using emergency logger
在 5.6 之后已经将配置文件独立 [config/logging.php](https://github.com/laravel/laravel/blob/master/config/logging.php), 将这个文件放置到指定目录, 然后 `app.php` 移除日志的配置 `Logging Configuration`

### 3. Call to undefined method Illuminate\Events\Dispatcher::fire()
在 (5.8 升级指南)([https://laravel.com/docs/5.8/upgrade](https://laravel.com/docs/5.8/upgrade)) 指出,<br />_Likelihood Of Impact: Low_
```
deprecated and removed
Events The fire Method
```
使用 dispatch 方法替代 `You should use the dispatch method instead.`

### 4. Class 'Illuminate\Support\Facades\Input' not found
使用 Request 替代 Input<br />`Input` no longer exists. Either use the `Request` facade or alias that instead of `Input`.

### 5. str_contains 等 helper 函数
这些函数均需要替换成静态函数方法 `Str::contains`<br />下面是 辅助函数列表<br />[5.1 辅助函数列表](https://learnku.com/docs/laravel/5.1/helpers/1068)

