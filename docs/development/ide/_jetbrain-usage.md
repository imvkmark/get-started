# Jetbrains 使用

## 快捷键

```
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

## phpstorm 设置注释风格

怎样设置在按下 Ctrl + / 时 PHPStrom 的注释风格是为`at indentation level` 而非 `at first column` ？

first line

![image.png](https://file.wulicode.com/yuque/202208/04/15/3453LvE1yeGy.png?x-oss-process=image/resize,h_148)

indentation level

![image.png](https://file.wulicode.com/yuque/202208/04/15/3454joglJoL6.png?x-oss-process=image/resize,h_152)

`Settings` -> `Code Style` -> `PHP` -> `Other` -> `Code Commenting` -> `Line comment at first column` 默认是打开的，需要将其关闭。

这是`PHPStorm 8`才有的功能。

## 操作

```
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

## 技巧 & Question

### 1. 为什么PhpStorm不建议在一个字符串变量的名称

为了不分散的实际字符串编辑，你必须按Ctrl + Space来调用代码完成：

![image.png](https://file.wulicode.com/yuque/202208/04/15/34554S8JwUQV.png?x-oss-process=image/resize,h_345)

### 2. 使用 JDBC 链接数据库

1. 下载 相关的 jdbc 包

![image.png](https://file.wulicode.com/yuque/202208/04/15/345543fis3j1.png?x-oss-process=image/resize,h_156)

2. 链接数据表写法  `jdbc:mysql://localhost/tablename`

### 3. 隐藏不想被搜到的缓存文件

由于项目采用的CI框架,目录结构分离得也比较清晰,加之项目前后台也规划分离得挺合理,所以在开发过程中完全可以在windows资源管理器下隐藏不相关的目录以及在IDE下排除之`( PhpStorm - File - Make Dicrectory As - Excluded )`
,这样可以在一定程度上减少干扰提高开发效率。如果想将Excluded的目录再Include到项目中可以在 `(File | Settings | Directories )`选择对应目录取消掉Excluded即可.

### 4. PyCharm 的侧边切换提交人的信息

![image.png](https://file.wulicode.com/yuque/202212/08/23/1436UvYKrnWC.png?x-oss-process=image/resize,h_149)

这里配置名称叫 `inlay hints`

