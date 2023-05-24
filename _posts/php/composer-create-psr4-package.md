---
title: "怎样创建 PSR-4 的 Php 包"
date: 2022-04-20 19:01:00
toc: true
categories:
- ["Php","composer"]
---

本文是帮助初学者搭建基础的 php composer 包, 本项目源码地址

- [github](https://github.com/imvkmark/php-util-demo)
- [packagist](https://github.com/imvkmark/php-util-demo)




## 目录结构和初建准备
首先创建一个目录来存放所有文件, 这里我 命名为 `util-demo` , 目录中需要包含两个目录 `src/`, `tests/`, 所有的代码需要放置到 `src/` 目录, 所有的测试文件需要放置到 `tests/` 目录

初始化文件夹, 并使用 git 初始化项目, 便于进行版本管理
```
$ mkdir util-demo
$ cd util-demo
$ git init
```

## 初始化 composer
这里假定你已经安装了 composer, 如果没有安装, 请到 [https://getcomposer.org/download/](https://getcomposer.org/download/) 进行安装

初始化并输入包名, 这里默认使用 `duoli/util-demo` 包名
```
$ composer init
Welcome to the Composer config generator
This command will guide you through creating your composer.json config.
Package name (<vendor>/<name>) [duoli/util-demo]:
```
输入描述
```
Description []: first util package demo
```
输入作者名称, `n` 跳过
```
Author [duoli <zhaody901@126.com>, n to skip]:
```
设定包的稳定版本, 默认是 `stable`, 详细查看 [minimum-stability (root-only)](https://docs.phpcomposer.com/04-schema.html#minimum-stability)
```
Minimum Stability []:
```
安装类型 : Package Type, 默认是 `library`
```
Package Type (e.g. library, project, metapackage, composer-plugin) []:
```
License, 协议, 关于协议部分, 你可以选择自己需要的协议, 阮老师这里有一个阅读指南, 可以进行参考 如何选择开源许可证？, 对于协议部分的写法可以参考 [许可协议 license](https://docs.phpcomposer.com/04-schema.html#license) 这里
```
License []:
```
**require**

设定三方依赖, 表明当前项目/包是否有依赖于其他包进行开发, 这里选择 `no`,
```
Define your dependencies.
# 生产依赖
Would you like to define your dependencies (require) interactively [yes]?
```
**require-dev**

开发依赖, 这里我们加入 phpunit 作为单元测试依赖
```
Would you like to define your dev dependencies (require-dev) interactively [yes]?
Search for a package: phpunit
Found 15 packages matching phpunit
   [0] phpunit/phpunit
   ...
   [14] brianium/paratest
Enter package # to add, or the complete package name if it is not listed: 0
Enter the version constraint to require (or leave blank to use the latest version):
Using version ^8.5 for phpunit/phpunit
Search for a package:
```
当不需要额外增加包的时候, 直接回车, 确认安装包依赖, 初始化完成
```
{
    "name": "duoli/util-demo",
    "description" : "first util package demo",
    "require-dev": {
        "phpunit/phpunit": "^8.5"
    },
    "license": "MIT",
    "authors": [
        {
            "name": "duoli",
            "email": "zhaody901@126.com"
        }
    ],
    "require": {}
}
Do you confirm generation [yes]?
Would you like to install dependencies now [yes]? yes
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 29 installs, 0 updates, 0 removals
  - Installing sebastian/version (2.0.1): Downloading (100%)
  ......
  - Installing phpunit/phpunit (8.5.8): Downloading (100%)
sebastian/global-state suggests installing ext-uopz (*)
phpunit/phpunit suggests installing phpunit/php-invoker (^2.0.0)
Package phpunit/php-token-stream is abandoned, you should avoid using it. No replacement was suggested.
Writing lock file
Generating autoload files
5 packages you are using are looking for funding.
Use the `composer fund` command to find out more!
```
上边初始化完成之后, 我们文件目录应该如下所示
```
.
├── composer.json
├── composer.lock
└── vendor
```
作为包管理来讲, 我们需要忽略 `composer.lock` 和 `vendor` 文件夹, 因为在项目中使用此包的时候会进行全局的安装, 不提交是为了不产生冗余代码.

我们加入 `.gitignore` 文件, 加入这两个文件夹的忽略, 另外由于要生成 phpunit 测试文件, 我们还需要加入 `.phpunit.*` , 我这里还额外加入了 IDE 的忽略

**.gitignore**
```
# ide
.idea
# project
composer.lock
vendor/
# phpunit
.phpunit.*
```

## 文件自动加载 autoload
**autoload**

这里是上边初始化没有提及到的, `autoload` 指定了包的加载方式, Composer 可以自动加载包内文件, 但是你需要指定你的文件的加载方式, 这里我们使用的是 `psr-4` 标准, 详细的规范可以阅读 [PSR-4 自动加载规范](https://learnku.com/docs/psr/psr-4-autoloader/1608)

这里需要在 composer.json 中追加
```json
...
	"autoload": {
		"psr-4": {
			"Duoli\\UtilDemo\\": "src",
			"Duoli\\UtilDemoTests\\": "tests"
		}
	}
   ...
```
因为这个加载是后续添加的, 想要识别需要我们手动运行下 `composer dumpautoload`, 这样才可以识别我们添加的命名空间映射

另这里我额外约定了一个测试的命名空间, 方便对测试文件进行命名空间的目录识别

## travis 测试集成
如果打算在[GitHub](https://github.com)上托管包，一个不错优点是集成[Travis CI](https://travis-ci.org/)，这是一个持续集成应用程序，它会自动运行单元测试文件. 当接受 pr 时，会非常有用，因为你可以快速查看是否所有的测试都通过验证。

要与 Travis 集成，添加一个名为 `.travis.yml` 的文件，并复制以下内容
```
language: php
php:
    – 7.0
    – hhvm
before_script:
    – composer self-update
    – composer install –prefer-source –no-interaction –dev
script: phpunit
```
在这里，不会深入讨论使用 Travis 的问题，但这应该是一个很好的开始，你可以自己来进行研究如何使用它.

## 编写代码
现在可以编写代码了, 打开 `src` 目录创建 `File.php` 文件, 复制如下代码
```php
class File
{
	public function extension($filename)
	{
		return pathinfo($filename, PATHINFO_EXTENSION);
	}
}
```
如果你曾经查看过旧的 PHP 包源码，可能会发现一个 `Duoli/UtilDemo` 目录。PSR-4 不再使用嵌套的目录结构，而是允许直接在 `src` 目录下编写类

## 编写单元测试
现在我们已经编写了包源码，可以开始编写一些测试了。PHPUnit 需要一个名为 `phpunit.xml` 的文件来定义一些设置。在根目录中创建一个新的`phpunit.xml`文件，并复制以下代码:
```xml
<phpunit
	backupGlobals="false"
	backupStaticAttributes="false"
	bootstrap="vendor/autoload.php"
	colors="true"
	convertErrorsToExceptions="true"
	convertNoticesToExceptions="true"
	convertWarningsToExceptions="true"
	processIsolation="false"
	stopOnFailure="false">
	<testsuites>
		<testsuite name="Duoli Util Test Suite">
			<directory suffix=".php">./tests/</directory>
		</testsuite>
	</testsuites>
</phpunit>
```
如果不熟悉这个文件中意思，不用担心，你无需关注设置了哪些内容(当前来讲), 这个文件只是定义一些设置和文件应该如何自动加载的约定.

接下来，在 `tests` 目录下，创建一个名为 `StrTest.php`的文件，并复制以下代码:
```
<?php namespace Duoli\UtilDemoTests;
use Duoli\UtilDemo\File;
use PHPUnit\Framework\TestCase;
class FileTest extends TestCase
{
	public function testExtension()
	{
		$extension = File::extension('readme.md');
		$this->assertEquals('md', $extension);
	}
}
```
打开命令行并运行:
```
$ ./vendor/bin/phpunit
```
PHPUnit 会自动运行测试，并给出一个绿色的 `OK (1 test, 1 assertion)` 输出。

在编写测试文件时，需要确保测试类继承了 `PHPUnit\Framework\TestCase`

## 文档
最后要做的是创建一个 `Readme.md` 的文档。如果打算在 GitHub 上托管代码，这个文件会在代码页面显示出来，目的是描述包以及包如何工作.

还应该在源代码中包含一个许可证。默认情况下，你发布的任何东西都是你的版权所有，如果你想让其他人使用你的代码，你需要给它一个许可。一个好的选择是 MIT 许可

## 发布到 github 和 Packagist
现在已经完成了你的包，你可以将它推到 GitHub 和 Packagist。

GitHub 是一个托管的 git 存储库服务，它使得在软件协作变得非常容易。

Packagist 是查找和使用 PHP 包的服务商

要将代码推送到 GitHub，[创建一个新的存储库](https://github.com/new), 然后设定 git 的远端, 将代码推上去即可, 命令是
```
$ git remote add origin git@github.com:username/demo.git
$ git push -u origin master
```
在 Github 上集成 Packagist 和 Travis, 需要找到设置, 并且在  **Webhooks & Services** 部分找到这两个服务, 集成这两个服务需要授权 github 账户并且设置一些简单的步骤.

## 概括
如果以前从未开发过已发布的 php 包，那么需要考虑很多问题。然而，一旦你操作过不止一次就不至于这么复杂了.

PHP 的包结构非常简单，而 PSR-4 使其更加简单。一旦了解了该结构的每一部分是用于做什么，其他人阅读 PHP 包就会容易很多.

## 参考文章

- [How to create a PSR-4 PHP package](https://culttt.com/2014/05/07/create-psr-4-php-package/)

