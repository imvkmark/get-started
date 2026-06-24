---
description: '本文阐述了在写代码前先撰写规格说明（Spec）的核心理念，从Vibe Coding现象出发，强调“先达成共识再构建”的原则，介绍了四个设计原则，并指出先写Spec与Claude Code的天然契合性，也说明了何时不需要这样做。'
lastUpdated: '2026-04-08 14:19:31'
head:
  - - meta
    - name: 'og:title'
      content: '① 核心理念 为什么要在写代码前先写 Spec'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文阐述了在写代码前先撰写规格说明（Spec）的核心理念，从Vibe Coding现象出发，强调“先达成共识再构建”的原则，介绍了四个设计原则，并指出先写Spec与Claude Code的天然契合性，也说明了何时不需要这样做。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/openspec/1-core.html'
---
# ① 核心理念 为什么要在写代码前先写 Spec

## 从 Vibe Coding 说起

你打开 Claude Code，输入一句话："帮我给交易平台加一个消息通知功能。"

Claude 立刻开始写代码。十分钟后，它交出了一个基于 WebSocket 的实时推送方案，用了 Spring WebSocket + STOMP 协议，还顺手创建了一个 `NotificationController` 和对应的前端 JS 文件。

但你想要的其实是一个异步的站内信系统，用 RocketMQ 驱动，消息存进数据库，用户下次登录时拉取未读数。

代码没有错，但方向完全跑偏了。

这不是 Claude 的问题，也不是你的问题。这是 AI 辅助编程固有的结构性缺陷：**需求只存在于你的脑子里，AI 只能猜。**

OpenSpec 的全部理念，都是为了解决这一个问题: AI 幻觉

---

## Agree Before You Build

OpenSpec 的官方描述是"spec-driven development for AI coding assistants"，它的核心主张只有一句话：**在任何代码被写出来之前，人和 AI 先对规格达成明确共识。**

这个理念本身并不新鲜。传统软件工程里早就有"先设计后实现"的实践，但那套方法论太重——需求文档、功能规格书、技术方案评审，走完一圈可能要两周。OpenSpec 的价值在于它把这套流程压缩成了四个轻量的 Markdown 文件，并且通过斜杠命令让 AI 来帮你填写这四个文件。

共识的代价因此变得极低，但带来的可预测性却是真实的

---

## 四个设计原则

OpenSpec 有四条明确写在文档里的设计哲学，理解它们能帮助你判断什么时候该用、什么时候不必用。

**Fluid not rigid（流动而非刚性）**

传统的瀑布式开发把需求、设计、实现切成三个阶段，阶段之间有门禁，过了就不能回头。OpenSpec 不设阶段门禁，你可以在任何时刻修改 `proposal.md`，可以在实现到一半时回去改 `design.md`，可以在发现新信息后重写 `specs/`。它是一个活的工作区，不是一份冻结的合同。

**Iterative not waterfall（迭代而非瀑布）**

理解会随着实现深入而加深，这是软件开发的常态。OpenSpec 接受这个事实，它期望你在写代码的过程中发现问题，回来更新 spec，然后继续。这和 CLAUDE.md 的增量维护逻辑是同构的——spec 不是一次性写完的，是持续演进的。

**Easy not complex（简单而非复杂）**

一个 change 文件夹里只有四个文件：`proposal.md`、`specs/`、`design.md`、`tasks.md`。没有 YAML 表单、没有状态机、没有评审系统。任何一个只会写 Markdown 的人都能参与进来。对于 Solo 开发者而言，这个门槛基本等于零。

**Brownfield-first（存量优先）**

这一条在 AI 编程工具里尤为罕见。大多数"规格驱动"方案都假设你在从零开始建系统，而 OpenSpec 的 Delta Spec 机制专门为修改现有系统设计。你不需要把整个游戏账号平台的现有逻辑都写进 spec，只需要描述这次变更的部分——加了什么、改了什么、删了什么。

---

## 为什么先写 Spec

这个问题值得认真回答，因为直觉上很多人会觉得"先写 spec 是在浪费时间，不如直接让 AI 写代码，不对再改"。

这个直觉在简单任务上是对的，但在中等复杂度以上的功能上会系统性地失效，原因有三层。

**第一层：AI 的猜测成本比你想象的高**

当 Claude 在没有 spec 的情况下实现一个功能时，它会做大量隐性的技术决策：用什么数据结构、分几个类、缓存还是不缓存、同步还是异步。这些决策不是随机的，Claude 会选择它认为"最合理"的方案，但这个方案未必和你的代码库约定一致。你在审查代码时需要逐一检查这些决策，发现不对的地方再解释再修改，累积下来的往返成本往往超过一开始写 spec 的时间。

**第二层：对话上下文是一次性的，spec 是持久的**

 Claude Code 的一次对话结束后，它对这个功能的所有理解就消失了。下次你开新对话继续这个功能，Claude 重新从零开始。如果有 `design.md` 存在，你把它作为上下文传入，Claude 立刻恢复到上次的技术决策框架里。Spec 把 AI 的短期记忆转化成了项目的长期记忆。

**第三层：写 spec 的过程本身就是思考的过程**

当你被迫用结构化语言写出"在什么条件下，系统应该做什么，返回什么"的时候，你会发现很多自己本来没想清楚的边界情况。比如在写账号估价功能的 spec 时，你会遇到"如果历史数据不足怎么办"这个问题——这个问题在闭着眼睛写代码时往往被跳过，等到上线才发现是个 bug。Spec 是一种强制性的需求澄清工具。

---

## 与 Claude Code 的天然契合

OpenSpec 在和 Claude Code 配合时有一个其他工具没有的优势：它生成的文件类型和 Claude Code 的工作方式完美对齐。

Claude Code 本身就是一个以文件系统为中心的 Agent，它读 CLAUDE.md 获取项目规范，读源代码理解现有实现，读测试文件理解预期行为。OpenSpec 的 `specs/`、`design.md`、`tasks.md` 都是普通 Markdown 文件，放进 `.claude/` 目录或者通过 `@` 语法引用，Claude 就能把它们作为上下文的一部分纳入每一次请求。

更进一步，OpenSpec 在执行 `openspec init --tools claude` 时会直接在 `.claude/skills/` 目录里生成对应的 Skill 文件，这意味着 `/opsx:propose`、`/opsx:apply`、`/opsx:archive` 这些命令实际上是通过 Claude Code 的 Skills 机制触发的，整个流程不需要离开 Claude Code 的工作环境。

这是 OpenSpec 和 Claude Code 之间的架构级契合，而不仅仅是表面上"都支持斜杠命令"的巧合。

---

## 什么时候不需要 

理念再好也有适用边界。以下情况不需要引入 OpenSpec：修一个明确的 bug、写一个 50 行以内的工具函数、做临时性的实验代码。这些任务的需求本身已经足够清晰，spec 的边际价值接近零。

OpenSpec 的价值区间在于**有一定复杂度、会影响多个模块、未来可能被修改的功能**。在交易平台的上下文里，账号估价、搜索筛选逻辑、订单状态机、支付对账——这些都是值得走一遍 SDD 流程的功能，而改一个字段名、加一条日志、调整一个枚举值则完全不必。

判断标准很简单：如果你在描述这个功能时需要说超过三句话，那就值得把这三句话写成一份 `proposal.md`。