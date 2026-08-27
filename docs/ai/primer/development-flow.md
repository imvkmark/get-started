---
description: '提供的內容是一個白板訪問令牌，用於標識或驗證白板工作區的訪問權限。'
lastUpdated: '2026-08-27 22:39:38'
head:
  - - meta
    - name: 'og:title'
      content: 'AI Harness 开发流程'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '提供的內容是一個白板訪問令牌，用於標識或驗證白板工作區的訪問權限。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ai/primer/development-flow.html'
---
# AI Harness 开发流程

## 生成规则文件

![whiteboard](https://file.wulicode.com/feishu-images/OWBtwMV18hFYFmbmY9TcBx72nBe.png)

### Ai Project V2

![whiteboard](https://file.wulicode.com/feishu-images/ZaLTw5QN0hJT18boHBYctjxTnve.png)

## Claude AI

### 权限

读取 `.env` 文件里的 `DATABASE_URL` 这一行, 或其他 env 敏感数据出现

```Plain Text

Permission to use Bash with command grep -E '^DATABASE_URL=' packages/server/.env has been denied.
```