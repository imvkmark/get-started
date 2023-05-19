---
title: "truncate(1) - 将文件的大小缩小或者扩展到指定大小"
date: 2022-08-22 14:01:39
toc: true
categories:
- ["Man","commands(1)"]
---

```
truncate OPTION... FILE...

```

## 描述
将每个 `FILE` 的大小缩小或者扩展到指定大小, 如果指定的 `FILE` 不存在则会自动创建一个文件, 如果 `FILE` 大于指定的大小，则多余的数据将丢失。如果 FILE 较短，则将其扩展，并且扩展部分读取为零字节

强制性的长选项参数对于缩写同样适用<br />`-c, --no-create`<br />不创建任何文件<br />`-o, --io-blocks`<br />将 `SIZE` 视为 IO 块数, 而不是字节数<br />`-r, --reference=FILE`<br />使用指定 `FILE` 的大小<br />`-s, --size=SIZE`<br />设置 `SIZE` 大小<br />`--help`<br />显示帮助信息并退出<br />`--version`<br />输出版本信息并退出

`SIZE` 可以是（可选的整数后跟）以下之一：对于 G、T、P、E、Z、Y，或者大小可以是 KB `1000`、K `1024`、MB `1000*1000`、M `1024*1024`，依此类推<br />`SIZE` 还支持以下列修改字符之一为前缀: `+`扩展，`-` 减少，最多 `<`，`>` 至少，`/` 向下舍入为倍数，`%` 向上舍入为倍数。<br />请注意，`-r` 和 `-s` 选项是互斥的

## 示例
**清空登录日志**
```
# sudo truncate -s0 /var/log/btmp 
```

> 参考
> -  [https://linux.die.net/man/1/truncate](https://linux.die.net/man/1/truncate)

