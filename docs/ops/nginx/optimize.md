---
description: 'Nginx优化涉及连接数管理：查看系统级最大连接数（如`sysctl net.core.somaxconn`）、用户级限制（`ulimit -n`）及当前连接数。优化TimeWait和NotEstablished状态可调整`tcp_max_tw_buckets`等内核参数。进程数`worker_processes`需结合CPU核数设置，同时通过`ulimit`提升文件描述符上限。解决“upstream prematurely closed connection”错误需检查上游服务器超时、缓冲区配置或连接数限制。'
lastUpdated: '2026-06-17 12:37:46'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 优化'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx优化涉及连接数管理：查看系统级最大连接数（如`sysctl net.core.somaxconn`）、用户级限制（`ulimit -n`）及当前连接数。优化TimeWait和NotEstablished状态可调整`tcp_max_tw_buckets`等内核参数。进程数`worker_processes`需结合CPU核数设置，同时通过`ulimit`提升文件描述符上限。解决“upstream prematurely closed connection”错误需检查上游服务器超时、缓冲区配置或连接数限制。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/optimize.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/00fe5bd3f85b3fd99176a2fc884395a6.png'
---
# Nginx 优化

## 连接数

events 模块中包含nginx中所有处理连接的设置

`worker_connections` 设置可由一个 worker 进程同时打开的最大连接数。最大客户数也由系统的可用socket连接数限制（\~ 64K）

连接数包括代理服务器的连接、客户端的连接等，Nginx 总并发连接数 = `worker_process * worker_connections`

### 查看最大连接数

进程的最大连接数受 Linux 系统进程的最大打开文件数限制，只有执行了 `ulimit -HSn 65535` 之后 `worker_connections` 才能生效, 默认情况下服务器的 `ulimit -n` 的值是 `1024`

```Bash
# 查看系统级的最大限制
cat /proc/sys/fs/file-max

# 查看用户级的限制 
ulimit -n
```

### 查看 nginx 当前连接数

- **通过 nginx 的 status 模块**

stub_status : 提供访问基础状态信息

**通过命令查看**

- 查看当前的连接数

```Bash
netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'
```

返回的数据

```Plaintext
TIME_WAIT 17
ESTABLISHED 3254
LAST_ACK 236
FIN_WAIT_1 648
FIN_WAIT_2 581
CLOSING 7
CLOSE_WAIT 4916
```

数据解析

```Plaintext
CLOSED       // 无连接是活动的或正在进行
LISTEN       // 服务器在等待进入呼叫
SYN_RECV     // 一个连接请求已经到达，等待确认
SYN_SENT     // 应用已经开始，打开一个连接
ESTABLISHED  // 正常数据传输状态/当前并发连接数
FIN_WAIT1    // 应用说它已经完成
FIN_WAIT2    // 另一边已同意释放
ITMED_WAIT   // 等待所有分组死掉
CLOSING      // 两边同时尝试关闭
TIME_WAIT    // 另一边已初始化一个释放
LAST_ACK     // 等待所有分组死掉
```

## 优化 TimeWait 和 NotEstablished

> 这个选项的意义是等待连接数量的最大值, 如果 TCP 连接中 `TIME_WAIT` 的数量超过了此配置项, 对于 nginx 来说则会存在 500 的异常

### 关于 tcp_max_tw_buckets 选项

> 系统同时持有的Time-Wait套接字的最大数量。如果超过此数字，Time-Wait套接字将立即被销毁，并打印警告。此限制仅存在于防止简单的DoS攻击，您 **不得** 人为降低限制，而应该增加它（可能在增加安装的内存后），如果网络条件允许的条件下需要超过默认值  
> 一般的说明是默认值 : 180000, 可能某些云机由于配置问题值可能有差异

### 基于项目实例

未优化之前的连接数 NotEstablished 的数量到达了一定的峰值, 然后处于持平状态, 在这个时候服务器日志会报 500 错误

![](https://file.wulicode.com/feishu-images/00fe5bd3f85b3fd99176a2fc884395a6.png)

![](https://file.wulicode.com/feishu-images/cc7d588a49c68037a96cf2c8342e59ee.png)

这个地方是因为 TW 到了峰值, 因为使用的云服务器, 所以值默认为 5000, 我们陆续调整值可以看到连接数持平的瓶颈和这个参数有关系

```Plaintext
net.ipv4.tcp_max_tw_buckets = 8000
```

- 调整为 5000
- 调整为 6000
- 调整为 8000

![](https://file.wulicode.com/feishu-images/7b4d2728f8acf3824ba5be6357119a88.png)

可以看到调整值可持平值有正向关系, 这个用来解决 TW 的数据上限问题

### 参考文章

[Linux系统常用内核网络参数介绍与常见问题处理_云服务器 ECS-阿里云帮助中心](https://help.aliyun.com/document_detail/41334.html)

## **worker_processes 进程数**

[Core functionality](http://nginx.org/en/docs/ngx_core_module.html#worker_processes)

定义了nginx对外提供web服务时的worder进程数。最优值取决于许多因素，包括（但不限于）CPU核的数量、存储数据的硬盘数量及负载模式。不能确定的时候，将其设置为可用的CPU内核数将是一个好的开始（设置为 `auto` 将尝试自动检测它）

## 最大文件数限制

报错信息

> 2023/07/25 16:28:39 [alert] 7269#7269: \*109277532 socket() failed (24: Too many open files) while connecting to upstream, client: 39.144.92.101

基本的意思是 nginx 进程打开了太多的文件

系统中默认的设置是 65535

### ulimit

> Provides control over the resources available to the shell and to processes started by it, on systems that allow such control.

即设置当前shell以及由它启动的进程的资源限制, 这里的资源限制分为三个部分: 系统限制, 服务器限制, 进程限制

**file-max : 系统限制**

> `/proc/sys/fs/file-max`  
> This file defines a system-wide limit on the number of open files for all processes. (See  
> also setrlimit(2), which can be used by a process to set the per-process limit,  
> RLIMIT_NOFILE, on the number of files it may open.) If you get lots of error messages  
> about running out of file handles, try increasing this value  
> file-max 是设置系统所有进程一共可以打开的文件数量 。同时一些程序可以通过 setrlimit 调用，设置每个进程的限制。如果得到大量使用完文件句柄的错误信息，是应该增加这个值

我们查看下这个值的大小

```Plaintext
$ sysctl -n -e fs.file-max
9223372036854775807
```

**ulimit 在系统的限制**

由它启动的进程的资源限制

```Plaintext
$ ulimit -Hn
65535
$ ulimit -Sn
65535
```

**nginx** **程序的限制**

我们找到nginx 的进程 id, 查看下限制, 这里的 limit 应当设置为何 ulimit 的值一致

```Plaintext
$ ps -ef |grep 'nginx: master'
root     7206    1  0 Jul07 ?   00:00:00 nginx: master process /usr/sbin/nginx

$ cat /proc/7206/limits
Limit                     Soft Limit           Hard Limit           Units
...
Max open files            1024                 524288               files
...

# 子进程数量
$ cat /proc/31658/limits
Limit                     Soft Limit           Hard Limit           Units
...
Max open files            1024                 4096                 files
...
```

这里查看到 Soft Limit 的数据是 1024, 这里需要调整 nginx 的程序限制 `worker_rlimit_nofile`, 这里重新修改之后重新加载一下

[Core functionality](http://nginx.org/en/docs/ngx_core_module.html#worker_rlimit_nofile)

官方文档说明

`worker_rlimit_nofile` \*\*\*\*更改 worker 进程的最大打开文件数限制。如果没设置的话，这个值为 1024 的限制, 设置后你的操作系统和Nginx可以处理比 `ulimit -a` 更多的文件，所以把这个值设高，这样nginx就不会有 `too many open files` 问题了, 这里设置的值应当和 `ulimit -a` 一致

```Plaintext
// nginx.conf
...
worker_processes  auto;
worker_rlimit_nofile 65535;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
    worker_connections  10240;
}
...
```

```Plaintext
$ nginx -s reload
```

看下 worker 的 limits 数据

```Plaintext
$ cat /proc/4191488/limits
Limit                     Soft Limit           Hard Limit           Units
...
Max open files            65535                65535                files
...
```

配置完毕, 等待查看效果

## **nginx upstream prematurely closed connection while reading response header from upstream**

这个问题是从上游读取数据失败

原因是, nginx 无法正常返回数据, 未给 `/var/lib/nginx` 目录以正常的权限, 导致上游数据无法正常返回.

## 参考文章

- [Nginx socket() failed (24: Too many open files) (infiniroot.com)](https://www.infiniroot.com/blog/850/nginx-socket-failed-24-too-many-open-files)
- [nginx socket() failed (24: Too many open files) «海底苍鹰(tank)博客 (51yip.com)](http://blog.51yip.com/apachenginx/2201.html)
- [Nginx 战斗准备 —— 优化指南 - 技术翻译 - OSCHINA 社区](https://www.oschina.net/translate/nginx-setup?print)
- [Core functionality (nginx.org)](http://nginx.org/en/docs/ngx_core_module.html#worker_rlimit_nofile)
- [关于进程使用资源的限制（基于linux1.2.13） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/125212835)
- [nginx优化 突破十万并发 - 房客 - 博客园 (cnblogs.com)](https://www.cnblogs.com/sxlfybb/archive/2011/09/15/2178160.html)
- [Nginx 战斗准备 —— 优化指南 - OSCHINA](https://www.oschina.net/translate/nginx-setup)