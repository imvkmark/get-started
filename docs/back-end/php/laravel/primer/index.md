---
description: '这段内容汇集了多位先贤关于简单、知足与平和生活的智慧：老子倡导无知无欲，达芬奇认为简约是复杂的最终形式，生活的终极要义在于简单、微笑与自然。简单即是美好，好的开始是成功的一半，知足者富，无欲则幸福。'
lastUpdated: '2026-06-21 20:39:47'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel - Inspiring (名言警句) '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '这段内容汇集了多位先贤关于简单、知足与平和生活的智慧：老子倡导无知无欲，达芬奇认为简约是复杂的最终形式，生活的终极要义在于简单、微笑与自然。简单即是美好，好的开始是成功的一半，知足者富，无欲则幸福。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/primer/index.html'
---
# Laravel - Inspiring (名言警句)

首先有几项配置:`config/app.php`

```Plaintext
'alias'=>[
    ...
    'Inspiring'     => 'Illuminate\Foundation\Inspiring',
    ...
]
```

这个告知 laravel 的使用者, `Inspiring`的方法是可以在模版中或者框架中直接调用的. 所以框架中的示例文件会 `Inspiring::quote()`这样调用.这里边的几个句子是这样的:

```Plaintext
When there is no desire, all things are at peace. - Laozi           
# 无知无欲 - 老子

Simplicity is the ultimate sophistication. - Leonardo da Vinci 
# 简约是复杂的最终形式 - 达芬奇

Simplicity is the essence of happiness. - Cedric Bledsoe    
# 生活的终极要义就是简单

Smile, breathe, and go slowly. - Thich Nhat Hanh               
# 微笑, 平和, 慢慢自然

Simplicity is an acquired taste. - Katharine Gerould                
# 简单就是美好的味道

Well begun is half done. - Aristotle                             
# 好的开始是成功的一半

He who is contented is rich. - Laozi                             
# 知足者富

Very little is needed to make a happy life. - Marcus Antoninus    
# 无欲则幸福
```

这里用到了 `Illuminate\Support\Collection`, 这是一个数组/对象的初始化组件, 可以对数组进行过滤, 合并, 查找 , 这里 有 api 文档, 感觉类似于 [underscore 的 php 版本](http://brianhaveri.github.io/Underscore.php/) 里边的函数列表