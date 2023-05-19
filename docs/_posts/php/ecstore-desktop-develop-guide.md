---
title: "desktop开发指南"
date: 2022-04-14 22:09:31
toc: true
categories:
- ["Php","源码阅读","ecstore"]
---

## desktop简介
- desktop是基于base的一个独立的app。
- 通俗的讲desktop就是后台管理系统。
- desktop还有以下特点：
   1. desktop提供了常用的后台操作实现机制，这大大节省了你后台开发的时间。
   2. desktop提供一个带有权限和工作流的操作环境。
   3. desktop作为ecos的一个基础app一般不单独存在，是其他app操作流程的载体。
- 安装desktop后，访问后台，会出现如下登录界面：![](https://file.wulicode.com/yuque/202208/04/15/3433Twezb9gN.png?x-oss-process=image/resize,h_421)


## desktop图例

- 一个典型的desktop的列表页包含了哪些内容，如下图所示：![](https://file.wulicode.com/yuque/202208/04/15/3434wwsvWsmJ.png?x-oss-process=image/resize,h_536)

## 接下来我们看各个区里的内容是如何增删及展示出来的

- 【1、2、3区】都是根据app下的desktop.xml产生，如何填充，可以参照desktop.xml的介绍试试看
- 【5区】顶部菜单产生是靠往服务id为desktop_menu里注册服务实现

在service.xml里添加<br />     <service id="desktop_menu"><br />        <class>b2c_service_view_menu</class><br />    </service>

b2c_service_view_menu内容如下<br />class b2c_service_view_menu{<br />    function function_menu(){<br />        $shop_base = app::get('site')->router()->gen_url(array('app'=>'site', 'ctl'=>'default'));<br />        $html[] = "<a href='$shop_base' target='_blank'>浏览商店</a>";<br />        return $html;

    }<br />}

说明：desktop_menu的服务，必须定义名字为function_menu的方法,它的返回值即为【5区】的菜单项

## 4区finder详细解释
![](https://file.wulicode.com/yuque/202208/04/15/3434MffWM7No.png?x-oss-process=image/resize,h_585)<br />finder说明：

- 下面对finder各个区的内容的来龙去脉做解释：

    我们平时做任何web应用大概都少不了后台管理功能，<br />    这之中最常看到的大概就是：数据列表，对数据进行单条查看，删除，搜索列表数据。<br />    finder就是做这样工作的，要做到这些事情只需简单的给一个方法传几个参数而已。

- 例如：

    function index(){<br />        $this->finder('b2c_mdl_goods',array(<br />        'title'=>app::get('b2c')->_('商品列表'),<br />        'actions'=>array(array('label'=>app::get('b2c')->_('添加商品'),<br />                    'href'=>'index.php?app=b2c&ctl=admin_goods_editor&act=add','target'=>'_blank'),),<br />        'use_buildin_set_tag'=>true,<br />        'use_buildin_filter'=>true,<br />        'use_buildin_export'=>true,<br />        'allow_detail_popup'=>true,<br />        'use_view_tab'=>true,<br />        'base_filter'=>array('order_refer'=>'local','disabled'=>'false'), //对tab数据进行过滤筛选<br />        'finder_aliasname'=>'xxxx',<br />            ));<br />    }

- 后台的控制器必须继承desktop_controller，继承后才有finder方法，下面介绍下finder方法的几个参数：
- 第一个参数是字符串，（上例中是b2c_mdl_goods），是model里的class名，它决定了finder列表的数据源，默认情况下是b2c_mdl_goods类里的getlist方法返回的数据
- 第二个参数是数组，这个数组内涵相当丰富，解释如下：

title:  【图 finder】中的【1区】显示出来的内容<br />actions:  【图 finder】【2区】里的内容除了显示内置的操作以外(use_buildin_set_tag,use_buildin_filter这些是控制项)，还可以自定义添加新操作，参照上面格式。<br />allow_detail_popup：  allow_detail_popup和其下面的其他项，是上面所说的内置的操作的控制项，其值为true时，显示此内置项。完整的内置操作及含义如下(可到desktop_finder_builder_view类里查看)：<br />**use_buildin_new_dialog:**  是否显示新建操作<br />**use_buildin_set_tag:**  是否显示设置标签操作<br />**use_buildin_recycle:**  是否显示删除操作<br />**use_buildin_export:**  是否显示导出操作<br />**use_buildin_import:**  是否显示导入操作<br />**use_buildin_tagedit:**  是否显示标签管理操作<br />**base_filter：**  对tab数据进行过滤筛选，参照上面格式<br />**top_extra_view**  在finder列表头部增加其他自定义html显示,如top_extra_view=>array('app名称'=>'页面路径');

- 下面几个控制项是控制【图 finder】【2区】里的内容

**use_view_tab:**  是否显示finder中的tab（如果有），有无需看控制器中是否有_views方法。<br />**use_buildin_filter:**  是否使用高级筛选 【图 finder】【6区】<br />**use_buildin_refresh:**  是否显示刷新操作(高级筛选旁)<br />**use_buildin_setcol:**  是否显示列配置<br />**use_buildin_selectrow:**  是否显示每条记录前的复选按钮<br />**allow_detail_popup:**  是否显示查看列中的弹出查看图标（【图 finder.png】4区第二个图标）<br />**finder_aliasname:**  此finder的别名，用于保存此finder的

## 下面对几个重点区域内容的填充做详细讲解

### 增加finder列表的自定义列

- finder列表的列分为以下三种：
   1. 查看列 (分为下列查看和弹出查看)
   2. 自定义列(也可称函数列)，可以通过一种方法扩展
   3. 普通列(数据表里有的字段，也即dbschema里有的字段)
   - 【图 finder】【5区】的两列操作和标签都不是dbschema里的字段，还能显示出来是因为他们是自定义列.
   - 通过下面的步骤实现：
   4. 注册一个service，其id是desktop_finder.xxx,xxx是finder方法的第一个参数.
   5. 上例中是b2c_mdl_goods，最终结果在相应的应用中services.xml中如下样子：

    <service id="desktop_finder.b2c_mdl_goods"><br />        <class>b2c_finder_goods</class><br />    </service>


b2c_finder_goods类里有两种方法，两种属性，属性和方法成对出现：

- 第一种 属性以detail_开头，对应的方法也以detail_开头 例如：

    var $detail_basic = '基本信息';<br />    function detail_basic($gid){<br />        ...<br />        return $str;<br />    }

属性detail_basic是作为列头显示的，<br />方法detail_basic的返回值是点击查看里出现的内容<br />[如果有多个detail_开头的方法，则显示第一个里面的内容]

- 第二种：属性以column_开头，对应的方法也以column_开头

    var $column_editbutton = '操作';<br />    public function column_editbutton($row)<br />    {<br />        ...<br />        return $str;<br />    }

属性column_editbutton是作为列头显示的，<br />方法column_editbutton的返回值是每行此列的显示内容，<br />方法column_editbutton的参数是当前行的数组。


### finder自定义列初始化宽度

- 在finder自定义列中设置

 ...<br />        var $column_try = '测试';<br />        var $column_try_width = 100;<br />        public function column_try($row)<br />        {<br />                return '====';<br />        }<br /> ...

效果如图：<br />![](https://file.wulicode.com/yuque/202208/04/15/3435MxoxSfPC.jpg?x-oss-process=image/resize,w_201)

### finder列表初始化排序

- 1 .在 dbschema 列属性中加order 属性

     ...........

      'item_subject' =><br />          array (<br />             'type' => 'varchar(100)',<br />             'in_list'=>true,<br />             'is_title'=>true,<br />             'default_in_list'=>true,<br />             'label'=>'第一列',<br />             'order'=>10,   //注意这里<br />             ),<br />      'item_content' =><br />           array (<br />             'label' => '第三列',<br />             'in_list'=>true,<br />             'default_in_list' => true,<br />             'order'=>30,<br />             'type' => 'text',<br />             ),<br />      'item_posttime' =><br />          array (<br />             'in_list'=>true,<br />             'default_in_list' => true,<br />             'label' => '第二列',<br />                 'order'=>20,<br />             'type' => 'archar',<br />             ),

      ...........


- 效果如图：<br />![](https://file.wulicode.com/yuque/202208/04/15/3435da5pBCYr.jpg?x-oss-process=image/resize,w_414)
- 2.在finder自定义列中设置

属性名规则是列变量加_order 例如 var $column_editbutton_order = order

   1. order 可以是COLUMN_IN_HEAD[放在普通列前面]或COLUMN_IN_TAIL[放在普通列后面]
   2. order 也可以是数值 它会和  **dbschema**  中的**order**  的数值做比较

 ...<br />        var $column_editbutton = '操作';<br />        var $column_editbutton_order = COLUMN_IN_TAIL;<br />        public function column_editbutton($row)<br />        {<br />                return '====';<br />        }<br />...

效果如下：<br />![](https://file.wulicode.com/yuque/202208/04/15/34352JRzdsdd.jpg?x-oss-process=image/resize,w_536)<br />注意：此列表排序只能为初始化排序，如果做了如下保存操作则只能手动排序咯

![](https://file.wulicode.com/yuque/202208/04/15/3436VAvS1qv0.jpg?x-oss-process=image/resize,w_325)

### 高级筛选
高级筛选中的搜索项大部分来自dbschema中，<br />搜索类型[单选或下拉或输入关键词]也定义在dbschema

   - **除此之外，高级筛选中的搜索项还可以通过注册service扩展。**
   - id为extend_filter_xxx,xxx为finder方法的第一个参数，例如：

    <service id="extend_filter_b2c_mdl_orders"><br />        <class>b2c_finder_extend_orders</class><br />    </service>


- b2c_finder_extend_orders 类如下：

class b2c_finder_extend_members{<br />    function get_extend_colums(){<br />            $db['members']=array (<br />              'columns' =><br />              array (<br />                'refer_id' =><br />                array (<br />                  'type' => 'varchar(200)',<br />                  'required' => true,<br />                  'default' => 0,<br />                  'label' => '首次来源ID',<br />                  'width' => 75,<br />                  'editable' => true,<br />                  'filtertype' => 'yes',<br />                  'filterdefault' => true,<br />                  'in_list' => true,<br />                  'default_in_list' => true,<br />                ),

        ...

                 'refer_url' =><br />                array (<br />                  'type' => 'varchar(200)',<br />                  'required' => true,<br />                  'default' => 0,<br />                  'label' => '首次来源URL',<br />                  'width' => 75,<br />                  'editable' => true,<br />                  'filtertype' => 'yes',<br />                  'filterdefault' => true,<br />                  'in_list' => true,<br />                  'default_in_list' => true,<br />                )));<br />                        return $db;<br />    }<br />}


class里必须包含get_extend_colums方法，<br />它的返回值跟dbschema里的一样，如果扩展了高级搜索，<br />一般需要在model里重定义_filter方法，以便使用上扩展过滤字段


### 快捷搜索

- 有两个地方影响快捷搜索，dbschema中定义的字段中，searchtype这一项，
- 如果有这项则会在快捷搜索里出现，还有就是在model里定义searchOptions函数，
- 返回值的数组就为快速搜索里的项，例如：

    function searchOptions(){<br />        $arr = parent::searchOptions();<br />        return array_merge($arr,array(<br />                'bn'=>__('货号'),<br />                'keyword'=>__('商品关键字'),<br />            ));<br />    }


### finder上的tab

- 需要在调用了finder的控制器里定义_views方法，_views方法的返回值格式如下：

$sub_menu = array(<br />            0=>array('label'=>app::get('b2c')->_('全部'),'optional'=>false,'filter'=>"",'addon'=>1,'href'=>'xxx.xxx','finder'=>'xxxx'),<br />        ...<br />            7=>array('label'=>app::get('b2c')->_('已作废'),'optional'=>false,'filter'=>array('status'=>'dead'),'addon'=>1,'href'=>'xxx.xxx'),<br />        );


label:  tab的标题文字<br />optional:  此tab是否可选<br />filter:  此tab的过滤条件<br />addon:  此过滤条件下有多少条记录<br />href:  此tab的链接地址

## 回收站
如果finder方法第二个参数中使用了use_buildin_recycle，<br />则此finder列表的actions区就有了内置的删除按钮，<br />有时需要在删除前和删除后做一些检测工作，<br />比方记录不准删除，或删除记录时需删除资源文件等。<br />实现这一功能机制是在model里定义pre_recycle[删除前执行]和suf_recycle[删除后执行]方法


## 桌面
登录后台首先看到的界面，其内容由各个app通过service注册进来，<br />里面每一块都是一个widgets，下面是b2c的service.xml里桌面内容相关的一段

    <service id="desktop.widgets"><br />        <class>b2c_desktop_widgets_workcount</class><br />        <class>b2c_desktop_widgets_stats</class><br />        <class>b2c_desktop_widgets_exstatistics</class><br />    </service>


- 每个class就是一个widgets，每个class里面的内容为以下格式[以b2c_desktop_widgets_workcount为例]：

class b2c_desktop_widgets_workcount implements desktop_interface_widget{


    function __construct($app){<br />        $this->app = $app;<br />        $this->render =  new base_render(app::get('b2c'));<br />    }

    function get_title(){

        return app::get('b2c')->_("统计分析");

    }<br />    function get_html(){<br />    ...<br />        return $render->fetch('desktop/widgets/workcount.html');<br />    }<br />    function get_className(){

          return " valigntop";<br />    }<br />    function get_width(){

          return "l-1";

    }

}


- 函数说明

function get_title():  desktop widgets标题<br />function get_title():  desktop widgets 内容<br />function get_className():  给desktop widgets 区块添加class name<br />function get_width():  返回值为l-1显示在左侧，值为l-2显示在左侧

## 个性化定制

### 1、多个查看标签页

- **实例定位**：我们在“入门”时做的ECOS，相信大家都并不陌生。效果图如下：<br />![](https://file.wulicode.com/yuque/202208/04/15/3436PcLpGHxd.png?x-oss-process=image/resize,w_925)
- 现在我们就来“改造”一下**查看**功能，我们让我们的**查看**功能变的更加丰富。
- 我们先来看一下最终效果图：<br />![](https://file.wulicode.com/yuque/202208/04/15/3437VKqUSoAy.png?x-oss-process=image/resize,w_801)。
- 通过上图我们可以看出，我们可以为**查看**功能添加多个选项卡，每个选项卡可以有自身独立的显示页面。
- 该功能实现起来也非常简单。(我们就拿我们之前的做的notebook这个项目做为实例讲解。)实现过程如下：
1. 首先，定位实现“查看”功能的文件：app/notebook/lib/finder/**item.php**。
2. 然后在该文件中加上如下代码：`<?php<br />...<br />    var  $detail_edit2  =  '详细列表2';<br />        function  detail_edit2($id){<br />                $render  =  app::get('notebook')->render();<br />                $oItem  =  kernel::single("notebook_mdl_item");<br />                $items  =  $oItem->getList('item_subject,  item_posttime,  item_email',<br />                                          array('item_id'  =>  $id),  0,  1);<br />                $render->pagedata['item']  =  $items[0];<br />                $render->display('admin/itemdetail.html');<br />        }<br />...<br />`

以上代码仅仅是为了实例需要，没有什么实际的意义。在function中我们可以根据自己的需求进行处理。

1. 最后，刷新页面就可以看到相应的效果。

### 2、对finder下的数据的modify处理

   - 我们通过一个“实例”来说明我们要做什么。
   - 我们通过model文件里加**modifier**方法来给**email**这个字段**标红**。
   - 我们先来看一下操作之前效果图：<br />![](https://file.wulicode.com/yuque/202208/04/15/3437Svbe0vtv.png?x-oss-process=image/resize,w_727)
   - 然后我们做以下操作：
   1. 定位文件app\notebook\model\**item.php**
   2. 添加以下代码：`<?php<br />...<br />          public  function  modifier_item_email($row){<br />                  $row  =  "".$row."</span>";<br />                  return  $row;<br />          }<br />...<br />`

重要提示：modifier的命名规则是modifier_ColumnName(ColumnName是表对应dbshema中的字段名字)。

   1. 修改后效果如下：<br />![](https://file.wulicode.com/yuque/202208/04/15/3437FPYtvKij.png?x-oss-process=image/resize,w_777)
   2. 也可以对代码稍作调整：`<?php<br />...<br />        public  function  modifier_item_email($row){<br />                //修改后代码<br />                if  (strstr($row,'tntppa')){<br />                        return  "".$row."</span>";<br />                }else{<br />                        return  $row;<br />                }<br />                //修改后代码<br />        }<br />...<br />`
   3. 效果如下：<br />![](https://file.wulicode.com/yuque/202208/04/15/34384ivGgXC2.png?x-oss-process=image/resize,w_740)

### 3、为后台首页添加自己的logo(modify操作)

   - 一般我们安装完desktop这个app后后台的logo会固定为**ECstore**,如下图所示：<br />![](https://file.wulicode.com/yuque/202208/04/15/3438wuTIkPYW.png?x-oss-process=image/resize,w_697)
   - 如果我们要添加自己的logo图片我们要做如下操作：
   1. 在app\notebook\services.xml中添加如下代码：

...<br />    <service id="desktop_controller_content.desktop.default.index"><br />        <class>notebook_ctl_admin_out</class><br />    </service><br />...

   1. 在app\notebook\controller\admin目录下新建文件**out.php**,代码如下：`<?php

        class  notebook_ctl_admin_out  extends  base_controller  implements  desktop_interface_controller_content{<br />                public  function  modify(&$html,  &$obj){<br />                      $arr  =  "ECstore";<br />                      $html  =  str_replace($arr,  "",$html);

                      //替换logo<br />                      $logoimg  =  "";<br />                      $logoimgM  =  "";<br />                      $html  =  str_replace($logoimg,  $logoimgM,  $html);<br />                }<br />        }<br />`
   2. 我们执行**cmd update**操作，如图所示：<br />![](https://file.wulicode.com/yuque/202208/04/15/3439EUQ35Vu6.png?x-oss-process=image/resize,w_601)
   3. 最终效果如下图所示：<br />![](https://file.wulicode.com/yuque/202208/04/15/3439JYxbGnPm.png?x-oss-process=image/resize,w_873)

注：我们也可以通过modify这个方法来修改其他后台页面信息。

   - 【方法二】我们也可以通过修改数据库的方式来修改后台logo文字。具体操作见【个性化定制七】
   - 【方法三】我们还可以通过修改**/config/deploy.xml**来修改后台登陆banner、logo等信息。

注：【方法三】只有在系统安装前可以使用。


### 4、在finder区域添加一个虚拟列

   1. 我们还是来看一下我们要实现的效果：<br />![](https://file.wulicode.com/yuque/202208/04/15/34405uvdbU2q.png?x-oss-process=image/resize,w_744)
   2. 其实在我们ECOS框架中要实现添加虚拟列的方法是非常简单的。我们只需要做如下操作即可：
   3. 先要注册services，代码如下：

<services><br />    <service id="desktop_finder.notebook_mdl_item"><br />        <class>notebook_finder_item</class><br />    </service><br /></services>

   1. 找到**app\notebook\lib\finder\**目录下的**item.php**添加如下代码：`<?php<br />...<br />        //增加一个虚拟列<br />        var  $column_edit2  =  '测试列';<br />        public  function  column_edit2($row){<br />                return  $row['item_subject'];<br />        }<br />...<br />`
   2. 最后我们刷新页面就可以得到我们想要的效果。

### 5、按照条件改变行数据颜色

   - 我们先来看一张效果图：<br />![](https://file.wulicode.com/yuque/202208/04/15/3440S1BMj4Ac.png?x-oss-process=image/resize,w_580)
   - 要实现以上的效果图，我们需要做一下操作：
   1. 首先我们要注册一个services,在**services.xml**添加如下代码：

...<br />    <service id="desktop_view_helper"><br />        <class>notebook_view_helper</class><br />    </service><br />...

   1. 然后我们在lib下建立view文件夹，然后建立**helper.php**,代码如下：`<?php<br />class  notebook_view_helper  extends  desktop_controller{<br />        function  function_desktop_header($params,  &$smarty){<br />                return  app::get("notebook")->render()->fetch("header.html");<br />        }<br />}<br />`
   2. 然后在**app/notebook/view**下建立**header.html**添加如下代码：

<style><br />/*按需求增加的列表另外三种颜色状态*/<br />.finder-list .list-row {background:#FFCC33}<br />.finder-list .list-warn{background:#FF0000}<br />.finder-list .list-even{background:#66CC00}<br /></style>

   1. 在**app/notebook/lib/finder/item.php**,添加如下方法：`<?php<br />...<br />        public  function  row_style($row){

                        if($row['item_subject']=='t'){<br />                                return  'list-even';<br />                        }elseif($row['item_subject']=='rt'){<br />                                return  'list-row';<br />                        }else{<br />                                return  'list-warn';<br />                        }<br />        }<br />...<br />`
   2. 运行cmd update注册services后会出现效果。

### 6、finder中的多表链接显示

   - 同样的我们还是先来看效果：<br />![](https://file.wulicode.com/yuque/202208/04/15/3441tUkoaFLJ.png?x-oss-process=image/resize,w_965)
   - 我们看到上图中**用户ID**这个字段下面显示的是邮箱的名字而非数字，实际上这个字段数据是通过**dbschema**多表链接来完成的。
   - 接下来我们看具体的操作步骤(我们以项目twitter中的pam_account和privacy_config表来说明)：
   1. 首先我们在创建**privacy_config**表的时候**user_id**字段设置如下：`<?php<br />...<br />            'user_id'  =><br />        array(<br />            'type'  =>  'table:account@pam',<br />            'required'  =>  true,<br />            'label'  =>  '用户ID',//finder里显示的列名称<br />            'in_list'  =>  true,//是否显示在列配置中,默认为false<br />            'default_in_list'  =>  true//默认在desktop列表中是否显示<br />        ),<br />...<br />`

  在这里我们有必要解释一下：'type' => 'table:account@pam',<br />  这句代码的意思是：<br />  在本表中的user_id这个字段的类型与pam_account这个表中的主键的字段一致。

   1. 既然我们之前已经将user_id这个字段链接到pam_account中的主键，接下来就要设置要链接查询的字段。将这个要显示的字段加上属性：'is_title'=>true：`<?php<br />...<br />                'login_name'=>array('type'=>'varchar(100)','is_title'=>true,'required'  =>  true,  ),<br />...<br />`
   2. 然后，我们进行cmd update操作。

D:\wamp\www\twitter\app\base>cmd update<br />Scanning local Applications... ok.<br />Updating base_application_cache_expires@pam.<br />Installing Cache_Expires DB:PAM_ACCOUNT<br />UPDATE CACHE EXPIRES KV DATA<br />Installing Cache_Expires DB:PAM_AUTH<br />UPDATE CACHE EXPIRES KV DATA<br />Installing Cache_Expires DB:PAM_LOG<br />UPDATE CACHE EXPIRES KV DATA

   1. 刷新页面后即可看到效果。

  注：如果被链接的表（本例中的pam_accout表）没有字段被设置属性为'is_title'=>true,那么系统默认<br />  将主键的下一个字段为输出数据。

   - 如果要在主表中（本例中的privacy_config表）显示多个字段（默认只能显示链接表的一个字段数据）信息，可以通过services注册虚拟字段来实现。（2011-04-28：sunjinrong）

### 7、后台页面的banner和logo修改

- 很多时候我们有对后台的banner和logo进行修改的需求，前面我们讲的个性化定制之三《3、为后台首页添加自己的logo(modify操作)》中也说到，用通过modify这个函数来实现对后台logo的操作，但是这样无法覆盖全部的需求（比如后台登陆logo）。这个时候，就可以用下面修改数据库然后进行cmd kvrecovery 操作，来完成我们的需求。
- 具体操作步骤如下：
1. 首先，打开数据库表sdb_base_kvstore。
2. 找到表字段修改key字段为**banner\logo**的value值。如下图所示：<br />![](https://file.wulicode.com/yuque/202208/04/15/344106WogGMj.png?x-oss-process=image/resize,w_834)

注意："s:18:这是一个测试"是序列化后的结果，修改时不仅要修改后面的文本，还要修改与之对应的字符个数"s:18"。<br />在utf8字符集下，每个汉字=3个字符。于是上例中“这是一个测试”=3*6个字符。

1. 在cmd中运行**cmd kvrecovery**命令就可以得到最终效果图：<br />![](https://file.wulicode.com/yuque/202208/04/15/3441iJArxVNt.png?x-oss-process=image/resize,w_874)<br />![](https://file.wulicode.com/yuque/202208/04/15/3442whiS5Mpk.png?x-oss-process=image/resize,w_558)

### 8、快速搜索区域自定义搜索名称

   - 让我们先看一张图片来说明我们要做的事情。![](https://file.wulicode.com/yuque/202208/04/15/3442Y7rUyVxi.png?x-oss-process=image/resize,w_570)
   - 通过图片我们知道可以看出我们是要对后台界面的快速搜索区域的名称进行更改。具体实现如下：
   1. 打开对应该finder区域的model文件(在这里我们以app/ecbook/model/item.php为例进行操作)加入如下函数：`<?php<br />...<br />        //自定义快速搜索字段名称<br />        function  searchOptions(){<br />                $arr  =  parent::searchOptions();//得到dbschema里定义searchtype的字段<br />                $columns  =  array();<br />                $columns['item_subject']='自定义1';//将搜索字段自定义名称<br />                $columns['item_posttime']='自定义2';<br />                $columns['item_email']='自定义3';<br />                $return  =  array_merge($arr,$columns);//保证所有属性为searchtype的字段都显示<br />                return  $return;<br />        }<br />...<br />`
   2. 刷新页面后效果如下：<br />![](https://file.wulicode.com/yuque/202208/04/15/3443HHLZIP5r.png?x-oss-process=image/resize,w_547)

