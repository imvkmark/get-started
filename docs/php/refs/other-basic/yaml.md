# 其他基本扩展 - YAML Data Serialization

**介绍**

这个扩展yaml数据序列化标准, 分析基于libYAML 库

**安装**

基于libYAML 库

基于PHP的yaml库

 https://code.google.com/p/php-yaml/ 

这个版本的处理器比 纯 php 解决方案要快

基于PHP的解决方案

 https://github.com/mustangostang/spyc 

**配置**

```php
yaml.decode_binary
	0
	PHP_INI_ALL      默认关闭, 

yaml.decode_timestamp
	0
	PHP_INI_ALL      控制解码, 解析暗示的或者明确的时间.

yaml.output_canonical
	0
	PHP_INI_ALL      默认关闭.输出

yaml.output_indent
	2
	PHP_INI_ALL      输出的缩进,默认2

yaml.output_width
	80
	PHP_INI_ALL      设置行宽度, -1不限制
```

**函数**

```php
bool yaml_emit_file ( string $filename , mixed $data [, int $encoding = YAML_ANY_ENCODING [, int $linebreak = YAML_ANY_BREAK [, array $callbacks ]]] )
     需要输出的文件
     $filename     文件名
     $data         非资源类型的类型     
     $encoding     编码
          YAML_ANY_ENCODING
          YAML_UTF8_ENCODING
          YAML_UTF16LE_ENCODING
          YAML_UTF16BE_ENCODING
     $linebreak
          YAML_ANY_BREAK
          YAML_CR_BREAK
          YAML_LN_BREAK
          YAML_CRLN_BREAK
     $callbacks
          内容控制器,用来输出yaml节点.

string yaml_emit ( mixed $data [, int $encoding = YAML_ANY_ENCODING [, int $linebreak = YAML_ANY_BREAK [, array $callbacks ]]] )
     将内容返回yaml字串

mixed yaml_parse_file ( string $filename [, int $pos = 0 [, int &$ndocs [, array $callbacks ]]] )
     从yaml文件中分析格式

mixed yaml_parse_url ( string $url [, int $pos = 0 [, int &$ndocs [, array $callbacks ]]] )
     从url分析格式.

mixed yaml_parse ( string $input [, int $pos = 0 [, int &$ndocs [, array $callbacks ]]] )
     将输入数组作为yaml格式来分析.
```