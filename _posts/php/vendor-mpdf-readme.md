---
title: "使用 html + mPdf 生成优美的PDF文档"
date: 2022-08-14 19:14:40
toc: true
categories:
- ["Php","扩展","Pdf"]
---

> Github : [https://github.com/mpdf/mpdf](https://github.com/mpdf/mpdf)

Document : [https://mpdf.github.io/](https://mpdf.github.io/)

对于没有接触 mpdf 之前, 我的pdf 解决方案是 tcpdf, 在遇到这个文档之后只能大呼 "真香", 这个扩展对于pdf 的样式, 分页, 图片的支持都比较便捷, 不需要单独去进行干预, 只需要组织好相关的html即可, 这里只是抛砖引玉, 简单的使用

优点

- 支持中文
- 支持自定义字体
- 支持远程图片
- 生成 pdf 体积极小(实测 666页的文档, 体积仅有 24.4m)
- PDF 元数据(加密/作者/PDF 版本) 

可能算不上缺点的缺点

- 执行时间长(这里和远程图片有关系, 可以使用缓存优化)




## 安装
> 这里的安装我们均基于 php7.4+ 环境


### 要求

- Php≥5.6.0和7.4.0以下
- 从mPDF v7.1.7开始支持PHP 7.3
- 从mPDF v8.0.4开始支持PHP 7.4
- 启用 `mbstring` 和 `gd` 库

一些高级功能可能需要额外的扩展，比如用于压缩嵌入资源的 `zlib`，例如用于生成条形码的字体或用于生成条形码的 `bcmath`或用于字符集转换和 SVG 处理的 `xml`

MPDF与PHP函数重载(`mbstring.func_overload`)不兼容

至于用 FPDI 导入现有的PDF文件，PHP 需要使用 `zlib`扩展进行压缩。

`curl`扩展用于远程HTTP调用(如果可用)。

mPDF 在使用单线程服务器（如php-s）获取外部HTTP资源时遇到一些问题。推荐使用适当的服务器，如nginx（php-fpm）或Apache

MPDF在使用单线程服务器(如php-S)获取外部HTTP资源时存在一些问题。建议选择合适的服务器，如nginx(php-fpm)或apache。

### 安装
官方安装方法是通过 `composer`安装
```shell
$ composer require mpdf/mpdf
```

### 使用
简易用法
```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$mpdf = new \Mpdf\Mpdf();
$mpdf->WriteHTML('<h1>Hello world!</h1>');
$mpdf->Output();
```
所有的配置均可通过构造器的 `$config` 函数注入, 所有配置 [https://mpdf.github.io/reference/mpdf-variables/overview.html](https://mpdf.github.io/reference/mpdf-variables/overview.html)
```php
<?php
...
// Define a page using all default values except "L" for Landscape orientation
$mpdf = new \Mpdf\Mpdf(['orientation' => 'L']);
...
```
建议通过 `tempDir`配置设置自定义临时目录。目录必须具有写权限(建议使用模式775)
```php
<?php
// Define a page using all default values except "L" for Landscape orientation
$mpdf = new \Mpdf\Mpdf(['tempDir' => __DIR__ . '/custom/temp/dir/path']);
```

## 字体设置

- 将字体目录添加到 `fontDir`配置参数，或通过调用 `$mpdf->AddFontDirectory()`方法
- 在 `FontData`参数数组中定义字体文件详细信息
- 在 `HTML`代码中将其指定为 css 字体系列来访问该字体
- 通过定义自定义的 `Mpdf\LanguageToFontInterface`和 `Mpdf\Language\ScriptToLanguage`实现来指定字体的语言
```php
<?php

$defaultConfig = (new Mpdf\Config\ConfigVariables())->getDefaults();
$fontDirs = $defaultConfig['fontDir'];

$defaultFontConfig = (new Mpdf\Config\FontVariables())->getDefaults();
$fontData = $defaultFontConfig['fontdata'];

$mpdf = new \Mpdf\Mpdf([
    'fontDir' => array_merge($fontDirs, [
        __DIR__ . '/custom/font/directory',
    ]),
    'fontdata' => $fontData + [
        'frutiger' => [
            'R' => 'Frutiger-Normal.ttf',
            'I' => 'FrutigerObl-Normal.ttf',
        ]
    ],
    'default_font' => 'frutiger'
]);

```
在 Html 中如下使用
```html
<p style="font-family: frutiger">Text in Frutiger</p>
```
要将字体与特定语言一起使用，需要扩展 `Mpdf\Language\LanguageToFont` 类(如果需要细粒度控制，需要实现 `Mpdf\Language\LanguageToFontInterface`
```php
<?php
class CustomLanguageToFontImplementation extends \Mpdf\Language\LanguageToFont
{

    public function getLanguageOptions($llcc, $adobeCJK)
    {
        if ($llcc === 'th') {
            return [false, 'frutiger']; // for thai language, font is not core suitable and the font is Frutiger
        }

        return parent::getLanguageOptions($llcc, $adobeCJK);
    }

}

$mpdf = new \Mpdf\Mpdf(['languageToFont' => new CustomLanguageToFontImplementation()]);
```
在 html 代码中如下使用
```html
<p lang="th">Text in Frutiger</p>
```
这将输出PDF作为应用程序/ PDF内容类型的PDF内联类型。

## 更多特性
更多配置 :  [https://mpdf.github.io/configuration/configuration-v7-x.html](https://mpdf.github.io/configuration/configuration-v7-x.html)

Html 支持程度 : [https://mpdf.github.io/html-support/html-tags.html](https://mpdf.github.io/html-support/html-tags.html)

表格 : [https://mpdf.github.io/tables/tables.html](https://mpdf.github.io/tables/tables.html)

分页 : [https://mpdf.github.io/paging/page-breaks.html](https://mpdf.github.io/paging/page-breaks.html)

页眉页脚 : [https://mpdf.github.io/headers-footers/headers-footers.html](https://mpdf.github.io/headers-footers/headers-footers.html)

Css 样式表 :  [https://mpdf.github.io/css-stylesheets/introduction.html](https://mpdf.github.io/css-stylesheets/introduction.html)

