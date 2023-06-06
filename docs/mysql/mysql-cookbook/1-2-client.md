# 1, 2. 使用 Mysql 客户端

### 1.1 建立 mysql 用户账号

```sql
# 创建用户
CREATE
    USER 'cbuser'@'%' IDENTIFIED WITH mysql_native_password AS 'cbpass';
GRANT ALL PRIVILEGES ON *.* TO
    'remote'@'%' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON `1dailian\_v2`.* TO
    'remote'@'%' WITH GRANT OPTION;
FLUSH
    PRIVILEGES;
# 创建用户并授权
GRANT ALL ON daniu.* TO 'cbuser' @'localhost' IDENTIFIED BY 'cbpass';
```

### 1.2 创建数据库和样表

```sql
CREATE
    DATABASE cookbook;
USE
    cookbook;
CREATE TABLE limbs
(
    thing VARCHAR(20),
    legs  INT,
    arms  INT
);
INSERT INTO limbs
VALUES ('human', 2, 2);
SELECT *
FROM limbs;
```

### 1.3 启动和停止 MySQL

```
# 启动
$ mysql -h host -p -u cbuser
# 导出
$ mysqldump -h localhost -p -u cbuser cookbook > cookbook.sql
# 服务器维护
$ mysqladmin -p -uroot shutdown
```

### 1.4 使用可选项文件来指定链接

my.ini / my.cnf 可以进行相应的配置

- 使用组的方式来组织数据
- 只允许使用选项的长格式
- `=` 前后允许存在空格
- 选项没有值, 可以略去 =value 部分
- 如果选项值中包含空格以及其他特殊符号, 可以使用 引号(单引号/双引号) 将数值包裹起来
- 不需要某行则绿区即可
- 文件中可以定义多个组
- 多次出现, 最后出现的拥有最高优先级
- `#`, `;` 开头的数据会被忽略

```properties
[client]
host=localhost
;user=root
[mysql]
skip-auto-rehash
```

### 1.5 保护选项文件不被其他用户读取

```shell
$ chmod 600 my.cnf
```

### 1.6 混合使用命令行参数和选项文件参数

命令行参数的优先级比选项文件中参数优先级高

### 1.7 找不到 mysql 应该怎么做

将 mysql 安装目录放到环境变量中.

### 1.8 发起 sql 语句

```
;     # 作为末尾输入
\g    # 作为结束替代输入  '\go'
\c    # 作为取消输入     '\cancel'
">    # 需要输入 双引号 来结束
'>    # 需要输入 单引号 来结束
/*>   # 需要输入 */ 来结束
```

### 1.9 从文件中读取语句

```
$ mysql cookbook < filename.sql
$ mysql -uroot -p
$ use cookbook
$ source filename.sql
```

### 1.10 打印错误

```
$ perror 24
OS error code  24:  Too many open files
```

### 1.11 让 mysql 读取其他程序的 数据

```
# 从文件读取sql
$ mysql cookbook < limbs.sql
# 另外一种方法的文件读取
$ cat limbs.sql | mysql cookbook
# 跨境传输数据
$ mysqldump cookbook | mysql -h other.host.com cookbook
# 生成数据
$ gen-test-data.sh | mysql cookbook
```

### 1.12 一行输入所有 sql

```
$ mysql -uroot -e "select count(*) from mk_pam_account" daniu
# 多条数据
$ mysql -uroot -e "select count(*) from mk_pam_account;select now()" daniu
+----------+
| count(*) |
+----------+
|     2342 |
+----------+
+---------------------+
| now()               |
+---------------------+
| 2019-04-10 23:44:49 |
+---------------------+
```

### 1.13 预防查询输出超出屏幕范围

```
# 指定 --pager 使其每次都显示一行输出
$ mysql -uroot --pager=/usr/bin/less
# 无参数代表使用系统默认分页
$ mysql -uroot --pager
# mysql 中使用分页
# 设置默认分页
mysql> \P
# 设置指定分页
mysql> \P /usr/bin/less
# 恢复基本输出
mysql> \n
```

### 1.14 查询结果输出

**交互模式**

交互模式下输出的是表格

**非交互模式**

输出的是以制表符分隔的数据体

`-t` or `--table`

如果输出格式强制使用 table 表格输出可以携带参数

`-B` or `--batch`

如果输出格式强制使用批量(定界符)输出, 可以使用

`-H` or `--html`

生成 html 格式

`-X` or `--xml`

使用 XML 格式输出

`-ss` or `--skip-column-names`

不在查询中输出包含列头部

### 1.15 查询结果二次转换

如果查询结果并不能按照我们的期望输出, 可以使用 `sed`, `tr` 来进行二次转换

### 1.16 使长输出行更具可读性

```
mysql> show full columns from limbs\G
```

`-E` or `--vertical`

进行垂直输出

### 1.17 冗长输出和简介输出

`-v` or `-vv` or `-vvv`

冗长输出

`-s` or `-ss` or `-sss`

进行简洁输出

### 1.18 记录操作步骤

`-tee` or `\T` or `\t`

进行脚本记录的输出, 这些输出可供记录并且可以用作批处理文件

### 1.19 用户自定义变量

```
# 从执行过程中获取值
mysql > select @id:=id from libms;
mysql > select * from abcolumsn where id = @id;
# 设置值使用 set
mysql > set @sum = 4+7;
```

### 1.20 mysql 数学函数

```
select 20/sqrt(64);
```

### 1.21 shell 脚本中使用 mysql

```
# 多行文本的输入并且支持变量
mysql cookbook <<< INPUT
    select * from $1
INPUT
```

