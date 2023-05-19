---
title: "阿里云细粒度STS授权"
date: 2022-04-14 22:27:23
toc: true
categories:
- ["Ops","运维 \/ Op"]
---

### 移动应用通过角色来获取临时凭证
当移动应用（App）直连OSS上传或下载数据时，App需要向应用服务器申请访问凭证。应用服务器以RAM用户身份扮演RAM角色，调用STS API AssumeRole接口获取临时安全令牌，并将临时安全令牌传递给App，App使用临时安全令牌访问OSS
> 从这个角度来说并不需要主用户的AK

![image.png](https://file.wulicode.com/yuque/202208/04/23/0823AEY13Pj5.png?x-oss-process=image/resize,h_424)<br />只是需要

- 准入用户
- 准入角色


### 子用户控制

#### 创建子用户
{}@....

#### 赋予公共权限
公共权限是进行提权, 例如:

- 推送
- 发送短信
- Feedback
- Oss 存储

#### 赋予限制存储权限
**创建 OSS 存储策略**
```
{
    "Version": "1",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "oss:PutObject",
                "oss:DeleteObject"
            ],
            "Resource": [
                "acs:oss:*:*:bucket-production",
                "acs:oss:*:*:bucket-production/*"
            ],
            "Condition": {}
        }
    ]
}
```
**在权限管理中加入个人自定义权限**

### 赋予 STS 权限
[STS临时授权访问OSS](https://help.aliyun.com/document_detail/100624.html) 详细记录了权限创建, 以下仅仅是对其进行简单的描述<br />这个是 Ali云的授权服务逻辑<br />![](https://file.wulicode.com/yuque/202208/04/23/0824F1AILnwg.png?x-oss-process=image/resize,h_249)<br />**创建 STS 子用户**<br />app-sts@...<br />**创建 Ram 角色**<br />app-sts<br />**创建 app-oss-sts 权限**<br />这里的权限授予普通的访问权限和自定目录的存储权限
```
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
**将权限赋予 RAM 角色**<br />![](https://file.wulicode.com/yuque/202208/04/23/0824hwIQoNZb.png?x-oss-process=image/resize,h_448)

