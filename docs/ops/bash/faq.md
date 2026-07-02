---
description: '在root用户下任何命令都报错bash: bpprecmdinvokecmd和bpinteractivemode: command not found。解决方法：编辑.bashrc文件，末尾添加`unset PROMPT_COMMAND`，保存后执行`source /.bashrc`即可。'
lastUpdated: '2026-07-02 09:32:28'
head:
  - - meta
    - name: 'og:title'
      content: 'Bash - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在root用户下任何命令都报错bash: bpprecmdinvokecmd和bpinteractivemode: command not found。解决方法：编辑.bashrc文件，末尾添加`unset PROMPT_COMMAND`，保存后执行`source /.bashrc`即可。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/bash/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/679cb909f08b23d04214baf8969b5f91.png'
---
# Bash - FAQ

### 解决 : bash: \_\_bp_precmd_invoke_cmd: command not found bash

[bash how to remove "\_\_bp_precmd_invoke_cmd" error?](https://superuser.com/questions/1007647/bash-how-to-remove-bp-precmd-invoke-cmd-error)

今天在登录上服务器之后在 root 用户下无论输入什么命令均会提示

```Plaintext
bash: __bp_precmd_invoke_cmd: command not found
bash: __bp_interactive_mode: command not found
```

解决方法:

编辑 `.bashrc` , 在行尾添加

```Bash
unset PROMPT_COMMAND
```

保存之后, 激活 `.bashrc`

```Bash
source ~/.bashrc
```

然后问题就解决了

### shell 脚本中 echo 显示内容带颜色

::: info ℹ️

原文地址 : <a href="https://www.cnblogs.com/lr-ting/archive/2013/02/28/2936792.html">shell脚本中echo显示内容带颜色</a>

:::

> 改动内容: 格式

shell 脚本中 echo 显示内容带颜色显示需要使用参数 `-e` 格式如下：

```Plain Text
echo -e "\033[字背景颜色;文字颜色m字符串\033[0m"
```

例如：

```Plain Text
echo -e "\033[41;36m something here \033[0m"
```

![](https://file.wulicode.com/feishu-images/679cb909f08b23d04214baf8969b5f91.png)

其中 `41` 的位置代表底色， `36` 的位置是代表字的颜色

注：

1、字背景颜色和文字颜色之间是英文的 `[`

2、文字颜色后面有个m

3、字符串前后可以没有空格，如果有的话，输出也是同样有空格 下面是相应的字和背景颜色，可以自己来尝试找出不同颜色搭配

例

```Plain Text
echo -e "\033[31m 红色字 \033[0m"
echo -e "\033[33m 黄色字 \033[0m"
echo -e "\033[41;33m 红底黄字 \033[0m"
echo -e "\033[41;37m 红底白字 \033[0m"
```

![](https://file.wulicode.com/feishu-images/32795cb64dd378fa64d4109bbfda15c9.png)

字颜色：30—–37

```Plain Text
echo -e "\033[30m 黑色字 \033[0m"
echo -e "\033[31m 红色字 \033[0m"
echo -e "\033[32m 绿色字 \033[0m"
echo -e "\033[33m 黄色字 \033[0m"
echo -e "\033[34m 蓝色字 \033[0m"
echo -e "\033[35m 紫色字 \033[0m"
echo -e "\033[36m 天蓝字 \033[0m"
echo -e "\033[37m 白色字 \033[0m"
```

![](https://file.wulicode.com/feishu-images/1929a4b76caeb55aa8e6425f9036885c.png)

字背景颜色范围：40—–47

```Plain Text
echo -e "\033[40;37m 黑底白字 \033[0m"
echo -e "\033[41;37m 红底白字 \033[0m"
echo -e "\033[42;37m 绿底白字 \033[0m"
echo -e "\033[43;37m 黄底白字 \033[0m"
echo -e "\033[44;37m 蓝底白字 \033[0m"
echo -e "\033[45;37m 紫底白字 \033[0m"
echo -e "\033[46;37m 天蓝底白字 \033[0m"
echo -e "\033[47;30m 白底黑字 \033[0m"
```

![](https://file.wulicode.com/feishu-images/b4da6b15d50c4c2aa7ffaf0512cb8fea.png)

最后面控制选项说明

```Plain Text
\33[0m 关闭所有属性
\33[1m 设置高亮度
\33[4m 下划线
\33[5m 闪烁
\33[7m 反显
\33[8m 消隐
\33[30m — \33[37m 设置前景色
\33[40m — \33[47m 设置背景色
\33[nA 光标上移n行
\33[nB 光标下移n行
\33[nC 光标右移n行
\33[nD 光标左移n行
\33[y;xH设置光标位置
\33[2J 清屏
\33[K 清除从光标到行尾的内容
\33[s 保存光标位置
\33[u 恢复光标位置
\33[?25l 隐藏光标
\33[?25h 显示光标
```

### 如何获取到当前的IP

```Bash
echo $(curl -fsSL ifconfig.me)
```

通过 [cip.cc](http://cip.cc)

```Bash
ipDetail=$(curl -L cip.cc)
echo ${ipDetail#*cc/}
```

获取当前的 ip 信息

```Bash
$ curl myip.ipip.net
当前 IP：58.-.-.66  来自于：中国 山东 -- 电信
```

### 在 shell 变量中获取网页的内容

::: info ℹ️

原文地址  
<a href="https://www.baeldung.com/linux/webpage-to-shell-variable">Get the Contents of a Web Page in a Shell Variable</a>

:::

**curl**

要让 cURL 跟随这些重定向链接，我们需要添加 `-L` 参数：

```Bash
$ CONTENT=$(curl -L https://i.wulicode.com/op/file/centos-curl.sh)
$ echo $CONTENT
```

**wget**

可以获取 http, https, ftp, ftps 协议, 默认情况下，wget 会生成与下载过程相关的输出，并将结果保存到文件中

要修改此行为，我们可以使用：

- `q`(`quite`)参数隐藏下载状态输出
- `O` 参数更改 wget 的输出
- 表示标准输出

```Bash
$ CONTENT=$(wget https://i.wulicode.com/op/file/centos-curl.sh -q -O -)
$ echo $CONTENT
```

因为 wget 与 curl 非常相似，所以让我们对它们进行简单的比较

wget 的优势：

- 递归下载
- 是一个更成熟的项目
- 默认情况下，它跟随重定向链接，而cURL不跟随, 需要增加 `L` 参数

cURL 的优势

- CURL还支持FTPS、Gopher、SCP、SFTP、TFTP、Telnet和许多其他协议
- 有更多的SSL选项
- 它的速度略快，这在下载大页面时可能很重要
- 支持 `SOCKS`