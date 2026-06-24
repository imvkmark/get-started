---
description: 'Laravel模型事件包括检索、首次保存、已存在模型保存、删除、创建/更新、软删除恢复及强制删除等类型。在Trait中可通过boot方法注册事件监听，利用Trait的boot或initialize方法自动触发，便于复用模型事件逻辑。'
lastUpdated: '2026-06-17 22:39:01'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel 模型事件和模型事件在 Trait 中的使用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Laravel模型事件包括检索、首次保存、已存在模型保存、删除、创建/更新、软删除恢复及强制删除等类型。在Trait中可通过boot方法注册事件监听，利用Trait的boot或initialize方法自动触发，便于复用模型事件逻辑。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/refs/model-trait-usage.html'
---
# Laravel 模型事件和模型事件在 Trait 中的使用

[Laravel 模型事件和模型事件在 Trait 中的使用 - 掘金](https://juejin.cn/post/7206924411257438264)

## 模型事件

Laravel 模型事件允许你监听模型生命周期内的事件, 并且通过这个事件去做一些模型通用性的东西, 例如检查用户修改了那个字段, 将字段的什么值修改成另外的什么值, 等等.

### 事件类型

```Plaintext
# 当现有模型被数据库检索时
retrieved

# 当一个新的模型被第一次保存时
creating
created

# 对一个已经存在于数据库的模型调用 save 方法
updating
updated

# 当模型数据被删除时
deleting
deleted

# 当创建和更新执行时都会调用
saving
saved

# 当启用软删除的数据被恢复时
restoring
restored

# 当启用软删除的数据被强制删除时
forceDeleted

# 复制
replicating

# 指定模型的指定事件被触发时(注意 $name 前有个空格)
# event 对应以上的事件类型
# name 对应的是模型的类名称
eloquent.{$event}: {$name}
```

以上事件类型的注册可以通过 boot 方法注册

### boot 方法和事件注册

模型在执行时候仅仅执行一次的 boot 方法, 可以理解为模型启动时候的注册钩子方法我们看下示例

```PHP
<?php

Class PamAccount extend Model
{
    public static function boot()
    {
        parent::boot();
        self::deleting(function ($user){
            if (!method_exists((new static::class), 'bootSoftDeletes')) {
                $user->roles()->sync([]);
            }
            return true;
        });
    }
}
```

这里注册了一个事件, 这个事件的目的是在删除的时候(如果不是软删除) 删除角色信息, 这里注册的是一个 `deleting`方法, 使用的方式是 `self::deleting($cb)` 这个函数, 除此之外其他的事件也都有相对应的方法.

## boot 在 traits 中的使用

假如有一个场景我们需要再多个模型中均需要注册同样的操作, 我们是否需要再多个模型中编写重复的代码呢 ? 答案是不需要, 因为 `Trait` 也提供了相关的方法来进行注册/初始化, 在 `Model.php` 中可以发现如下定义

```PHP
protected static function boot()
{
    static::bootTraits();
}
```

这里的意思是在运行 `boot` 方法的时候同时注册相关 `Traits` 方法, 这也是 Eloquent ORM 的优势之一, 当使用 Eloquent 时，可以执行 Trait 注册逻辑。

`boot` 方法非常_神奇\_，因为可以将 trait 附加到模型，如果在 trait 上设置一些方法，这些方法将在开始使用模型时调用。它们遵循如下格式 : `boot{Trait}` 和 `initialize{Trait}`，允许在多个模型中重用相同的代码。

### boot(启动) 和 initialize(初始化)

两者的区别很简单：`boot`静态执行 ，而 `initialize`动态执行。 `boot` 影响模型的所有实例，而 `initialize` 将仅对其实例起作用。

为了更好地举例说明这些是如何工作的，让我们创建一个名为`HasToken`的 trait. 这个 trait 在给定的 Eloquent 模型上有两个任务。

- 创建模型时添加事件以记录谁插入了记录
- 将随机字符串作为标记添加到模型中

第一项任务是了解经过身份验证的用户创建了新模型。第二个将允许模型自动创建一个随机令牌，以避免在我们应用程序的多个位置手动创建它。

我们可以使用单个 trait 来做到这一点：

```PHP
<?php

namespace App;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

trait HasToken
{
    /**
     * Boot the trait
     *
     * @return void
     */
    protected function bootHasToken()
    {
        static::created(function ($model) {
            // Log who created this model
            Log::info('Token for ' . class_basename($model) . ' created by ' . Auth::user()->getKey());
        });
    }
    
    /**
     * Initialize the trait
     *
     * @return void
     */
    protected function initializeHasToken()
    {
        // Automatically create a random token
        $this->token = Str::random(100);
    }
}
```

### Boot(启动)

boot 方法将在静态模型上工作。例如，如果将此 trait 添加到 `Authentication` 模型中，则使用此方法所做的一切都会以静态的方式影响该模型 > 方法名称必须遵循该`boot{TraitName}`格式

这对于向 eloquent 事件添加回调非常方便，例如`creating`或`retrieving`，因为这些事件是静态的。

```PHP
/**
 * Boot the trait
 * 
 * @return void
 */
protected function bootHasToken()
{
    static::created(function ($model) {
        // Log who created this model
        Log::info('Token for ' . 
            class_basename($model) . 
           ' created by ' . 
           Auth::user()->getKey()
        );
    });
}
```

这是一个非常棒的想法：启动模型不会执行两次，仅在需要时进行。无需担心 `bootHasToken()` 多次调用该方法，Eloquent ORM 模型会持续跟踪启动的模型

### Initialize (初始化)

我们可以使用 boot 方法做静态级的事情，但是要操作模型实例本身，我们需要使用初始化方法。可以使用该`initialize{Trait}`格式创建初始化程序。

```PHP
/**
 * Initialize the trait
 *
 * @return void
 */
protected function initializeHasToken()
{
    // Automatically create a random token
    $this->token = Str::random(100);
}
```

每次实例化新模型时都会运行初始化方法. *And that’s the magic. Happy coding.*

## 参考

- [Laravel: Booting and Initializing Models with traits](https://medium.com/swlh/laravel-booting-and-initializing-models-with-traits-2f77059b1915)