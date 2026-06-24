---
description: 'Subagent是嵌入主代理的独立子模块，支持内置或自定义创建与配置。具备核心能力的控制机制，可通过前台或后台方式调用，并拥有持久化记忆。典型使用模式包括任务分解与协作，与Skills（技能）及Agent Teams（代理团队）在功能定位和调用方式上存在区别。'
lastUpdated: '2026-06-17 10:11:26'
head:
  - - meta
    - name: 'og:title'
      content: 'subagents / 子代理'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Subagent是嵌入主代理的独立子模块，支持内置或自定义创建与配置。具备核心能力的控制机制，可通过前台或后台方式调用，并拥有持久化记忆。典型使用模式包括任务分解与协作，与Skills（技能）及Agent Teams（代理团队）在功能定位和调用方式上存在区别。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/claude-code/extral-subagent.html'
---
# subagents / 子代理

## 什么是 Subagent

Subagent 是专门处理特定类型任务的 AI 助手，每个实例运行在**独立的 context window** 中，拥有自定义系统提示、专属工具权限和独立的授权设置。

核心价值：保留主上下文、强制执行约束、跨项目复用配置、控制成本（路由到 Haiku 等廉价模型）。

## 内置 Subagents

| Agent | 模型 | 用途 |
|-|-|-|
| Explore | Haiku | 只读代码库搜索与分析 |
| Plan | 继承 | Plan mode 下的只读研究 |
| General-purpose | 继承 | 探索+修改的复杂多步骤任务 |
| Bash / statusline-setup / Claude Code Guide | 各异 | 辅助专项任务 |

## 创建与配置

**文件格式**：带 YAML frontmatter 的 Markdown 文件，正文即系统提示。

**存储位置与优先级**：

1. `--agents` CLI 参数（最高，仅当前会话）
2. `.claude/agents/`（项目级，建议纳入版本控制）
3. `~/.claude/agents/`（用户级，全项目通用）
4. Plugin 的 `agents/` 目录（最低）

**关键 frontmatter 字段**：

```YAML
name: code-reviewer          # 唯一标识符（必填）
description: "..."           # Claude 据此判断何时委托（必填）
tools: Read, Grep, Glob      # 工具白名单
disallowedTools: Write, Edit # 工具黑名单
model: sonnet / haiku / opus # 可指定别名或完整 model ID
permissionMode: default | acceptEdits | dontAsk | bypassPermissions | plan
maxTurns: 10                 # 最大轮数
memory: user | project | local  # 持久化记忆范围
background: true             # 是否默认后台运行
isolation: worktree          # 在隔离的 git worktree 中运行
skills: [api-conventions]    # 预注入技能内容
mcpServers: [...]            # 专属 MCP 服务器
hooks: { PreToolUse: ... }   # 生命周期钩子
```

## 核心能力控制机制

**工具控制**：`tools`（白名单）与 `disallowedTools`（黑名单）可组合使用，黑名单先执行。

**条件规则**：通过 `PreToolUse` hook + 外部脚本实现细粒度限制，比如只允许 SELECT 查询。

**权限模式**：父级使用 `bypassPermissions` 或 auto mode 时，子 Agent 无法覆盖。

**禁用特定 Agent**：在 `settings.json` 的 `permissions.deny` 中添加 `Agent(name)` 格式条目。

## 调用方式

三种调用模式，从弱到强：

1. **自然语言**：`Use the code-reviewer agent to...`（Claude 自主决定是否委托）
2. **@-mention**：`@"code-reviewer (agent)" ...`（保证调用指定 Agent）
3. **会话范围**：`claude --agent code-reviewer`（整个会话采用该 Agent 的系统提示和工具限制）

## 前台 vs 后台

前台阻塞主对话，权限提示正常传递；后台并发运行，提前批量授权，期间自动拒绝未授权操作。可用 `Ctrl+B` 切换，或设置 `background: true` 默认后台。

## 持久化记忆

通过 `memory` 字段开启，Agent 获得专属目录（如 `~/.claude/agent-memory/<name>/`），系统提示自动注入读写说明，跨会话积累知识（代码模式、调试经验、架构决策等）。

## 典型使用模式

**隔离高容量操作**：测试跑完只返回失败摘要，避免污染主上下文。

**并行研究**：多个 Agent 同时探索不同模块，主对话汇总结论。

**链式调用**：`code-reviewer` 找问题 → `optimizer` 修复问题。

## 与 Skills / Agent Teams 的区别

- **Skills**：在主对话上下文中运行的可复用提示，不隔离上下文
- **Subagents**：独立上下文，适合自包含任务
- **Agent Teams**：跨多个会话协调，适合需要持续并行的大规模任务；Subagents 无法生成子 Subagent