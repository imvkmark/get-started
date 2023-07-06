---
title: "肉眼看到的相同两个字串的不同"
date: 2022-04-20 19:01:02
toc: true
categories:
  - [ "Php","语言参考" ]
---

## 祭出两个相同(其实不同)的字符串

```
$strA = '8888‬';
$strB = '8888';
```

我们肉眼看到的这两个字符串是绝对相同的, 对的, 他是一个'8888', 让我们用 php (世界上最好的语言) 输出下两个字串的长度

```
# code
var_dump($strA);
var_dump($strB);
# result
string(7) "8888‬"
string(4) "8888"
```

我滴妈呀, 怎么会不同呢, 纳闷..

## 让我们撕下她的伪装

```
for ($i = 0, $iMax = strlen($strA); $i < $iMax; $i++) {
	var_dump($strA[$i]);
}
```

```
string(1) "8"
string(1) "8"
string(1) "8"
string(1) "8"
string(1) "�"
string(1) "�"
string(1) "�"
```

咦, 这是个什么鬼. 不像是正常字符啊. 哦, 对了, 我们是用的Utf-8 字符集, 这三个应该是一个字符, 我们把它组合起来

**获取到 ASCII 码值**

```
for ($i = 0, $iMax = strlen($strA); $i < $iMax; $i++) {
	var_dump(ord($strA[$i]));
}
```

```
int(56)
int(56)
int(56)
int(56)
int(226)
int(128)
int(172)
```

这个编码值是 [226 128 172], 让我们找到它.

看, 在这里

来自于[这个](https://utf8-chartable.de/unicode-utf8-table.pl?start=8192&number=128&utf8=dec)网站, 好像是输出格式化标识符.
以上.

