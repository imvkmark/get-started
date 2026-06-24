---
description: '在编写代码时候，常会在代码顶部的地方放上 Copyright 的年份, 如果在新年来临时候, 我们的版权信息还没有更新, 则会落后的. 但是手工更新或者是批量替换会产生大量的工作量或者错误. 为了解决这个问题, PHPStorm 有个绝佳解决方案就是 版权自动更新机制(插件).进入设置 command + , 或者点击右上角的设置搜索并且找到版权设置项目(新版 IDE 已经集成, 不需要安装), 如果是老版本需要搜索并且安装 copyright 插件版权的参数可以查看官方链接: Copyright Profiles并不是所有的文件都需要同样的版权信息, 我们在需要的目录中添'
lastUpdated: '2025-12-06 10:56:00'
head: 
  - - meta
    - name: 'og:title'
      content: '在 Jetbrains 系 IDE 中使用版权 Copyright'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在编写代码时候，常会在代码顶部的地方放上 Copyright 的年份, 如果在新年来临时候, 我们的版权信息还没有更新, 则会落后的. 但是手工更新或者是批量替换会产生大量的工作量或者错误. 为了解决这个问题, PHPStorm 有个绝佳解决方案就是 版权自动更新机制(插件).进入设置 command + , 或者点击右上角的设置搜索并且找到版权设置项目(新版 IDE 已经集成, 不需要安装), 如果是老版本需要搜索并且安装 copyright 插件版权的参数可以查看官方链接: Copyright Profiles并不是所有的文件都需要同样的版权信息, 我们在需要的目录中添'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/ide/jetbrains-ide-copyright.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/35/35d28857286fde9f401012f47ff74914.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 在 Jetbrains 系 IDE 中使用版权 Copyright



在编写代码时候，常会在代码顶部的地方放上 Copyright 的年份, 如果在新年来临时候, 我们的版权信息还没有更新, 则会落后的. 但是手工更新或者是批量替换会产生大量的工作量或者错误. 为了解决这个问题, PHPStorm 有个绝佳解决方案就是 版权自动更新机制(插件).

## 添加版权 Copyright

进入设置  `command + ,`  或者点击右上角的设置

搜索并且找到版权设置项目(新版 IDE 已经集成, 不需要安装), 如果是老版本需要搜索并且安装 copyright 插件

![](https://file.wulicode.com/notion/35/35d28857286fde9f401012f47ff74914.png)

版权的参数可以查看官方链接: [Copyright Profiles](https://www.jetbrains.com/help/idea/copyright-profiles.html)

## 设置版权范围 Scope

并不是所有的文件都需要同样的版权信息, 我们在需要的目录中添加版权, 这就用到 PHPstorm 的 Scope (范围) 功能.

首先设置范围并且设置为共享模式

![](https://file.wulicode.com/notion/d2/d2fd2041513321e23a0903a06df9fca2.png)

搜索 scope, 找到设置项目, 根据文件夹来进行选择, 排除等设置,最后勾选  `Share through VCS`

## 设置版权和 Scope 关联

找到 Copyright 主设置项目, 添加并且关联

![](https://file.wulicode.com/notion/12/12287d684f4bf7df74575c213b4dee93.png)

## 更新版权

这里需要注意的是在版权设置中有个匹配位置, 我们可以进行如下设置

![](https://file.wulicode.com/notion/19/19b7b87a2ebae59d434b864a319164f5.png)

内容如下

```
Copyright (c) $originalComment.match("Copyright \(c\) (\d+)", 1, "-", "$today.year")$today.year. Your Team Tec, Inc.
All Rights Reserved Unauthorized copying of this file
via any medium is strictly prohibited Proprietary and confidential
```

更新后的信息如下

```
/*
 * Copyright (c) 2016-2023. Shandong Liexiang Tec, Inc.
 * All Rights Reserved Unauthorized copying of this file
 * via any medium is strictly prohibited Proprietary and confidential
 */
```

这一行的意思是在注释中根据正则来查找符合此规则的注释并且更新为当前版权. 默认是  `Copyright` , 因为每个版权声明中肯定存在  `Copyright`  这个字串, 如果你的文件中没有这个匹配项目, 则会在文件底部添加版权信息.

我们右键需要更新版权信息的文件夹或者文件, 这样版权信息就会更新了.

![](https://file.wulicode.com/notion/2c/2cdb087501f79008734a3c6269bcf337.png)

## 不同语种的设置

在不同的语言中会有不同的版权信息格式, 注释格式, 在菜单项目中可以根据多语种来设置不同的格式化信息.体验很好

![](https://file.wulicode.com/notion/89/89f463c7a571877ce68dc094a2b01910.png)

## 参考文章

- [Intellij（JetBrains 的其他产品）添加 copyright、类注释](http://www.jianshu.com/p/8f8ccdcf3580)
- [Copyright Page Samples You Can Copy and Paste Into Your Book](https://www.thebookdesigner.com/2010/01/copyright-page-samples-you-can-copy-and-paste-into-your-book/)
- [Best existing license for closed-source code](https://softwareengineering.stackexchange.com/questions/68134/best-existing-license-for-closed-source-code)

