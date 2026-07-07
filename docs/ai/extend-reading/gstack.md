---
description: 'gstack学习路线分七阶段：快速入门安装与理解七步冲刺；掌握十类技能（思考、规划、开发、构建、评审、测试、优化等）；实践并行工作流；深度定制项目级配置；高级优化与质量管控；培养Builder Ethos与设计品味；团队大规模应用。适合Duoli按周推进，从核心技能切入，逐步深化。'
lastUpdated: '2026-07-07 11:44:38'
head:
  - - meta
    - name: 'og:title'
      content: 'gstack 学习路线图'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'gstack学习路线分七阶段：快速入门安装与理解七步冲刺；掌握十类技能（思考、规划、开发、构建、评审、测试、优化等）；实践并行工作流；深度定制项目级配置；高级优化与质量管控；培养Builder Ethos与设计品味；团队大规模应用。适合Duoli按周推进，从核心技能切入，逐步深化。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ai/extend-reading/gstack.html'
---
# gstack 学习路线图

<readonly-block href="https://code.juejin.cn/pen/7626575412608385058" type="iframe"></readonly-block>

> gstack：将Claude Code转变为虚拟工程团队的开源工具集。一个人配合正确的工具可以像20人的团队一样快速迭代。

## 核心理念

gstack本质上是一个**软件工程过程框架**，而不只是工具集合。

它将产品开发流程标准化为七个阶段：思考 → 规划 → 构建 → 评审 → 测试 → 发布 → 反思。每个技能输出都自动流入下一环节，形成完整的闭环

---

## 第一阶段：快速入门

**目标：理解gstack的核心价值主张和基本工作流**

### 1.1 安装与配置

安装 gstack 到 skill 中

```Plain Text
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && \
cd ~/.claude/skills/gstack && ./setup
```

加入前缀可以使用 `--prefix`, 默认无前缀（`/qa`），可选前缀模式（`/gstack-qa`）

```Markdown
cd ~/.claude/skills/gstack && ./setup --prefix
```

在项目 CLAUDE.md 中添加 gstack 配置段

```Plain Text
## gstack
Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy,
/canary, /benchmark, /browse, /open-gstack-browser, /qa, /qa-only, /design-review,
/setup-browser-cookies, /setup-deploy, /setup-gbrain, /retro, /investigate, /document-release,
/codex, /cso, /autoplan, /pair-agent, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, /learn.
```

**安装 codex 或其他客户端**

```Bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup
```

安装指定的 host

```Shell
./setup --host codex     # codex       ~/.codex/skills/gstack-*/
./setup --host opencode  # opencode    ~/.config/opencode/skills/gstack-*/
```

卸载

```Plain Text
~/.claude/skills/gstack/bin/gstack-uninstall
```

### 1.2 理解Seven-Stage Sprint

学习gstack的核心流程框架，这是一切的基础：

```Plain Text
office-hours → 
design-consultation (建立设计系统) →
autoplan (全面审查计划) → 
  ├── plan-ceo-review（产品策略）
  ├── plan-design-review（设计体验）
  ├── plan-eng-review（架构技术）
  └── plan-devex-review（开发者体验） ← 这里
implement → 
review → 
codex →
QA → 
ship →
land-and-deploy →
canary →
benchmark

guard
  ├── careful
  └── freeze
```

#### **思考阶段（Think）**

`/office-hours`

在编码前重新审视问题陈述，提出6个强制性问题，生成3种实现方案

> 输出物：DESIGN.md（设计文档）

#### **规划阶段（Plan）**

> 输出物：架构决策、测试矩阵、设计规范

`/plan-ceo-review`：

CEO视角的战略规划，重新思考这个计划, 找出潜在的满分产品, 通过以下 4 种模式执行

`/plan-eng-review`

架构锁定，数据流图，流程设计, 边界，测试计划, 给 QA 来使用, 将隐藏的假设公之于众

`/plan-design-review`

高级设计师, 对设计进行维度评分（0-10），解释 10 分的样子, 然后编辑计划以达到目标并进行AI生成物检测

使用 AskUserQuestion 和用户交互, 并询问相关问题

`/plan-devex-review`

是 **Developer Experience 审查（计划阶段）**，定位是在写代码之前，对你的产品做一次完整的开发者体验评审

#### **构建阶段（Build）**

Claude Code执行实现

`/ship`

支持的构建标准化流程

#### **评审阶段（Review）**

`/review`

Staff Engineer级别的代码评审，自动修复常见问题

`/codex`

从OpenAI获取第二意见（跨模型分析）

#### **测试阶段（Test）**

`/qa`

真实浏览器测试，自动修复并生成回归测试

`/cso`

OWASP Top 10 + STRIDE威胁建模

`/benchmark`

性能基准测试

#### **发布阶段（Ship）**

`/ship`

同步main、运行测试、提交PR

`/land-and-deploy`

合并、等待CI、验证生产健康度

#### **反思阶段（Reflect）**

`/retro`

团队周报，个人贡献分析，趋势追踪

`/document-release`

自动同步所有项目文档

### 1.3 第一个工作流体验

按照 README的 "See it work"示例完整走一遍：

```Plain Text
你的任务：我想构建一个日常日程汇总应用
→ /office-hours           # 理解真实需求而非表面诉求]
→ /plan-ceo-review        # 重新定义产品边界]
→ /plan-eng-review        # 锁定技术架构]
→ coding                  # 8分钟，2400行代码]
→ /review                 # 自动修复常见问题]
→ /qa https://staging     # 真实浏览器测试，发现和修复bug]
→ /ship                   # 提交PR，验证覆盖率]
```

**关键收获**：理解"你说的是日程应用，但实际上是在构建个人COO"的重新定义能力。

## 第二阶段：工具体系掌握

### 思考类（思维工具）

#### `/office-hours`

 gstack 里的产品构思技能，分两种模式运行：**Startup 模式**用六个强迫性问题来暴露需求现实（demand reality）、现状、精确痛点、最窄切入口、观察洞察、未来适配性；**Builder 模式**则用设计思维方式来头脑风暴，适合副业项目、黑客松、学习项目和开源项目。

它的定位是整个 gstack 工作流的**第一个环节**，整个流程是：Think → Plan → Build → Review → Test → Ship → Reflect，每个技能都为下一个喂料，`/office-hours` 写出的 design doc 会被 `/plan-ceo-review` 读取。

`/office-hours` 的核心价值是：在写任何代码之前，把隐藏假设强行暴露出来。

**触发时机**

当用户说"帮我头脑风暴"、"我有个想法"、"帮我想清楚这件事"、"office hours"、"这个值得做吗"时触发。更重要的是，当用户描述一个新产品想法、询问某件事是否值得构建、想梳理尚不存在的东西的设计决策、或者在写任何代码之前探索一个概念时，应该主动触发这个技能，而不是直接回答。

---

**产出结果**

两种模式结束时，都会把 design doc 写入 `~/.gstack/projects/` 目录，这份 doc 直接喂给 `/plan-ceo-review` 和 `/plan-eng-review`。完整生命周期是：`office-hours → plan → implement → review → QA → ship → retro`。

Design doc 里除了方案本身，还包含 `/office-hours` 对你思维方式的观察——不是泛泛夸赞，而是针对你在对话中说过的具体内容的回调，让你之后重读时再次遇见这些观察。

另外，技能支持跨团队发现：多个用户探索同一个项目时，能看到彼此在 `~/.gstack/projects/` 里写的 design doc。

---

**使用注意事项**

1. **要在写代码之前用** 这是它存在的意义。如果已经开始写代码了再用，价值会大打折扣。它应该是每个 sprint 的第一步。
2. **搜索前有隐私确认** 在理解问题之后，技能会搜索外部信息来了解行业常识。但在搜索前会弹出确认提示：会发送泛化的类别词（不是你的具体想法）到搜索引擎。你可以选择"Yes, search away" 或 "Skip — keep this session private"。
3. **它不直接执行，要主动接受挑战** 它会挑战你的假设，提出反驳，生成不同的实现思路，不会直接顺着你说。这是设计意图，不是 bug——要准备好真正回答它的问题，而不是敷衍。
4. **跨 session 有记忆** 技能会追踪你做了多少次 office hours，并根据次数调整欢迎方式和互动深度，和你建立会随时间加深的关系。第一次和第十次的体验是不同的。
5. **后续技能要配合读取产出**`/plan-ceo-review` 和 `/plan-eng-review` 都预设会去读 `/office-hours` 生成的 design doc。如果跳过 `/office-hours` 直接进入规划阶段，这两个技能的效果会下降

#### `/design-consultation` 

`/design-consultation` 是一个设计系统建立工具：理解你的产品、研究竞品视觉格局、提出完整的设计系统方案（美学风格、字体、颜色、布局、间距、动效），并生成字体和配色的预览页面。最终产出 `DESIGN.md` 作为项目的设计唯一真相来源。

`/design-consultation` 属于 **Design（设计系统建立）阶段**，在开始写 UI 代码之前运行，是整个前端视觉体系的起点。

在 gstack 工作流中的位置：

```Plain Text
/office-hours  →  /design-consultation  →  /autoplan / 写代码  →  /design-review  →  /ship
（想法探索）       （建立设计系统）         （审查计划/实现）      （视觉审查）       （发布）
```

如果你已经有一个现有站点，应该用 `/plan-design-review` 来推断现有的设计系统，而不是从零开始跑 `/design-consultation`。

---

**工作流程**

`/design-consultation` 是一个多阶段的对话式流程，而非一次性命令。

**第一步：理解产品背景**

Skill 启动后会读取 `README.md`、`package.json`、`src/` 等目录，如果 `/office-hours` 之前跑过，会自动读取其产出的产品设计文档，省去重复沟通。如果代码库是空的且产品方向不明确，会建议你先去跑 `/office-hours`。

**第二步：竞品视觉研究**

它会浏览竞品产品（比如 Linear、Vercel、Datadog、Posthog）并截图，分析视觉格局，然后告诉你："它们都集中在干净的无衬线字体和蓝灰色调，大家看起来都一样。这是我的提案——这几个地方我会保守，这几个地方我会冒险。"

**第三步：提出完整设计系统方案**

设计顾问的姿态是：提案而不是呈现菜单。提出一个完整的、内在一致的系统，解释为什么这样设计，然后邀请你调整。每一条建议都必须有理由，而不是单纯说"我推荐 X"。整个过程是对话式的，不是死板的表单填写。

**第四步：生成 HTML 预览页**

预览页包含：每种字体候选在其对应角色（大标题、正文段落、按钮标签、数据表格行）中的展示；调色板示例（按钮的 primary/secondary/ghost 状态、卡片、表单输入框、告警提示）；以及基于项目类型的 2-3 个真实产品页面布局 mockup，比如数据仪表盘会展示有数据的侧边栏导航、表头带头像、指标卡片、数据表格等完整界面。

---

**产出结果**

**核心产出：`DESIGN.md`**

Skill 最终会把 `DESIGN.md` 写入仓库根目录，作为项目的设计唯一真相来源，并更新 `CLAUDE.md`，让每一个后续的 Claude Code Session 都遵守这套设计系统。从此以后，`/design-review` 可以对照它做审查，任何在前端工作的 Agent 都知道要遵守哪些规则。

**设计产物存储路径**

所有设计产物（mockup、对比图、`approved.json`）必须保存到 `~/.gstack/projects/$SLUG/designs/`，绝对不能存到 `.context/`、`docs/designs/`、`/tmp/` 或任何项目本地目录。设计产物属于用户数据，不是项目文件，需要跨 branch、跨会话、跨 workspace 持久保留。

**HTML 预览文件**

临时预览文件会保存到 `/tmp/design-consultation-preview-{timestamp}.html` 并在浏览器中打开供你确认，确认后内容才会写入 `DESIGN.md`。

---

**使用注意事项**

**前置条件：先跑 `/office-hours`**

如果 `/office-hours` 已经跑过，产品背景会自动预填充，可以跳过重复的产品说明环节；如果代码库是空的而且目的不明确，skill 会直接建议你先去 `/office-hours`

**已有 `DESIGN.md` 时的行为**

如果 `DESIGN.md` 已经存在，Skill 会读取它，并询问你：是想更新它、全部推倒重来，还是取消？不会静默覆盖。

**浏览器能力是可选的**

如果 `/browse` 工具不可用，视觉竞品研究阶段会跳过，但 skill 本身仍然可以正常运行，会退而使用 WebSearch 和内置设计知识来完成其余流程。

**这是对话，不是一条命令跑完**

整个流程是 Design Consultant 角色，不是表单向导。你随时可以打断、修改方向、提出偏好。Skill 不会强迫你按阶段走，但建议至少确认字体和配色方向后再让它写 `DESIGN.md`，否则后续修改成本较高。

**与 `/plan-design-review` 的区别**

|  | **/design-consultation** | **/plan-design-review** |
|-|-|-|
| 适用场景 | 新项目，从零建立设计系统 | 已有计划文件，在 Plan 阶段做设计审查 |
| 是否生成 DESIGN.md | 是（核心产出） | 否（对照已有 DESIGN.md 评审） |
| 运行时机 | 动手写 UI 之前 | /autoplan 流水线中 |

**字体黑名单**

Skill 内置了一份被过度使用的字体黑名单，不会把这些字体作为主字体推荐。如果你主动要求某个黑名单字体，它会照做，但会解释这个选择的权衡。

### 规划类（计划工具）

#### `/autoplan` 

`/autoplan` 是 gstack 的 **Review Pipeline**：一条命令，跑完 CEO → 设计 → 工程的全部 Review，把决策原则编码进去自动裁决，只把"品味决策"留给你最终拍板。

**核心工作原理**

`/autoplan` 会依序从磁盘读取 CEO Review、Design Review、Eng Review、DX Review 这四个完整的 Skill 定义，然后用 6 条决策原则串行执行，自动裁决绝大多数问题。最终只把"品味决策"（接近的方案选择、边界模糊的 Scope、Codex 意见分歧等）汇聚到一个最终审批门控，交给你确认。

四条流水线分别是：

```Shell
plan-ceo-review      CEO 视角产品方向、需求真实性、Scope 把控
plan-design-review   设计视角UX/UI 质量评分（0-10 分制）
plan-eng-review      工程视角架构、数据流、边界 case、测试策略
plan-devex-review    DX 视角开发者体验、TTHW（Time to Hello World）指标
```

每个阶段还会同时启动 **OpenAI Codex CLI** 作为第二意见，做对抗性挑战（adversarial review）。Codex 的超时上限是 10 分钟的 shell 包装器加上 12 分钟的 Bash 外层门控，超时后自动降级为只用 Claude 子 Agent 继续跑。

---

**产出结果**

**运行过程中的输出：**

你能看到类似这样的进度：

```Shell
Running CEO review... 
[4 scope decisions auto-resolved] 
→ 
Running design review... 
[3 design dimensions auto-scored] 
→ 
Running eng review... 
[2 architecture decisions auto-resolved]
```

然后是需要你输入的 TASTE DECISIONS 列表。

**最终写入计划文件的内容：**

每个 Review 阶段结束后，会调用 `gstack-review-log` 把结构化的 JSONL 记录写入持久存储，包含 skill 名称、时间戳、状态（STATUS）、未解决问题数（unresolved）、关键缺口数（critical_gaps）、来源标记 `"via":"autoplan"` 以及当前 commit hash。

具体包括：

- 每条 Review 的 pass/fail 状态
- 各阶段发现的问题数量汇总
- DX Review 的 TTHW 当前值与目标值
- 一张完整的 `## GSTACK REVIEW REPORT` 表格附加到计划文件末尾

如果计划文件里缺少这个 Review Report，gstack 会在 Plan 模式退出前自动读取并补全这张表；如果完全没有跑过 Review，就会显示一个 5 行的占位表格，verdict 显示 `"NO REVIEWS YET — run /autoplan"`。

---

**使用注意事项**

**前置条件 :** `/autoplan` 依赖 OpenAI Codex CLI，运行前需要确保 `codex` 命令已安装并完成登录。如果没有，每个阶段会自动降级为 Claude 子 Agent 单独跑，功能可用但少了对抗性验证的价值。

**账号隔离风险（重要） :** 这是一个已知问题：`/autoplan` 的各 Review 阶段会直接 shell 出去调用 `codex exec`，没有任何账号选择提示，而是静默使用 `~/.codex/` 下当前登录的账号。如果你有多个 Codex 账号（比如个人账号和公司账号），可能会在毫不知情的情况下用错账号，甚至产生非预期账单。

临时保护方式：`mv ~/.codex ~/.codex-work`，然后用 `CODEX_HOME=~/.codex-personal codex login` 单独设置个人认证。这样 `/autoplan` 遇到 Codex 时会因找不到二进制而明确报错，而不是静默用错账号。

**Token 消耗 :** `/autoplan` 会串行跑 4 个完整的 Review Skill，每个 Skill 内部还有 Codex + Claude 两个声音并行，属于 gstack 里消耗最重的命令之一。不要在随手测试的场景下直接跑，建议在有正式计划文件、且已经经过 `/office-hours` 沉淀过想法之后再使用。

**中途不要打断 :** 每个 Review 阶段的结果会写进 JSONL 日志，中途中断可能导致 Review Report 状态不一致（部分写入）。如果中断了，建议重新完整跑一遍，或者手动跑对应的单个 Review Skill 补全。

**Proactive 模式下会自动触发 :** 语音/文字触发词包括 "auto review"、"autoplan"、"run all reviews"、"review this plan automatically"、"make the decisions for me"，以及语音别名 "auto plan"、"automatic review"。在 proactive 模式开启的情况下，当你有计划文件并且想跑完整 Review 流程时，gstack 会主动建议调用 `/autoplan`。

#### `/plan-ceo-review` 

这个 skill 扮演的是"CEO / 创始人"角色，核心使命是**重新思考问题本质**，找到藏在需求背后那个真正值得做的"10星产品"。

Garry Tan 本人把它叫做 **Brian Chesky mode**——它不问"怎么加这个功能"，而是问"用户视角下，最理想的那个版本到底长什么样"。

是进入实现之前的产品思维把关环节。通常 `/office-hours` 生成 design doc 之后，`/plan-ceo-review` 和 `/plan-eng-review` 会读取这份文档作为输入，接着向下传递给实现阶段。

如果嫌麻烦，可以直接用 `/autoplan`——它会把 CEO review → design review → eng review 自动串成一条流水线，一条命令跑完。

---

**四种工作模式（产出前先选模式）**

这个 skill 提供四档模式，决定了它会给你什么样的建议：

- **SCOPE EXPANSION**：大胆展开，提出野心版本，每项扩展都作为独立决策供你逐一 opt-in，倾向于积极推荐
- **SELECTIVE EXPANSION**：以现有 scope 为基准，逐一浮现机会，保持中立推荐，你来挑哪些值得做
- **HOLD SCOPE**：对现有方案做最严格的深化分析，不展开任何新方向
- **SCOPE REDUCTION**：找到最小可行版本，砍掉其他一切

---

**具体产出结果**

1. **产品重新定义** 对你的需求做更高维度的重新框架，挑战原有假设，给出更大或更精准的产品愿景。
2. **逐项扩展决策清单** 每项扩展都是独立决策，你可以逐一选择是否采纳，而不是一锅端。
3. **CEO Handoff 文件** review 结果会持久化为 handoff note，写入 `~/.gstack/projects/$SLUG/` 目录，供下一个 review session（或 `/plan-eng-review`）直接读取，避免重复提问。
4. **写入 plan 文件的 GSTACK REVIEW REPORT 段落** 在 plan 文件中插入/更新 `## GSTACK REVIEW REPORT` 节，标明 CEO Review 的状态（CLEAR 或 required），作为 `/ship` 的就绪判断依据。
5. **可选升级为团队设计文档** 特别出色的产品愿景可以从 `~/.gstack/projects/` 提升到项目 `docs/designs/` 目录，供团队共享。

---

**使用注意事项**

**① 先跑 `/office-hours` 再用它** 最佳路径是先通过 `/office-hours` 完成一次产品思考、生成 design doc，再调用 `/plan-ceo-review`，因为它依赖 design doc 作为输入上下文。

**② CEO review 不阻塞 ship，但 Eng review 会** 在 `/ship` 的就绪 dashboard 里，CEO Review 默认不是强制 gate——只有 Eng Review 才默认必须 CLEAR 才能发布。所以 CEO Review 更多是产品质量保障，而非发布阻断点。

**③ 续会时 handoff note 会自动恢复上下文** 如果上次 CEO Review 中途暂停（比如去跑了 `/office-hours`），下次重新调用时它会自动检测 handoff note 并读取，避免把你之前已经回答的问题再问一遍。

**④ 不要跳过 CLI 写入步骤** review 结束后有一段必须执行的 bash 命令把元数据写入 `~/.gstack/`，这步如果跳过会导致 `/ship` 的 review readiness dashboard 数据缺失。

**⑤ 选模式是关键决策** 四档模式的选择直接决定你这次会谈的走向。如果你只是想验证方向、不想被天马行空的新功能打扰，选 HOLD SCOPE；如果在早期探索阶段，SCOPE EXPANSION 更合适。没有默认"正确"的模式，取决于你当前项目所处阶段。

#### `/plan-design-review` 

这是一位**资深设计师在你写第一行代码之前审查你的计划**。大多数 plan 只描述后端做什么，但从不指定用户实际看到什么——空状态、错误状态、加载状态、移动端布局、AI 生成感的问题——这些决策都被推迟到"实现时再想办法"，结果工程师直接上了一个 `No items found.` 作为空状态，因为没人提前说清楚更好的做法。`/plan-design-review` 在规划阶段就把这些问题揪出来，修改成本最低的时候。

它和姐妹 skill `/design-review` 的分工：`/design-review` 是对线上站点的视觉 QA，发现问题直接修代码；`/plan-design-review` 是 plan-mode 的设计审查，在实现之前运行。

---

**核心机制：7个维度逐一打分修复**

在 `/autoplan` 里它覆盖全部 7 个设计维度，全深度执行。交互模式和 CEO/Eng review 完全一致——每次 STOP + AskUserQuestion，一个问题一个问题来，不批处理，每个维度打 0-10 分，告诉你 10 分长什么样，然后直接把 plan 改到那个水平。

从官方 docs 中的真实运行样例来看，一次典型执行可能是这样的：

- **信息架构（Pass 1）**：3/10，"10 分的标准是每个屏幕都定义主/次/三级内容层级" → 往 plan 里添加了信息层级章节
- **交互状态（Pass 2）**：2/10，"这个 plan 有 4 个 UI feature 但指定了 0 个交互状态（4 个 feature × 每个 5 种状态 = 应该有 20 个）" → 添加了交互状态表格
- **AI Slop 检测（Pass 4）**：4/10，"plan 里说'带卡片和图标的简洁现代 UI'和'带渐变的 hero section'，这是排名前两位的 AI 感设计 pattern" → 用具体的、有意图的描述替换掉了这些词
- **最终得分**：4/10 → 8/10，"design-complete，实现之后跑 /design-review 做视觉 QA"

**AI Slop 黑名单：核心特色功能**

这是这个 skill 最有辨识度的能力。它内置了明确的"AI 生成感"黑名单（10 种最典型 pattern），包括：紫色/紫罗兰/靛蓝渐变背景或蓝到紫的配色方案；三列 feature 网格（圆形彩色背景图标 + 粗体标题 + 两行描述，对称重复三次）——这是最容易被认出是 AI 生成的布局。

如果 `/office-hours` 阶段生成了视觉 mockup，这个 skill 也会用 Read 工具读取每张 mockup 图片，对照 AI Slop 黑名单逐一检查，发现问题就提供 iterate 命令重新生成更有区分度的方向。

设计哲学方面，核心原则包括：AI Slop 是最大的敌人；响应式不是"手机上堆叠一下"，每个界面都需要有意图的设计；无障碍不是可选项，键盘导航、屏幕阅读器、对比度、触控目标必须在 plan 里指定；减法优先，UI 元素如果不能赚到它占用的像素，就删掉。

---

**具体产出结果**

1. **各维度打分后修订的 plan 文件** 这是核心产出。交互式走完 7 个维度后，plan 文件里会有每个设计维度的明确规格：每个屏幕的信息层级、完整的交互状态表格（空状态/错误状态/加载状态/成功状态等）、移动端布局说明、无障碍规格，以及被替换掉的所有 AI slop 描述。
2. **design_score 和 ai_slop_score** review 结束后会把 `design_score` 和 `ai_slop_score` 两个评分字段写入 `~/.gstack/projects/$SLUG/` 的 review JSONL 日志。这两个分数后续被 `/ship` 的 Review Readiness Dashboard 读取展示。
3. **DESIGN.md 推断或标注** 如果项目里存在 DESIGN.md，它会用 DESIGN.md 里的具体 token 和组件来标注 plan，确保设计实现时遵守既有设计系统。如果没有 DESIGN.md，这个 skill 可以推断项目的设计系统（颜色、间距、字阶、组件）并输出一份 DESIGN.md 摘要供后续使用。
4. **GSTACK REVIEW REPORT 节** 和其他 plan review skill 一样，结果追加到 plan 文件的 `## GSTACK REVIEW REPORT` 段，供 `/ship` 就绪仪表盘读取。

---

**使用注意事项**

**① 它在 `/autoplan` 里排 CEO 之后、Eng 之前** 顺序是 CEO → Design → Eng，不能并行，每阶段必须完全结束后才能进入下一个。Design review 需要 CEO review 定下来的方向作为输入，Eng review 再基于设计决策来做架构规格。

**② 只适用于有 UI 的 plan** CEO review 在 Step 0 分析 plan 时，会判断是否涉及新 UI 屏幕/页面、现有 UI 组件变更、用户可见的交互流程、前端框架变更、移动端/响应式行为或设计系统变更，如果有则标记 DESIGN_SCOPE，进而触发 plan-design-review。纯后端、纯基础设施的 plan 不需要跑这个 skill。

**③ office-hours 的 wireframe 会被这里读取**`/office-hours` 阶段生成的线框图截图保存在 `/tmp/gstack-sketch.png`，`/plan-design-review` 会读取这张图作为参考，了解最初设想的视觉方向，避免审查时和原始构想脱节。

**④ 重新运行有增量逻辑** 重新跑这个 skill 时，已经达到 8 分以上的维度只做快速 pass，低于 8 分的维度才做完整审查。也就是说，改完 plan 后再跑一次不是从零开始，效率很高。

**⑤ Design review 不阻塞发布，但是 Eng review 会** 和 `/plan-ceo-review` 一样，Design Review 在 `/ship` 的就绪仪表盘里默认不是强制 gate，但它的分数会被记录和展示。如果你想在发布前确保设计质量，可以在 plan 阶段把分数提到 8 分以上，再由后续的 `/design-review`（live 版）做视觉 QA 收尾。

#### `/plan-eng-review` 

这个 skill 扮演的是"工程经理 + 技术主管"角色，核心任务是锁定执行计划——架构、数据流、图表、边界情况、测试覆盖、性能。它用交互式的方式逐项走过工程问题，给出有观点的建议。

它不会让想法变小，它的工作是让想法变得**可以落地**。一个雄心勃勃但缺乏架构支撑的 feature，在实现阶段一定会垮掉。有清晰系统边界、明确故障模式和完整测试覆盖的计划，才能承载激进的 scope。

**最核心机制：强制生成图表**

这是 `/plan-eng-review` 最显著的特征——**强制生成图表，不可选，不是"考虑一下加个图"，而是必须完成**，才算一个合格的 plan：

- **序列图（Sequence diagrams）**：追踪请求从客户端穿越服务器到数据库和外部服务的完整流程，暴露隐藏的服务依赖和顺序假设
- **状态图（State diagrams）**：枚举实体的每一种状态和每一个合法转换，识别需要防守的非法状态
- **组件图（Component diagrams）**：定义系统边界，明确哪个模块负责哪个职责，在引发冲突之前消除归属歧义
- **数据流图（Data-flow diagrams）**：追踪数据从哪里产生、在每个阶段如何变换、最终落在哪里，揭示隐藏的数据依赖
- **测试矩阵（Test matrices）**：将 feature 和测试类型（单元/集成/e2e）交叉映射，每格写出具体场景，确保没有漏网之鱼

为什么强制？因为书面文档可以写得很模糊但看起来完整，图表做不到这一点。当你画出服务间的箭头，那些没回答的问题立刻浮出水面：谁在失败时重试？下游服务慢了怎么办？这个调用是同步还是异步？超时在哪里处理？这些没答案的问题，就是三周后的生产事故。

---

**具体审查覆盖范围**

覆盖以下七大维度：

- **系统边界**：涉及哪些服务、谁负责什么、API 合同在哪里定义
- **数据流**：数据来源、转换过程、存储位置、访问模式、迁移策略
- **状态转换**：实体的每种状态、合法转换、需要防守的非法状态
- **故障模式**：网络失败、部分写入、超时行为、重试策略、数据一致性
- **信任边界**：在每个边界处的输入校验、认证、授权、数据清理
- **边界情况**：边界条件、空状态、权限差异、竞争条件、并发访问
- **测试覆盖**：单元测试、集成测试、e2e 场景、测试矩阵、验收条件

**具体产出结果**

1. **修订后的 plan 文件（含四类架构图）** 这是主产物。plan 文件里会写入序列图、状态图、组件图、数据流图以及测试矩阵，所有之前含糊的架构决策都变成具体的可执行规格。
2. **测试计划 artifact**`/plan-eng-review` 完成测试审查部分后，会把测试计划写入 `~/.gstack/projects/`。后续运行 `/qa` 时，它会自动读取这份测试计划——工程 review 的产出直接喂给 QA 测试，无需手动复制粘贴。
3. **GSTACK REVIEW REPORT 节** 和其他 plan review skill 一样，审查结果追加到 plan 文件的 `## GSTACK REVIEW REPORT` 段，记录状态（CLEAR 或需要进一步处理），供 `/ship` 的就绪 dashboard 判断。
4. **写入 review 日志** metadata 字段包括 `status`、`initial_score`、`overall_score`、以及各架构维度的评分，全部持久化到 `~/.gstack/`。

---

**使用注意事项**

**① Eng Review 是唯一默认阻塞发布的 review**

在 `/ship` 的 Review Readiness Dashboard 中，Eng Review 是**唯一默认必须 CLEAR 才能发布**的 review，其余（CEO、Design、Codex）都是可选的。如果你确实想绕过它，可以用 `gstack-config set skip_eng_review true`，但这是"别烦我"设置，不推荐正式项目这样用。

**② 单独使用的场景**

如果产品方向已经明确锁定，只是工程实现方式需要规格化，可以单独跑 `/plan-eng-review`，不需要先过 CEO review。基础设施迁移、性能优化项目、重构工作——这些"做什么"已知、"怎么做"需要严格定义的场景，它是最合适的工具。

**③ 与代码 review 的配合**

如果 `/review`（代码 PR 审查）发现了架构层面的问题，回头跑一次 `/plan-eng-review` 来厘清正确路径是个好选择——它不只适用于"写代码之前"，也适用于"代码写完发现架构有问题之后"的补救。

**④ 测试矩阵自动流向 QA** 这个产出链是 gstack 最有价值的串联之一。eng review 生成的测试矩阵不是放在那里看的，后续 `/qa` 会自动读取并以此作为测试执行依据——所以在 eng review 时认真填写测试场景，直接影响 QA 的覆盖质量。

**⑤ 和 `/autoplan` 的关系** 想要 CEO → Design → Eng 三个 review 一气呵成，直接跑 `/autoplan`。它会把 `/plan-eng-review` 串进去并全量执行，只在真正需要你做判断的"TASTE DECISION"处暂停询问，其余自动推进。

#### `/plan-devex-review`

这个 skill 的触发路由是"Developer experience of a plan"，扮演的是**开发者体验（DX）专家**角色。它在代码还没写之前，专门对计划中的开发者体验进行前置审查——核心关注点是：一个新开发者拿到你的产品，从零到跑起来第一个 Hello World 要花多少时间（TTHW，Time-To-Hello-World），这条路上有没有坑

它和姐妹 skill `/devex-review` 的关系很清晰：`/devex-review` 是**实时**审查，真正打开浏览器、导航文档、计时、截图，然后和 `/plan-devex-review` 的规划分数对比，看计划和现实差多远——这就是所谓的"boomerang"（回旋镖）机制。`/plan-devex-review` 是 plan 阶段的预判，`/devex-review` 是上线后的验证。

---

**工作流程**

启动后首先执行 Step 0（DX 范围评估）：自动识别产品类型，梳理开发者上手旅程，对当前 DX 完整性打 0-10 的初始分，评估 TTHW。然后进入 Step 0.5（双声部模式）：先跑 Claude 子 Agent，再跑 Codex，分别以"CODEX SAYS（DX challenge）"和"CLAUDE SUBAGENT（DX independent review）"两个视角输出结论。

审查覆盖 8 个 DX 维度，包括竞争基准、魔法时刻（Magical Moment）、上手摩擦（Getting Started Friction）、错误信息质量、API/CLI 命名一致性等。其中"DX 品味决策"类的问题会被特别标记为 TASTE DECISION，让用户自己拍板。

---

**具体产出结果**

会产出以下内容：

1. **DX 评分卡（带前后对比）** 记录字段包括 `initial_score`（初始评分）→ `overall_score`（修订后评分），以及 `tthw_current`（当前预估 TTHW）→ `tthw_target`（目标 TTHW）。这是核心产出，直接量化你的 DX 质量。
2. **产品类型与竞争层级定位** 记录 `product_type`（产品类型）和 `competitive_tier`（竞争层级）——明确你对标的是哪个档次的 DX 标准（比如 Stripe 级别还是一般开源工具级别）。
3. **使用的 persona 模式** 记录 `persona` 字段，表明本次以哪种开发者身份（比如新手、有经验的开发者、特定技术栈用户）来模拟上手过程。
4. **未解决问题列表** 记录 `unresolved`（未解决问题数），这些问题会写入 plan 文件供后续修复。
5. **写入 plan 文件的 GSTACK REVIEW REPORT 节** 和其他 plan review skill 一样，结果会追加到 plan 文件的 `## GSTACK REVIEW REPORT` 段，供 `/ship` 的就绪 dashboard 读取。
6. **持久化 review 日志** 执行结束后，会调用 `gstack-review-log` 把完整元数据写入 `~/.gstack/` 目录，这份数据在后续 `/devex-review`（live 版）运行时会被拿来做 boomerang 对比。

---

**注意事项**

**① 这是 plan 版，不是 live 版**`/plan-devex-review` 只做**纸面推演**，不会真的打开浏览器。要做真实的 live DX 审查，需要在实现完成后跑 `/devex-review`，它会实际执行上手流程并计时，然后和 plan 阶段的分数做 boomerang 对比，找出"计划乐观、现实打脸"的地方。

**② TTHW 目标要在 plan 阶段就确定** TTHW 目标（`tthw_target`）在这一步定下来，后续 `/devex-review` 会拿来验收。常见失分场景是：计划估算时没有考虑 API key 配置步骤、README 文档过时、示例代码依赖项版本不对等隐性摩擦。

**③ competitive_tier 决定打分标准**`competitive_tier` 字段决定了用什么标准来评判 DX 质量，需要在审查中明确设定。对标 Stripe/Vercel 级别和对标普通内部工具，评分尺度完全不同。

**④ 双声部机制（Dual Voices）需要 Codex 可用** Step 0.5 同时运行 Claude 子 Agent 和 Codex，如果 Codex 不可用或超时（超过 10 分钟），会自动降级为只用 Claude 子 Agent，并标记为 `[codex-unavailable]` 继续执行，不会卡住流程。

**⑤ 和 `/autoplan` 结合使用效果最好** 如果你想一次性把 CEO、设计、工程、DX 四个维度都过一遍，直接跑 `/autoplan`，它会自动把 `/plan-devex-review` 串进去，同样覆盖全部 8 个 DX 维度，只是把所有需要人工决策的 taste 问题汇总到最后再集中提问，省去中间来回确认的摩擦。

### 开发类（代码编写）

#### `/design-shotgun` 

`/design-shotgun` 是 gstack 的**视觉设计探索模式**。你描述想要什么，它用 GPT Image API 生成 4-6 个 AI 视觉设计方案，然后在浏览器里打开一个并排对比看板，等待你的反馈。你挑选方向，留下意见（"更多留白"、"标题要更粗"、"去掉渐变"），它生成新一轮，反复迭代直到你满意。

核心理念一句话概括：**设计是品味游戏，一个答案意味着一个视角，你需要看到选项**。`/design-shotgun` 解决的就是"描述了半天，AI 生成的东西和脑子里想的完全不一样"这个经典痛点——改成先看图，再说话。

`/design-shotgun` 使用**并行 Agent 子智能体**同时生成多个方案，这需要 API Tier 2+（15+ RPM）才能稳定运行，而 `/plan-design-review` 里的内联模式则是顺序生成，两者机制不同。

底层依赖 `design/` 目录下的 Design 二进制 CLI（调用 GPT Image API），包含 generate、variants、compare、serve 等子命令。

在 **Think → Plan → Build → Review → Test → Ship → Reflect** 流程里，`/design-shotgun` 归属 **Think → Plan** 阶段的衔接点，具体定位在 `/design-consultation`（建立设计系统）之后、`/design-html`（落地为生产代码）之前：

```Plain Text
/design-consultation  →  /design-shotgun  →  /design-html
（建设计系统）            （视觉探索选型）       （生成可发布HTML）
```

`/design-shotgun` 是探索模式，`/design-html` 把批准的方案变成生产 HTML——这条流水线是"真正的魔法所在"。

---

执行一轮 `/design-shotgun` 后，具体产出如下：

**浏览器对比看板。** 在 `localhost``:PORT` 打开一个对比看板，支持 remix（混搭已有方案）、regenerate（重新生成全部）、approval（确认某个方案）三种操作。

**持久化的设计方案文件。** 点击 Approve 后，被批准的方案保存到 `~/.gstack/projects/myapp/designs/`，并提示下一步运行 `/design-html`。所有设计产物（mockup、对比看板、approved.json）必须存到 `~/.gstack/projects/$SLUG/designs/`，这是用户数据而非项目文件，跨 branch、跨 session、跨 workspace 持久存在。

**累积的品味档案（Taste Profile）。** `gstack-taste-update` 这个独立 CLI 把每次 `/design-shotgun` 的批准和拒绝记录写入持久化的每项目品味档案，并以每周 5% 的速率衰减旧数据，反哺到后续的方案生成，让系统越用越了解你的审美。

**典型完整交互示例：**

用户输入 `/design-shotgun — hero section for a developer tools landing page`，Claude 生成三个方案（Variant A：粗体排版深色背景加代码片段；Variant B：分栏布局左产品截图右文案；Variant C：极简居中标题加渐变点缀），在浏览器打开对比看板，用户点击批准 Variant A，Claude 回复"已批准并保存到 `~/.gstack/projects/myapp/designs/`，下一步运行 `/design-html`"。

---

**使用注意事项**

**依赖 GPT Image API，需要 OpenAI Key。** `design/` 目录下的二进制 CLI 调用的是 OpenAI 的图片生成 API，不是 Claude 本身，使用前需要确保环境变量里配置了有效的 OpenAI API Key，且账户有足够额度，每次生成多个方案会消耗一定费用。

**需要 API Tier 2+（15+ RPM）。** 并行 Agent 子智能体同时出图的机制在 Claude API Tier 2 以上才能稳定跑，Tier 1 账号（低 RPM 限制）可能触发速率限制，导致部分方案生成失败或超时。

**先跑 `/design-consultation` 效果更好。** 如果项目里有 `DESIGN.md`（品牌约束文件），skill 会自动读取并在生成方案时遵守；如果没有，则使用通用设计原则。建议先跑 `/design-consultation` 建立设计系统，再做探索。

**不要用文字描述来启动，要指向具体页面或场景。** 越具体的输入（"游戏账号交易平台的商品列表卡片"）比模糊描述（"好看的卡片"）生成的方案质量和针对性差异极大。也可以直接指向已有页面，让它在当前基础上做变体。

**品味记忆需要几轮才生效。** Taste memory 要在几轮反馈后才开始偏向你实际喜欢的风格，初次使用不要期待它"一次猜中"，迭代 2-3 轮是正常节奏。

**产出是视觉方案，不是代码，别跳步骤。** `/design-shotgun` 产出的是 AI 生成的图片方案，不能直接用。要落地为真实可运行的 HTML/CSS，必须接着跑 `/design-html`。两步不能合并，也不能跳过 Approve 动作直接让 Claude 写代码，因为 `approved.json` 是 `/design-html` 的输入依据。

#### `/design-html` 

`/design-html` 是 mockup 转生产级 HTML 的工具：基于 Pretext 的计算布局引擎，文字真正随窗口 reflow，高度自适应内容，布局动态响应，30KB 体积零依赖，自动检测框架（React/Svelte/Vue）并输出对应格式，输出结果是真正可以发布的代码，不是 demo。

---

`/design-html` 属于 **Design-to-Code（设计落地）阶段**，是整条设计流水线的最后一棒，也是把视觉决策真正变成前端代码的唯一出口。

在 gstack 完整设计流水线中：

```Plain Text
/design-consultation  →  /design-shotgun      →  /design-html   →  进入项目实现
（建立设计系统）          （生成多个 mockup 方案）   （mockup 转 HTML）
                      
                      或者：
                      
/plan-design-review   →  /design-html
（计划阶段设计评审）       （把评审批准的方向转 HTML）
```

`/design-consultation` 完成后，如果产生了页面级的 mockup（而不只是 token 级的设计系统），会主动提示："Want to see this design system as working Pretext-native HTML? Run `/design-html`."

---

**核心技术：Pretext**

`/design-html` 和其他 AI 代码生成工具的根本区别在于使用了 Pretext，一个由 Cheng Lou（前 React 核心成员、Midjourney 前端）开发的布局库。所有其他 AI 工具生成的都是静态 CSS，硬编码高度，resize 时文字溢出，断点生硬跳变，只在某一个特定视口尺寸下看起来正确，其他所有尺寸都会出问题。

Pretext 解决的问题是计算式文本布局：文字真正随 resize reflow，高度自适应内容，布局是动态的，30KB 体积，零依赖。

生成的 HTML 使用 `data-pretext` 属性标记语义，Pretext 在运行时计算布局：

```HTML
<section class="hero" data-pretext="section">
  <h1 class="hero__title" data-pretext="heading">
    Ship faster with AI that thinks before it codes
  </h1>
  <p class="hero__subtitle">23 specialists. 8 power tools.</p>
  <div class="hero__cta-group">
    <a href="/get-started" class="btn btn--primary">Get started free</a>
  </div>
</section>
<style>
  .hero__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.2;
  }
</style>
<script src="https://cdn.gstack.dev/pretext/1.0.0.min.js" data-auto></script>
```

---

**工作流程**

**Step 1：查找设计上下文**

自动查找 `~/.gstack/projects/$SLUG/designs/` 下最新的 `approved.json` 或 mockup 图片（来自 `/design-shotgun` 的 `Approve` 动作）。如果找到已批准的 mockup，直接使用；如果没有，读取 `DESIGN.md` 的设计系统定义从头生成；如果两者都没有，可以从零描述需求开始。

**Step 2：Smart API 路由——按设计类型选 Pretext 模式**

根据检测到的设计类型，选择不同的 Pretext API 模式，避免用同一套模式处理所有场景：

- Landing page / 营销页 → `prepare()` + `layout()` 模式
- Dashboard / 后台管理 → 数据表格 + 侧边栏导航模式
- Form / 表单页 → 输入框 + 验证状态模式
- Card layout / 卡片布局 → 自适应网格模式

**Step 3：框架检测**

自动检测项目里使用的前端框架（React、Svelte、Vue），并输出对应格式——React 输出 JSX 组件，Svelte 输出 `.svelte` 文件，Vue 输出 `<template>` 结构，纯 HTML 项目直接输出 HTML。

**Step 4：启动 live-reload server + 三视口截图验证**

生成完成后在 `localhost:3456` 启动 live-reload 服务，用浏览器打开即可实时预览，修改代码后自动刷新。同时对 375px（手机）、768px（平板）、1440px（桌面）三个视口截图确认布局正确。

**Step 5：对话式迭代**

你可以直接在 chat 里说"把标题做大一点"、"CTA 下面加更多间距"，Claude 直接编辑 HTML 文件，live-reload server 自动刷新，几乎是即时反馈。

**Step 6：确认并归档**

你说 "Done" 之后，文件保存到 `~/.gstack/projects/$SLUG/designs/` 下的带日期目录，作为最终交付物。

---

**产出结果**

**主产物：生产级 HTML/JSX/Svelte/Vue 文件**

根据框架自动选择格式，使用 `clamp()` 实现流体字体，CSS 自定义属性引用 `DESIGN.md` 里的设计 token，Pretext `data-*` 标注所有需要计算布局的元素。

**三视口截图**：375px、768px、1440px 的截图验证，确认各视口下布局正确，不需要手动拖窗口测试。

**持久化归档**：`~/.gstack/projects/$SLUG/designs/<screen-name>-YYYYMMDD/finalized.html`，跨 branch、跨 session、跨 workspace 持久保留。

---

**注意事项**

**最佳触发点：`/design-shotgun` 完成并 Approve 之后**

`/design-shotgun` 的标准结束语是："Next: run `/design-html` to generate production HTML from this mockup."这是最顺畅的衔接方式，因为 `approved.json` 已经写好，`/design-html` 可以直接读取，不需要重新描述方向。

**没有 mockup 也能用，但效果弱一些**

`/design-html` 支持三种输入来源：已批准的 mockup 图片（最佳）、`DESIGN.md` 设计系统（次之）、从零自然语言描述（最弱）。如果跳过了整条设计流水线直接用，质量取决于描述的精确程度。

**Pretext 需要 CDN 或本地引入**

生成的 HTML 默认从 `cdn.gstack.dev` 引入 Pretext，如果你的部署环境无法访问外部 CDN（内网、离线），需要手动把 Pretext 下载到本地并修改 script 路径。30KB 体积，直接 vendor 进项目没有问题。

**框架检测依赖项目结构**

`/design-html` 通过扫描 `package.json`、`.svelte` 文件存在性等特征判断框架。如果是 monorepo 或非标准目录结构，可能检测不准，可以在调用时明确告知："我用的是 React，生成 JSX"。

**对纯后端项目意义有限**

这个 Skill 是纯前端工具。如果你的项目是纯 Spring Boot 后端服务（没有前端 UI），`/design-html` 不适用。它的价值在于有明确视觉界面需要实现的场景——比如游戏账号交易平台的买家搜索页、卖家发布页面等需要精细 UI 的部分。

### 构建类（构建部署）

#### `/ship` 

Ship workflow：检测并合并基础分支、运行测试、审查 diff、更新 VERSION、更新 CHANGELOG、提交、推送、创建 PR。这是 gstack 的**发版工程师**角色，一条命令把代码从"写完了"变成"PR 已经开好了"。

在完整生命周期里，它是最后一个主动生产代码的节点：

```Plain Text
plan → implement → review → QA → ship → land-and-deploy → canary
                                   ↑ 这里
```

**完整执行步骤**

从官方文档和 SKILL.md 中综合，`/ship` 按以下顺序执行：

**Step 1：安全前置检查** 检查当前分支，如果在 base branch 或 repo 默认分支上，立即中止并提示"You're on the base branch. Ship from a feature branch."然后 `git status` 查看未提交变更（始终包含），`git diff` 查看 diff 范围。

**Step 2：展示 Review Readiness Dashboard**

在 ship 之前，会先展示这张就绪仪表盘：

```Plain Text
+====================================================================+
| REVIEW READINESS DASHBOARD                                         |
+====================================================================+
| Review     | Runs | Last Run          | Status  | Required |
|------------|------|-------------------|---------|----------|
| Eng Review |  1   | 2026-03-16 15:00  | CLEAR   | YES      |
| CEO Review |  1   | 2026-03-16 14:30  | CLEAR   | no       |
| Design Rev |  0   |        —          |    —    | no       |
| Adversarial|  0   |        —          |    —    | no       |
+--------------------------------------------------------------------+
| VERDICT: CLEARED — Eng Review passed                               |
+====================================================================+
```

Eng Review 是唯一默认必须 CLEAR 的 gate，CEO 和 Design Review 是参考性展示，不阻塞发布。

**Step 3：同步主干（Sync main）** Fetch origin/main，Rebase 当前 feature 分支，把本地分支更新到最新状态。

**Step 4：运行测试 + 自动修复** 运行全部测试，如果有测试失败会自动尝试修复，然后重跑。测试全部通过后进入下一步。`/ship` 还会 bootstrap 测试框架——如果项目根本没有测试套件，它会从零搭建一个；每次 ship 都产出覆盖率审计报告，100% 测试覆盖是目标。

**Step 5：覆盖率检查** 审计当前覆盖率，对比目标（如 80%），列出低于目标的文件，询问是否要补充测试再继续。

**Step 6：WIP 提交压缩** 通过 `git rebase --autosquash` filter-squash，只压缩带 `WIP:` 前缀的提交（保留非 WIP 的正式提交），确保 PR 里的 commit 是干净的、可 bisect 的。

**Step 7：VERSION 和 CHANGELOG 更新** 自动 bump VERSION 文件，更新 CHANGELOG 条目，提交这些变更。

**Step 8：自动触发 `/document-release`,** `/document-release` 会读取项目里每一个文档文件，对照 diff 交叉引用，更新所有过期内容——README、ARCHITECTURE、CONTRIBUTING、CLAUDE.md、TODOS 全部自动同步，不需要单独执行。

**Step 9：Push + 创建 PR** 推送当前 feature 分支到 origin，创建 PR，输出 PR 标题、目标分支和 Review URL。

**Step 10：Greptile 集成审查（如已配置）** 如果项目接了 Greptile，`/ship` 会读取 Greptile 在 PR 上的 comment，对每条分类处理：有效问题加入 critical findings 在发布前修复；已修复的问题自动回复确认；误报则推送回去说明原因。每一次确认的误报都存入 `~/.gstack/greptile-history.md`，后续自动跳过已知误报模式。

---

**具体产出结果**

综合所有信息，`/ship` 的产出包括以下几类：

1. **干净的 PR** 包含压缩后的 commit 历史（WIP 提交已合并）、自动生成的 PR 描述、明确的目标分支和 Review URL。
2. **更新后的 VERSION 和 CHANGELOG** 自动 bump 版本号，CHANGELOG 新增本次发版条目。
3. **覆盖率审计报告** 每次 ship 都产出覆盖率审计，列出低于目标的文件，可选择在 ship 前补测试。
4. **更新的文档文件** 通过自动触发的 `/document-release`，README、ARCHITECTURE 等文档与代码 diff 保持同步。
5. **Review Readiness Dashboard 快照** 以可视化 ASCII 表形式展示当前 branch 的所有 review 状态，作为本次发版的质量记录。

---

**使用注意事项**

**① 必须在 feature branch 上运行** 在 base branch 或默认分支上运行会被立即中止。始终从 feature branch 发起 ship。

**② Eng Review 是唯一默认阻塞 gate** Eng Review 是唯一默认阻塞发布的 review，覆盖架构、代码质量、测试、性能。如果确实想绕过，可以用 `gstack-config set skip_eng_review true`，但这是"别烦我"设置，生产项目不推荐。

**③ /ship 不等于部署，/land-and-deploy 才是**`/ship` 的终点是**创建 PR**，不会自动合并也不会部署到生产。如果要做完整的合并 + 部署 + 生产验证一条龙，需要另外跑 `/land-and-deploy`。部署完后还可以跑 `/canary` 做部署后监控。

**④ WIP 提交压缩逻辑需了解** 只有带 `WIP:` 前缀的提交会被压缩，非 WIP 的正式提交会原样保留。如果开启了 `checkpoint_mode continuous`，平时的临时提交都带 WIP 前缀，ship 时会整理成干净的 commit 历史。如果是默认的 `explicit` 模式，ship 时做普通提交即可。

**⑤ `/document-release` 会自动触发，留意 diff** 文档更新是自动的，ship 之后记得检查文档变更是否准确，避免 AI 误删或误改了重要说明。

**⑥ Greptile 集成需提前配置** 要让 `/ship` 的两层 review 机制生效（Greptile 异步 + gstack 分类处理），需要先在 GitHub repo 上安装 Greptile，整个过程约 30 秒。安装后就全自动了，每次 ship 都会读取并处理 Greptile 评论。

#### `/setup-deploy` 

`/setup-deploy` 是 `/land-and-deploy` 的一次性前置配置工具：自动检测你的部署平台（Fly.io、Render、Vercel、Netlify、Heroku、GitHub Actions 或自定义），发现生产 URL、health check 端点和部署状态命令，把所有配置写入 `CLAUDE.md`，让后续每次部署都能自动执行。

`/setup-deploy` 属于 **Release 配置阶段**，是整个发布流水线的基础设施准备步骤，只需要跑**一次**，之后在同一个项目里反复使用 `/land-and-deploy` 都不需要再跑。

在整体工作流的位置：

```Plain Text
项目初始化
    ↓
/setup-deploy（一次性，配置好存入 CLAUDE.md）
    ↓
日常开发循环：/ship → /land-and-deploy → /canary → /benchmark
```

对应触发词是"configure deployment for the project"，属于配置类操作，不属于常规发布流程的一环。

---

**工作流程**

**Step 1：平台自动检测**

Skill 会扫描项目特征文件来判断平台，比如发现 `fly.toml` 就识别为 Fly.io，然后自动推断生产 URL、health check 路径和部署命令。

以 Fly.io 为例，识别后自动推断：

```Plain Text
Production URL: https://myapp.fly.dev
Health check: /health → expects 200
Deploy command: fly deploy
Status command: fly status
```

以 Vercel 为例，除了平台识别外还会额外检查：vercel CLI 是否已安装、项目是否已链接（linked）、生产分支是否为 main。

**Step 2：写入配置**

配置写入两个地方：一是项目内的 `.gstack/deploy.yml`，二是 `CLAUDE.md`。

`.gstack/deploy.yml` 的结构如下：

```YAML
platform: vercel          # 平台标识
branch: main              # 生产分支
health_check: /api/health # 健康检查端点
smoke_tests:
  - login
  - dashboard
```

写入 `CLAUDE.md` 的目的是让所有未来的 Claude Code Session 都能自动读取这份部署配置，无需每次重新探测。

---

**产出结果**

**`.gstack/deploy.yml`**：项目级部署配置文件，记录平台、生产分支、health check 路径、smoke test 列表。这是 `/land-and-deploy` 的直接依赖，没有它 land-and-deploy 无法运行。

**`CLAUDE.md` 更新**：在项目的 `CLAUDE.md` 里增加部署配置段，让所有后续 session 自动继承这份配置，无需重新配置。

**运行时输出**：一份部署就绪确认报告，如下形式：

```Plain Text
Detected: Fly.io (fly.toml found)
Production URL: https://myapp.fly.dev
Health check: /health → expects 200
Deploy command: fly deploy
Status command: fly status
Written to CLAUDE.md. Run /land-and-deploy when ready.
```

---

**使用注意事项**

**这是一次性操作，但可以重跑**

`/setup-deploy` 的设计是"每个项目跑一次"。如果你的部署平台发生变化（比如从 Heroku 迁移到 Fly.io），或者生产 URL 改了，重跑一次 `/setup-deploy` 即可更新配置，它会覆盖之前写入 `CLAUDE.md` 的内容。

**平台 CLI 需要提前安装和认证**

`/setup-deploy` 在检测到平台后会验证对应的 CLI 工具是否已安装并完成登录。比如 Vercel 平台要求 `vercel` CLI 已安装且项目已 link，Fly.io 要求 `fly` CLI 已认证。Vercel 场景下会逐项检查 CLI 安装状态、项目 link 状态和生产分支配置，任何一项不满足都会在这一步报错，而不是等到真正 deploy 时才失败。

**自定义平台的处理**

支持的平台列表是 Fly.io、Render、Vercel、Netlify、Heroku、GitHub Actions，以及自定义。如果你的部署方式不在上述平台中（比如自己写了 `deploy.sh`），选择 custom 选项后可以手动指定部署命令、health check URL 等，最终同样写入配置文件。

**smoke_tests 建议手动补充**

自动检测只能推断通用的 smoke test（health 端点、首页 200、login 流程），无法知道你的业务关键路径。`/setup-deploy` 完成后，建议手动编辑 `.gstack/deploy.yml` 补充具体的 smoke test 用例，尤其是对你的 Java 业务系统来说，核心交易流程、账号查询等关键接口都值得加进去，这样 `/land-and-deploy` 部署后的验证才有实际意义。

**配置写入 `CLAUDE.md` 是项目级的**

写入 `CLAUDE.md` 意味着这份配置会被 commit 进仓库，团队成员都能看到并继承。如果生产 URL 或 health check 路径属于敏感信息，需要考虑是否适合直接明文写入版本控制里，必要时可以改用环境变量引用。

**与 `.gstack/config.yml` 的区别**

`.gstack/deploy.yml` 是部署平台配置（platform/URL/smoke tests）；`.gstack/config.yml` 是 CI 超时和 required checks 配置（`ci.timeout`、`ci.required_checks`）。两者都服务于 `/land-and-deploy`，但各管不同层面，需要分开编辑。

#### `/land-and-deploy` 

`/land-and-deploy` 是"merge + deploy + verify 一体化流程"：把已经 review 通过的 PR 合并进主干、等待 CI 跑完、部署到生产环境、验证生产健康状态，一条命令全部搞定。

`/land-and-deploy` 属于 **Release（发布上线）阶段**，是 gstack 完整 Release Pipeline 中的第二棒。

完整的发布链路是：`/ship`（代码审查 → 开 PR）→ `/land-and-deploy`（合并 PR → 部署 → 验证生产）→ `/canary`（部署后监控 30 分钟）→ `/benchmark`（更新性能基线）。

```Plain Text
/ship        →   人工 review PR   →   /land-and-deploy   →   /canary      →   /benchmark
（跑测试/开PR）    （你批准 PR）       （合并/CI/部署/验证）   （部署后监控）   （性能基线）
```

---

**工作流程（四步）**

**Step 1：合并 PR**，squash merge 到 main，产出一个干净的 commit 记录。

**Step 2：等待 CI**，监控 CI 状态，CI 失败则阻断后续步骤，默认超时 15 分钟，可在 `.gstack/config.yml` 中配置所需的检查项（lint/test/build 等）。

**Step 3：部署**，根据检测到的平台自动选择部署命令，支持 Vercel、Netlify、AWS Amplify、Railway、Fly.io，以及自定义的 `.deploy.sh` 脚本。

**Step 4：验证生产**，做健康检查（health check）、冒烟测试（smoke test）和响应时间检测，全部通过才算部署完成。

**前置条件：`/setup-deploy`**

`/land-and-deploy` 依赖部署配置文件，第一次使用前必须先跑 `/setup-deploy`，它会自动检测你的部署平台（Fly.io、Render、Vercel、Netlify、Heroku、GitHub Actions 或自定义），发现生产 URL、health check 端点和部署状态命令，并写入配置。

---

**产出结果**

**运行时输出**

实时展示完整的 4 步进度仪表盘，包括每个 CI check 的 pass/fail 状态、部署 ID、生产 URL，以及健康检查和冒烟测试的结果。

**持久化产物**

`/setup-deploy` 会在项目中生成 `.gstack/deploy.yml`，记录 platform、branch、health_check 路径和 smoke_test 列表：

```YAML
platform: vercel
branch: main
health_check: /api/health
smoke_tests:
  - login
  - dashboard
```

**后续衔接**

部署成功后，Skill 会主动提示运行 `/canary` 进行部署后健康监控。

**与 `/ship` 的分工**

这两个命令经常一起被提到，分工非常清晰：

|  | **/ship** | **/land-and-deploy** |
|-|-|-|
| 职责 | 同步 main → 跑测试 → 审查覆盖率 → push → 开 PR | merge PR → 等 CI → 部署 → 验证生产 |
| 运行时机 | 你写完代码，准备提 PR 时 | PR 已被人工 review 批准后 |
| 是否写生产 | 否 | 是（直接操作生产环境） |
| 后续 Skill | 等待人工 review | /canary 监控 |

---

**使用注意事项**

**必须先跑 `/setup-deploy`**

`/land-and-deploy` 依赖平台配置才能知道用哪个命令部署、往哪个 URL 做健康检查。没有配置文件会直接失败，不要跳过这一步。

**CI 失败会硬阻断**

Step 2 在等待 CI 结果，只要有一个 required check 失败，`/land-and-deploy` 就会停止，不会继续部署。这是有意为之的保护。如果 CI 一直挂起，默认 15 分钟后超时报错，可以在 `.gstack/config.yml` 里调整 `ci.timeout`。

**这是真实生产操作，不可回滚**

`/land-and-deploy` 会真正 squash merge 到 main 并触发生产部署，不是沙盒操作。merge 之后的 git 历史改变是不可逆的，确保 PR 已经过充分 review 再执行。

**Smoke test 覆盖范围有限**

默认的冒烟测试只检查 health 端点、首页 200 状态和关键用户流（如果有 auth 的话检查 login）。这个覆盖范围相对基础，对于复杂业务系统建议在 `/setup-deploy` 配置阶段自定义更完整的 smoke_tests 列表。

**部署后立即接 `/canary`**

`/land-and-deploy` 的职责止于"部署成功且基础健康检查通过"，不做持续监控。生产问题有时有延迟，建议部署完成后立即运行 `/canary` 观察一段时间，而不是部署完就走人。

### 评审类（质量工具）

#### `/devex-review` 

`/devex-review` 是 gstack 的**线上开发者体验实时审计工具**，真实测试你的 onboarding 流程：导航文档、尝试 Getting Started 步骤、实际计时 TTHW（Time to Hello World），对错误截图，并与 `/plan-devex-review` 的规划分数做比对——这个比对被称为"boomerang"，用来揭示你的计划与现实之间的差距。

与 `/design-review`（审计 UI 视觉）、`/qa`（测试功能正确性）不同，`/devex-review` 专门站在**初次接触你的产品的开发者视角**，量化的核心问题只有一个：**一个全新的开发者要多久才能跑通第一个 Hello World？**

---

在 **Think → Plan → Build → Review → Test → Ship → Reflect** 流程里，`/devex-review` 属于 **Review（审查）** 阶段，具体定位是 Build 之后、Ship 之前，且专门针对面向开发者的产品（API、CLI、SDK、文档站）：

```Plain Text
/plan-devex-review    →    [Build]    →    /devex-review    →    /ship
（计划阶段DX规划）               （实现）      （线上DX实测/boomerang对比）   （发布）
```

gstack 的路由规则里明确写着：当用户说"developer experience audit，try onboarding"时，调用 `/devex-review`。

根据 gstack 的审查选择矩阵：

| **产品面向** | **计划阶段** | **上线后** |
|-|-|-|
| 终端用户（UI/Web） | /plan-design-review | /design-review |
| **开发者（API/CLI/SDK/文档）** | /plan-devex-review | **/devex-review** |
| 架构/性能 | /plan-eng-review | /review |

---

**核心量化指标。** `/devex-review` 完成后，会写入 JSONL 格式的审计记录，包含这些字段：`status`（状态）、`overall_score`（总分）、`product_type`（产品类型）、`tthw_measured`（实测 TTHW）、`dimensions_tested`（实测维度数）、`dimensions_inferred`（推断维度数）、`boomerang`（与计划比对结果）、`commit`（关联 commit）。

**Boomerang 对比报告。** 这是 `/devex-review` 最独特的产出。输出一个 DEVEX BOOMERANG COMPARISON 表，列出每个评估维度的计划分 vs 实测分以及差值，比如 TTHW 目标 5 分钟 vs 实际 6 分钟（+1m，超标），可读性 8/10 vs 7/10（-1），API 文档 9/10 vs 9/10（持平），并给出整体建议。

**截图证据。** 用真实浏览器执行 onboarding 流程，对关键步骤和遇到的错误截图留存，提供可视化的摩擦点证据。

**修复 commit（如适用）。** 审计过程中发现可直接修复的问题（如文档过时、README 与当前 API 不符），会产生修复提交。

`/devex-review` 是 `/plan-devex-review` 的"现实校验器"。两者形成一个闭环：

`/plan-devex-review` 在构建前对计划进行 DX 审查，提出 TTHW 目标和维度评分；`/devex-review` 在构建后对线上版本做实测，生成 boomerang 报告，量化"计划与现实的偏差"。常见的 boomerang 发现包括：计划过于乐观、实现阶段引入了更多步骤、文档与实际 API 不同步。

---

**注意事项**

**适用对象是开发者产品，不是终端用户产品。** `/devex-review` 站的是"初次集成的开发者"视角，评估维度是文档清晰度、Getting Started 步骤数、错误信息质量、升级路径等。如果你的产品是面向普通用户的 Web 应用，应该用 `/design-review`（视觉/UX）和 `/qa`（功能），而不是 `/devex-review`。

**先跑 `/plan-devex-review` 才能看到 boomerang。** Boomerang 对比的前提是有一份计划阶段的 DX 分数作为基准。如果没有跑过 `/plan-devex-review`，`/devex-review` 仍然可以单独运行并给出实测分，但 boomerang 对比部分会缺失或只能推断。

**需要真实可访问的线上地址。** 它是"live developer experience audit"，需要能实际导航的页面。如果只是本地开发环境或者 staging 没有公开，需要先确保 Claude 的浏览器能访问到目标地址（本地环境配合 ngrok 或者直接用 staging URL）。

**与 `/design-review` 顺序搭配效果最佳。** 推荐的审查顺序是先跑 `/design-review`（UI/UX），再跑 `/devex-review`（DX/文档），然后 `/qa`（功能测试），最后 `/ship`。三个视角各自独立，顺序不强制但有助于逐层缩小问题范围。

**实测 TTHW 是核心指标，要认真对待。** TTHW 如果超出计划目标，是需要在 Ship 之前修复的硬指标，不是软建议。一分钟的 TTHW 差距在 onboarding 漏斗里的影响可能是显著的，特别是开发者工具类产品对 TTHW 的敏感度远高于一般应用。

#### `/review` 

这是一个 **Pre-landing PR review** 工具，扮演 Staff Engineer 角色——针对 base branch 的 diff 分析 SQL 安全、LLM 信任边界违规、条件副作用以及其他结构性问题。

它专门寻找那种**能通过 CI 但会在生产炸掉**的 bug：竞争条件、缺失的错误处理、N+1 查询、安全漏洞、对数据结构的错误假设。这是 gstack 工具链中最接近"老手代码审查"的 skill，不是 linter，不是类型检查，是真正的工程判断。

位于 **review（审查）阶段**，在实现完成之后、`/ship` 创建 PR 之前运行。完整链路：

```Plain Text
plan → implement → QA → review → ship → land-and-deploy
                          ↑ 这里
```

它也嵌入在 `/ship` 内部——`/ship` 在 Step 3.5 会自动跑一次内嵌版 review，应用同一份 checklist.md，每个 finding 分类为 AUTO-FIX 或 ASK。如果有 fix 被应用，`/ship` 提交后停下来，让用户再次运行 `/ship` 以重新测试修复后的代码。

---

**核心机制：两遍检查**

`/review` 的执行流程非常清晰：先读 checklist.md，再拿 `git diff origin/main` 的全量 diff，然后做两遍分析：

**Pass 1（CRITICAL）**：SQL & Data Safety、Race Conditions & Concurrency、LLM Output Trust Boundary、Shell Injection、Enum & Value Completeness

**Pass 2（INFORMATIONAL）**：Async/Sync Mixing、Column/Field Name Safety、LLM Prompt Issues、Type Coercion、View/Frontend、Time Window Safety、Completeness Gaps、Distribution & CI/CD

Pass 1 中的 CRITICAL 类别和 Pass 2 的 INFORMATIONAL 类别分别对应不同的处理优先级，CRITICAL 问题要求明确决策，INFORMATIONAL 问题直接输出提示。

其中有一个特别值得注意的规则：**Enum & Value Completeness 需要读 diff 之外的代码**——当 diff 引入了新的 enum 值、状态常量或类型常量时，必须用 Grep 找出所有引用了兄弟值的文件，然后 Read 那些文件检查新值是否有被处理。这是唯一一个仅靠 diff 内部审查不够的类别。

**Finding 的处理策略**

处理规则分两种路径：

如果找到 **CRITICAL 问题**：输出全部 findings，然后**每个 critical 问题单独一个 AskUserQuestion**，展示问题描述 + 推荐修复方案 + 三个选项（A: Fix it now / B: Acknowledge / C: False positive — skip）。用户全部确认后输出选择摘要，如果有人选了 A 则自动应用修复。

如果只有 **非 critical 问题**：直接输出 findings，不需要用户操作。

如果 **没有问题**：输出 `Pre-Landing Review: No issues found.`

明显的机械性修复（死代码、过时注释、N+1 查询）会直接自动修复，输出 `[AUTO-FIXED] file:line Problem → what was done`。真正有歧义的问题（安全问题、竞争条件、设计决策）才交给用户判断。

**跨会话学习机制**

在正式跑 review 之前，它会搜索历史 session 中积累的 learnings，如果某个 finding 匹配了历史 learning，会显示 `"Prior learning applied: [key] (confidence N/10, from [date])"`——这让 gstack 越用越聪明，对你的 codebase 判断越来越精准。

学习范围还可以配置：可以开启跨项目 learnings（`gstack-config set cross_project_learnings true`），让多个项目间的经验互通；如果有多客户端代码库需要隔离，也可以保持项目范围内。

**Greptile 集成**

如果项目已配置 Greptile，`/review` 在 Step 2.5 会拉取 Greptile 在 PR 上的评论，分四类处理：

- **VALID & ACTIONABLE**：并入 CRITICAL findings，走同样的 AskUserQuestion 流程
- **VALID BUT ALREADY FIXED**：自动回复 "Good catch — already fixed in `<commit-sha>`"
- **FALSE POSITIVE**：询问用户是否回复 Greptile 说明原因（推荐），或直接修复，或忽略
- **SUPPRESSED**：已知误报，静默跳过

每次确认的误报都存入 `~/.gstack/greptile-history.md`，后续自动跳过，`/retro` 还会追踪 Greptile 的信噪比趋势。

---

**具体产出结果**

1. **分级 findings 报告** CRITICAL 和 INFORMATIONAL 两段式输出，每条 finding 包含文件路径、行号、问题描述和推荐修复方案。格式始终是一行问题、一行修复，没有废话。
2. **自动应用的修复提交** 所有 AUTO-FIX 类问题直接修改文件并输出修改记录，不需要用户确认。
3. **用户决策记录** 每个 CRITICAL 问题的用户选择（Fix / Acknowledge / False positive）都有明确的会话内记录和摘要。
4. **Greptile 回复（如适用）** 对 FALSE POSITIVE 或 ALREADY FIXED 的 Greptile 评论自动发送回复，保持 PR 评论干净。
5. **写入 review 日志** review 结果写入 `~/.gstack/` 的 JSONL 日志，供 `/ship` 的 Review Readiness Dashboard 读取，记录本次 review 的状态和 findings 数量。

---

**使用注意事项**

**① 必须在 feature branch 上运行** 在 main 分支上运行，或者当前 branch 与 origin/main 没有 diff，会立即停止并输出提示，不做任何分析。

**② checklist.md 是必要依赖** 如果 `.claude/skills/review/checklist.md` 读取失败，整个 skill 会 STOP 并报错，不会继续执行。checklist 不可缺失。

**③ 它是只读的，除非你选 Fix**`/review` 默认只读模式，只有用户明确选择 "Fix it now" 才会修改文件，绝不会自作主张提交或推送。

**④ Enum 检查需要跨文件读代码** Enum & Value Completeness 这一类的检查不局限于 diff，会主动 Grep + Read 项目中引用同类值的所有文件，确保没有 switch 漏掉新的 enum 值。这是最容易在 AI 生成代码中出现的漏网问题之一，也是 `/review` 比普通 diff review 更有价值的地方。

**⑤ /review 和 /ship 内嵌 review 的关系**`/review` 是独立手动运行的完整版，`/ship` 在 Step 3.5 内嵌了相同 checklist 的简化版 review。两者共享同一套判断标准，但 `/review` 有更完整的交互流程（包括跨会话 learnings 搜索、完整 Greptile 集成），单独运行 `/review` 的深度高于 `/ship` 内嵌的检查。

**⑥ 不要用它找 linting 或格式问题**`/review` 的设计目标明确：不能对变量命名或格式问题 nitpick，这些应该由 CI linter 处理。它的价值在于**找到 CI 通不过但测试也发现不了的结构性问题**。如果只是想检查代码风格，直接跑项目的 lint 工具就够了。

#### `/design-review` 

`/design-review` 是对线上站点做视觉审查的"眼睛"：跑完 80 条审查项，然后自动修复所发现的问题，每个修复各自原子提交，并带有修复前后的截图作为证据。它的角色是"有强烈主见的高级产品设计师 + 前端工程师"，不仅找问题，还真正改代码。

---

`/design-review` 属于 **实现后视觉 QA 阶段**，是代码写完、UI 已经在跑之后的视觉层质量关卡。

在 gstack 完整链路里的位置：

```Plain Text
/design-consultation（建设计系统，写 DESIGN.md）
    ↓
/plan-design-review（计划阶段设计评审，改计划文档）
    ↓
实现代码
    ↓
/design-review（线上站点视觉审查 + 修复，改源码）← 你在这里
    ↓
/ship → /land-and-deploy
```

与 `/plan-design-review` 的本质区别：

|  | **/plan-design-review** | **/design-review** |
|-|-|-|
| 运行时机 | 写代码之前，计划阶段 | 写代码之后，站点已运行 |
| 操作对象 | 计划文档（Markdown 文件） | 线上站点（真实 Chromium 截图）+ 源码 |
| 是否修改代码 | 否，只改计划文档 | 是，直接修改前端源码并提交 |

---

**工作流程**

**Step 0：读取上下文**

启动时会在 `~/.gstack/projects/$SLUG/designs/design-audit-YYYYMMDD/` 下创建报告目录，并搜索跨 session 的历史学习记录（从 `/design-consultation` 生成的 `DESIGN.md`、`/office-hours` 产出的设计文档、以及 `/plan-design-review` 之前的审查记录），让这次审查了解项目的视觉基线。

**Step 1：选择审查模式**

三种深度可选：

**Quick**（快速）：只审查首页 + 2 个关键页面，优先处理 First Impression + 设计系统提取 + 缩略检查清单，最快得到设计评分。

**Standard**（标准）：访问从首页可达的 5-8 个页面，完整检查清单评估、响应式截图、交互流程测试，输出完整设计审查报告含字母评级。

**Exhaustive**（详尽）：10-15 个页面，每个交互流程，完整检查清单，适合发布前审查或重大重设计。

另外，当在 feature branch 上时，`/design-review` 会自动进入 diff-aware 模式：分析 `git diff main...HEAD --name-only` 把审查范围收缩到 branch 变动影响的页面。还支持 regression 模式：运行完整审查后加载之前的 `design-baseline.json`，输出每类别的评级变化对比表。

**Step 2：80 条审查项逐条执行**

审查项覆盖：视觉层级（H1/H2/H3 大小一致性、有无焦点区域）、AI Slop 检测（3 列图标网格、居中堆叠、Hero + 渐变、无意义宣传语）、字体排印（字型阶梯是否合理、字体是否只用 system-ui）、间距与对齐、响应式布局、交互状态（hover/focus/disabled）、无障碍访问（触摸目标≥44px、reduced-motion、色彩对比度）、导航结构、以及整体信任感。

移动端特别说明：所有审查项在移动端同等适用，甚至更严格——触摸目标必须足够大（44px 最小），扁平化设计不能以牺牲可用性换取空间节省。

**Step 3：找到问题立即修复，原子提交**

审查发现的每个问题都直接在源码里修复，一个问题一次原子提交，然后截图再次验证修复效果，形成完整的 before/after 证据链。

---

**产出结果**

**完整示例输出：**

审查完成后的格式如下：`Design Score: C → B+ | AI Slop Score: D → A`，9 个修复（8 个已验证，1 个 best-effort），3 个 deferred（暂缓处理），报告和 before/after 截图保存到 `~/.gstack/projects/` 下。

**Git 提交记录**：每个修复对应一条原子 commit，格式为 `style(design): FINDING-NNN — <具体说明>`，可读性高，便于 git bisect 和 code review。

**截图存档**，组织结构如下：

```Plain Text
~/.gstack/projects/$SLUG/designs/design-audit-YYYYMMDD/
└── screenshots/
    ├── before-01-visual-hierarchy.png
    ├── after-01-visual-hierarchy.png
    ├── before-02-ai-slop.png
    ├── after-02-ai-slop.png
    └── diff-report.md
```

**字母评级**：按页面/维度分别给出字母评级（A-F），并附具体问题说明，可直接交给团队。

---

**使用注意事项**

**前置条件：应用必须在运行**

`/design-review` 用真实 Chromium 访问页面截图，需要应用处于运行状态（本地 dev server、Staging URL 或生产 URL 均可）。运行前确认 dev server 已启动，或直接传入远程 URL。

**需要 browse 二进制**

与 `/qa` 系列一样，首次运行会检测 browse 二进制是否存在，如果没有会提示一次性构建（约 10 秒）。

**登录后页面需要先导入 Cookie**

当 browse server 连接到真实浏览器（CDP 模式）时，`/qa` 和 `/design-review` 会自动跳过 cookie 导入提示和无头模式的 workaround。如果在无头模式下需要审查登录后的页面，先跑 `/setup-browser-cookies`。

**AI Slop 检测是强硬主见**

`/design-review` 内置了明确的 AI Slop 黑名单，包括：把 `system-ui` 或 `-apple-system` 作为主显示字体（"我放弃排印了"的信号）；"卡片配图标"这种没有差异化的 SaaS 模板布局；"clean, modern UI"这类毫无意义的描述；以及"Dashboard with widgets"这种千篇一律的仪表盘。如果你的 UI 有这些特征，它会直接修改代码，确保你在运行前对这个取向是认可的。

**会修改源码，不可逆**

`/design-review` 不是只读工具——它会真实修改你的 CSS、HTML、JSX 等前端源文件，并生成 git commit。这和 `/qa-only` 的纯报告模式完全相反。如果你只想要报告不想让它改代码，需要明确告知，或者考虑用 `/plan-design-review` 的只读评审模式。

**与 `/qa` 的分工**

`/qa` 测试的是功能性（表单能提交吗、页面能加载吗、控制台有没有报错），`/design-review` 测试的是视觉质量（这个页面看起来有没有设计感、是否像 AI 生成的模板）。两者互补，不互斥，完整的发布前检查建议都跑一遍。

#### `/codex` 

`/codex` 是 OpenAI Codex CLI 的包装器，提供三种模式：代码 Review（pass/fail 门控）、对抗性 Challenge（主动尝试破坏你的代码）、开放式 Consult（带 Session 连续性的问答）。本质是 gstack 内置的"200 IQ 自闭症开发者"第二意见机制。

`/codex` 属于 **Review（代码审查）阶段**，横跨多个时机，本质是一个可以随时召唤的跨模型独立审查员。

在 gstack 工作流里，它有两种存在形式：

**作为独立命令**（用户主动调用）：

```Plain Text
/autoplan  →  实现代码  →  /review（Claude 审查）  →  /codex（OpenAI 第二意见）  →  /ship
```

**作为自动内嵌机制**：

Adversarial Review 是 Always-On 的，每次 diff 都会同时触发 Claude 对抗性 subagent 和 Codex 对抗性 Challenge。超过 200 行的大 diff 还会额外触发 Codex 结构化 Review 并设置 P1 门控，无需任何配置。

**三种模式详解**

> **Review 模式**：pass/fail 结论 + 问题列表，含文件名、行号、具体问题描述。
> 
> **Challenge 模式**：对抗性发现报告，分类为 FIXABLE（有明确修复方案）或 INVESTIGATE（需人工判断）。
> 
> **Consult 模式**： 完整的 verbatim Codex 输出（含思考链），token 用量和预估成本，以及保存的 session 供后续追问使用。

**模式一：Review（代码审查）**

通过 `codex review` 命令对当前分支的 diff 做独立审查，输出 pass/fail 结论。推荐在 `/review`（Claude）已经跑完之后紧接着跑，形成双模型交叉验证。

Review 模式的默认推理强度是 `high`，因为输入是有边界的 diff，需要彻底审查。支持附加自定义指令，例如 `/codex review focus on security`，自定义内容会拼接在边界指令之后传给 Codex。

**模式二：Challenge（对抗性挑战）**

Challenge 是对抗模式：Codex 主动尝试破坏你的代码，寻找边界 case、竞态条件、安全漏洞，以及在高负载下会崩溃的假设前提。可以把它想象成针对你的逻辑做一次渗透测试。

Challenge 模式同样默认使用 `high` 推理强度，受限于 diff 边界。

**模式三：Consult（开放咨询）**

Consult 是带 Session 连续性的开放对话：你可以问 Codex 任何关于代码库的问题，后续追问会复用同一个 session，上下文自动延续。适合"我的思路对不对？"这类需要深度技术讨论的场景。

Consult 模式输出格式是带分隔线的完整 verbatim 内容（包含 `[codex thinking]` 的推理过程），并在末尾显示 token 用量和预估费用，保存 session 后可继续对话。Consult 默认推理强度降为 `medium`，因为上下文大、需要响应速度。

当 `/review`（Claude）和 `/codex`（OpenAI）都对同一个分支跑过之后，你会得到一份跨模型对比分析：哪些发现两者重叠（高置信度问题），哪些是 Codex 独有的（不同视角），哪些是 Claude 独有的。这是"两个医生，同一个病人"的代码审查方式。

---

**使用注意事项**

**前置条件：安装 Codex CLI**

运行前会检测 `codex` 命令是否存在，找不到就直接停止并提示：`npm install -g @openai/codex`。此外还会验证 Codex 是否有有效 auth，以及已安装的 CLI 版本是否在已知问题版本列表内。

**账号隔离风险（与 `/autoplan` 同款问题）**

和之前讲 `/autoplan` 时提到的一样，`/codex` 会静默使用 `~/.codex/` 下当前登录的账号，多账号用户（个人账号 vs 公司账号）需要注意，可能会用错账号或产生非预期账单。

**`--xhigh` 的代价**

`--xhigh` 推理强度比 `high` 消耗约 23 倍的 token，而且在大上下文任务中已知会导致 50 分钟以上的卡顿（OpenAI 已知问题）。除非真的需要极致深度，否则不建议日常使用 `--xhigh`。

**Codex 的输出要原文呈现**

Skill 规定 Codex 的输出必须原文（verbatim）呈现，不能总结或截断。Claude 在展示后会标注自己与 Codex 的分歧点，格式是："Note: Claude Code disagrees on X because Y。"这意味着 `/codex` 的输出内容可能比较长，需要准备好上下文空间。

**Filesystem Boundary 隔离**

所有传给 Codex 的 prompt 都必须以边界指令开头，禁止 Codex 读取或执行 `~/.claude/`、`.claude/skills/`、`agents/` 等路径下的 Skill 定义文件，防止两个 AI 系统的指令集相互干扰。这是为了保证 Codex 只看仓库代码，给出独立判断。

**Consult 模式的 Session 管理**

Consult 模式支持 session 连续性，但每次跑 `/codex` 时如果检测到已有活跃 session，会询问是继续还是开新的。如果你想要真正独立的新一轮分析，记得选择开新 session，否则上一轮的上下文会影响 Codex 的判断。

**与 `/review` 的分工**

|  | **/review** | **/codex** |
|-|-|-|
| 引擎 | Claude | OpenAI Codex CLI |
| 视角 | gstack 工程判断风格 | 独立的"200 IQ 自闭症开发者"风格 |
| 是否自动跑 | /ship 流程中自动触发 | 需要手动调用（或 /autoplan 内嵌） |
| 核心价值 | 主力代码审查 | 第二意见，跨模型交叉验证 |

#### `/investigate` 

系统性调试工具，扮演专职 debugger 角色。四个阶段：investigate（调查）、analyze（分析）、hypothesize（假设）、implement（实现）。铁律：没有根本原因就不动手修复。触发词包括"debug this"、"fix this bug"、"why is this broken"、"investigate this error"、"root cause analysis"。

它不是乱试补丁，而是追踪数据流、匹配已知 bug 模式、逐一验证假设。如果三次修复尝试都失败，它会停下来质疑架构本身，而不是继续盲目挣扎。这防止了那种"再试一个"的死循环，那种循环往往能浪费好几个小时。

`/investigate` 是**贯穿整个生命周期的横切 skill**，不属于某个固定阶段。它在任何阶段遇到 bug 都可以触发：

```Plain Text
plan → implement → QA → review → ship → canary
          ↑          ↑              ↑
       开发中      测试发现        生产报警
       遇到bug     bug时          时都可用
```

触发时机包括：用户报告错误、500 错误、stack traces、意外行为、"昨天还能跑"、或者在排查某个东西为什么停止工作。gstack 会主动建议调用它，而不是让 Claude 直接开始胡乱调试。

---

**核心机制：Iron Law**

**没有根本原因调查就不修复**（NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST）。修复症状会制造打地鼠式调试——每一次不触及根本原因的修复，都让下一个 bug 更难找。先找到根本原因，再动手修复。

四个阶段的完整流程：

**Phase 1 — Investigate（调查）**：在形成任何假设之前，先广泛收集上下文。读取错误信息、stack trace 和复现步骤，追踪数据流经过每个组件边界，在进入深挖之前先确定问题发生在哪一层。

**Phase 2 — Analyze（分析）**：对收集到的症状进行分析，匹配已知的 bug 模式，缩小可能的根因范围。

**Phase 3 — Hypothesize（假设）**：提出具体的、可验证的假设。每次只测试一个假设，不批量验证。

**Phase 4 — Implement（实现）**：根本原因确认后才动手修复。

---

**自动 Freeze 机制**

这是 `/investigate` 最有特色的安全特性：

`/investigate` 会自动检测正在调试的模块，并自动将文件编辑范围冻结到那个目录，防止 Claude 在调试时"顺手修了"不相关的代码。

效果如下：调试 `src/billing` 时，如果 Claude 试图编辑 `src/auth/middleware.ts`，会被阻止并提示 `BLOCKED — Edit outside freeze boundary (src/billing/)`. 注意这只阻止 Edit 和 Write 工具，bash 命令里的 `sed` 之类仍可修改边界外的文件——这是事故防护，不是安全沙箱。

调试结束后可以用 `/unfreeze` 解除边界，或者用 `/guard`（`/careful` + `/freeze` 的组合）在触碰生产系统时获得最大安全级别。

**3次失败后停止的设计**

如果三次修复尝试都失败，`/investigate` 会停下来，转而质疑架构本身是否存在问题，而不是继续挣扎。这个设计明确防止了"再试一个"的无效循环。

这是区别于普通 AI 调试行为的关键：AI 默认会不断尝试，而 `/investigate` 有明确的退出机制——三次不行，就说明当前方向有问题，需要重新评估。

---

**具体产出结果**

1. **根本原因分析报告** 以具体的文件路径、函数名、行号指出真正的根因，而不是模糊的方向描述。明确区分"表象症状"和"根本原因"。
2. **修复代码** 确认根因之后的精准修复，修改范围严格限于被 freeze 的模块目录，避免连带变更。
3. **假设验证记录** 哪些假设被验证、哪些被排除，形成清晰的调试路径记录。如果开启了 `checkpoint_mode continuous`，每个逻辑单元完成后会自动提交 WIP commit，commit body 里包含 `[gstack-context]` 块，记录决策、剩余工作以及失败的尝试路径——这个记录在下次 `/context-restore` 时可以直接恢复调试状态。
4. **架构问题上报（三次失败时）** 如果三次修复尝试均告失败，会明确输出"这不是可以补丁修复的 bug，而是架构层面的问题"，并描述需要重新审视的架构假设，建议后续跑 `/plan-eng-review` 重新审查设计。

---

**使用注意事项**

**① 绝对不要跳过调查阶段** 铁律是明文写在 SKILL.md 里的强制要求，不是建议。看到报错就直接猜测并修复是这个 skill 明确要阻止的行为模式。如果你绕过调查阶段直接告诉它"帮我改第47行"，相当于放弃了这个 skill 的核心价值。

**② 与 `/review` 和 `/qa` 的分工要清晰** 三个 skill 针对不同问题：`/review` 是合并前发现潜在 bug；`/qa` 是测试功能是否正常工作；`/investigate` 是"已经出错了，找出为什么"。遇到 bug、错误、500、stack trace、"昨天还好好的"，用 `/investigate`；想测试功能，用 `/qa`。

**③ 调试生产系统时加上 `/guard`** 虽然 `/investigate` 自动 freeze 调试模块，但调试生产系统时建议同时启用 `/guard`（`/careful` + `/freeze` 的组合），获得完整的危险命令拦截 + 目录范围限制。

**④ 三次失败是信号，不是失败** 三次修复尝试失败后 `/investigate` 主动停下来，这不是 skill 的缺陷，而是设计。它停下来的意义是：问题可能根植于架构，继续打补丁只会越陷越深。此时应该跑 `/plan-eng-review` 重新审视架构，而不是强行继续 debug。

**⑤ 主动触发 vs 被动触发** gstack 在 proactive 模式下，当它感知到你遇到 bug 时会主动建议运行 `/investigate`。如果你不想被打扰，可以 `gstack-config set proactive false`，之后只响应你显式调用的 skill。

### 测试类（验证工具）

#### `/qa` 

系统性 QA 测试 web 应用并自动修复发现的 bug。运行 QA 测试，然后迭代式地修复源码中的 bug，每个修复都是原子提交，并重新验证。三个深度档：Quick（只处理 critical/high 问题）、Standard（再加 medium）、Exhaustive（再加 cosmetic）。产出 before/after 健康分数、修复证据和发布就绪摘要。如果只需要报告不需要改代码，用 `/qa-only`。

这是 gstack 的旗舰 skill——它打开真实的 Chromium 浏览器，像真实用户一样导航你的应用，发现 bug，修复源码，然后重新验证修复结果，并为每个修复自动生成回归测试。

位于 **QA 阶段**，在实现完成之后、`/ship` 创建 PR 之前运行：

```Plain Text
plan → implement → review → QA → ship → land-and-deploy → canary
                              ↑ 这里
```

它和 `/review` 的分工非常清晰：`/review` 做代码层面的静态分析，查找能通过 CI 但会在生产炸掉的结构性问题；`/qa` 做真实的运行时浏览器测试，验证实际的用户交互路径。

---

**四种测试模式**

模式自动根据上下文选择，也可以手动指定：

**Diff-aware（默认）**：在 feature branch 上自动激活，读取 git diff，识别变更影响的页面和路由，只测试那些页面。这是最常见的使用场景——刚写完 feature branch 上的代码，想验证改动有没有破坏任何东西，直接跑 `/qa` 即可，不需要提供 URL，不需要手动测试计划。

**Full exploration（完整探索）**：系统性访问每一个可达页面，记录 5-10 个有充分证据的问题，生成健康分数，耗时 5-15 分钟，取决于应用体量。

**Quick smoke test（快速冒烟）**：30 秒内完成，访问首页 + 前 5 个导航目标，检查页面能否加载、有无 console error、有无断链，生成健康分数，但不做详细问题记录。

**Regression baseline（回归基线对比）**：运行完整模式，然后加载上次运行保存的 baseline.json，对比哪些问题被修复了、哪些是新出现的、分数变化了多少，并在报告末尾追加回归章节。

**核心执行机制：find → fix → verify 循环**

它同时扮演 **QA 工程师**和 **bug 修复工程师**两个角色——像真实用户一样测试 web 应用，点击一切可点的地方，填写每一个表单，检查每种状态；发现 bug 后直接修改源码，每个修复一个原子提交，然后重新验证。

每次修复的流程是：

- 浏览器截图记录 before 状态
- 修改源码
- 提交（`fix: QA-NNN — 简短描述`）
- 重新导航到受影响页面截图验证 after 状态

不管处于哪种测试模式，它都会使用 `/browse` 的 Chromium 引擎：这个浏览器引擎运行在编译好的 Bun binary 上，连接到持久化的 Chromium 进程，每条命令约 100ms 延迟（无需重启浏览器），session 内状态完整保留（cookies、标签页、登录状态）。

**与 `/plan-eng-review` 测试计划的串联**

当 `/plan-eng-review` 完成测试审查章节后，会把测试计划 artifact 写入 `~/.gstack/projects/`。后续运行 `/qa` 时，它会自动读取这份测试计划——工程 review 的产出直接喂给 QA 执行，无需手动复制粘贴。

这个串联意味着：如果前期认真跑了 `/plan-eng-review`，`/qa` 执行时的测试覆盖范围会精准对应当初设计时识别的所有测试场景，而不是凭感觉随机测试。

---

**具体产出结果**

- **健康分数（0-100）** 基于测试的页面数量、发现的 bug 数量、修复的 bug 数量以及 diff 覆盖率综合计算，以 before/after 形式展示分数变化。
- **有证据支撑的 bug 报告** 每个 bug 包含页面路径、问题描述、复现步骤、截图证据（before 和 after），以及严重程度分级（critical / high / medium / cosmetic）。
- **原子修复提交** 每个 `/qa` bug 修复都生成一个独立的原子提交，包含 before/after 截图作为证据，不同 bug 的修复不会混在一起。
- **自动生成的回归测试** 每次 `/qa` bug 修复都会自动生成对应的回归测试，确保同样的 bug 不会在未来重新出现。100% 测试覆盖是 gstack 的目标——测试让 vibe coding 变得安全而不是鲁莽。
- **发布就绪摘要（Ship-readiness summary）** 测试结束后生成一份整体结论，包括测试覆盖范围、已修复问题数、待处理问题数、以及是否满足发布条件的明确判断。
- **Regression 对比报告（回归模式下）** 在回归模式下，加载上次 baseline.json，输出哪些问题被修复、哪些是新问题、分数增减了多少的差异报告。

---

**使用注意事项**

**① diff-aware 模式不需要提供 URL** 如果不提供 URL 且处于 feature branch，会自动进入 diff-aware 模式，读取 git diff 决定要测试哪些页面。如果提供了 URL 但仍在 feature branch，则用那个 URL 作为基础，但仍把测试范围限定在变更文件对应的功能区域。

**② 需要认证的页面用 `/setup-browser-cookies` 提前准备** 测试需要登录的页面时，可以用 `/setup-browser-cookies` 从真实浏览器（Chrome、Arc、Brave、Edge）导入 cookies，避免每次都手动登录。如果检测到浏览器处于 CDP 模式（已连接到真实浏览器），会自动跳过 cookie 导入提示，因为真实浏览器里已经有 cookies 了。

如果遇到 2FA/OTP，它会暂停等待用户输入验证码，不会跳过。

③ `/qa` 和 `/qa-only` 的选择

`/qa-only` 使用与 `/qa` 完全相同的测试方法，但只产出报告，绝不改代码。当你想要一份干净的 bug 报告交给团队，或者审计别人的分支，或者只是想知道质量基线而不希望 AI 动代码时，用 `/qa-only`。

**④ 深度档的选择影响时间成本** Quick 约 30 秒，Standard 几分钟，Exhaustive（覆盖所有交互路径、无障碍、响应式、性能）时间更长。日常 feature branch 验证用 Standard，正式发布前或关键路径改动后用 Exhaustive。

**⑤ 它会直接修改代码并提交** 这是和 `/qa-only` 最核心的区别。`/qa` 不只是报告，它会真正修改你的源代码并产生提交。每次运行前要确保工作区是干净的，或者开启了 checkpoint 模式，避免意外覆盖未提交的工作。

**⑥ 测试覆盖和回归测试会被 `/ship` 审计**`/ship` 每次运行都会产出覆盖率审计报告，而 `/qa` 每次修复 bug 都会生成回归测试。这两个机制配合形成了完整的质量闭环：`/qa` 保证当前功能正确，回归测试保证未来不会退化，`/ship` 的覆盖率审计确保整体测试基线。

#### `/qa-only` 

`/qa-only` 是纯报告模式的 QA 测试：系统性地测试 Web 应用，输出包含健康分、截图和复现步骤的结构化报告，但**绝不修复任何问题、不改动任何代码**。适合"只要 bug 报告"的场景。

`/qa-only` 属于 **QA（质量保障）阶段**，是 `/qa` 的只读分身，两者使用相同的测试方法论，唯一的区别是 `/qa-only` 在测试结束后交出报告就停手，不进入修复循环。

在工作流中的典型位置有两处：

```Plain Text
（场景一：代码审查前的现状快照）
/autoplan → 实现代码 → /qa-only（了解当前状态）→ 人工决定修复方向 → /qa（修复）→ /ship

（场景二：生产/Staging 环境巡检）
/land-and-deploy → /qa-only（对生产做只读检查，不动代码）→ /canary
```

**工作流程**

**Step 1：环境准备**

Skill 启动后先检测 gstack browse 二进制是否就绪，如果不存在则提示用户执行一次性构建（约 10 秒）。然后创建输出目录 `.gstack/qa-reports/` 和 `screenshots/` 子目录。

**Step 2：读取测试计划上下文**

在进入测试之前，会先查找 `~/.gstack/projects/` 下是否有当前仓库最近生成的 *`-test-plan-`*`.md` 文件，这是 `/plan-eng-review` 跑完后自动写入的。如果找到，直接使用该测试计划，无需手动重复描述测试范围。同时也会读取 `TODOS.md` 里已知的 bug，把相关条目纳入测试清单。

**Step 3：系统性测试**

使用真实 Chromium 浏览器（Playwright 驱动）逐页测试，覆盖页面加载、控制台错误、表单、响应式布局、关键用户流等。测试过程中对每个发现的问题截图存档。

**Step 4：输出报告，停手**

报告同时写入两个位置：本地的 `.gstack/qa-reports/qa-report-{domain}-{YYYY-MM-DD}.md`，以及跨 session 的项目级路径 `~/.gstack/projects/{slug}/{user}-{branch}-test-outcome-{datetime}.md`，用于后续 session 自动读取历史 QA 结论。

---

**产出结果**

**结构化 Markdown 报告**，包含：

健康分（0-100）、每个问题的截图证据、严重级别分类、以及详细的复现步骤。健康分基于测试页面数、发现 bug 数、diff 覆盖率综合计算。

**截图文件集**，组织结构如下：

```Plain Text
.gstack/qa-reports/
├── qa-report-{domain}-{YYYY-MM-DD}.md
├── screenshots/
│   ├── initial.png              ← 首页带标注截图
│   ├── issue-001-step-1.png     ← 问题 001 的步骤截图
│   ├── issue-001-result.png     ← 问题 001 的结果截图
│   └── ...
```

**项目级测试结论存档**：写入 `~/.gstack/projects/` 的跨 session 文件，供后续 `/qa`、`/retro` 等 Skill 自动读取，了解历史测试状态。

**与 `/qa` 的核心区别**

这是理解 `/qa-only` 定位的关键：

|  | **/qa** | **/qa-only** |
|-|-|-|
| 测试方法 | 完全相同 | 完全相同 |
| 发现 bug 后 | 原子性 commit 修复 → 重新验证 → 生成回归测试 | 记录入报告，停手 |
| 是否修改代码 | 是 | **否，绝不** |
| 适用对象 | 自己开发的分支 | 生产环境、Staging、团队 handoff、只读审查 |
| 输出 | before/after 健康分 + 修复证据 | 纯 bug 报告 + 截图 + 复现步骤 |

---

**使用注意事项**

**这是只读操作，但需要应用在线运行**

`/qa-only` 不改代码，但它需要真实访问你的应用，所以应用必须是运行状态——本地 dev server、Staging URL 或生产 URL 都可以，但必须可访问。

**需要 browse 二进制，第一次有构建延迟**

首次使用时 Skill 会检测 browse 二进制是否存在，如果不存在会提示"gstack browse needs a one-time build (\~10 seconds)"，确认后执行构建才能继续。后续使用就不会有这个等待了。

**针对生产环境是最安全的选择**

`/qa`（带修复）绝对不应该指向生产环境，因为它会修改代码并 commit。`/qa-only` 才是生产环境巡检的正确工具，它只读不写，和生产环境的交互仅限于 HTTP 请求和截图。

**测试认证页面需要先配置 cookies**

`/qa-only` 测试的是无状态的公开页面，如果你的应用有登录后才能访问的页面（比如游戏账号交易平台的卖家后台、订单管理页），需要先跑 `/setup-browser-cookies` 把真实浏览器的 Cookie 导入 headless session，再运行 `/qa-only`，否则那些页面测试时会被重定向到登录页，产生假阳性。

**团队 handoff 场景的正确用法**

`/qa-only` 的定位是"不让 Agent 动你的代码就得到一份干净的 bug 报告，可以直接交给团队"。如果你在做多人协作，自己的 Agent 不应该直接修复别人维护的模块，这时候跑 `/qa-only` 生成报告，然后把报告路径分享给对应的负责人，是正确的分工方式。

**报告会被后续 Skill 自动读取**

写入 `~/.gstack/projects/` 的测试结论文件会被 `/retro` 在做 retrospective 时自动拾取，也会被 `/qa`（如果后来决定让 Agent 修复）读取作为 baseline 对比，了解哪些 bug 是新引入的、哪些是已知的历史遗留。

信息已经非常充分，整理完整回答。

---

#### `/cso` 

**Chief Security Officer 模式**。以基础设施优先的方式进行安全审计，覆盖：secrets 考古、依赖供应链、CI/CD 流水线安全、LLM/AI 安全、skill 供应链扫描，加上 OWASP Top 10 和 STRIDE 威胁建模，以及主动验证。两种模式：daily（零噪音，8/10 置信度门槛）和 comprehensive（每月深度扫描，2/10 门槛）。跨审计轮次的趋势追踪。

它不是 linter，而是对你的攻击面进行系统性的对抗性审查。而且有一个核心承诺：**它只出报告，不改代码。**产出是一份附带具体修复建议的 Security Posture Report。

`/cso` 是**贯穿整个开发生命周期**的横切安全检查，不属于某个固定阶段，任何时候都可以运行，但有两个最典型的使用节点：

官方推荐的最佳实践顺序是：代码完成 → `/review` → `/cso`（先做安全审计）→ 修复安全问题 → 再跑 `/cso` 确认 → 然后 `/qa` → 发布前 `/ship`。安全问题优先于功能 bug 处理。

```Plain Text
implement → /review → /cso → fix security → /cso → /qa → /ship
                        ↑ 这里（首次）          ↑ 确认修复
```

---

**15 个审计阶段**

`/cso` 覆盖 Phase 0-14，完整模式下全部执行：

按聚焦范围，对应的命令行 flag 分别是：

- `/cso --infra`：基础设施专项（Phases 0-6, 12-14）
- `/cso --code`：代码专项（Phases 0-1, 7, 9-11, 12-14）
- `/cso --skills`：skill 供应链专项（Phases 0, 8, 12-14）
- `/cso --diff`：只审计当前分支变更（可与任意上述 flag 组合）
- `/cso --supply-chain`：依赖审计专项（Phases 0, 3, 12-14）
- `/cso --owasp`：仅 OWASP Top 10（Phases 0, 9, 12-14）
- `/cso --scope auth`：聚焦某个特定领域，如认证模块

不带任何 flag 默认运行全部 Phase 0-14，daily 模式（8/10 置信度门槛）。

完整 15 个 phase 覆盖的内容包括：secrets 考古（查 hardcoded 凭证、密钥历史提交）、TLS/OAuth 配置、依赖供应链漏洞、CI/CD 流水线安全、gstack skill 文件自身供应链、LLM/AI 安全（prompt injection、数据流信任边界）、OWASP Top 10、STRIDE 威胁建模、主动验证、趋势对比、以及最终产出报告。

**零噪音设计**

这是 `/cso` 区别于普通安全扫描工具的核心设计原则：

Zero-noise 设计：17 个误报排除规则、8/10 以上置信度门槛、独立发现验证。**每条 finding 都包含具体的利用场景（exploit scenario）**，不只是抽象的警告。

验证是纯代码追踪，**绝对不做实际网络请求**：

- Secrets：检查是否是真实的 key 格式（正确长度、有效前缀），但不去真实 API 验证
- Webhooks：追踪 handler 代码确认中间件链里是否存在签名验证，不发 HTTP 请求
- SSRF：追踪代码路径检查用户输入能否到达内部服务的 URL 构造，不发请求
- CI/CD：解析 workflow YAML 确认 `pull_request_target` 是否真的检出 PR 代码
- 依赖：检查有漏洞的函数是否被直接导入/调用，是则标 VERIFIED，否则标 UNVERIFIED 并注明可能通过框架内部、传递执行或配置驱动路径仍然可达

---

**具体产出结果**

1. **Security Posture Report（安全态势报告）** 每条 finding 包含严重程度、证据和推荐修复方案。典型输出格式如下：

```Plain Text
CRITICAL: SQL injection in user search (app/models/user.rb:47)
HIGH: Session tokens stored in localStorage (app/frontend/auth.ts:12)
MEDIUM: Missing rate limiting on /api/login endpoint
LOW: X-Frame-Options header not set
4 findings across 12 files scanned. 1 critical, 1 high.
```

1. **具体利用场景（Exploit Scenarios）** 每条 finding 附带一个具体的攻击演练场景，不是泛泛的风险警告，而是步骤化的"攻击者会怎么做"描述。
2. **修复路线图（Remediation Roadmap）** 对 top 5 高危 finding，通过 AskUserQuestion 呈现修复决策：A) 立即修复（附具体代码变更和工时估算）；B) 缓解（降低风险的 workaround）；C) 接受风险（记录原因，设置复审日期）；D) 推迟，以安全标签记入 TODOS.md。
3. **持久化 JSON 报告** 报告以 JSON 格式写入 `.gstack/security-reports/{date}-{HHMMSS}.json`，包含版本、日期、模式、审计范围、各 phase 运行状态、攻击面摘要（公开端点数、认证端点数、管理端点数、API 数、上传点、集成点、后台任务、websocket 等）以及完整 findings 列表。
4. **跨审计趋势对比** 通过持久化的历史报告，支持跨多次审计轮次的趋势追踪——哪些漏洞被修复了、哪些是新增的、安全态势整体在改善还是恶化。

---

**使用注意事项**

**① 只出报告，不改代码** 这是 `/cso` 的设计边界，它不会自动修复任何安全问题。产出的是一份带修复建议的报告，具体修复需要你根据报告手动执行或让 Claude Code 在新的 session 里执行。

**② daily vs comprehensive 两个档次** 默认的 daily 模式（`/cso`）使用 8/10 置信度门槛，只输出高可信度 finding，设计为日常/每 PR 运行，产出干净且不制造疲劳。`/cso --comprehensive` 把门槛降到 2/10，适合每月一次的深度扫描，会暴露更多潜在问题但也包含更多待验证的结果。

**③ LLM/AI 安全是 gstack 特有的审计维度** 传统 OWASP 工具不审查 AI 应用的 prompt injection、LLM 信任边界等问题，`/cso` 的 LLM Security phase 专门追踪用户输入是否真的能到达 system prompt 构造，识别 AI 应用特有的攻击面。这对于 gstack 这类工具自身的使用场景尤为相关——如果你的应用里也用了 LLM，这个检查就很有价值。

**④ Skill 供应链安全是额外特色**`/cso --skills` 会扫描 gstack skill 文件自身的安全性，在 skill 生态快速增长、社区 skill 质量参差不齐的背景下，这是防止 skill 被攻击者植入恶意指令的重要检查。

**⑤ 不做实际网络请求，避免副作用** 所有验证都通过代码追踪完成，不会触碰真实 API、真实 webhook 端点或真实依赖服务，这意味着可以安全地在任何环境（包括生产代码审计）中运行，不会产生任何副作用。

**⑥ 推荐配合 `/review` 使用形成安全闭环**`/review` 从代码结构层面捕获 SQL injection、race condition、LLM 信任边界等问题；`/cso` 从完整攻击面角度做系统性扫描。两者互补：`/review` 是 diff 级别的安全检查，`/cso` 是整个 codebase 的安全态势评估。推荐顺序是先 `/review` 再 `/cso`，安全问题全部修复后再进 `/qa`。

### 优化类（性能工具）

信息非常充分，整理完整回答。

---

#### `/benchmark` 

这是 gstack 的**性能工程师模式**。`/benchmark` 为你的页面建立性能基线：加载时间、Core Web Vitals（LCP、CLS、INP）、资源数量和总传输体积。在 PR 前后各跑一次，用来捕捉性能回归。它使用 browse daemon 做真实的 Chromium 测量，而不是合成估算。多次运行取平均值，结果持久化，可以跨 PR 追踪趋势。

`/benchmark` 是**横跨多个阶段的性能监测工具**，有两个核心使用节点：

**节点一：PR 合并前（和 `/ship` 配合）** 在 feature branch 完成、准备发布之前跑一次，和之前的 baseline 对比，确认没有性能回归。

**节点二：部署后（和 `/canary` 配合）**`/canary` 完成部署后健康检查、确认生产稳定后，推荐立即跑 `/benchmark` 更新性能基线，为下一次发布建立新的对比参考点。

```Plain Text
implement → review → QA → ship → land-and-deploy → canary → benchmark（更新基线）
                                  ↑ benchmark（PR前对比）
```

**测量内容**

典型的单次 benchmark 输出样本：

每个页面输出以下指标：

- **Load Time**（页面加载时间）
- **First Contentful Paint（FCP）**：从开始加载到任何内容首次渲染
- **Largest Contentful Paint（LCP）**：最大内容元素渲染完成时间，Google 推荐 2.5s 以内为 Good
- **Time to Interactive（TTI）**：页面可以可靠响应用户输入的时间
- **Cumulative Layout Shift（CLS）**：视觉稳定性，页面加载期间意外布局偏移量，0.1 以下为 Good
- **Bundle Size 拆分**：main.js、vendor.js、CSS 各自大小及总大小

回归判定阈值：**超过 50% 或超过 500ms 即判定为性能回归**。

---

**具体产出结果**

1. **每页性能报告（多次运行取平均值）** 官方示例输出格式：

```Plain Text
/ load: 1.2s  LCP: 0.9s  CLS: 0.01  resources: 24 (890KB)
/dashboard load: 2.1s  LCP: 1.8s  CLS: 0.03  resources: 31 (1.4MB)
/settings load: 0.8s  LCP: 0.6s  CLS: 0.00  resources: 18 (420KB)
Baseline saved. Run again after changes to compare.
```

1. **持久化 baseline 数据** 结果持久化存储，供下次运行时做对比，也供 `/canary` 读取作为部署后性能监控的参考基准。
2. **Before/After 对比报告** 再次运行时展示和上次 baseline 的 delta，每个指标标出绝对变化值，超过回归阈值的项目会被明确标出。
3. **跨 PR 趋势数据** 结果跨 PR 持久存储，可以看到性能随时间的演变趋势，不只是两点之间的对比。

---

**与 `/canary` 的分工**

这两个 skill 功能有重叠，但定位不同：

`/benchmark` 是**主动的、精确的、面向开发阶段的**性能测量工具——在 PR 合并前后测量，提供详细的 Core Web Vitals 和 bundle size 数据，目的是发现性能回归并建立基线。

`/canary` 是**被动的、持续的、面向生产部署后的**监控循环——在部署后定期循环检查关键页面，监视 console error、性能回归、页面故障和视觉异常，有问题立即告警。它也和 `/benchmark` 建立的 baseline 做对比，但侧重的是部署后的稳定性监控，而不是精确的性能测量。

---

**使用注意事项**

**① 需要一个可访问的 URL，测的是已部署的站点**`/benchmark` 用真实 Chromium 浏览器测量，需要提供可访问的 URL，测量的是已经运行的站点（staging 或 production），不是源码。本地开发服务器也可以，但要确保能访问。

**② "先跑一次建立基线"是使用前提** 首次运行只建立 baseline，没有对比数据。对比发现性能回归需要至少跑两次——一次建立基线（通常在改动前或上线后），一次在改动后对比。如果跳过建立基线直接在改动后运行，只有绝对值，没有相对对比。

**③ 测量环境要一致，否则数据没有可比性** 网络条件、机器性能、并发负载都会影响测量结果，同一台机器、同等负载下的两次对比才有意义。不同机器或不同网络环境的 baseline 对比，数据可能大幅抖动。

**④ 和 `/canary` 配合形成完整的性能保障闭环** 推荐工作流是：deploy 成功 → `/canary` 确认生产稳定 → `/benchmark` 更新 baseline。这样每次发布后都有最新的基线供下次 PR 对比，不会用老旧的基线数据误判回归。

**⑤ 它是辅助 skill，不会阻塞发布** 和 `/plan-eng-review` 不同，`/benchmark` 结果不会写入 Review Readiness Dashboard，不会对 `/ship` 产生阻塞。它是可选的性能可观测性工具，建议每个 PR 都跑，但缺失不会阻止代码合并。

#### `/canary` 

`/canary` 是部署后的持续监控模式：使用 browse daemon 循环巡检生产站点的关键页面，检测控制台错误、性能回归、页面故障和视觉异常，发现问题立即告警，严重时触发回滚。

`/canary` 属于 **Post-Deploy Monitoring（部署后监控）阶段**，是 Release Pipeline 的第三棒，紧接在 `/land-and-deploy` 之后。

完整发布链路：`/ship`（代码审查/开 PR）→ `/land-and-deploy`（合并/CI/部署/验证）→ `/canary`（部署后持续监控）→ `/benchmark`（更新性能基线）。其中出现严重问题时，`/canary` 会触发回滚并中断链路。

---

**工作流程**

**Phase 1：页面发现**

如果没有指定 `--pages` 参数，Skill 会自动导航到生产 URL，提取顶部 5 个内部导航链接，加上首页，组成监控页面列表。然后通过 AskUserQuestion 让你确认，支持新增页面或只监控首页（快速检查）。

**Phase 2：建立基线快照**

如果不存在 `baseline.json`，在正式监控开始前先对每个目标页面抓取截图、控制台错误数、加载时间，作为本轮监控的参照基准。

**Phase 3：持续监控循环**

每 60 秒对每个页面执行一轮检查：访问页面、截图（带标注）、读取控制台错误、读取性能数据，然后与基线对比，按告警级别分类：页面加载失败 → CRITICAL ALERT；新出现的控制台错误 → HIGH ALERT；加载时间超过基线 2 倍 → MEDIUM ALERT；新出现的 404 → LOW ALERT。

关键原则：告警基于**变化量**，不是绝对值——如果基线本来就有 3 个控制台错误，有 3 个依然正常，只有新增的才触发告警。同时为了避免误报，只有在连续 2 次以上检查中都出现的问题才会告警。

**Phase 4：结果判定**

全部指标在阈值内 → `CANARY STATUS: HEALTHY`，正常结束监控。出现严重回归（如性能下降 35%，错误率 12%）→ 立即触发回滚流程。

---

**产出结果**

**实时监控仪表盘**，每轮检查后更新，包含：

控制台错误数（对比基线）、各页面加载时间和基线对比（含是否超 10% 阈值判断）、API 错误率（目标 < 1%）、关键用户流是否正常（登录/Dashboard 渲染/API 响应）。

**截图存档**：每轮检查的页面带标注截图保存至 `.gstack/canary-reports/screenshots/`，格式为 `<page-name>-<check-number>.png`，发现异常时额外保存告警截图。

**告警通知**：发现新控制台错误时立即输出告警，包含错误文件路径和行号，如 `dashboard.js:142`，并保存截图。

**回滚决策**：遇到 CRITICAL 级别问题（严重性能回归或高错误率），自动启动回滚流程，并告知你失败原因和回滚建议。

**`/canary` 与 `/land-and-deploy` 验证的区别**

很多人会问：`/land-and-deploy` 的 Step 4 不是已经做了健康检查吗？两者有本质区别：

|  | **/land-and-deploy Step 4** | **/canary** |
|-|-|-|
| 时机 | 部署完成的那一刻，一次性 | 部署后持续运行（分钟级循环） |
| 深度 | health endpoint + 首页 200 + 基础 smoke test | 多页面、控制台错误、性能趋势、用户流 |
| 是否持续 | 否，验证通过即结束 | 是，持续到你手动停止或时间到 |
| 能发现的问题 | 启动即崩溃、health 端点挂掉 | 延迟出现的 JS 报错、性能缓降、特定页面回归 |

有些问题只有在真实流量跑了一段时间后才会浮现，这正是 `/canary` 存在的意义。

使用注意事项

**先有 `/benchmark` 基线，效果才好**

`/canary` 使用 browse daemon 做真实 Chromium 测量，结果与 `/benchmark` 的历史数据对比。如果从未跑过 `/benchmark`，第一次 `/canary` 会以本次部署前的快照作为临时基线，精度相对有限。建议在项目早期就跑一次 `/benchmark` 建立稳定基线。

**监控是阻塞式的，不要在后台忽略它**

`/canary` 是一个持续运行的循环，在它运行期间 Claude Code session 会保持活跃状态。它不是 fire-and-forget，如果你关闭 session 监控就停了。如果你需要"无人值守"的部署后监控，目前 `/canary` 不适合，需要搭配其他外部监控工具（APM、Sentry 等）。

**rollback 本身不会自动执行**

遇到 CRITICAL 问题时，`/canary` 会说"Initiating rollback"并给出建议，但实际的回滚操作（如 `fly rollback` 或 `vercel rollback`）是通过 `/setup-deploy` 配置的平台命令执行的。确保 deploy.yml 里的平台配置和 rollback 命令是正确的，否则告警后无法自动恢复。

**只检测浏览器层面的问题**

`/canary` 使用 Chromium 做前端层面的巡检，擅长发现 JS 错误、页面加载失败、响应缓慢。但它看不到服务端日志、数据库慢查询、内存泄漏等后端问题。对于纯后端服务（如你的 Spring Boot + RocketMQ 架构），需要结合 APM/日志平台来补充监控盲区，`/canary` 只是其中前端可观测性的一层。

**无状态页面 vs 需要登录的页面**

默认情况下 `/canary` 访问无需认证的公开页面。如果你的核心业务页面在登录后，需要先跑 `/setup-browser-cookies` 导入真实 Cookie，才能让 canary 巡检到那些页面。

### 文档类（知识工具）

#### `/document-release` 

`/document-release` 是发布后的文档同步工具：读取项目所有文档文件，与本次 diff 交叉对比，更新 README/ARCHITECTURE/CONTRIBUTING/CLAUDE.md 使其与实际发布的内容对齐，打磨 CHANGELOG 语气，清理 TODOS，并可选地 bump VERSION。

---

**所属阶段**

`/document-release` 属于 **Release 收尾阶段**，是 `/ship` 创建 PR 之后、PR 合并之前的文档层补全步骤。

`/document-release` 在 `/ship` 创建 PR 之后运行，职责是文档层：README、ARCHITECTURE、CONTRIBUTING、CLAUDE.md。它从不碰代码，不会主动 bump VERSION（需要询问确认），可以打磨 CHANGELOG 措辞但不会重新生成条目——`/ship` 写入的条目才是 CHANGELOG 的权威来源。

完整的工作流位置：

```Plain Text
/autoplan → 实现代码 → /review → /ship（创建 PR）→ /document-release（文档同步）→ PR 合并 → /land-and-deploy
```

现在 `/ship` 会自动调用 `/document-release`，文档无需额外命令即可保持同步。

---

**工作流程**

**Step 1：读取所有文档**

扫描项目根目录下的全部文档文件，包括 README.md、ARCHITECTURE.md、CONTRIBUTING.md、CLAUDE.md、CHANGELOG.md、TODOS.md、VERSION 等，建立完整的文档现状画像。

**Step 2：分析 diff，识别文档漂移**

对 diff 进行自动化分析，识别需要更新的核心文档，找出哪些地方已经和实际发布的代码发生偏移（doc drift），然后定点更新。

**Step 3：逐文件更新**

针对每个发生漂移的文档文件进行精准修改：README 和 ARCHITECTURE 同步新增/变更的功能描述，CONTRIBUTING 同步变更的开发流程约定，CLAUDE.md 同步新的 Skill 路由规则或项目约定。

**Step 4：CHANGELOG 语气打磨**

CHANGELOG 的条目由 `/ship` 写入，`/document-release` 不重新生成，但会打磨措辞语气，确保风格一致、表达准确。

**Step 5：TODOS 清理**

对 TODOS.md 中已完成的项做清理或重新分类，把本次 diff 里实现了的 TODO 标记完成，把新发现的待办事项补充进去。

**Step 6：VERSION bump（可选，询问确认）**

VERSION 版本号的 bump 不会自动执行，会先询问确认。

**Step 7：更新 PR body**

如果当前存在 PR/MR，Skill 会在 PR 描述里添加或更新一个 `## Documentation` 段落，包含文档 diff 预览，描述每个被修改的文件具体改了什么（例如"README.md：在 skills 表格新增了 /document-release，将 skill 总数从 9 更新到 10"）。GitHub 使用 `gh pr update`，GitLab 使用 `glab mr update`。

---

**产出结果**

主要产出是更新后的项目文档：README、ARCHITECTURE、CONTRIBUTING、CLAUDE.md 与实际发布内容保持对齐；CHANGELOG 语气一致；TODOS 清理干净；以及 PR body 里增加了文档变更的可读摘要。所有变更会作为一个 commit 推入当前分支，包含在 PR 里随代码一起 review 和合并。

---

**使用注意事项**

**时机：在 `/ship` 之后、PR 合并之前**

`/document-release` 的运行时机是：代码已 commit，PR 已存在或即将存在，但在 PR 合并之前。它需要 diff 作为输入来判断哪些文档需要更新，如果在 commit 之前运行，它看不到本次变更，输出会不准确。

**`/ship` 已经自动调用，通常不需要手动跑**

`/ship` 现在会自动调用 `/document-release`，文档无需额外命令即可保持同步。手动调用 `/document-release` 的场景是：你用了其他方式创建 PR（不经过 `/ship`），或者你发现 `/ship` 自动运行的文档更新有遗漏需要补充。

**它只更新文档，从不碰代码**

`/document-release` 的硬性约束是：永远不修改代码文件，永远不重新生成 CHANGELOG 条目（只打磨语气），不主动 bump VERSION（需要用户确认）。如果你希望它不要碰某个特定文档，可以在 session 里告诉它跳过。

**与 `/ship` 的分工要清楚**

`/ship` 优化的是速度，生成完整的文档审计会太慢太嘈杂。分离的设计让每个 Skill 专注：`/ship` 把代码送到 PR，`/document-release` 在合并前把文档搞准确。把两者当作一个整体来理解会更清晰——它们是 Release 流程里相邻的两步，不是替代关系。

**CHANGELOG 权威来源在 `/ship`**

`/document-release` 不会覆盖 `/ship` 写入的 CHANGELOG 内容，只做语气层面的微调。如果你发现 CHANGELOG 条目本身有内容问题（功能描述不准确、遗漏了重要变更），应该手动修改或重跑 `/ship`，而不是指望 `/document-release` 来纠正。

**对于 Java 后端项目的适用性**

游戏账号交易平台这样的 Spring Boot 后端项目，文档更新场景主要集中在新增 API 接口时更新 README 里的接口列表、修改了 RocketMQ 消息结构时同步 ARCHITECTURE 文档、调整了 Redis 缓存策略时同步相关说明。`/document-release` 对这类纯后端项目同样有效，因为它通过分析 diff 来定向更新，不会无中生有地为没有变化的部分添加内容。

#### `/retro` 

**工程经理模式**。到了周末，Garry Tan 想知道这一周真正发生了什么——不是感觉，是数据。`/retro` 分析提交历史、工作模式和发布速度，写出一份坦诚的复盘报告。它是**团队感知**的：识别谁在运行这条命令，对你自己的工作给出最深入的分析，然后对每个贡献者进行具体的点评，包括称赞和成长机会。

gstack 完整生命周期的最后一个环节：

```Plain Text
office-hours → plan → implement → review → QA → ship → land-and-deploy → retro
                                                                              ↑ 这里
```

---

**测量的核心指标**

计算的指标包括：提交数、代码行数（LOC）、测试比率、PR 大小、修复比率（fix ratio）。从提交时间戳中检测编程 session，找出热点文件（hotspot files），追踪发布连胜（shipping streaks），识别本周最大的一次发布。

测试健康度也是核心追踪项：总测试文件数、本周期新增测试数、回归测试提交数，以及与上周期的趋势 delta。如果测试比率降到 20% 以下，会被标记为成长机会。

---

**官方示例输出**

一次典型的 `/retro` 输出如下：

```Plain Text
Week of Mar 1: 47 commits (3 contributors), 3.2k LOC, 38% tests, 12 PRs, peak: 10pm
| Streak: 47d

## Your Week
32 commits, +2.4k LOC, 41% tests.
Peak hours: 9-11pm.
Biggest ship: cookie import system (browser decryption + picker UI).
What you did well: shipped a complete feature with encryption, UI, and 18 unit tests
in one focused push...

## Team Breakdown
### Alice
12 commits focused on app/services/. Every PR under 200 LOC — disciplined.
Opportunity: test ratio at 12% — worth investing before payment gets more complex.

### Bob
3 commits — fixed the N+1 query on dashboard. Small but high-impact.
Opportunity: only 1 active day this week — check if blocked on anything.

[Top 3 team wins, 3 things to improve, 3 habits for next week]
```

---

**具体产出结果**

1. **团队级周报头部（Team Header）** 总提交数、贡献者数、总 LOC、测试比率、PR 数、峰值活跃时间、发布连胜天数。
2. **个人深度分析（Your Week）** 对运行命令的人给出最详细的分析——本周最大一次发布是什么、做得好在哪里、峰值编码时段。
3. **逐人贡献分解（Team Breakdown）** 每个贡献者的具体点评，包括做得好的具体事情（不是泛泛称赞）以及成长机会。
4. **三项总结（Top 3 / Improve 3 / Habits 3）** 团队本周最大的 3 个胜利、3 个需要改进的地方、以及下周值得养成的 3 个习惯。
5. **Greptile 信噪比趋势** 如果配置了 Greptile，`/retro` 会追踪 Greptile 的准确率趋势——valid findings 比例是在提升还是下降，帮助判断自动化 code review 的质量是否在改善。
6. **持久化 JSON 快照** 每次运行会保存一份 JSON 快照到 `.context/retros/`，供下次运行时生成趋势对比，不只是单周数据，而是跨周的演变。
7. **跨项目 Global 模式**`/retro global` 模式可以跨你所有项目以及所有 AI 工具（Claude Code、Codex、Gemini）做汇总复盘，得到更完整的个人生产力视图。

---

**使用注意事项**

**① 数据来源是 git 提交历史，不是任务系统**`/retro` 的所有分析都来自 `git log`——提交数、时间戳、文件变更、PR 大小。如果你有很多工作没有在 git 里体现（比如大量未提交的思考时间、文档编辑等），这份报告只反映 git 可见的部分，不是完整工作的全貌。

**② 团队感知依赖 git 作者信息** 它"识别谁在运行这条命令"依赖于 git config 里的用户信息。如果团队成员的 git email 或 name 配置不一致，会影响各人贡献的归属分析。

**③ 测试比率是健康信号，20% 是警戒线** 测试比率低于 20% 会被标记为成长机会。如果你的项目里大量测试存在但命名或路径不符合常规约定，`/retro` 可能低估实际的测试覆盖率。这个数值是粗估，不是精确覆盖率报告（精确覆盖率在 `/ship` 里）。

**④ Global 模式需要跨 repo 的 git 访问**`/retro global` 要访问多个项目的 git 历史，需要在对应的工作目录或有访问权限的环境下运行。

**⑤ 定期运行才能发挥趋势追踪的价值** JSON 快照持久化是为了支持跨周趋势对比。只运行一次只能得到单周数据，连续多周运行才能看到发布速度、测试健康度、团队节奏是在改善还是恶化。推荐每周固定时间跑一次，比如周五下班前或周一早上。

**⑥ 它是反思工具，不会生成任务或修改代码** 和 `/review`、`/qa` 不同，`/retro` 是纯报告类 skill，不会对代码产生任何变更。它的价值在于让你看清楚这一周到底发生了什么，为下一周的工作方向提供数据支撑，而不是自动采取任何行动。

### 浏览器相关（特殊能力）

#### `/browse` 

`/browse` 是 gstack 的快速无头浏览器，用于 QA 测试和应用自测（dogfooding）。它能导航页面、与元素交互、验证状态、做前后 diff、带标注截图、测试响应式布局、表单、上传、对话框，并捕获 bug 证据。

本质上，`/browse` 是 gstack 里所有需要"看见页面"的 Skill 的底层基础设施，`/qa`、`/qa-only`、`/canary`、`/design-review` 都在内部通过 `$B` 命令调用它。

---

**所属阶段**

`/browse` 是一个**跨阶段的基础设施层工具**，不属于某个特定开发阶段，而是渗透进多个阶段：

```Plain Text
开发阶段        → 直接调用 /browse 验证本地 dev server 的 UI 行为
QA 阶段        → /qa 和 /qa-only 在内部用 $B 命令做页面测试
Post-Deploy    → /canary 用 $B 循环巡检生产站点
设计审查阶段    → /design-review 用 $B 截图并与 DESIGN.md 对比
竞品研究        → /design-consultation 用 $B 浏览竞品截图
```

gstack 的 CLAUDE.md 明确规定：当需要与浏览器交互时，使用 `/browse` Skill 或直接通过 `$B` 命令运行 browse 二进制文件，**绝对不要**使用 `mcp__claude-in-chrome__*` 工具——它们速度慢、不可靠。

---

**技术架构**

`/browse` 不是普通的 Skill，它有独立的运行时架构：

整体是一个编译好的 CLI 二进制（Bun 编译），通过 localhost 随机端口的 HTTP 与本地 Playwright 守护进程通信，守护进程控制无头 Chromium。首次调用需约 3 秒启动，之后每条命令约 100ms，空闲 30 分钟后自动关闭。Cookies、Tab、Session 状态在调用之间持久保留。

元素引用通过 Playwright 的 Accessibility Tree 实现（`@e1`、`@e2` 等 `@ref` 标签），避免了 DOM 注入带来的 CSP（内容安全策略）问题。

---

**完整命令体系**

`/browse` 提供 50+ 条命令，按类别分为：

**导航类**（`goto`、`load-html`、`back`、`forward`、`reload`、`url`）；

**读取类**（`text`、`html`、`links`、`forms`、`accessibility`）；

**快照类**（`snapshot` 及其丰富的 flag）；

**交互类**（`click`、`fill`、`select`、`hover`、`type`、`press`、`scroll`、`wait`、`viewport`、`upload`）；

**检查类**（`js`、`eval`、`css`、`attrs`、`is`、`console`、`network`、`dialog`、`cookies`、`storage`、`perf`、`inspect`）；

**样式类**（`style`、`cleanup`、`prettyscreenshot`）；

**视觉类**（`screenshot`、`pdf`、`responsive`）。

其中 `snapshot` 是核心命令，常用 flag 包括：

`-i`（只显示交互元素，带 `@e` ref）、`-D`（与上一次快照做 unified diff，用于验证操作效果）、`-a`（带红色标注框和 ref 标签的截图）、`-o <path>`（指定输出路径）。

---

**典型使用模式**

**登录流程测试**：

```Bash
$B goto https://app.example.com/login
$B snapshot -i                        # 查看所有可交互元素
$B fill @e3 "$TEST_EMAIL"
$B fill @e4 "$TEST_PASSWORD"
$B click @e5
$B snapshot -D                        # diff 确认变化
$B is visible ".dashboard"            # 断言成功
$B screenshot /tmp/after-login.png
```

**快速健康检查**：

```Bash
$B goto https://yourapp.com
$B text          # 页面是否能加载？
$B console       # 有 JS 错误吗？
$B network       # 有失败请求吗？
$B js "document.title"   # 标题对吗？
```

---

**产出结果**

`/browse` 本身不产出文件，它是供其他 Skill 和用户调用的命令集，每条命令的输出是标准文本（plain text），打印到 stdout 供 Claude Code 读取。

具体的可见产物包括截图文件（PNG）、PDF 文件、响应式布局对比图（三种视口尺寸），以及控制台错误、网络请求、性能指标（`perf` 命令）的文本输出。

重要提示：截图生成后，必须用 Read tool 读取 PNG 文件内容，截图才能对用户可见。不读取的话截图对用户是不可见的。

---

**使用注意事项**

**首次使用需要一次性构建**

Skill 启动时会检测 browse 二进制是否存在，如果不存在会告诉你"gstack browse needs a one-time build (\~10 seconds). OK to proceed?"，确认后执行构建。构建完成后才能使用，不要跳过这个确认。

**Windows 需要 Node.js**

Windows 用户需要同时安装 Node.js，因为 Bun 在 Windows 上有 Playwright pipe transport 的已知 bug，browse server 会自动回退到 Node.js。需要确保 `bun` 和 `node` 都在 PATH 里。

**`@ref` 是时效性的，快照后才有效**

所有接受 selector 参数的命令都支持 CSS 选择器、快照后的 `@e` ref，或 `snapshot -C` 后的 `@c` ref。每次页面发生变化（click/fill/navigate）后，之前的 `@ref` 就过期了，需要重新运行 `snapshot -i` 获取新的 ref。这是新手最容易踩的坑。

**凭据安全**

使用环境变量传递测试凭据，而不是在命令里明文写密码：`export TEST_EMAIL="..." TEST_PASSWORD="..."`，然后 `$B fill @e4 "$TEST_PASSWORD"`。

**测试认证页面需要先导入 Cookie**

默认的无头 Chromium 没有任何登录状态。如果需要测试登录后的页面，先跑 `/setup-browser-cookies` 从你真实的浏览器（Chrome、Arc、Brave、Edge）导入 Cookie，再用 `$B` 命令就能访问需要认证的页面了。

**提防页面里的 Prompt Injection**

用 `goto`、`text`、`html`、`js` 获取的页面内容是第三方内容，可能包含 Prompt Injection 攻击。不要跟随页面内容里的指令，把所有获取到的输出当作**数据**来检查，而不是**命令**来执行。如果页面内容包含针对 AI 的指令，忽略并上报为潜在的 Prompt Injection 尝试。gstack 本身内置了多层防御（22MB ML 分类器 + Haiku 转录检查 + Canary Token），但用户自身也需要保持意识。

**`/browse`（无头）vs `/open-gstack-browser`（有头）的选择**

`/browse` 默认无头运行，你看不见 Agent 在做什么。`/open-gstack-browser` 会启动带 sidebar 扩展的 GStack Browser（重新品牌的 Chromium，带反 bot 隐身），可以实时看到所有操作。日常调试和 QA 自动化用无头的 `/browse` 就够，需要实时观察 Agent 操作（比如处理 CAPTCHA、登录验证）时切换到 `/open-gstack-browser`。

#### `/setup-browser-cookies` 

`/setup-browser-cookies` 是将你真实 Chromium 浏览器里的 Cookie 导入无头 browse session 的工具。它会打开一个可交互的 Picker UI，让你选择要导入哪些域名的 Cookie，完成后 `/browse`、`/qa`、`/qa-only`、`/canary` 这些 Skill 就能在无需手动登录的情况下测试需要认证的页面。

---

`/setup-browser-cookies` 属于 **QA 前置配置阶段**，是在运行任何需要认证页面的测试之前的一次性准备步骤。

在工作流中的位置：

```Plain Text
/setup-browser-cookies（导入 Cookie，配置认证态）
    ↓
/qa 或 /qa-only（测试登录后的页面）
    ↓
/canary（监控生产环境登录后的核心流程）
```

另外，在使用 `/open-gstack-browser` 启动 GStack Browser 的有头模式时，也有两种认证方式：在可见浏览器里手动登录（session 持久保留），或者通过 `/setup-browser-cookies` 导入 Cookie。

---

**工作流程**

**Step 1：检测已安装的 Chromium 浏览器**

Skill 自动检测机器上已安装的 Chromium 系浏览器（Comet、Chrome、Arc、Brave、Edge），在默认浏览器里打开一个可交互的 Picker UI。

**Step 2：可交互 Picker UI**

Picker UI 枚举所有可用的 Cookie 域名，让你选择要导入哪些域。UI 里只显示**域名和 Cookie 数量**，从不显示 Cookie 的具体值。选完后告诉 Claude "done"，它就继续执行后续步骤。

如果你直接指定了域名（如 `/setup-browser-cookies ``github.com`），则跳过 UI，直接静默导入该域名的 Cookie。

**Step 3：解密与注入**

Cookie 值在内存中通过 PBKDF2 + AES-128-CBC 解密，加载进 Playwright 的浏览器上下文，**永远不会以明文形式写入磁盘**。Picker UI 也不会展示 Cookie 值，只显示域名和数量。

**Step 4：macOS Keychain 授权**

在 macOS 上，每种浏览器第一次导入时会触发 Keychain 对话框，需要点击 "Allow" 或 "Always Allow"。在 Linux 上，v11 版 Cookie 可能需要 `secret-tool` / `libsecret` 访问权限；v10 版 Cookie 使用 Chromium 的标准回退密钥。

---

**安全设计细节**

这是 `/setup-browser-cookies` 最值得关注的部分，gstack 对此做了相当严格的设计：

**数据库只读访问**：gstack 把 Chromium Cookie 数据库复制到临时文件后以只读方式打开（避免与正在运行的浏览器产生 SQLite 锁冲突），**从不修改你真实浏览器的 Cookie 数据库**。

**密钥缓存是 per-session 的**：Keychain 密码和派生的 AES 密钥缓存在内存里，仅在 browse server 的生命周期内有效。server 关闭（空闲超时或显式停止）后，缓存随之消失。

**日志里没有 Cookie 值**：控制台、网络、对话框的日志里永远不包含 Cookie 值。`cookies` 命令输出的是 Cookie 元数据（域名、名称、过期时间），但值是被截断的。

**浏览器注册表是硬编码的**：支持的浏览器列表（Comet、Chrome、Arc、Brave、Edge）是硬编码的，数据库路径从已知常量构建，**不接受用户输入**，防止路径注入。Keychain 访问使用 `Bun.spawn()` 的显式参数数组，不是 shell 字符串拼接，防止 shell 注入。

---

**产出结果**

`/setup-browser-cookies` 本身不产出文件，它的产出是**无头 browse session 里注入的认证状态**。运行完成后：

- 无头 Chromium 的 Playwright 上下文里有了你选择的域名对应的有效 Cookie
- 后续的 `$B goto ``https://your-app.com/dashboard` 就像在真实浏览器里一样直接进入登录后的页面
- `/qa`、`/qa-only`、`/canary` 等 Skill 都可以直接测试需要认证的页面流程

运行时会显示一份导入摘要，例如：

```Plain Text
Imported cookies for 3 domains:
- yourapp.com: 12 cookies
- api.yourapp.com: 4 cookies
- auth.yourapp.com: 6 cookies
```

---

**使用注意事项**

**需要 browse 二进制先构建好**

Skill 启动时检测 browse 二进制是否存在，如果不存在会提示需要一次性构建（约 10 秒）。Cookie Picker 复用 browse server 的同一端口，不需要额外进程。

**macOS 专属的完整支持**

官方完整支持的是 macOS Keychain 作为凭据存储。Linux（GNOME Keyring/kwallet）和 Windows（DPAPI）在架构上是可行的，但目前尚未实现。如果你在 Linux 上使用，只有 v10 版 Cookie 能通过标准回退密钥解密，v11 版需要额外的 `libsecret` 配置。

**Cookie 的生命周期与 browse server 绑定**

导入的 Cookie 存在于内存里的 Playwright 上下文中，和 browse server 进程的生命周期一致。browse server 默认**空闲 30 分钟后自动关闭**，关闭后 Cookie 也随之消失。下次运行 `/qa` 或 `/canary` 时，如果 server 已经重启，就需要重新运行 `/setup-browser-cookies`。这不是 bug，是有意为之的安全设计，避免认证状态无限期地留在磁盘上。

**实际浏览器的 Cookie 需要是有效的**

`/setup-browser-cookies` 是"搬运"你浏览器里当前已有的登录态，不是替代登录过程。如果你的真实浏览器里对某个站点的 session 已经过期，导入进来的 Cookie 也是过期的，`/qa` 测试时同样会被重定向到登录页。确保在运行 `/setup-browser-cookies` 之前，先在真实浏览器里确认目标站点是已登录状态。

**选择性导入，不要全量导入**

Picker UI 让你按域名选择，不要习惯性地全选。只导入你 QA 测试实际需要的域名。一方面减少内存占用，另一方面避免把无关站点（尤其是金融、个人账户类）的 Cookie 放入一个 AI 控制的浏览器 session，降低潜在风险。

**与 `$B handoff` 的使用场景区分**

如果你运行 `/qa` 中途碰到需要 MFA、CAPTCHA 或二次验证的情况，那是 `$B handoff` 的场景——Agent 遇到无法自动处理的认证墙时，会打开可见浏览器，让你手动解决，解决后告诉 Agent "done"，它会继续。`/setup-browser-cookies` 是会话**开始前**的批量认证配置，`$B handoff` 是会话**运行中**的单次人工介入，两者定位不同，按需选用

我注意到 README 里提到了 `/connect-chrome` 这个命令，但详细说明不多。让我直接看这个文件的内容。关键信息已经找到了。再看一下 `open-gstack-browser` 的内容，因为 `connect-chrome` 就是它的符号链接。信息已经非常充分了，可以综合回答了。

---

已经把 `connect-chrome` 的来龙去脉搞清楚了，以下是完整分析。

#### `/connect-chrome` & `/open-gstack-browser`

**`/connect-chrome`本质上是一个别名（向后兼容的符号链接），指向 `/open-gstack-browser`**

在 `setup` 脚本中有这样一段注释：`# Backwards-compat alias: /connect-chrome → /open-gstack-browser`，然后通过 `ln -snf "gstack/open-gstack-browser" "$_OGB_LINK"` 将其创建为软链接。这意味着调用 `/connect-chrome` 和调用 `/open-gstack-browser` 效果完全等价，前者只是为了兼容旧版本用户的使用习惯保留下来的入口。

---

`/open-gstack-browser` 会启动 GStack Browser，这是一个 AI 控制的 Chromium 浏览器，内置侧边栏扩展，具备反反爬虫隐身功能和自动模型路由能力。像 Google、NYTimes 这样的网站也可以正常运行而不触发验证码。菜单栏显示的是"GStack Browser"而不是"Chrome for Testing"，用户正常的 Chrome 完全不受影响。`$B disconnect` 可以切回无头模式，浏览器窗口保持打开期间不会有空闲超时。

侧边栏里有一个 Claude 实例负责控制浏览器，并自动路由到合适的模型：Sonnet 处理导航和操作（点击、跳转、截图），Opus 负责阅读和分析（总结、找 Bug、描述内容）。

---

按照 gstack 的 **Think → Plan → Build → Review → Test → Ship → Reflect** 流程，`/connect-chrome`（即 `/open-gstack-browser`）归属于 **Test（测试）** 阶段，是 `/qa` 流程的底层基础设施。典型用法是在 `/qa` 执行真实浏览器测试前，先用它建立一个有头浏览器会话，方便人工观察和处理登录态等问题。

---

执行后会得到：

一个处于运行状态的 Chromium 有头浏览器窗口，带有 GStack 侧边栏扩展。侧边栏中可以用自然语言驱动 Claude 执行浏览器操作，比如"截图这个页面"、"填写这个表单"、"遍历列表提取价格"等。此外，侧边栏还配备了分层的 Prompt 注入防御机制：一个 22MB 的本地 ML 分类器扫描每个页面和工具输出，Haiku 的转录校验对整段对话进行投票，随机金丝雀 token 捕获 session 劫持尝试，且需要两个分类器同时判定才触发拦截以防止误报。侧边栏头部有一个绿/黄/红状态盾牌图标。

---

**注意事项**

**依赖方面：** 首次使用 browse 功能需要一次性构建，大约 10 秒。需要 Bun 运行时，如果未安装脚本会自动安装，但会校验安装脚本的 SHA256 哈希以确保安全。

**MCP 工具冲突：** 绝对不要使用 `mcp__claude-in-chrome__*` 相关工具，它们又慢又不稳定。gstack 明确在 CLAUDE.md 里写入了这条禁令，两套浏览器方案不能混用。

**Token 开销：** gstack 选择编译为二进制、纯文本输入输出的方式，而不是走 MCP 协议，原因在于 MCP 的协议帧在一次 20 条命令的浏览器会话中会白白消耗 3 到 4 万个 token。

**遭遇 CAPTCHA / MFA 的处理：** 遇到验证码、登录墙或 MFA 时，用 `$B handoff` 可以打开一个可视 Chrome，并带着所有 cookies 和标签页跳转到当前页面，手动处理完毕后告知 Claude，再用 `$B resume` 从原处继续。如果 AI 连续失败 3 次，它自己也会建议触发这个移交流程。

**认证 session 的两种方式：** 要么在有头浏览器里手动登录一次（session 会持久保留），要么用 `/setup-browser-cookies` 从本机 Chrome/Arc/Brave/Edge 导入 cookies。

**命名注意：** 在启用了 `--prefix` 模式的安装里，命令名会变为 `/gstack-connect-chrome`，这一点在脚本里有明确处理，不同团队的安装配置可能不同。

### 安全类

#### `/guard` 

`/guard` 是 gstack 的**全量安全模式（Full Safety）**，一条命令同时激活 `/careful` 和 `/freeze` 两套机制，专为接触生产环境或调试线上系统设计。

两套机制各自负责不同的防护维度：

`/careful` 负责在破坏性命令执行前发出警告（`rm -rf`、`DROP TABLE`、`force-push`），是一个软性拦截（Warning）；`/freeze` 则把文件编辑硬性锁定在单一目录内，是一个硬性阻断（Hard Block），而不仅仅是警告。

这套机制通过 Claude Code 的 PreToolUse hooks 实现，完全透明，仅作用于当前 session，无需任何配置文件。

`/guard` 激活后，session 中同时运行着两层拦截：命令执行层（bash 层面）和文件系统写入层（Edit/Write 工具层面），把"误执行危险命令"和"误改不相关代码"这两个独立风险同时堵死。

---

和 `/careful` 一样，`/guard` 是**横跨全流程的 Power Tool**，没有固定阶段归属，但根据设计意图有两个高频场景：

生产环境操作时使用，是"触碰 prod 或调试线上系统"时的最大安全保障。在 **Ship → Reflect** 阶段（部署、回滚、线上排查）最为关键，此时一个误操作的代价远高于开发阶段。

在并行 sprint 场景下（同时运行多个 Claude Code session），也适合在每个 session 启动时加上 `/guard`，防止不同 session 的写操作相互干扰。

---

**产出结果**

`/guard` 激活后，session 具备以下两类产出：

一是**命令警告流**。每当 AI 准备执行破坏性 Bash 命令时，会在执行前暂停并向你确认，常见构建产物清理（`rm -rf node_modules`、`dist`、`.next` 等）在白名单内不触发警告，日常工作不受打扰。

二是**文件写入的硬性边界**。`/freeze <目录>` 部分生效后，所有 Edit 和 Write 操作在指定目录外都被直接阻断，而不仅仅是弹出警告。比如 `/guard src/billing` 之后，AI 只能修改 `src/billing` 目录内的文件，其他任何地方都碰不了。

三个安全 skill 形成梯度：

`/careful` 只管命令层警告；`/freeze` 只管文件写入的硬性锁定；`/guard` 是两者合体。`/unfreeze` 解除目录边界，但 hooks 仍驻留 session，执行后再调用 `/freeze` 可重新设立新边界。

---

**使用注意事项**

**激活时需要指定目录：** `/guard` 内部包含 `/freeze`，后者需要一个目录路径参数。建议写成 `/guard src/payment` 这样明确指定要保护的工作范围，否则 `/freeze` 部分的覆盖区域不明确。

**仅限当前 session 有效：** PreToolUse hooks 是 session 级别的，关掉 Claude Code 重开后自动失效，生产操作前每次都需要重新激活。

**警告可以 override，锁定不可以：** `/careful` 部分的命令警告在你确认后可以放行，但 `/freeze` 部分是硬性阻断，没有 override 选项——要改边界外的文件，只能先 `/unfreeze`，改完再 `/freeze`。

**`/investigate` 不会自动激活 `/careful`：** `/investigate` 在调试时会自动 freeze 到被调试的模块，但不会自动加命令级别的警告。如果在线上系统调试，需要手动加 `/guard` 而不只是依赖 `/investigate` 自带的目录锁定。

**并行 session 下优先用 `/guard` 而非单独 `/careful`：** 多个 session 同时运行时，某个 session 的 AI 可能因为上下文漂移而误写其他模块，`/careful` 挡不住这个问题，只有 `/freeze`（或 `/guard`）的硬性边界才能防范跨目录的意外写入。

#### `/careful` 

`/careful` 是一个 **安全护栏（Safety Guardrails）**工具——在执行任何破坏性命令之前发出警告，包括 `rm -rf`、`DROP TABLE`、`force-push`、`git reset --hard` 等。所有警告都可以被人工覆盖（override）。

它通过 Claude Code 的 **PreToolUse hooks** 实现拦截——完全透明、仅作用于当前 session，无需任何配置文件。

每一条 Bash 命令在执行前都会被检测，对照已知危险模式进行匹配。常见构建产物的清理操作（如 `rm -rf node_modules`、`dist`、`.next`、`pycache`、`build`、`coverage`）被列入白名单，不会触发误报。

本质上是一个**拦截层**，不是访问控制，不会阻止你操作——它在有风险的命令执行之前插入一个"你确认吗"的停顿，让 AI 不会在没有人类确认的情况下盲目执行高风险操作。

在 gstack 的 **Think → Plan → Build → Review → Test → Ship → Reflect** 流程中，`/careful` 是一个**横跨全程的 Power Tool（安全层）**，没有固定归属于某一阶段。它可以在任意阶段激活：

`/guard`（即 `/careful` + `/freeze` 的组合）特别适用于**触碰生产环境或调试线上系统**的场景。`/investigate` 在调试时会自动激活 `/freeze`（目录级锁定），通常也会配合 `/careful` 使用。

---

**产出结果**

`/careful` 的产出是**警告提示（Warning）**，而不是硬性阻断（Hard Block）。相比之下，`/freeze` 是硬性阻断文件编辑，两者有本质区别：`/careful` 是告警，`/freeze` 才是锁死。

具体来说，session 中的每条高风险 Bash 命令在执行前都会收到一次确认提示，由人工判断是否放行。白名单内的清理命令（如删 `node_modules`）不在此列，避免日常工作被打扰。

三个安全相关的 skill 形成了一个层级体系：

`/careful` 负责破坏性命令警告，`/freeze` 把文件编辑限制在单一目录并硬性阻断范围外的写操作，`/guard` 是两者的合体，一次激活全部安全措施，适合生产环境操作。`/unfreeze` 解除 `/freeze` 的边界，但 hooks 仍然保留在 session 中，只是放开所有路径，需要再次 `/freeze` 才能重新设立边界。

---

**使用注意事项**

**激活方式很灵活：** 不仅可以输入 `/careful` 命令，也可以直接说"be careful"或"进入安全模式"，gstack 的技能路由会自动识别并调用它。

**作用范围仅限当前 session：** `/careful` 通过 PreToolUse hooks 工作，这些 hooks 是 session 级别的，退出 Claude Code 再重进就失效，每次需要保护时都要重新激活。

**是护栏，不是门禁：** 所有警告都可以被覆盖（override）。它的设计哲学是"事故预防"而不是"访问控制"，不要指望它能替你强制执行权限策略。

**单独用不够时升级到 `/guard`：** 如果场景是接触生产数据库、调试线上问题，或者在并行 session 中操作共享资源，应该直接用 `/guard` 而不是单独的 `/careful`，因为后者不限制文件编辑范围，AI 仍然可能悄悄改动不相关的代码。

**与 `/investigate` 配合：** 如果你在用 `/investigate` 调试某个模块，该 skill 会自动对编辑目录上 `/freeze`，但不会自动加 `/careful`，如果同时想要命令级拦截，需要手动激活。

#### `/freeze` 

`/freeze` 通过 Claude Code 的 PreToolUse hook 把所有文件编辑（Edit 和 Write 工具）锁定在指定目录内，边界外的修改请求会被**硬拒绝**（hard deny），而不是警告后等待确认。这是调试时防止 Claude 意外"修复"不相关代码的事故预防机制。

---

`/freeze` 属于 **安全防护（Safety Guardrails）层**，是一个横跨所有阶段、按需激活的编辑范围控制工具，不属于特定的开发流程阶段。

在 gstack 的安全三件套里，三个 Skill 的关系如下：

```Plain Text
/careful   →  拦截破坏性命令（rm -rf、DROP TABLE、force-push）
/freeze    →  锁定文件编辑范围到指定目录
/guard     →  /careful + /freeze 同时激活（最高安全级别）
```

`/investigate` 在调试时会**自动激活** `/freeze`，自动检测被调试的模块并把编辑范围锁定到那个目录，不需要用户手动运行。

---

**工作原理**

**底层机制：PreToolUse Hook**

`/freeze` 和 `/unfreeze` 通过 Claude Code 的 PreToolUse hook 实现——透明、session 级作用域、无需配置文件，对现有工作流零干扰。

**状态存储**

freeze 的边界目录路径存储在 `~/.claude/freeze-dir.txt`（或 `$CLAUDE_PLUGIN_DATA/freeze-dir.txt`）状态文件里。PreToolUse hook 在每次 Edit/Write 工具调用之前读取这个文件，判断目标路径是否在允许范围内。

**执行逻辑**

```Plain Text
用户说 "帮我修复 src/billing 里的 bug"
    ↓
/freeze src/billing（写入 freeze-dir.txt）
    ↓
Claude 尝试编辑 src/billing/InvoiceService.java → 允许
Claude 尝试编辑 src/auth/UserService.java     → 硬拒绝
Claude 尝试编辑 src/payment/PayController.java → 硬拒绝
```

---

`/freeze` 没有文件类产出，它的产出是**会话级的行为约束**：

在 freeze 激活期间：

- 目录边界内的 Edit/Write：正常执行
- 目录边界外的 Edit/Write：立即被 PreToolUse hook 硬拒绝，并告知原因
- 读取类工具（Read、Grep、Glob）：**不受限制**，仍可读取任意路径（只锁写，不锁读）

运行时输出示例：

```Plain Text
Freeze boundary set: src/billing
All Edit and Write operations outside this path are now blocked.
```

---

Safety 三件套对比

| **Skill** | **机制** | **拦截方式** | **典型场景** |
|-|-|-|-|
| /careful | PreToolUse hook | 警告 + 等待确认，可 override | 生产环境操作、跑破坏性命令时 |
| /freeze | PreToolUse hook | 硬拒绝，不可 override | 调试特定模块，防范围扩散 |
| /guard | 两者同时激活 | 两种拦截都生效 | 最高安全，生产环境调试 |

`/careful` 和 `/freeze` 的核心区别：`/careful` 是**警告门控**，你可以说 "proceed" 继续执行；`/freeze` 是**硬拒绝**，没有 override，要解除必须主动跑 `/unfreeze`。

`/unfreeze` 清除 `/freeze` 设置的边界，允许所有目录的编辑恢复正常。但注意：hook 本身仍然在 session 里保持注册状态，只是因为状态文件不存在而放行所有请求。如果想再次设边界，直接跑 `/freeze <目录>` 即可，不需要重新注册 hook。

---

**使用注意事项**

**这是硬拒绝，没有 override**

`/careful` 的警告可以被 "proceed" 或 "yes" 覆盖，但 `/freeze` 的边界外拒绝**没有 override 机制**。如果 Claude 在修复过程中需要修改边界外的文件（比如一个 bug 的修复链路跨了两个模块），必须先跑 `/unfreeze`，再扩展边界重新 `/freeze`，或者干脆 `/unfreeze` 后手动审查改动。

**只锁写，不锁读**

`/freeze src/billing` 只阻止对 `src/billing/` 以外路径的写入，不阻止读取。Claude 仍然可以 `Read`、`Grep`、`Glob` 任意文件来理解上下文，这是有意为之——调试通常需要跨模块阅读来理解依赖关系，但实际修改应该严格在目标模块里。

**`/investigate` 会自动激活，无需手动跑**

使用 `/investigate` 调试 bug 时，它会自动检测正在调试的模块并 freeze 到那个目录。如果你已经在用 `/investigate`，不需要额外手动跑 `/freeze`——除非你想指定一个与 `/investigate` 自动检测不同的目录范围。

**session 结束后自动失效**

`/freeze` 的作用域是当前 Claude Code session。session 结束后，hook 注册消失，状态文件会随之清理，下次开新 session 不会继承上次的 freeze 边界。不需要担心"忘了 unfreeze 影响下次使用"的问题。

**freeze 边界是单个目录**

`/freeze` 目前只支持指定单个目录路径作为边界，不支持多路径白名单或 glob 模式。如果你的修复涉及两个相关模块（如游戏账号平台的 `src/trade/` 和 `src/account/`），只能选择其中一个，或者 `/unfreeze` 后换成 `/careful` 模式，用警告代替硬拒绝。

**与 `/guard` 的选择**

生产环境调试时，推荐直接用 `/guard` 而不是单独跑 `/freeze`——它同时激活了 `/careful`（拦截破坏性命令）和 `/freeze`（锁定编辑范围），是最完整的安全组合，一条命令搞定。

#### `/unfreeze` 

`/unfreeze` 清除 `/freeze` 设置的编辑边界，让所有目录的文件编辑恢复正常。

与 `/freeze` 相同，属于**安全防护层**，是 `/freeze` 的配套解除命令，随时可调用。

---

**工作原理**

实现非常简单：读取 `$CLAUDE_PLUGIN_DATA/freeze-dir.txt`（或 `~/.gstack/freeze-dir.txt`），如果存在就删掉它并告知之前锁定的路径；如果不存在就提示"没有设置任何 freeze 边界"。

无文件类产出，仅输出运行时状态消息：

```Plain Text
Freeze boundary cleared (was: src/billing). Edits are now allowed everywhere.
```

或：

```Plain Text
No freeze boundary was set.
```

---

**使用注意事项**

**Hook 仍然在 session 里保持注册**

运行 `/unfreeze` 后，`/freeze` 的 PreToolUse hooks 仍然在 session 里保持注册状态，只是由于状态文件不存在而放行所有请求。这对用户完全透明，不需要任何额外操作。

**想重新设边界直接跑 `/freeze <新目录>`**

`/unfreeze` 后如果想切换到一个新的边界目录，直接跑 `/freeze <新路径>` 即可，不需要重新注册 hook。

**session 结束后自动清理**

freeze/unfreeze 的状态是 session 级的，session 结束后状态文件自动清理，不会影响下一次会话。所以如果你忘了跑 `/unfreeze` 而直接关闭 session，下次开新 session 时边界已经自然消失了。

**触发词**

使用场景包括"unfreeze"、"unlock edits"、"remove freeze"、"allow all edits"，当你想在不结束 session 的情况下扩大编辑范围时使用。

### 补充类

#### `/pair-agent` 

`/pair-agent` 是跨厂商多 AI Agent 共享浏览器的协调工具：你在 Claude Code 里运行一条命令，GStack Browser 窗口打开，Skill 打印出一块连接指令，把这块指令粘贴进另一个 Agent 的 chat，对方就能在同一个浏览器里获得独立的 Tab，各自并行工作，互不干扰。

---

`/pair-agent` 属于**多 Agent 协作层**，是一个横跨所有阶段的能力扩展工具，不属于某个特定的开发流程阶段。它解决的问题是：当你有多个不同厂商的 AI Agent 需要同时操作浏览器时，如何安全、有组织地共享同一个浏览器实例。

典型使用场景：

```Plain Text
Claude Code（主 Agent）  →  /pair-agent  →  GStack Browser 启动
                                                ↓
                              其他 Agent（OpenClaw / Codex / Hermes / Cursor）
                              粘贴 pair block → 各自独立 Tab → 并行浏览
```

---

**工作原理与认证流程**

**双监听器架构（Dual-Listener）**

`/pair-agent` 激活 ngrok tunnel 时，browse daemon 会绑定两个独立的 HTTP socket：本地监听器（`127.0.0.1:LOCAL_PORT`，完整命令面，永远不对外转发）和 Tunnel 监听器（`127.0.0.1:TUNNEL_PORT`，只开放限定白名单）。ngrok 只转发 Tunnel 端口。

Tunnel 监听器只开放三个路径：`/connect`（配对握手，无需 auth + 有速率限制）、`/command`（仅限 Scoped Token + 17 条浏览器驱动命令白名单）、`/sidebar-chat`。其他所有路径一律返回 404。

**配对握手流程（Pairing Ceremony）**

整个连接过程是：GStack Browser 启动 → Skill 打印包含 `SESSION_ID`、`TOKEN`、`URL` 的 Pair Block → 你把这段 block 粘贴进另一个 Agent 的 chat → 对方用一次性 Setup Key 换取 Session Token → 创建独立的浏览器 Tab → 开始独立浏览。

**同机与远程两种路径**

同机 Agent（比如同一台 Mac 上的 Codex CLI 和 Claude Code）走零摩擦捷径，直接把凭据写入文件系统，无需 ngrok。远程 Agent（完全不同机器）则通过 ngrok tunnel 连接，只要 ngrok 已安装就会自动启动 tunnel。

---

**产出结果**

**可见产物：Pair Block 指令**

```Plain Text
---BEGIN PAIR BLOCK---
SESSION_ID: abc-123
TOKEN: scoped_token_xyz
URL: http://localhost:9222
---END PAIR BLOCK---
```

**运行时产物：多 Agent 共享浏览器视图**

你在 GStack Browser 里能看到多个 Tab：Claude Code 用的 Tab、另一个 Agent 用的 Tab，每个 Agent 各自独立工作，你实时观察所有操作。

**安全日志**

Tunnel 面的所有拒绝请求（路径不在白名单、Root Token 尝试走 tunnel、缺少 Scoped Token、命令不在 17 条白名单里）都异步写入 `~/.gstack/security/attempts.jsonl`，包含时间戳、来源 IP、路径、方法，速率上限 60 条/分钟。

---

**安全设计细节**

这是 `/pair-agent` 最核心的技术价值：

**Scoped Token**：其他 Agent 拿到的是权限受限的 Scoped Token，而不是 Root Token。Root Token 走 Tunnel 直接返回 403。Scoped Token 只能操作该 Agent 自己的 Tab。

**Tab 隔离**：每个 Agent 在各自独立的 Tab 里操作，无法访问其他 Agent 的 Tab 内容，也无法干扰其他 Agent 的操作。

**速率限制**：Tunnel 接入有速率限制，防止被恶意调用或意外触发大量请求。

**物理端口隔离**：安全边界来自物理端口分离，而不是请求头检测（`x-forwarded-for`、`origin` 等头部检测不可靠，因为 ngrok 行为会变化，本地代理也能添加这些头）。Tunnel 调用者无法访问 `/health` 或 `/cookie-picker`，因为这些路径根本不存在于 Tunnel socket 上。

---

**注意事项**

**ngrok 是远程连接的前置条件**

同机 Agent 不需要 ngrok，直接写凭据到文件系统。但如果目标 Agent 在另一台机器上（比如云端的 Codex 环境），需要本地已安装 ngrok 且账号已认证，`/pair-agent` 会自动检测并启动 tunnel，检测不到 ngrok 则只能支持同机模式。

**有一个已知 Bug 已修复：tunnel 15 秒掉线**

之前版本里 pair-agent 的 tunnel 会在 15 秒后断开，原因是 browse server 在监控父进程 PID，CLI 退出后 server 会自行终止。现已修复：pair-agent session 会禁用父进程看门狗，server 和 tunnel 保持存活直到你显式停止。如果你在用旧版本遇到此问题，`/gstack-upgrade` 更新即可。

**17 条命令白名单限制了 Scoped 能力**

配对的 Agent 通过 Tunnel 只能执行 17 条浏览器驱动命令（`goto`、`click`、`fill`、`screenshot` 等基础操作），无法调用需要 Root Token 的完整命令面（如 `cookies` 命令、`/cookie-picker`、`/inspector` 等敏感操作）。这是有意的设计，防止配对的外部 Agent 访问到本地浏览器的敏感数据。

**Pair Block 是一次性的**

Pair Block 里的 Setup Key 是 one-time 的，用一次就失效。如果粘贴进另一个 Agent 后连接失败，需要重新跑 `/pair-agent` 生成新的 Pair Block。不要把 Pair Block 存下来反复使用。

**你是监控者，也是协调者**

`/pair-agent` 不是让 Agent 完全自主协作——它是"你能看到所有人在做什么"的可观测多 Agent 模式。GStack Browser 有头模式让你实时看到每个 Agent 的操作。如果某个配对的 Agent 做了你不认可的事，你随时可以关掉对应 Tab 或终止 tunnel。

**敏感数据的隔离**

配对的外部 Agent 无法访问 `/cookie-picker` 和 `/health`（都在本地监听器，不在 Tunnel 上），因此它无法窃取你浏览器里的 Cookie。但它能看到它自己 Tab 里的所有页面内容，包括那个 Tab 里渲染的任何 HTML，所以不要让配对的 Agent 的 Tab 里加载含敏感数据的页面（如你的内部后台系统）。

#### `/context-restore` 

`/context-restore` 是 gstack 的**会话状态恢复工具**，是 `/context-save` 的对应另一半。当 Claude Code 崩溃、上下文切换、或者你换了一个新 session 继续之前的工作时，用它把 AI 拉回到之前中断的状态，快速重建"我们在哪、做了什么、还剩什么"这三个关键问题的答案。

`/context-restore` 读取两类来源来重建 session 状态：一是 `/context-save` 写入的 markdown 文件，存放在 `~/.gstack/projects/$SLUG/checkpoints/`；二是当前分支上 WIP commits 里的 `[gstack-context]` 块，这是 continuous checkpoint mode 下自动写入 git log 的结构化数据。

这两条轨道并行运行，互相补充：markdown 文件是显式保存点，git log 里的 WIP commits 是 continuous mode 的隐式记录流。

`[gstack-context]` 的数据结构

要理解 `/context-restore` 能恢复什么，先要看它读的原始数据长什么样：

每个 WIP commit 的结构是：

```Plain Text
WIP: <简洁描述本次变更>
[gstack-context]
Decisions: <本步骤做的关键决策>
Remaining: <逻辑单元里还剩什么>
Tried: <值得记录的失败方案>（无则省略）
Skill: <正在运行的 skill 名>
[/gstack-context]
```

`/context-restore` 解析当前分支上所有 WIP commits 的这些块，把它们串联成完整的推理线索。

---

`/context-restore` 是**横跨全流程的基础设施 skill**，没有固定阶段归属，但有非常明确的两个触发场景：

一是**会话中断后重新开始**，在崩溃、网络中断、或主动关闭 Claude Code 之后重开 session，第一件事就是 `/context-restore`，让新 session 快速获知前一个 session 的决策记录和待完成工作。二是**在 10-15 个并行 sprint 场景中切换工作流**，从一个分支上的任务切换到另一个分支时，用 `/context-restore` 快速恢复对应分支的上下文，不需要重新读代码才能记起"上次在做什么"。

---

**产出结果**

执行 `/context-restore` 后，Claude 会综合所有可用来源，向你报告当前状态的完整摘要，包括：已完成的工作（哪些文件被修改、哪些功能完成）、当前仍未解决的问题或待完成的任务（`Remaining` 字段）、之前尝试过但失败的方案（`Tried` 字段，避免重复走弯路）、正在执行的 skill 名称（`Skill` 字段）、以及相关的关键决策记录（`Decisions` 字段）。

会话状态以可读的纯文本 markdown 格式保存在 `~/.gstack/projects/$SLUG/checkpoints/`，可以在任何编辑器里打开，也可以在机器间传递。

**与整个 checkpoint 体系的关系**

`/context-restore` 是这个体系的消费侧，另外两个组成部分是：`/context-save`（手动显式保存点），以及 continuous checkpoint mode（`gstack-config set checkpoint_mode continuous`，自动在每个完成的逻辑单元后写入 WIP commit）。

与这个体系形成闭环的还有 `/ship`：在发 PR 前，`/ship` 通过 `git rebase --autosquash` 把所有 WIP commits 过滤压缩成干净的 bisectable commits，这样最终 PR 里看不到中间过程的 WIP 记录，但 `/context-restore` 在此之前一直可以读取这些记录。

---

**注意事项**

**`/context-restore` 能恢复的内容取决于之前保存了什么。** 如果之前用的是默认的 explicit checkpoint mode（不自动写 WIP commits），且没有手动运行过 `/context-save`，那 `/context-restore` 能恢复的内容就很有限——只有 git 历史和 CLAUDE.md 等文件可以读取，但没有结构化的决策记录。如果想让 `/context-restore` 真正有价值，需要提前开启 continuous checkpoint mode 或养成用 `/context-save` 的习惯。

**continuous checkpoint mode 默认只写本地，不触发 CI。** Push 是 opt-in 的，默认不推送到远程，因为推送 WIP commits 可能触发 CI、部署、或暴露尚未完成的代码。只有设置 `checkpoint_push=true` 时才会 push。如果在并行 sprint 场景（多台机器或多个 Conductor workspace）下希望 `/context-restore` 能跨机器使用，需要显式开启 push。

**WIP commits 不应该有已知失败的测试。** continuous mode 下的规则是：不能在测试已知失败的状态提交，不能在文件编辑到一半时提交，永远不能用 `git add -A`，只 stage 你有意修改的文件。违反这些规则的 WIP commit 会产生误导性的上下文，让 `/context-restore` 恢复出错误的"当前状态"。

**`/ship` 会清理 WIP commits，之后就读不到了。** `/ship` 运行后会 filter-squash 所有 WIP commits，PR 里只剩下干净的提交记录。如果你在 `/ship` 之后还想知道当时的决策过程，唯一的参考就是 markdown checkpoint 文件，WIP commits 已经不在了。

**激活触发词包括自然语言。** 路由规则里，"resume"、"restore"、"where was I"这类短语都会自动触发 `/context-restore`，不需要精确记住 skill 名称。

#### `/learn` 

`/learn` 是 gstack 的**记忆管理界面**——让你看到、搜索、修剪和导出 gstack 跨 session 自动积累的项目级知识库。

它管理 gstack 跨 session 学到的项目特定模式、陷阱和偏好，这些 learnings 随 session 累积，使 gstack 对你的代码库越来越熟悉。

理解 `/learn` 的关键在于搞清楚整套学习机制的工作方式：gstack 的每个 skill（`/review`、`/office-hours`、`/qa`、`/investigate` 等）在完成工作流后都会自动向 `gstack-learnings-log` 写入发现，`/learn` 是**查阅和管理这个知识库**的唯一入口。

---

**数据结构**

每条 learning 的 JSON 结构包含：`skill`（来源 skill 名）、`type`（类型）、`key`（短键名）、`insight`（描述）、`confidence`（置信度 1-10）、`source`（来源方式）、`files`（关联文件路径列表）。类型分为六种：`pattern`（可复用方案）、`pitfall`（反模式/不该做的事）、`preference`（用户明确偏好）、`architecture`（架构决策）、`tool`（库/框架洞察）、`operational`（项目环境/CLI/工作流知识）。来源分为四种：`observed`（AI 在代码中发现）、`user-stated`（用户明确告知）、`inferred`（AI 推断）、`cross-model`（Claude 和 Codex 双方都认同）。置信度规则：代码中验证的 observed 模式是 8-9 分，不确定的推断是 4-5 分，用户明确陈述的偏好是 10 分。`files` 字段记录关联文件路径，用于过期检测——如果这些文件被删除，该条 learning 会被标记为可能过时。

**各 skill 如何自动写入 learnings**

每个 skill 完成工作流后，如果发现了持久的项目特性或命令修正，且这个发现"能在未来 session 中节省 5 分钟以上"，就会调用 `gstack-learnings-log` 写入记录。不记录显而易见的事实或一次性瞬态错误（网络抖动、速率限制）。

还有一类特殊记录：当第一性原理推理与传统做法相悖时，会产生"Eureka"洞察，写入 `~/.gstack/analytics/eureka.jsonl`，这些洞察代表真正的架构发现，会在后续 review 中被主动提及。

**learnings 如何被其他 skill 消费**

这是整个机制的价值所在。每个 skill 在开始分析前都会先调用 `gstack-learnings-search` 检索相关 learnings：

当某条 review 发现与历史 learning 匹配时，会在输出中明确展示："Prior learning applied: [key] (confidence N/10, from [date])"，让复利效应对用户可见——gstack 正在越来越了解你的代码库。

---

`/learn` 是**横跨全流程的基础设施 skill**，没有固定阶段归属，但有两个典型使用时机：

在 **Reflect（回顾）** 阶段，即 `/retro` 之后，用来审查本轮 sprint 积累了哪些新知识，清理可能过时的条目。在**新 session 开始前**，快速了解 gstack 对当前项目掌握了哪些背景，判断是否需要补充关键偏好或删除错误推断。

**产出结果**

运行 `/learn` 后的典型输出示例：展示项目的 23 条 learnings（14 条高置信度、6 条中等、3 条低置信度），列出顶部模式如"API 响应总是包在 `{ data, error }` 信封里 [9/10]"、"测试使用 `test/support/factories.ts` 的工厂辅助函数 [8/10]"、"所有 DB 查询通过 repository 模式，从不直接访问"，并列出 3 条可能过时的条目（引用文件已被删除），询问是否要修剪。

具体来说，`/learn` 提供四项操作能力：查看（列出全部 learnings，按置信度分组）、搜索（按关键词检索特定模式）、修剪（清除关联文件已不存在的过时条目）、导出（将 learnings 输出为可共享格式用于团队同步）。

---

**注意事项**

**`/learn` 本身不写入任何 learning，只是管理界面。** 知识是由其他 skill 在工作流结束时自动写入的，`/learn` 只负责展示和管理。如果你想手动增加一条知识，需要直接调用 `gstack-learnings-log` CLI，或者在 session 中告知 Claude 某个偏好（`user-stated` 类型会以 10/10 置信度写入）。

**`cross_project_learnings` 开关要按需设置。** gstack 可以搜索你本机其他项目的 learnings，寻找可迁移的模式，完全本地运行，不离开机器。适合独立开发者；如果你同时服务多个客户的代码库，建议关闭，避免项目间知识污染。

**定期修剪过时条目很重要。** learnings 通过关联的 `files` 字段做过期检测。代码重构、文件重命名、模块删除后，相关 learnings 可能引用了不再存在的路径，`/learn` 会列出这些候选条目供你清理。不清理会导致其他 skill 加载到无效的上下文。

**学习效果随使用时间累积，新项目初期效果有限。** gstack 的记忆系统需要跑过几轮完整的 skill 工作流才能积累到有价值的知识密度。新项目前几次 session 的 `Prior learning applied` 提示会很少，这是正常的——越用越准是系统的设计意图，而不是 bug。

**learnings 可通过 GBrain sync 跨机器同步。** gstack 的 GBrain memory sync 功能可以把 learnings 在内的 gstack 状态（含 CEO 计划、设计文档、回顾记录、开发者档案）推送到私有 git 仓库，让记忆跟着你跨机器流动，且内置 secret 扫描器拦截 AWS key、token、PEM、JWT 等敏感数据外泄。默认关闭，按需开启。

#### `/setup-gbrain` 

`/setup-gbrain` 是 GBrain 的一键引导工具：从零开始，五分钟内完成 gbrain 安装、数据库初始化、MCP Server 注册（让 Claude Code 能直接调用 `gbrain search`、`gbrain put_page` 等命令），以及 per-repo 的读写权限策略配置。GBrain 本身是 AI Agent 的持久化知识库，可以理解为"你的 Agent 真正能在 session 之间保留的记忆"。

---

`/setup-gbrain` 属于**基础设施配置阶段**，是一次性的环境准备工具，不属于任何特定的开发流程阶段。它和 `/setup-deploy`、`/setup-browser-cookies` 同属配置类 Skill，跑一次之后所有后续 session 都能受益。

在 gstack 生态里，GBrain 为其他 Skill 提供"记忆"服务：

```Plain Text
/setup-gbrain（一次性配置 GBrain）
    ↓
GBrain 激活后，每个 Skill 运行结束时自动同步学习记录到 GBrain
    ↓
下一个 Skill 启动时自动检索历史决策、失败方案、项目偏好
```

---

**三条安装路径**

`/setup-gbrain` 启动后只问你一个核心问题："你的 brain 放在哪里？"共三条路径：

**路径 1：Supabase 已有连接字符串**

适合场景：你或团队的云 Agent 已经创建了一个 Supabase brain，现在这台机器想接入同一份数据。操作方式：粘贴 Session Pooler URL（Supabase Settings → Database → Connection Pooler → port 6543），Skill 用 echo-off 读取，显示脱敏预览（host 可见，password 遮蔽），通过 `GBRAIN_DATABASE_URL` 环境变量传给 `gbrain init`，URL 永远不会出现在 argv 或 shell history 里。

**路径 2：Supabase 自动创建新项目**

适合场景：想要云端 brain，但还没有 Supabase 项目。操作：粘贴 Supabase Personal Access Token，Skill 通过 Management API 自动创建项目，轮询到 healthy 状态，获取 Session Pooler URL 并传给 `gbrain init`，全程约 90 秒。

**路径 3：PGLite 本地**

适合场景：想先试用，零账号零网络。PGLite 是嵌入式 Postgres，无需任何服务器，数据存在 `~/.gbrain/brain.pglite`，约 30 秒完成。只在这台 Mac 上可用，想切换到云端用 `/setup-gbrain --switch` 即可无损迁移。

---

**工作流程**

**Step 1：检测现有状态**

Skill 首先检测机器上的现有状态（是否已安装 gbrain、是否已有 brain、是否已注册 MCP），已完成的步骤直接跳过，不重复执行。

**Step 2：安装 gbrain**

如果 gbrain CLI 不在 PATH 里，会引导安装。

**Step 3：选路径 + 初始化**

根据你的选择执行对应的 `gbrain init` 命令，完成数据库初始化（schema 建立、embedding 引擎配置）。

**Step 4：注册为 MCP Server**

初始化完成后，Skill 会询问是否把 gbrain 注册为 Claude Code 的 MCP Server（`claude mcp add gbrain -- gbrain serve`），注册后 Claude Code 就能直接调用 `gbrain search`、`gbrain put_page` 等命令，Agent 读写自己的 brain 不再需要 shell out。

**Step 5：per-repo 读写权限策略（Trust Triad）**

每个 repo 都有独立的三选一权限策略，存储在 `~/.gstack/gbrain-repo-policy.json`（mode 0600）：`read-write`（Agent 能搜索也能写入，最常用）；`read-only`（只能搜索，不能写入，适合多客户场景，防止不同客户 A 的工作污染客户 B 的 brain）；`deny`（完全禁止该 repo 访问 brain）。

---

**产出结果**

**已配置的 gbrain 环境**：`~/.gbrain/config.json`（engine、database URL/路径、API keys，mode 0600），以及数据库 schema 已建立、embedding 引擎已就绪。

**MCP 注册**：`claude mcp add gbrain -- gbrain serve` 完成后，Claude Code 能直接通过 MCP 调用 gbrain 的所有命令。

**per-repo 权限文件**：`~/.gstack/gbrain-repo-policy.json`（schema v2，mode 0600），记录每个 git remote 对应的读写权限模式。

**GBrain 与 gstack 的协作效果**：gstack 与 gbrain 协作后，每个 Skill 运行结束时会通过 `gstack-brain-sync` 把学习记录（learnings JSONL）、设计文档、计划产物、retro 数据同步进 brain。下一个 Skill 启动时会先 `gbrain search` 检索相关历史，让 Agent 在每个新 session 里都能带着项目上下文工作，而不是每次从零开始。

---

**注意事项**

**这是一次性配置，但可以切换 backend**

先用 PGLite 试用，之后想切到 Supabase 可以运行 `/setup-gbrain --switch`，Skill 执行 `gbrain migrate --to supabase --url "$URL"`（包在 180 秒 timeout 里），迁移是双向且无损的：pages、chunks、embeddings、links、tags、timeline 全部迁移。原始 brain 保留为备份。

**Supabase Personal Access Token 只在 setup 期间使用**

PAT 只用于 Management API 调用（创建 Supabase 项目），setup 结束后立即丢弃，不写入磁盘，不出现在 argv 里。CI 里有 grep 测试，如果 `$SUPABASE_ACCESS_TOKEN` 或 `$GBRAIN_DATABASE_URL` 出现在 argv 位置就 fail build。

**Supabase 连接字符串给出了完整读写权限**

粘贴 Session Pooler URL 后，本地 Claude Code 就有了对那个 Supabase 项目里所有 brain 数据的完整读写权限。如果那个 brain 包含团队共享数据，谨慎选择 per-repo 的权限策略，用 `read-only` 保护重要数据不被意外覆盖。

**PGLite 的并发锁冲突**

如果你在多个 Conductor workspace 里同时运行 gstack session，各 session 的 preamble 都会调用 `gstack-brain-sync`，可能对同一个 PGLite 文件产生锁竞争。如果迁移或同步挂住，很可能是另一个 gstack session 正在持有 PGLite 锁，关闭其他 workspace 后重试即可，timeout 是 3 分钟。

**与 "gstack memory sync" 是两个不同的功能**

这是最容易混淆的地方：GBrain（`/setup-gbrain` 配置的）是给 Agent 用的持久化知识库；"gstack memory sync"（通过 `gstack-brain-init` 配置的，把 `~/.gstack/` 推到私有 git repo）是给你自己用的跨机器记忆同步。前者是 Agent 的工作记忆，后者是 gstack state（learnings、CEO plans、设计文档、retros、开发者档案）的跨机同步，两者可以配合使用，但配置路径和目的完全不同。

**GStack 是引擎，GBrain 是 mod**

GStack 提供编码 Skill（ship、review、QA、investigate、office-hours、retro），GBrain 提供记忆、知识检索和运营 Skill（brain ops、信号检测、知识摄入、定时任务、报告）。`hosts/gbrain.ts` 是两者的桥接层，告诉 gstack 的编码 Skill 在动手写代码之前先查 brain。对于日常开发来说，`/setup-gbrain` 配置完之后就不需要再管 GBrain，它作为后台系统自动和 gstack 的 Skill 协作运转。

信息已充分，可以给出完整分析。

---

#### `/gstack-upgrade` 

是 gstack 的**自更新器（Self-Updater）**，一条命令保持 gstack 当前版本，自动检测安装类型（全局安装在 `~/.claude/skills/gstack` 还是 vendored 安装在项目的 `.claude/skills/gstack`），运行升级，如果两种安装都有则同步两份，最后展示更新了什么。

它不仅仅是 `git pull`，还负责在升级完成后执行 `./setup`，重新注册 skill、重建浏览器二进制，并运行存放在 `gstack-upgrade/migrations/` 目录下的迁移脚本，处理磁盘状态变更。

skill 会检测安装类型，分为 global-git、local-git、vendored 三种。对于 git 类安装，执行 `git fetch` 和 `git reset --hard origin/main`，然后运行 `./setup`。

在 team mode 下，`/gstack-upgrade` 会检查 `team_mode` 配置项：team mode 下 vendored 副本会被移除而不是同步，因为全局安装是唯一事实来源。

---

**自动升级机制**

可以在 `~/.gstack/config.yaml` 里设置 `auto_upgrade: true`，完全跳过提示，gstack 会在每次 session 开始时有新版本可用时静默升级。

team mode（`./setup --team`）通过 `SessionStart` hook 自动更新 gstack，限速每小时一次，不在 repo 里 vendor 任何文件。

每个 skill 的 preamble 都会调用 `gstack-update-check`，如果发现有新版本可用，会输出 `UPGRADE_AVAILABLE <old> <new>`，然后按"内联升级流程"处理——如果配置了 auto-upgrade 则自动升级，否则弹出包含 4 个选项的 AskUserQuestion，如果用户选择推迟则写入 snooze 状态。

**迁移脚本机制**

当某次变更修改了磁盘上的状态（目录结构、配置格式、过期文件）且可能破坏已有用户安装时，会在 `gstack-upgrade/migrations/` 里添加迁移脚本，`/gstack-upgrade` 在 `./setup` 之后自动运行这些迁移。

`/gstack-upgrade` 是**贯穿全流程的基础设施 skill**，没有固定阶段归属，但有两个最常见的触发时机：

一是**会话开始前**，preamble 的 `gstack-update-check` 主动检测并提示，在正式开始任何工作流之前完成升级；

二是当**遇到 skill 异常或行为不符合预期时**，作为第一排查步骤——README 的 troubleshooting 章节中，"Stale install"的推荐解法就是 `/gstack-upgrade`，或者设置 `auto_upgrade: true`。

---

**产出结果**

典型的输出：展示当前版本号（如 0.7.4）和最新版本号（如 0.8.2），列出 changelog 中的新增内容（例如"Browse handoff for CAPTCHAs and auth walls"、"/codex multi-AI second opinion"等），完成升级后确认"Upgraded to 0.8.2. Both global and project installs synced."，并在末尾提示可以设置 `auto_upgrade: true` 来跳过未来的确认提示。

除了版本更新外，还会重新运行 `./setup` 以完成 skill 重新注册，执行 `gstack-upgrade/migrations/` 下的迁移脚本，以及在发现仍是 vendored 安装时提示迁移到 team mode。

升级完成后如果是刚刚跳版本，各 skill 在下次运行时还会触发"feature discovery"流程——每个新功能只对每位用户提示一次，不会在每次升级时重复打扰。

---

**注意事项**

**vendored 安装已被废弃，升级时会强制处理。** 如果检测到 vendored 安装（`.claude/skills/gstack/` 在项目里），会弹出一次性提示，询问是否迁移到 team mode，并给出完整的迁移步骤：移除 vendored 目录、加入 `.gitignore`、运行 `gstack-team-init`、提交变更。选择不迁移意味着你需要自行维护 vendored 副本，不会再收到自动更新。

**git reset --hard 会覆盖本地修改。** 对于 git 类安装，升级使用 `git reset --hard origin/main`，这意味着任何对 gstack 目录本身的本地改动都会被丢弃。如果你修改过 gstack 的 skill 文件做了本地定制，升级前需要先备份，或者考虑通过 fork 的方式维护自己的版本。

**`/gstack-upgrade` 不升级 gbrain。** 在 GBrain 相关文档中明确提到：`/gstack-upgrade` 只保持 gstack 自身更新，不独立升级 gbrain。要升级 gbrain，需要更新 `bin/gstack-gbrain-install` 里的 `PINNED_COMMIT` 然后重新运行 `/setup-gbrain`。两者是独立的发布节奏，不要混淆。

**Spawned session 里不会运行升级提示。** 在 OpenClaw 等 orchestrator 派生的子 session 里（`SPAWNED_SESSION = "true"`），feature discovery 和升级提示会被跳过，只打印版本号然后继续工作流。orchestrator 不需要交互式提示，这是设计决策而非 bug。

**team mode 下升级是自动的，每小时限速一次。** 使用 `./setup --team` 安装后，gstack 通过 `SessionStart` hook 自动更新，限速每小时一次，正常使用情况下不需要手动运行 `/gstack-upgrade`，只有在遇到问题时才需要手动触发。

### 命令行

#### `gstack-taste-update` 

> 先说清楚：它是 CLI 工具，不是 Slash Command

`gstack-taste-update` 不是一个用户可以直接调用的 `/xxx` Skill，而是 gstack 内置的一个**独立 CLI 二进制工具**，位于 `~/.claude/skills/gstack/bin/gstack-taste-update`。

gstack 除了 Slash Command Skill 之外，还随附了若干独立 CLI 工具，用于处理不适合在 session 内部运行的工作流。`gstack-taste-update` 就是其中之一，它的职责是：把你在 `/design-shotgun` 里批准和拒绝的 mockup 方案，持久写入每个项目独立的"品味画像（taste profile）"文件，并以每周 5% 的速率衰减旧记录，让 `/design-shotgun` 在下一轮生成时自动向你偏好的方向倾斜。

---

`gstack-taste-update` 属于 **设计迭代（Design Iteration）阶段**，是 `/design-shotgun` 工作流的组成部分，在每次 `/design-shotgun` 完成并收到用户的 Approve/Reject 反馈后自动被调用，用户通常感知不到它的存在。

在 `/design-shotgun` 的完整流程里：

```Plain Text
/design-shotgun（生成 4-6 个 mockup 方案）
    ↓
浏览器比较板（你点 Approve / 留 Feedback）
    ↓
gstack-taste-update（自动调用，写入 taste profile）← 你在这里
    ↓
下一轮 /design-shotgun（读取 taste profile，偏向你的历史偏好）
```

---

**工作原理**

**读取本轮反馈**

每次 `/design-shotgun` 完成后，你在浏览器比较板里的 Approve（批准）和 Reject（拒绝）动作会写入 `approved.json` 和 `feedback.json`。`gstack-taste-update` 读取这些文件，提取你选择了哪些视觉方向、拒绝了哪些模式（比如你拒绝了渐变 Hero、接受了粗体排版黑底白字）。

**写入 per-project taste profile**

这些品味信号写入 `~/.gstack/projects/$SLUG/` 下的持久化 taste profile 文件，按项目隔离，不同项目的偏好互不干扰。

**5% 每周衰减**

`gstack-taste-update` 在写入新记录的同时，对历史记录施加每周 5% 的权重衰减，让旧的偏好逐渐淡出，新的决策有更高权重。这样品味画像会随着项目演进自然更新，而不是无限积累早期的偏好。

**反向影响下一轮生成**

taste profile 被 `/design-shotgun` 在生成新方案时读取，用于构造偏置 prompt，让 AI 更倾向于生成你历史上批准的视觉方向，避免重复生成你已经明确拒绝的模式。

---

**产出结果**

**per-project taste profile 文件**，存储在：

```Plain Text
~/.gstack/projects/{project-slug}/taste-profile.json
```

内容是结构化的偏好信号，包括：批准的视觉方向（粗体排版、深色背景、非对称布局等）、拒绝的模式（渐变 Hero、3 列图标网格、居中堆叠等），以及每条记录的时间戳和衰减权重。

**用户可见的效果**：多轮使用 `/design-shotgun` 之后，生成的方案会越来越贴近你的审美，不需要每次都重复描述"我不喜欢渐变"、"标题要更粗"——taste memory 已经替你记住了。

---

**注意事项**

**通常不需要手动调用**

`gstack-taste-update` 由 `/design-shotgun` 在你完成 Approve/Reject 后自动调用。你不需要也不应该手动运行它，除非在开发 gstack 本身或者排查 taste profile 异常时需要直接调用 CLI。

**只服务于 `/design-shotgun`**

taste profile 的作用范围仅限于 `/design-shotgun` 的下一轮方案生成偏置。它不影响 `/design-review`（视觉审查）、`/design-html`（HTML 生成）或者 `/design-consultation`（设计系统建立）的判断逻辑——那些 Skill 使用的是 `DESIGN.md` 里明确写定的设计系统，而不是模糊的偏好权重。

**每周 5% 衰减意味着偏好会漂移**

如果你在同一个项目里做了一次大的视觉方向调整（比如从深色风格转向浅色极简），旧的深色偏好会以每周 5% 的速率慢慢消退，大约 14 周后降到接近零。这是有意为之的设计——避免早期决策永久绑死后期的方向。但如果你想加速清除旧偏好，可以直接删除 `~/.gstack/projects/{slug}/taste-profile.json` 重置。

**taste profile 是 per-project 的**

不同项目的 taste profile 严格隔离，某个项目偏好深色风格不会污染另一个项目的生成偏好。如果你在同一个项目下的不同子模块有不同的设计风格需求，目前 taste profile 是 project-slug 粒度的，无法做到子模块隔离，需要在 `/design-shotgun` 的 brief 里明确指定风格方向来覆盖 taste bias。

**不是设计决策的权威来源**

taste profile 的作用是生成偏置，不是硬约束。`/design-shotgun` 仍然可能在高权重的情况下生成你"理论上拒绝"的方向，只是概率更低。真正的设计决策权威来源是 `DESIGN.md`，那是 `/design-consultation` 输出的、写死的设计系统定义。

#### `gstack-model-benchmark` 和 `/benchmark-models`

这里存在**两个相关但不同的入口**，需要先厘清：

`gstack-model-benchmark` 是一个**独立 CLI 工具**，把同一个 prompt 同时发给 Claude、GPT（通过 Codex CLI）和 Gemini，比较延迟、token 用量、费用，以及可选的 LLM-judge 质量评分。`/benchmark-models` 是一个 slash skill，把这个 CLI 包装成交互式流程（选 prompt → 确认 providers → 决定是否开 judge → 运行 → 解读结果），适合在 Claude Code 会话里用，解决的是"哪个模型对我的 `/qa` skill 实际上更好"这种需要数据而非感觉的决策问题。

它属于 gstack 在 v0.19 之后推出的**独立 CLI 类工具**，专门处理不适合放在 session 内部的工作流，与 `gstack-taste-update` 属于同一类。

完整的功能集包括：按 provider 自动检测认证（不需要手动配置，有就用没有就跳过）、内置定价表、工具兼容性映射、并行执行（三个 provider 同时跑，不串行等待）、每个 provider 单独错误隔离（一个挂了不影响其他两个）。输出格式支持 table、JSON、markdown 三选一。`--dry-run` 模式验证 flags 和认证是否有效，但不发出任何真实 API 调用，不花钱。可选的 LLM-judge 质量评分通过 Anthropic SDK 调用，每次运行约 \$0.05。

典型触发时机有两个：一是**在项目开始前**，评估针对特定 skill（如 `/qa`、`/review`、`/office-hours`）该用哪个模型，作为工具链选型的决策依据；二是**在持续使用过程中**，当新模型发布、定价变化、或者发现某个 skill 的输出质量下滑时，用数据重新校准选择。

---

**产出结果**

**定量对比表**，覆盖每个 provider 的：延迟（秒）、输入 token 数、输出 token 数、估算费用、以及在开启 `--judge` 时的质量评分（由 Claude 作为裁判打分）。三种格式任选：table 适合人阅读，JSON 适合脚本处理，markdown 适合写入文档或 retro。

**Provider 可用性报告**：对于当前机器上没有安装或没有配置认证的 provider，CLI 会在输出中标注为"unavailable"并附上原因，不会崩溃。

**解读建议（通过 `/benchmark-models` 交互流程时）**：Claude Code 在拿到 CLI 的原始数据后，会结合你的具体 skill 使用场景（你在"选 prompt"步骤里提供的上下文）给出解读，帮助将数字翻译成"对我的场景应该选哪个"的实操结论

---

**注意事项**

**`gstack-model-benchmark` 和 `/benchmark-models` 是两个独立入口，适合不同场景。** CLI 适合脚本化、CI 集成、或需要精确控制参数的场景；skill 适合在 Claude Code 交话时交互式使用。日常使用推荐 skill，脚本化或批量测试推荐 CLI。

**三个 provider 都需要各自的认证配置才能参与对比。** Claude 用 Anthropic API Key，GPT 通过 Codex CLI（需要 OpenAI API Key 且 Codex CLI 已安装），Gemini 需要 Google 的认证。未安装或未配置认证的 provider 会被干净地跳过，不会报错中断整体流程。但如果你只配置了 Claude，就只有一个 provider 参与，没有横向对比的意义。首次使用前务必用 `--dry-run` 验证各 provider 的认证状态。

**`--judge` 模式每次运行约 \$0.05，谨慎批量使用。** LLM-judge 会再调用一次 Claude（Anthropic SDK）来评估三份输出的质量，这意味着额外的 API 费用和延迟。如果只是比较延迟和成本，不需要开 `--judge`；如果要比较输出质量，才值得加上这个 flag。

**prompt 的选择直接决定结论的有效性。** `gstack-model-benchmark` 的结论与具体 prompt 强相关——对 "写 Python 代码" 表现好的模型不一定对 "QA 测试流程" 表现好。要做有意义的决策，应该用你实际工作中那类 prompt（比如截取一段真实的 `/qa` 调用上下文）来测试，而不是用通用 benchmark prompt。

**这是元决策工具，不要过度依赖单次结果。** 模型的表现会随版本、负载、以及具体任务类型波动。单次 benchmark 只能作为参考，重大工具链决策建议多跑几次，取平均值，再结合实际工作中的主观体验综合判断。

## 第三阶段：并行工作流实践（1-2周）

**目标：在真实项目中实践并行sprint管理**

### 3.1 单sprint完整工作流（3天内完成）

典型的Duoli项目场景：游戏账号交易平台功能迭代

```Plain Text
时间    命令                      输出              下一步
10:00   /office-hours           重新定义问题      设计文档draft
10:30   /plan-ceo-review        CEO意见          范围确定
11:00   /plan-eng-review        架构+测试计划     技术ready
11:30   /plan-design-review     设计维度评分      设计规范ready
12:00   代码实现（8分钟）        2400行代码        评审
12:10   /review                 自动修复+问题标记  修复问题
12:30   /qa https://staging     bug发现+修复      回归测试
13:00   /ship                   PR创建，测试验证  CI check
13:30   /land-and-deploy        合并+部署+验证    生产ready
14:00   /canary                 监控部署后表现    反思
18:00   /retro                  周总结            下周计划
```

### 3.2 并行sprint管理（Conductor）

当有10-15个sprint并行时的管理策略：

**并行化关键**：每个sprint应该是独立的，但共享：

- 代码审核标准（都通过/review）
- 安全审计（都通过/cso）
- 设计体系（通过/design-consultation共享规范）
- 测试框架（统一的回归测试套件）

**分布式决策**：CEO不需要看infra bug fix，设计不需要评审后端改造。gstack智能路由，该看的自动选出。

**工作流优化**：

1. 三个人同时运行三个/office-hours（三个新想法）
2. 一个人做/design-consultation（系统级设计）
3. 两个人/review各自的分支
4. 一个人管理所有/qa（QA是最受限制的）
5. 一个人周末运行全局/retro --global

### 3.3 项目级最佳实践

#### A. 技能配置（CLAUDE.md gstack段落）

```Markdown
## gstack
Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: [完整列表]

## 优先级约定
- 新功能必须：/office-hours → /plan-ceo-review → /plan-eng-review → /qa
- bug修复必须：/investigate → /review → /qa
- 安全相关必须：/cso通过才能/ship
- 发布必须：/land-and-deploy → /canary

## 禁止清单
- 跳过/plan-eng-review（架构必须确认）
- /qa发现bug后跳过/investigate（root cause first）
- 无/codex评审的关键路径代码
```

#### B. 分支策略与gstack对应

```Plain Text
main (protected)
├── feature/xxx → /ship → PR → /review + /codex + /cso → /land-and-deploy
├── bugfix/yyy → /investigate → /review → /qa → /ship
└── design/zzz → /design-consultation → /design-review → integration
```

#### C. 并行度管理

- 代码review：可以5个并行（不同feature互不影响）
- QA：最多3个并行（真实浏览器数量有限）
- /design-consultation：串行（系统级决策）
- /cso：串行（安全不能妥协）

---

## 第四阶段：深度定制与扩展（2-4周）

**目标：根据项目特性定制gstack，理解架构和扩展机制**

### 4.1 理解gstack架构

gstack = 28个skill + 3个power tool + 1个决策引擎

**Skill的标准结构**：

```Plain Text
/office-hours
├── SKILL.md              [注册信息、描述、参数]
├── claude.md            [执行提示语，强大的思考链]
├── index.ts             [CLI入口]
├── lib/
│   ├── validate.ts      [输入验证]
│   ├── execute.ts       [核心逻辑]
│   └── format.ts        [输出格式]
└── test/
    └── unit.test.ts     [测试用例]
```

**每个skill的生命周期**：

1. 用户运行 `/office-hours`
2. gstack CLI读取SKILL.md
3. 加载claude.md作为系统提示
4. 执行index.ts的main函数
5. 输出标准格式（Markdown + JSON）
6. 下一个skill读取输出

### 4.2 为游戏账号交易平台定制gstack

#### 场景1：订单流程特定评审

创建 `/order-review` 技能：

```TypeScript
// .claude/skills/gstack/order-review/SKILL.md
name: "order-review"
description: "订单流程的特定评审：支付→到期→退货→争议"
input: "git branch or PR#"
output: "评审报告，标记支付路径完整性"

// claude.md
你是一个游戏账号交易平台的订单安全官。
检查以下关键路径：
1. 支付验证（防欺诈）
2. 交付确认（原子性）
3. 到期处理（自动过期）
4. 退货流程（交易逆转）
5. 争议仲裁（人工干预）

使用STRIDE威胁模型分析每个路径。
```

#### 场景2：Redis cache一致性审计

创建 `/cache-verify` 技能：

```TypeScript
// 检查Redis缓存与数据库一致性
// 特别关注账号交易平台中的热数据：
// - 用户余额缓存
// - 订单状态缓存
// - 黑名单缓存

// 输出物：一致性报告 + 缓存预热脚本
```

#### 场景3：RocketMQ消息顺序性验证

创建 `/message-audit` 技能：

```TypeScript
// 异步消息链：账号转移 → 支付 → 发货 → 确认
// 检查：
// 1. 消息顺序保证（同一账号ID的消息）
// 2. 幂等性（消费重试）
// 3. 死信队列处理
// 4. 消息时序完整性（无丢失）
```

### 4.3 配置项目级CLAUDE.md

```Markdown
## Project Context
这是一个游戏账号交易平台（Spring Boot 3.2 + MyBatis Plus + Redis + RocketMQ）

## gstack定制
- `/order-review`: 订单流程安全审计
- `/cache-verify`: Redis一致性检查
- `/message-audit`: RocketMQ消息链验证

## 必须运行的skill顺序
1. 新功能：/office-hours → /plan-ceo-review → /plan-eng-review → /order-review → /cache-verify → /message-audit → /qa
2. bug修复：/investigate → /order-review → /qa
3. 发布流程：必须通过/cso的支付路径审计

## 禁止项
- 任何修改支付逻辑的PR跳过/cso
- 任何修改缓存的PR跳过/cache-verify
- 任何修改消息队列的PR跳过/message-audit
```

### 4.4 理解gstack的设计决策

#### Decision 1：为什么是slash command而不是GUI？

- Markdown + slash command是模态的、可复制的、可版本控制的
- 易于在CLAUDE.md中记录决策历史
- 支持多Agent并行（同一PR上多个Claude实例）

#### Decision 2：为什么/review自动修复而/investigate手动修复？

- `/review`遇到的是**已知问题**（格式、命名、逻辑缺陷），安全修复
- `/investigate`遇到的是**未知问题**（root cause），需要人类决策

#### Decision 3：为什么强制/plan-eng-review？

- 许多生产bug源于架构假设碰撞
- 提前暴露这些假设，成本最低
- 测试矩阵预防多于测试修复

---

## 第五阶段：高级工作流与优化（持续）

**目标：精细化多工作流协调，跨项目规模化**

### 5.1 高级并行策略

#### 场景：同时开发3个大特性 + 2个hotfix + 1个安全审计

```Plain Text
sprint-1: 新账号等级系统
├── feature/account-levels
├── /office-hours → /plan-ceo-review → /plan-design-review
├── Conductor runner: design + eng review
└── 预计4天

sprint-2: Redis分布式缓存改造
├── refactor/redis-cluster
├── /plan-eng-review → /investigate旧问题 → /cache-verify
├── 高风险，串行化QA
└── 预计3天

sprint-3: RocketMQ消息链优化
├── perf/mq-throughput
├── /benchmark基准 → /message-audit → /qa
└── 预计2天

hotfix-1: 用户提现bug
├── bugfix/withdrawal-ui
├── /investigate → /qa → /land-and-deploy
└── 预计4小时，最高优先级

hotfix-2: 支付超时处理
├── bugfix/payment-timeout
├── /investigate → /order-review → /qa
└── 预计6小时，高优先级

security: 年度OWASP审计
├── audit/owasp-2026
├── /cso全系统 + /codex第二意见
└── 预计2天，并行运行，结果汇总
```

**并行度控制**：

- Conductor最多15个workers
- QA最多3个真实浏览器
- CEO（/plan-ceo-review）最多5个并行
- 安全相关（/cso）最多2个并行

### 5.2 跨项目规模化

运行多个项目时的gstack管理：

```Plain Text
~/projects/
├── game-account-trading/
│   ├── .claude/skills/gstack/      [项目级定制]
│   └── CLAUDE.md                   [项目级配置]
├── recommendation-engine/
│   ├── .claude/skills/gstack/      [不同的定制]
│   └── CLAUDE.md
└── payment-gateway/
    ├── .claude/skills/gstack/
    └── CLAUDE.md

每天：
/retro --global   # 跨三个项目的全局周报
```

**全局/retro输出**：

```Plain Text
=== Weekly Retro (Global) ===

game-account-trading:
  - 3 features shipped
  - 12K LOC added
  - 140K lines changed
  - 95% test coverage

recommendation-engine:
  - 1 major refactor complete
  - 8K LOC added
  - New ML pipeline MVP

payment-gateway:
  - 2 security bugs found by /cso
  - 1 hotfix deployed
  - Performance improved 15%

Person breakdown:
  - You: 347 commits, 65K LOC
  - Conductor worker: 123 commits, 28K LOC
```

### 5.3 质量通关管

建立质量guard rail，防止坏代码进主分支：

```Plain Text
QUALITY_GATES:
  coverage_min: 85%
  review_required: true
  tests_passing: required
  cso_passing: required (security-related only)
  codex_passing: required (critical paths only)
  
REQUIRED_SKILLS_BY_CHANGE_TYPE:
  payment_logic: [/review, /cso, /codex, /investigate, /qa]
  cache_logic: [/review, /cache-verify, /qa]
  message_queue: [/review, /message-audit, /qa]
  ui_changes: [/design-review, /qa]
  perf_changes: [/benchmark, /qa]
  docs_only: [/document-release]
```

### 5.4 性能优化实践

#### A. skill执行顺序优化

```Plain Text
不好的顺序：
/office-hours (5min) 
→ /plan-ceo-review (10min)
→ /plan-eng-review (15min)
→ /plan-design-review (10min)
[串行总计：40分钟]

优好的顺序：
/office-hours (5min) 
→ {/plan-ceo-review (10min) + /plan-design-review (10min)} [并行]
→ /plan-eng-review (15min) [依赖前面的输出]
[实际总计：30分钟]
```

#### B. QA瓶颈突破

问题：/qa是串行的，真实浏览器只有3个

解决方案：

1. 分流：UI变化→真实/qa，API only→简单脚本测试
2. 预审：/qa前先运行本地单元测试
3. 并行：不同sprint的feature用不同的staging URL

#### C. 内存与token预算

```Plain Text
游戏账号交易平台（600K LOC）的成本：

/review: ~4000 tokens
/plan-eng-review: ~6000 tokens
/qa: ~5000 tokens (真实交互)
/cso: ~8000 tokens (安全分析)

一个完整sprint（5个skills）: ~25K tokens

成本预测：
- 日均3个sprints = 75K tokens = $0.60
- 月均 = $18 (完全可承受)
```

---

## 第六阶段：哲学与决策（终身学习）

**目标：理解建筑师的思想，内化gstack的本质**

### 6.1 Builder Ethos（来自ETHOS.md）

gstack不是"完成需求的工具"，而是"构建正确产品的工具"。三个核心哲学：

#### Boil the Lake（煮沸湖泊）

不要被局部优化困住。先理解整个系统的势能能量，再决定在哪里用力。

实践：

```Plain Text
你说"我要优化支付响应时间"
gstack先问："支付响应时间在整个用户体验中的优先级是多少？"
可能发现：真正的瓶颈其实是账号转移的UI流程，不是后端
```

#### Search Before Building（先搜索，后构建）

许多问题已经有现成解决方案。盲目构建是最大的浪费。

实践：

```Plain Text
/design-consultation:
1. 研究竞品（Trustpilot, OpenSea, Eneba如何处理账号交易）
2. 检查开源库（是否有现成的escrow模式）
3. 提出创意风险（你的独特之处是什么）
4. 再生成原型
```

#### Three Layers of Knowledge（三层知识）

- Layer 1：最常见的场景（80%的用户）
- Layer 2：边界情况（15%的用户）
- Layer 3：极限情况（5%的用户 + 法律风险 + 财务风险）

对游戏账号交易平台的应用：

```Plain Text
Layer 1: 账号转移完整流程（正常路径）
Layer 2: 部分转移、超时重试、退货流程
Layer 3: 争议仲裁、反诈检测、合规审计、资金冻结

/qa应该测试 Layer 1 + Layer 2
/cso应该审计 Layer 2 + Layer 3
```

### 6.2 设计品味的培养

gstack的设计技能不只是做出好看的界面，而是：

#### /design-consultation的设计思维

```Plain Text
1. 研究现状（Competitive analysis）
2. 识别权衡（Safe vs Creative）
3. 生成原型（和代码一样逼真）
4. 写DESIGN.md（让工程师知道"10分的设计"样子）
5. /design-review自动修复（从"还好"到"完美"）
```

#### 维度评分系统

不要说"设计不好"，要说"这个设计的对比度是3/10，应该是8/10"：

```Plain Text
设计维度示例：
- 对比度：低端(暗色背景上的灰字)vs高端(应该是7+)
- 间距规律：随意间距 vs 4px网格对齐
- 排版层级：无明显区分 vs 4层清晰层级
- 颜色系统：随意搭配 vs 5色主+3色辅
- 动画目的：装饰 vs 反馈真实意图
- 无障碍：忽略 vs WCAG AA通过
```

每维度给出0-10分，然后说"一个10分的对比度应该是..."，工程师就知道怎么改。

### 6.3 质量思维的深化

#### /review的"Staff Engineer脑"

不是找语法错误，而是：

```Plain Text
1. 这段代码能承载2倍流量吗？
2. 如果这个API超时会发生什么？
3. 这个缓存的过期策略对吗？
4. 有没有race condition？
5. 测试是否覆盖了异常路径？
```

#### /investigate的"侦探脑"

不要跳到fix，先彻底理解：

```Plain Text
症状：用户账号转移失败
表面原因：RocketMQ消息发送失败
根本原因：消息序列化器使用了错误的charset，Redis缓存了错误的值

Iron Law: 无调查不修复。3次失败后停止。
```

### 6.4 持续学习的方法

#### A. 每周/retro时问自己

```Plain Text
- 这周发生的最意外的事是什么？
- 有没有模式识别失败的案例？
- gstack哪个skill我用得最少？为什么？
- 下周要尝试什么新的工作流？
```

#### B. 跨项目学习

```Plain Text
game-account-trading的/investigate最佳实践
→ 用在payment-gateway的调试
→ 发现不同domain的bug pattern不同
→ 调整/investigate prompt
```

#### C. 阅读gstack源码

理解不是用好工具的终点，而是改进的起点。

```Plain Text
当你完全掌握gstack后，考虑：
- 我们的账号交易业务特有的skill有没有？
- /qa能自动化更多吗？
- /review能对Redis缓存更敏感吗？
```

---

## 第七阶段：大规模应用与团队扩展（可选）

**目标：从个人工具升级到团队工具，从单工具升级到工具链**

### 7.1 多人团队中的gstack

当团队从1人→3人→10人时：

```Plain Text
1人阶段（solo builder）:
- 所有skills自己跑
- Conductor最多3个workers
- 决策环节：你

3人阶段（小团队）:
- 工程师跑/build + /review + /qa
- 设计师拥有/design-*
- 工程经理决策/plan-*
- Conductor 5-8个workers

10人阶段（大团队）:
- Conductor 15个workers上限
- 引入Quality Gate（不是所有人都能merge）
- 跨团队的/design-consultation必须串行
- 安全审计频率提高
```

### 7.2 Skills as Code（skills即代码）

gstack提供Skill Creator工具，可以：

```TypeScript
// 为你的特定领域创建skills
创建 `/domain-specific-audit`
└── 参考existing skills
└── 继承safety guards
└── 注册到SKILL.md
└── 自动添加到CLAUDE.md
```

### 7.3 Conductor的高级用法

```Bash
# 创建10个并行worker，每个处理一个branch
conductor start --workers 10 --branches feature/*

# 为每个branch自动：
# 1. /office-hours
# 2. /plan-ceo-review
# 3. /qa
# 4. /ship
# 完成后汇总结果

# 周报汇总
conductor report --weekly --include /retro
```

### 7.4 与其他工具的集成

gstack可以与以下工具链整合：

```Plain Text
GitHub Actions
├── Trigger /review on every PR
├── Trigger /qa on staging deployment
├── Trigger /cso on security-labeled PR
└── Auto-merge if all checks pass

Slack通知:
├── PR ready for /review → #dev-review
├── /qa found bug → #qa-channel
├── /retro complete → #general
└── Deployment verified → #devops

Analytics集成:
├── Supabase存储skill usage data
├── 团队仪表板：谁用了哪些skills
├── 趋势分析：review时间、qa通过率
└── 改进信号：某个skill失败率高
```

---

## 快速参考表

### 工作流选择决策树

```Plain Text
我想要做什么？
├─ 新特性
│  ├─ 从0开始 → /office-hours → /plan-ceo-review → /plan-eng-review
│  ├─ 需要设计 → 加上 /design-consultation + /plan-design-review
│  └─ 有想法了 → 跳过/office-hours，直接/plan-eng-review
│
├─ 修复bug
│  ├─ 简单bug → /review → /qa
│  ├─ 复杂bug → /investigate → /review → /qa
│  └─ 疑难bug → /investigate (深挖) → /codex (第二意见) → /review → /qa
│
├─ 代码审查
│  ├─ 普通审查 → /review
│  ├─ 跨模型审查 → /review + /codex + (cross-model analysis)
│  └─ 安全审查 → /cso
│
├─ 性能优化
│  ├─ 基准测试 → /benchmark
│  ├─ 找到瓶颈 → /investigate
│  └─ 修复并验证 → /review → /qa → /benchmark (对比)
│
├─ 发布
│  ├─ 到staging → /ship (推送PR)
│  ├─ 到生产 → /land-and-deploy
│  └─ 发布后 → /canary (监控)
│
└─ 团队反思
   └─ /retro (周报)
```

### Skill矩阵（按团队角色）

```Plain Text
CEO/创始人角色:
- /office-hours      (重新定义产品)
- /plan-ceo-review   (战略决策)

设计师角色:
- /design-consultation (系统设计)
- /plan-design-review  (设计评分)
- /design-review       (设计修复)
- /design-shotgun      (方案对比)

工程师角色:
- /plan-eng-review     (架构设计)
- /review              (代码审查)
- /investigate         (根因分析)
- /qa                  (功能测试)

SRE/安全角色:
- /cso                 (安全审计)
- /canary              (部署监控)
- /setup-deploy        (部署配置)

工程经理角色:
- /plan-eng-review     (技术评估)
- /autoplan            (工作流自动化)
- /retro               (团队反思)

文档角色:
- /document-release    (文档同步)
- /codex              (代码文档)
```

---

## 学习资源清单

### 必读文档（按阅读顺序）

1. `README.md` — gstack的价值主张和快速开始
2. `ETHOS.md` — 建筑师的哲学（Boil the Lake等）
3. `docs/skills.md` — 每个skill的深度解析（有例子！）
4. `ARCHITECTURE.md` — 系统设计和内部实现
5. `DESIGN.md` — 设计决策和美学
6. `CONTRIBUTING.md` — 扩展gstack

### 学习方式

```Plain Text
周一：读ETHOS + README，运行一次完整sprint
周二-三：深入三个最常用的skills，读docs/skills.md
周四：在项目中实际用5个skills，体验工作流
周五：运行/retro，反思本周学到了什么
周末：读源码，思考如何为项目定制
```

### 实验建议

```Plain Text
阶段1（第一周）：
- 在小项目上运行完整七步流程 ✓
- 体验/office-hours的重新定义能力 ✓
- 对比有/plan-eng-review vs没有的质量差异 ✓

阶段2（第二-三周）：
- 在真实项目上运行，记录各skill的实际时间
- 自定义两个domain-specific skills
- 建立team quality gates

阶段3（第四周及以后）：
- 并行5个sprint，体验真正的加速
- 运行全局/retro，看跨项目洞察
- 改进工作流，建立团队特有的实践
```

---

## 总结：gstack学习路线

```Plain Text
DAY 1:    安装 + 一次完整工作流体验          (核心价值体会)
DAY 2-5:  理解28个skills的分类和时机         (工具箱掌握)
WEEK 2:   在真实项目用，优化工作流           (实战适应)
WEEK 3-4: 定制domain-specific skills         (项目化)
MONTH 2+: 并行多sprint，建立规模化实践       (深度应用)
ONGOING:  持续学习builder ethos + 代码审读   (终身学习)
```

**最重要的一点**：gstack的价值不在于28个skills本身，而在于"七步sprint"这个流程框架。一旦你内化了这个流程，就能快速学会任何新skill，甚至创造自己的skill。

---

## 特别针对Duoli的建议

基于你的背景（Java开发、游戏账号交易平台、Claude Code初学者），建议学习路线：

### 第一周

```Plain Text
Day 1: 按README跑一遍完整demo（用你的真实项目）
Day 2: 研读ETHOS.md + docs/skills.md中的/review和/investigate
Day 3: 在游戏平台项目上运行：/office-hours (新功能) → /plan-eng-review → /review → /qa
Day 4: 体验/cso的OWASP审计（支付安全特别关键）
Day 5: 创建 `/order-review` 技能（订单流程特定审计）
```

### 关键突破点

1. **理解重新定义**：你说的"想要优化用户体验"，/office-hours可能会说"其实是要降低交易失败率"
2. **架构前置**：永远先运行/plan-eng-review再写代码（对分布式系统特别重要）
3. **真实QA**：/qa的真实浏览器测试对支付流程critical
4. **安全优先**：游戏账号交易 + 金钱 = /cso必须通过

### 可以立即用的skill（按优先级）

```Plain Text
1. /plan-eng-review  (架构设计，Spring Boot特性适配)
2. /review          (代码评审，找并发问题)
3. /qa              (真实流程测试)
4. /investigate     (Redis/RocketMQ问题root cause)
5. /cso             (支付安全审计)
```

不要一上来用全部28个skill，先精通上面5个，再逐步引入其他。

::: info 🔗

参考资料
- https://zhuanlan.zhihu.com/p/2019068620324492892

:::