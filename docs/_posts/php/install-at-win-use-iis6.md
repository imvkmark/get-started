---
title: "IIS 6 下配置以 FastCGI 跑 PHP"
date: 2022-04-14 22:11:45
toc: true
categories:
- ["Php","环境搭建"]
---

环境：  <br />操作系统：Windows 2003 Server SP2  <br />PHP 版本：php-5.2.6-Win32<br />1.下载 FastCGI For IIS6<br />[http://www.iis.net/download/fastcgi](http://www.iis.net/download/fastcgi)<br />下载之后，双击运行进行安装。<br />安装后在 C:\WINDOWS\system32\inetsrv 目录下产生了五个文件。如下图：<br />[![](https://file.wulicode.com/yuque/202211/03/09/051164I0MzEr.png?x-oss-process=image/resize,h_199)](http://images.cnblogs.com/cnblogs_com/shanyou/Windows-Live-Writer/a0034df81d51_F83D/image_2.png)

1. fcgiext.dll – fastcgi处理程序
2. fcgiext.ini – 配置文件
3. fcgiconfig.js – FastCGI的控制脚本

同时在 IIS 的 “Web 服务扩展”里多了 FastCGI Handler。<br />  [![](https://file.wulicode.com/yuque/202211/03/09/0512DMEhqp3h.jpg?x-oss-process=image/resize,h_461)](http://images.cnblogs.com/cnblogs_com/shanyou/Windows-Live-Writer/a0034df81d51_F83D/iis6fcgi_2_2.jpg)<br />2.下载 PHP5.2.14 Windows 版<br />[http://www.php.net/downloads.php](http://www.php.net/downloads.php)<br />下载 .zip 格式的版本，下载后解压至 c:\PHP 目录，并给 IIS 启动帐户组或用户赋予读取和运行权限。如下图：<br />[![](https://file.wulicode.com/yuque/202211/03/09/0512xpoYzATI.jpg?x-oss-process=image/resize,h_525)](http://images.cnblogs.com/cnblogs_com/shanyou/Windows-Live-Writer/a0034df81d51_F83D/iis6fcgi_3_2.jpg)  <br />你可以根据自己的意愿解压到别的目录。<br />3. 注册 PHP 到 FastCGI<br />打开 C:\WINDOWS\system32\inetsrv\fcgiext.ini 文件。

```
; This is the configuration file for the FastCGI handler for IIS 6.0.  
; The FastCGI handler will look for this file in the same directory as  
; fcgiext.dll. By default, the FastCGI installer will place this file into  
; the %windir%\system32\inetsrv directory.
```
我个人的理解是，只要“Web 服务扩展”里的 FastCGI Handler 为允许时，在加载 fcgiext.dll 时，会读取 fcgiext.ini 配置文件的内容，根据里面的配置为每个网站提供映射。<br />在 [Types] 下添加以下配置：
```
[Types]  
php=PHP
[PHP]  
ExePath=C:\PHP\php-5.2.14-Win32\php-cgi.exe
```
“php”表示扩展名，“PHP”是配置节名称，以“[PHP]”定义。<br />4. 配置 php.ini<br />将 C:\PHP\php-5.2.14-Win32\php.ini-production 复制一个，然后重命名为 D:\PHP\php.ini<br />打开 C:\PHP\php-5.2.14-Win32\php.ini，修改：
```
extension_dir = "C:\PHP\php-5.2.14-Win32\ext"  
fastcgi.impersonate = 1
```
配置系统服务器时间, 否则<br />![](https://file.wulicode.com/yuque/202211/03/09/0512hNEg5UQT.png?x-oss-process=image/resize,h_55)<br />  <br />其它的根据实际需要对 php.ini 进行设置修改，这里只针对能跑 php，修改完记得重启 IIS。<br />5. 配置网站<br />右键网站 => 属性 => 主目录 => 配置 => 添加，如下图配置：<br />[![](https://file.wulicode.com/yuque/202211/03/09/05133wJQzhVL.jpg?x-oss-process=image/resize,h_277)](http://images.cnblogs.com/cnblogs_com/shanyou/Windows-Live-Writer/a0034df81d51_F83D/iis6fcgi_4_2.jpg)  <br />可执行文件路径：C:\WINDOWS\system32\inetsrv\fcgiext.dll<br />6. 写个 php 测试下吧

看到类似以下效果说明你的服务器可以跑 php 了。<br />![](https://file.wulicode.com/yuque/202211/03/09/0513amFgemxC.png?x-oss-process=image/resize,h_155)



如果错误:  <br />       ![](https://file.wulicode.com/yuque/202211/03/09/0513CYAkOSRx.png?x-oss-process=image/resize,h_198)<br />      原因: 
>        一.没有安装.net 2.0 的框架
>           二.没有安装VC9运行库即VISUAL C++ 2008
>       安装VC   
>                  [http://www.microsoft.com/zh-cn/download/details.aspx?id=5582](http://www.microsoft.com/zh-cn/download/details.aspx?id=5582)
> 
> 打开后如果出现提示：No input file specified. 估计是没配置 fastcgi.impersonate。

