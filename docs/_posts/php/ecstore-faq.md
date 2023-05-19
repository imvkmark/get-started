---
title: "ecstore faq"
date: 2022-04-14 22:09:37
toc: true
categories:
- ["Php","源码阅读","ecstore"]
---

## 20110713


### api 文档?

### 购物车
购物车文档 促销

### 二次开发模式
[http://www.ec-os.net/re-development.html](http://www.ec-os.net/re-development.html)

### 模板挂件实例的如何使用
[http://www.ec-os.net/advance/site/template.html#id20](http://www.ec-os.net/advance/site/template.html#id20)

### 我们点击检查更新版本可以更新至最新版本
目前不可以, 需要后端有app store做支撑, 需要svn 更新到最新版本, 然后./cmd update

### Ecstore前台页面局部是否有办法引入jquery等特效代码，以增强页面效果？
最好不要, 内置mootools

### ecos导出的机制（报表—销售收 入统计）？
控制器继承 b2c_frontpage, 在index函数中使用 $this->finder(),第二个参数加入 use_buildin_export

### Ecos和erp、wms等其他第三方软件如何对接？
具体问题具体分析[http://www.ec-os.net/advance/base/api.html](http://www.ec-os.net/advance/base/api.html)

### 接口机制，与矩阵联通以及与其他系统联通的方式

### ecos如何实现多语言化，我们做过的都是中文举例英文？

- 在 php 中使用 app:get('app_name')->_('tdfsgfsdfg');
- 在html中
   - css: <{lang_css}>
   - script: <{lang_script}>
   - html:<{t} jkjglkhhlghkjghkjgjk><{/t}>
   - html smarty plugin: |t:''例如: <{button label=$___b2c="短信平台设置"|t:'b2c' app="desktop" onclick="new Dialog('{$sms_url}',{height:.9,width:.9,iframe:true,title:'短信平台'})"}>

### 方法 _() 的各种应用场景，它和直接写内容的区别

### Ecos能否与其他系统集成，如果可以应如何与其他系统集成，举例？
api机制

### 优惠活动的机制（优惠活动是如何运用到前台的呢？）
promotion 机制

### 如何记录支付成功还是失败？
记录在支付单中sdb_ectools_payments[http://www.ecosx.com/index.php/shopadmin/#app=ectools&ctl=admin_payment&act=index](http://www.ecosx.com/index.php/shopadmin/#app=ectools&amp;ctl=admin_payment&amp;act=index)

### ECOS如何处理sql的防注入？
base_db_connections 对于防注入做了很多的文章. base_db_model 和 dbeav_model 的基本操作都是建立在base_db_connections的基础之上<br />尽量不要直接用base_db_connections的exec和query方法.Ecos的base_db_connections势力

- kernel::database()
   - model中 $this->db

如果确实有需要要用的情况下, 如果sql语句有拼接的状况的出现. 如果是整数请用 intval, 如果是字符串用 base_db_connections 提供的 quote 处理后再进行拼接<br />$sql = 'update sdb_base_queues where queue_title like '. $this->db->quote($_POST['title'])](http://www.ec-os.net/where%20id='.intval($_POST%5Bid));

### Ecstore如何实现静态化的？
url rewrite

### Ecstore中Mootools的ajax方法的详细参数以及写法？

### 举例讲解一下ecstore的API机制? Snoopy在ecstore的典型应用？

![](https://file.wulicode.com/yuque/202208/04/23/28505FENJ7Fx.gif?x-oss-process=image/resize,h_251)<br />api 机制  [http://www.ec-os.net/advance/base/api.html](http://www.ec-os.net/advance/base/api.html)

## 20110716

### base模块的组成部分
详细看base手册[base文档](http://www.ec-os.net/advance/base/index.html)<br />mvc<br />app<br />         update install stop active ....<br />         app/{$app_name}/task.php<br />                  pre_install<br />                  post_install<br />                  pre_update<br />                  post_upate<br />                  ....

         setting  setconf getconf<br />         lang<br />          application_content  service     install update<br />command<br />queue<br />task<br />cache<br />         filesystem<br />          memcache<br />         memcahed<br />         flare<br />kvstore<br />         ...<br />xml<br />pget http httpclient<br />tar<br />session<br />docs<br />error_handler



tar.t2t max-depth=1<br />kvstore.t2t<br />queue.t2t<br />pget.t2t<br />task.t2t<br />autoload.t2t<br />router.t2t<br />cache.t2t<br />error-handler.t2t<br />setting.t2t<br />tdd.t2t<br />session.t2t<br />cache.t2<br />appstore.t2t<br />docs.t2t<br />misc.t2t




### dbeav模块的主要使用方法以及重载方法
[dbeav文档](http://www.ec-os.net/doc.html)[http://www.ec-os.net/advance/dbeav/dbeav.html#id4](http://www.ec-os.net/advance/dbeav/dbeav.html#id4)./cmd dev:show services<br />如果两个service 注册点 一个有interface，一个没有已哪个为准. 如果interface不同, 以哪个为准

### 系统中有相应功能时，如何能进行重构原有功能
具体问题具体分析.如果是二次开发商可以用[二次开发模式](http://www.ec-os.net/doc.html)

### ECOS中的service的使用的一些指导意见（如：避免service过于混乱、屏蔽serviceList中某一个的功能）

- 在写自己的service box时候请写interface
- 查看系统已注册的所有service的时候

### ECOS中的异常处理，是否有log记录机制，能够在维护其中开发log机制，在稳定期关闭log机制
在进行调试的时候可以有两种方式1. throw new ErrorException($errstr, 0, $errno, $errfile, $errline);2. trigger_error('', E_ERROR/E_USER_ERROR);

### 对ecos开发的性能调试的建议
用xhprof, linux下1. 配置的帮助见 www.ec-os.net2. 安装 serveradm app, 修改index.php 去掉xhprof那行的注释. 进入后台可见xhprf菜单, 有帮助. 需要serveradm 的同学请联系 bryant

### ecos开发中如何最大限度的实现程序与业务逻辑分离。利于代码重构

- controller 只进行数据重组.
- library 业务逻辑和需要多个app进行共享的, 尽可能写成library. libraray可以调用model
- model 建议用贫血模型, model里只做和数据库相关的事情. crud
- view
- 尽可能的了解以前的service, 对继承的app进行扩展. 需要提供扩展性的尽可能的写成service box 便于扩展. 建立机制而非策略. 例如cache

### ecos中如何更好的利用现有代码

- 尽可能的通过service 进行扩展.
- 了解以前系统提供的工具类. 基类
- 了解 application resources 机制, 可以对现有的 各种xml(app_content_detector )

## sdb_

### 对于ecos中的测试的说明，因为现有系统中已经有testcase的例子，主要目的是能否实现自动化测试，减少修改代码的维护工作

- 内置的php unit
- 以往的 testcase 放在 app/{$app_name}/testcase 下
- ./cmd dev:test do

### 对于界面的快速开发的，如何利用现有mootools效果、功能。如：ajax调用、自动补全、代码包含、加载页面
www.ec-os.net/miscued/index.html

### 对于使用ecos开发，如何实现最大限度的协同工作，加快开发进度、减小冲突和相互之间的影响
提前做好模块切分.做好接口.svn 分支

### 图片加载较慢，图片应用是否有提供提高效率的功能

- 了解 storager

### 想要实现不同系统统一登陆和权限设置如何处理
oauth

- 通过oauth, 完成统一登陆.已有 oauth app. 可以

### 想要实现多个主应用同时在同一个ECOS中搭建。（例如PIM，OIM，CIM同时部署在同一个ECOS底层中。）
???

### ecos想要支持应用分布式部署如何解决
????

### ecos内部各应用数据传输，不通过service还有其他的方式么？（不通过接口形式）
其实无论什么方式, 都需要定义好数据结构/接口.1. db2. kvstore3. file4. .....

### ecos页面中想要两个列表
不用finder

### ecos中想要在列表中做编辑

### 能不能对ecos进一步的封装，高度集成（比如说将简单的HTML中input语句也进行封装成一个方法）
加入input文档....

### 基本上每个app都会有自己的数据表，如果一个app掉用其他app的表，会不会影响程序的运行速度和运行效率

### 当注册一个service的时候，update之后才能使用，我想知道它处理这个xml的过程，是怎样找到文件
cmd update 支持多个app.<br />services/service<br />app::get($app_id)->runtask('pre_update', array('dbver'=>$appinfo[0]['dbver']));kernel::single('base_application_manage')->update_app_content($app_id);app::get($app_id)->runtask('post_update', array('dbver'=>$appinfo[0]['dbver']));app::get('base')->model('apps')->update(array('dbver'=>$appinfo[0]['local_ver']), array('app_id'=>$app_id));<br />下边只讲解基本流程<br />![](https://file.wulicode.com/yuque/202208/04/23/2850WKQ1PYbZ.gif?x-oss-process=image/resize,h_347)<br />update_app_content;<br />![](https://file.wulicode.com/yuque/202208/04/23/2850oXSidzAI.gif?x-oss-process=image/resize,h_347)

### rewrite对后台的作用？这个需求什么时候用到？？？？

### 能不能像类的自动载入机制那样，使service不用update也实现其需要的功能
不是绝对不能, 但是出于以下方面考虑不能

- 因为每次检查service是否发生变更是要付出代价的
- 因为是新增处理, 因此需要运维人员或开发者显性的知道面更

对于开发者, 为了方便可以把command update绑定成IDE的快捷键

### 有些表找得到dbschema定义文件却找不到对应的model文件, 但仍然能调用这个本不该存在的model这是为什么
系统中有虚拟model[http://www.ec-os.net/advance/base/mvc/m/base.html](http://www.ec-os.net/advance/base/mvc/m/base.html)如果仍有疑惑可以看 app/base/kernerl.php 的autoload函数的 'mdl_' 部分就懂了

### ecos的缓存机制是怎样的，都是什么地方会用到缓存
[http://www.ec-os.net/misc/cache.html](http://www.ec-os.net/misc/cache.html)<br />什么地方用到缓存?

- 比较耗资源来组织数据
- 数据使用比较频繁
- 数据变化频率比较小

场景

- 全页缓存
- 订阅会议室系统里边的 查看一个月内n多个会议室状态的图表的数据

### 将sql的语句封装成方法，为什么不直接写sql语句，而且也建议直接写成sql语句
安全

### ECOS数据库操作对象都有那些，性能优劣，应用时机
base_db_connectionsbase_db_modeldbeav_model<br />getlist, 优化: sphinxdump , 少量数据ok, 大量数据不要用

### 一个dbschema文件是如何生成sql语句的，有是怎么与model联通的
看一哈 base_application_dbtable

### dbschema都包括哪些功能，如描述、定义数据表的数组都有那些键，其值取值范围都是什么，描述或定义字段的数组都有那些键，其值取值范围都是什么？
www.ec-os.net/advance/base/mvc/m/dbschema.html#id2

### 如何创建没有数据表、没有dbschema的model
用library, 不要用model

### 列表页生成机制，都有什么功能，如何生成一个带列表、翻页、标签切换、搜索、高级搜索、展开、编辑、修改列字段的值的全部功能的列表页
[http://www.ec-os.net/advance/desktop/index.html](http://www.ec-os.net/advance/desktop/index.html)

### JS框架机制，采用了什么框架，框架代码位置、程序的结构，都包括那些主要对象，使用者应如使用、如何学习
mootoolsmootools的30天中文教程  [http://inspire.twgg.org/c/programming/other/30-day-learn-to-mootools-instruction-1-recognizing-mootools.html](http://inspire.twgg.org/c/programming/other/30-day-learn-to-mootools-instruction-1-recognizing-mootools.html)

### 页面模板框架都包含哪些模板函数，原型在哪里，使用示例，如何自建模板函数
file:///Users/bryant/tmp/ecosdoc3/build/html/advance/base/mvc/v/ui.html不全， 需要补充 desktop_view_helper/site_view_helper<br />??

### 缓存系统结构、机制介绍，如何使用和学习

### 如何在框架内定义不同格式的接口

### queue 队列的机制（望详细讲解）
$this->begin();$queue = app::get('base')->model('queue');$member_obj = $this->app->model('members');$mobile_number = json_decode($_POST['mobile_number']);if(!$mobile_number) $this->end(false,app::get('b2c')->_('所选会员都没有填写手机号码'));unset($_POST['mobile_number']);foreach((array)$mobile_number as $key=>$val){$data = array('queue_title'=>app::get('b2c')->_('群发短信'),'start_time'=>time(),'params'=>array('mobile_number'=>$val,'data' =>$_POST,),'worker'=>'b2c_queue.send_sms',);if(!$queue->insert($data)){

### task

### 队列游标的用法

### 任务进入队列后如何实现多线程出错时，只回滚出错的任务，并保证其他任务继续执行

### 在框架下写sql语句，当遇到多表查询时，除了自己写原生sql，框架有没有别的方法
在ecos里, 目前有

### 详细讲解框架下一些扩展的方法，如save的扩展方法

### 框架下点击任何按钮，弹出浮动层或者页面，都是框架里自己写好的页面，如果我想自己编辑一个页面，css和图片的路径放在什么位置
????<{css src="print.css" app="desktop" media="print"}>

### ECOS 框架命令实现原理

### desktop 是否可以继承修改页面布局格式、样式

### ECOS 可不可以支持多数据库
不同的业务用不同的db. 系统没有其他的支持<br />场景是什么?<br />猜测问题:1. 可不可以更换数据库为 pgsql/oracle/ms sql server 等等理论上可以, 实际上不行. 因为之前反复定位后, 最终定位为只针对mysql优化, 所以很多代码都写死了2. 可不可以支持数据库主从?可以.

### dbeav 下的 $subSdf 语法和dump

### 讲一下控制器劫持
~/codes/ecos/app/desktop/lib/controller.php

### desktop框架传参方法及finder的所有用法和参数设置

- desktop框架传参方法?
- finder的所有用法和参数设置文档中基本已经全了, 如有缺失后续再补[http://www.ec-os.net/advance/desktop/index.html](http://www.ec-os.net/advance/desktop/index.html)

### deschema如何对已有的表增加字段

- 直接修改对应dbschema 然后 cmd update, 此方法只针对开发中的app
- 可以扩展其他app字段的方法:  [http://www.ec-os.net/advance/dbeav/dbeav.html#id4](http://www.ec-os.net/advance/dbeav/dbeav.html#id4)

### 各种劫持的方法的区别

### services.xml共有多少种用法和写法
请参看:  [http://www.ec-os.net/advance/base/app/service.html](http://www.ec-os.net/advance/base/app/service.html)

### ecos框架中自带的sql方法有多少种，详细用法
[http://www.ec-os.net/advance/base/mvc/m/base_db_model.html](http://www.ec-os.net/advance/base/mvc/m/base_db_model.html)<br />[http://www.ec-os.net/advance/base/mvc/m/base_db_connections.html](http://www.ec-os.net/advance/base/mvc/m/base_db_connections.html)

### kvstore的用途
[http://www.ec-os.net/misc/kvstore.html](http://www.ec-os.net/misc/kvstore.html)

### 希望讲解一下ecos框架下的表结构，每个的用途，以及之间的关系
dbeav_model extends base_db_model. base_db_connections

### 在目前的开发上dbeav这个app的用处仅限于对数据库的增删改查，用到的类也都基本继承于base,它还有什么用处
eav实体 属性 值

- 支持meta机制, 可以对以前的表增加扩展字段, 而不用直接修改原始表
- 支持sdf(多表关联), 提供dump save方法
   - dump save, 对一条数据进行处理
   - 由于dump save 只针对一条sdf数据处理, 因此会有多表关联. 少量数据ok.
   - batch_dump 支持多条数据导出, 但因为没做优化.因此大量数据导出时 尽量不要用batch_dump进行处理, 也不要 foreach dump.

### 有几个app在目前的开发中没有直接用到，比如，ectools,pam,setup,image希望能针对每个app的功能来做一个小的东西

### 报错：Fatal error: Call to a member function get_params() on a non-object in G:\wamp\www\ecos\app\site\lib\controller.php on line 389
解决方案：将导致出错页面的所在控制器的__construct里调用一下父类的构造方法。如：parent::__construct($app);

### 如何调用themes 中的cs/js/img资源、调用流程 如何调用其他应用中的cs/js/img资源，调用流程

### 控制器如何对finder页面进行权限控制

### 控制器如何对自定义页面进行权限控制

### finder页面如何对功能区功能进行控制-页面、控制器

### 自定义页面如何对功能区功能进行控制-页面、控制器

### 如何在page、display调用中隐藏掉 左边子菜单

### 如何自定义servicel

### seo友好

### 回收站的基本机制，如何设置回收站是否启用，回收站启用时如何处理批量删除再添加情况【修改了大量记录】，如何不进入回收站直接删除

### 如何调整默认按钮导航的顺序

### 服务在多个应用实例化时，会多次调用，调用规则，如何保证不冲突

### 前台手工定义Finder、dbschema 列的属性定义之间的关系如何，如何在两者都修改的情况下，不同支持方案

### 2个以上的detail时，如何在弹出页面进行设置，出现多个tab，默认显示多个detail的顺序展开

### 无dbschema时，在数据库中有大量表，且不希望重写大量dbschema情况下，如何在modal中进行数据访问

### 如何重构 finder 中导入 导出

### 初始数据的存放位置，如何管理

### 在dbschema中写'searchtype' => 'has'为何无效？(不是模糊搜索)
造成这个问题的原因往往是因为与本dbschema对应的model没有继承dbeav_model.dbeav_model filter相关参数如下：<br />'than'=>' > '.$var,<br />'lthan'=>' < '.$var,<br />'nequal'=>' = \''.$var.'\'',<br />'noequal'=>' <> \''.$var.'\'',<br />'tequal'=>' = \''.$var.'\'',<br />'sthan'=>' <= '.$var,<br />'bthan'=>' >= '.$var,<br />'has'=>' like \'%'.$var.'%\'',<br />'head'=>' like \''.$var.'%\'',<br />'foot'=>' like \'%'.$var.'\'',<br />'nohas'=>' not like \'%'.$var.'%\'',<br />'between'=>' {field}>='.$var[0].' and '.' {field}<'.$var[1],<br />'in' =>" in ('".implode("','",(array)$var)."') ",


### 怎样使finder列表按照某一列排序显示？
在finder方法里的第二个参数里有排序参数如下：<br />$this->finder('ecbook_mdl_message',<br />          array(<br />             'title'=>'留言列表',<br />             'orderBy'=>'mes_title desc',<br />             'actions'=>array(<br />                    array(<br />                      'label'=>'添加留言',<br />                      'href'=>'index.php?app=ecbook&ctl=admin_default&act=add'<br />                    ),<br />            ),<br />          ),<br />        );

上例中的finder的第二个参数数组中的参数**'orderBy'=>'mes_title desc',**就是finder数据列的排序属性。

### 后台（桌面）菜单对应的左侧列表不显示怎么办？
![](https://file.wulicode.com/yuque/202208/04/23/2851C3JrPHBl.png?x-oss-process=image/resize,w_249)<br />请检查一下三个地方代码是否正确：

   1. desktop.xml中menugroup的属性‘name’没有写。
   2. desktop.xml中的permission。
   3. 每一个menu菜单的必须要有对应的controller方法，每个方法必须有对应的view页面。
   4. 需要在对应menu的控制器的构造方法中重载一下父类控制器parent::__construct($app);或者直接在本控制器不写构造方法
   5. 其他未知的情况。

### 不想显示后台左边菜单栏怎么办？
在对应的控制器文件里面加上代码：var $workground = 'desktop_ctl_dashboard';

