---
description: 'openspec/目录包含`specs/`（长期规范）和`changes/`（变更工作区）。每个变更包含四个核心Artifact：`proposal.md`（为什么做）、`spec.md`（做什么）、`design.md`（怎么做）、`tasks.md`（分几步做），分别管理账号领域的需求、场景、架构设计和任务分解。'
lastUpdated: '2026-06-22 00:53:16'
head:
  - - meta
    - name: 'og:title'
      content: '③ 目录结构 & 核心概念'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'openspec/目录包含`specs/`（长期规范）和`changes/`（变更工作区）。每个变更包含四个核心Artifact：`proposal.md`（为什么做）、`spec.md`（做什么）、`design.md`（怎么做）、`tasks.md`（分几步做），分别管理账号领域的需求、场景、架构设计和任务分解。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/openspec/3-directory-struct-core-concept.html'
---
# ③ 目录结构 & 核心概念

## `openspec/` 目录结构详解

### 整体结构

初始化完成后，`openspec/` 目录的完整结构是：

```Plain Text
openspec/
├── specs/          ← 规格规范
├── changes/        ← 变更工作区
│   └── archive/    ← 已完成变更的归档
└── config.yaml     ← 项目配置
```

三个部分，职责泾渭分明，理解它们的边界是用好 OpenSpec 的基础。

---

### `specs/` —— 系统行为的长期规范

`specs/` 是整个项目**当前行为**的规格文档库。它回答一个问题：这个系统现在能做什么、应该怎么做。

目录按业务域（domain）组织，每个域一个子目录，下面有一个 `spec.md`：

```Plain Text
openspec/specs/
├── account/
│   └── spec.md     ← 账号相关行为的完整规格
├── order/
│   └── spec.md     ← 订单流程规格
├── payment/
│   └── spec.md     ← 支付规格
└── user/
    └── spec.md     ← 用户认证、权限规格
```

对于游戏账号交易平台，`account/spec.md` 在首次归档账号估价功能后，大概长这样：

```Markdown
# 账号领域规范

## 需求

### 需求：账号上架
系统必须允许卖家创建账号上架信息，属性包含游戏类型、等级、服务器及稀有物品。

#### 场景：创建上架信息
- 假设卖家已完成身份认证
- 当提交合法有效的账号属性信息时
- 则系统创建一条状态为待审核的上架信息

### 需求：账号定价建议
卖家创建新的上架信息时，系统必须提供定价建议。

#### 场景：卖家请求定价建议
- 假设卖家提交账号属性信息（游戏类型、等级、稀有物品数组）
- 当调用定价服务时
- 则系统应返回包含低价、中价、高价及货币类型为人民币的结果
- 且95分位响应时长应低于500毫秒
```

`specs/` 里的内容**不是你手写的**——它是每次 `/opsx:archive` 归档时，由 Delta Spec (增量规范) 自动合并进来的。随着每次功能迭代，这个目录里的内容越来越完整，最终成为整个系统行为的活文档。

当 AI 接收修改任务时，会首先读取这个目录来了解系统的现有行为，这个机制有效防止 AI 在修改某个功能时，不小心破坏另一个功能的逻辑。

---

### `changes/` —— 每次变更的隔离工作区

`changes/` 是当前**正在进行中**的变更的工作区。每次执行 `/opsx:propose` 都会在这里创建一个以变更名命名的子目录：

```Plain Text
openspec/changes/
├── account-auto-pricing/       ← 正在开发
│   ├── proposal.md
│   ├── specs/
│   │   └── account/
│   │       └── spec.md         ← Delta Spec，只写变化的部分
│   ├── design.md
│   └── tasks.md
├── order-status-notification/  ← 并行开发的另一个功能
│   ├── proposal.md
│   ├── specs/
│   ├── design.md
│   └── tasks.md
└── archive/                    ← 已完成
```

这个隔离设计至关重要：它允许开发者和 AI 在不污染主规格库的前提下，反复迭代和细化需求。只有变更被实现并验收后，临时的 Delta Spec 才会合并回 `specs/` 主目录。

一个变更文件夹里的四个文件各司其职：

- `proposal.md` 解释为什么做、解决什么问题；
- `specs/` 里的 Delta Spec 定义行为变化（用 `ADDED / MODIFIED / REMOVED` 区块）；
- `design.md` 记录技术方案和关键决策；
- `tasks.md` 是 AI 执行时逐条勾选的实现清单；

`changes/` 可以同时存在多个子目录，对应并行推进的多个功能。这和 Git 的分支概念高度类似——每个 change 文件夹就是一个功能分支，`archive` 就是 merge 到主干。

---

### `changes/archive/` —— 变更历史的审计日志

归档目录存放所有已完成的变更，目录名带时间戳：

```Plain Text
openspec/changes/archive/
├── 2026-03-15-account-auto-pricing/
│   ├── proposal.md
│   ├── specs/
│   ├── design.md
│   └── tasks.md              ← 全部任务已勾选 ✓
├── 2026-03-28-order-refund-flow/
└── 2026-04-02-search-filter-v2/
```

这个目录回答了一个在已有项目里极其重要的问题：**这个功能当初为什么这么设计？** 六个月后回来看一段不熟悉的代码，打开对应的 archive 目录，`proposal.md` 说明了业务背景，`design.md` 记录了当时的技术决策和放弃的备选方案，`tasks.md` 显示了实现的完整步骤。这份上下文是纯代码注释无法提供的。

`archive/` 和 `specs/` 共同构成了 OpenSpec 的两层历史：`specs/` 是当前状态的快照，`archive/` 是演变过程的完整记录

---

### `config.yaml` —— 项目级配置

```YAML
schema: spec-driven    # 使用哪个 artifact 生成方案
profile: core          # 激活哪些工作流命令
```

通常不需要手动编辑，通过 `openspec config profile` 命令修改。如果将来需要自定义 artifact(构件) 序列（比如为某个项目增加 `api-contract.md` 这个环节），在 `openspec/schemas/` 目录里定义自定义 schema 后，这里改成对应的 schema 名称即可。

---

### 和 `CLAUDE.md` 的关系

`openspec/` 目录和 `CLAUDE.md` 是互补而非竞争的关系。

- `CLAUDE.md` 存放的是**不变的约定**——编码规范、架构原则、禁止事项；
- `openspec/specs/` 存放的是**行为规格**——系统能做什么、各种场景下的预期输出是什么

Claude Code 在每次会话里同时读取两者，两套上下文叠加，构成 AI 理解这个项目所需的完整图景。

## Change 文件夹的四个核心 Artifact

每次执行 `/opsx:propose` 或 `/opsx:ff`，OpenSpec 都会在 `openspec/changes/<change-name>/` 下生成四个文件。它们不是并列关系，而是有依赖顺序的——前一个的输出是后一个的输入，四个文件合起来构成一次完整的"编码前对齐"。

```Plain Text
openspec/changes/account-auto-pricing/
├── proposal.md       ← 为什么做
├── specs/
│   └── account/
│       └── spec.md   ← 做什么（行为规格）
├── design.md         ← 怎么做（技术方案）
└── tasks.md          ← 分几步做（实现清单）
```

---

### `proposal.md` —— 为什么做

Proposal 是整个变更的起点，它回答一个问题：**这件事值得做吗，要解决的是什么问题？**

典型内容包含三个部分：问题描述（现状和痛点）、解决方案（打算怎么解决）、成功标准（怎么算做完了）。还可以显式列出 Out of scope，防止范围蔓延。

以游戏账号交易平台的账号估价功能为例：

```Markdown
# Proposal: account-auto-pricing

## Problem
卖家发布账号时缺乏定价参考，导致滞销或低价损失。
平台数据显示，无参考价格的账号平均挂单时长是有参考价格账号的 2.3 倍。

## Solution
在发布流程中新增估价服务，基于过去 90 天同类账号成交价，
计算 P25/P50/P75 分位数，返回低/均/高三档参考价格区间。

## Success criteria
- 卖家发布账号时能看到估价区间
- 估价响应时间 < 500ms（P95）
- 覆盖平台前 10 大游戏品类

## Out of scope
- 机器学习模型（首版用规则+统计）
- 实时竞品价格抓取
```

Proposal 写得越清晰，后续 AI 生成 specs 和 design 的质量越高。它是人和 AI 之间的第一道对齐——如果连"为什么做"都没说清楚，后面几个 artifact 的方向可能从一开始就跑偏。

---

### `specs/<domain>/spec.md` —— 做什么

Specs 是四个 artifact 里概念最独特的一个，它不是通常意义上的"需求文档"，而是**Delta Spec**——只描述这次变更带来的行为变化，不重写整个系统的规格。

Delta Spec 用 `ADDED`、`MODIFIED`、`REMOVED` 三个区块来标识变化类型，描述的是相对于现有系统"变了什么"，而不是"现在是什么"。这让 OpenSpec 特别适合存量项目：你不需要把整个平台的现有逻辑都写成 spec，只需要描述这次迭代新增或修改的部分。

格式是固定的，每条需求下面至少跟一个场景（Scenario），场景用 GIVEN/WHEN/THEN 结构描述：

```Markdown
# 账号领域变更说明

## 新增需求

### 需求：账号定价建议
卖家创建新商品上架信息时，系统**必须**提供价格建议。

#### 场景：常规定价
- GIVEN 卖家提交信息（游戏类型=英雄联盟，等级=150，稀有物品=[传说皮肤]）
- WHEN 调用定价服务时存在充足历史数据
- THEN 返回 { 低价: 280, 中价: 350, 高价: 480, 货币单位: "人民币", 样本量: 42 }
- AND 95分位响应时间**必须**低于500毫秒

#### 场景：数据不足
- GIVEN 可对比交易记录少于5条
- WHEN 调用定价服务时
- THEN 返回 { 数据不足: true, 低价: 空值, 中价: 空值, 高价: 空值 }

## 修改需求

### 需求：账号上架信息创建（原需求：无定价环节）
在卖家确认上架价格前，上架信息创建流程**必须**加入定价建议环节。
（原流程：卖家直接输入价格，无任何参考依据）
```

GIVEN/WHEN/THEN 的格式不是装饰性的，它直接决定 `/opsx:verify` 能不能做有效验证——verify 命令会对照这些 Scenario 检查代码里是否有对应的测试覆盖。

归档时，这个文件里的内容会被合并进 `openspec/specs/account/spec.md`，成为系统行为长期规范的一部分。

---

### `design.md` —— 怎么做

Design 是技术方案文档，但它的目的不是面面俱到，而是**把关键决策固化下来**，防止 AI 在实现时自由发挥。

一份好的 `design.md` 应该回答三个问题：调用链是什么、数据怎么流动、有哪些非显而易见的技术决策及其理由。

```Markdown
# Design: account-auto-pricing

## Architecture
AccountController → PricingService → PricingRepository → Redis 缓存层

## Key decisions

**算法选择**：取过去 90 天同类账号成交价，计算 P25/P50/P75 分位数
作为低/均/高价。放弃均值+标准差方案，原因是账号价格分布存在明显
长尾，分位数对异常值更鲁棒。

**缓存策略**：以 (game_type, level_bucket) 为 key，Redisson TTL 30 分钟。
level_bucket 按每 50 级分桶（0-49、50-99、100-149…），在精度和命中率
之间取平衡。

**降级策略**：Redis 不可用时直接查 DB；DB 查询超过 200ms 则返回
insufficient_data，不阻塞发布流程。

## API contract
GET /api/v1/accounts/pricing?game_type=LOL&level=150&rare_items=skin_legendary
Response: { low: 280, mid: 350, high: 480, currency: "CNY", sample_size: 42 }

## Database
复用现有 account_transaction 表，新增联合索引：
INDEX idx_pricing (game_type, level, sold_at)
```

Design 里记录的"放弃的备选方案及理由"往往比选择了什么更有价值。六个月后接手这段代码的人（包括未来的自己）不会再重蹈"均值+标准差"的覆辙，因为原因就写在这里。

---

### `tasks.md` —— 分几步做

Tasks 是 AI 实现代码的直接依据。它把 design 里的技术方案分解成带编号的原子任务，`/opsx:apply` 执行时逐条勾选，让进度可见、可追踪。

```Markdown
# Tasks: account-auto-pricing

## 1. 数据层
- [ ] 1.1 account_transaction 表新增索引 idx_pricing(game_type, level, sold_at)
- [ ] 1.2 实现 PricingRepository.findComparablePrices(gameType, levelBucket, days)

## 2. 服务层
- [ ] 2.1 实现 PricingService.suggest(AccountPricingQuery) → PricingResult
- [ ] 2.2 Redisson 缓存封装，key 格式：pricing:{game_type}:{level_bucket}，TTL 30min
- [ ] 2.3 降级逻辑：DB 超时 200ms 返回 PricingResult.insufficient()

## 3. 接口层
- [ ] 3.1 GET /api/v1/accounts/pricing Controller 方法
- [ ] 3.2 参数校验：game_type 枚举校验、level 范围 1-9999

## 4. 测试
- [ ] 4.1 PricingServiceTest：正常场景 / 数据不足 / Redis 降级
- [ ] 4.2 集成测试：接口 P95 响应时间断言
```

Tasks 的粒度很重要。太粗（"实现整个定价模块"）AI 会自由发挥；太细（每一行代码都列出来）则失去了 AI 的价值。合理的粒度是：每条任务对应一个有明确输入输出的代码单元，通常是一个方法或一个类。

`/opsx:verify` 在归档前会检查 tasks.md 里是否所有条目都已勾选，并对照 specs 里的 Scenario(方案) 验证测试覆盖情况。`tasks.md` 的完成状态因此不只是进度追踪，也是 verify 步骤的检查基准。

---

### 四个 Artifact 的依赖关系

```Plain Text
proposal.md
    ↓ 明确了问题和范围
specs/spec.md
    ↓ 明确了行为约束
design.md
    ↓ 明确了技术路径
tasks.md
    ↓
/opsx:apply（AI 实现代码）
    ↓
/opsx:verify（对照 specs 验收）
    ↓
/opsx:archive（合并进 specs/，归档 change）
```

这个依赖链不是强制的

OpenSpec 允许你以任何顺序创建和修改这四个文件，随时回去改 proposal，随时更新 design。但依赖关系决定了信息质量：proposal 写得越清楚，specs 的行为约束越精准；specs 越精准，design 的技术决策越有针对性；design 越具体，tasks 的分解越合理；tasks 越合理，AI 生成的代码越接近你的预期。