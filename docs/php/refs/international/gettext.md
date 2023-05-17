# 国际化与字符编码支持 - Gettext

这个函数继承了 本地语言支持 , 能管理PHP应用 扩展阅读: http://www.gnu.org/software/gettext/manual/gettext.html

## 安装

为了使用这个, 你必须安装 gettext包

## 配置

无

## 函数

`string bind_textdomain_codeset ( string $domain , string $codeset )`

指定作用域的字符集 - $domain 作用域 - $codeset 字符编码

`string bindtextdomain ( string $domain , string $directory )`

设置文本作用域的目录

`string dcgettext ( string $domain , string $message , int $category )`

允许小范围的重写作用域

`string dcngettext ( string $domain , string $msgid1 , string $msgid2 , int $n , int $category )`

gettext 函数的复数版本

`string dgettext ( string $domain , string $message )`

在当前域中重写信息

`string dngettext ( string $domain , string $msgid1 , string $msgid2 , int $n )`

dgettext 函数的复数版本

`string gettext ( string $message )`

当前域中寻找信息

`string ngettext ( string $msgid1 , string $msgid2 , int $n )`

gettext函数的复数版本

`string textdomain ( string $text_domain )`

设置默认的作用域

参考文档: http://developer.51cto.com/art/200901/107174.htm 参考源码: oschina-> mark sample->character->gettext 参考软件: PoEdit - 语言编辑工具