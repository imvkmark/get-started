---
description: 'Nginx location配置建议：直接匹配网站根加速首页访问，静态文件请求用目录或后缀匹配，动态请求转发到后端。Rewrite规则包含flag标志位、if指令与全局变量、常用正则及实例。'
lastUpdated: '2026-06-17 20:02:51'
head:
  - - meta
    - name: 'og:title'
      content: 'nginx 配置 location 总结及 rewrite 规则写法'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx location配置建议：直接匹配网站根加速首页访问，静态文件请求用目录或后缀匹配，动态请求转发到后端。Rewrite规则包含flag标志位、if指令与全局变量、常用正则及实例。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/http-rewrite-location.html'
---
# nginx 配置 location 总结及 rewrite 规则写法

::: info 🔗
原文地址 : [nginx配置 location及rewrite规则详解 - 听风。 - 博客园](https://www.cnblogs.com/huchong/p/9010307.html)
:::

## 1. location 正则写法

一个示例：

```Plaintext
location = / {
  # 精确匹配 / ，主机名后面不能带任何字符串
  [ configuration A ]
}

location / {
  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  # 但是正则和最长字符串会优先匹配
  [ configuration B ]
}

location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration C ]
}

location ~ /documents/Abc {
  # 匹配任何以 /documents/Abc 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration CC ]
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {
  # 匹配所有以 gif,jpg或jpeg 结尾的请求
  # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
  [ configuration E ]
}

location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ configuration F ]
}

location /images/abc {
  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  # F与G的放置顺序是没有关系的
  [ configuration G ]
}

location ~ /images/abc/ {
  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
    [ configuration H ]
}

location ~* /js/.*/\.js
```

- 以 `=` 开头表示精确匹配

如 A 中只匹配根目录结尾的请求，后面不能带任何字符串。

- `^~` 开头表示 uri 以某个常规字符串开头，不是正则匹配
- `~` 开头表示区分大小写的正则匹配;
- `~*` 开头表示不区分大小写的正则匹配
- `/` 通用匹配, 如果没有其它匹配,任何请求都会匹配到

顺序 no 优先级：

(location =) > (location 完整路径) > (location ^\~ 路径) > (location ,\* 正则顺序) > (location 部分起始路径) > (/)

上面的匹配结果

按照上面的 location 写法，以下的匹配示例成立：

- / -> config A

精确完全匹配，即使/index.html 也匹配不了

- /downloads/download.html -> config B

匹配 B 以后，往下没有任何匹配，采用 B

- /images/1.gif -> configuration D

匹配到 F，往下匹配到 D，停止往下

- /images/abc/def -> config D

最长匹配到 G，往下匹配 D，停止往下你可以看到 任何以/images/开头的都会匹配到 D 并停止，FG 写在这里是没有任何意义的，H 是永远轮不到的，这里只是为了说明匹配顺序

- /documents/document.html -> config C

匹配到 C，往下没有任何匹配，采用 C

- /documents/1.jpg -> configuration E

匹配到 C，往下正则匹配到 E

- /documents/Abc.jpg -> config CC

最长匹配到 C，往下正则顺序匹配到 CC，不会往下到 E

### 实际使用建议

所以实际使用中，个人觉得至少有三个匹配规则定义，如下：

```Plaintext
# 直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
# 这里是直接转发给后端应用服务器了，也可以是一个静态首页
# 第一个必选规则
location = / {
  proxy_pass http://tomcat:8080/index
}

# 第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
location ^~ /static/ {
  root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
  root /webroot/res/;
}

# 第三个规则就是通用规则，用来转发动态请求到后端应用服务器
# 非静态文件请求就默认是动态请求，自己根据实际把握
# 毕竟目前的一些框架的流行，带.php,.jsp后缀的情况很少了
location / {
  proxy_pass http://tomcat:8080/
}
```

[nginx平台初探(100%) — Nginx开发从入门到精通](http://tengine.taobao.org/book/chapter_02.html#id9)

[Module ngx_http_rewrite_module](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite)

## 2. Rewrite 规则

rewrite 功能就是，使用 nginx 提供的全局变量或自己设置的变量，结合正则表达式和标志位实现 url 重写以及重定向。rewrite 只能放在`server{}`, `location{}`, `if{}` 中，并且只能对域名后边的除去传递的参数外的字符串起作用，例如  `http://seanlook.com/a/we/index.php?id=1&u=str`  只对/a/we/index.php 重写。语法`rewrite regex replacement [flag];`

如果相对域名或参数字符串起作用，可以使用全局变量匹配，也可以使用 proxy_pass 反向代理。

表面看 `rewrite` 和 `location` 功能有点像，都能实现跳转，主要区别在于 rewrite 是在同一域名内更改获取资源的路径，而 location 是对一类路径做控制访问或反向代理，可以 `proxy_pass` 到其他机器。很多情况下 rewrite 也会写在 location 里，它们的执行顺序是：

1. 执行 server 块的 rewrite 指令
2. 执行 location 匹配
3. 执行选定的 location 中的 rewrite 指令

如果其中某步 URI 被重写，则重新循环执行 1-3，直到找到真实存在的文件；循环超过 10 次，则返回 500 Internal Server Error 错误。

### 2.1 flag 标志位

- `last` : 相当于 Apache 的[L]标记，表示完成 rewrite
- `break` : 停止执行当前虚拟主机的后续 rewrite 指令集
- `redirect` : 返回 302 临时重定向，地址栏会显示跳转后的地址
- `permanent` : 返回 301 永久重定向，地址栏会显示跳转后的地址

因为 301 和 302 不能简单的只返回状态码，还必须有重定向的 URL，这就是 return 指令无法返回 301,302 的原因了。这里 last 和 break 区别有点难以理解：

1. last 一般写在 server 和 if 中，而 break 一般使用在 location 中
2. last 不终止_重写后_的 url 匹配，即新的 url 会再从 server 走一遍匹配流程，而 break 终止重写后的匹配
3. break 和 last 都能组织继续执行后面的 rewrite 指令

### 2.2 if 指令与全局变量

**if 判断指令**

语法为`if(condition){...}`，对给定的条件 condition 进行判断。如果为真，大括号内的 rewrite 指令将被执行，if 条件(conditon)可以是如下任何内容：

- 当表达式只是一个变量时，如果值为空或任何以 0 开头的字符串都会当做 false
- 直接比较变量和内容时，使用`=`或`!=`
- `~`正则表达式匹配，`~*`不区分大小写的匹配，`!~`区分大小写的不匹配

`f`和`!-f`用来判断是否存在文件

`d`和`!-d`用来判断是否存在目录

`e`和`!-e`用来判断是否存在文件或目录

`x`和`!-x`用来判断文件是否可执行

例如：

```Plaintext
if ($http_user_agent ~ MSIE) {
  rewrite ^(.*)$ /msie/$1 break;
} 
//如果UA包含"MSIE"，rewrite请求到/msid/目录下

if ($http_cookie ~* "id=([^;]+)(?:;|$)") {
  set $id $1;
} 
//如果cookie匹配正则，设置变量$id等于正则引用部分

if ($request_method = POST) {
  return 405;
} 
//如果提交方法为POST，则返回状态405（Method not allowed）。return不能返回301,302

if ($slow) {
  limit_rate 10k;
} 
//限速，$slow可以通过 set 指令设置

if (!-f $request_filename){
  break;
  proxy_pass  http://127.0.0.1;
} 
//如果请求的文件名不存在，则反向代理到localhost 。这里的break也是停止rewrite检查

if ($args ~ post=140){
  rewrite ^ http://[example.com/](http://example.com/) permanent;
} 
// 如果query string中包含"post=140"，永久重定向到example.com

location ~* \.(gif|jpg|png|swf|flv)$ {
  valid_referers none blocked [www.jefflei.com](http://www.jefflei.com/) [www.leizhenfang.com](http://www.leizhenfang.com/);
  if ($invalid_referer) {
    return 404;
  } //防盗链
}
```

**全局变量**下面是可以用作 if 判断的全局变量

- `$args` ： #这个变量等于请求行中的参数，同`$query_string`
- `$content_length` ： 请求头中的 Content-length 字段。
- `$content_type` ： 请求头中的 Content-Type 字段。
- `$document_root` ： 当前请求在 root 指令中指定的值。
- `$host` ： 请求主机头字段，否则为服务器名称。
- `$http_user_agent` ： 客户端 agent 信息
- `$http_cookie` ： 客户端 cookie 信息
- `$limit_rate` ： 这个变量可以限制连接速率。
- `$request_method` ： 客户端请求的动作，通常为 GET 或 POST。
- `$remote_addr` ： 客户端的 IP 地址。
- `$remote_port` ： 客户端的端口。
- `$remote_user` ： 已经经过 Auth Basic Module 验证的用户名。
- `$request_filename` ： 当前请求的文件路径，由 root 或 alias 指令与 URI 请求生成。
- `$scheme` ： HTTP 方法（如 http，https）。
- `$server_protocol` ： 请求使用的协议，通常是 HTTP/1.0 或 HTTP/1.1。
- `$server_addr` ： 服务器地址，在完成一次系统调用后可以确定这个值。
- `$server_name` ： 服务器名称。
- `$server_port` ： 请求到达服务器的端口号。
- `$request_uri` ： 包含请求参数的原始 URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
- `$uri` ： 不带请求参数的当前 URI，\$uri 不包含主机名，如”/foo/bar.html”。
- `$document_uri` ： 与\$uri 相同。

例：`http://localhost:88/test1/test2/test.php`

```Plaintext
$host：localhost
$server_port：88
$request_uri：http://localhost:88/test1/test2/test.php
$document_uri：/test1/test2/test.php
$document_root：/var/www/html
$request_filename：/var/www/html/test1/test2/test.php
```

### 2.3 常用正则

- `.` ： 匹配除换行符以外的任意字符
- `?` ： 重复 0 次或 1 次
- `+` ： 重复 1 次或更多次
- `*` ： 重复 0 次或更多次
- `\d` ：匹配数字
- `^` ： 匹配字符串的开始
- `$` ： 匹配字符串的结束
- `{n}` ： 重复 n 次
- `{n,}` ： 重复 n 次或更多次
- `[c]` ： 匹配单个字符 c
- `[a-z]` ： 匹配 a-z 小写字母的任意一个

小括号`()`之间匹配的内容，可以在后面通过`$1`来引用，`$2`表示的是前面第二个`()`里的内容。正则里面容易让人困惑的是`\`转义特殊字符。

### 2.4 rewrite 实例

*例 1*：

```Plaintext
http {
    # 定义image日志格式
    log_format imagelog '[$time_local] ' $image_file ' ' $image_type ' ' $body_bytes_sent ' ' $status;
    # 开启重写日志
    rewrite_log on;
    server {
        root /home/www;
        location / {
            # 重写规则信息
            error_log logs/rewrite.log notice;
            # 注意这里要用‘’单引号引起来，避免{}
            rewrite '^/images/([a-z]{2})/([a-z0-9]{5})/(.*)\.(png|jpg|gif)' /data?file=$3.$4;
            # 注意不能在上面这条规则后面加上“last”参数，否则下面的set指令不会执行
            set $image_file $3;
            set $image_type $4;
        }
        location /data {
             # 指定针对图片的日志格式，来分析图片类型和大小
             access_log logs/images.log mian;
             root /data/images;
             # 应用前面定义的变量。判断首先文件在不在，不在再判断目录在不在，如果还不在就跳转到最后一个url里
             try_files /$arg_file /image404.html;
        }
        location = /image404.html {
            # 图片不存在返回特定的信息
            return 404 "image not found\n";
        }
    }
}
```

对形如`/images/ef/uh7b3/test.png`的请求，重写到`/data?file=test.png`，于是匹配到`location /data`，先看`/data/images/test.png`文件存不存在，如果存在则正常响应，如果不存在则重写 tryfiles 到新的 image404 location，直接返回 404 状态码。

*例 2*：

```Plaintext
rewrite ^/images/(.*)_(\d+)x(\d+)\.(png|jpg|gif)$ /resizer/$1.$4?width=$2&height=$3? last;
```

对形如`/images/bla_500x400.jpg`的文件请求，重写到`/resizer/bla.jpg?width=500&height=400`地址，并会继续尝试匹配 location。

**参考**

- [http://www.ttlsa.com/nginx/nginx-rewriting-rules-guide/](http://www.ttlsa.com/nginx/nginx-rewriting-rules-guide/)
- [http://fantefei.blog.51cto.com/2229719/919431](http://fantefei.blog.51cto.com/2229719/919431)