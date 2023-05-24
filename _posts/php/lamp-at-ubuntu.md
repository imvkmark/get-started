---
title: "[WIP]Ubuntu 维护 LAMP"
date: 2022-04-14 22:12:15
toc: true
categories:
- ["Php","环境搭建"]
---

ubuntu 的 apache 维护命令



```
# 测试配置文件是否合规
sudo apachectl configtest

# 重启 
sudo systemctl restart apache2
```

## Url Rewrite(Url 重写)
php apache url rewrite 地址重写很简单，只用一个命令就搞定了，这个命令是：
```
# 启用
sudo a2enmod rewrite

# 禁用
sudo a2dismod rewrite
```

## 配置 ssl 证书
```
# 启用 ssl 模块
sudo a2enmod ssl
```
配置文件内容 , 参考 :  
```
<VirtualHost 0.0.0.0:443>
    DocumentRoot "/var/www/html" 
    #填写证书名称
    ServerName cloud.tencent.com 
    #启用 SSL 功能
    SSLEngine on 
    #证书文件的路径
    SSLCertificateFile /etc/httpd/ssl/cloud.tencent.com.crt 
    #私钥文件的路径
    SSLCertificateKeyFile /etc/httpd/ssl/cloud.tencent.com.key 
    #证书链文件的路径
    SSLCertificateChainFile /etc/httpd/ssl/root_bundle.crt 
</VirtualHost>
```

## 启用 CORS
```
# 启用模块
sudo a2enmod headers
```
```
<Directory /var/www/html>
   ...
   Header set Access-Control-Allow-Origin "*"
   ...
</Directory>
```

