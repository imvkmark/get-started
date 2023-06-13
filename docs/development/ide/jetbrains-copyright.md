# 在 Jetbrains 系 IDE 中使用版权 Copyright

在编写代码时候，常会在代码顶部的地方放上 Copyright 的年份, 如果在新年来临时候, 我们的版权信息还没有更新, 则会落后的. 但是手工更新或者是批量替换会产生大量的工作量或者错误.
为了解决这个问题, PHPStorm 有个绝佳解决方案就是 版权自动更新机制(插件).

## 添加版权 Copyright

进入设置

![](https://file.wulicode.com/note/2021/11-11/16-04-32270.png)

搜索并且找到版权设置项目(新版 IDE 已经集成, 不需要安装), 如果是老版本需要搜索并且安装 copyright 插件

![](https://file.wulicode.com/note/2021/11-11/16-04-42488.png)

版权的参数可以查看官方链接:

Copyright Profiles

## 设置版权范围 Scope

并不是所有的文件都需要同样的版权信息, 我们在需要的目录中添加版权, 这就用到 PHPstorm 的 Scope (范围) 功能.

首先设置范围并且设置为共享模式

![](https://file.wulicode.com/note/2021/11-11/16-04-52265.png)

搜索 scope, 找到设置项目, 根据文件夹来进行选择, 排除等设置,最后勾选底部的 `Share Scope`

## 设置版权和 Scope 关联

找到 Copyright 主设置项目, 添加并且关联

![](https://file.wulicode.com/note/2021/11-11/16-05-03728.png)

## 更新版权

这里需要注意的是在版权设置中有个查找位置.

![](https://file.wulicode.com/note/2021/11-11/16-05-12545.png)

这一行的意思是在注释中根据正则来查找符合此规则的注释并且更新为当前版权. 默认是 `Copyright` 因为每个版权声明中肯定存在 `Copyright` 这个字串, 如果你的文件中没有这个匹配项目,
则会在文件底部添加版权信息.

我们右键需要更新版权信息的文件夹, 这样则版权信息就更新了.

![](https://file.wulicode.com/note/2021/11-11/16-05-20870.png)

## 不同语种的设置

在不同的语种中会有不同的版权信息格式, 注释格式, 在菜单项目中可以根据多语种来设置不同的格式化信息.体验很好

![](https://file.wulicode.com/note/2021/11-11/16-05-29707.png)

## 参考文章

- [Intellij（JetBrains 的其他产品）添加 copyright、类注释](http://www.jianshu.com/p/8f8ccdcf3580)
- [Copyright Page Samples You Can Copy and Paste Into Your Book](https://www.thebookdesigner.com/2010/01/copyright-page-samples-you-can-copy-and-paste-into-your-book/)
- [Best existing license for closed-source code](https://softwareengineering.stackexchange.com/questions/68134/best-existing-license-for-closed-source-code)

