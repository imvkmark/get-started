# tee(1) - 从标准输入读取并且写到标准输出和文件

```
tee [OPTION]... [FILE]...
```

复制标准输出到每一个文件并且同时将内容显示在标准输出(命令行)中

![](https://file.wulicode.com/doc/20230528/1685285561420.png)


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