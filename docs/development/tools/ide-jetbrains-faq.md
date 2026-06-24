---
description: 'JetBrains 插件与FAQ：包括代码地图（CodeGlancePro）、大小写切换（CamelCase）、字串处理（String Manipulation）、忽略文件（.ignore）及Dash辅助工具。常见问题：Mac副屏全屏模式下代码提示对话框闪屏、Inlay Hints侧边切换提交人信息、隐藏缓存文件提升性能、快捷键操作等。'
lastUpdated: '2026-03-14 09:30:00'
head:
  - - meta
    - name: 'og:title'
      content: 'JetBrains - 插件和FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'JetBrains 插件与FAQ：包括代码地图（CodeGlancePro）、大小写切换（CamelCase）、字串处理（String Manipulation）、忽略文件（.ignore）及Dash辅助工具。常见问题：Mac副屏全屏模式下代码提示对话框闪屏、Inlay Hints侧边切换提交人信息、隐藏缓存文件提升性能、快捷键操作等。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//development/tools/ide-jetbrains-faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/df82aee4b51b4922ac07204e624ed03f.png'
---
# JetBrains - 插件和FAQ

## 插件

### 1. 代码地图 CodeGlancePro

> 在右侧显示一个缩小的代码导航入口, 可以根据区块快速定位代码位置  
> —- [CodeGlance Pro - IntelliJ IDEs Plugin | Marketplace](https://plugins.jetbrains.com/plugin/18824-codeglance-pro)

![](https://file.wulicode.com/feishu-images/df82aee4b51b4922ac07204e624ed03f.png)

### 2. 大小写切换(CamelCase)

> 在 `CamelCase`, `camelCase`, `snake_case`,`SNAKE_CASE`中快速切换  
> 快捷键 `SHIFT + ALT + U`  
> —- [CamelCase - IntelliJ IDEs Plugin | Marketplace](https://plugins.jetbrains.com/plugin/7160-camelcase)

### 3. String Manipulation - 字串处理

> 提供强大的字符操作功能 case 切换, 大小写转换, 排序  
> —- [String Manipulation - IntelliJ IDEs Plugin | Marketplace](https://plugins.jetbrains.com/plugin/2162-string-manipulation/)

![](https://file.wulicode.com/feishu-images/687aa37aade33d01b912c23637af2065.png)

### 4. .ignore 忽略文件

> 快速创建不同文件规格之间的 ignore 文件  
> —- [.ignore - IntelliJ IDEs Plugin | Marketplace](https://plugins.jetbrains.com/plugin/7495--ignore)

![](https://file.wulicode.com/feishu-images/62b84b5f364d88a606ccb3bf6157698b.png)

### 5. Dash - 软件 dash 的辅助工具

> 提供 Dash, Velocity, Zeal 在 IDEA 中的快捷访问方式, 安装之后可以使用快捷键 `CMD + SHIFT + D`来快速打开 Dash, 并且输入当前选中的关键词函数  
> 如果需要自定义快捷键可以搜索 `Smart-Search Documentation`可以自定义自己的函数  
> —- [Dash - IntelliJ IDEs Plugin | Marketplace](https://plugins.jetbrains.com/plugin/7351-dash)

![](https://file.wulicode.com/feishu-images/fe75df18e889ddc22d97859d5fc25268.png)

## 显示

### (2023.1) 在 Mac 副屏全屏模式下打开代码提示对话框的时候会频闪

> 这个问题是一个 bug: [bug 地址](https://youtrack.jetbrains.com/issue/JBR-4959/Screen-flickering-when-IDE-is-full-screen-with-metal-rendering-enabled)

临时解决办法:

`控制中心 > 菜单栏 -> 自动隐藏和显示菜单栏` 更改为 `永不`

![](https://file.wulicode.com/feishu-images/4fe2e4d2f2e5e595425c531fc141698c.png)

### (2020.2) IDE 显示 |NBSP|

🔗 参考地址

[2020.2 showing |NBSP| – IDEs Support (IntelliJ Platform) | JetBrains](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360009442799-2020-2-showing-NBSP-)

这个东西叫做不换行空格, 也叫做硬空格

> **不换行空格**（英语：no-break space，NBSP）是空格字符，用途是禁止自动换行。HTML页面显示时会自动合并多个连续的空白字符，但该字符是禁止合并的，因此该字符也称作“硬空格”（hard space、fixed space）。Unicode码点为：U+00A0   no-break space  
> [不换行空格 - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/%E4%B8%8D%E6%8D%A2%E8%A1%8C%E7%A9%BA%E6%A0%BC)

但是这个字符在 IDE 中会展示为如下的样子

![](https://file.wulicode.com/feishu-images/cbb27e6a70bc2295b5d581a30bc7af0f.png)

为了保障不污染视觉我们有两种方案

1. 选中, 替换为空格
2. 在 `Preferences | Advanced Settings` 关掉对 Unicode 字符的名称缩写

![](https://file.wulicode.com/feishu-images/a1435cd2537cd3eba64da12298c9b4a2.png)

### Inlay Hints 在侧边切换提交人的信息

![](https://file.wulicode.com/feishu-images/6db722b99b5dad09c129465b03a973b0.png)

这里配置名称叫 `inlay hints`

## 性能

### 隐藏不想被搜到的缓存文件

由于项目采用的 CI 框架,目录结构分离得也比较清晰,加之项目前后台也规划分离得挺合理,所以在开发过程中完全可以在IDE下排除之`( File - Make Dicrectory As - Excluded )`,这样可以在一定程度上减少干扰提高开发效率。如果想将Excluded的目录再Include到项目中可以在 `(File | Settings | Directories )`选择对应目录取消掉Excluded即可.

## 快捷键

```Plaintext
ctrl+tab:         switcher,在已打开文件之间或者工具窗口间切换
alt+alt:          连续两次快速按下alt键不放，显示tool windows（project,database ...)
ctrl+k:           快速调用 commit changes 对话框
alt+F3:           显示搜索窗格，对当前文件进行搜索，然后配合ctrl+alt+r,可以进行替换操作
ctrl+shift+f:     find in path 在指定文件夹或者整个project内搜索，ctrl+shift+r进行替换操作
ctrl+shift+alt+t: 快速rename，里面有好几个选项，慢慢理解吧
shift+F6:         rename，自动重命名该变量所有被调用的地方
ctrl+shift+n:     快速导航到指定文件，弹出一个dialog，输入文件名即可
ctrl+shift+i:     快速查找选中内容定义的位置 quick definition viewer
ctrl+n:           快速打开任意类，弹出一个对话框，输入类名称，跳转到类文件
ctrl+shift+alt+n: 快速打开指定的method，field.弹出一个对话框，输入标识符，选择后跳转到指定内容
alt+F7:           查找选定变量，方法被调用的地方。选中一个方法或者变量，查找出所有调用的地方
ctrl+F12:         弹出一个对话框，显示当前文件里的所有方法，变量，直接输入方法变量名，回车即可跳转到定义位置
alt+F1:           快速打开当前编辑文件在其他tool windows里，这个很好用的键盘
ese:              退出tool windows，焦点返回到编辑器里
shift+esc:        退出并隐藏tool windows,焦点返回编辑器里
F12:              光标从编辑器里移动到最后一个关闭的tool windows里
ctrl+alt+d:       快速复制多行，哈哈，这个vim里更加简单
ctrl+shift+p:     显示函数方法的参数列表
ctrl+shift+backspace: last edit location
ctrl+shift+F7:    在当前文件高亮选定的标识符，esc退出高亮，f3,shift f3向下向上导航高亮标识符
ctrl+shift+alt+e: exploer最近打开的文件
alt+方向键：      左右在打开的编辑器标签间切换，上下在打开的文件中的方法里上下切换
alt+shift+c:      浏览最近的修改历史
ctrl+`:           选择主题，不常用
ctrl+g            跳转到指定行号
```

## 操作

```XML
编辑器操作
     ctrl+shift+A
          查找动作
     alt+[0-9]
          打开相应的窗口
     ctrl+shfit+f12
          最大化编辑器窗口
     ctrl + `
          切换主题, 快捷键, 代码风格颜色
     ctrl+alt+s
          打开配置对话框
     ctrl+tab
          切换打开的文件和打开的窗口组件
     alt+ [←+→]     
          切换编辑器标签
     f12
          返回上一个打开的窗口
     esc
          取消窗口的活动状态
     shift+esc
          隐藏活动或者最后一个激活窗口
     Ctrl + Shift + F4
          关闭打开的窗口
     ctrl+f12
          弹出结构的信息
项目操作
     

debug
     alt+shift+f10
          配置和运行
     shift+f10
          运行
     alt+shift+f9
          配置和debug
     shift+f9
          debug
     ctrl+shift+f10
          配置
     ctrl+shift+X
          运行命令行
     F8
          步过
     F7
          步入
     shift+F7
          智能步入
     shift+f8
          智能步过
     alt+F9
          运行到光标
     alt+F8
          计算表达式
     f9
          恢复程序
     ctrl+f8
          切换断电
     ctrl+shift+f8
          查看断点
     

文件操作
     F5
          复制
     F6
          移动
     shift+F6
          选中文件时候重命名
     delete
          删除
     alt+delete
          安全删除

项目操作
ctrl+shift+N
     项目中查找文件
ctrl+G
     转到行
Ctrl + E
     弹出最近的文件/切换文件
ctrl+alt+[←+→]
     光标位置的切换
alt + f1
     选择文件中的任意视图
alt+shift+f
     添加到收藏夹
Alt + Shift + I
     检查当前文件的可能错误信息
F2
     突出显示的错误
F4
     查看源代码
alt+Home
     显示导航栏
F11
     切换书签
ctrl+f11
     切换书签助记符
ctrl+[0-9]
     转到编号书签
shift+f11
     显示书签

VCS(版本控制)
     alt + `
          调出vcs窗口
          
     ctrl+K
          提交项目
     ctrl+T
          更新项目
     alt+shift+c
          查看最近改动

函数/框架操作
Alt+7
     显示本文件中的框架图
ctrl+shift+'-'
     折叠所有函数
ctrl+shift+'+'
     展开所有函数
ctrl+shift+alt+N
     项目中查找所有函数名称
ctrl + 点击
     转到声明
ctrl+shift+I
     打开快速定义
ctrl+p
     参数信息
ctrl+q
     快速文档查询
ctrl+shift+H
     函数的层级结构
ctrl+U
     父级别方法/声明
alt+[↑+↓]
     上下方法切换
ctrl+N
     查找类
ctrl+[
     转到代码开始
ctrl+]
     转到代码结束的地方
ctrl+space
     函数代码提示
ctrl+f1
     显示在插入符号的错误或者警告
alt+insert [code->Generate]
     插入快速方法
     批量插入PHPDOC
ctrl+O
     覆盖方法
Ctrl + I
     实现方法
Ctrl + /
ctrl+shift+/
     注释
ctrl+w
     扩展代码选区
ctrl+shift+w
     减少代码选区
ctrl+alt+L
     格式化
ctrl+alt+i
     自动缩进
shift+tab
     取消缩进
ctrl+shift+u
     切换大小写
ctrl+shift+[/]
     选择代码块
ctrl+'+'
     展开代码块
ctrl+'-'
     折叠代码块
重构
     shift+f6
          选中变量时候的变量重命名
     ctrl+alt+N
          内联变量
```

---

::: info 📆
更新记录
2026年03月09日
- 移除新版本不会存在的 jdbc 问题
- 移除特例的 FAQ 到不同的 FAQ
:::