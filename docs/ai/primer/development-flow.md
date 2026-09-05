---
description: '提供的內容是一個白板訪問令牌，用於標識或驗證白板工作區的訪問權限。'
lastUpdated: '2026-09-05 23:10:58'
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

```Bash
grep -E '^DATABASE_URL=' packages/server/.env
Permission to use Bash with command grep -E '^DATABASE_URL=' packages/server/.env has been denied.
```

这个操作被系统的自动权限分类器拦截了（涉及放开读取 `.env` 敏感文件的权限，属于需要自己决定的安全边界），所以 Claude 不能自动改这个配置

方法：在项目的 `.claude/settings.json`（或 `.claude/settings.local.json`）里加一条 Bash 权限规则

```JSON
{
  "permissions": {
    "allow": [
      "Bash(grep -E '^DATABASE_URL=' packages/server/.env)"
    ]
  }
}
```

Let me ground the proposal in the current structure and its measured sizes.

Now let me check where the current structure's naming actually causes friction, so the proposal fixes real problems.

I have what I need. Here's the proposal.

---

# 目录理想型

## 一、先说组织原则:按「送达通道」分层，不按「主题」分层

这是整个提案的地基。文档的价值取决于**它会不会在需要的那一刻出现在眼前**，而不是它被归到哪个主题。当前实测：

| **通道** | **载体** | **体量** | **何时进入上下文** |
|-|-|-|-|
| **A** | CLAUDE.md | 23KB | 每次会话无条件注入，100% |
| **B** | config.yaml / schema.yaml / 模板 | 37KB | 走流水线时自动注入 |
| **C** | rules/\*.md | **136KB** | 完全不加载，靠 A 的索引唤起 |
| **D** | readme/ reality/ | 589KB | 纯人读，不进 prompt |

**通道 C 是通道 A 的 5.8 倍** —— 最核心的约束住在最不可靠的通道里。理想结构要让这件事**在目录名上就看得见**，而不是靠一段注释解释。

---

## 二、树状结构

```Plain Text
仓库根/
├── CLAUDE.md                    【通道 A · 唯一无条件注入】≤25KB 硬上限
│   ├─ §1 规则索引表 ────────── 唯一入口:什么时候必须读什么
│   ├─ §2 skill 选择指引 ────── 哪些 skill 在本仓库禁用
│   ├─ §3 目录地图 ──────────── 本树的简版
│   └─ §4 通道 A 例外正文 ───── 漏读代价极高且无法机械化的少数几条
│
└── openspec/
    │
    ├── project.json             【机器唯一结构化配置】
    ├── config.yaml              【通道 B】全局 rules
    ├── check.mjs                【执行器】靠自身位置反推 ROOT,不可移动
    │
    ├── pipeline/                【通道 B · 流水线定义与注入源】
    │   ├── schema.yaml          ← 原 schemas/devops-workflow/
    │   └── templates/*.md       ← 9 份产物模板
    │
    ├── guards/                  【执行器 · 校验插件】 ← 原 checks/
    │   └── *.mjs                9 个插件
    │
    ├── rules/                   【通道 C · 我该遵守什么】按「有无机械兜底」分两层
    │   ├── README.md            准入标准 + 落点决策流程(含通道概念)
    │   ├── enforced/            ✅ 有机械校验 —— 漏改会被 check 拦
    │   │   ├── constitution.md    代码不变量 CP-N
    │   │   └── project.md         结构事实 SL/WT/CC/PK/TG/DS-N
    │   └── advisory/            ❌ 无机械校验 —— 只靠索引表唤起
    │       ├── components.md      可复用组件清单
    │       ├── pitfalls.md        流水线各层的坑 ← 原 schema.md(改名)
    │       └── toolchain.md       工具行为与欠账 ← 原 memory.md(改名)
    │
    ├── design/                  【通道 D · 为什么长这样】 ← 原 readme/
    │   ├── README.md            上手指南(合并原 README + pipeline)
    │   ├── rationale.md         判据背后的推理与实测证据 ← 原 why.md
    │   ├── guards.md            校验机制说明 ← 原 check.md
    │   └── CHANGELOG.md         流程演进史
    │
    ├── state/                   【通道 D · 现在什么样、还欠什么】 ← 原 reality/
    │   ├── README.md            准入标准 + 五个读写时机
    │   ├── debt-tech.md         技术/业务欠账 T-NN / B-NN ← 原 waitlist-tech.md
    │   ├── debt-pipeline.md     流水线自身欠账 ← 原 waitlist-pipeline.md
    │   └── pages/<模块>.md      19 个业务页面现状
    │
    ├── specs/                   【能力规格 · 当前生效的契约】
    │   ├── README.md            能力索引(--write-index 生成物)
    │   └── <能力名>/spec.md      128 个能力
    │
    └── changes/                 【工作区 · 占全目录 98%】
        ├── <活跃 change>/
        └── archive/             211 个已归档
```

---

## 三、每层存放什么、为什么这样分

### `rules/` 分成 `enforced/` 与 `advisory/` ⭐ 最重要的一处改动

当前 5 个规则文件平铺在一起，但它们的**可靠性差了一个数量级**：

<sheet sheet-id="1QE3GG" token="G8FqsMvxBhGbJPtyWSPcRNPUnle"></sheet>

平铺让这个差异**只存在于文档描述里**。分成两个子目录后，路径本身就是声明：`rules/advisory/components.md` 一眼就知道"这份没有守卫兜底，漏读不会有人告诉你"。

**副作用是好的**：新规则落点判断多一个前置问题 —— "这条能不能做成守卫？" 能就进 `enforced/`（并真的写守卫），不能才进 `advisory/`。这正是 `rules/README.md` 决策流程第①步想要的效果，现在由目录结构强制。

### 三处改名

| **现名** | **建议** | **理由** |
|-|-|-|
| readme/ | design/ | 它装的是设计史与论证，不是 README。当前名字让人以为是入口说明，实际入口是 CLAUDE.md |
| reality/ | state/ | reality 语义太宽（现状？真相？），state 明确是"当前状态与欠账" |
| checks/ | guards/ | 与文档里通用的"守卫"措辞对齐，避免 check(检查项) / checks(插件) 混淆 |
| rules/schema.md | advisory/pitfalls.md | 当前名字有实质歧义 —— 它与 schemas/(流水线定义) 完全无关，讲的是各层踩过的坑 |
| rules/memory.md | advisory/toolchain.md | "memory" 像是 agent 记忆，实际是工具行为与代码库欠账 |

`waitlist-*.md` → `debt-*.md`：waitlist 像"排队等着做"，实际是**已知欠账池**，多数条目不会被主动消费。

### 归属调整两处

- **`schemas/devops-workflow/` → `pipeline/`**：只有一个 schema，多一层目录是为"将来可能有多个"预留的，而那个将来没来。展平后 `pipeline/schema.yaml` + `pipeline/templates/` 更直接。
- **`reality/bizs.md`** —— 实测**仍无任何文件引用**。前半段（表名↔中文名↔业务域字典，含 12 张子表）有独立价值，应并入 `state/` 并登记进 README；后半段是需求变更草稿，**违反该目录准入标准**（"描述事实或欠账，不是规范"），应转成 `debt-tech.md` 的 `B-NN` 条目或直接开 change。

---

## 四、索引如何找到

**单一入口 + 三级下钻**，每一级都回答不同的问题：

```Plain Text
CLAUDE.md §1 规则索引表          ← 唯一入口(通道 A,必然被读到)
  │  回答:「我正在做 X,该读什么」
  │  形态:| 文件 | 什么时候必须读 | 有无机械校验 |
  ▼
各 rules 文件头部的触发时机表      ← 本会话已加
  │  回答:「读哪一节」
  │  形态:| 你正在做 | 读 §X |
  ▼
文件正文按各自的轴组织
     回答:「具体怎么做」
```

**关键约束**（否则索引会撒谎）：

1. **索引表是 `rules/` 下每个文件的唯一入口** —— 已由 `REPO/rules-index-*` 两条守卫兜底：指向不存在的文件报错、新增文件漏登记报错。改名/移动会当场转红。
2. **触发条件用「任务语言」写**，不用「产物语言」。实测 6 个典型任务中 5 个漏读，根因就是触发条件写成"写 design.md 时"而任务是"给列表加一列"。
3. **`specs/README.md` 是生成物**，`--write-index` 生成、`L10/spec-index` 兜底 —— 手工维护的索引必然过期。
4. **`design/` 与 `state/` 不进索引表** —— 它们是人读的，入口在 `CLAUDE.md` §3 目录地图，不需要"必须读"的触发条件。

---

## 五、迁移代价与我的建议

**必须同步改的硬编码**（否则静默失效）：

| **位置** | **引用** |
|-|-|
| check.mjs:1129 | rules/constitution.md |
| check.mjs:1514 | rules/project.md |
| check.mjs:2178 | readme/check.md |
| check.mjs:557/1466/1618 | schemas/devops-workflow/templates/ |
| 9 个 guards 插件 | 各自的路径常量 |
| project.json.checks | 9 条相对路径 |

**但这不是问题** —— `rules-index` / `reality-waitlist` / `META/check-doc-stale` 会把大部分遗漏当场报出来。迁移后跑一次 `openspec check` 就能收敛。

**我的实际建议：不要现在做这次迁移。**

理由：这套结构的**问题已经在前六轮解决完了** —— 索引表补齐、触发时机表加了、守卫从 38 条到 48 条、四条命令全绿。剩下的是**命名与分层的美学收益**，而代价是碰 6 处硬编码 + 211 个归档件里的历史引用。

上面这棵树的正确用法是**作为增量演进的目标态**：

- 下次要新建规则文件时 → 直接放进 `enforced/` 或 `advisory/`
- 下次要动 `check.mjs` 的硬编码路径时 → 顺手改名
- `bizs.md` 那个孤儿 → 可以现在就处理，它没有任何引用，零风险

**唯一值得现在单独做的是 `rules/` 的 `enforced/` `advisory/` 分层** —— 它不只是改名，是把"哪些规则有兜底"这个当前只存在于文档描述里的事实，变成路径本身的声明。成本约半轮（2 个文件移动 + 2 处硬编码 + 索引表 5 行）。

要我做这一项吗？还是把整棵树先记进 `design/CHANGELOG.md` 作为目标态，等下次碰到相关文件时再逐步收敛？