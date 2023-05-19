---
title: "[译] Roave 安全建议"
date: 2022-04-14 22:26:31
toc: true
categories:
- ["Php","扩展"]
---

原文地址 : [Roave Security Advisories](https://github.com/Roave/SecurityAdvisories)<br />这个包确保您的应用程序没有安装与已知安全漏洞相关的依赖项。


## 安装
```
composer require --dev roave/security-advisories:dev-master
```

## 使用
此包不提供任何 API 或可用类:其唯一目的是防止安装存在已知和已经书面声明的安全问题的软件。只需要在 `composer.json`  `"require-dev"` 部分添加 `"roave/security-advisories": "dev-master"` 这个组件即可. 这样你便无法安装已知安全漏洞的软件来让程序遍体鳞伤.<br />例如，尝试以下方法:
```
composer require --dev roave/security-advisories:dev-master
# following commands will fail:
composer require symfony/symfony:2.5.2
composer require zendframework/zendframework:2.3.1
```
安全检查只在通过 `composer require` 或运行  `composer update`才会运行. 通过 `composer install` 不会触发任何安全版本检查。

## 稳定性
这个包只能在它的 `dev-master` 中需要, 因为有问题包永远不会有 `stable/tagged`的版本。安全问题实际上是一个可变的目标，将项目锁定到包的特定标记版本没有任何意义。<br />因此，这个包只适合安装在可部署项目的根目录中。

## 源码
这个包从 [FriendsOfPHP/security-advisories](https://github.com/FriendsOfPHP/security-advisories) 中获取关于各种 composer 项目中存在的安全问题的信息。

