# 「转」laravel-mysql 读写分离

::: info 原文地址

[laravel-mysql 读写分离](https://www.jianshu.com/p/8ea43b1a83df)

:::


> 使用【如果不想了解源代码，直接看 3 种使用方式就好】

**配置**

```
'mysql' => [
    'write' => [
        'host' => '127.0.0.1',
        'port' => 3306
    ],
    'read' => [
        [
            'host' => '127.0.0.1',
            'port' => 3307
        ],
    ],
    'driver' => 'mysql',
    // 'host' => env('DB_HOST', '127.0.0.1'),
    // 'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
    // 'charset' => 'utf8mb4',
    // 'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'strict' => true,
    'engine' => null,
    // 'sticky'    => true, // laravel 5.5 新增
],
```

**使用写库读数据的三种方式**

- 方法 1:

```
$user = DB::selectFromWriteConnection('select * from users where id=42111');
```

- 方法 2:

```
User::onWriteConnection()->find($id);
```

- 方法 3:

通过配置  `'sticky' => true,`

## 一 配置过程

**config/database.php 里面配置**

```
'mysql' => [
    'write'    => [
        'host' => '192.168.1.180',
    ],
    'read'     => [
        ['host' => '192.168.1.182'],
        ['host' => '192.168.1.179'],
    ],
  'sticky'    => true, // laravel 5.5 新增
  'driver'   => 'mysql',
  'port' => env('DB_PORT', '3306'),
  'unix_socket' => env('DB_SOCKET', ''),
  'engine' => null,
  'database'  => 'database',
  'username'  => 'root',
  'password'  => '',
  'charset'   => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix'    => '',
]
```

**加强版，支持多主多从，支持独立用户名和密码，配置如下**

```
'mysql' => [
    'write'    => [
        [
            'host' => '192.168.1.180',
            'username'  => '',
            'password'  => '',
        ],
    ],
    'read'     => [
        [
            'host' => '192.168.1.182',
            'username'  => '',
            'password'  => '',
        ],
        [
            'host' => '192.168.1.179',
            'username'  => '',
            'password'  => '',
        ],
    ],
    'driver'    => 'mysql',
    'database'  => 'database',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]
```

设置完毕之后，Laravel5 默认将  `select`  的语句让  `read`  指定的数据库执行，`insert/update/delete`  则交给  `write`
指定的数据库，达到读写分离的作用。

这些设置对原始查询  `raw queries`，查询生成器  `query builder`，以及  `Eloquent ORM`  都生效。

官网解释如下：
> Sometimes you may wish to use one database connection for SELECT statements, and another for INSERT, UPDATE, and
> DELETE statements. Laravel makes this a breeze, and the proper connections will always be used whether you are using
> raw
> queries, the query builder, or the Eloquent ORM

**验证**

开启 MySQL 的  `general-log` ，通过  `tail -f`  的方式监控 log 变化来确定配置是否生效

**注意点 1:**

`sticky`  是一个 可选的 选项，它可用于立即读取在当前请求周期内已写入数据库的记录。

如果  `sticky`
选项被启用，并且在当前的请求周期内在数据库执行过「写入」操作，那么任何「读取」的操作都将使用「写入」连接。这可以确保在请求周期内写入的任何数据可以在同一请求期间立即从数据库读回。这个选项的作用取决于应用程序的需求。【sticky
选项是一个可选的配置值，可用于在当前请求生命周期内允许立即读取写入数据库的记录。如果 sticky 选项被启用并且一个"写"
操作在当前生命周期内发生，则后续所有"读"操作都会使用这个"写"
连接（前提是同一个请求生命周期内），这样就可以确保同一个请求生命周期内写入的数据都可以立即被读取到，从而避免主从延迟导致的数据不一致，是否启用这一功能取决于你。】
>
当然，这只是一个针对分布式数据库系统中主从数据同步延迟的一个非常初级的解决方案，访问量不高的中小网站可以这么做，大流量高并发网站肯定不能这么干，主从读写分离本来就是为了解决单点性能问题，这样其实是把问题又引回去了，造成所有读写都集中到写数据库，对于高并发频繁写的场景下，后果可能是不堪设想的，但是话说回来，对于并发量不那么高，写操作不那么频繁的中小型站点来说，sticky
这种方式不失为一个初级的解决方案。

**注意点 2:**

注：目前读写分离仅支持单个写连接。

## 二 实现原理

Laravel5 读写分离主要有两个过程:

第一步，根据  `database.php`  配置，创建写库和读库的链接  `connection`

第二步，调用  `select`  时先判断使用读库还是写库，而  `insert/update/delete`  统一使用写库

## 三 源码分析：根据 database.php 配置，创建写库和读库的链接 connection

主要文件：`/vendor/laravel/framework/src/Illuminate/Database/Connectors/ConnectionFactory.php`  来看看几个重要的函数：

- 判断  `database.php`  是否配置了读写分离数据库

```
/**
     * Establish a PDO connection based on the configuration.
     *
     * @param  array   $config
     * @param  string  $name
     * @return \Illuminate\Database\Connection
     */
    public function make(array $config, $name = null)
    {
        $config = $this->parseConfig($config, $name);
        // 如果配置了读写分离，则同时创建读库和写库的链接【因为写库也可以读】
        if (isset($config['read'])) {
            return $this->createReadWriteConnection($config);
        }
        // 如果没有配置，默认创建单个数据库链接
        return $this->createSingleConnection($config);
    }
```

- 创建读库和写库的链接

```
/**
 * Create a single database connection instance.
 *
 * @param  array  $config
 * @return \Illuminate\Database\Connection
 */
protected function createReadWriteConnection(array $config)
{
    // 获取写库的配置信息，并创建链接
    $connection = $this->createSingleConnection($this->getWriteConfig($config));
    // 创建读库的链接
    return $connection->setReadPdo($this->createReadPdo($config));
}
```

- 多个读库会选择哪个呢

旧版本:

```
/**
 * Get the read configuration for a read / write connection.
 *
 * @param  array  $config
 * @return array
 */
protected function getReadConfig(array $config)
{
    $readConfig = $this->getReadWriteConfig($config, 'read');
    // 如果数组即多个读库，那么通过随机函数array_rand()挑一个，默认取第一个
    if (isset($readConfig['host']) && is_array($readConfig['host'])) {
        $readConfig['host'] = count($readConfig['host']) > 1
            ? $readConfig['host'][array_rand($readConfig['host'])]
            : $readConfig['host'][0];
    }
    return $this->mergeReadWriteConfig($config, $readConfig);
}
```

新版本:

```
/**
     * Get the read configuration for a read / write connection.
     *
     * @param  array  $config
     * @return array
     */
    protected function getReadConfig(array $config)
    {
        return $this->mergeReadWriteConfig(
            $config, $this->getReadWriteConfig($config, 'read')
        );
    }
    /**
     * Merge a configuration for a read / write connection.
     *
     * @param  array  $config
     * @param  array  $merge
     * @return array
     */
    protected function mergeReadWriteConfig(array $config, array $merge)
    {
        return Arr::except(array_merge($config, $merge), ['read', 'write']);
    }
    /**
     * Get a read / write level configuration.
     *
     * @param  array   $config
     * @param  string  $type
     * @return array
     */
    protected function getReadWriteConfig(array $config, $type)
    {
        return isset($config[$type][0])
                        ? Arr::random($config[$type])
                        : $config[$type];
    }
```

```
class Arr
{
   ...
    /**
     * Get all of the given array except for a specified array of keys.
     *
     * @param  array  $array
     * @param  array|string  $keys
     * @return array
     */
    public static function except($array, $keys)
    {
        static::forget($array, $keys);
        return $array;
    }
   ...
    /**
     * Remove one or many array items from a given array using "dot" notation.
     *
     * @param  array  $array
     * @param  array|string  $keys
     * @return void
     */
    public static function forget(&$array, $keys)
    {
        $original = &$array;
        $keys = (array) $keys;
        if (count($keys) === 0) {
            return;
        }
        foreach ($keys as $key) {
            // if the exact key exists in the top-level, remove it
            if (static::exists($array, $key)) {
                unset($array[$key]);
                continue;
            }
            $parts = explode('.', $key);
            // clean up before each pass
            $array = &$original;
            while (count($parts) > 1) {
                $part = array_shift($parts);
                if (isset($array[$part]) && is_array($array[$part])) {
                    $array = &$array[$part];
                } else {
                    continue 2;
                }
            }
            unset($array[array_shift($parts)]);
        }
    }
   ...
    /**
     * Get one or a specified number of random values from an array.
     *
     * @param  array  $array
     * @param  int|null  $number
     * @return mixed
     *
     * @throws \InvalidArgumentException
     */
    public static function random($array, $number = null)
    {
        $requested = is_null($number) ? 1 : $number;
        $count = count($array);
        if ($requested > $count) {
            throw new InvalidArgumentException(
                "You requested {$requested} items, but there are only {$count} items available."
            );
        }
        if (is_null($number)) {
            return $array[array_rand($array)];
        }
        if ((int) $number === 0) {
            return [];
        }
        $keys = array_rand($array, $number);
        $results = [];
        foreach ((array) $keys as $key) {
            $results[] = $array[$key];
        }
        return $results;
    }
}
```

- 写库也是随机选择的

旧版本:

```
/**
 * Get a read / write level configuration.
 *
 * @param  array   $config
 * @param  string  $type
 * @return array
 */
protected function getReadWriteConfig(array $config, $type)
{
    // 如果多个，那么通过随机函数array_rand()挑一个
    if (isset($config[$type][0])) {
        return $config[$type][array_rand($config[$type])];
    }
    return $config[$type];
}
```

新版本:

```
/**
     * Get a read / write level configuration.
     *
     * @param  array   $config
     * @param  string  $type
     * @return array
     */
    protected function getReadWriteConfig(array $config, $type)
    {
        return isset($config[$type][0])
                        ? Arr::random($config[$type])
                        : $config[$type];
    }
```

**总结**

- 可以设置多个读库和多个写库，或者不同组合，比如一个写库两个读库


- 每次只创建一个读库链接和一个写库链接，从多个库中随机选择一个

## 四 源码分析：调用 select 时先判断使用读库还是写库，而 insert/update/delete 统一使用写库

主要文件：`/vendor/laravel/framework/src/Illuminate/Database/Connection.php`  看看几个重要的函数

- `select`  函数根据第三个输入参数判断使用读库还是写库(true 使用读库，false 使用写库；默认使用读库)

```
/**
     * Run a select statement against the database.
     *
     * @param  string  $query
     * @param  array  $bindings
     * @param  bool  $useReadPdo
     * @return array
     */
    public function select($query, $bindings = [], $useReadPdo = true)
    {
        return $this->run($query, $bindings, function ($query, $bindings) use ($useReadPdo) {
            if ($this->pretending()) {
                return [];
            }
            // 根据$useReadPdo参数，判断使用读库还是写库；
            // true使用读库，false使用写库；默认使用读库
            // For select statements, we'll simply execute the query and return an array
            // of the database result set. Each element in the array will be a single
            // row from the database table, and will either be an array or objects.
            $statement = $this->prepared($this->getPdoForSelect($useReadPdo)
                              ->prepare($query));
            $this->bindValues($statement, $this->prepareBindings($bindings));
            $statement->execute();
            return $statement->fetchAll();
        });
    }
    /**
     * Get the PDO connection to use for a select query.
     *
     * @param  bool  $useReadPdo
     * @return \PDO
     */
    protected function getPdoForSelect($useReadPdo = true)
    {
        // 根据$useReadPdo参数，选择PDO即判断使用读库还是写库；
        // true使用读库getReadPdo，false使用写库getPdo；
        return $useReadPdo ? $this->getReadPdo() : $this->getPdo();
    }
```

- `insert/update/delete`  统一使用写库

```
/**
     * Run an insert statement against the database.
     *
     * @param  string  $query
     * @param  array   $bindings
     * @return bool
     */
    public function insert($query, $bindings = [])
    {
        return $this->statement($query, $bindings);
    }
    /**
     * Run an update statement against the database.
     *
     * @param  string  $query
     * @param  array   $bindings
     * @return int
     */
    public function update($query, $bindings = [])
    {
        return $this->affectingStatement($query, $bindings);
    }
    /**
     * Run a delete statement against the database.
     *
     * @param  string  $query
     * @param  array   $bindings
     * @return int
     */
    public function delete($query, $bindings = [])
    {
        return $this->affectingStatement($query, $bindings);
    }
    /**
     * Execute an SQL statement and return the boolean result.
     *
     * @param  string  $query
     * @param  array   $bindings
     * @return bool
     */
    public function statement($query, $bindings = [])
    {
        return $this->run($query, $bindings, function ($query, $bindings) {
            if ($this->pretending()) {
                return true;
            }
            // 直接调用写库
            $statement = $this->getPdo()->prepare($query);
            $this->bindValues($statement, $this->prepareBindings($bindings));
            $this->recordsHaveBeenModified();
            return $statement->execute();
        });
    }
    /**
     * Run an SQL statement and get the number of rows affected.
     *
     * @param  string  $query
     * @param  array   $bindings
     * @return int
     */
    public function affectingStatement($query, $bindings = [])
    {
        return $this->run($query, $bindings, function ($query, $bindings) {
            if ($this->pretending()) {
                return 0;
            }
            // 直接调用写库
            // For update or delete statements, we want to get the number of rows affected
            // by the statement and return that back to the developer. We'll first need
            // to execute the statement and then we'll use PDO to fetch the affected.
            $statement = $this->getPdo()->prepare($query);
            $this->bindValues($statement, $this->prepareBindings($bindings));
            $statement->execute();
            $this->recordsHaveBeenModified(
                ($count = $statement->rowCount()) > 0
            );
            return $count;
        });
    }
```

**总结：**

- `getReadPdo()`  获得读库链接，`getPdo()`  获得写库链接；


- `select()`  函数根据第三个参数判断使用读库还是写库；

## 五 强制使用写库

有时候，我们需要读写实时一致，写完数据库后，想马上读出来，那么读写都指定一个数据库即可。 虽然 Laravel5
配置了读写分离，但也提供了另外的方法强制读写使用同一个数据库。

**实现原理：上面  `$this->select()`  时指定使用写库的链接，即第三个参数  `useReadPdo`  设置为  `false`  即可。**

有几个方法可实现:

- 调用方法 1: `DB::table('users')->selectFromWriteConnection('*')->where('id', $id)->first();`

`$user = DB::selectFromWriteConnection('select * from users where id=42111');`

源码解释：通过  `selectFromWriteConnection()`  函数 主要文件:

`/vendor/laravel/framework/src/Illuminate/Database/Connection.php`

```
/**
 * Run a select statement against the database.
 *
 * @param  string  $query
 * @param  array   $bindings
 * @return array
 */
public function selectFromWriteConnection($query, $bindings = [])
{
    // 上面有解释$this->select()函数的第三个参数useReadPdod的意义
    // 第三个参数是 false，所以 select 时会使用写库，而不是读库
    return $this->select($query, $bindings, false);
}
```

- 调用方法 2: `User::onWriteConnection()->find($id);`

源码解释：通过  `onWriteConnection()`  函数 主要文件:

`/vendor/laravel/framework/src/Illuminate/Database/Eloquent/Model.php`

```
/**
 * Begin querying the model on the write connection.
 *
 * @return \Illuminate\Database\Query\Builder
 */
public static function onWriteConnection()
{
    $instance = new static;
    // query builder 指定使用写库
    return $instance->newQuery()->useWritePdo();
}
```

再看看  `query builder`  如何指定使用写库 主要文件：

`/vendor/laravel/framework/src/Illuminate/Database/Query/Builder.php`

```
/**
 * Use the write pdo for query.
 *
 * @return $this
 */
public function useWritePdo()
{
    // 指定使用写库，useWritePdo 为true
    $this->useWritePdo = true;
    return $this;
}
/**
 * Run the query as a "select" statement against the connection.
 *
 * @return array
 */
protected function runSelect()
{
    // 执行select时，useWritePdo原值为true，这里取反，被改成false；
    // 即$this->select()函数第三个参数为false，所以使用写库；
    return $this->connection->select($this->toSql(), $this->getBindings(), ! $this->useWritePdo);
}
```

## 开启日志验证

### 使用 mysql general log 来验证数据库读写分离

> 主数据库开启 general log

```
mysql> show global variables like '%general%';
+------------------+------------------------------------------------------+
| Variable_name    | Value                                                |
+------------------+------------------------------------------------------+
| general_log      | OFF                                                  |
| general_log_file | D:\soft\phpstudy\PHPTutorial\MySQL\data\admin-PC.log |
+------------------+------------------------------------------------------+
2 rows in set (0.00 sec)
mysql> set global general_log = on;
Query OK, 0 rows affected (0.05 sec)
```

> 从数据库开启 general log

```
mysql> show global variables like '%general%';
+------------------+-----------------------------------------------------------+
| Variable_name    | Value                                                     |
+------------------+-----------------------------------------------------------+
| general_log      | OFF                                                       |
| general_log_file | D:\soft\mysql5.7.24\mysql-5.7.24-winx64\data\admin-PC.log |
+------------------+-----------------------------------------------------------+
2 rows in set, 1 warning (0.00 sec)
mysql> set global general_log = on;
Query OK, 0 rows affected (0.04 sec)
```

> 关闭日志

```
mysql> set global general_log = off;
Query OK, 0 rows affected (0.01 sec)
```

```
// 指定log路径
// set global general_log_file='/tmp/general.lg';    #设置路径
// 也可以将日志记录在表中
// set global log_output='table' // 可以在mysql数据库下查找 general_log表
```

## 问题

**问题 1**

写入了数据，但查询时却报 No query result ，而且只是偶然性出现，没啥规律。

**解决方案**

初以为是 prettus/l5-repository 包的缓存引起的，但关掉它的缓存功能后问题依旧。后来好一阵折腾，直到再一次仔细翻看文档, 才发现
Laravel5.5 数据库读写分离配置的部分额外提到了一个 sticky 项，文档里这部分原文如下:
> The sticky Option
> The sticky option is an optional value that can be used to allow the immediate reading of records that have been
> written to the database during the current request cycle. If the sticky option is enabled and a "write" operation has
> been performed against the database during the current request cycle, any further "read" operations will use the "
> write"
> connection. This ensures that any data written during the request cycle can be immediately read back from the database
> during that same request. It is up to you to decide if this is the desired behavior for your application.

在没有启用  `sticky`  的时候，使用  `write`  连接写入数据后立即读取，读取时使用的是  `read`
连接，这样就有可能出问题。将  `sticky`  设置为  `true`
后，在与这个写入操作相同的请求周期内的后续读取操作，仍然使用原来的  `write`  连接。

或者  `强制使用写库`

**参考资料:**

[Laravel 5 配置读写分离和源码分析](https://laravel-china.org/topics/1879/laravel-5-configuration-read-and-write-separation-and-source-analysis)

[Laravel 5 配置数据库主从读写分离和源码分析](https://blog.csdn.net/hackercn9/article/details/54881068)

