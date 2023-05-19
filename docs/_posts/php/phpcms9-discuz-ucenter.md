---
title: "Phpcms v9 整合Discuz! X2.5 和UCenter 1.6.0详细教程"
date: 2022-04-14 22:12:40
toc: true
categories:
- ["Php","源码阅读","phpcms"]
---

**第一步: 安装两个最新版**<br />**<br />**第二步 : 在 UCenter 中添加“phpsso 应用”**<br />　　登录Discuz! X2.5后台，进入“UCenter”，点击“应用管理”后点击“添加新应用”进入应用添加界面，设置如下：<br />![](https://file.wulicode.com/yuque/202208/04/15/3732XjtNj4if.jpg?x-oss-process=image/resize,h_969)<br />　　1、安装方式选择“自定义安装”<br />　　2、应用类型选择“其他”<br />　　3、应用名称填“phpsso”<br />　　4、应用的主 URL， 即phpsso_server的路径，视实际情况而定，注意最后不要带斜杠。如本教程填写为[http://127.0.0.1/phpsso_server](http://127.0.0.1/phpsso_server)<br />　　5、通信密钥，任意填写64字节以内的英文字母及数字，不过要记住，因为phpcms 的通信密钥必须与此设置保持一致，否则 phpsso 将无法与 UCenter 正常通信。如本教程设置通信密钥为：chinaz<br />　　6、应用IP、应用的物理路径、查看个人资料页面地址默认留空即可，而应用接口文件名称默认uc.php即可。<br />　　7、标签单条显示模板、标签模板标记说明两项默认留空即可。<br />　　8、是否开启同步登录：是。只有开启后，两款程序才能实现同步登录。<br />　　9、完成后提交，将生成新的应用ID。(记住这个应用ID，在”第三步“中将用到它。)<br />　　10、进入后台“站长”，“UCenter 设置”选项。"是否允许直接激活"一项，选择“是”。<br />　　下面去Phpcms v9中配置phpsso。

　**第三步：配置phpsso**<br />　　登录Phpcms v9后台，进入“phpsso”，点击“系统设置”，进入“UCenter配置”设置界面，设置如下：<br />![](https://file.wulicode.com/yuque/202208/04/15/3732DhBdhFI2.jpg?x-oss-process=image/resize,h_674)<br />　　1、是否启用：是<br />　　2、Ucenter api 地址，即uc_server的路径，根据你的安装情况而定，注意最后不要带斜杠。如本教程填写为：http://localhost/bbs/uc_server<br />　　3、Ucenter 数据库信息：根据自己情况填写数据库的信息。其中数据库表前缀的格式为“`数据库名`.数据库前缀”，注意数据库名的不是单引号。注意是 `dbname`.mk_ucenter_<br />　　4、应用id(APP ID)，即第二步创建的 phpsso 应用时自动生成的应用ID。<br />　　5、Ucenter 通信密钥，即第二步中设置的“通信密钥”，这两个值一定要确保一致，否则会导致无法通信。<br />　　**第四步：查看通信状态**<br />　　登录Discuz! X2.5后台，进入“UCenter”，点击“应用管理”查看第二步中创建的 phpsso 应用与 UCenter 通信是否成功。如果通信失败，请检查“第二步”与“第三步”中的各项参数配置是否正确。<br />![](https://file.wulicode.com/yuque/202208/04/15/3733YitdBONA.jpg?x-oss-process=image/resize,h_265)<br />　　**第五步：修改 Discuz!   X2.5会员登录相关。**<br />　　若不修改此处则在Phpcms v9登录后可以同步登录到Discuz!   X2.5，但是在Discuz!   X2.5登录却无法同步登录到Phpcms v9。修改步骤如下：<br />　　1、找到discuz目录下 template\default\member\login.htm，删除<br />onsubmit="{if $this->setting['pwdsafety']}pwmd5('password3_$loginhash');{/if}pwdclear = 1;ajaxpost('loginform_$loginhash', 'returnmessage_$loginhash', 'returnmessage_$loginhash', 'onerror');return false;"

　　2、找到discuz目录下 template\default\member\login_s imple.htm ，删除<br />onsubmit="{if $_G['setting']['pwdsafety']}pwmd5('ls_password');{/if}return lsSubmit();"

　　3、找到discuz目录下 /source/function/function_message.php ，查找<br />$param['header'] = true;

　　替换为<br />$param['header'] = false;

　　**第六步：整合完成**<br />　　小编整合到这就木有再做任何修改了，经测试完全实现了同步注册、同步登录、同步退出。只是因为程序的原因，在phpcms注册的账号是需要在Discuz登录一次之后才可以实现同步，这个是程序限制，没有办法解决的。另外发现不少站长整合后通信成功，但是出现注册和登录操作失败的问题，请注意第三步中数据库表前缀的格式。

