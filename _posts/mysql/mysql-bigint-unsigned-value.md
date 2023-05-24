---
title: "[Debug] 数据库查询出现 BIGINT UNSIGNED value is out of range 问题"
date: 2021-01-28 21:41:43
toc: true
categories:
- ["Mysql"]
---

BIGINT UNSIGNED value is out of range in '(((unix_timestamp()) - unix_timestamp(`db`.`order`.`assigned_at`)) - (`db`.`order`.`order_hours` * 3600))', Time: 0.003000s




```javascript
	SELECT
    id,
    order_no,
    UNIX_TIMESTAMP (),
    UNIX_TIMESTAMP( assigned_at ),
    order_hours,
    UNIX_TIMESTAMP ()- UNIX_TIMESTAMP( assigned_at )- `order_hours` * 3600 as diff
FROM
  db.order 
WHERE
  order_status = 'ing' 
-- 	AND
-- 	( `sd_account_id` = '10347' OR `employee_id` = '10347' ) 
  AND ( UNIX_TIMESTAMP ()- UNIX_TIMESTAMP( assigned_at )- `order_hours` * 3600 ) > 0 
  LIMIT 10;
```

解决问题路径 : [MySQL error #1690 (BIGINT UNSIGNED value is out of range) for UNIX_TIMESTAMP()](https://stackoverflow.com/questions/34115917/mysql-error-1690-bigint-unsigned-value-is-out-of-range-for-unix-timestamp)

> Your second value in table will give negative result, so you get an error.
> To make negative results possible in your case, use before query
> SET sql_mode = 'NO_UNSIGNED_SUBTRACTION';


查询不能是负值, 可以使用 `>` 对比, 不要使用计算并 > 0

