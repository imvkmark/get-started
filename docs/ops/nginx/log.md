# Nginx 日志

## 日志切割

> logrotate 程序是一个日志文件管理工具。用于分割日志文件，删除旧的日志文件，并创建新的日志文件，起到“转储”作用

这里参考另一篇文章 [「转+」 运维中的日志切割](./../software/logrotate/introduction.md)

## 关闭 access log

在配置本地 nginx 开发环境时，发现一个问题，当 server 段不指定 access_log 时，并且 http 段中也未指定任何 access_log 参数时，它会默认写到`logs/access.log` 这个文件，也就是
access_log 默认值就是 `logs/access.log`，而且是所有 server 的访问日志。但 nginx 网站上我并未找到此配置的默认值。

如果我们不需要，在http段中加一行 access_log off; 然后在特定的 server 中配置自己想写入的日志。开发环境我默认不写日志，即不配置任何 access_log，需要时才打开。

nginx 的 http 段中，设置 access log：

```nginx
http{
  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';
    
  log_format gzip '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $bytes_sent "$http_referer" '
                  '"$http_user_agent" "$gzip_ratio"';
    
  log_format download '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $bytes_sent "$http_referer" "$http_user_agent" '
                      '"$http_range" "$sent_http_content_range"';
  access_log off;
}
```

## 静态资源

对于静态资源, 本地缓存 + 服务端变动验证, 并不对资源文件进行访问日志记录

```nginx
location ~* \.(jpg|gif|png|jpeg|bmp|svg|eot|woff|woff2|ico|js|css)$
{
    access_log off;
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

如果是反向代理的机器需要去掉 access_log 的记录, 则需要对静态资源进行设置和转发识别, 否则

- 如果是反向代理, 需要加入转发, 否则就会在本地目录查找
- 如果目标机器是根据主机头区分的, 需要添加主机头

```nginx
location ~* \.(jpg|gif|png|jpeg|bmp|svg|eot|woff|woff2|ico|js|css)$ {
    access_log off;
    add_header Cache-Control "public, max-age=0, must-revalidate";
    proxy_set_header Host $host;
    proxy_pass http://192.168.1.248:80;
}
```

## 使用 aliyun logtail 采集日志

文档地址: [Logtail简介](https://help.aliyun.com/document_detail/28979.html)

### 日志采集流程

![image.png](https://file.wulicode.com/yuque/202208/04/14/5034VDV0Sxfs.png)

### 安装 logtail

详细操作 : [安装方式](https://help.aliyun.com/document_detail/28982.html)

内网安装:

```bash
# 下载
$ wget http://logtail-release-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com/linux64/logtail.sh -O logtail.sh; chmod 755 logtail.sh
# 安装
$ ./logtail.sh install auto
# 升级
$ ./logtail.sh upgrade
# 启动
$ /etc/init.d/ilogtaild start
# 重启
$ /etc/init.d/ilogtaild restart
# 停止
$ /etc/init.d/ilogtaild stop
# 卸载
$ ./logtail.sh uninstall
```

相关目录

```
# 开发目录
/usr/local/ilogtail/

# 配置目录
/etc/ilogtail/
```

### 跨账号调用

![image.png](https://file.wulicode.com/yuque/202208/04/14/5034VLJY889n.png)

如果需要通过Logtail采集日志的服务器并非阿里云ECS，或非本账号购买的ECS时，需要在服务器上安装Logtail之后，配置主账号AliUid作为用户标识，证明这台服务器有权限被该账号访问、采集日志。否则在机器组中会显示服务器心跳失败，无法采集数据到日志服务。

**查看阿里云主账号ID。**

登录日志服务控制台。单击页面右上角的控制台图标，进入CloudShell（详细内容参考云命令行）。在页面下方的命令框中输入`echo $ALIBABA_CLOUD_ACCOUNT_ID`获取主账号ID。

查看主账号ID

![](https://file.wulicode.com/yuque/202208/04/14/50355x4KpLNt.jpg)

**创建主账号ID**

创建主账号ID同名文件到/etc/ilogtail/users目录，如目录不存在请手动创建目录。一台服务器上可以配置多个主账号ID，例如：

```
touch /etc/ilogtail/users/1**************
touch /etc/ilogtail/users/1**************
```

当不需要Logtail收集数据到该用户的日志服务Project后，可使用如下命令删除该用户标识：

```
rm /etc/ilogtail/users/1**************
```

## 备注

**2022年11月08日**

- 移除通过脚本来生成日志, 推荐使用 logrotate 处理日志

参考:

- [nginx不记录js、css、图片等资源文件的访问日志](https://www.rootop.org/pages/4727.html)

