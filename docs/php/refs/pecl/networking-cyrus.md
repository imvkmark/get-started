# 邮件相关扩展 - Cyrus

**介绍**

Cyrus IMAP administration

**安装**

此扩展在 Windows 平台上不可用

[IMAP](mk://book.imap.html)，[recode](mk://book.recode.html)，[YAZ](mk://book.yaz.html) 和 [Cyrus](mk://book.cyrus.html) 扩展不能同时使用，因为它们共享了相同 的内部符号。注意：Yaz 2.0 及以上版本不存在此问题。

**配置**

inclued.enabled int          
         Off
         PHP_INI_SYSTEM

**定义常量**

```php
CYRUS_CONN_NONSYNCLITERAL (integer)
CYRUS_CONN_INITIALRESPONSE (integer)
CYRUS_CALLBACK_NUMBERED (integer)
CYRUS_CALLBACK_NOLITERAL (integer)
```

**函数**

void cyrus_authenticate ( resource $connection [, string $mechlist [, string $service [, string $user [, int $minssf [, int $maxssf [, string $authname [, string $password ]]]]]]] )

授权验证

bool cyrus_bind ( resource $connection , array $callbacks )

给链接绑定调用函数

bool cyrus_close ( resource $connection )

关闭连接

resource cyrus_connect ([ string $host [, string $port [, int $flags ]]] )

开启连接, 返回资源

array cyrus_query ( resource $connection , string $query )

向 IMAP 服务器发送一条请求

bool cyrus_unbind ( resource $connection , string $trigger_name )

解绑触发器

**示例**