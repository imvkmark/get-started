# 源码阅读 - 初始 : (2)  初始化 App

## 初始化 Application

根据指定的路径来初始化应用, 原始码

```php
$app = new Illuminate\Foundation\Application(
	realpath(__DIR__ . '/../')
);
```

**Illuminate/Foundation/Application::__construct()**

```php
// 1) 注册基本绑定
$this->registerBaseBindings();
// 2) 注册服务提供者
// 如果存在 register 方法, 则执行并且标记为已经注册过. 如果系统已经启动, 则直接运行 boot 方法
$this->registerBaseServiceProviders();
// 3) 注册核心 Alias
$this->registerCoreContainerAliases();
```

### 1) 注册基本绑定

```php
# 1) 实例化 app
$this->instance('app', $this);
# 实例化 container => app
$this->instance(Container::class, $this);
# 2) 实例化 PackageManifest
$this->instance(PackageManifest::class, new PackageManifest(...));
```

#### 1-1) 实例化 app

**实例化 App[Application::instance()]**

这里拿 `('app', $this)`为例子来阅读源码

```php
// 移除抽象关联
$this->removeAbstractAlias($abstract);
// 确定给定的抽象类型是否已经绑定
// 已经设定 Alias
$isBound = $this->bound($abstract);
// 移除关联
unset($this->aliases[$abstract]);
// 检测此类型是否被绑定过, 如果已经绑定会重新触发绑定并且更新类
// 实例化 instances['app'] = $this
$this->instances[$abstract] = $instance;
// 重新绑定
if ($isBound) {
    $this->rebound($abstract);
    // 1) make -> alias (resolve)
    # $this->make($abstract)
    
    // 触发回调
    # foreach ($this->getReboundCallbacks($abstract) as $callback) {
    #     call_user_func($callback, $this, $instance);
    # }
}
```

#### 1-2) 实例化 PackageManifest

### 2) 注册事件处理

```php
// 注册事件处理器
$this->register(new EventServiceProvider($this));
// 注册日志服务
$this->register(new LogServiceProvider($this));
// 注册路由服务
$this->register(new RoutingServiceProvider($this));
```

#### 2-1) Application::register() 方法

```php
/* sample service providers
$this->serviceProviders = [
    Illuminate\Events\EventServiceProvider Object
    Illuminate\Log\LogServiceProvider Object
    Illuminate\Routing\RoutingServiceProvider Object
];
*/
// 获取注册的对象, 传递($provider) 可以是对象/字串
if (($registered = $this->getProvider($provider)) && ! $force) {
    return $registered;
}
// 如果给定的 provider 是字串, 则返回实例化的对象.
if (is_string($provider)) {
    $provider = $this->resolveProvider($provider);
    # new $provider($this)
}
// 检测给定的对象是否存在 register 方法, 存在则执行 register 方法并标注为已注册
if (method_exists($provider, 'register')) {
    $provider->register();
}
$this->markAsRegistered($provider);
// todo - 什么时候启动
// 如果应用已经启动, 我们便有机会启动 ServiceProvider 的 boot 逻辑, 便于开发者持续开发
if ($this->booted) {
    $this->bootProvider($provider);
    # 启动 boot 方法
    # if (method_exists($provider, 'boot')) {
    #     return $this->call([$provider, 'boot']);
    # }
}
return $provider;
```

#### 2-2) EventServiceProvider

```
// 注册事件触发器, 并且配置队列执行
$this->app->singleton('events', function ($app) {
    return (new Dispatcher($app))->setQueueResolver(function () use ($app) {
        return $app->make(QueueFactoryContract::class);
    });
});
```

#### 2-3) LogServiceProvider

```
// 注册日志
$this->app->singleton('log', function () {
    return $this->createLogger();
});
```

#### 2-4) RoutingServiceProvider

```
// 注册路由
$this->registerRouter();
// url 生成
$this->registerUrlGenerator();
// 定向器
$this->registerRedirector();
// psr 请求
$this->registerPsrRequest();
// psr 响应
$this->registerPsrResponse();
// 响应工厂
$this->registerResponseFactory();
// 控制器触发器
$this->registerControllerDispatcher();
```

### 3) 注册 Alias

将指定的类和 app 示例做绑定

```php
$allAlias = [
    'app'                  => [
    	\Illuminate\Foundation\Application::class, 
    	\Illuminate\Contracts\Container\Container::class, 
    	\Illuminate\Contracts\Foundation\Application::class,  
    	\Psr\Container\ContainerInterface::class
    ],
    ...
    'view'                 => [
    	\Illuminate\View\Factory::class, 
    	\Illuminate\Contracts\View\Factory::class
    ],
];
        
foreach($allAlias = as $key => $aliases) {
    foreach ($aliases as $alias) {
        // key   : app
        // alias : Illuminate\Foundation\Application::class
        $this->alias($key, $alias);
    }
}
```

#### 3-1) 系统 alias 项目

```php
$alias = [
    'app'                  => [
    	\Illuminate\Foundation\Application::class, 
    	\Illuminate\Contracts\Container\Container::class, 
    	\Illuminate\Contracts\Foundation\Application::class,  
    	\Psr\Container\ContainerInterface::class
    ],
    'auth'                 => [
    	\Illuminate\Auth\AuthManager::class, 
    	\Illuminate\Contracts\Auth\Factory::class
    ],
    'auth.driver'          => [
    	\Illuminate\Contracts\Auth\Guard::class
    ],
    'blade.compiler'       => [
    	\Illuminate\View\Compilers\BladeCompiler::class
    ],
    'cache'                => [
    	\Illuminate\Cache\CacheManager::class, 
    	\Illuminate\Contracts\Cache\Factory::class
    ],
    'cache.store'          => [
    	\Illuminate\Cache\Repository::class, 
    	\Illuminate\Contracts\Cache\Repository::class
    ],
    'config'               => [
    	\Illuminate\Config\Repository::class, 
    	\Illuminate\Contracts\Config\Repository::class
    ],
    'cookie'               => [
    	\Illuminate\Cookie\CookieJar::class, 
    	\Illuminate\Contracts\Cookie\Factory::class, 
    	\Illuminate\Contracts\Cookie\QueueingFactory::class
    ],
    'encrypter'            => [
    	\Illuminate\Encryption\Encrypter::class, 
    	\Illuminate\Contracts\Encryption\Encrypter::class
    ],
    'db'                   => [
    	\Illuminate\Database\DatabaseManager::class
    ],
    'db.connection'        => [
    	\Illuminate\Database\Connection::class, \Illuminate\Database\ConnectionInterface::class
    ],
    'events'               => [
    	\Illuminate\Events\Dispatcher::class, 
    	\Illuminate\Contracts\Events\Dispatcher::class
    ],
    'files'                => [
    	\Illuminate\Filesystem\Filesystem::class
    ],
    'filesystem'           => [
    	\Illuminate\Filesystem\FilesystemManager::class, 
    	\Illuminate\Contracts\Filesystem\Factory::class
    ],
    'filesystem.disk'      => [
    	\Illuminate\Contracts\Filesystem\Filesystem::class
    ],
    'filesystem.cloud'     => [
    	\Illuminate\Contracts\Filesystem\Cloud::class
    ],
    'hash'                 => [
    	\Illuminate\Contracts\Hashing\Hasher::class
    ],
    'translator'           => [
    	\Illuminate\Translation\Translator::class, 
    	\Illuminate\Contracts\Translation\Translator::class
    ],
    'log'                  => [
    	\Illuminate\Log\Writer::class, 
    	\Illuminate\Contracts\Logging\Log::class, \Psr\Log\LoggerInterface::class
    ],
    'mailer'               => [
    	\Illuminate\Mail\Mailer::class, 
    	\Illuminate\Contracts\Mail\Mailer::class, 
    	\Illuminate\Contracts\Mail\MailQueue::class
    ],
    'auth.password'        => [
    	\Illuminate\Auth\Passwords\PasswordBrokerManager::class, 
    	\Illuminate\Contracts\Auth\PasswordBrokerFactory::class
    ],
    'auth.password.broker' => [
    	\Illuminate\Auth\Passwords\PasswordBroker::class, 
    	\Illuminate\Contracts\Auth\PasswordBroker::class
    ],
    'queue'                => [
    	\Illuminate\Queue\QueueManager::class, 
    	\Illuminate\Contracts\Queue\Factory::class, 
    	\Illuminate\Contracts\Queue\Monitor::class
    ],
    'queue.connection'     => [
    	\Illuminate\Contracts\Queue\Queue::class
    ],
    'queue.failer'         => [
    	\Illuminate\Queue\Failed\FailedJobProviderInterface::class
    ],
    'redirect'             => [
    	\Illuminate\Routing\Redirector::class
    ],
    'redis'                => [
    	\Illuminate\Redis\RedisManager::class, 
    	\Illuminate\Contracts\Redis\Factory::class
    ],
    'request'              => [
    	\Illuminate\Http\Request::class, \Symfony\Component\HttpFoundation\Request::class
    ],
    'router'               => [
    	\Illuminate\Routing\Router::class, 
    	\Illuminate\Contracts\Routing\Registrar::class, 
    	\Illuminate\Contracts\Routing\BindingRegistrar::class
    ],
    'session'              => [
    	\Illuminate\Session\SessionManager::class
    ],
    'session.store'        => [
    	\Illuminate\Session\Store::class, 
    	\Illuminate\Contracts\Session\Session::class
    ],
    'url'                  => [
    	\Illuminate\Routing\UrlGenerator::class, 
    	\Illuminate\Contracts\Routing\UrlGenerator::class
    ],
    'validator'            => [
    	\Illuminate\Validation\Factory::class, 
    	\Illuminate\Contracts\Validation\Factory::class
    ],
    'view'                 => [
    	\Illuminate\View\Factory::class, 
    	\Illuminate\Contracts\View\Factory::class
    ],
];
```

#### 3-2) alias 结果

```php
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
```

## singleton Kernel 和异常处理

原始代码

**step 01:singleton**

```php
$app->singleton(
	Illuminate\Contracts\Http\Kernel::class,
	App\Http\Kernel::class
);
```

**step 02:bind**

```
// 抽象类绑定到实体类
$this->bind($abstract, $concrete, true);
```

**step 03:bind code**

```
// 如果没有给定实体类型, 我们简单设置实体类型为虚拟类型, 在那之后
// 在此之后，将注册为共享的具体类型，而不需要在两个参数中强制声明它们的类
$this->dropStaleInstances($abstract);
if (is_null($concrete)) {
    $concrete = $abstract;
}
// 如果工厂不是闭包，这意味着它只是一个类名，它被绑定到这个容器中
// 我们把抽象类型包装在它自己的闭包中，以便在扩展时给我们更多的便利。
if (! $concrete instanceof Closure) {
    $concrete = $this->getClosure($abstract, $concrete);
}
$this->bindings[$abstract] = compact('concrete', 'shared');
// 如果这个类型已经存在, 我们触发重新绑定
if ($this->resolved($abstract)) {
    $this->rebound($abstract);
}
```

