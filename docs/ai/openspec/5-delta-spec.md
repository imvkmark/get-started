---
description: 'Delta Spec 是存量项目的核心变更文档，通过 ADDED、MODIFIED、REMOVED 三个区块分别描述新增、修改和删除的行为。它采用特定语法结构，避免将 GIVEN 写得太宽泛、MODIFIED 中省略 Previously，或重写整个系统现有行为，与主 spec 协同工作。'
lastUpdated: '2026-04-08 10:05:56'
head:
  - - meta
    - name: 'og:title'
      content: '⑤ Delta Spec — 存量项目核心'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Delta Spec 是存量项目的核心变更文档，通过 ADDED、MODIFIED、REMOVED 三个区块分别描述新增、修改和删除的行为。它采用特定语法结构，避免将 GIVEN 写得太宽泛、MODIFIED 中省略 Previously，或重写整个系统现有行为，与主 spec 协同工作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/openspec/5-delta-spec.html'
---
# ⑤ Delta Spec — 存量项目核心

只写变化的那部分

### 为什么需要 Delta Spec

传统的需求文档有一个慢性病：随着项目演进，它越来越难维护。每次新功能上线，要么重写整份文档（成本极高），要么在旁边加一段补充说明（越来越混乱），最后文档和代码之间的鸿沟越来越大，变成谁都不信任的"历史遗物"。

Delta Spec 是 OpenSpec 解决这个问题的核心概念。它描述的是相对于现有系统"变了什么"，而不是"现在是什么"。这让 OpenSpec 特别适合存量项目：不需要把整个平台的现有逻辑都写成 spec，只需要描述这次迭代新增或修改的部分。

类比 Git 的 diff——你不会因为改了一行代码就重新提交整个文件，你提交的是变化的部分。Delta Spec 对规格文档做的是同样的事。

---

### 三个区块

Delta Spec 只有三个顶层区块，分别对应三种变化类型。

#### **`ADDED`** —— 这次新增的行为

系统之前没有这个能力，现在加进来了。

#### **`MODIFIED`** —— 这次修改的已有行为

系统之前有这个能力，但行为发生了变化。必须说明之前是什么（`Previously:`），让读者清楚变化的方向。

#### **`REMOVED`** —— 这次删除的已有行为

系统之前有这个能力，现在去掉了。说明废弃原因。

三个区块不需要同时出现，只写这次变更涉及的部分。一个纯新功能只有 `ADDED`，一个纯重构可能只有 `MODIFIED`，一个功能下线只有 `REMOVED`。

---

### 完整语法结构

```Markdown
# Delta for <Domain>

## ADDED Requirements

### Requirement: <需求名称>
The system MUST/SHALL/SHOULD <行为描述>.

#### Scenario: <场景名称>
- GIVEN <前置条件>
- WHEN <触发动作>
- THEN <预期结果>
- AND <附加断言>（可选，可多行）

#### Scenario: <另一个场景>
- GIVEN ...
- WHEN ...
- THEN ...

## MODIFIED Requirements

### Requirement: <已有需求名称>
<新的行为描述>.
(Previously: <旧的行为描述>)

#### Scenario: <场景名称>
- GIVEN ...
- WHEN ...
- THEN ...

## REMOVED Requirements

### Requirement: <已有需求名称> (Deprecated)
<废弃原因说明>.
```

几个语法细节值得注意。

Requirement 里的动词有三档：

- `MUST` 表示强制要求，没有例外；
- `SHALL` 表示强制要求，但允许实现细节灵活；
- `SHOULD` 表示推荐但非强制。

对于核心业务逻辑用 `MUST`，对于性能指标和工程约束用 `SHALL`，对于最佳实践用 `SHOULD`。

Scenario 的 GIVEN/WHEN/THEN 格式是结构化的，不是装饰性的。`/opsx:verify` 依赖这个格式来匹配测试用例——`THEN` 里的断言内容会和测试代码里的 assertion 做语义对照。写得越具体，verify 的检查越精确。

`THEN` 可以跟多个 `AND`，用来表达复合断言：

```Markdown
- THEN 系统返回 { low: 280, mid: 350, high: 480 }
- AND response time SHALL be under 500ms at P95
- AND sample_size 字段反映参与计算的历史记录数
```

**游戏账号交易平台的完整示例**

以"账号估价"和同期的"会话超时时间调整"为例，展示三个区块同时出现的写法：

```Markdown
# Delta for Account Domain

## ADDED Requirements

### Requirement: Account pricing suggestion
The system MUST provide a price suggestion when a seller creates a new listing.

#### Scenario: Normal pricing with sufficient data
- GIVEN a seller submits account attributes
  (game_type=LOL, level=150, rare_items=[skin_legendary])
- WHEN the pricing service is called
- AND at least 5 comparable transactions exist in the past 90 days
- THEN return { low: 280, mid: 350, high: 480, currency: "CNY", sample_size: 42 }
- AND response time SHALL be under 500ms at P95

#### Scenario: Insufficient historical data
- GIVEN fewer than 5 comparable transactions exist in the past 90 days
- WHEN the pricing service is called
- THEN return { insufficient_data: true, low: null, mid: null, high: null }
- AND the seller SHALL be shown a "data insufficient" notice

#### Scenario: Redis cache unavailable
- GIVEN Redis is unreachable
- WHEN the pricing service is called
- THEN the system SHALL fall back to direct DB query
- AND if DB query exceeds 200ms, return { insufficient_data: true }

## MODIFIED Requirements

### Requirement: Seller session timeout
Sessions SHALL expire after 30 minutes of inactivity.
(Previously: Sessions expired after 60 minutes of inactivity)

#### Scenario: Idle timeout
- GIVEN an authenticated seller session
- WHEN 30 minutes pass without any API call
- THEN the session SHALL be invalidated
- AND the seller SHALL be redirected to the login page

## REMOVED Requirements

### Requirement: Manual pricing review queue (Deprecated)
废弃原因：账号估价功能上线后，人工审核定价队列不再必要。
原有的 /admin/pricing-review 接口将在下个版本移除。
```

---

### 常见错误

#### **错误一：把 GIVEN 写得太宽泛**

```Markdown
# 错误写法
- GIVEN 卖家已登录
- WHEN 调用估价接口
- THEN 返回价格区间

# 正确写法
- GIVEN a seller submits (game_type=LOL, level=150, rare_items=[skin_legendary])
- WHEN GET /api/v1/accounts/pricing is called
- THEN return { low: 280, mid: 350, high: 480, currency: "CNY" }
```

GIVEN 要包含具体的输入值，THEN 要包含具体的输出结构。模糊的 spec 让 `/opsx:verify` 无法做精确的正确性检查，也让开发者在看 spec 时需要靠猜来理解边界条件。

#### **错误二：MODIFIED 里省略 Previously**

```Markdown
# 错误写法
### Requirement: Seller session timeout
Sessions SHALL expire after 30 minutes of inactivity.

# 正确写法
### Requirement: Seller session timeout
Sessions SHALL expire after 30 minutes of inactivity.
(Previously: Sessions expired after 60 minutes of inactivity)
```

没有 `Previously` 的 MODIFIED 和 ADDED 看起来一模一样，失去了"这是一次修改而非新增"的语义。归档时合并逻辑依赖这个标记来决定是追加还是替换主 spec 里的对应条目。

#### **错误三：把整个系统的现有行为重写进 Delta Spec**

Delta Spec 只写这次变更涉及的部分。如果你在 `ADDED` 里把账号发布流程从头到尾都描述了一遍，那就不是 Delta Spec，而是全量 spec。全量写法在存量项目里成本极高，也失去了"增量叠加"的意义——归档时会把主 spec 里所有的已有条目都覆盖一遍，产生大量噪音。

原则是：只写因为这次变更而"新出现"或"发生变化"的行为，其余保持沉默。

---

### Delta Spec 和主 spec 的关系

写 Delta Spec 时可以不知道主 spec 里有什么，归档时 OpenSpec 负责合并。但在写 `MODIFIED` 和 `REMOVED` 时，建议先看一眼 `openspec/specs/<domain>/spec.md`，确认要修改或删除的 Requirement 名称和主 spec 里的完全一致——合并逻辑是按名称匹配的，名称拼错会导致 MODIFIED 被当成 ADDED 处理，主 spec 里留下一新一旧两条重复的 Requirement。