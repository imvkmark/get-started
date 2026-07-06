---
description: 'Oh My ClaudeCode (OMC) 是一个提升 Claude Code 效率的插件，提供19个专属Agent、37个内置Skill、Autopilot、Teams模式、多AI协作（CCG）、tmux Worker、自定义Skill、Hooks生命周期、状态持久化等丰富功能。文档涵盖从入门到生产掌握的四个阶段，包括安装配置、核心工作流、进阶编排及实战案例，帮助用户高效完成代码重构、审计、测试等任务。'
lastUpdated: '2026-07-06 23:15:59'
head:
  - - meta
    - name: 'og:title'
      content: 'Oh My ClaudeCode (OMC) 学习文档'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Oh My ClaudeCode (OMC) 是一个提升 Claude Code 效率的插件，提供19个专属Agent、37个内置Skill、Autopilot、Teams模式、多AI协作（CCG）、tmux Worker、自定义Skill、Hooks生命周期、状态持久化等丰富功能。文档涵盖从入门到生产掌握的四个阶段，包括安装配置、核心工作流、进阶编排及实战案例，帮助用户高效完成代码重构、审计、测试等任务。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ai/extend-reading/omc-get-started.html'
---
# Oh My ClaudeCode (OMC) 学习文档

> 文档版本：基于 oh-my-claudecode v4.15.2 整理 

## 1. 项目概述

### 1.1 什么是 oh-my-claudecode

oh-my-claudecode（简称 OMC）是一个运行在 Claude Code 之上的**多 Agent 编排框架**。它通过向 Claude Code 注入专属 Agent 和 Skill，将单线程顺序执行模式升级为多 Agent 并行协作模式。

核心设计理念：**不替换 Claude Code，而是在其之上叠加行为层（Skill Injection）**，因此上下文从不被割断。

```Plain Text
你的自然语言描述
        ↓
  oh-my-claudecode
        ↓
  任务路由 & 分解
   /        \
Agent 1   Agent 2   Agent 3
Architect  Executor  QA-Tester
(Opus)    (Sonnet)  (Sonnet, v4.14+)
   \        /
  结果综合输出
```

### 1.2 核心价值主张

| 能力 | 原生 Claude Code | OMC |
|-|-|-|
| 执行模式 | 单 Agent，顺序执行 | 多 Agent，并行执行 |
| 任务分解 | 手动 | 自动（Team 流水线，v4.1.7+ 标准编排） |
| AI 模型 | 仅 Claude | Claude + Codex + Gemini + Antigravity(agy, v4.15.0+) |
| 成本控制 | 全量用同一模型 | tier-alias 智能路由，省 30–50% |
| 上下文 | 容易丢失 | notepad（三级优先级） + project-memory 持久化 |
| 配置量 | 无需配置 | 零配置，可选 `/omc-setup` 增量配置 |

### 1.3 适合 vs 不适合的场景

**适合 OMC 的场景：**

- 需要同时修改 frontend + backend + 测试的跨层变更
- 超过 2 小时的长会话，上下文丢失风险高
- 大规模重构（50+ 文件批量改造）
- 架构决策类工作，需要 "先思考再执行"
- 需要 Codex/Gemini/Antigravity 做交叉视角的跨模型场景

**不适合 OMC 的场景：**

- 单文件小改动（增加 Agent 层反而增加成本）
- 一次性快速问答
- 已有完整 CI/CD 和任务管理系统的团队（可能重叠）

---

## 2. 第一阶段：入门

### 2.1 安装插件

OMC 通过 Claude Code 的插件市场安装，无需手动编辑任何配置文件。**不要用 npm 全局安装来初始化插件**；npm 包（`oh-my-claude-sisyphus`）是另一条独立轨道，跟插件市场不是二选一关系。

在 Claude Code 会话内，**逐条执行**以下命令（不能同时粘贴）：

```Plain Text
/plugin marketplace add oh-my-claudecode
```

等待第一条完成后，再执行：

```Plain Text
/plugin install oh-my-claudecode
```

**安装验证**

安装完成后，在 Claude Code 中运行 `/omc-setup`（或带命名空间 `/oh-my-claudecode:omc-setup`），如果回显中包含 OMC 的版本号、Agent 数（19）、Skill 数（40），说明安装成功

> 注意：Claude Code 原生 `/setup` 和 `/init` 都不是 OMC 入口

**两条独立安装轨道（v4.15.2 官方强调）**

| 轨道 | 安装命令 | 用途 |
|-|-|-|
| 插件轨道 | `/plugin marketplace add oh-my-claudecode` + `/plugin install oh-my-claudecode` | Skill/Agent 在 Claude Code 会话内直接可用 |
| CLI 轨道 | `npm install -g oh-my-claude-sisyphus@latest` | 提供 `omc` / `oh-my-claudecode` / `omc-cli` 三个 binary；`ask` / `ccg` / `team` 的 CLI 后端依赖此轨道 |

两条都装要同时升级（不是二选一）。

**前置依赖**

| 依赖 | 用途 | 是否必须 |
|-|-|-|
| Claude Code | 宿主环境 | ✅ 必须 |
| tmux | omc-teams / ccg 多 CLI 工作者（v4.4.0+ 起） | omc-teams/ccg 必须 |
| codex CLI | Codex 工作者 | omc-teams/codex 可选 |
| gemini CLI | Gemini 工作者 | omc-teams/gemini 可选 |
| antigravity (agy) CLI | antigravity 替代 gemini（v4.15.0+） | omc-teams/antigravity 可选 |

macOS 安装 tmux：

```Bash
brew install tmux
```

### 2.2 初始化配置

安装完成后，需要运行初始化命令让 OMC 完成自身配置：

**在 Claude Code 会话内：**

```Plain Text
# 项目级配置（推荐，简写）
/omc-setup --local
# 或带命名空间
/oh-my-claudecode:omc-setup --local

# 全局配置（所有 Claude Code 会话）
/omc-setup
```

初始化过程会做以下几件事：

1. 将 OMC 的 19 个 Agent 定义注入到当前会话
2. 将 40 个 Skill 注册到 Claude Code 的 Skill 系统
3. 同步 Hooks 库模块（确保版本一致）
4. 生成默认 `config.jsonc` 配置文件（位于 `~/.claude/oh-my-claudecode/`）
5. 检查 HUD 状态栏脚本，缺失则提示运行 `/oh-my-claudecode:hud setup`（v4.14+）
6. 创建 `.omc/` 工作目录（notepad / project-memory / ultragoal / state 子目录）

**初始化后的目录结构：**

```Plain Text
~/.claude/
├── settings.json                       # Claude Code 原生配置
├── oh-my-claudecode/
│   ├── config.jsonc                    # OMC 主配置
│   ├── skills/                         # 自定义 Skill 存放目录
│   ├── hooks/                          # 自定义 Hooks 存放目录
│   └── plugins/                        # v4.14+ 插件 shim 注册目录

.omc/                                   # 项目作用域 OMC 状态
├── notepad.md                          # 三级 priority 会话笔记
├── project-memory.json                 # 项目级永久记忆
├── ultragoal/
│   ├── goals.json                      # ultragoal 计划（v4.14+）
│   └── ledger.jsonl                    # ultragoal 审计日志
└── state/                              # 会话状态（mode / ultragoal）
    └── sessions/{sessionId}/           # session-scoped 状态
```

**启用 Claude Code 原生 Agent Teams（可选但推荐）**

在 `~/.claude/settings.json` 中添加：

```JSON
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

这个配置是推荐的开关（注意：OMC 当前并不存在 `OMC_TEAM_MODE` 这个 env var）。启用后 `/team` 会走 Claude Code 原生团队工作流，性能更佳。如果未启用，OMC 会发出警告并降级到非 Team 执行模式。

### 2.3  Autopilot 体验

Autopilot 是 OMC 最核心的功能——你用自然语言描述目标，OMC 自动完成从规划到验证的全流程。

**基本用法：**

```Plain Text
# 在 Claude Code 会话内（In-session skill）
/autopilot "build a REST API for managing tasks"

# 自然语言触发（Magic Keyword）
autopilot: build a REST API for managing tasks
```

**Autopilot 内部执行流程：**

```Plain Text
用户输入 "build a REST API for managing tasks"
          ↓
1. architect agent     → 分析需求，生成架构方案
2. planner agent       → 拆解任务清单
3. executor agent      → 并行执行实现（Sonnet）
4. qa-tester agent     → 运行测试（v4.14+ 起 Sonnet）
5. verifier agent      → 验收检查（独立于 qa-tester）
6. critic agent        → 代码质量批评
7. security-reviewer   → 扫描安全漏洞（可选）
8. 输出完整可运行代码
↑ 状态文件: .omc/state/sessions/{sid}/autopilot-state.json
↑ 停止保护: persistent-mode hook 在 Stop 时注入强化消息
↑ 取消: cancelomc 关键词 或 /oh-my-claudecode:cancel
```

**实战示例：游戏账号平台账号模块**

```Plain Text
/autopilot "在 Spring Boot 3.2 项目中创建游戏账号模块，
包含账号发布、审核状态流转、Redis 缓存层，
使用 MyBatis Plus，遵循现有代码风格"
```

OMC 会自动：

- 分析现有代码结构
- 生成符合风格的 Entity、Mapper、Service、Controller
- 编写 JUnit 5 测试
- 检查 Redis key 命名规范

### 2.4 CLI vs In-session 区别

OMC 暴露两套命令入口，理解它们的区别很重要：

| 功能 | 终端 CLI（`omc ...` / `oh-my-claudecode ...`） | 会话内 Skill（`/oh-my-claudecode:...` 或简写 `/...`） |
|-|-|-|
| 环境 | 系统 Shell | Claude Code 会话内 |
| 安装（npm 包） | `npm i -g oh-my-claude-sisyphus` | — |
| Bin 名称 | `omc` / `oh-my-claudecode` / `omc-cli` | — |
| 插件安装 | — | `/plugin marketplace add oh-my-claudecode` + `/plugin install oh-my-claudecode` |
| Setup | `omc setup` | `/omc-setup`（或 `/oh-my-claudecode:omc-setup`） |
| Ask 提供商 | `omc ask codex "..."` | `/oh-my-claudecode:ask codex "..."` |
| Team 编排 | `omc team 2:codex "..."` | `/oh-my-claudecode:team 3:executor "..."` |
| omc-teams | `omc teams` | `/oh-my-claudecode:omc-teams 2:codex "..."` |
| ccg | `omc ccg "..."` | `/oh-my-claudecode:ccg "..."` |
| Autopilot | 不支持 | `/oh-my-claudecode:autopilot "..."` |
| Ralph 模式 | 不支持 | `/oh-my-claudecode:ralph "..."` |
| Ultrawork | 不支持 | `/oh-my-claudecode:ultrawork "..."` |
| Ultragoal | `omc ultragoal` | `/oh-my-claudecode:ultragoal "..."` |
| deep-interview | `omc deep-interview "..."` | `/oh-my-claudecode:deep-interview "..."` |

**关键区别：**

`omc team` / `omc teams` / `/omc-teams` 启动的是真实的 tmux 进程（codex/gemini/agy/claude CLI 各跑在独立 pane）。

`/team` 走 Claude Code 原生 Agent Teams 工作流（由 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` 环境变量切换）。

**v4.4.0 起重要变更：** Codex/Gemini 不再通过 MCP 服务器（`x`、`g` providers）调用，统一改用 `/omc-teams` 在 tmux pane 里跑真实 CLI。

### 2.5 需求澄清：deep-interview

当需求不够清晰时，不要直接 `autopilot`——先用 `/deep-interview` 梳理需求。

```Plain Text
/deep-interview "我想给游戏账号平台加一个推荐系统"
```

**deep-interview 的工作方式：**

1. 采用苏格拉底式提问，逐步暴露你没想清楚的假设
2. 按加权维度衡量需求清晰度（功能边界、技术约束、验收标准等）
3. 只有清晰度达到阈值后，才进入实现阶段

**典型对话示例：**

```Plain Text
OMC: 你提到"推荐系统"，是指：
     A) 根据买家历史行为推荐账号（协同过滤）
     B) 根据账号属性标签匹配买家偏好（基于内容）
     C) 首页热门榜单排序（规则引擎）

你: B 和 C 都要

OMC: B 方案中，"账号属性标签"由谁维护？
     卖家自填 / 系统自动提取 / 运营人工标注？

你: 卖家自填，但需要审核

OMC: 审核通过后，标签多久生效到推荐结果中？
     实时 / T+1 / 手动触发？
```

经过几轮问答后，OMC 输出一份结构化的需求文档，然后才进入 autopilot 实现阶段。

---

## 3. 第二阶段：核心技能

### 3.1 19 个专属 Agent

OMC 将开发工作拆分为 19 个专职 Agent，每个 Agent 都有固定的职责边界和默认模型配置。

**Build & Analysis 类（7 个）**

| Agent | 职责 | 默认模型 |
|-|-|-|
| `architect` | 系统架构设计、技术选型、模块划分 | Claude Opus |
| `planner` | 任务拆解、工作清单、依赖排序 | Claude Opus |
| `analyst` | 需求澄清、pre-planning 顾问 | Claude Opus |
| `explore` | 代码库探索、现有模式识别（原 `explorer` 重命名） | Claude Sonnet |
| `executor` | 核心代码实现 | Claude Sonnet |
| `scientist` | 数据分析、建模（原 `data-scientist` 重命名） | Claude Sonnet |
| `designer` | UI/UX 设计、组件设计 | Claude Sonnet |

**Review & Quality 类（6 个）**

| Agent | 职责 | 默认模型 |
|-|-|-|
| `qa-tester` | 测试用例编写、自动化测试 | Claude **Sonnet**（v4.14+ 由 Haiku 升） |
| `code-reviewer` | PR Review、风格一致性 | Claude **Sonnet**（v4.14+ 由 Haiku 升） |
| `security-reviewer` | 安全漏洞扫描、OWASP 检查 | Claude Sonnet |
| `critic` | 代码质量批评、潜在问题指出 | Claude Sonnet |
| `verifier` | 验收检查、需求对齐 | Claude Sonnet |
| `test-engineer` | 测试策略、集成/e2e 覆盖 | Claude Sonnet |

**Investigation & Debugging 类（3 个）**

| Agent | 职责 | 默认模型 |
|-|-|-|
| `debugger` | 问题定位、根因分析 | Claude Sonnet |
| `tracer` | 因果追溯、证据驱动假设 | Claude Sonnet |
| `code-simplifier` | 代码可读性简化 | Claude Sonnet |

**Coordination & Knowledge 类（3 个）**

| Agent | 职责 | 默认模型 |
|-|-|-|
| `git-master` | git 专家、原子 commit / rebase | Claude Sonnet |
| `document-specialist` | 外部文档与参考检索（原 `doc-writer` 重命名） | Claude Haiku |
| `writer` | 文档与注释 | Claude Haiku |

**已合并 / 重命名的角色：**

- `orchestrator` → 并入 `planner` + `ralplan`
- `synthesizer` → 并入 `ultrawork` / `ultraqa`
- `fixer` → 并入 `ralph` 修复循环
- `researcher` → 并入 `document-specialist` + 多个 agent 的 self-research
- `refactorer` → 并入 `executor` + `code-simplifier`
- `devops` → 并入 `executor`
- `data-scientist` → 重命名为 `scientist`
- `doc-writer` → 重命名为 `document-specialist`

**手动指定 Agent：**

```Plain Text
/team 2:security-reviewer "审计账号交易模块的 SQL 注入风险"
/team 1:architect "设计 RocketMQ 消息链路架构"
```

**模型路由的成本逻辑：**

- 复杂推理（架构、规划）→ Opus（贵但准）
- 标准实现任务 → Sonnet（平衡）
- 简单查找、格式化 → Haiku（便宜 10 倍）

整体节省 30–50% Token 成本。

### 3.2 40 个内置 Skill

Skill 是 OMC 的工作流自动化单元，用一个命令触发一套完整流程。

**Workflow Skills（17 个）**

| Skill | 命令 | 用途 |
|-|-|-|
| autopilot | `/oh-my-claudecode:autopilot "..."` | 全自动执行，端到端 |
| ralph | `/oh-my-claudecode:ralph "..."` | 持续执行直到任务完成 |
| ultrawork | `/oh-my-claudecode:ultrawork "..."` | 最大并行度极速模式 |
| ultraqa | `/oh-my-claudecode:ultraqa "..."` | 并行 + 测试覆盖率强化（v4.15+） |
| ultragoal | `/oh-my-claudecode:ultragoal "..."` | 长链路目标管理（v4.14+ OMX port） |
| team | `/oh-my-claudecode:team N:role "..."` | 启动 N 个指定 Agent 协作 |
| omc-teams | `/oh-my-claudecode:omc-teams N:codex "..."` | tmux 多 CLI worker（v4.4+ 替代 x/g） |
| ralplan | `/oh-my-claudecode:ralplan "..."` | 迭代规划共识 |
| plan | `/oh-my-claudecode:plan "..."` | strategic planning |
| deep-interview | `/oh-my-claudecode:deep-interview "..."` | 苏格拉底式需求挖掘 |
| ccg | `/oh-my-claudecode:ccg "..."` | Codex+Gemini(agy)+Claude 三模型协作 |
| autoresearch | `/oh-my-claudecode:autoresearch "..."` | 自动调研 |
| sciomc | `/oh-my-claudecode:sciomc "..."` | 科学实验多步骤 |
| deep-dive | `/oh-my-claudecode:deep-dive "..."` | 深度研究多线程 |
| ask | `/oh-my-claudecode:ask codex "..."` | 向特定 AI 提供商咨询 |
| self-improve | `/oh-my-claudecode:self-improve` | 行为自迭代 |
| learner | `/oh-my-claudecode:learner` | 行为学习 |

**Utility Skills（11 个）**

| Skill | 命令 | 用途 |
|-|-|-|
| code-review | `/code-review` | 当前改动全面代码审查（Claude Code 原生） |
| simplify | `/simplify` | 复用/可读性清理（Claude Code 原生） |
| refactor | （走 `architect` + `executor`） | 结构化重构工作流 |
| debug | `/oh-my-claudecode:debug "..."` | 系统化 debug 流程 |
| verify | `/oh-my-claudecode:verify "..."` | 证据驱动完成验证 |
| trace | `/oh-my-claudecode:trace` | agent flow 溯源 |
| visual-verdict | `/oh-my-claudecode:visual-verdict` | UI 渲染判断 |
| release | `/oh-my-claudecode:release` | release 协调 |
| skillify | `/oh-my-claudecode:skillify` | 把流程固化为 Skill |
| skill | `/oh-my-claudecode:skill` | Skill 创建/管理 |
| ai-slop-cleaner | `/oh-my-claudecode:ai-slop-cleaner` | LLM 风格污染清理 |

**Setup & Maintenance（12 个）**

| Skill | 命令 | 用途 |
|-|-|-|
| setup | `/oh-my-claudecode:setup` | OMC 完整安装 |
| omc-setup | `/oh-my-claudecode:omc-setup` | OMC 增量配置 |
| omc-doctor | `/oh-my-claudecode:omc-doctor` | 故障排查 |
| omc-reference | `/oh-my-claudecode:omc-reference` | 文档参考 |
| hud | `/oh-my-claudecode:hud setup` | HUD 状态栏配置 |
| mcp-setup | `/oh-my-claudecode:mcp-setup` | MCP 安装 |
| configure-notifications | `/oh-my-claudecode:configure-notifications` | 通知配置（Discord/Telegram/Slack/OpenClaw） |
| cancel | `/oh-my-claudecode:cancel` | 中断当前编排 |
| external-context | `/oh-my-claudecode:external-context` | 外部上下文注入 |
| deepinit | `/oh-my-claudecode:deepinit` | AGENTS.md 增量再生 |
| remember | `/oh-my-claudecode:remember` | 持久化记忆条目 |
| writer-memory | `/oh-my-claudecode:writer-memory` | 写入 writer 记忆 |
| wiki | `/oh-my-claudecode:wiki` | 项目 wiki 维护 |
| project-session-manager | `/oh-my-claudecode:project-session-manager` | 会话管理 |
| local-build-reminder | （内置钩子式，不可显式调用） | 提示进行本地构建 |

> **总数：40 个 Skill**

**ralph vs autopilot 的区别：**

- `autopilot`：完成一次完整的任务周期后结束
- `ralph`：内置重试循环，如果验证失败会自动重新执行 verifier 循环，直到真正完成

ralph / autopilot / ultrawork / ultraqa / ultragoal **都是 Skill 不是 hook**。它们的持续执行由 persistent-mode hook 在 Stop 时注入强化消息保证；状态文件在 `.omc/state/sessions/{sid}/*-state.json`；取消方式为 `cancelomc` 关键词 或 `/oh-my-claudecode:cancel` 命令。

ralph 适合复杂任务，autopilot 适合相对明确的任务。

**ultrawork 的并行策略：**

ultrawork 会将任务拆分为可并行的子任务，同时启动多个 executor Agent，最后综合结果。适合：

- 大型代码库的批量文件修改
- 多模块同步重构
- 大规模测试补全

**ultraqa 与 ultrawork 的差异（v4.15+）：**

- ultrawork：代码批量改造，并行 executor
- ultraqa：在 ultrawork 基础上叠加测试覆盖率强化，由独立 verifier 闭环驱动

### 3.3 Team 模式流水线

Team 模式自 v4.1.7 起就是 OMC 的标准编排面，v4.4.0 起 Codex/Gemini worker 也归到 Team 流程。复杂任务推荐走 `/team`，或更高层 skill（`/ultrawork` / `/ultraqa` / `/ultragoal`）。

**五阶段流水线：**

```Plain Text
team-plan → team-prd → team-exec → team-verify → team-fix
    ↑                                                  |
    |_________________ 循环直到通过 __________________|
```

**各阶段详解：**

**1. team-plan（规划）**

- 由 `architect` + `planner` 主导
- 输出：任务清单、模块依赖图、工作量估算
- 触发：用户输入目标描述

**2. team-prd（产品需求文档）**

- 由 `planner` + `doc-writer` 主导
- 输出：结构化 PRD，明确功能边界、接口契约、验收标准
- 这是 team-exec 的输入依据

**3. team-exec（执行）**

- 由多个 `executor` 并行主导
- 根据 PRD 分配任务，并行实现
- 每个 executor 在独立的 git worktree 中工作（不互相干扰）

**4. team-verify（验证）**

- 由 `qa-tester` + `critic` + `verifier` 主导
- 运行测试、代码审查、需求对齐检查
- 通过 → 完成；失败 → 进入 team-fix

**5. team-fix（修复）**

- 由 `fixer` 主导
- 针对 team-verify 发现的问题逐一修复
- 修复后自动返回 team-verify，形成闭环

**启动 Team 模式：**

```Plain Text
# 3 个 executor 并行执行任务
/team 3:executor "重构账号交易模块，拆分 Service 层，补充单元测试"

# 指定多种 Agent 类型
/team 1:architect,2:executor "设计并实现账号推荐 API"
```

**启用原生 Teams：**

```JSON
// ~/.claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### 3.4 Magic Keywords

Magic Keywords 是 OMC 最人性化的设计——不需要记命令，只需要在对话中自然说出关键词，OMC 自动识别并激活对应流程。**v4.15.0 起关键词触发可通过 `config.jsonc` 的 `keywords` 段配置（#3289）**。

**Execution Mode Keywords（激活 Skill 并创建 state file，来源：`docs/HOOKS.md`）**

| 关键词 | 激活 Skill | 说明 |
|-|-|-|
| `cancelomc` / `stopomc` | cancel | 取消所有 active mode |
| `ralph` / `don't stop` / `must complete` / `until done` | ralph | 持续执行直到完成 |
| `autopilot` / `build me` / `I want a` / `handle it all` / `end to end` / `auto-pilot` / `full auto` / `fullsend` / `e2e this` | autopilot | 全自动执行 |
| `ultrawork` / `ulw` / `uw` | ultrawork | 最大并行 |
| `ccg` / `claude-codex-gemini` | ccg | 三模型协作 |
| `ralplan` | ralplan | 迭代规划 |
| `deep interview` / `ouroboros` | deep-interview | 苏格拉底式澄清 |

**Workflow 入口关键词：**

| 关键词 | 效果 | 示例 |
|-|-|-|
| `team:` | Team 标准编排 | `/team 3:executor "fix all TS errors"` |
| `omc-teams:` | tmux 多 CLI worker | `omc-teams: 2:codex security review` |
| `plan:` | 规划访谈 | `plan the API` |

**冲突优先级：** cancel > ralph > autopilot > ultrawork。Team worker 内（`OMC_TEAM_WORKER` 已设置时）关键词检测自动禁用，防止无限递归。

**已弃用但仍兼容的旧入口：**

- `swarm` → 改用 `team:`
- `ultrapilot` → 改用 `team:`

### 3.5 Model 路由与成本优化

OMC 的 Model 路由是其成本优势的核心机制。**v4.15+ 默认走 tier-alias（opus / sonnet / haiku）**，由环境变量解析为 provider-safe 的具体 model id。v4.13 之前的 `opusThreshold` / `haikuThreshold` 二元阈值 key **已被移除**。

**Tier-alias 解析：**

```Plain Text
Agent 内部声明 tier-alias（opus / sonnet / haiku）
        ↓
OMC 读取环境变量解析为 provider-safe model id:
  ANTHROPIC_DEFAULT_OPUS_MODEL
  ANTHROPIC_DEFAULT_SONNET_MODEL
  ANTHROPIC_DEFAULT_HAIKU_MODEL
        ↓
或在 Bedrock / Vertex / LiteLLM 代理场景:
  CLAUDE_CODE_BEDROCK_OPUS_MODEL
  CLAUDE_CODE_BEDROCK_SONNET_MODEL
  CLAUDE_CODE_BEDROCK_HAIKU_MODEL
        ↓
OMC_SUBAGENT_MODEL    # 子 agent 兜底 tier
```

**默认模型：** v4.15.0 起加入 Claude Sonnet 5 默认族

**成本对比示例：**

假设一天 100 个任务：

- 20 个架构类 → Opus（贵）
- 60 个实现类 → Sonnet（中）
- 20 个简单类 → Haiku（便宜 \~10x）

vs 全部用 Sonnet：节省约 (20 × Haiku节省量) = 约 30–40%

**在 config.jsonc 中配置路由（新版）：**

```Plain Text
{
  "modelRouting": {
    "defaultModel": "sonnet",
    "overrides": {
      "security-reviewer": "sonnet",
      "document-specialist": "haiku",
      "writer": "haiku"
    }
  },
  "modelResolver": {
    "opus":   "",
    "sonnet": "",
    "haiku":  ""
  }
}
```

> **不要 hardcode 裸 model id**（如 `claude-sonnet-4-20250514`），用 tier-alias 让环境变量解析。OMX v0.x 的 `opusThreshold` 概念已被废弃。

### 3.6 状态持久化：notepad 与 project-memory

OMC 提供三层状态持久化机制，解决 Claude Code 跨会话"失忆"的问题。

**Notepad（会话内记事本，三级优先级）**

存储路径：`.omc/notepad.md`（项目作用域）或 `~/.omc/notepad.md`（用户作用域）。通过 MCP 工具直接调用，而非 skill 命令：

```Plain Text
notepad_write_priority "账号模块使用软删除，is_deleted 字段，不做物理删除"
notepad_write_working  "Redis Key 前缀规范：account:detail:{id}"
notepad_write_manual   "会议纪要:..."
notepad_read           # 读取
notepad_prune          # 清理过期 working 条目
notepad_stats          # 查看状态
```

| 优先级 | 工具 | 说明 |
|-|-|-|
| priority | `notepad_write_priority` | 始终加载（≤500 字符），绝对不能丢 |
| working | `notepad_write_working` | 当前会话工作状态，7 天滚动自动清理 |
| manual | `notepad_write_manual` | 人工标注，永不自动清理 |

适合场景：当前会话的临时决策记录、约定事项。

**Project Memory（跨会话永久记忆）**

存储路径：`.omc/project-memory.json`。通过 MCP 工具调用：

```Plain Text
project_memory_write              # 整体写入（覆盖）
project_memory_add_note           # 追加 note 类条目
project_memory_add_directive      # 追加 directive 类条目（高优先级）
project_memory_read               # 读取
```

**自动维护钩子：** 

SessionStart → `project-memory-session.mjs`；

PostToolUse → `project-memory-posttool.mjs`；

PreCompact → `project-memory-precompact.mjs`。

**多会话并发：** 通过 `withProjectMemoryLock`（`src/lib/file-lock.ts`）序列化，防止 lost-update race。

**v4.15.2 新增：** `OMC_STATE_DIR` 环境变量可覆盖 learner 等 state 路径

**最佳实践：在 project-memory 中存什么**

```Plain Text
✅ 技术栈和版本信息
✅ 命名规范（包名、表名、Redis Key、MQ Topic）
✅ 架构决策（为什么选了某个方案）
✅ 不能碰的禁区（比如"生产环境 XXX 表不能直接操作"）
✅ 常用账号/域名/端口

❌ 代码本身（让 git 管）
❌ 需求文档（让 PRD 文件管）
❌ 敏感信息（密码、密钥）
```

## 4. 第三阶段：进阶编排

### 4.1 tmux CLI Worker

tmux CLI Worker 是 OMC 真正实现"多 AI 并行"的底层机制——在独立的 tmux pane 中启动真实的 CLI 进程（claude / codex / gemini），每个进程完全独立运行。

**前置准备：**

```Bash
# 安装 tmux
brew install tmux  # macOS

# 启动一个 tmux session
tmux new -s dev

# 在 tmux session 中启动 Claude Code
claude
```

**基本用法：**

```Bash
# v4.4.0 起 Codex/Gemini 不再走 MCP server (x/g)，
# 统一改用 omc-teams（会话内）或 omc team（终端 CLI）：

# 启动 2 个 Codex worker 做安全审计
/oh-my-claudecode:omc-teams 2:codex "review auth module for security issues"

# 启动 2 个 Gemini worker 做 UI 审查
/oh-my-claudecode:omc-teams 2:gemini "review UI for accessibility"

# 启动 1 个 Claude worker 做功能实现
/oh-my-claudecode:omc-teams 1:claude "implement payment flow"

# v4.15.0+ antigravity 替代 gemini
/oh-my-claudecode:omc-teams 2:agy "review API design consistency"

# CLI 等价命令
omc team 2:codex "..."

# 管理命令
omc team status auth-review
omc team shutdown auth-review
```

**Worker 生命周期：**

```Plain Text
omc team N:provider "task"
        ↓
在 tmux 中开 N 个新 pane
        ↓
每个 pane 启动对应 CLI（codex/gemini/claude）
        ↓
执行任务
        ↓
任务完成 → Worker 自动退出（不占用资源）
```

**实战案例：游戏账号平台全面 Code Review**

```Bash
# 启动 3 个并行 review worker
omc team 2:codex "review all Service layer classes for business logic issues and missing validations"
omc team 1:gemini "review API response formats and error handling consistency"
omc team 1:claude "review Redis usage patterns and potential cache stampede issues"
```

三个 worker 同时运行，约 10 分钟完成原本需要 40 分钟的全面审查。

### 4.2 多 AI 协作：/ccg

`/ccg`（Claude + Codex + Gemini）是 OMC 的三模型协作命令，在单次调用内获得三个模型的视角，由 Claude 综合输出。

**适用场景：**

- PR Review（需要多角度分析）
- 架构决策（不同模型有不同偏好）
- 文档生成（Gemini 的大上下文处理大代码库）

**用法：**

```Plain Text
/ccg Review this PR — architecture (Codex) and API design consistency (Gemini)

/ccg 分析这段 RocketMQ Consumer 代码的问题：
[粘贴代码]
```

**内部路由：**

```Plain Text
/ccg "你的问题"
     ↓
/ask codex "你的问题"   → Codex 的分析结果
/ask gemini "你的问题"  → Gemini 的分析结果
         ↓
Claude synthesizer → 综合两方观点，生成最终答案
```

**注意：** `/ccg` 需要已安装 codex 和 gemini CLI，且在活跃的 tmux session 中运行。

### 4.3 自定义 Skill

OMC 允许你创建项目专属的 Skill，将团队的最佳实践封装为一键命令。

**Skill 文件结构：**

自定义 Skill 存放在 `~/.claude/oh-my-claudecode/skills/` 目录下，每个 Skill 是一个 Markdown 文件（SKILL.md 格式）。

**创建示例：游戏账号平台专属 Review Skill**

创建文件 `~/.claude/oh-my-claudecode/skills/gat-review/SKILL.md`：

```Markdown
# GAT Code Review Skill

## 用途
专为游戏账号交易平台（GAT）设计的代码审查 Skill，
检查平台特有的规范和风险点。

## 触发命令
/gat-review

## 检查清单

### 1. 账号状态流转
- [ ] 账号状态变更是否通过 AccountStatusService 统一处理
- [ ] 状态流转是否有幂等性保护（Redis 分布式锁）
- [ ] 是否发送了对应的 RocketMQ 状态变更事件

### 2. 交易安全
- [ ] 金额计算是否使用 BigDecimal，禁止 double
- [ ] 是否有防超卖检查（Redis 原子操作）
- [ ] 用户余额变更是否有完整的流水记录

### 3. 缓存规范
- [ ] Redis Key 格式是否符合 account:detail:{id} 规范
- [ ] 缓存是否设置了合理的 TTL
- [ ] 是否处理了缓存击穿（空值缓存或互斥锁）

### 4. 数据库
- [ ] 是否使用软删除（is_deleted），禁止物理删除
- [ ] 大批量查询是否有分页
- [ ] 是否避免了 SELECT *

## 执行步骤
1. 扫描当前改动的所有 Java 文件
2. 逐条对照检查清单
3. 输出问题报告（严重/警告/建议 三级）
4. 对严重问题给出修复代码示例
```

**注册并使用：**

```Bash
# 重新运行 setup 以加载新 Skill
/omc-setup

# 使用自定义 Skill
/gat-review
```

**Skill 中可以引用其他 Skill：**

```Markdown
## 依赖
- 先运行 /code-review 做基础检查
- 再运行 /gat-review 做平台专属检查
```

### 4.4 Hooks 生命周期

OMC 的 Hooks 系统允许在 Agent 执行的关键时间点插入自定义逻辑，实现质量门控、日志记录、通知等功能。**OMC v4.15.2 提供 25 个 hooks，注册在 11 个 lifecycle event 上**（来源：`docs/HOOKS.md`）。

**11 个 Lifecycle Events：**

| # | Event | 触发时机 | OMC 注册的 hooks（timeout） |
|-|-|-|-|
| 1 | UserPromptSubmit | 用户提交 prompt | keyword-detector（10s）、skill-injector（15s） |
| 2 | SessionStart | 新会话 | session-start（5s）、project-memory-session（5s）、setup-init（init matcher，30s）、setup-maintenance（maintenance matcher，60s） |
| 3 | PreToolUse | 工具调用前 | pre-tool-enforcer（3s） |
| 4 | PermissionRequest | Bash 权限请求（OMC 增强） | permission-handler（Bash matcher，5s） |
| 5 | PostToolUse | 工具调用成功 | post-tool-verifier（3s）、project-memory-posttool（3s） |
| 6 | PostToolUseFailure | 工具调用失败 | post-tool-use-failure（3s） |
| 7 | SubagentStart | 子 agent 启动 | subagent-tracker start（3s） |
| 8 | SubagentStop | 子 agent 完成 | subagent-tracker stop（5s）、verify-deliverables（5s） |
| 9 | PreCompact | 上下文压缩前 | pre-compact（10s）、project-memory-precompact（5s） |
| 10 | Stop | 主回复结束 | context-guard-stop（5s）、workflow-drift-guard（3s）、persistent-mode（10s）、code-simplifier（5s，opt-in） |
| 11 | SessionEnd | 会话结束 | session-end（30s） |

**Hook 配置方式（`hooks/hooks.json`）：**

```JSON
{
  "EventName": [
    {
      "matcher": "*",
      "hooks": [
        {
          "type": "command",
          "command": "node scripts/hook.mjs",
          "timeout": 5
        }
      ]
    }
  ]
}
```

- **EventName**：生命周期事件名
- **matcher**：触发条件（`*` 匹配全部）
- **command**：Node 脚本路径
- **timeout**：最长执行秒数
- **payload 字段**：含 `hook_event_name`、`session_id`、`cwd`、`tool_name`、`tool_input`、`tool_output`、`agent_type`、`agent_id`

**按用途分类（4 类）：**

- **核心**：keyword-detector、persistent-mode
- **上下文管理**：notepad、project-memory、pre-compact
- **质量 / 验证**：permission-handler、subagent-tracker、code-simplifier（opt-in）、workflow-drift-guard
- **运维 / 平台**：session-start / -end、setup-init / -maintenance、pre/post-tool-verifier / -use-failure、project-memory-session / -posttool / -precompact、context-guard-stop、verify-deliverables、pre-tool-enforcer

**关闭 hooks：**

```Bash
# 关闭全部
export DISABLE_OMC=1

# 按名关闭（逗号分隔，支持简写 alias）
export OMC_SKIP_HOOKS="keyword-detector,notepad"
# 关闭 PostToolUseFailure 的两种写法
export OMC_SKIP_HOOKS="post-tool-use-failure"
export OMC_SKIP_HOOKS="post-tool-verifier"   # alias 同时 skip
```

下面原文中的 3 个示例 hook 脚本（pre-tool-use.js、post-tool-use.js、stop.js）仍然适用于 OMC v4.15.2

**Hooks 文件结构：**

存放在 `~/.claude/oh-my-claudecode/hooks/` 目录：

```Plain Text
hooks/
├── pre-tool-use.js      # PreToolUse hook
├── post-tool-use.js     # PostToolUse hook
├── stop.js              # Stop hook
└── session-start.js     # SessionStart hook
```

**示例：PreToolUse Hook 阻止危险操作**

```JavaScript
// hooks/pre-tool-use.js
export default async function preToolUse({ tool, input, context }) {
  // 阻止在生产环境表上执行 DROP 操作
  if (tool === 'bash' && input.command?.includes('DROP TABLE')) {
    return {
      block: true,
      reason: '🚫 检测到 DROP TABLE 操作，已阻止。如需执行请手动确认。'
    };
  }

  // 阻止直接修改 application-prod.yml
  if (tool === 'write_file' && input.path?.includes('application-prod')) {
    return {
      block: true,
      reason: '🚫 不允许直接修改生产环境配置文件。'
    };
  }

  return { block: false };
}
```

**示例：PostToolUse Hook 记录 SQL 执行**

```JavaScript
// hooks/post-tool-use.js
export default async function postToolUse({ tool, input, output, context }) {
  // 记录所有数据库操作
  if (tool === 'bash' && input.command?.includes('mysql')) {
    console.log(`[SQL Audit] ${new Date().toISOString()} - ${input.command}`);
  }
}
```

**示例：Stop Hook 质量门控**

```JavaScript
// hooks/stop.js
export default async function stop({ context, reason }) {
  // 如果有未通过的测试，阻止停止
  const hasFailingTests = context.lastTestResult?.failed > 0;
  if (hasFailingTests) {
    return {
      block: true,
      reason: `⚠️ 还有 ${context.lastTestResult.failed} 个测试未通过，请先修复。`
    };
  }
  return { block: false };
}
```

### 4.5 LSP + AST Grep

OMC 集成了语言服务器协议（LSP）和结构化代码搜索（AST Grep），让 Agent 能真正"理解"代码结构，而不是盲目的文本搜索。

**LSP 功能：**

| 功能 | 用途 |
|-|-|
| Hover Info | 查看类型信息、JavaDoc |
| Go to Definition | 跳转到方法/类定义 |
| Find References | 找出所有调用点 |
| Type Checking | 全项目类型验证 |
| Diagnostics | 编译时错误检测 |

**在 OMC 中启用 LSP（Java 项目）：**

```Plain Text
// config.jsonc
{
  "lsp": {
    "enabled": true,
    "java": {
      "server": "eclipse.jdt.ls",
      "projectRoot": "/path/to/your/project"
    }
  }
}
```

**AST Grep（结构化代码搜索）：**

普通文本搜索找 `findById` 会匹配所有字符串；  

AST Grep 可以找"在 Service 类中调用 Repository 的 findById 方法"——基于语法树的精准搜索。

**使用示例：**

```Plain Text
# 找出所有没有 @Transactional 注解的 update 方法
/ask claude "用 AST Grep 找出 Service 层中所有方法名包含 update 但没有 @Transactional 注解的方法"
```

OMC 内部会将此转化为 ast-grep 的结构化查询，比 grep 准确得多。

**适用场景：**

- 大规模重构前的影响范围分析
- 找出所有违反编码规范的代码模式
- 批量替换特定代码结构

### 4.6 Python REPL

OMC 内置了一个持久化的 Python REPL 环境，预装了 pandas、numpy、matplotlib，Agent 可以在会话内直接运行数据分析代码。

**适用场景：**

- 分析线上日志数据
- 对交易数据做统计分析
- 生成可视化报表
- 验证算法逻辑

**使用示例：**

```Plain Text
/ask claude "用 Python 分析这个 CSV 文件中的账号交易分布，
并画出每小时成交量的折线图"
[上传 CSV 文件]
```

OMC 会在 Python REPL 中：

1. 用 pandas 读取并清洗数据
2. 用 matplotlib 生成图表
3. 在会话内展示结果
4. 保留环境状态，可以继续追问

**持久化的含义：**

Python REPL 的状态在整个会话内持久——你在第一个问题中定义的变量，在第二个问题中还可以用。这对于迭代式数据分析非常重要。

---

## 5. 第四阶段：生产掌握

### 5.1 游戏账号平台实战案例

基于 Spring Boot 3.2 + MyBatis Plus + Redis + RocketMQ 技术栈，以下是几个典型的 OMC 实战场景。

#### 案例一：账号模块全面重构

**背景**：账号 Service 层膨胀到 3000+ 行，职责混乱。

**OMC 执行方案：**

```Plain Text
1. deep-interview 阶段（约 10 分钟）：
/deep-interview "重构 AccountService，拆分为职责单一的子 Service"

OMC 会追问：
- 当前 AccountService 的主要职责有哪些？
- 重构后需要保持向后兼容吗？
- 是否要同步更新单元测试？

2. Team 执行阶段：
/team 3:executor "按 PRD 拆分 AccountService 为：
AccountQueryService（查询）、
AccountPublishService（发布流程）、
AccountStatusService（状态流转）、
AccountCacheService（缓存层）"

3. 验证阶段（自动）：
team-verify 会：
- 运行所有现有测试确保不回归
- 检查新 Service 的职责边界
- 验证 Spring Bean 注入是否正确
```

#### 案例二：RocketMQ 消息链路梳理

**背景**：系统有 20+ 个 Topic，没有统一文档，新人难以理解。

```Plain Text
/autoresearch "梳理项目中所有 RocketMQ Producer 和 Consumer，
生成完整的消息流转文档，包括：
Topic 名称、生产者类、消费者类、触发场景、消息体结构"
```

OMC 会：

1. 扫描所有 `@RocketMQMessageListener` 注解
2. 找出所有 `rocketMQTemplate.send*` 调用
3. 追踪每个 Topic 的完整链路
4. 生成 Markdown 格式的消息链路文档

#### 案例三：Redis 缓存一致性审计

```Plain Text
/team 1:security-reviewer,1:critic "审计账号详情查询的缓存使用，
重点检查：
1. 更新时缓存是否及时失效
2. 是否有缓存击穿风险
3. TTL 设置是否合理
4. 是否有并发写入的竞态条件"
```

#### 案例四：API 接口批量补充单元测试

```Plain Text
/oh-my-claudecode:ultraqa "为 controller 包下所有未覆盖的接口补充 JUnit 5 + MockMvc 单元测试,
使用 @SpringBootTest 方式，Mock 掉 Service 层，
覆盖正常流程和边界异常情况"
```

ultraqa 会并行处理多个 Controller + 同时强化测试覆盖率到目标线，速度是顺序执行的 3–5 倍。纯重构任务用 `/ultrawork` 即可；同时要拉高覆盖率用 `/ultraqa`（v4.15+）。

### 5.2 config.jsonc 调优

**完整的 `~/.claude/oh-my-claudecode/config.jsonc` 配置示例（v4.15.2 schema）：**

```Plain Text
{
  // 模型路由：v4.15+ 默认走 tier-alias
  "modelRouting": {
    "defaultModel": "sonnet",
    "overrides": {
      "security-reviewer":   "sonnet",
      "document-specialist": "haiku",
      "writer":              "haiku"
    }
  },

  // 模型 resolver 由环境变量提供
  // (ANTHROPIC_DEFAULT_*_MODEL / CLAUDE_CODE_BEDROCK_*_MODEL / OMC_SUBAGENT_MODEL)
  "modelResolver": {
    "opus":   "",
    "sonnet": "",
    "haiku":  ""
  },

  // Magic Keywords v4.15.0+ 可配置（#3289）
  "keywords": {
    "ralph":          { "enabled": true, "priority": 80 },
    "autopilot":      { "enabled": true, "priority": 70 },
    "ultrawork":      { "enabled": true, "priority": 60 },
    "ccg":            { "enabled": true, "priority": 55 },
    "deep-interview": { "enabled": true, "priority": 50 },
    "cancelomc":      { "enabled": true, "priority": 99 },
    "ralplan":        { "enabled": true, "priority": 45 }
  },

  // Team 模式配置
  "team": {
    "maxWorkers": 5,
    "worktreeEnabled": true,
    "verifyRetries": 3,
    "autoMerge": false
  },

  // 质量门控
  "qualityGates": {
    "requireTestsPass": true,
    "minTestCoverage": 60,
    "blockOnSecurityIssues": true
  },

  // HUD v4.14+ 新增
  "omcHud": {
    "enabled": true,
    "preset": "focused"         // 缺省时 fallback 到此 preset（#3400）
  },

  // 状态管理
  "state": {
    "persistNotepad": false,
    "projectMemoryFile": ".omc/project-memory.json",
    "stateDir":         ".omc/state",
    "ultragoalDir":     ".omc/ultragoal"
  },

  // Hooks 配置
  "hooks": {
    "enabled": true,
    "hooksDir": "hooks",
    "disableAll": false,
    "skipHooks": []             // 等价于 OMC_SKIP_HOOKS 环境变量
  },

  // LSP 配置
  "lsp": {
    "enabled": true,
    "java": { "server": "eclipse.jdt.ls" }
  }
}
```

> **重要：** v4.13 之前使用的 `modelRouting.opusThreshold` / `haikuThreshold` 二元阈值字段已被移除；改用上面的 `modelResolver` 配合环境变量。`doc-writer` 已重命名为 `document-specialist`。

### 5.3 融入 Claude Code 课程体系

基于你现有的 Claude Code 中文课程，OMC 最适合作为**高级篇的独立章节**。

**推荐课程结构：**

```Plain Text
初级篇（现有）
├── Claude Code 基础概念
├── CLAUDE.md 配置
└── 基础 Slash Commands

中级篇（现有）
├── Hooks 生命周期
├── Skills 系统
├── 自定义 Subagents
└── MCP Server 开发

高级篇（新增 OMC 章节）
├── 第1课：为什么需要多 Agent 编排
│   ├── 单 Agent 的局限性
│   └── OMC 的设计哲学
├── 第2课：OMC 入门（安装到 autopilot）
├── 第3课：19 Agent + 40 Skill 全解
├── 第4课：Team / Ultrawork / Ultraqa / Ultragoal 编排面
├── 第5课：tmux Worker 与多 AI 协作（omc-teams / ccg）
├── 第6课：自定义 Skill 开发（skillify）
├── 第7课：Hooks 实战（11 events + 21 hooks）
├── 第8课：tier-alias 模型路由与 config.jsonc 调优
├── 第9课：state 持久化（notepad / project-memory / ultragoal / shared-memory）
└── 第10课：综合实战（游戏账号平台案例）
```

**每节课的内容结构建议（与现有课程保持一致）：**

```Markdown
## 第 X 课：[课程名称]

### 本课目标
[3–5 个具体的学习目标]

### 概念讲解
[核心概念说明，配图]

### 实战演示
[以游戏账号交易平台为例的具体操作]

### 常见问题
[FAQ]

### 本课小结
[关键点回顾]

### 课后练习
[动手作业]
```

**OMC 章节的核心卖点（面向读者）：**

- "原来 Claude Code 可以同时开多个 AI 帮我干活"
- "复杂重构不再需要盯着屏幕等，让 team 模式跑就行"
- "成本降 30–50%，这个我需要"

### 5.4 Autoresearch 模式

Autoresearch 是 OMC 内置的自动调研能力，适合在实现前做技术调研。

**两种触发方式：**

```Bash
# 终端 CLI
omc autoresearch "Spring Boot 3.2 集成 RocketMQ 5.x 的最佳实践"

# 会话内（通过 deep-interview 的 autoresearch flag）
/deep-interview --autoresearch "评估在账号平台引入 Elasticsearch 做全文搜索的可行性"
```

**Autoresearch 输出结构：**

```Markdown
## 调研主题：[主题]

### 技术背景
...

### 主流方案对比
| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
...

### 推荐方案
[基于你的技术栈和约束的具体推荐]

### 实施风险
...

### 参考资料
...
```

**与 deep-interview 的关系：**

- `deep-interview` 侧重**挖掘需求**（你要做什么）
- `autoresearch` 侧重**技术调研**（怎么做最好）

两者可以组合使用：先 deep-interview 确认要做什么，再 autoresearch 研究怎么做。

### 5.5 升级与迁移策略

**两条独立升级轨道：**

```Plain Text
# 插件轨道（本机 Claude Code 会话内）
/plugin marketplace update omc
/omc-setup

# CLI 轨道（全局 npm 包）
npm install -g oh-my-claude-sisyphus@latest

# 两条都装了就把两个都跑一遍
```

> v4.15.2 官方明确：npm CLI 与 Claude Code marketplace/plugin 是两条独立轨道，**不是二选一**。两条都装了要同时升级。

**版本变更注意事项：**

查看官方 Releases：https://github.com/Yeachan-Heo/oh-my-claudecode/releases

完整 Changelog：https://raw.githubusercontent.com/Yeachan-Heo/oh-my-claudecode/main/CHANGELOG.md

**升级后验证清单：**

```Bash
# 1. 检查 OMC 版本（应回显 v4.15.x）
/omc-setup

# 2. 检查 HUD 配置
/oh-my-claudecode:hud

# 3. 测试基础功能
/oh-my-claudecode:autopilot "hello world test"

# 4. 检查自定义 Skill 是否还能加载
/your-custom-skill

# 5. 检查 config.jsonc 是否有新字段需要补充
# 对比官方 schema: docs/settings-schema.md
```

**CJK 输入法已知问题：**

如果你使用中文输入法（fcitx / ibus / 搜狗等），在 OMC 中可能遇到 IME 候选词触发意外命令的问题。官方文档有专项说明：https://omc.vibetip.help/docs/reference/cjk-ime

临时解决方案：在输入复杂中文时，先在文本编辑器写好，再粘贴进 Claude Code。

---

## 6. 附录：快速命令参考

### 6.1 安装与初始化

```Bash
# 插件轨道（在 Claude Code 会话内）
/plugin marketplace add oh-my-claudecode
/plugin install oh-my-claudecode

# CLI 轨道（全局 npm）
npm install -g oh-my-claude-sisyphus@latest

# 初始化
/omc-setup
/oh-my-claudecode:omc-setup         # 带命名空间

# 启用原生 Agent Teams
# ~/.claude/settings.json 中添加：
# "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"

# 升级（两条轨道分别）
# 插件轨道：
/plugin marketplace update omc
/omc-setup
# CLI 轨道：
npm install -g oh-my-claude-sisyphus@latest
```

### 6.2 核心工作流命令

> v4.14 / v4.15 新增了 `ultraqa` / `ultragoal` / `ralplan` / `autoresearch` / `sciomc` / `deep-dive` 等工作流；所有 skill 命令在 v4.15 都同时支持带命名空间形式（`/oh-my-claudecode:xxx`）和简写形式（`/xxx`，前提是别名已注册）。下文默认带命名空间，简写形式作为 alias 列出。

```Bash
# Autopilot：从想法到代码
/oh-my-claudecode:autopilot "build X"
/autopilot "build X"                       # 简写 alias
autopilot: build X                          # magic keyword

# Ralph：持续执行直到完成
/oh-my-claudecode:ralph "fix all failing tests"
/ralph "fix all failing tests"
ralph: fix all failing tests

# Ultrawork：最大并行度
/oh-my-claudecode:ultrawork "add unit tests to all controllers"
/ultrawork "add unit tests to all controllers"
ulw: add unit tests to all controllers      # short keyword

# Ultraqa：并行 + 测试覆盖率强化（v4.15+）
/oh-my-claudecode:ultraqa "improve coverage on payment module"

# Ultragoal：跨会话目标管理（v4.14+，OMX port）
/oh-my-claudecode:ultragoal "完成账号平台 v2 重构"
omc ultragoal "完成账号平台 v2 重构"        # CLI 等价

# Team：多 Agent 协作
/oh-my-claudecode:team 3:executor "refactor service layer"
/oh-my-claudecode:team 1:architect,2:executor "design and implement X"

# Plan / Ralplan：战略规划 / 迭代规划共识
/oh-my-claudecode:plan "API 设计"
plan: API 设计                              # magic keyword
/oh-my-claudecode:ralplan "this feature"
ralplan: this feature

# Autoresearch：自动调研（端到端技术对比 + 推荐方案）
/oh-my-claudecode:autoresearch "Spring Boot 3.2 集成 RocketMQ 5.x 的最佳实践"
omc autoresearch "Spring Boot 3.2 集成 RocketMQ 5.x 的最佳实践"

# Sciomc：科学实验多步骤（v4.14+）
/oh-my-claudecode:sciomc "对比 MySQL 与 TiDB 的分页性能"

# Deep-dive：深度研究多线程（v4.14+）
/oh-my-claudecode:deep-dive "调研账号推荐系统选型"

# Deep Interview：需求澄清
/oh-my-claudecode:deep-interview "我想构建推荐系统"
/deep-interview "我想构建推荐系统"

# CCG：三模型协作
/oh-my-claudecode:ccg "review this PR from architecture and UI angles"
/ccg "review this PR from architecture and UI angles"

# 取消当前 active mode（重要：原文 §6.2 缺失，v4.14+ 必备）
cancelomc                                   # magic keyword
/oh-my-claudecode:cancel                    # 命令
```

### 6.3 tmux Worker 命令（终端）

```Bash
# 启动 worker
omc team 2:codex "security review"
omc team 2:gemini "UI review"
omc team 1:claude "implement payment flow"

# 管理
omc team status <session-name>
omc team shutdown <session-name>

# 自动调研
omc autoresearch "Spring Boot 最佳实践"
```

### 6.4 状态管理命令

```Bash
# Notepad（会话内）
/notepad add "重要约定"
/notepad list
/notepad clear

# Project Memory（持久化）
/project-memory add "技术栈信息"
/project-memory list
/project-memory remove <id>
```

### 6.5 工具类命令

```Bash
# 代码审查
/code-review
/gat-review  # 自定义 Skill

# 调试
/debug "问题描述"

# 文档生成
/docs "生成 AccountService 的 JavaDoc"

# 向特定 AI 咨询
/ask codex "this code has security issues?"
/ask gemini "review this UI component"
```

### 6.6 配置文件路径

```Plain Text
~/.claude/settings.json                          # Claude Code 原生 + 实验性开关
~/.claude/oh-my-claudecode/config.jsonc          # OMC 主配置
~/.claude/oh-my-claudecode/skills/               # 用户级自定义 Skill 目录
~/.claude/oh-my-claudecode/hooks/                # 用户级自定义 Hooks 目录
~/.claude/oh-my-claudecode/plugins/              # 插件 shim 注册目录

.omc/                                            # 项目作用域状态根
├── notepad.md                                   # 三级 priority 会话笔记
├── project-memory.json                          # 项目级永久记忆
├── skills/                                      # 项目级自定义 Skill
├── hooks/                                       # 项目级 hooks 配置
├── ultragoal/
│   ├── goals.json                               # ultragoal 计划
│   └── ledger.jsonl                             # ultragoal 审计日志
└── state/
    └── sessions/{sessionId}/                    # session-scoped 状态
        ├── autopilot-state.json
        ├── ralph-state.json
        ├── ultrawork-state.json
        ├── ultraqa-state.json
        └── ultragoal-state.json
```

### 6.7 有用的链接

| 资源 | 地址 |
|-|-|
| 官方文档站 | https://yeachan-heo.github.io/oh-my-claudecode-website |
| CLI 参考 | https://yeachan-heo.github.io/oh-my-claudecode-website/docs/#cli-reference |
| 工作流 | https://yeachan-heo.github.io/oh-my-claudecode-website/docs/#workflows |
| 发布说明页 | https://yeachan-heo.github.io/oh-my-claudecode-website/docs/#release-notes |
| GitHub 仓库 | https://github.com/Yeachan-Heo/oh-my-claudecode |
| GitHub Releases | https://github.com/Yeachan-Heo/oh-my-claudecode/releases |
| 完整 Changelog | https://raw.githubusercontent.com/Yeachan-Heo/oh-my-claudecode/main/CHANGELOG.md |
| Migration 指南 | https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/MIGRATION.md |
| 配置 Schema | https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/settings-schema.md |
| Hooks 参考 | https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/HOOKS.md |
| CJK 已知问题 | https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/CJK-IME-KNOWN-ISSUES.md |
| OpenClaw 集成 | https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/OPENCLAW-ROUTING.md |
| npm 包 | https://www.npmjs.com/package/oh-my-claude-sisyphus |
| Discord 社区 | https://discord.gg/PUwSMR9XNk |
| Sponsor | https://github.com/sponsors/Yeachan-Heo |

---

::: info 📆

更新记录
v1.1 (2026年07月06日)
- 加入 **agy** 说明
- Magic Keywords 可配置
- `opusThreshold` / `haikuThreshold` key 移除

:::