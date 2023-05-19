# [转+]正则对中文的匹配

对原文的评价: 好文章输在格式上了<br />在javascript中，要判断字符串是中文是很简单的。比如：

```
var str = "php编程";
if (/^[\u4e00-\u9fa5]+$/.test(str)) {
    alert("该字符串全部是中文");
} else {
    alert("该字符串不全部是中文");
}
```

### 在Javascript 中. 编码是 unicode 字符

想当然的，在php中来判断字符串是否为中文，就会沿袭这个思路：

```
$str = "php编程";
if (preg_match("/^[\u4e00-\u9fa5]+$/",$str)) {
    print("该字符串全部是中文");
} else {
    print("该字符串不全部是中文");
}
```

不过，很快就会发现，php并不支持这样的表达，报错：
> Warning: preg_match() [function.preg-match]: Compilation failed: PCRE does not support \L, \l, \N, \U, or \u at offset 3 in ...

所以所有 \u 的匹配都是不靠谱的, 如果说使用 `preg_match` 的话, 故而有<br />在php中，是用\x表示十六进制数据的。于是变换成如下的代码：

```
$str = "php编程";
if (preg_match("/^[\x4e00-\x9fa5]+$/",$str)) {
    print("该字符串全部是中文");
} else {
    print("该字符串不全部是中文");
}
```

貌似不报错了，判断的结果也正确，不过把$str换成“编程”两字，结果却还是显示“该字符串不全部是中文”，看来这样的判断还是不够准确。于是继续搜:<br />片言只语:<br />01:
匹配全角字符的正则: `^[\x80-\xff]*^/` `[\u4e00-\u9fa5]`可以匹配中文,但是PHP又不支持<br />02: `chr(0xa1) . '-' . chr(0xff)`
可以匹配所有中文,但是不知道在UTF-8下如何!即使在gb2312下, `chr(0xa1) . '-' . chr(0xff)` 也不对, 它把全角符号也匹配进来了<br />03: 模式修正符： `u`

### 关于修正符

- u (PCRE_UTF8)<br />此修正符启用了一个 PCRE 中与 Perl 不兼容的额外功能。模式字符串被当成 UTF-8。本修正符在 Unix 下自 PHP 4.1.0 起可用，在 win32 下自 PHP 4.2.3
  起可用。

给“4e00”和“9fa5”两边分别用"{"和“}”包起来，跑了一遍，发现真的准确了：

```
$str = "php编程";
if (preg_match("/^[\x{4e00}-\x{9fa5}]+$/u",$str)) {
    print("该字符串全部是中文");
} else {
    print("该字符串不全部是中文");
}
```

### 参考文章

- [php 正则匹配中文 utf8编码/^[\x{4e00}-\x{9fa5}A-Za-z0-9_]+$](http://my.oschina.net/BearCatYN/blog/413833)
- [正则表达式的汉字匹配](http://www.cnblogs.com/yitian/archive/2008/11/14/1333569.html)

