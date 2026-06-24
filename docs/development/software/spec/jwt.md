---
description: 'JSON Web Token（JWT）是一种紧凑的、自包含的令牌格式，由Header、Payload和Signature三部分组成，用于在各方之间安全传输声明信息。它常用于身份验证和信息交换，如单点登录。JWT通过数字签名验证内容完整性，服务器无需存储会话，可扩展且跨语言支持。'
lastUpdated: '2026-06-18 06:38:51'
head:
  - - meta
    - name: 'og:title'
      content: 'JWT(JSON Web Tokens) 介绍 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'JSON Web Token（JWT）是一种紧凑的、自包含的令牌格式，由Header、Payload和Signature三部分组成，用于在各方之间安全传输声明信息。它常用于身份验证和信息交换，如单点登录。JWT通过数字签名验证内容完整性，服务器无需存储会话，可扩展且跨语言支持。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//development/software/spec/jwt.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/2d84ec79677edc45545abdfb37dafc32.png'
---
# JWT(JSON Web Tokens) 介绍

> 原文地址 : [https://www.cnblogs.com/igeekfan/p/introduction-jwt.html](https://www.cnblogs.com/igeekfan/p/introduction-jwt.html)

JWT: Json Web Tokens JWT是一种开放标准[（RFC 7519](https://tools.ietf.org/html/rfc7519)），它定义了一种紧凑且独立的方式，用于将各方之间的信息安全地传输为JSON对象。因为它是经过数字签名的，所以该信息可以进行验证并信任，无法伪造。

JWT可以使用密钥进行签名，如：HMAC算法，RSA算法，**ECDSA**等对公钥/私钥进行签名。

## 什么时候应该使用 JSON Web Token(JWT令牌)

- Authorization 授权：

这是使用 JWT 的最常见方案，用户登录后，每个后续请求都将包含 JWT，允许用户访问该令牌允许的路由、服务和资源。单点登录是当今广泛使用 JWT 的一项功能，因为它的开销很小，并且能够跨不同域轻松使用。

- Information Exchange 信息交换

由于 JWT 可以签名（例如，使用公钥/私钥对），因此您可以确定发送方是不是有效用户。此外，由于签名是使用（Header）标头和（Payload）有效载荷计算的，因此您还可以验证内容是否未被篡改。

## Jwt 组成

### 结构

JSON Web 令牌结构 以紧凑的形式，JSON Web 令牌由三个部分组成

- Header 标头
- Payload 有效载荷
- Signature 签名

格式如下

```Plaintext
xxxxx.yyyyy.zzzzz
```

### header

通常由两部分组成:令牌的类型（即 JWT）和正在使用的签名算法.如 HMAC SHA256 或 RSA）。

```Plaintext
{
  "alg": "HS256",
  "typ": "JWT"
}
```

然后，第一部分对这个json串进行Base64Url编码，作为JWT的第一部分 ## Payload 令牌的第二部分是（payload）有效载荷。通常包含三种类型的声明：注册声明（Registered claims）、公共声明（Public claims）和私有声明（Private claims）

- 注册声明：这些是一组预定义的声明，不是强制性的，而是推荐的，以提供一组有用的、可互操作的声明。其中一些是：iss（发行人）、exp（到期时间）、sub（主题）、aud（观众）和 [其他](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1)

> 请注意，声明名称的长度只有三个字符，因为 JWT 应该是紧凑的。

- 公共声明：这些可以由使用JWTs的人随意定义。但为了避免冲突，它们应该在[IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml)中定义，或者定义为包含防冲突命名空间的URI。

![](https://file.wulicode.com/feishu-images/2d84ec79677edc45545abdfb37dafc32.png)

- 私有声明：这些是创建自定义声明，用于在同意使用它们各方之间共享信息，既不是注册声明，也不是公开声明
- 示例

```Plaintext
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

然后对payload进行**Base64Url** 编码，形成 JSON Web 令牌的第二部分 > 请注意，对于已签名的令牌，此信息虽然受到保护以防止篡改。但任何人都可以读取。不要将机密信息放在 JWT 的payload和Header 中，除非它已经加密。

### Signature（签名） 

要创建签名部分，您必须获取**Base64Url** 编码后的Header 、**Base64Url** 编码后的payload、一个密钥、header中指定的算法，并对其进行签名。例如，如果要使用 HMAC SHA256 算法，将按以下方式创建签名：

```Plaintext
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

签名用于验证消息在此过程中是否被篡改，并且，对于使用私钥签名的令牌，它还可以验证 JWT 的发送者是否是它所说的发件人。

## 总结

The output is three Base64-URL strings separated by dots that can be easily passed in HTML and HTTP environments, while being more compact when compared to XML-based standards such as SAML.

输出是三个 Base64-URL 字符串，由点分隔。可以在HTML、HTTP环境中轻松传递，同时与基于XML的标准（如SAML）相比更加紧凑。

以下展示了一个JWT,它通过对header和payload进行编码，并用一个secret（秘钥）进行Signature（签名）如果您想使用JWT并将这些概念付诸实践.你可以访问 [jwt.io](http://jwt.io/) ，测试用于解码、验证和生成JWT的调试器

![](https://file.wulicode.com/feishu-images/bdc9aedc46b87294a7905a042f617dd1.png)

- Base 64 解码
- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
- eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ

[Base64 在线编码解码 | Base64 加密解密 - Base64.us](https://base64.us/)

## JSON Web Token是如何工作的？

在身份验证中，当用户使用其凭据成功登录时，将返回一个JSON Web Token。由于令牌是凭证，因此必须非常小心地防止安全问题。一般来说，您不应该将Token保存的时间超过所需时间。

> 由于缺乏安全性，您也不应该在浏览器存储中存储敏感会话数据。

![](https://file.wulicode.com/feishu-images/d9a3c69188a3e44feaaeec7f12083143.png)

每当用户想要访问受保护的路由或资源时，Http请求的user agent都应该发送JWT，通常使用Bearer 模式的Authorization 报头（header)中。标题的内容应如下所示：

```Plaintext
Authorization: Bearer <token>
```

在某些情况下，这可能是一种无状态授权机制。服务器的受保护路由将在授权头中检查有效的JWT，如果存在，则允许用户访问受保护的资源。如果JWT包含必要的数据，可能会减少查询数据库中某些操作的需要，尽管情况并非总是如此。如果Token在 `Authorization` header中发送，则跨源资源共享（CORS）不会成为问题，因为它不使用cookie。下图显示了如何获取JWT并使用其访问API或资源：1.应用程序(`Application`)或客户端(`Client`) 向授权服务器 （`Authorization Server` ）请求授权.这是通过不同的授权流程实现的。例如，一个典型的OpenID Connect兼容web应用程序将使用授权代码流通过`/oauth/authorize` 端点。2.当授权被授予时，授权服务器向应用程序返回一个访问令牌（ `access token`）。3.应用程序使用访问令牌（ `access token`）访问受保护的资源（如`API`）。 > 请注意，对于签名令牌，令牌中包含的所有信息都会暴露给用户或其他方，即使他们无法被篡改。这意味着您不应该将机密信息放入令牌中。

![](https://file.wulicode.com/feishu-images/73eadad8b7b731de978a7b42625ca7ce.png)

## 我们为什么要使用JSON Web Token？

让我们来谈谈JSON Web Token（JWT）与Simple Web Token（SWT）和安全断言标记语言令牌Security Assertion Markup Language Tokens （SAML）相比的优势。

由于JSON没有XML那么冗长，所以编码时它的大小也更小，这使得JWT比SAML更紧凑。这使得JWT成为在HTML和HTTP环境中传递的好选择。

就安全性而言，SWT只能由使用HMAC算法的共享密钥对称签名。然而，JWT和SAML令牌可以使用X.509证书形式的公钥/私钥对进行签名。与签署JSON的简单性相比，使用XML数字签名签署XML而不引入模糊的安全漏洞是非常困难的。

JSON解析器在大多数编程语言中都很常见，因为它们直接映射到对象。相反，XML没有自然的文档到对象的映射。这使得使用JWT比使用SAML断言更容易。

关于使用，JWT在互联网范围内使用。这突出了在多个平台（尤其是移动平台）上客户端处理JSON Web Token的便利性

![](https://file.wulicode.com/feishu-images/956cd924dfc2a738fa43548e80afef20.png)

***编码JWT和编码SAML的长度比较***

如果您想阅读更多关于JSON Web令牌的信息，甚至开始在自己的应用程序中使用它们来执行身份验证，请浏览 [Auth0上的JSON Web Token登录页](https://auth0.com/learn/json-web-tokens?_gl=1*cbbn6i*rollup_ga*MjEwNzcxMTQ1NS4xNjQ0NDE2OTk3*rollup_ga_F1G3E656YZ*MTY0NDQxNjk5Ni4xLjEuMTY0NDQxOTY4NC41OQ..)

- [JSON Web Token Introduction - jwt.io](https://jwt.io/introduction)