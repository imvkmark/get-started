---
title: "ecshop 2.7.2 数据字典"
date: 2022-04-14 22:09:35
toc: true
categories:
- ["Php","源码阅读","ecshop"]
---

**Query**  [1]  **--**  [**SHOW TABLES**]
> **Query Result..**

| **(row)** | **Tables_in_ecshop** | 描述 |
| --- | --- | :---: |
| 1 | mg_account_log | <br /> |
| 2 | mg_ad | <br /> |
| 3 | mg_ad_custom | <br /> |
| 4 | mg_ad_position | <br /> |
| 5 | mg_admin_action | <br /> |
| 6 | mg_admin_log | <br /> |
| 7 | mg_admin_message | <br /> |
| 8 | mg_admin_user | <br /> |
| 9 | mg_adsense | <br /> |
| 10 | mg_affiliate_log | <br /> |
| 11 | mg_agency | <br /> |
| 12 | mg_area_region | <br /> |
| 13 | mg_article | <br /> |
| 14 | mg_article_cat | <br /> |
| 15 | mg_attribute | <br /> |
| 16 | mg_auction_log | <br /> |
| 17 | mg_auto_manage | <br /> |
| 18 | mg_back_goods | <br /> |
| 19 | mg_back_order | <br /> |
| 20 | mg_bonus_type | <br /> |
| 21 | mg_booking_goods | <br /> |
| 22 | mg_brand | <br /> |
| 23 | mg_card | <br /> |
| 24 | mg_cart | <br /> |
| 25 | mg_cat_recommend | <br /> |
| 26 | mg_category | <br /> |
| 27 | mg_collect_goods | <br /> |
| 28 | mg_comment | <br /> |
| 29 | mg_crons | <br /> |
| 30 | mg_delivery_goods | <br /> |
| 31 | mg_delivery_order | <br /> |
| 32 | mg_email_list | <br /> |
| 33 | mg_email_sendlist | <br /> |
| 34 | mg_error_log | <br /> |
| 35 | mg_exchange_goods | <br /> |
| 36 | mg_favourable_activity | <br /> |
| 37 | mg_feedback | <br /> |
| 38 | mg_friend_link | <br /> |
| 39 | mg_goods | <br /> |
| 40 | mg_goods_activity | <br /> |
| 41 | mg_goods_article | <br /> |
| 42 | mg_goods_attr | <br /> |
| 43 | mg_goods_cat | <br /> |
| 44 | mg_goods_gallery | <br /> |
| 45 | mg_goods_type | <br /> |
| 46 | mg_group_goods | <br /> |
| 47 | mg_keywords | <br /> |
| 48 | mg_link_goods | <br /> |
| 49 | mg_mail_templates | <br /> |
| 50 | mg_member_price | <br /> |
| 51 | mg_nav | <br /> |
| 52 | mg_order_action | <br /> |
| 53 | mg_order_goods | <br /> |
| 54 | mg_order_info | <br /> |
| 55 | mg_pack | <br /> |
| 56 | mg_package_goods | <br /> |
| 57 | mg_pay_log | <br /> |
| 58 | mg_payment | <br /> |
| 59 | mg_plugins | <br /> |
| 60 | mg_products | <br /> |
| 61 | mg_reg_extend_info | <br /> |
| 62 | mg_reg_fields | <br /> |
| 63 | mg_region | <br /> |
| 64 | mg_role | <br /> |
| 65 | mg_searchengine | <br /> |
| 66 | mg_sessions | <br /> |
| 67 | mg_sessions_data | <br /> |
| 68 | mg_shipping | <br /> |
| 69 | mg_shipping_area | <br /> |
| 70 | mg_shop_config | <br /> |
| 71 | mg_snatch_log | <br /> |
| 72 | mg_stats | <br /> |
| 73 | mg_suppliers | <br /> |
| 74 | mg_tag | <br /> |
| 75 | mg_template | <br /> |
| 76 | mg_topic | <br /> |
| 77 | mg_user_account | <br /> |
| 78 | mg_user_address | <br /> |
| 79 | mg_user_bonus | <br /> |
| 80 | mg_user_feed | <br /> |
| 81 | mg_user_rank | <br /> |
| 82 | mg_users | <br /> |
| 83 | mg_virtual_card | <br /> |
| 84 | mg_volume_price | <br /> |
| 85 | mg_vote | <br /> |
| 86 | mg_vote_log | <br /> |
| 87 | mg_vote_option | <br /> |
| 88 | mg_wholesale | <br /> |


---

> **Query**  [2]  > **--**  [> **DESC mg_account_log**]> **用户账目日志表**

| **(row)** | **Field** | **Type** | **Null** | **Key** | **Default** | **Extra** | 注释 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | log_id | mediumint(8) unsigned | NO | PRI |  | auto_increment | 自增ID |
| 2 | user_id | mediumint(8) unsigned | NO | MUL |  |  | 关联user表中的user_id |
| 3 | user_money | decimal(10,2) | NO |  |  |  | 用户该笔记录中的余额 |
| 4 | frozen_money | decimal(10,2) | NO |  |  |  | 被冻结的资金 |
| 5 | rank_points | mediumint(9) | NO |  |  |  | 等级积分,跟消费积分是分开的 |
| 6 | pay_points | mediumint(9) | NO |  |  |  | 消费积分,跟等级积分是分开的 |
| 7 | change_time | int(10) unsigned | NO |  |  |  | 该笔操作发生的时间 |
| 8 | change_desc | varchar(255) | NO |  |  |  | 该笔操作的备注 |
| 9 | change_type | tinyint(3) unsigned | NO |  |  | <br /> | 操作类型:<br />0:充值,1:提现,2:管理员调整,<br />99:其他类型 |

自增序列采用 mediumint(8) unsigned 作为类型进行切换,如果没有使用zerofill或者长度超出了最大长度,这里的限定长度值就是没有任何意义的.

---

> **Query**  [3]  > **--**  [> **DESC mg_ad**]> **广告表**

| **(row)** | string 11<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ad_id | smallint(5) unsigned | NO | PRI |  | auto_increment | 自增ID |
| 2 | position_id | smallint(5) unsigned | NO | MUL | 0 |  | 0:站外广告<br />从1开始代表的是对应ad_position中ad_id的值 |
| 3 | media_type | tinyint(3) unsigned | NO |  | 0 |  | 广告类型:0:图片,1:flash,2:代码,3:文字 |
| 4 | ad_name | varchar(60) | NO |  |  |  | 该条广告记录的广告名称 |
| 5 | ad_link | varchar(255) | NO |  |  |  | 广告的地址,链接地址 |
| 6 | ad_code | text | NO |  |  |  | 广告链接的表现,<br />文字广告,这里存放的就是文字<br />图片和flash广告,这里存在的就是地址 |
| 7 | start_time | int(11) | NO |  | 0 |  | 广告开始的时间,unix时间戳 |
| 8 | end_time | int(11) | NO |  | 0 |  | 广告结束的时间,unix时间戳 |
| 9 | link_man | varchar(60) | NO |  |  |  | 广告联系人 |
| 10 | link_email | varchar(60) | NO |  |  |  | 广告联系人的email |
| 11 | link_phone | varchar(60) | NO |  |  |  | 广告联系人的电话 |
| 12 | click_count | mediumint(8) unsigned | NO |  | 0 |  | 改广告的点击次数 |
| 13 | enabled | tinyint(3) unsigned | NO | MUL | 1 |  | 改广告是否关闭<br />0:关闭,1启用 |

<br />

---

> **Query**  [4]  > **--**  [> **DESC mg_ad_custom**]> **Query Result..**

| **(row)** | string 9<br />**Field** | blob 21<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | ad_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | ad_type | tinyint(1) unsigned | NO |  | 1 |  |
| 3 | ad_name | varchar(60) | YES |  |  |  |
| 4 | add_time | int(10) unsigned | NO |  | 0 |  |
| 5 | content | mediumtext | YES |  |  |  |
| 6 | url | varchar(255) | YES |  |  |  |
| 7 | ad_status | tinyint(3) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [5]  > **--**  [> **DESC mg_ad_position**]> **广告位**

| **(row)** | string 14<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | position_id | tinyint(3) unsigned | NO | PRI |  | auto_increment | 广告位的id |
| 2 | position_name | varchar(60) | NO |  |  |  | 广告位的名称 |
| 3 | ad_width | smallint(5) unsigned | NO |  | 0 |  | 宽度 |
| 4 | ad_height | smallint(5) unsigned | NO |  | 0 |  | 高度 |
| 5 | position_desc | varchar(255) | NO |  |  |  | 广告位描述 |
| 6 | position_style | text | NO |  |  |  | 广告位模板代码 |

<br />

---

> **Query**  [6]  > **--**  [> **DESC mg_admin_action**]> **管理权限分配**

| **(row)** | string 11<br />**Field** | blob 19<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | action_id | tinyint(3) unsigned | NO | PRI |  | auto_increment | 自增id |
| 2 | parent_id | tinyint(3) unsigned | NO | MUL | 0 |  | 父id,对应本表的action_id |
| 3 | action_code | varchar(20) | NO |  |  |  | 代表权限的英文字符串,对应汉文在语言文件中,如果该字段有某个字符串,就表示有该权限 |
| 4 | relevance | varchar(20) | NO |  |  |  | <br /> |

<br />

---

> **Query**  [7]  > **--**  [> **DESC mg_admin_log**]> **管理日志**

| **(row)** | string 10<br />**Field** | blob 19<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | log_id | int(10) unsigned | NO | PRI |  | auto_increment | 日志id |
| 2 | log_time | int(10) unsigned | NO | MUL | 0 |  | 日志写入时间 |
| 3 | user_id | tinyint(3) unsigned | NO | MUL | 0 |  | 用户id,和admin_user表关联 |
| 4 | log_info | varchar(255) | NO |  |  |  | 日志信息 |
| 5 | ip_address | varchar(15) | NO |  |  |  | 登录IP |

<br />

---

> **Query**  [8]  > **--**  [> **DESC mg_admin_message**]> **管理员留言**

| **(row)** | string 11<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | message_id | smallint(5) unsigned | NO | PRI |  | auto_increment | 自增id |
| 2 | sender_id | tinyint(3) unsigned | NO | MUL | 0 |  | 发送者id |
| 3 | receiver_id | tinyint(3) unsigned | NO | MUL | 0 |  | 接收者id |
| 4 | sent_time | int(11) unsigned | NO |  | 0 |  | 发送时间 |
| 5 | read_time | int(11) unsigned | NO |  | 0 |  | 阅读时间 |
| 6 | readed | tinyint(1) unsigned | NO |  | 0 |  | 已阅 |
| 7 | deleted | tinyint(1) unsigned | NO |  | 0 |  | 已删 |
| 8 | title | varchar(150) | NO |  |  |  | 标题 |
| 9 | message | text | NO |  |  |  | 信息 |

<br />

---

> **Query**  [9]  > **--**  [> **DESC mg_admin_user**]> **管理员信息**

| **(row)** | string 12<br />**Field** | blob 20<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | user_id | smallint(5) unsigned | NO | PRI |  | auto_increment | 自增id号,管理员代码,管理员和前台用户不共用信息表 |
| 2 | user_name | varchar(60) | NO | MUL |  |  | 管理员登录名 |
| 3 | email | varchar(60) | NO |  |  |  | 管理员邮箱 |
| 4 | password | varchar(32) | NO |  |  |  | 管理员密码 |
| 5 | add_time | int(11) | NO |  | 0 |  | 管理员添加的时间 |
| 6 | last_login | int(11) | NO |  | 0 |  | 管理员上次登录的时间 |
| 7 | last_ip | varchar(15) | NO |  |  |  | 管理员上次登录的ip |
| 8 | action_list | text | NO |  |  |  | 管理员管理权限列表 |
| 9 | nav_list | text | NO |  |  |  | 管理员导航栏配置项 |
| 10 | lang_type | varchar(50) | NO |  |  |  | <br /> |
| 11 | agency_id | smallint(5) unsigned | NO | MUL |  |  | 改管理员负责的办事处的id,对应agency表中的agency_id字段 |
| 12 | suppliers_id | smallint(5) unsigned | YES |  | 0 |  | <br /> |
| 13 | todolist | longtext | YES |  |  |  | 记事本记录的数据 |
| 14 | role_id | smallint(5) | YES |  |  |  | <br /> |

<br />

---

> **Query**  [10]  > **--**  [> **DESC mg_adsense**]> **广告相关统计**

| **(row)** | string 7<br />**Field** | blob 16<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | from_ad | smallint(5) | NO | MUL | 0 |  | 广告标识,-1是外部广告,如果是站内广告则对应ad的ad_id |
| 2 | referer | varchar(255) | NO |  |  |  | 页面来源 |
| 3 | clicks | int(10) unsigned | NO |  | 0 |  | 点击次数 |

<br />

---

> **Query**  [11]  > **--**  [> **DESC mg_affiliate_log**]> **分成日志**

| **(row)** | string 13<br />**Field** | blob 13<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | log_id | mediumint(8) | NO | PRI |  | auto_increment | 自增 |
| 2 | order_id | mediumint(8) | NO |  |  |  | 订单的id |
| 3 | time | int(10) | NO |  |  |  | 时间 |
| 4 | user_id | mediumint(8) | NO |  |  |  | 用户id |
| 5 | user_name | varchar(60) | YES |  |  |  | 用户名 |
| 6 | money | decimal(10,2) | NO |  | 0.00 |  | 钱 |
| 7 | point | int(10) | NO |  | 0 |  | 积分 |
| 8 | separate_type | tinyint(1) | NO |  | 0 |  | 特殊说明 |

<br />

---

> **Query**  [12]  > **--**  [> **DESC mg_agency**]> **办事处**

| **(row)** | string 11<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | agency_id | smallint(5) unsigned | NO | PRI |  | auto_increment | 办事处id |
| 2 | agency_name | varchar(255) | NO | MUL |  |  | 办事处名称 |
| 3 | agency_desc | text | NO |  |  |  | 办事处介绍 |

<br />

---

> **Query**  [13]  > **--**  [> **DESC mg_area_region**]> **配送区域关联**

| **(row)** | string 16<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | shipping_area_id | smallint(5) unsigned | NO | PRI | 0 |  | 配送区域的id,关联与shipping_area的shipping_area_id |
| 2 | region_id | smallint(5) unsigned | NO | PRI | 0 |  | 地区列表,关联与region的region_id |

<br />

---

> **Query**  [14]  > **--**  [> **DESC mg_article**]> **文章**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | article_id | mediumint(8) unsigned | NO | PRI |  | auto_increment | 自增id |
| 2 | cat_id | smallint(5) | NO | MUL | 0 |  | 分类id |
| 3 | title | varchar(150) | NO |  |  |  | 标题 |
| 4 | content | longtext | NO |  |  |  | 内容 |
| 5 | author | varchar(30) | NO |  |  |  | 作者 |
| 6 | author_email | varchar(60) | NO |  |  |  | 作者的email |
| 7 | keywords | varchar(255) | NO |  |  |  | 关键词 |
| 8 | article_type | tinyint(1) unsigned | NO |  | 2 |  | 文章的类型 |
| 9 | is_open | tinyint(1) unsigned | NO |  | 1 |  | 是否显示 |
| 10 | add_time | int(10) unsigned | NO |  | 0 |  | 文章的添加时间 |
| 11 | file_url | varchar(255) | NO |  |  |  | 上传文件或者外部文件的url |
| 12 | open_type | tinyint(1) unsigned | NO |  | 0 |  | 上传的文件的显示标识<br />0:正常<br />1/2:会在文章最后添加一个链接"相关下载",链接地址等同于file_url的值<br /> |
| 13 | link | varchar(255) | NO |  |  |  | 文章标题所引用的链接,如果存在值则不显示文章的内容,相当于一个对外的链接 |
| 14 | description | varchar(255) | YES |  |  |  | 文章的描述 |

<br />

---

> **Query**  [15]  > **--**  [> **DESC mg_article_cat**]> **文章分类**

| **(row)** | string 11<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 2<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | cat_id | smallint(5) | NO | PRI |  | auto_increment | 自增id |
| 2 | cat_name | varchar(255) | NO |  |  |  | 分类名称 |
| 3 | cat_type | tinyint(1) unsigned | NO | MUL | 1 |  | 分类类型<br />1,普通分类2,系统分类 3,网店信息 4, 帮助分类 5,网店帮助 |
| 4 | keywords | varchar(255) | NO |  |  |  | 关键词 |
| 5 | cat_desc | varchar(255) | NO |  |  |  | 分类描述 |
| 6 | sort_order | tinyint(3) unsigned | NO | MUL | 50 |  | 排序标志 |
| 7 | show_in_nav | tinyint(1) unsigned | NO |  | 0 |  | 是否在导航栏显示 |
| 8 | parent_id | smallint(5) unsigned | NO | MUL | 0 |  | 父id |

<br />

---

> **Query**  [16]  > **--**  [> **DESC mg_attribute**]> **商品属性**

| **(row)** | string 15<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | attr_id | smallint(5) unsigned | NO | PRI |  | auto_increment | 自增id |
| 2 | cat_id | smallint(5) unsigned | NO | MUL | 0 |  | 商品类型,等同于goods_type的cat_id |
| 3 | attr_name | varchar(60) | NO |  |  |  | 属性名称 |
| 4 | attr_input_type | tinyint(1) unsigned | NO |  | 1 |  | 属性的添加类型<br />0为手功输入;1为选择输入;2为多行文本输入 |
| 5 | attr_type | tinyint(1) unsigned | NO |  | 1 |  | 属性是否多选<br />0否; 1是 如果可以多选,则可以自定义属性,并且可以根据值的不同定不同的价 |
| 6 | attr_values | text | NO |  |  |  | 属性的值<br />选择输入,则attr_name对应的值的取值就是该这字段值   |
| 7 | attr_index | tinyint(1) unsigned | NO |  | 0 |  | 属性是否检索<br />0不需要检索; 1关键字检索2范围检索<br />如果检索的话,可以通过该属性找到有该属性的商品 |
| 8 | sort_order | tinyint(3) unsigned | NO |  | 0 |  | 属性排序 |
| 9 | is_linked | tinyint(1) unsigned | NO |  | 0 |  | 属性是否关联,<br />0 不关联 1关联;<br />如果关联, 那么用户在购买该商品时,具有有该属性相同的商品将被推荐给用户 |
| 10 | attr_group | tinyint(1) unsigned | NO |  | 0 |  | 属性分组<br />相同的为一个属性组应该取自goods_type的attr_group的值的顺序. |

<br />

---

> **Query**  [17]  > **--**  [> **DESC mg_auction_log**]> **拍卖日志**

| **(row)** | string 9<br />**Field** | blob 22<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | log_id | mediumint(8) unsigned | NO | PRI |  | auto_increment | 自增 |
| 2 | act_id | mediumint(8) unsigned | NO | MUL |  |  | 拍卖活动的id |
| 3 | bid_user | mediumint(8) unsigned | NO |  |  |  | 出价用户的id,关联与users表中的user_id |
| 4 | bid_price | decimal(10,2) unsigned | NO |  |  |  | 出价价格 |
| 5 | bid_time | int(10) unsigned | NO |  |  |  | 出价时间 |

<br />

---

> **Query**  [18]  > **--**  [> **DESC mg_auto_manage**]> **推广链接的记录信息**

| **(row)** | string 9<br />**Field** | blob 12<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 0<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | item_id | mediumint(8) | NO | PRI |  |  | 条目id,<br />商品则对应goods的goods_id<br />文章则对应article的article_id |
| 2 | type | varchar(10) | NO | PRI |  |  | goods是商品,article是文章 |
| 3 | starttime | int(10) | NO |  |  |  | 开始时间 |
| 4 | endtime | int(10) | NO |  |  |  | 结束时间 |

<br />

---

> **Query**  [19]  > **--**  [> **DESC mg_back_goods**]> **Query Result..**

| **(row)** | string 11<br />**Field** | blob 21<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | rec_id | mediumint(8) unsigned | NO | PRI |  | auto_increment | <br /> |
| 2 | back_id | mediumint(8) unsigned | YES | MUL | 0 |  | <br /> |
| 3 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  | <br /> |
| 4 | product_id | mediumint(8) unsigned | NO |  | 0 |  | <br /> |
| 5 | product_sn | varchar(60) | YES |  |  |  | <br /> |
| 6 | goods_name | varchar(120) | YES |  |  |  | <br /> |
| 7 | brand_name | varchar(60) | YES |  |  |  | <br /> |
| 8 | goods_sn | varchar(60) | YES |  |  |  | <br /> |
| 9 | is_real | tinyint(1) unsigned | YES |  | 0 |  | <br /> |
| 10 | send_number | smallint(5) unsigned | YES |  | 0 |  | <br /> |
| 11 | goods_attr | text | YES |  |  |  | <br /> |

<br />

---

> **Query**  [20]  > **--**  [> **DESC mg_back_order**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 22<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | back_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | delivery_sn | varchar(20) | NO |  |  |  |
| 3 | order_sn | varchar(20) | NO |  |  |  |
| 4 | order_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 5 | invoice_no | varchar(50) | YES |  |  |  |
| 6 | add_time | int(10) unsigned | YES |  | 0 |  |
| 7 | shipping_id | tinyint(3) unsigned | YES |  | 0 |  |
| 8 | shipping_name | varchar(120) | YES |  |  |  |
| 9 | user_id | mediumint(8) unsigned | YES | MUL | 0 |  |
| 10 | action_user | varchar(30) | YES |  |  |  |
| 11 | consignee | varchar(60) | YES |  |  |  |
| 12 | address | varchar(250) | YES |  |  |  |
| 13 | country | smallint(5) unsigned | YES |  | 0 |  |
| 14 | province | smallint(5) unsigned | YES |  | 0 |  |
| 15 | city | smallint(5) unsigned | YES |  | 0 |  |
| 16 | district | smallint(5) unsigned | YES |  | 0 |  |
| 17 | sign_building | varchar(120) | YES |  |  |  |
| 18 | email | varchar(60) | YES |  |  |  |
| 19 | zipcode | varchar(60) | YES |  |  |  |
| 20 | tel | varchar(60) | YES |  |  |  |
| 21 | mobile | varchar(60) | YES |  |  |  |
| 22 | best_time | varchar(120) | YES |  |  |  |
| 23 | postscript | varchar(255) | YES |  |  |  |
| 24 | how_oos | varchar(120) | YES |  |  |  |
| 25 | insure_fee | decimal(10,2) unsigned | YES |  | 0.00 |  |
| 26 | shipping_fee | decimal(10,2) unsigned | YES |  | 0.00 |  |
| 27 | update_time | int(10) unsigned | YES |  | 0 |  |
| 28 | suppliers_id | smallint(5) | YES |  | 0 |  |
| 29 | status | tinyint(1) unsigned | NO |  | 0 |  |
| 30 | return_time | int(10) unsigned | YES |  | 0 |  |
| 31 | agency_id | smallint(5) unsigned | YES |  | 0 |  |

<br />

---

> **Query**  [21]  > **--**  [> **DESC mg_bonus_type**]> **红包**

| **(row)** | string 16<br />**Field** | blob 22<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** | <br /> |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | type_id | smallint(5) unsigned | NO | PRI |  | auto_increment | 自增id |
| 2 | type_name | varchar(60) | NO |  |  |  | 红包名称 |
| 3 | type_money | decimal(10,2) | NO |  | 0.00 |  | 红包金额 |
| 4 | send_type | tinyint(3) unsigned | NO |  | 0 |  | 红包发送类型<br />0按用户如会员等级,会员名称发放;<br />1按商品类别发送;<br />2按订单金额所达到的额度发送;<br />3线下发送 |
| 5 | min_amount | decimal(10,2) unsigned | NO |  | 0.00 |  | 如果按金额发送红包<br />该项是最小金额,即只要购买超过该金额的商品都可以领到红包   |
| 6 | max_amount | decimal(10,2) unsigned | NO |  | 0.00 |  | <br /> |
| 7 | send_start_date | int(11) | NO |  | 0 |  | 发送的开始日期 |
| 8 | send_end_date | int(11) | NO |  | 0 |  | 发送的截止日期 |
| 9 | use_start_date | int(11) | NO |  | 0 |  | 红包可以使用的时间 |
| 10 | use_end_date | int(11) | NO |  | 0 |  | 红包截止使用的时间 |
| 11 | min_goods_amount | decimal(10,2) unsigned | NO |  | 0.00 |  | 可以使用该红包的商品的最低价格,即只要达到该价格商品才可以使用红包 |

<br />

---

> **Query**  [22]  > **--**  [> **DESC mg_booking_goods**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | rec_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | user_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | email | varchar(60) | NO |  |  |  |
| 4 | link_man | varchar(60) | NO |  |  |  |
| 5 | tel | varchar(60) | NO |  |  |  |
| 6 | goods_id | mediumint(8) unsigned | NO |  | 0 |  |
| 7 | goods_desc | varchar(255) | NO |  |  |  |
| 8 | goods_number | smallint(5) unsigned | NO |  | 0 |  |
| 9 | booking_time | int(10) unsigned | NO |  | 0 |  |
| 10 | is_dispose | tinyint(1) unsigned | NO |  | 0 |  |
| 11 | dispose_user | varchar(30) | NO |  |  |  |
| 12 | dispose_time | int(10) unsigned | NO |  | 0 |  |
| 13 | dispose_note | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [23]  > **--**  [> **DESC mg_brand**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 2<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | brand_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | brand_name | varchar(60) | NO |  |  |  |
| 3 | brand_logo | varchar(80) | NO |  |  |  |
| 4 | brand_desc | text | NO |  |  |  |
| 5 | site_url | varchar(255) | NO |  |  |  |
| 6 | sort_order | tinyint(3) unsigned | NO |  | 50 |  |
| 7 | is_show | tinyint(1) unsigned | NO | MUL | 1 |  |

<br />

---

> **Query**  [24]  > **--**  [> **DESC mg_card**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | card_id | tinyint(3) unsigned | NO | PRI |  | auto_increment |
| 2 | card_name | varchar(120) | NO |  |  |  |
| 3 | card_img | varchar(255) | NO |  |  |  |
| 4 | card_fee | decimal(6,2) unsigned | NO |  | 0.00 |  |
| 5 | free_money | decimal(6,2) unsigned | NO |  | 0.00 |  |
| 6 | card_desc | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [25]  > **--**  [> **DESC mg_cart**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 22<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | rec_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | user_id | mediumint(8) unsigned | NO |  | 0 |  |
| 3 | session_id | char(32) | NO | MUL |  |  |
| 4 | goods_id | mediumint(8) unsigned | NO |  | 0 |  |
| 5 | goods_sn | varchar(60) | NO |  |  |  |
| 6 | product_id | mediumint(8) unsigned | NO |  | 0 |  |
| 7 | goods_name | varchar(120) | NO |  |  |  |
| 8 | market_price | decimal(10,2) unsigned | NO |  | 0.00 |  |
| 9 | goods_price | decimal(10,2) | NO |  | 0.00 |  |
| 10 | goods_number | smallint(5) unsigned | NO |  | 0 |  |
| 11 | goods_attr | text | NO |  |  |  |
| 12 | is_real | tinyint(1) unsigned | NO |  | 0 |  |
| 13 | extension_code | varchar(30) | NO |  |  |  |
| 14 | parent_id | mediumint(8) unsigned | NO |  | 0 |  |
| 15 | rec_type | tinyint(1) unsigned | NO |  | 0 |  |
| 16 | is_gift | smallint(5) unsigned | NO |  | 0 |  |
| 17 | is_shipping | tinyint(1) unsigned | NO |  | 0 |  |
| 18 | can_handsel | tinyint(3) unsigned | NO |  | 0 |  |
| 19 | goods_attr_id | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [26]  > **--**  [> **DESC mg_cat_recommend**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 11<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | cat_id | smallint(5) | NO | PRI |  |  |
| 2 | recommend_type | tinyint(1) | NO | PRI |  |  |

<br />

---

> **Query**  [27]  > **--**  [> **DESC mg_category**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 2<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | cat_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | cat_name | varchar(90) | NO |  |  |  |
| 3 | keywords | varchar(255) | NO |  |  |  |
| 4 | cat_desc | varchar(255) | NO |  |  |  |
| 5 | parent_id | smallint(5) unsigned | NO | MUL | 0 |  |
| 6 | sort_order | tinyint(1) unsigned | NO |  | 50 |  |
| 7 | template_file | varchar(50) | NO |  |  |  |
| 8 | measure_unit | varchar(15) | NO |  |  |  |
| 9 | show_in_nav | tinyint(1) | NO |  | 0 |  |
| 10 | style | varchar(150) | NO |  |  |  |
| 11 | is_show | tinyint(1) unsigned | NO |  | 1 |  |
| 12 | grade | tinyint(4) | NO |  | 0 |  |
| 13 | filter_attr | varchar(255) | NO |  | 0 |  |

<br />

---

> **Query**  [28]  > **--**  [> **DESC mg_collect_goods**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | rec_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | user_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 4 | add_time | int(11) unsigned | NO |  | 0 |  |
| 5 | is_attention | tinyint(1) | NO | MUL | 0 |  |

<br />

---

> **Query**  [29]  > **--**  [> **DESC mg_comment**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | comment_id | int(10) unsigned | NO | PRI |  | auto_increment |
| 2 | comment_type | tinyint(3) unsigned | NO |  | 0 |  |
| 3 | id_value | mediumint(8) unsigned | NO | MUL | 0 |  |
| 4 | email | varchar(60) | NO |  |  |  |
| 5 | user_name | varchar(60) | NO |  |  |  |
| 6 | content | text | NO |  |  |  |
| 7 | comment_rank | tinyint(1) unsigned | NO |  | 0 |  |
| 8 | add_time | int(10) unsigned | NO |  | 0 |  |
| 9 | ip_address | varchar(15) | NO |  |  |  |
| 10 | status | tinyint(3) unsigned | NO |  | 0 |  |
| 11 | parent_id | int(10) unsigned | NO | MUL | 0 |  |
| 12 | user_id | int(10) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [30]  > **--**  [> **DESC mg_crons**]> **Query Result..**

| **(row)** | string 11<br />**Field** | blob 19<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | cron_id | tinyint(3) unsigned | NO | PRI |  | auto_increment |
| 2 | cron_code | varchar(20) | NO | MUL |  |  |
| 3 | cron_name | varchar(120) | NO |  |  |  |
| 4 | cron_desc | text | YES |  |  |  |
| 5 | cron_order | tinyint(3) unsigned | NO |  | 0 |  |
| 6 | cron_config | text | NO |  |  |  |
| 7 | thistime | int(10) | NO |  | 0 |  |
| 8 | nextime | int(10) | NO | MUL |  |  |
| 9 | day | tinyint(2) | NO |  |  |  |
| 10 | week | varchar(1) | NO |  |  |  |
| 11 | hour | varchar(2) | NO |  |  |  |
| 12 | minute | varchar(255) | NO |  |  |  |
| 13 | enable | tinyint(1) | NO | MUL | 1 |  |
| 14 | run_once | tinyint(1) | NO |  | 0 |  |
| 15 | allow_ip | varchar(100) | NO |  |  |  |
| 16 | alow_files | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [31]  > **--**  [> **DESC mg_delivery_goods**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 21<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | rec_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | delivery_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 4 | product_id | mediumint(8) unsigned | YES |  | 0 |  |
| 5 | product_sn | varchar(60) | YES |  |  |  |
| 6 | goods_name | varchar(120) | YES |  |  |  |
| 7 | brand_name | varchar(60) | YES |  |  |  |
| 8 | goods_sn | varchar(60) | YES |  |  |  |
| 9 | is_real | tinyint(1) unsigned | YES |  | 0 |  |
| 10 | extension_code | varchar(30) | YES |  |  |  |
| 11 | parent_id | mediumint(8) unsigned | YES |  | 0 |  |
| 12 | send_number | smallint(5) unsigned | YES |  | 0 |  |
| 13 | goods_attr | text | YES |  |  |  |

<br />

---

> **Query**  [32]  > **--**  [> **DESC mg_delivery_order**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 22<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | delivery_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | delivery_sn | varchar(20) | NO |  |  |  |
| 3 | order_sn | varchar(20) | NO |  |  |  |
| 4 | order_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 5 | invoice_no | varchar(50) | YES |  |  |  |
| 6 | add_time | int(10) unsigned | YES |  | 0 |  |
| 7 | shipping_id | tinyint(3) unsigned | YES |  | 0 |  |
| 8 | shipping_name | varchar(120) | YES |  |  |  |
| 9 | user_id | mediumint(8) unsigned | YES | MUL | 0 |  |
| 10 | action_user | varchar(30) | YES |  |  |  |
| 11 | consignee | varchar(60) | YES |  |  |  |
| 12 | address | varchar(250) | YES |  |  |  |
| 13 | country | smallint(5) unsigned | YES |  | 0 |  |
| 14 | province | smallint(5) unsigned | YES |  | 0 |  |
| 15 | city | smallint(5) unsigned | YES |  | 0 |  |
| 16 | district | smallint(5) unsigned | YES |  | 0 |  |
| 17 | sign_building | varchar(120) | YES |  |  |  |
| 18 | email | varchar(60) | YES |  |  |  |
| 19 | zipcode | varchar(60) | YES |  |  |  |
| 20 | tel | varchar(60) | YES |  |  |  |
| 21 | mobile | varchar(60) | YES |  |  |  |
| 22 | best_time | varchar(120) | YES |  |  |  |
| 23 | postscript | varchar(255) | YES |  |  |  |
| 24 | how_oos | varchar(120) | YES |  |  |  |
| 25 | insure_fee | decimal(10,2) unsigned | YES |  | 0.00 |  |
| 26 | shipping_fee | decimal(10,2) unsigned | YES |  | 0.00 |  |
| 27 | update_time | int(10) unsigned | YES |  | 0 |  |
| 28 | suppliers_id | smallint(5) | YES |  | 0 |  |
| 29 | status | tinyint(1) unsigned | NO |  | 0 |  |
| 30 | agency_id | smallint(5) unsigned | YES |  | 0 |  |

<br />

---

> **Query**  [33]  > **--**  [> **DESC mg_email_list**]> **Query Result..**

| **(row)** | string 5<br />**Field** | blob 12<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | id | mediumint(8) | NO | PRI |  | auto_increment |
| 2 | email | varchar(60) | NO |  |  |  |
| 3 | stat | tinyint(1) | NO |  | 0 |  |
| 4 | hash | varchar(10) | NO |  |  |  |

<br />

---

> **Query**  [34]  > **--**  [> **DESC mg_email_sendlist**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 12<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | id | mediumint(8) | NO | PRI |  | auto_increment |
| 2 | email | varchar(100) | NO |  |  |  |
| 3 | template_id | mediumint(8) | NO |  |  |  |
| 4 | email_content | text | NO |  |  |  |
| 5 | error | tinyint(1) | NO |  | 0 |  |
| 6 | pri | tinyint(10) | NO |  |  |  |
| 7 | last_send | int(10) | NO |  |  |  |

<br />

---

> **Query**  [35]  > **--**  [> **DESC mg_error_log**]> **Query Result..**

| **(row)** | string 4<br />**Field** | blob 12<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | id | int(10) | NO | PRI |  | auto_increment |
| 2 | info | varchar(255) | NO |  |  |  |
| 3 | file | varchar(100) | NO |  |  |  |
| 4 | time | int(10) | NO | MUL |  |  |

<br />

---

> **Query**  [36]  > **--**  [> **DESC mg_exchange_goods**]> **Query Result..**

| **(row)** | string 17<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | goods_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 2 | exchange_integral | int(10) unsigned | NO |  | 0 |  |
| 3 | is_exchange | tinyint(1) unsigned | NO |  | 0 |  |
| 4 | is_hot | tinyint(1) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [37]  > **--**  [> **DESC mg_favourable_activity**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 22<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 2<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | act_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | act_name | varchar(255) | NO | MUL |  |  |
| 3 | start_time | int(10) unsigned | NO |  |  |  |
| 4 | end_time | int(10) unsigned | NO |  |  |  |
| 5 | user_rank | varchar(255) | NO |  |  |  |
| 6 | act_range | tinyint(3) unsigned | NO |  |  |  |
| 7 | act_range_ext | varchar(255) | NO |  |  |  |
| 8 | min_amount | decimal(10,2) unsigned | NO |  |  |  |
| 9 | max_amount | decimal(10,2) unsigned | NO |  |  |  |
| 10 | act_type | tinyint(3) unsigned | NO |  |  |  |
| 11 | act_type_ext | decimal(10,2) unsigned | NO |  |  |  |
| 12 | gift | text | NO |  |  |  |
| 13 | sort_order | tinyint(3) unsigned | NO |  | 50 |  |

<br />

---

> **Query**  [38]  > **--**  [> **DESC mg_feedback**]> **Query Result..**

| **(row)** | string 11<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | msg_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | parent_id | mediumint(8) unsigned | NO |  | 0 |  |
| 3 | user_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 4 | user_name | varchar(60) | NO |  |  |  |
| 5 | user_email | varchar(60) | NO |  |  |  |
| 6 | msg_title | varchar(200) | NO |  |  |  |
| 7 | msg_type | tinyint(1) unsigned | NO |  | 0 |  |
| 8 | msg_status | tinyint(1) unsigned | NO |  | 0 |  |
| 9 | msg_content | text | NO |  |  |  |
| 10 | msg_time | int(10) unsigned | NO |  | 0 |  |
| 11 | message_img | varchar(255) | NO |  | 0 |  |
| 12 | order_id | int(11) unsigned | NO |  | 0 |  |
| 13 | msg_area | tinyint(1) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [39]  > **--**  [> **DESC mg_friend_link**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 2<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | link_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | link_name | varchar(255) | NO |  |  |  |
| 3 | link_url | varchar(255) | NO |  |  |  |
| 4 | link_logo | varchar(255) | NO |  |  |  |
| 5 | show_order | tinyint(3) unsigned | NO | MUL | 50 |  |

<br />

---

> **Query**  [40]  > **--**  [> **DESC mg_goods**]> **Query Result..**

| **(row)** | string 18<br />**Field** | blob 22<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 5<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | goods_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | cat_id | smallint(5) unsigned | NO | MUL | 0 |  |
| 3 | goods_sn | varchar(60) | NO | MUL |  |  |
| 4 | goods_name | varchar(120) | NO |  |  |  |
| 5 | goods_name_style | varchar(60) | NO |  | + |  |
| 6 | click_count | int(10) unsigned | NO |  | 0 |  |
| 7 | brand_id | smallint(5) unsigned | NO | MUL | 0 |  |
| 8 | provider_name | varchar(100) | NO |  |  |  |
| 9 | goods_number | smallint(5) unsigned | NO | MUL | 0 |  |
| 10 | goods_weight | decimal(10,3) unsigned | NO | MUL | 0.000 |  |
| 11 | market_price | decimal(10,2) unsigned | NO |  | 0.00 |  |
| 12 | shop_price | decimal(10,2) unsigned | NO |  | 0.00 |  |
| 13 | promote_price | decimal(10,2) unsigned | NO |  | 0.00 |  |
| 14 | promote_start_date | int(11) unsigned | NO | MUL | 0 |  |
| 15 | promote_end_date | int(11) unsigned | NO | MUL | 0 |  |
| 16 | warn_number | tinyint(3) unsigned | NO |  | 1 |  |
| 17 | keywords | varchar(255) | NO |  |  |  |
| 18 | goods_brief | varchar(255) | NO |  |  |  |
| 19 | goods_desc | text | NO |  |  |  |
| 20 | goods_thumb | varchar(255) | NO |  |  |  |
| 21 | goods_img | varchar(255) | NO |  |  |  |
| 22 | original_img | varchar(255) | NO |  |  |  |
| 23 | is_real | tinyint(3) unsigned | NO |  | 1 |  |
| 24 | extension_code | varchar(30) | NO |  |  |  |
| 25 | is_on_sale | tinyint(1) unsigned | NO |  | 1 |  |
| 26 | is_alone_sale | tinyint(1) unsigned | NO |  | 1 |  |
| 27 | is_shipping | tinyint(1) unsigned | NO |  | 0 |  |
| 28 | integral | int(10) unsigned | NO |  | 0 |  |
| 29 | add_time | int(10) unsigned | NO |  | 0 |  |
| 30 | sort_order | smallint(4) unsigned | NO | MUL | 100 |  |
| 31 | is_delete | tinyint(1) unsigned | NO |  | 0 |  |
| 32 | is_best | tinyint(1) unsigned | NO |  | 0 |  |
| 33 | is_new | tinyint(1) unsigned | NO |  | 0 |  |
| 34 | is_hot | tinyint(1) unsigned | NO |  | 0 |  |
| 35 | is_promote | tinyint(1) unsigned | NO |  | 0 |  |
| 36 | bonus_type_id | tinyint(3) unsigned | NO |  | 0 |  |
| 37 | last_update | int(10) unsigned | NO | MUL | 0 |  |
| 38 | goods_type | smallint(5) unsigned | NO |  | 0 |  |
| 39 | seller_note | varchar(255) | NO |  |  |  |
| 40 | give_integral | int(11) | NO |  | -1 |  |
| 41 | rank_integral | int(11) | NO |  | -1 |  |
| 42 | suppliers_id | smallint(5) unsigned | YES |  |  |  |
| 43 | is_check | tinyint(1) unsigned | YES |  |  |  |

<br />

---

> **Query**  [41]  > **--**  [> **DESC mg_goods_activity**]> **Query Result..**

| **(row)** | string 11<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | act_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | act_name | varchar(255) | NO | MUL |  |  |
| 3 | act_desc | text | NO |  |  |  |
| 4 | act_type | tinyint(3) unsigned | NO |  |  |  |
| 5 | goods_id | mediumint(8) unsigned | NO |  |  |  |
| 6 | product_id | mediumint(8) unsigned | NO |  | 0 |  |
| 7 | goods_name | varchar(255) | NO |  |  |  |
| 8 | start_time | int(10) unsigned | NO |  |  |  |
| 9 | end_time | int(10) unsigned | NO |  |  |  |
| 10 | is_finished | tinyint(3) unsigned | NO |  |  |  |
| 11 | ext_info | text | NO |  |  |  |

<br />

---

> **Query**  [42]  > **--**  [> **DESC mg_goods_article**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | goods_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 2 | article_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 3 | admin_id | tinyint(3) unsigned | NO | PRI | 0 |  |

<br />

---

> **Query**  [43]  > **--**  [> **DESC mg_goods_attr**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | goods_attr_id | int(10) unsigned | NO | PRI |  | auto_increment |
| 2 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | attr_id | smallint(5) unsigned | NO | MUL | 0 |  |
| 4 | attr_value | text | NO |  |  |  |
| 5 | attr_price | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [44]  > **--**  [> **DESC mg_goods_cat**]> **Query Result..**

| **(row)** | string 8<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | goods_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 2 | cat_id | smallint(5) unsigned | NO | PRI | 0 |  |

<br />

---

> **Query**  [45]  > **--**  [> **DESC mg_goods_gallery**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | img_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | img_url | varchar(255) | NO |  |  |  |
| 4 | img_desc | varchar(255) | NO |  |  |  |
| 5 | thumb_url | varchar(255) | NO |  |  |  |
| 6 | img_original | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [46]  > **--**  [> **DESC mg_goods_type**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | cat_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | cat_name | varchar(60) | NO |  |  |  |
| 3 | enabled | tinyint(1) unsigned | NO |  | 1 |  |
| 4 | attr_group | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [47]  > **--**  [> **DESC mg_group_goods**]> **Query Result..**

| **(row)** | string 11<br />**Field** | blob 22<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | parent_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 2 | goods_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 3 | goods_price | decimal(10,2) unsigned | NO |  | 0.00 |  |
| 4 | admin_id | tinyint(3) unsigned | NO | PRI | 0 |  |

<br />

---

> **Query**  [48]  > **--**  [> **DESC mg_keywords**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 10<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | date | date | NO | PRI | 0000-00-00 |  |
| 2 | searchengine | varchar(20) | NO | PRI |  |  |
| 3 | keyword | varchar(90) | NO | PRI |  |  |
| 4 | count | mediumint(8) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [49]  > **--**  [> **DESC mg_link_goods**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | goods_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 2 | link_goods_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 3 | is_double | tinyint(1) unsigned | NO |  | 0 |  |
| 4 | admin_id | tinyint(3) unsigned | NO | PRI | 0 |  |

<br />

---

> **Query**  [50]  > **--**  [> **DESC mg_mail_templates**]> **Query Result..**

| **(row)** | string 16<br />**Field** | blob 19<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | template_id | tinyint(1) unsigned | NO | PRI |  | auto_increment |
| 2 | template_code | varchar(30) | NO | UNI |  |  |
| 3 | is_html | tinyint(1) unsigned | NO |  | 0 |  |
| 4 | template_subject | varchar(200) | NO |  |  |  |
| 5 | template_content | text | NO |  |  |  |
| 6 | last_modify | int(10) unsigned | NO |  | 0 |  |
| 7 | last_send | int(10) unsigned | NO |  | 0 |  |
| 8 | type | varchar(10) | NO | MUL |  |  |

<br />

---

> **Query**  [51]  > **--**  [> **DESC mg_member_price**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | price_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | user_rank | tinyint(3) | NO |  | 0 |  |
| 4 | user_price | decimal(10,2) | NO |  | 0.00 |  |

<br />

---

> **Query**  [52]  > **--**  [> **DESC mg_nav**]> **Query Result..**

| **(row)** | string 9<br />**Field** | blob 20<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | id | mediumint(8) | NO | PRI |  | auto_increment |
| 2 | ctype | varchar(10) | YES |  |  |  |
| 3 | cid | smallint(5) unsigned | YES |  |  |  |
| 4 | name | varchar(255) | NO |  |  |  |
| 5 | ifshow | tinyint(1) | NO | MUL |  |  |
| 6 | vieworder | tinyint(1) | NO |  |  |  |
| 7 | opennew | tinyint(1) | NO |  |  |  |
| 8 | url | varchar(255) | NO |  |  |  |
| 9 | type | varchar(10) | NO | MUL |  |  |

<br />

---

> **Query**  [53]  > **--**  [> **DESC mg_order_action**]> **Query Result..**

| **(row)** | string 15<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | action_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | order_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | action_user | varchar(30) | NO |  |  |  |
| 4 | order_status | tinyint(1) unsigned | NO |  | 0 |  |
| 5 | shipping_status | tinyint(1) unsigned | NO |  | 0 |  |
| 6 | pay_status | tinyint(1) unsigned | NO |  | 0 |  |
| 7 | action_place | tinyint(1) unsigned | NO |  | 0 |  |
| 8 | action_note | varchar(255) | NO |  |  |  |
| 9 | log_time | int(11) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [54]  > **--**  [> **DESC mg_order_goods**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | rec_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | order_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 4 | goods_name | varchar(120) | NO |  |  |  |
| 5 | goods_sn | varchar(60) | NO |  |  |  |
| 6 | product_id | mediumint(8) unsigned | NO |  | 0 |  |
| 7 | goods_number | smallint(5) unsigned | NO |  | 1 |  |
| 8 | market_price | decimal(10,2) | NO |  | 0.00 |  |
| 9 | goods_price | decimal(10,2) | NO |  | 0.00 |  |
| 10 | goods_attr | text | NO |  |  |  |
| 11 | send_number | smallint(5) unsigned | NO |  | 0 |  |
| 12 | is_real | tinyint(1) unsigned | NO |  | 0 |  |
| 13 | extension_code | varchar(30) | NO |  |  |  |
| 14 | parent_id | mediumint(8) unsigned | NO |  | 0 |  |
| 15 | is_gift | smallint(5) unsigned | NO |  | 0 |  |
| 16 | goods_attr_id | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [55]  > **--**  [> **DESC mg_order_info**]> **Query Result..**

| **(row)** | string 15<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | order_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | order_sn | varchar(20) | NO | UNI |  |  |
| 3 | user_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 4 | order_status | tinyint(1) unsigned | NO | MUL | 0 |  |
| 5 | shipping_status | tinyint(1) unsigned | NO | MUL | 0 |  |
| 6 | pay_status | tinyint(1) unsigned | NO | MUL | 0 |  |
| 7 | consignee | varchar(60) | NO |  |  |  |
| 8 | country | smallint(5) unsigned | NO |  | 0 |  |
| 9 | province | smallint(5) unsigned | NO |  | 0 |  |
| 10 | city | smallint(5) unsigned | NO |  | 0 |  |
| 11 | district | smallint(5) unsigned | NO |  | 0 |  |
| 12 | address | varchar(255) | NO |  |  |  |
| 13 | zipcode | varchar(60) | NO |  |  |  |
| 14 | tel | varchar(60) | NO |  |  |  |
| 15 | mobile | varchar(60) | NO |  |  |  |
| 16 | email | varchar(60) | NO |  |  |  |
| 17 | best_time | varchar(120) | NO |  |  |  |
| 18 | sign_building | varchar(120) | NO |  |  |  |
| 19 | postscript | varchar(255) | NO |  |  |  |
| 20 | shipping_id | tinyint(3) | NO | MUL | 0 |  |
| 21 | shipping_name | varchar(120) | NO |  |  |  |
| 22 | pay_id | tinyint(3) | NO | MUL | 0 |  |
| 23 | pay_name | varchar(120) | NO |  |  |  |
| 24 | how_oos | varchar(120) | NO |  |  |  |
| 25 | how_surplus | varchar(120) | NO |  |  |  |
| 26 | pack_name | varchar(120) | NO |  |  |  |
| 27 | card_name | varchar(120) | NO |  |  |  |
| 28 | card_message | varchar(255) | NO |  |  |  |
| 29 | inv_payee | varchar(120) | NO |  |  |  |
| 30 | inv_content | varchar(120) | NO |  |  |  |
| 31 | goods_amount | decimal(10,2) | NO |  | 0.00 |  |
| 32 | shipping_fee | decimal(10,2) | NO |  | 0.00 |  |
| 33 | insure_fee | decimal(10,2) | NO |  | 0.00 |  |
| 34 | pay_fee | decimal(10,2) | NO |  | 0.00 |  |
| 35 | pack_fee | decimal(10,2) | NO |  | 0.00 |  |
| 36 | card_fee | decimal(10,2) | NO |  | 0.00 |  |
| 37 | money_paid | decimal(10,2) | NO |  | 0.00 |  |
| 38 | surplus | decimal(10,2) | NO |  | 0.00 |  |
| 39 | integral | int(10) unsigned | NO |  | 0 |  |
| 40 | integral_money | decimal(10,2) | NO |  | 0.00 |  |
| 41 | bonus | decimal(10,2) | NO |  | 0.00 |  |
| 42 | order_amount | decimal(10,2) | NO |  | 0.00 |  |
| 43 | from_ad | smallint(5) | NO |  | 0 |  |
| 44 | referer | varchar(255) | NO |  |  |  |
| 45 | add_time | int(10) unsigned | NO |  | 0 |  |
| 46 | confirm_time | int(10) unsigned | NO |  | 0 |  |
| 47 | pay_time | int(10) unsigned | NO |  | 0 |  |
| 48 | shipping_time | int(10) unsigned | NO |  | 0 |  |
| 49 | pack_id | tinyint(3) unsigned | NO |  | 0 |  |
| 50 | card_id | tinyint(3) unsigned | NO |  | 0 |  |
| 51 | bonus_id | mediumint(8) unsigned | NO |  | 0 |  |
| 52 | invoice_no | varchar(255) | NO |  |  |  |
| 53 | extension_code | varchar(30) | NO | MUL |  |  |
| 54 | extension_id | mediumint(8) unsigned | NO |  | 0 |  |
| 55 | to_buyer | varchar(255) | NO |  |  |  |
| 56 | pay_note | varchar(255) | NO |  |  |  |
| 57 | agency_id | smallint(5) unsigned | NO | MUL |  |  |
| 58 | inv_type | varchar(60) | NO |  |  |  |
| 59 | tax | decimal(10,2) | NO |  |  |  |
| 60 | is_separate | tinyint(1) | NO |  | 0 |  |
| 61 | parent_id | mediumint(8) unsigned | NO |  | 0 |  |
| 62 | discount | decimal(10,2) | NO |  |  |  |

<br />

---

> **Query**  [56]  > **--**  [> **DESC mg_pack**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | pack_id | tinyint(3) unsigned | NO | PRI |  | auto_increment |
| 2 | pack_name | varchar(120) | NO |  |  |  |
| 3 | pack_img | varchar(255) | NO |  |  |  |
| 4 | pack_fee | decimal(6,2) unsigned | NO |  | 0.00 |  |
| 5 | free_money | smallint(5) unsigned | NO |  | 0 |  |
| 6 | pack_desc | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [57]  > **--**  [> **DESC mg_package_goods**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | package_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 2 | goods_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 3 | product_id | mediumint(8) unsigned | NO | PRI | 0 |  |
| 4 | goods_number | smallint(5) unsigned | NO |  | 1 |  |
| 5 | admin_id | tinyint(3) unsigned | NO | PRI | 0 |  |

<br />

---

> **Query**  [58]  > **--**  [> **DESC mg_pay_log**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 22<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | log_id | int(10) unsigned | NO | PRI |  | auto_increment |
| 2 | order_id | mediumint(8) unsigned | NO |  | 0 |  |
| 3 | order_amount | decimal(10,2) unsigned | NO |  |  |  |
| 4 | order_type | tinyint(1) unsigned | NO |  | 0 |  |
| 5 | is_paid | tinyint(1) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [59]  > **--**  [> **DESC mg_payment**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 19<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | pay_id | tinyint(3) unsigned | NO | PRI |  | auto_increment |
| 2 | pay_code | varchar(20) | NO | UNI |  |  |
| 3 | pay_name | varchar(120) | NO |  |  |  |
| 4 | pay_fee | varchar(10) | NO |  | 0 |  |
| 5 | pay_desc | text | NO |  |  |  |
| 6 | pay_order | tinyint(3) unsigned | NO |  | 0 |  |
| 7 | pay_config | text | NO |  |  |  |
| 8 | enabled | tinyint(1) unsigned | NO |  | 0 |  |
| 9 | is_cod | tinyint(1) unsigned | NO |  | 0 |  |
| 10 | is_online | tinyint(1) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [60]  > **--**  [> **DESC mg_plugins**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 19<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | code | varchar(30) | NO | PRI |  |  |
| 2 | version | varchar(10) | NO |  |  |  |
| 3 | library | varchar(255) | NO |  |  |  |
| 4 | assign | tinyint(1) unsigned | NO |  | 0 |  |
| 5 | install_date | int(10) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [61]  > **--**  [> **DESC mg_products**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 21<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | product_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | goods_id | mediumint(8) unsigned | NO |  | 0 |  |
| 3 | goods_attr | varchar(50) | YES |  |  |  |
| 4 | product_sn | varchar(60) | YES |  |  |  |
| 5 | product_number | smallint(5) unsigned | YES |  | 0 |  |

<br />

---

> **Query**  [62]  > **--**  [> **DESC mg_reg_extend_info**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Id | int(10) unsigned | NO | PRI |  | auto_increment |
| 2 | user_id | mediumint(8) unsigned | NO |  |  |  |
| 3 | reg_field_id | int(10) unsigned | NO |  |  |  |
| 4 | content | text | NO |  |  |  |

<br />

---

> **Query**  [63]  > **--**  [> **DESC mg_reg_fields**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 19<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 3<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | id | tinyint(3) unsigned | NO | PRI |  | auto_increment |
| 2 | reg_field_name | varchar(60) | NO |  |  |  |
| 3 | dis_order | tinyint(3) unsigned | NO |  | 100 |  |
| 4 | display | tinyint(1) unsigned | NO |  | 1 |  |
| 5 | type | tinyint(1) unsigned | NO |  | 0 |  |
| 6 | is_need | tinyint(1) unsigned | NO |  | 1 |  |

<br />

---

> **Query**  [64]  > **--**  [> **DESC mg_region**]> **Query Result..**

| **(row)** | string 11<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | region_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | parent_id | smallint(5) unsigned | NO | MUL | 0 |  |
| 3 | region_name | varchar(120) | NO |  |  |  |
| 4 | region_type | tinyint(1) | NO | MUL | 2 |  |
| 5 | agency_id | smallint(5) unsigned | NO | MUL | 0 |  |

<br />

---

> **Query**  [65]  > **--**  [> **DESC mg_role**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 20<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | role_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | role_name | varchar(60) | NO | MUL |  |  |
| 3 | action_list | text | NO |  |  |  |
| 4 | role_describe | text | YES |  |  |  |

<br />

---

> **Query**  [66]  > **--**  [> **DESC mg_searchengine**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 10<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | date | date | NO | PRI | 0000-00-00 |  |
| 2 | searchengine | varchar(20) | NO | PRI |  |  |
| 3 | count | mediumint(8) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [67]  > **--**  [> **DESC mg_sessions**]> **Query Result..**

| **(row)** | string 9<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | sesskey | char(32) | NO | PRI |  |  |
| 2 | expiry | int(10) unsigned | NO | MUL | 0 |  |
| 3 | userid | mediumint(8) unsigned | NO |  | 0 |  |
| 4 | adminid | mediumint(8) unsigned | NO |  | 0 |  |
| 5 | ip | char(15) | NO |  |  |  |
| 6 | user_name | varchar(60) | NO |  |  |  |
| 7 | user_rank | tinyint(3) | NO |  |  |  |
| 8 | discount | decimal(3,2) | NO |  |  |  |
| 9 | email | varchar(60) | NO |  |  |  |
| 10 | data | char(255) | NO |  |  |  |

<br />

---

> **Query**  [68]  > **--**  [> **DESC mg_sessions_data**]> **Query Result..**

| **(row)** | string 7<br />**Field** | blob 16<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | sesskey | varchar(32) | NO | PRI |  |  |
| 2 | expiry | int(10) unsigned | NO | MUL | 0 |  |
| 3 | data | longtext | NO |  |  |  |

<br />

---

> **Query**  [69]  > **--**  [> **DESC mg_shipping**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 19<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | shipping_id | tinyint(3) unsigned | NO | PRI |  | auto_increment |
| 2 | shipping_code | varchar(20) | NO | MUL |  |  |
| 3 | shipping_name | varchar(120) | NO |  |  |  |
| 4 | shipping_desc | varchar(255) | NO |  |  |  |
| 5 | insure | varchar(10) | NO |  | 0 |  |
| 6 | support_cod | tinyint(1) unsigned | NO |  | 0 |  |
| 7 | enabled | tinyint(1) unsigned | NO |  | 0 |  |
| 8 | shipping_print | text | NO |  |  |  |
| 9 | print_bg | varchar(255) | YES |  |  |  |
| 10 | config_lable | text | YES |  |  |  |
| 11 | print_model | tinyint(1) | YES |  | 0 |  |

<br />

---

> **Query**  [70]  > **--**  [> **DESC mg_shipping_area**]> **Query Result..**

| **(row)** | string 18<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | shipping_area_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | shipping_area_name | varchar(150) | NO |  |  |  |
| 3 | shipping_id | tinyint(3) unsigned | NO | MUL | 0 |  |
| 4 | configure | text | NO |  |  |  |

<br />

---

> **Query**  [71]  > **--**  [> **DESC mg_shop_config**]> **Query Result..**

| **(row)** | string 11<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | parent_id | smallint(5) unsigned | NO | MUL | 0 |  |
| 3 | code | varchar(30) | NO | UNI |  |  |
| 4 | type | varchar(10) | NO |  |  |  |
| 5 | store_range | varchar(255) | NO |  |  |  |
| 6 | store_dir | varchar(255) | NO |  |  |  |
| 7 | value | text | NO |  |  |  |
| 8 | sort_order | tinyint(3) unsigned | NO |  | 1 |  |

<br />

---

> **Query**  [72]  > **--**  [> **DESC mg_snatch_log**]> **Query Result..**

| **(row)** | string 9<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | log_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | snatch_id | tinyint(3) unsigned | NO | MUL | 0 |  |
| 3 | user_id | mediumint(8) unsigned | NO |  | 0 |  |
| 4 | bid_price | decimal(10,2) | NO |  | 0.00 |  |
| 5 | bid_time | int(10) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [73]  > **--**  [> **DESC mg_stats**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | access_time | int(10) unsigned | NO | MUL | 0 |  |
| 2 | ip_address | varchar(15) | NO |  |  |  |
| 3 | visit_times | smallint(5) unsigned | NO |  | 1 |  |
| 4 | browser | varchar(60) | NO |  |  |  |
| 5 | system | varchar(20) | NO |  |  |  |
| 6 | language | varchar(20) | NO |  |  |  |
| 7 | area | varchar(30) | NO |  |  |  |
| 8 | referer_domain | varchar(100) | NO |  |  |  |
| 9 | referer_path | varchar(200) | NO |  |  |  |
| 10 | access_url | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [74]  > **--**  [> **DESC mg_suppliers**]> **Query Result..**

| **(row)** | string 14<br />**Field** | blob 20<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | suppliers_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | suppliers_name | varchar(255) | YES |  |  |  |
| 3 | suppliers_desc | mediumtext | YES |  |  |  |
| 4 | is_check | tinyint(1) unsigned | NO |  | 1 |  |

<br />

---

> **Query**  [75]  > **--**  [> **DESC mg_tag**]> **Query Result..**

| **(row)** | string 9<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | tag_id | mediumint(8) | NO | PRI |  | auto_increment |
| 2 | user_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 4 | tag_words | varchar(255) | NO |  |  |  |

<br />

---

> **Query**  [76]  > **--**  [> **DESC mg_template**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | filename | varchar(30) | NO | MUL |  |  |
| 2 | region | varchar(40) | NO |  |  |  |
| 3 | library | varchar(40) | NO |  |  |  |
| 4 | sort_order | tinyint(1) unsigned | NO |  | 0 |  |
| 5 | id | smallint(5) unsigned | NO |  | 0 |  |
| 6 | number | tinyint(1) unsigned | NO |  | 5 |  |
| 7 | type | tinyint(1) unsigned | NO |  | 0 |  |
| 8 | theme | varchar(60) | NO | MUL |  |  |
| 9 | remarks | varchar(30) | NO | MUL |  |  |

<br />

---

> **Query**  [77]  > **--**  [> **DESC mg_topic**]> **Query Result..**

| **(row)** | string 11<br />**Field** | blob 16<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 2<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | topic_id | int(10) unsigned | NO | MUL |  | auto_increment |
| 2 | title | varchar(255) | NO |  | '' |  |
| 3 | intro | text | NO |  |  |  |
| 4 | start_time | int(11) | NO |  | 0 |  |
| 5 | end_time | int(10) | NO |  | 0 |  |
| 6 | data | text | NO |  |  |  |
| 7 | template | varchar(255) | NO |  | '' |  |
| 8 | css | text | NO |  |  |  |
| 9 | topic_img | varchar(255) | YES |  |  |  |
| 10 | title_pic | varchar(255) | YES |  |  |  |
| 11 | base_style | char(6) | YES |  |  |  |
| 12 | htmls | mediumtext | YES |  |  |  |
| 13 | keywords | varchar(255) | YES |  |  |  |
| 14 | description | varchar(255) | YES |  |  |  |

<br />

---

> **Query**  [78]  > **--**  [> **DESC mg_user_account**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | user_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | admin_user | varchar(255) | NO |  |  |  |
| 4 | amount | decimal(10,2) | NO |  |  |  |
| 5 | add_time | int(10) | NO |  | 0 |  |
| 6 | paid_time | int(10) | NO |  | 0 |  |
| 7 | admin_note | varchar(255) | NO |  |  |  |
| 8 | user_note | varchar(255) | NO |  |  |  |
| 9 | process_type | tinyint(1) | NO |  | 0 |  |
| 10 | payment | varchar(90) | NO |  |  |  |
| 11 | is_paid | tinyint(1) | NO | MUL | 0 |  |

<br />

---

> **Query**  [79]  > **--**  [> **DESC mg_user_address**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | address_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | address_name | varchar(50) | NO |  |  |  |
| 3 | user_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 4 | consignee | varchar(60) | NO |  |  |  |
| 5 | email | varchar(60) | NO |  |  |  |
| 6 | country | smallint(5) | NO |  | 0 |  |
| 7 | province | smallint(5) | NO |  | 0 |  |
| 8 | city | smallint(5) | NO |  | 0 |  |
| 9 | district | smallint(5) | NO |  | 0 |  |
| 10 | address | varchar(120) | NO |  |  |  |
| 11 | zipcode | varchar(60) | NO |  |  |  |
| 12 | tel | varchar(60) | NO |  |  |  |
| 13 | mobile | varchar(60) | NO |  |  |  |
| 14 | sign_building | varchar(120) | NO |  |  |  |
| 15 | best_time | varchar(120) | NO |  |  |  |

<br />

---

> **Query**  [80]  > **--**  [> **DESC mg_user_bonus**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | bonus_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | bonus_type_id | tinyint(3) unsigned | NO |  | 0 |  |
| 3 | bonus_sn | bigint(20) unsigned | NO |  | 0 |  |
| 4 | user_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 5 | used_time | int(10) unsigned | NO |  | 0 |  |
| 6 | order_id | mediumint(8) unsigned | NO |  | 0 |  |
| 7 | emailed | tinyint(3) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [81]  > **--**  [> **DESC mg_user_feed**]> **Query Result..**

| **(row)** | string 9<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | feed_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | user_id | mediumint(8) unsigned | NO |  | 0 |  |
| 3 | value_id | mediumint(8) unsigned | NO |  | 0 |  |
| 4 | goods_id | mediumint(8) unsigned | NO |  | 0 |  |
| 5 | feed_type | tinyint(1) unsigned | NO |  | 0 |  |
| 6 | is_feed | tinyint(1) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [82]  > **--**  [> **DESC mg_user_rank**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 19<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | rank_id | tinyint(3) unsigned | NO | PRI |  | auto_increment |
| 2 | rank_name | varchar(30) | NO |  |  |  |
| 3 | min_points | int(10) unsigned | NO |  | 0 |  |
| 4 | max_points | int(10) unsigned | NO |  | 0 |  |
| 5 | discount | tinyint(3) unsigned | NO |  | 0 |  |
| 6 | show_price | tinyint(1) unsigned | NO |  | 1 |  |
| 7 | special_rank | tinyint(1) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [83]  > **--**  [> **DESC mg_users**]> **Query Result..**

| **(row)** | string 15<br />**Field** | blob 22<br />**Type** | string 3<br />**Null** | string 3<br />**Key** | blob 19<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | user_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | email | varchar(60) | NO | MUL |  |  |
| 3 | user_name | varchar(60) | NO | UNI |  |  |
| 4 | password | varchar(32) | NO |  |  |  |
| 5 | question | varchar(255) | NO |  |  |  |
| 6 | answer | varchar(255) | NO |  |  |  |
| 7 | sex | tinyint(1) unsigned | NO |  | 0 |  |
| 8 | birthday | date | NO |  | 0000-00-00 |  |
| 9 | user_money | decimal(10,2) | NO |  | 0.00 |  |
| 10 | frozen_money | decimal(10,2) | NO |  | 0.00 |  |
| 11 | pay_points | int(10) unsigned | NO |  | 0 |  |
| 12 | rank_points | int(10) unsigned | NO |  | 0 |  |
| 13 | address_id | mediumint(8) unsigned | NO |  | 0 |  |
| 14 | reg_time | int(10) unsigned | NO |  | 0 |  |
| 15 | last_login | int(11) unsigned | NO |  | 0 |  |
| 16 | last_time | datetime | NO |  | 0000-00-00 00:00:00 |  |
| 17 | last_ip | varchar(15) | NO |  |  |  |
| 18 | visit_count | smallint(5) unsigned | NO |  | 0 |  |
| 19 | user_rank | tinyint(3) unsigned | NO |  | 0 |  |
| 20 | is_special | tinyint(3) unsigned | NO |  | 0 |  |
| 21 | salt | varchar(10) | NO |  | 0 |  |
| 22 | parent_id | mediumint(9) | NO | MUL | 0 |  |
| 23 | flag | tinyint(3) unsigned | NO | MUL | 0 |  |
| 24 | alias | varchar(60) | NO |  |  |  |
| 25 | msn | varchar(60) | NO |  |  |  |
| 26 | qq | varchar(20) | NO |  |  |  |
| 27 | office_phone | varchar(20) | NO |  |  |  |
| 28 | home_phone | varchar(20) | NO |  |  |  |
| 29 | mobile_phone | varchar(20) | NO |  |  |  |
| 30 | is_validated | tinyint(3) unsigned | NO |  | 0 |  |
| 31 | credit_line | decimal(10,2) unsigned | NO |  |  |  |
| 32 | passwd_question | varchar(50) | YES |  |  |  |
| 33 | passwd_answer | varchar(255) | YES |  |  |  |

<br />

---

> **Query**  [84]  > **--**  [> **DESC mg_virtual_card**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | card_id | mediumint(8) | NO | PRI |  | auto_increment |
| 2 | goods_id | mediumint(8) unsigned | NO | MUL | 0 |  |
| 3 | card_sn | varchar(60) | NO | MUL |  |  |
| 4 | card_password | varchar(60) | NO |  |  |  |
| 5 | add_date | int(11) | NO |  | 0 |  |
| 6 | end_date | int(11) | NO |  | 0 |  |
| 7 | is_saled | tinyint(1) | NO | MUL | 0 |  |
| 8 | order_sn | varchar(20) | NO |  |  |  |
| 9 | crc32 | int(11) | NO |  | 0 |  |

<br />

---

> **Query**  [85]  > **--**  [> **DESC mg_volume_price**]> **Query Result..**

| **(row)** | string 13<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 4<br />**Default** | string 0<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | price_type | tinyint(1) unsigned | NO | PRI |  |  |
| 2 | goods_id | mediumint(8) unsigned | NO | PRI |  |  |
| 3 | volume_number | smallint(5) unsigned | NO | PRI | 0 |  |
| 4 | volume_price | decimal(10,2) | NO |  | 0.00 |  |

<br />

---

> **Query**  [86]  > **--**  [> **DESC mg_vote**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | vote_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | vote_name | varchar(250) | NO |  |  |  |
| 3 | start_time | int(11) unsigned | NO |  | 0 |  |
| 4 | end_time | int(11) unsigned | NO |  | 0 |  |
| 5 | can_multi | tinyint(1) unsigned | NO |  | 0 |  |
| 6 | vote_count | int(10) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [87]  > **--**  [> **DESC mg_vote_log**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 1<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | log_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | vote_id | smallint(5) unsigned | NO | MUL | 0 |  |
| 3 | ip_address | varchar(15) | NO |  |  |  |
| 4 | vote_time | int(10) unsigned | NO |  | 0 |  |

<br />

---

> **Query**  [88]  > **--**  [> **DESC mg_vote_option**]> **Query Result..**

| **(row)** | string 12<br />**Field** | blob 20<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 3<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | option_id | smallint(5) unsigned | NO | PRI |  | auto_increment |
| 2 | vote_id | smallint(5) unsigned | NO | MUL | 0 |  |
| 3 | option_name | varchar(250) | NO |  |  |  |
| 4 | option_count | int(8) unsigned | NO |  | 0 |  |
| 5 | option_order | tinyint(3) unsigned | NO |  | 100 |  |

<br />

---

> **Query**  [89]  > **--**  [> **DESC mg_wholesale**]> **Query Result..**

| **(row)** | string 10<br />**Field** | blob 21<br />**Type** | string 2<br />**Null** | string 3<br />**Key** | blob 0<br />**Default** | string 14<br />**Extra** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | act_id | mediumint(8) unsigned | NO | PRI |  | auto_increment |
| 2 | goods_id | mediumint(8) unsigned | NO | MUL |  |  |
| 3 | goods_name | varchar(255) | NO |  |  |  |
| 4 | rank_ids | varchar(255) | NO |  |  |  |
| 5 | prices | text | NO |  |  |  |
| 6 | enabled | tinyint(3) unsigned | NO |  |  |  |

<br />

---

