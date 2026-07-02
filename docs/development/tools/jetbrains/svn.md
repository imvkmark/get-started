---
description: '在JetBrains系IDE中，使用SVN可能遇到E170013和E230001错误，提示服务器SSL证书验证失败。通常因证书过期、不受信任或未接受所致。可通过命令行执行`svn list`接受证书，或配置`servers`文件永久信任解决。'
lastUpdated: '2026-07-02 19:22:22'
head:
  - - meta
    - name: 'og:title'
      content: '在 Jetbrains 系 IDE 中使用 SVN'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在JetBrains系IDE中，使用SVN可能遇到E170013和E230001错误，提示服务器SSL证书验证失败。通常因证书过期、不受信任或未接受所致。可通过命令行执行`svn list`接受证书，或配置`servers`文件永久信任解决。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/tools/jetbrains/svn.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/b0da6ed7cf396019ecedf120fef1fce5.png'
---
# 在 Jetbrains 系 IDE 中使用 SVN

## 准备

机器上需要有 svn 命令行

## 操作

检出

![](https://file.wulicode.com/feishu-images/b0da6ed7cf396019ecedf120fef1fce5.png)

- 输入地址
- 输入密码等
- 等待
- 完成

![](https://file.wulicode.com/feishu-images/8552727f0dd6ca702b586139a8418ef8.png)

## 常见问题

### [转+] IDEA SVN报 E170013和E230001错误:Server SSL certificate verification

**问题描述：**

在IDEA的 `Version Control` 中，Incoming 下，右击 refresh 时，报出了以下错误：

> svn: E170013: Unable to connect to a repository at URL ‘https://……’ svn: E230001: Server SSL certificate verification failed: certificate has expired, certificate issued for a different hostname, issuer is not trusted

**解决方案：**

在电脑随便建立一个tmp文件夹，使用subversion工具，

```Plaintext
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

选择 `p` 永久接受 certificate，如果这个时候，可以正常下载代码，那么回到IDEA中，再次执行refresh，该错误就不会再有了

![](https://file.wulicode.com/feishu-images/30c7e8daf90582d5d4cc3cb678a16224.png)

这样就可以下载了

![](https://file.wulicode.com/feishu-images/40291989074bdae4251d8ebdc05e61ef.png)