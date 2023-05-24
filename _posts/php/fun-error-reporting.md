---
title: "error_reporting 设置php运行时错误报警"
date: 2022-04-14 22:09:38
toc: true
categories:
- ["Php","语言参考"]
---

## 定义和用法
error_reporting() 设置 PHP 的报错级别并返回当前级别。




### 语法
int error_reporting(report_level)


如果参数 level 未指定，当前报错级别将被返回。下面几项是 level 可能的值：

**错误和日志记录**

| 值 | 常量 | 说明 |
| --- | --- | --- |
| 1 | **E_ERROR** (integer) | 致命的运行时错误。这类错误一般是不可恢复的情况，例如内存分配导致的问题。后果是导致脚本终止不再继续运行。 |
| 2 | **E_WARNING** (integer) | 运行时警告 (非致命错误)。仅给出提示信息，但是脚本不会终止运行。 |
| 4 | **E_PARSE** (integer) | 编译时语法解析错误。解析错误仅仅由分析器产生。 |
| 8 | **E_NOTICE** (integer) | 运行时通知。表示脚



本遇到可能会表现为错误的情况，但是在可以正常运行的脚本里面也可能会有类似的通知。 |
| 16 | **E_CORE_ERROR** (integer) | 在PHP初始化启动过程中发生的致命错误。该错误类似 **E_ERROR**，但是是由PHP引擎核心产生的。 |
| 32 | **E_CORE_WARNING** (integer) | PHP初始化启动过程中发生的警告 (非致命错误) 。类似 **E_WARNING**，但是是由PHP引擎核心产生的。 |
| 64 | **E_COMPILE_ERROR** (integer) | 致命编译时错误。类似**E_ERROR**, 但是是由Zend脚本引擎产生的。 |
| 128 | **E_COMPILE_WARNING** (integer) | 编译时警告 (非致命错误)。类似 **E_WARNING**，但是是由Zend脚本引擎产生的。 |
| 256 | **E_USER_ERROR** (integer) | 用户产生的错误信息。类似 **E_ERROR**, 但是是由用户自己在代码中使用PHP函数 trigger_error()来产生的。 |
| 512 | **E_USER_WARNING** (integer) | 用户产生的警告信息。类似 **E_WARNING**, 但是是由用户自己在代码中使用PHP函数 trigger_error()来产生的。 |
| 1024 | **E_USER_NOTICE** (integer) | 用户产生的通知信息。类似 **E_NOTICE**, 但是是由用户自己在代码中使用PHP函数 trigger_error()来产生的。 |
| 2048 | **E_STRICT** (integer) | 启用 PHP 对代码的修改建议，以确保代码具有最佳的互操作性和向前兼容性。 |
| 4096 | **E_RECOVERABLE_ERROR** (integer) | 可被捕捉的致命错误。 它表示发生了一个可能非常危险的错误，但是还没有导致PHP引擎处于不稳定的状态。 如果该错误没有被用户自定义句柄捕获 (参见 set_error_handler())，将成为一个 **E_ERROR**　从而脚本会终止运行。 |
| 8192 | **E_DEPRECATED** (integer) | 运行时通知。启用后将会对在未来版本中可能无法正常工作的代码给出警告。 |
| 16384 | **E_USER_DEPRECATED** (integer) | 用户产少的警告信息。 类似 **E_DEPRECATED**, 但是是由用户自己在代码中使用PHP函数 trigger_error()来产生的。 |
| 30719 | **E_ALL** (integer) | **E_STRICT**出外的所有错误和警告信息。 |

上面的值（数值或者符号）用于建立一个二

## 例子
任意数目的以上选项都可以用“或”来连接（用 OR 或 |），这样可以报告所有需要的各级别错误。例如，下面的代码关闭了用户自定义的错误和警告，执行了某些操作，然后恢复到原始的报错级别：
```shell
<?php
//禁用错误报告
error_reporting(0);
//报告运行时错误
error_reporting(E_ERROR | E_WARNING | E_PARSE);
//报告所有错误
error_reporting(E_ALL);
?>
```

