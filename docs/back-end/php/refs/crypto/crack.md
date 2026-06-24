---
description: 'Crack是一个PECL扩展，用于通过字典检查保护密码免受基于字典的攻击。它提供安装、配置、定义常量及相关函数，帮助开发者抵御常见密码破解尝试。'
lastUpdated: '2026-06-17 19:03:08'
head:
  - - meta
    - name: 'og:title'
      content: '[Pecl] Crack - 保护密码免受基于字典的攻击 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Crack是一个PECL扩展，用于通过字典检查保护密码免受基于字典的攻击。它提供安装、配置、定义常量及相关函数，帮助开发者抵御常见密码破解尝试。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/refs/crypto/crack.html'
---
# [Pecl] Crack - 保护密码免受基于字典的攻击

这些函数允许你使用CrackLib库来检测密码的强度, 强度的检测使用大小写和CrackLib词典进行匹配. 这个给出信息的特征来增强密码的强度

## 安装

http://sourceforge.net/projects/cracklib http://pecl.php.net/package/crack

## 配置

## 定义常量

## 函数

`bool crack_check ( resource $dictionary , string $password )` `bool crack_check ( string $password )`

对给定的密码在指定词典上做模糊检测

`bool crack_closedict ([ resource $dictionary ] )`

关闭指定字典标示符

`string crack_getlastmessage ( void )`

返回上一个检测的消息

`resource crack_opendict ( string $dictionary )`

打开一个CrackLib词典