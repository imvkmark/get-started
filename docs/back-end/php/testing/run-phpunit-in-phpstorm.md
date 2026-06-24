---
description: '在PhpStorm中配置PHP解释器和PHPUnit可运行单元测试，支持数据提供者@dataProvider和测试套件TestSuit。覆盖率需安装xdebug并修改php.ini文件。Laravel若出现“Target class [config] does not exist”错误，需检查配置；命令行测试也有专门方法。'
lastUpdated: '2026-06-22 02:38:09'
head:
  - - meta
    - name: 'og:title'
      content: '在 PhpStorm 中运行单元测试'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在PhpStorm中配置PHP解释器和PHPUnit可运行单元测试，支持数据提供者@dataProvider和测试套件TestSuit。覆盖率需安装xdebug并修改php.ini文件。Laravel若出现“Target class [config] does not exist”错误，需检查配置；命令行测试也有专门方法。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/testing/run-phpunit-in-phpstorm.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/70862db4d5873f837e98f4347e1c5ee8.png'
---
# 在 PhpStorm 中运行单元测试

## 配置 Php Interpreter

在配置中搜索 `PHP`, 打开 `CLI Interpreter` , 对话框, 根据自己安装 Php 的位置来设定 PHP 的位置.

![](https://file.wulicode.com/feishu-images/70862db4d5873f837e98f4347e1c5ee8.png)

## 设置PHPUnit

在phpstorm中 `Languages & Frameworks >PHP >Test Frameworks` 根据不同的加载方式设置不同的配置

- 设置 phpunit 的运行文件, 这里支持 phar 文件(代码可不在项目中)
- 代码在项目中, 使用 composer autoloader 加载
- 将 phpunit 安装到 global, 使用 `~/.composer/vendor/bin/phpunit` 目录

![](https://file.wulicode.com/feishu-images/7c23d1d87fcb7ec43667c3ac0dd32e4b.png)

如果是项目额外加载, 则需要把 phpunit 所在的文件夹作为 library 加入项目, 便于代码提示 `Preferences | Languages & Frameworks | PHP` , 加入 phpunit 文件夹

![](https://file.wulicode.com/feishu-images/03806f8bc824638fdf429e650c48279a.png)

## 运行单元测试

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

## 覆盖率 / Coverage

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

## 数据支持 @dataProvider

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

## TestSuit 测试套件

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