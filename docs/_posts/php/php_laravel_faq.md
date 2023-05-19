---
title: "Laravel Faq"
date: 2022-04-20 19:01:04
toc: true
categories:
- ["Php","Laravel"]
---

## Laravel 错误 Class log does not exist ...
> Fatal error: Uncaught exception 'ReflectionException' with message 'Class log does not exist' in /Users/freek/dev/laravel/vendor/laravel/framework/src/Illuminate/Container/Container.php:776

出现这种问题的原因是不能够加载 log 方法. 原因是在加载的时候会加载 config 文件的数据, 而 config 文件中的配置是批量加载的, 所以在自己加载的时候 config 文件的写法不支持自定义的函数变量/ 常量/ 自定义方法.<br />所以从配置文件入手, 删除未加载的配置文件, 删除未导入包的配置文件.<br />这种问题一般出现在 复制项目, 并且删除了包的情况下.


## 控制器数值类不能使用 int 类型
> Argument 1 passed to Poppy\Sms\Http\Request\Backend\SmsController::destroy() must be of the type int or null, string given, called in /Users/duoli/Documents/workbench/dl.poppy/dev-v4/vendor/laravel/framework/src/Illuminate/Routing/Controller.php on line 54

需要对控制器进行如下调整
```diff
- public function destroy(int $id = null)
+ public function destroy(string $id = null)
{
...
}
```

## 参考文章:

- [Class log does not exist](https://laracasts.com/discuss/channels/general-discussion/class-log-does-not-exist)

