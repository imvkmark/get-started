
# 信用卡处理 - SPPLUS

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