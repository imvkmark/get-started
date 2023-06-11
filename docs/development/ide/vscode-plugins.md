---
title : ""
date : 2022-04-20 18:58:29
toc : true
categories :
  - [ "开发","IDE","vscode" ]
---

# VSCode 常用插件

## 存储图片到 Aliyun(推荐)

安装插件 [Paste To Aliyun Oss](https://marketplace.visualstudio.com/items?itemName=duoli.paste-ali-oss)

安装之后可以使用 `ctrl + cmd + v` 来将图片直接粘贴到阿里云并把地址复制到 vscode 中

![](https://file.wulicode.com/static/paste-ali-oss/save-to.gif#id=fEPsW&originHeight=360&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 本地图片粘贴 [Paste Image]

安装插件 [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image)

安装之后可以使用 `alt + cmd + v` 来将图片直接粘贴到编辑器中,

直接粘贴的图片默认位置和命名并不符合我们的要求, 所以需要重新进行配置

配置日期的参考文档: [Moment 格式](https://momentjs.com/docs/#/displaying/format/)

```json
{
    "settings": {
        "pasteImage.basePath": "${projectRoot}",
        "pasteImage.defaultName": "Y/MMDD/HHmmss",
        "pasteImage.prefix": ".. image:: /",
        "pasteImage.path": "${projectRoot}/_static/images/",
        "pasteImage.encodePath": "none"
    }
}
```

这样我们粘贴图片的之后就可以直接将文件粘贴到

`/_static/images/2020/0131/191053.png` 类似目录下

## 设置为中文语言

1). 查找是否安装中文插件

![](https://file.wulicode.com/note/2021/10-23/15-25-09834.png#id=qhHIj&originHeight=304&originWidth=609&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

2). 设置选择中文语言

打开 `View -> Command Palette` 搜索 `Configure Display Language`, 选择 `zh-cn`

![](https://file.wulicode.com/note/2021/10-23/15-25-20940.png#id=d198D&originHeight=497&originWidth=985&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

3. 重启, 这样显示便是中文了

![](https://file.wulicode.com/note/2021/10-23/15-25-30935.png#id=iUvZ5&originHeight=419&originWidth=620&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### code runner

支持 Node.js, Python, C++, Java, PHP, Perl, Ruby, Go 等超过40种的语言的运行。

github 地址 : [code runner](https://github.com/formulahendry/vscode-code-runner)

使用简介: [[VSCode插件推荐] Code Runner: 代码一键运行，支持超过40种语言](https://zhuanlan.zhihu.com/p/54861567)

### 语法检测

**shellcheck**

可以帮助你提前发现并修复简单的语法错误，节约时间。可以针对你当前不够完善不够健壮的写法，提供建议，帮助你提前绕开一些坑，避免等问题真的发生了才去调试处理。

### 无法识别通过yarn 安装的 jshint

将 `jshint.packageManager` 配置设置为 yarn

### 设置为自动换行

方法如下：

文件 -> 首选项 -> 设置

如果你是Mac则是右上角

Code -> 首选项 -> 设置

然后在右侧的编辑窗口中添加：

```
"editor.wordWrap": "on"
```

