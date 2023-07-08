

# Simple Captcha 包 (developer-tz/simple-captcha)

::: danger 已过时
For Laravel 5
:::

一个简单的 [Laravel 5](http://laravel.com/) 包是 [Simple Captcha for Laravel 5](https://github.com/developer-tz/laravel-5-simple-captcha).

## 安装

这个 Simple Captcha 服务提供者通过 [Composer](http://getcomposer.org) 安装 ,在 `composer.json` 中的 require 分支中配置

`developer-tz/simple-captcha` 包并且设置 `minimum-stability` 为 `dev` .

```
{
    "require": {
        "laravel/framework": "5.*",
        "developer-tz/simple-captcha": "dev-master"
    },
    "minimum-stability": "dev"
}
```

运行  `composer update` 或者 `composer install`.

Windows 平台下, 你需要配置php支持  `php_gd2.dll`.

## Usage / 使用

使用 Simple Captcha 服务, 你需要在 Laravel 启动时候注册服务.

这里有两种方式来设置.

在 `config/app.php` 找到 `providers` 部分, 按照如下注册服务提供者.

```
'providers' => array(
    // ...
    'DeveloperTz\SimpleCaptcha\SimpleCaptchaServiceProvider',
)
```

找到 `config/app.php` 的  `aliases` key .

```
'aliases' => array(
    // ...
    'SimpleCaptcha'      => 'DeveloperTz\SimpleCaptcha\Facades\SimpleCaptcha',
)
```

## Configuration / 配置

使用自己的配置需要首先发布下.

To use your own settings, publish config.

```
$ php artisan vendor:publish
```

## Example Usage / 示例

> 译注: 不起作用

```
// [your site path]/app/routes.php
Route::any('/simple-captcha-test', function()
{
    if (Request::getMethod() == 'POST')
    {
        $rules =  array('captcha' => array('required', 'captcha'));
        $validator = Validator::make(Input::all(), $rules);
        if ($validator->fails())
        {
            echo '<p style="color: #ff0000;">Incorrect!</p>';
        }
        else
        {
            echo '<p style="color: #00ff30;">Matched :)</p>';
        }
    }
    $content = Form::open(array(URL::to(Request::segment(1))));
    $content .= '<p>' . HTML::image(SimpleCaptcha::img(), 'Captcha image') . '</p>';
    $content .= '<p>' . Form::text('captcha') . '</p>';
    $content .= '<p>' . Form::submit('Check') . '</p>';
    $content .= '<p>' . Form::close() . '</p>';
    return $content;
});
```

`^_^`

## Links / 链接

- [L5 Simple Captcha on Github](https://github.com/developer-tz/laravel-5-simple-captcha)
- [L4 Captcha on Packagist](https://packagist.org/packages/developer-tz/simple-captcha)
- [License](http://www.opensource.org/licenses/mit-license.php)
- [Laravel website](http://laravel.com)

