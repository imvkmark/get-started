---
description: 'Ralph Wiggum自治循环指南介绍了安装、快速开始、架构原理、常见排错（如模型未配置错误）及实战示例，包括自动迁移测试框架（Jest转Vitest）和构建带用户认证的全栈Web应用，帮助用户高效完成迭代任务。'
lastUpdated: '2026-06-17 17:44:02'
head:
  - - meta
    - name: 'og:title'
      content: 'Ralph Wiggum 自治循环指南'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Ralph Wiggum自治循环指南介绍了安装、快速开始、架构原理、常见排错（如模型未配置错误）及实战示例，包括自动迁移测试框架（Jest转Vitest）和构建带用户认证的全栈Web应用，帮助用户高效完成迭代任务。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/extra/ralph-wiggum-introduction.html'
---
# Ralph Wiggum 自治循环指南

有没有过这种经历：下班前给 AI 发个需求，睡一觉起来发现代码不仅写完了，测试全过，连文档都自动生成了？

现在 Ralph Wiggum 就能帮你实现这个愿望。它是一个 AI 编码代理的自治循环框架，让 Claude Code、OpenAI Codex、GitHub Copilot 等工具可以持续迭代同一个任务，直到满足你预先设定的完成条件。不用盯着屏幕一步步引导，只要写好明确的成功标准，剩下的交给它自动跑就行

::: info 🔗<p>在此之前需要保证系统有 node 环境</p><ul><li>[使用 nvm 管理多版本 Node 项目依赖](/front-end/javascript/npm/nvm-manage-multi-version-node.md)</li></ul>:::

## 安装与兼容性 (Installation & Requirements)

- **AI 编码代理（至少一个）**:

  - Claude Code（Anthropic 官方 CLI）
  - OpenAI Codex CLI
  - GitHub Copilot CLI
  - OpenCode（开源 AI 编码助手）

```Bash
# 推荐使用 npm 全局安装
npm install -g @th0rgal/ralph-wiggum
```

## 快速开始 (Quick Start)

先从最简单的任务开始感受下：让 Ralph 帮你创建一个包含 "Hello World" 的文件。

```Bash
# 简单任务，最多迭代5次
ralph "创建一个 hello.txt 文件，内容为 'Hello World'。完成后输出 <promise>DONE</promise>。" \
  --max-iterations 5
```

再来点实际的，让它自动构建一个完整的待办事项 REST API：

```Bash
# 构建带 CRUD 操作和测试的待办事项 API
ralph "构建一个待办事项 REST API，包含完整的 CRUD 接口和测试用例。
每次修改后运行测试，所有测试通过后输出 <promise>COMPLETE</promise>。" \
  --max-iterations 20
```

想切换不同的 AI 代理？用 `--agent` 参数就行：

```Bash
# 使用 Claude Code 代理
ralph "创建一个命令行工具并编写使用文档。完成后输出 <promise>COMPLETE</promise>。" \
  --agent claude-code --model claude-sonnet-4 --max-iterations 5
```

## 命令

````Plaintext
--status
    显示当前 Ralph 循环状态和历史记录

--status --tasks
    显示状态，包括当前任务列表

--add-context TEXT
    为下一次迭代添加上下文（或编辑 .ralph/ralph-context.md 文件）

--clear-context
    清除所有待处理的上下文

--list-tasks
    显示带索引的当前任务列表

--add-task "desc"
    向列表中添加新任务

--remove-task N
    删除索引为 N 的任务（包括子任务）```
````

## 选项

```Plaintext
--agent AGENT
    使用的AI代理：opencode（默认）、claude-code、codex、copilot

--min-iterations N
    允许完成前的最小迭代次数（默认：1）

--max-iterations N
    停止前的最大迭代次数（默认：无限制）

--completion-promise TEXT
    表示完成的标识语句（默认：COMPLETE）

--abort-promise TEXT
    表示提前中止的标识语句（例如：前置条件失败）

-t, --tasks
    启用任务模式以进行结构化任务跟踪

--task-promise TEXT
    表示任务完成的标识语句（默认：READY_FOR_NEXT_TASK）

--model MODEL
    使用的模型（特定于代理，例如：anthropic/claude-sonnet）

--rotation LIST
    每次迭代的代理/模型轮换（逗号分隔）
    每个条目必须为"agent:model"格式
    有效代理：opencode、claude-code、codex
    示例：--rotation "opencode:claude-sonnet-4,claude-code:gpt-4o"
    使用此参数时，--agent和--model将被忽略

-f, --file, --prompt-file
    从文件读取提示内容

--prompt-template PATH
    使用自定义提示模板（支持变量）

--no-stream
    缓冲代理输出并在最后打印

--verbose-tools
    打印每条工具执行行（禁用精简工具摘要）

--questions
    启用交互式问题处理（默认：已启用）

--no-questions
    禁用交互式问题处理（代理将在问题上循环）

--no-plugins
    本次运行禁用非授权OpenCode插件（仅opencode）

--no-commit
    每次迭代后不自动提交

--allow-all
    自动批准所有工具权限（默认：开启）

--no-allow-all
    需要交互式权限提示

--config PATH
    使用自定义代理配置文件

--init-config [PATH]
    将默认代理配置写入PATH

-v, --version
    显示版本

-h, --help
    显示此帮助信息

--
    将所有剩余参数传递给代理（例如：-- --extra-tags）
```

## 架构浅析与进阶 (How it works & Tips)

Ralph 的核心逻辑简单粗暴但极其有效：

```Plaintext
while [ 任务未完成 ]; do
  AI 代理 = 根据配置选择代理/模型
  AI 代理执行相同的原始 Prompt
  检查输出是否包含完成标识
  如果包含 → 退出循环
  否则 → 继续下一轮迭代
done
```

每一轮迭代中，AI 都能看到之前迭代修改的文件和 Git 历史记录，相当于它在不断"复盘"自己之前的工作，逐步修正错误直到满足要求。

- **进阶技巧一：多代理轮换提升成功率**  
不同 AI 模型各有擅长的领域，通过 `--rotation` 参数让多个模型交替处理同一个任务，可以取长补短。比如让 Claude Code 处理架构设计，让 Codex 写具体的业务代码，能显著提升复杂任务的完成率。
- **进阶技巧二：任务模式拆分复杂项目**  
对于需要几十上百次迭代的大型项目，用 `--tasks` 参数开启任务模式，Ralph 会自动把项目拆分为多个子任务逐个攻破。不仅能降低单次迭代的上下文大小节省 Token，还能让你清晰看到任务进度。
- **进阶技巧三：JSON 格式的测试用例**  
对于复杂项目，推荐用 JSON 格式编写功能验证清单，AI 更不容易篡改测试标准。每个功能点包含明确的验证步骤，完成后自动标记为通过，避免 AI"自欺欺人"式的虚假完成。

## 常见排错 (Troubleshooting)

### 🚨 报错：`ProviderModelNotFoundError / Model not configured`

**原因与解法**：AI 代理没有配置默认模型。要么在代理配置文件中设置默认模型，要么用 `--model` 参数显式指定模型名称。

### 🚨 循环一直在迭代但毫无进展

**原因与解法**：大概率是 Prompt 写得不够清晰，或者成功条件太模糊。可以在另一个终端用 `ralph --add-context "提示内容"` 注入更明确的指引，或者直接终止循环重写更具体的 Prompt。

## 实战示例 (Examples)

### 场景一：自动迁移测试框架从 Jest 到 Vitest

这是 Ralph 最擅长的批量机械任务类型，明确的成功标准+可自动验证的结果。

```Bash
# 迁移所有 Jest 测试到 Vitest
ralph "将项目中所有 Jest 测试文件迁移到 Vitest。
要求：
1. 替换所有 Jest 特定的 API 为 Vitest 等效 API
2. 更新 package.json 中的测试脚本
3. 所有测试必须可以正常运行通过
完成后输出 <promise>MIGRATION_COMPLETE</promise>。" \
  --agent claude-code \
  --max-iterations 30
```

### 场景二：通宵构建完整的 Web 应用

适合中小型项目的从 0 到 1 搭建，下班前跑上，第二天早上就能看到成品。

```Bash
# 构建带用户认证的全栈 Web 应用
ralph "构建一个完整的全栈 Web 应用，包含：
1. 后端：Express + TypeScript + PostgreSQL
2. 前端：React + Tailwind CSS
3. 用户注册/登录功能（JWT 认证）
4. 待办事项管理功能
5. 完整的单元测试和集成测试
所有功能正常运行后输出 <promise>PROJECT_COMPLETE</promise>。" \
  --tasks \
  --max-iterations 100 \
  --rotation "claude-code:claude-sonnet-4,opencode:claude-sonnet-4"
```

## 结语 & 下一步

Ralph Wiggum 本质上是把"失败是成功之母"这句老话套用到了 AI 编码上。它不追求一次就写出完美代码，而是通过不断迭代、试错、修正，最终达到目标。

下次遇到那些机械、重复、有明确完成标准的编码任务，别再自己熬夜写了，写好 Prompt 交给 Ralph，睡一觉起来验收成果就行。

- 项目源码：[github.com/Th0rgal/open-ralph-wiggum](https://github.com/Th0rgal/open-ralph-wiggum)
- 原理深度解读：[paddo.dev/blog/ralph-wiggum-autonomous-loops](https://paddo.dev/blog/ralph-wiggum-autonomous-loops/)