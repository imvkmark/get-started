---
title: "CentOS httpd 分析"
date: 2021-06-26 10:30:44
toc: true
categories:
- ["Ops","CentOS"]
---

### httpd 文件目录结构

已经安装完成的使用 `whereis` 确定的 httpd 的位置


```
/usr/sbin/httpd     # 执行bin 文件
/usr/lib64/httpd    # apache 安装的模块文件的目录
/etc/httpd          # 配置文件目录
/usr/share/httpd    # 默认的 apache 指向目录
/usr/share/man/man8/httpd.8.gz  # 文档
```


### 配置文件目录

```
/etc/httpd  # 配置根目录
    /conf
        httpd.conf    # 配置文件
        magic
    /conf.d           # vhosts 配置文件目录, httpd 附属的一些配置
    /conf.modules.d   # 加载一些需要的系统模块
        00-base.conf
        00-dav.conf
        00-lua.conf
        00-mpm.conf
        00-proxy.conf
        00-systemd.conf
        01-cgi.conf
        10-php.conf
    logs => /var/log/httpd
    modules => /usr/lib64/httpd
    run -> /run/httpd
```

