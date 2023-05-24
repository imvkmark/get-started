---
title: "phpcms2008常用接口调用方法"
date: 2022-04-14 22:13:18
toc: true
categories:
- ["Php","源码阅读","phpcms2008"]
---

1、可视化编辑器的调用方法

需要用到editor函数，editor($textareaid = 'content', $toolbar = 'phpcms', $width = 500, $height = 400)

$textareaid 为文本框 id

$toolbar 为工具按钮样式，目前有 phpcms 和 introduce 两种可以选择，一般较大的内容编辑框用 phpcms，而简要介绍则用 introduce

$width 指定编辑器的宽度

$height 指定编辑器的高度

例如：在文章模块发布文章时的内容编辑采用可视化编辑器的代码如下



```html
<textarea name="article[content]" id="content" cols="60" rows="4"></textarea>
<?=editor("content","phpcms",550,400)?>
```


2、验证码的调用方法
```html
// 在模板中调用验证码
<input name="checkcodestr" type="text" size="15">

// 验证验证码是否正确的php代码
checkcode($checkcodestr, $PHPCMS['enableadmincheckcode'], $PHP_REFERER);
```


该函数原型如下：

checkcode($checkcode, $enable = 1, $forward = '')

$checkcode 为用户输入的值，$enable 为当前验证码是否启用，$forward 指定当用户输入的验证码错误后的跳转地址

3、模板调用方法

前台

include template($mod, $file);

$mod 为模板所属的模块，$file 为模板去后缀 .html 后的文件名

后台

include admintpl($file);

$file 为模板去后缀 .tpl.php 后的文件名

4、生成html的方法

首先把创建html的php程序存放到模块目录的 include/createhtml/ 目录下，然后通过 createhtml($filename, $mod_root="") 函数来调用并生成html

$filename 为 include/createhtml/ 目录下去了 .inc.php 后的文件名，$mod_root 为当前模块目录的物理路径，可省略

例如以下代码可以生成文章ID号为1的文章html页：

$articleid = 1;

createhtml('show') ;

关于生成html的详细方法参见文章模块代码（./module/article/）

5、给标题进行颜色和是否加粗的控制调用方法

首先应该在标题所在的数据表中创建一个 style 字段来存放样式值，然后在模板中标题的输入框旁边插入以下代码：

添加信息时：<?=style_edit($inputname, '')?>

编辑信息时：<?=style_edit($inputname, $style)?>

系统将根据 $inputname 变量的值创建一个隐藏表单，和标题一样，该表单值会随着表单的提交而发送给php，应该把该值存放到 style 字段。

在显示标题时，需要使用以下代码：

$title = style($title, $style)；

6、后台子菜单调用方法

类似以下代码

$submenu = array

(

array("管理首页", "?mod=".$mod."&file=".$file."&channelid=".$channelid."&action=manage"),

array("添加栏目", "?mod=".$mod."&file=".$file."&channelid=".$channelid."&action=add"),

array("合并栏目", "?mod=".$mod."&file=".$file."&channelid=".$channelid."&action=join"),

array("栏目数据修复", "?mod=".$mod."&file=".$file."&channelid=".$channelid."&action=repair")

);

$menu = adminmenu("栏目管理",$submenu);

7、操作提示信息调用方法

showmessage($msg, $url_forward = '')；

$msg 为提示信息，$url_forward 为跳转地址

8、用户组选择框的调用方法

showgroup($type = 'select', $name = 'groupid', $checked = '', $perline = 5)

$type 可选值为 select 、 checkbox 、radio ，分别可以产生下拉菜单、复选框、单选按钮

$name 为要创建的表单名

$checked 为选定的值

$perline 当显示类型为单选或者复选时用来控制每行的显示个数

此方法在按用户组设置权限时需要用到

9、模板选择下拉框调用方法

showtpl($module = 'phpcms', $type = 'index', $name = 'templateid', $templateid = 0, $property = '')

$module 为要调用的模板所属的模块

$type 为模板类型名，比如首页模板类型为 index

$name 为下拉框表单名

$templateid 被选定的模板名

$property 表单附加属性，比如js或者id可以在这里写

10、风格选择下拉框调用方法

showskin($name = 'skinid', $skinid = '', $property = '')

$name 为下拉框表单名

$skinid 为选定的风格名

$property 表单附加属性，比如js或者id可以在这里写

11、频道选择下拉框调用方法

channel_select($module = '', $name = 'channelid', $defaultalt = '', $channelid = 0, $property = '')

$module 指定频道所属模块，如果不指定则生成所有频道的下拉选择

$name 下拉表单名

$defaultalt 默认选中的提示信息，比如可写“请选择频道”

$channelid 选中的频道id

$property 表单附加属性，比如js或者id可以在这里写

12、栏目选择下拉框调用方法

category_select($name = 'catid', $defaultalt = '', $catid = 0, $property = '')

$name 为下拉表单名

$defaultalt 默认选中的提示信息，比如可写“请选择栏目”

$catid 选中的栏目id

$property 表单附加属性，比如js或者id可以在这里写

在调用此函数前应该先加载 ./include/tree.class.php 并实例化 tree 类创建好一个 $tree 对象

此函数默认产生当前频道的栏目下拉框

13、专题选择下拉框调用方法

special_select($channelid = 0, $name = 'specialid', $defaultalt = '请选择专题', $specialid = 0, $property = '')

$channelid 指定专题所属的频道

$name 为下拉表单名

$defaultalt 默认选中的提示信息，比如可写“请选择专题”

$specialid 选中的专题id

$property 表单附加属性，比如js或者id可以在这里写

14、专题子分类选择下拉框调用方法

special_type_select($specialid, $name = 'special_typeid', $defaultalt = '请选择子类', $typeid = 0, $property = '')

$specialid 指定专题id

$name 为下拉表单名

$defaultalt 默认选中的提示信息，比如可写“请选择子分类”

$typeid 选中的子分类id

$property 表单附加属性，比如js或者id可以在这里写

15、附属分类调用方法

type_select($typeids, $name = 'typeid', $defaultalt = '类别', $typeid = 0, $property = '')

$typeids 当前频道或者模块所选用的所有子分类id，可以是数组，也可以是逗号分割开的数字字串

$name 为下拉表单名

$defaultalt 默认选中的提示信息，比如可写“请选择分类”

$typeid 选中的分类id

$property 表单附加属性，比如js或者id可以在这里写

16、url规则选择下拉框调用方法

urlrule_select($name, $fileext = 'html', $type = 'cat', $urlruleid = 0, $property = '')

$name 为下拉表单名

$fileext 可选值为 html 和 php

$type 可选值为 cat、item、special

$urlruleid 选中的url规则id

$property 表单附加属性，比如js或者id可以在这里写

17、单网页选择下拉框调用方法

page_select($channelid = 0, $property = '')

$channelid     指定单网页所属频道id

$property 表单附加属性，比如js或者id可以在这里写

18、模块配置保存方法

每个模块都应该有自己的配置信息，可以自己根据需要来建立配置表单，保存的时候统一根据

module_setting($module, $setting)

来进行配置保存

$module 为配置所属的模块

$setting 为模块配置所组成的数组

参见：./admin/setting.inc.php

19、在可复制模块中调用栏目管理的方法

添加栏目：?mod=phpcms&file=category&action=add&channelid=1

管理栏目：?mod=phpcms&file=category&action=manage&channelid=1

合并栏目：?mod=phpcms&file=category&action=join&channelid=1

其中 channelid 参数应该为当前频道 ID

20、在可复制模块中调用专题管理的方法

添加专题：?mod=phpcms&file=special&action=add&channelid=1

管理专题：?mod=phpcms&file=special&action=manage&channelid=1

合并专题：?mod=phpcms&file=special&action=join&channelid=1

其中 channelid 参数应该为当前频道 ID

21、在可复制模块中调用附属分类管理的方法

url： ?mod=phpcms&file=type&action=setting&channelid=1

其中 channelid 参数应该为当前频道 ID

22、在独立模块中调用栏目管理的方法

请自行参考 ./product/admin/category.inc.php

23、在独立模块中调用附属分类管理的方法

url： ?mod=phpcms&file=type&action=setting&module=product

其中 module 参数应该为当前模块名

24、自定义字段功能的调用方法

phpcms自定义字段功能是通过给数据表增加前缀为 my_ 的字段来实现的，适用于所有带信息发布的模块和频道，下面讲一下调用方法：

在频道或者模块的导航中做一个链接，例如文章模块调用url为：

?mod=phpcms&file=field&action=manage&channelid=1&tablename=phpcms_article_1

注意：tablename 为要定义字段的数据表名，这个参数不能少

那么在发表文章的程序中显示自定义字段表单应该这样得到：

require PHPCMS_ROOT.'/admin/include/field.class.php';

$field = new field('phpcms_article_1');

$fieldform = $field->get_form('tablerow'); // tablerow 为css样式名

文章发表时自定义自段的内容应该这样保存：

$field->update('articleid=1'); // articleid=1 这个表示更新 articleid 为 1 的文章的自定义自段内容

前台显示自定义自段内容的方法和显示标题 title 类似

25、得到栏目下级栏目信息得调用方法

subcat($keyid, $catid = 0, $type = 'menu');

$keyid 可以是 频道id ， 也可以是模块英文名

$catid 为栏目ID

$type 可选值为 menu 或 list，分别表示导航和列表

26、得到当前位置得方法

前台：catpos($catid, $s = '>>');

后台：admin_catpos($catid, $s = '>>');

27、发送邮件的方法

require PHPCMS_ROOT.'/include/mail.inc.php';

if(sendmail("[email=zhongshenghui@163.com,phpcms@163.com]zhongshenghui@163.com,phpcms@163.com[/email]", "邮件主题", "邮件内容", "测试<[locoybb@126.com](mailto:locoybb@126.com)>"))

echo "发送成功";

else echo "失败";

函数原型：sendmail($mail_to, $mail_subject, $mail_body, $mail_from = '')

$mail_to：可以是

| user@example.com |
| --- |
| user@example.com, anotheruser@example.com |
| User <user@example.com> |
| User <user@example.com>, Another User  [anotheruser@example.com](mailto:anotheruser@example.com) |

$mail_from：可以是  [user@example.com](mailto:user@example.com)  或 User  [user@example.com](mailto:user@example.com)


28、日期选择的调用方法

date_select($name, $value = '', $format = 'yyyy-mm-dd')

$name 是表单名

$value 是表单的默认值，例如：2006-12-16

$format 日期格式，一般这个参数不用指定

