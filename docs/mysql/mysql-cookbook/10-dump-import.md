# 10. 数据导入导出

### 10.1 使用 Load Data 和 mysqlimport 导入数据

```
Load Data Local InFile 'file.txt' Into Table tbl_name
    Fields Terminated By ':'
        Enclosed By '"'   # 指定引用
        Escaped By ''     # 指定转义
    Lines Terminated By '\r'
    Ignore 1 Lines;       # 指定忽略
# 默认使用制表符 \t
# 换行代表一行数据
# 需要 File 权限
# 文件位于服务器机器上
# 相对路径的文件位于 数据库存储 位置
# 没有 Local 读取服务器文件
# 存在 Local 读取本地文件
# Replace Into 是对数据进行替代操作, 存在则不进行处理
# 使用 Show Warnings 来显示相关的警告信息
# 表格后可以指定列 tbl_name(col1, col2, col3), 默认全部
```

```
$ mysqlimport --local tbl_name file.txt
    --fields-terminated-by=':'
    --fields-enclosed-by=':'
    --fields-escaped-by=':'
    --lines-terminated-by='\r'
    --columns=a,b,c
```

### 10.2 导入时候对数据进行预处理

```
Load Data Local InFile 'file.txt' Into Table tbl_name
    (@cola, @colb, @colc)
    Set
        dt = concat(@cola, ' ', $colc),
        df = substring_index(@colb, ' ', 1)
        ...;
```

### 10.3 mysql 导出

```
$ mysql -e "select ...." --skip-column-names tbl_name
    >> data.txt
```

### 10.4 SQLMode

通过设置 sql_mode 变量来开启输入数据接收限制.

### 11.1 生成和使用序列

```
Auto_Increment # 列
id Int Unsigned Not Null Auto_Increment,
Primary Key(id)
```

### 12.1 在表中找到与另一个表中的行相匹配的行

使用 join

一个完全的连接将产生所有可能的行联合, 即笛卡尔积.正因为如此同时也很少使用两个以上表的联合, 连接通常会包含 On 或 Using 子句以指定如何在表间进行连接

```
Select * From artist, painting
    where artist.a_id = painting.a_id
Select * From artist Inner Join painting
    on artist.a_id = painting.a_id
Select * From artist Inner Join painting
    on using(a_id)
```

Inner Join 所编写的连接为内部连接, 这意味着它们只为某个表中与其他表的值相匹配的值产生结果.

外部连接(Left Join/Right Join)同样可以产生这些匹配, 此外还可以为你显示某个表中的哪些值于另外一个表中的值是不相符的.

`Left Join` 的意思是左侧为基准, 右侧数据可以为空, `Right Join` 则相反.

