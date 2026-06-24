---
description: 'PHPUnit是PHP单元测试框架，本文介绍其在PhpStorm中的使用，包括安装、配置autoload、编写测试与断言、XML配置、运行测试、覆盖率（需安装xdebug），以及@dataProvider、测试套件等高级功能。同时涉及Laravel中常见问题如Target class [config] does not exist和命令行测试方法。'
lastUpdated: '2026-06-18 08:47:18'
head:
  - - meta
    - name: 'og:title'
      content: 'PHPUnit 简介以及在 PhpStorm 中使用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PHPUnit是PHP单元测试框架，本文介绍其在PhpStorm中的使用，包括安装、配置autoload、编写测试与断言、XML配置、运行测试、覆盖率（需安装xdebug），以及@dataProvider、测试套件等高级功能。同时涉及Laravel中常见问题如Target class [config] does not exist和命令行测试方法。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/testing/phpstorm-setting-for-phpunit.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/70862db4d5873f837e98f4347e1c5ee8.png'
---
# PHPUnit 简介以及在 PhpStorm 中使用

官方文档：[https://phpunit.readthedocs.io/zh_CN/latest/](https://phpunit.readthedocs.io/zh_CN/latest/)

## 单元测试介绍

单元测试是分别对程序的单元(方法, 函数)进行测试，判断执行结果是否符合预期

> 单元测试能协助开发者什么？  
> 1.确保单元的执行结果  
> 2.尽早发现程序中的错误  
> 3.修改程序, 更加有信心

::: tip 💡
测试驱动开发(TDD）是敏捷开发中的一项核心实践和技术，也是一种设计方法论。TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码. TDD的基本思路就是通过测试来推动整个开发的进行，但测试驱动开发并不只是单纯的测试工作，而是把需求分析，设计，质量控制量化的过程. TDD首先考虑使用需求（对象、功能、过程、接口等），主要是编写测试用例框架对功能的过程和接口进行设计，而测试框架可以持续进行验证
:::

phpunit 作为单元测试一项比较重要的工具是保障代码质量的最优质的工具, 在这里我们会使用 PHPUnit，这是一个我经常使用的测试框架，目前的测试套件特性支持 PHPSpec, Codeception 和 Behat (默认)

## PHPUnit

> PHPUnit 是 PHP 程式语言中最常见的单元测试 (unit testing) 框架，PHPUnit 是参考 xUnit 架构利用 PHP 实作出来。

### 安装PHPUnit

```Bash
# 项目中安装
$ composer require --dev phpunit/phpunit

# 下载到本地
$ wget https://phar.phpunit.de/phpunit-9.phar
```

使用项目中安装可以在项目中直接运行, 无需太多配置, 将 phar 下载到非项目文件夹, 可以减少项目代码的体积, 我一般采用下载到本地, 然后多个项目公用一个 `phpunit.phar`, 减少项目体积, 不过需要在 IDE中增加更多配置

### 配置autoload

添加下面的代码到 composer.json PackageName 是项目的命名空间，src 是包含 PHP 类文件的文件夹地址，项目根目录下的子文件夹

```JSON
{
  "autoload": {
    "psr-4": {
      "PackageName\\": "package/src/"
    }
  },
  "autoload-dev": {
    "psr-4": {
      "PackageName\\Tests": "package/tests/"
    }
  }
}
```

### 编写PHPUnit测试

1. 针对类 `Example` 的测试写在类 `ExampleTest` 中, `ExampleTest` 继承自 `TestCase`
2. 对于方法的测试命名为 `test*` 的公用方法
3. 在测试方法内，类似于 `assertEquals()` 的断言方法用来对实际值和预期值的匹配做出验证

ArrayTest  用 PHPUnit 测试数组操作

```PHP
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

laravel 中除了标准的 PHPUnit 断言(`assertEquals()`, `assertContains()`, `assertInstanceOf()`, …更多断言[请看](https://phpunit.readthedocs.io/zh_CN/latest/assertions.html))之外, 还存在很多允许测试 web 应用的检测项目

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

phpunit 在 `10.x` 版本中文件格式有所调整 https://github.com/laravel/laravel/blob/10.x/phpunit.xml

```XML
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true"
>
    <testsuites>
        <testsuite name="Unit">
            <directory>tests/Unit</directory>
        </testsuite>
        <testsuite name="Feature">
            <directory>tests/Feature</directory>
        </testsuite>
    </testsuites>
    <source>
        <include>
            <directory>app</directory>
        </include>
    </source>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="BCRYPT_ROUNDS" value="4"/>
        <env name="CACHE_DRIVER" value="array"/>
        <!-- <env name="DB_CONNECTION" value="sqlite"/> -->
        <!-- <env name="DB_DATABASE" value=":memory:"/> -->
        <env name="MAIL_MAILER" value="array"/>
        <env name="PULSE_ENABLED" value="false"/>
        <env name="QUEUE_CONNECTION" value="sync"/>
        <env name="SESSION_DRIVER" value="array"/>
        <env name="TELESCOPE_ENABLED" value="false"/>
    </php>
</phpunit>
```

调整项说明

- `source` 源码标签根元素调整为 `phpunit`

以下是 `9.x` 版本的示例 https://github.com/laravel/laravel/blob/9.x/phpunit.xml

```XML
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

在配置中搜索 `PHP`, 打开 `CLI Interpreter` , 对话框, 根据自己安装 Php 的位置来设定 PHP 的位置

![](https://file.wulicode.com/feishu-images/70862db4d5873f837e98f4347e1c5ee8.png)

### 设置PHPUnit

在phpstorm中 `Languages & Frameworks >PHP >Test Frameworks` 根据不同的加载方式设置不同的配置

- 设置 phpunit 的运行文件, 这里支持 phar 文件(代码可不在项目中)
- 代码在项目中, 使用 composer autoloader 加载
- 将 phpunit 安装到 global, 使用 `~/.composer/vendor/bin/phpunit` 目录

![](https://file.wulicode.com/feishu-images/f860c1613084cf36bbddbb8b19b3ba19.png)

如果是项目额外加载, 则需要把 phpunit 所在的文件夹作为 library 加入项目, 便于代码提示 `Preferences | Languages & Frameworks | PHP` , 加入 phpunit 文件夹

![](https://file.wulicode.com/feishu-images/03806f8bc824638fdf429e650c48279a.png)

### 运行单元测试

在 IDE 中运行

- 点击方法名称
- 右键测试类
- 右键测试文件夹

![](https://file.wulicode.com/feishu-images/724284d9d620e54aa941e713eab9158c.png)

查看运行结果

```Plaintext
Time: 00:00.598, Memory: 22.00 MB

OK (1 test, 4 assertions)
Process finished with exit code 0
```

这里有可以设置两个快捷键

**`Run Context Configuration`**

设置为 `ALT + T` : 运行完整的单元测试

**`Run with Coverage Context Configuration`**

设置为 `ALT + C` : 运行具有覆盖率的单元测试

![](https://file.wulicode.com/feishu-images/a5640d52d1eaccfcf9a1de0e017b2a70.png)

### 覆盖率 / Coverage

覆盖率主要的目的是检测代码中那些逻辑尚未覆盖, 便于有针对性的编写单元测试.安装 xdebug / Phpunit

```Plaintext
# 安装 xdebug
$ pecl install xdebug
```

启用 xdebug

```Plaintext
# php.ini 文件
xdebug.mode = coverage
```

![](https://file.wulicode.com/feishu-images/376fedf27a969424070afd057d3ff751.png)

![](https://file.wulicode.com/feishu-images/f3500e9e4b87a4737b558859011a6169.png)

### 数据支持 @dataProvider

`@dataProvider`是 PHPUnit 的一个注解, 用于生成和验证批量数据以及结果, 这样我们便可以批量测试提供数据是否正常

```PHP
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

```Plaintext
[root]
/Users/duoli/Documents/workbench/lang/php/get-started/core/tests/PhpUnit
  DataProviderTest
    testPlus
      testPlus with data set #0
      testPlus with data set #1
      testPlus with data set #2
```

### TestSuit 测试套件

如果要执行指定的分组的单元测试,我们可以做如下设定

```XML
<testsuite name="clear">
    <directory>./modules/finance/tests/Clear</directory>
    <directory>./modules/user/tests/Clear</directory>
</testsuite>
```

在配置单元测试的选项中, 我们可以使用 `Edit Configurations` 面板

![](https://file.wulicode.com/feishu-images/3b774fe627c5ba3c03b7b920ce0741b6.png)

这样我们便可以运行整套的单元测试了, 在命令行中我们可以运行如下命令来运行单元测试

```Bash
$ phpunit --testsuit clear
```

## FAQ

### Laravel 运行出现 Target class [config] does not exist

首先检查在项目中是否可能出现运结果为失败的但是未继续运行的情况, 如果存在, 需要首先调整掉, 这里出现的原因是未继承 Laravel 的 UnitTest, 无法进行应用的创建.

### Laravel 如何进行命令行的测试

这样要求在 command 的 handle 方法中必须返回 0 或者 非 0 , 如果是 0 则代表程序执行正确, 其他则代表错误

```PHP
$code = Artisan::call('py-system:ban', [
    'type'  => 'backend',
    'value' => $ip,
]);
$this->assertEquals(0, $code, "ip value is : {$ip}");
```

```PHP
<?php

class BanCommand extends Command
{
    protected $signature = 'py-system:ban
        {type : account type}
        {value : ip/device}
        {--note : note}
    ';

    protected $description = 'Ban user ip or device';

    public function handle()
    {
        // ...

        if (!$Ban->establish($data)) {
            $this->error($Ban->getError()->getMessage());
            return 1;
        }
        else {
            $this->info('添加成功');
            return 0;
        }
    }
}
```

::: info 📆
更新记录
v1.0 (2023年12月28日)
- 加入 Testsuits
- 更新配图
:::