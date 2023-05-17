# 其他服务 - 网络函数(network)

# **介绍**

预定义的网络函数

# **安装**

无需安装 函数 `checkdnsrr()`, `getmxrr()` 和 `dns_get_record()` 需要基于 Linux 运行

# **日志**

### openlog

```
bool openlog ( string $ident , int $option , int $facility )
     为一个程序打开一个系统日志的链接

```

### syslog

```
bool syslog ( int $priority , string $message )
     生成系统日志信息, 存储到系统日志

```

### closelog

```
bool closelog ( void )
关闭和系统日志的链接

```

# **sock**

### fsockopen

```
resource fsockopen ( string $hostname [, int $port = -1 [, int &$errno [, string &$errstr [, float $timeout = ini_get("default_socket_timeout") ]]]] )
打开internet/ unix域的套接层链接

```

### pfsockopen

```
resource pfsockopen ( string $hostname [, int $port = -1 [, int &$errno [, string &$errstr [, float $timeout = ini_get("default_socket_timeout") ]]]] )
     打开持续的 socket 链接

```

# **域名解析相关**

### checkdnsrr

```
/**
 * $host 主机名/IP地址
 */
bool checkdnsrr ( string $host [, string $type = "MX" ] )
[alias] dns_check_record
[5.3]支持windows平台
检测是否有指定的dns记录, 只是检查

```

### dns_get_record

```
array dns_get_record ( string $hostname [, int $type = DNS_ANY [, array &$authns [, array &$addtl [, bool &$raw = false ]]]] )
给定的主机名的DNS记录

Array
(
    [0] => Array
        (
            [host] => sour-lemon.com
            [class] => IN
            [ttl] => 752
            [type] => SOA
            [mname] => f1g1ns1.dnspod.net
            [rname] => freednsadmin.dnspod.com
            [serial] => 1474983140
            [refresh] => 3600
            [retry] => 180
            [expire] => 1209600
            [minimum-ttl] => 180
        )
    [1] => Array
        (
            [host] => sour-lemon.com
            [class] => IN
            [ttl] => 752
            [type] => TXT
            [txt] => v=spf1 include:spf.mxhichina.com -all
            [entries] => Array
                (
                    [0] => v=spf1 include:spf.mxhichina.com -all
                )
        )
    [2] => Array
        (
            [host] => sour-lemon.com
            [class] => IN
            [ttl] => 752
            [type] => MX
            [pri] => 10
            [target] => mxw.mxhichina.com
        )
    [3] => Array
        (
            [host] => sour-lemon.com
            [class] => IN
            [ttl] => 752
            [type] => MX
            [pri] => 5
            [target] => mxn.mxhichina.com
        )
    [6] => Array
        (
            [host] => sour-lemon.com
            [class] => IN
            [ttl] => 108002
            [type] => NS
            [target] => f1g1ns2.dnspod.net
        )
)

```

### gethostname

```
string gethostname ( void )
     获取本机的主机名

```

### gethostbyaddr

```
string gethostbyaddr ( string $ip_address )
     根据指定的地址获取主机名

```

### getmxrr

```
bool getmxrr ( string $hostname , array &$mxhosts [, array &$weight ] )
[5.3]支持windows平台
[alias] dns_get_mx
根据指定的主机名/IP获取mx记录

// code
getmxrr('sour-lemon.com', $mx);
print_r($mx);
Array
(
    [0] => mxw.mxhichina.com
    [1] => mxn.mxhichina.com
)

```

### gethostbyname

```
string gethostbyname ( string $hostname )
     根据指定的主机名称获取IP地址

```

### gethostbynamel

```
array gethostbynamel ( string $hostname )
     根据主机名称获取一系列的IP列表

```

### getprotobyname

根据协议名称获取协议码

```
int getprotobyname ( string $name )
     根据协议的名称获取协议的数字标识

// code
$arr=array("ip","icmp","ggp","tcp","egp","pup","udp","hmp","xns-idp","rdp","rvd" );
//Reads the names of protocols into an array..
for($i=0; $i<11; $i++) {
     $proname=$arr[$i];
     echo $proname .":", getprotobyname ($proname)."<br />";
}

此函数使用http和ftp测试过,没出来端口号,http和ftp算是服务,不是协议,使用getserverbyname来显示
$services = array('http', 'ftp', 'ssh', 'telnet', 'imap', 'smtp', 'nicname', 'gopher', 'finger','pop3', 'www');

foreach ($services as $service) {
     $port = getservbyname($service, 'tcp');
     echo $service . ": " . $port . "<br />\n";
}

```

### getprotobynumber

```
string getprotobynumber ( int $number )
     根据协议的数字获取协议的名称

```

### getservbyname()

```
int getservbyname ( string $service , string $protocol )
     获取协议的端口号

```

### getservbyport

根据端口号获取服务名称

```
string getservbyport ( int $port , string $protocol )
     根据端口号获取协议的名称
// code
getservbyport(80, 'tcp')   // http

```

# **IP转换**

### ip2long

```
int ip2long ( string $ip_address )
     转换IPV4 地址 -> 整形表示的地址

```

### long2ip()

```
string long2ip ( string $proper_address )
     把整形地址转换为 -> IPV4地址

```

### inet_ntop

```
string inet_ntop ( string $in_addr )
     [5.3]支持windows平台
     转换 packed internet 地址 -> 人类可读的地址

```

### inet_pton

```
string inet_pton ( string $address )
     [5.3]支持windows平台
     转换人类可读的IP地址 -> packed 地址

```

# **Header 头处理函数**

### header_register_callback

```
bool header_register_callback ( callable $callback )
     注册头部处理时间的函数, 当PHP开始输出内容的时候调用这个函数

```

### header_remove

```
void header_remove ([ string $name ] )
     [5.3]支持windows平台
     移除http header

```

### header

```
void header ( string $string [, bool $replace = true [, int $http_response_code ]] )
     header() 用来发送 raw http header
     http://www.faqs.org/rfcs/rfc2616, header 必须在任何输出前调用

```

### headers_list

```
array headers_list ( void )
     返回一系列的相应头部
     返回将要发送到浏览器的所有的头部的列表

```

### headers_sent

```
bool headers_sent ([ string &$file [, int &$line ]] )
     检测头部是否被发送, 当头部被送出之后你将无法使用header() 函数来修改http头部

```

### http_response_code

```
int http_response_code ([ int $response_code ] )
     [5.4.0] 设置或者获取http相应码

```

### setcookie

```
bool setcookie ( string $name [, string $value [, int $expire = 0 [, string $path [, string $domain [, bool $secure = false [, bool $httponly = false ]]]]]] )
     设置cookie
     $name       名称
     $value      设置值
     $expire     过期时间的unix时间戳
     $path       路径, 默认是 '/'
     $domain     域名,对于老的浏览器, 最好是 'testdomain.com.', 末尾加上个 '.'
     $secure     是否安全链接
     $httponly   是否只是http可用

```

### setrawcookie

```
bool setrawcookie ( string $name [, string $value [, int $expire = 0 [, string $path [, string $domain [, bool $secure = false [, bool $httponly = false ]]]]]] )
     设置未 urlencoding 的cookie

```

# **socket**

### socket_get_status

```
socket_get_status
    [see] stream_get_meta_data

```

### socket_set_blocking

```
socket_set_blocking
    [see] stream_set_blocking

```

### socket_set_timeout

```
socket_set_timeout
    [see] stream_set_timeout

```