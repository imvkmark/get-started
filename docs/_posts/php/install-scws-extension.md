---
title: "[转] ubuntu php 安装 scws 扩展组件"
date: 2022-04-14 22:26:50
toc: true
categories:
- ["Php","环境搭建"]
---

## 安装 scws
- 取得 scws的代码 && 解压<br />最新下载地址从 [这里](http://www.xunsearch.com/scws/download.php) 获取

```
$ wget http://www.xunsearch.com/scws/down/scws-1.2.3.tar.bz2
$ tar xvjf scws-1.2.3.tar.bz2
$ cd scws-1.2.3/
```

- 进入目录执行配置脚本和编译
```
$ ./configure --prefix=/usr/local/scws
$ make
# 非 root 无法安装到指定目录
$ sudo make install
```
这里和通用的 GNU 软件安装方式一样，具体选项参数执行 `./configure --help` 查看。<br />常用选项为：`--prefix=<scws的安装目录>`<br />顺利的话已经编译并安装成功到 `/usr/local/scws` 中了，执行下面命令看看文件是否存在
```
$ ls -al /usr/local/scws/lib/libscws.la
-rwxr-xr-x 1 root root 919  9月 29 09:36 /usr/local/scws/lib/libscws.la
```

- 试试执行 scws-cli 文件
```
$ /usr/local/scws/bin/scws -h
scws (scws-cli/1.2.3)
Simple Chinese Word Segmentation - Command line usage.
Copyright (C)2007 by hightman.
...
```

- 用 wget 下载并解压词典，或从主页下载然后自行解压再将 `*.xdb` 放入 `/usr/local/scws/etc` 目录中
```
$ cd /usr/local/scws/etc
$ sudo wget http://www.xunsearch.com/scws/down/scws-dict-chs-gbk.tar.bz2
$ sudo wget http://www.xunsearch.com/scws/down/scws-dict-chs-utf8.tar.bz2
$ sudo tar xvjf scws-dict-chs-gbk.tar.bz2
$ sudo tar xvjf scws-dict-chs-utf8.tar.bz2
# 更改用户组
$ sudo chown root:root dict.utf8.xdb
$ sudo chown root:root dict.xdb
```

- 写个小程序测试一下(本人未成功～)

**写入测试程序**
```
$ cat > test.c
#include <scws.h>
#include <stdio.h>
main() {
    scws_t s;
    s = scws_new();
    scws_free(s);
    printf("test ok!\n");
}
```
**编译测试程序**
```
$ gcc -o test -I/usr/local/scws/include -L/usr/local/scws/lib test.c -lscws -Wl,--rpath -Wl,/usr/local/scws/lib
./test
```
这样就好顺利安装完毕可以使用 libscws 这套 C-API 了

### PHP 中编译这个扩展
如果您需要在 php 中调用分词，建议继续阅读本文安装 php 扩展，否则可跳过不看。<br />假设您已经将 scws 按上述步骤安装到 /usr/local/scws 中。<br />安装此扩展要求您的 php 和系统环境安装了相应的 `autoconf` `automake` 工具及 `phpize` 。<br />进入源码目录的 `phpext/` 目录
```
cd ~/scws-1.2.3/phpext/
```
执行 `phpize` （在PHP安装目录的`bin/`目录下）<br />执行 `./configure --with-scws=/usr/local/scws`, 若 php 安装在特殊目录 `$php_prefix`, 则请在 `configure` 后加上 `--with-php-config=$php_prefix/bin/php-config`<br />执行 `make` 然后用 `root`身份执行 `make install`

5. 让PHP 加入以下配置, 某些系统配置不同, 按照需要的结构进行配置
```
[scws]
;
; 注意请检查 php.ini 中的 extension_dir 的设定值是否正确, 否则请将 extension_dir 设为空，
; 再把 extension = scws.so 指定绝对路径。
;
extension = scws.so
scws.default.charset = gbk
scws.default.fpath = /usr/local/scws/etc
```
命令行下执行 `php -m` 就能看到 scws 了或者在 `phpinfo()` 中看看关于 scws 的部分，记得要重启 web 服务器<br />才能使新的 `php.ini` 生效。<br />这样就算安装完成了，余下的工作只是PHP代码编写问题了。<br />关于 PHP 扩展的使用说明请参看代码中 `phpext/README.md` 文件或其它文档。<br />![](https://file.wulicode.com/yuque/202211/01/08/35111zKdtGKk.png?x-oss-process=image/resize,h_284)

## 参考资料:

- [SCWS安装说明 ](http://www.xunsearch.com/scws/docs.php)
- [SCWS 中文分词 下载地址](http://www.xunsearch.com/scws/download.php)

