# Composer 安装 / 加速

## 安装

**方法 1 : 官方方式**

```shell
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

> 参考官方文档 :  https://getcomposer.org/download/

**方法 2 : 下载并给予权限**

```shell
wget https://mirrors.aliyun.com/composer/composer.phar
chmod +x composer.phar
mv composer.phar /usr/local/bin/composer
```

**Mac**

使用 brew 安装

```
brew install composer
```

## 加速

由于默认情况下执行 composer 各种命令是去国外的 composer 官方镜像源获取需要安装的具体软件信息，所以在不使用代理、不翻墙的情况下，从国内访问国外服务器的速度相对比较慢

可以使用阿里巴巴提供的 Composer 全量镜像

- [阿里云Composer镜像站](https://developer.aliyun.com/composer)

### a). 配置只在当前项目生效

```
$ composer config repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消当前项目配置

```
$ composer config --unset repos.packagist
```

### b). 配置全局生效

```
$ composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消全局配置

```
$ composer config -g --unset repos.packagist
```

### c). 使用第三方软件快速修改、切换 composer 镜像源

- [slince/composer-registry-manager - github](https://github.com/slince/composer-registry-manager)

安装 crm

```
composer global require slince/composer-registry-manager
```

列出可用的所有镜像源，前面带 * 代表当前使用的镜像

```
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

```
$ composer repo:use aliyun
[OK] Use the repository [aliyun] success
```

可以看到 aliyun 前面有一个 * 号，代表当前使用的是 aliyun 的源

## 徽标

```
______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
```

## 平台软件包

Composer 将那些已经安装在系统上，但并不是由 Composer 安装的包视为一个虚拟的平台软件包。这包括PHP本身，PHP扩展和一些系统库。

- `php` 表示用户的 PHP 版本要求，你可以对其做出限制。例如 `>=5.4.0`。如果需要64位版本的 PHP，你可以使用 `php-64bit` 进行限制。
- `hhvm` 代表的是 HHVM（也就是 HipHop Virtual Machine） 运行环境的版本，并且允许你设置一个版本限制，例如，'>=2.3.3'。
- `ext-<name>` 可以帮你指定需要的 PHP 扩展（包括核心扩展）。通常 PHP 拓展的版本可以是不一致的，将它们的版本约束为 *
  是一个不错的主意。一个 PHP 扩展包的例子：包名可以写成 ext-gd。
- `lib-<name>` 允许对 PHP 库的版本进行限制。

以下是可供使用的名称：curl、iconv、icu、libxml、openssl、pcre、uuid、xsl。

你可以使用 `composer show --platform` 命令来获取可用的平台软件包的列表。

```
composer               2.5.7    Composer package
composer-plugin-api    2.3.0    The Composer Plugin API
composer-runtime-api   2.2.2    The Composer Runtime API
ext-bcmath             7.4.33   The bcmath PHP extension            精准计算
ext-bz2                7.4.33   The bz2 PHP extension              Bzip2
ext-calendar           7.4.33   The calendar PHP extension         历法扩展集
ext-ctype              7.4.33   The ctype PHP extension            字符类型检测
ext-curl               7.4.33   The curl PHP extension             curl
ext-date               7.4.33   The date PHP extension             日期
ext-dba                7.4.33   The dba PHP extension             
ext-dom                20031129 The dom PHP extension              dom, 操作xml
ext-exif               7.4.33   The exif PHP extension             照相机图片信息读取
ext-ffi                7.4.33   The FFI PHP extension              
ext-fileinfo           7.4.33   The fileinfo PHP extension         猜测文件的内容类型以及编码    
ext-filter             7.4.33   The filter PHP extension           数据过滤验证  gd 图像处理
ext-ftp                7.4.33   The ftp PHP extension              ftp协议支持 
ext-gd                 7.4.33   The gd PHP extension               图片处理
ext-gettext            7.4.33   The gettext PHP extension             
ext-gmp                7.4.33   The gmp PHP extension             
ext-hash               7.4.33   The hash PHP extension             信息摘要（哈希）引擎
ext-iconv              7.4.33   The iconv PHP extension            字串转换
ext-igbinary           3.2.12   The igbinary PHP extension         邮箱协议
ext-intl               7.4.33   The intl PHP extension             国际化
ext-json               7.4.33   The json PHP extension             json 支持
ext-ldap               7.4.33   The ldap PHP extension             
ext-libxml             7.4.33   The libxml PHP extension             
ext-lzf                1.7.0    The lzf PHP extension              
ext-mbstring           7.4.33   The mbstring PHP extension         多字节文本   
ext-mcrypt             1.0.5    The mcrypt PHP extension           加密算法   
ext-mysqli             7.4.33   The mysqli PHP extension           mysql 驱动
ext-mysqlnd            0        The mysqlnd PHP extension (actual version: mysqlnd 7.4.33)
ext-odbc               7.4.33   The odbc PHP extension
ext-openssl            7.4.33   The openssl PHP extension          支持 openssl 
ext-pcntl              7.4.33   The pcntl PHP extension
ext-pcre               7.4.33   The pcre PHP extension
ext-pdo                7.4.33   The PDO PHP extension
ext-pdo_dblib          7.4.33   The pdo_dblib PHP extension
ext-pdo_mysql          7.4.33   The pdo_mysql PHP extension
ext-pdo_odbc           7.4.33   The PDO_ODBC PHP extension
ext-pdo_pgsql          7.4.33   The pdo_pgsql PHP extension
ext-pdo_sqlite         7.4.33   The pdo_sqlite PHP extension
ext-pgsql              7.4.33   The pgsql PHP extension
ext-phar               7.4.33   The Phar PHP extension               
ext-phpdbg_webhelper   7.4.33   The phpdbg_webhelper PHP extension       php 打包 类似于java 的 jar            
ext-posix              7.4.33   The posix PHP extension                  posix 正则语法支持
ext-pspell             7.4.33   The pspell PHP extension                 脚本/命令行支持 
ext-readline           7.4.33   The readline PHP extension               redis  
ext-redis              5.3.7    The redis PHP extension                            
ext-reflection         7.4.33   The Reflection PHP extension             类解析         
ext-session            7.4.33   The session PHP extension                session                    
ext-shmop              7.4.33   The shmop PHP extension                  share memory .共享内存               
ext-simplexml          7.4.33   The SimpleXML PHP extension              xml 操作                  
ext-soap               7.4.33   The soap PHP extension                   soap 协议支持                     
ext-sockets            7.4.33   The sockets PHP extension                socket 通信客户端                
ext-sodium             7.4.33   The sodium PHP extension                                
ext-spl                7.4.33   The SPL PHP extension                    php 标准化                 
ext-sqlite3            7.4.33   The sqlite3 PHP extension                     
ext-swoole             4.8.12   The swoole PHP extension               
ext-sysvmsg            7.4.33   The sysvmsg PHP extension                         
ext-sysvsem            7.4.33   The sysvsem PHP extension                              
ext-sysvshm            7.4.33   The sysvshm PHP extension                        
ext-tidy               7.4.33   The tidy PHP extension                   清理, 维护, 转换 html 文档
ext-tokenizer          7.4.33   The tokenizer PHP extension               
ext-xml                7.4.33   The xml PHP extension                    xml 读取
ext-xmlreader          7.4.33   The xmlreader PHP extension              xml 的 xsl 解析辅助     xml 更新通知     
ext-xmlrpc             7.4.33   The xmlrpc PHP extension    
ext-xmlwriter          7.4.33   The xmlwriter PHP extension              xml 写入
ext-xsl                7.4.33   The xsl PHP extension
ext-zend-opcache       7.4.33   The Zend OPcache PHP extension
ext-zip                1.15.6   The zip PHP extension
ext-zlib               7.4.33   The zlib PHP extension
ext-zstd               0.12.0   The zstd PHP extension
lib-bz2                1.0.8    The bz2 library
lib-curl               8.1.2    The curl library
lib-curl-libssh2       1.11.0   curl libssh2 version
lib-curl-zlib          1.2.12   curl zlib version
lib-date-timelib       2018.04  date timelib version
lib-date-zoneinfo      2022.1   zoneinfo ("Olson") database for date
lib-fileinfo-libmagic  537      fileinfo libmagic version
lib-gd                 2.3.3    The gd library
lib-gmp                6.2.1    The gmp library
lib-icu                73.2     The ICU unicode and globalization support library
lib-icu-cldr           43.1     ICU CLDR project version
lib-icu-unicode        15.0.0   ICU unicode version
lib-icu-zoneinfo       2023.3   zoneinfo ("Olson") database for icu
lib-ldap-openldap      2.6.4    OpenLDAP version of ldap
lib-libsodium          1.0.18   The libsodium library
lib-libxml             2.9.13   libxml library version
lib-libxslt            1.1.35   The libxslt library
lib-libxslt-libxml     2.9.13   libxml version libxslt is compiled against
lib-mbstring-libmbfl   1.3.2    mbstring libmbfl version
lib-mbstring-oniguruma 6.9.8    mbstring oniguruma version
lib-openssl            1.1.1.21 OpenSSL 1.1.1u  30 May 2023
lib-pcre               10.42    The pcre library
lib-pcre-unicode       14.0.0   PCRE Unicode version support
lib-pdo_pgsql-libpq    15.3     libpq for pdo_pgsql
lib-pdo_sqlite-sqlite  3.42.0   The pdo_sqlite-sqlite library
lib-pgsql-libpq        15.3     libpq for pgsql
lib-sqlite3-sqlite     3.42.0   The sqlite3-sqlite library
lib-zip-libzip         1.9.2    The zip-libzip library
lib-zlib               1.2.11   The zlib library
php                    7.4.33   The PHP interpreter
php-64bit              7.4.33   The PHP interpreter, 64bit
php-ipv6               7.4.33   The PHP interpreter, with IPv6 support
```

