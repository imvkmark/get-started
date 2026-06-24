---
description: '本文介绍了Mac使用中的四个实用技巧：为软件或操作自定义快捷命令；在文件选择框中快速访问系统隐藏文件夹；录制屏幕并将视频转换为GIF文件；以及快速显示或恢复隐藏文件的方法。'
lastUpdated: '2026-06-21 20:19:00'
head:
  - - meta
    - name: 'og:title'
      content: 'Mac - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了Mac使用中的四个实用技巧：为软件或操作自定义快捷命令；在文件选择框中快速访问系统隐藏文件夹；录制屏幕并将视频转换为GIF文件；以及快速显示或恢复隐藏文件的方法。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/mac/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/e240e870ddb507938f9e4a6ace78df69.png'
---
# Mac - FAQ

### 给软件或者软件中的操作设置快捷命令

**使用 Raycast**

Raycast是一款macOS上的快速启动器应用，可通过以下方法添加快捷键：

- 打开Raycast设置界面。可按下 `Command + ,` ，或者点击 Raycast 图标后选择设置选项
- 进入“Extensions”（扩展）选项卡。在设置界面中找到“Extensions”标签，点击进入
- 选择要设置快捷键的命令或扩展。在“Extensions”界面中，找到你想要添加快捷键的具体命令或扩展程序。
- 记录快捷键。点击对应命令或扩展右侧的“Record Hotkey”（记录快捷键）按钮，然后按下你想要设置的快捷键组合。

![](https://file.wulicode.com/feishu-images/e240e870ddb507938f9e4a6ace78df69.png)

**使用 OpenInTerminal**

github 上有个 https://github.com/Ji4n1ng/OpenInTerminal 可以添加快捷键, 如果集合为一个工具首推 raycast

**使用 automator 添加打开文件服务「使用 VSCode 打开」**

参考如下文章:[使用 automator 添加打开文件服务「使用 VSCode 打开」 a3de4bbbddf743328ae52244036571fa](/ops/mac/use-automator-add-keymap.md)

### 如何在Mac中的文件选择框中打开系统隐藏文件夹

在弹出文件选择对话框时，按住 `Command + Shift + G` 这三个键，在弹出的对话框中输入你想去的地方吧，如：`~/.ssh` , 此方法同样适用于 `Finder`

![](https://file.wulicode.com/feishu-images/c32a92197080a0ceccb5c4116d93f5e2.png)

### Mac 录屏并转换为 gif 文件

1. 使用 quicktime player 录屏, 全屏快捷键是 `shift-command+5`
2. 使用 ffmpeg 转换为指定的格式

安装 ffmpeg

```Plaintext
brew install ffmpeg
```

转换图片到 gif

```Plaintext
ffmpeg -i luping.mov -r 15 luping.gif
```

### 快速显示、恢复隐藏文件

使用快捷键 `Cmd + Shift + .` 可以快速的切换文件夹内隐藏文件的可见性