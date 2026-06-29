---
description: 'PHP执行耗时脚本时，需关闭输出缓存，结合ob_flush()与flush()实时推送内容。根据浏览器发送不同数量空白字节（IE 256、Firefox 1024、Chrome 2048），设置set_time_limit(0)避免超时，循环输出并每间隔1秒刷新。'
lastUpdated: '2026-06-29 10:01:38'
head:
  - - meta
    - name: 'og:title'
      content: '实时输出内容'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PHP执行耗时脚本时，需关闭输出缓存，结合ob_flush()与flush()实时推送内容。根据浏览器发送不同数量空白字节（IE 256、Firefox 1024、Chrome 2048），设置set_time_limit(0)避免超时，循环输出并每间隔1秒刷新。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/faq/output-instance.html'
---
# 实时输出内容

参考文章: [PHP执行耗时脚本实时输出内容](https://segmentfault.com/a/1190000011059980)

```PHP
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