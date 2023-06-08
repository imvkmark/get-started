# FAQ

## 在 shell 变量中获取网页的内容

::: info 原文地址
https://www.baeldung.com/linux/webpage-to-shell-variable
:::

**curl**

要让 cURL 跟随这些重定向链接，我们需要添加 `-L` 参数：

```shell
$ CONTENT=$(curl -L https://i.wulicode.com/op/file/centos-curl.sh)
$ echo $CONTENT
```

**wget**

可以获取 http, https, ftp, ftps 协议, 默认情况下，wget 会生成与下载过程相关的输出，并将结果保存到文件中

要修改此行为，我们可以使用：

- `-q`(`-quite`)参数隐藏下载状态输出
- `-O` 参数更改 wget 的输出
- `-` 表示标准输出

```shell
$ CONTENT=$(wget https://i.wulicode.com/op/file/centos-curl.sh -q -O -)
$ echo $CONTENT
```

因为 wget 与 curl 非常相似，所以让我们对它们进行简单的比较

wget 的优势：

- 递归下载
- 是一个更成熟的项目
- 默认情况下，它跟随重定向链接，而cURL不跟随, 需要增加 `-L` 参数

cURL 的优势

- CURL还支持FTPS、Gopher、SCP、SFTP、TFTP、Telnet和许多其他协议
- 有更多的SSL选项
- 它的速度略快，这在下载大页面时可能很重要
- 支持 `SOCKS`

