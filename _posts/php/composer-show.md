---
title: "composer - 平台软件包"
date: 2022-04-14 22:14:53
toc: true
categories:
  - [ "Php","composer" ]
---

Composer 将那些已经安装在系统上，但并不是由 Composer 安装的包视为一个虚拟的平台软件包。这包括PHP本身，PHP扩展和一些系统库。

- `php` 表示用户的 PHP 版本要求，你可以对其做出限制。例如 `>=5.4.0`。如果需要64位版本的 PHP，你可以使用 `php-64bit` 进行限制。
- `hhvm` 代表的是 HHVM（也就是 HipHop Virtual Machine） 运行环境的版本，并且允许你设置一个版本限制，例如，'>=2.3.3'。
- `ext-<name>` 可以帮你指定需要的 PHP 扩展（包括核心扩展）。通常 PHP 拓展的版本可以是不一致的，将它们的版本约束为 *
  是一个不错的主意。一个 PHP 扩展包的例子：包名可以写成 ext-gd。
- `lib-<name>` 允许对 PHP 库的版本进行限制。

以下是可供使用的名称：curl、iconv、icu、libxml、openssl、pcre、uuid、xsl。

你可以使用 `composer show --platform` 命令来获取可用的平台软件包的列表。

```
composer-plugin-api 1.1.0     The Composer Plugin API
ext-bcmath          7.0.4     The bcmath PHP extension       精准计算
ext-bz2             7.0.4     The bz2 PHP extension          Bzip2
ext-calendar        7.0.4     The calendar PHP extension	 历法扩展集
ext-ctype           7.0.4     The ctype PHP extension        字符类型检测
ext-curl            7.0.4     The curl PHP extension         curl
ext-date            7.0.4     The date PHP extension         日期
ext-dom             20031129  The dom PHP extension          dom, 操作xml
ext-exif            0         The exif PHP extension         照相机图片信息读取
ext-fileinfo        1.0.5     The fileinfo PHP extension     猜测文件的内容类型以及编码
ext-filter          7.0.4     The filter PHP extension       数据过滤验证
ext-ftp             7.0.4     The ftp PHP extension          ftp协议支持
ext-gd              7.0.4     The gd PHP extension           gd 图像处理
ext-gettext         7.0.4     The gettext PHP extension      NLS (Native Language Support) API
ext-gmp             7.0.4     The gmp PHP extension          任意长度数值据算
ext-hash            1.0       The hash PHP extension         信息摘要（哈希）引擎
ext-iconv           7.0.4     The iconv PHP extension        字串转换
ext-igbinary        1.2.2-dev The igbinary PHP extension     序列化货站
ext-imagick         3.4.0RC6  The imagick PHP extension      图片处理
ext-imap            7.0.4     The imap PHP extension         邮箱协议
ext-intl            1.1.0     The intl PHP extension         国际化
ext-json            1.4.0     The json PHP extension         json 支持
ext-libxml          7.0.4     The libxml PHP extension       标准扩展, 很多扩展依托于此组件
ext-mbstring        7.0.4     The mbstring PHP extension     多字节文本
ext-mcrypt          7.0.4     The mcrypt PHP extension       加密算法
ext-mysqli          7.0.4     The mysqli PHP extension       mysql 驱动
ext-mysqlnd         0         The mysqlnd PHP extension      mysql native drive
ext-openssl         7.0.4     The openssl PHP extension      支持 openssl 
ext-pcntl           7.0.4     The pcntl PHP extension        进程控制
ext-pcre            7.0.4     The pcre PHP extension         正则语法
ext-PDO             7.0.4     The PDO PHP extension          pdo组件
ext-pdo_dblib       7.0.4     The pdo_dblib PHP extension    ..
ext-pdo_mysql       7.0.4     The pdo_mysql PHP extension    ..
ext-Phar            2.0.2     The Phar PHP extension         php 打包 类似于java 的 jar
ext-posix           7.0.4     The posix PHP extension        posix 正则语法支持
ext-readline        7.0.4     The readline PHP extension     脚本/命令行支持
ext-redis           2.2.8     The redis PHP extension        redis
ext-Reflection      7.0.4     The Reflection PHP extension   类解析
ext-session         7.0.4     The session PHP extension      session
ext-shmop           7.0.4     The shmop PHP extension        share memory .共享内存
ext-SimpleXML       7.0.4     The SimpleXML PHP extension    xml 操作
ext-soap            7.0.4     The soap PHP extension         soap 协议支持
ext-sockets         7.0.4     The sockets PHP extension      socket 通信客户端
ext-SPL             7.0.4     The SPL PHP extension          php 标准化
ext-sysvmsg         7.0.4     The sysvmsg PHP extension      PHP事件驱动: 进程间通信(Inter-Process Messaging, IPC)
ext-sysvsem         7.0.4     The sysvsem PHP extension      PHP事件驱动: 信号量(Semaphores) 
ext-sysvshm         7.0.4     The sysvshm PHP extension      PHP事件驱动: 共享内存(Shared Memory)
ext-tidy            7.0.4     The tidy PHP extension         清理, 维护, 转换 html 文档
ext-tokenizer       7.0.4     The tokenizer PHP extension    分析php源码的工具
ext-wddx            7.0.4     The wddx PHP extension         Web Distributed Data Exchange , xml分支
ext-xml             7.0.4     The xml PHP extension          xml 扩展
ext-xmlreader       7.0.4     The xmlreader PHP extension    xml 读取
ext-xmlrpc          7.0.4     The xmlrpc PHP extension       xml 更新通知
ext-xmlwriter       7.0.4     The xmlwriter PHP extension    xml 写入
ext-xsl             7.0.4     The xsl PHP extension          xml 的 xsl 解析辅助
ext-Zend-OPcache    7.0.6     The Zend OPcache PHP extension 代码缓存引擎, 代码加速
ext-zip             1.13.0    The zip PHP extension          zip 支持
ext-zlib            7.0.4     The zlib PHP extension         .gz 文件支持
lib-curl            7.47.0    The curl PHP library           第三方库: curl 
lib-iconv           2.23      The iconv PHP library          第三方库: iconv
lib-ICU             55.1      The intl PHP library           第三方库: intl 国际化
lib-libxml          2.9.3     The libxml PHP library         第三方库: xml 库
lib-openssl         1.0.2.7   OpenSSL 1.0.2g-fips            第三方库: openssl 库
lib-pcre            8.38      The pcre PHP library           第三方库: pcre 库
lib-xsl             1.1.28    The xsl PHP library            第三方库: xsl 库
php                 7.0.4     The PHP interpreter
php-64bit           7.0.4     The PHP interpreter, 64bit
```

