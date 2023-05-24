# 常用开发术语

## 网络

### DNS记录类型列表

> 域名系统实现将域名和IP 地址相互映射的一个分布式数据库，能够使人更方便的访问互联网。在这些域名服务器，不同的记录类型有着不同的用途。
> 
> ----[DNS记录类型列表[wiki]](https://zh.m.wikipedia.org/zh-cn/DNS%E8%AE%B0%E5%BD%95%E7%B1%BB%E5%9E%8B%E5%88%97%E8%A1%A8)

### CNAME记录

> 真实名称记录（英语：Canonical Name Record），即CNAME记录，是域名系统（DNS）的一种记录。CNAME记录用于将一个域名（同名）映射到另一个域名（真实名称），域名解析服务器遇到CNAME记录会以映射到的目标重新开始查询。
> 
> ----[CNAME记录[wiki]](https://zh.m.wikipedia.org/zh-cn/CNAME%E8%AE%B0%E5%BD%95)

### robots.txt

> robots.txt（统一小写）是一种存放于网站根目录下的ASCII编码的文本文件，它通常告诉网络搜索引擎的漫游器（又称网络蜘蛛）
> 此网站中的哪些内容是不应被搜索引擎的漫游器获取的，哪些是可以被漫游器获取的。
> 因为一些系统中的URL是大小写敏感的，所以robots.txt的文件名应统一为小写。
> robots.txt应放置于网站的根目录下。如果想单独定义搜索引擎的漫游器访问子目录时的行为，那么可以将自定的设置合并到根目录下的robots.txt，或者使用robots元数据（Metadata，又称元数据）。
> 
> ---- [robots.txt[wiki]](https://zh.m.wikipedia.org/zh-cn/Robots.txt)

## 浏览器

### SpiderMonkey

> SpiderMonkey是世界上第一款JavaScript引擎，由前网景公司的布兰登·艾克设计，后期由Mozilla基金会维护，以开放源代码发布。目前为Mozilla
> Firefox网页浏览器所使用的JavaScript引擎，并也被嵌入到其他许多环境，例如GNOME 3桌面。
>
> ---- [SpiderMonkey[wiki]](https://zh.m.wikipedia.org/zh-cn/SpiderMonkey)

## 图片

### Svg

> 可缩放矢量图形（英语：Scalable Vector Graphics，缩写：SVG）是一种基于可扩展标记语言（XML），用于描述二维矢量图形的图形格式。SVG由W3C制定，是一个开放标准。
> 
> ---- [svg/可缩放矢量图形[wiki]](https://zh.m.wikipedia.org/zh-cn/%E5%8F%AF%E7%B8%AE%E6%94%BE%E5%90%91%E9%87%8F%E5%9C%96%E5%BD%A2)

### JPEG

> JPEG或称JPG，是一种针对照片影像而广泛使用的有损压缩标准方法，由联合图像专家小组（英语：Joint Photographic Experts
> Group）开发。此团队创立于1986年，1992年发布了JPEG的标准而在1994年获得了ISO 10918-1的认定。
> JPEG与视频音频压缩标准的MPEG（Moving Picture Experts Group）很容易混淆，但两者是不同的组织及标准。
> 
> ---- [JPEG[wiki]](https://zh.m.wikipedia.org/zh-cn/JPEG)

## 数据库

### ORM / 对象关系映射

> 对象关系映射（英语：Object Relational Mapping，简称ORM，或O/RM，或O/R mapping），是一种程序设计技术，用于实现面向对象编程语言里不同类型系统的资料之间的转换。从效果上说，它其实是创建了一个可在编程语言里使用的“虚拟对象数据库”。
> 面向对象是从软件工程基本原则（如耦合、聚合、封装）的基础上发展起来的，而关系数据库则是从数学理论发展而来的，两套理论存在显著的区别。为了解决这个不匹配的现象，对象关系映射技术应运而生。
> 简单的说：ORM相当于中继资料。具体到产品上，例如下边的ADO.NET Entity Framework。DLINQ中实体类的属性[Table]就算是一种中继资料。
> 对象关系映射成功运用在不同的面向对象持久层产品中，如：Torque，OJB，Hibernate，TopLink，Castor JDO，TJDO，Active Record，NHibernate，ADO.NET Entity
> Framework，ObjectiveSql （页面存档备份，存于互联网档案馆） 等。
> 
> ---- [对象关系映射[wiki]](https://zh.wikipedia.org/zh-cn/%E5%AF%B9%E8%B1%A1%E5%85%B3%E7%B3%BB%E6%98%A0%E5%B0%84)

## 加密

### 资料加密标准

> 数据加密标准（英语：Data Encryption Standard，缩写为 DES）是一种对称密钥加密块密码算法
> 1976年被美国联邦政府的国家标准局确定为联邦资料处理标准（FIPS），随后在国际上广泛流传开来。
> 它基于使用56位密钥的对称算法。这个算法因为包含一些机密设计元素，相对短的密钥长度以及怀疑内含美国国家安全局（NSA）的后门而在开始时有争议，DES因此受到了强烈的学院派式的审查，
> 并以此推动了现代的块密码及其密码分析的发展。
>
> ---- [资料加密标准[wiki]](https://zh.m.wikipedia.org/zh-cn/%E8%B3%87%E6%96%99%E5%8A%A0%E5%AF%86%E6%A8%99%E6%BA%96)

### 3DES

> 密码学中，三重数据加密算法（英语：Triple Data Encryption Algorithm，缩写为TDEA，Triple DEA），或称3DES（Triple DES），
> 是一种对称密钥加密块密码，相当于是对每个数据块应用三次资料加密标准（DES）算法。
> 由于计算机运算能力的增强，原版DES由于密钥长度过低容易被暴力破解；3DES即是设计用来提供一种相对简单的方法，即通过增加DES的密钥长度来避免类似的攻击，而不是设计一种全新的块密码算法。
> 
> ---- [3DES[wiki]](https://zh.m.wikipedia.org/zh-cn/3DES)

## 国标

### ISO 216 / 纸张尺寸

> ISO 216是国际标准化组织（ISO）所定义的纸张尺寸国际标准，为今日世界上大多数国家（除北美和拉丁美洲部分地区外）所使用。该标准定义了“A”、“B”和“C”系列的纸张尺寸，知名的A4纸张尺寸即由此标准所定义，这是世界上最常用的纸张尺寸。
> 
> ---- [ISO 216 / 纸张尺寸[wiki]](https://zh.m.wikipedia.org/zh-cn/ISO_216)

## 参考

### GTD/尽管去做

> Getting Things Done (GTD) ，或译尽管去做，是由 David Allen 开发并发表在同名书中的个人生产力系统。在该著作中， 作者将该概念描述为时间管理系统
> ，并指出若与一个任务（相关的念头停留）在一个人的脑海中，它将可能会完全填满其思绪，这将使得该人无法处理其他任务。
> 
> ----[GTD[wiki]](https://zh.m.wikipedia.org/zh-cn/%E5%B0%BD%E7%AE%A1%E5%8E%BB%E5%81%9A)

## Api

### MetaWeblog API

> MetaWebBlog API（MWA）是一个Blog程序接口标准，允许外部程序来获取或者设置Blog的文字和熟悉。他建立在XML-RPC接口之上，并且已经有了很多的实现。
> 
> ---[MetaWeblog API[Medium]](https://medium.com/@chenomg/mweb%E5%8F%91%E5%B8%83%E6%96%87%E7%AB%A0%E5%88%B0%E8%87%AA%E5%BB%BA%E5%8D%9A%E5%AE%A2-django-a6084e25a3a8)
> 
> ---[MetaWeblog API[wordpress]](https://codex.wordpress.org/XML-RPC_MetaWeblog_API)

