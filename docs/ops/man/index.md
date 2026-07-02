---
description: 'Linux中`man`命令后跟的数字表示手册章节：1用户命令、2系统调用、3库函数、4设备文件、5文件格式、6游戏、7杂项、8系统管理命令、9内核例程。使用数字可精确查找对应类型的帮助文档。'
lastUpdated: '2026-07-02 12:31:38'
head:
  - - meta
    - name: 'og:title'
      content: 'Man'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Linux中`man`命令后跟的数字表示手册章节：1用户命令、2系统调用、3库函数、4设备文件、5文件格式、6游戏、7杂项、8系统管理命令、9内核例程。使用数字可精确查找对应类型的帮助文档。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/man/index.html'
---
# Man

> 初衷是建立一个完善的man 命令文库, 经过时间洗礼之后, 还是做一个安静的学习者, 补充他人的不足即可

## Linux man 命令后面的数字含义及作用

Linux 的 man 很强大，该手册分成很多 section，使用 man 时可以指定不同的 section 来浏览，各个 section 意义如下：

```Plain Text
1 - commands
    普通的命令
2 - system calls
    系统调用,如 open,write 之类的(通过这个，至少可以很方便的查到调用这个函数，需要加什么头文件)
3 - library calls
    库函数,如 printf,fread
4 - special files
    特殊文件,也就是/dev 下的各种设备文件
5 - file formats and convertions
    指文件的格式,比如 passwd, 就会说明这个文件中各个字段的含义
6 - games for linux
    给游戏留的,由各个游戏自己定义
7 - macro packages and conventions
    附件还有一些变量,比如向 environ 这种全局变量在这里就有说明
8 - system management commands
    系统管理用的命令,这些命令只能由 root 使用,如 ifconfig
9 - 其他
    其他命令
```

这里根据 [https://www.die.net/](https://www.die.net/) 进行 man 命令的区分有些文档也需要根据 [https://man7.org/index.html](https://man7.org/index.html) 来进行补充, 比如 [die.net](http://die.net) 不存在的命令

## 资料 :

- Web 版本 : [https://qq.wdev.cn/](https://qq.wdev.cn/)
- Dash : [https://github.com/jaywcjlove/linux-command/releases](https://github.com/jaywcjlove/linux-command/releases)
- Github : [https://github.com/jaywcjlove/linux-command](https://github.com/jaywcjlove/linux-command)
- Die : [https://www.die.net/](https://www.die.net/)

## 其他

[7z - 手册页部分 1： 用户命令 (](https://docs.oracle.com/cd/E56344_01/html/E54075/x-7z-1.html#scrolltoc)[oracle.com](https://docs.oracle.com/cd/E56344_01/html/E54075/x-7z-1.html#scrolltoc)[)](https://docs.oracle.com/cd/E56344_01/html/E54075/x-7z-1.html#scrolltoc)

## 示例

这里写简要描述如果有更多的描述写在这里

```Plaintext
# 语法, 根据实际显示长度换行
du [-abcDhHklmsSx] [-L <符号连接>][-X <文件>][--block-size][--exclude=<目录或文件>]
    [--max-depth=<目录层数>][--help][--version][目录或文件]
```

> 返回值: 如果有, 写在这里

### 选项 & 参数

**选项**

`-o`, `--option`

两个选项的写法

`--option <option>`

选项带有参数的说明

**参数**

### 实例 & 常用

```Plaintext
# 查看文件夹的大小
du -h --max-depth=1
```

### 扩展阅读

- Aliyun 盘挂载/扩容