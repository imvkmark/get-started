---
description: 'Skills技能系统提供结构化目录与加载机制，支持多级目录、手动激活及与CLAUDE.md分工。通过SKILL.md定义执行前置确认、步骤模板和自检清单，强调从痛点出发而非功能。内置示例包括新建功能流程（信息确认→生成顺序→逐文件检查→整体检查→提示用户），以及Spring Boot代码审查规范（API层、事务、安全）。支持Skills API分发组织级技能，版本管理可控，并通过Subagent隔离上下文消耗。Description需精准描述触发器，避免散文。'
lastUpdated: '2026-06-17 10:11:39'
head:
  - - meta
    - name: 'og:title'
      content: 'Skills 技能系统'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Skills技能系统提供结构化目录与加载机制，支持多级目录、手动激活及与CLAUDE.md分工。通过SKILL.md定义执行前置确认、步骤模板和自检清单，强调从痛点出发而非功能。内置示例包括新建功能流程（信息确认→生成顺序→逐文件检查→整体检查→提示用户），以及Spring Boot代码审查规范（API层、事务、安全）。支持Skills API分发组织级技能，版本管理可控，并通过Subagent隔离上下文消耗。Description需精准描述触发器，避免散文。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ai/claude-code/extral-skills.html'
---
# Skills 技能系统

::: info ℹ️
自定义命令已合并到 skills 中。 `.claude/commands/deploy.md` 中的文件和 `.claude/skills/deploy/SKILL.md` 中的 skill 都会创建 `/deploy` 并以相同的方式工作。现有的 `.claude/commands/` 文件继续工作以兼容之前
:::

## 内置Skills

内置 skills 随 Claude Code 一起提供，在每个会话中都可用。与[内置命令](https://code.claude.com/docs/zh-CN/commands)不同，内置命令直接执行固定逻辑，内置 skills 是基于提示的：为 Claude 提供详细的步骤，让它使用其工具来安排工作。这意味着可以生成并行代理、读取文件并适应你的代码库。你调用的方式与调用任何其他 skill 相同：输入 `/` 后跟 skill 名称。

在下表中，`<arg>` 表示必需的参数，`[arg]` 表示可选参数

| Skill | 目的 |
|-|-|
| `/batch <instruction>` | 在代码库中并行编排大规模更改。研究代码库，将工作分解为 5 到 30 个独立单元，并呈现计划。获得批准后，在隔离的 [git worktree](https://code.claude.com/docs/zh-CN/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees) 中为每个单元生成一个后台代理。每个代理实现其单元、运行测试并打开拉取请求。需要 git 存储库。示例：`/batch migrate src/ from Solid to React` |
| `/claude-api` | 为你的项目语言（Python、TypeScript、Java、Go、Ruby、C#、PHP 或 cURL）加载 Claude API 参考资料，以及 Python 和 TypeScript 的 Agent SDK 参考。涵盖工具使用、流式传输、批处理、结构化输出和常见陷阱。当你的代码导入 `anthropic`、`@anthropic-ai/sdk` 或 `claude_agent_sdk` 时也会自动激活 |
| `/debug [description]` | 为当前会话启用调试日志记录并通过读取会话调试日志来排查问题。默认情况下调试日志处于关闭状态，除非你使用 `claude --debug` 启动，因此在会话中期运行 `/debug` 会从该点开始捕获日志。可选地描述问题以集中分析 |
| `/loop [interval] <prompt>` | 在会话保持打开状态时按间隔重复运行提示。适用于轮询部署、监督 PR 或定期重新运行另一个 skill。示例：`/loop 5m check if the deploy finished`。请参阅[按计划运行提示](https://code.claude.com/docs/zh-CN/scheduled-tasks) |
| `/simplify [focus]` | 查看你最近更改的文件以查找代码重用、质量和效率问题，然后修复它们。并行生成三个审查代理，汇总其发现并应用修复。传递文本以专注于特定问题：`/simplify focus on memory efficiency` |

## 目录结构与加载机制

之前所有的配置 `CLAUDE.md`、`MCP` 都是在告诉 Claude"这个项目是什么样的"。Skills 做的事情更进一步：告诉 Claude"在这个项目里，某类任务应该按照这套固定流程来做"。

---

#### Skills 是什么

一个 Skill 是放在 `.claude/skills/` 目录下的一个文件夹，里面包含一组相关的指令、脚本和资源。Claude Code 在启动时会扫描这个目录，把所有 Skill 的描述加载进上下文，在执行任务时根据任务类型自动选择并激活对应的 Skill。

和 CLAUDE.md 的区别在于粒度和动态性。CLAUDE.md 是静态的全局上下文，每次都全量加载。Skills 是动态的专项能力，按需激活——处理推荐系统时激活推荐相关的 Skill，处理数据库迁移时激活迁移相关的 Skill，两者互不干扰，也不会同时占用上下文。

---

#### 目录结构

```Plain Text
.claude/
└── skills/
    ├── new-feature/
    │   ├── SKILL.md          # 技能描述和激活条件（必须）
    │   ├── steps.md          # 具体执行步骤
    │   ├── templates/        # 代码模板
    │   │   ├── controller.java.tmpl
    │   │   ├── service.java.tmpl
    │   │   └── req-resp.java.tmpl
    │   └── examples/         # 示例代码
    │       └── UserController.java
    ├── db-migration/
    │   ├── SKILL.md
    │   ├── checklist.md
    │   └── scripts/
    │       └── validate-migration.sh
    ├── write-test/
    │   ├── SKILL.md
    │   └── patterns.md
    └── code-review/
        ├── SKILL.md
        └── review-criteria.md
```

每个 Skill 是一个独立的目录，目录名就是 Skill 的标识符。目录里的文件结构没有强制要求，除了 `SKILL.md` 是必须的——它是 Claude Code 识别和加载 Skill 的入口。

---

#### SKILL.md 的结构

`SKILL.md` 是每个 Skill 最重要的文件，它决定了三件事：Claude 怎么识别这个 Skill、什么时候激活它、激活后做什么。

一个完整的 `SKILL.md` 示例：

```Markdown
---
name: new-feature
description: 在项目中新建一个完整的业务功能，包含 Controller、Service、Mapper、Req/Resp 和单元测试
triggers:
  - 新建功能
  - 新增接口
  - 创建模块
  - new feature
  - add endpoint
version: 1.0.0
---

# 新建功能 Skill

## 适用场景
需要从零开始创建一个新的业务功能时使用。
覆盖从 Controller 到 Mapper 的完整垂直切片，包含单元测试。

## 执行前确认
在开始之前，先向用户确认：
1. 功能名称（用于生成类名）
2. 所属模块（user / trade / recommend / notify）
3. 主要操作类型（查询 / 创建 / 更新 / 删除）
4. 是否需要缓存
5. 是否需要发 MQ 消息

## 执行步骤
详见 steps.md

## 代码模板
详见 templates/ 目录，所有新代码必须基于模板生成，不要自由发挥结构
```

`---` 包裹的部分是 YAML frontmatter，包含机器可读的元数据：`name` 是 Skill 的唯一标识，`description` 是 Claude 判断是否激活这个 Skill 的主要依据，`triggers` 是触发关键词列表。

---

#### 加载机制

Claude Code 启动时对 Skills 的处理分三个阶段：

**扫描阶段**——遍历 `.claude/skills/` 目录，找到所有包含 `SKILL.md` 的子目录，读取每个 `SKILL.md` 的 frontmatter，建立一个 Skill 索引：名称、描述、触发词。这个索引会占用少量上下文，但比把所有 Skill 的完整内容全部加载进来要轻量得多。

**匹配阶段**——当你发出一个任务请求时，Claude 会把任务描述和 Skill 索引里的 `description` 和 `triggers` 做语义匹配。不是简单的关键词搜索，而是语义层面的相似度判断——"帮我加一个新的 REST 接口"和 `new-feature` Skill 的描述能匹配上，即使没有出现任何触发词。

**激活阶段**——匹配到合适的 Skill 之后，Claude 读取该 Skill 目录下的所有文件内容，加载进当前会话的上下文。此时 Skill 里定义的步骤、模板、示例才真正对 Claude 可见，它会按照 Skill 的指导来执行任务。

这套机制的核心优势是**按需加载**。你可以定义十几个 Skill，每次只激活和当前任务相关的一个或几个，避免所有 Skill 的内容同时占用上下文。

---

#### 多级 Skills 目录

除了项目级的 `.claude/skills/`，Skills 支持多级目录结构，加载优先级从高到低：

**用户级** `~/.claude/skills/`——跨所有项目生效，适合放通用的技术 Skill，比如"写单元测试"、"生成 API 文档"。

**项目级** `.claude/skills/`——只在当前项目生效，适合放项目专属的业务 Skill。

**附加目录**——通过 `--add-dir` 参数指定额外的 Skills 目录，适合在多个项目之间共享一套 Skills 而不想复制文件的场景：

```Bash
claude --add-dir /shared/team-skills
```

指定了附加目录后，该目录下的 Skills 和项目级 Skills 一起被加载，团队级和项目级的 Skill 库可以分开维护。

---

#### Skills 和 CLAUDE.md 的分工

两者解决不同层次的问题，应该配合而不是替代：

CLAUDE.md 放**项目认知**——这是什么项目、用什么技术栈、有哪些全局规范。这些信息是所有任务的共同前提，需要始终在上下文里。

Skills 放**任务流程**——特定类型的任务应该按什么步骤执行、用什么模板、注意什么细节。这些信息只在执行对应类型的任务时才需要，不应该永久占用上下文。

实际使用中，CLAUDE.md 告诉 Claude 项目用 MyBatis Plus、禁止 BeanUtils，`new-feature` Skill 告诉 Claude 新建功能时应该生成哪几个文件、每个文件遵循什么模板。两层信息叠加，Claude 生成的代码既符合项目规范，又有标准化的结构。

---

#### 手动激活 Skill

除了自动匹配，也可以在对话里手动指定使用某个 Skill：

```Plain Text
用 new-feature skill 帮我创建一个账号举报功能
```

```Plain Text
按照 db-migration skill 的流程，帮我新建一个给 game_account 表加索引的迁移脚本
```

显式指定在两种情况下特别有用：任务描述比较模糊，不确定自动匹配是否会选到正确的 Skill；或者想用某个特定的 Skill 处理一个看起来不那么典型的任务场景。

## 编写自定义 Skill

理解了 Skills 的结构和加载机制之后，下一步是真正动手写一个。一个写得好的 Skill 和一个写得差的 Skill，在实际使用中的效果差距可能比有 Skill 和没有 Skill 之间的差距还大。这一节从头到尾走完一个 Skill 的设计和编写过程。

---

#### 从痛点出发，不要从功能出发

很多人写第一个 Skill 时的错误是：想到什么就封装什么，结果做出来一堆形式上的 Skill，实际用起来和直接描述任务差不多。

正确的起点是问自己：**哪些任务我反复在做，而且每次都要费劲向 Claude 解释同样的背景和步骤？**

答案往往集中在几类：新建一套完整的业务代码（每次都要解释项目结构和模板）、写单元测试（每次都要说明测试框架和风格约定）、数据库迁移（每次都要提醒检查同样的几个风险点）、排查线上问题（每次都要交代日志位置和排查流程）。

这些就是值得封装成 Skill 的候选。一个好的 Skill 封装的是**重复性的领域知识**，而不只是一个任务描述。

---

#### 一个完整示例：新建业务功能

以"新建业务功能"为例，从头设计并编写一个 Skill。

**第一步：确定 Skill 的边界**

这个 Skill 应该覆盖什么，不覆盖什么。覆盖：从 Controller 到 Mapper 的完整垂直切片，含 Req/Resp、MapStruct Converter、单元测试。不覆盖：数据库表结构设计（那是另一个 Skill 的职责）、MQ 消费者（有专门的 MQ Skill）。

边界清晰，Skill 才不会变成一个什么都管但什么都管不好的大杂烩。

**第二步：创建目录结构**

```Bash
mkdir -p .claude/skills/new-feature/{templates,examples}
```

```Plain Text
.claude/skills/new-feature/
├── SKILL.md
├── steps.md
├── checklist.md
├── templates/
│   ├── Controller.java.tmpl
│   ├── Service.java.tmpl
│   ├── ServiceImpl.java.tmpl
│   ├── Mapper.java.tmpl
│   ├── Req.java.tmpl
│   ├── Resp.java.tmpl
│   ├── Converter.java.tmpl
│   └── ServiceTest.java.tmpl
└── examples/
    └── GameAccountFeature/
        ├── GameAccountController.java
        ├── GameAccountService.java
        └── GameAccountServiceImpl.java
```

**第三步：编写 SKILL.md**

```Markdown
---
name: new-feature
description: 在交易平台中新建一个完整的业务功能，生成 Controller、Service 接口、ServiceImpl、Mapper、Req、Resp、Converter 和单元测试
triggers:
  - 新建功能
  - 新增接口
  - 创建业务模块
  - 添加 API
  - new feature
  - add endpoint
  - create module
version: 1.2.0
author: duoli
---

# 新建业务功能 Skill

## 适用场景

从零创建一个新的业务功能，需要完整的垂直切片代码。
如果只是在已有功能上增加方法，不需要使用这个 Skill，直接描述需求即可。

## 执行前必须确认的信息

在开始生成任何代码之前，先向用户确认以下信息。
不要跳过这个步骤，缺少任何一项都可能导致生成的代码需要大量修改。

1. **功能名称**：用于生成类名，如"账号举报"→ `AccountReport`
2. **所属模块**：user / trade / recommend / notify
3. **包路径**：如 `com.xxx.trade.accountreport`
4. **主要操作**：列出需要的接口（查询列表、查询详情、创建、更新、删除）
5. **是否需要缓存**：如需要，说明缓存策略
6. **是否发 MQ 消息**：如需要，说明 topic 和触发时机
7. **特殊约束**：任何不符合常规的地方

## 核心规范（必须遵守）

- 所有类的结构必须严格对照 templates/ 目录下的模板
- 参照 examples/ 目录下的示例理解模板的实际应用
- 不允许自行发明项目中未使用的模式
- 完整执行步骤见 steps.md
- 生成完毕后执行 checklist.md 中的自检项
```

**第四步：编写 steps.md**

````Markdown
# 新建功能执行步骤

## 步骤 1：信息确认

完成信息确认后，整理成如下格式再开始：

```
功能名：AccountReport（账号举报）
模块：trade
包路径：com.xxx.trade.accountreport
接口：创建举报、查询举报列表（分页）、处理举报
缓存：无
MQ：举报创建后发送 TRADE_ACCOUNT_REPORTED topic
```

## 步骤 2：生成顺序

严格按以下顺序生成，后面的文件依赖前面的定义：

1. `AccountReportReq.java` 和 `AccountReportResp.java`
2. `AccountReport.java`（实体类，对照表结构）
3. `AccountReportMapper.java`
4. `AccountReportConverter.java`（MapStruct）
5. `AccountReportService.java`（接口）
6. `AccountReportServiceImpl.java`（实现）
7. `AccountReportController.java`
8. `AccountReportServiceTest.java`

## 步骤 3：每个文件生成后的检查

每生成一个文件，立即检查：
- 包名和导入是否正确
- 是否引用了不存在的类
- 命名是否符合约定（见 CLAUDE.md）

## 步骤 4：生成后整体检查

所有文件生成完毕后，运行 checklist.md 中的自检项。

## 步骤 5：提示用户

生成完毕后，告诉用户：
- 还需要手动创建的数据库表结构
- 需要在 ErrorCode 枚举里添加的错误码
- 如果有 MQ，需要在 MqConstants 里添加的 topic 常量
````

**第五步：编写代码模板**

模板是 Skill 里信息密度最高的部分，直接决定生成代码的质量。以 ServiceImpl 模板为例：

```Java
// templates/ServiceImpl.java.tmpl
package {{packagePath}};

import com.xxx.common.exception.BizException;
import com.xxx.common.exception.ErrorCode;
import com.xxx.common.result.Result;
import com.xxx.common.result.PageResp;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * {{featureName}} Service 实现
 *
 * @author {{author}}
 * @since {{date}}
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class {{className}}ServiceImpl implements {{className}}Service {

    private final {{className}}Mapper {{instanceName}}Mapper;
    private final {{className}}Converter converter;
    // 如果有缓存，在此注入 RedissonClient
    // 如果有 MQ，在此注入对应的 EventPublisher

    @Override
    @Transactional(readOnly = true)
    public {{className}}Resp getById(Long id) {
        {{entityName}} entity = {{instanceName}}Mapper.selectById(id);
        if (entity == null) {
            throw new BizException(ErrorCode.{{ERROR_CODE_NOT_FOUND}});
        }
        return converter.toResp(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResp<{{className}}Resp> page({{className}}PageReq req) {
        Page<{{entityName}}> page = {{instanceName}}Mapper.selectPage(
            new Page<>(req.getPageNum(), req.getPageSize()),
            buildQueryWrapper(req)
        );
        return PageResp.of(page, converter::toResp);
    }

    @Override
    @Transactional
    public void save({{className}}SaveReq req) {
        {{entityName}} entity = converter.toEntity(req);
        {{instanceName}}Mapper.insert(entity);
        log.info("{{featureName}}创建成功, id={}", entity.getId());
        // 如果有 MQ：eventPublisher.publishXxxCreated(entity.getId());
    }

    @Override
    @Transactional
    public void update(Long id, {{className}}UpdateReq req) {
        {{entityName}} entity = {{instanceName}}Mapper.selectById(id);
        if (entity == null) {
            throw new BizException(ErrorCode.{{ERROR_CODE_NOT_FOUND}});
        }
        converter.updateEntity(req, entity);
        {{instanceName}}Mapper.updateById(entity);
        log.info("{{featureName}}更新成功, id={}", id);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        {{entityName}} entity = {{instanceName}}Mapper.selectById(id);
        if (entity == null) {
            throw new BizException(ErrorCode.{{ERROR_CODE_NOT_FOUND}});
        }
        {{instanceName}}Mapper.deleteById(id);
        log.info("{{featureName}}删除成功, id={}", id);
    }

    private LambdaQueryWrapper<{{entityName}}> buildQueryWrapper({{className}}PageReq req) {
        return new LambdaQueryWrapper<{{entityName}}>()
            // 根据实际查询条件补充
            .orderByDesc({{entityName}}::getCreateTime);
    }
}
```

模板里用 `{{变量名}}` 标记需要替换的部分。Claude 在激活 Skill 后会读取模板，根据用户确认的信息（功能名、包路径等）把占位符替换成实际值。

**第六步：编写 checklist.md**

```Markdown
# 生成完毕自检清单

生成所有文件后，逐项检查：

## 代码正确性
- [ ] 所有 import 是否都能在项目里找到对应的类
- [ ] 包路径是否和文件实际位置一致
- [ ] MapStruct Converter 的方法签名是否和 Req/Resp/Entity 的字段匹配
- [ ] Mapper 里的 LambdaQueryWrapper 泛型是否正确

## 规范遵守
- [ ] ServiceImpl 的写操作是否都有 @Transactional
- [ ] 查询方法是否都有 @Transactional(readOnly = true)
- [ ] Controller 是否只有参数处理，无业务逻辑
- [ ] 所有写操作是否都有 INFO 日志，包含业务 ID
- [ ] 是否有返回实体类而不是 Resp 对象的接口（不允许）

## 遗漏项提示
检查完毕后，告知用户还需要手动完成的事项：
- 数据库建表 SQL
- ErrorCode 枚举新增错误码
- MqConstants 新增 topic 常量（如果有 MQ）
- application.yml 新增配置（如果有特殊配置）
```

---

#### 让 Skill 学会提问而不是乱猜

Skill 里最重要的设计决策之一：**遇到不确定的信息，提问而不是假设**。

在 SKILL.md 或 steps.md 里明确写出"执行前必须确认的信息"，并且告诉 Claude 不确认完这些信息就不要开始生成。这个约束很重要——Claude 的默认行为是尽量不打断用户直接完成任务，但在代码生成场景里，基于错误假设生成的一堆代码往往比没有代码更让人头疼。

```Markdown
## 执行前必须确认

以下信息缺失时，停止生成并向用户提问：
- 功能名称（直接影响所有类名）
- 所属模块（影响包路径和依赖关系）

以下信息可以有合理默认值，但告知用户你的假设：
- 缓存策略（默认：无缓存）
- MQ（默认：无 MQ 消息）
```

---

#### 迭代改进 Skill 的节奏

第一版 Skill 不会是最好的。实际使用几次之后，你会发现生成的代码还是有一些固定的错误或遗漏——这些就是 Skill 需要改进的地方。

建立一个简单的习惯：每次发现 Claude 用这个 Skill 生成的代码有问题，不只是在对话里纠正它，同时更新 Skill 的模板或 checklist，把这个问题的修复固化进去。几轮迭代下来，Skill 生成的代码质量会越来越接近你的标准，需要手动修改的地方越来越少。

这个过程本质上是把你的领域知识和质量标准，逐步沉淀进 Skill 的定义里。Skill 越成熟，它替你承担的认知负担就越多。

## 通过 Skills API 管理和分发组织级 Skill

#### 从个人习惯到团队规范

当你独自开发时，自定义 Skill 放在 `~/.claude/skills/` 就够了——只要自己能用到就行。但当团队规模扩大，问题随之而来：你写了一个封装公司 API 规范的 Skill，同事怎么获取最新版本？新人入职第一天，谁来告诉他有哪些 Skill 可用？某个 Skill 里的安全策略更新了，怎么同步到所有人的本地环境？

靠"口口相传"或者群里发压缩包，是管不住这件事的。Skills API 解决的正是这个问题：通过 `/v1/skills` 端点，把 Skill 提升为工作区（Workspace）级别的共享资源，所有成员通过 API 统一获取，由管理员集中版本控制。

#### Skills API 的基本模型

通过 `/v1/skills` 端点上传的自定义 Skill 在整个工作区内共享，所有成员都可以访问。这与 Claude Code 的文件系统模式截然不同——后者是每个人自己维护本地目录，前者是统一的中心化分发。

Skills API 提供工作区范围的分发能力，支持上传、版本管理和权限控制。每个 Skill 目录（包含 `SKILL.md` 及其捆绑文件）与 Git 追踪的文件夹自然对应。

理解这个模型之后，我们来看一个完整的管理流程。假设你在一个交易平台的后端团队工作，需要把「Spring Boot 代码审查规范」这个 Skill 统一下发给所有后端工程师。

#### 上传一个组织级 Skill

Skill 的结构本身没有变化，仍然是一个目录加一个 `SKILL.md`。以 Spring Boot 代码审查 Skill 为例：

```Plain Text
springboot-review/
├── SKILL.md
└── checkstyle-rules.xml
```

`SKILL.md` 内容如下：

```Markdown
---
name: springboot-review
description: 对 Spring Boot 项目进行代码审查，包括 API 设计、异常处理、事务边界和安全规范检查
---

# Spring Boot 代码审查规范

## 核心检查项

审查时必须验证以下几个关键领域：

### API 层
- Controller 方法必须使用 `@Valid` 注解校验入参
- 统一返回 `Result<T>` 包装对象，禁止直接返回裸实体
- 异常信息不得透传到响应体，使用错误码替代

### 事务管理
- `@Transactional` 只加在 Service 层，Controller 层不允许开事务
- 涉及多表写操作必须显式声明 `rollbackFor = Exception.class`
- 禁止在事务方法内调用外部 HTTP 接口

### 安全规范
- 敏感字段（手机号、身份证）必须脱敏后返回
- 账号交易金额字段必须使用 `BigDecimal`，禁止 `double`

## 示例：标准 Controller 结构

参考 checkstyle-rules.xml 执行自动化格式检查。
```

准备好目录之后，通过 API 上传：

```Bash
# 将 Skill 目录打包为 zip
zip -r springboot-review.zip springboot-review/

# 上传到工作区
curl -X POST "https://api.anthropic.com/v1/skills" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: skills-2025-10-02" \
  -F "files[]=@springboot-review/SKILL.md;filename=springboot-review/SKILL.md" \
  -F "files[]=@springboot-review/checkstyle-rules.xml;filename=springboot-review/checkstyle-rules.xml"
```

上传成功后，API 返回一个 `skill_id`，格式类似 `skill_01AbCdEfGhIjKlMnOpQrStUv`。这个 ID 是后续版本管理和调用的锚点，需要存入你的内部注册表。

#### 版本管理：让更新可控

在生产环境中，建议将 Skill 固定到特定版本，并在每次发布新版本前运行完整的评估套件，将每次更新视为需要完整审查的新部署。

版本管理的操作通过对已有 Skill 创建新版本来完成：

```Bash
# 修改 SKILL.md 后，创建新版本
NEW_VERSION=$(curl -X POST \
  "https://api.anthropic.com/v1/skills/skill_01AbCdEfGhIjKlMnOpQrStUv/versions" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: skills-2025-10-02" \
  -F "files[]=@springboot-review/SKILL.md;filename=springboot-review/SKILL.md" \
  | jq -r '.version')

echo "新版本号: $NEW_VERSION"
```

在 API 调用时指定版本，可以确保灰度发布期间不同环境使用不同版本：

```Bash
# 调用时固定版本
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: code-execution-2025-08-25,skills-2025-10-02" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 4096,
    "container": {
      "skills": [{
        "type": "custom",
        "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
        "version": "2"
      }]
    },
    "messages": [{"role": "user", "content": "审查这段 OrderService 代码"}],
    "tools": [{"type": "code_execution_20250825", "name": "code_execution"}]
  }'
```

#### 在 Spring Boot 项目中集成管理脚本

实际工程中，与其手动执行 curl 命令，不如把 Skill 的生命周期管理封装成项目脚本。下面是一个用 Java 编写的 Skill 管理客户端，适合集成到内部运维工具或 CI/CD 流水线：

```Java
@Service
public class SkillManagementService {

    private static final String API_BASE = "https://api.anthropic.com/v1";
    private static final String BETA_HEADER = "skills-2025-10-02";

    @Value("${anthropic.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    /**
     * 上传或更新一个组织级 Skill
     * @param skillDir Skill 目录路径
     * @param existingSkillId 若为 null 则创建新 Skill，否则创建新版本
     */
    public SkillUploadResult uploadSkill(Path skillDir, String existingSkillId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", "2023-06-01");
        headers.set("anthropic-beta", BETA_HEADER);
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        // 遍历目录，将所有文件加入请求体
        try (Stream<Path> files = Files.walk(skillDir)) {
            files.filter(Files::isRegularFile).forEach(file -> {
                String relativePath = skillDir.getParent()
                    .relativize(file).toString();
                body.add("files[]", new FileSystemResource(file) {
                    @Override
                    public String getFilename() {
                        return relativePath;
                    }
                });
            });
        } catch (IOException e) {
            throw new SkillUploadException("读取 Skill 目录失败", e);
        }

        String url = existingSkillId == null
            ? API_BASE + "/skills"
            : API_BASE + "/skills/" + existingSkillId + "/versions";

        HttpMethod method = existingSkillId == null
            ? HttpMethod.POST : HttpMethod.POST;

        ResponseEntity<Map> response = restTemplate.exchange(
            url, method,
            new HttpEntity<>(body, headers),
            Map.class
        );

        return SkillUploadResult.from(response.getBody());
    }

    /**
     * 查询工作区内所有已上传的 Skill
     */
    public List<SkillInfo> listWorkspaceSkills() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", "2023-06-01");
        headers.set("anthropic-beta", BETA_HEADER);

        ResponseEntity<Map> response = restTemplate.exchange(
            API_BASE + "/skills",
            HttpMethod.GET,
            new HttpEntity<>(headers),
            Map.class
        );

        List<Map<String, Object>> skills =
            (List<Map<String, Object>>) response.getBody().get("data");

        return skills.stream()
            .map(SkillInfo::from)
            .collect(Collectors.toList());
    }
}
```

配合 Spring Boot 的配置管理，可以把已发布的 Skill ID 和版本号维护在 `application.yml` 中：

```YAML
anthropic:
  api-key: ${ANTHROPIC_API_KEY}
  skills:
    springboot-review:
      skill-id: skill_01AbCdEfGhIjKlMnOpQrStUv
      version: "2"   # 固定版本，避免自动升级引发行为变化
    db-migration-helper:
      skill-id: skill_02XyZwVuTsRqPoNmLkJiHgFe
      version: "latest"  # 内部工具可跟最新版
```

#### 企业管控的关键：安全审查流程

部署企业级 Skill 需要回答两个独立问题：Skills 平台层面是否安全？以及如何评估某个具体 Skill 的风险？

在批准任何来自第三方或内部贡献者的 Skill 之前，需要完成以下步骤：阅读 Skill 目录的全部内容，确认跳转目标的合法性（若 Skill 引用外部 URL，验证其指向预期域名），并检查是否存在数据泄露模式。同时要求 Skill 评估人与作者分离，避免自审。

对于交易这类涉及资金的业务场景，这一点尤为重要。一个 Skill 如果在执行代码时能访问数据库连接字符串或支付密钥，其审查标准应该等同于审查一段生产代码。

#### 分发方式的选择

Team 和 Enterprise 计划的管理员可以通过管理员设置集中下发 Skill，管理员下发的 Skill 默认对所有用户启用，用户也可以根据自己的偏好将单个 Skill 关闭。

对于 Claude Code 用户，除了 API 上传方式，还有两条分发路径值得了解：

第一是 Git 仓库。将 Skill 目录存入 Git 作为唯一事实来源，通过 Pull Request 进行代码审查和版本回滚。团队成员克隆仓库后，将 Skill 目录软链接到 `~/.claude/skills/` 即可本地使用，更新时只需 `git pull`。这个方式最轻量，适合规模较小且技术背景一致的团队。

第二是 Plugin 机制。通过将 Skill 提交到版本控制，项目成员可以直接使用；也可以通过创建含 `skills/` 目录的 Plugin，在 Claude Code 中集中安装。这种方式可以把多个相关 Skill 打包成一个 Plugin 分发，安装命令简洁明了：

```Bash
/plugin install springboot-tools@your-org
```

---

Skills API 把 Skill 从「个人工具」升级为「组织资产」。它的价值不在于技术复杂度，而在于把团队知识沉淀下来并让它可流动：一位资深工程师提炼出的代码审查经验，通过几个 API 调用，就能成为所有人都能调用的能力。对于正在构建内部工程工具链的团队而言，这是值得投入的基础设施。

## 设计 Skill 的 token budget 与上下文策略

#### 一个容易被忽视的约束

大多数人在写完第一批 Skill 之后，不会立刻遇到问题。三个、五个 Skill，运行得很顺畅，Claude 总能找到正确的那一个。但当你认真对待 Skill 体系、开始为团队沉淀知识时，数量慢慢增加到二三十个，然后某天你忽然发现 Claude 对某个 Skill "视而不见"——你明确描述的场景，它就是没有触发。

这不是 Claude 变笨了，而是你踩到了 Skill 的 token budget 上限。

Skill 的描述字段会被加载进上下文，用于让 Claude 判断哪个 Skill 与当前任务相关。当 Skill 数量增多时，可能超出字符预算。这个预算随上下文窗口动态调整，基准值是上下文窗口的 2%，并有一个 16,000 字符的兜底上限。可以运行 `/context` 命令检查是否出现 Skill 被排除的警告。

16,000 字符，听起来不少。但一旦认真量化，你会发现它比想象中更紧张。

#### 预算的真实消耗量

社区对这个预算做了实证测量。每个 Skill 在 `available_skills` 区域中消耗的字符量由两部分组成：固定开销（XML 标签、Skill 名称、位置字段等）约 109 个字符，加上 description 字段本身的长度。预算大约在 15,700 字符时填满。

换算下来，容量与 description 长度的关系大致是这样：

| **description 长度** | **能容纳的 Skill 数量** |
|-|-|
| 263 字符（典型值） | \~42 个 |
| 200 字符 | \~52 个 |
| 150 字符 | \~60 个 |
| 130 字符 | \~67 个 |

这个数字有一个关键含义：当 63 个 Skill 安装时，系统提示中出现了 `<!-- Showing 42 of 63 skills due to token limits -->`，有 21 个 Skill（33%）被完全隐藏，Claude 既无法发现也无法调用它们。截断是按累积总量计算的，而非单个 description 的长度——被隐藏的 Skill 和被显示的 Skill，平均 description 长度几乎完全相同，这证明顺序靠后的 Skill 会被整体丢弃。

这意味着你在 `~/.claude/skills/` 里排列目录的顺序，实际上决定了哪些 Skill 有机会被 Claude 看到。

#### Description 的写法：从散文到精准触发器

理解了预算机制之后，description 的写法就不再是「描述清楚就好」，而是一个需要刻意设计的字段。

一个常见的反面写法是这样的：

```YAML
---
name: springboot-review
description: 这个 Skill 用于对 Spring Boot 项目进行全面的代码审查，
  包括检查 API 设计规范、异常处理方式、事务边界划分、
  安全配置以及代码风格等各个方面的问题，帮助团队保持
  代码质量和技术一致性。
---
```

这段 description 约 110 个汉字，换算成字符超过 110 个，且触发条件模糊。模糊的 description 会导致误触发——Claude 加载了一个并不匹配当前任务的 Skill，白白消耗上下文。description 中应该点名具体场景。

改写后的版本：

```YAML
---
name: springboot-review
description: Spring Boot 代码审查：Controller/Service 分层、
  事务边界、BigDecimal 金额、敏感字段脱敏。
  用于：review 代码、检查规范、发现潜在问题。
---
```

这个版本做了三件事：说明了 Skill 处理的技术域（Spring Boot 分层、事务、金融字段），列出了具体的触发关键词（review、检查规范、发现潜在问题），以及把字符数压缩到 80 字符以内。

对于一个 Spring Boot 后端项目，你可能同时维护多个 Skill，每个都需要这种精简写法：

```YAML
# db-migration-helper/SKILL.md
---
name: db-migration-helper
description: MyBatis Plus + Flyway 数据库迁移：
  生成 migration SQL、检查索引、处理字段变更。
  用于：添加表字段、创建索引、数据迁移任务。
---
```

```YAML
# api-doc-generator/SKILL.md
---
name: api-doc-generator
description: 从 Spring Boot Controller 生成 OpenAPI 文档。
  用于：写接口文档、生成 Swagger、补充接口注释。
---
```

#### SKILL.md 内容本身的分层策略

description 只是冰山一角。真正决定上下文效率的，是 SKILL.md 正文的组织方式。

核心原则是：**让 Skill 的正文只包含 Claude 在执行这个任务时真正需要的信息**。

一个常见的错误是把所有背景知识都塞进 SKILL.md，比如在一个代码生成 Skill 里附上完整的公司技术规范文档。这些内容在 Skill 被触发时会全部注入上下文，但实际上大部分内容对当前这次调用毫无意义。

更好的做法是按「参考型」和「任务型」两种内容分开设计。

**参考型内容**适合写轻量的原则和约束，让 Claude 把它当成背景知识：

```Markdown
---
name: order-service-conventions
description: 订单服务编码约定，写 OrderService 相关代码时自动加载。
---

# 订单服务约定

金额字段统一用 BigDecimal，精度 scale=2。
状态流转顺序：PENDING → PAID → SHIPPED → COMPLETED。
订单号生成规则：`ORD-{yyyyMMdd}-{6位序号}`，由 OrderIdGenerator 统一生成。
所有数据库操作必须经过 OrderRepository，禁止在 Service 中直接调用 Mapper。
```

这种 Skill 全文不超过 200 字，却精准传递了新人需要一周才能摸清楚的隐性规范。

**任务型内容**则需要包含完整的步骤，但要避免用大段文字解释「为什么」——原因留给 CLAUDE.md，步骤才属于 Skill：

```Markdown
---
name: add-api-endpoint
description: 在 Spring Boot 项目中新增 REST 接口的完整流程。
  用于：加接口、新增 API、实现新功能端点。
disable-model-invocation: true
---

# 新增 REST 接口

1. 在 `dto/request/` 下创建请求 DTO，加 `@Valid` 注解
2. 在 `dto/response/` 下创建响应 DTO，继承 `BaseResponse<T>`
3. 在 Controller 中添加方法，统一用 `Result<T>` 包装返回值
4. 在 Service 接口和实现类中添加业务方法
5. 在 `src/test/` 下创建对应的单元测试
6. 更新 Swagger 注解

参考现有示例：`src/main/java/com/example/controller/AccountController.java`
```

注意这里使用了 `disable-model-invocation: true`。任务型内容适合通过 `/skill-name` 直接调用，而不是让 Claude 自主判断何时运行。加上 `disable-model-invocation: true` 可以防止 Claude 在你没有明确意图时自动触发它。

#### Subagent 分叉：把上下文消耗隔离到子空间

对于计算量大、会产生大量中间结果的任务，还有另一种上下文策略：把任务分叉给 Subagent 执行，让主会话保持干净。

```Markdown
---
name: codebase-audit
description: 对整个代码库做架构合规性审查，扫描禁用模式和潜在风险。
context: fork
agent: Explore
---

对当前项目的 `src/` 目录执行以下检查：

1. 扫描所有 Controller，确认返回值是否统一使用 Result<T> 包装
2. 检查 @Transactional 是否只出现在 Service 层
3. 找出所有直接使用 double/float 存储金额的字段
4. 输出问题列表，格式：文件路径 + 行号 + 问题描述
```

`context: fork` 让任务在一个分叉的 Explore agent 中运行，Skill 内容成为该 agent 的任务，agent 只返回最终结论，主会话的上下文不会被大量的文件读取结果污染。代价是真实的：子 agent 对主 agent 的完整上下文不可见，无法进行整体性推理。在上下文隔离真正有价值的场景才使用它——平行探索、沙箱工具调用、或需要保持主会话干净的长任务。

#### 环境变量与诊断

当你需要调整默认预算，或者排查某个 Skill 为什么没有触发，有几个实用的工具：

```Bash
# 检查当前上下文状态，包括 Skill 加载情况
/context

# 临时扩大 Skill 字符预算（适合本地开发调试）
export SLASH_COMMAND_TOOL_CHAR_BUDGET=32000

# 查看当前会话的 token 消耗
/cost
```

相比把所有内容放进 CLAUDE.md 一次性加载，按需触发的 Skill 架构在实践中每次会话能节省约 15,000 token，效率提升约 82%。 这个差距在单次对话里看不出来，但对于一个每天都在运行的团队，积累下来是显著的成本和速度收益。

---

Token budget 并不是一个需要绕开的限制，而是迫使你把 Skill 设计得更精准的约束。description 是触发信号，不是说明书；SKILL.md 正文是执行指令，不是知识库。把握住这两点区别，你的 Skill 体系才能在数量增长的同时保持有效。