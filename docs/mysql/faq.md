# MySQL - FAQ

## mysql Error 1040 too many connection解决办法

最近在开发的时候，突然出现1040 too many connection的错误，看错误的意思是连接的人数太多了。

当最大连接数比较小时，可能会出现以下错误
> 1040 too many connection

首先需要重启`mysql`服务，执行命令

```
# centos
service mysqld restart
# ubuntu
service mysql restart
# mac
brew services restart mysql
```

登录mysql

```
$ mysql -uroot -p
```

登录成功后执行以下语句查询当前的最大连接数：

```
select VARIABLE_VALUE from information_schema.GLOBAL_VARIABLES where VARIABLE_NAME='MAX_CONNECTIONS
```

执行以下语句修改最大连接数：

```
set global max_connections = 3600;
```

