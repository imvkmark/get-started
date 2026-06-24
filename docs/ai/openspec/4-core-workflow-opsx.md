---
description: 'OPSX 是一套AI辅助开发工作流，通过提案（propose）、规范编写、任务分解、代码生成（apply）、质量验证（verify）和归档（archive）等命令，结构化地管理和实现功能变更，确保代码与规范同步、质量可预测。'
lastUpdated: '2026-04-08 10:04:19'
head:
  - - meta
    - name: 'og:title'
      content: '④ 核心工作流：OPSX 命令'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'OPSX 是一套AI辅助开发工作流，通过提案（propose）、规范编写、任务分解、代码生成（apply）、质量验证（verify）和归档（archive）等命令，结构化地管理和实现功能变更，确保代码与规范同步、质量可预测。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/openspec/4-core-workflow-opsx.html'
---
# ④ 核心工作流：OPSX 命令

把 core 和 expanded 的所有命令放在一起，形成完整的命令地图, 方便整体理解：

```Plain Text
思考阶段
  /opsx:explore          ← 探索想法，调查问题，不产生代码

规划阶段（core）
  /opsx:propose          ← new + ff 的组合，一步到位

规划阶段（expanded，细粒度控制）
  /opsx:new              ← 只建文件夹
  /opsx:continue         ← 逐步生成 artifact，每次一个
  /opsx:ff               ← 快进生成所有 artifact

实现阶段（core）
  /opsx:apply            ← 按 tasks.md 逐条实现代码
  /opsx:sync             ← 同步代码和 artifact 的状态

验证阶段（expanded）
  /opsx:verify           ← 检查完整性、正确性、一致性

归档阶段（core）
  /opsx:archive          ← 归档单个 change

归档阶段（expanded）
  /opsx:bulk-archive     ← 批量归档多个 change，处理冲突

引导流程（expanded）
  /opsx:onboard          ← 存量项目的 SDD 冷启动引导
```

最高频的路径是：遇到想不清楚的问题先 `explore`，想清楚了直接 `propose`，实现完跑 `verify`，没问题就 `archive`。`sync` 和 `bulk-archive` 是辅助工具，在出现实现和预期脱节或需要批量处理时才会用到

## `/opsx:propose`：提案

```Plain Text
/opsx:propose <change-name>
```

`change-name` 用连字符命名，描述这次变更的核心意图：

```Plain Text
/opsx:propose account-auto-pricing
/opsx:propose order-status-notification
/opsx:propose search-filter-by-server
/opsx:propose payment-alipay-integration
```

执行后 Claude 会追问你几个问题来填充 `proposal.md`，通常是：要解决什么问题、预期的解决思路、有没有已知的约束或排除项。你的回答不需要精确，几句话即可——AI 会帮你整理成结构化格式。

如果你已经想清楚了，也可以一次性把背景都给出去：

```Plain Text
/opsx:propose account-auto-pricing

卖家发布账号时不知道定价多少，导致长期滞销或低价损失。
希望在发布页面提供参考价格区间，基于过去 90 天同类账号
的历史成交价计算。首版用统计方法，不做机器学习。
```

---

### 输出四个文件

执行完成后，`openspec/changes/account-auto-pricing/` 目录里会出现：

```Plain Text
openspec/changes/account-auto-pricing/
├── proposal.md
├── specs/
│   └── account/
│       └── spec.md       ← Delta Spec
├── design.md
└── tasks.md
```

实际上 `/opsx:propose` 是 `core` profile 里的**快捷方式**

- 它等价于依次执行 `/opsx:new` + `/opsx:ff`——先创建 change 文件夹，再快进生成全部 artifact
- 也可以用 `/opsx:new` + `/opsx:continue` 逐步生成，每次只创建一个文件，方便在中途审查和调整

---

### 典型内容

#### **`proposal.md`**

```Markdown
# Proposal: account-auto-pricing

## Problem
卖家发布账号时缺乏定价参考。平台数据显示，无参考价格的账号
平均挂单时长是有参考价格账号的 2.3 倍。

## Solution
在账号发布流程中新增估价服务，基于过去 90 天同类账号成交价
计算 P25/P50/P75 分位数，返回低/均/高三档参考价格区间。

## Success criteria
- 卖家发布账号时能看到估价区间
- 估价响应时间 < 500ms（P95）
- 覆盖平台前 10 大游戏品类

## Out of scope
- 机器学习模型（首版用规则+统计）
- 实时竞品价格抓取
```

#### **`specs/account/spec.md`（Delta Spec）**

```Markdown
# Delta for Account Domain

## ADDED Requirements

### Requirement: Account pricing suggestion
The system MUST provide a price suggestion when a seller creates a new listing.

#### Scenario: Normal pricing
- GIVEN a seller submits (game_type=LOL, level=150, rare_items=[skin_legendary])
- WHEN the pricing service is called with sufficient historical data
- THEN return { low: 280, mid: 350, high: 480, currency: "CNY", sample_size: 42 }
- AND response time SHALL be under 500ms at P95

#### Scenario: Insufficient data
- GIVEN fewer than 5 comparable transactions exist
- WHEN the pricing service is called
- THEN return { insufficient_data: true, low: null, mid: null, high: null }
```

#### **`design.md`**

```Markdown
# Design: account-auto-pricing

## Architecture
AccountController → PricingService → PricingRepository → Redis 缓存层

## Key decisions
- 算法：P25/P50/P75 分位数，取过去 90 天数据
- 缓存：Redisson，key = pricing:{game_type}:{level_bucket}，TTL 30min
- 降级：Redis 不可用时查 DB；DB 超时 200ms 返回 insufficient_data

## API contract
GET /api/v1/accounts/pricing?game_type=LOL&level=150
Response: { low, mid, high, currency, sample_size }
```

#### **`tasks.md`**

```Markdown
# Tasks: account-auto-pricing

## 1. 数据层
- [ ] 1.1 account_transaction 表新增索引 idx_pricing
- [ ] 1.2 PricingRepository.findComparablePrices()

## 2. 服务层
- [ ] 2.1 PricingService.suggest() 核心逻辑
- [ ] 2.2 Redisson 缓存封装
- [ ] 2.3 降级逻辑

## 3. 接口层
- [ ] 3.1 GET /api/v1/accounts/pricing Controller
- [ ] 3.2 参数校验

## 4. 测试
- [ ] 4.1 PricingServiceTest（三个场景）
- [ ] 4.2 集成测试：P95 响应时间断言
```

`/opsx:propose` 的输出质量取决于你给的上下文有多清晰。Claude 在生成这四个文件时会读取 `openspec/specs/` 里的已有规格和项目的 `CLAUDE.md`，但对业务背景的理解完全依赖你在 propose 时的描述。

几个提高输出质量的实践：

- 说清楚"为什么现在做"（触发因素或数据支撑）
- 点名不做什么（Out of scope 防止范围蔓延）
- 如果有明确的技术约束提前说（比如"必须用 RocketMQ 异步"）

这些信息进 proposal，design 和 tasks 就会自动反映出来，不需要在后续步骤里反复纠正方向。

生成完之后不要急着跑 `/opsx:apply`，先把四个文件通读一遍。如果 design 里的技术决策不对、tasks 的粒度太粗、或者 specs 里漏了某个边界场景，现在改代价最低——改一个 Markdown 文件，而不是改一堆已经生成的代码。

## `/opsx:ff` 和 `/opsx:continue` 的区别

### 依赖链

要理解这两个命令，先要理解 OpenSpec 的 artifact 生成顺序。四个文件之间存在依赖关系：

```Plain Text
proposal.md  →  specs/  →  design.md  →  tasks.md
```

proposal 决定了 specs 的边界，specs 的行为约束决定了 design 的技术选型，design 的方案决定了 tasks 的分解粒度。这条依赖链是 `/opsx:new`、`/opsx:continue`、`/opsx:ff` 三个命令存在的原因——它们都是围绕"按依赖顺序生成 artifact"这件事设计的，只是步进粒度不同。

这三个命令属于 expanded profile，需要先开启：

```Bash
openspec config profile   # 选 expanded
openspec update
# 重启 Claude Code
```

---

### `/opsx:new` 

创建 change 文件夹

```Plain Text
/opsx:new account-auto-pricing
```

只做一件事：创建 `openspec/changes/account-auto-pricing/` 目录，不生成任何文件。输出类似：

```Plain Text
Created openspec/changes/account-auto-pricing/
Schema: spec-driven
Ready to create: proposal

Use /opsx:continue to create it, or /opsx:ff to create all artifacts.
```

单独用 `/opsx:new` 的场景很少，通常它是 `/opsx:continue` 或 `/opsx:ff` 的前置步骤。

---

### `/opsx:continue` 

每次生成一个 artifact

```Plain Text
/opsx:continue
```

每次调用只生成依赖链里**下一个**尚未创建的文件，然后停下来等你审查。第一次调用生成 `proposal.md`，你看完觉得没问题，再调用一次生成 `specs/`，依此类推：

```Plain Text
第一次 /opsx:continue：
  Change: account-auto-pricing
  Artifact status:
    ◆ proposal  (ready)
    ○ specs     (blocked - needs: proposal)
    ○ design    (blocked - needs: specs)
    ○ tasks     (blocked - needs: design)
  Creating proposal.md...
  ✓ Created openspec/changes/account-auto-pricing/proposal.md
  Now available: specs
  Run /opsx:continue to create the next artifact.

第二次 /opsx:continue：
  ✓ proposal  (done)
  ◆ specs     (ready)
  ○ design    (blocked)
  ○ tasks     (blocked)
  Creating specs...
  ✓ Created openspec/changes/account-auto-pricing/specs/account/spec.md

第三次 /opsx:continue：
  ✓ proposal  (done)
  ✓ specs     (done)
  ◆ design    (ready)
  ...
```

适合的场景：你对这个功能的思路还没完全想清楚，或者这是个高风险的改动，想在每个阶段都仔细看一遍再往下走。看完 proposal 发现方向不对，直接编辑 `proposal.md` 再 continue，比跑完全程再改代价低得多。

---

### `/opsx:ff` 

快进，一次生成所有 artifact

```Plain Text
/opsx:ff account-auto-pricing
```

Fast-forward 的缩写。一口气把 proposal、specs、design、tasks 四个文件全部生成，中间不停顿：

```Plain Text
Fast-forwarding account-auto-pricing...
✓ Creating proposal.md
✓ Creating specs/account/spec.md
✓ Creating design.md
✓ Creating tasks.md
All planning artifacts complete!
```

适合的场景：需求已经想得很清楚，或者这是个改动范围小、风险低的功能，不需要在每个 artifact 之间停下来审查。

`/opsx:propose` 这个命令本质上就是 `/opsx:new` + `/opsx:ff` 的组合——先建文件夹，再快进生成全部文件。所以日常用 `/opsx:propose` 就够了，只有在需要更细粒度控制时才需要把这两步拆开。

---

### 选择原则

用 `/opsx:ff`（或直接 `/opsx:propose`）的情况：需求清晰、改动范围小、想快速进入实现阶段。这是日常开发里的默认选择。

用 `/opsx:continue` 的情况主要有三种。

- 需求本身还模糊，想边写 proposal 边理清思路，看完再决定 specs 怎么写
- 改动涉及多个域或者架构层面，specs 写完之后需要认真确认行为约束没有遗漏，再让 AI 去写 design
- 团队协作场景，proposal 由产品侧写，specs 由开发审查后再继续，每个阶段需要人工介入和确认

对于个人开发的上下文，`/opsx:ff` 是绝大多数情况下的正确选择。`/opsx:continue` 留给那些你自己都还没想清楚、需要边写边想的功能

---

### 中途切换也没关系

OpenSpec 支持并行处理多个 change，随时可以切换。 比如你在用 `/opsx:continue` 逐步推进 `account-auto-pricing`，突然来了个紧急 bug 需要处理：

```Plain Text
/opsx:new fix-pricing-cache-bug
/opsx:ff fix-pricing-cache-bug
/opsx:apply fix-pricing-cache-bug
/opsx:archive fix-pricing-cache-bug

# bug 修完，回到原来的功能
/opsx:continue account-auto-pricing   # 从上次中断的地方继续
```

change 文件夹的隔离设计保证了多个并行任务互不干扰，这是它比纯对话式开发更可靠的地方——上下文不会因为临时插入一个 bug fix 而混乱。

## `/opsx:apply`：让 AI 按图索骥地写代码

```Plain Text
/opsx:apply account-auto-pricing
```

如果当前只有一个活跃的 change，可以省略名称直接执行：

```Plain Text
/opsx:apply
```

OpenSpec 会自动识别 `openspec/changes/` 下唯一的未完成变更。如果有多个并行 change，需要显式指定名称。

---

### 执行前 AI 读取什么

`/opsx:apply` 触发后，Claude 在写任何代码之前会先读取三类上下文：

第一类 : 变更 : change 文件夹里的全部 artifact

- `proposal.md` 了解业务背景
- `specs/` 了解行为约束和验收标准
- `design.md` 了解技术方案和关键决策
- `tasks.md` 获取要执行的具体任务列表

第二类是规范 :  `openspec/specs/` 主目录里的已有规范，了解系统现有行为，避免新代码破坏已有功能的逻辑

第三类是项目的 `CLAUDE.md`，获取编码规范、架构约定、禁止事项等项目级约束

这三类上下文叠加，构成 AI 实现这个功能所需的完整图景。和直接说"帮我实现账号估价功能"相比，区别在于 AI 不再需要猜测你的意图——`design.md` 里已经写明了用 Redisson 而不是直接用 Jedis，用分位数而不是均值，缓存 TTL 是 30 分钟而不是任意值。

---

### 执行过程：逐条勾选 tasks

AI 按照 `tasks.md` 里的编号顺序逐条实现，每完成一条就把对应的 `[ ]` 改成 `[x]`：

```Plain Text
Implementing account-auto-pricing...

✓ 1.1 account_transaction 表新增索引 idx_pricing
  → 生成 V003__add_pricing_index.sql

✓ 1.2 PricingRepository.findComparablePrices()
  → 生成 PricingRepository.java + PricingRepositoryMapper.xml

✓ 2.1 PricingService.suggest() 核心逻辑
  → 生成 PricingService.java

✓ 2.2 Redisson 缓存封装
  → 修改 PricingService.java，注入 RedissonClient

✓ 2.3 降级逻辑
  → 修改 PricingService.java，添加 try-catch + timeout 处理

✓ 3.1 GET /api/v1/accounts/pricing Controller
  → 生成 PricingController.java

✓ 3.2 参数校验
  → 修改 PricingController.java，添加 @Valid 注解和枚举校验

✓ 4.1 PricingServiceTest
  → 生成 PricingServiceTest.java（三个测试场景）

✓ 4.2 集成测试
  → 生成 PricingControllerIntegrationTest.java

All tasks complete!
```

tasks.md 实时更新，随时打开都能看到当前进度。如果中途对话被打断，下次执行 `/opsx:apply` 时 AI 会读取 tasks.md 的状态，从第一个未勾选的任务继续，而不是从头开始。

---

### 生成代码的质量更可预测

没有 spec 的情况下让 AI 实现"账号估价功能"，它会做很多隐性决策：缓存用不用、用什么客户端、降级策略怎么写、接口参数叫什么名字。这些决策不一定错，但未必和你的项目约定一致，审查代码时需要逐一核查。

有了 `design.md` 之后，这些决策已经在编码前确定下来。AI 拿到的不是一个模糊的意图，而是一份有约束、有边界、有技术细节的执行规格。生成的代码是 spec 的实现，而不是 AI 的自由发挥。

以 `PricingService` 为例，`design.md` 里写明了调用链和缓存策略，apply 生成的代码会直接对应这些决策：

```Java
@Service
@RequiredArgsConstructor
public class PricingService {

    private final PricingRepository pricingRepository;
    private final RedissonClient redissonClient;  // design 里指定了用 Redisson

    private static final int MIN_SAMPLE_SIZE = 5;       // specs 里的约束
    private static final long CACHE_TTL_MINUTES = 30;   // design 里的决策

    public PricingResult suggest(AccountPricingQuery query) {
        String cacheKey = "pricing:" + query.getGameType()
            + ":" + query.getLevelBucket();  // design 里的 key 格式

        RBucket<PricingResult> bucket = redissonClient.getBucket(cacheKey);
        PricingResult cached = bucket.get();
        if (cached != null) return cached;

        List<BigDecimal> prices = pricingRepository
            .findComparablePrices(query.getGameType(), query.getLevelBucket(), 90);

        if (prices.size() < MIN_SAMPLE_SIZE) {
            return PricingResult.insufficient();  // specs 里的 insufficient_data 场景
        }

        PricingResult result = calculatePercentiles(prices);  // P25/P50/P75
        bucket.set(result, CACHE_TTL_MINUTES, TimeUnit.MINUTES);
        return result;
    }
}
```

每一行都能在 spec 或 design 里找到来源。这是 SDD 和直接 prompt 最本质的区别：代码的每个关键决策都有文档依据，而不是 AI 的推断结果。

---

### 中途修改 tasks 和 design

apply 执行过程中，如果发现某个 task 的实现方向不对，可以直接中断，修改 `design.md` 或 `tasks.md`，然后重新执行 `/opsx:apply`。AI 会从第一个未勾选的 task 继续，已完成的部分不会重复执行。

比如执行到 task 2.2 时发现缓存 key 的粒度设计有问题，中断后修改 `design.md` 里的 key 规则，再执行 `/opsx:apply`，AI 从 2.2 重新开始，之前已完成的数据层代码不受影响。

这是 tasks.md 作为进度状态文件的核心价值——它不只是一个清单，而是一个可恢复的执行断点，让 apply 的过程天然支持中断和重试。

---

### apply 完之后

代码生成完毕后，下一步是 `/opsx:verify`——对照 `specs/` 里的 Scenario 验证实现是否完整、正确、与设计一致。verify 不阻断流程，但它会把遗漏和不一致明确指出来，让你决定是现在修还是记录下来留待后续处理。

## `/opsx:verify`：归档前的质量检查

```Plain Text
/opsx:verify account-auto-pricing
```

在 `/opsx:apply` 完成、准备归档之前执行。它不修改任何文件，只做检查和报告。

---

### 三个检查维度

verify 的输出分三个维度，对应三个不同层面的质量问题。

#### **COMPLETENESS（完整性）**

检查实现是否覆盖了所有计划中的内容：

```Plain Text
COMPLETENESS
✓ tasks.md 中全部 9 个任务已勾选完成
✓ specs/ 中的所有 Requirement 都有对应代码实现
⚠ Scenario "Insufficient data" 未找到对应测试用例
```

完整性检查做两件事：

- 一是核查 `tasks.md` 里是否所有 `[ ]` 都变成了 `[x]`，有未完成的 task 会直接报出来；
- 二是遍历 `specs/` 里的每个 Scenario(场景)，检查代码库里是否存在覆盖这个场景的测试。

第二件事是 Scenario 格式存在的核心价值之一。GIVEN/WHEN/THEN 结构不只是文档规范，它让 AI 能够把 spec 里的场景描述和测试代码里的断言逻辑做语义匹配。一个 `Scenario: Insufficient data` 对应的测试方法名里应该出现 `insufficient` 或类似关键词，测试体里应该断言 `insufficient_data: true`。完全靠关键词匹配不是百分之百精确，但能捕获大多数明显遗漏

#### **CORRECTNESS（正确性）**

检查实现是否与规格定义的行为一致：

```Plain Text
CORRECTNESS
✓ API 返回结构 { low, mid, high, currency, sample_size } 与 specs 一致
✓ Scenario "Normal pricing" 的边界条件已处理
⚠ Scenario "Insufficient data" 触发条件：specs 定义 < 5 条记录，
  代码实现为 <= 5，差一条
```

正确性检查会把 specs 里的具体约束和代码实现做对照。比如 specs 写的是 `fewer than 5`（严格小于），但代码写的是 `<= 5`，这是一个差一的逻辑错误，verify 会精确指出来。

API 的响应结构、方法的返回类型、参数的校验范围——这些在 specs 里有明确描述的约束都在 correctness 的检查范围内。

#### **COHERENCE（一致性）**

检查代码与技术方案是否对齐：

```Plain Text
COHERENCE
✓ 缓存 key 格式 pricing:{game_type}:{level_bucket} 与 design.md 一致
✓ 降级逻辑触发条件与 design.md 描述匹配
⚠ design.md 约定使用 P25/P50/P75 分位数，
  代码实现为 P20/P50/P80，存在偏差
```

Coherence 检查的是 design.md 里的技术决策在代码里是否得到了忠实执行。缓存策略、降级逻辑、算法选型、命名约定——这些在 design 里写下来的东西，AI 在 apply 时理论上应该遵循，但偶尔会出现漂移。Coherence 把这些漂移显式地暴露出来。

---

### 输出格式

完整的 verify 报告长这样：

```Plain Text
COMPLETENESS
✓ 全部 9 个 tasks 已勾选
✓ Requirement "Account pricing suggestion" 有代码实现
⚠ Scenario "Insufficient data" 未找到对应测试覆盖

CORRECTNESS
✓ 返回结构与 specs 一致
⚠ insufficient_data 触发条件：specs 定义 < 5，代码实现 <= 5

COHERENCE
✓ 缓存 key 格式与 design.md 一致
✓ 降级策略与 design.md 匹配
⚠ design.md 约定 P25/P50/P75，代码实现为 P20/P50/P80

SUMMARY
─────────────────────────────────
Critical issues:  0
Warnings:         3
Ready to archive: Yes (with warnings)

Recommendations:
1. 补充 "Insufficient data" 场景的测试用例
2. 修正 insufficient_data 触发条件（< 5 而非 <= 5）
3. 将分位数还原为 P25/P50/P75，或更新 design.md 说明变更原因
```

---

### Warning 和 Critical 的区别

Verify 不阻断归档流程。Warning 不会阻止 archive，但它会把需要处理的问题明确指出来，让你决定是现在修还是记录下来留待后续处理。

实践中，三类问题的处理优先级不同。

- Correctness 里的逻辑错误（比如 `< 5` vs `<= 5` 这种差一错误）应该立刻修，这类问题上线后会产生真实的 bug，修改成本在这里最低。
- Completeness 里的测试覆盖缺失视情况而定，如果是核心边界场景（insufficient data 这种）应该补，如果是次要场景可以记录在 tasks.md 里作为后续 tech debt。
- Coherence 里的漂移最灵活——如果代码里的 P20/P50/P80 是有意为之（比如测试后发现效果更好），那就更新 design.md 说明变更原因；如果是 AI 的无意漂移，改回 P25/P50/P75。

这个判断逻辑体现了 SDD 的核心态度：spec 是约束，不是枷锁。发现实现和 spec 不一致时，可以改代码让它符合 spec，也可以改 spec 让它反映新的决策，但不能让两者静默地不一致

---

### Verify 的本质价值

在没有 spec 的纯对话式开发里，代码写完之后通常只有一种检查方式：人工审查。你需要靠记忆对照最初的需求，检查每个场景是否都处理了，每个技术决策是否都落地了。这既费时又不可靠，尤其在对话上下文很长之后。

Verify 把这个检查过程自动化了，且它的检查基准是结构化的文档而不是人的记忆。每个 Warning 背后都有一条具体的 spec 条目或 design 决策作为参照，不是泛泛的"感觉有问题"，而是"specs 第 12 行定义的行为在代码里找不到对应实现"。

对于游戏账号交易平台这种长期演进的项目，verify 还有一个间接价值：每次归档前的检查报告会随 change 一起存进 `archive/` 目录，形成一份质量审计日志。六个月后回看某个功能的开发过程，不只能看到最终的代码，还能看到当时 verify 发现了什么问题、如何处置的。这是纯代码历史无法提供的上下文。

## `/opsx:archive`：把变更固化进系统规范

### 基本用法

```Plain Text
/opsx:archive account-auto-pricing
```

同样，只有一个活跃 change 时可以省略名称。Archive 是一个 change 生命周期的终点，执行后这个变更就从"进行中"变成了"已完成"，不可逆。

---

### 归档时发生的两件事

Archive 命令做两件事，顺序固定。

#### **第一件：Delta Spec 合并进主 spec**

`openspec/changes/account-auto-pricing/specs/account/spec.md` 里的 Delta Spec 会被合并进 `openspec/specs/account/spec.md`。合并规则直接对应 Delta Spec 的三个区块：

- `ADDED` 区块里的内容追加进主 spec 的对应域，成为新的 Requirement 条目
- `MODIFIED` 区块里的内容找到主 spec 里对应的旧 Requirement，用新版本替换掉，旧版本描述（`Previously: ...`）不保留在主 spec 里，只留在 archive 目录里供回溯
- `REMOVED` 区块里标记的 Requirement 从主 spec 里删除

以账号估价功能为例，归档前后主 spec 的变化：

归档前 `openspec/specs/account/spec.md`：

```Markdown
# Account Domain Specs

## Requirements

### Requirement: Account listing
The system MUST allow sellers to create account listings...
```

归档后：

```Markdown
# Account Domain Specs

## Requirements

### Requirement: Account listing
The system MUST allow sellers to create account listings...

### Requirement: Account pricing suggestion
The system MUST provide a price suggestion when a seller creates a new listing.

#### Scenario: Normal pricing
- GIVEN a seller submits (game_type=LOL, level=150, rare_items=[skin_legendary])
- WHEN the pricing service is called with sufficient historical data
- THEN return { low: 280, mid: 350, high: 480, currency: "CNY", sample_size: 42 }
- AND response time SHALL be under 500ms at P95

#### Scenario: Insufficient data
- GIVEN fewer than 5 comparable transactions exist
- WHEN the pricing service is called
- THEN return { insufficient_data: true, low: null, mid: null, high: null }
```

Delta Spec 消失了，它的内容已经变成主 spec 的一部分。这是"活文档"的真实含义——每次功能迭代后，主 spec 自动更新，始终反映系统的当前行为。

#### **第二件：change 文件夹移入 archive 目录**

```Plain Text
openspec/changes/account-auto-pricing/     ← 消失
openspec/changes/archive/
└── 2026-04-08-account-auto-pricing/       ← 出现，带日期前缀
    ├── proposal.md
    ├── specs/
    │   └── account/
    │       └── spec.md    ← 原始 Delta Spec，完整保留
    ├── design.md
    └── tasks.md           ← 所有条目都已勾选 [x]
```

日期前缀由 OpenSpec 自动添加，格式是 `YYYY-MM-DD`。如果同一天有多个归档，按归档顺序排列，不会冲突。

---

### 多个 change 同时涉及同一个域

当两个并行进行的 change 都修改了 `account` 域的 spec，归档时会产生冲突检测：

```Plain Text
/opsx:bulk-archive

Found 2 changes ready to archive:
- account-auto-pricing  (touches specs/account/)
- account-vip-discount  (touches specs/account/)

Checking for spec conflicts...
⚠ Both changes modify specs/account/spec.md

Inspecting codebase to resolve...
Both changes are implemented. Will merge in chronological order:
1. account-auto-pricing  (created 2026-04-01)
2. account-vip-discount  (created 2026-04-05)

Archive both? [Y/n]
```

OpenSpec 会检测冲突，按创建时间的先后顺序依次合并，先归档早创建的 change，再归档晚创建的，确保合并结果的确定性。

---

### Archive 后 `openspec view` 的变化

归档完成后运行 `openspec view` 可以看到仪表盘的变化：

```Plain Text
OpenSpec Dashboard
════════════════════════════════════════════════════
Summary:
  ● Specifications:    2 specs, 5 requirements
  ● Active Changes:    0 in progress
  ● Completed Changes: 1

Specifications
────────────────────────────────────────────────────
  ▪ account      3 requirements    ← 归档后新增了 1 条
  ▪ order        2 requirements

Completed Changes
────────────────────────────────────────────────────
  ✓ account-auto-pricing  (2026-04-08)
════════════════════════════════════════════════════
```

Specifications 里的 requirement 数量增加，对应 Delta Spec 合并的结果。Active Changes 归零，Completed Changes 出现新记录。

---

### Archive 的不可逆性与 Git 的关系

Archive 操作本身没有撤销命令。但因为 `openspec/` 整个目录都是普通文件，和源代码一起受 Git 管理，任何时候都可以通过 `git revert` 回滚。

这也是 OpenSpec 设计里一个刻意的选择：不自己实现版本控制，完全依赖 Git。`openspec/specs/` 的每一次变化、`openspec/changes/archive/` 的每一次新增，都会出现在 `git log` 里，和代码变更同步提交，同步回滚，不存在 spec 和代码版本不一致的风险。

实践上，建议每次 archive 都单独提交一个 commit，commit message 用变更名称命名：

```Bash
git add openspec/
git commit -m "spec: archive account-auto-pricing"
```

这样 `git log` 就变成了一份双层历史：代码 commit 记录实现细节，spec commit 记录业务意图。未来定位某个功能是什么时候、为什么加进来的，`git log openspec/specs/account/spec.md` 就能给出清晰的答案。

---

### 完整的生命周期回顾

Archive 执行完之后，一个 change 的完整生命周期就结束了：

```Plain Text
/opsx:propose   → 建立对齐（proposal + specs + design + tasks）
/opsx:apply     → AI 按 tasks 逐条实现代码
/opsx:verify    → 对照 specs 检查完整性、正确性、一致性
/opsx:archive   → Delta Spec 合并进主 spec，change 移入 archive
```

下一个功能开发时，`openspec/specs/` 里已经有了这次功能的规格，新的 Delta Spec 在它的基础上继续叠加。随着每次迭代，主 spec 越来越完整，逐渐成为整个平台行为的权威文档——不是一次性写完就搁置的 Word 文件，而是和代码一起持续演进的活文档。

## `/opsx:explore`：先想清楚再动手

`/opsx:explore` 是一个"思考伙伴"模式，专门用于在提交变更之前探索想法和调查问题。 它是 core profile 默认激活的四个命令之一，和 propose、apply、archive 并列。

```Plain Text
/opsx:explore
/opsx:explore account-auto-pricing    ← 关联到已有 change
```

不带参数时进入自由探索模式，带 change 名称时 Claude 会先读取该 change 的已有 artifact 作为上下文。

### **explore 能做什么，不能做什么**

Explore 模式是一种"stance"（立场），不是工作流。它没有固定步骤，没有必须产出的文件，AI 可以读取文件、搜索代码、提出架构图、比较方案、创建 OpenSpec artifact——但绝对不能写应用代码或实现功能。如果用户在 explore 模式里要求实现某个功能，AI 会提醒先退出 explore 模式。

这个约束是刻意设计的。Explore 阶段的价值在于"想清楚"，如果可以顺手写代码，就会重新滑回"边聊边写"的模式，失去 SDD 的意义。

**典型对话示例**

```Plain Text
你：/opsx:explore
   游戏账号平台需要加限流，不确定用哪种方案

Claude：让我看看你现在的架构...
        [读取 Controller 层代码]

        我看到三种适合你这个栈的方案：

        1. Spring 拦截器（简单，按接口限流）
        2. Redis + Redisson 令牌桶（可扩展，支持分布式）
        3. 网关层限流（如果有 API Gateway 的话）

        你们现在的 QPS 量级是多少？高峰期是账号发布
        还是搜索浏览？

你：高峰是搜索，QPS 大概 500-1000

Claude：那 Redisson 令牌桶是最合适的。你已经在用
        Redisson 了，不需要引入新依赖。
        ┌─────────────────────────────────┐
        │ 请求 → 拦截器 → 令牌桶检查      │
        │              ↓                  │
        │         有令牌 → 放行            │
        │         无令牌 → 429 响应        │
        └─────────────────────────────────┘
        要开始写 change 吗？
        /opsx:new api-rate-limiting
```

探索结束后 Claude 会主动提议：想法成熟了可以开始一个 change。用户决定，AI 不会自动转入 propose 流程。

### **explore 和直接 propose 的选择**

Explore 适合性能优化、调试、架构决策、需求不明确的场景。需求已经清楚的功能直接用 `/opsx:propose` 更快。 判断标准很简单：如果你知道要做什么，跳过 explore；如果你只知道有个问题要解决，但不确定怎么解，先 explore。

### **关联到已有 change**

Explore 还有一个容易被忽视的用法：在 apply 执行过程中遇到预料之外的复杂情况时，用它来深入调查：

```Plain Text
你：/opsx:explore account-auto-pricing
   task 2.2 的缓存实现遇到了问题，
   发现 levelBucket 的分桶粒度导致命中率很低

Claude：[读取 account-auto-pricing 的 design.md 和 tasks.md]
        你现在在 task 2.2。让我看看分桶策略的问题...
        [分析代码和历史成交数据分布]

        问题在于 LOL 账号等级集中在 100-200 段，
        按 50 级分桶导致这段的数据都混在一起，
        样本量虽然够，但价格区间太宽，参考价值低。

        建议两个方向：
        A. 热门等级段细化分桶（50→10 级）
        B. 改用百分位分桶，自适应数据分布

        要更新 design.md 然后继续吗？
```

这是 explore 最有价值的使用场景之一：不是在实现前探索，而是在实现中途遇到问题时用来分析和决策，然后带着新的理解回去更新 design 和 tasks，继续 apply

## `/opsx:onboard`：存量代码库的第一次 SDD 仪式

### 为什么存量项目需要特殊处理

全新项目用 OpenSpec 很自然——每个功能从 propose 开始，spec 随着功能一起生长，最终 `openspec/specs/` 里的内容和代码库完全同步。

存量项目面对的是另一个局面。交易平台项目已经跑了一段时间，账号发布、订单流转、支付对账这些核心流程早就实现了，但没有任何 spec 文件。这时候直接跑 `/opsx:propose` 开始新功能，新功能的 Delta Spec 里 `MODIFIED` 区块会找不到主 spec 里的对应条目，`/opsx:verify` 也没有基准可以对照。

`/opsx:onboard` 解决的正是这个冷启动问题：**在没有任何既有 spec 的情况下，引导你走完第一次完整的 SDD 流程，同时建立起 `openspec/specs/` 的初始基础。**

---

### 执行过程：11 个阶段，约 15 分钟

`/opsx:onboard` 是一个交互式引导流程，用你的实际代码库作为素材，带你走完一次从头到尾的完整 OpenSpec 流程。

执行命令：

```Plain Text
/opsx:onboard
```

Claude 会按照以下顺序引导你：

#### **阶段一：扫描代码库，识别业务域**

Claude 读取项目的包结构、Controller 层、Service 层和数据库 schema，自动识别出主要的业务域：

```Plain Text
Scanning your codebase...

Detected business domains:
  - account    (AccountController, AccountService, account_listing 表)
  - order      (OrderController, OrderService, order 表)
  - payment    (PaymentController, PaymentService, payment_record 表)
  - user       (UserController, AuthService, user 表)

Does this look right? [Y/n]
```

#### **阶段二：选择一个小改动作为练习素材**

Onboard 不会试图把整个代码库的所有行为都文档化——那是一个无底洞。它的策略是**找一个真实的小改动**，带你走完完整的 SDD 流程，顺带建立起第一批 spec 文件：

```Plain Text
Let's find something small to improve in your codebase.

I noticed a few opportunities:
  1. AccountController 的参数校验逻辑分散，可以统一
  2. OrderService 里有一个 TODO: 添加超时订单自动取消
  3. 搜索接口缺少分页参数的边界校验

Which would you like to work on? (or describe your own)
```

选择一个，或者直接描述你自己想做的改动。

#### **阶段三到七：依次生成 artifact**

和正常的 SDD 流程完全一样——proposal、specs、design、tasks 依次生成，每个阶段 Claude 都会停下来让你确认或修改。和 `/opsx:ff` 不同，onboard 在每个 artifact 之间都有解释，告诉你这个文件的作用是什么、为什么要这样写。

对于初次接触 OpenSpec 的人，这些解释本身就是学习材料。

#### **阶段八：实现代码**

```Plain Text
Now let's implement the change. Running /opsx:apply...

✓ 1.1 统一参数校验注解
✓ 1.2 提取公共校验工具类
✓ 2.1 添加对应单元测试
All tasks complete!
```

#### **阶段九：验证**

```Plain Text
Running /opsx:verify...

COMPLETENESS ✓ 全部任务已完成
CORRECTNESS  ✓ 实现与 spec 一致
COHERENCE    ✓ 与 design 一致

Ready to archive.
```

#### **阶段十：归档**

```Plain Text
Running /opsx:archive...

✓ Merged specs into openspec/specs/account/spec.md
✓ Archived to openspec/changes/archive/2026-04-08-account-validation/
```

#### **阶段十一：回顾与下一步**

```Plain Text
Onboarding complete! Here's what we built:

  openspec/specs/account/spec.md    ← 第一份主 spec，2 个 Requirement
  .claude/skills/                   ← 已配置的 OpenSpec 命令

Your codebase is now OpenSpec-ready. Next steps:
  - Run /opsx:propose for your next feature
  - Continue adding specs for other domains as you work
```

---

### 已有代码库的核心策略：增量建档

Onboard 结束后，`openspec/specs/` 里只有一个域的一两条 Requirement，远远不能覆盖整个平台的现有行为。这是刻意的设计。

对于存量项目，OpenSpec 的建议策略是：不要试图一次性把所有现有行为都写成 spec，而是随着每次功能迭代，把涉及的域顺带文档化。

具体来说，开发新功能"账号估价"时，Delta Spec 里的 `MODIFIED` 区块会引用"账号发布"这个已有行为——这时候顺手把"账号发布"的基础行为补进主 spec，作为 Delta Spec 的前提。归档后，`openspec/specs/account/spec.md` 就同时包含了旧行为和新行为的规格。

六个月下来，每次迭代都顺带建档，`openspec/specs/` 会自然地覆盖最高频的业务域，而那些从未被修改过的边缘功能就算没有 spec 也无关紧要——它们稳定运行，不需要 AI 辅助理解。

这个策略叫"按需建档"，比"一次性全量文档化"要现实得多，也更符合存量项目的实际节奏。

---

### 如果不想走 onboard 流程

对于已经熟悉 SDD 流程、只是想快速给存量代码库建立初始 spec 的情况，可以跳过 onboard，直接手写第一批主 spec 文件：

```Bash
mkdir -p openspec/specs/account
touch openspec/specs/account/spec.md
```

然后用已有的业务知识填写，格式和 Delta Spec 类似，但不需要 `ADDED/MODIFIED/REMOVED` 区块——主 spec 直接写 Requirement 和 Scenario：

```Markdown
# Account Domain Specs

## Requirements

### Requirement: Account listing creation
The system MUST allow authenticated sellers to create account listings.

#### Scenario: Valid listing submission
- GIVEN an authenticated seller
- WHEN submitting account attributes (game_type, level, server, rare_items)
- THEN a listing is created with status PENDING_REVIEW
- AND the seller receives a listing ID
```

这份手写的主 spec 不需要完整，把最核心的几条 Requirement 写进去就够了。后续每次迭代的 Delta Spec 在它的基础上叠加，主 spec 会越来越完整。

Onboard 和手写主 spec 的选择标准很简单：如果你对 OpenSpec 的流程还不熟悉，走 onboard；如果你已经看完了前面几篇文章，直接手写主 spec 更快。两条路的终点是一样的——`openspec/specs/` 里有了初始基础，后续的 SDD 流程可以正常运转。

---

## 强力辅助

### `/opsx:sync`：保持 artifact 和代码同步

`/opsx:sync` 属于 expanded workflow 命令集。 它解决一个在 apply 过程中常见的漂移问题：实现过程中发现原来的设计有问题，直接改了代码，但 tasks.md 或 design.md 还没更新，导致 artifact 和代码不一致。

```Plain Text
/opsx:sync account-auto-pricing
```

Sync 会扫描当前已实现的代码，对照 tasks.md 的勾选状态，找出"代码里已经有了但 tasks.md 没有勾选的"以及"tasks.md 里勾选了但代码里找不到对应实现的"两类不一致，输出一份同步建议报告，然后让你确认是否更新。

典型使用场景是在 apply 执行到一半时，发现某个 task 的实现比预期复杂，拆成了两个函数而不是一个，导致 tasks.md 里的描述已经不准确了。sync 可以把实际实现状态重新反映到 artifact 里，让 verify 有准确的基准可以检查。

---

### `/opsx:bulk-archive` 批量归档多个已完成 change

### 当并行推进了多个 change，都完成了 verify，需要一次性归档时

```Plain Text
/opsx:bulk-archive
```

Bulk-archive 会先列出所有已完成的 change，验证各自的 specs 是否存在冲突，如果多个 change 同时修改了同一个域的 spec，会检测冲突并给出合并顺序建议，确认后再依次归档。

```Plain Text
Found 3 completed changes:
  - account-auto-pricing   (9/9 tasks complete)
  - order-refund-flow      (6/6 tasks complete)
  - search-filter-v2       (4/4 tasks complete)

Checking for spec conflicts...
⚠ account-auto-pricing 和 search-filter-v2 都涉及 specs/account/

Inspecting to resolve...
Will merge in chronological order:
  1. account-auto-pricing  (created 2026-04-01)
  2. search-filter-v2      (created 2026-04-03)
  3. order-refund-flow     (no conflicts)

Archive all 3? [Y/n]
```

确认后依次归档，每个 change 的 Delta Spec 按顺序合并进对应的主 spec，保证合并结果的确定性。