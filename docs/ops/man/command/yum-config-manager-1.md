---
description: 'yum-config-manager 用于管理 yum 配置选项和 yum 选项，并提供补充示例。'
lastUpdated: '2026-06-18 08:42:33'
head:
  - - meta
    - name: 'og:title'
      content: 'yum-config-manager(1) - 管理 yum 配置选项和 yum'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'yum-config-manager 用于管理 yum 配置选项和 yum 选项，并提供补充示例。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/man/command/yum-config-manager-1.html'
---
# yum-config-manager(1) - 管理 yum 配置选项和 yum

[yum-config-manager(1) - Linux manual page](https://man7.org/linux/man-pages/man1/yum-config-manager.1.html)

```Plaintext
yum-config-manager [options] [section ...]
```

yum-config-manager是一个管理主 yum 配置选项、切换启用或禁用存储库以及添加新存储库的程序。

除非使用 `--add-repo`，否则程序将输出所选部分的当前配置，并可选择将其保存回相应的文件。  
默认情况下，如果没有指定位置参数，程序将选择 [main] 部分和每个启用的存储库。你可以通过指定自己的部分列表作为参数来覆盖它（这些也可能包括禁用的存储库）。`section` 可以是 main 或 repoid。

## 选项

`-h, --help`

显示帮助信息或者退出

`--setopt=option=value`

设置任意 yum 的配置项或者 repo 文件的配置项

设置全局的配置使用 : `--setopt=option=value`

设置 repo 选项使用: `--setopt=repoid.option=value`

后一种形式接受 repoid 中的通配符，这些通配符将扩展到选定的部分。如果 repoid 不包含通配符，则自动选择；如果你正在处理一个禁用的 repo，这很有用，在这种情况下你不必另外将它作为参数传递。

`--save`

保存当前的选项

`--enable`

启用当前指定的 repo(自动保存), 启用所有的 repo 使用命令 : `yum-config-manager --enable \*`

`--disable`

禁用当前指定的 repo(自动保存), 禁用所有的 repo 使用命令 : `yum-config-manager --disable \*`

`--add-repo=ADDREPO`

添加并启用指定文件或 Url 的 repo

## 补充

yum-config-manager 继承了 yum 的所有选项

## 示例

显示来自于 foo, bar 的 `[main]` 配置

```Plaintext
yum-config-manager main foo bar
```

启用 repo foo 和 bar

```Plaintext
yum-config-manager --enable foo bar
```

变更一个全局选项

```Plaintext
yum-config-manager --setopt=installonly_limit=5 --save
```

改变一个 repo 的选项, 即使这个 repo 是禁用状态

```Plaintext
yum-config-manager --setopt=foo.skip_if_unavailable=1 --save
```

同时改变多个 repo 库的一个选项

```Plaintext
yum-config-manager --setopt=\*.skip_if_unavailable=1 --save foo bar baz
```

同时改变启用 repo 的选项

```Plaintext
yum-config-manager --setopt=\*.skip_if_unavailable=1 --save
```

同时改变多个 repo 的选项

```Plaintext
yum-config-manager --setopt=\*.skip_if_unavailable=1--save \*
```