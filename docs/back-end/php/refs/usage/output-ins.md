---
description: '参考文章: PHP执行耗时脚本实时输出内容'
lastUpdated: '2025-12-12 13:46:00'
head: 
  - - meta
    - name: 'og:title'
      content: '实时输出内容 / Snippet'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '参考文章: PHP执行耗时脚本实时输出内容'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/php/refs/usage/output-ins.html'
---
# 实时输出内容 / Snippet



参考文章: [PHP执行耗时脚本实时输出内容](https://segmentfault.com/a/1190000011059980)

```php
// 关闭 php 缓存，或者在 flush 前 ob_flush();
ob_end_flush();
// ie下 需要先发送256个字节, firefox 1024, chrome 2048
echo str_repeat(' ', 1024);
set_time_limit(0);
$i = 0;
while (true) {
    echo 'Now Index is :' . $i++ . '<br>';
    flush(); // 把缓存推送到浏览器去
    sleep(1);
}
```



