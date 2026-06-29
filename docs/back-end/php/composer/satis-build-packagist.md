---
description: '使用Satis搭建私有包平台，可模拟本地Packagist。通过编写代码、更新satis配置文件，并解决Codeup对代码拉取的限制，实现私有Composer包的托管与下载。'
lastUpdated: '2026-06-26 10:50:52'
head:
  - - meta
    - name: 'og:title'
      content: '⚠️ 使用 satis 搭建私有包平台'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用Satis搭建私有包平台，可模拟本地Packagist。通过编写代码、更新satis配置文件，并解决Codeup对代码拉取的限制，实现私有Composer包的托管与下载。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/composer/satis-build-packagist.html'
---
# ⚠️ 使用 satis 搭建私有包平台

::: warning ⚠️
<p>此文档的解决方案并非最优解, 替代产品参考 : [使用 packeton 来管理私有包](/back-end/php/composer/packeton.md)</p>
:::

## 搭建本地 packagist 平台

搭建平台按照 [3.4. 使用 Satis 处理私有仓库](https://learnku.com/docs/composer/2018/handling-private-packages-with-satis/2092) 这个文档来进行, 因为 2.0 版本支持的是 docker 方式, 这里暂时不做赘述

## 编写代码

编写代码, 完成单元测试

创建 代码仓库

推送代码

## 更新 satis 文件

```JSON
{
    ...
    "repositories": [
        {
            "type": "vcs",
            "url": "git@codeup.aliyun.com:dadi/poppy/ext-alipay.git"
        },
        {
            "type": "vcs",
            "url": "git@codeup.aliyun.com:dadi/poppy/ext-im.git"
        }
    ],
    "require": {
        "poppy/ext-alipay": "*",
        "poppy/ext-im": "*"
    },
    ...
}
```

## 让服务器支持代码拉取(Codeup限制)

因为 codeup 拉取代码白名限制, 所以需要对可以拉取的代码仓库启用 key 配置