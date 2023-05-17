# 其它服务 - chdb

关联网址: http://cr.yp.to/cdb.html chdb (constant hash database)是一个键值对应的数据库

## 安装

这个模块使用 cmph 模块的 perfect hashing 函数

http://pecl.php.net/package/chdb

## 配置

## 定义常量

## 函数

```
chdb {
    /* Methods */
    // 创建, 路径为 chdb 文件的路径, 创建一个 chdb 实例
    public __construct ( string $pathname )

    // 根据 键名返回值
    public string get ( string $key )
}
```

`bool chdb_create ( string $pathname , array $data )`

建立一个 chdb 文件, 将指定的数组存入到文件中