---
description: 'http-concat 用于合并HTTP请求。操作步骤：1. 下载并解压文件；2. 安装并配置；3. 开始使用。'
lastUpdated: '2026-06-17 14:10:26'
head:
  - - meta
    - name: 'og:title'
      content: 'http-concat 合并 Http 请求'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'http-concat 用于合并HTTP请求。操作步骤：1. 下载并解压文件；2. 安装并配置；3. 开始使用。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/http-concat.html'
---
# http-concat 合并 Http 请求

nginx-http-concat 是一个 Nginx 扩展模块，用来合并 HTTP 请求。

## 1. 下载

访问 [https://github.com/alibaba/nginx-http-concat/releases](https://github.com/alibaba/nginx-http-concat/releases) 官网下载最新的源包，如:

```Bash
# 下载 
wget https://github.com/alibaba/nginx-http-concat/archive/1.2.2.tar.gz

# 解压并记录解压后的目录
tar xzf 1.2.2.tar.gz
```

## 2. 安装

使用编译安装，在配置 `configure` 时添加参数:

```Plaintext
# 配置
./configure 其他编译参数 --add-module=/刚才解压的目录

# 安装
make
[sudo] make install
```

注意: 如果是重新编译安装时不要运行 `make install`，查看参数: Nginx 编译选项 如我的配置:

```Plaintext
./configure
    --...
    --add-module=/home/work/src/nginx-http-concat-1.2.2
```

> 如果有多个 --add-module 分别对应写上即可

## 3. 配置

使用 location 匹配到你想要匹配的路径，对其设置参数:

```Plaintext
server {
    location /static/css/ {
        concat on;
        concat_types text/css;
        concat_max_files 20;
    }
    location /static/js/ {
        concat on;
        concat_types application/javascript;
        concat_max_files 30;
    }
}
```

重启服务，如: `nginx -s reload` 。更新配置项点击: [https://github.com/alibaba/nginx-http-concat#module-directives](https://github.com/alibaba/nginx-http-concat#module-directives)

## 4. 使用

现在就可以通过 url 中的`??`来合并了，比如: `/static/css/??a.css,path/b.css` 。