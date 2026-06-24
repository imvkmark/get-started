---
description: '域名被污染会导致网站无法正常访问，处理方式包括：在百度等搜索引擎移除被污染页面的搜录，清除泛解析记录，加强API密钥安全限制，以防被滥用。'
lastUpdated: '2026-06-21 22:37:45'
head:
  - - meta
    - name: 'og:title'
      content: '域名被污染的风险以及风险处理'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '域名被污染会导致网站无法正常访问，处理方式包括：在百度等搜索引擎移除被污染页面的搜录，清除泛解析记录，加强API密钥安全限制，以防被滥用。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//development/http/domain-pollution-risk.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/0d61df53b52717e3d90a898833f75e66.png'
---
# 域名被污染的风险以及风险处理

最近遇到一个问题就是自己的域名在使用三方工具的时候被恶意注入了泛解析, 从而导致泛解析后指向的网站是一些非法网站, 所以需要保护自己的域名以免未经授权的访问、滥用、劫持. 我这里造成的恶劣影响是域名被搜录, 一些不好的信息直接挂在了百度可以搜录到的地方

滥用搜录

> 为了避免存在引导访问, 这里对域名进行打码

![](https://file.wulicode.com/feishu-images/0d61df53b52717e3d90a898833f75e66.png)

DNS 被滥用的记录

![](https://file.wulicode.com/feishu-images/a2601fbbc01f73510d74773f1275bf9d.png)

劫持流程说明

![](https://file.wulicode.com/feishu-images/f2c2cbba9352a941171d4f2b1c514cd1.png)

## 解决方式

### 在百度/引擎移除搜录

**查找异常地址**

通过搜索 `site:example.com` 的方式查询, 找到异常地址, 复制出来地址备用, 将地址复制出来放到文本文件中, 每行一个

```Plaintext
http://4ue10.example.com/news/20230817/115942.html
```

**将地址设置为死链**

将泛解析解析到一台服务器, 设置链接访问返回数据为 404, 具体配置方式查看 配置泛域名/泛解析转发

```Plaintext
server {
    listen 80;
    server_name ~^([\w-]+)\.example\.com$;
    return 404;
}
```

**在站长工具中向搜索引擎提交死链**

这里我们向百度站长工具提交死链文件的地址

![](https://file.wulicode.com/feishu-images/51cd86f7db1ff8f73fb519af98bdfda5.png)

**百度移除死链地址**

![](https://file.wulicode.com/feishu-images/1785ffbc8facd5367dd5fb88e24c752b.png)

在添加之后根据百度已经删除的内容即时跟进内容的处理, 有时候可能因为解析的问题, 收录缓存的问题导致无法被删除, 需要持续的更新死链文件直到所有的数据被处理完毕.

### 泛解析的移除

在域名解析服务商移除泛解析

### API 密钥加强安全限制

- 移除老的TOKEN 并创建新的 token
- 对 Token 的使用增加白名单

![](https://file.wulicode.com/feishu-images/a750f6086a6ddb91d003ee56f13298bb.png)

::: info 📆
 更新记录
2024年01月10日
- 文档第一版本
:::

---