---
description: '机器上需要有 svn 命令行检出输入地址输入密码等等待.完成问题描述：在IDEA的 Version Control 中，Incoming 下，右击 refresh 时，报出了以下错误：解决方案：在电脑随便建立一个tmp文件夹，使用subversion工具，选择 p 永久接受 certificate，如果这个时候，可以正常下载代码，那么回到IDEA中，再次执行refresh，该错误就不会再有了这样就可以下载了'
lastUpdated: '2023-12-19 23:45:00'
head: 
  - - meta
    - name: 'og:title'
      content: '在 Jetbrains 系 IDE 中使用 SVN'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '机器上需要有 svn 命令行检出输入地址输入密码等等待.完成问题描述：在IDEA的 Version Control 中，Incoming 下，右击 refresh 时，报出了以下错误：解决方案：在电脑随便建立一个tmp文件夹，使用subversion工具，选择 p 永久接受 certificate，如果这个时候，可以正常下载代码，那么回到IDEA中，再次执行refresh，该错误就不会再有了这样就可以下载了'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/ide/jetbrains-use-svn.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/5f/5fff80caa0846ed0266eca795006ca2c.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 在 Jetbrains 系 IDE 中使用 SVN



## 准备

机器上需要有 svn 命令行

## 操作

检出

![](https://file.wulicode.com/notion/5f/5fff80caa0846ed0266eca795006ca2c.png)

输入地址

输入密码等

等待.

完成

![](https://file.wulicode.com/notion/a1/a183c3d0a974195bf581c61f858364cd.png)

## 常见问题

### [转+] IDEA SVN报 E170013和E230001错误:Server SSL certificate verification

**问题描述：**

在IDEA的  `Version Control`  中，Incoming 下，右击 refresh 时，报出了以下错误：

> svn: E170013: Unable to connect to a repository at URL ‘https://……’ svn: E230001: Server SSL certificate verification failed: certificate has expired, certificate issued for a different hostname, issuer is not trusted

**解决方案：**

在电脑随便建立一个tmp文件夹，使用subversion工具，

```
$ svn checkout https://{ip}/svn/{project}/
验证“https://{ip}”的服务器证书时出错:
 - 此证书并不是由信任的权威机权颁发。请使用此指纹手工验证其有效性！
 - 证书的主机名称不匹配。
证书信息:
 - 主机名称: AY131119112450Z
 - 有效时间: 自 Dec 26 12:32:33 2014 GMT 至 Dec 23 12:32:33 2024 GMT
 - 发行者: AY131119112450Z
 - 指纹: BD:77:32:85:6C:D4:31:E1:58:A6:57:41:7A:98:EB:F7:C3:2F:70:59
(R)拒绝，(t)暂时接受，或(p)永远接受？p
```

选择  `p`  永久接受 certificate，如果这个时候，可以正常下载代码，那么回到IDEA中，再次执行refresh，该错误就不会再有了

![](https://file.wulicode.com/notion/f5/f5d0590edd775bcc53720325094ca3b7.png)

这样就可以下载了

![](https://file.wulicode.com/notion/29/2970fa98a564fbe02c09303766024cf8.png)

## 参考 :



