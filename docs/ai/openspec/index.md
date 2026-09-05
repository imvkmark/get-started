---
description: 'OpenSpec 旨在需求驱动开发，通过核心工作流（创建变更、生成规划文档、审查修改、按规范实现、归档）实现订单状态重构等场景。强调长期价值、与CLAUDE.md协同及团队建议，官方入口`/opsx:onboard`，社区工具`spec-gen`逆向冷启动。'
lastUpdated: '2026-09-05 16:14:40'
head:
  - - meta
    - name: 'og:title'
      content: 'OpenSpec 学习路线'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'OpenSpec 旨在需求驱动开发，通过核心工作流（创建变更、生成规划文档、审查修改、按规范实现、归档）实现订单状态重构等场景。强调长期价值、与CLAUDE.md协同及团队建议，官方入口`/opsx:onboard`，社区工具`spec-gen`逆向冷启动。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ai/openspec/index.html'
---
# OpenSpec 学习路线

> 本文主要进行路线介绍, 本文按 v1.12.0（2026-09-03 发布，npm `@fission-ai/openspec@latest`）校对

**Spec-driven development (SDD)**，专门为 AI 编程助手设计的规范驱动开发框架系。OpenSpec 的定位是**在写代码之前，让人和 AI 先对齐 spec**，然后按 spec 驱动实现, 它在你和 AI 之间加了一层轻量的 spec 层，让双方在写任何代码之前先对齐要构建什么。

它的哲学非常务实：流动而非僵化、迭代而非瀑布、轻量而非复杂、为 brownfield 而生而非只适合新项目。

> 你不会让建筑师在没有图纸的情况下建房子，写代码也是同样的道理

## 路线总览

```Plain Text
阶段0 建立认知 → 阶段1 环境搭建 → 阶段2 看懂目录结构 → 阶段3 吃透核心工作流
  → 阶段4 掌握 Delta Spec 写法 → 阶段5 CLI 工具箱进阶 → 阶段6 实战一次完整变更
  → 阶段7 存量项目冷启动策略
```

---

## 阶段 0：建立认知 —— 为什么先写 Spec

- <cite doc-id="Yfgbwr3WQiPpnckY3RGcIUGVnRc" file-type="wiki" title="1️⃣ 核心理念 为什么要在写代码前先写 Spec" type="doc"></cite>

先想清楚这三件事，不需要打开终端：

1. **AI 辅助编程的结构性缺陷**：需求只活在聊天记录里，AI 只能猜测意图，猜错的返工成本比预先写 spec 更高。
2. **四条设计哲学**：Fluid not rigid、Iterative not waterfall、Easy not complex、Brownfield-first —— 尤其最后一条，OpenSpec 是为"改现有系统"而不是"从零建新系统"设计的，这是它和传统 SDD/PRD 工具最大的差异。
3. **判断标准**：一句话能说清楚的改动（改字段名、加日志、调枚举值）不需要 OpenSpec；需要三句话以上才能说清楚、会跨多个模块、未来可能被反复修改的功能，才值得走一遍 SDD 流程。

不需要用到工具，看完这一层就能判断"这次改动要不要用 OpenSpec"。

---

## 阶段 1：环境搭建

- <cite doc-id="PrLUwqYGlibb3CkFqvrcxnfZnWY" file-type="wiki" title="2️⃣ 安装 &amp; 初始化" type="doc"></cite>

### 前置要求

```Bash
node -v   # 需要 v20.19.0 或更高
```

### 安装

> 当前最新版 1.12.0

```Bash
npm install -g @fission-ai/openspec@latest
openspec --version   # 确认输出 1.12.0 或更新
```

> 网上很多 2025 年底的资料描述的是 1.0 之前的行为（会生成 `openspec/AGENTS.md`、`openspec/project.md`，命令是 `/openspec:*` 前缀）。这些已经是过时设计，1.0 之后统一为 `/opsx:*` 前缀、不再生成静态全局配置文件

### 初始化

```Bash
cd your-project
openspec init --tools claude      # 只针对 Claude Code
openspec init --tools claude,cursor
openspec init --tools all         # 支持 20+ 工具，v1.10 起新增 Zed
```

默认 `core` profile 只装 4 条命令：`propose / explore / apply / archive`。要用完整工作流（`ff`、`verify`、`onboard` 等），需要：

```Bash
openspec config profile   # 交互式切到 custom（即 expanded）
openspec update           # 重新生成 .claude/skills/
# 重启 Claude Code —— 斜杠命令是启动时加载的
```

### 🆕 顶层命令清单已扩展（v1.11 / v1.12）

原文档的 CLI 章节只列了 `list / show / validate / view` 四把工具，v1.12 的 `openspec --help` 实际输出的顶层命令是：

```Plain Text
init        update       list         view
change      archive      spec         config
schema      store        doctor       context
workset     validate     show         feedback
completion  status       instructions templates
schemas     new
```

其中对日常学习最有用的新增项：

- **`status`** —— 单独查看一个 change 的 artifact 完成度，`--all` 可以一次看全部活跃变更（原来要逐个 `openspec show`）。
- **`store` / `doctor` / `context` / `workset`** —— 面向多仓库、跨 store 协作和个人工作视图的进阶能力，初学阶段可以先跳过，进入阶段 5 再看。
- **`schemas` / `templates` / `instructions`** —— 配合自定义 Schema 使用的辅助命令，见阶段 5。

---

## 阶段 2：看懂目录结构

- <cite doc-id="Ikdew2hyfiutZhk4hy5crGdenrd" file-type="wiki" title="3️⃣ 目录结构 &amp; 核心概念" type="doc"></cite>

结构没有变化，记住三个目录的职责边界即可：

```Plain Text
openspec/
├── specs/          ← 系统"现在"的行为规范（长期文档，按业务域组织）
├── changes/        ← 正在进行的变更（隔离工作区，可并行多个）
│   └── archive/    ← 已完成变更的历史归档（带日期前缀）
└── config.yaml     ← schema + profile 配置
```

一个 change 文件夹里四个文件的因果链：

```Plain Text
proposal.md（为什么做）
→ 
specs/（做什么，Delta Spec）
→ 
design.md（怎么做）
→ 
tasks.md（分几步做）
```

这条链决定了后面所有工作流命令的行为——`/opsx:continue` 按这个顺序逐个生成，`/opsx:apply` 按 tasks.md 的顺序实现，`/opsx:archive` 把 Delta Spec 合并回 `specs/`。

---

## 阶段 3：吃透核心工作流命令

- <cite doc-id="DZr2wgP7nigAkckS87icvAi7nGh" file-type="wiki" title="4️⃣ 核心工作流：OPSX 命令" type="doc"></cite>

### 命令地图

```Plain Text
思考阶段   /opsx:explore     ← 只调查，不写代码
规划阶段   /opsx:propose     ← new + ff 的快捷方式（日常首选）
          /opsx:new / continue / ff  ← expanded 下的细粒度控制
实现阶段   /opsx:apply       ← 按 tasks.md 逐条实现
          /opsx:sync        ← 修正 artifact 和代码之间的漂移
验证阶段   /opsx:verify      ← COMPLETENESS / CORRECTNESS / COHERENCE 三维检查
归档阶段   /opsx:archive     ← 单个归档
          /opsx:bulk-archive ← 批量归档，自动处理 spec 冲突
引导流程   /opsx:onboard     ← 存量项目冷启动练习
```

最高频路径：想不清楚先 `explore`，想清楚了 `propose`，实现完 `verify`，没问题 `archive`。

### 🆕 v1.12 行为增强

#### propose / ff / explore 

`/opsx:ff` 在 v1.12 被正式强化为发布说明里

- **Code-grounded planning**：

> Propose 和 fast-forward 工作流现在会在起草 artifact 之前主动检查相关代码、测试和文档。

- **Focused exploration**（v1.11 起）：

> Explore 模式会问依赖感知的问题、推荐默认值，并且会先检查仓库里已经有的事实，不再问你代码里已经写明的信息；同时 explore 在真正创建/修改文件前，会先报出打算动哪些文件，等你明确同意（单独一条消息里说"是"）才动手——回答它自己提出的问题不算同意。

对日常使用的影响：`/opsx:propose` 和 `/opsx:ff` 的输出质量会更贴近现有代码库的真实实现，不再单纯依赖你在 prompt 里描述的信息；`/opsx:explore` 在写入 openspec 文件前会多一次显式确认，避免"随口问了一句就被当成同意创建变更"。

#### `openspec show <change> --diff`

原教程只讲了 `openspec show` 能看 change/spec 详情，v1.11 给 `show` 加了 `--diff`：

```Bash
openspec show account-auto-pricing --diff
```

因为 `MODIFIED` 类型的 Delta Spec 必须完整重述它保留的每个 Scenario，肉眼看整份 Delta Spec 时大部分内容和主 spec 是重复的。`--diff` 只把真正变化的行提取出来，按 Requirement 做彩色 unified diff：`ADDED` 显示全文，`REMOVED` 显示 Reason/Migration 说明，`RENAMED` 显示 FROM/TO。`--json --diff` 可以喂给脚本，`--store <id>` 可以指定对比的 store。

#### `openspec status --all`

```Bash
openspec status --all
```

一次性看所有活跃 change 的 artifact 完成度（原来要么用 `openspec list`看进度百分比，要么逐个 `openspec show`）。某个 change 加载失败时只在结果里标一条诊断信息，不会中断整个命令，适合放进仪表盘或 CI。

### `/opsx:verify` 三个检查维度

- **COMPLETENESS**：tasks.md 是否全部勾选、每个 Scenario 是否有对应测试
- **CORRECTNESS**：代码行为是否和 specs 里的具体断言一致（比如 `< 5` 被写成 `<= 5` 这种差异错误）
- **COHERENCE**：代码是否忠实执行了 design.md 里的技术决策

Warning 不阻断归档，但优先级排序：Correctness 的逻辑错误优先修，Completeness 的测试缺口看场景重要性决定，Coherence 的漂移要么改代码要么改 design 补充说明理由——但不能让两者悄悄不一致。

---

## 阶段 4：掌握 Delta Spec 写法

- <cite doc-id="DZr2wgP7nigAkckS87icvAi7nGh" file-type="wiki" title="4️⃣ 核心工作流：OPSX 命令" type="doc"></cite>

这是全系列里最需要动手练习、最容易写错的一环，规则没有变化，直接背下来三条禁忌：

1. **GIVEN/THEN 不能写得笼统**——要有具体输入值和具体返回结构，否则 `/opsx:verify` 没法做语义匹配。
2. **MODIFIED 不能省略 `(Previously: ...)`**——没有这个标记，归档时会被当成 ADDED 处理，主 spec 里留下新旧两条重复 Requirement。
3. **不要把整个系统现有行为重写进 Delta Spec**——只写这次变更"新出现"或"发生变化"的部分，其余保持沉默。

语法骨架：

```Markdown
# Delta for <Domain>

## ADDED Requirements
### Requirement: <名称>
The system MUST/SHALL/SHOULD <行为>.
#### Scenario: <名称>
- GIVEN ...
- WHEN ...
- THEN ...

## MODIFIED Requirements
### Requirement: <已有名称>
<新行为>.
(Previously: <旧行为>)

## REMOVED Requirements
### Requirement: <已有名称> (Deprecated)
<废弃原因>.
```

动词强度：`MUST`（核心业务逻辑，无例外）> `SHALL`（强制但实现细节可灵活）> `SHOULD`（推荐非强制）。

---

## 阶段 5：CLI 工具箱进阶

- <cite doc-id="Liakw8TDoibnDek1fF4cBEGmn8d" file-type="wiki" title="6️⃣ 进阶：CLI 工具 &amp; 自定义" type="doc"></cite>

> v1.12 实际的 CLI 面已经宽得多，按使用频率重新分层：

### 日常必用（原文档已覆盖，行为不变）

- `openspec list` / `openspec list --specs`：项目状态速览，`--json` 可脚本化
- `openspec show <name>`：查看单个 change 或 spec 详情（🆕 支持 `--diff`，见阶段 3）
- `openspec view`：终端交互式仪表盘

### 校验与 CI

- `openspec validate <name>` / `--changes` / `--strict`：结构检查，和 `/opsx:verify` 的语义检查是两个层面，不需要 AI 参与
- 🆕 `openspec validate --report findings`（v1.12）：配合显式的 `--changes`/`--specs` 等批量范围，只输出 errors / warnings / informational findings，同时保留完整统计和退出码——适合 CI 里只想看"有没有问题"而不想看全量报告的场景
- 🆕 `openspec validate --archived`（v1.10 起）：校验已归档变更的任务是否全部完成，适合 pre-commit lint

### profile / delivery 配置

```Bash
openspec config profile   # 交互式切换 core / custom
openspec update            # 重新生成 .claude/skills/
```

v1.12 的 `config` 现在是一个子命令组，除了 `profile` 还有 `path / list / get / set / unset / reset / edit`，适合脚本化读写全局配置。

### Schema 自定义

```Bash
openspec schema init java-backend          # 交互式新建
openspec schema fork spec-driven java-backend   # 推荐方式：fork 默认 schema 再改
openspec schema validate java-backend
openspec schema which java-backend
```

🆕 配套的只读命令：`openspec schemas`（列出所有可用 workflow schema 及说明）、`openspec templates`（查看某个 schema 下所有 artifact 解析到的模板路径）、`openspec instructions`（输出某个 artifact/apply/archive 的完整生成指令，调试自定义 schema 的 prompt 注入效果时很有用）。

### 暂不需要深究的进阶面（v1.11+ 新增）

- `openspec store`：把某个目录注册为独立的 OpenSpec 仓库（"store"），供跨仓库场景引用和对比，`show/status/validate` 等命令的 `--store <id>` 参数都是配合它用的。
- `openspec doctor`：报告当前解析到的 OpenSpec root 的"健康状况"（多仓库/嵌套场景排障用）。
- `openspec context`：打印当前解析出的工作上下文，排查"AI 到底读到了哪个 openspec 目录"时用。
- `openspec workset`：个人本地工作视图，纯本地、不影响团队共享状态。

单人开发或小团队现阶段用不上这一层，等项目规模变大、涉及多仓库协作时再回来看

---

## 阶段 6：实战一次完整变更

- <cite doc-id="Liakw8TDoibnDek1fF4cBEGmn8d" file-type="wiki" title="6️⃣ 进阶：CLI 工具 &amp; 自定义" type="doc"></cite>

按原文的"账号估价"案例走一遍，五步流程不变，只是在这几个节点上可以用新命令加速：

```Bash
/opsx:propose account-auto-pricing      # 1. 提出变更（v1.12：会先扫描相关代码再起草）
/opsx:ff account-auto-pricing           # 2. 快进生成 proposal + specs + design + tasks
openspec show account-auto-pricing --diff   # 🆕 归档前只看真正变化的部分，而不是整份 Delta Spec
/opsx:apply account-auto-pricing        # 3. 按 tasks.md 实现代码
openspec status --all                   # 🆕 如果同时并行了多个 change，一次看完所有进度
/opsx:verify account-auto-pricing       # 4. 三维质量检查
/opsx:archive account-auto-pricing      # 5. 合并 Delta Spec 进主 spec，change 移入 archive
```

归档后建议单独提交一个 commit：

```Bash
git add openspec/
git commit -m "spec: archive account-auto-pricing"
```

这样 `git log openspec/specs/account/spec.md` 就是一份可追溯的业务意图历史，和代码 commit 分层但同步。

---

## 阶段 7：存量项目冷启动策略

已有代码库、`openspec/specs/` 还是空的时候，三条路径按适用场景选：

| 方式 | 适合场景 | 代价 |
|-|-|-|
| `/opsx:onboard`（需 expanded profile） | 第一次接触 OpenSpec，想要一次 15 分钟的引导式练习 | 只会覆盖一两个 Requirement，不是全量建档，本质是"教学流程" |
| 手动引导，按模块逐个让 AI 生成主 spec | 已熟悉 SDD 流程，想快速建立初始基线 | 一次一个模块，人工可控、可立即 review，半天可建起有效基线 |
| `spec-gen`（社区工具，静态分析 + LLM 逆向） | 想要工具化批量逆向 | 官方不推荐，噪音较大，需要大量 review |

官方立场没有变化：**不建议一次性预先生成所有 spec**，按需创建、随功能迭代顺带建档，六个月后高频业务域自然被覆盖，冷门功能没有 spec 也无妨。

### `/opsx:onboard`（官方推荐入口）

对于已有项目，`/opsx:onboard` 命令会从你的代码库生成初始 spec，让 AI 从第一天就有项目上下文可以参考。

这是官方为 brownfield 场景设计的入口，它会扫描现有代码、理解项目结构，然后为核心能力生成初始 `openspec/specs/` 文件。不是全量逆向，而是生成一个"够用的起点"。

在你的交易平台上执行这条命令，Claude Code 会读取 `TradeStateMachine`、`GameAccountServiceImpl`、支付回调相关代码，为每个主要能力域生成一份 spec 草稿，你再做 review 和修正。

`/opsx:onboard` 被归入了"expanded workflow"，默认安装的 core profile 只包含四条命令：`propose`、`explore`、`apply`、`archive`。如果你想用 `onboard`，需要手动切换 profile 并更新。

具体操作：

```Bash
openspec config profile      # 选择 expanded（包含 onboard）
openspec update              # 把新命令写入项目
```

之后 `/opsx:onboard` 就可以用了。

---

#### `onboard` 现在的实际功能

它是"引导式 onboarding"，流程是：扫描代码库找改进机会，让你选一个小功能，走一遍完整的 propose → apply → archive 流程，大约 15 分钟。

注意这里有个**认知偏差**需要纠正：我们之前讨论的"从代码生成 spec 基线"，`/opsx:onboard` 做的其实不是这件事——它的设计目的是**教新用户用 OpenSpec**，顺带扫一眼代码库找个练手素材，而不是系统性地逆向生成 `openspec/specs/` 目录。

---

#### 那 brownfield 冷启动怎么办, 手动引导

官方的态度是：一次性预先生成所有 spec 是浪费时间，应该按需创建、边建边积累。

所以对你的平台，最实际的策略还是之前说的那条路——直接对 Claude Code 下指令，按模块逐个生成：

```Plain Text
请读取 src/trade/ 目录的代码，
按照 openspec/specs/<capability>/spec.md 的格式，
为订单状态管理这个能力域生成一份 spec，
要求：
- 用 Given-When-Then 格式描述每个业务场景
- 只描述当前代码实际实现的行为，不要发明需求
- 按 Requirement → Scenario 层级组织
- 输出到 openspec/specs/trade-order/spec.md
```

一次一个模块，半天建起基线，比跑一个工具然后 review 几百行自动生成内容要可控

这种方式的优点是：你控制粒度（一次只做一个模块）、你可以在 prompt 里注入业务语言约束、生成结果可以立即 review

对于你们的 Spring Boot 项目，可以按服务边界逐个来：先 `trade-order`，再 `account-publish`，再 `payment-callback`，每次生成后 review 确认，整个过程大概半天能建立起有效的 spec 基线。

---

### `spec-gen`（社区工具，专门做逆向）

> 当前官方不推荐, 原因是噪音比较大

社区里有人专门构建了 `spec-gen`，一个开源 CLI 工具，通过静态分析结合 LLM 从现有代码库逆向工程出 OpenSpec 兼容的 spec

它的三步流程是：

- `spec-gen init`（检测项目类型、创建配置）
- `spec-gen analyze`（静态分析，不需要 API Key）
- `spec-gen generate`（生成 OpenSpec 格式的 spec）。

---

## 速查清单

学完之后，日常开发只需要记住这一条主链路：

```Plain Text
/opsx:explore（想不清楚才用）
    ↓
/opsx:propose <change-name>
    ↓
review 四个文件（proposal / specs / design / tasks）
    ↓
/opsx:apply
    ↓
/opsx:verify
    ↓
/opsx:archive
```

外加两个 v1.11+ 补充进日常习惯的命令：

- `openspec show <change> --diff` —— review Delta Spec 时只看真正变化的部分
- `openspec status --all` —— 并行多个 change 时一次看完整体进度

### OpenSpec 的本质定位

AI 编程助手很强大，但当需求只活在聊天记录里时会变得不可预测。OpenSpec 加了一层轻量的 spec 层，让你在写任何代码之前就先对齐要构建什么。

它的核心流程是：

```Plain Text
/opsx:new <feature>  
→  
/opsx:ff（生成 proposal + specs + design + tasks）  
→  
/opsx:apply（实现）  
→  
/opsx:archive
```

`/opsx:ff` 这一步会生成四类文档：

- `proposal.md`（做什么、为什么）
- `specs/`（需求与场景）, 需求侧的最核心的产出
- `design.md`（技术方案）
- `tasks.md`（实现清单）

---

### 需求侧的应用方式

**把 OpenSpec 当作需求-开发的桥接层**，而不只是开发者的规划工具。具体有几种用法：

**一、需求评审前用 `/opsx:new` 起草 proposal**

产品或技术负责人在需求评审之前，用 `/opsx:new <feature-name>` 创建变更目录，然后手写或让 AI 生成 `proposal.md`，里面写清楚 why/what/scope。这份文档就可以直接作为评审材料，比传统 PRD 更结构化，而且后续可以直接被 AI 用于实现。

**二、specs/ 目录承载业务验收标准**

`/opsx:ff` 生成的 `specs/` 目录可以放 Given-When-Then 格式的场景描述，需求侧人员（产品、测试）在这里添加或修改验收条件。开发拿到的不是模糊的需求文档，而是可执行场景——Claude Code 或 Cursor 等工具可以直接参照这些场景生成测试用例。

**三、brownfield 场景特别适合**

OpenSpec 是为 brownfield（已有项目）而不只是 greenfield 而构建的。 存量功能改造（比如重构 `TradeStateMachine`、升级订单状态流转逻辑）这类需求，用 `/opsx:new refactor-trade-state-machine` 生成 spec 之后，新旧行为的差异可以在 `specs/` 里显式描述，避免 AI 改出意料之外的结果。

**四、团队协作场景：spec 作为沟通媒介**

每个变更都有自己的目录，包含 proposal、specs、design 和 tasks。 这个目录结构可以直接进 Git，前端、后端、测试、产品都能在同一份 spec 上做 review 和修改。需求的"契约"不再只存在于会议记录或文档里，而是跟代码共生在仓库中。

---

### 一个具体的落地建议

OpenSpec 完全可以作为"需求侧到实现侧"打通的案例来讲：

```Plain Text
需求评审（产品）
    ↓
/opsx:new feature-name（创建 spec 目录）
    ↓
/opsx:ff（AI 生成 proposal + specs + design + tasks）
    ↓
需求侧 review specs/（产品 + 测试确认场景）
    ↓
/opsx:apply（Claude Code 按 spec 实现）
    ↓
测试按 specs/ 验收
    ↓
/opsx:archive
```

这个链路里，`/opsx:ff` 之后、`/opsx:apply` 之前的 review 阶段，就是需求侧介入最自然的节点。

### 核心工作流：以订单状态重构为例

我们用真实场景来走一遍完整流程。

#### 第一步：创建变更

```Plain Text
/opsx:new refactor-trade-state-machine
```

Claude Code 会在 `openspec/changes/refactor-trade-state-machine/` 下创建目录结构：

```Plain Text
openspec/changes/refactor-trade-state-machine/
├── proposal.md     ← 为什么做这件事
├── design.md       ← 技术方案
├── tasks.md        ← 实现任务清单
└── specs/          ← 需求场景（最重要）
    └── trade-order/
        └── spec.md
```

#### 第二步：快进生成所有规划文档

```Plain Text
/opsx:ff
```

这一条命令让 Claude Code 读取你的现有代码，然后生成四份文档。它会扫描 `TradeStateMachine.java`、`OrderServiceImpl.java`、相关的枚举和 DTO，理解当前系统状态，再根据变更名称推断意图。

生成的 `specs/trade-order/spec.md` 大概长这样：

```Markdown
# trade-order Specification

## Purpose
管理游戏账号交易订单的完整生命周期，包括状态流转、超时处理和异常回滚。

## Requirements

### Requirement: 状态流转完整性
系统 SHALL 保证订单状态只能按照预定路径流转。

#### Scenario: 买家超时未确认
- GIVEN 订单处于"待买家确认"状态
- WHEN 超过 48 小时买家未操作
- THEN 系统自动将订单标记为"超时关闭"
- AND 触发退款流程
- AND 发送 RocketMQ 消息通知卖家

#### Scenario: 支付成功后的状态推进
- GIVEN 买家已完成支付
- WHEN 收到支付回调
- THEN 订单状态从"待支付"变更为"交易中"
- AND 记录状态变更日志到 trade_state_log 表
```

在 `/opsx:apply` 执行之前，你、产品、测试都可以直接 review 这份 `spec.md`。它写的是业务语言，不是代码。产品可以补充遗漏的场景，测试可以把验收条件直接写进去，技术负责人可以确认边界条件。

这份文件进 Git，就是可追溯的需求契约。

#### 第三步：review 并修改 spec

直接编辑 `specs/trade-order/spec.md`，把你真正在意的场景补进去：

```Markdown
#### Scenario: 状态变更审计日志
- GIVEN 任意订单状态发生变更
- WHEN 状态流转执行
- THEN 向 trade_state_log 表写入一条记录
- AND 记录字段包含：操作人、原状态、新状态、时间戳、触发原因
```

这个补充动作不需要任何工具，就是写 Markdown。但它会在下一步直接影响 Claude Code 的实现行为。

#### 第四步：按 spec 实现

```Plain Text
/opsx:apply
```

Claude Code 读取 `specs/` 里的所有场景，逐条执行 `tasks.md` 里的任务。每个任务完成后打勾，你可以看到实现进度。

因为 spec 里明确写了"记录 trade_state_log"，Claude Code 会自动生成对应的实体类、Mapper、以及在状态流转节点插入日志的代码——而不是像之前那样只改了状态机本身就停下来。

#### 第五步：归档

```Plain Text
/opsx:archive
```

变更目录移入 `openspec/changes/archive/`，同时 `openspec/specs/trade-order/spec.md` 被更新为最新的系统状态描述。这就是持久化的上下文：spec 和代码共同生活在仓库里，不会因为聊天窗口关闭而消失。

---

### 长期价值

随着功能迭代，`openspec/specs/` 会逐渐积累成这样的结构：

```Plain Text
openspec/specs/
├── trade-order/        ← 订单状态与生命周期
├── account-publish/    ← 账号发布审核流程
├── payment-callback/   ← 支付回调处理
├── recommend-feed/     ← 推荐流逻辑
└── user-auth/          ← 登录与权限
```

新人加入团队，读这个目录比读代码快得多——这里写的是系统"应该做什么"，而不是"当前怎么做的"。

下一次做相关功能时，Claude Code 启动就会读取已有的 spec，理解系统约束，不会提出跟现有逻辑冲突的方案。

---

### 与 CLAUDE.md 的协同

OpenSpec 和 CLAUDE.md 是互补的：

- **CLAUDE.md** 定义的是项目级的永久约束：技术栈、代码规范、禁止行为
- **OpenSpec specs/** 定义的是功能级的业务契约：每个能力应该做什么

在 `CLAUDE.md` 里加一行引用，就能让每次对话都自动感知 spec：

```Markdown
## 业务规范
项目的功能规范定义在 openspec/specs/ 目录下。
在实现任何涉及订单、账号、支付的功能前，先读取对应的 spec.md 文件。
```

这样即使不用 `/opsx:` 命令，Claude Code 在日常对话里也会主动参考 spec 的约束。

---

### 给团队的建议

需求侧介入的最佳节点只有一个：`/opsx:ff` 之后、`/opsx:apply` 之前。

整个需求到实现的链路可以这样分工：

开发用 `/opsx:new` 和 `/opsx:ff` 生成 spec 草稿，产品在 `specs/` 里确认业务场景并补充遗漏的边界条件，测试把验收标准直接写成 Given-When-Then 格式追加进去，然后提 PR review 这份 spec——通过之后才执行 `/opsx:apply`。

这个流程的改变是：**需求评审的对象从 PRD 文档变成了 spec 文件，而 spec 文件直接就是 AI 的执行上下文**。中间没有"翻译"环节，需求损耗降到最低。

---

::: info 📆

更新记录
2026年09月05日
- 更新到 v1.11 / v1.12

:::