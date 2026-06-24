---
description: '这段PHP代码定义了一个名为`XorEncrypt`的类，包含一个`xor`方法，用于对字符串进行异或加密。它遍历输入字符串的每个字符，通过与密钥对应位置的字符进行异或运算来加密，密钥会自动循环使用。'
lastUpdated: '2026-06-17 22:18:37'
head:
  - - meta
    - name: 'og:title'
      content: '异或加密 Xor'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '这段PHP代码定义了一个名为`XorEncrypt`的类，包含一个`xor`方法，用于对字符串进行异或加密。它遍历输入字符串的每个字符，通过与密钥对应位置的字符进行异或运算来加密，密钥会自动循环使用。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/faq/crypto-xor.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/d60ecc4d86e79b89809e2e62a90c4084.png'
---
# 异或加密 Xor

[异或加密[维基百科]](https://zh.m.wikipedia.org/zh-cn/%E5%BC%82%E6%88%96%E5%AF%86%E7%A0%81)

![](https://file.wulicode.com/feishu-images/d60ecc4d86e79b89809e2e62a90c4084.png)

```PHP
class XorEncrypt
{
    public function xor(string $str, $key = 'secret'): string
    {
        $len = strlen($str);
        for ($i = 0; $i < $len; $i++) {
            $str[$i] = chr(ord($str[$i]) ^ ord($key[$i % strlen($key)]));
        }
        return $str;
    }
}
```