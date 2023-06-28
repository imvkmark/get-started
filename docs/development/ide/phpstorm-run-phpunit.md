---
title: "PHPUnit简介以及如何在项目中使用"
date: 2022-04-20 19:01:11
toc: true
categories:
- ["Php","扩展"]
---

# PHPUnit简介以及如何在项目中使用

官方文档： https://phpunit.readthedocs.io/zh_CN/latest/ 




## 单元测试介绍
单元测试是分别对程序的单元(方法, 函数)进行测试，判断执行结果是否符合预期
> 单元测试能协助开发者什么？
> 1.确保单元的执行结果
> 2.尽早发现程序中的错误
> 3.修改程序, 更加有信心


## PHPUnit
> PHPUnit 是 PHP 程式语言中最常见的单元测试 (unit testing) 框架，PHPUnit 是参考 xUnit 架构利用 PHP 实作出来。


### 安装PHPUnit
```
# 项目中安装
$ composer require --dev phpunit/phpunit

# 下载到本地
$ wget https://phar.phpunit.de/phpunit-9.phar
```
使用项目中安装可以在项目中直接运行, 无需太多配置, 将 phar 下载到非项目文件夹, 可以减少项目代码的体积, 我一般采用下载到本地, 然后多个项目公用一个 `phpunit.phar`, 减少项目体积, 不过需要在 IDE中增加更多配置

### 配置autoload
添加下面的代码到composer.json PackageName是项目的名称，src是包含PHP class文件的文件夹地址，项目根目录下的子文件夹。
```
...
    "autoload": {
       "psr-4": {
            "PackageName\\": "src/",
            "PackageName\\Tests": "tests/"
        }
     },
...
```

### 

### 编写PHPUnit测试

1. 针对类 `Example` 的测试写在类 `ExampleTest` 中, `ExampleTest` 继承自 `TestCase`
2. 对于方法的测试命名为 `test*` 的公用方法
3. 在测试方法内，类似于 `assertEquals()` 的断言方法用来对实际值和预期值的匹配做出验证

ArrayTest  用 PHPUnit 测试数组操作
```php
<?php

use PHPUnit\Framework\TestCase;

class ArrayTest extends TestCase
{
    public function testPushAndPop()
    {
        $stack = [];
        $this->assertCount(0, $stack);
        $stack[] = 'foo';
        $this->assertEquals('foo', $stack[count($stack) - 1]);
        $this->assertCount(1, $stack);
        $this->assertEquals('foo', array_pop($stack));
        $this->assertCount(0, $stack);
    }
}
```


### PHPUnit 断言
laravel 中除了标准的 PHPUnit 断言(`assertEquals()`, `assertContains()`, `assertInstanceOf()`, …更多断言请看 https://phpunit.readthedocs.io/zh_CN/latest/assertions.html?highlight=assertTrue# )之外, 还存在很多允许测试 web 应用的检测项目

`assertPageLoaded($uri, $message = null)`

检测最近的页面是否被加载, 如果不存在 url / message 时候会报错

`assertResponseOk()`

是否页面相应OK

`assertReponseStatus($code)`

是否响应指定的code

`assertViewHas($key, $value = null)`

视图中是否存在指定的数据

`assertViewHasAll($bindings)`

视图中是否存在指定的一系列数据

`assertViewMissing($key)`

指定视图中是否不存在这个数据

`assertRedirectedTo($uri, $with = [])`

检测是否重定向到指定的uri

`assertRedirectedToRoute($name, $parameters = [], $with = [])`

是否客户端重定向到指定的路由

`assertRedirectedToAction($name, $parameters = [], $with = [])`

是否重定向到 action

`assertSessionHas($key, $value = null)`

session 中是否存在 key/ value

`assertSessionHasAll($bindings)`

session 中是否存在指定的 kv

`assertSessionHasErrors($bindings = [])`

session 是否存在错误

`assertHasOldInput()`

session 中是否存在以前的数据

### 示例 xml 文件
[phpunit.xml at 9.x · laravel](https://github.com/laravel/laravel/blob/9.x/phpunit.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="./vendor/phpunit/phpunit/phpunit.xsd"
    bootstrap="vendor/autoload.php"
    colors="true">
    <testsuites>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
    </testsuites>
    <coverage processUncoveredFiles="true">
        <include>
            <directory suffix=".php">./app</directory>
        </include>
    </coverage>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="BCRYPT_ROUNDS" value="4"/>
        <env name="CACHE_DRIVER" value="array"/>
        <!-- <env name="DB_CONNECTION" value="sqlite"/> -->
        <!-- <env name="DB_DATABASE" value=":memory:"/> -->
        <env name="MAIL_MAILER" value="array"/>
        <env name="QUEUE_CONNECTION" value="sync"/>
        <env name="SESSION_DRIVER" value="array"/>
        <env name="TELESCOPE_ENABLED" value="false"/>
    </php>
</phpunit>
```

## 在 Phpstorm 中运行

### 配置 Php Interpreter
在配置中搜索 `PHP`, 打开 `CLI Interpreter`对话框, 根据自己安装 Php 的位置来设定 `php`的位置.

![image.png](https://file.wulicode.com/yuque/202211/11/17/4511B4uV6L8T.png?x-oss-process=image/resize,h_521)

### 设置PHPUnit
在phpstorm中 `Languages & Frameworks >PHP >Test Frameworks` 根据不同的加载方式设置不同的配置

- 设置 phpunit 的运行文件, 这里支持 phar 文件(代码可不在项目中)
- 代码在项目中, 使用 composer autoloader 加载
- 将 phpunit 安装到 global, 使用 `~/.composer/vendor/bin/phpunit` 目录

![](https://file.wulicode.com/yuque/202211/11/17/4512sQDxoL6V.png?x-oss-process=image/resize,h_727)

如果是项目额外加载, 则需要把 phpunit 所在的文件夹作为 library 加入项目, 便于代码提示 `Preferences | Languages & Frameworks | PHP` , 加入 phpunit 文件夹

![](https://file.wulicode.com/yuque/202211/11/17/4512aQwHvI8A.png?x-oss-process=image/resize,h_770)

### 运行单元测试
在 IDE 中运行

- 点击方法名称
- 右键测试类
- 右键测试文件夹

![](https://file.wulicode.com/yuque/202211/11/17/4513z7weBsX1.png?x-oss-process=image/resize,h_272)

查看运行结果
```
Time: 00:00.598, Memory: 22.00 MB

OK (1 test, 4 assertions)
Process finished with exit code 0
```

## PHPUnit 扩展概念

### 覆盖率 / Coverage
覆盖率主要的目的是检测代码中那些逻辑尚未覆盖, 便于有针对性的编写单元测试.

安装 xdebug / Phpunit
```
# 安装 xdebug
$ pecl install xdebug
```
启用 xdebug
```
# php.ini 文件
xdebug.mode = coverage
```
![](https://file.wulicode.com/note/2022/3-28/1648409643623.png)

![](https://file.wulicode.com/note/2022/3-28/1648409623315.png)

### 数据支持 @dataProvider
`@dataProvider`是 PHPUnit 的一个注解, 用于生成和验证批量数据以及结果, 这样我们便可以批量测试提供数据是否正常
```php
<?php

use PHPUnit\Framework\TestCase;

class DataProviderTest extends TestCase
{

    /**
     * @dataProvider plusProvider
     * @return void
     */
    public function testPlus($first, $second, $result)
    {
        $this->assertEquals($result, $first + $second);
    }

    public function plusProvider(): array
    {
        return [
            [1, 2, 3],
            [4, 5, 9],
            [4, 5, 8],
        ];
    }
}
```
运行结果
```php
[root]
/Users/duoli/Documents/workbench/lang/php/get-started/core/tests/PhpUnit
  DataProviderTest
    testPlus
      testPlus with data set #0
      testPlus with data set #1
      testPlus with data set #2
```

## FAQ

### Laravel 运行出现 Target class [config] does not exist
首先检查在项目中是否可能出现运结果为失败的但是未继续运行的情况, 如果存在, 需要首先调整掉, 这里出现的原因是未继承  Laravel 的 UnitTest, 无法进行应用的创建.

