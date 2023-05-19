---
title: "ECSHOP 模板结构说明(适用版本 v2.7.2)"
date: 2022-04-14 22:09:01
toc: true
categories:
- ["Php","源码阅读","ecshop"]
---

| 名称 | 类型 | 备注（作用或意义） | 文件(目录)名可否更改 |
| --- | --- | --- | --- |
| images | 目录 | 存放模板图片目录 | 不可更改 |
| library | 目录 | 存放模板库文件目录 | 不可更改 |
| screenshot.png | 图片 | 用于“后台管理 -> 模板管理 -> 模板选择”显示模板缩略图。 | 不可更改 |
| style.css | css样式表 |  | 不可更改 |
| 备注：模板文件共35个(格式：.dwt)。  <br />提醒：<br />1. 更改模板文件里面库文件的内容是无效的，页面刷新时，程序自动重新载入库文件内容到模板文件里(以库文件内容为准)。<br />2. 模板内所有id值为 ECS_ 开头的都必须保留(和ajax相关)。<br />3. 非库文件内容不可放置到可编辑区域内，否则设置模板时，非库文件内容将被覆盖删除。

 |  |  |  |
| activity.dwt | 模板文件 | 活动列表页 | 不可更改 |
| article.dwt | 模板文件 | 文章内容页 | 不可更改 |
| article_cat.dwt | 模板文件 | 文章列表页 | 不可更改 |
| article_pro.dwt | 模板文件 | 系统文章页[公司简介、版权信息等] | 不可更改 |
| auction.dwt | 模板文件 | 拍卖商品详情页 | 不可更改 |
| aution_list.dwt | 模板文件 | 拍卖列表页 | 不可更改 |
| brand.dwt | 模板文件 | 商品品牌详情页 | 不可更改 |
| brand_list.dwt | 模板文件 | 品牌列表页 | 不可更改 |
| catalog.dwt | 模板文件 | 所有分类页 | 不可更改 |
| category.dwt | 模板文件 | 商品列表页 | 不可更改 |
| compare.dwt | 模板文件 | 商品比较页 | 不可更改 |
| exchange_goods.dwt | 模板文件 | 积分商城商品详情页 | 不可更改 |
| exchange_list.dwt | 模板文件 | 积分商城列表页 | 不可更改 |
| flow.dwt | 模板文件 | 购物车和购物流程页 | 不可更改 |
| gallery.dwt | 模板文件 | 商品相册页 | 不可更改 |
| goods.dwt | 模板文件 | 商品详情页 | 不可更改 |
| group_buy_goods.dwt | 模板文件 | 团购商品详情页 | 不可更改 |
| group_buy_list.dwt | 模板文件 | 团购商品列表页 | 不可更改 |
| index.dwt | 模板文件 | 首页 | 不可更改 |
| message.dwt | 模板文件 | 信息提示页 | 不可更改 |
| message_boart.dwt | 模板文件 | 留言板 | 不可更改 |
| myship.dwt | 模板文件 | 配送方式查询页 | 不可更改 |
| package.dwt | 模板文件 | 超值礼包列表 | 不可更改 |
| pick_out.dwt | 模板文件 | 选购中心页 | 不可更改 |
| quotation.dwt | 模板文件 | 报价单 | 不可更改 |
| receive.dwt | 模板文件 | 收货确认信息页 | 不可更改 |
| respond.dwt | 模板文件 | 在线支付结果提示信息页 | 不可更改 |
| search.dwt | 模板文件 | 商品搜索页 | 不可更改 |
| snatch.dwt | 模板文件 | 夺宝奇兵页 | 不可更改 |
| tag_cloud.dwt | 模板文件 | 标签云页 | 不可更改 |
| topic.dwt | 模板文件 | 专题活动页 | 不可更改 |
| user_clips.dwt | 模板文件 | 用户中心页 （包含：欢迎页，我的留言，我的标签，收藏商品，缺货登记列表，添加缺货登记。） | 不可更改 |
| user_passport.dwt | 模板文件 | 用户安全页（包含：会员登录，会员注册，找回密码。） | 不可更改 |
| user_transaction.dwt | 模板文件 | 用户交易页 （包含：个人资料，我的红包，添加红包，我的订单，订单详情，合并订单，订单状态，商品列表，费用总计，收货人信息，支付方式，其他信息，会员余额。） | 不可更改 |
| wholesage_list.dwt | 模板文件 | 批发方案页 | 不可更改 |
| 备注：库文件共57个 (格式 .lbi)<br />提醒：文件名尽量保存默认，否则在后台管理将无法管理库文件或不可预见错误。

 |  |  |  |
| ad_position.lbi | 库文件 | 广告位 | 不可更改 |
| article_category_tree.lbi | 库文件 | 文章分类树 | 不可更改 |
| auction.lbi | 库文件 | 拍卖商品 | 不可更改 |
| bought_goods.lbi | 库文件 | 购买过此商品的人购买过哪些商品 | 不可更改 |
| bought_note_guide.lbi | 库文件 | 显示商品的购买记录列表(动态载入bought_notes.lbi) | 不可更改 |
| bought_notes.lbi | 库文件 | 显示商品的购买记录列表 | 不可更改 |
| brand_goods.lbi | 库文件 | 品牌的商品 | 不可更改 |
| brands.lbi | 库文件 | 品牌专区 | 不可更改 |
| cart.lbi | 库文件 | 购物车 | 不可更改 |
| cat_articles.lbi | 库文件 | 文章列表 | 不可更改 |
| cat_goods.lbi | 库文件 | 分类下的商品 | 不可更改 |
| category_tree.lbi | 库文件 | 商品分类树 | 不可更改 |
| categorys.lbi | 库文件 | 商品分类 | 不可更改 |
| comments.lbi | 库文件 | 用户评论列表 （ajax载入comments_list.lbi库文件。） | 不可更改 |
| comments_list.lbi | 库文件 | 用户评论内容 | 不可更改 |
| consignee.lbi | 库文件 | 收货地址表单 | 不可更改 |
| email_list.lbi | 库文件 | 前台邮件订阅 | 不可更改 |
| exchange_hot.lbi | 库文件 | 积分商城热卖商品 | 不可更改 |
| exchange_list.lbi | 库文件 | 积分商城商品列表 | 不可更改 |
| filter_attr.lbi | 库文件 | 扩展属性 | 不可更改 |
| goods_article.lbi | 库文件 | 相关文章 | 不可更改 |
| goods_attrlinked.lbi | 库文件 | 属性关联的商品 | 不可更改 |
| goods_fittings.lbi | 库文件 | 相关配件 | 不可更改 |
| goods_gallery.lbi | 库文件 | 商品相册 | 不可更改 |
| goods_list.lbi | 库文件 | 商品列表 | 不可更改 |
| goods_related.lbi | 库文件 | 相关商品 | 不可更改 |
| goods_tags.lbi | 库文件 | 商品标记 | 不可更改 |
| group_buy.lbi | 库文件 | 首页团购商品 | 不可更改 |
| help.lbi | 库文件 | 网店帮助 | 不可更改 |
| history.lbi | 库文件 | 商品浏览历史 | 不可更改 |
| index_ad.lbi | 库文件 | 首页幻灯片Flash模块 | 不可更改 |
| invoice_query.lbi | 库文件 | 发货单查询 | 不可更改 |
| member.lbi | 库文件 | 会员登录 (ajax载入member_info.lbi库文件。) | 不可更改 |
| member_info.lbi | 库文件 | 会员登录表单和登录成功以后用户账户信息 | 不可更改 |
| message_list.lbi | 库文件 | 留言列表 | 不可更改 |
| myship.lbi | 库文件 | 配送方式 | 不可更改 |
| new_articles.lbi | 库文件 | 最新文章 | 不可更改 |
| online.lbi | 库文件 | 统计在线人数 | 不可更改 |
| order_query.lbi | 库文件 | 前台订单状况查询 | 不可更改 |
| order_total.lbi | 库文件 | 订单费用总计 | 不可更改 |
| page_footer.lbi | 库文件 | 页面脚部 | 不可更改 |
| page_header.lbi | 库文件 | 页面顶部 | 不可更改 |
| pages.lbi | 库文件 | 列表分页 | 不可更改 |
| promotion_info.lbi | 库文件 | 促销信息 | 不可更改 |
| recommend_best.lbi | 库文件 | 精品推荐 | 不可更改 |
| recommend_hot.lbi | 库文件 | 热卖商品 | 不可更改 |
| recommend_new.lbi | 库文件 | 新品推荐 | 不可更改 |
| recommend_promotion.lbi | 库文件 | 促销商品 | 不可更改 |
| recommend_promotion.lbi | 库文件 | 促销商品 | 不可更改 |
| relatetag.lbi | 库文件 | 其他应用关联标签数据 | 不可更改 |
| snatch.lbi | 库文件 | 夺宝奇兵出价表单 (必须被id="ECS_SNATCH"包含实现ajax刷新。) | 不可更改 |
| snatch_price.lbi | 库文件 | 夺宝奇兵最新出价列表 (必须被id="ECS_PRICE_LIST"包含实现ajax刷新。) | 不可更改 |
| top10.lbi | 库文件 | 销售排行 | 不可更改 |
| ur_here.lbi | 库文件 | 当前位置 | 不可更改 |
| user_menu.lbi | 库文件 | 用户中心菜单 | 不可更改 |
| vote.lbi | 库文件 | 调查 | 不可更改 |
| vote_list.lbi | 库文件 | 在线调查 | 不可更改 |

