# 其它服务 - cURL

PHP支持的由Daniel Stenberg创建的libcurl库允许你与各种的服务器使用各种类型的协议进行连接和通讯。libcurl目前支持http、https、ftp、gopher、telnet、dict、file和ldap协议。libcurl同时也支持HTTPS认证、HTTP POST、HTTP PUT、 FTP 上传(这个也能通过PHP的FTP扩展完成)、HTTP 基于表单的上传、代理、cookies和用户名+密码的认证。

## 安装

win: 开启curl扩展

## 配置

`curl.cainfo` string

[PHP 5.3.7]CURLOPT_CAINFO 选项的默认值, 这里需要绝对位置

## 函数

`void curl_close ( resource $ch )`

关闭一个cURL会话并且释放所有资源。cURL句柄ch 也会被释放

`resource curl_copy_handle ( resource $ch )`

复制一个cURL句柄并保持相同的选项

`int curl_errno ( resource $ch )`

返回最后一次cURL操作的错误号

`string curl_error ( resource $ch )`

返回一条最近一次cURL操作明确的文本的错误信息

`mixed curl_exec ( resource $ch )`

执行给定的cURL会话。 这个函数应该在初始化一个cURL会话并且全部的选项都被设置后被调用

`mixed curl_getinfo ( resource $ch [, int $opt = 0 ] )`

获取最后一次传输的相关信息 * CURLINFO_EFFECTIVE_URL - 最后一个有效的URL地址
* CURLINFO_HTTP_CODE - 最后一个收到的HTTP代码
* CURLINFO_FILETIME - 远程获取文档的时间，如果无法获取，则返回值为“-1”
* CURLINFO_TOTAL_TIME - 最后一次传输所消耗的时间
* CURLINFO_NAMELOOKUP_TIME - 名称解析所消耗的时间
* CURLINFO_CONNECT_TIME - 建立连接所消耗的时间
* CURLINFO_PRETRANSFER_TIME - 从建立连接到准备传输所使用的时间
* CURLINFO_STARTTRANSFER_TIME - 从建立连接到传输开始所使用的时间
* CURLINFO_REDIRECT_TIME - 在事务传输开始前重定向所使用的时间
* CURLINFO_SIZE_UPLOAD - 上传数据量的总值
* CURLINFO_SIZE_DOWNLOAD - 下载数据量的总值
* CURLINFO_SPEED_DOWNLOAD - 平均下载速度
* CURLINFO_SPEED_UPLOAD - 平均上传速度
* CURLINFO_HEADER_SIZE - header部分的大小
* CURLINFO_HEADER_OUT - 发送请求的字符串
* CURLINFO_REQUEST_SIZE - 在HTTP请求中有问题的请求的大小
* CURLINFO_SSL_VERIFYRESULT - 通过设置CURLOPT_SSL_VERIFYPEER返回的SSL证书验证请求的结果
* CURLINFO_CONTENT_LENGTH_DOWNLOAD - 从Content-Length: field中读取的下载内容长度
* CURLINFO_CONTENT_LENGTH_UPLOAD - 上传内容大小的说明
* CURLINFO_CONTENT_TYPE - 下载内容的Content-Type:值，NULL表示服务器没有发送有效的Content-Type: header

`resource curl_init ([ string $url = NULL ] )`

初始化一个新的会话

`int curl_multi_add_handle ( resource $mh , resource $ch )`

向curl批处理会话中添加单独的curl句柄

`void curl_multi_close ( resource $mh )`

关闭一组cURL句柄。

`int curl_multi_exec ( resource $mh , int &$still_running )`

处理在栈中的多个句柄。 这个方法可以在需要读写数据时被调用。

`string curl_multi_getcontent ( resource $ch )`

如果CURLOPT_RETURNTRANSFER作为一个选项被设置到一个具体的句柄，那么这个函数将会以字符串的形式返回那个cURL句柄获取的内容。

`array curl_multi_info_read ( resource $mh [, int &$msgs_in_queue = NULL ] )`

获取当前解析的cURL的相关传输信息, 查询批处理句柄是否单独的传输线程中有消息或信息返回。消息可能包含诸如从单独的传输线程返回的错误码或者只是传输线程有没有完成之类的报告。

`resource curl_multi_init ( void )`

允许并行地处理批处理cURL句柄。

`int curl_multi_remove_handle ( resource $mh , resource $ch )`

移除curl批处理句柄资源中的某个句柄资源

`int curl_multi_select ( resource $mh [, float $timeout = 1.0 ] )`

阻塞直到cURL批处理连接中有活动连接。

`bool curl_setopt_array ( resource $ch , array $options )`

为cURL传输会话批量设置选项。这个函数对于需要设置大量的cURL选项是非常有用的，不需要重复地调用curl_setopt()。

`bool curl_setopt ( resource $ch , int $option , mixed $value )`

为给定的cURL会话句柄设置一个选项

`array curl_version ([ int $age = CURLVERSION_NOW ] )`

返回关于cURL的版本信息