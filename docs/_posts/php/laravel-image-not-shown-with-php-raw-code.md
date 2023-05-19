---
title: "php图片写法在 laravel 框架中显示乱码"
date: 2022-04-14 22:15:30
toc: true
categories:
- ["Php","Laravel","Laravel Faq"]
---

> 问题 : 使用laravel 框架直接在php中输出图片是不显示的. 


```php
Route::get('png', function () {
    $im = @imagecreate(200, 50) or die("创建图像资源失败");
    imagecolorallocate($im, 255, 255, 255);
    $text_color = imagecolorallocate($im, 0, 0, 255);
    imagestring($im, 5, 0, 0, "Hello world!", $text_color);
    imagepng($im);
    imagedestroy($im);
});
```
显示内容如下:<br />![image.png](https://file.wulicode.com/yuque/202212/12/14/5511ZKvvp6xB.png?x-oss-process=image/resize,h_91)<br />这里的头信息是: 
```
$ curl -I http://start.duoli.com/php/image/png
HTTP/1.1 200 OK
Server: nginx/1.23.2
Content-Type: text/html; charset=UTF-8
```
这里返回的类型是  text/html 类型, 所以输出错误, 这里需要继续修改头信息, 于是更改为如下的代码
```php
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
这里再某些情况下可以展示, 内容为: <br />![image.png](https://file.wulicode.com/yuque/202212/12/15/0010nk0J80YX.png?x-oss-process=image/resize,h_50)<br />但是有些框架也不行, 如下展示<br />![](https://file.wulicode.com/yuque/202208/04/23/3336ZA7QtP3V.png?x-oss-process=image/resize,h_77)<br />在不可以的框架中, 由于考虑可能是`缓存/缓冲区`的问题, 输出下 `ob_get_status()` 结果发现是有内容的
```
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
所以我们需要清除缓冲区内容, 然后重新生成并且输出, 也就是输出的时候是保证不要输出任何内容/ 包含空行, 当然出现这个问题的原因可能是编码的时候是 `utf-8` 但是存在 `bom` 头导致的信息. <br />最终源码解决如下: 
```php
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

