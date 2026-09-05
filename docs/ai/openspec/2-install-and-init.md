---
description: '安装与初始化支持Claude Code和Cursor，通过`openspec init`过程生成`config.yaml`配置文件，交互完成后需重启Claude Code以启用扩展工作流，支持20多种工具集成。'
lastUpdated: '2026-09-05 16:28:40'
head:
  - - meta
    - name: 'og:title'
      content: '2️⃣ 安装 & 初始化'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '安装与初始化支持Claude Code和Cursor，通过`openspec init`过程生成`config.yaml`配置文件，交互完成后需重启Claude Code以启用扩展工作流，支持20多种工具集成。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ai/openspec/2-install-and-init.html'
---
# 2️⃣ 安装 & 初始化

## 安装

### 要求

OpenSpec 要求 Node.js **20.19.0 或以上版本**，这是它依赖的文件系统 API 的最低要求。安装前先确认：

```Bash
node -v   # 应该输出 v20.19.0 或更高
```

如果版本不够，用 nvm 切换：

```Bash
nvm install 20
nvm use 20
```

---

### 安装

全局安装命令是：

```Bash
npm install -g @fission-ai/openspec@latest
```

如果你用 pnpm 或 yarn 也完全没问题：

```Bash
pnpm add -g @fission-ai/openspec@latest
# 或
yarn global add @fission-ai/openspec@latest
```

还有一种不安装直接用的方式，适合临时体验或 CI 环境：

```Bash
npx @fission-ai/openspec@latest --version
```

安装完成后验证一下：

```Bash
openspec --version
```

---

### 初始化

进入你的项目根目录（对交易平台来说就是 Spring Boot 项目的根），执行：

```Bash
cd game-account-trading-platform
openspec init
```

`init` 命令开箱即用，不需要任何额外配置。

默认对于 Claude 来说安装的是 core profile 的六条命令：`/opsx:propose`、`/opsx:explore`、`/opsx:apply`、`/opsx:update`、`/opsx:sync`、`/opsx:archive`，覆盖从提案到归档的完整开发周期，并且同时兼容 Claude Code 的 Skills 和 Commands 两种触发方式。

::: tip 💡

假如你看的学习资料中会生成 `openspec/project.md` 和 `openspec/AGENTS.md` 这两个文件的, 或者生成的命令是 `/openspec:*` 格式的, 请忽略, 这个是 1.0 之前的老版本, 当前已不适用

:::

如果不想走交互式问答，可以直接传参数：

```Bash
# 只针对 Claude Code 初始化
openspec init --tools claude

# 同时支持 Claude Code 和 Cursor
openspec init --tools claude,cursor

# 支持所有 20+ 工具
openspec init --tools all
```

`--profile core` 可以在这次 init 中临时覆盖 profile 配置。`--force` 会跳过确认提示并自动清理旧版文件。

---

### 升级

如果后续升级了 OpenSpec CLI，需要在每个项目里重新生成 AI 工具的配置文件：

```Bash
openspec update
```

这个命令会根据当前的全局 profile、已选工作流和 delivery 模式重新生成 AI 工具配置文件。养成升级后跑一次 `openspec update` 的习惯，可以避免新版本的斜杠命令在 Claude Code 里不生效的问题。

---

### 启用扩展工作流

默认安装的 core profile 有六条命令（`propose`、`explore`、`apply`、`update`、`sync`、`archive`）。如果想用完整的 OPSX 工作流（包括 `/opsx:new`、`/opsx:continue`、`/opsx:ff`、`/opsx:verify`、`/opsx:bulk-archive`、`/opsx:onboard` 等），需要额外开启：

```Bash
openspec config profile   # 在菜单里切换到 custom 或选择 expanded
openspec update           # 重新生成配置文件
```

默认的全局 profile 是 core，切换到 expanded（即 custom，全选工作流）后用 `openspec update` 使改动生效。对于课程演示来说，建议一开始就开启 expanded，这样所有 `/opsx:*` 命令都可以在 Claude Code 里直接使用

---

## `openspec init` 的完整过程

1.0 的新设计里，AI 指令从三个层面动态组装：context（你的技术栈）、rules（artifact 约束规则）、templates（输出结构），不再依赖静态的全局配置文件。

### 交互过程

在项目根目录执行 `openspec init`，会看到一个带动画效果的欢迎界面，然后进入一个多选向导。

向导会显示一个带搜索功能的多选列表，支持 21 个 AI 工具，并且会**预先选中**已经在你项目里检测到的工具目录。 具体来说，它会扫描 `.claude/`、`.cursor/`、`.windsurf/` 等目录是否存在，存在的工具会在列表里标为"已配置"。

对于游戏账号交易平台这个 Spring Boot 项目，如果之前已经用 Claude Code 开发过，`.claude/` 目录肯定存在，`claude` 选项会被预选中，直接按回车确认即可。

整个交互大概是这个过程：

```Plain Text
┌─ OpenSpec ──────────────────────────────────────────────┐
│                                                          │
│  Welcome to OpenSpec                                     │
│  Spec-driven development for AI coding assistants       │
│                                                          │
└─────────────────────────────────────────────────────────┘

? Select AI tools to configure (Use space to toggle, enter to confirm)

❯ ◉ claude         Claude Code  ← 已检测到 .claude/，预选中
  ○ cursor         Cursor
  ○ windsurf       Windsurf
  ○ github-copilot GitHub Copilot
  ○ gemini         Gemini CLI
  ○ cline          Cline
  ○ roocode        RooCode
  ... 以及其他工具
```

选好工具后，init 自动执行，完成后输出类似：

```Plain Text
▌ OpenSpec structure created
▌ AI tools configured

✓ OpenSpec initialized successfully!

  Created:   Claude Code
  Skipped:   Cursor, Codex (not selected)

IMPORTANT: Restart your coding assistant to load slash commands
Slash commands are loaded at startup and won't appear until restart.

Next Steps (Claude Code):
  1. Restart Claude Code to load /openspec commands
  2. Start with: /opsx:propose <what you want to build>
```

---

### 生成的文件结构

初始化完成后，项目里会出现以下结构：

```Plain Text
openspec/
├── specs/          ← 规格真相（初始为空）
├── changes/        ← 变更工作区（初始为空）
└── config.yaml     ← 项目配置

.claude/skills/     ← Claude Code skills（选了 claude 才有）
```

AI 指令现在通过 `.claude/skills/` 里的 Skill 文件动态传递，而不是依赖一个静态的全局说明文件。

`.claude/skills/` 目录里生成的内容取决于你选择的 profile。默认的 `core` profile（v1.12.0 实测）会生成这六个 Skill：

```Plain Text
.claude/skills/
├── openspec-propose/SKILL.md          ← /opsx:propose 命令
├── openspec-explore/SKILL.md          ← /opsx:explore 命令
├── openspec-apply-change/SKILL.md     ← /opsx:apply 命令
├── openspec-update-change/SKILL.md    ← /opsx:update 命令（新，修订既有 change 的 artifact）
├── openspec-sync-specs/SKILL.md       ← /opsx:sync 命令（新，把 Delta Spec 提前合并进主 spec）
└── openspec-archive-change/SKILL.md   ← /opsx:archive 命令
```

`delivery` 默认是 `both`，所以同时还会生成一份 `.claude/commands/opsx/` 下的 Commands 版本（`explore.md`、`archive.md`、`apply.md`、`sync.md`、`update.md`、`propose.md`），两套触发方式并存。每个 `SKILL.md` 都是带 YAML frontmatter 的 Markdown，Claude Code 在启动时读取这些文件，将它们注册为斜杠命令。这正是 Skills 系统的标准机制——`openspec init` 做的不是什么魔法，就是往 `.claude/skills/` 写了几个 Skill 文件。

如果切换到 expanded（custom，全选）profile，在 core 六条之外额外还会生成：

```Plain Text
.claude/skills/
├── openspec-new-change/SKILL.md
├── openspec-continue-change/SKILL.md
├── openspec-ff-change/SKILL.md            ← /opsx:ff 快进命令
├── openspec-verify-change/SKILL.md        ← /opsx:verify 质量检查
├── openspec-bulk-archive-change/SKILL.md
└── openspec-onboard/SKILL.md              ← /opsx:onboard 引导流程
```

expanded 相对 core 新增的是 `new / continue / ff / verify / bulk-archive / onboard` 六条，`update` 和 `sync` 已经内置在 core 里，不需要再单独开启

---

### `config.yaml` 里有什么

`openspec/config.yaml` 是项目级配置。v1.12.0 的初始内容是：

```YAML
schema: spec-driven

# Project context (optional)
# This is shown to AI when creating artifacts.
# Add your tech stack, conventions, style guides, domain knowledge, etc.
# Example:
#   context: |
#     Tech stack: TypeScript, React, Node.js
#     We use conventional commits
#     Domain: e-commerce platform

# Per-artifact rules (optional)
# Add custom rules for specific artifacts.
# Example:
#   rules:
#     proposal:
#       - Keep proposals under 500 words
#       - Always include a "Non-goals" section
#     tasks:
#       - Break tasks into chunks of max 2 hours

# Per-operation guidance (optional)
# Add advisory guidance for how apply and archive work should be conducted.
# This is separate from artifact rules above.
# Example:
#   operations:
#     apply:
#       guidance:
#         - Keep test summaries concise
#     archive:
#       guidance:
#         - Summarize the archive outcome before finishing
```

::: warning ⚠️

注意 `profile` 字段已经不出现在项目级 `config.yaml` 里了

:::

> 当前版本里 `profile` / `delivery` / `workflows` 存放在**全局用户配置** `~/.config/openspec/config.json` 中（跨项目生效），只有 `schema`（以及可选的 `context` / `rules` / `operations`）留在项目级 `openspec/config.yaml` 里。`openspec config list` 可以看到当前生效的全局配置：

```Plain Text
profile: core (default)
delivery: both (default)
workflows: propose, explore, apply, update, sync, archive (from core profile)
```

`schema` 定义了 artifact 的生成规则，默认的 `spec-driven` 方案对应的 artifact 序列是 `proposal → specs → design → tasks`。如果以后需要自定义（比如去掉 design.md，或者加一个 api-contract.md），可以在 `openspec/schemas/` 目录里创建自定义 schema，然后在这里引用。

---

### 初始化之后的第一件事

旧版会自动生成 `project.md` 让你填写项目上下文，1.0 取消了这个文件，但这件事本身还是要做，只是换了位置——直接写进 `openspec/specs/` 目录里，或者写进你已有的 `CLAUDE.md` 里。

对于代码库来讲，最直接的方式是在 Claude Code 里说：

```Plain Text
请分析当前项目的 pom.xml、主要包结构和配置文件，
生成一个 openspec/specs/project-context.md，记录：
- 技术栈版本（Spring Boot、MyBatis Plus、Redisson、RocketMQ）
- 分层架构约定
- 命名规范
- 业务域划分（account、order、payment、user）
```

这份文件虽然不叫 `project.md`，但在每次 `/opsx:propose` 时作为上下文引用进来，效果是完全等价的。

---

## 支持的 AI 工具与 Claude Code 集成

### 支持的工具范围

 `openspec init --help` 列出的 `--tools` 可选 ID 已经接近 40 个，而且期间发生过一次改名：**Windsurf 已更名为 Devin Desktop**（Cognition 收购后的品牌重命名），CLI 里的工具 ID 变成了 `devin`，`windsurf` 仅作为兼容别名保留（`--help` 原文："Also accepted: windsurf (now devin)"）。另外 v1.10 新增了 **Zed**，v1.12 新增了 **SourceCraft Code Assistant**（VS Code 扩展）。

因为这份名单本身更新频率高于任何教程能追上的速度，不再给出静态总数和全量 ID 列表，**可以通过以下命令拿到当前准确名单**：

```Bash
openspec init --help   # --tools 选项里会列出当前版本支持的全部工具 ID
```

不在名单里的工具也不是完全不能用——对于未列出的工具，OpenSpec 会生成通用的 AGENTS.md 说明文件，AI 通过读取这个文件来理解 OpenSpec 的工作流。

---

### 不同工具的集成方式有什么差异

并非所有工具的集成深度都一样。OpenSpec 根据各工具的能力，采用不同的集成策略。

选择 Cursor 或 Claude Code 时，OpenSpec 会自动配置工具特定的斜杠命令。GitHub Copilot 则会在 `.github/prompts/` 下生成 prompt 模板文件；Devin Desktop（原 Windsurf）会在 `.devin/skills/` 下按 Skills 格式（`SKILL.md`）生成，不再是旧版的 `.windsurf/workflows/` 工作流定义文件；Zed 则落在共享的 `.agents/skills/` 目录下。

用一个表格来对比主流工具的集成方式：

| **工具** | **生成位置** | **触发方式** |
|-|-|-|
| Claude Code | .claude/skills/（+ .claude/commands/opsx/，delivery 默认 both） | /opsx:propose 等斜杠命令 |
| Cursor | .cursor/skills/ + .cursor/commands/ | /opsx:\* 斜杠命令 |
| GitHub Copilot | .github/prompts/\*.prompt.md | IDE 扩展里的自定义命令 |
| Devin Desktop | .devin/skills/\*/SKILL.md | Skills 触发（v1.12 实测，不再是旧版工作流文件） |
| Zed | .agents/skills/\*/SKILL.md | Skills 触发（v1.10 新增支持） |
| Gemini CLI | .gemini/commands/openspec/ | TOML 格式的斜杠命令 |
| Cline | .clinerules/workflows/ | 工作流 |

集成深度上，Claude Code 和 Cursor 是第一梯队，斜杠命令体验最完整。GitHub Copilot CLI 目前有个已知限制——Copilot 的命令文件只在 IDE 扩展（VS Code、JetBrains、Visual Studio）里识别，Copilot CLI 本身不支持 `.github/prompts/*.prompt.md`。

---

### Claude Code 的集成原理

理解 Claude Code 的集成方式，比单纯知道命令名称更有价值。

`openspec init --tools claude` 执行完之后，本质上就是在 `.claude/skills/` 目录里写入了若干个 YAML frontmatter 格式的 Markdown 文件。每个文件对应一条斜杠命令，文件名就是命令名（去掉 `opsx:` 前缀）。

以 `openspec-propose.md` 为例，其结构大致是这样的：

```YAML
---
name: opsx:propose
description: 创建一个新的 OpenSpec 变更提案，生成 proposal、specs、design、tasks 四个 artifact
---

你是一个 spec-driven development 助手。当用户执行此命令时：

1. 读取 openspec/specs/ 目录了解现有系统行为
2. 根据用户描述创建 openspec/changes/<change-name>/ 目录
3. 依次生成：
   - proposal.md（为什么做，解决什么问题）
   - specs/<domain>/spec.md（Delta Spec，用 ADDED/MODIFIED/REMOVED 区块）
   - design.md（技术方案和关键决策）
   - tasks.md（带编号的实现清单）
4. 完成后输出各文件路径和摘要

遵循项目约定：读取 openspec/specs/ 中的已有规格文件作为背景上下文。
```

这是标准的 Claude Code Skills 机制。OpenSpec 做的不过是把"如何走 SDD 流程"这件事，封装成了一套随项目分发的 Skill 文件。`openspec update` 命令的作用就是在 CLI 升级后重新生成这些文件，保证斜杠命令里的指令逻辑是最新版本的。

---

### 为项目启用的配置的实际步骤

进入项目根目录，执行：

```Bash
openspec init --tools claude
```

完成后确认生成了以下文件（core profile 默认四个命令）：

```Plain Text
.claude/skills/
├── openspec-propose.md
├── openspec-explore.md
├── openspec-apply.md
└── openspec-archive.md

openspec/
├── specs/
├── changes/
└── config.yaml
```

然后**重启 Claude Code** —— 斜杠命令是在启动时加载的，不重启不会生效。重启后在 Claude Code 里输入 `/opsx:` 就能看到补全列表。

如果想同时开启扩展工作流（`/opsx:ff`、`/opsx:verify` 等），在 init 之后执行：

```Bash
openspec config profile   # 选择 expanded 或 custom
openspec update           # 重新生成 .claude/skills/ 里的文件
# 再次重启 Claude Code
```

---

### 一个值得关注的集成细节

OpenSpec Skill 文件和你项目里已有的 `CLAUDE.md` 是**并列加载**的，不是替换关系。Claude Code 启动时会同时读取 `.claude/skills/` 下所有 Skill 文件和项目根目录的 `CLAUDE.md`，两者的上下文会合并进同一个会话。

这意味着，你在 `CLAUDE.md` 里写的架构约定（比如"所有 Redis 操作必须用 Redisson，禁止直接用 Jedis"），在 `/opsx:propose` 生成 `design.md` 的时候 Claude 是能看到的，不需要在 OpenSpec 的配置文件里重复写一遍。两套机制天然互补，这是 OpenSpec 选择通过 Skills 系统集成的核心原因。

---

::: info 📆

更新记录
v1.1（2026年09月05日）
- 根据 v1.12.0 实测结果，更正 core profile 命令数（4→6，新增 update/sync）
- 更正 `.claude/skills/` 生成文件的命名格式（扁平 .md → 文件夹 + SKILL.md）
- 更正 `openspec/config.yaml` 内容（profile 字段已迁移至全局用户配置）
- 更正 Windsurf 已更名为 Devin Desktop 及其生成目录/格式，补充 Zed、SourceCraft 的加入

:::