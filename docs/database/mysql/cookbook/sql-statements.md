---
description: 'SQL语句涵盖数据定义、维护、事务、复制、参数化查询、复合语句及数据库管理，尤其账号管理包括ALTER USER、CREATE USER、删除用户、GRANT权限设置、同时修改密码授权及RENAME USER等操作。'
lastUpdated: '2026-03-04 15:04:22'
head:
  - - meta
    - name: 'og:title'
      content: '8. SQL 语句'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SQL语句涵盖数据定义、维护、事务、复制、参数化查询、复合语句及数据库管理，尤其账号管理包括ALTER USER、CREATE USER、删除用户、GRANT权限设置、同时修改密码授权及RENAME USER等操作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/mysql/cookbook/sql-statements.html'
---
# 8. SQL 语句

## 数据定义

## 数据维护

## 事务和锁定

## 复制语句

## 参数化查询

## 复合语句

## 数据库管理语句

### 账号管理语句

### ALTER USER 语句

**修改用户的密码**

```SQL
ALTER USER 'jeffrey'@'localhost' IDENTIFIED BY 'new_password'
```

### CREATE USER 语句

```SQL
CREATE USER 'jeffrey'@'localhost' IDENTIFIED BY 'password';
```

### 删除用户

```SQL
DROP USER 'jeffrey'@'localhost';
```

### GRANT 语句

```SQL
# 设置权限
GRANT SELECT ON db2.invoice TO 'jeffrey'@'localhost';

# 设置同时修改密码
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'mypassword';

# 设置, 修改密码, 同时授权
GRANT ALL PRIVILEGES ON *.* TO 'imvkmark'@'123.171.248.5' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;
```

### RENAME USER 语句

```SQL
RENAME USER 'jeffrey'@'localhost' TO 'jeff'@'127.0.0.1';
```