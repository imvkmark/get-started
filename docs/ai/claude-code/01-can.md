---
description: '针对Claude Code CLI的文档摘要：涵盖安装配置（多模型/服务商切换、接口调用）、Prompt编写技巧（自然语言描述、错误定位、@引用）、CLAUDE.md项目地图创建与模块化管理、内置命令（/clear、/compact、/resume控制上下文）及Git工作流（自动commit、分支PR）等核心功能，助力高效协作。'
lastUpdated: '2026-07-07 13:56:48'
head:
  - - meta
    - name: 'og:title'
      content: '会用 : 命令行基础与日常协作'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '针对Claude Code CLI的文档摘要：涵盖安装配置（多模型/服务商切换、接口调用）、Prompt编写技巧（自然语言描述、错误定位、@引用）、CLAUDE.md项目地图创建与模块化管理、内置命令（/clear、/compact、/resume控制上下文）及Git工作流（自动commit、分支PR）等核心功能，助力高效协作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ai/claude-code/01-can.html'
---
# 会用 : 命令行基础与日常协作

本篇是「Claude Code 介绍以及学习教程」系列的**第一篇**，主题是「[会用 : 命令行基础与日常协作](/ai/claude-code/01-can.md)」。

整个系列五篇：

<table><colgroup><col/><col/><col/></colgroup><tbody><tr><td>篇</td><td>主题</td><td>何时读</td></tr><tr><td>1</td><td>[会用 : 命令行基础与日常协作](/ai/claude-code/01-can.md)「当前文章」</td><td>初次入手</td></tr><tr><td>2</td><td>[善用 : Agent 模式与自主任务执行](/ai/claude-code/02-with.md)</td><td>想知道底层循环、工具集、权限</td></tr><tr><td>3</td><td>[驾驭 : Skills · Hooks · Mcp 扩展体系](/ai/claude-code/03-use.md)</td><td>想把流程沉淀为可复用资产</td></tr><tr><td>4</td><td>[自动化 : 多 Agent 协作与并行执行](/ai/claude-code/04-auto.md)</td><td>遇到「又宽又重」的并行任务</td></tr><tr><td>5</td><td>[工程化 : Token 优化 · Compaction · 生产级部署](/ai/claude-code/05-engineering.md)</td><td>用熟了想降低成本、上 CI/CD</td></tr></tbody></table>

本文核心是**建立信任感,** 相信 Claude 能做的比你想象的多，然后慢慢把更多动作交出去。从安装、对话、调试，到提交代码、开 PR，这些单独看都不复杂，但串联起来会重塑你的日常开发节奏。这个阶段不需要追求技巧，最重要的一件事是：**养成开口的习惯**，遇到任何重复性的、机械性的操作，先问一句"Claude 能帮我做吗"，答案往往是肯定的

## 1.安装与配置

当前官方推荐的安装方式是原生安装（自动后台更新），macOS / Linux / WSL 一行搞定：

```Shell
# 原生安装（macOS / Linux / WSL）
curl -fsSL https://claude.ai/install.sh | bash
```

其他可用安装途径：

```Shell
# Homebrew：稳定版（落后约一周），不自动更新
brew install --cask claude-code

# Homebrew：最新版（与官方同步），不自动更新
brew install --cask claude-code@latest

# WinGet（Windows）
winget install Anthropic.ClaudeCode
```

::: tip 💡

- 原生安装会自动在后台更新，始终保持最新版本，最省心
- Homebrew 不会自动更新，需要定期 `brew upgrade --cask claude-code` 或 `claude-code@latest`
- Homebrew 落后主要是因为它走 stable 发布通道，如果你要跟最新版要用 `@latest` cask
- npm 包 `@anthropic-ai/claude-code` 在 npm 仓库仍可装，但官方只列出 native / Homebrew / WinGet 三种安装途径，npm 已不在官方推荐列表

:::

### 配置国内模型

::: tip 💡

模型和请求地址配置 : `~/.claude/settings.json`
- <a href="https://www.volcengine.com/docs/82379/1928262?lang=zh">Claude Code--火山</a>
- <a href="https://platform.minimaxi.com/docs/coding-plan/claude-code">Claude Code - MiniMax</a>

:::

以下是火山配置模板, 不同的国内兼容平台配置地址和密钥不同, 其他均一致

```JSON
{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "<ARK_API_KEY>",
        "ANTHROPIC_BASE_URL": "https://ark.cn-beijing.volces.com/api/coding",
        "ANTHROPIC_MODEL": "<Model_Name>"
    }
}
```

::: tip 💡

编辑或新增 `.claude.json` 文件, MacOS & Linux 为 `~/.claude.json` , 用来关闭使用 claude code 时候的登录凭证

:::

```JSON
{  
    "hasCompletedOnboarding": true
}
```

### 多模型切换

#### 多个服务商切换

[cc-switch](https://github.com/farion1231/cc-switch) 是一个便捷的工具，可以快速切换 Claude Code 的 API 配置, 不适合同时使用多模型, 其原理是通过工具的方式修改 claude 的配置文件, 从而使 claude 加载不同的配置

```Shell
brew tap farion1231/ccswitch
brew install --cask cc-switch
brew upgrade --cask cc-switch
```

#### 多服务商同时存在

采用多个客户端的方式, 但是其原理是使用 claude , 在运行过程中配置不同的环境变量来区分模型

例如可以把脚本命名成 `claude-doubao` 

```Bash
#!/usr/bin/env bash
# Wrapper for Claude Code CLI using Doubao API

CLAUDE_BIN="/opt/homebrew/bin/claude"

# Inject API credentials
export ANTHROPIC_AUTH_TOKEN="62162766-****-0b4be5c580de"
# 订阅模式
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding"
export ANTHROPIC_MODEL="ark-code-latest"
# 直接接口调用模式
# export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/compatible"
# export ANTHROPIC_MODEL="ep-20260127181733-p4xgl"
export API_TIMEOUT_MS=3000000

# Keep a separate config dir (optional)
export CLAUDE_CONFIG_DIR="$HOME/.claude-doubao"

exec "$CLAUDE_BIN" "$@"
```

假定这个目录是 `~/program`, 将这个目录加入 `PATH`, 可以全局访问 

```Plain Text
export PATH="$HOME/program:$PATH"
```

这样可以使多个客户端同时存在, 方便在速度和费用中间做权衡

![](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTFkZjg3OGExYjcwYmY4NGFjNDM1YzRiNGFlYWU0YjFfNGYxOTg3ZWI0YmQ3MThhM2VkOTVhZTYyZmQ0ZTlmMzZfSUQ6NzYyMDM3ODAyMzIwNTI3Njg1Ml8xNzgzNTQ3MTQzOjE3ODM1NTA3NDNfVjM)

#### 配置多服务商 (使用配置文件方式)

配置文件 : `~/.claude/settings.deepseek.json`, 这里可以访问全部的 [环境变量](https://code.claude.com/docs/zh-CN/env-vars#variables)

> 注：下方 JSON 示例里 `deepseek-v4-pro` / `deepseek-v4-flash` 是占位，请按你实际接入的第三方服务商公布的模型 ID 替换。把 Opus/Sonnet 都设为同一个轻量模型会显著影响主会话的推理质量；建议至少 Sonnet 保留中量级模型，Opus 在需要时手动 `/model` 切换。

```JSON
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-xxxxxxxxxxxxx",
    "ANTHROPIC_BASE_URL": "https://your-deepseek-proxy.com",
    "ANTHROPIC_MODEL": "deepseek-v4-pro",
    "ANTHROPIC_SMALL_FAST_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-flash",
    "CLAUDE_CODE_SUBAGENT_MODEL": "deepseek-v4-pro"
  }
}
```

配置 shell 别名

```Bash
alias claude-deepseek='claude --settings ~/.claude/settings.deepseek.json'
```

### 登录

[安装 Claude Code](https://code.claude.com/docs/zh-CN/setup#install-claude-code) 后，在终端中运行 `claude`。首次启动时，Claude Code 会打开浏览器窗口供您登录。如果浏览器没有自动打开，请按 `c` 将登录 URL 复制到剪贴板，然后将其粘贴到浏览器中

```JSON
claude
```

要登出并重新身份验证，请在 Claude Code 提示符处输入 `/logout`。如果您在登录时遇到问题，请参阅 [身份验证故障排除](https://code.claude.com/docs/zh-CN/troubleshooting#authentication-issues)

### 平台和集成

- [Remote Control](https://code.claude.com/docs/zh-CN/remote-control) : 使用 Remote Control 从任何设备继续本地会话

```JSON
claude remote-control
```

- [桌面端](https://code.claude.com/docs/zh-CN/desktop-quickstart)
- [Chrome 插件](https://code.claude.com/docs/zh-CN/chrome)
- [Vs Code](https://code.claude.com/docs/zh-CN/vs-code)
- [Jetbrains IDE](https://code.claude.com/docs/zh-CN/jetbrains)

::: info 🔗

参考资料
- <a href="https://zhuanlan.zhihu.com/p/2041961402378834377">Claude Code 多模型切换实战：一个终端同时玩转 Claude、DeepSeek、Kimi</a>

:::

## 2.Prompt 编写技巧

### 描述需求和Bug 

#### **用自然语言描述需求，让 Claude 生成代码**

Claude Code 最核心的能力之一，就是把你脑子里的想法直接变成可运行的代码，而不需要你去记忆 API 签名或查文档。

使用时，直接在终端用中文或英文描述你要做什么就行。比如"帮我写一个 Spring Boot 接口，接收用户 ID，查询该用户最近 30 天的订单列表，按金额倒序返回"——Claude 会读取你当前项目的代码结构、已有的 Entity 和 Mapper，然后生成符合你项目风格的代码，而不是一段脱离上下文的模板。

几个让描述更有效的技巧：说清楚**输入输出**（接收什么、返回什么）；提到**边界条件**（比如"用户不存在时返回 404"）；指定**技术约束**（"用 MyBatis Plus，不要写 XML"）。描述越具体，生成质量越高，返工越少。

Claude 也能跨文件完成任务。你说"在现有的推荐系统里加一个基于浏览历史的冷启动策略"，它会主动去找相关的 Service、Repository、配置文件，理解现有逻辑后再动手，而不是凭空生成一段孤立的代码。

#### **粘贴错误信息，让 Claude 定位并修复 bug**

遇到报错时，最快的做法是把完整的错误栈直接粘贴进对话，加一句简短的背景说明，比如"调用推荐接口时出现这个错误，请帮我排查"。

Claude 会沿着堆栈追踪真正的出错位置，而不是只看最表层的异常。它会主动去读相关的类和方法，判断是空指针、类型不匹配、事务边界问题还是配置缺失，然后给出针对性的修复，同时解释为什么会出现这个问题。

几点使用建议：**不要截图，要文本**——截图无法被分析；**附上触发路径**，比如"执行某个测试用例时触发的"，能帮助 Claude 快速收窄范围；如果是偶发性 bug，描述复现条件，比如"并发量高时才出现"，Claude 会着重分析线程安全或缓存一致性问题。

对于那些没有明显报错但结果不对的隐性 bug，你也可以描述现象："接口返回的推荐列表有重复 ID，但我已经做了去重"，Claude 会推断可能的原因并逐一验证。这种"症状式调试"往往比自己盲目加日志高效很多。

### 理解 Claude 如何读取整个代码库上下文

这是很多人用了 Claude Code 一段时间后才真正想清楚的问题——它到底是怎么"理解"你的项目的？弄清楚这个机制，能帮你更有意识地组织项目结构，写出更好的 CLAUDE.md，也能解释为什么有时候它"突然变笨了"。

#### 它不是一次性读完所有文件

很多人以为 Claude Code 启动时会扫描整个项目，把所有代码全部加载进来。实际上并非如此。

Claude Code 采用的是**按需读取**的策略。每次对话开始时，它会先读取少量关键文件建立初始印象——通常包括根目录的 `CLAUDE.md`、`package.json` / `pom.xml` / `build.gradle` 等构建文件、`.gitignore`，以及你当前所在目录的结构。这些文件告诉它：这是个什么类型的项目、用了哪些技术栈、有哪些主要模块。

真正的文件读取发生在**执行任务的过程中**。当你说"帮我给 UserService 加一个方法"，它会去找 `UserService.java`，读取后发现里面依赖了 `UserRepository`，于是继续读 `UserRepository`，再顺着找相关的 Entity 和 DTO。这个过程是链式的、惰性的，只读任务真正需要的部分。

#### 上下文窗口是核心约束

Claude Code 底层是语言模型，所有"理解"都发生在一个有限的 **上下文窗口** 里。截至 2026-07，Claude Code 支持 Sonnet 5、Opus 4.8、Haiku（具体可用模型在启动时由会话配置和 `/model` 命令决定）。当前 Anthropic 主线模型的标准上下文窗口为 **200K token** ，部分模型在 Beta 通道下支持  **1M token** （带有 `[1m]` 后缀，例如 `claude-fable-5[1m]`）。1M 上下文听起来很大，但一个中等规模的 Spring Boot 项目轻松就有几十万行代码，全部塞进去既不现实也没必要。

::: info ℹ️

1M 上下文窗口默认只对部分高阶模型开放。如果你的子 Agent 任务量大，可以把 `CLAUDE_CODE_SUBAGENT_MODEL` 显式指定为带 `[1m]` 后缀的型号，让子 Agent 享受大上下文。Sonnet 5 与 Opus 4.8 的区别详见第二篇「工程化」的 Token 选型部分。

:::

这意味着：**Claude 在任意时刻能"看到"的代码是有限的**。它会做取舍——优先保留你正在讨论的文件、最近编辑过的文件、以及与当前任务强相关的文件。那些离任务较远的模块，即使存在于项目里，Claude 也可能没有读取。

当你在一次很长的对话里不断切换话题，上下文会越来越拥挤。早期加载的文件内容可能被"挤出"窗口，导致 Claude 对之前讨论过的代码"失忆"。这就是为什么 `/compact` 和 `/clear` 命令很重要——适时压缩或重置上下文，比死撑一个超长对话效果好得多。

#### @ 引用是你的主动控制手段

既然 Claude 的读取是按需惰性的，你就可以主动告诉它该去看哪里。`@` 引用就是这个控制手段。

```Plain Text
@src/service/RecommendService.java 这个方法的性能有问题，帮我分析
```

```Plain Text
@src/config/RedisConfig.java @src/service/CacheService.java 
这两个文件配合起来看，Redis 连接池配置是否合理？
```

用 `@` 显式指定文件，比依赖 Claude 自行探索更精准、更节省 token，也更不容易产生幻觉——因为它看到的是你指定的真实代码，而不是靠推断"猜"出来的结构。

#### CLAUDE.md 是项目的"地图"

如果说上下文窗口是 Claude 的短期记忆，CLAUDE.md 就是它每次启动都会读取的**长期记忆入口**。

在 CLAUDE.md 里描述清楚项目结构、模块职责、关键约定，Claude 就不需要每次从零探索。比如你写上"推荐系统的核心逻辑在 `recommend-core` 模块，数据层全部用 MyBatis Plus，禁止使用原生 JDBC"，Claude 在处理相关任务时就会直接聚焦到正确的位置，而不是在整个项目里漫无目的地搜索。

一个好的 CLAUDE.md 本质上是在**替 Claude 压缩认知成本**，让它把有限的上下文预算花在真正重要的地方。

#### 为什么有时候它"不知道"某个文件的存在

这是初学者最常困惑的现象。你明明有一个 `OrderStatisticsService`，但 Claude 在生成代码时完全没有引用它，而是重新写了一遍类似的逻辑。

原因通常有三个：一是那个文件从未出现在当前对话的上下文里；二是项目结构比较深，Claude 的自动探索没有触及那个路径；三是 CLAUDE.md 里没有提到这个模块的存在。

解决方式很直接——用 `@` 手动引入那个文件，或者在 CLAUDE.md 里把重要的工具类和服务层做个索引式的说明。Claude Code 不是全知的，它的"智能"很大程度上依赖你给它的信息质量。

### 使用 `/help` 查看内置命令列表

`/help` 是进入 Claude Code 后第一个值得运行的命令。它输出的不只是一张命令表，更是整个工具能力边界的索引。花几分钟认真看一遍，比摸索几周更高效。

#### 运行方式

在任意对话状态下，直接输入：

```Plain Text
/help
```

不需要加任何参数。Claude Code 会立即输出当前版本支持的所有内置命令，包括命令名、简短描述和基本用法。如果你想查某个具体命令的详细说明，可以加上命令名：

```Plain Text
/help compact
/help memory
```

#### 命令的几个分类

`/help` 输出的命令大致可以归为以下几类，理解分类比死记命令名更有用：

**会话管理类**

控制当前对话的状态和生命周期

`/clear` 清空当前上下文重新开始

`/compact` 在保留摘要的前提下压缩对话历史，释放上下文空间

`/resume` 恢复上一次的会话

`/exit` 退出 Claude Code。这类命令在长时间工作时频繁用到，值得最先记住。

**记忆与上下文类**

管理 Claude 的跨会话记忆

`/memory` 查看和编辑 Claude 当前记住的项目信息；配合 CLAUDE.md 使用，可以精细控制哪些内容需要持久化，哪些只是临时上下文

**工具与模式类**

切换 Claude Code 的工作行为

比如控制是否允许自动执行 bash 命令、是否进入只读模式等。

对于在生产环境或敏感代码库里操作的场景，这类命令能提供额外的安全边界。

**反馈与调试类**

`/bug` 直接向 Anthropic 提交问题报告，会自动附带当前会话的上下文，比去 GitHub 手动开 issue 方便得多。遇到 Claude 行为异常时，这是最快的反馈路径

**自定义命令类**

这是很多人没注意到的部分

`/help` 里除了内置命令，也会列出你在项目里自定义的 slash 命令。

自定义命令存放在 `.claude/commands/` 目录下，每个 `.md` 文件对应一个命令。团队协作时，把常用的工作流封装成自定义命令放进仓库，所有人共享同一套操作规范，是非常实用的做法。

#### 一个容易忽略的细节

`/help` 的输出内容会随版本更新而变化。Claude Code 迭代非常快，平均每周都有新功能或命令加入。养成偶尔重新跑一遍 `/help` 的习惯，是跟上工具演进的最低成本方式——比订阅更新日志更直接，因为你看到的就是当前安装版本的真实状态，不存在文档滞后的问题。

如果你用 brew 或 winget 安装的，记得定期升级：

```Bash
brew upgrade claude-code
# 或
winget upgrade Anthropic.ClaudeCode
```

升完之后跑一遍 `/help`，对比一下有没有新命令出现，是快速感知版本变化的好习惯

#### 和文档的关系

`/help` 给的是命令的**骨架**——名称和一句话描述。如果需要某个命令的完整参数说明和使用示例，官方文档 `code.claude.com/docs` 会更详细。两者结合用：`/help` 用来快速回忆"有没有这个命令"，文档用来搞清楚"这个命令怎么用得最好"。不需要把所有命令背下来，知道去哪里找比记忆本身更重要

## **3.CLAUDE.md 入门**

### 在项目根目录创建 `CLAUDE.md` 文件

如果说 Claude Code 的对话是短期记忆，CLAUDE.md 就是长期记忆的载体。每次启动新会话，Claude 都会优先读取这个文件，把里面的内容作为整个对话的基础上下文。没有它，Claude 每次都要从零摸索你的项目；有了它，Claude 一开口就知道自己在什么样的代码库里工作。

---

#### 创建方式

在项目根目录新建一个名为 `CLAUDE.md` 的 Markdown 文件：

```Bash
touch CLAUDE.md
```

或者直接让 Claude 帮你创建：

```Plain Text
帮我在项目根目录创建一个 CLAUDE.md，先填一个基本结构
```

Claude 会根据它对当前项目的初步判断，生成一个包含常见 section 的模板，你在此基础上补充和修正，比从空文件开始省力得多。

文件创建后，建议立刻提交进 git，让整个团队共享同一份上下文配置：

```Bash
git add CLAUDE.md
git commit -m "chore: add CLAUDE.md for Claude Code context"
```

---

#### 放在哪里

CLAUDE.md 支持多层级放置，不只是根目录：

**项目根目录** `./CLAUDE.md`

全局生效，每次启动都读取，适合放整个项目的通用信息。

**子目录** `./src/recommend/CLAUDE.md`

只在 Claude 进入该目录处理相关任务时读取，适合放模块级的专项说明。比如推荐系统模块有自己特殊的算法约定，不适合塞进根目录让所有任务都背着这些信息，单独放在子目录更干净。

**用户级** `~/.claude/CLAUDE.md`

跨所有项目生效，适合放你个人的编码偏好，比如"我习惯用 Lombok，不要生成 getter/setter 模板代码"、"注释用中文"。这份配置跟着你走，不依赖具体项目。

三个层级同时存在时，Claude 会全部读取并合并，子目录的配置优先级高于根目录，根目录高于用户级。

---

#### 基本结构示例

一个适合 Spring Boot 项目的初始结构：

```Markdown
# 项目概览
这是一个游戏账号交易平台的后端服务，基于 Spring Boot 3.x + MyBatis Plus + Redis。
主要模块：用户系统、账号交易、推荐系统、消息通知。

## 技术栈
- Java 17
- Spring Boot 3.2
- MyBatis Plus 3.5（禁止使用原生 JDBC 和手写 XML）
- Redis 7（缓存层，TTL 统一在 CacheConfig 中管理）
- MySQL 8

## 目录结构
- `user-service/`：用户模块
- `trade-service/`：交易模块
- `recommend-core/`：推荐算法核心
- `common/`：公共工具类和基础配置

## 编码规范
- 所有 Service 层方法必须有事务注解或明确标注不需要事务的原因
- 返回值统一用 `Result<T>` 包装
- 异常统一抛出 `BizException`，由全局处理器捕获
- 不允许在 Controller 层写业务逻辑

## 禁止行为
- 不要使用 `System.out.println`，统一用 Lombok `@Slf4j`
- 不要硬编码任何配置值，全部走 `application.yml`
- 不要生成没有对应测试的新 Service 方法
```

---

#### 什么内容值得写进去

判断标准只有一个：**如果不写，Claude 可能会做错或做偏的事情**，就值得写。

- 项目背景和模块划分

让 Claude 知道自己在一个什么规模、什么性质的系统里工作，避免它给一个高并发交易系统生成玩具级别的实现。

- 技术选型和禁用项

"用 MyBatis Plus，不要 JPA"、"Redis 客户端用 Redisson，不要 Lettuce"，这类约束如果不写，Claude 会按它认为合理的方式选，而那不一定是你项目里已有的依赖。

- 命名和结构约定

"DTO 后缀用 `Req`/`Resp`，不用 `DTO`"、"接口实现类命名为 `XxxServiceImpl`"，这些细节影响生成代码能否直接融入现有风格。

- 常用的工具类和基础设施

告诉 Claude 项目里已经有 `PageUtils`、`RedisHelper`、`BizException` 这些东西，它就会复用而不是重新造一遍。

---

#### 它不是写一次就完事的文件

CLAUDE.md 应该随项目一起演进。每次发现 Claude 生成了不符合预期的代码，问自己一个问题：**这个预期有没有在 CLAUDE.md 里写清楚？** 如果没有，补进去。几轮迭代下来，这个文件会越来越准确地反映项目的真实约束，Claude 的输出质量也会随之稳定提升。

把维护 CLAUDE.md 当作项目文档工作的一部分，而不是可选的附加项。它的受益者不只是 Claude，新加入项目的人读一遍也能快速建立对项目约定的基本认知。

### 在其中描述项目架构和技术栈

写进 CLAUDE.md 的架构和技术栈描述，本质上是在给 Claude 建立一个**决策前提**。它读到"Redis 客户端用 Redisson"，之后所有涉及缓存的代码都会用 Redisson 的 API；它读到"这是一个高并发交易系统"，对性能和一致性的考量权重就会自动提高。描述越准确，Claude 做出的技术判断越贴近你项目的实际情况。

#### 架构描述：说清楚系统的形状

架构描述要让 Claude 理解系统的整体轮廓——不是要写一份设计文档，而是要在最短的篇幅里交代清楚几件事：这个系统是什么、由哪些部分组成、各部分之间怎么协作。

**单体应用**的描述相对简单，重点是模块划分：

```Markdown
## 系统架构

单体 Spring Boot 应用，按业务域分包：

- `user`：用户注册、登录、实名认证
- `trade`：账号发布、购买、担保交易流程
- `recommend`：基于用户行为的账号推荐
- `notify`：站内信、短信、邮件通知
- `admin`：后台管理接口，独立鉴权

各模块通过 Spring 内部调用，不走 HTTP。
跨模块依赖方向：trade → user，recommend → trade + user，notify 被其他模块调用。
```

最后两行很关键——模块间的调用方向告诉 Claude 依赖关系的边界，避免它生成出循环依赖或方向错误的代码。

**微服务架构**需要额外说明服务间通信方式：

```Markdown
## 系统架构

微服务架构，服务间通过 OpenFeign 同步调用，
异步场景走 RocketMQ，topic 命名规范见下方。

服务清单：
- `user-service`（端口 8081）：用户域
- `trade-service`（端口 8082）：交易域，依赖 user-service
- `recommend-service`（端口 8083）：推荐域，只读，不发起写操作
- `gateway`（端口 8080）：统一入口，负责鉴权和路由

当前仓库是 `trade-service`，其他服务通过 Feign 接口调用。
```

最后一行"当前仓库是哪个服务"非常重要。Claude 需要知道自己工作的边界在哪里，不然在微服务项目里它可能会生成跨服务的直接调用，而不是通过 Feign。

#### 技术栈描述：不只是列清单

很多人写技术栈只是列一堆名字：Spring Boot、MyBatis、Redis、MySQL。这种写法对 Claude 帮助有限——它不知道你用了哪个版本、有哪些使用约定、哪些同类技术是被排除的。

有效的技术栈描述要包含三层信息：**用了什么、版本是什么、怎么用**。

```Markdown
## 技术栈

**框架**
- Spring Boot 3.2.x（Java 17）
- Spring Security 6，JWT 鉴权，token 存 Redis，有效期 7 天
- Spring Validation，参数校验注解统一用 jakarta.validation

**数据层**
- MySQL 8.0，InnoDB，字符集 utf8mb4
- MyBatis Plus 3.5.x，禁止手写 XML，禁止原生 JDBC
- 分页统一用 MyBatis Plus 的 Page 对象，不用 PageHelper

**缓存**
- Redis 7，客户端用 Redisson 3.x（不用 Lettuce，不用 Jedis）
- 缓存 key 命名格式：`{业务域}:{对象类型}:{id}`，如 `trade:account:12345`
- TTL 统一在 `CacheConstants` 中定义，禁止在业务代码里硬编码过期时间

**消息队列**
- RocketMQ 5.x，topic 命名格式：`{ENV}_{业务域}_{动作}`
- 消费者必须实现幂等，幂等 key 存 Redis，TTL 25 小时

**其他**
- Lombok（全量使用，禁止手写 getter/setter/toString）
- MapStruct 做对象转换（禁止用 BeanUtils.copyProperties）
- Knife4j 做接口文档
```

"禁止用 BeanUtils.copyProperties"这类负向约束尤其值得写。Claude 在做对象转换时会自然地倾向于用 BeanUtils，因为这是 Spring 生态里最常见的写法。写明禁止，它才会转而用 MapStruct。

#### 数据库结构：选择性描述核心表

不需要把所有表都写进去，只写 Claude 在处理任务时最可能涉及的核心表，以及那些有特殊设计的地方：

```Markdown
## 核心数据模型

**账号表 `game_account`**
- `status`：0 待审核 / 1 上架 / 2 已售 / 3 下架，用枚举 `AccountStatus`
- `seller_id`：关联 `user` 表，逻辑外键（不建物理外键）
- 软删除：用 MyBatis Plus 的 `@TableLogic`，字段名 `deleted`

**交易表 `trade_order`**
- 状态机：待付款 → 已付款 → 担保中 → 已完成 / 已取消 / 已退款
- 状态流转只能通过 `TradeStateMachine` 触发，禁止直接 update status

**用户行为表 `user_behavior`**
- 写多读少，是推荐系统的数据源
- 不做联表查询，推荐模块通过 userId 批量查取后在内存处理
```

"状态流转只能通过 TradeStateMachine 触发"这类约束，如果不写明，Claude 在修复某个 bug 时可能直接生成一个 `update trade_order set status = 3 where id = ?`，绕过整个状态机，在生产环境会引发严重问题。

#### 外部依赖和第三方服务

```Markdown
## 外部依赖

- **支付**：微信支付 v3，封装在 `PaymentService`，不直接调用 SDK
- **短信**：阿里云 SMS，封装在 `SmsService`，模板 ID 在配置文件里
- **对象存储**：阿里云 OSS，图片上传统一走 `OssService.uploadImage()`
- **风控**：内部风控服务，通过 Feign 调用，超时 500ms，失败降级放行
```

告诉 Claude 外部服务已经有封装层，它在生成代码时就会调用封装好的 Service，而不是直接操作 SDK——这样生成的代码才能真正融入项目，而不是需要你大幅改造。

#### 保持准确，不要过度理想化

一个常见的错误是把 CLAUDE.md 写成项目"应该是什么样"，而不是"实际是什么样"。如果你的项目历史代码里混用了 BeanUtils 和 MapStruct，就如实写"新代码用 MapStruct，存量代码有 BeanUtils，不要修改存量代码"，而不是假装全部统一了。

Claude 读到准确的描述，才能做出正确的判断。理想化的描述只会让它生成与实际代码库风格割裂的东西，反而增加你的审查成本。

### 定义编码规范、命名约定与禁止行为

这一节是 CLAUDE.md 里投入产出比最高的部分。架构描述告诉 Claude 系统长什么样，而编码规范告诉它**每一行代码该怎么写**。规范定义得越清晰，Claude 生成的代码越能直接融入项目，而不是需要你反复纠正同样的问题。

#### 为什么这部分特别重要

Claude 有自己的"默认风格"——它会根据训练数据里最常见的写法做选择。对于 Spring Boot 项目，它倾向于用 `BeanUtils.copyProperties` 做对象转换、用 `@Autowired` 注解注入、用 `e.printStackTrace()` 处理异常。这些写法不一定错，但可能和你项目的既有风格不一致。

不写规范，你就在用自己的审查时间弥补 Claude 的默认选择和项目标准之间的差距。把规范写清楚，这个差距大幅收窄，审查变成确认而不是纠错。

#### 命名约定

命名是最容易出现风格漂移的地方，也是最容易用文字说清楚的地方：

```Markdown
## 命名约定

**类命名**
- Controller：`XxxController`，只做参数校验和结果封装
- Service 接口：`XxxService`
- Service 实现：`XxxServiceImpl`
- MyBatis Plus Mapper：`XxxMapper`
- 数据传输对象：请求用 `XxxReq`，响应用 `XxxResp`（不用 DTO/VO/Form）
- 实体类：与表名对应，驼峰命名，如 `GameAccount`、`TradeOrder`
- 枚举类：`XxxEnum`，枚举值全大写加下划线

**方法命名**
- 查询单个：`getXxxById`、`findXxxByYyy`
- 查询列表：`listXxx`、`listXxxByYyy`
- 查询分页：`pageXxx`
- 新增：`saveXxx`
- 修改：`updateXxx`
- 删除：`removeXxx`（软删除）/ `deleteXxx`（物理删除，需注释说明原因）
- 布尔返回：`isXxx`、`hasXxx`、`checkXxx`

**变量和字段**
- 常量：全大写加下划线，定义在对应的 `XxxConstants` 类里
- 布尔字段：`isXxx` 或直接用形容词如 `deleted`、`enabled`
- 集合类型：用复数或加 `List`/`Map` 后缀，如 `accountList`、`userMap`

**包命名**
- 按业务域分包：`com.xxx.trade`、`com.xxx.recommend`
- 不按技术层分包（禁止 `com.xxx.controller`、`com.xxx.service` 这种平铺结构）
```

命名约定里"不用 DTO/VO/Form"这类排除性说明很关键。Claude 在没有约束时会自由选择后缀，项目里就会出现 `UserDTO`、`AccountVO`、`TradeReq` 混用的局面。

#### 编码规范

```Markdown
## 编码规范

**依赖注入**
- 统一用构造器注入，禁止 `@Autowired` 字段注入
- 配合 Lombok `@RequiredArgsConstructor` 使用，不手写构造器

**异常处理**
- 业务异常统一抛出 `BizException(ErrorCode)`，不允许抛出原始异常给上层
- 禁止 `e.printStackTrace()`，统一用 `log.error("描述", e)`
- 禁止 catch 后吞掉异常（空 catch 块）
- 全局异常由 `GlobalExceptionHandler` 统一处理，Controller 不做 try-catch

**返回值**
- 所有 Controller 方法返回 `Result<T>`
- 分页结果返回 `Result<PageResp<T>>`
- 操作类接口（新增、修改、删除）返回 `Result<Void>`

**日志**
- 用 Lombok `@Slf4j`，禁止 `System.out.println`
- 方法入参在 DEBUG 级别打印，不在 INFO 打印（避免日志爆量）
- 关键业务节点（下单、支付、状态变更）必须打 INFO 日志，包含业务 ID
- 禁止在循环内打 INFO 日志

**事务**
- Service 实现类的写操作方法必须加 `@Transactional`，或注释说明为何不需要
- 查询方法加 `@Transactional(readOnly = true)`
- 禁止在 Controller 层加事务注解
- 事务方法内禁止调用外部 HTTP 接口（避免长事务）

**注释**
- 公共 Service 方法必须有 Javadoc，说明用途、参数含义、返回值
- 复杂业务逻辑必须有行内注释，解释"为什么"而不是"做了什么"
- 禁止无意义注释如 `// 获取用户` 对应 `getUser()`
```

事务那一节里"禁止在事务方法内调用外部 HTTP 接口"这类约束，靠 code review 很难100%发现，但写进 CLAUDE.md 后 Claude 在生成代码时会主动规避，把这类风险消灭在生成阶段。

#### 禁止行为

禁止行为单独列一节，和规范分开，原因是**心理权重不同**。规范是"应该这样做"，禁止是"绝对不能这样做"。分开写，Claude 处理时的优先级也会相应提高。

```Markdown
## 禁止行为

以下行为在任何情况下都不允许出现，即使有注释说明也不行：

**数据层**
- 禁止在业务代码里写裸 SQL 字符串
- 禁止绕过 MyBatis Plus 直接操作 JdbcTemplate
- 禁止对核心交易表做物理删除，统一软删除
- 禁止在循环内执行数据库查询（N+1 问题）
- 禁止 `select *`，必须明确指定查询字段

**缓存**
- 禁止在业务代码里硬编码 Redis key 字符串，必须引用 `CacheConstants`
- 禁止缓存不设 TTL
- 禁止缓存整个列表对象超过 1000 条

**并发**
- 禁止用 `new Thread()` 直接创建线程，统一走线程池
- 禁止用 `@Async` 而不指定线程池名称
- 涉及共享状态的操作禁止在没有锁保护的情况下修改

**状态流转**
- 禁止直接 update `trade_order.status`，必须通过 `TradeStateMachine`
- 禁止直接 update `game_account.status`，必须通过 `AccountStatusService`

**安全**
- 禁止在日志里打印用户密码、手机号完整信息（脱敏后才能打印）
- 禁止在代码里硬编码任何密钥、token、密码
- 禁止接口直接返回数据库实体，必须转换为 Resp 对象
```

"禁止接口直接返回数据库实体"这条很典型——Claude 在快速生成 CRUD 接口时经常直接 return 实体对象，省掉转换步骤。这在演示代码里无所谓，但在生产代码里会把数据库字段结构、软删除标记、内部状态码全部暴露给前端。写明禁止，Claude 会自动加上转换逻辑。

#### 写法上的几个建议

**用"禁止"而不是"尽量避免"**。模糊的表达给了 Claude 解释空间，遇到它认为"情有可原"的场景就会绕过去。明确的禁止没有余地。

**给禁止行为加上原因**。不只写"禁止在循环内查数据库"，加上"（N+1 问题，性能风险）"。Claude 理解了原因，在遇到类似但形式不同的情况时也能举一反三，而不是只认识这一种具体写法。

**定期从 code review 里更新这份清单**。每次你在 review 里纠正了 Claude 生成的问题，问一下自己：这个问题有没有在 CLAUDE.md 里写清楚？没有就补进去。这份清单的价值随着项目推进会越来越高，因为它积累的是真实踩过的坑，而不是凭空想象的规范。

### 添加常见任务的示例与模板

规范和约定告诉 Claude "不能做什么"和"应该怎么做"，而示例和模板告诉它"做出来应该长什么样"。两者缺一不可——光有规范，Claude 还需要自行推断具体的代码形态；有了示例，它可以直接对照着生成，风格一致性大幅提升。

#### 示例的作用机制

Claude 在生成代码时会参考上下文里已有的代码风格。如果它能在 CLAUDE.md 里看到一个完整的、符合项目规范的示例，后续生成同类代码时就会以这个示例为基准，而不是凭自己的默认风格发挥。

这个机制在 prompt engineering 里叫 few-shot——给几个例子，比给一堆抽象规则更有效。放进 CLAUDE.md 的示例，本质上就是在做 few-shot 引导。

#### 标准 Controller 模板

````Markdown
## 示例：标准 Controller

```java
@RestController
@RequestMapping("/api/v1/accounts")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "账号管理")
public class GameAccountController {

    private final GameAccountService gameAccountService;

    @GetMapping("/{id}")
    @Operation(summary = "查询账号详情")
    public Result<GameAccountResp> getById(@PathVariable Long id) {
        return Result.ok(gameAccountService.getAccountById(id));
    }

    @GetMapping
    @Operation(summary = "分页查询账号列表")
    public Result<PageResp<GameAccountResp>> page(@Valid GameAccountPageReq req) {
        return Result.ok(gameAccountService.pageAccounts(req));
    }

    @PostMapping
    @Operation(summary = "发布账号")
    public Result<Void> save(@RequestBody @Valid GameAccountSaveReq req) {
        gameAccountService.saveAccount(req);
        return Result.ok();
    }

    @PutMapping("/{id}")
    @Operation(summary = "修改账号信息")
    public Result<Void> update(@PathVariable Long id,
                               @RequestBody @Valid GameAccountUpdateReq req) {
        gameAccountService.updateAccount(id, req);
        return Result.ok();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "下架账号")
    public Result<Void> remove(@PathVariable Long id) {
        gameAccountService.removeAccount(id);
        return Result.ok();
    }
}
```

注意事项：
- Controller 只做参数接收和结果封装，无任何业务逻辑
- 所有方法返回 `Result<T>`
- 路径变量用 Long 类型，不用 String
- 查询参数用 `@Valid` 校验，请求体用 `@RequestBody @Valid`
````

#### 标准 Service 模板

````Markdown
## 示例：标准 Service

接口：
```java
public interface GameAccountService {
    GameAccountResp getAccountById(Long id);
    PageResp<GameAccountResp> pageAccounts(GameAccountPageReq req);
    void saveAccount(GameAccountSaveReq req);
    void updateAccount(Long id, GameAccountUpdateReq req);
    void removeAccount(Long id);
}
```

实现：
```java
@Service
@RequiredArgsConstructor
@Slf4j
public class GameAccountServiceImpl implements GameAccountService {

    private final GameAccountMapper gameAccountMapper;
    private final GameAccountConverter converter;

    @Override
    @Transactional(readOnly = true)
    public GameAccountResp getAccountById(Long id) {
        GameAccount account = gameAccountMapper.selectById(id);
        if (account == null) {
            throw new BizException(ErrorCode.ACCOUNT_NOT_FOUND);
        }
        return converter.toResp(account);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResp<GameAccountResp> pageAccounts(GameAccountPageReq req) {
        Page<GameAccount> page = gameAccountMapper.selectPage(
            new Page<>(req.getPageNum(), req.getPageSize()),
            buildQueryWrapper(req)
        );
        return PageResp.of(page, converter::toResp);
    }

    @Override
    @Transactional
    public void saveAccount(GameAccountSaveReq req) {
        GameAccount account = converter.toEntity(req);
        account.setSellerId(SecurityUtils.getCurrentUserId());
        account.setStatus(AccountStatus.PENDING);
        gameAccountMapper.insert(account);
        log.info("账号发布成功, accountId={}, sellerId={}", 
                 account.getId(), account.getSellerId());
    }

    private LambdaQueryWrapper<GameAccount> buildQueryWrapper(GameAccountPageReq req) {
        return new LambdaQueryWrapper<GameAccount>()
            .eq(req.getGameType() != null, GameAccount::getGameType, req.getGameType())
            .ge(req.getMinPrice() != null, GameAccount::getPrice, req.getMinPrice())
            .le(req.getMaxPrice() != null, GameAccount::getPrice, req.getMaxPrice())
            .eq(GameAccount::getStatus, AccountStatus.ON_SALE)
            .orderByDesc(GameAccount::getCreateTime);
    }
}
```

注意事项：
- 查询方法加 `@Transactional(readOnly = true)`
- 写操作方法加 `@Transactional`
- 实体转换统一用 MapStruct converter，不用 BeanUtils
- 关键写操作必须打 INFO 日志，包含业务 ID
- 条件查询用 LambdaQueryWrapper，不写字段名字符串
````

#### 常见任务模板

除了完整的类示例，还可以针对高频的局部任务提供片段模板：

````Markdown
## 模板：缓存读写

标准的"先读缓存，缓存未命中读库再写回"模式：

```java
public GameAccountResp getAccountWithCache(Long id) {
    String key = CacheConstants.ACCOUNT_DETAIL + id;
    
    GameAccountResp cached = redissonClient.getBucket(key).get();
    if (cached != null) {
        return cached;
    }
    
    GameAccount account = gameAccountMapper.selectById(id);
    if (account == null) {
        throw new BizException(ErrorCode.ACCOUNT_NOT_FOUND);
    }
    
    GameAccountResp resp = converter.toResp(account);
    redissonClient.getBucket(key)
                  .set(resp, CacheConstants.ACCOUNT_DETAIL_TTL, TimeUnit.SECONDS);
    return resp;
}
```

注意：
- key 从 `CacheConstants` 取，不硬编码字符串
- TTL 从 `CacheConstants` 取，不硬编码数字
- 返回 Resp 对象而不是实体，避免缓存实体导致的序列化问题
````

````Markdown
## 模板：分布式锁

```java
public void processOrder(Long orderId) {
    String lockKey = CacheConstants.ORDER_LOCK + orderId;
    RLock lock = redissonClient.getLock(lockKey);
    
    boolean acquired = false;
    try {
        acquired = lock.tryLock(3, 10, TimeUnit.SECONDS);
        if (!acquired) {
            throw new BizException(ErrorCode.ORDER_PROCESSING);
        }
        // 业务逻辑
        doProcessOrder(orderId);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        throw new BizException(ErrorCode.SYSTEM_ERROR);
    } finally {
        if (acquired && lock.isHeldByCurrentThread()) {
            lock.unlock();
        }
    }
}
```

注意：
- finally 里必须判断 `isHeldByCurrentThread()`，避免解锁他人持有的锁
- waitTime 3 秒，leaseTime 10 秒，根据业务调整
- InterruptedException 必须恢复中断状态
````

````Markdown
## 模板：MQ 消息发送与消费

发送：
```java
@Component
@RequiredArgsConstructor
@Slf4j
public class TradeEventPublisher {

    private final RocketMQTemplate rocketMQTemplate;

    public void publishOrderPaid(Long orderId) {
        OrderPaidEvent event = new OrderPaidEvent(orderId, LocalDateTime.now());
        String topic = MqConstants.TRADE_ORDER_PAID;
        
        rocketMQTemplate.syncSend(topic, event);
        log.info("订单支付事件发送成功, orderId={}", orderId);
    }
}
```

消费：
```java
@Component
@RocketMQMessageListener(
    topic = MqConstants.TRADE_ORDER_PAID,
    consumerGroup = "recommend-service-order-paid"
)
@RequiredArgsConstructor
@Slf4j
public class OrderPaidEventListener implements RocketMQListener<OrderPaidEvent> {

    private final RedissonClient redissonClient;
    private final UserBehaviorService userBehaviorService;

    @Override
    public void onMessage(OrderPaidEvent event) {
        // 幂等检查
        String idempotentKey = CacheConstants.MQ_IDEMPOTENT 
                               + "order_paid:" + event.getOrderId();
        Boolean isFirst = redissonClient.getBucket(idempotentKey)
                                        .setIfAbsent(1, 25, TimeUnit.HOURS);
        if (!Boolean.TRUE.equals(isFirst)) {
            log.warn("重复消息，跳过处理, orderId={}", event.getOrderId());
            return;
        }
        
        userBehaviorService.recordPurchase(event.getOrderId());
        log.info("订单支付事件处理完成, orderId={}", event.getOrderId());
    }
}
```

注意：
- 消费者必须做幂等检查，幂等 key TTL 设 25 小时
- consumerGroup 命名格式：`{服务名}-{topic含义}`
- 重复消息打 warn 日志后直接 return，不抛异常
````

#### 错误码模板

````Markdown
## 模板：新增错误码

在 `ErrorCode` 枚举里按业务域分组添加：

```java
// 账号相关 1001xx
ACCOUNT_NOT_FOUND(100101, "账号不存在"),
ACCOUNT_ALREADY_SOLD(100102, "账号已售出"),
ACCOUNT_STATUS_INVALID(100103, "账号状态不允许此操作"),

// 交易相关 1002xx  
ORDER_NOT_FOUND(100201, "订单不存在"),
ORDER_PROCESSING(100202, "订单正在处理中，请勿重复操作"),
ORDER_STATUS_INVALID(100203, "订单状态不允许此操作"),
```

错误码规则：
- 6位数字，前4位是业务域编号，后2位是序号
- 同一业务域的错误码连续编排
- 描述用用户可读的语言，不暴露技术细节
````

#### 示例的粒度把握

示例不是越多越好，关键在于覆盖**高频且容易出错**的场景。一般来说，以下几类值得写示例：

项目里有特殊封装的基础设施用法——比如你封装了自己的 `Result`、`PageResp`、`BizException`，这些不是通用写法，Claude 不知道你的封装长什么样，必须给示例。

有多种实现方式但项目只允许一种的场景——对象转换、缓存操作、异步任务，这类场景 Claude 会自由选择，示例明确了唯一合法的写法。

有严格顺序或结构要求的模式——分布式锁、幂等消费、状态机调用，顺序错了会出 bug，示例比文字描述更直观。

纯粹的 CRUD 接口不需要示例，Claude 生成这类代码已经很稳定。把示例预算留给真正需要对齐的地方。

### 学习模块化组织 CLAUDE.md 内容的方式

随着项目推进，CLAUDE.md 很容易变成一个越来越长的单文件——规范、架构、示例、禁止行为全部堆在一起，滚动到几百行还没看完。这不只是阅读体验的问题，更影响 Claude 的实际效果：一个臃肿的单文件会稀释每个部分的权重，Claude 在处理具体任务时需要从大量无关内容里筛选有用信息，准确性和效率都会下降。

模块化组织的核心思路是：**把正确的信息，在正确的时机，送到 Claude 的上下文里**。

#### 单文件的问题在哪里

一个典型的失控过程：项目初期 CLAUDE.md 只有 50 行，写了基本的技术栈和几条规范。随着踩坑增多，不断往里追加内容——推荐系统的算法约定、交易模块的状态机规则、MQ 的幂等模板、各种禁止行为……三个月后文件长到 800 行。

这时候出现两个问题。第一，Claude 每次启动都要把这 800 行全部加载进上下文，挤占了本可以用来放代码和对话的空间。第二，当你在处理一个简单的用户查询接口时，推荐系统的协同过滤算法约定和 MQ 幂等消费模板对这个任务毫无意义，但它们还是占据着上下文窗口。

模块化解决的正是这个问题。

#### 基本目录结构

Claude Code 支持在项目的任意子目录放置 CLAUDE.md，进入该目录时自动读取。利用这个机制，可以建立一套清晰的层级：

```Plain Text
项目根目录/
├── CLAUDE.md                    # 全局：项目概览、通用规范
├── .claude/
│   ├── architecture.md          # 架构详细说明（按需 @ 引用）
│   ├── conventions.md           # 完整编码规范（按需 @ 引用）
│   └── commands/                # 自定义 slash 命令
│       ├── new-api.md
│       ├── add-service.md
│       └── write-test.md
├── src/
│   ├── recommend/
│   │   └── CLAUDE.md            # 推荐模块专属上下文
│   ├── trade/
│   │   └── CLAUDE.md            # 交易模块专属上下文
│   └── user/
│       └── CLAUDE.md            # 用户模块专属上下文
└── docs/
    ├── api-template.md          # API 接口模板
    ├── error-codes.md           # 错误码清单
    └── db-schema.md             # 核心表结构说明
```

#### 根目录 CLAUDE.md：只放全局必读内容

根目录的 CLAUDE.md 是每次会话必然加载的，所以要严格控制体积。原则是：**只放所有任务都需要的信息，模块专属的内容一律下沉**。

```Markdown
# 项目概览

游戏账号交易平台后端，Spring Boot 3.2 + MyBatis Plus + Redis + RocketMQ。
核心模块：用户、交易、推荐、通知。详细架构见 @.claude/architecture.md。

## 必须遵守的全局规范

- 返回值统一用 `Result<T>` 封装
- 业务异常统一抛 `BizException(ErrorCode)`
- 禁止 `System.out.println`，统一 `@Slf4j`
- 禁止硬编码配置值，全部走 `application.yml`
- 对象转换用 MapStruct，禁止 `BeanUtils.copyProperties`

完整编码规范见 @.claude/conventions.md，处理复杂任务前请先读取。

## 模块入口

- 推荐系统相关任务：先读 src/recommend/CLAUDE.md
- 交易流程相关任务：先读 src/trade/CLAUDE.md
- 用户系统相关任务：先读 src/user/CLAUDE.md
```

注意最后的"模块入口"一节——这是在主动引导 Claude 知道去哪里找更多上下文，而不是让它自行探索。

#### 子模块 CLAUDE.md：放模块专属的深度信息

以推荐模块为例，`src/recommend/CLAUDE.md` 可以放所有只有在处理推荐任务时才需要的信息：

```Markdown
# 推荐模块

## 模块职责
负责为用户生成个性化的账号推荐列表。只读模块，不发起任何写操作。

## 核心类
- `RecommendService`：对外唯一入口，其他模块只调这一个接口
- `CollaborativeFilterStrategy`：协同过滤，主策略
- `BrowseHistoryStrategy`：基于浏览历史，冷启动补充
- `PopularityStrategy`：热门兜底，新用户或历史不足时使用
- `StrategyRouter`：根据用户画像决定策略组合和权重

## 数据流
用户请求 → StrategyRouter 选策略 → 各 Strategy 并行计算
→ ScoreAggregator 合并分数 → FilterChain 过滤 → 排序返回

## 关键约定
- 所有 Strategy 实现必须是无状态的，不持有实例变量
- 推荐结果必须经过 FilterChain，不允许绕过直接返回
- 用户行为数据从 `UserBehaviorService` 读取，禁止直接查 `user_behavior` 表
- 并行计算用项目内的 `RecommendThreadPool`，不新建线程池
- 结果缓存 TTL：个性化结果 5 分钟，热门结果 30 分钟

## 当前已知问题
- 新用户冷启动效果较差，正在迭代 BrowseHistoryStrategy
- 协同过滤在用户量 < 1000 时效果不稳定，暂时降权处理
```

最后的"当前已知问题"这一节值得特别注意。把正在进行中的技术债和已知缺陷写进来，Claude 在修改相关代码时就不会把这些当成正常设计去强化，而是会在生成代码时绕开或改善这些问题。

#### .claude/commands：自定义命令的模块化

自定义 slash 命令是模块化里最被低估的部分。把高频的、有固定结构的任务封装成命令，比每次用自然语言描述高效得多，也更一致。

`.claude/commands/new-api.md`：

```Markdown
# 新建 API 接口

根据用户描述，在指定模块创建完整的 API 接口，包含：

1. Controller 方法（参照 @docs/api-template.md 的标准结构）
2. Service 接口方法声明
3. ServiceImpl 实现（含事务注解和日志）
4. Req / Resp 对象（含参数校验注解）
5. MapStruct converter 方法
6. 对应的单元测试

执行前先确认：
- 接口归属哪个模块？
- 是查询还是写操作？
- 需要缓存吗？
- 需要幂等控制吗？
```

使用时直接输入 `/new-api`，Claude 会按照这个流程引导你确认信息，然后生成完整的一套代码，而不是只生成一个 Controller 方法让你自己补全其余部分。

`.claude/commands/add-service.md`、`.claude/commands/write-test.md` 同理，把你项目里最高频的任务逐一封装进来。这套命令库随仓库提交，整个团队共享，新人第一天就能用标准化的方式工作。

#### @ 引用：按需加载的主动控制

模块化目录结构解决了自动加载的问题，而 `@` 引用解决了主动按需加载的问题。对于那些不适合自动加载、但在特定任务里很重要的文档，用 `@` 在对话里显式引入：

```Plain Text
@docs/db-schema.md 帮我写一个查询，统计每个游戏类型下已售出账号的数量和平均价格
```

```Plain Text
@.claude/conventions.md @src/trade/CLAUDE.md 
帮我 review 这个 PR，检查是否符合项目规范
```

这种方式让你对"Claude 此刻能看到什么"有完全的掌控，而不是依赖自动加载猜测它是否读到了正确的上下文。

#### 用户级 CLAUDE.md：跨项目的个人配置

除了项目级的模块化，还有一层往往被忽视——用户级配置，放在 `~/.claude/CLAUDE.md`：

```Markdown
# 个人偏好（跨所有项目生效）

## 语言
- 代码注释用中文
- 对话回复用中文
- 变量名和方法名用英文

## 代码风格
- 喜欢函数式写法，能用 Stream 就不用 for 循环
- 不喜欢过度抽象，优先可读性而不是扩展性
- 测试用 given-when-then 结构组织

## 工作方式
- 解释方案时先说结论，再说原因
- 生成代码前先确认思路，不要直接动手
- 遇到多种实现方案时，列出选项让我选，不要自行决定
```

这份配置跟着你走，任何项目都会遵守，不需要在每个 CLAUDE.md 里重复写个人偏好。

#### 一个判断内容放哪里的简单原则

每次要往 CLAUDE.md 加内容时，问自己三个问题：

- **所有任务都需要吗？** 

是→放根目录 CLAUDE.md。否→继续问。

- **只有某个模块的任务需要吗？**

 是→放对应模块的 CLAUDE.md。否→继续问。

- **只有特定类型的任务需要吗？** 

是→放 docs/ 下的专项文档，用 @ 按需引入；或者封装成自定义命令。

三个问题走下来，内容自然落到正确的位置，既不会让根目录 CLAUDE.md 无限膨胀，也不会让重要信息因为藏得太深而被遗漏。

## **4.内置命令与效率操作**

### 掌握 `@` 文件引用，精准指定上下文

`@` 引用是 Claude Code 里最被低估的功能之一。很多人用了很久都只是在自然语言里描述"看一下 UserService 那个文件"，而不是直接用 `@` 指定——这两种方式的效果差距比想象中大得多。前者是在请求 Claude 去找，后者是直接把内容送到它眼前。

#### 基本语法

在对话里任意位置输入 `@`，会触发文件路径补全，可以用 Tab 键选择：

```Plain Text
@src/service/GameAccountServiceImpl.java 这个 saveAccount 方法有线程安全问题，帮我分析
```

```Plain Text
@pom.xml 检查一下依赖版本，有没有已知的安全漏洞
```

```Plain Text
@src/recommend/ 读取这个目录下所有文件，梳理一下推荐模块的整体调用链
```

最后一个例子指向目录而不是单个文件——Claude 会读取该目录下的所有文件，适合需要理解模块全貌的任务。但要注意目录体积，文件过多会消耗大量上下文。

---

#### 同时引用多个文件

`@` 引用可以在一条消息里叠加使用，这是它最有价值的场景之一：

```Plain Text
@src/service/TradeOrderServiceImpl.java
@src/statemachine/TradeStateMachine.java
@src/event/OrderPaidEventListener.java

帮我梳理一下订单支付完成后的完整处理链路，从状态变更到事件消费
```

Claude 同时看到三个文件，能在它们之间建立关联，给出的分析会比"你先读 A，再读 B，再读 C"的串行方式准确得多。

多文件引用在 code review 场景里尤其有用：

```Plain Text
@src/controller/GameAccountController.java
@src/service/impl/GameAccountServiceImpl.java
@src/mapper/GameAccountMapper.java

review 这三个文件，检查是否符合项目规范，特别关注事务边界和异常处理
```

#### 引用文档和配置文件

`@` 不只能引用 Java 文件，任何文本文件都可以：

```Plain Text
@docs/db-schema.md 根据这个表结构，帮我写一个查询各游戏类型月销售额的 SQL
```

```Plain Text
@application-prod.yml 检查生产环境配置，线程池和连接池的参数是否合理
```

```Plain Text
@.github/pull_request_template.md
@CLAUDE.md
帮我根据这次的改动填写 PR 描述
```

引用配置文件让 Claude 能看到真实的参数值，而不是靠猜或靠你口头描述——这对排查配置相关问题非常有效。

#### 引用 CLAUDE.md 子文档

结合上一节的模块化组织，`@` 可以用来按需加载那些平时不自动读取的深度文档：

```Plain Text
@.claude/conventions.md
@src/trade/CLAUDE.md
帮我新建一个退款申请的 Service 方法，严格遵守项目规范
```

```Plain Text
@docs/error-codes.md 我需要新增几个退款相关的错误码，下一个可用的编号是多少
```

这种用法把模块化组织和按需加载结合起来——平时不占用上下文，需要时一行 `@` 精准引入。

#### 引用 git 历史和差异

`@` 还支持一些特殊的引用目标：

```Plain Text
@git:HEAD~3..HEAD 分析最近三次提交的改动，总结一下这几天主要做了什么
```

```Plain Text
@git:main..feat/recommend 对比这个分支和 main 的差异，帮我写 PR 描述
```

这在写 release notes 或者 PR 描述时非常实用——Claude 直接读 diff，生成的描述基于真实改动，而不是你的口头转述。

#### 引用的时机判断

不是所有情况都需要 `@` 引用，判断标准很简单：

**应该用 `@` 的情况**——任务涉及特定文件的具体实现细节；需要 Claude 在多个文件之间建立关联；文件路径不在 Claude 的自动探索路径上；需要引用文档、配置、模板等非代码文件。

**不需要 `@` 的情况**——任务描述足够清晰，Claude 能通过文件名自然找到；只是在讨论概念或方案，还没到动具体代码的阶段；已经在当前对话里讨论过这个文件，它还在上下文窗口里。

一个实用的判断习惯：如果你发现自己在用语言描述"那个 xxx 文件里的 yyy 方法"，就应该改成直接 `@` 引用，而不是让 Claude 去猜你说的是哪个文件。

#### 和 CLAUDE.md 配合使用

`@` 引用和 CLAUDE.md 是互补的。CLAUDE.md 处理"每次都需要的上下文"，`@` 引用处理"这次任务特别需要的上下文"。两者结合，能在不让 CLAUDE.md 无限膨胀的前提下，保证 Claude 在每个具体任务里都有足够精准的信息。

一个实际的工作节奏是：用 CLAUDE.md 建立项目的基础认知，用 `@` 在每次对话开始时精准注入当前任务所需的具体上下文。这样 Claude 既有全局观，又有任务级别的聚焦，生成代码的准确性和风格一致性都会明显更好。

### 使用 `/clear` 管理对话上下文长度

`/clear` 是一个看起来简单、但用好了能显著影响工作质量的命令。它做的事情只有一件：清空当前对话的所有历史，让 Claude 从一张白纸开始。理解什么时候该用它，比知道怎么用它更重要。

#### 为什么上下文长度是个实际问题

Claude 的上下文窗口是有限的容器。随着对话进行，里面会积累：你说的话、Claude 的回复、读取过的文件内容、执行命令的输出结果。当这个容器装得越来越满，几件事会开始发生。

**早期内容被挤出。** 上下文窗口满了之后，最早进入的内容会被丢弃。如果你在对话初期读取过一个关键文件，聊了很长时间之后 Claude 可能已经"忘记"那个文件的内容，但它不会主动告诉你——它只是不再有那段内容可以参考。

**噪声干扰判断。** 长对话里往往混杂着试错的过程——你提了一个方向，Claude 生成了代码，你说不对，换个方向重来。这些废弃的中间状态依然留在上下文里，会对后续生成产生隐性干扰，Claude 可能会在新的回答里不自觉地延续已经否定过的思路。

**token 成本上升。** 每次对话都要把完整的上下文发送给模型。上下文越长，每次交互的 token 消耗越高，响应速度也会变慢。

#### 什么时候该用 `/clear`

**切换任务时。** 这是最重要的使用时机。刚完成了推荐模块的一个功能，现在要去处理交易模块的 bug——这是两个完全不同的任务，之前对话里积累的推荐模块上下文对新任务没有任何价值，反而是噪声。切换任务时清空，让新对话在干净的起点开始。

**一个任务完成后。** 每完成一个明确的功能点或 bug 修复，养成清空的习惯。就像完成一项工作后整理桌面，下一件事在整洁的环境里开始。

**对话陷入混乱时。** 有时候一个问题反复讨论，Claude 的回答开始变得前后矛盾，或者它似乎"记混了"之前说过的内容——这通常是上下文里的噪声积累到了影响判断的程度。与其继续在混乱里挣扎，不如直接清空，把真正有用的信息重新告诉它。

**上下文被大文件撑满后。** 如果刚才读取了一个几千行的文件来解决一个问题，问题解决之后这个大文件的内容还占据着大量上下文空间。如果接下来的任务不再需要它，清空比继续背着它划算。

#### 什么时候不该用 `/clear`

一个任务进行到一半时不要清空。如果你在做一个涉及多个文件修改的功能，Claude 已经读取了几个文件、理解了上下文、生成了部分代码——这时候清空意味着你要把所有背景重新交代一遍，得不偿失。

对话里有重要的中间结论时也不要直接清空。比如你们刚确定了一个技术方案的关键细节，如果立刻清空，这个结论就消失了。正确的做法是先把结论记录下来——写进 CLAUDE.md，或者保存到一个临时文件——再清空。

#### `/clear` 和 `/compact` 的区别

这两个命令经常被混淆，但它们解决的是不同的问题。

`/clear` 是**硬重置**——完全清空，什么都不保留，像关掉程序重新打开。适合任务切换、彻底换方向、或者对话已经乱到无法挽救的时候。

`/compact` 是**软压缩**——把当前对话历史压缩成一份摘要，保留关键信息但大幅减少 token 占用，然后以这份摘要为起点继续对话。适合任务还在进行中、但上下文已经很长的情况——你不想失去已有的上下文，只是想给它瘦身。

简单记忆：任务结束用 `/clear`，任务进行中上下文太长用 `/compact`。

#### 清空后的重启节奏

`/clear` 之后，新对话的第一条消息质量决定了接下来的效率。不要直接抛出一个问题，先用一两句话重建必要的背景：

```Plain Text
刚清空了上下文。现在要处理交易模块的退款流程，
核心逻辑在 TradeOrderServiceImpl，状态机在 TradeStateMachine。

@src/service/impl/TradeOrderServiceImpl.java
@src/statemachine/TradeStateMachine.java

退款申请提交后，状态应该从"已付款"流转到"退款中"，
但现在偶发性地跳到了"已取消"，帮我找原因。
```

这条消息做了三件事：说明背景、用 `@` 引入相关文件、清晰描述问题。Claude 拿到这些信息，能立刻进入状态，不需要一轮一轮地追问"你说的是哪个文件""现在的状态是什么"。

清空不是损失，是重置。配合一个好的重启消息，新对话往往比在混乱的长对话里继续挣扎更快到达答案。

### 使用 `/compact` 压缩长对话节省 token

如果说 `/clear` 是推倒重来，`/compact` 就是整理归档——把一段越来越长的对话历史折叠成一份精炼的摘要，以这份摘要为新起点继续工作。上下文瘦身了，任务的连续性却保留下来。

---

#### 它具体做了什么

运行 `/compact` 后，Claude 会把当前对话历史做一次压缩处理：读取所有对话内容，提炼出关键信息——已经确认的技术方案、读取过的文件要点、达成的结论、当前的任务状态——生成一份结构化摘要，然后用这份摘要替换掉原来的完整历史。

原来可能占用 80k token 的对话历史，压缩后可能只剩 8k token 的摘要。上下文窗口里腾出了大量空间，Claude 后续能处理更多新的文件内容和对话，而不是被历史记录撑满。

压缩是有损的——一些细节会在摘要里消失。但这恰恰是它的价值所在：那些消失的细节，往往是已经完成的中间步骤、被否定的方向、或者单纯的闲聊，对后续任务没有实质意义。留下来的，是真正需要延续的上下文。

---

#### 和 `/clear` 的核心区别

两个命令适合完全不同的场景，选错了会造成不必要的麻烦：

任务**已经完成**，准备切换到另一个不相关的任务——用 `/clear`。旧任务的上下文对新任务没有价值，全部清空最干净。

任务**还在进行中**，但对话已经很长，开始感觉迟钝——用 `/compact`。任务没结束，上下文里有价值的信息需要保留，只是需要瘦身。

一个直觉判断：如果你接下来要说的第一句话还是关于当前这个任务的，用 `/compact`；如果你要换话题了，用 `/clear`。

---

#### 什么时候该用

**对话轮次超过 20-30 轮时。** 这是一个经验性的阈值。不同任务的信息密度不同，但大多数对话在这个轮次之后开始出现明显的上下文压力——响应变慢、Claude 开始重复已经讨论过的内容、或者对早期文件内容的引用出现偏差。

**读取了大文件之后。** 如果为了定位一个 bug 读取了一个 500 行的 Service 实现，bug 找到并修复之后，这 500 行内容还占着上下文。如果接下来还有相关任务要继续，`/compact` 能把这个文件的内容压缩成几行关键摘要，腾出空间给后续的文件和讨论。

**方向经历过多次调整时。** 一个功能讨论了三种实现方案，最终选了第三种。前两种方案的详细讨论现在是纯噪声，但你不想清空因为第三种方案还在进行中。`/compact` 会在摘要里保留"最终选择了方案三，原因是 xxx"，过滤掉前两种方案的细节。

**明显感觉 Claude 开始"健忘"时。** 它引用了一个已经修改过的旧版本代码，或者忘记了你们几十轮前确认的一个关键约定——这是上下文窗口开始溢出的信号，及时 `/compact` 比等问题积累再处理代价小。

---

#### 压缩前先做一件事

直接运行 `/compact` 让 Claude 自行决定保留什么，结果不总是最优的。更好的做法是在压缩前显式告诉 Claude 哪些内容必须保留：

```Plain Text
/compact 压缩时请确保保留以下内容：
1. 我们确定用策略模式实现推荐系统，StrategyRouter 负责选策略
2. 已完成 CollaborativeFilterStrategy，当前在做 BrowseHistoryStrategy
3. BrowseHistoryStrategy 的输入是用户最近 30 天的浏览记录，输出是带权重的账号 ID 列表
4. 还没处理的边界条件：用户浏览历史不足 10 条时的降级逻辑
```

这样的指令让压缩结果更可控。Claude 知道什么是任务的核心线索，在生成摘要时会优先保留这些内容，而不是用通用的摘要逻辑处理所有对话。

---

#### 压缩后验证摘要质量

`/compact` 执行完，Claude 会展示生成的摘要内容。不要跳过这个验证步骤，快速检查几件事：

当前任务的状态是否准确——已完成什么、正在做什么、还差什么。关键的技术决策是否保留——选择了哪个方案、为什么、有哪些约束。重要的文件信息是否还在——核心类的结构、关键方法的逻辑。未解决的问题是否记录——那些还没处理的边界情况、已知的 bug。

如果摘要里丢失了重要内容，在继续对话之前手动补充：

```Plain Text
摘要里漏掉了一个关键点：BrowseHistoryStrategy 的计算结果需要和
CollaborativeFilterStrategy 的结果做加权合并，权重比是 3:7，
这个比例是根据 AB 测试结果确定的，不要改动。
```

补充完，后续的对话就建立在完整的基础上，不会因为摘要的遗漏产生偏差。

---

#### 配合 CLAUDE.md 减少压缩损耗

`/compact` 最怕压缩掉的是项目级的重要约定——技术栈选型、编码规范、禁止行为。这些内容一旦从摘要里消失，Claude 后续生成的代码可能就开始偏离项目标准。

解决方式很直接：重要的、需要长期生效的约定，写进 CLAUDE.md，而不是只在对话里说过一次。CLAUDE.md 在每次会话开始时自动加载，不受 `/compact` 影响——它是上下文压缩的"豁免区"。

对话里的临时上下文交给 `/compact` 管理，项目级的持久约定交给 CLAUDE.md 管理。两者各司其职，就不需要担心压缩会丢掉关键信息。

---

#### 一个实际的工作节奏

开始一个任务 → 正常对话，`@` 引用相关文件 → 对话超过 20 轮或感觉开始迟钝 → 运行 `/compact`，指定必须保留的关键点 → 验证摘要，手动补充遗漏 → 继续任务 → 任务完成后用 `/clear` 切换到下一个任务。

`/compact` 是这个节奏里的中间维护动作，就像长途驾驶中途加油——不是因为车坏了，而是主动维护让后半程跑得更稳。

### 通过 `/resume` 恢复上次会话

开发工作很少能一次性完成。更常见的场景是：一个功能做到一半，被另一件事打断；下班前还差最后一步，第二天早上继续；在不同的终端窗口之间切换，需要回到之前的上下文。`/resume` 解决的正是这类问题——不需要重新交代背景，直接接着上次的状态继续。

---

#### 基本用法

在任意目录启动 Claude Code 后：

```Plain Text
/resume
```

Claude 会列出最近的历史会话，显示每个会话的时间、所在项目目录、以及对话的简短摘要。选择想要恢复的会话，它会把那次对话的上下文重新加载进来，你可以直接接着说。

如果知道具体想恢复哪个会话，也可以带上会话 ID：

```Plain Text
/resume session-id-xxxxx
```

会话 ID 在列表里显示，也可以在之前的对话里通过 `/session` 命令查看。

---

#### 它恢复的是什么

理解 `/resume` 恢复的内容边界，能避免对它产生不切实际的期待。

**会恢复的内容**——对话历史，包括你说过的话和 Claude 的回复；上次会话里读取过的文件内容（如果还在上下文窗口范围内）；通过 `/compact` 压缩后的摘要；会话结束时的任务状态。

**不会恢复的内容**——上次会话里执行过的 bash 命令的运行时状态；已经写入文件的代码改动（这些改动在文件系统里，不在会话里，直接读文件就能看到）；终端的环境变量和进程状态。

简单说：对话记录恢复了，但执行环境没有恢复。上次运行过的服务、开着的端口、设置过的环境变量，需要你自己重新启动。

---

#### 和手动重新描述背景的区别

很多人的习惯是重新打开 Claude Code，然后把上次的背景复述一遍。和 `/resume` 相比，这种方式的问题不只是麻烦：

复述背景依赖你的记忆，容易遗漏细节。上次 Claude 读取的文件内容、中间产生的技术结论、已经否定的方向——这些在复述时很难完整还原，而 `/resume` 直接恢复原始记录，不依赖你的转述。

复述的信息是二手的，`/resume` 加载的是一手记录。Claude 看到的是原始对话，而不是你对它的描述——这个区别在复杂任务里会产生明显的准确性差异。

---

#### 适合用 `/resume` 的场景

**被打断的任务。** 做到一半来了个紧急需求，处理完之后用 `/resume` 回到原来的任务，上下文完整，不需要重新进入状态。

**跨天的任务。** 一个复杂功能分多天完成，每天开始工作时 `/resume` 恢复前一天的进度，而不是重新交代整个背景。对于持续几天的大功能，这个习惯能节省大量"重新热身"的时间。

**多项目切换。** 同时维护多个项目，在它们之间来回切换。每个项目都有自己的会话历史，`/resume` 让每次切换都能精准回到对应项目上次停下的地方。

**验证修复效果后继续。** 让 Claude 生成了一个修复方案，你去测试，测完回来继续讨论——这段测试时间里会话中断了，`/resume` 让你能无缝衔接。

---

#### 配合 `/compact` 提升恢复质量

`/resume` 恢复的上下文质量，很大程度上取决于上次会话结束时上下文的状态。如果上次会话是在一个很长、很混乱的对话里直接关掉的，恢复回来的也是那个混乱的状态。

一个好习惯是：在打算中断一个任务之前，先运行 `/compact`，明确指定需要保留的关键信息：

```Plain Text
/compact 我要暂时中断这个任务。压缩时请保留：
1. 当前在实现 BrowseHistoryStrategy 的降级逻辑
2. 降级条件：用户浏览历史不足 10 条
3. 降级方案：切换到 PopularityStrategy，权重降为 0.3
4. 还未处理：降级后的缓存策略，TTL 应该更短还是复用原有的
```

这样下次 `/resume` 回来，恢复的是一份清晰的任务摘要，而不是几十轮对话的原始记录。恢复后第一条消息就能直接切入，不需要先花几轮对话重新找回状态。

---

#### 恢复后的第一条消息

`/resume` 加载完成后，不要沉默着等 Claude 开口。主动用一句话确认当前状态：

```Plain Text
继续上次的任务。我去测试了一下，降级逻辑的触发条件没问题，
但降级后推荐结果的多样性明显下降，用户反馈不好。
我们继续讨论缓存策略的问题，然后看看多样性怎么改善。
```

这条消息做了两件事：同步了中断期间发生的新情况（测试结果），明确了接下来的方向。Claude 有了这个锚点，能立刻进入状态，而不是先花几轮对话确认"我们上次做到哪里了"。

恢复会话和开始新会话的本质区别，就在于这条第一消息的信息量——新会话需要完整的背景交代，恢复会话只需要一个简短的状态更新。用好这个差异，`/resume` 才能真正发挥它节省时间的价值。

##  5.Git 工作流

### 让 Claude 自动暂存更改并生成 commit 消息

手写 commit 消息是开发里最容易敷衍了事的环节。"fix bug"、"update"、"temp"——这类消息在很多项目的 git log 里比比皆是。Claude Code 在这件事上能真正帮到你，不只是省事，而是能生成比大多数人手写更准确、更有信息量的消息。

#### 最基本的用法

完成一段修改后，直接告诉 Claude：

```Plain Text
帮我提交这些更改
```

或者更明确一些：

```Plain Text
把当前所有修改暂存并生成一个合适的 commit 消息提交
```

Claude 会执行以下步骤：先运行 `git diff` 和 `git status` 读取当前的变更内容，理解改了哪些文件、改动的性质是什么，然后运行 `git add` 暂存，最后用 `git commit -m` 提交，消息由它根据实际改动内容生成。

整个过程你可以在终端里看到每一步的执行，不是黑盒操作。

#### 生成消息的质量

Claude 生成的 commit 消息通常遵循业界主流的 **Conventional Commits** 规范，格式类似：

```Plain Text
feat(recommend): add cold-start strategy based on browse history

- Introduce BrowseHistoryStrategy implementing RecommendStrategy
- Fall back to popularity-based ranking when history is empty
- Add unit tests for edge cases with new users
```

它能做到这个质量，是因为它真的读了 diff，而不是靠猜。如果你改的是一个 SQL 查询优化，它会写 `perf`；如果是修了一个空指针，它会写 `fix`；如果是加了新接口，它会写 `feat`。类型前缀的判断基于实际变更内容，不是随机选的。

#### 让消息更符合你的规范

不同团队对 commit 消息的要求不一样。你可以在指令里直接说明：

```Plain Text
提交这些更改，消息用中文，格式是"模块名: 改动描述"
```

```Plain Text
提交，消息要包含 Jira ticket 号 PROJ-1234
```

```Plain Text
按文件模块拆成多个 commit 分别提交，不要全部混在一个 commit 里
```

最后这个场景尤其有用——当你一口气改了多个不相关的模块，Claude 会分析变更内容，判断哪些属于同一逻辑单元，拆分成独立的 commit，每个消息单独描述。这是手动操作最繁琐、也最容易偷懒跳过的步骤，交给 Claude 反而做得更彻底。

如果你希望整个项目始终保持一致的 commit 风格，最好的做法是把规范写进 `CLAUDE.md`：

```Markdown
## Git 规范
- commit 消息使用 Conventional Commits 格式
- type 范围：feat / fix / perf / refactor / test / docs / chore
- scope 使用模块名，如 recommend / order / user
- 消息用英文，正文可选，超过 3 个文件改动时必须写正文
```

写进去之后，每次让 Claude 提交，它都会自动遵守，不需要每次重复说明。

#### 只生成消息，不自动提交

如果你想保持对提交的最终控制权，可以让 Claude 只生成消息，由你决定要不要用：

```Plain Text
帮我看一下当前的改动，给我一个合适的 commit 消息，我自己来提交
```

Claude 会输出建议的消息文本，你复制进去用，或者根据它的版本微调。这种方式在改动比较敏感、或者你习惯亲手执行 git 操作的场景下更合适。

#### 一个值得养成的习惯

不要等改动堆积很多再一次性提交。每完成一个清晰的逻辑单元——一个功能点、一个 bug 修复、一次重构——就立刻让 Claude 提交一次。小步提交让 git log 变成真正可读的开发历史，也让 code review 和问题回溯容易得多。

Claude Code 把提交这件事的摩擦降到接近零，没有理由再用"太麻烦"当借口攒一堆乱糟糟的 diff 最后混在一个 commit 里交出去。

### 让 Claude 创建分支、开 Pull Request

分支管理和 PR 是团队协作的日常动作，但也是最容易产生低质量输出的环节——分支名随手一起、PR 描述只写"fix"、reviewer 看了完全不知道改了什么。Claude Code 能把这些动作做得更规范，同时几乎不增加你的操作成本。

#### 创建分支

最直接的方式：

```Plain Text
帮我基于当前分支创建一个新分支，用来开发用户推荐功能
```

Claude 会根据你的描述生成一个符合规范的分支名，比如 `feat/user-recommendation`，然后执行 `git checkout -b` 完成创建并切换。

如果你的团队有固定的分支命名规范，直接说明：

```Plain Text
创建一个新分支，命名格式是 feature/PROJ-1234-简短描述
```

或者写进 `CLAUDE.md` 一劳永逸：

```Markdown
## 分支规范
- 新功能：feat/模块名-简短描述
- bug 修复：fix/问题描述
- 分支名全小写，单词用连字符分隔
- 必须包含对应的 Jira ticket 号，如 feat/recommend-PROJ-1234
```

此后每次让 Claude 建分支，它都会自动套用这套规则，不需要重复提醒。

#### 开 Pull Request

完成功能开发、提交好 commit 之后：

```Plain Text
帮我把这个分支推送到远程，然后开一个 Pull Request
```

Claude 会依次执行 `git push`，然后通过 GitHub CLI（`gh pr create`）或 GitLab CLI 创建 PR。

PR 的标题和描述是它真正能帮到你的地方。它会回顾这个分支上所有的 commit、读取改动的文件和内容，生成一份有实质信息量的描述，通常包含：

- 这次改动的背景和目的
- 具体做了什么，改了哪些模块
- 如何验证，比如相关测试或手动测试步骤
- 已知的限制或后续计划（如果有）

对于 reviewer 来说，这种描述和"update code"的差距是天壤之别。

#### 控制 PR 描述的格式

很多团队有固定的 PR 模板，放在 `.github/pull_request_template.md` 里。Claude Code 会自动检测并遵守这个模板，按照模板里的每个 section 填写内容，而不是自由发挥。

如果没有模板，但你有格式偏好，可以直接说：

```Plain Text
PR 描述要包含：改动背景、技术方案、测试说明、是否需要数据库迁移
```

或者在 `CLAUDE.md` 里定义标准结构：

```Markdown
## PR 规范
描述必须包含以下部分：
- ## 背景：为什么要做这个改动
- ## 方案：技术实现思路
- ## 测试：验证方式
- ## 风险：可能的影响范围
- ## 相关 ticket：Jira 链接
```

#### 指定 reviewer 和标签

```Plain Text
开 PR，指定 @张三 @李四 作为 reviewer，加上 labels: backend, needs-review
```

Claude 会在创建 PR 时带上这些参数。如果你们团队的 reviewer 分配有固定规律，比如后端改动固定 review 某几个人，同样可以写进 CLAUDE.md，让 Claude 自动判断该指定谁。

#### 从 issue 到分支到 PR 的完整链路

Claude Code 能处理更完整的工作流。比如你在 GitHub 上有一个 issue，可以这样说：

```Plain Text
基于 issue #42 创建分支，完成修复后开 PR 关联这个 issue
```

Claude 会读取 issue 的标题和描述，用 issue 内容作为分支名和 PR 描述的依据，并在 PR 描述里自动加上 `Closes #42`，合并后 issue 自动关闭。整个从问题到解决的链路，在 git 历史和 issue tracker 里都有清晰的关联记录。

#### 前提条件

Claude Code 创建 PR 依赖命令行工具的存在。GitHub 需要安装并登录 `gh`（GitHub CLI）；GitLab 需要 `glab`。如果这两个工具没有配置，Claude 会告诉你缺少什么，并给出安装指引，不会静默失败。

两个工具的安装都很简单：

```Bash
# GitHub CLI
brew install gh && gh auth login

# GitLab CLI
brew install glab && glab auth login
```

配置一次，之后所有项目都能用，不需要重复设置