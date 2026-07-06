---
description: 'Oh My ClaudeCode (OMC) 是一个提升 Claude Code 效率的插件，提供19个专属Agent、37个内置Skill、Autopilot、Teams模式、多AI协作（CCG）、tmux Worker、自定义Skill、Hooks生命周期、状态持久化等丰富功能。文档涵盖从入门到生产掌握的四个阶段，包括安装配置、核心工作流、进阶编排及实战案例，帮助用户高效完成代码重构、审计、测试等任务。'
lastUpdated: '2026-07-06 19:31:47'
head:
  - - meta
    - name: 'og:title'
      content: 'Oh My ClaudeCode (OMC) 完整学习文档'
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
(Opus)    (Sonnet)  (Haiku)
   \        /
  结果综合输出
```

### 1.2 核心价值主张

| 能力 | 原生 Claude Code | OMC |
|-|-|-|
| 执行模式 | 单 Agent，顺序执行 | 多 Agent，并行执行 |
| 任务分解 | 手动 | 自动（Team 流水线） |
| AI 模型 | 仅 Claude | Claude + Codex + Gemini |
| 成本控制 | 全量用同一模型 | 智能路由，省 30–50% |
| 上下文 | 容易丢失 | notepad + project-memory 持久化 |
| 配置量 | 无需配置 | 零配置，开箱即用 |

### 1.3 适合 vs 不适合的场景

**适合 OMC 的场景：**

- 需要同时修改 frontend + backend + 测试的跨层变更
- 超过 2 小时的长会话，上下文丢失风险高
- 大规模重构（50+ 文件批量改造）
- 架构决策类工作，需要 "先思考再执行"
- 需要 Codex 做安全审计、Gemini 做 UI 评审的跨模型场景

**不适合 OMC 的场景：**

- 单文件小改动（增加 Agent 层反而增加成本）
- 一次性快速问答
- 已有完整 CI/CD 和任务管理系统的团队（可能重叠）

---

## 2. 第一阶段：入门

### 2.1 安装插件

OMC 通过 Claude Code 的插件市场安装，无需手动编辑任何配置文件。**不要使用 npm 全局安装**

在 Claude Code 会话内，**逐条执行**以下命令（不能同时粘贴）：

```Plain Text
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
```

等待第一条完成后，再执行：

```Plain Text
/plugin install oh-my-claudecode
```

**安装验证**

安装完成后，在 Claude Code 中运行 `/setup`，如果出现 OMC 的初始化提示则说明安装成功。

**前置依赖**

| 依赖 | 用途 | 是否必须 |
|-|-|-|
| Claude Code | 宿主环境 | ✅ 必须 |
| tmux | 多 Worker 并行模式 | 仅进阶功能需要 |
| codex CLI | Codex Worker 模式 | 仅多 AI 协作需要 |
| gemini CLI | Gemini Worker 模式 | 仅多 AI 协作需要 |

macOS 安装 tmux：

```Bash
brew install tmux
```

### 2.2 初始化配置

安装完成后，需要运行初始化命令让 OMC 完成自身配置：

**在 Claude Code 会话内：**

```Plain Text
# 在当前项目中配置
/oh-my-claudecode:omc-setup --local

# 为所有 Claude Code 会话配置 omc
/oh-my-claudecode:omc-setup
```

初始化过程会做以下几件事：

1. 将 OMC 的 19 个 Agent 定义注入到当前会话
2. 将 37 个 Skill 注册到 Claude Code 的 Skill 系统
3. 同步 Hooks 库模块（确保版本一致）
4. 生成默认 `config.jsonc` 配置文件（位于 `~/.claude/oh-my-claudecode/`）

**初始化后的目录结构：**

```Plain Text
~/.claude/
├── settings.json          # Claude Code 原生配置
├── oh-my-claudecode/
│   ├── config.jsonc        # OMC 主配置
│   ├── skills/             # 自定义 Skill 存放目录
│   ├── hooks/              # 自定义 Hooks 存放目录
│   └── memory/             # project-memory 持久化存储
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

启用后，`/team` 命令会使用 Claude Code 的原生团队工作流，性能更佳。如果未启用，OMC 会自动降级到非 Team 执行模式并给出警告。

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
1. architect agent  → 分析需求，生成架构方案
2. planner agent    → 拆解任务清单
3. executor agent   → 并行执行实现（Sonnet）
4. qa-tester agent  → 运行测试，验证正确性
5. security-reviewer→ 扫描安全漏洞（可选）
6. 输出完整可运行代码
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

| 功能 | 终端 CLI（`omc ...`） | 会话内 Skill（`/...`） |
|-|-|-|
| 环境 | 系统 Shell | Claude Code 会话内 |
| 安装方式 | `npm i -g oh-my-claude-sisyphus` | `/plugin install oh-my-claudecode` |
| Setup | `omc setup` | `/setup` 或 `/omc-setup` |
| Ask 提供商 | `omc ask codex "..."` | `/ask codex "..."` |
| Team 编排 | `omc team 2:codex "..."` | `/team 3:executor "..."` |
| Autopilot | ❌ 不支持 | `/autopilot "..."` |
| Ralph 模式 | ❌ 不支持 | `/ralph "..."` |
| Ultrawork | ❌ 不支持 | `/ultrawork "..."` |
| deep-interview | ❌ 不支持 | `/deep-interview "..."` |

**关键区别：**

`omc team` 启动的是真实的 tmux 进程（claude/codex/gemini CLI 各跑在独立 pane）；  

`/team` 是在同一个 Claude Code 会话内运行原生 Agent Teams 工作流。

### 2.5 需求澄清：deep-interview

当需求不够清晰时，不要直接 autopilot——先用 deep-interview 梳理需求。

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

**Build & Analysis 类**

| Agent | 职责 | 默认模型 |
|-|-|-|
| `architect` | 系统架构设计、技术选型、模块划分 | Claude Opus |
| `planner` | 任务拆解、工作清单、依赖排序 | Claude Opus |
| `explorer` | 代码库探索、现有模式识别 | Claude Sonnet |
| `executor` | 核心代码实现 | Claude Sonnet |
| `refactorer` | 代码重构、清洁代码 | Claude Sonnet |
| `researcher` | 技术调研、文档查阅 | Claude Sonnet |
| `data-scientist` | 数据分析、建模 | Claude Sonnet |

**Review 类**

| Agent | 职责 | 默认模型 |
|-|-|-|
| `qa-tester` | 测试用例编写、自动化测试 | Claude Haiku |
| `security-reviewer` | 安全漏洞扫描、OWASP 检查 | Claude Sonnet |
| `critic` | 代码质量批评、潜在问题指出 | Claude Sonnet |
| `code-reviewer` | PR Review、风格一致性 | Claude Haiku |

**Domain 类**

| Agent | 职责 | 默认模型 |
|-|-|-|
| `designer` | UI/UX 设计、组件设计 | Claude Sonnet |
| `devops` | CI/CD、部署、基础设施 | Claude Sonnet |
| `doc-writer` | 文档编写、API 文档 | Claude Haiku |
| `debugger` | 问题定位、根因分析 | Claude Sonnet |

**Coordination 类**

| Agent | 职责 | 默认模型 |
|-|-|-|
| `orchestrator` | 团队协调、进度追踪 | Claude Opus |
| `synthesizer` | 多来源结果综合 | Claude Sonnet |
| `verifier` | 验收检查、需求对齐 | Claude Sonnet |
| `fixer` | 问题修复、验证循环 | Claude Sonnet |

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

### 3.2 37 个内置 Skill

Skill 是 OMC 的工作流自动化单元，用一个命令触发一套完整流程。

**Workflow Skills（主要工作流）**

| Skill | 命令 | 用途 |
|-|-|-|
| autopilot | `/autopilot "..."` | 从想法到可运行代码，全自动 |
| ralph | `/ralph "..."` | 持续执行直到任务完全完成（不放弃） |
| ultrawork | `/ultrawork "..."` | 最大并行度，极速执行模式 |
| team | `/team N:role "..."` | 启动 N 个指定 Agent 协作 |
| deep-interview | `/deep-interview "..."` | 苏格拉底式需求挖掘 |
| ccg | `/ccg "..."` | Codex + Gemini + Claude 三模型协作 |
| ask | `/ask codex "..."` | 向特定 AI 提供商咨询 |
| autoresearch | `/deep-interview --autoresearch "..."` | 自动调研模式 |

**Utility Skills（工具类）**

| Skill | 命令 | 用途 |
|-|-|-|
| tdd | `/tdd "..."` | 测试驱动开发流程 |
| code-review | `/code-review` | 当前改动的全面代码审查 |
| refactor | `/refactor "..."` | 结构化重构工作流 |
| debug | `/debug "..."` | 系统化 debug 流程 |
| deploy | `/deploy "..."` | 部署检查与执行 |
| docs | `/docs "..."` | 文档生成 |

**ralph vs autopilot 的区别：**

- `autopilot`：完成一次完整的任务周期后结束
- `ralph`：内置重试循环，如果验证失败会自动重新执行 fixer → verifier 循环，直到真正完成

ralph 适合复杂任务，autopilot 适合相对明确的任务。

**ultrawork 的并行策略：**

ultrawork 会将任务拆分为可并行的子任务，同时启动多个 executor Agent，最后由 synthesizer 合并结果。适合：

- 大型代码库的批量文件修改
- 多模块同步重构
- 大规模测试补全

### 3.3 Team 模式流水线

Team 是 OMC v4.1.7 之后的核心编排面，所有复杂任务都推荐走 Team 模式。

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

Magic Keywords 是 OMC 最人性化的设计——不需要记命令，只需要在对话中自然说出关键词，OMC 自动识别并激活对应流程。

**内置关键词列表：**

| 关键词 | 触发效果 | 示例 |
|-|-|-|
| `autopilot:` | 激活 Autopilot 流程 | `autopilot: 给我加一个限流中间件` |
| `ralph:` | 激活 Ralph 持续执行 | `ralph: 把所有 @Deprecated 方法都删掉` |
| `team:` | 激活 Team 协作 | `team: 重构支付模块` |

**注意版本变更：**

在 v4.x 中，以下旧关键词已被移除：

- ~~`plan this`~~ → 改用 `ralplan` 或 `/oh-my-claudecode:plan`
- ~~`swarm`~~ → 改用 `/team` 语法

### 3.5 Model 路由与成本优化

OMC 的 Model 路由是其成本优势的核心机制。

**路由规则：**

```Plain Text
任务复杂度评分
    ↓
≥ 0.8 → Claude Opus    （架构设计、复杂推理）
0.4–0.8 → Claude Sonnet （标准开发任务）
< 0.4 → Claude Haiku   （简单查询、格式化）
```

**成本对比示例：**

假设一天 100 个任务：

- 20 个架构类 → Opus（贵）
- 60 个实现类 → Sonnet（中）
- 20 个简单类 → Haiku（便宜 \~10x）

vs 全部用 Sonnet：节省约 (20 × Haiku节省量) = 约 30–40%

**在 config.jsonc 中调整路由阈值：**

```Plain Text
{
  "modelRouting": {
    "opusThreshold": 0.8,    // 高于此分数用 Opus
    "haikuThreshold": 0.4,   // 低于此分数用 Haiku
    "defaultModel": "claude-sonnet-4-20250514"
  }
}
```

### 3.6 状态持久化：notepad 与 project-memory

OMC 提供两层状态持久化机制，解决 Claude Code 跨会话"失忆"的问题。

**Notepad（会话内记事本）**

在当前会话内记录重要信息，供 Agent 随时查阅：

```Plain Text
/notepad add "账号模块使用软删除，is_deleted 字段，不做物理删除"
/notepad add "Redis Key 前缀规范：account:detail:{id}"
/notepad list
/notepad clear
```

适合场景：当前会话的临时决策记录、约定事项。

**Project Memory（跨会话记忆）**

持久化存储到磁盘，新会话启动时自动加载：

```Plain Text
/project-memory add "项目技术栈：Spring Boot 3.2 + MyBatis Plus + Redis + RocketMQ"
/project-memory add "数据库命名规范：下划线，表前缀 gat_（game account trading）"
/project-memory list
/project-memory remove <id>
```

存储位置：`~/.claude/oh-my-claudecode/memory/project-memory.json`

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

---

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
# 启动 2 个 Codex worker 做安全审计
omc team 2:codex "review auth module for SQL injection and XSS risks"

# 启动 2 个 Gemini worker 做 UI 审查
omc team 2:gemini "review the H5 mobile pages for accessibility and performance"

# 启动 1 个 Claude worker 做功能实现
omc team 1:claude "implement the payment callback handler"

# 查看 worker 状态
omc team status auth-review

# 关闭特定 worker 组
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

OMC 的 Hooks 系统允许在 Agent 执行的关键时间点插入自定义逻辑，实现质量门控、日志记录、通知等功能。

**生命周期事件：**

```Plain Text
SessionStart      → 会话开始时触发
PreToolUse        → 工具调用前（可以拦截）
PostToolUse       → 工具调用后（可以检查结果）
Stop              → Agent 准备停止时（可以阻止）
PreCompact        → 上下文压缩前
```

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
/ultrawork "为 controller 包下所有未覆盖的接口补充 JUnit 5 + MockMvc 单元测试，
使用 @SpringBootTest 方式，Mock 掉 Service 层，
覆盖正常流程和边界异常情况"
```

ultrawork 会并行处理多个 Controller，速度是顺序执行的 3–5 倍。

### 5.2 config.jsonc 调优

完整的 `~/.claude/oh-my-claudecode/config.jsonc` 配置示例：

```Plain Text
{
  // 模型路由配置
  "modelRouting": {
    "opusThreshold": 0.8,
    "haikuThreshold": 0.35,
    "defaultModel": "claude-sonnet-4-20250514",
    "overrides": {
      "security-reviewer": "claude-sonnet-4-20250514",  // 安全审查不降级
      "doc-writer": "claude-haiku-4-5-20251001"          // 文档生成用 Haiku
    }
  },

  // deep-interview 阈值配置
  "deepInterview": {
    "clarityThreshold": 0.75,     // 清晰度达到 75% 才开始实现
    "maxRounds": 8,                // 最多问 8 轮
    "dimensions": {
      "functionalBoundary": 0.3,   // 功能边界权重 30%
      "technicalConstraints": 0.25, // 技术约束权重 25%
      "acceptanceCriteria": 0.25,  // 验收标准权重 25%
      "riskAssessment": 0.2        // 风险评估权重 20%
    }
  },

  // Team 模式配置
  "team": {
    "maxWorkers": 5,               // 最多并行 5 个 Agent
    "worktreeEnabled": true,        // 使用独立 git worktree
    "verifyRetries": 3,             // 验证失败最多重试 3 次
    "autoMerge": false              // 验证通过后不自动合并，等待人工确认
  },

  // 质量门控
  "qualityGates": {
    "requireTestsPass": true,       // 必须所有测试通过
    "minTestCoverage": 60,          // 最低测试覆盖率 60%
    "blockOnSecurityIssues": true   // 有安全问题时阻止完成
  },

  // 状态管理
  "state": {
    "persistNotepad": false,        // notepad 不持久化（会话结束清除）
    "projectMemoryFile": "~/.claude/oh-my-claudecode/memory/project-memory.json"
  },

  // Hooks 配置
  "hooks": {
    "enabled": true,
    "hooksDir": "~/.claude/oh-my-claudecode/hooks"
  },

  // LSP 配置
  "lsp": {
    "enabled": true,
    "java": {
      "server": "eclipse.jdt.ls"
    }
  }
}
```

**关键调优建议：**

1. **opusThreshold 不要设太低**：Opus 比 Sonnet 贵约 5 倍，只用于真正需要深度推理的任务。
2. **maxWorkers 不要超过 5**：更多 Worker 不会线性加速，反而增加协调成本。
3. **verifyRetries 设为 3**：太少会误报失败，太多会浪费 Token。
4. **autoMerge 建议关闭**：生产项目中始终保留人工最终审查。

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
├── 第3课：19 Agent + 37 Skill 全解
├── 第4课：Team 模式流水线深度讲解
├── 第5课：tmux Worker 与多 AI 协作
├── 第6课：自定义 Skill 开发
├── 第7课：Hooks 质量门控实战
├── 第8课：config.jsonc 生产调优
└── 第9课：综合实战（游戏账号平台案例）
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

OMC 迭代非常频繁（截至本文写作时已达 v4.13.7），需要建立稳定的升级流程。

**插件市场安装的升级方式：**

```Plain Text
# 1. 更新市场克隆
/plugin marketplace update omc

# 2. 重新运行 setup 刷新配置
/omc-setup
```

**npm 安装的升级方式：**

```Bash
npm i -g oh-my-claude-sisyphus@latest
```

**版本变更注意事项：**

查看官方 Changelog：https://omc.vibetip.help/docs/reference/changelog

**历史重要 Breaking Changes（参考）：**

| 版本 | 变更 | 迁移方式 |
|-|-|-|
| v4.1.7 | `swarm` 移除，改用 `team` | 替换所有 `swarm` 为 `/team` |
| v4.x | `plan this` 关键词移除 | 改用 `ralplan` |
| v4.x | autoresearch 改为 Skill | 更新触发方式 |

**升级后验证清单：**

```Bash
# 1. 检查 OMC 版本
/omc-setup  # 会显示版本信息

# 2. 验证 Hooks 同步
# setup 过程会自动同步

# 3. 测试基础功能
/autopilot "hello world test"

# 4. 检查自定义 Skill 是否还能加载
/your-custom-skill

# 5. 检查 config.jsonc 是否有新字段需要补充
# 对比官方文档：https://omc.vibetip.help/docs/reference/configuration
```

**CJK 输入法已知问题：**

如果你使用中文输入法（fcitx / ibus / 搜狗等），在 OMC 中可能遇到 IME 候选词触发意外命令的问题。官方文档有专项说明：https://omc.vibetip.help/docs/reference/cjk-ime

临时解决方案：在输入复杂中文时，先在文本编辑器写好，再粘贴进 Claude Code。

---

## 6. 附录：快速命令参考

### 6.1 安装与初始化

```Bash
# 插件安装（分两步）
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode

# npm 安装
npm i -g oh-my-claude-sisyphus@latest

# 初始化
/setup
/omc-setup
omc setup  # 终端

# 启用原生 Teams
# ~/.claude/settings.json 中添加：
# "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"

# 升级
/plugin marketplace update omc
npm i -g oh-my-claude-sisyphus@latest
```

### 6.2 核心工作流命令

```Bash
# Autopilot：从想法到代码
/autopilot "build X"
autopilot: build X

# Ralph：持续执行直到完成
/ralph "fix all failing tests"
ralph: fix all failing tests

# Ultrawork：最大并行度
/ultrawork "add unit tests to all controllers"

# Team：多 Agent 协作
/team 3:executor "refactor service layer"
/team 1:architect,2:executor "design and implement X"

# Deep Interview：需求澄清
/deep-interview "我想构建推荐系统"

# CCG：三模型协作
/ccg "review this PR from architecture and UI angles"
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
~/.claude/settings.json                          # Claude Code 原生配置
~/.claude/oh-my-claudecode/config.jsonc          # OMC 主配置
~/.claude/oh-my-claudecode/skills/               # 自定义 Skill 目录
~/.claude/oh-my-claudecode/hooks/                # 自定义 Hooks 目录
~/.claude/oh-my-claudecode/memory/               # Project Memory 存储
```

### 6.7 有用的链接

| 资源 | 地址 |
|-|-|
| 官方文档 | https://omc.vibetip.help/docs |
| GitHub 仓库 | https://github.com/Yeachan-Heo/oh-my-claudecode |
| Changelog | https://omc.vibetip.help/docs/reference/changelog |
| 配置参考 | https://omc.vibetip.help/docs/reference/configuration |
| CJK 已知问题 | https://omc.vibetip.help/docs/reference/cjk-ime |
| Discord 社区 | https://github.com/Yeachan-Heo/oh-my-claudecode（见 README） |

---

*文档版本：基于 oh-my-claudecode v4.13.7 整理*  