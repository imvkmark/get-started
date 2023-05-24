---
title: "phpcms2008 栏目页分页"
date: 2022-04-14 22:13:17
toc: true
categories:
- ["Php","源码阅读","phpcms2008"]
---

现在将方法描述如下：

修改 ./include/html.class.php ，将第 58 行提至 51 行前，整个从 49 行到 61 行由

if($type == 0)

   {

    if($child==1) 

    { 

     $arrchildid = subcat('phpcms',$catid); 

     $template = $template_category; 

    } 

    else 

    { 

     if($page == 0) $page = 1; 

     $template = $template_list; 

    } 

   }

变为

if($type == 0)

   {

    if($page == 0) $page = 1; 

    if($child==1) 

    { 

     $arrchildid = subcat('phpcms',$catid); 

     $template = $template_category; 

    } 

    else 

    { 

     $template = $template_list; 

    } 

   }

此为第一步，接着修改 ./admin/html.inc.php ，将从 61 行到 80 行由

if($CATEGORY[$catid]['child'])

     { 

      $pages = 1; 

      $html->category($catid); 

     } 

     else 

     { 

      $offset = $pagesize*($page-1); 

      if($page == 1) 

      { 

       $contents = cache_count("SELECT COUNT(*) AS `count` FROM `".DB_PRE."content` WHERE catid=$catid AND status=99"); 

       $total = ceil($contents/$PHPCMS['pagesize']); 

       $pages = ceil($total/$pagesize); 

      } 

      $max = min($offset+$pagesize, $total); 

      for($i=$offset; $i<=$max; $i++) 

      { 

       $html->category($catid, $i); 

      } 

     } 

修改为

$offset = $pagesize*($page-1);

     if($page == 1) 

     { 

      $condition=get_sql_catid($catid); 

      $contents = cache_count("SELECT COUNT(*) AS `count` FROM `".DB_PRE."content` WHERE status=99 $condition"); 

      $total = ceil($contents/$PHPCMS['pagesize'])+1; 

      $pages = ceil($total/$pagesize); 

     } 

     $max = min($offset+$pagesize, $total); 

     for($i=$offset; $i<$max; $i++) 

     { 

      $html->category($catid, $i); 

     } 

变成了 61 行到 73行，如此，重新生成 html，一级栏目如果使用 tag 标签调用（开启了分页）就应该可以出现分页了。

