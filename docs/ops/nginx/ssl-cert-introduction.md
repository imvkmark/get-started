---
description: 'SSL（安全套接层）及后继TLS协议通过数字证书实现网络通信加密。证书由CA（证书认证机构）签发，流程包括生成CSR、CA验证身份后签发。根证书的信任策略基于操作系统或浏览器预装，定期更新以保安全。SSL面临中间人攻击、证书伪造等认证问题，应对措施包括证书透明度、公钥固定及有效期缩短。'
lastUpdated: '2026-06-18 06:59:18'
head:
  - - meta
    - name: 'og:title'
      content: '全面了解 SSL 证书'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SSL（安全套接层）及后继TLS协议通过数字证书实现网络通信加密。证书由CA（证书认证机构）签发，流程包括生成CSR、CA验证身份后签发。根证书的信任策略基于操作系统或浏览器预装，定期更新以保安全。SSL面临中间人攻击、证书伪造等认证问题，应对措施包括证书透明度、公钥固定及有效期缩短。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/ssl-cert-introduction.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/467dd0c7601146d80f76849a73d208d6.png'
---
# 全面了解 SSL 证书

SSL/TLS 协议是互联网安全的核心，但在使用过程中仍面临认证问题。通过选择可靠的 CA、定期更新证书以及合理配置安全策略，可以有效提升网站的安全性，同时为用户提供更可信赖的访问体验

## SSL 是什么以及发展进程

### 什么是 SSL

SSL (Secure Sockets Layer) 是一种用于保护互联网通信的加密协议，主要用于确保数据在客户端和服务器之间传输时的安全性。它通过加密机制防止信息被中途截获或篡改，并通过认证机制验证服务器身份，防止钓鱼攻击

网络中明文传输敏感数据（银行数据、交易信息、密码信息等）是非常危险的，这对网络通信的安全性提出了更高的要求，SSL目的是提供通信安全及数据完整性保障。传统的万维网协议HTTP（Hypertext Transfer Protocol ）不具备安全机制，采用明文形式传输数据，不能验证通信双方的身份，无法防止传输的数据被篡改，安全性很低

![](https://file.wulicode.com/feishu-images/467dd0c7601146d80f76849a73d208d6.png)

![](https://file.wulicode.com/feishu-images/3f0ae44decbb8d5584982e8f11a082b0.png)

### 发展历程

![](https://file.wulicode.com/feishu-images/a6b7bb3a1eb4f4f3bace6c8ec7f97d33.png)

- 1995年：Netscape 公司推出了 SSL 2.0，这是首个公开使用的 SSL 协议版本，但很快被发现存在安全漏洞。
- 1996年：SSL 3.0 发布，大幅改进了协议的安全性，为后续版本打下了基础。
- 1999年：IETF（互联网工程任务组）将 SSL 3.0 标准化为 TLS（Transport Layer Security）1.0，正式接替 SSL 协议。
- TLS 1.1（2006年）：加强对加密算法的支持。
- TLS 1.2（2008年）：改进加密性能和安全性，是目前最广泛使用的版本。
- TLS 1.3（2018年）：显著提升安全性和性能，移除了不安全的加密算法。

尽管 SSL 已被 TLS 取代，但很多场景中仍沿用“SSL”作为通俗叫法。

### 如何工作

SSL 的原理是确保用户和网站之间或两个系统之间传输的任何数据始终无法被读取。它使用加密算法对传输中的数据进行加密，从而防止黑客读取通过连接发送的数据。该数据包括潜在的敏感信息

![](https://file.wulicode.com/feishu-images/a20d9c181181b027d2df0802cab8f1f4.png)

过程如下所示

1. 浏览器或服务器尝试连接到使用 SSL 保护的 Web 服务器。SSL客户端发送消息给SSL服务器启动握手，携带它支持的 SSL 版本、加密套件和客户端的随机数 **Client random** 等信息
2. 浏览器或服务器请求 Web 服务器证明自己的身份。SSL服务器响应SSL客户端，携带选定的版本、加密套件和服务器的随机数 **Server random** 等信息
3. 作为响应，Web 服务器向浏览器或服务器发送它的 SSL 证书的副本。SSL服务器将携带自己公钥信息的数字证书发送给SSL客户端，以便客户端对服务器进行身份认证
4. SSL服务器通知SSL客户端版本和加密套件协商结束，开始进行密钥交换
5. 浏览器或服务器检查以了解是否信任 SSL 证书。如果信任，它将向 Web 服务器发出信号。利用证书中的公钥加密SSL客户端随机生成的密钥发给SSL服务器。实际上，这个随机生成的密钥不能直接用来加密数据或计算MAC值，该密钥是用来计算对称密钥和MAC密钥的信息，称为premaster secret。SSL客户端和SSL服务器使用client random，server random 和 premaster secret，并通过相同的算法生成相同的主密钥（master secret），再利用master secret生成用于对称密钥算法、MAC算法的密钥
6. SSL客户端通知SSL服务器后续报文将采用协商好的密钥（利用master secret生成的密钥）和加密套件进行加密和MAC计算
7. SSL客户端通知SSL服务器，让服务器验证握手过程的安全
8. SSL服务器通知SSL客户端后续报文将采用协商好的密钥（利用master secret生成的密钥）和加密套件进行加密和MAC计算
9. SSL服务器通知SSL客户端，让客户端验证握手过程的安全
10. 然后，Web 服务器返回经过数字签名的确认，以启动 SSL 加密会话。
11. 加密数据在浏览器或服务器与 Web 服务器之间共享。

此过程有时称为“SSL 握手”, 实际发生在几毫秒之间

要查看 SSL 证书的详细信息，可以单击浏览器栏中的挂锁符号。SSL 证书中通常包括的详细信息包括：

- 针对其颁发证书的域名
- 颁发给哪个人、组织或设备
- 哪个证书颁发机构颁发了证书
- 证书颁发机构的数字签名
- 关联的子域
- 证书的颁发日期
- 证书的到期日期
- 公钥（不公开私钥）

如下

![](https://file.wulicode.com/feishu-images/cc7b436b31bd17c14c72e3a35445133a.png)

## SSL 的签发流程

SSL 证书是由受信任的证书颁发机构（CA，Certificate Authority）签发的文件，用于证明服务器身份和支持 HTTPS 加密

为了使 SSL 证书有效，域需要从证书颁发机构（CA）获取该证书。CA 是外部组织，也是受信任的第三方，它会生成并颁发 SSL 证书。CA 还使用自己的私钥对证书进行数字签名，以允许客户端设备对其进行验证

### **证书认证机构CA(Certificate Authority)**

CA是负责颁发、认证和管理证书的第三方机构，具有权威性，公正性

CA的作用是检查数字证书持有者身份的合法性，并签发数字证书（在证书上进行数字签名），以防证书被伪造或篡改，以及对证书和密钥进行管理。CA通常采用多层次的分级结构，根据证书颁发机构的层次，可以划分为根CA和从属CA。国际上被广泛信任的CA，被称之为根CA。根CA可授权其他CA为其下级CA

CA的角色类似于现实世界中的公证机构，其核心功能就是发放和管理数字证书，包括：证书的颁发、撤销、查询、归档和证书废除列表CRL（Certificate Revocation List）的发布等

![](https://file.wulicode.com/feishu-images/2b9c696749db2dfd44e14fa2370f74ee.png)

根CA是公钥体系中的第一个证书颁发机构，它是信任的起源。根CA可以为其他CA颁发证书\*\*，\*\*也可以为其他计算机、用户、服务颁发证书（绝大部分的根CA都不会直接为用户颁发证书）。对大多数基于证书的应用程序来说，使用证书的认证都可以通过证书链追溯到根CA。根证书没有上层机构再为其本身作数字签名，通常只有一个自签名证书。

从属CA必须从上级CA处获取证书。上级CA可以是根CA或者是一个已由根CA授权可颁发从属CA证书的从属CA。上级CA负责签发和管理下级CA的证书。

### 签发流程

1. 生成 CSR（证书签名请求）：

   - 网站管理员在服务器上生成公钥和私钥。
   - CSR 包含公钥和域名信息，提交给 CA。
2. 验证身份：

   - CA 验证申请人对域名的所有权。常见验证方式：
   
     - 域名验证（DV）：通过解析记录或邮件验证域名控制权。
     - 企业验证（OV）：需要提供企业注册信息。
     - 扩展验证（EV）：验证更为严格，显示企业名称在浏览器地址栏。
3. 签发证书：

   - 验证通过后，CA 用自己的私钥对 CSR 中的公钥进行签名，并生成 SSL 证书。
4. 安装与配置：

```Plaintext
1. 网站管理员将 SSL 证书安装到服务器上，同时配置 HTTPS
```

### 自签名证书

从技术上讲，任何人都可以通过生成公私钥对并包括上述所有信息来创建自己的 SSL 证书。此类证书称为自签名证书，因为使用的数字签名将是网站自己的私钥，而不是来自 CA。

但若使用自签名证书，就没有外部权威来验证源站服务器是否是它声称的身份。浏览器认为自签名证书不可信，并且尽管使用了 https:// URL，但可能仍然将站点标记为“不安全”。它们也可能会完全终止连接，从而阻止网站加载

## SSL 根证书的信任策略以及更新周期

SSL 证书会过期； 它们不会永远保持有效。作为 SSL 行业事实上的监管机构，[证书颁发机构/浏览器论坛](https://cabforum.org/)规定，SSL 证书的寿命[不应超过 27 个月](https://cabforum.org/uploads/CA-Browser-Forum-BR-1.6.0.pdf)。从本质上讲，这意味着两年，如果您续订以前的 SSL 证书时还有剩余的有效时间，则最多可以延长三个月

### 根证书的信任策略

根证书是 CA 机构的信任基石，存储在操作系统或浏览器的信任库中。它们用来验证 SSL 证书的合法性。

- 分层信任链：

  - 根证书 → 中间证书 → 网站 SSL 证书。
  - 浏览器验证信任链中的每一级证书，确保其来自可信的根证书。
- 自动更新机制：

  - 操作系统和主流浏览器会定期更新信任库，加入新根证书，移除过期或不安全的根证书。

### 根证书的更新周期

- 有效期：根证书的有效期通常较长（一般为 20-30 年）。
- 定期评估：浏览器厂商会定期评估根证书的安全性和信任状况。
- 撤销机制：若根证书被认为不安全（如被泄露），会通过 CRL（证书吊销列表）或 OCSP（在线证书状态协议）进行撤销。

![](https://file.wulicode.com/feishu-images/b7a6922e20756ac14ee8bb211088056c.png)

### SSL 存在的认证问题

**虚假认证**

某些 CA 签发的证书可能被攻击者用于钓鱼网站。例如，域名验证（DV）证书只验证域名控制权，但无法保证网站本身的可信度。

**中间人攻击**

尽管 SSL/TLS 能有效防止中间人攻击，但如果用户信任了攻击者伪造的证书（如自签名证书），攻击仍可能成功。

**过期或被吊销的证书**

如果网站使用的证书已过期或被吊销，浏览器会发出警告，但用户可能忽视并继续访问。

**CA 的信任问题**

- 滥发证书：一些 CA 可能由于管理疏漏或恶意行为，滥发不合法证书。
- 根证书被滥用：如果 CA 的根证书被攻击者获取，可能导致信任链全部失效。

**兼容性问题**

新证书（如使用更高版本的加密算法）可能在旧设备或旧浏览器中无法正常验证。

## 如何应对 SSL 的认证问题

选择可靠的 CA 机构：

- 选择被主流浏览器信任且口碑良好的 CA。

定期更新证书：

- 确保网站使用最新的加密算法和证书。

启用 OCSP Stapling：

- 减少证书吊销检查的延迟，提升用户体验。

监控证书滥用：

- 使用证书透明度（Certificate Transparency）监控证书是否被恶意签发。

教育用户：

- 提醒用户关注浏览器的安全警告，不信任自签名或过期的证书。

## 参考文章

- [**关于DigiCert根证书升级说明**](https://opendocs.alipay.com/cloud/0c4vqq?pathHash=f2e23a33)
- https://www.kaspersky.com.cn/resource-center/definitions/what-is-a-ssl-certificate
- https://www.cloudflare.com/zh-cn/learning/ssl/what-is-an-ssl-certificate/
- https://info.support.huawei.com/info-finder/encyclopedia/zh/SSL.html
- https://www.wosign.com/News/news_2024041201.htm
- https://blog.csdn.net/yeshen4328/article/details/83831434
- https://knowledge.digicert.com/general-information/digicert-root-and-intermediate-ca-certificate-updates-2023
- https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html
- https://www.digicert.com/kb/digicert-root-certificates.htm