---
description: 'OpenSpec CLI提供四把工具：`list`（项目速览）、`show`（详情查看）、`validate`（格式检查，非零退出码用于CI）、`view`（交互仪表盘）。可通过`openspec config profile`切换工作流配置（core/custom），修改后重新生成工具配置并重启Claude Code。支持自定义Schema（三种创建方式：交互式、非交互式、Fork修改），通过`schema.yaml`定义文件结构，配合`config.yaml`的rules和context控制AI生成行为。'
lastUpdated: '2026-06-22 00:53:56'
head:
  - - meta
    - name: 'og:title'
      content: '⑥ 进阶：CLI 工具 & 自定义'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'OpenSpec CLI提供四把工具：`list`（项目速览）、`show`（详情查看）、`validate`（格式检查，非零退出码用于CI）、`view`（交互仪表盘）。可通过`openspec config profile`切换工作流配置（core/custom），修改后重新生成工具配置并重启Claude Code。支持自定义Schema（三种创建方式：交互式、非交互式、Fork修改），通过`schema.yaml`定义文件结构，配合`config.yaml`的rules和context控制AI生成行为。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/openspec/6-cli-custom.html'
---
# ⑥ 进阶：CLI 工具 & 自定义

## OpenSpec CLI 的四把工具

这四个命令都是在终端里直接运行的，不是斜杠命令，不需要在 Claude Code 里执行。它们解决的是同一类问题：在没有打开 AI 对话的情况下，快速了解项目里 spec 和 change 的当前状态。

---

### `openspec list`：项目状态速览

最常用的命令，给你一个项目当前状态的快照。

**列出所有活跃变更：**

```Bash
openspec list
```

```Plain Text
Active Changes (2)
─────────────────────────────────────────────
  account-auto-pricing       3/9 tasks complete
  order-status-notification  0/6 tasks complete
```

**列出所有主 spec 文件：**

```Bash
openspec list --specs
```

```Plain Text
Specifications (3 domains)
─────────────────────────────────────────────
  account    3 requirements    last updated: 2026-04-01
  order      2 requirements    last updated: 2026-03-28
  payment    1 requirement     last updated: 2026-03-15
```

加上 `--json` 参数可以输出机器可读的格式，方便在 CI 脚本里使用：

```Bash
openspec list --json
```

```JSON
{
  "activeChanges": [
    {
      "name": "account-auto-pricing",
      "tasksComplete": 3,
      "tasksTotal": 9,
      "created": "2026-04-05"
    }
  ],
  "archivedChanges": 4
}
```

实际开发里，`openspec list` 适合作为每天开始工作时的第一个命令——三秒钟看清楚现在有几个并行进行的 change、各自的进度是多少，比打开文件夹翻目录快得多。

---

### `openspec show`：查看单个 change 或 spec 的详情

**查看特定 change 的详情：**

```Bash
openspec show account-auto-pricing
```

```Plain Text
Change: account-auto-pricing
Status: In Progress
Created: 2026-04-05
Schema: spec-driven

Artifacts:
  ✓ proposal.md
  ✓ specs/account/spec.md
  ✓ design.md
  ✓ tasks.md

Tasks: 3/9 complete
  ✓ 1.1 account_transaction 表新增索引
  ✓ 1.2 PricingRepository.findComparablePrices()
  ✓ 2.1 PricingService.suggest() 核心逻辑
  ○ 2.2 Redisson 缓存封装
  ○ 2.3 降级逻辑
  ○ 3.1 Controller 方法
  ○ 3.2 参数校验
  ○ 4.1 单元测试
  ○ 4.2 集成测试

Specs touched: account
```

**查看特定域的主 spec：**

```Bash
openspec show account --type spec
```

```Plain Text
Spec: account
Domain: account
Requirements: 3
Last updated: 2026-04-01

Requirements:
  - Account listing creation
  - Account pricing suggestion     ← 最近归档的
  - Account search by game type
```

不带参数的 `openspec show` 会进入交互式选择界面，用方向键选择要查看的 change 或 spec。

同样支持 `--json` 输出：`openspec show account-auto-pricing --json`，返回包含完整 artifact 内容的 JSON 结构。

---

### `openspec validate`：检查 spec 格式的结构性问题

Validate 和 `/opsx:verify` 是两个不同层面的检查，容易混淆，先说清楚区别：

`/opsx:verify` 是**语义检查**——对照代码实现来验证 spec 定义的行为是否都被正确实现了，需要 Claude 参与。

`openspec validate` 是**结构检查**——不看代码，只检查 spec 文件本身的格式是否合法，比如 Scenario 是否有 GIVEN/WHEN/THEN、Requirement 名称是否重复、Delta Spec 的 `MODIFIED` 区块是否有 `Previously:` 标注。这个命令是纯 CLI 工具，不需要 AI。

**验证特定 change：**

```Bash
openspec validate account-auto-pricing
```

```Plain Text
Validating account-auto-pricing...

✓ proposal.md        valid
✓ specs/account/spec.md
  ⚠ Requirement "Account pricing suggestion"
    Scenario "Insufficient data": missing THEN clause
✓ design.md          valid
✓ tasks.md           valid

1 warning found.
```

**验证所有活跃 change：**

```Bash
openspec validate --changes
```

**严格模式**，把 warning 也当 error 处理，适合在 CI 里用：

```Bash
openspec validate account-auto-pricing --strict
```

```Bash
# 退出码非零，CI 构建失败
echo $?   # 1
```

在 CI 流水线里加一条 validate 检查，可以防止格式不合法的 spec 被提交进主干：

```YAML
# GitHub Actions 示例
- name: Validate OpenSpec
  run: openspec validate --changes --strict
```

---

### `openspec view`：终端交互式仪表盘

`openspec view` 打开一个终端内的交互式界面，用于浏览项目里的所有 spec 和 change。

```Bash
openspec view
```

```Plain Text
OpenSpec Dashboard
════════════════════════════════════════════════════
Summary:
  ● Specifications:    3 specs, 6 requirements
  ● Active Changes:    2 in progress
  ● Completed Changes: 4

Specifications
────────────────────────────────────────────────────
  ▪ account    3 requirements
  ▪ order      2 requirements
  ▪ payment    1 requirement

Active Changes
────────────────────────────────────────────────────
  ◐ account-auto-pricing       3/9 tasks
  ○ order-status-notification  0/6 tasks

Completed Changes
────────────────────────────────────────────────────
  ✓ account-validation         (2026-04-01)
  ✓ order-refund-flow          (2026-03-28)
  ✓ search-filter-v2           (2026-03-20)
  ✓ payment-alipay             (2026-03-15)

[↑↓ navigate] [enter select] [q quit]
════════════════════════════════════════════════════
```

用方向键导航，回车进入某个 spec 或 change 的详情页，`q` 退出。详情页里可以直接阅读完整的 spec 内容，相当于一个轻量的文档浏览器，不需要手动 `cat` 文件。

实际上 `openspec view` 适合两个场景：新人接手项目时，用它快速了解整个系统现有哪些 spec、当前有哪些正在进行的变更；在做 code review 时，用它查阅某个功能的 spec 背景，而不用翻文件夹。

---

日常开发里，这四个命令的使用频率大致是这样的：

- `openspec list` 最高频，每天开始工作时跑一次，了解当前状态。
- `openspec show` 次之，需要查看某个 change 的具体进度或某个域的 spec 详情时用。
- `openspec validate` 主要在 CI 里自动运行，手动触发的场景是写完 Delta Spec 后本地自检格式。
- `openspec view` 使用频率最低，但在项目规模变大、spec 文件数量增多之后价值最明显，相当于整个 OpenSpec 目录的导航地图。

## `openspec config profile`：控制激活哪些工作流命令

### 两个 Profile 的区别

OpenSpec 提供两个 profile 选项：`core` 包含 4 个核心工作流，`custom` 让你自选任意工作流组合。

`core` profile 激活的四个命令是日常 SDD 流程的最小集合：

```Plain Text
/opsx:propose    ← 创建变更提案（含 ff）
/opsx:explore    ← 探索性调研
/opsx:apply      ← 实现代码
/opsx:archive    ← 归档变更
```

`custom` profile（也叫 expanded）在此基础上增加了细粒度控制命令：

```Plain Text
/opsx:new           ← 只创建 change 文件夹
/opsx:continue      ← 逐步生成 artifact
/opsx:ff            ← 快进生成所有 artifact
/opsx:verify        ← 归档前质量检查
/opsx:sync          ← 同步 spec 状态
/opsx:bulk-archive  ← 批量归档多个 change
/opsx:onboard       ← 存量项目引导流程
```

---

### 切换步骤

切换 profile 是两步操作：先改配置，再重新生成工具文件。

#### **第一步：修改 profile 配置**

```Bash
openspec config profile
```

进入交互式菜单：

```Plain Text
? What would you like to configure?
❯ Change profile
  Change delivery only
  Change workflows only

? Select profile:
❯ core     (propose, explore, apply, archive)
  custom   (choose specific workflows)

# 选择 custom 后，进入工作流多选：
? Select workflows:
  ◉ propose
  ◉ explore
  ◉ apply
  ◉ archive
  ○ new
  ○ continue
❯ ◉ ff           ← 空格切换选中状态
  ◉ verify
  ○ sync
  ○ bulk-archive
  ◉ onboard
```

#### **第二步：重新生成工具配置文件**

```Bash
openspec update
```

这一步会根据新的 profile 设置重新生成 `.claude/skills/` 下的 Skill 文件。选中的工作流对应的 Skill 文件会被创建或更新，取消选中的工作流对应的文件会被删除，保持目录干净。

#### **第三步：重启 Claude Code**

斜杠命令在启动时加载，不重启不生效。重启后输入 `/opsx:` 就能看到新增的命令出现在补全列表里。

---

### 非交互式切换

如果嫌交互式菜单麻烦，可以直接用命令行参数：

```Bash
# 切换到 core
openspec init --profile core
openspec update

# 切换到 custom 并指定工作流
openspec init --profile custom
openspec update
```

在 CI 或团队脚手架脚本里，非交互式更实用：

```Bash
# 团队统一配置：Claude Code + expanded profile
openspec init --tools claude --profile custom --force
openspec update
```

`--force` 跳过所有确认提示，适合自动化场景。

---

### Delivery 模式：Skills 和 Commands 的区别

切换 profile 的菜单里还有一个"Change delivery only"选项，这是一个容易被忽略的配置维度。

Delivery 控制的是斜杠命令以什么形式注入到 Claude Code 里：

`skills` 模式把命令放在 `.claude/skills/` 目录下，每个命令是一个独立的 YAML frontmatter Markdown 文件，这是 OpenSpec 1.0 之后的默认方式。

`commands` 模式把命令放在 `.claude/commands/openspec/` 目录下，格式略有不同。

`both` 模式同时生成两种格式，兼容性最好，也是 `openspec init` 的默认值。

对于单人开发环境，保持 `both` 即可，不需要手动调整。如果你发现 `/opsx:*` 命令在某个版本的 Claude Code 里找不到，可以尝试切换 delivery 模式再 update 一次。

---

### 推荐配置

对于学习场景，建议直接用 expanded（custom）profile 并选中所有工作流，这样所有命令都可以在演示中使用，不会出现"这个命令我没有"的情况：

```Bash
openspec config profile   # 选 custom，全选所有工作流
openspec update
# 重启 Claude Code
```

对于实际项目的日常开发，`core` profile 通常就够了。`/opsx:propose` 已经封装了 `new + ff` 的功能，`/opsx:verify` 是好习惯但不是强制步骤。只有在需要更细粒度控制（比如逐步审查每个 artifact、或者批量归档多个并行 change）时才需要切换到 expanded。

## OpenSpec Schema 自定义：重塑你的 SDD 工作流

### 为什么需要自定义 Schema

默认的 `spec-driven` schema 给了你四个 artifact：proposal → specs → design → tasks。这个顺序对大多数功能开发场景都适用，但不是万能的。

不是每个项目都需要四个 artifact。对于范围明确、风险低的小改动，可以把工作流精简到两个文件：specs 和 tasks。 反过来，对于涉及架构变更或安全敏感的功能，你可能需要强制要求每次变更都包含一个 `threat-model.md`，或者加一个 `compliance-review.md` 审批步骤。这些自定义约束一旦写进 schema，AI 在没有完成必要 artifact 的情况下不会进入实现阶段，合规变成了结构性保障而不是事后 checklist。

---

### Schema 的文件结构

自定义 schema 放在 `openspec/schemas/<schema-name>/` 目录下，包含一个 `schema.yaml` 和一个 `templates/` 文件夹：

```Plain Text
openspec/schemas/java-backend/
├── schema.yaml           ← 工作流定义
└── templates/
    ├── proposal.md       ← 每个 artifact 的 AI 生成模板
    ├── specs.md
    ├── design.md
    ├── api-contract.md   ← 自定义 artifact 的模板
    └── tasks.md
```

`schema.yaml` 定义 artifact 列表和依赖关系，`templates/` 里的 Markdown 文件是 AI 生成对应 artifact 时注入 prompt 的指导内容。

---

### `schema.yaml` 语法详解

一个完整的 `schema.yaml` 结构：

```YAML
name: java-backend
version: 1
description: 游戏账号交易平台的 Java 后端开发工作流

artifacts:
  - id: proposal
    generates: proposal.md
    requires: []
    description: 变更背景和业务价值
    template: proposal.md
    instruction: |
      创建一份 proposal，说明为什么要做这个变更、
      解决什么业务问题、成功标准是什么。

  - id: specs
    generates: specs/
    requires: [proposal]
    description: Delta Spec，行为约束
    template: specs.md

  - id: api-contract
    generates: api-contract.md
    requires: [specs]
    description: OpenAPI 格式的接口契约
    template: api-contract.md
    instruction: |
      基于 specs 里定义的行为，生成对应的 REST API 契约。
      包含：endpoint、请求参数、响应结构、错误码。

  - id: design
    generates: design.md
    requires: [specs, api-contract]
    description: 技术方案和关键决策
    template: design.md

  - id: tasks
    generates: tasks.md
    requires: [design]
    description: 实现清单
    template: tasks.md
```

每个 artifact 的核心字段：

- `id` 是内部标识符，在 `requires` 里引用，也是 `config.yaml` 里 `rules` 的 key
- `generates` 是实际生成的文件名或目录名
- `requires` 定义依赖关系，决定 `/opsx:continue` 的执行顺序——`api-contract` 依赖 `specs`，意味着 specs 没生成之前 api-contract 处于 blocked 状态
- `instruction` 是额外的生成指令，会附加到 AI 的 prompt 里，比模板文件更灵活，适合写简短的特定约束

---

### 三种创建方式

#### **方式一：从头创建（交互式）**

```Bash
openspec schema init java-backend
```

交互式向导会依次问你：schema 描述、需要哪些 artifact、是否设为默认 schema。完成后自动生成 `schema.yaml` 和对应的空白模板文件。

#### **方式二：从头创建（非交互式）**

```Bash
openspec schema init rapid \
  --description "快速迭代，只有 specs 和 tasks" \
  --artifacts "proposal,tasks" \
  --default
```

适合在脚本或 CI 里批量配置团队环境。

#### **方式三：Fork 现有 schema 修改**

```Bash
openspec schema fork spec-driven java-backend
```

复制默认的 `spec-driven` schema 到 `openspec/schemas/java-backend/`，在它的基础上增删 artifact，比从头写更快

这是最推荐的方式——保留 proposal/specs/design/tasks 四个基础 artifact，在 specs 和 design 之间插入 `api-contract`。

---

### 模板文件：控制 AI 的生成行为

模板文件是注入 AI prompt 的 Markdown 内容，用注释说明每个章节应该包含什么：

```Markdown
<!-- templates/api-contract.md -->
## API Contract

<!-- 基于 specs/ 里定义的 Scenario，列出对应的 REST endpoint -->

## Endpoints

### GET /api/v1/...
<!-- 根据 Scenario 的 WHEN 子句推断 endpoint 路径和 HTTP 方法 -->

**Request Parameters:**
<!-- 从 GIVEN 子句里提取输入参数 -->

**Response (200):**
<!-- 从 THEN 子句里提取返回结构，用 JSON Schema 或示例表示 -->

**Error Responses:**
<!-- 列出 Scenario 里涉及的错误场景对应的 HTTP 状态码 -->
```

模板文件的注释不会出现在最终生成的 artifact 里，它们只是给 AI 的指导说明。写得越具体，AI 生成的内容越符合你的预期。

对于大型交易平台，可以在 `templates/design.md` 里加入平台特定的约束：

```Markdown
<!-- templates/design.md -->
## Architecture

<!-- 说明调用链，格式：A → B → C -->
<!-- 必须遵循项目分层：Controller → Service → Repository -->

## Key Decisions

<!-- 对每个重要决策说明：选择了什么、放弃了什么、原因是什么 -->

## Caching Strategy

<!-- 如果涉及缓存，必须说明：
     - 使用 Redisson（项目统一规范，禁止直接用 Jedis）
     - key 格式：{module}:{entity}:{id}
     - TTL 选择依据
-->

## Message Queue

<!-- 如果涉及异步消息，必须说明：
     - 使用 RocketMQ 5.x
     - Topic 命名规范
     - 消费者组设计
-->
```

这些注释会让 AI 在每次生成 `design.md` 时自动考虑缓存和消息队列的规范，不需要在每次 propose 时手动提醒。

---

### 激活自定义 Schema

Schema 创建完之后，在 `openspec/config.yaml` 里设为默认：

```YAML
schema: java-backend
```

或者在单次命令里临时指定：

```Bash
/opsx:new account-auto-pricing --schema java-backend
```

验证 schema 结构是否合法：

```Bash
openspec schema validate java-backend
```

查看 schema 来源（项目级、用户级还是内置）：

```Bash
openspec schema which java-backend
# 输出：
# Schema: java-backend
# Source: project
# Path: /path/to/project/openspec/schemas/java-backend
```

---

### `config.yaml` 的 `rules` 和 `context`

Schema 定义了工作流的结构，`config.yaml` 的 `rules` 和 `context` 字段则在不改变结构的情况下注入项目特定的约束：

```YAML
# openspec/config.yaml
schema: java-backend

context: |
  Tech stack: Java 17, Spring Boot 3.2, MyBatis Plus, Redisson, RocketMQ 5.x
  Architecture: Controller → Service → Repository 严格分层
  Database: MySQL 8.0，所有 DDL 变更通过 Flyway 管理
  Cache: Redisson，key 格式 {module}:{entity}:{id}，禁止直接使用 Jedis

rules:
  proposal:
    - 说明业务影响范围（影响哪些用户角色）
    - 列出 Out of scope
  specs:
    - 每个 Requirement 至少包含两个 Scenario（正常路径 + 边界情况）
    - THEN 子句必须包含具体的返回值结构
  api-contract:
    - 所有接口必须包含错误响应（400/401/500）
    - 分页接口必须包含 page/size/total 字段
  design:
    - 涉及缓存必须说明 key 格式和 TTL
    - 涉及消息队列必须说明 Topic 和消费者组
```

- `context` 里的内容会注入到每个 artifact 生成时的 prompt 里，让 AI 始终知道项目的技术背景
- `rules` 是每个 artifact 的额外约束，相当于给 AI 的"检查清单"——生成 proposal 时必须列出 Out of scope，生成 specs 时每条 Requirement 至少要有两个 Scenario

这两个字段是对 `CLAUDE.md` 里项目规范的补充，但粒度更细：`CLAUDE.md` 是全局约束，`config.yaml` 里的 rules 是 OpenSpec 工作流里每个 artifact 的专项约束，两者不冲突，共同构成 AI 理解项目的完整上下文。