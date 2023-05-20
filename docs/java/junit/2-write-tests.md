# 2. 编写测试

下面的示例简要介绍了在 JUnit Jupiter 中编写测试的最低要求。本章的后续部分将提供有关所有可用功能的更多详细信息

<<< @/java/src/test/java/junit/FirstJupiterTest.java

## 2.1 Annotations

JUnit Jupiter 支持以下注释来配置测试和扩展框架。
除非另有说明，否则所有核心注释都位于 junit-jupiter-api 模块中的 `org.junit.jupiter.api` 包中

`@Test`

表示方法是测试方法。与 JUnit4 的 `@Test` 批注不同，该批注没有声明任何属性，因为 JUnit Jupiter
中的测试扩展基于它们自己的专用批注进行操作。此类方法将被 `继承`，除非它们被`重写`

`@ParameterizedTest`

表示方法是[参数化测试](#216-参数化测试)。此类方法将被 `继承`，除非它们被`重写`

`@RepeatedTest`

表示方法是重复测试的测试模板。此类方法将被 `继承`，除非它们被`重写`

## 2.15 重复测试

通过使用 `@RepeatedTest` 注解并指定所需的总重复次数，JUnit Jupiter
提供了将测试重复指定次数的能力。每次重复测试的调用都像是执行常规的`@Test` 方法，完全支持相同的生命周期回调和扩展。

下面的示例演示如何声明将自动重复10次的名为 `repeat()` 的测试

<<< @/java/src/test/java/junit/RepeatTestTest.java#simple

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

<<< @/java/src/test/java/junit/RepeatTestTest.java#long

相当于`"{displayName} :: repetition {currentRepetition} of {totalRepetitions}"`
，这会导致重复测试的显示名称变成这样：

```
longDisplayName() :: repetition 1 of 1
...
```

**自定义名称**

<<< @/java/src/test/java/junit/RepeatTestTest.java#custom

**repetition 注入**

为了以编程方式获取有关当前重复和总重复次数的信息，开发人员可以选择将 `RepetitionInfo`
的实例注入 `@RepeatedTest` ， `@BeforeEach` 或 `@AfterEach` 方法

<<< @/java/src/test/java/junit/RepeatTestTest.java#repetition


## 2.16 参数化测试

参数化测试使用不同参数多次运行测试成为可能。它们的声明方式与常规的 `@Test`
方法类似，但使用的是 [@ParameterizedTest](https://junit.org/junit5/docs/current/api/org.junit.jupiter.params/org/junit/jupiter/params/ParameterizedTest.html)
的注解。此外，必须至少声明一个将为每个调用提供参数的源，然后在测试方法中使用这些参数。
下面的示例演示了使用 `@ValueSource` 注解将 `String` 数组指定为参数源的参数化测试。

<<< @/java/src/test/java/junit/ParameterizedTestTest.java#simple

在执行上述参数化测试方法时，每次调用都会单独上报。以下是 gradle test 的输出, 未使用官方文档的 Console Launcher

```
ParameterizedTestTest > palindrome(String) > [1] duoli PASSED
ParameterizedTestTest > palindrome(String) > [2] mark PASSED
ParameterizedTestTest > palindrome(String) > [3] 0428 PASSED
```

### 2.16.1 必要安装

为了使用参数化测试，需要添加对 `junit-jupiter-params` 构件的依赖项。具体请参考[依赖元数据](10-appendix.md#102-依赖元数据)
