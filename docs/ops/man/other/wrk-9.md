---
description: 'wrk是一个HTTP性能测试工具，通过命令行指定目标URL及选项进行压测。主要选项包括-c（连接数）、-d（持续时间）、-t（线程数）、-s（Lua脚本）、-H（自定义HTTP头）、--latency（延迟统计）、--timeout（超时时间），数字和时间参数支持国际单位（如1k、2s）。'
lastUpdated: '2026-07-02 12:29:02'
head:
  - - meta
    - name: 'og:title'
      content: 'wrk(9) - 一款 Http 压测工具'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'wrk是一个HTTP性能测试工具，通过命令行指定目标URL及选项进行压测。主要选项包括-c（连接数）、-d（持续时间）、-t（线程数）、-s（Lua脚本）、-H（自定义HTTP头）、--latency（延迟统计）、--timeout（超时时间），数字和时间参数支持国际单位（如1k、2s）。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/man/other/wrk-9.html'
---
# wrk(9) - 一款 Http 压测工具

```Plaintext
wrk <options> <url>
```

```Plaintext
使用方法: wrk <选项> <被测HTTP服务的URL>
  Options:
    -c, --connections <N>  跟服务器建立并保持的TCP连接数量
    -d, --duration    <T>  压测时间
    -t, --threads     <N>  使用多少个线程进行压测

    -s, --script      <S>  指定Lua脚本路径
    -H, --header      <H>  为每一个HTTP请求添加HTTP头
        --latency          在压测结束后，打印延迟统计信息
        --timeout     <T>  超时时间
    -v, --version          打印正在使用的wrk的详细版本信息

  <N>代表数字参数，支持国际单位 (1k, 1M, 1G)
  <T>代表时间参数，支持时间单位 (2s, 2m, 2h)
```