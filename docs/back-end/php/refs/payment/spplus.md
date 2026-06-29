---
description: '此PECL扩展用于与法国松鼠储蓄银行接口交互，仅支持非Windows平台。它提供了计算HMAC和nthmac密钥的函数，以及生成交易URL的功能。主要函数包括calculhmac（8参数和2参数版本）和nthmac（2参数版本）。'
lastUpdated: '2026-06-17 19:03:56'
head:
  - - meta
    - name: 'og:title'
      content: '[Pecl]SPPLUS'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '此PECL扩展用于与法国松鼠储蓄银行接口交互，仅支持非Windows平台。它提供了计算HMAC和nthmac密钥的函数，以及生成交易URL的功能。主要函数包括calculhmac（8参数和2参数版本）和nthmac（2参数版本）。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/refs/payment/spplus.html'
---
# [Pecl]SPPLUS

这个扩展允许你能够使用 法国松鼠储蓄银行 的接口

## 安装

此扩展在 Windows 平台上不可用 http://pecl.php.net/package/spplus

## 配置

定义常量

## 函数

`string calcul_hmac ( string $clent , string $siretcode , string $price , string $reference , string $validity , string $taxation , string $devise , string $language )`

获取一个 hmac key (8 参数)

`string calculhmac ( string $clent , string $data )`

获取一个 hmac key (2 参数)

`string nthmac ( string $clent , string $data )`

获取一个 nthmac 键

`string nthmac ( string $clent , string $data )`

获取一个交易 URL