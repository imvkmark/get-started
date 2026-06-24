---
description: 'Laravel Artisan命令行提供了命令编写、输入输出处理、用户交互（回答、确认、选择）及输出格式化（数据表、进度条）的功能支持。支持命令注册、内部调用及内置命令（如auth、cache等）的使用，便于自动化任务和项目开发管理。'
lastUpdated: '2026-06-21 20:39:40'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel - Artisan(命令行) '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Laravel Artisan命令行提供了命令编写、输入输出处理、用户交互（回答、确认、选择）及输出格式化（数据表、进度条）的功能支持。支持命令注册、内部调用及内置命令（如auth、cache等）的使用，便于自动化任务和项目开发管理。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/primer/artisan.html'
---
# Laravel - Artisan(命令行)

Artisan 是 Laravel 的命令行接口的名称，它提供了许多实用的命令来帮助你开发 Laravel 应用，它由强大的 Symfony Console 组件所驱动。可以使用 `list` 命令来列出所有可用的 Artisan 命令：

```Plaintext
php artisan list
```

每个命令也包含了「帮助」界面，它会显示并概述命令可使的参数及选项。只要在命令前面加上 `help` 即可显示帮助界面：

```Plaintext
php artisan help migrate
```

## 编写命令

除了使用 Artisan 本身所提供的命令之外，Laravel 也允许你自定义 Artisan 命令。自定义命令默认存储在 `app/Console/Commands` 目录中，当然，只要在 `composer.json` 文件中的配置了自动加载，你可以自由选择想要放置的地方。若要创建新的命令，你可以使用 `make:console` Artisan 命令生成命令文件：

```Plaintext
php artisan make:console SendEmails
```

上面的这个命令会生成 `app/Console/Commands/SendEmails.php` 类，`--command` 参数可以用来指定调用名称：

```Plaintext
php artisan make:console SendEmails --command=emails:send
```

### 命令结构

一旦生成这个命令，应先填写类的 `signature` 和 `description` 这两个属性，它们会被显示在 `list` 界面中。

命令运行时 `handle` 方法会被调用，请将程序逻辑放置在此方法中。

接下来讲解一个发送邮件的例子。

为了更好的代码重用性，还有可读性，建议把处理业务逻辑的代码抽到一个功能类里。

Command 类构造器允许注入需要的依赖，Laravel 的 [服务容器](https://laravel-china.org/docs/5.1/container) 将会自动把功能类 DripEmailer 解析到构造器中：

```PHP
<?php
namespace App\Console\Commands;
use App\User;
use App\DripEmailer;
use Illuminate\Console\Command;
class SendEmails extends Command
{
    /**
     * 命令行的名称及用法。
     *
     * @var string
     */
    protected $signature = 'email:send {user}';
    /**
     * 命令行的概述。
     *
     * @var string
     */
    protected $description = 'Send drip e-mails to a user';
    /**
     * 滴灌电子邮件服务。
     *
     * @var DripEmailer
     */
    protected $drip;
    /**
     * 创建新的命令实例。
     *
     * @param  DripEmailer  $drip
     * @return void
     */
    public function __construct(DripEmailer $drip)
    {
        parent::__construct();
        $this->drip = $drip;
    }
    /**
     * 运行命令。
     *
     * @return mixed
     */
    public function handle()
    {
        $this->drip->send(User::find($this->argument('user')));
    }
}
```

## 命令的输入与输出

### 定义预期的输入

`signature` 属性定义了希望从用户获得的输入格式，`signature` 属性可用来定义命令的名字、参数及选项，具有与路由相似的语法特性。参数及选项都包在大括号中。如以下例子，此命令会定义一个 **必须的** 参数 `user`：

```Plaintext
/**
 * 命令行的名称及用法。
 *
 * @var string
 */
protected $signature = 'email:send {user}';
```

以下是可选参数和默认值的例子（注意括号内的符号）：

```Plaintext
// 选择性的参数...
email:send {user?}
// 选择性的参数及默认的值...
email:send {user=foo}
```

选项就跟参数一样，同样也是用户输入的一种格式，不过当使用选项时，需要在命令行加入两个连字符号（`--`），选项的定义如下：

```Plaintext
/**
 * 命令行的名称及用法。
 *
 * @var string
 */
protected $signature = 'email:send {user} {--queue}';
```

在这个例子中，当调用 Artisan 命令时，`--queue` 这个选项可以被明确的指定。如果 `--queue` 被当成输入时，这个选项的值会是 `true`，如果没有指定时，这个选项的值将会是 `false`：

```Plaintext
php artisan email:send 1 --queue
```

你也可以借助在这个选项后面加个 `=` 来为选项明确指定值：

```Plaintext
/**
 * 命令行的名称及用法。
 *
 * @var string
 */
protected $signature = 'email:send {user} {--queue=}';
```

在这个例子中，用户可以为这个参数传入一个值：

```Plaintext
php artisan email:send 1 --queue=default
```

指定默认值给选项：

```Plaintext
email:send {user} {--queue=default}
```

为选项定义简写方式：

```Plaintext
email:send {user} {--Q|queue}
```

### 增加概述

使用冒号 `:` 可以为参数和选项增加概述：

```Plaintext
/**
 * 命令行的名称及用法。
 *
 * @var string
 */
protected $signature = 'email:send
                        {user : 用户的 ID }
                        {--queue= : 这个工作是否该进入队列}';
```

### 获取输入

代码里通过调用 `argument` 及 `option` 方法来获取对应的参数和选项输入。使用 `argument` 方法来获取参数的值：

```Plaintext
/**
 * 命令行的处理逻辑
 *
 * @return mixed
 */
public function handle()
{
    $userId = $this->argument('user');
    //
}
```

不加参数调用，可以获取到所有的参数 `数组`：

```Plaintext
$arguments = $this->argument();
```

`option` 方法的使用同 `argument` 一样：

```Plaintext
// 获取特定的选择
$queueName = $this->option('queue');
// 获取所有选择
$options = $this->option();
```

如果参数或选项不存在，将会返回 `null`。

### 让用户回答

`ask` 方法提供的问题来提示用户，并且接受他们的输入，返回的是用户输入：

```Plaintext
/**
 * 命令行的处理逻辑
 *
 * @return mixed
 */
public function handle()
{
    $name = $this->ask('你是名字是?');
}
```

`secret` 如同 `ask` 方法一般，但是用户的输入将不会显示在命令行。这个方法适用于要求提供如密码的敏感信息时：

```Plaintext
$password = $this->secret('密码是？');
```

### 让用户确认

`confirm` 方法提供询问用户确认，默认的情况下，这个方法会返回 `false`。如果用户对这个提示输入 `y`，那这个方法将会返回 `true`：

```Plaintext
if ($this->confirm('你希望继续吗? [y|N]')) {
    //
}
```

### 让用户做选择

`anticipate` 方法可被用于为可能的选择提供自动完成。用户仍可以选择任何答案而不理会这些选择。

```Plaintext
$name = $this->anticipate('你的名字是?', ['Taylor', 'Dayle']);
```

`choice` 方法让用户从给定选项里选择，用户会选择答案的索引，但是返回的是答案的值。可以设置返回默认值来防止没有任何东西被选择的情况：

```Plaintext
$name = $this->choice('你的名字是?', ['Taylor', 'Dayle'], false);
```

### 编写输出

使用 `line`、`info`、`comment`、`question` 和 `error` 方法来发送输出到终端。每个方法都有适当的 ANSI 颜色来表达它们的目的。使用 `info` 方法来发送信息消息给用户，并在终端以绿色呈现：

```Plaintext
/**
 * 命令行的处理逻辑
 *
 * @return mixed
 */
public function handle()
{
    $this->info('把我显示在界面上');
}
```

使用 `error` 方法来发送错误消息给用户，并在终端以红色呈现：

```Plaintext
$this->error('有东西出问题了！');
```

`line` 方法不会输出任何特殊的颜色：

```Plaintext
$this->line('把我显示在界面上');
```

### 数据表布局

使用 `table` 方法格式化输出多行与多列数据，宽跟高将会基于数据做动态计算:

```PHP
$headers = ['Name', 'Email'];
$users = App\User::all(['name', 'email'])->toArray();
$this->table($headers, $users);
```

### 进度条

对于需要长时间运行的任务，可以使用进度条来提示用户：

```PHP
$users = App\User::all();
// 多少个任务
$bar = $this->output->createProgressBar(count($users));
foreach ($users as $user) {
    $this->performTask($user);
    // 一个任务处理完了，可以前进一点点了
    $bar->advance();
}
$bar->finish();
```

更多信息请查阅 [Symfony Progress Bar 组件的文档](http://symfony.com/doc/2.7/components/console/helpers/progressbar.html)。

## 注册命令

命令编写完成后，需要注册 Artisan 后才能使用。注册文件为 `app/Console/Kernel.php`。

在这个文件中，`commands` 属性是命令的清单，要注册命令，请在此清单加入类的名称即可。

当 Artisan 启动时，所有罗列在这个 属性的命令，都会被 [服务容器](https://laravel-china.org/docs/5.1/container) 解析并向 Artisan 注册：

```Plaintext
protected $commands = [
    Commands\SendEmails::class,
];
```

## 程序内部调用命令

利用 `Artisan` facade 的 `call` 方法，可以在程序内部调用 Artisan 命令。

`call` 方法的第一个参数为命令的名称，第二个参数为数组型态的命令输入，退出码将会被返回：

```Plaintext
Route::get('/foo', function () {
    $exitCode = Artisan::call('email:send', [
        'user' => 1,
        '--queue' => 'default'
    ]);
    //
});
```

在 `Artisan` facade 使用 `queue` 方法，可以将 Artisan 命令丢给后台的 [队列服务器](https://laravel-china.org/docs/5.1/queues) 运行：

```Plaintext
Route::get('/foo', function () {
    Artisan::queue('email:send', [
        'user' => 1,
        '--queue' => 'default'
    ]);
    //
});
```

如果需要指定非接收字符串选项的值，如 `migrate:refresh` 命令的 `--force` 标记，你可以传递一个 `true` 或 `false` 的布尔值：

```Plaintext
$exitCode = Artisan::call('migrate:refresh', [
    '--force' => true,
]);
```

### 命令中调用其它命令

Command 类的 `call` 方法可以让你在命令中调用命令，`call` 方法接受命令名称和命令参数的数组：

```Plaintext
/**
 * 命令行的处理逻辑
 *
 * @return mixed
 */
public function handle()
{
    $this->call('email:send', [
        'user' => 1,
        '--queue' => 'default'
    ]);
    //
}
```

调用其它命令并忽略它所有的输出，可以使用 `callSilent` 命令。`callSilent` 方法有和 `call` 方法一样的用法：

```Plaintext
$this->callSilent('email:send', [
    'user' => 1,
    '--queue' => 'default'
]);
```

## Laravel 携带的命令行

### 用法

```Plaintext
$ php artisan
Laravel Framework version 5.1.46 (LTS)
Usage:
command [options] [arguments]
Options:
-h, --help            显示当前的帮助信息
-q, --quiet           不输出任何信息
-V, --version         显示当前版本
  --ansi            强制 ANSI 输出
  --no-ansi         禁用 ANSI 输出
-n, --no-interaction  不进行交互
  --env[=ENV]       运行环境
-v|vv|vvv, --verbose  详细输出: 1 普通, 2 更加详细 , 3 debug
```

### 命令

**全局命令**

```Plaintext
clear-compiled       清除编译生成的文件，相当于 optimize 的反操作
down                 将站点设为维护状态
env                  显示当前运行环境, 来源于 .env 的配置
help                 显示一个命令的帮助
list                 列出命令
optimize             优化应用程序性能，生成自动加载文件，且产生聚合编译文件 bootstrap/compiled.php
    [--force]             强制编译已写入文件 (storage/frameworks/compiled.php)
    [--psr]               不对 Composer 的 dump-autoload 进行优化
serve                使用 PHP 内置的开发服务器启动应用 【要求 PHP 版本在 5.4 或以上】
    [--host 0.0.0.0]      使其在本地服务器外也可正常工作
    [--port 8080]         指定运行的端口号
tinker               进入与当前应用环境绑定的 REPL 环境，相当于 Rails 框架的 rails console 命令
up                   将站点设回可访问状态
```

### 分组命令

```Plaintext
# app
app:name             设置应用的命名空间

# auth
auth:clear-resets    清除过期的密码重置令牌

# cache
cache:clear          清空应用缓存
cache:table          创建缓存数据库表 migration

# config
config:cache         合并所有的配置信息为一个，提高加载速度
config:clear         移除配置缓存文件

# db
db:seed              运行所有的 seed 假数据生成类
     [--class[="..."]]     可以指定运行的类，默认是: "DatabaseSeeder"
     [--database[="..."]]  可以指定数据库
     [--force]             当处于生产环境时强制执行操作

# event
event:generate       基于注册的信息，生成遗漏的 events 和 handlers

# handler
handler:command      生成新的处理器类
    [--command="..."]     需要处理器处理的命令类名字
    name
handler:event        创建一个新的事件处理器类
    [--event="..."]       需要处理器处理的事件类名字
    [--queued]            需要处理器使用队列话处理的事件类名字
    name

# key
key:generate         生成应用的 key（会覆盖）

# make
make:command         在默认情况下, 这将创建未加入队列的自处理命令
    [--handler]              标识来生成一个处理器
    [--queued]               来使其入队列
    name
make:console         创建一个新的 Artisan 命令
    [--command[="..."]]      命令被调用的名称。 (默认为: "command:name")
    name
make:controller      创建一个新的资源控制器
    [--plain]               生成一个空白的控制器类
    name                    指定的名称, 可以类似于 `App\\Http\Controllers\DashboardController`
make:event           创建一个新的事件类
    name
make:job             创建新的队列
make:listener        创建新的事件监听器
make:middleware      创建一个新的中间件类
    name
make:migration       创建一个新的迁移文件
    [--create[="..."]]      将被创建的数据表
    [--table[="..."]]       将被迁移的数据表
    name
make:model           创建一个新的 Eloquent 模型类
    name
make:policy          创建新策略
make:provider        创建一个新的服务提供者类
    name
make:request         创建一个新的表单请求类
    name
make:seeder          创建新的seeder
make:test            创建

# migrate
migrate              执行数据迁移 / 数据库迁移
    [--database[="..."]]     指定数据库连接（下同）
    [--force]                当处于生产环境时强制执行，不询问（下同）
    [--path[="..."]]         指定单独迁移文件地址
    [--pretend]              把将要运行的 SQL 语句打印出来（下同）
    [--seed]                 Seed 任务是否需要被重新运行（下同）
migrate:install      创建迁移数据库表
    [--database[="..."]]
migrate:refresh      重置并重新运行所有的 migrations
    [--database[="..."]]
    [--force]
    [--seed]
    [--seeder[="..."]]       指定主 Seeder 的类名
migrate:reset        回滚所有的数据库迁移
    [--database[="..."]]
    [--force]
    [--pretend]
migrate:rollback     回滚最最近一次运行的迁移任务
    [--database[="..."]]
    [--force]
    [--pretend]
migrate:status       migrations 数据库表信息

# queue
queue:failed         查看所有执行失败的队列任务
queue:failed-table   为执行失败的数据表任务创建一个迁移
queue:flush          清除所有执行失败的队列任务
queue:forget         删除一个执行失败的队列任务
queue:listen         监听指定的队列
    [--queue[="..."]]     被监听的队列
    [--delay[="..."]]     给执行失败的任务设置延时时间 (默认为零: 0)
    [--memory[="..."]]    内存限制大小，单位为 MB (默认为: 128)
    [--timeout[="..."]]   指定任务运行超时秒数 (默认为: 60)
    [--sleep[="..."]]     当没有任务处于有效状态时, 设置其进入休眠的秒数 (默认为: 3)
    [--tries[="..."]]     任务记录失败重试次数 (默认为: 0)
    [connection]
queue:restart        在当前的队列任务执行完毕后, 重启队列的守护进程
queue:retry          对指定 id 的执行失败的队列任务进行重试
    id                    失败队列任务的 ID
queue:subscribe      订阅一个 url 地址到 Iron.io 推送队列 / 指定订阅 Iron.io 队列的链接
    [--type[="..."]]      指定队列的推送类型
    queue                 Iron.io 的队列名称
    url                   将被订阅的 URL
queue:table          为队列数据库表创建一个新的迁移
queue:work           处理下一个队列任务
    [--queue[="..."]]     被监听的队列
    [--daemon]            在后台模式运行
    [--delay[="..."]]     给执行失败的任务设置延时时间 (默认为零: 0)
    [--force]             强制在「维护模式下」运行
    [--memory[="..."]]    内存限制大小，单位为 MB (默认为: 128)
    [--sleep[="..."]]     当没有任务处于有效状态时, 设置其进入休眠的秒数 (默认为: 3)
    [--tries[="..."]]     任务记录失败重试次数 (默认为: 0)
    [connection]

# route
route:cache          生成路由缓存文件来提升路由效率
route:clear          移除路由缓存文件
route:list           显示已注册过的路由

# schedule
schedule:run         运行计划命令
                     [linux] 这个命令配合 crontab 一起使用
                     win 下可以配合计划任务(编写 bat 文件, 使用计划任务调用)

# session
session:table        为 session 数据表生成迁移文件

# vendor
vendor:publish       从 vendor 的扩展包中发布任何可发布的资源
    [--force]               重写所有已存在的文件
    [--provider[="..."]]    指定你想要发布资源文件的服务提供者
    [--tag[="..."]]         指定你想要发布标记资源

# view
view:clear           清空已经编译的缓存文件.
```