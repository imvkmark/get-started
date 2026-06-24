# 5️⃣ 工程化 : Token 优化 · Compaction · 生产级部署

## Compaction 压缩

#### 为什么上下文会「变坏」

在用 Claude Code 做长任务时，你可能有过这样的体验：会话进行到后半段，Claude 开始给出一些莫名其妙的建议——它似乎忘了你们一小时前达成的架构决策，或者在一个它已经修过的文件里又引入了同样的错误。这不是偶发现象，而是有规律的：上下文窗口越满，模型的推理质量越低。

研究和开发者经验都表明，当上下文窗口接近上限时，LLM 的性能会显著下降。在长会话中，上下文会「中毒」——模型开始与早期决策矛盾，或忘记它一直遵守的项目特定约定。

Compaction 就是对抗这个问题的机制。理解它的工作原理，才能合理地驾驭它，而不是被动地承受它。

#### 三层压缩架构

Claude Code 通过三种机制管理上下文：微压缩（Microcompaction）在工具输出变大时尽早卸载；自动压缩（Auto-compaction）在会话接近满载时触发；手动压缩（Manual compaction）让你在任务边界点主动控制。

**微压缩**是最低调的一层，持续在后台运行。当工具输出（Read、Bash、Grep 等）变得过大时，Claude Code 把它们保存到磁盘，上下文里只保留一个引用路径。最近的工具结果保持「内联」可见；更早的结果变成「存储在磁盘、可通过路径检索」的冷存储。 你平时感知不到这个过程，它默默地为你节省着宝贵的 token 空间。

**自动压缩**是大多数人真正遇到的那个。当上下文窗口接近上限（约 83.5%，对应 200K 窗口约 167K token），Claude Code 会自动触发压缩。系统会保留一个约 33K token 的缓冲区，确保压缩过程本身有足够空间运行而不会中途失败。

**手动压缩**是你主动出手的时机，下文重点讨论如何用好它。

#### 压缩的本质：不只是摘要

很多人以为 Compaction 就是「让 Claude 写一段摘要」，但实际上远比这精细。

压缩完成后，Claude Code 会重建上下文，依次注入：边界标记（标注压缩发生点）、压缩摘要、最近访问的文件（重新读取）、待办事项列表、计划状态，以及任何启动钩子注入的上下文。关键设计在于文件重新注入：系统会重新读取你刚才在处理的几个文件，这样你不会在工作中失去位置。

压缩后，摘要被包装进这样一段继续消息：「此会话从一个上下文已耗尽的前一次对话中继续。以下摘要涵盖了对话的前半部分……请从我们离开的地方继续，不要向用户再提问。继续处理你被要求的最后一个任务。」

摘要本身也有明确的信息契约，要求包含：用户意图（要求了什么、改变了什么）、关键技术决策、接触过的文件及原因、遇到的错误和解决方式、待处理任务和当前精确状态、以及与最近用户意图匹配的下一步行动。

#### 用 CLAUDE.md 控制压缩质量

自动压缩的触发时机不可配置，但压缩的质量可以引导。最可靠的方式是在 `CLAUDE.md` 里加一个 `Compact Instructions` 段落。

CLAUDE.md 在每次压缩后会从磁盘重新加载，因此这里的压缩指令在会话全程持续有效。

```
<!-- .claude/CLAUDE.md -->

## Compact Instructions

压缩上下文时，必须保留以下信息：
- 所有已修改文件的路径及修改目的
- 当前正在处理的功能或 Bug 的具体状态
- 本次会话发现并修复的错误及其根本原因
- 数据库 Schema 中的约定（BigDecimal 存金额、订单状态流转规则）
- 尚未完成的 TODO 事项列表，按优先级排列
- 最近一次运行的测试结果（哪些通过、哪些失败、失败原因）
```

这一段描述的是「什么必须从压缩中幸存」，而不是一般的代码风格或规范——那些已经在 CLAUDE.md 的其他部分了，不需要重复。写得越具体，压缩后的摘要越能保留有价值的信息。

#### 手动压缩：在对的时机出手

有经验的用户普遍建议不要等待自动压缩，因为它有时会导致 Agent 丢失重要上下文，甚至开始失控偏转。

手动压缩的时机应该是**任务边界点**，而不是等到快满时再急着用。比如：

```
# 完成了一个功能，开始下一个之前
/compact

# 需要聚焦在特定内容时，加焦点提示
/compact 重点保留 OrderService 的重构变更和已确认的接口设计

# 刚修完一个复杂 Bug，切换到新任务前
/compact 保留刚才修复的事务死锁问题的根本原因分析和解决方案
```

每次自动压缩循环都会让下一次压缩更早来临——Agent 重新读取文件来恢复丢失的上下文，重新运行命令来验证状态，这些操作产生更多 token，触发更快的下一次压缩。一旦压缩过一次的会话往往会在短时间内连续压缩三到五次，每次摘要都离原始细节更远。

主动在任务边界压缩，就是打破这个反馈循环的最有效手段。

#### /context：诊断上下文消耗

在使用 `/compact` 或 `/clear` 之前，先用 `/context` 看看上下文空间被谁占用：

```
/context
```

输出会显示各部分的 token 占比，典型的结构类似：

```
Context window usage: 142K / 200K (71%)

System prompt:        12K
CLAUDE.md + rules:    8K
MCP tool definitions: 18K   ← 如果有大量 MCP 工具
Conversation history: 89K
Tool outputs (recent):15K

Free space:           58K
Compaction buffer:    33K
Available for work:   25K
```

如果 MCP 工具定义吃掉了大量空间，可以在会话里临时禁用当前任务不需要的 MCP 服务：

```
# 禁用当前任务不需要的 MCP 服务，释放上下文空间
/mcp
# 在 MCP 管理界面里关闭不需要的服务器
```

在决定压缩之前，用 `/context` 找出占用空间大但当前不需要的 MCP 服务器并禁用，有时可以完全避免压缩的必要。

#### 自动压缩触发阈值调整

`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` 环境变量允许调整自动压缩的触发时机：

```
# 更早触发压缩（70%时触发），每次压缩后上下文更干净
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70

# 更晚触发压缩（90%时触发），可以使用更多上下文但风险更高
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=90
```

这个值接受 1-100，直接控制自动压缩触发的百分比阈值。设置更高的值让你在压缩前使用更多上下文，但留给压缩过程本身的缓冲区更少。

对于 Spring Boot 这类代码量大、文件读取频繁的项目，设置为 70-75 是合理的——让 Claude 在还有充足空间时就整理一次，而不是等到快爆了才仓促处理，往往能得到更高质量的摘要。

#### API 层的精细控制

如果你在构建内部工具或自动化流水线，Anthropic 的 Messages API 提供了对 Compaction 更精细的控制（目前处于 beta 阶段）：

```
import anthropic

client = anthropic.Anthropic()

response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-sonnet-4-6",
    max_tokens=4096,
    messages=messages,
    context_management={
        "edits": [
            {
                "type": "compact_20260112",
                # 当输入 token 超过 150K 时触发
                "trigger": {"type": "input_tokens", "value": 150000},
                # 自定义压缩指令：聚焦于代码和技术决策
                "instructions": "专注保留代码片段、变量名和技术决策，忽略中间的讨论过程。",
                # 压缩后暂停，允许你在继续之前注入额外上下文
                "pause_after_compaction": True,
            }
        ]
    },
)

# 检查是否因为压缩而暂停
if response.stop_reason == "compaction":
    # 可以在这里向 messages 里注入额外的系统指令
    messages.append({"role": "assistant", "content": response.content})
    # 然后继续
    response = client.beta.messages.create(
        betas=["compact-2026-01-12"],
        model="claude-sonnet-4-6",
        max_tokens=4096,
        messages=messages,
        context_management={"edits": [{"type": "compact_20260112"}]},
    )
```

`pause_after_compaction` 让 API 在生成压缩摘要后暂停，允许你在继续之前添加额外的内容块——比如保留最近的消息或注入特定的指令性消息。当压缩触发暂停时，响应的 `stop_reason` 会是 `"compaction"`。

* * *

理解 Compaction 机制的最终目的是：知道上下文里什么会消失、什么会保留，从而在会话设计上做对应的安排。持久的规范放 `CLAUDE.md`，任务进度放压缩指令，关键的中间状态在任务边界主动压缩而不是等系统自动处理。这三件事做好了，即使是跨越数百轮交互的长任务，也能保持相当稳定的质量。

## Token 成本优化

#### 先量化，再优化

优化 token 消耗的第一步不是改配置，而是建立对「我的会话在烧多少 token、烧在哪里」的直觉。没有测量，优化就是瞎猜。

```
# 查看当前会话的 token 详情
/cost

# 典型输出：
# Total tokens:    89,234
# Input tokens:    82,100   ← 占大头，是优化的主战场
# Output tokens:    7,134
# Estimated cost:  $0.48
```

输入 token 是大多数用户最大的成本驱动因素，因为上下文在会话中不断累积。它的构成大致是：对话历史占 40-50%，Claude 读取的文件内容占 30-40%，CLAUDE.md 和 MCP 元数据等系统上下文占 10-15%。降低输入 token 是最高影响力的优化方向。

`/context` 命令提供更细的分解：

```
/context

# 上下文用量：142K / 200K (71%)
#
# 系统提示:         12K
# CLAUDE.md:         8K
# MCP 工具定义:     18K   ← 有时候这里藏着大坑
# 对话历史:         89K
# 工具输出（近期）:  15K
#
# 空闲:             58K
# 压缩缓冲区:       33K
# 可用工作空间:     25K
```

如果 MCP 工具定义吃掉了 18K，但当前任务根本用不到大部分 MCP 服务器，这就是一个立刻可以解决的浪费点。

#### 五个主要浪费来源及对策

1.  ##### CLAUDE.md 越写越长

CLAUDE.md 在每次会话开始时全量加载，每一个 token 都会出现在每一轮对话的输入里。许多人把它变成了项目百科全书，导致每次问 Claude 一个简单问题，都要先把数千 token 的背景知识塞进去。

把 CLAUDE.md 控制在 50 行以内。不要放项目的历史信息，不要包含 Claude 可以通过读取源文件找到的文档。目的是防止 Claude 漫无目的地探索，而不是提前把每个细节都塞进去。

把 CLAUDE.md 拆分成两个层次：

```
<!-- CLAUDE.md（核心层，始终加载，保持精简）-->

## 架构概览
Spring Boot + MyBatis Plus，MySQL，Redis。
模块：account（账号管理）、order（交易）、payment（支付）。

## 关键约定
- 金额字段统一 BigDecimal，scale=2
- 返回值统一 Result<T> 包装
- 禁止在 Controller 里开事务

## 禁止读取的目录
- .git/
- target/
- logs/
```

把详细的规范、技术文档、历史决策放到 `.claude/docs/` 目录下独立文件，需要时用 `@docs/api-conventions.md` 语法显式引入，而不是让它永远占据上下文空间。

2.  ##### 无边界的文件读取

这是长会话里增长最快的开销来源。Claude 在探索代码时会读取大量文件，每个文件的内容都会进入上下文，而且不会自动清除——即使那个文件后来完全不相关了。

「重构认证系统」的任务，如果让主会话处理：Claude 读取 15 个文件（~50K token）→ 推理（~10K token）→ 修改（~20K token）。如果用 Subagent 处理：主会话只看到探索摘要（~500 token），Subagent 消耗的 50K token 在返回后被丢弃，主会话保持精简。

写进 CLAUDE.md 的一条规则，可以系统性地解决这个问题：

```
## 上下文管理原则

默认用 Subagent 处理以下任务：
- 代码库探索（需要读取 3 个以上文件来回答问题）
- 代码审查或分析（会产生大量详细输出）
- 任何「只需要结论」的调查任务

留在主上下文的任务：
- 直接修改用户请求的文件
- 1-2 个文件的精准读取
- 需要来回交互的对话
- 用户需要看到中间步骤的任务
```

3.  ##### 命令输出未裁剪就进上下文

Shell 命令的输出会完整地进入上下文。`mvn test` 的详细输出可能有几千行，`git log` 不加限制可以列出几百条提交，`cat` 一个大文件……这些操作一次性可以消耗上万 token。

用 Hook 来裁剪工具输出：

```
#!/bin/bash
# .claude/hooks/trim-output.sh
# PostToolUse Hook：裁剪 Bash 工具的输出

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# 针对 mvn test 输出截断——保留最后 50 行（含失败详情）
if echo "$COMMAND" | grep -q 'mvn.*test'; then
  OUTPUT=$(echo "$INPUT" | jq -r '.tool_response.output // empty')
  TRIMMED=$(echo "$OUTPUT" | tail -50)
  echo "📊 输出已截断至最后 50 行（总输出更长）"
  echo "$TRIMMED"
fi

exit 0
```

对于不需要截断的情况，使用精确的命令参数本身就是最好的裁剪：

```
# ❌ 完整日志全部进上下文
mvn test

# ✅ 只看失败的测试，无关输出不进上下文
mvn test 2>&1 | grep -E 'FAILED|ERROR|Tests run' | head -20

# ❌ 完整 git log
git log

# ✅ 只看近 5 条，简短格式
git log --oneline -5
```

4.  ##### 模型选型错误

Opus 的输出 token 成本是 Haiku 的近 19 倍。生成 5000 个输出 token 用 Opus 花 $0.375，用 Haiku 只花 $0.02。对于每月数百次任务的团队，这个差距会显著积累。

不同任务对模型能力的需求差异很大：

```
# 在会话中切换模型
/model sonnet   # 大多数实现任务用 Sonnet，性价比最高
/model opus     # 只在需要复杂架构决策时切到 Opus
/model haiku    # 格式检查、简单变更、重复性任务用 Haiku
```

一个实用的任务-模型映射原则：需要创造性推理和架构判断的任务用 Opus；需要写代码、修 bug、解释概念的任务用 Sonnet（覆盖约 80% 的场景）；只是格式化、重命名、简单查询的任务用 Haiku。

对于 Plan Mode（`Shift+Tab` 两次进入），Opus 的推理质量值得额外成本——但只在规划阶段，执行阶段切回 Sonnet。

5.  ##### 跨任务的上下文污染

一个会话里处理完权限模块的 Bug，接着去做支付模块的新功能，上下文里就混入了大量与支付任务无关的权限相关文件和对话。这些内容不会凭空消失，它们会影响后续每次请求的 token 消耗。

每个逻辑任务用一个会话效果最好——一个 Bug、一个功能、一次重构。不要试图在一次对话里修三个 Bug 再加两个功能。

```
# 任务完成后，在清除前给这次会话起个名字
/rename fix-order-status-null-pointer

# 然后清除，开始新任务
/clear

# 需要回到之前那个会话时
/resume fix-order-status-null-pointer
```

#### 用 ccusage 追踪消耗趋势

`/cost` 只看当前会话，`ccusage` 可以看历史趋势，帮助找出哪类任务在无谓烧钱：

```
npm install -g ccusage

ccusage daily              # 每日分解
ccusage blocks --live      # 实时查看 5 小时计费窗口
ccusage daily --breakdown  # 按模型分解成本
```

对于 Spring Boot 项目，根据历史数据可以建立一个任务成本参照：

| **任务类型**          | **典型 token 范围** | **说明**              |
| ----------------- | --------------- | ------------------- |
| 修单文件 Bug          | 5K - 15K        | 可接受，正常操作            |
| 新增一个 Service + 测试 | 20K - 50K       | 正常，注意文件读取范围         |
| 代码库级别的重构规划        | 50K - 120K      | 考虑用 Subagent 拆解探索阶段 |
| 「帮我看看整个项目有没有问题」   | 150K+           | 这是反模式，拆成小任务         |

#### 写进 CLAUDE.md 的最终形态

把上面所有策略整合进一条 CLAUDE.md 规则，让优化行为自动发生：

```
## Token 效率原则（请严格遵守）

**文件读取**：除非明确要求，每次任务读取的文件不超过 5 个。
需要探索更多时，先告知我，等我确认后再继续，或使用 Subagent。

**Subagent 默认规则**：
- 需要读取 3 个以上文件的探索任务 → 派生 Subagent
- 代码审查、分析类任务 → 派生 Subagent
- 只需要结论的调查 → 派生 Subagent

**命令输出**：
- 测试输出超过 20 行时，只显示失败摘要
- git log 默认 `--oneline -5`
- 构建日志只显示错误和警告

**模型使用**：
- 规划、架构决策：可使用 Opus
- 代码实现、Bug 修复：使用 Sonnet（默认）
- 格式化、简单变更：使用 Haiku
```

* * *

Token 优化本质上是一个信息论问题：把尽可能少但尽可能有效的信息放进上下文。在 Claude Code 里花费最少的开发者不是那些使用工具最少的人，而是那些主动管理上下文、有意识地选择模型、写出精准提示词，并在不相关任务之间清除会话的人。 这些习惯一旦养成，优化就变成了自动运行的背景行为，而不是每次都需要刻意去做的操作。

## Analytics 观测用量

#### 两套 API，定位不同

在开始之前，需要区分两个容易混淆的 API：

**Claude Code Analytics API**（`/v1/organizations/usage_report/claude_code`）是面向 Admin 的接口，提供每日聚合的用户生产力指标：会话数、代码行变化、提交次数、PR 数量、工具采纳率、成本分解。它的定位是帮助团队分析使用模式、构建自定义仪表盘、向管理层汇报 ROI。

**Usage & Cost API**（`/v1/organizations/usage_report/messages`）则专注于 API 调用的原始 token 消耗和费用，支持按工作区、模型、时间桶分组。两者互补——前者回答「团队在用 Claude Code 做什么」，后者回答「花了多少钱」。

两个 API 都需要 Admin API Key（以 `sk-ant-admin` 开头），只有组织管理员才能从 Console 申请。

#### 拉取一天的团队数据

最基础的用法是直接查询某一天所有成员的使用情况：

```
# 查询指定日期的团队用量（数据有约 1 小时延迟）
curl "https://api.anthropic.com/v1/organizations/usage_report/claude_code?\
starting_at=2026-03-26&\
limit=100" \
  --header "anthropic-version: 2023-06-01" \
  --header "x-api-key: $ADMIN_API_KEY"
```

API 返回的数据结构按用户和日期聚合，每条记录包含：用户邮箱（OAuth 登录）或 API Key 名称；终端类型（`vscode`、`iTerm.app`、`tmux` 等）；核心指标（会话数、代码行增减、提交数、PR 数）；工具操作的接受/拒绝数（Edit、Write、NotebookEdit）；以及按模型分解的 token 用量和估算费用。

一条完整的响应记录大致是这样：

```
{
  "date": "2026-03-26T00:00:00Z",
  "actor": {
    "type": "user_actor",
    "email_address": "zhang.wei@example.com"
  },
  "terminal_type": "vscode",
  "core_metrics": {
    "num_sessions": 8,
    "lines_of_code": { "added": 1243, "removed": 387 },
    "commits_by_claude_code": 5,
    "pull_requests_by_claude_code": 1
  },
  "tool_actions": {
    "edit_tool":       { "accepted": 67, "rejected": 4 },
    "multi_edit_tool": { "accepted": 18, "rejected": 2 },
    "write_tool":      { "accepted": 11, "rejected": 0 }
  },
  "model_breakdown": [
    {
      "model": "claude-sonnet-4-6",
      "tokens": { "input": 82000, "output": 12000, "cache_read": 45000 },
      "estimated_cost": { "currency": "USD", "amount": 320 }
    }
  ]
}
```

`estimated_cost.amount` 的单位是分（cents），所以 320 表示 $3.20。

#### 用 Python 构建团队周报

单次查询只覆盖一天，对于团队管理来说通常需要周维度的汇总。由于 API 只支持按天查询，需要客户端遍历日期范围：

```
#!/usr/bin/env python3
"""
team_weekly_report.py
生成团队 Claude Code 使用周报，输出 Markdown 格式
"""

import os
import json
import httpx
from datetime import date, timedelta
from collections import defaultdict

ADMIN_API_KEY = os.environ["ANTHROPIC_ADMIN_KEY"]
BASE_URL = "https://api.anthropic.com/v1/organizations/usage_report/claude_code"
HEADERS = {
    "anthropic-version": "2023-06-01",
    "x-api-key": ADMIN_API_KEY,
}


def fetch_day(target_date: date) -> list[dict]:
    """拉取指定日期的全部数据（处理分页）"""
    records = []
    params = {"starting_at": target_date.isoformat(), "limit": 1000}

    while True:
        resp = httpx.get(BASE_URL, headers=HEADERS, params=params)
        resp.raise_for_status()
        body = resp.json()
        records.extend(body.get("data", []))

        if not body.get("has_more"):
            break
        params["page"] = body["next_page"]

    return records


def fetch_week(end_date: date) -> list[dict]:
    """拉取最近 7 天的数据"""
    all_records = []
    # API 数据有 3 天延迟（Analytics API）或 1 小时延迟（Claude Code Analytics API）
    for i in range(7):
        day = end_date - timedelta(days=i)
        all_records.extend(fetch_day(day))
    return all_records


def calc_accept_rate(tool_actions: dict) -> float:
    """计算综合工具接受率"""
    total_accepted = sum(
        v.get("accepted", 0) for v in tool_actions.values()
    )
    total_all = total_accepted + sum(
        v.get("rejected", 0) for v in tool_actions.values()
    )
    return total_accepted / total_all if total_all > 0 else 0.0


def aggregate_by_user(records: list[dict]) -> dict:
    """按用户汇总一周数据"""
    user_stats = defaultdict(lambda: {
        "sessions": 0,
        "lines_added": 0,
        "lines_removed": 0,
        "commits": 0,
        "prs": 0,
        "accepted": 0,
        "rejected": 0,
        "cost_cents": 0,
        "input_tokens": 0,
        "cache_read_tokens": 0,
        "active_days": set(),
    })

    for record in records:
        actor = record["actor"]
        # 统一用邮箱或 API Key 名作为标识
        user_id = (
            actor.get("email_address")
            or f"[API Key] {actor.get('api_key_name', 'unknown')}"
        )

        s = user_stats[user_id]
        s["sessions"]      += record["core_metrics"]["num_sessions"]
        s["lines_added"]   += record["core_metrics"]["lines_of_code"]["added"]
        s["lines_removed"] += record["core_metrics"]["lines_of_code"]["removed"]
        s["commits"]       += record["core_metrics"]["commits_by_claude_code"]
        s["prs"]           += record["core_metrics"]["pull_requests_by_claude_code"]

        for tool_data in record["tool_actions"].values():
            s["accepted"] += tool_data.get("accepted", 0)
            s["rejected"]  += tool_data.get("rejected", 0)

        for model_data in record["model_breakdown"]:
            s["cost_cents"]       += model_data["estimated_cost"]["amount"]
            s["input_tokens"]     += model_data["tokens"]["input"]
            s["cache_read_tokens"] += model_data["tokens"].get("cache_read", 0)

        # 记录活跃天数
        date_str = record["date"][:10]
        s["active_days"].add(date_str)

    return user_stats


def generate_markdown_report(user_stats: dict, week_end: date) -> str:
    week_start = week_end - timedelta(days=6)
    lines = [
        f"# Claude Code 团队周报",
        f"**统计周期**: {week_start} ~ {week_end}",
        f"**活跃成员数**: {len(user_stats)}",
        "",
        "## 各成员详情",
        "",
        "| 成员 | 活跃天 | 会话数 | 新增行 | 接受率 | 提交数 | PR 数 | 费用 |",
        "|------|--------|--------|--------|--------|--------|-------|------|",
    ]

    # 按代码新增行数排序
    sorted_users = sorted(
        user_stats.items(),
        key=lambda x: x[1]["lines_added"],
        reverse=True,
    )

    total = defaultdict(int)
    for user, s in sorted_users:
        accept_rate = calc_accept_rate({"all": {"accepted": s["accepted"], "rejected": s["rejected"]}})
        cost_usd = s["cost_cents"] / 100
        active_days = len(s["active_days"])

        lines.append(
            f"| {user} | {active_days} | {s['sessions']} | "
            f"{s['lines_added']:,} | {accept_rate:.0%} | "
            f"{s['commits']} | {s['prs']} | ${cost_usd:.2f} |"
        )

        for k in ["sessions", "lines_added", "lines_removed", "commits", "prs", "accepted", "rejected", "cost_cents"]:
            total[k] += s[k]

    total_accept_rate = calc_accept_rate({"all": {"accepted": total["accepted"], "rejected": total["rejected"]}})
    total_cost_usd = total["cost_cents"] / 100

    lines += [
        "",
        "## 团队汇总",
        "",
        f"- **总会话数**: {total['sessions']}",
        f"- **净新增代码行**: {total['lines_added'] - total['lines_removed']:,} 行"
        f"（新增 {total['lines_added']:,} / 删除 {total['lines_removed']:,}）",
        f"- **通过 Claude Code 提交**: {total['commits']} 次",
        f"- **通过 Claude Code 创建 PR**: {total['prs']} 个",
        f"- **工具建议采纳率**: {total_accept_rate:.1%}",
        f"- **总费用估算**: ${total_cost_usd:.2f}",
    ]

    return "\n".join(lines)


if __name__ == "__main__":
    today = date.today()
    records = fetch_week(today)
    user_stats = aggregate_by_user(records)
    report = generate_markdown_report(user_stats, today)
    print(report)

    # 也可以保存到文件
    with open(f"reports/weekly_{today}.md", "w") as f:
        f.write(report)
```

运行后会生成类似这样的 Markdown 报告：

```
# Claude Code 团队周报
**统计周期**: 2026-03-20 ~ 2026-03-26
**活跃成员数**: 8

## 各成员详情

| 成员 | 活跃天 | 会话数 | 新增行 | 接受率 | 提交数 | PR 数 | 费用 |
|------|--------|--------|--------|--------|--------|-------|------|
| zhang.wei@example.com | 5 | 42 | 3,241 | 92% | 18 | 4 | $24.80 |
| li.na@example.com     | 5 | 38 | 2,876 | 88% | 15 | 3 | $21.20 |
...

## 团队汇总

- **总会话数**: 287
- **净新增代码行**: 12,450 行（新增 18,670 / 删除 6,220）
- **通过 Claude Code 提交**: 103 次
- **通过 Claude Code 创建 PR**: 22 个
- **工具建议采纳率**: 90.3%
- **总费用估算**: $156.40
```

#### 指标解读：什么信号值得关注

有了数据之后，需要知道哪些数字有实际意义，哪些只是噪音。

**工具接受率**是最有诊断价值的单一指标。建议采纳率衡量 Claude Code 的建议与团队特定编码需求和实践的相关性与有用性。一个长期保持在 90% 以上的团队，说明他们已经建立了有效的工作流——CLAUDE.md 写得精准，提示词质量高。如果某个成员的采纳率持续低于 70%，通常意味着他们对 Claude Code 的使用姿势有问题，可能值得一对一交流。

**活跃天数**是比会话数更有参考价值的采纳指标。一周只有 1-2 天有记录的成员，说明他们还没有把 Claude Code 融入日常工作流，而不是真的用不上——这类成员是推广培训的优先目标。

**每会话代码行数**（`lines_added / num_sessions`）反映每次使用的深度。这个值很高（200+ 行/会话）通常说明成员在做大批量任务（如自动生成测试、重构）；这个值很低说明他们主要用于小修小改。两者没有优劣之分，但结合业务背景可以判断用法是否合理。

**费用 vs. 产出**的比率是向管理层汇报 ROI 最直观的方式。如果一个团队一周花了 $160，但提交了 103 次、合并了 22 个 PR、净新增 12,000 行生产代码，这个数字本身就能说明问题。

#### 设置自动化定时任务

把报告生成纳入 CI/CD 或定时任务，避免手动拉取：

```
# .github/workflows/cc-analytics.yml
name: Claude Code 周报

on:
  schedule:
    # 每周一早上 9 点运行（UTC）
    - cron: '0 1 * * 1'
  workflow_dispatch:

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }

      - run: pip install httpx

      - name: 生成周报
        env:
          ANTHROPIC_ADMIN_KEY: ${{ secrets.ANTHROPIC_ADMIN_KEY }}
        run: |
          mkdir -p reports
          python scripts/team_weekly_report.py > reports/latest.md

      - name: 上传报告
        uses: actions/upload-artifact@v4
        with:
          name: cc-weekly-report
          path: reports/latest.md
```

* * *

Analytics API 的数据精度和延迟有其局限：数据在用户活动完成后约 1 小时可见，且 API 仅提供每日聚合数据。如果需要实时监控，应考虑使用 OpenTelemetry 集成。对于大多数团队管理场景，每日聚合已经足够。真正让这套数据产生价值的不是数据本身，而是持续地把它与团队的开发交付节奏对照——在采纳率下滑时找原因，在成本异常时分析是哪类任务在消耗，在成员活跃度差异大时提供针对性支持。

## 多层 CLAUDE.md 架构

#### 理解加载机制，再谈设计

在设计配置体系之前，必须弄清楚 Claude Code 加载 CLAUDE.md 的实际行为，否则精心设计的层级结构可能会失效。

Claude Code 使用两种加载策略：父目录加载（向上遍历）和子目录按需加载（向下懒加载）。父目录加载在启动时触发，Claude 从当前工作目录向上遍历文件树，加载每一级找到的 CLAUDE.md——这是根目录的规则如何自动覆盖子目录的机制。子目录加载按需触发，当 Claude 读取某个子目录里的文件时，才检查那个目录是否有 CLAUDE.md。这种按需加载让大型项目的 token 保持精简，直到 Claude 真正需要那些指令才加载。

还有一个关键细节：同级目录之间不会互相加载。如果你从 `packages/frontend/` 启动 Claude，它永远不会加载 `packages/backend/CLAUDE.md`，每个包只能看到根目录以及自己的祖先和子目录。

理解了这两条规则，你就知道该在哪一层放什么内容了。

#### 完整的层级结构

一个生产级的 Spring Boot 项目，配置体系可以这样组织：

```
game-platform/                      ← 项目根目录
├── CLAUDE.md                       ← 团队共享，提交版本库
├── CLAUDE.local.md                 ← 个人覆盖，加入 .gitignore
│
├── .claude/
│   ├── CLAUDE.md                   ← 项目级补充（可选）
│   ├── rules/                      ← 模块化规则（按需加载）
│   │   ├── testing.md              ← 无 path 过滤：始终加载
│   │   ├── security.md             ← 无 path 过滤：始终加载
│   │   └── payment-api.md          ← path 过滤：只在支付目录加载
│   ├── agents/                     ← 自定义子 Agent
│   ├── hooks/                      ← Hook 脚本
│   └── skills/                     ← 自定义 Skills
│
├── src/
│   ├── main/java/com/example/
│   │   ├── order/
│   │   │   └── CLAUDE.md           ← 订单模块专属规则（按需加载）
│   │   └── payment/
│   │       └── CLAUDE.md           ← 支付模块专属规则（按需加载）
│   └── ...
│
└── ~/.claude/CLAUDE.md             ← 个人全局偏好（所有项目适用）
```

Settings.json 有独立的层级体系：企业管理策略 → 用户设置 → 项目共享设置 → 项目本地设置。`deny` 规则拥有最高安全优先级，不能被低层级的 `allow` 覆盖。CLAUDE.md 和 settings.json 各司其职——前者告诉 Claude「做什么、怎么做」，后者控制「被允许做什么」。

#### 根目录 CLAUDE.md：团队的最小公约数

根目录的 CLAUDE.md 是每个人、每个会话都会加载的内容，必须精简有力。只放那些「缺少这条规则 Claude 就会持续犯错」的内容。

````
<!-- CLAUDE.md — 提交到版本库，团队共享 -->

# 交易平台

Spring Boot 3.x + MyBatis Plus + MySQL + Redis。
模块划分：account（账号）、order（交易）、payment（支付）、user（用户）。

## 核心约定（违反会导致构建失败）

金额字段统一 BigDecimal，scale=2，禁用 double/float。
返回值统一 Result<T>，禁止裸 POJO 直接返回。
@Transactional 只加在 Service 层，禁止 Controller 开事务。
敏感字段（手机号、身份证）返回前必须脱敏。

## 常用命令

```bash
mvn test -pl <module-name>   # 只跑指定模块的测试
mvn spring-boot:run          # 本地启动，端口 8080
mvn checkstyle:check         # 代码风格检查
````

#### 禁止读取的目录

-   `.git/`、`target/`、`logs/`
-   `src/main/resources/application-prod.yml`（生产配置，只读）

#### 上下文管理

探索超过 3 个文件的任务 → 派生 Subagent 命令输出超过 20 行 → 只显示摘要和错误行

````

注意这里没有塞入编码风格细节、历史决策、各模块的业务说明——那些内容放进下面的层级。

## `.claude/rules/`：模块化的「按需加载」规则

`.claude/rules/` 目录里的 `.md` 文件会被自动发现，无需任何配置。没有 `paths` frontmatter 的文件和 CLAUDE.md 享有同等的高优先级，始终加载；带有 `paths` 字段的文件只在 Claude 处理匹配路径的文件时才加载。这解决了把所有内容塞进一个大 CLAUDE.md 时「高优先级无处不在反而等于没有优先级」的问题。

```markdown
<!-- .claude/rules/testing.md — 无 path 过滤，始终加载 -->

# 测试规范

Service 层新增方法必须有对应的单元测试。
使用 Mockito Mock 所有外部依赖，禁止在单元测试里真实访问数据库。
测试方法命名：`should_[预期结果]_when_[条件]`。
最低覆盖率要求：核心业务逻辑 80%，工具类 60%。
````

```
<!-- .claude/rules/security.md — 无 path 过滤，始终加载 -->

# 安全规范

任何涉及金额计算的方法必须使用 BigDecimal，禁止隐式精度损失。
数据库查询必须使用 MyBatis Plus 参数化，禁止字符串拼接 SQL。
Controller 层所有公开接口必须有权限注解（@PreAuthorize 或自定义）。
日志禁止输出：手机号、身份证、银行卡号、密码。
```

```
<!-- .claude/rules/payment-api.md -->
---
paths:
  - "src/main/java/com/example/payment/**"
  - "src/test/java/com/example/payment/**"
---

# 支付模块专属规范

支付金额统一以分（Long）存储和传输，展示时再转换为元。
所有支付接口调用必须记录完整的请求和响应日志（脱敏后）。
支付状态流转：PENDING → PROCESSING → SUCCESS/FAILED，禁止跳过中间态。
退款接口必须实现幂等，使用订单号作为幂等键。
任何资金变动操作必须在事务内，且 rollbackFor = Exception.class。
```

路径过滤确保只在相关时才获得高优先级。当你在处理数据库迁移时，支付 API 规则不会出现在上下文里；当你切换到支付目录时，它自动加载。这是细粒度的「按需高优先级」，而不是全局噪音。

#### 子模块 CLAUDE.md：深入细节

对于有复杂业务逻辑的模块，直接在模块目录里放一个 CLAUDE.md，记录只有开发那个模块才需要知道的内容：

```
<!-- src/main/java/com/example/order/CLAUDE.md -->
<!-- 按需加载：只在 Claude 读取订单目录文件时触发 -->

# 订单模块

## 状态机

PENDING → PAID → SHIPPED → COMPLETED
PENDING → CANCELLED（只有用户主动取消或超时才允许）
PAID → REFUNDING → REFUNDED

禁止在状态机之外直接修改订单状态，必须通过 OrderStateMachine.transition()。

## 关键约束

- 订单号生成：`ORD-{yyyyMMdd}-{6位序号}`，由 OrderIdGenerator 统一生成
- 一个用户同一账号同时最多 1 个进行中的订单
- 超时未支付（30分钟）由定时任务自动取消，不走业务逻辑层

## 当前已知技术债

- OrderMapper.findByStatus() 缺少索引，大表查询慢，正在处理 JIRA-4821
- 退款流程与支付网关的回调存在竞态，已知但暂未修复
```

#### 个人层：不污染团队配置

每个开发者都有自己的偏好，这些应该和团队规范隔离：

```
<!-- ~/.claude/CLAUDE.md — 全局个人偏好，所有项目适用 -->

# 个人偏好

提交信息格式：feat/fix/chore(scope): description
代码有疑问时先问我再改，不要自行猜测意图。
调试时优先用日志而不是修改代码逻辑。
```

```
<!-- CLAUDE.local.md — 项目本地个人覆盖，加入 .gitignore -->

# 本地开发说明

本地数据库连接：mysql://localhost:3306/game_platform_dev
Redis：localhost:6379，密码 local_only_redis
本地不需要跑 checkstyle，太慢了
当前正在做：JIRA-5023 支付回调重试机制
```

`CLAUDE.local.md` 放本地环境配置、当前开发上下文、个人临时规则——这些内容不应该出现在团队共享的文件里，但在个人会话中很有价值。

#### 验证配置是否生效

设计完配置体系后，有几个方法验证它是否按预期工作：

```
# 在会话里直接问 Claude
"你目前加载了哪些 CLAUDE.md 和规则文件？列出它们的路径和来源。"

# 使用 /memory 命令查看当前活跃的内存文件
/memory

# 使用 /context 看 CLAUDE.md 占用了多少上下文空间
/context
```

如果发现某条规则 Claude 总是忽略，可以把否定形式（「不要……」）改成正向引导（「优先使用 X 而不是 Y」）。正向引导在上下文较大的会话里更可靠，尤其是在 MUST/不要 这类强调词在长会话里容易被稀释的情况下。

* * *

多层级 CLAUDE.md 体系的本质是**关注点分离**：全局的放全局，团队的放项目根，模块的放模块目录，个人的放个人文件。每一层只承载那一层真正需要的内容，不多也不少。这样设计出来的配置体系，在项目成长、团队扩大时自然扩展，而不是变成一个越来越难维护的单一大文件。

## **CI/CD 流水线集成**

### 在 GitHub Actions 中集成 Claude Code 做代码审查

把 Claude Code 接入 GitHub Actions，意味着每个 PR 提交后自动触发代码审查，不需要等待人工介入。审查结果直接作为 comment 出现在 PR 页面，开发者在等待 human review 的同时就能拿到 AI 的初步反馈，问题更早暴露，review 轮次减少。

* * *

#### 前置条件

在开始配置之前，需要准备两样东西。

**Anthropic API Key。** 在 Anthropic Console 创建一个 API Key，然后添加到 GitHub 仓库的 Secrets 里：仓库页面 → Settings → Secrets and variables → Actions → New repository secret，名称填 `ANTHROPIC_API_KEY`。

**GitHub Actions 权限。** 工作流需要能够读取 PR 内容、写入 comment。在仓库 Settings → Actions → General → Workflow permissions 里，选择 "Read and write permissions"，并勾选 "Allow GitHub Actions to create and approve pull requests"。

* * *

#### 基础配置：PR 自动审查

在仓库根目录创建 `.github/workflows/claude-review.yml`：

```
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]
    paths:
      - 'src/**/*.java'
      - 'pom.xml'

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Get PR diff
        id: diff
        run: |
          git diff origin/${{ github.base_ref }}...HEAD > pr_diff.txt
          echo "diff_size=$(wc -l < pr_diff.txt)" >> $GITHUB_OUTPUT

      - name: Run Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless --print \
            "你是一个严格的代码审查员，请审查以下 PR 改动。
            
            审查重点：
            1. 是否符合项目规范（返回值用 Result<T>，异常用 BizException）
            2. 事务边界是否正确
            3. 有无 N+1 查询问题
            4. 缓存使用是否规范（key 从 CacheConstants 取，必须设 TTL）
            5. 日志是否合理（关键操作有 INFO 日志，无 System.out.println）
            6. 有无明显的并发安全问题
            
            输出格式：
            - 用 Markdown 格式
            - 严重问题用 🔴 标注，建议改进用 🟡 标注，做得好的地方用 🟢 标注
            - 每个问题注明文件名和行号
            - 结尾给出总体评价（通过 / 建议修改 / 必须修改）
            
            PR 改动内容：
            $(cat pr_diff.txt)" \
            > review_result.txt

      - name: Post review comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review_result.txt', 'utf8');
            
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## 🤖 Claude Code Review\n\n${review}\n\n---\n*由 Claude Code 自动生成，仅供参考，以人工审查为准*`
            });
```

* * *

#### 针对不同文件类型的差异化审查

不同类型的文件关注点不同，可以根据改动的文件类型触发不同的审查逻辑：

```
      - name: Detect changed file types
        id: changes
        run: |
          CHANGED=$(git diff origin/${{ github.base_ref }}...HEAD --name-only)
          echo "has_service=$(echo "$CHANGED" | grep -c 'Service' || true)" >> $GITHUB_OUTPUT
          echo "has_mapper=$(echo "$CHANGED" | grep -c 'Mapper' || true)" >> $GITHUB_OUTPUT
          echo "has_controller=$(echo "$CHANGED" | grep -c 'Controller' || true)" >> $GITHUB_OUTPUT

      - name: Review Service layer
        if: steps.changes.outputs.has_service > 0
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/${{ github.base_ref }}...HEAD -- '*Service*.java' > service_diff.txt
          claude --headless --print \
            "审查 Service 层改动，重点检查：
            事务注解是否完整、业务异常处理是否规范、
            是否有在事务内调用外部 HTTP 接口的问题、
            关键业务操作是否有 INFO 日志。
            
            $(cat service_diff.txt)" >> review_result.txt

      - name: Review data access layer  
        if: steps.changes.outputs.has_mapper > 0
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/${{ github.base_ref }}...HEAD -- '*Mapper*.java' > mapper_diff.txt
          claude --headless --print \
            "审查数据访问层改动，重点检查：
            是否有 select *、是否有循环内查询、
            复杂查询是否有索引支持、
            软删除条件是否正确添加。
            
            $(cat mapper_diff.txt)" >> review_result.txt
```

* * *

#### 加入质量门禁

审查不只是给建议，还可以作为合并的质量门禁。在审查结果里加入机器可读的判断，让 Actions 根据结果决定是否阻断 PR：

```
      - name: Run Claude Code Review with gate
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless --print \
            "审查以下代码改动。
            
            在输出的最后一行，必须只输出以下三个词之一，不要有其他内容：
            PASS - 代码质量良好，可以合并
            WARN - 有建议改进但不阻断合并
            BLOCK - 有严重问题，必须修改后才能合并
            
            严重问题的判断标准：硬编码密钥或密码、跳过状态机直接修改状态、
            事务方法内调用外部接口、循环内执行数据库查询。
            
            $(cat pr_diff.txt)" > review_result.txt

      - name: Check gate result
        run: |
          VERDICT=$(tail -1 review_result.txt)
          echo "Review verdict: $VERDICT"
          if [ "$VERDICT" = "BLOCK" ]; then
            echo "::error::Claude Code Review 发现严重问题，PR 被阻断"
            exit 1
          fi
```

这个配置让 BLOCK 级别的问题直接导致 CI 失败，PR 无法合并，直到问题修复后重新提交触发审查通过。

* * *

#### 控制触发条件避免过度消耗

每次 push 都触发完整审查会产生不必要的 API 消耗。几个常用的控制手段：

```
on:
  pull_request:
    types: [opened, synchronize]
    paths:
      - 'src/**/*.java'      # 只有 Java 文件改动才触发
    branches:
      - main
      - develop              # 只有目标分支是 main 或 develop 的 PR 才触发

jobs:
  review:
    # 跳过 draft PR
    if: github.event.pull_request.draft == false
```

还可以通过 label 控制——只有打了特定 label 的 PR 才触发审查，适合在团队推广初期降低干扰：

```
on:
  pull_request:
    types: [labeled]

jobs:
  review:
    if: github.event.label.name == 'needs-ai-review'
```

* * *

#### 让审查结果更精准

审查质量的核心在于 prompt 的质量。几个让审查结果更贴近项目实际的做法：

在 prompt 里引入项目的 CLAUDE.md 内容，让审查标准和项目规范完全一致：

```
      - name: Load project context
        run: cat CLAUDE.md > project_context.txt

      - name: Run Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless --print \
            "以下是项目规范：
            $(cat project_context.txt)
            
            请严格按照上述规范审查以下改动：
            $(cat pr_diff.txt)" > review_result.txt
```

这样审查标准和你在 CLAUDE.md 里定义的规范完全同步，不需要在 prompt 里重复维护一份规范列表，两边也不会出现不一致。

### 配置 GitLab CI/CD 自动触发 Claude Code

GitLab CI/CD 的配置逻辑和 GitHub Actions 相近，但在变量管理、权限模型和 API 交互方式上有自己的一套体系。如果你的团队用 GitLab 托管代码，这一节的内容直接可以落地使用。

* * *

#### 前置条件

**Anthropic API Key。** 在 GitLab 项目页面进入 Settings → CI/CD → Variables，点击 Add variable，Key 填 `ANTHROPIC_API_KEY`，Value 填你的 API Key，类型选 Masked（避免在日志里暴露），Protected 视情况选择。

**GitLab API Token。** CI 流水线需要通过 GitLab API 在 MR 上写入 comment。在 GitLab 个人设置里创建一个 Access Token，权限勾选 `api`，然后同样存入 CI/CD Variables，Key 填 `GITLAB_API_TOKEN`。

如果是 GitLab Self-Managed 实例，还需要确认 runner 能访问外网（连接 Anthropic API），或者配置好代理。

* * *

#### 基础配置：MR 自动审查

在仓库根目录创建 `.gitlab-ci.yml`：

```
stages:
  - review

variables:
  NODE_VERSION: "20"

claude-code-review:
  stage: review
  image: node:20-alpine
  
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: always
    - when: never

  before_script:
    - npm install -g @anthropic-ai/claude-code
    - apk add --no-cache git curl jq

  script:
    - |
      # 获取 MR 的 diff 内容
      git fetch origin $CI_MERGE_REQUEST_TARGET_BRANCH_NAME
      git diff origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME...HEAD \
        -- '*.java' > mr_diff.txt

      DIFF_SIZE=$(wc -l < mr_diff.txt)
      echo "Diff size: $DIFF_SIZE lines"

      if [ "$DIFF_SIZE" -eq 0 ]; then
        echo "No Java file changes, skipping review"
        exit 0
      fi

    - |
      # 运行 Claude Code 审查
      claude --headless --print \
        "你是一个严格的代码审查员，请审查以下 MR 改动。

        项目规范：
        - 返回值统一用 Result<T> 封装
        - 业务异常统一抛出 BizException(ErrorCode)
        - 禁止 System.out.println，统一用 @Slf4j
        - 对象转换用 MapStruct，禁止 BeanUtils.copyProperties
        - 查询方法加 @Transactional(readOnly = true)
        - 写操作加 @Transactional
        - 禁止在事务方法内调用外部 HTTP 接口
        - 禁止循环内执行数据库查询

        审查重点：
        1. 是否存在违反上述规范的代码
        2. 事务边界是否正确
        3. 异常处理是否规范
        4. 日志是否合理
        5. 有无并发安全问题

        输出格式：
        - Markdown 格式
        - 🔴 严重问题（必须修改）
        - 🟡 建议改进（可选修改）
        - 🟢 做得好的地方
        - 每个问题注明文件名和行号
        - 末行只输出 PASS、WARN 或 BLOCK

        MR 改动：
        $(cat mr_diff.txt)" > review_result.txt

    - |
      # 读取审查结果
      REVIEW_CONTENT=$(cat review_result.txt)
      VERDICT=$(tail -1 review_result.txt)
      echo "Verdict: $VERDICT"

    - |
      # 通过 GitLab API 发布 comment
      COMMENT_BODY=$(jq -n \
        --arg body "## 🤖 Claude Code Review

      $(cat review_result.txt)

      ---
      *由 Claude Code 自动生成，仅供参考，以人工审查为准*" \
        '{body: $body}')

      curl --silent --fail \
        --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
        --header "Content-Type: application/json" \
        --data "$COMMENT_BODY" \
        "$CI_API_V4_URL/projects/$CI_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes"

    - |
      # 质量门禁：BLOCK 级别直接让流水线失败
      if [ "$VERDICT" = "BLOCK" ]; then
        echo "Claude Code Review 发现严重问题，流水线中止"
        exit 1
      fi

  artifacts:
    paths:
      - review_result.txt
    expire_in: 7 days
    when: always
```

* * *

#### 引入项目 CLAUDE.md 作为审查标准

和 GitHub Actions 一样，把 CLAUDE.md 的内容送进 prompt，让审查标准和项目规范完全同步：

```
  script:
    - |
      git fetch origin $CI_MERGE_REQUEST_TARGET_BRANCH_NAME
      git diff origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME...HEAD \
        -- '*.java' > mr_diff.txt

    - |
      PROJECT_CONTEXT=""
      if [ -f "CLAUDE.md" ]; then
        PROJECT_CONTEXT=$(cat CLAUDE.md)
      fi

      claude --headless --print \
        "以下是项目规范，请严格按照此规范进行审查：

        $PROJECT_CONTEXT

        请审查以下 MR 改动，输出 Markdown 格式的审查报告。
        末行只输出 PASS、WARN 或 BLOCK。

        MR 改动：
        $(cat mr_diff.txt)" > review_result.txt
```

这样规范只在 CLAUDE.md 里维护一份，CI 配置里不需要重复写，两边永远保持一致。

* * *

#### 按文件类型分模块审查

对于改动文件较多的 MR，拆分成多个针对性审查比一次性全量审查效果更好：

```
claude-review-service:
  stage: review
  image: node:20-alpine
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      changes:
        - src/**/*Service*.java
  before_script:
    - npm install -g @anthropic-ai/claude-code
    - apk add --no-cache git curl jq
  script:
    - |
      git fetch origin $CI_MERGE_REQUEST_TARGET_BRANCH_NAME
      git diff origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME...HEAD \
        -- '*Service*.java' > service_diff.txt

      claude --headless --print \
        "审查 Service 层改动，重点关注：
        事务注解完整性、业务异常处理、
        事务内是否调用外部接口、关键操作的日志。

        $(cat service_diff.txt)" > service_review.txt

      # 发布 Service 层审查 comment
      curl --silent --fail \
        --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
        --header "Content-Type: application/json" \
        --data "$(jq -n --arg body "### Service 层审查\n\n$(cat service_review.txt)" '{body: $body}')" \
        "$CI_API_V4_URL/projects/$CI_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes"

claude-review-mapper:
  stage: review
  image: node:20-alpine
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      changes:
        - src/**/*Mapper*.java
  before_script:
    - npm install -g @anthropic-ai/claude-code
    - apk add --no-cache git curl jq
  script:
    - |
      git fetch origin $CI_MERGE_REQUEST_TARGET_BRANCH_NAME
      git diff origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME...HEAD \
        -- '*Mapper*.java' > mapper_diff.txt

      claude --headless --print \
        "审查数据访问层改动，重点关注：
        是否有 select *、循环内查询、
        软删除条件是否正确、复杂查询的索引支持。

        $(cat mapper_diff.txt)" > mapper_review.txt

      curl --silent --fail \
        --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
        --header "Content-Type: application/json" \
        --data "$(jq -n --arg body "### 数据访问层审查\n\n$(cat mapper_review.txt)" '{body: $body}')" \
        "$CI_API_V4_URL/projects/$CI_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes"
```

两个 job 并行运行，分别审查 Service 层和数据访问层，各自发布独立的 comment，互不干扰。

* * *

#### 控制触发条件

```
claude-code-review:
  rules:
    # 只在 MR 事件触发
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      # 跳过 Draft MR
      if: '$CI_MERGE_REQUEST_TITLE !~ /^(Draft:|WIP:)/'
      # 只审查目标分支是 main 或 develop 的 MR
      if: '$CI_MERGE_REQUEST_TARGET_BRANCH_NAME =~ /^(main|develop)$/'
      when: always
    - when: never
```

也可以通过 MR label 控制，只有打了指定 label 才触发审查——适合团队推广初期，不想对所有 MR 强制开启：

```
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event" && $CI_MERGE_REQUEST_LABELS =~ /needs-ai-review/'
      when: always
    - when: never
```

* * *

#### 缓存 Claude Code 安装加速流水线

每次 job 都重新安装 Claude Code 会增加额外的时间。用 GitLab 的 cache 机制复用安装结果：

```
claude-code-review:
  cache:
    key: claude-code-npm-cache
    paths:
      - .npm-global/
    policy: pull-push

  before_script:
    - export NPM_CONFIG_PREFIX=".npm-global"
    - export PATH="$PATH:.npm-global/bin"
    - npm install -g @anthropic-ai/claude-code
    - apk add --no-cache git curl jq
```

第一次运行会正常安装并写入缓存，后续 job 直接从缓存读取，安装时间从十几秒降到几秒。

* * *

#### Self-Managed GitLab 的额外配置

如果是自建 GitLab 实例，runner 访问外网可能受限。在 `.gitlab-ci.yml` 里配置代理：

```
variables:
  HTTPS_PROXY: "http://your-proxy:port"
  HTTP_PROXY: "http://your-proxy:port"
  NO_PROXY: "your-gitlab-domain.com,localhost"
```

或者在 runner 配置文件 `config.toml` 里全局设置，避免每个 CI 文件都要重复配置：

```
[[runners]]
  environment = [
    "HTTPS_PROXY=http://your-proxy:port",
    "NO_PROXY=your-gitlab-domain.com"
  ]
```

网络不通是 Self-Managed 环境最常见的问题，`curl -v https://api.anthropic.com` 是最快的排查手段，在 job 的 script 里加这一行，日志里就能看到连通性是否正常。

### 用 `--headless` 模式运行无交互自动化任务

Claude Code 默认是交互式的——它会在执行某些操作前询问你是否确认，遇到歧义时暂停等待你的输入。这在日常开发里是合理的保护机制，但在 CI/CD 流水线、定时脚本、批处理任务里，等待人工输入是不可接受的。`--headless` 模式关闭所有交互提示，让 Claude Code 能在完全自动化的环境里运行。

* * *

#### 基本语法

```
claude --headless --print "你的任务描述"
```

两个参数通常配合使用：

`--headless` 禁用交互模式，所有需要确认的操作自动按默认选项执行，不再等待用户输入。

`--print` 把 Claude 的回复输出到标准输出（stdout），而不是进入交互式对话界面。在脚本里这个参数几乎是必须的，否则输出无法被后续命令捕获。

两者结合，Claude Code 的行为变成：接收输入 → 处理 → 输出结果 → 退出。和普通命令行工具的行为一致，可以直接接入任何自动化流程。

* * *

#### 从文件读取任务内容

任务描述复杂时，不适合直接写在命令行参数里。更好的方式是写成文件，用标准输入传入：

```
claude --headless --print < task.txt
```

或者用 heredoc 处理多行内容：

```
claude --headless --print << 'EOF'
审查以下代码，检查是否符合项目规范：
1. 返回值是否用 Result<T> 封装
2. 异常是否统一抛出 BizException
3. 是否有事务注解

$(cat src/service/UserServiceImpl.java)
EOF
```

注意 heredoc 里的 `$(cat ...)` 会在 shell 层面展开，Claude 收到的是文件的实际内容，而不是命令本身。

* * *

#### 捕获输出结果

`--print` 把结果输出到 stdout，可以用标准的 shell 方式处理：

```
# 保存到文件
claude --headless --print "分析这段代码的性能问题" < code.java > analysis.txt

# 赋值给变量
RESULT=$(claude --headless --print "生成这个接口的单元测试" < UserService.java)

# 管道传给下一个命令
claude --headless --print "提取这个文件里所有的 TODO 注释" < src/service/TradeService.java \
  | grep -v "^$" \
  | sort > todo_list.txt
```

退出码也是可用的信号——Claude Code 正常完成任务返回 0，出现错误返回非 0。在脚本里可以据此判断是否继续执行：

```
claude --headless --print "检查代码质量" < diff.txt > review.txt
if [ $? -ne 0 ]; then
  echo "Claude Code 执行失败"
  exit 1
fi
```

* * *

#### 控制权限范围

`--headless` 模式默认会自动执行文件读写操作，但不会自动执行 bash 命令——这是一个安全边界。如果任务需要执行命令（比如运行测试、执行构建），需要显式开启：

```
# 允许执行 bash 命令
claude --headless --print --allowedTools bash,read,write "运行单元测试并修复失败的用例"
```

`--allowedTools` 接受逗号分隔的工具列表：

-   `read`：读取文件（默认允许）
-   `write`：写入文件（默认允许）
-   `bash`：执行 shell 命令（默认不允许，需显式开启）
-   `browser`：浏览器操作（需显式开启）

在 CI 环境里，建议精确指定需要的工具，而不是全部开放——最小权限原则在自动化脚本里同样适用。

* * *

#### 指定工作目录和上下文

```
# 在特定目录运行，Claude 的文件操作以此为根目录
claude --headless --print \
  --project-dir /workspace/trade-service \
  "分析这个模块的代码质量，列出主要问题"
```

如果需要加载特定的 CLAUDE.md 上下文：

```
# 先切换到项目目录，CLAUDE.md 会自动被读取
cd /workspace/trade-service
claude --headless --print "帮我找出所有违反事务规范的方法"
```

这比用 `--project-dir` 参数更可靠，因为 CLAUDE.md 的自动读取是基于当前工作目录的。

* * *

#### 实际脚本示例

**定时代码质量扫描：**

```
#!/bin/bash
# 每天定时扫描新增代码的质量问题

set -e

PROJECT_DIR="/workspace/trade-service"
REPORT_DIR="/reports/$(date +%Y%m%d)"
mkdir -p "$REPORT_DIR"

cd "$PROJECT_DIR"

# 获取昨天以来的新增代码
git diff HEAD~1...HEAD -- '*.java' > /tmp/daily_diff.txt

if [ ! -s /tmp/daily_diff.txt ]; then
  echo "今日无 Java 文件改动，跳过扫描"
  exit 0
fi

# 运行审查
claude --headless --print \
  --allowedTools read \
  "$(cat CLAUDE.md)

  请审查以下昨日新增代码，重点检查：
  事务规范、异常处理、日志规范、N+1 查询问题。
  输出 Markdown 格式报告，末行输出 PASS 或 BLOCK。

  $(cat /tmp/daily_diff.txt)" > "$REPORT_DIR/quality_report.txt"

VERDICT=$(tail -1 "$REPORT_DIR/quality_report.txt")

# 发送报告到企业微信
curl -s -X POST "$WECOM_WEBHOOK" \
  -H "Content-Type: application/json" \
  -d "{
    "msgtype": "markdown",
    "markdown": {
      "content": "### 每日代码质量报告 $(date +%Y-%m-%d)\n
      审查结果：$VERDICT\n
      详细报告：$REPORT_DIR/quality_report.txt"
    }
  }"

if [ "$VERDICT" = "BLOCK" ]; then
  echo "发现严重质量问题，请尽快处理"
  exit 1
fi
```

**批量生成单元测试：**

```
#!/bin/bash
# 找出没有对应测试文件的 Service，批量生成测试

cd /workspace/trade-service

find src/main -name '*ServiceImpl.java' | while read service_file; do
  # 推断对应的测试文件路径
  test_file=$(echo "$service_file" \
    | sed 's/src/main/src/test/' \
    | sed 's/ServiceImpl/ServiceTest/')

  if [ -f "$test_file" ]; then
    echo "已有测试：$service_file，跳过"
    continue
  fi

  echo "生成测试：$service_file"

  claude --headless --print \
    --allowedTools read,write \
    "为以下 Service 实现类生成完整的单元测试。
    测试框架用 JUnit 5 + Mockito。
    测试用 given-when-then 结构。
    覆盖正常流程、异常流程、边界条件。
    生成后写入文件：$test_file

    $(cat $service_file)" > /tmp/gen_log.txt

  echo "完成：$test_file"
  sleep 2  # 避免请求过快
done
```

**PR 合并前自动检查：**

```
#!/bin/bash
# 作为 git pre-push hook 运行，推送前本地检查

CURRENT_BRANCH=$(git branch --show-current)
TARGET_BRANCH="main"

# 只对 feat/ 和 fix/ 分支检查
if [[ ! "$CURRENT_BRANCH" =~ ^(feat|fix)/ ]]; then
  exit 0
fi

git diff "origin/$TARGET_BRANCH"...HEAD -- '*.java' > /tmp/push_diff.txt

if [ ! -s /tmp/push_diff.txt ]; then
  exit 0
fi

echo "运行 Claude Code 预检查..."

claude --headless --print \
  "快速检查以下代码改动是否有明显问题。
  只报告严重问题（不符合事务规范、硬编码配置、绕过状态机）。
  没有严重问题则输出：ALL_CLEAR
  有严重问题则输出：ISSUES_FOUND，并列出具体问题。

  $(cat /tmp/push_diff.txt)" > /tmp/precheck_result.txt

cat /tmp/precheck_result.txt

if grep -q "ISSUES_FOUND" /tmp/precheck_result.txt; then
  echo ""
  echo "预检查发现问题，请修复后再推送"
  echo "如需跳过检查，使用 git push --no-verify"
  exit 1
fi

echo "预检查通过"
```

把这个脚本放在 `.git/hooks/pre-push` 并给执行权限：

```
cp pre-push.sh .git/hooks/pre-push
chmod +x .git/hooks/pre-push
```

* * *

#### 几个实际使用的注意点

**超时控制。** 复杂任务可能运行较长时间，在脚本里加超时保护，避免因为 Claude 响应慢导致整个流水线挂起：

```
timeout 300 claude --headless --print "..." < input.txt > output.txt
```

**并发限制。** 批量处理多个文件时，并发调用 Claude Code 会触发 API 限流。用 `xargs -P` 控制并发数，或者在循环里加 `sleep`，比并发失败然后重试代价低。

**输出噪声过滤。** `--headless` 模式下 Claude Code 有时会输出进度信息到 stderr，实际结果在 stdout。如果只需要结果，用 `2>/dev/null` 过滤 stderr，避免日志里出现不必要的内容：

```
claude --headless --print "..." 2>/dev/null > result.txt
```

**幂等性设计。** 自动化脚本要考虑重复运行的情况——网络抖动导致脚本中途失败，重新运行时不应该产生副作用。在写入文件前检查是否已存在，在发布 comment 前检查是否已发布过。

### 处理测试覆盖、lint 修复等日常自动化场景

代码审查解决"发现问题"，而测试覆盖和 lint 修复解决"消灭问题"。这类任务有一个共同特点：机械、重复、规则明确——恰好是 Claude Code 自动化最能发挥价值的地方。把这些任务从开发者的日常负担里剥离出来，让流水线或脚本自动处理，开发精力就能集中在真正需要判断力的地方。

* * *

#### 测试覆盖自动补全

**找出未覆盖的方法并生成测试**

```
#!/bin/bash
# 扫描覆盖率报告，找出未覆盖的 Service 方法，自动生成测试

set -e
cd /workspace/trade-service

# 先跑一遍测试，生成覆盖率报告
mvn test jacoco:report -q

# 解析 JaCoCo XML 报告，找出覆盖率为 0 的方法
python3 << 'PYEOF'
import xml.etree.ElementTree as ET
import json

tree = ET.parse('target/site/jacoco/jacoco.xml')
root = tree.getroot()

uncovered = []
for package in root.findall('.//package'):
    for cls in package.findall('class'):
        class_name = cls.get('name').replace('/', '.')
        # 只关注 Service 实现类
        if 'ServiceImpl' not in class_name:
            continue
        for method in cls.findall('method'):
            counter = method.find("counter[@type='LINE']")
            if counter is not None and counter.get('covered') == '0':
                uncovered.append({
                    'class': class_name,
                    'method': method.get('name'),
                    'desc': method.get('desc')
                })

with open('/tmp/uncovered_methods.json', 'w') as f:
    json.dump(uncovered, f, indent=2)

print(f"发现 {len(uncovered)} 个未覆盖方法")
PYEOF

# 按类分组，逐类生成测试
python3 -c "
import json
data = json.load(open('/tmp/uncovered_methods.json'))
classes = {}
for item in data:
    classes.setdefault(item['class'], []).append(item['method'])
for cls, methods in classes.items():
    print(f'{cls}|{chr(44).join(methods)}')
" | while IFS='|' read -r class_name methods; do

  # 找到对应的源文件
  source_file=$(find src/main -name "$(basename $class_name | sed 's/.*.//')".java 2>/dev/null | head -1)
  if [ -z "$source_file" ]; then
    echo "找不到源文件：$class_name，跳过"
    continue
  fi

  # 推断测试文件路径
  test_file=$(echo "$source_file" \
    | sed 's|src/main|src/test|' \
    | sed 's|ServiceImpl|ServiceTest|')

  echo "为 $class_name 生成缺失测试，方法：$methods"

  if [ -f "$test_file" ]; then
    # 测试文件已存在，追加缺失的测试方法
    claude --headless --print \
      --allowedTools read,write \
      "以下 Service 实现类有这些方法尚未被测试覆盖：$methods

      请为这些方法补充单元测试，追加到现有测试文件里。
      要求：
      - 使用 JUnit 5 + Mockito
      - given-when-then 结构
      - 覆盖正常流程和异常流程
      - 不要修改已有的测试方法
      - 直接写入文件：$test_file

      Service 实现：$(cat $source_file)
      现有测试：$(cat $test_file)" > /dev/null
  else
    # 测试文件不存在，创建完整测试类
    claude --headless --print \
      --allowedTools read,write \
      "为以下 Service 实现类创建完整的单元测试文件。
      要求：
      - 使用 JUnit 5 + Mockito
      - given-when-then 结构
      - 覆盖所有 public 方法的正常流程、异常流程、边界条件
      - 包名和导入根据源文件自动推断
      - 写入文件：$test_file

      Service 实现：$(cat $source_file)" > /dev/null
  fi

  sleep 2
done

# 验证新生成的测试能跑通
echo "验证新生成的测试..."
mvn test -q
echo "测试验证完成"
```

**覆盖率门禁**

```
# .gitlab-ci.yml 片段
coverage-gate:
  stage: test
  script:
    - mvn test jacoco:report -q

    - |
      # 提取整体覆盖率
      COVERAGE=$(python3 -c "
      import xml.etree.ElementTree as ET
      tree = ET.parse('target/site/jacoco/jacoco.xml')
      root = tree.getroot()
      for counter in root.findall('counter'):
          if counter.get('type') == 'LINE':
              missed = int(counter.get('missed'))
              covered = int(counter.get('covered'))
              pct = covered / (missed + covered) * 100
              print(f'{pct:.1f}')
              break
      ")
      echo "当前覆盖率：$COVERAGE%"

    - |
      # 覆盖率不足时，让 Claude 自动补充测试
      if (( $(echo "$COVERAGE < 80" | bc -l) )); then
        echo "覆盖率不足 80%，启动自动补充..."

        git diff origin/main...HEAD --name-only | grep 'ServiceImpl' | while read file; do
          claude --headless --print \
            --allowedTools read,write \
            "$(cat $file) 的测试覆盖率不足，
            请为未覆盖的方法补充测试，写入对应的测试文件" > /dev/null
        done

        # 重跑检查
        mvn test jacoco:report -q
        NEW_COVERAGE=$(python3 -c "...")
        echo "补充后覆盖率：$NEW_COVERAGE%"
      fi
```

* * *

#### Lint 问题自动修复

**Checkstyle 违规自动修复**

```
#!/bin/bash
# 运行 Checkstyle，找出违规，让 Claude 自动修复

set -e
cd /workspace/trade-service

# 运行 Checkstyle，把结果保存成 XML
mvn checkstyle:check -q 2>/dev/null || true
CHECKSTYLE_REPORT="target/checkstyle-result.xml"

if [ ! -f "$CHECKSTYLE_REPORT" ]; then
  echo "无 Checkstyle 报告，跳过"
  exit 0
fi

# 解析报告，按文件分组违规信息
python3 << 'PYEOF'
import xml.etree.ElementTree as ET
import json

tree = ET.parse('target/checkstyle-result.xml')
violations = {}

for file_elem in tree.findall('.//file'):
    filepath = file_elem.get('name')
    errors = []
    for error in file_elem.findall('error'):
        errors.append({
            'line': error.get('line'),
            'rule': error.get('source', '').split('.')[-1],
            'message': error.get('message')
        })
    if errors:
        violations[filepath] = errors

with open('/tmp/checkstyle_violations.json', 'w') as f:
    json.dump(violations, f, indent=2, ensure_ascii=False)

total = sum(len(v) for v in violations.values())
print(f"发现 {total} 个 Checkstyle 违规，涉及 {len(violations)} 个文件")
PYEOF

# 逐文件修复
python3 -c "
import json
data = json.load(open('/tmp/checkstyle_violations.json'))
for filepath, errors in data.items():
    violations_text = '\n'.join([f'第{e["line"]}行 [{e["rule"]}]: {e["message"]}' for e in errors])
    print(f'FILE:{filepath}')
    print(f'VIOLATIONS:{violations_text}')
    print('---')
" | awk '/^FILE:/{file=substr($0,6)} /^VIOLATIONS:/{viol=substr($0,12)} /^---/{print file "|" viol}' \
  | while IFS='|' read -r filepath violations; do

  echo "修复：$filepath"
  echo "违规：$violations"

  claude --headless --print \
    --allowedTools read,write \
    "请修复以下 Java 文件中的 Checkstyle 违规。

    文件路径：$filepath
    违规列表：
    $violations

    修复规则：
    - JavadocMethod：为 public 方法添加 Javadoc
    - MagicNumber：把魔法数字提取为常量
    - LineLength：超长行进行合理换行（不要破坏逻辑）
    - WhitespaceAround：在运算符前后添加空格
    - ImportOrder：按字母顺序整理 import

    只修复上述列出的违规，不要改动其他代码。
    修改后直接写回原文件：$filepath" > /dev/null

  sleep 1
done

# 验证修复结果
echo "验证修复结果..."
mvn checkstyle:check -q
echo "Checkstyle 全部通过"
```

**SpotBugs 问题修复**

```
#!/bin/bash
# SpotBugs 静态分析后自动修复高优先级问题

mvn compile spotbugs:spotbugs -q

# 找出高优先级 bug
python3 << 'PYEOF'
import xml.etree.ElementTree as ET

tree = ET.parse('target/spotbugsXml.xml')
high_priority = []

for bug in tree.findall('.//BugInstance'):
    priority = int(bug.get('priority', 3))
    if priority > 2:  # 只处理优先级 1-2 的问题
        continue

    source = bug.find('.//SourceLine')
    method = bug.find('.//Method')

    high_priority.append({
        'type': bug.get('type'),
        'priority': priority,
        'class': bug.get('classname', ''),
        'method': method.get('name', '') if method is not None else '',
        'start_line': source.get('start', '') if source is not None else '',
        'message': bug.find('LongMessage').text if bug.find('LongMessage') is not None else ''
    })

for bug in high_priority:
    print(f"{bug['class']}|{bug['method']}|{bug['type']}|{bug['start_line']}|{bug['message']}")
PYEOF | while IFS='|' read -r classname method bug_type line message; do

  source_file=$(find src/main -name "$(echo $classname | sed 's/.*.//')".java | head -1)
  [ -z "$source_file" ] && continue

  echo "修复 SpotBugs 问题：[$bug_type] $classname.$method 第${line}行"

  claude --headless --print \
    --allowedTools read,write \
    "请修复以下 SpotBugs 检测到的问题。

    文件：$source_file
    方法：$method
    问题类型：$bug_type
    位置：第 $line 行
    描述：$message

    常见修复方式：
    - NP_NULL_ON_SOME_PATH：添加空值检查
    - RCN_REDUNDANT_NULLCHECK：移除多余的空值检查
    - DM_DEFAULT_ENCODING：显式指定字符编码如 StandardCharsets.UTF_8
    - IS2_INCONSISTENT_SYNC：统一同步策略
    - URF_UNREAD_FIELD：移除未使用的字段

    只修复指定的问题，不要改动无关代码。
    修改后写回：$source_file" > /dev/null

  sleep 1
done

# 重新验证
mvn compile spotbugs:check -q && echo "SpotBugs 检查通过" || echo "仍有问题，请人工处理"
```

* * *

#### 依赖更新自动化

```
#!/bin/bash
# 检测过时依赖，评估升级风险，生成升级建议报告

cd /workspace/trade-service

# 获取过时依赖列表
mvn versions:display-dependency-updates -q \
  2>/dev/null | grep "->" > /tmp/outdated_deps.txt

if [ ! -s /tmp/outdated_deps.txt ]; then
  echo "所有依赖均为最新版本"
  exit 0
fi

echo "发现过时依赖："
cat /tmp/outdated_deps.txt

# 让 Claude 评估升级风险并生成建议
claude --headless --print \
  "以下是项目的过时依赖列表。请评估每个依赖的升级风险，并给出建议。

  项目技术栈：Spring Boot 3.2，Java 17，生产环境在用，不能随意升级。

  过时依赖：
  $(cat /tmp/outdated_deps.txt)

  请对每个依赖给出：
  - 风险等级（低/中/高）
  - 升级建议（可以直接升级 / 需要测试验证 / 暂不建议升级）
  - 升级理由或不升级的原因
  - 如果是安全漏洞相关，特别标注

  输出 Markdown 表格格式。" > /tmp/upgrade_report.txt

cat /tmp/upgrade_report.txt

# 自动升级低风险依赖
claude --headless --print \
  --allowedTools read,write \
  "根据以下升级建议，在 pom.xml 里执行所有标注为'可以直接升级'的依赖版本更新。
  只修改版本号，不要改动其他内容。

  升级建议：$(cat /tmp/upgrade_report.txt)
  当前 pom.xml：$(cat pom.xml)" > /dev/null

# 验证项目仍能正常编译和通过测试
echo "验证升级后项目状态..."
mvn test -q && echo "升级验证通过" || {
  echo "升级后测试失败，回滚..."
  git checkout pom.xml
}
```

* * *

#### 整合成统一的质量流水线

把上述场景整合进一个完整的 CI 阶段，按优先级顺序执行：

```
# .gitlab-ci.yml

stages:
  - build
  - quality-fix
  - test
  - coverage-check

quality-auto-fix:
  stage: quality-fix
  image: maven:3.9-eclipse-temurin-17
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  before_script:
    - npm install -g @anthropic-ai/claude-code
  script:
    - |
      echo "=== 步骤 1：Checkstyle 修复 ==="
      bash scripts/fix-checkstyle.sh

      echo "=== 步骤 2：SpotBugs 修复 ==="
      bash scripts/fix-spotbugs.sh

      echo "=== 步骤 3：提交修复结果 ==="
      if ! git diff --quiet; then
        git config user.email "ci@company.com"
        git config user.name "Claude Code CI"
        git add -A
        git commit -m "ci: auto-fix lint and static analysis issues"
        git push origin HEAD:$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME
      else
        echo "无需修复"
      fi
  artifacts:
    paths:
      - /tmp/upgrade_report.txt
    expire_in: 7 days

coverage-auto-fill:
  stage: coverage-check
  needs: [quality-auto-fix]
  script:
    - mvn test jacoco:report -q
    - bash scripts/fill-coverage.sh
    - |
      # 最终覆盖率检查
      COVERAGE=$(python3 scripts/parse-coverage.py)
      echo "最终覆盖率：$COVERAGE%"
      if (( $(echo "$COVERAGE < 80" | bc -l) )); then
        echo "覆盖率仍不足 80%，流水线失败"
        exit 1
      fi
```

* * *

#### 几个关键的设计原则

**先验证再修复，修复后再验证。** 每个修复脚本都应该有前置检查（确认问题存在）和后置验证（确认问题解决），避免修复引入新问题却无人察觉。

**修复失败要回滚，不要静默继续。** 如果 Claude 的修复导致测试失败，立刻 `git checkout` 回滚，而不是带着破损的代码继续流水线。修复失败是有价值的信号，应该在日志里清晰记录，而不是被掩盖。

**小步修复优于大批修复。** 一次处理一个文件，处理完验证一次，而不是改完所有文件再统一验证。出了问题能精确定位到哪个文件的哪次修复，而不是在一堆改动里大海捞针。

**自动修复只处理规则明确的问题。** Checkstyle 格式、SpotBugs 已知模式、缺失的 Javadoc——这些有明确修复规则的问题适合自动化。逻辑 bug、架构问题、业务正确性——这些需要理解上下文的问题不适合无监督自动修复，生成建议报告交给人工判断更合适。

## SDK 程序化控制

在此前的系列文章里，我们深入讨论了 Compaction 的工作原理、Token 成本管控策略，以及如何通过 Analytics API 获取可观测性数据。这些都是围绕"人机交互"场景展开的——你打开终端，输入命令，Claude Code 响应你。

但真实的生产环境往往不是这样运作的。游戏账号交易平台需要在挂单成功后自动触发代码审查；CI/CD 流水线需要在提测前让 Claude 跑一遍安全扫描；后台调度任务需要在凌晨三点悄悄完成一批数据迁移脚本的生成。这些场景的共同特征是：没有人在盯着屏幕，Claude 需要作为一个**被程序调度的自治进程**运行。

这就是 Agent SDK 的核心价值所在。

### Agent SDK 的定位

Anthropic 在近期对 Claude Code 的程序化能力做了一次重大整合，原来分散的"headless 模式"（`claude -p` 标志）与 TypeScript/Python SDK 包被统一归并为 **Agent SDK**。它提供了三种层次的调用方式：CLI 脚本调用、TypeScript 包和 Python 包。




对于 Java 技术栈的后端团队，直接依赖官方 SDK 包意味着额外引入 Node.js 或 Python 运行时——这在许多生产环境里代价不小。最务实的方案是通过 `ProcessBuilder` 或 Shell 脚本调用 `claude -p` CLI，再配合 JSON 输出格式做解析。本文以这条路径为主线，同时介绍 TypeScript SDK 的关键 API，让你在需要时有完整的参考。

### 进程启动：从 Java 调用 claude -p

CLI 的程序化入口就是 `-p`（`--print`）标志。加上这个标志，Claude Code 以非交互模式运行，完成任务后直接退出，把结果打印到 stdout。

最基础的调用形态：

```
claude -p "分析 src/main/java/trade/AccountService.java 的安全漏洞" \
  --output-format json \
  --allowedTools "Read,Bash" \
  --bare
```




`--output-format json` 让输出变成结构化 JSON，包含会话元数据和最终结果。`--bare` 是官方推荐的脚本调用模式，跳过本地配置的自动加载，保证行为的确定性——在 CI 环境里尤其重要，因为你不希望构建机器上开发者的个人配置悄悄影响执行结果。`--bare` 在未来版本中会成为 `-p` 模式的默认行为。




在游戏账号交易平台里，安全审查是一个高频场景。每次 `AccountTradeService` 提交代码变更，都需要检查是否存在价格注入、权限绕过等风险。把这个检查集成进 Java 后端服务的方式大致如下：




```
public class ClaudeSecurityAuditor {
    
    private static final String CLAUDE_BIN = "/usr/local/bin/claude";
    
    public SecurityAuditResult audit(String filePath) throws IOException, InterruptedException {
        String prompt = String.format(
            "审查文件 %s 的安全风险，重点关注：" +
            "1. SQL 注入风险 2. 价格篡改漏洞 3. 权限校验缺失。" +
            "以 JSON 格式返回结果，包含 risk_level 和 findings 字段。",
            filePath
        );
        
        ProcessBuilder pb = new ProcessBuilder(
            CLAUDE_BIN, "-p", prompt,
            "--output-format", "json",
            "--allowedTools", "Read,Bash",
            "--bare",
            "--permission-mode", "dontAsk"
        );
        
        pb.directory(new File(projectRoot));
        pb.redirectErrorStream(false);
        
        Process process = pb.start();
        
        // 读取 stdout（JSON 输出）
        String output = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        // 读取 stderr（日志/错误）
        String errOutput = new String(process.getErrorStream().readAllBytes(), StandardCharsets.UTF_8);
        
        int exitCode = process.waitFor();
        if (exitCode != 0) {
            log.error("Claude 进程异常退出，exitCode={}, stderr={}", exitCode, errOutput);
            throw new ClaudeExecutionException("审查失败，退出码：" + exitCode);
        }
        
        return parseResult(output);
    }
    
    private SecurityAuditResult parseResult(String jsonOutput) {
        // claude --output-format json 的输出结构：
        // { "result": "...", "session_id": "...", "total_cost_usd": 0.0023 }
        JsonObject root = JsonParser.parseString(jsonOutput).getAsJsonObject();
        String resultText = root.get("result").getAsString();
        double cost = root.get("total_cost_usd").getAsDouble();
        
        // resultText 里包含 Claude 生成的 JSON 内容，再次解析
        return SecurityAuditResult.fromJson(resultText, cost);
    }
}
```




几个值得注意的细节。`--permission-mode dontAsk` 让 Claude 在遇到不在 allowedTools 列表内的工具请求时直接拒绝，而不是挂起等待人工确认——自动化场景里进程挂起等同于死锁。`pb.directory(new File(projectRoot))` 设置工作目录，这会影响 Claude 加载 CLAUDE.md 和 `.claude/` 目录的路径，是让 SDK 读取项目上下文的关键开关。`redirectErrorStream(false)` 让 stdout 和 stderr 分开，避免 JSON 输出被日志污染。




输出格式方面，`--output-format json` 返回的顶层结构固定包含 `result`（最终文本结果）、`session_id`（本次会话 ID，用于续接或追踪）和 `total_cost_usd`（本次调用的美元成本）。如果你需要严格的结构化输出，还可以配合 `--json-schema` 传入 JSON Schema 定义，Claude 会保证 `structured_output` 字段符合你的 schema 约束。




### 流式输出：实时消费长任务进度




对于耗时较长的任务，等待进程退出再一次性消费输出往往不够实用。`--output-format stream-json` 切换为换行符分隔的 JSON 流，每个事件独占一行，可以像 Kafka 消息一样逐条消费。




```
claude -p "重构 PaymentService，拆分出独立的风控模块" \
  --output-format stream-json \
  --allowedTools "Read,Edit,Bash" \
  --bare
```




Java 端用 BufferedReader 逐行读取：




```
public void streamAudit(String prompt, Consumer<AuditEvent> eventConsumer) 
    throws IOException, InterruptedException {
    
    Process process = new ProcessBuilder(
        CLAUDE_BIN, "-p", prompt,
        "--output-format", "stream-json",
        "--allowedTools", "Read,Bash",
        "--bare"
    ).directory(new File(projectRoot)).start();
    
    try (BufferedReader reader = new BufferedReader(
            new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
        
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.isBlank()) continue;
            
            JsonObject event = JsonParser.parseString(line).getAsJsonObject();
            String type = event.get("type").getAsString();
            
            switch (type) {
                case "system" -> handleSystemEvent(event, eventConsumer);
                case "assistant" -> handleAssistantEvent(event, eventConsumer);
                case "result" -> handleResultEvent(event, eventConsumer);
            }
        }
    }
    
    process.waitFor();
}
```




stream-json 的事件流结构与 Agent SDK 的消息类型系统一一对应，这让 CLI 和 SDK 包之间的概念迁移非常顺畅。




### TypeScript SDK 的事件监听体系




当你用 TypeScript 直接调用 Agent SDK 时，就进入了一套更完整的消息驱动模型。理解这套模型对于架构复杂的自动化任务至关重要。




SDK 的核心调用入口是 `query()` 函数，它返回一个异步迭代器，在 Agent Loop 的整个生命周期里持续 yield 消息：




```
import { query, type Options } from "@anthropic-ai/claude-code";

const options: Options = {
  allowedTools: ["Read", "Bash", "Glob", "Grep"],
  permissionMode: "acceptEdits",
  maxTurns: 30,
  maxBudgetUsd: 0.50,   // 超过 50 美分自动停止
  effort: "high",
  settingSources: ["project"],  // 加载项目级 CLAUDE.md 和 Hooks
};

for await (const message of query({
  prompt: "分析账号交易模块的性能瓶颈并给出优化方案",
  options,
})) {
  switch (message.type) {
    case "system":
      console.log(`会话初始化，session_id: ${message.session_id}`);
      break;
      
    case "assistant":
      // 每个 Turn 结束后触发，包含文本块和工具调用块
      for (const block of message.message.content) {
        if (block.type === "text") {
          process.stdout.write(block.text);
        } else if (block.type === "tool_use") {
          console.log(`\n→ 调用工具: ${block.name}`);
        }
      }
      break;
      
    case "result":
      console.log(`\n完成。耗时 ${message.num_turns} 轮，花费 $${message.total_cost_usd?.toFixed(4)}`);
      if (message.subtype !== "success") {
        console.error(`异常终止原因: ${message.subtype}`);
      }
      break;
  }
}
```




消息类型系统是整个 SDK 的骨架。`SystemMessage` 在会话开始时触发，`subtype: "init"` 携带会话元数据；`subtype: "compact_boundary"` 则在自动 Compaction 发生时触发，这是系列文章前面讲过的上下文压缩边界信号，TypeScript SDK 里它是独立的 `SDKCompactBoundaryMessage` 类型。`AssistantMessage` 在每个 Turn 结束后触发，内容包括文本块和工具调用请求。`UserMessage` 在工具执行完毕、结果回传给 Claude 时触发。`ResultMessage` 是流的终止信号，`subtype` 字段告诉你任务是正常完成（`success`）还是触碰了边界（`error_max_turns`、`error_max_budget_usd`）。




`ResultMessage` 的处理值得特别强调：`result` 字段只在 `subtype === "success"` 时存在，其余错误子类型里这个字段是空的。错误处理模式应该始终先判断 subtype，再读取 result：




```
if (message.type === "result") {
  if (message.subtype === "success") {
    saveToAuditLog(message.result!, message.total_cost_usd);
  } else if (message.subtype === "error_max_budget_usd") {
    // 预算超限，记录会话 ID 以便人工续接
    alertOpsTeam(message.session_id, "budget_exceeded");
  } else if (message.subtype === "error_max_turns") {
    // 轮次超限，考虑拆分任务
    scheduleResume(message.session_id);
  }
}
```




### 流式输出：Token 级实时消费




默认情况下 SDK 等待每个 Turn 完全结束才 yield `AssistantMessage`。对于需要实时反馈的场景——比如把 Claude 的分析结果流式推送到前端——需要开启 `includePartialMessages`：




```
const options: Options = {
  allowedTools: ["Read"],
  includePartialMessages: true,  // 开启 StreamEvent
};

for await (const message of query({ prompt: "...", options })) {
  if (message.type === "stream_event") {
    const event = message.event;
    
    if (event.type === "content_block_delta") {
      const delta = event.delta;
      
      if (delta.type === "text_delta") {
        // Token 级文本流，直接推送给 WebSocket 客户端
        websocketClient.send(delta.text);
      } else if (delta.type === "input_json_delta") {
        // 工具调用的参数也在流式生成，可以用来显示"正在搜索..."等状态
        accumulateToolInput(delta.partial_json);
      }
    }
    
    if (event.type === "content_block_start") {
      if (event.content_block.type === "tool_use") {
        websocketClient.send(`\n[调用 ${event.content_block.name}...]\n`);
      }
    }
  }
}
```




流式模式下的事件序列遵循固定顺序：`message_start` → `content_block_start`（文本块）→ 多个 `content_block_delta`（文本增量）→ `content_block_stop` → `content_block_start`（工具调用块）→ 工具参数增量 → 完整的 `AssistantMessage` → 工具执行 → 下一个 Turn。理解这个顺序有助于在前端构建准确的状态机。




需要特别注意的兼容限制：开启了 `maxThinkingTokens`（扩展思考模式）时，StreamEvent 不会被触发，只有完整的 AssistantMessage。这两个特性是互斥的，在设计方案时需要提前决策。




### 其他生产级控制选项




**成本与轮次边界**是自动化场景的必备防护。`maxTurns` 限制 Agent Loop 的工具调用轮次；`maxBudgetUsd` 设置美元上限，两个参数建议同时配置，形成双重保障。在游戏账号交易平台的 CI 场景里，一次代码审查任务通常不应超过 20 轮 and 0.3 美元，超出则认为任务范围界定有问题，需要人工介入。




**`effort`** **控制推理深度**，直接影响每个 Turn 的 Token 消耗。`"low"` 适合目录扫描、文件列举等简单任务；`"high"` 适合复杂重构、安全审查；`"max"` 留给需要深度推理的多步骤问题。对于批量处理场景，把 effort 降低到 `"medium"` 往往能在保证质量的前提下显著压缩成本——这与系列文章前面讲过的 Token 成本管控策略是呼应的。




**`settingSources`** **控制上下文加载范围**。默认情况下 SDK 不加载任何文件系统配置，Agent 在完全隔离的环境里运行。设置 `settingSources: ["project"]` 后，SDK 会从当前工作目录加载 CLAUDE.md、Skills 和 Hooks 配置；加上 `"user"` 则同时加载 `~/.claude/` 下的用户级配置。CI 环境一般只加载 `["project"]`，保证构建的可复现性。




**会话续接**是长任务拆分的基础机制. 每个 `ResultMessage` 都携带 `session_id`，在下次调用时传入 `resume: sessionId`（TypeScript）即可从中断点继续，完整的上下文历史会被恢复。对于 `error_max_turns` 这类因轮次限制而中断的任务，会话续接配合更高的 `maxTurns` 是标准的恢复流程。




### 把这些串起来




回到游戏账号交易平台的场景。一个完整的自动化代码审查流程大致是这样的：开发者提交代码，CI 触发 Java 后端服务，服务通过 `ProcessBuilder` 调用 `claude -p`，传入 `--output-format stream-json` 实时消费审查进度，把关键发现推送到 Slack，最终把 `result` 和 `total_cost_usd` 写入审计日志。如果任务因 `error_max_turns` 中断，系统自动调度一个续接任务，并通知 DevOps 关注——这个"关注"本身是因为任务超出了预期复杂度边界，说明代码变更的范围可能需要重新评审。




这套流程的每个环节都有对应的 SDK 控制点：进程启动时的参数配置决定了权限边界；流式输出保障了长任务的可观测性；成本与轮次限制是生产环境的安全网；会话 ID 是跨请求状态管理的纽带。




理解 Agent SDK 的程序化控制模型，本质上是把 Claude Code 从一个交互式工具升级为可编排的服务组件。这是让 AI 能力真正嵌入工程基础设施的最后一公里。