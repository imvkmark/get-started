---
description: 'PHP的DOM模块用于解析HTML。示例演示了加载HTML文档，通过getElementsByTagName获取所有img标签并修改其src属性，以及使用XPath查询包含rel="nofollow"的a标签。'
lastUpdated: '2026-06-17 22:18:22'
head:
  - - meta
    - name: 'og:title'
      content: '在 PHP 中使用 Dom '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PHP的DOM模块用于解析HTML。示例演示了加载HTML文档，通过getElementsByTagName获取所有img标签并修改其src属性，以及使用XPath查询包含rel="nofollow"的a标签。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/faq/dom-use.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/b67e2a72a23c00d9e808a16ff95051c6.png'
---
# 在 PHP 中使用 Dom

PHP 中的 HTML 解析是使用的 [DOM模块](https://www.php.net/manual/zh/book.dom.php)

```PHP
$dom = new DOMDocument;
$dom->loadHTML($html);
$images = $dom->getElementsByTagName('img');
foreach ($images as $image) {
    $image->setAttribute('src', 'http://example.com/' . $image->getAttribute('src'));
}
$html = $dom->saveHTML();
```

这里列举所有包含 `nofollow` 属性的  `<a>`  标签:

```PHP
$doc = new DOMDocument();
libxml_use_internal_errors(true);
$doc->loadHTML($html); // loads your HTML
$xpath = new DOMXPath($doc);
// returns a list of all links with rel=nofollow
$nlist = $xpath->query("//a[@rel='nofollow']");
```

提取谷歌结果的 dom 程序.

```PHP
<?php
# Use the Curl extension to query Google and get back a page of results
$url = "http://www.google.com";
$ch = curl_init();
$timeout = 5;
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$html = curl_exec($ch);
curl_close($ch);
# Create a DOM parser object
$dom = new DOMDocument();
# Parse the HTML from Google.
# The @ before the method call suppresses any warnings that
# loadHTML might throw because of invalid HTML in the page.
@$dom->loadHTML($html);
# Iterate over all the <a> tags
foreach($dom->getElementsByTagName('a') as $link) {
  # Show the <a href>
  echo $link->getAttribute('href');
  echo "<br />";
}
?>
```

## FAQ

### DOMDocument::loadHTML(): Unexpected end tag : p in Entity

当分析 html 代码的时候如果嵌套类型不正确, 则会报这个错误, 因为 `<ol>` 是一个块级元素, `p`之内是不能存放任何块级元素的

```PHP
$html = '<p>
  <ol>
  <li>The OS interface layer has been completely reworked</li>
  </ol>
</p>';
$Dom  = new DOMDocument();
$Dom->loadHTML($html);
$Xpath = new DOMXPath($Dom);
$Xpath->query('//p');
```

这个 `$html`在 [https://validator.w3.org/](https://validator.w3.org/) 中进行验证会有如下错误

> No `p` element in scope but a `p` end tag seen.

![](https://file.wulicode.com/feishu-images/b67e2a72a23c00d9e808a16ff95051c6.png)