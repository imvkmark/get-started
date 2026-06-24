---
description: '阿里云STS授权：创建子账号，通过RAM角色和权限进行绑定，实现临时访问凭证管理，保障资源安全。'
lastUpdated: '2026-04-28 14:15:54'
head:
  - - meta
    - name: 'og:title'
      content: '阿里云 STS 授权'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '阿里云STS授权：创建子账号，通过RAM角色和权限进行绑定，实现临时访问凭证管理，保障资源安全。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/aliyun/sts-assume-role.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/b83b998396dc6c792276ad35fda0193c.png'
---
# 阿里云 STS 授权

> 主要的目的是应用通过可授权的角色来获取临时凭证

当应用（App）直连OSS上传或下载数据时，App需要向应用服务器申请访问凭证。应用服务器以阿里云用户调用STS API AssumeRole接口, 扮演有限权限的RAM角色为用户申请临时安全令牌，并将临时安全令牌传递给App，App使用临时安全令牌访问OSS

::: info 🔗
参考文档 : https://help.aliyun.com/zh/oss/developer-reference/use-temporary-access-credentials-provided-by-sts-to-access-oss/
:::

![](https://file.wulicode.com/feishu-images/b83b998396dc6c792276ad35fda0193c.png)

只是需要

- 准入用户
- 准入角色

### 创建子账号

该子账号的目的是扮演 ARN 来获取权限, 该账号不具备任何权限, 仅仅具备角色扮演的权限

### **创建 RAM 角色/权限并进行绑定**

**创建RAM 角色**

该角色的目的是控制权限, 改角色创建之后会生成一个 ARN

```Plaintext
acs:ram::1016****13484:role/app-sts
```

**创建 app-sts-oss 权限**

这里的权限授予可写权限和可自定目录的存储权限

```JSON
{
    "Version": "1",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "oss:PutObject"
            ],
            "Resource": [
                "acs:oss:*:*:bucket-production",
                "acs:oss:*:*:bucket-production/*"
            ]
        }
    ]
}
```

**将权限赋予 RAM 角色**

![](https://file.wulicode.com/feishu-images/3263835ba0b471a1bcba99d24aaa5ee5.png)

![](https://file.wulicode.com/feishu-images/fedb4c14fbd0bbef0b4eaf2aefa7b099.png)

角色和权限图示

::: info 📆
更新记录
2026年04月28日
- 简化 AK 和 ARN 关系
:::