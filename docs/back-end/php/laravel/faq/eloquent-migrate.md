---
description: '本文总结了Laravel中Eloquent和数据库迁移的实用技巧，包括直接更新、带条件关联、附加属性、批量查找、when方法、全局作用域、数据副本、chunk、自定义updated_at、模型用法，以及迁移创建、数据填充和导出等操作。'
lastUpdated: '2026-06-17 22:45:39'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel - Eloquent 和 Migrate'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文总结了Laravel中Eloquent和数据库迁移的实用技巧，包括直接更新、带条件关联、附加属性、批量查找、when方法、全局作用域、数据副本、chunk、自定义updated_at、模型用法，以及迁移创建、数据填充和导出等操作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/faq/eloquent-migrate.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/467dd91cac23c7d8c33d37452eef324c.png'
---
# Laravel - Eloquent 和 Migrate

## Eloquent 技巧

### 1. 获取并更新更改为直接更新

两条Sql 查询记录

```PHP
$pam = PamAccount::find(1);
$pam->login_times++;
$pam->save();
```

```Plaintext
+----------------------------------------------------------------------------------------------------------------+------+
| Query                                                                                                          | Time |
+----------------------------------------------------------------------------------------------------------------+------+
| select * from `pam_account` where `pam_account`.`id` = 1 limit 1                                               | 3.32 |
| update `pam_account` set `login_times` = 10, `pam_account`.`updated_at` = "2022-12-03 21:21:16" where `id` = 1 | 0.29 |
+----------------------------------------------------------------------------------------------------------------+------+
```

改写为一条查询语句

```PHP
// 不太优雅
PamAccount::where('id', 1)->increment('login_times');

// 更加优雅的写法
PamAccount::whereKey(1)->increment('login_times');
```

```Plaintext
+---------------------------------------------------------------------------------------------------------------------------------------------+------+
| Query                                                                                                                                       | Time |
+---------------------------------------------------------------------------------------------------------------------------------------------+------+
| update `pam_account` set `login_times` = `login_times` + 1, `pam_account`.`updated_at` = "2022-12-03 21:21:16" where `pam_account`.`id` = 1 | 0.24 |
+---------------------------------------------------------------------------------------------------------------------------------------------+------+
```

### 2. 带条件的关联关系模型

- **多条件**

通常定义关系模型的方法是这样的

```PHP
public function users() {
  return $this->hasMany('App\User');
}
```

但是否知道在定义关系模型的时候已经可以增加 where 或者 orderBy 的条件了？ 比如说你需要定义一个特定类型的用户的关联关系并且用邮箱信息来排序，那你可以这么做：

```PHP
public function approvedUsers() {
    return $this->hasMany('App\User')->where('approved', 1)->orderBy('email');
}
```

- **单条件**

```PHP
public function latestPost(){
    return $this->hasOne(\App\Post::class)->latest();
}
```

- **默认**

这样在没有最新帖子的时候返回默认的空模型数据

```PHP
public function latestPost(){
    return $this->hasOne(\App\Post::class)->withDefault();
}
```

### 3. 模型中的附加属性 appends

appends : 输出时候附加的额外属性，通过模型中定义 `getXXXAttribute` 的方式来定义

```PHP
class PhpDemo extends Model
{

    public $timestamps = false;

    protected $table = 'php_demo';

    protected $appends = [
        'title_md5',
    ];

    protected $fillable = [
        'id',
        'title',
    ];

    public function getTitleMd5Attribute(): string
    {
        return md5($this->attributes['title']);
    }
}
```

其他的模型相关属性

```PHP
class PhpDemo extends Model
{

    public $timestamps = false;

    protected $table = 'php_demo';

    protected $appends = [
        'title_md5',
    ];

    protected $fillable = [
        'id',
        'title',
    ];

    public function getTitleMd5Attribute(): string
    {
        return md5($this->attributes['title']);
    }
}
```

### 4. find 查找多个

```PHP
// 返回 Collection 类型
PhpDemo::find([1, 2]);
```

### 5. when 方法

是不是感觉高大上和优雅了一些

```PHP
// old way
if (request('filter_by') == 'date') {
    $query->orderBy('created_at', request('ordering_rule', 'desc'));
}

// new way
$query = User::query();
$query->when(request('role', false), function ($q, $role) { 
    return $q->where('role_id', $role);
});
$authors = $query->get();
```

### 6. 全局范围

这里使用到了 Eloquent 的 boot 静态方法来注册全局范围查询条件

```PHP
protected static function boot()
{
    parent::boot();

    // 默认按照name 字段升序
    static::addGlobalScope('order', function (Builder $builder) {
        $builder->orderBy('name', 'asc');
    });
}
```

### 7. 数据副本

```PHP
$task = Tasks::find(1);
$newTask = $task->replicate();
$newTask->save();
```

### 8. 模型 chunk 方法

使用模型的方法分批次从数据库中获取数据而不是取出所有的数据

```PHP
PhpDemo::chunk(50, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```

查看所有的 sql 请求, 类似于数据分片

```Plaintext
+--------------------------------------------------------------------------+-------+
| Query                                                                    | Time  |
+--------------------------------------------------------------------------+-------+
| select * from `php_demo` order by `php_demo`.`id` asc limit 50 offset 0  | 17.09 |
| select * from `php_demo` order by `php_demo`.`id` asc limit 50 offset 50 | 0.4   |
+--------------------------------------------------------------------------+-------+
```

### 9. 在保存的时候可以按照我们的预期更新 updated_at 字段么

通过设置 timestamp 为 false 忽略模型自己填充的更新数据

```PHP
$product = Product::find($id);
$product->updated_at = '2019-01-01 10:00:00';
$product->timestamps = false;
$product->save();
```

### 10. Model 的几个使用方式

**连表**

```PHP
$tbPam   = (new PamAccount())->getTable();
$tbFt    = (new AccountFront())->getTable();
$Db = \DB::table($tbPam)->where('account_type', 'front');
$Db->where($tbPam . '.account_id', '!=', \FrontAuth::id());
$Db->join($tbFt, $tbPam . '.account_id', '=', $tbFt . '.account_id');
$accounts = $Db->paginate(16);
$accounts->appends($request->input());
```

多字段的的 Like 查询

```PHP
$kw = input('kw');
if ($kw) {
    $Db->where(function($query) use ($kw, $tb_weixin){
        $query->orWhere($tb_weixin.'.wx_account', 'like', '%'.$kw.'%');
        $query->orWhere($tb_weixin.'.wx_nickname', 'like', '%'.$kw.'%');
    });
}
```

## 数据库 Migrate 和 Seeder

### 数据库配置

配置文件 `config/database.php`

由于数据库中定义调用了 `.env` 的方法, 所以这里使用 `.env` 的方式来加载配置, 如果需要前缀可以修改 env 文件

```PHP
<?php
return [
    ...
    'mysql' => [
        // ...
        'prefix'    => env('DATABASE_PREFIX', 'db_'),
        // ..
    ],
]
```

这里需要先创建一个数据库 `laravel_get_start`

*file :* `.env`

```Plaintext
DB_HOST=127.0.0.1
DB_DATABASE=laravel_get_start
DB_USERNAME=root
DB_PASSWORD=
```

### 创建模型

Laravel最为强大的部分，Eloquent ORM, 现在，Artisan 帮我们在 `~/app/Models` 下创建了文件 `Article.php` ，这是 Model 类，他们都继承了 Laravel Eloquent 提供的 Model 类 Illuminate，且都在 `\App\Models` 命名空间下。这里需要强调一下，用命令行的方式创建文件，和自己手动创建文件没有任何区别，你也可以尝试自己创建这两个 Model 类。

Model 即为 MVC 中的 M，翻译为模型，负责跟数据库交互。在 Eloquent 中，数据库中每一张表对应着一个 Model 类（当然也可以对应多个）。

```Plaintext
$ php artisan make:model Article

# 创建模型的时候可以创建出 migration 文件
$ php artisan make:model Article -m
```

### 创建 Migration

```Plaintext
$ php artisan make:migration create_articles_table
```

在 *create_articles_table.php* 中修改：

```PHP
Schema::create('articles', function(Blueprint $table)
{
    $table->increments('id');
    $table->string('title');
    $table->string('slug')->nullable();
    $table->text('body')->nullable();
    $table->timestamps();
});
```

### 数据表建立

接下来进行 Article 对应的 articles 表数据库迁移，运行以下命令执行数据库迁移操作：

```Plaintext
$ php artisan migrate
Migration table created successfully.
Migrated: 2014_10_12_000000_create_articles_table
```

数据表进入数据库

### 填充数据

在 `database/seeds/ArticleTableSeeder.php` 中添加创建

```PHP
<?php
use Illuminate\Database\Seeder;
use App\Models\Article;
class ArticleTableSeeder extends Seeder {
    public function run()
    {
        // delete db
        DB::table('articles')->delete();
        // insert
        for ($i=1; $i<=10; $i++) {
            Article::create([
                'title'    => 'title-'.$i,
                'slug' =>  md5($i),
                'body' => 'body-'.$i,
            ]);
        }
    }
}
```

然后修改同一级目录下的 `DatabaseSeeder.php`中增加

```Plaintext
$this->call('ArticleTableSeeder');
```

你需要在控制台按照如下顺序运行

```Plaintext
composer dump-autoload          # 生成新的类映射文件
php artisan db:seed             # 将种子种进数据库
```

这样数据就可以进入数据库.

## 导出 Laravel 迁移文件

### 在 Sequel Pro 中已存在的数据表导出

![](https://file.wulicode.com/feishu-images/467dd91cac23c7d8c33d37452eef324c.png)

对 [Laravel](http://laravelacademy.org/tags/laravel) 开发者来说，主要有两种方式创建数据表，一种是通过 MySQL 客户端工具，比如 [Sequel Pro](http://laravelacademy.org/tags/sequel-pro)（Mac 环境下比较流行的 MySQL 客户端软件），另一种是通过 Laravel 提供的 Artisan 命令生成迁移文件。

如果之前的项目不是通过 Laravel 构建的，现在要迁移到 Laravel，或者之前不是通过迁移文件生成的数据表，想要将已存在的数据表转化为 Laravel 迁移文件怎么办，由 Colin Viebrock 为 Sequel Pro 开发的[Laravel 迁移导出工具](https://github.com/cviebrock/sequel-pro-laravel-export)为我们提供了方便。

我们从 github（[https://github.com/cviebrock/sequel-pro-laravel-export](https://github.com/cviebrock/sequel-pro-laravel-export)）将代码克隆本地：

```Plaintext
git clone https://github.com/cviebrock/sequel-pro-laravel-export.git
```

然后进入项目目录，双击`ExportToLaravelMigration.spBundle`文件，接下来在打开的页面连接到数据库，在左侧选中一张数据表，在菜单栏选择`Bundles › Export › Export`将数据表导出为迁移文件（或者使用快捷命令`⌃⌥⌘M`）：

![](https://file.wulicode.com/feishu-images/a49adfe15b2cf1be502f29a00b7e3822.png)

这样就会将选中数据表转化为 Laravel 数据库迁移文件并存放在桌面，比如我选中的是`users`表，对应的迁移文件是`2016_11_20_212052_create_users_table.php`，文件内容如下：

```PHP
<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
/**
 * Migration auto-generated by Sequel Pro Laravel Export
 * @see https://github.com/cviebrock/sequel-pro-laravel-export
 */
class CreateUsersTable extends Migration {
     /**
      * Run the migrations.
      *
      * @return void
      */
     public function up()
     {
         Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);
            $table->string('email', 255);
            $table->string('password', 255);
            $table->rememberToken();
            $table->nullableTimestamps();
            $table->unique('email', 'users_email_unique');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
```

我们可以将其拷贝到 Laravel 项目的数据库迁移目录，以便后续使用该文件进行后续操作。

::: info 📆
更新记录
2023年02月11日
- 移除 workbench 导出 migrate
- 格式化更新
2022年12月03日
- 移除多余的 Migrate 操作
2014年10月20日
- 学习 Laravel 记录
:::

**参考文章**

- [Laravel 大型项目系列教程（一）](https://phphub.org/topics/407)
- [Laravel 5 系列入门教程（一）【最适合中国人的 Laravel 教程】](http://lvwenhan.com/laravel/432.html)