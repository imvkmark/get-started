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

![](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjQzMjNlMmIyNDE0NWM4N2VjZTJmYzM1NjNiYTQzM2NfOTI0NjdlYTdlYTNmMzIzNDcwMTQyYzhlYzViZDk2YjFfSUQ6NzYxMzI0MDM1ODkwMjE4OTAwOF8xNzgzODYzOTQyOjE3ODM4Njc1NDJfVjM)

## 启用 ruff

位置 : `Settings | Python | Tools | Ruff`

![](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmJiZGU2Yjc3MjIyOTVhYmRkODIwOWI0MzFmYTg4YWZfY2ZjZjkwOTRlNjgxNDg3MGE4MDc2M2JiYTliZmZhOWNfSUQ6NzYxMzMwMzkzOTc0ODg1ODgzNl8xNzgzODYzOTQyOjE3ODM4Njc1NDJfVjM)