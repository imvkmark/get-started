---
description: '该文档总结了Laravel开发中的常见问题，包括错误“Class log does not exist”、控制器数值类不能使用int类型、Laravel 5.3+获取登录用户的方法、使用Faker获取假数据以及PHP图片在Laravel中显示乱码的解决方案。'
lastUpdated: '2026-06-18 06:47:27'
head:
  - - meta
    - name: 'og:title'
      content: 'FAQ '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档总结了Laravel开发中的常见问题，包括错误“Class log does not exist”、控制器数值类不能使用int类型、Laravel 5.3+获取登录用户的方法、使用Faker获取假数据以及PHP图片在Laravel中显示乱码的解决方案。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/faq/index.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/d5d73ad5754e0f17d818a22bb83e3626.png'
---
# FAQ

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

```Plaintext
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

- 或者在控制器方法里我们使用 `Auth::user()`

除了上面的折中的办法，我们一定要在构造函数搞定的话那么请看这里：

```Plaintext
protected $user;
public function __construct()
{
    $this->middleware(function ($request, $next) {
        $this->user = $request->user();
        return $next($request);
    });
}
```

这样你就可以在其它方法里使用 `$this->user` 来访问当前登录用户了。

FYI: [[5.3] Controller closure middleware](https://github.com/laravel/framework/pull/15080)

### 使用 Faker 获取假数据

`Laravel` 源码中是在 `DatabaseServiceProvider` 中注册的国际化支持。

```Plaintext
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

```Plaintext
$ php artisan tinker
Psy Shell v0.9.9 (PHP 7.2.15 — cli) by Justin Hileman
>>> app(\\Faker\\Generator::class)->phoneNumber
=> "13977433809"
```

### php图片写法在 laravel 框架中显示乱码

> 问题 : 使用laravel 框架直接在php中输出图片是不显示的.

```PHP
Route::get('png', function () {
    $im = @imagecreate(200, 50) or die("创建图像资源失败");
    imagecolorallocate($im, 255, 255, 255);
    $text_color = imagecolorallocate($im, 0, 0, 255);
    imagestring($im, 5, 0, 0, "Hello world!", $text_color);
    imagepng($im);
    imagedestroy($im);
});
```

显示内容如下:

![](https://file.wulicode.com/feishu-images/d5d73ad5754e0f17d818a22bb83e3626.png)

这里的头信息是:

```Plaintext
$ curl -I https://i.wulicode.com/php/image/png
HTTP/1.1 200 OK
Server: nginx/1.23.2
Content-Type: text/html; charset=UTF-8
```

这里返回的类型是 text/html 类型, 所以输出错误, 这里需要继续修改头信息, 于是更改为如下的代码

```PHP
Route::get('png', function () {
    ob_start();
    $im = @imagecreate(200, 50) or die("创建图像资源失败");
    imagecolorallocate($im, 255, 255, 255);
    $text_color = imagecolorallocate($im, 0, 0, 255);
    imagestring($im, 5, 0, 0, "Hello world!", $text_color);
    imagepng($im);
    imagedestroy($im);
    $content = ob_get_clean();
    return response($content, 200, [
        'Content-Type' => 'image/png',
    ]);
});
```

这里在某些情况下可以展示, 内容为:

![](https://file.wulicode.com/feishu-images/6e4be1e5ece397c09918590ad4b1d0ca.png)

但是有些框架也不行, 如下展示

![](https://file.wulicode.com/feishu-images/0e64512f6ac78421c89335bfbe1e8521.png)

在不可以的框架中, 由于考虑可能是`缓存/缓冲区`的问题, 输出下 `ob_get_status()` 结果发现是有内容的

```Plaintext
Array
(
    [name] => default output handler
    [type] => 0
    [flags] => 112
    [level] => 0
    [chunk_size] => 4096
    [buffer_size] => 8192
    [buffer_used] => 1
)
```

所以我们需要清除缓冲区内容, 然后重新生成并且输出, 也就是输出的时候是保证不要输出任何内容/ 包含空行, 当然出现这个问题的原因可能是编码的时候是 `utf-8`  
但是存在 `bom` 头导致的信息.

最终源码解决如下:

```PHP
Route::get('png', function () {
    if (ob_get_status()) {
        ob_end_clean();
    }
    ob_start();
    $im = @imagecreate(200, 50) or die("创建图像资源失败");
    imagecolorallocate($im, 255, 255, 255);
    $text_color = imagecolorallocate($im, 0, 0, 255);
    imagestring($im, 5, 0, 0, "Hello world!", $text_color);
    imagepng($im);
    imagedestroy($im);
    $content = ob_get_clean();
    return response($content, 200, [
        'Content-Type' => 'image/png',
    ]);
});
```

如此, 问题解决

## 参考

- [Class log does not exist](https://laracasts.com/discuss/channels/general-discussion/class-log-does-not-exist)