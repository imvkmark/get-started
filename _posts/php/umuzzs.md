---
title: "扩展 : 异或加密 Xor"
date: 2022-06-17 09:15:57
toc: true
categories:
- ["Php","语言参考"]
---

[异或加密[维基百科]](https://zh.m.wikipedia.org/zh-cn/%E5%BC%82%E6%88%96%E5%AF%86%E7%A0%81)

![image.png](https://file.wulicode.com/yuque/202208/04/15/3354U9jBQ0h6.png?x-oss-process=image/resize,h_219)



```php
class XorEncrypt
{
    public function xor(string $str, $key = 'secret'): string
    {
        $len = strlen($str);
        for ($i = 0; $i < $len; $i++) {
            // 获取字符的码位
            // 异或密钥
            // 转为字符存储
            $str[$i] = chr(ord($str[$i]) ^ ord($key[$i % strlen($key)]));
        }
        return $str;
    }
}

```

