# Php - FAQ

## composer - 更新出错 ssl3_get_server_certificate:certificate verify failed

这是在运行 `composer self-update -vvv` 来更新 composer.phar 的时候出现的.

错误内容:

```
[Composer\Downloader\TransportException]
The "https://getcomposer.org/version" file could not be downloaded: SSL operation failed with code 1. OpenSSL Error messages:
error:14090086:SSL routines:ssl3_get_server_certificate:certificate verify failed
Failed to enable crypto
failed to open stream: operation failed
```

从网上搜罗了很多的解决方式, 指定了两个方面的问题

- 是否开启 `openssl` 和 `curl`
- 是否配置正确的 `openssl.cafile` 的证书路径

但是这两个问题还是没能解决以上的错误, 另外还存在一个问题就是 ca 证书的问题:
下载证书:  http://curl.haxx.se/docs/caextract.html 

- 自动转换的证书(CA Certs from mozilla.org)

> HTTP from curl.haxx.se:  cacert.pem HTTPS from github:  ca-bundle.crt

- 移除 RSA-1024 的证书 (RSA-1024 removed)

> 在 2014.9 早些时候, Mozilla 移除了 RSA 1024 校验. 这导致了 一些 TSL 库不能去验证网站的正确性(如果不支持 RFC4185 的 path discovery 属性).这包含OpenSSL 和
> GnuTLS. 所以在清理之前转换的 CA 证书在这里下载:   an older ca-bundle from github.


配置 php.ini

```
openssl.cafile = /real/path/to/cacert.pem
```

问题解决.

## 远程的包更改为本地开发模式

有时候我们会遇到线上的composer 开发包功能不是很完善, 但是很多功能我们还能够用到, 我们只能自己去修改一部分代码让这个包能够去运行, 同时不使用 `composer` 进行更新,
否则代码会再更新的时候再次被覆盖掉.

下边是以下几个步骤:

在 `composer.json` 中去掉调用

一般情况下, 去掉包, 包在进行更新的时候会自己删除

在 `vendor/composer/installed.json` 中去掉这个已经安装的引用

这样在再次安装的时候这个包就会保留到本地, 不会被删除掉

在 `composer.json` 中加入对这个包的命名空间的映射

因为composer 的包都会自动进行加载, 如果没有进行加载, 则也是找不到这个文件, 所以需要对命名空间做下映射

比如我们引用一个第三方包, 他的命名空间是这样的

```
"autoload": {
	"psr-4": {
		"Imvkmark\\L5Thumber\\": "src/L5Thumber"
	}
},
```

我们需要在根目录下的 `composer.json`加入

```
"autoload": {
	"psr-4": {
		"Imvkmark\\L5Thumber\\": "vendor/imvkmark/l5-thumber/src/L5Thumber",
	}
},
```

这样便能够对包的命名空间进行映射, 同时进行修改了.

更新 `composer.json`

其实到这里已经结束, 并且完成了自己的功能了.

这样我们可以不受顾忌的修改代码, 并且同时给作者发送推送请求, 等待作者更新这个代码, 然后我们再改回来, 这样我们又能够使用最新的库了.

## 运行 composer 安装包的时候出现 curl 错误

> curl error 60 while
> downloading  https://raw.githubusercontent.com/symfony/recipes/flex/main/index.json: 
> SSL: no alternative certificate subject name matches target host name 'raw.githubusercontent.com'

或者
> In CurlDownloader.php line 377:
> curl error 28 while
> downloading  https://raw.githubusercontent.com/symfony/recipes/flex/main/index.json: 
> Connection timeout after 10004 ms

这种情况下是使用了代理, 第一种情况是代理转发的时候证书出现问题, 导致不匹配, 第二种是请求的时候代理无法访问到这个网站导致的

解决方法:

使用  https://raw.hellogithub.com/hosts  获取host, 不使用代理的方式来访问, 这样既能够保障联通, 又能够保障证书

以下方案看情况, 很难保证一定成功

另一种 timeout 方案, 可尝试

```shell
$ composer config --global process-timeout 3000
```

另一种 ssl 方案, 可尝试

```shell
$ composer config -g -- disable-tls false
```

## _GET,_POST, _COOKIE的同名变量的处理

```php
$version = '3000';

foreach(array('_POST', '_GET', '_COOKIE') as $__R) {
    /*
    $__R  :  $_POST
    $__R  :  $_GET
    $__R  :  $_COOKIE
    */
    if($$__R) {
        // $_POST
        foreach($$__R as $__k => $__v) {
            // if has $_POST[version] = 6;
            // $__k is version
            // $$__k is $version
            // var_dump($__v);
            //var_dump(isset($$__k));
            // 如果已经设定值并且传递过来的值和设定的值相同则unset掉这个值
            if(isset($$__k) && $$__k == $__v)
                // 我觉得这里应该是unset掉传递过来的值,从而保证系统内值的使用
                unset($$__k);
        }
    }
    
}
```

## Symfony 和 Laravel 读取数据的对比

> 仅仅对比下两个框架读取数据的复杂和易用程度

```php
// laravel
$next = (clone $Question)->orderBy('sort')->where('sort', '>', $entity->sort)->first('id')->value('id');
$prev = (clone $Question)->orderBy('sort', 'desc')->where('sort', '<', $entity->sort)->first('id')->value('id');

// symfony Doctrine
$qb = $repository->createQueryBuilder("A");
createWhere($qb, [
    "gt" => ["sort" => $entity->getSort()],
    "eq" => ["test_id" => $entity->getTestId()],
]);
$qb->setFirstResult(0)->setMaxResults(1);
$qb->orderBy("A.sort", "ASC");
$rst = $qb->getQuery()->execute();
if (count($rst) == 1) {
    if (isset($rst[0])) {
        $next = $rst[0]->getId();
    }
}
$qb = $repository->createQueryBuilder("A");
//            createWhere($qb,["lt"=>["sort"=>$entity->getSort()]]);
createWhere($qb, [
    "lt" => ["sort" => $entity->getSort()],
    "eq" => ["test_id" => $entity->getTestId()],
]);
$qb->orderBy("A.sort", "DESC");
$qb->setFirstResult(0)->setMaxResults(1);
$rst = $qb->getQuery()->execute();
if (count($rst) == 1) {
    if (isset($rst[0])) {
        $prev = $rst[0]->getId();
    }
}
```

## composer 下载的时候报错 Protocol "https" not supported or disabled in libcurl

查看下是否 php 版本支持 ssl, 如果不支持考虑重新安装并打开 ssl

![](https://file.wulicode.com/note/2021/10-23/11-24-47607.png)

## Malformed UTF-8 characters, possibly incorrectly encoded

一般都是截取 utf-8 数据的时候出现的错误, 把中文截取为无法识别的内容

## 7.2 升级为 7.4 问题

### EscapeShellArg 解码问题

在 php-fpm @ 7.4 版本中@ centos 系统, mac 系统无此问题

```php
<?php
// 返回值为空
echo escapeshellarg('中文');
// string(2) "''"
```

解决方案

```php
<?php
// 此行需要加入到文档前
setlocale(LC_CTYPE, "UTF8", "en_US.UTF-8");
```

## 应用

### PhpMyAdmin

_config.inc.php _一定要填写 blowfish_secret

```php
<?php
$cfg['blowfish_secret'] = 'xxx'; /* YOU MUST FILL IN THIS FOR COOKIE AUTH! */
```

