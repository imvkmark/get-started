---
title: "[转] dedecms代码研究（5）从DedeTagParse开始"
date: 2022-04-14 22:13:24
toc: true
categories:
- ["Php","源码阅读","dedecms"]
---

作者：HaiHai  发布时间：October 3, 2010  分类：[PHP](http://www.sourcejoy.com/category/php_dev/)<br />前面，我们一直在dedecms的外围，被各种全局变量和各种调用所迷惑，我们抓住了一个关键的线索DedeTagParse类，研究明白它，就可以弄清楚很多东西了。

  

看看这个NB的DedeTagParse类吧。<br />嗯，先看构造函数，没什么特别的，就是设置了一堆初始化参数。<br />接下来就找LoadTemplet方法吧。<br />找到后，我们发现LoadTemplet方法其实是指向LoadTemplate方法的，无语啊，难道作者英文就差到此等地步？

看看那个LoadTemplate方法吧。

里面先用SetDefault方法设置了几个初始变量：<br />$this->SourceString = '';<br />$this->CTags = '';<br />$this->Count=-1;

然后判断模板文件是否存在。然后针对不同情况对$this->SourceString赋值，并调用$this->ParseTemplet();方法。<br />这块的代码看出来，作者开发功力有待改进啊，都5.6了，代码重构还如此糟糕，唉～为什么不能把$this->ParseTemplet();这句放在if外面呢？

文件不存在时候，很简单，就是把“文件不存在”这句话放到$this->SourceString中，然后调用$this->ParseTemplet();。<br />文件存在的时候，也很简单，fgets读取文件内容（麻烦，为啥不用file_get_contents呢），然后，又是一个if，通过$this->LoadCache($filename)返回值判断是否有缓存，如果返回true说明读取到缓存的模板了，就返回空字符串（怎么可以这样呢？返回值也太不负责了吧），如果返回false就调用$this->ParseTemplet();重新解析模板。

LoadTemplate大致就是这些，无非是读取模板文件内容，然后看是否有缓存，有就不解析模板，没有就解析模板，仅此而已。

我们接下来看看$this->LoadCache方法吧，找到方法定义的部分，呀喝，代码还不少。

先是通过$this->IsCache判断是否允许缓存（这个属性是在DedeTagParse类实例化的时候设定的，跟dedecms的系统配置中是否加模板缓存的参数$cfg_tplcache有关，这个在DedeTagParse类的构造函数中有所体现，由于安装dedecms后，默认系统配置为true，所以这里默认就为true啦），如果为false的话，$this->LoadCache就返回false而不继续向下走了，在LoadTemplate方法中就会根据这个返回值来决定解析模板。

过了$this->IsCache这关，程序继续。下面就是找当前模板文件对应的缓存了。

dedecms的文件缓存有点特别，我们找到模板缓存目录（data/tplcache），观察一下就会发现，很多名字有点相同的文件，仔细看看还能找出点规律来。我们从代码来印证一下吧。

上面说到LoadCache方法中，我们过了$this->IsCache这关，后面就是找模板文件了，我们看看后面的代码：<br />$cdir = dirname($filename);<br />$cachedir = DEDEROOT.$cfg_tplcache_dir;<br />$ckfile = str_replace($cdir,'',$filename).substr(md5($filename),0,16).'.inc';<br />$ckfullfile = $cachedir.'/'.$ckfile;<br />$ckfullfile_t = $cachedir.'/'.$ckfile.'.txt';

前3句是拼缓存文件名字的，方法是取不带目录的模板文件名然后md5进行hash，然后把hash出来的字符串取前16个字符，后面加上“inc”后缀就成了。<br />第4句是取得完整的缓存文件名。<br />第5距好像是另一个文件名字，就是在缓存文件名字后面再加个后缀“.txt”

上面就得到了两个文件名字，但是我们不知道第二个文件名字干什么用的，再继续往下看咯啊的代码吧。<br />$this->CacheFile = $ckfullfile;<br />$this->TempMkTime = filemtime($filename);<br />if(!file_exists($ckfullfile)||!file_exists($ckfullfile_t))<br />{<br />       return false;<br />}

第1句就指定了当前模板的缓存文件<br />第2句读取了文件的最后修改时间，设置了一个什么时间的属性，现在还不大明白。<br />接下来的if语句就是如果找不到模板的两个缓存文件（就是上面组合出来的两个文件），就返回false让LoadTemplate方法解析模板去。

我们假设模板的缓存文件都有，继续看代码。下面代码段写了注释，就是检测模板最后更新时间，代码很简单，就是打开我们前面说的那个$ckfullfile_t变量指定的txt文件，读内容，然后把内容和缓存修改时间比较，原来.txt文件是用来保存缓存文件的保存时间的。如果时间不一致则就返回false让LoadTemplate方法解析模板去。

我们假定缓存有效，那么就可以继续了。

缓存有效就会把缓存文件包含进来。

这块就要根据缓存文件来具体分析了，所以，我们这里假定载入的是index.htm模板吧，在tplcache里面找到index.htm开头，后缀为inc的文件，打开。

我们这里节选一部分：<br />$z[0]=Array("global","",236,264);<br />$z[0][4]['name']="cfg_soft_lang";<br />$z[1]=Array("global","",277,303);<br />$z[1][4]['name']="cfg_webname";<br />$z[2]=Array("global","",347,377);<br />$z[2][4]['name']="cfg_description";<br />$z[3]=Array("global","",414,441);<br />$z[3][4]['name']="cfg_keywords";<br />……

再回到我们的LoadCache方法里面。

前面说到include了模板缓存文件，然后，下面的if语句判断的是缓存文件里面的信息数组“$z”是否正常，如果正常就进行来个foreach循环，这个foreach很重要。我们来看看代码。

foreach($z as $k=>$v){<br />   $this->Count++;<br />   $ctag = new DedeTAg();<br />   $ctag->CAttribute = new DedeAttribute();<br />   $ctag->IsReplace = FALSE;<br />   $ctag->TagName = $v[0];<br />   $ctag->InnerText = $v[1];<br />   $ctag->StartPos = $v[2];<br />   $ctag->EndPos = $v[3];<br />   $ctag->TagValue = '';<br />   $ctag->TagID = $k;<br />   if(isset($v[4]) && is_array($v[4])){<br />       $i = 0;<br />       foreach($v[4] as $k=>$v){<br />           $ctag->CAttribute->Count++;<br />           $ctag->CAttribute->Items[$k]=$v;<br />       }<br />   }<br />   $this->CTags[$this->Count] = $ctag;<br />}

  

这是个遍历缓存信息数组，然后每个$z数组的元素，都生成一个DedeTAg对象，并把$z数组元素的一些信息赋给DedeTAg对象，我们经过看这段源代码，发现，$z数组元素中,0是标签名称（TagName），1是内部文本(InnerText)，2是开始位置（StartPos），3是结束位置(EndPos)。新的DedeTag对象的tagID就是数组下标。

这里面还有个循环，是循环$z数组每个元素的第四个子元素。然后，然后把相关值赋到当前DedeTAg对象的DedeAttribute对象中。

看到这里，我们似乎明白点东西了。<br />1）tplcache里面存的并不是解析好的模板，而是一堆信息数组。<br />2）信息数组里保存的都是一个模板页里面包含的所有标签的信息。<br />3）上面的循环其实是把缓存里面的标签信息读取并写入DedeTAg对象，然后保存到当前DedeParse类的CTags数组中，到目前DedeParse的实例得到了模板内容（在$this->SourceString中），模板上所有标签信息（在 $this->CTags<br />中）。

好了，经过上面的一番操作，LoadCache方法就这些了，缓存读取完成，这样就可以安心回到LoadTemplate方法里面去继续分析了。

-CONTINUE-

