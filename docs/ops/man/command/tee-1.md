---
description: 'tee命令从标准输入读取数据，同时将数据输出到标准输出和一个或多个文件。常用于保存管道中间结果或同时查看和记录输出。'
lastUpdated: '2026-06-18 08:43:03'
head:
  - - meta
    - name: 'og:title'
      content: 'tee(1) - 从标准输入读取并且写到标准输出和文件'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'tee命令从标准输入读取数据，同时将数据输出到标准输出和一个或多个文件。常用于保存管道中间结果或同时查看和记录输出。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/man/command/tee-1.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/a7bc0f98f3ee5e46ce61d5f50f1d2c3d.png'
---
# tee(1) - 从标准输入读取并且写到标准输出和文件

```Plaintext
tee [OPTION]... [FILE]...
```

复制标准输出到每一个文件并且同时将内容显示在标准输出(命令行)中

![](https://file.wulicode.com/feishu-images/a7bc0f98f3ee5e46ce61d5f50f1d2c3d.png)

## 参数

`-a`, `--append`

追加到给定的文件中, 不会覆盖文件

`-i`,`--ignore-interrupts`

忽略中断（interrupt）信号

`--help`

显示帮助信息

`--version`

输出版本信息并退出

(CentOS 可用)如果文件是 `-`, 再次复制一遍内容并输出到标准输出