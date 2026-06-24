---
description: '为提升性能与安全性，Laravel 可配置 Redis 让缓存和 Session 分别使用不同数据库，避免相互干扰。Session 存储也可选择文件、数据库等。配置步骤包括设置 Session Redis 数据库连接、指定 Session 驱动及对应连接，最后测试验证。'
lastUpdated: '2026-06-17 22:38:30'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel 下配置 Redis 让缓存、Session 各自使用不同的 Redis 数据库'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '为提升性能与安全性，Laravel 可配置 Redis 让缓存和 Session 分别使用不同数据库，避免相互干扰。Session 存储也可选择文件、数据库等。配置步骤包括设置 Session Redis 数据库连接、指定 Session 驱动及对应连接，最后测试验证。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/refs/db-setting-with-redis.html'
---
# Laravel 下配置 Redis 让缓存、Session 各自使用不同的 Redis 数据库

原文地址: [Laravel 下配置 Redis 让缓存、Session 各自使用不同的 Redis 数据库](https://laravel-china.org/topics/2466/laravel-configuration-under-the-redis-so-that-the-cache-session-each-use-a-different-redis-database)

## 为什么要这样做?

默认情况下，Redis 服务会提供 16 个数据库，Laravel 使用数据库  `0`  （请见  [Redis 文档](http://doc.laravel-china.org/docs/5.1/redis#%E9%85%8D%E7%BD%AE)）作为缓存和 Session 的存储。在执行命令  `php artisan cache:clear`  清除缓存时，会把 Session 也连带清除了，导致所有用户需要重新登录, 可以通过以下设置来避免这个问题。

### Session 存储的其他选择

- file - 存储在文件中，读取太频繁，磁盘存储比起内存存储速度没法比，为了方便，开发时可以设置，生产环境不建议使用；
- cookie - Session 里存放的是信息太多，Nginx 默认配置下配合 PHP-FPM，经常报 502，不建议使用；
- database - 不建议存储在数据库中，因为读取太频繁，会拖累数据库服务器数据存储的业务，读取是内存缓存服务器的强项；
- apc - 可用于小型程序缓存，不过不支持集群，所以也不建议使用；
- array - 建议只用于单元测试中使用；
- memcached - 专业内存缓存服务器，可惜只支持最大 30 天的缓存时间，请见 [Laravel 会话使用 Memcached 踩到的坑](https://laravel-china.org/topics/2461)，也就是说用户 30 天后就得重新登录，在我们的用例中，不适用；

上面的总结可以看来，Redis 在配置好多数据库的情况下，还是最好的 Session 存储方案。

## 开始配置

我们的目的是让缓存，也就是默认的 Redis 存储到 0 号数据库，Session 存储在 1 号数据库。

### 1. 配置 Session Redis 数据库

修改  `config/database.php`，在  `redis`  选项内增加  `session`  选项，并把  `database`  修改为 `1`：

```PHP
'redis' => [
   'cluster' => false,
   'default' => [
       'host'     => env('REDIS_HOST', 'localhost'),
       'password' => env('REDIS_PASSWORD', null),
       'port'     => env('REDIS_PORT', 6379),
       'database' => 0,
   ],
   'session' => [
         'host'     => env('REDIS_HOST', 'localhost'),
         'password' => env('REDIS_PASSWORD', null),
         'port'     => env('REDIS_PORT', 6379),
         'database' => 1,
   ],
],
```

### 2. 指定 Session 使用数据库

修改  `config/session.php`  ，把下面这一行：

```Plaintext
'connection' => null,
```

改为：

```Plaintext
'connection' => 'session',
```

### 3. 开始使用

修改  `.env`  文件的  `SESSION_DRIVER`  选项为 `redis`，开始应用上。

```Plaintext
SESSION_DRIVER=redis
```

### 4. 测试一下

执行以下命令后检查下是否退出登录：

```Plaintext
php artisan cache:clear
```

如果不会就大功告成了