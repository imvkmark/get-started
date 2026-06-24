---
description: '本文描述了使用规范驱动开发（SDD）结合Claude Code开发游戏账号交易平台“账号估价”功能的流程，包括提出变更、快进生成全部工件、实现、验证和归档五个步骤。其本质是通过需求规范自动化驱动代码生成与迭代，提升开发效率与一致性。'
lastUpdated: '2026-06-22 00:54:13'
head:
  - - meta
    - name: 'og:title'
      content: '⑦ 实战：与 Claude Code 结合 用 SDD 开发游戏账号交易平台的"账号估价"功能'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文描述了使用规范驱动开发（SDD）结合Claude Code开发游戏账号交易平台“账号估价”功能的流程，包括提出变更、快进生成全部工件、实现、验证和归档五个步骤。其本质是通过需求规范自动化驱动代码生成与迭代，提升开发效率与一致性。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/openspec/7-with-claude-code-sample.html'
---
# ⑦ 实战：与 Claude Code 结合 用 SDD 开发游戏账号交易平台的"账号估价"功能

这篇文章以游戏账号交易平台为例，演示一个完整的 SDD 开发周期。选用的功能是**账号自动估价**：卖家发布账号时系统根据账号属性（游戏类型、等级、稀有道具等）给出参考价格区间。

---

### 准备工作

假设项目已经是一个运行中的 Spring Boot 3.2 + MyBatis Plus 存量代码库，先做一次性初始化：

```Bash
npm install -g @fission-ai/openspec
cd game-account-trading-platform
openspec init --tools claude
```

`init` 会扫描项目根目录，发现已有 `.claude/` 目录后自动选中 Claude 工具，生成以下结构：

```Plain Text
openspec/
├── specs/           ← 空的，存量项目从零开始建
├── changes/         ← 每次变更的工作区
└── config.yaml

.claude/
└── skills/
    ├── openspec-propose.md
    ├── openspec-apply.md
    └── openspec-archive.md   ← 生成的 Claude Code Skill
```

---

### 第一步：提出变更（propose）

在 Claude Code 的对话里执行：

```Plain Text
/opsx:propose account-auto-pricing
```

Claude 会追问你几个问题来填充 `proposal.md`，你的回答可以是这样的：

> 卖家在发布账号时往往不知道定价多少合适，导致要么定价过高长期挂单，要么定价过低损失收益。我希望系统在发布页面提供一个"参考价格区间"，基于同类账号的历史成交数据计算得出。

OpenSpec 生成 `openspec/changes/account-auto-pricing/proposal.md`：

```Markdown
# Proposal: account-auto-pricing

## Problem
卖家发布账号时缺乏定价参考，导致滞销或低价损失。

## Solution
在账号发布流程中新增估价服务，根据账号属性查询历史成交均价，
返回建议价格区间（低价/均价/高价），前端展示为参考区间组件。

## Success criteria
- 卖家发布账号时能看到估价区间
- 估价响应时间 < 500ms（P95）
- 估价与实际成交价偏差在 ±30% 以内（首版可放宽）

## Out of scope
- 机器学习模型（首版用规则+统计）
- 实时竞品价格抓取
```

---

### 第二步：快进生成全部 Artifact（ff）

```Plain Text
/opsx:ff account-auto-pricing
```

Claude 依次生成三个文件，这是真正建立"共识"的核心过程。

**`specs/account/spec.md`（Delta Spec）**

```Markdown
# Delta for Account Domain

## ADDED Requirements

### Requirement: Account pricing suggestion
The system MUST provide a price suggestion when a seller creates a new listing.

#### Scenario: Seller requests pricing suggestion
- GIVEN a seller submits account attributes (game_type, level, rare_items[])
- WHEN the pricing service is called
- THEN the system SHALL return { low: number, mid: number, high: number, currency: "CNY" }
- AND the response time SHALL be under 500ms at P95

#### Scenario: Insufficient historical data
- GIVEN fewer than 5 comparable transactions exist
- WHEN the pricing service is called
- THEN the system SHALL return { low: null, mid: null, high: null, insufficient_data: true }
- AND the seller SHALL be informed that data is insufficient
```

**`design.md`**

```Markdown
# Design: account-auto-pricing

## Architecture
新增 PricingService，调用链：
AccountController → PricingService → PricingRepository（MyBatis Plus）→ Redis 缓存层

## Key decisions
1. 算法：取过去 90 天同类账号成交价，计算 P25/P50/P75 分位数作为低/均/高价
2. 缓存：以 (game_type, level_bucket) 为 key，Redisson 缓存 30 分钟
3. 降级：Redis 不可用时直接查 DB，超时则返回 insufficient_data

## API
GET /api/v1/accounts/pricing?game_type=LOL&level=150&rare_items=skin_legendary
Response: { low: 280, mid: 350, high: 480, currency: "CNY", sample_size: 42 }

## Data model
复用现有 account_transaction 表，新增联合索引：
INDEX idx_pricing (game_type, level, sold_at)
```

**`tasks.md`**

```Markdown
# Tasks: account-auto-pricing

## 1. 数据层
- [ ] 1.1 account_transaction 表新增索引 idx_pricing
- [ ] 1.2 PricingRepository.findComparablePrices(gameType, levelBucket, days)

## 2. 服务层
- [ ] 2.1 PricingService.suggest(AccountPricingQuery) → PricingResult
- [ ] 2.2 Redisson 缓存封装（TTL 30min，key 规则见 design.md）
- [ ] 2.3 降级逻辑：DB 超时 200ms → insufficient_data

## 3. 接口层
- [ ] 3.1 GET /api/v1/accounts/pricing Controller
- [ ] 3.2 参数校验（game_type 枚举、level 范围 1-9999）

## 4. 测试
- [ ] 4.1 PricingServiceTest：正常场景 / 数据不足场景 / Redis 降级场景
- [ ] 4.2 集成测试：接口响应时间断言 < 500ms
```

---

### 第三步：实现（apply）

```Plain Text
/opsx:apply account-auto-pricing
```

Claude Code 拿着这份 spec + design + tasks 开始写代码，逐条勾选 tasks.md 里的条目。因为 `design.md` 已经明确了调用链、缓存策略和降级逻辑，Claude 不需要猜测你的意图，直接按图索骥

生成的 `PricingService` 核心片段大致如下：

```Java
@Service
@RequiredArgsConstructor
public class PricingService {

    private final PricingRepository pricingRepository;
    private final RedissonClient redissonClient;

    private static final int MIN_SAMPLE_SIZE = 5;
    private static final long CACHE_TTL_MINUTES = 30;

    public PricingResult suggest(AccountPricingQuery query) {
        String cacheKey = buildCacheKey(query);
        RBucket<PricingResult> bucket = redissonClient.getBucket(cacheKey);

        PricingResult cached = bucket.get();
        if (cached != null) return cached;

        List<BigDecimal> prices = pricingRepository
            .findComparablePrices(query.getGameType(), query.getLevelBucket(), 90);

        if (prices.size() < MIN_SAMPLE_SIZE) {
            return PricingResult.insufficient();
        }

        PricingResult result = calculatePercentiles(prices);
        bucket.set(result, CACHE_TTL_MINUTES, TimeUnit.MINUTES);
        return result;
    }
    // ...
}
```

这段代码完全对应 `design.md` 里的决策，不是 Claude 自由发挥出来的结果，而是 spec 驱动的必然输出。

---

### 第四步：验证（verify）

```Plain Text
/opsx:verify account-auto-pricing
```

Claude 对照 `specs/` 和 `tasks.md` 做三项检查，输出类似：

```Plain Text
COMPLETENESS
✓ 全部 8 个 tasks 已勾选
✓ Scenario "Insufficient historical data" 有对应测试覆盖

CORRECTNESS  
✓ 返回结构 { low, mid, high, currency, sample_size } 与 spec 一致
⚠ P95 响应时间断言在集成测试中使用了固定 sleep，建议改为 Micrometer 实际采样

COHERENCE
✓ 缓存 key 规则与 design.md 一致
✓ 降级逻辑触发条件与设计文档匹配

SUMMARY: 0 critical issues, 1 warning
Ready to archive: Yes
```

警告不阻断流程，但给了你一个明确的改进点。这是 SDD 的副产品：每次归档前都有一份自动生成的质量报告留在变更记录里。

---

### 第五步：归档（archive）

```Plain Text
/opsx:archive account-auto-pricing
```

归档做两件事：

- 把 `changes/account-auto-pricing/specs/` 里的 Delta Spec 合并进 `openspec/specs/account/spec.md`
- 然后把整个 change 文件夹移动到 `openspec/changes/archive/2026-04-07-account-auto-pricing/`。

合并后的主 spec 就成了这个系统的**活文档**——它不是写完就搁置的 Word 文档，而是随每次功能迭代持续生长的需求基准。下一个功能开发"账号价格走势图"时，写 Delta Spec 直接在 `MODIFIED` 区块里引用这次建立的 `Account pricing suggestion` 需求。

---

### 整个流程的本质

OpenSpec 做的不是文档化，是**强制在写代码之前进行一次结构化的人机对话**

- `proposal.md` 是你和 Claude 确认"要解决什么问题"
- `specs/` 是确认"什么行为算完成"
- `design.md` 是确认"技术方案是什么"
- `tasks.md` 是把抽象方案分解成 Claude 可以逐条执行的原子动作

等到 `/opsx:apply` 的时候，Claude Code 面对的不再是一句模糊的"帮我做个估价功能"，而是一份有约束、有验收标准、有技术边界的完整上下文。这是 Claude Code 课程里值得单独展开的工程化思维：与其花精力在 prompt 里描述清楚意图，不如花更少的精力把意图固化成结构化文档，让每一次 AI 调用都从同一份基准出发