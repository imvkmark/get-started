---
title: "[私] mysql 慢查询优化"
date: 2021-06-26 10:36:52
toc: true
categories:
- ["Mysql","优化"]
---

### 订单根据游戏来统计


```
select count(id) as co, game_id from `mk_game_order` 
    where `order_status` = 'publish' 
    group by `game_id`
```

这里优化的方式是给 `order_status` 和 `game_id` 两个都加入了索引,根据游戏还有订单状态来统计网站的订单数量.


### 公有/私有订单的查询

```
select count(*) as aggregate from `mk_game_order` 
where 
	`order_status` = 'publish' 
	and (
	   (`is_public` = 'Y' and `account_id` != '58567') 
	   or 
	   (`is_public` = 'N' and match (push_to) against (",_58567_," IN BOOLEAN MODE))) 
order by `created_at` desc;
```

优化项目:

1. 区分公有和私有, 因为私有的加载项目太缓慢, 全文检索太缓慢, 同时查询量也很少
2. 排序, 使用 id 排序比创建时间排序速度要快

