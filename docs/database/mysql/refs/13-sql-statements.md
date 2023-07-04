# SQL 语句

## 数据定义

## 数据维护

## 事务和锁定

## 复制语句

## 参数化查询

## 复合语句

## 数据库管理语句

### 账号管理语句

#### ALTER USER 语句

**修改用户的密码**

```sql
ALTER USER 'jeffrey'@'localhost' IDENTIFIED BY 'new_password' 
```

#### CREATE USER 语句

```sql
CREATE USER 'jeffrey'@'localhost' IDENTIFIED BY 'password';
```

#### GRANT 语句

```sql
# 设置权限
GRANT SELECT ON db2.invoice TO 'jeffrey'@'localhost';

# 设置同时修改密码
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'mypassword';

# 设置, 修改密码, 同时授权
GRANT ALL PRIVILEGES ON *.* TO 'imvkmark'@'123.171.248.5' IDENTIFIED BY 'mypassword' WITH GRANT PTION;
```

#### RENAME USER 语句

```sql
RENAME USER 'jeffrey'@'localhost' TO 'jeff'@'127.0.0.1';
```