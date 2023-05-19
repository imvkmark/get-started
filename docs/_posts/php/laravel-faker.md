---
title: "使用 Laravel 中的 Faker 获取假数据"
date: 2022-04-14 22:27:00
toc: true
categories:
- ["Php","Laravel"]
---

`Laravel`  源码中是在  `DatabaseServiceProvider`  中注册的国际化支持。

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

