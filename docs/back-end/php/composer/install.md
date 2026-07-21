---
description: 'Composer安装加速指南：支持curl、php、wget及Macbrew安装。修改镜像源可配置当前项目或全局生效，也可用第三方软件快速切换。更新使用自我更新参数。'
lastUpdated: '2026-07-21 12:07:28'
head:
  - - meta
    - name: 'og:title'
      content: 'Composer 安装和使用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Composer安装加速指南：支持curl、php、wget及Macbrew安装。修改镜像源可配置当前项目或全局生效，也可用第三方软件快速切换。更新使用自我更新参数。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/composer/install.html'
---
# Composer 安装和使用

```Plaintext
______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
```

## 安装和配置

### 安装

#### 使用 brew 安装

```Bash
$ brew install composer
```

#### 官方安装

中文安装文档 :

[简介 | Composer 中文文档 | Composer 中文网](https://docs.phpcomposer.com/00-intro.html#Downloading-the-Composer-Executable)

**方法 1 : 官方方式**

> 参考官方文档 : [https://getcomposer.org/download/](https://getcomposer.org/download/)

```Bash
# curl 方式
$ curl -sS http://packagist.cn/composer/installer | php

# php 方式
$ php -r "readfile('http://packagist.cn/composer/installer');" | php

# wget 官方
$ wget https://getcomposer.org/composer.phar
$ chmod +x composer.phar
$ mv composer.phar /usr/bin/composer
```

**方法 2 : 下载并给予权限**

```Bash
$ wget https://mirrors.aliyun.com/composer/composer.phar
$ chmod +x composer.phar
$ mv composer.phar /usr/local/bin/composer
```

### 全局使用

composer 可以安装全局的命令来为系统提供服务内容, 安装全局命令后加入如下定义可以在全局内访问到

```Bash
# ---- composer
export PATH="$HOME/.composer/vendor/bin:$PATH"
```

安装 psysh

```Bash
composer global require psy/psysh
```

### 访问加速

::: warning ⚠️

由于composer 在多年前被挂了影视资源, 导致国内某些情况下不去同步最新的包, 所以不推荐用这种方式来使用国内的镜像站来加速, 可以采用代理来访问国外的站点

:::

可以使用阿里巴巴提供的 Composer 全量镜像  / [阿里云Composer镜像站](https://developer.aliyun.com/composer)

#### a). 配置只在当前项目生效

```Bash
$ composer config repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消当前项目配置

```Bash
$ composer config --unset repos.packagist
```

#### b). 配置全局生效

```Bash
$ composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消全局配置

```Bash
$ composer config -g --unset repos.packagist
```

#### c). 使用第三方软件快速修改、切换 composer 镜像源

[https://github.com/slince/composer-registry-manager](https://github.com/slince/composer-registry-manager)

```Bash
$ composer global require slince/composer-registry-manager
```

列出可用的所有镜像源，前面带 `*` 代表当前使用的镜像

```Bash
$ composer repo:ls
 --- ------------- ------------------------------------------------ ------------------------------
      composer      https://packagist.org                            Europe, Canada and Singapore
  *   aliyun        https://mirrors.aliyun.com/composer              China
      tencent       https://mirrors.cloud.tencent.com/composer       China
      huawei        https://mirrors.huaweicloud.com/repository/php   China
      cnpkg         https://php.cnpkg.org                            China
      sjtug         https://packagist.mirrors.sjtug.sjtu.edu.cn      China
      phpcomposer   https://packagist.phpcomposer.com                China
      kkame         https://packagist.kr                             South Korea
      hiraku        https://packagist.jp                             Japan
      webysther     https://packagist.com.br                         Brazil
      solidworx     https://packagist.co.za                          South Africa
      indra         https://packagist.phpindonesia.id                Indonesia
      varun         https://packagist.in                             India
 --- ------------- ------------------------------------------------ ------------------------------
```

使用 aliyun 镜像源

```Bash
$ composer repo:use aliyun
[OK] Use the repository [aliyun] success
```

可以看到 aliyun 前面有一个 \* 号，代表当前使用的是 aliyun 的源

## 命令

### `self-update`  - 更新

将 Composer 自身升级到最新版本，只需要运行 `self-update` 命令。它将替换你的 `composer.phar` 文件到最新版本。

```Bash
$ composer self-update
```

如果你想要升级到一个特定的版本，可以这样简单的指定它：

```Plaintext
composer self-update 2.5.3
```

- **–rollback (-r) :** 回滚到你已经安装的最后一个版本。
- **–clean-backups:** 在更新过程中删除旧的备份，这使得更新过后的当前版本是唯一可用的备份。

### `show` 显示资料

#### `--platform` 显示软件包

Composer 将那些已经安装在系统上，但并不是由 Composer 安装的包视为一个虚拟的平台软件包。这包括PHP本身，PHP扩展和一些系统库。

- `php` 表示用户的 PHP 版本要求，你可以对其做出限制。例如 `>=5.4.0`。如果需要64位版本的 PHP，你可以使用 `php-64bit` 进行限制。
- `hhvm` 代表的是 HHVM（也就是 HipHop Virtual Machine） 运行环境的版本，并且允许你设置一个版本限制，例如，`>=2.3.3`
- `ext-<name>` 可以帮你指定需要的 PHP 扩展（包括核心扩展）。通常 PHP 拓展的版本可以是不一致的，将它们的版本约束为 \* 是一个不错的主意。一个 PHP 扩展包的例子：包名可以写成 `ext-gd`
- `lib-<name>` 允许对 PHP 库的版本进行限制。以下是可供使用的名称：curl、iconv、icu、libxml、openssl、pcre、uuid、xsl

可以使用 `composer show --platform` 命令来获取可用的平台软件包的列表

```Plain Text
composer               2.10.2   Composer package
composer-plugin-api    2.9.0    The Composer Plugin API
composer-runtime-api   2.2.2    The Composer Runtime API

# PHP 版本支持

# 扩展库
ext-*                  8.5.8    PHP 的一些扩展库

# Lib 苦
lib-bz2                1.0.8    The bz2 library
lib-curl               8.21.0   The curl library
lib-curl-libssh2       1.11.1   curl libssh2 version
lib-curl-openssl       3.6.3    curl OpenSSL version (3.6.3)
lib-curl-zlib          1.2.12   curl zlib version
lib-date-timelib       2022.15  date timelib version
lib-date-zoneinfo      2026.1   zoneinfo ("Olson") database for date
lib-fileinfo-libmagic  5.46     fileinfo libmagic version
lib-gd                 2.3.3    The gd library
lib-gmp                6.3.0    The gmp library
lib-iconv              1.11     The iconv library
lib-icu                78.3     The ICU unicode and globalization support library
lib-icu-cldr           48       ICU CLDR project version
lib-icu-unicode        17.0.0   ICU unicode version
lib-icu-zoneinfo       2026.1   zoneinfo ("Olson") database for icu
lib-ldap-openldap      2.6.13   OpenLDAP version of ldap
lib-libsodium          1.0.22   The libsodium library
lib-libxml             2.9.13   libxml library version
lib-libxslt            1.1.35   The libxslt library
lib-libxslt-libxml     2.9.13   libxml version libxslt is compiled against
lib-mbstring-libmbfl   1.3.2    mbstring libmbfl version
lib-mbstring-oniguruma 6.9.10   mbstring oniguruma version
lib-openssl            3.6.3    OpenSSL 3.6.3 9 Jun 2026
lib-pcre               10.47    The pcre library
lib-pcre-unicode       16.0.0   PCRE Unicode version support
lib-pdo_pgsql-libpq    18.4     libpq for pdo_pgsql
lib-pdo_sqlite-sqlite  3.53.3   The pdo_sqlite-sqlite library
lib-pgsql-libpq        18.4     libpq for pgsql
lib-sqlite3-sqlite     3.53.3   The sqlite3-sqlite library
lib-zip-libzip         1.11.4   The zip-libzip library
lib-zlib               1.2.12   The zlib library
```

---

::: info 📆

更新记录
2026年07月21日
- 加入全局使用, 不推荐使用镜像方式访问, 调整文件格式

:::