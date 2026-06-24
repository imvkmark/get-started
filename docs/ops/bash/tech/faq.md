---
description: '解决方案, 进入 root 用户在末尾加上运行 source ~/.bashrc , 问题解决参考地址 :通过 cip.cc获取当前的 ip 信息curl要让 cURL 跟随这些重定向链接，我们需要添加 -L 参数：wget可以获取 http, https, ftp, ftps 协议, 默认情况下，wget 会生成与下载过程相关的输出，并将结果保存到文件中要修改此行为，我们可以使用：因为 wget 与 curl 非常相似，所以让我们对它们进行简单的比较wget 的优势：cURL 的优势'
lastUpdated: '2023-12-21 15:45:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Shell - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '解决方案, 进入 root 用户在末尾加上运行 source ~/.bashrc , 问题解决参考地址 :通过 cip.cc获取当前的 ip 信息curl要让 cURL 跟随这些重定向链接，我们需要添加 -L 参数：wget可以获取 http, https, ftp, ftps 协议, 默认情况下，wget 会生成与下载过程相关的输出，并将结果保存到文件中要修改此行为，我们可以使用：因为 wget 与 curl 非常相似，所以让我们对它们进行简单的比较wget 的优势：cURL 的优势'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/bash/tech/faq.html'
---
# Shell - FAQ



## 使用 root用户运行出现 __bp_precmd_invoke_cmd ..

```
bash: __bp_precmd_invoke_cmd: command not found
bash: __bp_interactive_mode: command not found
```

解决方案, 进入 root 用户

```
$ vim ~/.bashrc
```

在末尾加上

```
unset PROMPT_COMMAND
```

运行  `source ~/.bashrc`  , 问题解决

参考地址 :

🔗 https://superuser.com/questions/1007647/bash-how-to-remove-bp-precmd-invoke-cmd-error

## 如何获取到当前的IP

```shell
echo $(curl -fsSL ifconfig.me)
```

通过 cip.cc

```shell
ipDetail=$(curl -L cip.cc)
echo ${ipDetail#*cc/}
```

获取当前的 ip 信息

```shell
$ curl myip.ipip.net
当前 IP：58.-.-.66  来自于：中国 山东 -- 电信
```

## 在 shell 变量中获取网页的内容

::: info  <img src="https://file.wulicode.com/notion/ec/ec802fa7d93ebc398c071f94e1c5dbd9.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  原文地址<br />
[Get the Contents of a Web Page in a Shell Variable](https://www.baeldung.com/linux/webpage-to-shell-variable)

:::

**curl**

要让 cURL 跟随这些重定向链接，我们需要添加  `-L`  参数：

```shell
$ CONTENT=$(curl -L https://i.wulicode.com/op/file/centos-curl.sh)
$ echo $CONTENT
```

**wget**

可以获取 http, https, ftp, ftps 协议, 默认情况下，wget 会生成与下载过程相关的输出，并将结果保存到文件中

要修改此行为，我们可以使用：

-  `q` ( `quite` )参数隐藏下载状态输出
-  `O`  参数更改 wget 的输出
-  ``  表示标准输出

```shell
$ CONTENT=$(wget https://i.wulicode.com/op/file/centos-curl.sh -q -O -)
$ echo $CONTENT
```

因为 wget 与 curl 非常相似，所以让我们对它们进行简单的比较

wget 的优势：

- 递归下载
- 是一个更成熟的项目
- 默认情况下，它跟随重定向链接，而cURL不跟随, 需要增加  `L`  参数

cURL 的优势

- CURL还支持FTPS、Gopher、SCP、SFTP、TFTP、Telnet和许多其他协议
- 有更多的SSL选项
- 它的速度略快，这在下载大页面时可能很重要
- 支持  `SOCKS` 

