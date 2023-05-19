---
title: "destoon 常用代码块"
date: 2022-04-14 22:09:33
toc: true
categories:
- ["Php","源码阅读","destoon"]
---

友情链接


# 链接地址<br />{$EXT[link_url]}

# 链接申请地址<br />{$EXT[link_url]}

# 文字链接地址调用<br />{tag("table=link&condition=status=3 and level>0 and thumb='' and username=''&areaid=$cityid&pagesize=".$DT['page_text']."&order=listorder desc,itemid desc&template=list-link&cols=9")}

# 图片链接地址调用<br />{tag("table=link&condition=status=3 and level>0 and thumb<>'' and username=''&areaid=$cityid&pagesize=".$DT['page_logo']."&order=listorder desc,itemid desc&lazy=$lazy&template=list-link&cols=9")}


其他部分<br /># 桌面快捷方式<br />{$MODULE[3][linkurl]}shortcut.php<br /># 广告<br />{$EXT[ad_url]}<br /># 推广<br />{$EXT[spread_url]}<br /># 企业服务<br />{$MODULE[21][linkurl]}<br /># 模块类别<br /><!--{php $tags=tag("table=category&condition=moduleid=21 and parentid=0&pagesize=10&order=listorder,catid&template=null");}--> <br />{loop $tags $i $t}<br />    <a href="{$MODULE[21][linkurl]}{$t[linkurl]}">{$t[catname]}</a><br />{/loop}<br /># 网站动态<br /><!--{tag("table=announce&condition=totime=0 or totime>$today_endtime-86400&areaid=$cityid&pagesize=3&datetype=2&order=listorder desc,addtime desc&target=_blank")}-->












下载列表<br />{tag("moduleid=15&condition=status=3 and level>0&pagesize=".$DT[page_down]."&length=40&target=_blank&order=addtime desc&template=list-down")}


品牌<br />{tag("moduleid=13&condition=status=3 and level>0&areaid=$cityid&pagesize=".$DT['page_brand']."&order=addtime desc&width=120&height=40&cols=2&target=_blank&lazy=$lazy&template=thumb-brand")}


招聘<br />{tag("moduleid=9&condition=status=3 and level>0&areaid=$cityid&pagesize=".$DT['page_job']."&length=30&order=edittime desc&template=table-job")}


求职<br />{tag("moduleid=9&table=resume&condition=status=3 and open=3 and level>0&areaid=$cityid&showcat=1&pagesize=".$DT['page_job']."&order=edittime desc&template=table-resume")}


展会<br /><!--{php $tags=tag("moduleid=8&condition=status=3 and level>0&areaid=$cityid&pagesize=".$DT['page_exhibit']."&order=addtime desc&template=null");}--><br /><ul><br />    {loop $tags $t}<br />    <li title="{$t[alt]} {timetodate($t[fromtime], 'Y年m月d日')}"><span class="f_r">&nbsp;[{$t[city]}]</span><a href="{$t[linkurl]}" target="_blank">{$t[title]}</a></li><br />    {/loop}<br /></ul>


知道<br /><!--{php $tags=tag("moduleid=10&condition=status=3 and process>0 and credit>0&pagesize=".$DT[page_know]."&order=addtime desc&template=null");}--><br /><ul><br />    {loop $tags $t}<br />    <li><span class="f_r">{timetodate($t[addtime], 2)}</span><span class="know_credit">{$t[credit]}</span> <a href="{$t[linkurl]}" target="_blank" title="{$t[alt]}">{$t[title]}</a>   </li><br />    {/loop}<br /></ul>

视频<br /><!--{tag("moduleid=14&condition=status=3 and level>0&pagesize=".$DT[page_video]."&datetype=2&order=addtime desc&target=_blank")}-->


图库<br /><!--{tag("moduleid=12&condition=status=3 and open=3 and level>0&pagesize=".$DT['page_photo']."&order=addtime desc&width=80&height=60&cols=3&target=_blank&lazy=$lazy&template=list-photo")}--><br />资讯<br /># 第一页<br /><!--{tag("moduleid=21&condition=status=3 and level>0&areaid=$cityid&pagesize=".$DT[page_news]."&datetype=2&order=addtime desc&target=_blank")}-->

# 第二页<br /> <!--{tag("moduleid=21&condition=status=3 and level>0&areaid=$cityid&pagesize=".$DT[page_news]."&datetype=2&page=2&order=addtime desc&target=_blank")}-->

# 资讯排行

<!--{php $tags=tag("moduleid=21&condition=status=3 and addtime>$today_endtime-30*86400&areaid=$cityid&order=hits desc&pagesize=".$DT[page_rank]."&template=null");}--><br /><ul><br />    {loop $tags $t}<br />    <li><span class="f_r px11 f_gray">{$t[hits]}</span><a href="{$t[linkurl]}" target="_blank" title="{$t[alt]}">{$t[title]}</a></li><br />    {/loop}<br /></ul>

公司信息<br /># 公司新闻<br /><!--{tag("table=news&condition=status=3 and level>0&pagesize=".$DT[page_comnews]."&datetype=2&order=addtime desc&target=_blank")}--> 

# 企业展示<br /><!--{tag("moduleid=4&condition=vip>0 and catids<>''&areaid=$cityid&pagesize=".$DT[page_com]."&order=fromtime desc&template=list-com")}--><br />专题<br /><!--{php $tags=tag("moduleid=11&condition=status=3 and level>0&pagesize=".$DT[page_special]."&order=addtime desc&template=null");}--> <br />{loop $tags $t}<br /><a href="{$t[linkurl]}" target="_blank" title="{$t[alt]}">{$t[title]}</a> <br />{/loop}<br />团购<br /> <!--{php $tags=tag("moduleid=17&condition=status=3 and level>0&areaid=$cityid&pagesize=".$DT[page_group]."&order=addtime desc&template=null");}--><br /><ul><br />    {loop $tags $t}<br />    <li><span class="f_r f_price">￥{$t[price]}</span><a href="{$t[linkurl]}" target="_blank" title="{$t[alt]}">{$t[title]}</a></li><br />    {/loop}<br /></ul>

报价<br /><!--{php $tags=tag("table=quote_product&condition=level>0&areaid=$cityid&pagesize=".$DT[page_price]."&order=addtime desc&length=14&template=null");}--><br /><table cellpadding="3" cellspacing="1" width="100%" bgcolor="#DDDDDD"><br />    {loop $tags $i $t}<br />    {if $i%3==0}<tr bgcolor="#FFFFFF" align="center">{/if}<br />        <td width="33%"><a href="{$MODULE[7][linkurl]}{rewrite('price.php?itemid='.$t['itemid'])}" target="_blank" title="{$t[alt]} {$t[item]}个报价">{$t[title]}</a></td><br />    {if $i%3==2}</tr>{/if}<br />    {/loop}<br /></table>

行情<br /><!--{tag("moduleid=7&condition=status=3&areaid=$cityid&pagesize=".$DT[page_quote]."&datetype=2&order=addtime desc&target=_blank")}--><br />商城<br /><!--{tag("moduleid=16&length=36&condition=status=3&areaid=$cityid&pagesize=".$DT['page_mall']."&order=orders desc&width=90&height=90&cols=5&target=_blank&lazy=$lazy&template=thumb-mall")}--> 

供应<br /><!--{tag("moduleid=5&length=36&condition=status=3 and level>0 and thumb<>''&areaid=$cityid&pagesize=".$DT['page_sell']."&order=addtime desc&width=100&height=100&cols=5&target=_blank&lazy=$lazy&template=thumb-table")}--> 

<!--{tag("moduleid=5&condition=status=3&areaid=$cityid&pagesize=".$DT['page_trade']."&datetype=2&target=_blank&order=addtime desc")}--> <br />求购<br /><!--{tag("moduleid=6&condition=status=3&areaid=$cityid&pagesize=".$DT['page_trade']."&datetype=2&target=_blank&order=addtime desc")}--> 

推广调用

{if $page == 1}{ad($moduleid,$catid,$kw,6)}{/if}

