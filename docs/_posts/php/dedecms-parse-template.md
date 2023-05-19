---
title: "[转] dedecms代码研究（6）ParseTemplet算法分析"
date: 2022-04-14 22:13:24
toc: true
categories:
- ["Php","源码阅读","dedecms"]
---

国庆放假三天开始生病，病好了就开始疯狂地忙碌，我晕，通过昨天的努力总算可以继续更新了。今天讲的是dedecms最关键的东西，模板分析啦。

先看看一个dedecms标签,大家心里有个数：

```
{dede:arclist row=10 orderby=pubdate type='image.' imgwidth='143' imgheight='106'}
<li><a href="[field:arcurl/]">[field:image/]<span class="title">[field:title/]</span></a></li>
{/dede:arclist}
```

参考上面标签我们就可以进一步分析啦。<br />这里假定，你已经了解了dedecms的标签形式，标签格式，和标签种类。

下面我们展开分析<br />先看方法前面初始化一些最基本的变量：<br />1）标签起始符号和结束符号。如：“{”和"}"
```
$TagStartWord = $this->TagStartWord;
$TagEndWord = $this->TagEndWord;
```

2）设置临时变量，用于临时存储查找到的新标签在模板中的起始位置和结束位置。
```
$sPos = 0; $ePos = 0;
```

3）设定完整标签起始字符串和结束字符串。比如：“{dede:”这种形式
```
$FullTagStartWord =   $TagStartWord.$this->NameSpace.":";
$sTagEndWord =   $TagStartWord."/".$this->NameSpace.":";
$eTagEndWord = "/".$TagEndWord;
```
<br />这里值得注意的是结束部分分两种，一种是类似于{aa:ff /}单体结构标签，一种是类似于{aa:fff}{/aa:fff}符合结构标签

4）获取标签其实字符串（{dede:）长度和整个模板的长度
```
$tsLen = strlen($FullTagStartWord);
$sourceLen=strlen($this->SourceString);
```

上面就是初始变量设置部分啦。

接下来是个小判断，如果整个模板的长度不大于标签起始字符串的长度加3，就退出。
```
if( $sourceLen <= ($tsLen + 3) ){
       return;
}
```
<br />为什么要加3（也就是模板长度最少应该是标签起始字符串长度加4）呢？<br />我们看看我们能写出的最短标签：
```
{dede:a/}
```
<br />冒号后面是可能出现的最短字符串，就是3个，所以这里如果小于3就连最起码的一个标签都无法完整，所以要做这个判断，至于等于嘛，我个人认为是没必要的。

好继续往下看下面两句：
```
$cAtt = new DedeAttributeParse();
$cAtt->charToLow = $this->CharToLow;
```
<br />创建了一个DedeAttributeParse类，并设定了CharToLow属性，这个类看名字应该是标签属性分析类，charToLow就是是否把字符串自动转化为小写。

接下来就是一个长长的for循环了，遍历模板字符串的每个字符进行分析，提取模板中的标签。
```
for($i=0; $i < $sourceLen; $i++)
```

下面我们就来看看这个for循环里面是怎么分析的吧

先定义一个临时变量，存储当前找到的标签的名字
```
$tTagName = '';
```

下面是一个判断，注释写得很清楚，但我们现在还看不懂，所以先知道有这么个判断就行啦<br />//如果不进行此判断，将无法识别相连的两个标记
```
if($i-1 >= 0){
       $ss = $i-1;
}else{
       $ss = 0;
}
```
<br />设定了一个变量$ss，后面留意一下就是了。

下面就是查找标签了
```
$sPos = strpos($this->SourceString,$FullTagStartWord,$ss);
$isTag = $sPos;
```
<br />找到在模板字符串中从$ss指定的位置开始，第一个类似“{dede:”这种标签头的位置，并把$isTag变量设置为strpos的返回值，这是个偷懒的写法，应该明确指出查到标签了，就是true，而不是任意字符。<br />我们看到这里用到了$ss，作用是设定查找的起始位置。

我们继续往下看吧<br />下面一个if语句好像是对第一个字符开始就是标签的情况下的一种补充？<br />搞不懂了，本来就能找到的，加这句什么意思呢？多余哦，这个肯定有更好方法的。不多说这句了。

在下来的if就是如果没找到标签就不循环了，不解释。

再下来，一个子循环
```
for($j=($sPos+$tsLen);$j<($sPos+$tsLen+$this->TagMaxLen);$j++)
```
<br />$tsLen我们之前说了，是标签头（类似{dede:）长度<br />那这个for的解释就是遍历从标签头的下一个字符开始到标签最大长度位置结束这中间的所有字符，看来是要找标签名字啦<br />再看看for循环里面，很简单的几句，就是找出标签的名字，如何找出来的呢？
```
if($j>($sourceLen-1)){
   break;
}else if( ereg("[/ \t\r\n]",$this->SourceString[$j]) || $this->SourceString[$j] == $this->TagEndWord ){
   break;
}else{
   $tTagName .= $this->SourceString[$j];
}
```
<br />这个for里面的if语句，两种情况下名字结束，一种是字符位置到模板的字后一个位置，另一种是发现了空格、断行、tab符、/等或找到了标签结束符（如："}"）

通过这个for循环，标签的名字就弄出来了，保存在变量$tTagName中。

下面是一个极其长的if语句啦，判断$tTagName变量是否为空，如果是空则跳出循环（标签出错了嘛），不过跳出前还设置$i，有什么用？看不懂。<br />接下来重点就是找到标签名字的情况啦。<br />先是设置几个变量
```
$i = $sPos+$tsLen;
$endPos = -1;
$fullTagEndWordThis = $sTagEndWord.$tTagName.$TagEndWord;
```
<br />把循环模板字符串的指针$i跳到标签名字开始的地方。然后设置变量$endPos 为-1，组合出一种标签结束符（{/dede:xxx}）

接下来是查找三个位置：$eTagEndWord（/}）、$FullTagStartWord（{dede:）、$fullTagEndWordThis（{/dede:xxx}）<br />$e1 = strpos($this->SourceString,$eTagEndWord, $i);<br />$e2 = strpos($this->SourceString,$FullTagStartWord, $i);<br />$e3 = strpos($this->SourceString,$fullTagEndWordThis,$i);<br />$e1就是在标签名字找到后第一个"/}"出现的位置，$e2就是第一个“{dede:”出现的位置，$e3就是第一个{/dede:xxx}出现的位置。这里注意，获取$e3值的时候，$fullTagEndWordThis是以当前找到的标签为名字的结束字符串。

在下面几句是统一$e1 $e2 $e3的值，使这三个变量如果找到要找的标签字符串就保存位置，找不到就保存-1<br />$e1 = trim($e1); $e2 = trim($e2); $e3 = trim($e3);  <br />$e1 = ($e1=='' ? '-1' : $e1);<br />$e2 = ($e2=='' ? '-1' : $e2);<br />$e3 = ($e3=='' ? '-1' : $e3);

接下来就要根据这三个值进行一些处理啦。处理什么呢？我们先看看这段代码吧：<br />//not found '{/tag:'<br />if($e3==-1) {<br />   $endPos = $e1;<br />   $elen = $endPos + strlen($eTagEndWord);<br />}<br />//not found '/}'<br />else if($e1==-1) {<br />   $endPos = $e3;<br />   $elen = $endPos + strlen($fullTagEndWordThis);<br />}<br />//found '/}' and found '{/dede:'<br />else{<br />       //if '/}' more near '{dede:'、'{/dede:' , end tag is '/}', else is '{/dede:'<br />   if($e1 < $e2 &&   $e1 < $e3 ){<br />       $endPos = $e1;<br />       $elen = $endPos + strlen($eTagEndWord);<br />   }else{<br />       $endPos = $e3;<br />       $elen = $endPos + strlen($fullTagEndWordThis);<br />   }<br />}<br />我们知道，dedecms标签结束有两种方式，一种是（/}）这种方式，还有一种是（{/dede:xxx}），除此之外没有他选，如果没有这两种结束，只能说明一个问题，模板内的标签不完整。这个if语句做了一个假设，就是两种标签结束方式一定是有一种存在的。

if的第一个分支，假设$e3为-1，也就是（/}）这种方式存在，所以设置了标签结束符位置变量$endPos为变量$e1的值，而此时，标签最终结束位置就知道了，是$endPos加上（/}）的长度。

if语句的第二个分支和第一个类似，只是假定找到了（{/dede:xxx}）。

if语句的else部分，是假定两个都找到了（有这种可能吗?），那么就要进一步分析啦，如果（/}）这种结束符出现的位置比下个标签起始位置靠前，而且还比$e3的结束符（{/dede:xxx}）位置靠前，说明当前找到的（/}）就是当前标签的结束符；否则一定是（{/dede:xxx}）这种啦。

上面通过$e1 $e2 $e3的变量设置和一个if语句，最终是要得到两个变量：$endPos和$elen，当前标签结束符开始的位置和结束位置。

下面又是一个if语句，很简单，通过endPos是否为-1判断当前标签是否正确结束。如果没有正确结束则打印一段文字，然后就退出循环。这块设计的是否可以再好点呢，比如把这块出错的标签替换为一个错误信息，或在做模板分析前，统一检查语法正确性，以保证更快速分析模板。

再继续往下看，又是设置了两个变量。<br />$i = $elen;<br />$ePos = $endPos;<br />由于找到当前循环要找的标签，所以，设置主循环for的循环变量$i到下个标签的起始位置。<br />设置当前标签的结束符起始位置$ePos。

当前标签的开始位置和结束位置都确定了，接下来就可以分析标签的属性了，我们继续。<br />$attStr = '';<br />$innerText = '';<br />$startInner = 0;<br />三个变量，我们了解到，标签内部有两种东西，一种是属性字符串，还有一种是内容字符串。$startInner 变量指示内容字符串是否开始（奇怪为什么不用布尔值呢）。<br />下面一个for循环开始提取这些字符串，从标签名称后面到结束符开始之前的部分。<br />for($j=($sPos+$tsLen);$j < $ePos;$j++)

看看循环里面是怎么提取属性字符串和内容字符串的。<br />if($startInner==0 && ($this->SourceString[$j]==$TagEndWord && $this->SourceString[$j-1]!="\\") ){<br />   $startInner=1;<br />   continue;<br />}<br />if($startInner==0){<br />   $attStr .= $this->SourceString[$j];<br />}else{<br />   $innerText .= $this->SourceString[$j];<br />}<br />嗯，用了两个if语句，第一个语句是用来判断内容字符串是否开始的。第二个if语句根据内容字符串开始指示符判断，分别读取内容字符串和属性字符串。<br />个人认为，通过特殊标识符截字更快一些。<br />这里面还有个问题就是，是否内容字符串开始是如何判断的呢？<br />我们看看第一个if<br />if($startInner==0 && ($this->SourceString[$j]==$TagEndWord && $this->SourceString[$j-1]!="\\") )<br />$startInner==0这句就是做个过滤，当读取内容字符串的时候就不会再走这个if了，关键是&&后面括号里面的内容。<br />如果当前字符为标签结束符$TagEndWord（}）而且结束符的前一个字符不是反斜杠的时候，就是属性部分结束了，如果是反斜杠说明是一些模板内容之类的了。

通过上面的for循环我们就提取出了当前标签的属性和内容，接下来就开始分析属性和内容啦<br />$cAtt->SetSource($attStr);<br />if($cAtt->cAttributes->GetTagName()!=''){<br />   $this->Count++;<br />   $CDTag = new DedeTag();<br />   $CDTag->TagName = $cAtt->cAttributes->GetTagName();<br />   $CDTag->StartPos = $sPos;<br />   $CDTag->EndPos = $i;<br />   $CDTag->CAttribute = $cAtt->cAttributes;<br />   $CDTag->IsReplace = FALSE;<br />   $CDTag->TagID = $this->Count;<br />   $CDTag->InnerText = $innerText;<br />   $this->CTags[$this->Count] = $CDTag;<br />}<br />通过属性分析类来进行分析啦，然后创建DedeTag标签类实例（就是创建一个标签对象），然后把当前标签的属性都放进这个标签对象。<br />包括标签名称、起始位置、结束位置、属性数组、内部字符串等。<br />然后，帮这个新的标签对象放到DedeTagParse类的CTags数组中。

这样一个标签就分析完了，也结束了一次最外层的for循环。原来每循环一次只能分析出一个标签，有多少个标签就 有可能循环多少次。

整个模板分析结束后，如果允许缓存再调用SaveCache方法，把当前模板的标签信息保存到缓存文件或者叫中间信息文件。

模板分析就讲完啦，这样该有的信息就都有了，我们又可以回到LoadTemplate方法继续啦。

-CONTINUE-

