---
description: 'OpenSSL扩展用于生成和验证签名数据，需安装OpenSSL库。PHP版本与OpenSSL版本要求：7.0需0.9.8，7.1-8.0需1.0.1-3.0，8.1需1.0.2-4.0。运行时需访问/dev/urandom或/dev/random设备以确保随机数生成。建议安装最新包防范攻击。'
lastUpdated: '2026-06-17 19:03:05'
head:
  - - meta
    - name: 'og:title'
      content: '加密扩展 - OpenSSL'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'OpenSSL扩展用于生成和验证签名数据，需安装OpenSSL库。PHP版本与OpenSSL版本要求：7.0需0.9.8，7.1-8.0需1.0.1-3.0，8.1需1.0.2-4.0。运行时需访问/dev/urandom或/dev/random设备以确保随机数生成。建议安装最新包防范攻击。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/refs/crypto/openssl.html'
---
# 加密扩展 - OpenSSL

使用 openssl 函数来生成和验证签名数据, openssl提供了很多特性,但是这个模块不支持, 有些可能在未来进行添加

## 安装

⚠️

要使用 Open SSL 函数，你必须安装[» OpenSSL](http://www.openssl.org/) 库。 PHP 7.0 需要 OpenSSL >= 0.9.8。PHP 7.1-8.0 需要 OpenSSL >= 1.0.1，< 3.0。PHP >= 8.1 支持 OpenSSL >= 1.0.2，< 4.0

这个需要安装openssl包,为了避免服务器攻击,需要安装最新的包

OpenSSL 库还在运行时对正常操作有额外的要求。最明显的是，OpenSSL 需要访问随机或伪随机数生成器； 在大多数 Unix 和类 Unix 平台上(包括linux)，意味着它必须要访问 `/dev/urandom` 或者 `/dev/random` 设备

## 函数

`int openssl_cipher_iv_length ( string $method )`

获取算法iv长度

`bool openssl_csr_export_to_file ( resource $csr , string $outfilename [, bool $notext = true ] )`

将验证签名请求 导出 csr 到 文件

- \$csr
- \$outfilename 输出的文件名
- \$notext 可选参数 notext 影响输出的冗余度; 如果设为 FALSE, 输出内容将包含附加的人类可读信息. notext 的缺省值为 TRUE.

`bool openssl_csr_export ( resource $csr , string &$out [, bool $notext = true ] )`

导出为字串

`resource openssl_csr_get_public_key ( mixed $csr [, bool $use_shortnames = true ] )`

获取公钥

`array openssl_csr_get_subject ( mixed $csr [, bool $use_shortnames = true ] )`

获取 subject

`mixed openssl_csr_new ( array $dn , resource &$privkey [, array $configargs [, array $extraattribs ]] )`

生成csr, 基于\$dn变量,

- \$dn Distinguished Name
- \$privkey 应该设置为一个 pk, 之前使用 openssl_pkey_new() 生成的.
- \$confiargs 默认的是使用openssl.conf来初始化请求,这里使用参数数组可以重写
- \$extraattribs

用来指定额外的配置属性.

`resource openssl_csr_sign ( mixed $csr , mixed $cacert , mixed $priv_key , int $days [, array $configargs [, int $serial = 0 ]] )`

和证书验证CRC, 并且生成一个证书

`string openssl_decrypt ( string $data , string $method , string $password [, bool $raw_input = false [, string $iv = "" ]] )`

解密

`string openssl_dh_compute_key ( string $pub_key , resource $dh_key )`

`string openssl_digest ( string $data , string $method [, bool $raw_output = false ] )`

摘要

`string openssl_encrypt ( string $data , string $method , string $password [, bool $raw_output = false [, string $iv = "" ]] )`

加密

`string openssl_error_string ( void )`

错误信息

`void openssl_free_key ( resource $key_identifier )`

清空资源

`array openssl_get_cipher_methods ([ bool $aliases = false ] )`

获取可用的加密方法

`array openssl_get_md_methods ([ bool $aliases = false ] )`

获取可用的摘要算法.

`bool openssl_open ( string $sealed_data , string &$open_data , string $env_key , mixed $priv_key_id [, string $method ] )`

打开封装的数值

`bool openssl_pkcs12_export_to_file ( mixed $x509 , string $filename , mixed $priv_key , string $pass [, array $args ] )`

x509 文件导出

`bool openssl_pkcs12_export ( mixed $x509 , string &$out , mixed $priv_key , string $pass [, array $args ] )`

x509 字串导出

`bool openssl_pkcs12_read ( string $pkcs12 , array &$certs , string $pass )`

分析PKCS#12验证到数组

`bool openssl_pkcs7_decrypt ( string $infilename , string $outfilename , mixed $recipcert [, mixed $recipkey ] )`

pkcs 解密

`bool openssl_pkcs7_encrypt ( string $infile , string $outfile , mixed $recipcerts , array $headers [, int $flags = 0 [, int $cipherid = OPENSSL_CIPHER_RC2_40 ]] )`

pkcs7加密

`bool openssl_pkcs7_sign ( string $infilename , string $outfilename , mixed $signcert , mixed $privkey , array $headers [, int $flags = PKCS7_DETACHED [, string $extracerts ]] )`

pkcs7验证

`mixed openssl_pkcs7_verify ( string $filename , int $flags [, string $outfilename [, array $cainfo [, string $extracerts [, string $content ]]]] )`

验证签名信息.

`bool openssl_pkey_export_to_file ( mixed $key , string $outfilename [, string $passphrase [, array $configargs ]] )`

文件导出

`bool openssl_pkey_export ( mixed $key , string &$out [, string $passphrase [, array $configargs ]] )`

字串导出

`void openssl_pkey_free ( resource $key )`

清空 pk

`array openssl_pkey_get_details ( resource $key )`

获取详情

`resource openssl_pkey_get_private ( mixed $key [, string $passphrase = "" ] )`

获取pk

`resource openssl_pkey_get_public ( mixed $certificate )`

extract pk.

`resource openssl_pkey_new ([ array $configargs ] )`

生成新的 pk

`bool openssl_private_decrypt ( string $data , string &$decrypted , mixed $key [, int $padding = OPENSSL_PKCS1_PADDING ] )`

使用私钥解密

`bool openssl_private_encrypt ( string $data , string &$crypted , mixed $key [, int $padding = OPENSSL_PKCS1_PADDING ] )`

使用私钥加密

`bool openssl_public_decrypt ( string $data , string &$decrypted , mixed $key [, int $padding = OPENSSL_PKCS1_PADDING ] )`

公钥解密

`bool openssl_public_encrypt ( string $data , string &$crypted , mixed $key [, int $padding = OPENSSL_PKCS1_PADDING ] )`

公钥加密

`string openssl_random_pseudo_bytes ( int $length [, bool &$crypto_strong ] )`

生成随机字串.

`int openssl_seal ( string $data , string &$sealed_data , array &$env_keys , array $pub_key_ids [, string $method ] )`

加密数据

`bool openssl_sign ( string $data , string &$signature , mixed $priv_key_id [, int $signature_alg = OPENSSL_ALGO_SHA1 ] )`

生成签名.

`int openssl_verify ( string $data , string $signature , mixed $pub_key_id [, int $signature_alg = OPENSSL_ALGO_SHA1 ] )`

验证签名

`bool openssl_x509_check_private_key ( mixed $cert , mixed $key )`

验证私钥

`int openssl_x509_checkpurpose ( mixed $x509cert , int $purpose [, array $cainfo = array() [, string $untrustedfile ]] )`

特殊目的验证

`bool openssl_x509_export_to_file ( mixed $x509 , string $outfilename [, bool $notext = TRUE ] )`

导出一个证书

`bool openssl_x509_export ( mixed $x509 , string &$output [, bool $notext = TRUE ] )`

字串导出

`void openssl_x509_free ( resource $x509cert )`

清空证书源

`array openssl_x509_parse ( mixed $x509cert [, bool $shortnames = true ] )`

分析X509证书,并且返回数组

`resource openssl_x509_read ( mixed $x509certdata )`

分析证书并且返回资源标识符