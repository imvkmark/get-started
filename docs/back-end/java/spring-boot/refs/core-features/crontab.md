---
description: 'Spring Boot未定义Executor时自动配置AsyncTaskExecutor：启用虚拟线程（Java 21+且spring.threads.virtual.enabled=true）使用SimpleAsyncTaskExecutor，否则使用ThreadPoolTaskExecutor。该执行器自动服务于@EnableAsync、Spring for GraphQL的Callable处理、Spring MVC异步请求和WebFlux阻塞执行。若自定义Executor，则常规异步任务和GraphQL使用它，但Spring MVC/WebFlux仅当其为AsyncTaskExecutor实现时才使用。'
lastUpdated: '2026-06-20 12:16:16'
head:
  - - meta
    - name: 'og:title'
      content: '任务执行与调度 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Spring Boot未定义Executor时自动配置AsyncTaskExecutor：启用虚拟线程（Java 21+且spring.threads.virtual.enabled=true）使用SimpleAsyncTaskExecutor，否则使用ThreadPoolTaskExecutor。该执行器自动服务于@EnableAsync、Spring for GraphQL的Callable处理、Spring MVC异步请求和WebFlux阻塞执行。若自定义Executor，则常规异步任务和GraphQL使用它，但Spring MVC/WebFlux仅当其为AsyncTaskExecutor实现时才使用。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/core-features/crontab.html'
---
# 任务执行与调度

如果上下文中没有定义 `Executor` bean，Spring Boot 会自动配置一个 `AsyncTaskExecutor`。当启用虚拟线程时（使用 Java 21+ 并将 `spring.threads.virtual.enabled` 设置为 `true`），它将使用虚拟线程的 `SimpleAsyncTaskExecutor`。否则，它将使用具有合理默认设置的 `ThreadPoolTaskExecutor`。在这两种情况下，自动配置的执行器将自动用于以下功能：

- 异步任务执行（`@EnableAsync`）
- Spring for GraphQL 处理控制器方法返回的 `Callable` 值时的异步操作
- Spring MVC 的异步请求处理
- Spring WebFlux 的阻塞执行支持

::: tip 💡
如果您在上下文中定义了自定义的 `Executor`，常规的任务执行（即 `@EnableAsync`）和 Spring for GraphQL 将使用它。然而，Spring MVC 和 Spring WebFlux 只会在其为 `AsyncTaskExecutor` 实现时使用它（名为 `applicationTaskExecutor`）。根据您的目标配置，您可以将 `Executor` 转换为 `AsyncTaskExecutor`，或者定义一个 `AsyncTaskExecutor` 和一个包装自定义 `Executor` 的 `AsyncConfigurer`
:::

自动配置的 `ThreadPoolTaskExecutorBuilder` 允许您轻松创建实例，以复现自动配置的默认行为。当自动配置 `ThreadPoolTaskExecutor` 时，线程池使用 8 个核心线程，这些线程可以根据负载进行扩展和收缩。这些默认设置可以通过 `spring.task.execution` 命名空间进行微调，如下例所示：

```Plaintext
spring.task.execution.pool.max-size=16
spring.task.execution.pool.queue-capacity=100
spring.task.execution.pool.keep-alive=10s
```

这会将线程池更改为使用有界队列，以便当队列满（100个任务）时，线程池将增加至最多16个线程。线程池的收缩更加激进，因为当线程空闲超过10秒（而不是默认的60秒）时，线程会被回收。

如果需要将调度器与计划任务执行关联（例如使用 @EnableScheduling），调度器也可以自动配置。

如果启用了虚拟线程（使用 Java 21+ 并将 `spring.threads.virtual.enabled` 设置为 `true`），则会使用虚拟线程的 `SimpleAsyncTaskScheduler`。这个 `SimpleAsyncTaskScheduler` 会忽略任何与线程池相关的配置属性。

如果没有启用虚拟线程，则会使用具有合理默认设置的 `ThreadPoolTaskScheduler`。`ThreadPoolTaskScheduler` 默认使用一个线程，并且其设置可以通过 `spring.task.scheduling` 命名空间进行微调，如下例所示：

```Plaintext
spring.task.scheduling.thread-name-prefix=scheduling-
spring.task.scheduling.pool.size=2
```

如果需要创建自定义的执行器或调度器，`ThreadPoolTaskExecutorBuilder`、`SimpleAsyncTaskExecutorBuilder`、`ThreadPoolTaskSchedulerBuilder` 和 `SimpleAsyncTaskSchedulerBuilder` 这几个 bean 会被提供到上下文中。如果启用了虚拟线程（使用 Java 21+ 并将 `spring.threads.virtual.enabled` 设置为 `true`），则 `SimpleAsyncTaskExecutorBuilder` 和 `SimpleAsyncTaskSchedulerBuilder` 这两个 bean 会自动配置为使用虚拟线程