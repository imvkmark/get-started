---
description: '应用`make`方法执行流程：先解析别名，再处理延迟加载的Provider（注册服务提供者），最后调用父类`make`创建应用实例，其中通过`build`方法构造对象。'
lastUpdated: '2026-06-17 22:37:10'
head:
  - - meta
    - name: 'og:title'
      content: '源码阅读 Application make'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '应用`make`方法执行流程：先解析别名，再处理延迟加载的Provider（注册服务提供者），最后调用父类`make`创建应用实例，其中通过`build`方法构造对象。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/refs/reading-application-make.html'
---
# 源码阅读 Application make

```Plaintext
// 1) Alias 解析
$abstract = $this->getAlias($abstract);
// 2) 如果是延迟加载且尚未实例化
if (isset($this->deferredServices[$abstract]) && ! isset($this->instances[$abstract])) {
    $this->loadDeferredProvider($abstract);
}
// 3) parent::make
return parent::make($abstract, $parameters);
```

## 1) Alias 解析

**getAlias**

```PHP
// aliases sample
/* $this->aliases = [
    [Illuminate\Foundation\Application] => app
    [Illuminate\Contracts\Container\Container] => app
    [Illuminate\Contracts\Foundation\Application] => app
    [Psr\Container\ContainerInterface] => app
    [Illuminate\Auth\AuthManager] => auth
    [Illuminate\Contracts\Auth\Factory] => auth
    ...
]
*/
// 如果未设置
// 返回 Illuminate\Foundation\Application
if (! isset($this->aliases[$abstract])) {
    return $abstract;
}
if ($this->aliases[$abstract] === $abstract) {
    throw new LogicException("[{$abstract}] is aliased to itself.");
}
return $this->getAlias($this->aliases[$abstract]);
```

## 2) 延迟加载 Provider (loadDeferredProvider())

```PHP
// aliases sample
/* $this->deferredServices = [
    [Illuminate\Bus\Dispatcher] => Illuminate\Bus\BusServiceProvider
    [Illuminate\Contracts\Bus\Dispatcher] => Illuminate\Bus\BusServiceProvider
    [Illuminate\Contracts\Bus\QueueingDispatcher] => Illuminate\Bus\BusServiceProvider
    [cache] => Illuminate\Cache\CacheServiceProvider
    [cache.store] => Illuminate\Cache\CacheServiceProvider
    [memcached.connector] => Illuminate\Cache\CacheServiceProvider
    ...
]
*/
if (! isset($this->deferredServices[$service])) {
    return;
}
$provider = $this->deferredServices[$service];
// 如果 service provider 尚未加载, 我们可以加载这个服务, 然后从这个列表中移除
if (! isset($this->loadedProviders[$provider])) {
    // 1) 注册延迟加载的服务提供者
    $this->registerDeferredProvider($provider, $service);
}
```

### 2-1) 注册延迟加载的服务提供者

```PHP
// 已经注册, 我们会把这个东西从列表中移除
if ($service) {
    unset($this->deferredServices[$service]);
}
$this->register($instance = new $provider($this));
if (! $this->booted) {
    $this->booting(function () use ($instance) {
        $this->bootProvider($instance);
    });
}
```

## 3) parent::make 来创建应用

来源创建值

```Plaintext
$abstract   = Illuminate\Contracts\Http\Kernel::class
```

函数解析

```PHP
// 获取关联
$abstract = $this->getAlias($abstract);
$needsContextualBuild = ! empty($parameters) || ! is_null(
    $this->getContextualConcrete($abstract)
);
// 如果是单例, 我们只需要返回唯一的实例, 不需要重新创建. 保证开发者使用同一个实例
if (isset($this->instances[$abstract]) && ! $needsContextualBuild) {
    return $this->instances[$abstract];
}
$this->with[] = $parameters;
// 获取实例类型
$concrete = $this->getConcrete($abstract);
// 根据绑定来注册实例, 这个根据内部来加载到所有依赖
if ($this->isBuildable($concrete, $abstract)) {
    // 1) build
    $object = $this->build($concrete);
} else {
    // 不可创建则视为存在, 则返回
    $object = $this->make($concrete);
}
// 如果我们定义了扩展器, 我们必须应用这些修饰扩展
foreach ($this->getExtenders($abstract) as $extender) {
    $object = $extender($object, $this);
}
// 如果注册为 singleton 模式 , 我们直接返回
if ($this->isShared($abstract) && ! $needsContextualBuild) {
    $this->instances[$abstract] = $object;
}
// 触发回调
$this->fireResolvingCallbacks($abstract, $object);
// 在返回前, 需要标注标识, 并且移除 with 参数. 
$this->resolved[$abstract] = true;
array_pop($this->with);
return $object;
```

### 3-1) 使用 build 来创建对象

`Illuminate/Container/Container::build(Illuminate::class)`

```PHP
// 如果实例类型是 闭包函数, 我们执行并且返回这些对象
// 这里的 app 应该是对应的 Application,
if ($concrete instanceof Closure) {
    return $concrete($this, $this->getLastParameterOverride());
}
// 初始化映射类
$reflector = new ReflectionClass($concrete);
// 如果不能实例化, 尽早脱离出来, 不要再执行
if (! $reflector->isInstantiable()) {
    return $this->notInstantiable($concrete);
}
$this->buildStack[] = $concrete;
// 通过映射类获取构造器
$constructor = $reflector->getConstructor();
// 如果没有构造器, 我们按照类的处理方式来返回一个新建的对象
if (is_null($constructor)) {
    array_pop($this->buildStack);
    return new $concrete;
}
// 获取参数
$dependencies = $constructor->getParameters();
// 一旦我们获取所有的构造器参数, 我们能创建每一个依赖示例, 并且传入.
$instances = $this->resolveDependencies(
    $dependencies
);
array_pop($this->buildStack);
// 根据给定的参数创建新实例(这就是传说中的自动注入(-WAIT-)?)
return $reflector->newInstanceArgs($instances);
```