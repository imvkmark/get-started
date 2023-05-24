---
title: "[转] DNF包管理命令在 CentOS 8 和 RHEL 8 上的使用"
date: 2021-07-09 12:28:33
toc: true
categories:
- ["Ops","CentOS","Dnf \/ Yum \/ Repo 仓库"]
---

原文地址: [https://www.twblogs.net/a/5eedcdc2264079afec950ab1](https://www.twblogs.net/a/5eedcdc2264079afec950ab1)

DNF的英文是 "Dandified Yum"。 是原生的yum软件包管理器（Yum的派生）。DNF命令使用libsolv，hawkey，ibrepo和libcomps等C语言库写。它是在Fedora 18中引入的，自Fedora 22 以来一直是默认的软件包管理器。DNF 是一个软件包管理器，可以在基于 RPM 的 Linux 发行版上，更新删除软件包。它会自动安装计算并确定安装软件包所需要的操作。由于一些问题长期尚未在yum中解决，如性能差，内存使用率高，依赖关系解析速度慢等，yum已被DNF个别解决。这解决了yum中待解决的问题。此外， DNF添加了许多功能，以实现基于RPM的系统中软件包的无缝管理。




## 基础说明
默认情况下，DNF 已经安装在 RHEL 8 和 CentOS 8 系统上。运行以下命令以在 CentOS 7 和 RHEL 8 系统上安装。

DNF 软件包可以通过 yum 命令安装在 CentOS 7 系统上，因为它是Extras Repo 的部分
```
# yum install dnf
```
DNF 命令的语法
```
dnf [Option] [Command] [Package_Name]
```
配置文件的位置
```
Main Configuration: /etc/dnf/dnf.conf
Repository: /etc/yum.repos.d/
Cache Files: /var/cache/dnf
```

## 常用命令
```
alias                     List or create command aliases
autoremove                删除所有原先因为依赖关系安装的不需要的软件包
check                     在包数据库中寻找问题
check-update              检查是否有软件包升级
clean                     删除已缓存的数据
deplist                   列出软件包的依赖关系和提供这些软件包的源
distro-sync               同步已经安装的软件包到最新可用版本
downgrade                 降级包
group                     显示或使用组信息
help                      显示一个有帮助的用法信息
history                   显示或使用事务历史
info                      显示关于软件包或软件包组的详细信息
install                   向系统中安装一个或多个软件包
list                      列出一个或一组软件包
makecache                 创建元数据缓存
mark                      在已安装的软件包中标记或者取消标记由用户安装的软件包。
module                    与模块交互。
provides                  查找提供指定内容的软件包
reinstall                 重装一个包
remove                    从系统中移除一个或多个软件包
repolist                  显示已配置的软件仓库
repoquery                 搜索匹配关键字的软件包
repository-packages       对指定仓库中的所有软件包运行命令
search                    在软件包详细信息中搜索指定字符串
shell                     运行交互式的DNF终端
swap                      运行交互式的 DNF 终端以删除或者安装 spec 描述文件
updateinfo                显示软件包的参考建议
upgrade                   升级系统中的一个或多个软件包
upgrade-minimal           升级，但只有“最新”的软件包已修复可能影响你的系统的问题
```

### `dnf repolist` 仓库
该命令在默认情况下启用的所有仓库，并提供了其他信息的选项。通过 dnf 命令添加`-v`选项时，可提供更详细的信息。

此外，不会强制同步过期的元数据。 ，并且你可以强制同步使用启用`--refresh`的所有存储库。

- 启用系统上的存储库的标准命令：
```
# dnf repolist
Last metadata expiration check: 0:01:18 ago on Tue 10 Dec 2019 02:05:20 PM IST.
repo id                       repo name                                                           status
AppStream                     CentOS-8 - AppStream                                                5,089
BaseOS                        CentOS-8 - Base                                                     2,843
*epel                         Extra Packages for Enterprise Linux 8 - x86_64                      3,625
extras                        CentOS-8 - Extras                                                       3
```

- 或者，你可以运行以下命令，以系统上已启用的仓库：
```
# dnf repolist enabled
or
# dnf repolist --enabled
```

- 运行以下命令以系统上的存储：
```
# dnf repolist disabled
or
# dnf repolist --disabled
```

- 运行以下命令，以系统上的所有仓库（已经可以和已经使用）：
```
# dnf repolist all
or
# dnf repolist --all
```

- 要查看有关每个存储库的详细信息，dnf 命令添加`-v`开关。它显示 repo-id，repo-name 等。
```
# dnf repolist -v
.
.
Repo-id      : BaseOS
Repo-name    : CentOS-8 - Base
Repo-revision: 8.0.1905
Repo-distro-tags: [cpe:/o:centos:centos:8]:  , 8, C, O, S, e, n, t
Repo-updated : Fri 01 Nov 2019 01:44:36 AM IST
Repo-pkgs    : 2,843
Repo-size    : 3.8 G
Repo-mirrors : http://mirrorlist.centos.org/?release=8&arch=x86_64&repo=BaseOS&infra=stock
Repo-baseurl : http://mirrors.piconets.webwerks.in/centos-mirror/8.0.1905/BaseOS/x86_64/os/ (9 more)
Repo-expire  : 172,800 second(s) (last: Tue 10 Dec 2019 02:05:01 PM IST)
Repo-filename: /etc/yum.repos.d/CentOS-Base.repo
.
.
```

### `dnf install` 安装一个或多个软件包
下面我们安装 nano，MariaDB 服务器和 MariaDB 客户端软件包。默认情况下，每次 DNF 要求您确认安装软件包时间，都添加项目`-y`确认确认。

- 安装一个软件包：
```
# dnf install nano
```

- 安装多个包装：
```
# dnf install MariaDB-server MariaDB-client
```

- 在dnf中添加`-y`选项以安装软件包，无需确认直接安装：
```
# dnf install nano -y
```

- 指定仓库安装软件包：
```
# dnf --disablerepo="*" --enablerepo=epel install htop
```

- 安装rpm包文件
```
# dnf install /path/to/file.rpm
```

- 从url安装rpm包
```
# dnf install https://xyz.com/file.rpm
```
要安装提供/usr/bin/[xxx]文件的软件包，请运行以下命令。

例如，sar应用程序是“systat”软件包的附件，但我们大多数人都不知道其父软件包的名称。但是，很难找到其父程序包名称，但此命令允许您在不知道父程序包名称的情况下进行安装。
```
# dnf install /usr/bin/sar
```

- 安装修复建议相关的包
```
# dnf install --advisory=FEDORA-2018-b7b99fe852 \*
```
_–advisory ADVISORY ：在更新中包含修复给定建议所需的包_

### `dnf remove ` 删除软件包

- 删除一个名为nano的软件包
```
# dnf remove nano -y
```

- 删除重复软件包的旧版本
```
# dnf remove --duplicates
```

## 5. 删除所有被依赖的软件包

- 删除是因为不再需要的其他软件包最初依赖关系安装的所有软件包
```
# dnf autoremove
```

## 6. 更新一个或多个软件包

- 将所有已安装的软件包更新为最新可用版本
```
# dnf upgrade
```

- 将确定的一个或更多版本更新给最新的可用版本
```
# dnf upgrade [Package_Name]
# dnf upgrade nano
```

- 将指定的一个或多个版本下载到指定的版本
```
# dnf upgrade [Package_Version]
# dnf upgrade nano-2.9.8-1
```

## 7.检查有系统上更新公告的信息
以下命令将显示有关更新的信息。这将显示可用于安全性、错误修复和增强建议的软件包更新数量。

这些软件包可以通过“dnf upgrade”命令进行升级。

- 显示咨询类型的数量
```
# dnf updateinfo list
Last metadata expiration check: 0:21:23 ago on Wed 11 Dec 2019 10:36:15 AM IST.
FEDORA-EPEL-2019-1897c58d3f bugfix epel-release-8-7.el8.noarch
```

- 显示建议列表
```
# dnf updateinfo info FEDORA-EPEL-2019-1897c58d3f
Last metadata expiration check: 0:20:57 ago on Wed 11 Dec 2019 10:36:15 AM IST.
===============================================================================
  epel-release-8-7.el8
===============================================================================
  Update ID: FEDORA-EPEL-2019-1897c58d3f
       Type: bugfix
    Updated: 2019-12-10 07:26:18
       Bugs: 1760182 - Unknown confg values are set
Description: Remove failovermethod from EPEL8 tree. It is no longer needed.
   Severity: None
```

## 8. 仅更新系统上可用的公告
如果需要在系统上更新错误修改，增强或安全修改包，请使用以下命令。

- 将所有内容更新为提供错误修改、增强功能或安全修复程序的最新版本。
```
# dnf upgrade-minimal
```

- 将定的一个或多个软件包更新为提供错误修改，增强或安全修复的最新版本。
```
# dnf upgrade-minimal [Package_Name]
```

## 9. 检查系统上是否可用的软件包更新
检查系统上是否有任何此命令更新。

- 检查系统是否有任何更新。
```shell
# dnf check-update
```

- 或者，使用下面的命令可以更新。
```
# dnf list updates
```

- 下面命令检查对指定软件的更新。
```
# dnf check-update [Package_Name]
# dnf check-update nano
```

## 10.检查系统中的“Packagedb”问题
此命令检查本地包装，并生成有关已检测到的任何问题的信息。您可以通过选项限制“packagedb”检查–依赖项，–重复项，–已过时或–提供。
```
# dnf check
```

## 11. 已安装的系统上的软件包
dnf list 命令将我们知道所有的包装，不管是在 RPMDB 中，在存储库中还是在燃烧中。您可以根据需要输出控制。

- 运行以下命令，同时在RPMDB中，存在于接触中的所有软件包中。
```
# dnf list
or
# dnf list all
```

- 仅一个RPMDB中已安装的软件包。
```
# dnf list installed
```

- 可用的软件包，但不包括已安装的软件包。
```
# dnf list available
```

- 下面查看是否安装了给定的软件包。如果是，信息显示如下的输出。否则，可以显示以下错误消息错误：“没有与列表匹配的软件包”
```
# dnf list installed httpd
Installed Packages
httpd.x86_64 2.4.37-12.module_el8.0.0 + 185 + 5908b0db @AppStream
```

- 已有系统上已安装的已放弃的成本。
```
# dnf list obsoletes
```

- 最近添加到仓库中的软件包。
```
# dnf list recent
```

- 可用于已安装软件包的升级包。
```
# dnf list upgrades
```

- 将被dnf autoremove命令删除的软件包。
```
# dnf list autoremove
```

## 12. 搜索软件包
DNF搜索命令使您可以根据给定的字符串查找可用软件包的列表。当你不知道要安装的确切软件包名称时，这将非常有用。

它在包数据中搜索给定的关键字。关键字作为非关键字大小写的子字符串进行匹配，支持默认情况下，与所有请求的匹配的软件包。在软件包名称和中搜索摘要。

- 在下面的例子中，我们将搜索ftpd字符串，看看会发生什么。
```
# dnf search ftpd
Last metadata expiration check: 0:09:00 ago on Thu 12 Dec 2019 11:23:07 AM IST.
=================================== Name & Summary Matched: ftpd ====================================
pure-ftpd-selinux.x86_64 : SELinux support for Pure-FTPD
======================================== Name Matched: ftpd =========================================
vsftpd.x86_64 : Very Secure Ftp Daemon
pure-ftpd.x86_64 : Lightweight, fast and secure FTP server
nordugrid-arc-gridftpd.x86_64 : ARC gridftp server
```
上面的输出显示了ftpd键的匹配字符串。

## 13. 查看已安装的软件包信息
以下命令用于相关的已安装和可用软件包的描述和概要信息。

此命令使您可以引起大规模的应用程序的详细信息。它显示了有关软件包的各种信息，名称，Arch ，版本，发行版，大小，存储库名称等。
```
# dnf info httpd
Last metadata expiration check: 23:44:19 ago on Wed 11 Dec 2019 11:35:25 AM IST.
Installed Packages
Name         : httpd
Version      : 2.4.37
Release      : 12.module_el8.0.0+185+5908b0db
Arch         : x86_64
Size         : 4.9 M
Source       : httpd-2.4.37-12.module_el8.0.0+185+5908b0db.src.rpm
Repo         : @System
From repo    : AppStream
Summary      : Apache HTTP Server
URL          : https://httpd.apache.org/
License      : ASL 2.0
Description  : The Apache HTTP Server is a powerful, efficient, and extensible
             : web server.
```

## 14.如何使用“dnf提供”命令
dnf prvides 命令将提供给定文件的软件包。如果您想找出那个软件包（已安装或未安装）提供了此文件，这将很有用。

- 例如，我们都知道 sar 的用法，而我们大多数人都不知道那个软件包提供了这个文件。
```
# dnf provides sar
Last metadata expiration check: 0:27:57 ago on Thu 12 Dec 2019 11:23:07 AM IST.
sysstat-11.7.3-2.el8.x86_64 : Collection of performance monitoring tools for Linux
Repo        : AppStream
Matched from:
Filename    : /usr/bin/sar
```

## 15.如何使用“dnf makecache”命令

- makecache 用于下载和启用系统上当前启用的所有数据。
```
# dnf makecache
CentOS-8 - AppStream                                                1.6 kB/s | 4.3 kB     00:02    
CentOS-8 - Base                                                     1.4 kB/s | 3.9 kB     00:02    
CentOS-8 - Extras                                                   503  B/s | 1.5 kB     00:03    
Extra Packages for Enterprise Linux 8 - x86_64                      5.6 kB/s |  10 kB     00:01    
Extra Packages for Enterprise Linux 8 - x86_64                      710 kB/s | 4.2 MB     00:06    
Metadata cache created.
```

## 16. 检查可用的软件包更新

- 是否有可用的更新。如果有更新，此命令可以打印系统更新可用。
```
# dnf check-update
```

- 如果要检查更新是否可用于给定的软件包，请运行以下命令。
```
# dnf check-update [Package_Name]
# dnf check-update nano
```

- 如果要在更新之前快速检查对给定营养保健所做的更改，请运行以下命令。
```
# dnf check-update ghostscript.x86_64 --changelog
Last metadata expiration check: 0:01:44 ago on Fri 13 Dec 2019 11:25:15 AM IST.
ghostscript.x86_64                                                                                     9.25-2.el8_0.3                                                                                     AppStream
Changelogs for ghostscript-9.25-2.el8_0.3.x86_64
* Thu Aug 22 12:00:00 AM 2019 Martin Osvald  - 9.25-2.3
- Resolves: #1744010 - CVE-2019-14811 ghostscript: Safer Mode Bypass by .forceput Exposure in .pdf_hook_DSC_Creator (701445)
- Resolves: #1744014 - CVE-2019-14812 ghostscript: Safer Mode Bypass by .forceput Exposure in setuserparams (701444)
- Resolves: #1744005 - CVE-2019-14813 ghostscript: Safer Mode Bypass by .forceput Exposure in setsystemparams (701443)
- Resolves: #1744230 - CVE-2019-14817 ghostscript: Safer Mode Bypass by .forceput Exposure in .pdfexectoken and other procedures (701450)
* Mon Aug 05 12:00:00 AM 2019 Martin Osvald  - 9.25-2.2
- Resolves: #1737336 - CVE-2019-10216 ghostscript: -dSAFER escape via .buildfont1 (701394)
* Thu Mar 28 12:00:00 AM 2019 Martin Osvald  - 9.25-2.1
- Resolves: #1692798 - CVE-2019-3839 ghostscript: missing attack vector
  protections for CVE-2019-6116
- Resolves: #1678170 - CVE-2019-3835 ghostscript: superexec operator
  is available (700585)
- Resolves: #1691414 - CVE-2019-3838 ghostscript: forceput in DefineResource
  is still accessible (700576)
- fix included for ghostscript: Regression: double comment chars
  '%' in gs_init.ps leading to missing metadata
- fix for pdf2dsc regression added to allow fix for CVE-2019-3839
```

## 17.降级软件包
dnf 降级命令用于将指定的软件包降级到较低（以前）的版本。如果提供了已安装软件包的任何特定版本，则驾驶降级为目标版本。
```
# dnf downgrade nano
```

## 18.重装软件包
如果他们的软件包已经安装，则此命令用于安装。
```
Package nano available, but not installed.
No match for argument: nano
Error: No packages marked for reinstall.
```

- 运行以下命令以重新安装给定的软件包。
```
# dnf reinstall nano
```

## 19.可用的软件包组

- 相互关联的软件包列表被下载了。以下命令以系统上可用的软件包组。
```
# dnf group list
or
# dnf grouplist
Last metadata expiration check: 1:38:20 ago on Fri 13 Dec 2019 11:25:15 AM IST.
Available Environment Groups:
   Server with GUI
   Server
   Minimal Install
   KDE Plasma Workspaces
   Virtualization Host
   Custom Operating System
Installed Environment Groups:
   Workstation
Available Groups:
   Container Management
   .NET Core Development
   RPM Development Tools
   Smart Card Support
   Development Tools
   Graphical Administration Tools
   Headless Management
   Legacy UNIX Compatibility
   Network Servers
   Scientific Support
   Security Tools
   System Tools
   Fedora Packager
```

## 20. 查看系统上可用的软件包组摘要

- 此显示概述了系统上已安装并可用的组数量。
```
# dnf group summary
Last metadata expiration check: 1:48:35 ago on Fri 13 Dec 2019 11:25:15 AM IST.
Available Groups: 13
```

## 21. 查看指定的软件包组信息
。命令此显示该组中可用软件包的列表

每个小组分为三个部分，详细信息如下：

- 强制包强制包
- 默认包默认包
- 可选包任选包
```
# dnf group info 'Development Tools'
Last metadata expiration check: 1:54:38 ago on Fri 13 Dec 2019 11:25:15 AM IST.
Group: Development Tools
 Description: A basic development environment.
 Mandatory Packages:
   autoconf
   automake
   binutils
   bison
   flex
   gcc
   gcc-c++
   gdb
   glibc-devel
   libtool
   make
   pkgconf
   pkgconf-m4
   pkgconf-pkg-config
   redhat-rpm-config
   rpm-build
   rpm-sign
   strace
 Default Packages:
   asciidoc
   byacc
   ctags
   diffstat
   git
   intltool
   ltrace
   patchutils
   perl-Fedora-VSP
   perl-generators
   pesign
   source-highlight
   systemtap
   valgrind
   valgrind-devel
 Optional Packages:
   cmake
   expect
   rpmdevtools
   rpmlint
```

## 22.安装软件包组
运行以下命令以安装软件包组。

在这种情况下，我们将安装“开发”软件包组。编辑器组工具捆绑了捆绑与编辑器的软件包。
```
# dnf group install 'Development Tools' -y
or
# dnf groupinstall 'Development Tools' -y
```

## 23. 更新软件包组

- 类似地，运行以下命令将版本组更新为可用的最新版本。
```
# dnf group update 'Development Tools' -y
or
# dnf groupupdate 'Development Tools' -y
```

## 24.删除软件包组

- 使用以下命令删除给定的已安装软件包组。
```
# dnf group remove 'Development Tools'
or
# dnf group erase 'Development Tools'
```

## 25.清除系统上的查看数据
默认情况下，当您执行各种 dnf 时，dnf 包操作和存储库元数据类的数据缓存到“/var/cache/dnf”目录中。该缓存在这里面会占用大量空间。将允许您删除所有缓存的数据。

- 运行以下命令以删除从仓库数据生成的保存文件。
```
# dnf clean dbcache
```

- 运行以下命令以删除数据。
```
# dnf clean metadata
```

- 运行以下命令从系统中删除所有下载的软件包。
```
# dnf clean packages
```

- 此命令可喜悦完成所有上述操作。
```
dnf clean all
```

## 26. 打印dnf历史记录

- dnf 历史命令允许用户查看过去的事务中发生的事情。所有交易均显示在表格中。
```
# dnf history
ID     | Command line             | Date and time    | Action(s)      | Altered
-------------------------------------------------------------------------------
     9 | install nano             | 2019-12-12 12:49 | Install        |    1   
     8 | erase nano -y            | 2019-12-11 08:09 | Removed        |    1   
     7 | install nano -y          | 2019-12-11 08:09 | Install        |    1   
     6 | remove nano              | 2019-12-11 08:09 | Removed        |    1   
     5 | install httpd -y         | 2019-12-11 08:08 | Install        |    9   
     4 |                          | 2019-11-10 21:27 | Install        |    4   
     3 | install fping            | 2019-11-09 10:09 | Install        |    1   
     2 | install epel-release     | 2019-11-09 10:04 | Install        |    1   
     1 |                          | 2019-11-09 09:10 | Install        | 1441 EE
```

- 或者，您可以使用以下命令获得相同的结果。
```
# dnf history list
```

- 显示有关历史的详细信息。如果未指定，则显示最近一次的历史信息。
```
# dnf history info
Transaction ID : 9
Begin time     : Thu 12 Dec 2019 12:49:17 PM IST
Begin rpmdb    : 1442:1d39bf569934f62170179ac566e748a34156008a
End time       : Thu 12 Dec 2019 12:49:18 PM IST (1 seconds)
End rpmdb      : 1443:e5cdaaca00923c394bd2533c642c175ec6ce2cf7
User           : root 
Return-Code    : Success
Releasever     : 8
Command Line   : install nano
Packages Altered:
    Install nano-2.9.8-1.el8.x86_64 @BaseOS
```

- 运行以下命令即可查看有关给定ID的历史详细信息。
```
# dnf history info 3
Transaction ID : 3
Begin time     : Sat 09 Nov 2019 10:09:19 AM IST
Begin rpmdb    : 1429:4ea1748d2132285a5bc1929f522f97f80bc5cede
End time       : Sat 09 Nov 2019 10:09:20 AM IST (1 seconds)
End rpmdb      : 1430:7c974a655a4f3a6c0ad5c6b8ab968279e0144581
User           : root 
Return-Code    : Success
Releasever     : 8
Command Line   : install fping
Packages Altered:
    Install fping-4.2-2.el8.x86_64 @epel
```

- 对指定的ID历史操作重复执行。
```
# dnf history redo 3
```

- 执行与指定 ID 执行的所有操作相反的操作。
```
# dnf history undo 3
```

- 撤消在历史ID之后执行的所有操作。
```
# dnf history rollback 7
```

## 27.允许DNF自动更新

- 你通过安装dnf-automatic可以来启用自动软件包更新。为此，运行以下命令。
```
# dnf install dnf-automatic
```

- 安装pacakge之后，请确保您编辑/etc/dnf/automatic.conf文件并替换apply_updates = yes而不是apply_updates = no。在配置文件中进行更改后，启用“dnf-automatic-timer”服务。
```
# systemctl enable dnf-automatic.timer
Created symlink from /etc/systemd/system/basic.target.wants/dnf-automatic.timer to /usr/lib/systemd/system/dnf-automatic.timer
```

- 最后启动服务。
```
# systemctl start dnf-automatic.timer
```

## 28. 标记/取消标记软件包
dnf 标记命令允许你始终将指定的程序包保留在系统上，并且在运行自动删除命令时不从系统中删除此程序包。

- 运行以下命令，将指定的包装标记为由用户安装。
```
# dnf mark install nano
nano-2.9.8-1.el8.x86_64 marked as user installed.
```

- 运行以下命令以取消将指定的软件包标记为由用户安装。
```
# dnf mark remove nano
nano-2.9.8-1.el8.x86_64 unmarked as user installed.
```

### `dnf repoquery {software}` 从已启用的存储库中搜索软件包

- 它在启用的存储库中搜索给定的程序包并显示信息。
```
# dnf repoquery htop
Last metadata expiration check: 0:22:18 ago on Sat 14 Dec 2019 02:44:16 PM IST.
htop-0:2.2.0-6.el8.x86_64
```

### dnf 手册页
我们在本文中添加了所有可能的选项，但是如果您在本文中未找到其他任何选项，请访问手册。
```
# dnf --help
or
# man dnf
```

