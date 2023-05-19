---
title: "desktop.xml 解释"
date: 2022-04-14 22:09:28
toc: true
categories:
- ["Php","源码阅读","ecstore"]
---

desktop.xml 说明

---

- desktop.xml是后台菜单“显示”文件。
- 装了desktop这个app，就能识别其他app目录下的desktop.xml文件。
- 这个文件必须列出所有后台看见或看不见的控制器，否则除非是超级管理员，任何其他非超级管理员desktop用户无法访问这些控制器。
- desktop.xml不一定包含  [desktop.xml的基本结构]  的所有标签，在符合语法规则的前提下，可以根据自己的需求任意增减标签。

desktop.xml的基本结构

---

<desktop><br />    <panelgroup id="other" icon="panel-other.png" order="100">其他</panelgroup><br />    ...<br />    <adminpanel group="desktop_other" permission="other" controller='admin_member_attr' action='index' display='true'>会员注册项</adminpanel><br />    ...<br />    <permissions><br />        <permission id="shipment" display='true'>配送设置</permission><br />        ...<br />    </permissions><br />    <workground name="商品" id="b2c.wrokground.goods" controller="admin_goods" action="index" order="20"><br />        <menugroup name="商品管理"><br />            <menu controller='admin_goods_editor' action='add' permission='goods' display='false' order='10'>添加商品</menu><br />            ...<br />        </menugroup><br />        ...<br />    </workground><br />    ...<br /></desktop>

语法规则以及各个标签和标签属性含义

---

- `desktop`  <br />每个desktop.xml 的根标签
- `panelgroup`  <br />控制面板里的组
   - `id`  <br />控制面板里组的唯一标识
   - `icon<br />`<br />  控制面板里组的图标，路径默认的起点是app下的static，假如此desktop.xml是desktop这个app的，则图标的路径会自动解析成/app/desktop/static/panel-other.png
   - `order`        <br />组的显示顺序
- `adminpanel`  <br />控制面板项
   - `group`  <br />指属性那个控制面板组，其值是panelgroup的id属性值加app前缀，例如group="desktop_other"
   - `permission`  <br />指此控制面板里的项属性那个权限
   - `controller`  <br />控制面板的控制器
   - `action`  <br />控制面板的action 默认为 index
   - `display`  <br />是否显示在控制面板组里                           
- `permissions`       <br />permission包含标签
- `permission`       <br />包含在 permissions 标签里, 每一项是一项权限
   - `id`  <br />全局唯一的权限值
   - `display`  <br />新建角色的时候是否显示在角色权限列表里     
   - <br />
- `workground`              <br />menugroup 的包含标签<br />
   - `name`  <br />显示出来的label
   - `id`  <br />workground 的唯一标识       
   - `controller`  <br />点击这个workground tab 时候的去处, 控制器       
   - `action`  <br />动作       
   - `order`  <br />排序             
- `menugroup`       <br />包含多个menu
- `menu`      
   - 和 [workground] 中一样的属性  
   - `permission`  <br />权限, 为标签 permission 里的 id属性的值
   - `display`  <br />是否显示, 有些控制器里的方法是不必显示成菜单的
   - `params`  <br />在点击这个菜单的时候进行传值, 传值的时候加入 params 的参数链接                   

<menu controller="admin_notebook" action="index" params="view:1|schema:2">留言编辑列表</menu><br />得到的URL地址为：<br />http://localhost/book/index.php/shopadmin/#app=notebook&ctl=admin_notebook&act=index&view=1&schema=2

