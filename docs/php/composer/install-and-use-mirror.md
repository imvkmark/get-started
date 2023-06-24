# Composer 安装 / 加速

## 安装

**方法 1 : 官方方式**

```shell
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

> 参考官方文档 : [https://getcomposer.org/download/](https://getcomposer.org/download/)

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
