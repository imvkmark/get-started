---
description: '服务器统计活跃数时，出现一串“000000”的数据，原因是iOS 10更新后，若用户开启“设置-隐私-广告-限制广告跟踪”，获取到的IDFA将变为全零。同一设备在开启与关闭该功能后，数据库记录可验证此现象。'
lastUpdated: '2026-06-30 22:20:54'
head:
  - - meta
    - name: 'og:title'
      content: 'iOS - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '服务器统计活跃数时，出现一串“000000”的数据，原因是iOS 10更新后，若用户开启“设置-隐私-广告-限制广告跟踪”，获取到的IDFA将变为全零。同一设备在开启与关闭该功能后，数据库记录可验证此现象。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/ios/extend-reading/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/38bb01b4811d99876c72e21825a7b241.png'
---
# iOS - FAQ

## idfa 获取到的是 一串 00000

服务器统计活跃数的时候会出现

![](https://file.wulicode.com/feishu-images/38bb01b4811d99876c72e21825a7b241.png)

统计到的数据是 一串 000000的情况, 据查询

> ios10更新之后一旦开启了 设置->隐私->广告->限制广告跟踪之后 获取到的idfa将会是一串00000  
>  下图是同一个设备，开启与关闭后登录账号在数据库中的记录

![](https://file.wulicode.com/feishu-images/cdf0657fd49ddb5cead1738b7e70a060.png)