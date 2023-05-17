# 与变量和类型有关的扩展 - Function Handling

这些函数操作函数中的变量

## 安装

PHP核心,无需安装

## 配置

## 定义常量

## 函数

`mixed call_user_func_array ( callable $callback , array $param_arr )`

调用函数, 并把参数以数组的形式传递进去

`mixed call_user_func ( callable $callback [, mixed $parameter [, mixed $... ]] )`

调用自定义函数, 并把参数依次传递进去

`string create_function ( string $args , string $code )`

建立一个匿名函数, 并且返回一个唯一的名称

`mixed forward_static_call_array ( callable $function , array $parameters )`

[5.3.0+]

调用静态方法,并且传递参数数组

`mixed forward_static_call ( callable $function [, mixed $parameter [, mixed $... ]] )`

[5.3.0+]

调用用户定义的函数/方法, 并且依次传入参数

`mixed func_get_arg ( int $arg_num )`

获取用户指定的参数的值

`array func_get_args ( void )`

以数组形式返回参数

`int func_num_args ( void )`

返回传递给函数的参数的数量

`bool function_exists ( string $function_name )`

检测函数是否定义

`array get_defined_functions ( void )`

获取所有已经定义的函数

`void register_shutdown_function ( callable $callback [, mixed $parameter [, mixed $... ]] )`

注册一个脚本执行完成之后的函数, 这个函数在调用结束后执行, 或者 exit()调用时候执行

`bool register_tick_function ( callable $function [, mixed $arg [, mixed $... ]] )`

注册tick函数

> 摘自别人的猜想
> 

根本上，还是要看看declare（在zend_compile.c中，有tick的相关实现，估计再结合zend_language_parser.y）和pcntl_*（extpcntl/）的实现。暂时没时间，先把目前我想到的和猜测的记一下。

declare(ticks = N)，告诉PHP，在当前scope内，每执行N句internal statements（opcodes），就中断当前正在做的，去执行通过register_tick_function注册的函数（如果有的话），执行完后再回到原来正在做的中断现场继续，这可能就是庆骏的所说的吧。但问题是，因为PHP statements和internal statements并非严格一一对应，所以ticks = N的N，可能不好确定。

pcntl_signal，通过declare(ticks = 1)，让PHP每执行完一句internal statement，就检查有没有相应的signal发生。因为，可能不像直接用C写的POSIX 程序，由kernel通知signal的发生。

`void unregister_tick_function ( string $function_name )`

解除tick 函数执行的时间