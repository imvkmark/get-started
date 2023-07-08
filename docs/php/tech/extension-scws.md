# scws - 中文分词扩展

::: danger

此项目最后更新于 2016, 不推荐使用

:::

- **SCWS：** 1.2.3，[下载](http://www.xunsearch.com/scws/download.php)
- **XDB字典：** [下载](http://www.xunsearch.com/scws/download.php)

## 在 ubuntu 安装 scws

- 取得 scws的代码 && 解压

最新下载地址从 [这里](http://www.xunsearch.com/scws/download.php) 获取

```
$ wget http://www.xunsearch.com/scws/down/scws-1.2.3.tar.bz2
$ tar xvjf scws-1.2.3.tar.bz2
$ cd scws-1.2.3/
```

- 进入目录执行配置脚本和编译

```
$ ./configure --prefix=/usr/local/scws
$ make
# 非 root 无法安装到指定目录
$ sudo make install
```

这里和通用的 GNU 软件安装方式一样，具体选项参数执行 `./configure --help` 查看。

常用选项为：`--prefix=<scws的安装目录>`

顺利的话已经编译并安装成功到 `/usr/local/scws` 中了，执行下面命令看看文件是否存在

```
$ ls -al /usr/local/scws/lib/libscws.la
-rwxr-xr-x 1 root root 919  9月 29 09:36 /usr/local/scws/lib/libscws.la
```

- 试试执行 scws-cli 文件

```
$ /usr/local/scws/bin/scws -h
scws (scws-cli/1.2.3)
Simple Chinese Word Segmentation - Command line usage.
Copyright (C)2007 by hightman.
...
```

- 用 wget 下载并解压词典，或从主页下载然后自行解压再将 `*.xdb` 放入 `/usr/local/scws/etc` 目录中

```
$ cd /usr/local/scws/etc
$ sudo wget http://www.xunsearch.com/scws/down/scws-dict-chs-gbk.tar.bz2
$ sudo wget http://www.xunsearch.com/scws/down/scws-dict-chs-utf8.tar.bz2
$ sudo tar xvjf scws-dict-chs-gbk.tar.bz2
$ sudo tar xvjf scws-dict-chs-utf8.tar.bz2
# 更改用户组
$ sudo chown root:root dict.utf8.xdb
$ sudo chown root:root dict.xdb
```

- 写个小程序测试一下(本人未成功～)

**写入测试程序**

```
$ cat > test.c
#include <scws.h>
#include <stdio.h>
main() {
    scws_t s;
    s = scws_new();
    scws_free(s);
    printf("test ok!\n");
}
```

**编译测试程序**

```
$ gcc -o test -I/usr/local/scws/include -L/usr/local/scws/lib test.c -lscws -Wl,--rpath -Wl,/usr/local/scws/lib
./test
```

这样就好顺利安装完毕可以使用 libscws 这套 C-API 了

## For Mac / Linux

> 请注意，我的系统是Mac OS X

假设你已经下载好了上面的软件。

**第一步：编译和安装**

```
# 解压
$ tar -xvf scws-1.2.3.tar.bz2
# 切换目录
$ cd scws-1.2.3
# 编译和安装 scws
# --preifx=[安装路径]
$ ./configure --prefix=/usr/local/Cellar/scws
$ make
$ make install
# 编译和安装 php-scws
# php 目录 /usr/local/Cellar/php70/7.0.12_5/bin
$ cd phpext
$ phpize
$ ./configure --with-scws=/usr/local/Cellar/scws --with-php-config=/usr/local/Cellar/php70/7.0.12_5/bin/php-config
$ make
$ make install
# 输出
Installing shared extensions:  /usr/local/Cellar/php70/7.0.12_5/lib/php/extensions/no-debug-non-zts-20151012/
```

这说明 php-scws 扩展被安装到了这个目录路径下。然后启用这个 PHP 模块：

```
# 两种方法：
# 1.直接在 php.ini 中配置；2.写成单独的配置文件（前提是启用了加载附加 .ini 配置文件这个功能）
# 配置内容都一样：
[scws]
extension = "/usr/local/Cellar/php70/7.0.12_5/lib/php/extensions/no-debug-non-zts-20151012/scws.so"
scws.default.charset=utf-8
scws.default.fpath=/usr/local/Cellar/scws/etc
```

> **解释一下：**
> extension: 模块链接库路径
> scws.default.charset：scws 模块执行时默认编码集
> scws.default.fpath： scws 配置文件路径/词典路径

重启PHP，看看模块是否加载成功：

```
$ php -m | grep scws
# 输出
scws
```

**第二步：词库**

```
# 解压词库
$ tar -xvf scws-dict-chs-utf8.tar.bz2
# 将词库移动至安装 scws 的 etc 目录下：
$ mv dict.utf8.xdb /usr/local/Cellar/scws/etc
```

### 测试安装是否成功

```
<?php
header('Content-type: text/html; charset=utf-8');
if (extension_loaded('scws')) {
    $module = 'scws';
    $funcs  = get_extension_funcs($module);
    echo "模块包含以下函数：\n";
    echo "---------------------------------------\n";
    print_r($funcs);
    echo "---------------------------------------\n";
    echo "模块版本：\n";
    echo scws_version();
} else {
    echo '模块未找到！<br>';
}
```

输出：

```
模块包含以下函数：
---------------------------------------
Array
(
    [0] => scws_open
    [1] => scws_new
    [2] => scws_close
    [3] => scws_set_charset
    [4] => scws_add_dict
    [5] => scws_set_dict
    [6] => scws_set_rule
    [7] => scws_set_ignore
    [8] => scws_set_multi
    [9] => scws_set_duality
    [10] => scws_send_text
    [11] => scws_get_result
    [12] => scws_get_tops
    [13] => scws_has_word
    [14] => scws_get_words
    [15] => scws_version
)
---------------------------------------
模块版本：
SCWS (Module version:0.2.2, Library version:1.2.2) - by hightman%
```

## 使用 PHP 编译这个扩展

如果您需要在 php 中调用分词，建议继续阅读本文安装 php 扩展，否则可跳过不看。

假设您已经将 scws 按上述步骤安装到 /usr/local/scws 中。

安装此扩展要求您的 php 和系统环境安装了相应的 `autoconf` `automake` 工具及 `phpize` 。

进入源码目录的 `phpext/` 目录

```
cd ~/scws-1.2.3/phpext/
```

执行 `phpize` （在PHP安装目录的`bin/`目录下）

执行 `./configure --with-scws=/usr/local/scws`, 若 php 安装在特殊目录 `$php_prefix`, 则请在 `configure`
后加上 `--with-php-config=$php_prefix/bin/php-config`

执行 `make` 然后用 `root`身份执行 `make install`

5. 让PHP 加入以下配置, 某些系统配置不同, 按照需要的结构进行配置

```
[scws]
;
; 注意请检查 php.ini 中的 extension_dir 的设定值是否正确, 否则请将 extension_dir 设为空，
; 再把 extension = scws.so 指定绝对路径。
;
extension = scws.so
scws.default.charset = gbk
scws.default.fpath = /usr/local/scws/etc
```

命令行下执行 `php -m` 就能看到 scws 了或者在 `phpinfo()` 中看看关于 scws 的部分，记得要重启 web 服务器

才能使新的 `php.ini` 生效。

这样就算安装完成了，余下的工作只是PHP代码编写问题了。

关于 PHP 扩展的使用说明请参看代码中 `phpext/README.md` 文件或其它文档。

![](https://file.wulicode.com/yuque/202211/01/08/35111zKdtGKk.png?x-oss-process=image/resize,h_284)

## SCWS 自带函数详解

### mixed scws_new(void)

**功能：** 创建并返回一个 `SimpleCWS` 类操作对象。

**返回值：** 成功返回类操作句柄，失败返回 false。


### mixed scws_open(void)

**功能：** 创建并返回一个分词操作句柄。

**返回值：** 成功返回 scws 操作句柄，失败返回 false。


### bool scws_close(resource scws_handle)

**功能：** 关闭一个已打开的 scws 分词操作句柄。

**参数：** `scws_handle` 即之前由 scws_open 打开的返回值。

**返回值：** 始终为 true


### bool scws_set_charset(resource scws_handle, string charset)

**功能：** 设定分词词典、规则集、欲分文本字符串的字符集。

**参数：** `charset` 要新设定的字符集，只支持 utf8 和 gbk。（默认为 gbk，utf8不要写成utf-8）。

**返回值：** 始终为 true


### bool scws_add_dict(resource scws_handle, string dict_path [, int mode])

**功能：** 添加分词所用的词典，新加入的优先查找。

**参数：** `dict_path` 词典的路径，可以是相对路径或完全路径（遵循安全模式下的 open_basedir）。

**参数：** `mode` 可选，表示加载的方式，其值有：

```
- SCWS_XDICT_TXT  表示要读取的词典文件是文本格式，可以和后2项结合用
- SCWS_XDICT_XDB  表示直接读取 xdb 文件（此为默认值）
- SCWS_XDICT_MEM  表示将 xdb 文件全部加载到内存中，以 XTree 结构存放，可用异或结合另外2个使用。
```

**返回值：** 成功返回 true 失败返回 false


### bool scws_set_dict(resource scws_handle, string dict_path [, int mode])

**功能：** 设定分词所用的词典并清除已存在的词典列表

**参数：** `dict_path` 词典的路径，可以是相对路径或完全路径（遵循安全模式下的 open_basedir）。

**参数：** `mode` 可选，表示加载的方式。参见 `scws_add_dict`

**返回值：** 成功返回 true 失败返回 false


### bool scws_set_rule(resource scws_handle, string rule_path)

**功能：** 设定分词所用的新词识别规则集（用于人名、地名、数字时间年代等识别）。

**参数：** `rule_path` 规则集的路径，可以是相对路径或完全路径（遵循安全模式下的 open_basedir）。

**参数：** `mode` 表示加载的方式。参见 `scws_add_dict`

**返回值：** 成功返回 true 失败返回 false


### bool scws_set_ignore(resource scws_handle, bool yes)

**功能：** 设定分词返回结果时是否去除一些特殊的标点符号之类。

**参数：** `yes` 如果为 true 则结果中不返回标点符号，如果为 false 则会返回，缺省为 false。

**返回值：** 始终为 true


### bool scws_set_multi(resource scws_handle, int mode)

**功能：** 设定分词返回结果时是否复式分割，如“中国人”返回“中国＋人＋中国人”三个词。

**参数：** `mode` 复合分词法的级别，缺省不复合分词。取值由下面几个常量异或组合（也可用 1-15 来表示）：

```
- SCWS_MULTI_SHORT   (1)短词
- SCWS_MULTI_DUALITY (2)二元（将相邻的2个单字组合成一个词）
- SCWS_MULTI_ZMAIN   (4)重要单字
- SCWS_MULTI_ZALL    (8)全部单字
```

**返回值：** 始终为 true


### bool scws_set_duality(resource scws_handle, bool yes)

**功能：** 设定是否将闲散文字自动以二字分词法聚合

**参数：** `yes` 设定值，如果为 true 则结果中多个单字会自动按二分法聚分，如果为 false 则不处理，缺省为 false。

**返回值：** 始终为 true


### bool scws_send_text(resource scws_handle, string text)

**功能：** 发送设定分词所要切割的文本。

**参数：** `text` 要切分的文本的内容。

**返回值：** 成功返回 true 失败返回 false

**注意：** 系统底层处理方式为对该文本增加一个引用，故不论多长的文本并不会造成内存浪费；执行本函数时，若未加载任何词典和规则集，则会自动试图在
ini 指定的缺省目录下查找缺省字符集的词典和规则集。


### mixed scws_get_result(resource scws_handle)

**功能：** 根据 send_text 设定的文本内容，返回一系列切好的词汇。

**返回值：** 成功返回切好的词汇组成的数组，若无更多词汇，返回 false。返回的词汇包含的键值如下：

```
- word  string      词本身
- idf   float       逆文本词频
- off   int         该词在原文本路的位置
- attr  string      词性
```

**注意：** 每次切词后本函数应该循环调用，直到返回 false 为止，因为程序每次返回的词数是不确定的。


### mixed scws_get_tops(resource scws_handle [, int limit [, string attr]])

**功能：** 根据 send_text 设定的文本内容，返回系统计算出来的最关键词汇列表。

**参数：** `limit` 可选参数，返回的词的最大数量，缺省是 10 。

**参数：** `attr` 可选参数，是一系列词性组成的字符串，各词性之间以半角的逗号隔开，这表示返回的词性必须在列表中，如果以~
开头，则表示取反，词性必须不在列表中，缺省为NULL，返回全部词性，不过滤。

**返回值：** 成功返回统计好的的词汇组成的数组，返回 false。返回的词汇包含的键值如下：

```
- word    string    词本身
- times   int       词在文本中出现的次数
- weight  float     该词计算后的权重
- attr    string    词性
```


### mixed scws_get_words(resource scws_handle, string attr)

**功能：** 根据 send_text 设定的文本内容，返回系统中词性符合要求的关键词汇。

**参数：** `attr` 是一系列词性组成的字符串，各词性之间以半角的逗号隔开，这表示返回的词性必须在列表中，如果以~
开头，则表示取反，词性必须不在列表中，若为空则返回全部词。

**返回值：** 成功返回符合要求词汇组成的数组，返回 false。返回的词汇包含的键值参见 `scws_get_result`


### bool scws_has_word(resource scws_handle, string attr)

**功能：** 根据 send_text 设定的文本内容，返回系统中是否包括符合词性要求的关键词。

**参数：** `attr` 是一系列词性组成的字符串，各词性之间以半角的逗号隔开，这表示返回的词性必须在列表中，如果以~
开头，则表示取反，词性必须不在列表中，若为空则返回全部词。

**返回值：** 如果有则返回 true，没有就返回 false。


### string scws_version(void)

**功能：** 返回 scws 版本号名称信息（字符串）。

**返回值：** 返回string，scws 版本号名称信息。


## 测试分词功能

```
<?php
echo "开始测试分词：\n";
echo "------------------------------------------------\n";
// 记录开始时间
$starttime = microtime(true);
// 开始分词
$keyword = <<<EOF
陈凯歌并不是《无极》的唯一著作权人，一部电影的整体版权归电影制片厂所有。
一部电影的作者包括导演、摄影、编剧等创作人员，这些创作人员对他们的创作是有版权的。不经过制片人授权，其他人不能对电影做拷贝、发行、反映，不能通过网络来传播，既不能把电影改编成小说、连环画等其他艺术形式发表，也不能把一部几个小时才能放完的电影改编成半个小时就能放完的短片。
著作权和版权在我国是同一个概念，是法律赋予作品创作者的专有权利。所谓专有权利就是没有经过权利人许可又不是法律规定的例外，要使用这个作品，就必须经过作者授权，没有授权就是侵权。
一九八零年春天
EOF;
```

```
$cws = scws_open();
// 设置分词编码
scws_set_charset($cws, "utf8");
// 设置分词所用字典
scws_set_dict($cws, ini_get('scws.default.fpath') . '/dict.utf8.xdb');
// 设定分词所用的识别规则集
scws_set_rule($cws, ini_get('scws.default.fpath') . '/rules.utf8.ini');
// 发送要分割的字符串
scws_send_text($cws, $keyword);
// 设定分词返回结果时是否去除一些特殊的标点符号之类
scws_set_ignore($cws, true);
// 设定分词返回结果时是否复式分割，如“中国人”返回“中国＋人＋中国人”三个词
// scws_set_multi($cws, false);
// 散文字自动以二字分词法聚合
scws_set_duality($cws, true);
echo "\n最关键词汇列表\n";
echo "-------------------------------------------------------------\n";
echo "No. 关键词                       Attr     Weight(times)\n";
echo "-------------------------------------------------------------\n";
$list = scws_get_tops($cws, 20, '');
$number = 1;
foreach ($list as $value) {
    printf("%02d. %s \t\t\t %s \t  %.2f(%d)\n",
        $number, $value['word'], $value['attr'], $value['weight'], $value['times']);
    $number++;
}
echo "-------------------------------------------------------------\n";
echo "\n返回切好的词汇\n";
echo "-------------------------------------------------------------\n";
while ($result = scws_get_result($cws)) {
    foreach ($result as $value) {
        if ($value['len'] == 1 && $value['word'] == "\r")
            continue;
        if ($value['len'] == 1 && $value['word'] == "\n")
            echo $value['word'];
        else
            printf("%s：%s  ", $value['word'], $value['attr']);
    }
}
scws_close($cws);
// 对于分词返回结果去除特殊标点符号
// scws_set_ignore($cws, true);
// 对于分词结果是否复试分割
// scws_set_multi($cws, SCWS_MULTI_ZMAIN);
```

```
$endtime = microtime(true);
// 执行时间
echo "\n-------------------------------------------------------------\n\n";
echo '脚本执行了：'.bcsub($endtime, $starttime,  6)."秒";
echo "\n\n";
```

输出：

```
开始测试分词：
------------------------------------------------
最关键词汇列表
-------------------------------------------------------------
No. 关键词                       Attr     Weight(times)
-------------------------------------------------------------
01\. 电影                         n        25.02(6)
02\. 不能                         v        19.08(4)
03\. 经过                         v        14.82(3)
04\. 创作                         vn       14.82(3)
05\. 授权                         v        14.79(3)
06\. 版权                         n        14.76(3)
07\. 专有                         vn       13.94(2)
08\. 陈凯歌                       nr       11.87(1)
09\. 改编                         v        11.82(2)
10\. 一九八零年                   t        10.72(1)
11\. 无极                         ns       10.02(1)
12\. 权利                         n        9.88(2)
13\. 小时                         n        9.68(2)
14\. 人员                         n        9.60(2)
15\. 就是                         n        9.52(2)
16\. 不是                         v        9.48(2)
17\. 法律                         n        9.32(2)
18\. 没有                         v        9.30(2)
19\. 作者                         n        9.18(2)
20\. 作品                         n        9.12(2)
-------------------------------------------------------------
返回切好的词汇
-------------------------------------------------------------
陈凯歌：nr  并：c  不是：v  无极：ns  的：uj  唯一：b  著作权人：n  一部：n  部：n  电影：n  的：uj  整体：n  版权：n  归：v  电影：n  制片厂：n  所有：v  
一部：n  部：n  电影：n  的：uj  作者：n  包括：v  导演：n  摄影：vn  编剧：n  等：v  创作：vn  人员：n  这些：r  创作：vn  人员：n  对：p  他们：r  的：uj  
创作：vn  是：v  是有：v  有：v  版权：n  的：uj  不：d  经过：v  制片人：n  授权：v  其他人：rr  不能：v  对：p  电影：n  做：v  拷贝：n  发行：vn  反映：v  
不能：v  通过：v  网络：n  来：v  传播：vn  既：c  不能：v  把：p  电影：n  改编：v  成：v  小说：n  连环画：n  等：v  其他：r  艺术：n  形式：n  发表：v  也
：d  不能：v  把：p  把一：m  一部：n  部几：m  几个：q  个：q  小时：n  才能：v  放：v  放完：v  完的：uj  的：uj  电影：n  改编：v  成半个：nr  小时：n  就
能：v  能放：v  放完：v  完的：uj  的：uj  短片：n  
著作权：n  和：c  版权：n  在：p  我国：n  是：v  同一个：b  概念：n  是：v  法律：n  赋予：v  作品：n  创作者：n  的：uj  专有：vn  权利：n  所谓：v  专有：v
n  权利：n  就是：n  没有：v  经过：v  权利人：n  许可：v  又：d  不是：v  法律：n  规定：v  的：uj  例外：v  要：v  使用：v  这个：r  作品：n  就：d  必须：d
  经过：v  作者：n  授权：v  没有：v  授权：v  就是：n  侵权：vn  
一九八零年：t  春天：t  
-------------------------------------------------------------
脚本执行了：0.004200秒
```

搞定！

## 总结

测试了一些词，分词准确性在90%左右。继续对配置文件修改一下，应该可以正常使用。

## 参考资料:

- [SCWS安装说明 ](http://www.xunsearch.com/scws/docs.php)
- [SCWS 中文分词 下载地址](http://www.xunsearch.com/scws/download.php)

