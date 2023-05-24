---
title: "PHP 使用 RSA 非对称加密进行数据加密传输"
date: 2022-04-14 22:14:42
toc: true
categories:
- ["Php","扩展"]
---

## 介绍
RSA加密算法是一种非对称加密算法。在公开密钥加密和电子商业中RSA被广泛使用。RSA是1977年由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）一起提出的。当时他们三人都在麻省理工学院工作。RSA就是他们三人姓氏开头字母拼在一起组成的。
> 对极大整数做因数分解的难度决定了RSA算法的可靠性。换言之，对一极大整数做因数分解愈困难，RSA算法愈可靠
> 来自 [维基百科](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)

非对称加密算法需要两个密钥：公钥（publickey）和私钥（privatekey）。

公开密钥与私有密钥是一对，如果用公开密钥对数据进行加密，只有用对应的私有密钥才能解密；

如果用私有密钥对数据进行加密，那么只有用对应的公开密钥才能解密。

因为加密和解密使用的是两个不同的密钥，所以这种算法叫作非对称加密算法。




## 使用

### 创建私钥、公钥
```
$ openssl
openssl> genrsa -out rsa_private_key.pem 4096
openssl> rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
```

### 类库
```php
<?php 

namespace System\Classes\Crypt;
use Poppy\Framework\Classes\Traits\AppTrait;
class RsaCrypt
{

    use AppTrait;
    
    private static $privateKey = '-----BEGIN RSA PRIVATE KEY-----';
    private static $publicKey  = '-----BEGIN PUBLIC KEY-----';
    
    /**
    * 设置私有 key
    * @param $private_key
    */
    public function setPrivateKey($private_xkey)
    {
        self::$privateKey = $private_key;
    }
    
    /**
    * 设置公有key
    * @param $public_key
    */
    public function setPublicKey($public_key)
    {
        self::$publicKey = $public_key;
    }
    
    /**
    * 使用私钥进行签名
    * Rsa2 进行签名
    * @param  string $data
    * @return string
    */
    public function sign($data): string
    {
        $priKey = str_replace([
                              '-----BEGIN RSA PRIVATE KEY-----',
                              '-----END RSA PRIVATE KEY-----',
                              "\n",
                              ], '', self::$privateKey);
        $res = "-----BEGIN RSA PRIVATE KEY-----\n" .
            wordwrap($priKey, 64, "\n", true) .
            "\n-----END RSA PRIVATE KEY-----";
        openssl_sign($data, $sign, $res, OPENSSL_ALGO_SHA256);
        return base64_encode($sign);
    }
    
    /**
    * 对签名进行验证
    * @param string $data
    * @param string $sign
    * @return bool
    */
    public function verify($data = '', $sign = ''): bool
    {
        $publicKey = str_replace([
                                 '-----BEGIN PUBLIC KEY-----',
                                 '-----END PUBLIC KEY-----',
                                 "\n",
                                 ], '', self::$publicKey);
        $res = "-----BEGIN PUBLIC KEY-----\n" .
            wordwrap($publicKey, 64, "\n", true) .
            "\n-----END PUBLIC KEY-----";
        $sign = base64_decode($sign);
        return openssl_verify($data, $sign, $res, OPENSSL_ALGO_SHA256) > 0;
    }
}

?>
```

### 使用
```php
// generate sign
$rsa = new RsaCrypt();
$rsa->setPrivateKey('-----BEGIN RSA PRIVATE KEY-----.....');
$sign = $rsa->sign('abc');
// verify sign
$rsa = new RsaCrypt();
$rsa->setPublicKey('-----BEGIN PUBLIC KEY-----......');
$rsa->verify('abc', $sign);
```

## 参考文章

- [RSA加密算法](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)
- [使用OpenSSL工具生成密钥](https://docs.open.alipay.com/291/106130)
- [公钥，私钥和数字签名这样最好理解](https://blog.csdn.net/21aspnet/article/details/7249401)

