---
description: 'Java String类支持创建与初始化、获取长度及字符操作、字符串比较、子串与分割、搜索、替换修改、大小写转换、修剪裁剪、与字符/字节数组互转、判断检查、格式化连接以及类型转换与对象表示等多种功能。'
lastUpdated: '2026-06-30 09:45:13'
head:
  - - meta
    - name: 'og:title'
      content: 'java.lang.String'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Java String类支持创建与初始化、获取长度及字符操作、字符串比较、子串与分割、搜索、替换修改、大小写转换、修剪裁剪、与字符/字节数组互转、判断检查、格式化连接以及类型转换与对象表示等多种功能。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/base/lang-string.html'
---
# java.lang.String

## 创建和初始化

`String(String value)`

根据字符串初始化字符串。

`String(char[] value)`

根据字符数组初始化字符串。

`String(char[] value, int offset, int count)`

根据字符数组的一部分初始化字符串。

`String(byte[] bytes)`

通过使用平台的默认字符集解码指定的字节数组构造一个新字符串。

`String(byte[] bytes, int offset, int length)`

通过解码字节数组中的子数组构造一个新字符串。

---

## 字符串长度和字符操作

`int length()`

返回字符串的长度。

`char charAt(int index)`

返回指定索引处的字符。

`void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)`

将字符串中字符复制到目标字符数组。

---

## 字符串比较

`boolean equals(Object anObject)`

比较两个字符串的内容是否相同。

`boolean equalsIgnoreCase(String anotherString)`

忽略大小写地比较两个字符串。

`int compareTo(String anotherString)`

按字典顺序比较两个字符串。

`int compareToIgnoreCase(String str)`

按字典顺序比较两个字符串，忽略大小写。

---

## 子字符串和分割

`String substring(int beginIndex)`

返回从指定位置开始到结尾的子字符串。

`String substring(int beginIndex, int endIndex)`

返回指定范围内的子字符串。

`String[] split(String regex)`

根据给定的正则表达式分割字符串。

`String[] split(String regex, int limit)`

根据给定的正则表达式分割字符串，最多分割为 limit 个子字符串。

---

## 搜索操作

`int indexOf(int ch)`

返回指定字符在字符串中第一次出现的索引。

`int indexOf(int ch, int fromIndex)`

从指定索引处开始搜索指定字符。

`int indexOf(String str)`

返回子字符串在字符串中第一次出现的索引。

`int indexOf(String str, int fromIndex)`

从指定索引处开始搜索子字符串。

`int lastIndexOf(int ch)`

返回指定字符在字符串中最后一次出现的索引。

`int lastIndexOf(int ch, int fromIndex)`

从指定索引开始向前搜索指定字符。

`int lastIndexOf(String str)`

返回子字符串在字符串中最后一次出现的索引。

`int lastIndexOf(String str, int fromIndex)`

从指定索引开始向前搜索子字符串。

---

## 替换和修改

`String replace(char oldChar, char newChar)`

将字符串中所有指定字符替换为新字符。

`String replace(CharSequence target, CharSequence replacement)`

替换字符串中指定的字符序列。

`String replaceAll(String regex, String replacement)`

替换所有匹配正则表达式的子字符串。

`String replaceFirst(String regex, String replacement)`

替换第一个匹配正则表达式的子字符串。

---

## 大小写转换

`String toLowerCase()`

将字符串转换为小写。

`String toLowerCase(Locale locale)`

根据指定的区域设置将字符串转换为小写。

`String toUpperCase()`

将字符串转换为大写。

`String toUpperCase(Locale locale)`

根据指定的区域设置将字符串转换为大写。

---

## 修剪和裁剪

`String trim()`

去除字符串开头和结尾的空白字符。

---

## 字符数组和字节数组

`char[] toCharArray()`

将字符串转换为字符数组。

`byte[] getBytes()`

使用平台默认字符集将字符串编码为字节数组。

`byte[] getBytes(Charset charset)`

使用指定的字符集将字符串编码为字节数组。

`byte[] getBytes(String charsetName)`

使用指定的字符集名称将字符串编码为字节数组。

---

## 判断和检查

`boolean isEmpty()`

判断字符串是否为空（长度为 0）。

`boolean contains(CharSequence s)`

判断字符串是否包含指定的字符序列。

`boolean startsWith(String prefix)`

判断字符串是否以指定的前缀开始。

`boolean startsWith(String prefix, int toffset)`

从指定索引处开始判断字符串是否以指定前缀开始。

`boolean endsWith(String suffix)`

判断字符串是否以指定的后缀结束。

`boolean matches(String regex)`

判断字符串是否匹配指定的正则表达式。

---

## 格式化和连接

`String concat(String str)`

将指定字符串连接到当前字符串的末尾。

`static String join(CharSequence delimiter, CharSequence... elements)`

使用指定的分隔符连接多个字符序列。

`static String format(String format, Object... args)`

返回格式化后的字符串。

`static String format(Locale l, String format, Object... args)`

根据指定区域设置返回格式化后的字符串。

---

## 转换和对象表示

`String valueOf(Object obj)`

返回对象的字符串表示形式。

`String valueOf(char[] data)`

返回字符数组的字符串表示形式。

`String valueOf(char[] data, int offset, int count)`

返回字符数组子数组的字符串表示形式。

`String valueOf(boolean b)`

返回布尔值的字符串表示形式。

`String valueOf(char c)`

返回字符的字符串表示形式。

`String valueOf(int i)`

返回整数的字符串表示形式。

`String valueOf(long l)`

返回长整数的字符串表示形式。

`String valueOf(float f)`

返回浮点数的字符串表示形式。

`String valueOf(double d)`

返回双精度浮点数的字符串表示形式。