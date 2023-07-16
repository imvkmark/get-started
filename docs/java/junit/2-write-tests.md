# 编写测试

下面的示例简要介绍了在 JUnit Jupiter 中编写测试的最低要求。本章的后续部分将提供有关所有可用功能的更多详细信息

<<< @/java/junit/src/FirstJupiterTest.java

## Annotations

JUnit Jupiter 支持以下注释来配置测试和扩展框架。
除非另有说明，否则所有核心注释都位于 junit-jupiter-api 模块中的 `org.junit.jupiter.api` 包中

`@Test`

表示方法是测试方法。与 JUnit4 的 `@Test` 批注不同，该批注没有声明任何属性，因为 JUnit Jupiter
中的测试扩展基于它们自己的专用批注进行操作。此类方法将被 _继承_，除非它们被`重写`

`@ParameterizedTest`

表示方法是[参数化测试](#参数化测试)。此类方法将被 _继承_，除非它们被`重写`

`@RepeatedTest`

表示方法是可以[重复运行的测试](#重复测试)。此类方法将被 _继承_，除非它们被`重写`

`@TestFactory`

表示方法是[动态测试](#动态测试)的测试工厂。此类方法将被 _继承_，除非它们被`重写`

`@TestTemplate`

表示方法是[测试用例的模板](#测试模板)，设计为根据已注册 [提供者](./5-extension-model.md#提供测试模版的调用上下文)
返回的调用上下文的数量多次调用. 此类方法将被 _继承_，除非它们被`重写`

`@TestClassOrder`

用于为带注解的测试类中的 `@Nested` 测试类配置[测试类执行顺序](#类顺序)。这样的注解是 *继承* 的

`@TestMethodOrder`

用于配置带注解的测试类的[测试方法执行顺序](#方法顺序)；类似于 JUnit4 的 `@FixMethodOrder`。这样的注释是 *继承* 的

`@TestInstance`

用于配置带注解的测试类的[测试实例生命周期](#测试实例生命周期)。这样的注释是 *继承* 的

`@DisplayName`

声明测试类或测试方法的[自定义显示名称](#显示名称)。此类批注不会被 *继承*

`@DisplayNameGeneration`

声明测试类的[自定义显示名称生成器](#显示名称生成器)。这样的注释是*继承*的

`@BeforeEach`

表示被注解的方法应在当前类的每个`@Test`，`@RepeatedTest`，`@ParameterizedTest`或`@TestFactory`方法 **之前** 执行; 类似于
JUnit4 的 `@Before`。 除非被覆盖，否则这些方法可以继承。

`@AfterEach`

表示被注解的方法应在当前类的每个`@Test`，`@RepeatedTest`，`@ParameterizedTest`或`@TestFactory`方法 **之后** 执行; 类似于
JUnit4 的 `@After`。 除非被覆盖，否则这些方法可以继承

`@BeforeAll`

表示被注解的方法应该在当前类的所有 `@Test`，`@RepeatedTest`，`@ParameterizedTest` 或 `@TestFactory` 方法**之前**执行; 类似于
JUnit4 的`@BeforeClass`。
这样的方法可以继承（除非被隐藏或覆盖），并且必须是静态的（除非使用`per-class`[测试实例生命周期](#测试实例生命周期)）

`@AfterAll`

表示被注解的方法应该在当前类的所有 `@Test`，`@RepeatedTest`，`@ParameterizedTest` 或 `@TestFactory` 方法**之后**执行; 类似于
JUnit4 的`@AfterClass`。
这样的方法可以继承（除非被隐藏或覆盖），并且必须是静态的（除非使用 `per-class` [测试实例生命周期](#测试实例生命周期)）

`@Nested`

表示被注解的类是一个非静态的[嵌套测试类](#嵌入测试)。除非使用 `per-class` [测试实例生命周期](#测试实例生命周期)
，否则 `@BeforeAll` 和 `@AfterAll`
方法不能直接在 `@Nested` 测试类中使用。 这个注解不能继承

`@Tag`

在类或方法级别声明标签，用于[过滤测试](#标签和过滤); 类似于TestNG中的test group或JUnit
4中的Categories。这个注释可以在类级别上继承，但不能在方法级别上继承。

`@Disabled`

用于[禁用](#禁用测试)测试类或测试方法; 类似于 JUnit4 的 `@Ignore`。这个注解不能*继承*

`@Timeout`

用于在测试、测试工厂、测试模板或生命周期方法的执行超过给定持续时间时使其失败。这样的注释是*继承*的

`@ExtendWith`

用于[声明式注册扩展](./5-extension-model.md#声明扩展注册)。 这个注解可以继承

`@RegisterExtension`

用于通过字段以[编程方式注册扩展](./5-extension-model.md#编程式扩展注册)。这样的字段将被*继承*，除非它们被*隐藏*

`@TempDir`

用于在生命周期方法或测试方法中通过字段注入或参数注入提供[临时目录](#临时目录扩展)；位于 `org.junit.jupiter.api.io` 包中

::: warning
有些注解当前被标记为 _实验性_ 的, 更详细的查看 [实验性 API](./7-api-evolution.md#实验性-api)
:::

## 定义

## 测试类和方法

## 显示名称

### 显示名称生成器

### 设置默认的显示名称生成器

## 断言

## 假设

## 禁用测试

## 条件测试执行

## 标签和过滤

## 测试执行顺序

### 方法顺序

### 类顺序

## 测试实例生命周期

## 嵌入测试

## 方法和构造器的依赖注入

## 测试接口和默认方法

## 重复测试

通过使用 `@RepeatedTest` 注解并指定所需的总重复次数，JUnit Jupiter
提供了将测试重复指定次数的能力。每次重复测试的调用都像是执行常规的`@Test` 方法，完全支持相同的生命周期回调和扩展。

下面的示例演示如何声明将自动重复10次的名为 `repeat()` 的测试

<<< @/java/junit/src/RepeatTestTest.java#simple

除了指定重复次数外，还可以通过`@RepeatedTest`注解的 `name`
属性为每次重复配置一个自定义显示名称。此外，显示名称可以是由静态文本和动态占位符的组合组成的模式。当前支持以下占位符:

- `{displayName}`: `@RepeatedTest` 方法的显示名称
- `{currentRepetition}`: 当前重复次数
- `{totalRepetitions}`: 重复的总次数

给定重复的默认显示名称基于以下模式生成：`"repetition {currentRepetition} of {totalRepetitions}"`。
因此，前面的 `repeatedTest()` 示例的单个重复的显示名称将是：

```
repetition 1 of 10
repetition 2 of 10
...
```

**长名称**

如果希望每个重复的名称中包含 `@RepeatedTest`
方法的显示名称，可以定义自己的自定义模式或使用预定义的 `RepeatedTest.LONG_DISPLAY_NAME`
模式。

<<< @/java/junit/src/RepeatTestTest.java#long

相当于`"{displayName} :: repetition {currentRepetition} of {totalRepetitions}"`
，这会导致重复测试的显示名称变成这样：

```
longDisplayName() :: repetition 1 of 1
...
```

**自定义名称**

<<< @/java/junit/src/RepeatTestTest.java#custom

**repetition 注入**

为了以编程方式获取有关当前重复和总重复次数的信息，开发人员可以选择将 `RepetitionInfo`
的实例注入 `@RepeatedTest` ， `@BeforeEach` 或 `@AfterEach` 方法

<<< @/java/junit/src/RepeatTestTest.java#repetition

## 参数化测试

参数化测试使用不同参数多次运行测试成为可能。它们的声明方式与常规的 `@Test`
方法类似，但使用的是 [@ParameterizedTest](https://junit.org/junit5/docs/current/api/org.junit.jupiter.params/org/junit/jupiter/params/ParameterizedTest.html)
的注解。此外，必须至少声明一个将为每个调用提供参数的源，然后在测试方法中使用这些参数。
下面的示例演示了使用 `@ValueSource` 注解将 `String` 数组指定为参数源的参数化测试。

<<< @/java/junit/src/ParameterizedTestTest.java#simple

在执行上述参数化测试方法时，每次调用都会单独上报。以下是 gradle test 的输出, 未使用官方文档的 Console Launcher

```
ParameterizedTestTest > palindrome(String) > [1] duoli PASSED
ParameterizedTestTest > palindrome(String) > [2] mark PASSED
ParameterizedTestTest > palindrome(String) > [3] 0428 PASSED
```

### 必要安装

为了使用参数化测试，需要添加对 `junit-jupiter-params` 构件的依赖项。具体请参考[依赖元数据](10-appendix.md#102-依赖元数据)

## 测试模板

`@TestTemplate`
方法不是常规的测试用例，而是测试用例的模板。为此，它被设计成根据已注册的提供者返回的调用上下文的数量被调用多次。因此，它必须与注册的 `TestTemplateInvocationContextProvider`
扩展一起使用。测试模板方法的每次调用都像执行常规 `@Test`
方法一样，完全支持相同的生命周期回调和扩展。有关使用示例，请参阅[为测试模板提供调用上下文](./5-extension-model.md#提供测试模版的调用上下文)。

:::info
[重复测试](#重复测试)和[参数化测试](#参数化测试)是测试模版的内置约定规范
:::

## 动态测试

`@Test` 用例是静态的，因为它们是在编译时完全指定的，它们的行为不能因运行时发生的任何事情而改变。假设提供了一种动态行为的基本形式，但在其表现力方面故意表现得相当有限

除了这些标准测试之外，JUnit Jupiter 还引入了一种全新的测试编程模型。这种新的测试是一种动态测试，由 `@TestFactory`
注解的工厂方法在运行时生成

与 `@Test` 方法相比，`@TestFactory` 方法本身不是测试用例，而是测试用例的工厂。
因此，动态测试是工厂的产物。从技术上讲，`@TestFactory` 方法必须返回 `DynamicNode`
实例的 `Stream` ，`Collection`，`Iterable` 或 `Iterator`。 `DynamicNode` 的可实例化的子类是 `DynamicContainer`
和 `DynamicTest`。 `DynamicContainer`
实例由一个显示名称和一个动态子节点列表组成，可以创建任意嵌套的动态节点层次结构。然后，`DynamicTest`
实例将被延迟执行，从而实现测试用例的动态甚至非确定性生成。

任何由 `@TestFactory` 返回的 `Stream` 都要通过调用 `stream.close()` 来正确关闭，使得使用诸如 `Files.lines()` 之类的资源变得安全。

与 `@Test` 方法一样，`@TestFactory` 方法不能是 `private` 或 `static`，并且可以选择声明参数，以便通过 `ParameterResolvers`
解析。

`DynamicTest` 是运行时生成的测试用例。它由显示名称和 `Executable` 组成。 `Executable` 是 `@FunctionalInterface`
，这意味着动态测试的实现可以作为
*lambda表达式* 或 *方法引用* 来提供

::: warning
动态测试的执行生命周期与标准的 `@Test` 情况完全不同。具体而言，独立的动态测试没有生命周期回调。这意味着 `@BeforeEach`
和 `@AfterEach` 方法及其相应的扩展回调函数是为 `@TestFactory` 方法执行，而不是对每个动态测试执行。
换句话说，如果你在动态测试的 lambda 表达式中访问测试实例中的字段，则在执行由同一 `@TestFactory`
方法生成的各个动态测试之间的回调方法或扩展将不会重置这些字段
:::

从 JUnit Jupiter 5.9.3 开始，动态测试必须始终由工厂方法创建；然而，在以后的版本中，注册功能可能会补充这一点。

## 超时

## 并行执行

## 内建扩展

### 临时目录扩展
