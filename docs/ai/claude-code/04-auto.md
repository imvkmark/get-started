---
description: '本文介绍了多Agent协作与并行执行系统，涵盖Agent Teams架构、Subagents选择、任务分工及权限控制。强调先规划再执行，通过主Agent委托子Agent构建流水线，实现精准上下文移交。支持Web云端与Remote Control两种并行模式，并提供会话共享与跨会话持久化方案，如CLAUDE.md、外部存储及Git状态探测。'
lastUpdated: '2026-07-07 13:56:11'
head:
  - - meta
    - name: 'og:title'
      content: '自动化 : 多 Agent 协作与并行执行'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了多Agent协作与并行执行系统，涵盖Agent Teams架构、Subagents选择、任务分工及权限控制。强调先规划再执行，通过主Agent委托子Agent构建流水线，实现精准上下文移交。支持Web云端与Remote Control两种并行模式，并提供会话共享与跨会话持久化方案，如CLAUDE.md、外部存储及Git状态探测。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ai/claude-code/04-auto.html'
---
# 自动化 : 多 Agent 协作与并行执行

本篇是「Claude Code 介绍以及学习教程」系列的**第四篇**，主题是「[自动化 : 多 Agent 协作与并行执行](/ai/claude-code/04-auto.md)」。

整个系列五篇：

<table><colgroup><col/><col/><col/></colgroup><tbody><tr><td>篇</td><td>主题</td><td>何时读</td></tr><tr><td>1</td><td><a href="https://www.wulicode.com/ai/claude-code/01-can.html">会用 : 命令行基础与日常协作</a></td><td>初次入手</td></tr><tr><td>2</td><td><a href="https://www.wulicode.com/ai/claude-code/02-with.html">善用 : Agent 模式与自主任务执行</a></td><td>想知道底层循环、工具集、权限</td></tr><tr><td>3</td><td><a href="https://www.wulicode.com/ai/claude-code/03-use.html">驾驭 : Skills · Hooks · Mcp 扩展体系</a></td><td>想把流程沉淀为可复用资产</td></tr><tr><td>4</td><td><a href="https://www.wulicode.com/ai/claude-code/04-auto.html">自动化 : 多 Agent 协作与并行执行</a>「当前文章」</td><td>遇到「又宽又重」的并行任务</td></tr><tr><td>5</td><td><a href="https://www.wulicode.com/ai/claude-code/05-engineering.html">工程化 : Token 优化 · Compaction · 生产级部署</a></td><td>用熟了想降低成本、上 CI/CD</td></tr></tbody></table>

## 开启 Agent Teams / 多 agent 协作

### 单线程的天花板

用 Claude Code 开发到一定程度，你会遇到一类特殊的任务：它不是「难」，而是「宽」。

比如你要给交易平台做一次安全加固——涉及接口层的参数校验、Service 层的权限逻辑、数据库敏感字段的脱敏、以及相关的测试覆盖。这四件事技术上是独立的，互相不依赖，但一个 Claude Code 会话只能串行处理，做完 API 层再做权限层，依次推进。

Subagents 可以并行，但它们的通信是单向的——只能把结果汇报给父 Agent，不能彼此交流。你发现 API 层有个问题需要同步给正在写测试的 Agent？做不到，必须绕一圈。

Agent Teams 解决了这个问题：一个会话担任 team lead，负责协调工作、分配任务和综合结果；teammates 各自在独立的上下文窗口里工作，并且可以直接互相通信。与 subagents 不同，你还可以不经过 team lead 直接与某个 teammate 交互。

### 开启方式

Agent Teams 是实验性功能，默认关闭，需要 Claude Code v2.1.32 或更高版本。 先确认版本：

```Bash
claude --version
```

开启方式有两种。临时开启（当前 shell 会话有效）：

```Bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
claude
```

持久化到 settings.json（推荐）：

```JSON
// ~/.claude/settings.json 或项目 .claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

如果想在终端里清晰地看到每个 teammate 各自的输出，安装 tmux 并在其中启动 Claude Code——每个 teammate 会占据独立的 pane，交互体验好很多。但这不是必须的，没有 tmux 一样能用，只是所有输出混在一个终端里。

### 架构：四个组件协同工作

Agent Team 由四个组件构成：Team Lead（主 Claude Code 会话，负责创建团队、生成任务、综合结果）、Teammates（各自有独立上下文窗口的 Claude 实例）、共享任务列表（所有 Agent 可见的中心任务队列，支持依赖追踪）、以及 Mailbox（Agent 之间的消息通信系统）。

团队配置和任务列表存储在本地：`~/.claude/teams/{team-name}/config.json` 和 `~/.claude/tasks/{team-name}/`。

从 v2.1.178 起，TeamCreate/TeamDelete 工具已移除。每个会话隐式拥有一个 team——直接用 Agent 工具的 `name` 参数派生 teammate，无需显式创建团队。

关键机制是任务依赖追踪。你可以声明「Task B 依赖 Task A」，当 A 完成，B 自动解锁，teammates 自主领取下一个可执行的任务，不需要 lead 一直盯着。

关键机制是任务依赖追踪。你可以声明「Task B 依赖 Task A」，当 A 完成，B 自动解锁，teammates 自主领取下一个可执行的任务，不需要 lead 一直盯着。

与 subagents 不同的是，teammates 运行时的上下文相互独立，可以直接向彼此发消息，也可以向全团队广播。当一个 teammate 完成了其他任务的依赖项时，被阻塞的任务自动解锁，无需人工干预。

### Subagents vs Agent Teams：怎么选

这两者经常被混淆，核心区分标准只有一个：**workers 之间需不需要互相通信？**

Subagents 是委托模式——发出去，等结果，所有协调都经过主 Agent。Agent Teams 是项目团队模式——每人做自己的，但一直保持沟通。当后端改了数据模型，前端 teammate 立刻知道，而不是等到集成测试挂了才发现。

实际开发中，这两类场景的判断相当清晰：

对于「写这个模块的单元测试」「分析这个目录的所有依赖」这类有明确边界、结果独立的任务，Subagent 就够了，成本更低，不需要 Agent Teams 的通信层开销。

对于「安全审计 + 性能分析 + 测试覆盖三个维度同时看，最后综合出结论」这类需要多个视角互相印证的任务，或者「前后端 + 数据库层同步重构」这类改动牵连多层但需要及时对齐接口的任务，Agent Teams 才发挥出真正价值。

实测数据：Agent Teams 在大型可并行任务上比单 Agent 模式快 3—5 倍，但 token 消耗也同比例增加，一个三人团队大约是单会话的 2.5—4 倍费用。 对于按量计费的 API 用户，这是真实的成本，需要在任务规模上做判断。

### 第一次实验：让 Claude 来决定团队结构

最简单的起点是直接用自然语言描述任务，让 Claude 自主决定怎么组队。以下是一个针对 Spring Boot 项目的实际 prompt：

```Plain Text
我们的订单服务（src/main/java/com/example/order/）
需要一次全面审查，请创建一个 agent team 来并行处理：

- API 审查员：检查 OrderController 的参数校验、返回值包装、
  权限注解是否完整
- 业务逻辑审查员：检查 OrderService 的事务边界、异常处理、
  金额是否使用 BigDecimal
- 测试覆盖审查员：检查已有测试的覆盖率，找出缺少测试的关键路径

三位 teammate 各自完成审查后，汇总发现的问题并按优先级排列。
```

Claude 会基于你的描述创建团队、生成共享任务列表、派生 teammates，并协调工作；也可能主动建议创建团队——无论哪种情况，都需要你确认才会真正执行。

### 手动控制团队进度

会话运行后，几个常用的键盘快捷键：

- `Shift+↑/↓`：在 team lead 和各 teammate 之间切换
- `Ctrl+T`：查看共享任务列表及各任务状态
- `Enter`：进入某个 teammate 的会话，直接和它交互
- `Escape`：中断当前 Agent 的执行

任务卡住是 Agent Teams 最常见的问题之一。teammates 有时无法及时标记任务完成，导致依赖任务一直处于阻塞状态。如果某个任务看起来已经实际完成但状态没更新，可以手动更新任务状态，或者告诉 lead 去推一下那个 teammate。

### 一个完整的分工设计：并行重构

下面是一个更结构化的 prompt，适合实际开发场景。在用 Agent Teams 之前先单独跑一次 plan mode（`Shift+Tab` 两次），把任务切分做好，再启动团队执行：

```Plain Text
# Step 1: 先规划（在普通 Claude Code 会话里跑，不需要开 Agent Teams）
请为以下重构任务做详细的任务分解：
- 将 AccountService 从直接使用 Mapper 改为通过 Repository 层
- AccountRepository 需要新增 5 个查询方法
- 相关的 AccountController 接口保持不变
- 已有的单元测试需要同步更新

输出一份任务列表，标注哪些任务可以并行，哪些有依赖关系。

# Step 2: 用规划结果启动 Agent Teams
请基于上面的任务分解创建一个 agent team：
- Repository 开发者：实现 AccountRepository 的所有查询方法
- Service 重构者：依赖 Repository 任务完成后，重构 AccountService
- 测试更新者：与 Service 重构并行，更新所有受影响的测试文件

任务依赖关系：Service 重构和测试更新都依赖 Repository 开发完成。
```

这是一种经过验证的模式：先用 plan mode 做廉价的规划，生成明确的任务分解，再把这个计划交给 Agent Team 并行执行（花费高但速度快）。规划阶段是你在提交大量 token 之前的检查点。

### 当前的限制

已知限制需要提前了解：`/resume` 和 `/rewind` 不能恢复进行中的 teammates，如果恢复一个含有 teammates 的会话，lead 可能会尝试向已不存在的 teammates 发消息，这时告诉它重新派生即可。此外，一个 lead 同时只能管理一支团队，而且 teammates 不能再派生自己的团队，没有嵌套 team 的机制。

还有一个实际的成本意识问题：多 Agent 工作流并不适合所有情况，目前是完成大型项目的一种昂贵且实验性的方式。在启动 Agent Teams 之前，要确认任务确实有可并行的独立部分——用来重命名一个变量是纯粹的浪费。

---

Agent Teams 把 Claude Code 从「一个很能干的工程师」变成了「一个小团队」。这个转变带来的不只是并行速度，而是一种新的思维方式：面对复杂任务，不再问「怎么让这个 Agent 做得更快」，而是问「怎么把这个任务切分，让多个 Agent 同时工作」。实验性标签意味着它还有粗糙的地方，但核心机制已经可用，值得在真实项目里试一次。

## 设计主 agent 与子 agent 的任务分工策略

### 一个根本性的认知转变

当你开始认真使用 Claude Code 的多 Agent 能力时，需要接受一个认知上的调整：Claude Code 不是一个「很聪明的助手」，而是一套可编程的调度系统。你的主会话是指挥者，负责规划和综合；子 Agent 是执行者，负责独立完成边界清晰的工作单元。

委托的理想场景是那些重复性强、相互隔离、有明确输入输出契约的任务——运行单元测试、对某个文件做 lint、按照明确说明重构某个函数。通过把这些任务交给子 Agent，主 Agent 得以保持自己的上下文专注于更宏观的规划和状态管理。相反，需要广泛上下文、涉及战略决策、或者以复杂方式修改全局项目状态的任务，应该留在主 Agent 的执行线程里。

这句话点出了分工的核心原则：主 Agent 做「需要全局视野的事」，子 Agent 做「范围清晰的事」。

### 自定义子 Agent 的定义方式

子 Agent 定义为带有 YAML frontmatter 的 Markdown 文件。每个子 Agent 运行在独立的上下文窗口里，拥有自定义的系统提示、特定的工具权限和独立的执行环境。Claude 遇到与某个子 Agent 描述匹配的任务时，会将其委托给那个子 Agent，由它独立工作并返回结果。

文件存放位置决定作用域：

```Plain Text
~/.claude/agents/          # 用户级，对所有项目可用
.claude/agents/            # 项目级，优先级更高，提交到版本库
```

对于一个 Spring Boot 电商平台，你的项目级子 Agent 目录可能长这样：

```Plain Text
.claude/agents/
├── api-reviewer.md        # API 层代码审查
├── db-migrator.md         # 数据库迁移执行
├── test-writer.md         # 单元测试生成
└── security-auditor.md    # 安全漏洞扫描
```

每个文件的结构：

````Markdown
---
name: api-reviewer
description: >
  对 Spring Boot Controller 进行 API 规范审查。
  当用户提交了新 Controller 代码、修改了接口定义、
  或请求 API review 时使用。
tools: Read, Grep, Glob, Bash
model: sonnet
---

你是一位专注于 Spring Boot API 层审查的专家。

每次被调用时，执行以下检查：

1. 运行 `git diff --cached --name-only | grep Controller` 找出改动的 Controller
2. 对每个 Controller 检查：
   - 所有入参是否使用了 `@Valid` 注解
   - 返回值是否统一包装为 `Result<T>`
   - 敏感操作是否有权限注解（`@PreAuthorize` 或自定义注解）
   - 异常是否被统一处理，没有裸 Exception 透传
3. 输出格式：

```json
{
  "files_reviewed": ["文件路径"],
  "issues": [
    {"file": "路径", "line": 行号, "severity": "high|medium|low", "description": "问题描述"}
  ],
  "passed": true|false
}
````

issues 为空时，passed 为 true，不要捏造问题。

````Plain Text

注意这里几个关键设计：`description` 用动词开头，点名触发场景；`tools` 明确白名单，只给 Read/Grep/Glob/Bash，没有 Write 权限——这个子 Agent 的职责只是审查，不该修改文件；`model` 指定 sonnet，因为代码审查不需要 opus 级别的推理，省成本；输出格式是结构化 JSON，方便主 Agent 解析和判断是否继续流程。

## 最小权限原则：工具白名单的意义

工具访问范围应该按 Agent 定制。PM 和架构 Agent 偏重读操作（搜索、通过 MCP 读文档）；实现 Agent 需要 Edit/Write/Bash；发布 Agent 只需要它必须用到的工具。如果不列出 tools，就是隐式授予所有可用工具。应当有意识地控制。

用一个反例来说明这个原则的重要性：如果你的 `test-writer` 子 Agent 拥有 Bash 权限但没有限制，它理论上可以执行 `rm -rf`——即便你从未打算让它做这件事。工具白名单让子 Agent 的能力范围和它的职责范围严格对应。

```markdown
---
name: test-writer
description: >
  为 Spring Boot Service 层生成 JUnit 5 单元测试。
  当用户实现了新的 Service 方法、需要补充测试覆盖时使用。
tools: Read, Glob, Write  # 只需要读现有代码、写测试文件
model: sonnet
---

你是一位专注于 Spring Boot 单元测试的工程师。

被委托时，接收以下信息：
- 目标 Service 类的路径
- 需要覆盖的方法列表（如果没有指定，覆盖所有 public 方法）

工作步骤：
1. 读取目标 Service 类，理解方法签名和业务逻辑
2. 读取同目录下现有的测试文件（如有），了解已有测试风格
3. 为每个目标方法生成测试用例，覆盖：
   - 正常路径（happy path）
   - 边界条件
   - 异常情况（Service 应抛出的异常）
4. 使用 Mockito mock 所有依赖，不做真实数据库调用
5. 将测试写入 `src/test/java/` 对应路径

返回：
- 创建的测试文件路径列表
- 每个方法的测试覆盖数量
````

### 上下文移交：给子 Agent 什么，不给什么

父 Agent 不应该把自己的全部状态传给子 Agent。这样做会完全抵消上下文隔离的价值，还会产生昂贵而缓慢的过程。正确做法是为子 Agent 构建最小化的、任务专用的上下文——只打包完成该子任务所必需的相关文件、函数签名和指令。子 Agent 完成后，返回输出（通常是 diff 或状态报告），由主 Agent 集成回主项目状态。

在实践中，这意味着主 Agent 在派生子 Agent 时，应该像写一张工单一样精确：

```Plain Text
# 好的委托方式（给子 Agent 的上下文足够精准）
请用 test-writer 子 Agent 为以下内容生成测试：
- 目标文件：src/main/java/com/example/service/OrderService.java
- 需要覆盖的方法：createOrder, cancelOrder, getOrderById
- 特殊要求：cancelOrder 需要覆盖「订单状态不允许取消」的异常情况

# 不好的委托方式（上下文模糊，子 Agent 需要自己猜）
请用 test-writer 子 Agent 给订单服务写测试
```

前者让子 Agent 可以立刻开始工作，后者需要它先花时间探索，探索过程产生的 token 消耗会进入它自己的上下文窗口而非主 Agent 的——这是隔离的优点，但如果探索方向错了，整个子任务就白跑了。

### 构建流水线：主 Agent 如何串联多个子 Agent

实际工程中，子 Agent 很少单独使用，通常是多个子 Agent 串联成一条流水线。以「实现新功能并保证质量」这个场景为例，分工可以这样设计：

```Plain Text
主 Agent（规划 + 协调）
  │
  ├─ 1. 自己完成：理解需求、设计接口、规划文件结构
  │
  ├─ 2. 派生 → db-migrator（执行数据库迁移）
  │         等待完成，检查迁移是否成功
  │
  ├─ 3. 派生 → 自己实现 Service + Controller
  │         （涉及全局架构决策，留在主 Agent）
  │
  ├─ 4. 并行派生 → api-reviewer + test-writer
  │         （两者互不依赖，可同时运行）
  │         等待两者完成，综合结果
  │
  └─ 5. 如果 api-reviewer 发现问题，自己修复；
        如果测试覆盖不足，告知 test-writer 补充
```

任务分解可以是递归的。主 Agent 可以把功能请求分解为创建 model、controller 和 view，然后派生子 Agent 来处理 controller，controller 子 Agent 还可以派生自己的子子 Agent 来写单独的方法和对应的测试。这创建了一种反映代码逻辑结构的执行层级。 子 Agent 可以派生子 Agent 最多 5 层。但在 Plan 模式下子 Agent 不能继续派生子 Agent——Plan 模式的只读约束会阻断嵌套链. 

### 用 CLAUDE.md 教会主 Agent 如何委托

如果你不在 CLAUDE.md 里说明什么时候该委托给哪个子 Agent，主 Agent 会凭感觉决定——有时候委托，有时候自己做。要让分工策略变得可预测，需要在 CLAUDE.md 里明确写出路由规则：

```Markdown
<!-- .claude/CLAUDE.md -->

## Agent 委托规则

### 什么时候委托给子 Agent

**api-reviewer**：每次 Controller 有修改后，在 git commit 之前调用。
**test-writer**：Service 层新增方法后，如果对应测试文件里没有相关测试方法时调用。
**db-migrator**：需要执行 Flyway 迁移脚本时调用（不要直接在主会话里跑 mvn flyway:migrate）。
**security-auditor**：涉及认证、鉴权、加解密相关代码修改时调用。

### 什么时候不要委托

- 需要跨模块理解整体架构才能做的决策
- 修改量很小（单个文件、几行代码）的改动
- 需要和你确认设计方向的工作

### 委托格式

委托时必须提供：目标文件路径、任务具体范围、输出预期格式。
不要发送含糊的委托指令。
```

你的主会话是「中枢 AI」，负责协调专业子 Agent。工作质量取决于你在多大程度上教会了这个中枢如何委托。CLAUDE.md 里的路由规则立竿见影——加上去之后你会立刻看到主 Agent 在委托决策上更加一致。

---

分工策略设计好之后，实际运行中最常见的反馈是：子 Agent 返回的结果和预期不符。这通常不是子 Agent 本身的问题，而是委托指令写得不够精确，或者工具权限设置有误导致它无法完成部分步骤。迭代的方向是逐步收紧每个子 Agent 的定义，让它的职责范围越来越清晰，而不是越做越大——做大了就该拆成两个子 Agent。

#### 三种扩展机制对比

| 维度 | Skills | Subagents | Agent Teams |
|-|-|-|-|
| **上下文** | 在主对话上下文中运行 | 独立上下文窗口 | 各自独立上下文窗口 |
| **通信** | 无（内联执行） | 单向（子→主返回结果） | 双向（teammates 可直接互发消息） |
| **适用场景** | 可复用的任务流程/规范 | 边界清晰、结果独立的子任务 | 需要多视角印证或持续对齐的并行任务 |
| **创建方式** | `.claude/skills/<name>/SKILL.md` | `.claude/agents/<name>.md` | `/team` 或隐式 team + Agent 工具 |
| **成本** | 低（按需加载，共用上下文） | 中（独立上下文，完成后释放） | 高（多个并行上下文同时运行） |
| **配置复杂度** | 低（Markdown 文件） | 中（frontmatter + 工具白名单） | 高（任务依赖 + 通信规则） |

**选择原则**：能复用流程 → Skills；边界清晰的独立任务 → Subagents（默认后台运行）；需要 Agent 之间实时协调的复杂并行任务 → Agent Teams。

## 使用 `claude.ai/code` 在浏览器端并行运行多任务

### 两种截然不同的运行模式

在浏览器端使用 Claude Code，实际上涉及两种不同的运行模式，经常被混淆，需要先分清楚：

第一种是 **Claude Code on the Web**（`claude.ai/code`）——任务运行在 Anthropic 的云端基础设施上。你无需本地环境，直接在浏览器里开启一个全新的 Claude Code 会话，针对 GitHub 仓库执行任务。适合无需本地依赖的工作。

第二种是 **Remote Control**——任务仍在你的本地机器上执行，浏览器和手机只是一个远程窗口，让你能从任何设备观察进度、提供指令。这两种模式都通过 `claude.ai/code` 界面访问，但本质区别在于代码在哪里跑：Remote Control 会话跑在你本地，保留你完整的 `.claude/` 配置、MCP 集成和本地文件系统；云端会话从零开始，没有任何本地上下文。

实际使用中，这两种模式的定位是互补的：把 Claude Code on the Web 用于边界清晰的可并行任务（写测试、补文档、升级依赖），把 Remote Control 用于需要本地环境的工作（调用内部 MCP 服务、访问私有数据库、使用自定义工具链）。

### Claude Code on the Web：零配置的并行起点

Claude Code on the Web 适合的场景：回答关于代码架构的问题、边界清晰的 bug 修复、并行处理多个任务、处理没有在本地 checkout 的仓库，以及后端变更（Claude Code 可以先写测试再写实现代码）。

从终端启动一个云端会话，最简单的方式是 `--remote` 参数：

```Bash
# 在当前仓库启动一个云端会话，任务在云端跑，本地终端不阻塞
claude --remote "为 OrderService 的所有 public 方法补充 Javadoc 注释"
```

命令执行后立刻返回，你可以继续在本地做其他事。任务在云端运行，可以用 `/tasks` 检查进度，或者直接在 `claude.ai` 或 Claude 移动 App 里打开会话来交互——在那里可以引导 Claude、提供反馈或回答问题。

并行运行多个云端会话的方式很直接：

```Bash
# 同时启动三个独立的云端任务
claude --remote "给 src/main/java/com/example/service/ 下所有 Service 补充 Javadoc"
claude --remote "检查 src/test/ 目录下测试覆盖率，找出缺少测试的方法列表"
claude --remote "把 pom.xml 里的依赖版本更新到最新稳定版，逐一检查兼容性"
```

每个 `--remote` 命令创建一个独立的 Web 会话并独立运行，所有任务真正同时执行，互不干扰。

打开 `claude.ai/code`，会看到左侧边栏列出所有正在运行的会话。每个会话显示它当前在做什么——读了哪些文件、执行了什么命令。你可以随时点进某个会话，在它进行到一半时提供追加指令，或者回答它提出的问题。

### Remote Control：本地执行，随处监控

如果任务需要访问本地 MCP 服务、内部数据库，或者你已经建立了完善的 `.claude/` 配置不想丢失，应该使用 Remote Control 而不是纯云端模式。

在本地终端启动一个可远程控制的会话：

```Bash
# 方式一：直接启动 remote-control 模式
claude remote-control

# 方式二：在现有会话里启用（会话历史会一并带过去）
/remote-control
```

终端会显示一个 URL 和二维码，用手机扫码或在浏览器里打开，就能从任何设备接管这个会话。关键设计：你的代码从不离开本地机器，只有聊天消息和工具执行结果通过加密通道传输。文件、MCP 服务器、环境变量和项目配置全部保持在本地。

一个实际场景：在下班前启动一个代码重构任务，开启 Remote Control，然后关上电脑盖离开。在地铁上用手机查看进度，在 Claude 遇到决策点时给出指引，完全不需要回到桌前。

### 先规划，再远程执行

云端会话最容易出问题的地方是：一旦任务跑起来，中途调整方向的代价很高。一个有效的工作模式是先在本地做规划，然后把执行工作发给云端：

```Bash
# Step 1：本地开 plan mode（Shift+Tab 两次进入）
# 只读不写，和 Claude 对齐重构策略
claude
# 进入 plan mode 后...
# "分析 AccountController，制定把权限检查从 Controller 层
#  移到 AOP 切面的重构计划，列出需要改动的文件和步骤"

# Step 2：计划确认后，把执行发给云端
# （退出 plan mode，在普通会话里）
claude --remote "按以下计划执行重构：
1. 创建 PermissionAspect.java 实现权限拦截逻辑
2. 从 AccountController 移除所有 @PreAuthorize 注解和手动权限检查代码
3. 在 pom.xml 添加 spring-boot-starter-aop 依赖
4. 为 PermissionAspect 编写单元测试
执行完成后提交一个 draft PR"
```

这个模式给了你策略上的掌控，同时让 Claude 在云端自主执行——可以在本地继续其他工作，或者彻底从电脑前离开。

### 会话共享：团队协作的基础

浏览器端的会话可以共享给团队成员，这是一个容易被忽视但很实用的功能。

切换会话的可见性后，就可以分享会话链接。接收者打开链接会看到会话的最新状态，但页面不会实时更新——它是状态快照。对于企业和团队账户，可见性选项是「私有」和「团队」，团队可见性让组织内所有成员都能看到这个会话。

在 Spring Boot 项目中，这能解决一个常见的协作痛点：你让 Claude 做了一次复杂的代码分析，想让同事看结论，不需要再让对方重新跑一次——分享会话链接就够了。

需要注意的安全事项：分享前检查会话内容，确认没有私有仓库的代码凭据或敏感配置。默认不启用仓库访问验证，可以在设置里开启「Settings > Claude Code > Sharing settings」。

### 从浏览器「传送」回本地终端

有时候你在浏览器里开始了一个任务，中途发现需要调用本地工具或调试某个细节，可以把云端会话「传送」回本地继续：

```Bash
# 从 Web 界面点击 "Open in CLI"，复制命令并粘贴到本地终端
# Claude Code 会验证你在正确的仓库，fetch 并 checkout 远程会话的分支，
# 加载完整的对话历史到本地终端
```

传送前会检查几个前提条件：本地和远程会话指向相同的仓库，本地 git 没有未提交的冲突变更。如果有要求不满足，会看到错误提示或引导解决。

反方向也可以：在本地终端工作到一半，想切换到移动端继续，用 `/remote-control` 把当前会话暴露出去，然后用手机连进来。

---

`claude.ai/code` 的价值不只是「可以在浏览器里用 Claude Code」，更重要的是它把「在哪里执行」和「在哪里监控」解耦了。一台机器可以同时跑三个独立的重构任务，而你在另一台设备上统一查看进度、提供指引。这是一个调度中心的角色，而不只是一个访问界面。

好的，来写这篇跨会话记忆持久化的文章。先画一张架构图帮助读者建立整体心智模型。---

## 跨会话记忆持久化

在多 Agent 系统中，Orchestrator 将复杂任务拆解给多个 Subagent 并行执行，效率的提升是显而易见的。但有一个问题如影随形：Claude Code 的每一次会话都是独立的进程，任务中途的所有状态——已完成哪些子任务、发现了哪些关键上下文、下一步该做什么——在会话结束的瞬间便会全部消失。

对于需要数小时乃至跨天执行的复杂工程任务，这一限制是致命的。跨会话记忆持久化，正是解决这个问题的核心机制。

### 问题的本质

理解这个问题需要先清楚 Claude Code 的内存模型。每一个 Claude Code 会话拥有一个有限的上下文窗口，所有的"记忆"都存储在这个窗口之内。当会话终止，上下文窗口随之销毁，下一次启动是一张彻底的白纸。

对于单一的短任务，这没有问题。但多 Agent 协作场景的特征恰恰相反：任务时间长，涉及角色多，中间产生的结构化状态（哪个模块已完成、哪个测试已通过、哪些接口已确定）不断累积。如果没有持久化机制，Orchestrator 在新会话中无从知晓上一轮 Subagent 的工作成果，整个协作体系便会在会话边界处断裂。

解决思路并不复杂：在会话内存之外建立持久化存储层，状态在会话结束前写入，在新会话启动时读取恢复。核心挑战在于**写什么、写在哪里、如何恢复**。

### CLAUDE.md 写回：最轻量的持久化

CLAUDE.md 是 Claude Code 的项目级配置文件，每次会话启动时自动加载。大多数团队用它来存储项目背景、编码规范和架构约定。但在多 Agent 场景中，它还承担着另一个职责：状态的写回目标。

Orchestrator 可以在每一个检查点将当前任务进度追加写入 CLAUDE.md 的专属区块。下面是游戏账号交易平台项目中的一个实际模式：

```Markdown
## Agent 任务状态（自动维护，请勿手动修改）

**最后更新**: 2024-01-15 14:32
**当前阶段**: 推荐系统 MVP 实现

### 已完成
- [x] UserBehaviorService 基础实现（含 Redis 热榜缓存）
- [x] RecommendController 接口定义
- [x] 单元测试覆盖率 > 80%

### 进行中
- [ ] AccountSimilarityCalculator 协同过滤算法（Subagent-2 负责）
- [ ] RocketMQ 消息消费者集成（Subagent-3 负责）

### 阻塞项
- AccountType 枚举与前端约定存在歧义，需要确认后继续
```

这个模式的优雅之处在于它完全契合 Claude Code 的自然工作流。Orchestrator 的 `PostToolUse` Hook 可以在每次工具调用结束后触发状态写回，无需额外的基础设施。新会话启动时，CLAUDE.md 的状态区块会被自动读取，Orchestrator 能够立刻掌握全局进度并恢复工作。

写回的内容应该保持结构化，且只记录**对恢复决策有价值的信息**，而非原始的执行日志。"UserBehaviorService 已实现，覆盖率 83%"是有价值的状态；"工具调用 245 次"毫无意义。

### 外部存储：处理结构化状态

CLAUDE.md 写回适合存储轻量的进度摘要，但对于真正复杂的结构化状态——多个 Subagent 的任务分配表、中间产物的位置映射、依赖关系图谱——需要引入外部存储。

最常见的选择是本地 JSON 文件，简单、零依赖、对版本控制友好：

```Python
# hooks/state_manager.py
import json
from pathlib import Path
from datetime import datetime

STATE_FILE = Path(".claude/agent_state.json")

def save_state(orchestrator_id: str, state: dict):
    """在检查点保存 Orchestrator 状态"""
    STATE_FILE.parent.mkdir(exist_ok=True)
    
    current = load_state(orchestrator_id) or {}
    current.update({
        "updated_at": datetime.now().isoformat(),
        "orchestrator_id": orchestrator_id,
        **state
    })
    
    STATE_FILE.write_text(json.dumps(current, ensure_ascii=False, indent=2))

def load_state(orchestrator_id: str) -> dict | None:
    """会话启动时恢复状态"""
    if not STATE_FILE.exists():
        return None
    
    data = json.loads(STATE_FILE.read_text())
    if data.get("orchestrator_id") == orchestrator_id:
        return data
    return None
```

对于游戏账号交易平台这类生产项目，状态文件的结构需要更精细地设计。Orchestrator 需要知道每个 Subagent 的任务状态、产出物路径以及可能的错误信息：

```JSON
{
  "orchestrator_id": "recommendation-system-v1",
  "updated_at": "2024-01-15T14:32:00",
  "phase": "mvp-implementation",
  "subagents": {
    "subagent-1": {
      "task": "UserBehaviorService 实现",
      "status": "completed",
      "output": "src/main/java/com/example/service/UserBehaviorService.java",
      "notes": "Redis 缓存 TTL 设置为 1 小时，热榜更新间隔 5 分钟"
    },
    "subagent-2": {
      "task": "协同过滤算法实现",
      "status": "in_progress",
      "checkpoint": "相似度矩阵计算完成，待实现 Top-K 筛选"
    },
    "subagent-3": {
      "task": "RocketMQ 消费者集成",
      "status": "blocked",
      "blocker": "消息格式与 Subagent-2 的输出格式存在依赖"
    }
  },
  "shared_context": {
    "account_types": ["LOL", "CSGO", "VALORANT"],
    "redis_key_prefix": "recommend:",
    "batch_size": 100
  }
}
```

`shared_context` 区块尤为重要。多个 Subagent 并行工作时，很容易产生对同一业务概念的不同理解。将这些共识明确写入状态文件，相当于在 Agent 之间建立了一份隐式的接口契约。

### Git 作为天然的状态载体

在代码开发场景中，有一种往往被忽略的持久化策略：将 Git 提交本身作为状态记录介质。

每当 Orchestrator 完成一个有意义的阶段，Subagent 便可以执行一次带有结构化提交信息的 Git 提交。提交信息不仅描述代码变更，还嵌入任务状态的元数据：

```Plain Text
feat(recommendation): 完成 UserBehaviorService 基础实现

实现内容:
- 用户行为事件记录（浏览、收藏、购买）
- Redis 热榜缓存（TTL=1h，Redisson RBucket）
- 基础相似度查询接口

Agent 状态:
- Phase: mvp-implementation
- Completed: subagent-1
- Next: subagent-2 协同过滤算法

Co-authored-by: Claude Code Subagent-1
```

这样做的优势是将代码进度与任务进度合并到同一个事实来源中，无需额外维护状态文件。新会话启动时，Orchestrator 可以通过读取最近几条提交信息来快速重建任务上下文。

```Bash
# Orchestrator 启动时执行的状态探测
git log --oneline -10 --grep="Agent 状态"
```

### 状态恢复：新会话的第一件事

持久化写入只是问题的一半，恢复机制同等重要。一个设计良好的状态恢复流程，能让新会话中的 Orchestrator 感知到它只是"醒来"，而非"重生"。

恢复的标准流程分为三步。首先是探测：读取 CLAUDE.md 状态区块、外部 JSON 文件，以及最近的 Git 提交信息。其次是重建：基于探测结果构建当前任务图谱，识别已完成节点、进行中节点和阻塞节点。最后是恢复执行：对进行中但未完成的任务进行幂等重试，对阻塞任务发出人工确认请求，对已完成任务跳过。

在 CLAUDE.md 中为 Orchestrator 编写明确的恢复指令是一个好习惯：

```Markdown
## Orchestrator 启动协议

新会话启动时，按以下顺序初始化：

1. 读取 `.claude/agent_state.json`，获取上次任务状态
2. 检查 `git log --oneline -5`，确认代码实际进度
3. 对比两者，以 Git 提交为准（文件状态可能落后）
4. 对状态为 `in_progress` 的任务：重新启动对应 Subagent
5. 对状态为 `blocked` 的任务：向用户报告阻塞原因并请求指示
6. 输出恢复摘要后开始执行
```

这条指令将恢复逻辑从 Orchestrator 的即兴判断，变成了可预期的确定性行为。无论会话因何中断，下一次启动的行为都是一致的。

### 幂等性：持久化的隐藏前提

在讨论持久化时，有一个前提条件往往被忽视：Subagent 的任务执行必须是幂等的。

幂等性意味着，对同一个任务执行两次，与执行一次的结果完全相同。当状态恢复后重新触发一个"进行中"的任务，若该任务不满足幂等性，可能造成数据库记录重复、消息重复发送或文件重复生成等问题。

确保幂等性的常见做法是在任务执行前先检查产出物是否已存在：

```Java
// Subagent 执行数据迁移前的幂等检查
public void migrateAccountData(String taskId) {
    // 检查任务是否已执行
    if (migrationLogMapper.exists(taskId)) {
        log.info("任务 {} 已执行，跳过", taskId);
        return;
    }
    
    // 执行实际迁移
    doMigrate(taskId);
    
    // 记录执行完成
    migrationLogMapper.insert(new MigrationLog(taskId, LocalDateTime.now()));
}
```

幂等性保证了状态恢复后的重试安全，这是整个持久化体系能够可靠运转的基础。

### 三种方案的适用场景

CLAUDE.md 写回、外部 JSON 存储和 Git 提交并非竞争关系，而是互补的层次结构。

CLAUDE.md 写回适合存储面向 Orchestrator 的高层进度摘要，内容精练，恢复时能被 Claude Code 自动读取，无需任何代码。外部 JSON 存储适合保存需要程序化处理的结构化状态，Subagent 间的任务分配表和共享上下文都应放在这里。Git 提交则是代码开发类任务天然的状态载体，它将代码进度和任务进度合二为一，在代码审查流程中也保有完整的执行历史。

三者组合使用时，建议遵循以下优先级：Git 是事实来源，JSON 文件是中间状态的详细记录，CLAUDE.md 是面向 Orchestrator 的可读摘要。当三者出现不一致时，以 Git 提交状态为准，因为代码是最难伪造的事实。

多 Agent 系统的强大之处在于并行，而并行的持续价值在于任务能够跨越会话边界不间断地推进。跨会话记忆持久化，正是让这一切成为可能的关键基础设施。