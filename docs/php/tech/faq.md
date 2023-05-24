# Php - FAQ

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

