# 加密扩展 - Mcrypt

::: info 扩展阅读

- [异或加密 Xor](../usage/cryptography-xor.md)
- [使用 RSA 非对称加密进行数据加密传输](../usage/cryptography-rsa.md)

:::

mcrypt 库, 支持很大范围的算法, 如 TripleDES, Blowfish, 3-WAY, SAFER-SK64, SAFER-SK128, TWOFISH, TEA, C2, GOST IN CBC, OFB,CFB,ECB , RC6, IDEA,

## 安装

这些函数使用 mcrypt来运行. PHP5.0.0 libmcrypt PHP5.2 mcrypt.dll PHP5.3 不需要dll

## 配置

mcrypt.algorithms_dir NULL PHP_INI_ALL 包含算法的文件夹, 默认是“/usr/local/lib/libmcrypt”, mcrypt_list_algorithms() 可以看更多详情

mcrypt.modes_dir NULL PHP_INI_ALL 包含的模式的文件夹,默认是“/usr/local/lib/libmcrypt” , mcrypt_list_modes()查看更多信息

资源类型

mcrypt_module_open()返回一个加密描述符

## 函数

mcrypt_cbc mcrypt_cfb mcrypt_ecb mcrypt_generic_end mcrypt_ofb

`string mcrypt_create_iv ( int $size [, int $source = MCRYPT_DEV_RANDOM ] )`

创建一个初始化向量(IV)从一个 随机源 - $size - $source 5.3之前,只有 MCRYPT_RAND 可用 MCRYPT_RAND
MCRYPT_DEV_RANDOM /dev/random MCRYPT_DEV_URANDOM /dev/urandom

`string mcrypt_decrypt ( string $cipher , string $key , string $data , string $mode [, string $iv ] )`

解密函数 - $cipher 解密 - $key 加密key - $data 需要解密的数据 - $mode 模式变量 ecb, cbc, cfb, ofb, nofb, stream - $iv CBC, CFB, OFB 或者 STREAM 的部分算法.如果一个算法需要一个
IV, 但是函数没有提供,将产生一个 警告,并且使用iv设置为 \0

`string mcrypt_enc_get_algorithms_name ( resource $td )`

返回打开的算法的名称

`int mcrypt_enc_get_block_size ( resource $td )`

获取打开的算法的区块的大小

`int mcrypt_enc_get_iv_size ( resource $td )`

返回打开算法的IV的大小 IV is used in cbc, cfb ,ofb,some algorithms in stream mode.

`int mcrypt_enc_get_key_size ( resource $td )`

返回打开的模式中支持的最大的key的大小

`string mcrypt_enc_get_modes_name ( resource $td )`

返回打开的模式的名称

`array mcrypt_enc_get_supported_key_sizes ( resource $td )`

获取打开算法中支持的key sizes

`bool mcrypt_enc_is_block_algorithm_mode ( resource $td )`

检测打开的模式的算法是否在block上工作

`bool mcrypt_enc_is_block_algorithm ( resource $td )`

检测 算法的打开模式是否是 区块算法

`bool mcrypt_enc_is_block_mode ( resource $td )`

检测打开的模式是否输出区块

`int mcrypt_enc_self_test ( resource $td )`

打开的模块上运行自检.

`string mcrypt_encrypt ( string $cipher , string $key , string $data , string $mode [, string $iv ] )`

利用给定的参数加密

`bool mcrypt_generic_deinit ( resource $td )`

这个函数终止指定的加密描述符.清空换缓存但是不关闭模块,你需要自行调用 mcrypt_module_close().

`int mcrypt_generic_init ( resource $td , string $key , string $iv )`

这个函数初始化所有需要加密的缓存.

`string mcrypt_generic ( resource $td , string $data )`

加密数据 由于加密时候使用 \0 进行分割,但是数据库的varchar字段将会自动的删除后补空格 , 所以这样存储会丢失数据 - $td mcrypt_generic_init() 初始化的数据.

`int mcrypt_get_block_size ( string $cipher , string $module )`

获取指定的加密算法的区块大小

`string mcrypt_get_cipher_name ( string $cipher )`

获取指定算法的名称

`int mcrypt_get_iv_size ( string $cipher , string $mode )`

返回指定算法/模式的iv 的大小

`int mcrypt_get_key_size ( string $cipher , string $module )`

获取指定算法键的大小

`array mcrypt_list_algorithms ([ string $lib_dir = ini_get("mcrypt.algorithms_dir") ] )`

获取所有支持的算法

`array mcrypt_list_modes ([ string $lib_dir = ini_get("mcrypt.modes_dir") ] )`

获取所有支持的模式

`bool mcrypt_module_close ( resource $td )`

关闭加密模块

`int mcrypt_module_get_algo_block_size ( string $algorithm [, string $lib_dir ] )`

获取指定算法的区块大小

`int mcrypt_module_get_algo_key_size ( string $algorithm [, string $lib_dir ] )`

获取打开模式的最大支持的键值大小

`array mcrypt_module_get_supported_key_sizes ( string $algorithm [, string $lib_dir ] )`

获取打开的算法支持的所有的键值大小

`bool mcrypt_module_is_block_algorithm_mode ( string $mode [, string $lib_dir ] )`

获取指定的模块是否是区块算法

`bool mcrypt_module_is_block_algorithm ( string $algorithm [, string $lib_dir ] )`

获取算法是否是区块算法

`bool mcrypt_module_is_block_mode ( string $mode [, string $lib_dir ] )`

模式是否输出区块

`resource mcrypt_module_open ( string $algorithm , string $algorithm_directory , string $mode , string $mode_directory )`

打开算法模块和使用的模式.

`bool mcrypt_module_self_test ( string $algorithm [, string $lib_dir ] )`

在指定的模块上运行自测

`string mdecrypt_generic ( resource $td , string $data )`

模块解密