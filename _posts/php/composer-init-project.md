---
title: "composer - 初始化项目"
date: 2022-04-14 22:14:53
toc: true
categories:
  - [ "Php","composer" ]
---

composer 国内加速镜像站 :  https://developer.aliyun.com/composer

, 下面我们开始安装项目中使用到的包文件, 对于 composer
的配置文件完整项目参见 [composer.json 架构](http://docs.phpcomposer.com/04-schema.html)

这里的安装流程遵循官方的 [Laravel 5.3 安装](https://laravel.com/docs/5.3/installation)

## 修改 composer 更新源地址

这里假定你已经安装了 `composer` 并且可以使用 `composer` 来运行命令.

列出所有config

```
$ composer config --list
```

修改镜像地址

```
$ composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

## 全局安装 laravel/installer

由于我们的项目使用 `laravel`, 这里需要先安装 `laravel/installer`

```
$ composer global require "laravel/installer"
```

安装完成后我们会在 `~/.composer/vendor/bin` 目录下发现 `laravel` 命令, 我们使用这个命令来初始化项目, 如果没有设置为全局变量,
需要设置为全局变量

```
$ laravel new demo_project
Crafting application...
Loading composer repositories with package information
Installing dependencies (including require-dev) from lock file
...
```

## 安装常用的项目包

这里加载上我们需要的包, 这里是我使用 `laravel` 框架常用的包

```
{
	...
	"require": {
		"php": ">=5.6.4",
		"laravel/framework": "5.3.*",
		"laravelcollective/html": "5.3.*",
		"nesbot/carbon": "~1.21",
		"doctrine/dbal": "~2.5"
	},
	"require-dev": {
		"phpunit/phpunit": "~5.6",
		"itsgoingd/clockwork": "~1.12",
		"barryvdh/laravel-ide-helper": "~2.2"
	},
   ...
}
```

接下来, 我们运行 `composer update` 来对我们定义的 composer 包进行更新.

```
$ composer update
...
...
Writing lock file
Generating autoload files
```

当出现绿色的 `Generating autoload files` 代表我们的包已经安装完成了 Done

