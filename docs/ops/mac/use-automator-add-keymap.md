---
description: '使用Automator创建一项服务，使文件可以通过右键菜单直接使用VSCode打开，操作包括添加“打开文件”动作并选择VSCode作为目标应用，从而优化文件编辑流程。'
lastUpdated: '2026-06-21 20:18:45'
head:
  - - meta
    - name: 'og:title'
      content: '使用 automator 添加打开文件服务「使用 VSCode 打开」'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用Automator创建一项服务，使文件可以通过右键菜单直接使用VSCode打开，操作包括添加“打开文件”动作并选择VSCode作为目标应用，从而优化文件编辑流程。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/mac/use-automator-add-keymap.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/d82f707790e2c2e361fafc61cea95e20.png'
---
# 使用 automator 添加打开文件服务「使用 VSCode 打开」

最终的实现效果是在文件 / 文件夹上点击扩展按钮，会出现服务项中出现「用 VSCode 打开」, 同时也可以使用设定的快捷键来更快的使用 VsCode 打开, 我这里设置的快捷键是 `Control-Option-V`

![](https://file.wulicode.com/feishu-images/d82f707790e2c2e361fafc61cea95e20.png)

## 添加

打开「自动操作.app」，就是小机器人图标

![](https://file.wulicode.com/feishu-images/e92702cbac8561839c2eac30c4a14286.png)

`command + n` 新建文稿，在「选取文稿类型」里选择「快速操作」；

按以下步骤操作：

![](https://file.wulicode.com/feishu-images/d7e77077104ee364fd227a7ce3a36c47.png)

脚本内容如下

```Bash
for f in "$@"
do
    open -a "Visual Studio Code" "$f"
done
```

这个工具也支持 `Cursor` , 如下

```Bash
for f in "$@"
do
    open -a "Cursor" "$f"
done
```

以上代码片段的意思是对于传入的一个或多个参数，都使用 Visual Studio Code 这个 APP 打开

`command + s` 保存为 「用 VSCode 打开」

好了, 现在在文件夹中选择扩展便可以看到这个菜单了, 如本文首图所示, 同样也可以选中文件夹或者文件, 选用快速操作

![](https://file.wulicode.com/feishu-images/b2d7f1f7a9ef2cde5ac31629c9bdcf87.png)

为了方便我们打开键盘快捷键找到这个服务, 我们为其设置上快捷键

![](https://file.wulicode.com/feishu-images/46798832054045b4eba4f2d8983173c3.png)

便可以在选中文件夹后使用快捷键来直接打开文件了, 更减少了一步操作, 为我们的编码步骤扫清了一个鼠标的移动障碍

## 编辑

以后如果想修改上面这个快速操作：

可以打开这个文件 `文件` → `打开` → `个人目录 / 资源库 / Services` , 用来编辑或者删除

![](https://file.wulicode.com/feishu-images/31fe4b85aad1ca1ebd9fecab92011509.png)

## 优化

## 参考

- [给 Mac 添加右键菜单「使用 VSCode 打开」](https://mazhuang.org/2020/10/28/add-vscode-to-right-click/)