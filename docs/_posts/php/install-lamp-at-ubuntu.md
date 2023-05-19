---
title: "安装php环境 ubuntu"
date: 2022-04-14 22:51:47
toc: true
categories:
- ["Php","环境搭建"]
---

安装 Apache2：<br />sudo apt-get install apache2<br />安装PHP模块：<br />sudo apt-get install php5 php5-gd php5-cli<br />编辑测试页：（）<br />sudo gedit /var/www/testphp.php

安装Mysql<br />sudo apt-get install mysql-server<br />mysqladmin -u root password db_user_password<br />#db_user_password替换为密码

安装Mysql模块<br />sudo apt-get install libapache2-mod-auth-mysql<br />sudo apt-get install php5-mysql<br />sudo apt-get install php5-gd<br />sudo /etc/init.d/apache2 restart

配置php.ini:<br />sudo gedit /etc/php5/apache2/php.ini<br />把文件在文件后面的：<br />#extension=mysql.so<br />#extension=gd.so<br />的＃去掉。

安装phpmyadmin<br />sudo apt-get install phpmyadmin<br />测试：http://localhost/phpmyadmin/<br />重起apache<br />sudo /etc/init.d/apache2 restart<br />------------------------------------<br />我按照上面的方法安装的php环境,<br />为什么打开http://localhost/phpmyadmin/这个链接出现<br />Not Found<br />The requested URL/phpmyadmin/was not found on this server.<br />Apache/2.2.9(Ubuntu) PHP/5.2.6-2ubuntu4 with Suhosin-Patch Server at localhost Port 80<br />sudo ln -s /usr/share/phpmyadmin/ /var/www/<br />phpmyadmin的默认安装路径不是在/var/www/（/var/www/是你的web服务站点的根目录），所以建一个软连接就可以了。上述命令是在/var/www/下建一个phpmyadmin的软链接。

