# 与变量和类型有关的扩展 - Variable handling

操控变量

> 无需安装
> 

## 函数

`boolean boolval ( mixed $var )`

[5.5.0] 获取变量的布尔值

`void debug_zval_dump ( mixed $variable [, mixed $... ] )`

输出变量在zend中解析的过程和输出

`bool empty ( mixed $var )`

变量是否为空

`float floatval ( mixed $var )`

[alias] doubleval 获取浮点数

`array get_defined_vars ( void )`

获取定义的数值

`string get_resource_type ( resource $handle )`

获取资源类型

`string gettype ( mixed $var )`

获取类型, 不推荐使用

`bool import_request_variables ( string $types [, string $prefix ] )`

[4.1.0 < php < 5.4.0]将变量导入全局作用域

`int intval ( mixed $var [, int $base ] )`

获取整形

`bool is_array ( mixed $var )`

数组检测

`bool is_bool ( mixed $var )`

是否为布尔

`bool is_callable ( callable $name [, bool $syntax_only = false [, string &$callable_name ]] )`

是否可以调用

`bool is_float ( mixed $var )`

[alias] is_double [alias] is_real 浮点数检测

`bool is_int ( mixed $var )`

[alias] is_integer [alias] is_long 整形检测

`bool is_null ( mixed $var )`

null 检测

`bool is_numeric ( mixed $var )`

数值格式检测

`bool is_object ( mixed $var )`

对象检测

`bool is_resource ( mixed $var )`

资源检测

`bool is_scalar ( mixed $var )`

标量检测

`bool is_string ( mixed $var )`

字串检测

`bool isset ( mixed $var [, mixed $... ] )`

是否被设置

`bool print_r ( mixed $expression [, bool $return ] )`

输出变量

`string serialize ( mixed $value )`

序列化数据

`bool settype ( mixed &$var , string $type )`

设置类型, 不推荐使用

`string strval ( mixed $var )`

获取字符值

`mixed unserialize ( string $str )`

反序列化

`void unset ( mixed $var [, mixed $... ] )`

移除变量

`void var_dump ( mixed $expression [, mixed $... ] )`

打印变量

`mixed var_export ( mixed $expression [, bool $return ] )`

导出变量