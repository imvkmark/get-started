---
title: "iwebshop validate插件的使用"
date: 2022-04-14 22:12:57
toc: true
categories:
- ["Php","源码阅读","iwebshop"]
---

**引入方式:**<br />       ![](https://file.wulicode.com/yuque/202208/04/14/5741qe2H291P.png?x-oss-process=image/resize,h_76)<br />          只要有form表单中的input标签中type为text,password,select-one,textarea .中添属性pattern 和alt属性系统将会自动添加验证功能<br />       ![](https://file.wulicode.com/yuque/202208/04/14/5741lOcjR8R7.png?x-oss-process=image/resize,h_40)<br />**系统封装的验证**<br />      对于pattern的正则系统对常用的正则都作了一些封装如： <br />          required，email，qq ，id，ip ，zip，phone，mobi ，url ，date，datetime ，int ，float 等等，如果以上还没能满足你的要求，则用户可以自己写正则,如，我想让用户输入一个3-5位的数字：则修改代码

**用户自定义回调函数**<br />**       **![](https://file.wulicode.com/yuque/202208/04/14/5741ZZuxhC4G.png?x-oss-process=image/resize,h_171)<br />      这里就是类似于onsubmit的 return fun()函数 <br />      如果返回的是true,表单通过验证后，表单将提交，不通过将不提交。 <br />          如果返回的是false，则无论表单是否通过表单都将不会被提交。

