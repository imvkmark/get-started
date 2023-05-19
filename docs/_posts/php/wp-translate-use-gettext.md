---
title: "创建一个可翻译的WordPress模板"
date: 2022-04-14 22:52:28
toc: true
categories:
- ["Php","源码阅读","wordpress"]
---

# 
虽然英语是网络上最有代表性的语言，不过制作主题时多为其他语言用户考虑给他们提供翻译化的主题，当然更好。在这里就一步步教大家如何让WordPress主题可翻译成任何语言。<br />**1 添加必要的函数**<br />从最基本的入手，首先在functions.php 里添加下面的代码：

```
load_theme_textdomain( 'Cats Who Code', TEMPLATEPATH.'/languages' );
$locale = get_locale();
$locale_file = TEMPLATEPATH."/languages/$locale.php";
if ( is_readable($locale_file) )
require_once($locale_file);
```
看第一行有load_theme_textdomain() 函数，这个函数的作用是允许你加载文本域名。你可以选择任何独一无二的域名。最好选择你的主题名称。<br />**2 国际化主题**<br />翻译WordPress主题，要使用到php gettext 函数。 GetText有两个函数: _e 和 ____ (两条下划线)。 "_e"是用来显示 "单纯"文本, __ 函数用于显示已经使用PHP标签的文本。 **例如:**
```
<?php _e("The page you're looking for doesn't exist", "Cats Who Code"); ?>
<?php the_content(__('Read more...', "Cats Who Code")); ?>
```
注意上面的文本域名(Cats Who Code)必须与functions.php里的文本域名保持一致。<br />比较枯燥的部分工作是用这些函数代替每一个字符串。这就得看你的主题里有多少字符串了，可能要花点时间。据说利用GNU 工具可以很容易实现从文件从提取字符串，不过我没有试过也不知道如何。有兴趣的朋友可以用谷歌搜索_xgettext_。<br />**3 创建.po文件**<br />完成上面两个步骤，你的WordPress主题就可以翻译为任何语言。不过要用其他语言显示出来，需要添加.po_文件。_<br />.po 文件是一个可变对象，指的是那些包含字符串及字符串另一种语言的译本的文件。例如，如果你下载法语版的WordPress主题，主题包里就会有_fr_FR.po_ 文件。这个文件就包含了所有让你的主题用法语显示的翻译。你的主题就会用法语“_Bienvenue_”显示而不是用英语“_Welcome_”。<br />好在这次你无需在的主题文件里面查找所有需要被翻译的字符串。一个免费的在线工具[icanlocalize.com](http://www.icanlocalize.com/tools/php_scanner)可以帮你扫描PHP文件并创建.po文件。ICanLocalize 会自动提取所有包含___("txt", "domain")_ 和 __e("txt", "domain")_ 的字符串， 包括所有双引号和单引号中的字符串以及任何字符编码。<br />[![](https://file.wulicode.com/yuque/202208/04/14/50263d7tvM8i.png?x-oss-process=image/resize,h_476)](http://www.wordpress.la/sites/default/files/icanlocalize.png)<br />还可以通过专门的免费软件[PoEdit](http://www.poedit.net/)来编辑Po文件。<br />[![](https://file.wulicode.com/yuque/202208/04/14/5026IiTGEU5p.png?x-oss-process=image/resize,h_510)](http://www.wordpress.la/sites/default/files/poedit.png)<br />你得翻译每一个文本字符串，翻译完后保存.po文件。PoEdit会生产一个.mo文件（.po文件的编译版）。<br />**4 实施 **<br />到此为止，你已经完成了最难的部分，剩下的就是定义WordPress主题地域。<br />首先是要获得你的语言和国家代码，例如，你的语言是中文，你居住在中国。你的代码为zh_CN。你可以通过GNU gettext手册的页面找到你的[国家代码](http://www.gnu.org/software/gettext/manual/html_chapter/gettext_16.html#Country-Codes)和[语言代码](http://www.gnu.org/software/gettext/manual/html_chapter/gettext_16.html#Language-Codes)。<br />获得你的代码后，打开_wp-config.php_文件查找WPLANG常数，如果存在直接用你的代码取代当前的代码，如果不存在，在wp-config.php添加下列代码（用你的需要的语言代码）即可：<br />define ('WPLANG', 'zh_CN')。

