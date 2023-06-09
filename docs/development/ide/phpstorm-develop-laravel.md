
# 「译+」 使用 PhpStorm 开发 Laravel 应用

::: danger
因为 Laravel 扩展已经不被维护, 此文章已过时
:::

很多PHP程序员使用 [laravel](http://laravel.com) 创建他们的应用程序。[laravel](http://laravel.com) 是一个免费开源的PHP web应用程序框架。它基于多个Symfony
组件，提供了一个开发框架，包括authentication, routing, sessions, caching 等模块.

去年夏天, 我们介绍了 支持Blade 。blade 是Laravel的模板语言， 对艺术家友好，这个Laravel程序员的命令行工具, 可以在PhpStorm中工作. 使用 Laravel 插件 和 Laravel IDE
帮助器, 我们可以进一步扩展PhpStorm对Laravel应用的支持。下面让我们看怎么做!

## 安装Laravel IDE 助手

- 官方方式

> 首先确认 `Composer` 在我们的项目中是可用的, 我们可以使用 `Composer` | `Add dependency…`
> 右键菜单安装 [Laravel 5 IDE Helper Generator](https://github.com/barryvdh/laravel-ide-helper) 到我们的项目. 搜索
> barryvdh/laravel-ide-helper，并且点击Install下载并添加到项目.

- [译注]自助方式

> 因为我们是在项目中使用, 所以我们在项目中添加这个功能, 在 `composer.json` 中添加 `require-dev` 分支
> `laravel 4.*` , 这里的版本应该填写 `1.*`

```
"require-dev": {        
// ...        
"barryvdh/laravel-ide-helper": "2.*"        
// ...
},
```

然后使用命令 `composer update -vvv` 来更新程序包

注册 `'Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider'` 服务到我们的应用, 即写入到 `config/app.php` 中的 provider中 , 这样在 `artisan list`
中便存在了`ide-helper`的命令, 运行 `artisan ide-helper:generate`, PhpStorm就会有代码完成功能，并且有Laravel的语法高亮.

## PhpStorm 中的 Laravel 插件

为了进一步提升我们的Laravel体验,我们也可以安装Laravel插件. 在 `Settings (Preferences)` | `Plugins`, 点击 `Browse repositories…` 按钮并搜索 Laravel. Install
plugin 按钮会下载并安装插件到IDE.

![](https://file.wulicode.com/yuque/202208/04/14/5053DNXU3InB.jpg?x-oss-process=image/resize,h_244)

重启IDE 并启用插件（ `Settings (Preferences)` | `Other Settings` | `Laravel Plugin` | `Enable Plugin for this Project`）. PhpStorm知道Laravel的界面做什么,
并且提供（controllers,views, routes, configuration, translations、等)的代码完成功能!

当然不只是代码自动完成，使用 `Ctrl+Click (CMD+Click  Mac OS X)` 或者 `Go To Declaration`（转到定义） `(Ctrl+B / CMD+B)`, PhpStorm 将会导航到那里, 比如配置项的声明。

关于使用 Blade 模板，Laravel 插件也可以提高体验, 比如：`@section` 指令的自动完成.

想了解更多吗？ 查看我们的 Laravel教程，这里包含了 PhpStorm 为 Laravel 开发准备的全部东西, 包括代码自动完成，导航，自动代码检查，命令行工具支持，调试和单元测试！

还可以在`composer.json`的`post-update-cmd`中加入命令保证 `helper`在每次update的时候都会更新，如下:

```
{
    "post-update-cmd": [
        "php artisan clear-compiled",
        "php artisan ide-helper:generate",
        "php artisan optimize"
    ]
}
```

另外，如果你的model是extend的Eloquent，这个插件还可以给项目中的model添加phpDoc，直接显示字段名，便于阅读，用法

```
php artisan ide-helper:models User
```

需要修改`composer.json`,在 `require-dev`段添加

```
"require-dev": {   
        "doctrine/dbal": "~2.3"
},
```

## 参考文章:

- [使用 PHPStorm 开发 Laravel 应用](http://www.oschina.net/translate/laravel-development-using-phpstorm)
- [Laravel Development using PhpStorm](http://blog.jetbrains.com/phpstorm/2015/01/laravel-development-using-phpstorm/)

