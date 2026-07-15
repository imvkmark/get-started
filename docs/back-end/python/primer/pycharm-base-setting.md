---
description: '配置PyCharm为开发环境：将uv设为Python解释器，并启用ruff进行代码检查与格式化。'
lastUpdated: '2026-07-07 00:01:49'
head:
  - - meta
    - name: 'og:title'
      content: '配置 PyCharm 作为趁手的IDE'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '配置PyCharm为开发环境：将uv设为Python解释器，并启用ruff进行代码检查与格式化。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/python/primer/pycharm-base-setting.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/9b5c19828918534dc8254e1ead199ccc.png'
---
# 配置 PyCharm 作为趁手的IDE

本文以 uv 作为管理工具 : uv 使用查看 : [uv 的使用](/back-end/python/primer/uv-get-started.md)

## 配置 uv 作为 Interpreter

**创建虚拟环境**

```Shell
uv venv --python=3.12
```

**添加虚拟环境到 IDE**

配置位置 : `Settings | Python | Interpreter`

![](https://file.wulicode.com/feishu-images/9b5c19828918534dc8254e1ead199ccc.png)

## 启用 ruff

位置 : `Settings | Python | Tools | Ruff`

![](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWRhNjVmMDI4ZGJjODFjMjM0YjA2MTRiZDE4M2QzMGJfMzI3NDJmMmRkZmMxNWZlMDEwN2NkMjVlYmRlOWNjMTRfSUQ6NzYxMzMwMzkzOTc0ODg1ODgzNl8xNzg0MTUxOTM4OjE3ODQxNTU1MzhfVjM)