---
title: "Swoole 学习笔记"
date: 2022-11-14 14:08:03
toc: true
categories:
- ["Php","Swoole"]
---

## 进度
- 进程管理9


## 运行模式
这里对异步非阻塞的理解是 : 就是你有多个进程，同时在运行，互相不会阻塞对方，就是swoole里开多个进程的效果(来自 b 站 - 码农老张的回复)

### SWOOLE_BASE 
没有 master 进程的角色, 之后 Manager 和 Worker 进程, 我们假定建立了4个 worker 进程, 然后看下依赖树, 如果是  1 个 Worker, 则不会创建 Manager 进程
```
 |   \-+= 80844 duoli php ./base.php           # Manager
 |     |--- 80848 duoli php ./base.php         # Worker .. 1
 |     |--- 80849 duoli php ./base.php         ..
 |     |--- 80850 duoli php ./base.php         ..
 |     \--- 80851 duoli php ./base.php         # Worker .. 4
```
比如这里我们设定一个进程, 同时启用了 sleep , 官方文档的说法是服务将会退化为同步模式
```php
<?php

use Swoole\Http\Request;
use Swoole\Http\Response;
use Swoole\Http\Server;


$server = new Server('', 9501, SWOOLE_BASE);

$server->set([
    'worker_num' => 1,
]);

$server->on('Request', function (Request $request, Response $response) {
    $sleep = $request->get['sleep'] ?: 0;
    go(function () use ($sleep, $response) {
        sleep($sleep);
        $response->end($sleep);
    });
});

$server->start();
```
我们启动服务后运行(使用2 个命令行), 这个也可能说明了回调函数函数中有阻塞操作会将 Server 退化为同步模式
```
$ curl http://127.0.0.1:9501/\?sleep=5          
$ curl http://127.0.0.1:9501/\?sleep=2
5s 后输出 5
7s 后输出 2
```

### SWOOLE_PROCESS 模式
Process 模式是 4.x 默认模式, 5.x 默认模式更改成了 BASE 模式<br />还是上面的例子我们将运行模式更改为 SWOOLE_PROCESS 模式, 这里的进程变更为如下
```
| | \-+= 08050 duoli php ./process.php            # Master 进程
 | |   \-+- 08051 duoli php ./process.php         # Manager 进程 
 | |     |--- 08052 duoli php ./process.php       # Worker 进程(如果存在 Task Worker 进程也在以下将进程添加进来)
 | |     |--- 08053 duoli php ./process.php
 | |     |--- 08054 duoli php ./process.php
 | |     \--- 08055 duoli php ./process.php
```

## 新补充的内容
**安装部分**

1. openssl
2. http2
3. <br />
4. cares
5.  [Yasd](https://github.com/swoole/yasd) , 使用这个工具进行完整的 swoole 调试和跟踪
6. xhprof 和 blackfire, molten 可以用 swoole tracker 来替代

**启动**<br />**swoole 是否可以做 php-fpm 的类型客户端**

