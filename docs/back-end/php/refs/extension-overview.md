---
description: '说明: 这里整理Php 函数的主要函数由哪个版本增加删除线代表这个函数不可使用学习的方法Alternative PHP Cache(可选 PHP 缓存)Apc 用户缓存高级 Php 调试器, zend 相关的调试扩展, 不太常用, 也可能和部分 zend 扩展不兼容PHP bytecode Compiler, 加密专利 PHP 脚本, 加密类和函数, 编译 gtk, 转换 php 到 C错误处理和日志记录htscannerhtaccess-like support for all SAPIs 这个函数提供了为 PHP 每个目录使用 类似于 htacces'
lastUpdated: '2025-12-14 15:39:00'
head: 
  - - meta
    - name: 'og:title'
      content: '扩展函数大纲'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '说明: 这里整理Php 函数的主要函数由哪个版本增加删除线代表这个函数不可使用学习的方法Alternative PHP Cache(可选 PHP 缓存)Apc 用户缓存高级 Php 调试器, zend 相关的调试扩展, 不太常用, 也可能和部分 zend 扩展不兼容PHP bytecode Compiler, 加密专利 PHP 脚本, 加密类和函数, 编译 gtk, 转换 php 到 C错误处理和日志记录htscannerhtaccess-like support for all SAPIs 这个函数提供了为 PHP 每个目录使用 类似于 htacces'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/php/refs/extension-overview.html'
---
# 扩展函数大纲



说明: 这里整理Php 函数的主要函数

- 不整理 php7.0 以下并废弃的函数
- 不整理 windows 服务器专属的函数
- 不整理实验性的函数, 说明并且删除可以标注函数

由哪个版本增加删除线代表这个函数不可使用

## 说明

学习的方法

- 扩展的安装和配置
- 函数的学习
- 相关知识

> 过时:Win 官方不支持, 不进行重点测试]初次学习这些函数是在 2012 年 开始看函数的时候是按照 a-z 的方式阅读函数, 然后又系统的根据功能去学习的函数, 当时 php 还是 5.3 版本 当时的语法高亮还是从工具中复制出来, 然后复制到 Evernote 中

## 影响 PHP 行为的扩展

###  **APC** 

Alternative PHP Cache(可选 PHP 缓存)

###  **[WIP] APCu** 

Apc 用户缓存

###  **APD** 

高级 Php 调试器, zend 相关的调试扩展, 不太常用, 也可能和部分 zend 扩展不兼容

###  **[实验性]bcompiler** 

PHP bytecode Compiler, 加密专利 PHP 脚本, 加密类和函数, 编译 gtk, 转换 php 到 C

###  **错误处理** 

错误处理和日志记录

**htscanner**

htaccess-like support for all SAPIs 这个函数提供了为 PHP 每个目录使用 类似于 htaccess 的配置文件的可能性, 对 fastcig 模式十分有用

**inclued**  Inclusion hierarchy viewer, 文件包含等级查看器

~~[ignore]Memtrack~~

[实验性] 用来检测最大的内存调用和报告

**输出控制 — 输出缓冲控制**

影响 PHP 行为的扩展 - 输出控制

~~[ignore]Object overloading~~

对象方法和对象方法过载 [实验性] 对象方法和属性的魔法调用. **get(),** set() 和 __call() 方法, 由于 PHP5 中已经内嵌了这个功能,所以这个过载方法已经不必使用.

影响 PHP 行为的扩展 - PHP 选项/信息

**runkit**

runkit 扩展提供了修改常量, 用户定义函数, 和用户定义的类的方法, 他也可以提供自定义的超全局变量和通过沙箱运行的嵌入式的子线程 php 解析器

**scream — Break the silence operator**

给出了禁用错误抑制符号的方法, 所有的错误都将被报告, 这个设置可以在 ini 中设置  `@`  错误控制运算符前缀甚至使导致脚本终止的严重错误的错误报告也失效。这意味着如果在某个不存在或类型错误的函数调用前用了  `@`  来抑制错误信息，那脚本会没有任何迹象显示原因而死在那里

**Weakref — Weak References**

弱引用, 提供了一个对于短暂存在的对象的一个无打扰的访问方法, 不像是强引用, 若引用不会拒绝 gc 对它的清理, 所以 一个对象已经不存在了,但是这个若引用对象还是存在的, 这样看来若引用是可用的.

**WinCache — Windows Cache for PHP**

这是一个 PHP 加速器用来加速在 win 平台或者在 win 服务器运行, 一旦这个扩展可用,并且被 PHP 引擎加载, PHP 可以不需要任何修改代码便可以享受这个变化.

**Xhprof — Hierarchical Profiler**

等级分析器,用来分析资源调用和程序调用.基于浏览器的 UI 可以显示分析结果,并且展示出来

# 音频格式操作

**ID3 — ID3 Tags**

这些函数让你读取和草组 ID3 标记, ID3 标记是在 MP3 文件用来存储歌曲标题, 艺术家,专辑,流派,年份, 曲轨信息

**KTaglib5**

基于 KDE 项目来读写 ID3 和 Ogg 标记的 taglib 的面向对象类库, 这个类库提供了访问音频信息的方法, 模块基于 C++API, 但是在 PHP 项目中被使用, 这个 Ktaglib 同时能够读写 ID3v1 和 ID3v2 标记

**oggvorbis — OGG/Vorbis**

OGG/Vorbis 文件格式,在 [http://www.vorbis.com](http://www.vorbis.com/) 定义, 是一种音频流压缩格式,同时很少的音频损失, 这个扩展添加了 URL 的 ogg/Vorbis 访问, 当使用读模式的时候,压缩的 OGG/Vorbis 数据扩展到 原生的 PCM 音频.

**OpenAL — OpenAL Audio Bindings**

独立平台的音频约束

# 身份认证服务

**KADM5 — Kerberos V**

这个包允许你访问 Kerberos V 服务管理器,你能够建立修改和删除 Kerberos V 规则.

**Radius**

这是基于 FreeBSD 下的 远程拨号认证服务, 这个允许用户管理远程服务器.

# 日历和时间相关扩展

**Calendar**

历法扩展集包括了一系列用于在不同历法间进行转换的函数，它是以 Julian Day 计数为中介或标准来进行的。Julian Day 计数是以公元前的 4713 年的 1 月 1 日为起点的一种计数法。为了在不同历法间进行转换，你首先要转换成 Julian Day 计数，然后再转换为你所需要的历法。Julian Day 计数和 Julian 历法是非常不同的！

**Date/Time — Date and Time**

这些函数允许你从运行 PHP 的服务器获取时间和日期,你可以通过各种方式来处理这些日期.日期和时间信息在内部以 64 为数字存储,所以可以想到的任何时间的日期都是支持的(包括公元前纪年), 所有的时间都是基于内部的服务器设置.

# 命令行特有的扩展

**Ncurses — Ncurses Terminal Screen Control**

[实验性的]Ncurses (new curses) 是 System V Rel 4.0 中 curses 的模仿, 他使用条目格式,支持 pads, 颜色,多行高亮, 表单字串和函数键值便利, 因为这个库的交互性, 这个很少用来写 web 程序,但是在 cli 模式下写脚本是很有用的.

**Newt**

这是 RedHat 在 PHP 语言上的扩展,基于 window 中段的库,用来编写用户交互界面,一旦这个扩展可用, 这个将允许使用 Newt 插件,像是窗口,按钮,复选框, 单选框,标签, 编辑框, 滚动条, 文本区域, 范围等等.这个的使用和 Newt 在 C 上的变成相近  **Readline — GNU Readline**

readline 函数基于 Gnu Readline 函数库, 这个函数提供了可以编辑的命令行. win 平台不可用

# 压缩与归档扩展

**Bzip2**

用来读写 bzip2(.bz2)压缩文件.

**LZF**

LZF 是一个非常快的压缩算法, 目的是节省空间和和较少的速度花费, 这个能够在速度和空间上优化时间编译, 这需要 liblzf 库

**Phar**

++++phar 扩展提供了一个方法:吧完整的 PHP 程序放到一个文件中 phar(php archive)用来便于安装和部署, 为了提供这个服务,phar 扩展提供了一个抽象方法来建立和维护 tar 和 zip 文件通过 pharData 类, 就像是 PDO 提供了一个统一的接口来访问不同的数据库一样,但是不停的是, PDO 不能再多种数据库之间转换, par 通常可以通过一行代码转换 tar,zip, phar 文件格式.

**Rar — Rar Archiving**

读取 rar 文件的扩展

**Zip**

zip 提供了一个读写 zip 压缩文件的方法

**Zlib — Zlib Compression**

这个模块允许你读写 gzip(.gz)格式的文件.通过更多的文件系统函数结合 gzip

# 信用卡处理

**MCVE — MCVE (Monetra) Payment**

这个扩展是 MCVE(monetry)API 接口函数, 它能够使用 PHP 脚本直接和 MCVE 对话.

**SPPLUS — SPPLUS Payment System**

这个扩展可以使用 SPPLUS 支付系统.

# 加密扩展

**Crack — Cracklib**

[实验性的]这些函数允许你使用 CrackLib 库来检测密码的强度, 强度的检测使用大小写和 CrackLib 词典进行匹配. 这个给出信息的特征来增强密码的强度

**Hash — HASH Message Digest Framework**

++++信息摘要引擎, 允许直接或增量处理任意长度的消息，使用不同的散列算法。

**Mcrypt**

++++这是一个加密库的接口, 支持大范围的区块算法

**Mhash**

++++这个函数和 mhash 函数一块使用, Mhash 用来建立校验和,信息摘要,信息权限码.支持 hash 算法.

**OpenSSL**

++++ 使用 openssl 函数来生成和验证签名数据, openssl 提供了很多特性,但是这个模块不支持, 有些可能在未来进行添加

# 数据库扩展

**数据库抽象层**

DBA — Database (dbm-style) Abstraction Layer

这些函数建立的基础上是访问 Berkeley DB 样式数据库, 这是一个基于文件的抽象层, 数据库扩展-数据库抽象层-DBA

dbx

DBX 模块是一个数据库抽象层, dbx 函数允许你访问所有支持的数据库,使用单个的调用约定, dbx 函数,不直接和数据打交道,但是和这个数据库支持的模块打交道

ODBC — ODBC (Unified)

为了增加通用 ODBC 的支持,统一的 ODBC 函数允许你访问一些借用了 ODBC API 语义的数据库, 为了统一的管理多数据库驱动. 这些驱动统一为一系列的 ODBC 函数 这些数据库有 Adabas D,  IBM DB2,  iODBC,  Solid,  Sybase SQL Anywhere

PDO — PHP Data Objects

PDO 指定一个轻量级的持续的接口来在 PHP 中访问数据库, 每一个数据库驱动和 PDO 接口一致能够直接暴露数据库指定的特性.你不能使用 pdo 扩展操作任何数据库函数.你必须使用指定的数据库的 PDO 驱动来访问数据库服务器.

**与具体数据库系统相关的扩展**

CUBRID

cubird 数据库访问函数库

DB++

德国公司 Concept asa 公司的关系型数据库 [实验性的]函数

dBase

允许你访问 dBase-format (dbf) 数据库

filePro

只读函数库

Firebird/InterBase

Firebird/InterBase

FrontBase

FrontBase

IBM DB2 — IBM DB2, Cloudscape and Apache Derby

访问 IBM DB2 数据库

Informix

Informix 7.x, Universal Server

Ingres — Ingres DBMS, EDBC, and Enterprise Access Gateways

DBMS, EDBC, and Enterprise Access Gateways

MaxDB

MaxDB

Mongo — MongoDB Native Driver

Mongo DB

mSQL

++++

Mssql — Microsoft SQL Server

++++

MySQL — MySQL Drivers and Plugins

++++mysql 驱动和插件 —-与具体数据库系统相关的扩展 - MYSQL

OCI8 — Oracle OCI8

++++

Ovrimos SQL

++++

Paradox — Paradox File Access

++++

PostgreSQL

++++

SQLite

++++

SQLite3

++++

SQLSRV — Microsoft SQL Server Driver for PHP

++++

Sybase

++++

tokyo_tyrant

++++

# 文件系统相关扩展

**Direct IO**

PHP 支持直接的 文件 读存函数在 POSIX 标准上, 但是比 C 的流读取要低一个档次, 这些函数应该被认为是直接操作设备需要的, 标准的 Filesystem 函数是比较充分的 , 这个不建议使用的 这个扩展 在 PHP5.1 之后 移动到 pecl 资源库, 这个扩展仅仅在 win 平台并且是 PHP5.0 支持 文件系统相关扩展 - Direct IO

**Directories**

目录函数 文件系统相关扩展 - Directories

**Fileinfo — File Information**

这个模块中的函数试着去查找指定的字节来确定文件类型和编码.虽然这个不是万无一失的做法,但是也做的很好了, 因为是返回字符,所以觉得这个函数好像不太好用 文件系统相关扩展 - fileinfo

**Filesystem**

文件系统函数 文件系统相关扩展 - Filesystem

**Inotify**

通知

**Mimetype**

[deprecated] 不推荐的扩展,因为 fileinfo 已经包含了这个功能

**Proctitle**

允许改变当前的线程, 进程名称

**xattr**

允许维护文件系统的扩展属性

**xdiff**

允许你建立和应用补丁文件, 在不同的版本文件中, 这个扩展支持两种不同的操作模式.字串/文件.支持两种格式,默认/二进制, 一般的是容易阅读的, 另外的可供图像, 扩展包使用.

# 国际化与字符编码支持

**Enchant — Enchant spelling library**

这是一个 PHP 绑定的库, 提供了一个统一的拼写库

**FriBiDi**

unicode 双向算法接口

**Gettext**

这个函数继承了 本地语言支持 , 能管理 PHP 应用

**iconv**

这个模块包含了一个熟练展缓字串的接口, 使用这个模块,你能转换一个字串从一个本地的字串设置成 ing 一个字串集.这个也可能是 Unicode 字串.支持的字串设置, 基于系统上的 iconv 接口,注意,这个 iconv 哈数在有些系统上可能不像你期待的那样期待.作为一个更好的方法是安装 gun libiconv 库, 这个节骨很可能是相同的.在 PHP 5.0.0 开始,这个扩展和更多函数帮助写脚本.下边让我引导你看到更多的特性

**intl — Internationalization Functions**

国际化扩展

**Multibyte String**

多字节字串

**Pspell**

用来检测一个单词的写法和建议

**Recode — GNU Recode**

[Linux]重新编码, 字符集转换, win 平台不支持

# 图像生成和处理

**Cairo**

使用 Cairo 图形库来建立和修改图形, 这是一个 2D 库, 使用 C 写成.用于多设备输出, 目前未在 windows 上构建

**Exif — Exchangeable image information**

使用 image 元数据进行工作, 可以读取数码相机的信息.

**GD — Image Processing and GD**

建立和维护图像格式, gif, png, jpeg, wbmp,xpm

**Gmagick**

建立,修改,维护图像元信息的 api

**ImageMagick — Image Processing (ImageMagick)**

通过 ImageMagick 接口来建立和修改图像 ImageMagic 是一个软件包来建立修改对比位图图像, 他可以读写,转换图片超过一百种格式.这个公司致力于图形方案免费化

# 邮件相关扩展

**Cyrus — Cyrus IMAP administration**

[Linux] IMAP 管理工具, imap, recode, yaz1.*, cyrus, imap 不可同时使用

**IMAP — IMAP, POP3 and NNTP**

这个函数允许你操作 IAMP 协议, 还有 NNTP, POP3, 和本地邮箱的访问方法, 需要警告的是, imap 函数将不可能正确的使用在 pop 协议上

**Mail**

mail()允许你发送邮件

**Mailparse**

这个扩展用来分析和处理 email 信息,基于 822 和 2045 协议, 这个函数需要 mbstring 扩展并且在之前加载

**vpopmail**

[实验性]…

# 数学扩展

**BC Math — BCMath Arbitrary Precision Mathematics**

++++任意精度数学算法 —-数学扩展 - BCMath

**GMP — GNU Multiple Precision**

++++这个函数允许你处理任意长度的数值,使用 GNU MP 函数库, 这里你处理数值必须以字串的形式处理,否则 PHP 将会打乱这个编制

**Lapack**

++++是一以 Fortran 程式語言寫就，用於數值計算的函式集。 LAPACK 提供了豐富的工具函式，可用於諸如解多元線性方程式、線性系統方程組的最小平方解、計算特徵向量、用於計算矩陣 QR 分解的 Householder 轉換、以及奇異值分解等問題。

**Math — Mathematical Functions**

++++基于计算机能识别的长度来处理浮点数和整数 —-数学扩展 - Math 数学函数

**Statistics**

++++这是一个统计学扩展, 包含了很多函数都是处理统计学数据的.

# 非文本内容的 MIME 输出

**FDF — Forms Data Format**

处理 pdf 的 fdf 数据

**GnuPG — GNU Privacy Guard**

和 GnuPG 交互的插件

**haru — Haru PDF**

[实验性]生成 PDF 文档的免费的跨平台的库

**Ming — Ming (flash)**

[实验性]建立 swf 的扩展

**PDF**

生成 pdf 的扩展, 使用特定功能的话可以使用, 完整的需要购买授权

**PS — PostScript document creation**

建立 PostScript 文档

**RPM Reader — RPM Header Reading**

Rpm 包文件头部读取工具

**SWF — Shockwave Flash**

[Linux]创建 flash 的工具

# 进程控制扩展

**Eio 本函数提供异步 POSIX I/O 接口**

[Linux] ????进程控制扩展 - Eio

**Expect**

++++通过 PTY 和进程交互

**Libevent**

++++指定的事件发生之后调用函数

**PCNTL — 进程控制**

[Linux]PHP 的进程控制支持实现了 Unix 方式的进程创建, 程序执行, 信号处理以及进程的中断。 进程控制不能被应用在 Web 服务器环境，当其被用于 Web 服务环境时可能会带来意外的结果。

**POSIX**

[Linux]

**Program execution — System program execution**

++++在系上执行命令

**Semaphore — Semaphore, Shared Memory and IPC**

[Linux] 信号,共享内存,交互进程信息

**Shared Memory**

使用 PHP 读写,建立,删除共享内存碎片

# 其它基本扩展

**GeoIP — Geo IP Location**

++++用于找出 IP 地址的位置, 经纬度, 和其他信息, 如接入商,链接类型

**JSON — JavaScript Object Notation**

这个接口基于 json 数据交换格式 [www.json.org], 解码编辑器基于 JSON_checker, php5.2 集成. [其它基本扩展 - JSON](https://www.yuque.com/attachments/yuque/0/2022/html/87644/1655376102862-45ba282c-87b6-4ec1-becd-a72f73a0ff63.html)

**Judy — Judy Arrays**

++++复杂的快速的关联数组结构, 用来排序和查找值.

**Lua**

++++一个强有力的轻量级的, 嵌入的脚本语言, 这个扩展就是一个这样的解释器

**Misc. — 杂项函数**

++++这里真真正正的是一些乱七八糟的函数..确实没地方放了. —-其它基本扩展- Misc.杂项函数

**Parsekit**

++++允许运行时分析 opcode

**SPL — PHP 标准库 (SPL)**

++++SPL 是用于解决典型问题(standard problems)的一组接口与类的集合 —-PHP 基本扩展 - SPL (PHP 标准库)

**SPL Types — SPL Type Handling**

[实验性]用来帮助 PHP 做成一个强类型语言

**Streams**

++++流信息

**Tidy**

++++HTML tidy 在 PHP 中的集成

**Tokenizer**

++++使用 PHP 内置解析器解析文件中函数的调用

**URLs**

++++处理 URL 字串, 编码, 解码, 解析 —-其它基本扩展 - URLs

**V8js — V8 Javascript Engine Integration**

++++js 解释器在 PHP 中的集成

**Yaml — YAML Data Serialization**

++++yaml 数据解析和生成

**Yaf**

++++PHP 的 YAF 框架

**Taint**

++++用来检测跨站脚本(xss)和 sql 注入工具

# 其它服务

**AMQP**

++++高级信息队列协议, 用来信息的路由和排列 [linux]

**chdb — Constant hash database**

++++常量 hash 数据 —-其它服务 - chdb

**cURL — Client URL Library**

++++PHP 支持的由 Daniel Stenberg 创建的 libcurl 库允许你与各种的服务器使用各种类型的协议进行连接和通讯。libcurl 目前支持 http、https、ftp、gopher、telnet、dict、file 和 ldap 协议。libcurl 同时也支持 HTTPS 认证、HTTP POST、HTTP PUT、 FTP 上传(这个也能通过 PHP 的 FTP 扩展完成)、HTTP 基于表单的上传、代理、cookies 和用户名+密码的认证。

**FAM — File Alteration Monitor**

[Linux] fam 监控文件和目录的修改和应用的改变

**FTP**

++++ftp 服务

**Gearman**

++++分布式远程过程处理

**Gopher — Net Gopher**

++++Gopher 是一个互联网上使用的分布型的文件搜集获取网络协议

**Gupnp**

++++面向对象的开源框架,用来建立 UPnp 设备和控制点

**HTTP**

++++提供了一个方便的和强有力的函数系列, 方便的处理 httpurl, 日期,重定向,头部,信息.

**Hyperwave**

++++信息系统

**Hyperwave API**

++++

**Java — PHP / Java Integration**

[实验性]桥接 PHP 和 java.

**LDAP — Lightweight Directory Access Protocol**

++++轻型目录访问协议, 用来访问目录服务器.

**Lotus Notes**

[实验性]一个世界领先的企业级通讯、协同工作及 Internet/Intranet 平台

**Memcache**

++++Memcache 模块提供了于 memcached 方便的面向过程及面向对象的接口，memcached 是为了降低动态 web 应用 从数据库加载数据而产生的一种常驻进程缓存产品。

**Memcached**

++++一个高性能分布式的内存对象缓存系统， 通常被用于降低数据库加载压力以提高动态 web 应用的响应速度

**mqseries**

++++提供了一个接口,用来和 IBM 的 webSphere MQseries 队列管理器联系

**Network**

++++提供了一系列的网络函数

**RRD — RRDtool**

++++RRD 数据库的访问接口

**SAM — Simple Asynchronous Messaging**

++++用来访问消息队列系统

**SNMP**

++++提供了一个简单方法来管理远程设备.

**Sockets**

++++socket 链接服务

**SSH2 — Secure Shell2**

++++提供了安全访问资源的方法

**Stomp — Stomp Client**

++++ stomp 链接

**SVM — Support Vector Machine**

++++支持向量机(Support Vector Machine)是 Cortes 和 Vapnik 于 1995 年首先提出的，它在解决小样本、非线性及高维模式识别中表现出许多特有的优势，并能够推广应用到函数拟合等其他机器学习问题中

**SVN — Subversion**

[实验性]svn

**TCP — TCP Wrappers**

检测远程客户端是否可以根据指定的 IP 进行链接

**Varnish**

++++Varnish 网站缓存加速器

**YAZ**

++++

**YP/NIS**

[Linux] 密码,账号管理文件

# 搜索引擎扩展

**mnoGoSearch**

++++允许你访问 mnoGoSearch.mnoGoSearch 是一个为 MySQL、PostgreSQL 等数据库服务器提供高速搜索功能的工具软件,可以应用在小型的 Internet 服务器上,如果你的服务器是使用 MySQL 的,这个工具您也应该使用,因为它可以加速你搜索 MySQL 的速度! 后台系统用 C 语言开发。支持 C CGI, PHP, Perl 搜索前端

**Solr — Apache Solr**

++++使用 PHP 连接 apache Solr 服务器

**Sphinx — Sphinx 客户端**

++++提供了针对 Sphinx 搜索客户端开发库的绑定

**Swish — Swish Indexing**

[实验性]Swish-e API

# 面向服务器的扩展

**Apache**

++++ 这些函数仅在 PHP 以 Apache 模块运行时有效 —-面向服务器的扩展 - Apache

**IIS — IIS Administration**

**NSAPI**

# Session 扩展

**Msession — Mohawk Software Session Handler Functions**

[Linux] 高速 session

**Sessions — Session Handling**

++++session

**Session PgSQL — PostgreSQL Session Save Handler**

[Linux] 使用 PostgreSQL 来使用 session

# 文本处理

**BBCode — Bulletin Board Code**

++++BBCode 解析函数 —-文本处理 - BBCode[Bulletin Board Code]

**PCRE — Regular Expressions (Perl-Compatible)**

++++基于 perl 的正则函数 —-文本处理-PCRE

**POSIX Regex — Regular Expression (POSIX Extended)**

posix 正则, 现在推荐使用 pcre 正则, 这个在 [5.3.0] 中不建议使用 —-文本处理 - POSIX Regex

**ssdeep — ssdeep Fuzzy Hashing**

++++检测文本相似性

**字符串**

++++字串函数 —-文本处理 - 字符串

# 与变量和类型有关的扩展

**Array(数组)**

++++数组处理 —-与变量和类型有关的扩展- Array(数组)

**Classes/Objects — Class/Object Information**

++++获取类/对象的信息 —-与变量和类型有关的扩展 - Classes/Objects

**Classkit**

[deprecated] 被 runkit 替代, 本扩展可能已经无人维护

**Ctype — Character type checking**

# 字串类型检测

**Filter — Data Filtering**

++++这个过滤数据的功能是验证和消毒数据. 这个特性在数据不知道数据的的情况下非常有用, 像用户提供的数据,例如说来自 html 表单的数据 —-与变量和类型有关的扩展 - Filter

**Function Handling**

++++函数调用 —-与变量和类型有关的扩展 - Function Handling

**Object Aggregation — Object Aggregation/Composition [PHP 4]**

[实验性/过时] 对象和类的集成

**Quickhash**

++++quickhash 扩展包含了一组特定的强类型的类来处理特定的一组和散列实现。

**Reflection**

++++类映射

**Variable handling**

++++变量处理 —-与变量和类型有关的扩展 - Variable handling

# Web Services

**OAuth**

++++提供了 OAuth 用户和绑定. OAuth（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某一网站上存储的私密的资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用

**SCA**

[实验性] 写重用组件

**SOAP**

soap 扩展

**XML-RPC**

[实验性] 写 XML-RPC 服务和客户端

# Windows 平台下的扩展

**.NET**

[实验性] .net 使用是必须安装.net 环境 —-Windows 平台下的扩展 - .net

**COM — COM and .Net (Windows)**

com 组件

**Printer**

[deprecated] 不支持先进服务器

**W32api**

[实验性]

**win32ps**

++++win 平台下的统计和内存统计

**win32service**

++++服务管理

# XML 操作

**DOM — Document Object Model**

++++PHP5 上操作 xml 的方法. —-XML 操作 - DOM

**DOM XML (PHP 4)**

同上,但是 php4 版本

**libxml**

++++以下这些 DOM, libxml, SimpleXML, SOAP, WDDX, XSL, XSLT, XML, XMLReader, XMLRPC 和 XMLWriter 基于本扩展

**qtdom**

[Linux][实验性]

**SDO — Service Data Objects**

++++多个源来读取数据

**SDO-DAS-Relational — SDO Relational Data Access Service**

++++实时数据存取服务

**SDO DAS XML — SDO XML Data Access Service**

++++数据存取服务

**SimpleXML**

++++简单方法来处理 xml

**WDDX**

++++全球信息网分散式文件交换

**XML 解析器**

++++内置解析器, 比较复杂感觉

**XMLReader**

++++读取

**XMLWriter**

++++写入

**XSL**

++++扩展样式语言.

**XSLT (PHP 4)**

++++同上.php4

