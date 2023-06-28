# 设置代理

::: info

设置命令行的时候建议设置 socks5 代理, 因为 https 代理可能是走不通 http proxy 方法的

:::

## mac 命令行

```
$ sudo networksetup -setwebproxy “Ethernet” http://127.0.0.1 10000
```

**临时设置**

```
export http_proxy=http://proxyAddress:port
```

**永久设置**

把代理服务器地址写入 shell 配置文件 `.bashrc` 或者 `.zshrc`

直接在 `.bashrc` 或者 `.zshrc` 添加下面内容

```bash
export http_proxy="http://localhost:port"
export https_proxy="http://localhost:port"
```

保存文件，在终端中执行 `source ~/.bashrc`, 或者退出当前终端再起一个终端。

> 这个办法的好处是把代理服务器永久保存
>

不好处是所有的请求都走代理了, 包含你设置的镜像加速的地址, 如果有的话

**可切换设置**

把以下的文本放置到 `.bashrc` 或者 `.zshrc` 中, 可以在使用的时候执行 `proxy`, 不使用的时候执行 `unproxy`

```
alias proxy='export all_proxy=socks5://127.0.0.1:10000'
alias unproxy='unset all_proxy'
```

## windows 命令行

```
$ set http_proxy=http://127.0.0.1:10000
// 如果有要求用户名密码则输入:
$ set http_proxy_user=
$ set http_proxy_pass=
```

若不想每次都手动设置, 则可以设置到系统的环境变量中右击`计算机–>属性–>高级–>环境变量–>系统变量`，设置系统变量

## git

设置:

```
$ git config --global http.proxy http://127.0.0.1:10000
```

取消:

```
$ git config --global --unset http.proxy
```

## npm

设置:

```
$ npm config set proxy=http://127.0.0.1:10000
```

取消:

```
$ npm config delete proxy
```

## bower

设置: 修改 `.bowerrc` 文件(如无则新增)

```
{
    "proxy": "http://127.0.0.1:10000",
    "https-proxy": "http://127.0.0.1:10000"
}
```

取消:删除 .bowerrc 里对应的配置即可

## gem

比如我们要安装 sass设置:安装时加上 –http-proxy 参数

```
$ gem install –http-proxy http://127.0.0.1:10000 sass
```

取消:安装时不加上 –http-proxy 参数

```bash
gem install sass
```

## curl 代理

```
# 打开终端
$ cd ~/
# 查看当前目录
$ ls -al
# 是否有 .curlrc 文件, 如果没有,新建一个吧
$ touch .curlrc
```

编辑它,写入下面内容.如果已经存在这个文件的话,直接编辑.HTTP 代理

```
proxy=ip:port
```

## wget

需要在当前用户的目录下创建一个 `.wgetrc` 文件

```
#  ~/.wgetrc

http-proxy = 10.1.18.34:3128
ftp-proxy = 10.1.18.34:3128
```

分别表示http的代理服务器和ftp的代理服务器。如果代理服务器需要密码则使用：

```
--proxy-user=USER    # 设置代理用户
--proxy-passwd=PASS  # 设置代理密码
```

这两个参数。
使用参数 `--proxy=on/off`  使用或者关闭代理

## yum

```
# /etc/yum.conf

proxy=http://10.1.18.34:3128/
```

因为我测试的代理没有要求密码验证，如果要求没有输入用户名和密码.