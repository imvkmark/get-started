---
title: "ecstore - cmd install 加载过程"
date: 2022-04-14 22:14:56
toc: true
categories:
- ["Php","源码阅读","ecstore"]
---

设置  `ROOT_DIR`<br />设置  `APP_DIR`<br />加载  `kernel.php`<br />注册自动加载  `kernel::register_autoload()`<br />调用  `base_shell_loader->run()`
> - 忽略用户终止(用户终止的时候, 禁止程序继续执行) _ignore_user_abort(true)_
> - 打开绝对刷送 _ob_implicit_flush(true)_, _ini_set('implicit_flush',true)_
> - 设置不同平台的字符输出
> - `cmd.bat` `php cmd` 这两个命令将导致 `$_SERVER['argv']` 为 `array('cmd')`, 不会传递第二个参数
> - 如果有 `cmd update` `cmd base:queue` 则执行命令, 否则进入交互模式

如果是 `cmd install` 则调用内置的命令 `buildin_commander` 运行 `command_install`
> - 检测系统 `base_system_check`
> - 获取安装队列 `base_application_manage->install_queue()`
> - 运行安装 ``base_application_manage->install()`

