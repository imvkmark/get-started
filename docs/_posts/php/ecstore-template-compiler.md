---
title: "模版语法 [ base_component_compiler ] 变量使用和核心标签"
date: 2022-04-14 22:33:08
toc: true
categories:
- ["Php","源码阅读","ecstore"]
---

## 变量输出

```
<{$goodname}>
<{$good.name}>
输出变量
// $env.conf
<{$env.conf.desktop.logo}>
相当于 : 
app::get('desktop')->getConf('logo')
```

## 循环 foreach foreachelse

- from    * 待循环数组的名称
- item    * 当前处理元素的变量名称
- key     键名
- name    用于在 $env 中访问改循环的名称 

  说明: 

- 使用 `$env.foreach.onlyname.iteration` 来访问这个循环
- foreach 必须和 /foreach 成对使用，且必须指定 from 和 item 属性.name 属性可以任意指定.foreach 可以嵌套，但必须保证嵌套中的 foreach 名称唯一.from 属性(通常是数组)决定循环的次数。foreachelse 语句在 from 变量没有值的时候被执行.
```
<{foreach from=$array item=value key=key name=onlyname}>
    <{$key}> : <{$value}><br>
    <{$env.foreach.onlyname.iteration}>
<{foreachelse}>
    empty
<{/foreach}>
```

## 赋值 assign

- var    (*string) 被赋值的变量名
- value  (*string) 赋给变量的值

   说明:<br />用于在模板被执行时为模板变量赋值
```
<{assign var="age" value=20}>
<{$age}>
输出:20
<{assign var="arr" value=array("s","b")}>
<{dump var=$arr}>
输出：
array
  0 => string 's' (length=1)
  1 => string 'b' (length=1)
```


include 

---

- file     [*] 文件在view目录下的地址
- app      [*] 指定的appid

说明: 

 加载app级模板, `require[site_view_helper]` 加载网店级模版

```
<{include file='site/product/goods_js.html' app=b2c}>
```

## if, elseif, else

```
● ==, eq, is         相等
● !=, ne,neq         不相等
● >, gt              大于
● <, lt              小于
● >= , gte, ge       大于等于
● <=, lte, le        小于等于
● ===                全等于
● !, not             非
● %, mod             取余数
● is [not] odd       是[否] 奇数
● is [not] even      是[否] 偶数
```
    说明:

- 必须成对出现 <{if}>  <{/if}>
- 允许使用 <{else}>, <{elseif}>
- 所有的php判定条件的函数在这里同样适用, 例如  ||, or , &&, is_array(), is_string()
- 限定符的左右必须用空格分隔开，注意列出的清单中方括号是可选的，在适用情况下使用相应的等号

```
<{if $name eq "yi"}>
...
<{elseif $name eq "yu"}>
...
<{else}>
...
<{/if}>

{if $name == 'Fred' || $name == 'Wilma'}
...
{/if}

% 允许使用圆括号
{if ( $amount < 0 or $amount > 1000 ) and $volume >= #minVolAmt#}
...
{/if}

% 可以嵌入函数 
{if count($var) gt 0}
...
{/if}

% 数组检查 
{if is_array($foo) }
.....
{/if}

% 是否空值检查 
{if isset($foo) }
.....
{/if}

% 测试值为偶数还是奇数
{if $var is even}
...
{/if}
{if $var is odd}
...
{/if}
{if $var is not odd}
...
{/if}

% 测试var能否被4整除 
{if $var % 4 == 0}
...
{/if}
```
     

##  ldelim,rdelim

说明<br />    ldelim 和 rdelim 用于输出分隔符，也就是大括号 "<{" 和 "}>". 模板引擎总是尝试解释大括号内的内容
```
<{ldelim}>    <{rdelim}>
```
 <br />switch, case




dump




link

- app     应用的id
- ctl     控制器
- act     动作
- full
- arg0    参数(*)

