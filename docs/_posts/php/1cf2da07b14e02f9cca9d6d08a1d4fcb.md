---
title: "ThinkPHP 的问题"
date: 2022-04-14 22:12:51
toc: true
categories:
- ["Php","源码阅读","thinkphp"]
---

1. 配置

配置目录<br />配置 项目缓存目录另外存储, 并且另外定义了默认模块的话, 生成编译runtime可能会报错

扩展配置<br />'LOAD_EXT_CONFIG' => 'user,db'<br />'LOAD_EXT_CONFIG' => array(<br />     'USER' => 'user', //用户配置 <br />     'DB'    => 'db', //数据库配置 <br />), //加载扩展配置文件

扩展配置加载的是默认的Conf文件夹下的配置文件,不是Conf/Test 分组下的文件

URL_MODEL 的设置<br />      无法实现pathinfo, rewrite, complicate   方法 

空模块的时候不能对齐传递参数<br />      m=M&a=some <br />      会报错, 空的模块不会报错 <br />      加入空模块方法 

在运行时候定义 URL_MODEL 是无效的

分组中配置的URL_MODEL是有效的

在使用 A 方法调用跨项目调用的时候, 有些字符是不能使用的.<br />      默认模块的名字 <br />      Import <br />      Function <br />      Empty <br />M 方法 不能实例化 自定义的模型类, D方法可以

运行环境文件采用真实目录, 不使用真实目录导致日志无法保存.
> define('ROOT_PATH', realpath('.') . DIRECTORY_SEPARATOR);
> // 自定义运行环境目录, 默认是项目下的Runtime
> define('RUNTIME_PATH', ROOT_PATH . 'Public/Test/Runtime/');


assign 不能用作函数名

show 不能用作函数名

<load /> 标签调用资源时候,由于网站的url使用的是重写模式, 自定义的模版解析标签会失效<br />      解决方案1: 不使用重写模式 <br />      解决方案2: 使用绝对地址的URL 

<volist> 中的empty标签不会使用

<for> 标签中的comparison不会使用

<between> 支持 <else/>标签

<extend> 模版继承中为什么不能使用 extend 直接指定标签

<组的名称不能和动作名称相同否则会被过滤的>, 因为组的URL生成规则为 组/Action/method


















>

