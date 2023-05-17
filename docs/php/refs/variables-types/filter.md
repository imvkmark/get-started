# 与变量和类型有关的扩展 - Filter

这个过滤数据的功能是验证和消毒数据. 这个特性在数据不知道数据的的情况下非常有用, 像用户提供的数据,例如说来自html表单的数据

这里有两种功能,验证和过滤

验证的功能是用来检测数据是否符合指定的格式.例如传递一个 FILTER_VALIDATE_EMAIL 将检测一个email是否一个可用的邮件地址,但是不会改变数据本身

过滤数据将过滤数据. 所以这个可能会删除不需要的数据.比如 FILTETR_SANITIZE_EMAIL 将移除不合适的邮件中的数据,这个不会验证数据.

## 安装

这函数在PHP5.2中启用, 在此之前.将使用pecl扩展. 这个pecl扩展将不再更新和建议被使用

## 配置

`filter.default` “unsafe_raw” PHP_INI_PERDIR 使用这个函数过滤所有的GPCRS数据, 原始数据可以通过 filter_input() 访问,

`filter.default_flags` NULL PHP_INI_PERDIR 默认的过滤器设置的时候.

## 函数

`bool filter_has_var ( int $type , string $variable_name )`

检测变量是否存在指定的类型

`int filter_id ( string $filtername )`

返回基于名称的过滤器的ID

`mixed filter_input_array ( int $type [, mixed $definition ] )`

从外部获取变量,基于定义的输入规则 - $type INPUT_GET, INPUT_POST, INPUT_COOKIE, INPUT_SERVER, INPUT_ENV. - $definition 定义参数分析的数组, - key 包含变量名称的字串 - value 过滤类型/ 执行过滤器的数组 过滤类型 执行过滤器的数组 filter flags options

`mixed filter_input ( int $type , string $variable_name [, int $filter = FILTER_DEFAULT [, mixed $options ]] )`

通过名称和可选过滤器获取外部的变量

`array filter_list ( void )`

获取所有支持的过滤器

`mixed filter_var_array ( array $data [, mixed $definition ] )`

过滤变量, 多种的过滤

`mixed filter_var ( mixed $variable [, int $filter = FILTER_DEFAULT [, mixed $options ]] )`

从指定的过滤器过滤变量