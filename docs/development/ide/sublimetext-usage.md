---
title: "sublime text 使用简历"
date: 2022-04-14 22:15:10
toc: true
categories:
- ["开发","IDE"]
---

地址: [http://www.sublimetext.com/dev](http://www.sublimetext.com/dev)




## 插件

### 安装包控制(Sublime Package Control)
2.0
```
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
```
3.0
```
import urllib.request,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

### Alignment:整齐的码农
Preferences → Key Bindings - User
```
[
    { "keys": ["ctrl+alt+l"], "command": "alignment" }
]
```

### Emmet(previous zencoding):
tab : 补全

ctrl+alt+enter : 输入复杂表达式立刻补全,Emmet的控制面板

### DocBlockr : 文档说明立刻补全
/** : 回车补全

支持PHP, javascript

语法插件

- jQuery   : 选定语法可以直接提示
- less     : less
- conf     : Apache Config File

### sublimeLinter
语法提示工具

- PHP支持
```
Preferences->Package Settings -> SublimeLinter ->Settings - User
 {
   "sublimelinter_executable_map":
   {
      "php": "E:\\wamp\\bin\\php\\php5.3.10\\php.exe"
   }
}
```

- CSS && JS 支持

需要安装 Node.js

### Tag : 格式化HTML/XML文档(插件方式)

1. 右键选择 Auto-Format Tags On Document
2. 选中文本后使用 快捷键 [ctrl+alt+f]

格式化 HTML / XML (自带方式)

1.全选

2.edit->line->reindent

3.Preferences → Key Bindings - User
```
[
  { "keys": ["ctrl+alt+f"], "command": "reindent" , "args": {"single_line": false}}
]
```

### jsFormat : 格式化Javascript文档
```
[
  { "keys": ["ctrl+alt+shift+j"], "command": "js_format" }
]
```

### CssLisible : 格式化CSS文档
```
[
  { "keys": ["ctrl+alt+shift+c"], "command": "csslisible" }
]
```

### SideBarEnhancements : 附加右鍵選單功能
根据需求自行添加快捷方式
```
[
    { "keys": ["ctrl+t"], "command": "side_bar_new_file2" },
    { "keys": ["f2"], "command": "side_bar_rename" },
    { "keys": ["ctrl+alt+f"], "command": "side_bar_find_files_path_containing" }
]
```

### BufferScroll: 記住上次編輯位置

### Bracketeer:  標示{}、()、[]片段頭尾

### TrailingSpaces: 删除尾部空行
```
[
    { "keys": ["ctrl+shift+T"], "command": "delete_trailing_spaces" }
]
```

### Nettuts Fetch: 设置一些需要同步的文件列表，然后保存更新

### DetectSyntax : 根据后缀名来检测相应的语法

### PHP Snippet plugin : 输入"php-"的时候便会提示匹配的代码段

### Goto Doucumentation : 查询鼠标所在点的函数的帮助信息
快捷键 F1, 例如PHP文件将会跳转到的地址为: [http://us.php.net/lcfirst](http://us.php.net/lcfirst)
```
{ "keys": ["f1"], "command": "goto_documentation" }
```

### GBK Encode Support : GBK 编码支持

## 主题

### Theme - Soda: 安装soda主题
Preferences->Global Setting-User
```
"theme": "Soda Dark.sublime-theme"
```

### Theme - Flatland: 安装Flatland主题
```
{
    "theme": "Flatland Dark.sublime-theme",
    "color_scheme": "Packages/Theme - Flatland/Flatland Dark.tmTheme"
}
```

### Color-scheme - solarized: 很漂亮的一款主题哦
[http://ethanschoonover.com/solarized](http://ethanschoonover.com/solarized)

### Color-scheme -Flatland
[https://github.com/thinkpixellab/flatland/archive/master.zip](https://github.com/thinkpixellab/flatland/archive/master.zip)

## 配置
修正字体字号

File Settings – User
```
{ "font_size": 10.5 }
```

## 常用命令
```
命令面板:          shift + ctrl + P
即时的文件切换:     ctrl + P
     @:函数跳转    ctrl + R
     ::行跳转      ctrl + G
     #:搜索
多重选择:          ctrl+单击
     选择多行:Shift + ctrl+ L
     将选中词逐一加入选择:Control+ D
     将选中词全选:Alt+F3
     垂直选择 : 鼠标中键
                 
ctrl+`                     命令行
Ctrl+L                     选择整行（按住L继续选择下行） 
Ctrl+KK                    从光标处删除至行尾 
Ctrl+K Backspace           从光标处删除至行首 
Ctrl+Shift+K(ctrl+X)       删除整行
Ctrl+Shift+D               复制光标所在整行，插入在该行之前 
Ctrl+J                     合并行（已选择需要合并的多行时） 
Ctrl+KU                    改为大写 
Ctrl+KL                    改为小写 
Ctrl+D                     选词 （按住-继续选择下个相同的字符串)
Ctrl+G                     行跳转
Ctrl+M                     光标移动至括号内开始或结束的位置
Ctrl+Shift+M               选择括号内的内容（按住-继续选择父括号） 
Ctrl+/                     注释整行（如已选择内容，同“Ctrl+Shift+/”效果） 
Ctrl+Shift+/               注释已选择内容
Ctrl+alt+Space(已修改)      自动完成（win与系统快捷键冲突，需修改为自定义） 
Ctrl+Z                     撤销 
Ctrl+Y                     恢复撤销 
Ctrl+Shift+V               粘贴并自动缩进 
Alt+.                      闭合当前标签 
Ctrl+Shift+A               选择光标位置父标签对
Ctrl+Shift+[               折叠代码 
Ctrl+Shift+]               展开代码 
Ctrl+KT                    折叠属性 
Ctrl+K0                    展开所有 
Ctrl+U                     软撤销 
Ctrl+T                     词互换 
Tab                        缩进 
Shift+Tab                  去除缩进
Ctrl+Shift+UP              与上行互换 
Ctrl+Shift+DOWN            与下行互换 
Ctrl+Enter                 插入行后
Ctrl+Shift+Enter           插入行前 F9行排序（按a-z）
```

