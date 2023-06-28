# 输出控制

php 脚本有输出的时候, 输出控制函数可用这些来控制输出, 这在多种不清情况中非常有用, 尤其是用来在脚本开始输出数据后,发送 http 头信息到浏览器. 输出控制看书,不影响由 header()或 setcookie()发送的文件头信息, 仅仅影响 echo 这样的函数和 PHP 代码块间的数据

## 配置

`output_buffering int` (默认 “0”)

PHP_INI_PERDIR     如果开启,将在所有脚本中开启缓存输出, 如果控制输出缓冲区的最大值, 可以讲该选项设定为缓存的最大字节数

在 PHP-CLI 模式下,总是 Off

php-cli 简介——不会 shell 语言，一样用 shell！

`output_handler string` (默认:Null)

PHP_INI_PERDIR     可将所有的脚本输出,重定向到一个函数,这里设置的函数将自动的处理输出缓冲, 这里填写的只能是内置函数

不能同时使用 mb_output_handler() 和 ob_iconv_handler()，也不能同时使用 ob_gzhandler() 和 zlib.output_compression。

`implicit_flush boolean` (默认: 0)

PHP_INI_ALL     默认关闭,开启的时候讲自动输出信息块, 等同于使用 echo()函数后使用 flush()输出

不在 web 中编程的时候, 开启将极大影响性能, cli,sapi 执行下, 默认为 true;

## 函数

`bool ob_start ([ callback $output_callback [, int $chunk_size [, bool $erase ]]] )`

缓存输出开始函数,并且可以传递一个函数作为缓冲处理函数

```
 $output_callback  指定输出的函数的名称,该函数可以使用系统自带的 ob_gzhandler, 此函数把一个字符串当作参数并返回一个字符串
 $chunk_size       指定大于这个大小之后的每次输出均被指定的缓冲函数处理
 $erase            默认为 true, 调用完成后删除缓冲, 如果指定为 false, 则在脚本完成之后删除缓冲
```

! https://file.wulicode.com/note/2021/11-11/15-56-11856.png 

`void flush ( void )`

刷新输出缓冲, 该函数将当前为止程序的所有输出发送到用户的浏览器

flush() 函数不会对服务器或客户端浏览器的缓存模式产生影响。因此，必须同时使用 ob_flush() 和 flush() 函数来刷新输出缓冲

在 php 5.3.13 中, 默认是开启缓存的, 所以使用 ob_get_level()会获取到 1 的值,同样的是, 直接使用 flush()函数不会输出也是因为会有缓冲

! https://file.wulicode.com/note/2021/11-11/15-56-21870.png 

`void ob_clean ( void )`

清空缓冲区的内容

`bool ob_end_clean ( void )`

清空并缓冲区内容并关闭这个缓冲区

`bool ob_end_flush ( void )`

关闭缓存, 并且输出

`void ob_flush ( void )`

送出缓冲区内容

`string ob_get_clean ( void )`

获取缓冲区内容并且清除掉缓冲

`string ob_get_contents ( void )`

获取缓存区内容但是不会清除

`string ob_get_flush ( void )`

获取缓存区内容并且输出

`int ob_get_length ( void )`

获取当前缓冲区的长度

等同于 strlen(ob_get_contents())

`int ob_get_level ( void )`

! https://file.wulicode.com/note/2021/11-11/15-56-36274.png 

返回当前缓存的级别

在 php5.3.13 中, 直接执行本函数则返回一个 1 的数值

`array ob_get_status ([ bool$full_status = FALSE ] )`

获取当前缓冲区的状态,如果指定为 true, 则返回所有缓冲区的状态

获取到的数组

```
[level] => 1                         级别
[type] => 1
      PHP_OUTPUT_HANDLER_INTERNAL (0)
      PHP_OUTPUT_HANDLER_USER (1)
[status] => 0
      PHP_OUTPUT_HANDLER_START (0)
      PHP_OUTPUT_HANDLER_CONT (1)
      PHP_OUTPUT_HANDLER_END (2)
[name] => default output handler
      起作用的缓冲器的名称
[del] => 1
      ob_start()设定的清除标志
```

`string ob_gzhandler ( string $buffer , int $mode )`

使用 ob_start 调用的默认的处理函数

以方便将 gz 编码的数据发送到支持压缩页面的浏览器

本函数 需要 zlib 扩展

`void ob_implicit_flush ([ int $flag = true ] )`

打开绝对刷送, 在调用本函数的时候确定关闭了 PHP 自带的缓冲机制,否则等待 PHP 的缓冲区满, 不然不会产生新的输送的.

这里不会调用 flush()函数的也会显示输出值, 和 flush() 函数介绍的有相同的含义

```php
ob_implicit_flush();
ob_end_flush();
$i = 0;
while (true) {
    echo 'Now Index is :' . $i++ . '<br>';
    sleep(1);
}
```

`array ob_list_handlers ( void )`

列出使用中的输出处理程序, php 默认已经开启了缓存

这里返回的将是包含了 ob_gzhandler 和 default output handler 的数组.

```php
ob_start("ob_gzhandler");
echo '<code style="white-space: pre-wrap">';
var_dump(ob_list_handlers());
echo '</code>';
ob_end_flush();
```

```
array(2) {
  [0]=>
  string(22) "default output handler"
  [1]=>
  string(12) "ob_gzhandler"
}
```

`bool output_add_rewrite_var ( string $name , string $value )`

添加 url 重写器的值

这里的 名称 / 值 对 将被以 get 的方式添加到 url 中, 或者添加到 form 中的隐藏域中

当透明 URL 重写用 session.use_trans_sid 开启时同样可以添加到 session ID

要注意，绝对 URL(http://example.com/..)不能被重写。

此函数的行为由 url_rewriter.tags php.ini 参数控制。

`bool output_reset_rewrite_vars ( void )`

此函数重置 URL 重写器，移除所有的先前由 output_add_rewrite_var()函数设置的重写变量

## 扩展

[输出控制 → 实时输出内容](https://www.notion.so/c3a491eece264fc6aaac832ff04f74cd)