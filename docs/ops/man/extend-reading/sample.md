---
description: '本文档介绍了命令的语法与示例，支持根据显示长度自动换行。涵盖了常用选项与参数，通过实例（如查看文件夹大小）演示操作，并提供扩展阅读资源。'
lastUpdated: '2026-06-21 20:17:17'
head:
  - - meta
    - name: 'og:title'
      content: 'sample - 示例'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文档介绍了命令的语法与示例，支持根据显示长度自动换行。涵盖了常用选项与参数，通过实例（如查看文件夹大小）演示操作，并提供扩展阅读资源。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/man/extend-reading/sample.html'
---
# sample - 示例

这里写简要描述如果有更多的描述写在这里

```Plaintext
# 语法, 根据实际显示长度换行
du [-abcDhHklmsSx] [-L <符号连接>][-X <文件>][--block-size][--exclude=<目录或文件>]
    [--max-depth=<目录层数>][--help][--version][目录或文件]
```

> 返回值: 如果有, 写在这里

## 选项 & 参数

**选项**

`-o`, `--option`

两个选项的写法

`--option <option>`

选项带有参数的说明

**参数**

## 实例 & 常用

```Plaintext
# 查看文件夹的大小
du -h --max-depth=1
```

## 扩展阅读

- Aliyun 盘挂载/扩容