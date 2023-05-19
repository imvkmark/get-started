---
title: "phpcms 常用的功能"
date: 2022-04-14 22:26:23
toc: true
categories:
- ["Php","源码阅读","phpcms"]
---

##### 统计点击量

```
<script language="JavaScript" src="{APP_PATH}api.php?op=count&id={$id}&modelid={$modelid}"></script>
```

##### 评论模块
```
{if $allow_comment && module_exists('comment')}
<iframe src="{APP_PATH}index.php?m=comment&c=index&a=init&commentid={id_encode("content_$catid",$id,$siteid)}&iframe=1" width="100%" height="100%" id="comment_iframe" frameborder="0" scrolling="no"></iframe>
{/if}
```

##### show 页面调试
```
{print_r(get_defined_vars())}
{print_r($rs)}
Array
(
    [id] => 146
    [catid] => 15
    [typeid] => 0
    [title] => 测试下载3
    [style] =>
    [thumb] => http://mall.sdinfo.cc/uploadfile/2013/0619/20130619101057291.jpg
    [keywords] =>
    [description] => G:\wamp\www\template\tpl\qilu\images\app
    [posids] => 0
    [url] => http://mall.sdinfo.cc/index.php?m=content&c=index&a=show&catid=15&id=146
    [listorder] => 0
    [status] => 99
    [sysadd] => 1
    [islink] => 0
    [username] => admin
    [inputtime] => 1371651045
    [updatetime] => 1371655873
    [appcat] => 3429
    [fee] => 0
    [content] => G:\wamp\www\template\tpl\qilu\images\app
    [readpoint] => 0
    [groupids_view] =>
    [paginationtype] => 0
    [maxcharperpage] => 10000
    [template] =>
    [paytype] => 0
    [allow_comment] => 1
    [relation] =>
    [file] => array (
      0 =>
      array (
        'fileurl' => 'http://mall.sdinfo.cc/uploadfile/2013/0619/20130619113046340.apk',
        'filename' => '2',
      ),
    )
)
```

##### 时间替换
```
<?php echo preg_replace("/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/", '$1年 $2月 $3日  $4:$5',$inputtime);?>
```

##### linkage 联动菜单
```
[title] => 手机品牌
[style] => 0
[siteid] => 0
[data] => Array
    (
    [3361] => Array
    (
        [linkageid] => 3361
        [name] => 小米
        [style] =>
        [parentid] => 0
        [child] => 0
        [arrchildid] => 3361
        [keyid] => 3360
        [listorder] => 0
        [description] =>
        [setting] =>
        [siteid] => 0
    )
)
```

##### seajs
```
<script>
	var Lemon = Lemon || {}, Libs = Libs || {};
	Lemon.url_js = '{JS_PATH}';
</script>
<script src="{JS_PATH}libs/seajs/2.2.0/seajs.js"></script>
<script src="{JS_PATH}config.js"></script>
```
seajs 加载阅读数量
```
<script>
	seajs.use(['$'], function($){
		$(function(){ window.$ = Libs.$;
			$.get('{APP_PATH}api.php?op=count&id={$id}&modelid={$modelid}', function(data){eval(data);})
		})
	})
</script>
```

##### 点击量排行
```
{pc:get sql="select p.title, p.url,pd.price from mk_hits h, mk_phone p, mk_phone_data pd where h.hitsid = concat('c-13-',p.id) and p.id = pd.id and p.catid=10 order by h.monthviews desc, p.updatetime desc" cache="0" num="9"}
<ul >
	{loop $data $key $val}
	<li><span >￥:{$val[price]}</span><a  >{$val['title']}</a></li>
	{/loop}
</ul>
{/pc}
```

##### 随机排行
```
{pc:get sql="select p.id, p.title,p.thumb, pd.price from mk_phone p, mk_phone_data pd where p.id = pd.id order by rand()" num="8"}
{loop $data $k $v}
<div >
	<a  ><img src="{$v[thumb]}" ></a>
	<a   >{$v[title]}</a>
	<span >{$v[price]}</span>
</div>
{/loop}
{/pc}
```

##### 自定义调用推荐位
```
{pc:get sql="select a.title, a.appcat, a.url, a.thumb from mk_app a ,mk_position_data p where p.posid = 18 and p.catid=$r[catid] and a.id = p.id" num="8"}
    {loop $data $key $val}
    <div >
        <img src="{$val['thumb']}" >
        <h4><a  >{$val[title]}</a></h4>
        <span >评分:</span>
        <span >分类:{$linkageApp[$val[appcat]][name]}</span>
    </div>
    {/loop}
{/pc}
```

##### 无图片
```
{if $v[thumb]}
	<img src="{$v[thumb]}" >
{else}
	<img src="{IMG_PATH}web/nopic.jpg" >
{/if}
{mkThumb($v[thumb], '')}
```

##### 万能字段
```
{FUNC(sendQuery~~{FIELD_VALUE})}
```

##### 密码重试次数太多，请过-22561967分钟后重新登录！
> 找到文件 \phpcms\modules\admin\index.php
> 将如下代码注释掉：

```
if($rtime['times'] >= $maxloginfailedtimes) {
  $minute = 60-floor((SYS_TIME-$rtime['logintime'])/60);
  showmessage(L('wait_1_hour',array('minute'=>$minute)));
}
```
注意哦，一共是4行<br />然后再次登录后台，更新全站缓存就好了。

##### 禁止注册或用户已存在的解决方法
> 可能是因为程序默认是开启phpsso的，所以密钥要生成一样的。
> 详细：
> (1) phpsso应用管理-通信密钥-点击自动生成
> (2) 然后复制该密钥到后台-设置-相关设置-phpsso配置-粘贴进加密密钥里即可


##### emmet
```
Kinslideshow
ul[style=visibility:hidden;]>(li>a>img[width=300 height=200])
```

##### get
```
{pc:get sql="select * from "}{/pc}
```

##### 分类调用
```
{php $cats = subcat(126)}
{php $num=1}
<a   title="{$SEO['title']}">返回首页</a>|
{loop $cats $cat}
<a   title="{$cat[catname]}">{$cat[catname]}</a>{if (count($cats)!=$num++)}|{/if}
{/loop}
```

##### 顶部菜单标签
```
<li ><a  >网站首页</a></li>
{php $cats = subcat(0)}
{loop $cats $cat}
{if $cat[ismenu]}
<li >|</li>
<li><a  >{$cat[catname]}</a></li>
{/if}
{/loop}
```

##### 插入产品信息
```
INSERT INTO `mk_product` VALUES (null, 171, 0, '智选2900智选2900智选2900智选2900智选2900智选2900', '', 'http://www.www.cc/yun/haojiayi/uploadfile/2013/1229/20131229094801321.jpg', '', '智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智   ', 0, 'http://www.www.cc/yun/haojiayi/index.php?m=content&c=index&a=show&catid=171&id=23', 0, 99, 1, 0, 'admin', 1388324822, 1388324886, '', '');
	select @insertId:=LAST_INSERT_ID();
	INSERT INTO `mk_product_data` VALUES (@insertId, '智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900智选2900', 0, '', 0, 0, '', 0, 1, '', 'array (\n  0 => \n  array (\n    \'url\' => \'http://www.www.cc/yun/haojiayi/uploadfile/2013/1229/20131229094747250.jpg\',\n    \'alt\' => \'imgProductSuggest\',\n  ),\n)', '', '', '', '', '');
```

##### 插入新闻信息
```
INSERT INTO `mk_news` VALUES (null, 13, 0, '华东市场铺垫', '', 'http://www.www.cc/yun/haojiayi/uploadfile/2013/1229/20131229112941493.jpg', '', '华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华', 0,
'http://www.www.cc/yun/haojiayi/index.php?m=content&c=index&a=show&catid=120&id=4', 0, 99, 1, 0, 'admin', 1388330952, 1388330985);
select @insertId:=LAST_INSERT_ID();
INSERT INTO `mk_news_data` VALUES (@insertId, '测试动态测试动态测试动态测试动态测试动态测试动态测试动态测试动态', 0, '', 0, 0, '', 0, '', 0, 1, '');
```

##### 插入案例信息
```
INSERT INTO `mk_case` VALUES (null, 120, 0, '华东市场铺垫', '', 'http://www.www.cc/yun/haojiayi/uploadfile/2013/1229/20131229112941493.jpg', '', '华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华', 0,
'http://www.www.cc/yun/haojiayi/index.php?m=content&c=index&a=show&catid=120&id=4', 0, 99, 1, 0, 'admin', 1388330952, 1388330985);
select @insertId:=LAST_INSERT_ID();
INSERT INTO `mk_case_data` VALUES (@insertId, '华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫华东市场铺垫', 0, '', 0, 0, '', 0, 1, '');
```

##### 碎片
```
{pc:block pos="index"}{/pc}
```

##### 友情链接
| 说明 | 值 | 说明 |
| --- | --- | --- |
| typeid | 0 | 0为默认 |
| linktype | 0,1 | 0为logo, 1为文字 |

```
{pc:link  action="type_list" typesitelinktype="1" order="listorder DESC" num="8" return="pic_link"}
{loop $pic_link $v}
    <li><a   title="{$v['name']}" target="_blank"><img src="{$v[logo]}" width="90" height="30" /></a></li>
{/loop}
{/pc}
```

##### 列表
```
{pc:content action="lists" catnum="2" where="`thumb`!=''"  return="data"}
<ul>
	{php $num=1}
	{loop $data $n $r}
	<div >
		<a   title="{$r[title]}"><img src="{$r[thumb]}" style="" /></a>
		<span ><a   title="{$r[title]}">{$r[title]}</a></span>
		<p >{str_cut($r[description], 100)}</p>
	</div>
	{if (count($data) !=$num++)}
	<div ></div>
	{/if}
	{/loop}
</ul>
{/pc}
```

