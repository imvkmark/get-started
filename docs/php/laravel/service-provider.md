# 「转+」深入探讨 Service Provider

原文地址 : [深入探討 Service Provider](http://oomusou.io/laravel/laravel-service-provider/)

Service Provider 是 Laravel 管理 Package 的核心技术

Laravel 提供了 `service container` 让我们方便实现 **依赖注入**，而`service provider`则是我们注册及管理 service container
的地方。

事实上 Laravel 内部所有的核心组件都是使用 service provider 统一管理，除了可以用来管理 package 外，也可以用来管理自己写的物件。

## 定义

### As Bootstrapper

我们知道 Laravel 提供了 service container，方便我们实现**SOLID**的**依赖倒转原则**，当 type hint 搭配 interface
时，需要自己下`App::bind()`，Laravel
才知道要载入什麽物件，但`App::bind()`要写在哪裡呢？Laravel 提供了`service provider`，专门负责`App::bind()`。

我们可以在`config/app.php`的`providers`看到所有的 package，事实上 Laravel 核心与其他 package 都是靠 service provider 载入。

### As Organizer

Taylor 在书中一直强调 : `不要认为只有package才会使用service provider，它可以用来管理自己的service container`
，也就是说，若因为`需求`而需要垫`interface`时，可以把
service provider 当成`Simple Factory` pattern 使用，将变化封装在 service provider 内，将来需求若有变化，只要改 service
provider 即可，其他使用该 interface
的程式皆不必修改。[Laravel: From Apprentice To Artisan](https://leanpub.com/laravel)

## 邂逅 : 安装 Package

初学者第一次接触 service provider，应该是在安装 package 时，以安装`Laravel Debugbar`为例，一开始我们会使用 composer 安装 :
22
详细请参考[如何使用 Laravel Debugbar?](http://oomusou.io/laravel/laravel-debugbar/)

```
$ composer require barryvdh/laravel-debugbar
```

接着我们会在`config/app.php`的`providers`加入`Barryvdh\Debugbar\ServiceProvider::class`。

config/app.php

```
'providers' => [
     /*
     * Laravel Framework Service Providers...
     */
    ...
     Illuminate\View\ViewServiceProvider::class,
     Barryvdh\Debugbar\ServiceProvider::class,
     /*
     * Application Service Providers...
     */
     App\Providers\AppServiceProvider::class,
     App\Providers\AuthServiceProvider::class,
     App\Providers\EventServiceProvider::class,
     App\Providers\RouteServiceProvider::class,
],
```

上半部为`Laravel Framework Service Provider`，载入 Laravel 预设的 package。

下半部为`Application Service Provider`，载入自己所使用的`service container`。

为什麽使用 composer 安装完 package 之后，还要设定 service provider 呢？

以 Laravel Debugbar 为例，使用 composer 安装完 package 之后，只是将 package 安装在`/vendor/barryvdh/laravel-debugbar`
目录下，此时 Laravel 还不知道有这个
package，必须在`config/app.php`中`注册`该 package 所提供的 service provider，Laravel 才知道 Laravel Debugbar 的存在，并在
Laravel 启动时载入时透过 Laravel Debugbar
的 service provider 去载入 Laravel Debugbar。

## 建立 Service Provider

一般来说，有 3 个地方我们会自己建立 service provider :

1. 想自己载入 package。(As Bootstrapper)
2. 想管理自己的 service container。(As Organizer)
3. 自己写 package。请参考 [如何开发自己的 Package?](http://oomusou.io/laravel/laravel-package-hello-world/)

### 自己载入 Package

#### 使用–dev 安装 package

以 Laravel Debugbar 为例，虽然可以使用 package 所提供的 service provider，并在`config/app.php`中注册，不过由于 Laravel
Debugbar 属于`开发`用的
package，因此我不希望`正式上线`主机也安装，若使用之前的安装方式，则连正式上线主机也会有 Laravel Debugbar。

```
$ composer require barryvdh/laravel-debugbar --dev
```

composer 加上`--dev`参数后，package 只会安装在`require-dev`区段，将来在正式上线主机只要下`composer install --no-dev`，就不会安装
Laravel Debugbar。

`composer require`执行完，`composer.json`内容会如下图所示 :

config.json

```
"require": {
    "php": ">=5.5.9",
    "laravel/framework": "5.1.*"
},
"require-dev": {
    "fzaninotto/faker": "~1.4",
    "mockery/mockery": "0.9.*",
    "phpunit/phpunit": "~4.0",
    "phpspec/phpspec": "~2.1",
    "laravel/homestead": "^2.1",
    "barryvdh/laravel-debugbar": "^2.0"
},
```

#### 产生 Service Provider

```
$ php artisan make:provider MyLaravelDebugbarServiceProvider
```

在`app\Providers\`目录下会建立自己的`MyLaravelServiceProvider.php`，预设会有`boot()`与`register()`。

app/Providers/MyLaravelServiceProvider.php

```
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
class MyLaravelDebugbarServiceProvider extends ServiceProvider
{
    /**
    * Bootstrap the application services.
    *
    * @return void
    */
    public function boot()
    {
        //
    }
    /**
    * Register the application services.
    *
    * @return void
    */
    public function register()
    {
        //
    }
}
```

所有的 service provider 都是继承`Illuminate\Support\ServiceProvider`，因为`ServiceProvider`是一个`abstract class`
，且定义了`register()`这个`abstract function`
，所以继承的`MyLaravelDebugbarServiceProvider`必须实作`register()`。

Illuminate/Support/ServiceProvider.php

```
namespace Illuminate\Support;
use BadMethodCallException;
abstract class ServiceProvider
{
    ...
    abstract public function register();
    ...
}
```

`register()`有两个功能 :

1. 让你手动`register`一个 service provider。
2. 让你手动将一个 interface `bind`到指定 class。

第一个功能用在`自己载入package`，第二个功能用在`管理自己的service container`，在下个范例会看到。

#### 在 register()注册

Illuminate/Support/ServiceProvider.php

```
/**
 * Register the application services.
 *
 * @return void
 */
public function register()
{
    if ($this->app->environment() == 'local')
    {
        $this->app->register('Barryvdh\Debugbar\ServiceProvider');
    }
}
```

由于 Laravel Debugbar 不适合在`正式上线`主机使用，因此我们特别判断`application enviromnent`是否为`local`，若为
local，才使用`$this->app->register()`
注册`Barryvdh\Debugbar\ServiceProvider`，这相当于在`config/app.php`的`providers`
加入`Barryvdh\Debugbar\ServiceProvider::class`。

#### 注册自己的 Service Provider

config/app.php

```
'providers' => [
     /*
     * Laravel Framework Service Providers...
     */
     Illuminate\Foundation\Providers\ArtisanServiceProvider::class,
     (略)
     /*
     * Application Service Providers...
     */
     App\Providers\AppServiceProvider::class,
     App\Providers\AuthServiceProvider::class,
     App\Providers\EventServiceProvider::class,
     App\Providers\RouteServiceProvider::class,
     App\Providers\MyLaravelDebugbarServiceProvider::class,
 ],
```

在`config/app.php`的最下方加入`App\Providers\MyLaravelDebugbarServiceProvider::class`
，载入刚刚我们自己建立的`MyLaravelDebugbarServiceProvider`。

也就是说，原本`config/app.php`是直接载入 Laravel Debugbar 提供的 service provider，现在改成载入`自己写`的 service
provider，加入了判断 application
environment，再自行载入 Laravel Debugbar 提供的 service provider，以避免在正式上线主机载入 Laravel Debugbar。

![](https://file.wulicode.com/note/2021/11-11/16-11-01892.png)

### 管理自己的 Service Container

在[如何对 Repository 做测试?](http://oomusou.io/2015/10/14/tdd-repository-testing/)中，我们曾经使用了`Repository Pattern`
搭配 controller，不过当初并没有垫
interface，现在我们加上了`PostControllerInterface`，并使用 service provider 管理。

#### 建立 Interface

app/Contracts/PostRepositoryInterface.php

```
namespace App\Contracts;
use Illuminate\Database\Eloquent\Collection;
/**
 * Interface PostRepositoryInterface
 * @package App\Contracts
 */
interface PostRepositoryInterface
{
     /**
     * 传回最新3笔文章
     *
     * @return Collection
     */
     public function getLatest3Posts();
}
```

定义`PostRepositoryInterface`，只有一个`getLatest3Post()`。

#### 实现 Interface

app/Repositories/PostRepository.php

```
namespace App\Repositories;
use App\Contracts\PostRepositoryInterface;
use App\Post;
use Illuminate\Database\Eloquent\Collection;
/**
 * Class PostRepository
 * @package App\Repositories
 */
class PostRepository implements PostRepositoryInterface
{
    /**
    * @var Post
    */
    protected $Post;
    /**
    * PostRepository constructor.
    * @param Post $Post
    */
    public function __construct(Post $Post)
    {
        $this->Post = $Post;
    }
    /**
    * 传回最新3笔文章
    *
    * @return Collection
    */
    public function getLatest3Posts()
    {
        return $this->Post
        ->query()
        ->orderBy('id', 'desc')
        ->limit(3)
        ->get();
    }
}
```

第 7 行

```
/**
 * Class PostRepository
 * @package App\Repositories
 */
class PostRepository implements PostRepositoryInterface
```

`PostRepository` class 实践了`PostRepositoryInterface`。

app/Repositories/MyRepository.php

```
namespace App\Repositories;
use App\Contracts\PostRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
/**
 * Class MyRepository
 * @package App\Repositories
 */
class MyRepository implements PostRepositoryInterface
{
    /**
    * 传回最新3笔文章
    *
    * @return Collection
    */
    public function getLatest3Posts()
    {
        $posts = new Collection();
        for ($i = 1; $i 3; $i++) {
            $post = [
                'id'        => $i,
                'title'     => 'My title' . $i,
                'sub_title' => 'My sub_title' . $i,
                'content'   => 'My content' . $i,
            ];
            $posts->push((object)$post);
        }
        return $posts;
    }
}
```

第 6 行

```
/**
 * Class MyRepository
 * @package App\Repositories
 */
class MyRepository implements PostRepositoryInterface
```

`MyRepository` class 一样实践了`PostRepositoryInterface`。

13 行

```
/**
 * 传回最新3笔文章
 *
 * @return Collection
 */
public function getLatest3Posts()
{
    $posts = new Collection();
    for ($i = 1; $i 3; $i++) {
        $post = [
            'id'        => $i,
            'title'     => 'My title' . $i,
            'sub_title' => 'My sub_title' . $i,
            'content'   => 'My content' . $i,
        ];
        $posts->push((object)$post);
    }
    return $posts;
}
```

没到透过`Post` model 向资料库读取资料，而是自己用`Collection`凑 3 笔资料。

比较特别的是`$post`为阵列，所以要`push`进 collection 时，需要转型成`object`，否则 blade 在显示时会出错。

#### 注入 Container

app/Http/Controllers/PostsController.php

```
namespace App\Http\Controllers;
use App\Contracts\PostRepositoryInterface;
use App\Http\Requests;
class PostsController extends Controller
{
    /**
    * @var PostRepositoryInterface
    */
    protected $posts;
    /**
    * PostsController constructor.
    * @param $posts
    */
    public function __construct(PostRepositoryInterface $posts)
    {
        $this->posts = $posts;
    }
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $posts = $this->posts->getLatest3Posts();
        $data = compact('posts');
        return View('posts.index', $data);
    }
}
```

第 8 行

```
/**
 * @var PostRepositoryInterface
 */
protected $posts;
/**
 * PostsController constructor.
 * @param $posts
 */
public function __construct(PostRepositoryInterface $posts)
{
    $this->posts = $posts;
}
```

将 repository 由 constructor 注入到 controller，注意现在`$post`的型别为`PostRepositoryInterface`，而不是`PostRepository`。

#### 切换 class

Service container 神奇的地方就在于任何有`type hint`的地方，Laravel 都会自动帮你载入物件，但若`type hint`为`interface`
，由于实践该 interface
可能有很多物件，你必须使用`App::bind()`告诉 Laravel 该 interface 必须载入什麽物件，否则无法载入。

至于`App::bind()`该写在哪裡呢？Taylor 建议你写在`service provider`的`register()`。

app/Providers/RepositoryServiceProvider.php

```
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use App\Contracts\PostRepositoryInterface;
use App\Repositories\PostRepository;
use App\Repositories\MyRepository;
/**
 * Class RepositoryServiceProvider
 * @package App\Providers
 */
class RepositoryServiceProvider extends ServiceProvider
{
     /**
     * Bootstrap the application services.
     *
     * @return void
     */
     public function boot()
     {
         //
     }
     /**
     * Register the application services.
     *
     * @return void
     */
     public function register()
     {
         $this->app->bind(
             PostRepositoryInterface::class,
             PostRepository::class
         );
     }
}
```

24 行

```
/**
 * Register the application services.
 *
 * @return void
 */
public function register()
{
     $this->app->bind(
         PostRepositoryInterface::class,
         PostRepository::class
     );
}
```

当你要注入的是`PostRepository`时，就 bind`PostRepository::class`，若要注入的是`MyRepository`时，就
bind`MyRepository::class`，controller 完全不用修改。

## Register()与 Boot()

当我们使用`php artisan make:provider`建立 service provider 时，预设会建立`register()`与`boot()`
，之前已经讨论过`register()`是来自于`ServiceProvider`的 abstract
method，所以我们必须实践，但`boot()`呢？`boot()`并不是`ServiceProvider`的 abstract method，所以我们`可以不`
实践，但为什麽`php artisan make:provider`
也帮我们建立了`boot()`呢？

当所有 service provider 的`register()`执行完后，接着会执行各 serive provider 的`boot()`，在

Laravel source 的`Application`的`bootProvider()`会去呼叫`boot()`。

Illuminate/Foundation/Application.php

```
/**
 * Boot the given service provider.
 *
 * @param  \Illuminate\Support\ServiceProvider  $provider
 * @return void
 */
 protected function bootProvider(ServiceProvider $provider)
 {
     if (method_exists($provider, 'boot')) {
        return $this->call([$provider, 'boot']);
     }
 }
```

所以 Laravel 并没有强迫要实践`boot()`，Laravel 再执行完所有 service provider 的`register()`之后，若你有实作`boot()`
的话，就会来执行该 service provider 的`boot()`。

到底什麽程式该写在 register()?什麽程式该写在 boot()呢?

`register()`应该只拿来写`App::bind()`或`App:register()`，若要使用初始化物件，或使用其他相依物件，则应该写在`boot()`
，有两个原因 :

1. 根据**SOLID**的**单一职责原则**，`register()`只负责 service container 的 register 与 binding，`boot()`负责初始化物件。
2. 若在`register()`使用其他相依物件，可能该物件还没`bind`，而导致执行错误；`boot()`在所有`register()`
   之后才执行，因此可以确保所有物件都已经`bind`。

## Deferred Providers

在`config/app.php`的`providers`中 service provider，都会在 Laravel 一启动时做 register 与 binding，若一些 service
container 较少被使用，你想在该 service container
实际被使用才做 register 与 binding，以加快 Laravel 启动，可以使用`deferred provider`。

### 加入$defer

app/Providers/RepositoryServiceProvider.php

```
class RepositoryServiceProvider extends ServiceProvider
{
     /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
     protected $defer = true;
     ...
}
```

在自己的 service provider 内加入`$defer` property 为 true。

### 加入 provides()

app/Providers/RepositoryServiceProvider.php

```
class RepositoryServiceProvider extends ServiceProvider
{
     /**
     * Get the services provided by the provider
     *
     * @return array
     */
     public function provides()
     {
        return [PostRepositoryInterface::class];
     }
}
```

在`provides()`回传该 service provider 所要处理的完整 interface 名称。

### 删除 service.json

```
$ php artisan clear-compiled
```

所有要启动的 service provider 都会被 compile 在`bootstrap/cache/service.json`
，因为我们刚刚将`PostRepositoryServiceProvider`改成`deferred provider`
，所以必须删除`service.json`重新建立。

### 重新启动 Laravel

bootstrap/cache/service.json

```
{
     "providers": [
        ...
        "App\\Providers\\RepositoryServiceProvider"
     ],
     "eager": [
        ...
     ],
     "deferred": {
         ...
        "App\\Contracts\\PostRepositoryInterface": "App\\Providers\\RepositoryServiceProvider"
     },
     "when": {
         ...
     }
}
```

Laravel 重新启动后，会重新建立`service.json`，在`providers`属性，会列出所有 service
provider，因为我们刚刚将`PostRepositoryServiceProvider`加上`$deffered = true`
，所以现在`defferred`属性会有该 service provider，而`provides()`所传回的 interface，正是物件的 property。

## Conclusion

- Service provider 提供了统一了大家写`App::bind()`之处。
- `register()`内只应该写 register 与 binding，而`boot()`内只应该写初始化物件或使用其他相依物件。
- Service provider 不单只是 package 会使用，也可以拿来管理 service container，将变化封装在 service provider
  内，当将来需求变化时，只要修改 service provider 即可。

## Sample Code

完整的范例可以在我的[GitHub](https://github.com/oomusou/)上找到。

1. [My Laravel Debugbar](https://github.com/oomusou/MyLaravelDebugbar_demo)
2. [Repository with Interface](https://github.com/oomusou/Laravel51RepositoryInterface_demo)
3. [Repository with Deferred](https://github.com/oomusou/Laravel51RepositoryInterfaceDeffered_demo)

