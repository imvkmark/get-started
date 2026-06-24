---
description: 'PHPUnit是PHP的单元测试框架，支持本地或项目中安装，通过自动加载配置。测试用例使用断言验证代码行为，可配合XML配置文件运行。教程涵盖私有方法测试技巧、NullLogger创建及常见写法示例。'
lastUpdated: '2026-06-22 02:37:37'
head:
  - - meta
    - name: 'og:title'
      content: 'PHPUnit 简介'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PHPUnit是PHP的单元测试框架，支持本地或项目中安装，通过自动加载配置。测试用例使用断言验证代码行为，可配合XML配置文件运行。教程涵盖私有方法测试技巧、NullLogger创建及常见写法示例。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/testing/phpunit-introduction.html'
---
# PHPUnit 简介

官方文档：[https://phpunit.readthedocs.io/zh_CN/latest/](https://phpunit.readthedocs.io/zh_CN/latest/)

单元测试是分别对程序的单元(方法, 函数)进行测试，判断执行结果是否符合预期

> 单元测试能协助开发者什么？  
> 1.确保单元的执行结果  
> 2.尽早发现程序中的错误  
> 3.修改程序, 更加有信心

::: tip 💡
测试驱动开发(TDD）是敏捷开发中的一项核心实践和技术，也是一种设计方法论。TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码. TDD的基本思路就是通过测试来推动整个开发的进行，但测试驱动开发并不只是单纯的测试工作，而是把需求分析，设计，质量控制量化的过程. TDD首先考虑使用需求（对象、功能、过程、接口等），主要是编写测试用例框架对功能的过程和接口进行设计，而测试框架可以持续进行验证
:::

phpunit 作为单元测试一项比较重要的工具是保障代码质量的最优质的工具, 在这里我们会使用 PHPUnit，这是一个我经常使用的测试框架，目前的测试套件特性支持 PHPSpec, Codeception 和 Behat (默认)

## 安装和运行

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

## 写法搜集

### 绕过私有方法

在单元测试里绕过访问限制去验证一个私有静态工厂方法的“兜底返回值”

```PHP
<?php

class PlatformClientManagerTest extends TestCase
{

    public function testCreatesDedaoClientWithTenantIdAndToken(): void
    {
        # 拿到 PlatformClientManager 里的私有方法 createClient
        $method = new \ReflectionMethod(PlatformClientManager::class, 'createClient');
        
        # [<= 8.0 需要设置] 因为它是 private static，正常外部不能直接调，所以测试用反射绕进去
        $method->setAccessible(true);

        # 在调用这个静态方法。这里 null 表示“静态方法没有对象实例”
        $client = $method->invoke(null, LogCard::TYPE_DEDAO, 'tenant-123', 'token-abc', '');

        # 初次验证, 验证实例是否创建
        $this->assertInstanceOf(DedaoClient::class, $client);

        # 同样, 拿到类实例
        $reflection = new ReflectionClass($client);
        
        # 拿到私有属性
        $tenantId = $reflection->getProperty('tenantId');
        $token = $reflection->getProperty('token');
        
        # [<= 8.0 需要设置] 设置为可访问
        $tenantId->setAccessible(true);
        $token->setAccessible(true);

        # 进行验证
        $this->assertSame('tenant-123', $tenantId->getValue($client));
        $this->assertSame('token-abc', $token->getValue($client));
    }
}
```

### 创建 NullLogger 

```PHP
<?php

class PlatformClientManagerTest extends TestCase
{
    // 手动搭一个最小可用的 Laravel 容器环境
    protected function setUp(): void
    {
        parent::setUp();
        
        // 创建一个独立的 IoC 容器，不依赖完整应用启动流程
        $container = new Container;
        
        // 往容器里注册一个 LoggerFactory 的“现成实例”
        // 拿到的都是这个匿名类对象，而不是真实的日志工厂
        $container->instance(LoggerFactory::class, new class
        {
            public function get(string $channel = ''): NullLogger
            {
                return new NullLogger;
            }
        });

        # 把刚刚这个容器设成 Laravel 的“全局容器实例”
        Container::setInstance($container);
    }

    // 重置这个全局容器，把上一个测试留下的注册项全部清空
    protected function tearDown(): void
    {
        Container::setInstance(new Container);

        parent::tearDown();
    }
}
```

---

::: info 📆
更新记录
2023年12月28日
- 加入 Testsuits
- 更新配图
:::