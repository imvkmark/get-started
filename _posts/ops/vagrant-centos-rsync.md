---
title: "折腾 vagrant + centos6.6/7 使用 rsync的手记"
date: 2021-06-26 10:30:00
toc: true
categories:
- ["Ops","CentOS"]
---

说明:

- [如何解決 yum 安裝 glibc-headers 失敗的問題]() 我用这个方法升级了内核
- [RPM repository]() 用这个网站找到了很多包, 虽然有些安装是我的机器版本太低了
- [兩個我常用的 CentOS Yum Repo]() 更新了 rpmforge 的地址库, 虽然 rsync 也没有装上, 没有3.1.1 版本
- [解决libc.so.6: version `GLIBC_2.14' not found问题]() 编译 glibc





## 解决方案

查找到一个方法  [用 rsync 解决 win7 下 vagrant 共享目录读取速度慢问题](https://ruby-china.org/topics/22147), 解决了, 附上解决方法

在 Vagrantfile 文件中设置同步目录为 rsync

```
config.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__auto: true
```

下载Cygwin然后查找出rsync然后安装。


把rsync.exe的路径加入windows的path环境。


执行 vagrant reload 如果加载失败，提示目录不对什么的，需要修改下vagrant的代码。


`Vagrant\embedded\gems\gems\vagrant-1.*.*\plugins\synced_folders\rsync\helper.rb`

```ruby
if Vagrant::Util::Platform.windows?
   # rsync for Windows expects cygwin style paths, always.
   hostpath = "/cygdrive" + Vagrant::Util::Platform.cygwin_path(hostpath)
end
```

再次执行 vagrant reload 现在可以享受 windows下的vbox极速共享目录了。


## 追溯历史

- rsync 报错


报错简要内容是 : connection unexpectedly closed (0 bytes received so far) [receiver]

```sh
Error: Warning: Permanently added '[127.0.0.1]:2222' (RSA) to the list of known hosts.
rsync: connection unexpectedly closed (0 bytes received so far) [receiver]
rsync error: error in rsync protocol data stream (code 12) at io.c(600) [receiver=3.0.6]
rsync: connection unexpectedly closed (0 bytes received so far) [sender]
rsync error: error in rsync protocol data stream (code 12) at io.c(226) [sender=3.1.1]
```

由于当时登陆 vargrant 时候用的是 `git` 文件夹下边的 `ssh.exe`, 运行 `vagrant ssh` 登陆时候需要客户端, 所以我使用了这个, 网上有个文章是考虑使用 `rsync` 和 `ssh` 客户端使用同一个程序下的, 所以我下载了 `cygwin` [Cygwin](https://www.cygwin.com/),  在 [Vagrant] 中 [RSYNC](http://docs.vagrantup.com/v2/synced-folders/rsync.html)


中提示使用 `Cygwin` 或者 `MinGW`, 将 `git` 取消掉全局路径, 然后加入 `Cygwin` 的全局路径, 至此这个错误已经解决 , 重新运行 `vagrant reload` 时候又出现了另一个错误

- rsync 第二个错误

```sh
Error: Warning: Permanently added '[127.0.0.1]:2222' (RSA) to the list of known hosts.
rsync: change_dir "/g/wamp/www" failed: No such file or directory (2)
FATAL I/O ERROR: dying to avoid a --delete-during issue with a pre-3.0.7 receiver.
rsync error: requested action not supported (code 4) at flist.c(1882) [sender=3.1.0]
```

这里提示的错误是 `FATAL I/O ERROR: dying to avoid a --delete-during issue with a pre-3.0.7 receiver`, 这里的意思是说之前的版本的一个参数导致的严重的 `I/O` 错误


从网上找的问题是 rsync 本地用的版本是 3.1.1, 而服务器上用的 3.0.7, 这里就解决服务器上安装 rsync 3.1.1

- 需要安装 `rsync`


必须是编译安装 rsync, 但是 glibc版本需要 2.14

   - 升级 kernel


升级 kernel , 但是没有解决 `glibc` 版本的问题, 同时也没有 `glibc` 的新版本
- 需要安装 `glibc`


glibc 下载地址 : [http://ftp.gnu.org/gnu/glibc/](http://ftp.gnu.org/gnu/glibc/)


编译参考 : [解决libc.so.6: version `GLIBC_2.14' not found问题]()

```
configure: error: 
*** These critical programs are missing or too old: as ld compiler
```

- 安装 `as` , `ld`, 高版本的 `gcc`


**as, ld**


继续安装 `as` `ld` , 从 [redhat上用rpm包方式升级gcc](http://www.linuxidc.com/Linux/2007-09/7327.htm) 找到 升级 ld 需要安装 binutils, 地址是: [http://ftp.gnu.org/gnu/binutils/](http://ftp.gnu.org/gnu/binutils/) , 下面例子仅供参考, 版本不一定是最新的

```
wget http://ftp.gnu.org/gnu/binutils/binutils-2.25.tar.gz
tar -zxvf binutils-2.25.tar.gz
cd binutils-2.25
./configure
make
make install
ld –v
```

**gcc**


安装 `compiler` 是不是传说中的 gcc, 经提示就是 gcc


参考编译地址: [CentOS 6.4 编译安装 gcc 4.8.1 ](http://www.cnblogs.com/codemood/archive/2013/06/01/3113200.html)


我还是下载的最新版 :  [http://ftp.tsukuba.wide.ad.jp/software/gcc/releases/](http://ftp.tsukuba.wide.ad.jp/software/gcc/releases/)

```
wget http://ftp.tsukuba.wide.ad.jp/software/gcc/releases/gcc-4.9.2/gcc-4.9.2.tar.gz
tar -zxvf gcc-4.9.2.tar.gz
cd gcc-4.9.2
./contrib/download_prerequisites # download dependence
mkdir build
cd build
../configure --disable-multilib # disable 32bit
make
make install
```

这里发现出错了

```
make[3]: *** [s-attrtab] Killed
make[3]: Leaving directory ...
make[2]: *** [all-stage1-gcc] Error 2
make[2]: Leaving directory ...
make[1]: *** [stage1-bubble] Error 2
make[1]: Leaving directory ...
```

以下的解决方案是 , 来自 [Make exits with “Error 2” when trying to install gcc-4.8.1](http://stackoverflow.com/questions/18389612/make-exits-with-error-2-when-trying-to-install-gcc-4-8-1)

```
SWAP=/tmp/swap
dd if=/dev/zero of=$SWAP bs=1M count=500
mkswap $SWAP
swapon $SWAP
```

文章中给出的翻译的结果是, 首先要安装 `binutils` 这个我们第一步已经安装了. 这个问题是 `OOM` 杀掉了进程, 安装中使用的 `RAM` 比 `EC2`内存要大, 导致进程被杀掉了.  上边代码就是把 `swap` 设置为 500M

> 至此未成功, 任务 终结~~~

