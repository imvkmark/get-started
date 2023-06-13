---
title: "[转] Windows 系统下的 Unix 工具程序: Cygwin"
date: 2022-04-14 22:26:44
toc: true
categories:
- ["Ops","Windows"]
---

原文地址: [对话 UNIX: 在 Windows 上使用 Cygwin](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#update)

_Cygwin 在 Windows 上提供一个完整的 UNIX shell（从 awk 到 zcat）_

Cygwin 是一个用于 Microsoft® Windows® 操作系统的类 UNIX® 环境。它包含一个真正的 UNIX shell、一个 Portable Operating System Interface (POSIX) 模拟库以及数千个 UNIX 实用程序。

[Martin Streicher](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#authorN10024), 软件开发人员, Pixels, Bytes, and Commas @ 2009 年 3 月 09 日

如果您是本专栏的忠实读者，应该已经熟悉了许多 UNIX 行话。“用管道重定向输出”、“杀死进程” 和 “使用通配符” 等行话对于新手来说很奇怪，但是您应该很熟悉这些说法了。

对于 UNIX 本身，也有各种称呼。IBM® 大型机用户说各种带字母 “z” 的行话，比如 IBM z/OS® 和 System z9 Virtual Machine (z/VM)；嵌套系统开发人员使用 eCos 这个词；在聊天中还会提到其他许多风格的 UNIX，比如 Linux®、FreeBSD、Sun Solaris 和 Mac OS X。现代信息技术使用各种各样的方言，简直就像是圣经中巴别塔的故事。

当然，也有不少人说 Windows 术语，尽管大多数人只掌握 “指向和单击” 这样的简单词汇。经过 20 年的发展，大多数 Windows 用户已经忘了古老的 DOS 术语。

但是，与 UNIX shell 相比，Windows `COMMAND` 实用程序的功能实在很差；因此，UNIX 用户通常认为 Windows 是一种让人灰心丧气的平台。对于习惯于使用丰富的命令行工具集的 UNIX 软件开发人员来说，Windows 尤其别扭。对于 UNIX 开发人员来说，使用 Windows 简直就像是到了陌生的外国。
> 常用的首字母缩写词
> **API：**应用程序编程接口
> **IT：**信息技术

幸运的是，Cygwin（见 [参考资料](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#resources)）在 Windows 环境中提供大家熟悉的一片天地，就像是美国人在法国找到了麦当劳。

Cygwin 是一个用于 Windows 的类 UNIX shell 环境。 它由两个组件组成：一个 UNIX API 库，它模拟 UNIX 操作系统提供的许多特性；以及 Bash shell 的改写版本和许多 UNIX 实用程序，它们提供大家熟悉的 UNIX 命令行界面。前一个组件是一个 Windows 动态链接库 (DLL)。后一个组件是一组基于 Cygwin DLL 的程序，其中许多是用未经修改的 UNIX 源代码编译的。它们合在一起提供大家熟悉的 UNIX 环境。

在本期的 [对话 UNIX](http://www.ibm.com/developerworks/cn/aix/lp/speakingunixnew.html:) 专栏中，我们要安装 Cygwin，讨论它的命令行界面 (CLI)，并构建标准 Cygwin 发行版中未包含的开放源码，以此体会把 UNIX 应用程序（至少是一部分 UNIX 应用程序）迁移到这个模拟环境是多么容易。
> 到编写本文时，Cygwin DLL 的当前版本是 1.5.25-15。可以在近期的任何 Windows 商业版本上安装 Cygwin，但是 Windows CE 除外。（但是，未来的 Cygwin 版本将不再支持 Windows 95、Windows 98 和 Windows ME）。本文给出的示例和图基于带 Service Pack 3 (SP3) 的 Windows XP Professional，使用的计算机是采用 Coherence 模式的 Apple MacBook，并使用 Parallels version 3.0。





## 安装 Cygwin
与这里介绍的其他软件不同，Cygwin 使用 Windows 安装程序。Cygwin setup.exe 文件可以重新安装软件，可以添加、修改或升级 Cygwin 配置的组件。

在 Windows 系统上打开浏览器，通过访问 [http://cygwin.com/setup.exe](http://cygwin.com/setup.exe) 下载 Cygwin 安装程序。安装程序本身非常小（大约 600KB），因为大多数 Cygwin 软件是在安装过程中下载的。完成下载之后，按照以下步骤安装 Cygwin：

### 1. 运行安装程序
在安装 Cygwin 期间出现的第一个对话框

![](https://file.wulicode.com/yuque/202208/04/15/0029TJNKEIvl.png?x-oss-process=image/resize,h_298)

单击 **Next** 进入下一个屏幕，选择要执行的安装类型。

单击 **Install from Internet**。

单击 **Next**，然后选择一个安装目录。

### 2. Cygwin 安装选项
![](https://file.wulicode.com/yuque/202208/04/15/00304xZ1Ah2f.png?x-oss-process=image/resize,h_298)

在大多数情况下，推荐的安装选项是合适的，也可以进行定制，但是要注意几点：

- **不要在 Windows 系统的根目录（比如 C:）中安装 Cygwin。**最好把 Cygwin 安装在它自己的子目录中，比如默认目录（C:\cygwin）或 C:\Program Files\cygwin。（您选择的目标目录将成为模拟的 UNIX 环境的根目录 `/`。例如，如果在 C:\cygwin 中安装，那么虚拟的 /usr/bin 实际上是 C:\cygwin\usr\bin） 。
- 对于 **Install For** 选项，不要选择 **Just Me**。
- 把 **Default Text File** 类型设置为 **Unix**，从而尽可能提高与其他 UNIX 机器上存储的现有文件的兼容性。

单击 **Next**。

在下一个窗口中，选择一个存储 Cygwin 所需的数据的目录。_不要选择前一步中选择的 Cygwin 目录。_ 如果可能的话，应该在有至少 1GB 空闲空间的驱动器上创建或选择一个目录。

再次单击 **Next**，选择使用的 Internet 连接类型。通常应该选择 Direct Connection。

再次单击 **Next**。

稍等一会儿，Cygwin 会下载当前的镜像站点列表，让您选择一个镜像站点，见图 3。如果不确定应该选择哪个站点，就选择地理位置比较近的站点。

### 3. 选择您认为可靠的或地理位置比较近的安装站点
![](https://file.wulicode.com/yuque/202208/04/15/00300kNl824G.png?x-oss-process=image/resize,h_298)

经过短暂的延迟之后，安装程序显示可用的类别和包的完整列表。[图 4](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#fig4) 显示一个类别的部分内容。单击加号 (`+`) 展开对应的类别；单击 “循环” 标志在 Skip（忽略此包）和包的所有可用版本之间循环。如果 Cygwin 提供一个实用程序的多个版本，应该选择满足您的需求的实例。顺便说一下，如果选择 B 列，就会下载二进制包；选择 S，也会下载源代码。

### 4. 选择最适合需要的包和实例
![](https://file.wulicode.com/yuque/202208/04/15/0031RQ4rFRek.png?x-oss-process=image/resize,h_298)

在 Cygwin 中可用的包超过 1,000 个，所以应该只选择您需要的类别和包。（安装所有 Cygwin 包会占用超过 800MB 的磁盘空间）。以后随时可以添加整个类别或单独的包：只需重新运行 Cygwin 安装程序。（还可以在任何时候用相同的安装程序删除或更新包）。搜索 Cygwin 包列表（参见 [参考资料](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#resources)），检查您喜欢的 UNIX 实用程序是否在 Cygwin 中可用。

选择您需要的工具之后，单击 **Next**，下载过程开始！

进度条分别反映每个包的下载进度、总下载进度和磁盘使用量。图 5 是在我的测试计算机上在安装期间截取的屏幕图。

### 5.Cygwin 下载大量软件，所以请耐心等待
![](https://file.wulicode.com/yuque/202208/04/15/0031uBR7dSIS.png?x-oss-process=image/resize,h_298)

最后，安装程序安装软件并（可选地）在 Start 菜单和桌面中添加快捷方式。单击 **Finish**。

9. 通过使用 Start 菜单或双击 Cygwin 图标（如果添加了这些快捷方式的话），启动 Cygwin；也可以执行 Cygwin 目录中的 Cygwin 脚本（比如 C:\cygwin\Cygwin.bat）。

图 6 显示第一次启动 Cygwin 时的情况：它创建您的主目录，执行 shell 启动文件，显示提示。现在可以运行 UNIX 命令了！

### 6. 现在可以在 Windows 中使用 UNIX 命令了！
![](https://file.wulicode.com/yuque/202208/04/15/0032gJN47KzL.png?x-oss-process=image/resize,h_268)

例如，试一下 `ls -a` 或 `type touch`。后一个命令表明 `touch` 是可执行文件 /usr/bin/touch。

## 在 Windows 中发挥 UNIX 的优势（反之亦然）
Cygwin 在 Windows 中几乎完整地模拟一个 UNIX shell。实际上，它把这两种操作系统很好地结合在一起了。例如，可以运行 `df -h` 命令显示 “UNIX” 机器上的空闲磁盘空间。图 7 显示结果。

是 Windows 上的 UNIX 文件系统，还是 UNIX 上的 Windows 文件系统？

![](https://file.wulicode.com/yuque/202208/04/15/0032Bsj1r61q.png?x-oss-process=image/resize,h_256)

正如 [前面提到的](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#install)，Cygwin 安装目录作为虚拟 UNIX 系统的根目录。Cygwin 把安装目录中的子目录映射到 UNIX 目录。它以单独的卷的形式提供 Windows 驱动器，比如 /cygwin/c。可以使用这样的虚拟路径启动 Windows 程序。请尝试输入 `/cygwin/c/Program\ Files/Internet\ Explorer/IEXPLORE.EXE` 从命令行启动 Windows Internet Explorer®。（还可以使用 Tab 键自动展开路径的元素） 。

顺便说一句，如果要把 Windows 路径名转换为等效的 UNIX 路径名或者相反，可以试试内置命令 `cygpath`。在默认情况下，`cygpath` 产生 UNIX 路径名。使用 `-w` 选项产生 Windows 路径。
```
$ cygpath -w /cygwin/c/Program\ Files/Internet\ Explorer/IEXPLORE.EXE
c:\Program Files\Internet Explorer\IEXPLORE.EXE
```
还有帮助沟通这两个环境的其他特性：

- Cygwin 提供它自己的 `lpr`（/usr/bin/lpr 而不是 Windows 的 LPR.EXE），可以直接从模拟的 UNIX 环境进行打印。只需把 PRINTER 环境变量设置为 \server\printer_name 或 //server/printer_name 这样的 Cygwin UNC；前向斜杠和反向斜杠都可以，在 Cygwin 中的其他地方也是如此。
- 在 Cygwin 中用 `ln -s` 创建的符号链接在 Windows 中被解释为快捷方式。同样，Windows 快捷方式在 Cygwin 中被解释为符号链接。因此，可以使用 Windows 快捷方式带参数启动 UNIX 命令。
- 因为 Cygwin 提供完整的 Bash shell，所以可以使用上述的所有兼容特性（和其他特性）编写 UNIX shell 脚本来维护 Windows！

例如，可以使用 UNIX `find` 在驱动器上搜索数据。请注意一点：在 Windows 文件名中常常使用空格。为了保持完整的文件名（请记住，UNIX 参数以空格分隔），一定要使用 `find -print0` 和 `xargs -0`。

## 如何更新和扩展 Cygwin
正如前面提到的，在任何时候都可以通过运行 Cygwin 安装程序添加、删除和更新 Cygwin 类别和包。我们来添加几个软件开发包，以便像在传统的 UNIX 系统上那样从源代码构建程序。

再次运行 Cygwin setup.exe 应用程序，依次通过前几个对话框，直到到达 Select Packages 窗口，见 [图 4](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#fig4)。展开 Devel 类别，使用循环控件选择以下包的最高版本：

- `autoconf2.1`
- `automake1.10`
- `binutils`
- `gcc-core`
- `gcc4-core`
- `gdb`
- `pcre`
- `pcre-devel`

做出选择之后（为了满足依赖性，可能会自动选择其他包），单击 **Next** 开始更新。与前面一样，下载和安装过程需要一定的时间（开发包往往相当大）。

在此期间，打开一个浏览器并通过访问 [http://ftp.gnu.org/gnu/wget/wget-1.11.4.tar.gz](http://ftp.gnu.org/gnu/wget/wget-1.11.4.tar.gz) 下载 GNU `wget` 实用程序的最新源代码。（`wget` 是一种命令行工具，它可以下载任何东西。关于此工具的更多信息，请参见 [参考资料](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#resources)）。使用 Cygwin 把此文件复制到 Cygwin 中的主目录，展开压缩文件。清单 1 显示压缩文件的内容。

列出 wget-1.11.4.tar 的内容
```
$ cp /cygdrive/c/Documents\ and\ Settings/Martin/My\ Documents/wget-1.11.4.tar ~
$ tar xzvf wget-11.4.tar
wget-1.11.4/
wget-1.11.4/AUTHORS
wget-1.11.4/NEWS
wget-1.11.4/COPYING
wget-1.11.4/configure.bat
wget-1.11.4/ChangeLog
wget-1.11.4/ChangeLog.README
wget-1.11.4/msdos/
wget-1.11.4/msdos/ChangeLog
wget-1.11.4/msdos/Makefile.DJ
...
wget-1.11.4/src/cookies.c
wget-1.11.4/src/http.h
wget-1.11.4/src/log.h
wget-1.11.4/src/sysdep.h
wget-1.11.4/src/alloca.c
wget-1.11.4/src/getopt.c
wget-1.11.4/src/gnu-md5.h
wget-1.11.4/src/ftp.c
wget-1.11.4/config.sub
wget-1.11.4/config.guess
```
当 Cygwin 下载和安装过程完成时，单击 **Finish**。现在可以从源代码构建 `wget` 实用程序了。
```
$ cd wget-1.11.4
$ ./configure
configure: Configuring for GNU wget 1.11.4
...
creating po/Makefile
$ make
gcc -I. ...
$ make install
...
/usr/bin/install -c -m 644 ./wget.1 /usr/local/share/man/man1/wget.1
$ type wget
/usr/local/bin/wget
```
为了测试这个新的实用程序，在 Cygwin 中运行它并下载 `wget` 源代码：
```
$ /usr/local/bin/wget http://ftp.gnu.org/gnu/wget/wget-1.11.4.tar.gz
```
稍后就会得到一个新的源代码压缩文件。使用 Cygwin 安装程序从 Cygwin 存储库获得实用程序是最简单的方法，但是也可以在 Cygwin 中构建下载的或自己的源代码。在 Cygwin 中可以使用全套 UNIX 开发工具，包括最流行的脚本编程语言。

如果您不喜欢 Microsoft Visual Studio® 等 Windows 开发工具，甚至可以用 Cygwin 中的 UNIX 编译器和工具构建原生 Windows WIN32 应用程序。（这些应用程序不在 UNIX 上运行。要想在 UNIX 上运行 Windows 应用程序，可以考虑使用 WINE。更多信息参见 [参考资料](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#resources)） 。

## 结束语
Cygwin 并不是完美的 UNIX 模拟环境，但已经相当好了。核心组件的文档很完善，而且特别方便，它们介绍了模拟 DLL 中的限制和安全风险。如果希望把复杂的 UNIX 包迁移到 Cygwin，请参考开发人员指南（参见 [参考资料](https://www.ibm.com/developerworks/cn/aix/library/au-spunix_cygwin/#resources)），评估 Cygwin 的支持是否能够满足您的 API 需要。

Cygwin 最棒的特性可能是它与 Windows 的集成。使用 Cygwin 和它的 UNIX 命令行来操纵系统可以大大提高生产力。建议在您的 shell PATH 变量中包含 Windows 的 Program Files 中的子目录，这样只需输入程序名，就能够启动路径中的任何二进制程序。

更棒的是，Cygwin 可以在同一个窗口中管理多个作业。按 Control-Z 可以暂停正在运行的作业；输入 `bg` 和 `fg` 分别在后台和前台运行作业；输入 `jobs` 管理作业列表。当然，Cygwin 还可以对输入和输出进行重定向，可以通过管道把一个命令的输出发送给另一个命令。

Cygwin 真的很不错。

