---
title: "base_kvstore"
date: 2022-04-14 22:09:25
toc: true
categories:
- ["Php","源码阅读","ecstore"]
---

*****

---

certi_info<br />      获取证书的版权信息 <br />shop_site_node_id<br />      <br />**<br />**<br />**base**

---

ecos.install.lock<br />      是否安装 <br />ecos.enterprise_info<br />      获取企业信息 <br />server.$srv_name<br />       存储的服务的名称<br />system.main_app<br />      框架的总版本号 <br />certificate<br />      

aftersales

---

site.is_open_return_product(0)售后服务状态

- 0-关闭
- 1-开启

site.return_product_comment()服务须知


### b2c:

---

errorpage.p404(对不起，无法找到您访问的页面，请返回重新访问。)errorpage.p500(对不起，系统无法执行您的请求，请稍后重新访问。)admin.dateFormat(Y-m-d)admin.timeFormat(Y-m-d H:i:s)cache.admin_tmpl(D:\www\work\test/data/cache/admin_tmpl)cache.apc.enabled()cache.front_tmpl(D:\www\work\test/data/cache/front_tmpl)log.level(3)log.path(D:\www\work\test/data/logs)misc.53kf_account()misc.53kf_adv()misc.53kf_interval()misc.53kf_open()misc.53kf_style()misc.forum_code()misc.forum_key()misc.forum_login_api()misc.forum_url()misc.im_alpha()misc.im_hide()misc.im_list()misc.im_position()misc.im_show_page()point.get_policy()point.get_rate()point.refund_method()point.set_commend()point.set_commend_help()point.set_commend_help_v()point.set_commend_v()point.set_coupon()point.set_register()point.set_register_v()coupon.code.encrypt_len(5)coupon.code.count_len(5)coupon.mc.use_times(1)优惠券可用次数security.guest.enabled(true)是否支持非会员购物shop.showGenerator(1)site.version(1396507613)version的最后修改时间site.coupon_order_limit()每张订单可用优惠券数量site.delivery_time(2)默认备货时间site.goods_property()site.index_hot_num()site.index_new_num()site.index_recommend_num()site.index_special_num()site.show_mark_price(true)前台是否显示市场价selllog.display.switch(false)前台是否显示销售记录selllog.display.limit(3)销售记录低于多少条不显示selllog.display.listnum(20)商品详细页显示销售记录数site.login_valide(true)会员登录需输入验证码site.login_type(href)顾客登录方式

- href-跳转至登录页
- target-弹出登录窗口

site.register_valide(true)会员注册需输入验证码site.buy.target(3)顾客点击商品购买按钮后

- 2-弹出购物车页面
- 1-本页跳转到购物车页面
- 3-不跳转页面，直接加入购物车

site.market_price(1)如果无市场价,则市场价=销售价

- 1-×
- 2-+

site.market_rate(1.2)site.save_price(1)商品页是否显示节省金额

- 0-否
- 1-显示节省的金额
- 2-显示百分比
- 3-显示折扣

site.member_price_display(0)会员价显示设定

- 1-显示所有会员等级价格
- 2-不显示会员价

site.meta_desc()META_DESCRIPTION<br />(页面描述)site.meta_key_words()META_KEYWORDS<br />(页面关键词)site.order_storage()库存扣除方式

- 0-订单发货后扣除库存
- 1-订单生成立即扣库存

site.offline_pay(true)支持线下支付方式site.searchlist_num()site.b2c_certify()ShopEx Store 认证显示

- 0-显示在底部
- 1-显示在左侧

site.tax_ratio(0.05)税率site.trigger_tax(false)是否设置含税价格site.min_order(false)是否开启订单起订量site.copyright(copyright © 2008)版权信息site.logo(669f61c74cc8624dc1156939682aacd3)商店Logosite.certtext()备案号site.cert(cert/bazs.cert|bazs.cert|fs_storage)备案证书site.homepage.tmpl_name(1-column)site.thumbnail_pic_height(80)缩略图高度site.thumbnail_pic_width(110)缩略图宽度site.small_pic_height(300)site.small_pic_width(300)site.big_pic_height(600)site.big_pic_width(600)site.default_thumbnail_pic(images/default/default_thumbnail_pic.gif|default/default_thumbnail_pic.gif|fs_storage)site.default_small_pic(images/default/default_small_pic.gif|default/default_small_pic.gif|fs_storage)site.default_big_pic(images/default/default_big_pic.gif|default/default_big_pic.gif|fs_storage)site.watermark.wm_small_enable(0)site.watermark.wm_small_loc(1)site.watermark.wm_small_text()site.watermark.wm_small_font()site.watermark.wm_small_font_size(10)site.watermark.wm_small_font_color(#000000)site.watermark.wm_small_pic(images/default/wm_big_pic.gif|default_big_pic.gif|fs_storage)site.watermark.wm_small_transition(100)site.watermark.wm_big_enable(0)site.watermark.wm_big_loc(0)site.watermark.wm_big_font()site.watermark.wm_big_text()site.watermark.wm_big_font_size(10)site.watermark.wm_big_font_color(#000000)site.watermark.wm_big_pic(images/default/wm_big_pic.gif|default/wm_big_pic.gif|fs_storage)site.watermark.wm_big_transition(100)site.homepage_title({ENV_shopname})TITLE(首页标题)site.homepage_meta_key_words()META_KEYWORDS<br />(页面关键词)site.homepage_meta_desc({ENV_shopname})META_DESCRIPTION<br />(页面描述)site.goods_title({ENV_goods_name}_{ENV_shopname})TITLE(首页标题)site.goods_meta_key_words({ENV_goods_kw})META_KEYWORDS<br />(页面关键词)site.goods_meta_desc({ENV_goods_name}现价{ENV_goods_price};{ENV_goods_intro})META_DESCRIPTION<br />(页面描述)site.list_title({ENV_path}_{ENV_goods_cat_p}_{ENV_shopname})TITLE(首页标题)site.list_meta_key_words({ENV_brand})META_KEYWORDS<br />(页面关键词)site.list_meta_desc({ENV_path},{ENV_shopname}共找到{ENV_goods_amount}个商品)META_DESCRIPTION<br />(页面描述)site.brand_index_title(品牌专区_{ENV_shopname})TITLE(首页标题)site.brand_index_meta_key_words({ENV_brand})META_KEYWORDS<br />(页面关键词)site.brand_index_meta_desc({ENV_shopname}提供{ENV_brand}等品牌的商品。)META_DESCRIPTION<br />(页面描述)site.brand_list_title({ENV_brand}_{ENV_shopname})TITLE(首页标题)site.brand_list_meta_key_words({ENV_brand_kw})META_KEYWORDS<br />(页面关键词)site.brand_list_meta_desc({ENV_brand_intro})META_DESCRIPTION<br />(页面描述)site.article_list_title({ENV_article_cat}_{ENV_shopname})TITLE(首页标题)site.article_list_meta_key_words()META_KEYWORDS<br />(页面关键词)site.article_list_meta_desc({ENV_shopname}{ENV_article_cat})META_DESCRIPTION<br />(页面描述)site.article_title({ENV_article_title}_{ENV_shopname}{ENV_article_cat})TITLE(首页标题)site.article_meta_key_words()META_KEYWORDS<br />(页面关键词)site.article_meta_desc({ENV_article_intro})META_DESCRIPTION<br />(页面描述)system.admin_verycode(1)管理员后台登录启用验证码store.address()联系地址store.certificate_num()store.company_name()网站所有人store.contact()联系人store.email()电子邮件store.mobile_phone()手机store.telephone()固定电话store.zip_code()邮政编码store.site_owner()商店所有人store.mobile()手机store.qq()qqstore.wangwang()旺旺store.greencard(1)system.contact.email()system.contact.mobile()system.contact.name()system.contact.phone()system.clientdpi(96)system.mail_encode()system.mail_lang()system.money.dec_point(.)system.money.decimals(2)订单金额显示位数

- 0-无小数位
- 1-1位小数
- 2-2位小数
- 3-3位小数

system.money.operation.carryset(0)价格进位方式

- 0-四舍五入
- 1-向上取整
- 2-向下取整

system.money.thousands_sep()site.currency.defalt_currency(CNY)站点默认货币

- ----请选择货币---
- CNY-￥ 中国，人民币
- USD-$ 美国，美元
- EUR-€ 欧盟，欧元
- GBP-£ 英国，英镑
- JPY-¥ 日本，日元
- AFN-؋ 阿富汗，阿富汗尼
- ARS-$ 阿根廷，比索
- AWG-ƒ 阿鲁巴，荷兰盾
- AUD-$ 澳大利亚，澳元
- AZN-ман 阿塞拜疆，新马纳特
- BSD-$ 巴哈马，美元
- BBD-$ 巴巴多斯，美元
- BYR-p. 白俄罗斯，卢布
- BZD-BZ$ 伯利兹，美元
- BMD-$ 百慕大，美元
- BOB-$b 玻利维亚，Bolivianos
- BAM-KM 波黑，可兑换马克
- BWP-P 博茨瓦纳，Pulas
- BGN-лв 保加利亚，列弗
- BRL-R$ 巴西，雷亚尔
- BND-$ 文莱达鲁萨兰国，美元
- KHR-៛ 柬埔寨，瑞尔
- CAD-$ 加拿大，加拿大元
- KYD-$ 开曼群岛，美元
- CLP-$ 智利，比索
- COP-$ 哥伦比亚，比索
- CRC-₡ 哥斯达黎加，科隆
- HRK-kn 克罗地亚，库纳
- CUP-₱ 古巴，比索
- CZK-Kč 捷克共和国，克克朗
- DKK-kr 丹麦，克隆纳
- DOP-RD$ 多米尼加共和国，比索
- XCD-$ 东加勒比，美元
- EGP-£ 埃及，磅
- SVC-$ 萨尔瓦多，科朗
- EEK-kr 爱沙尼亚，克龙
- FKP-£ 福克兰群岛，英镑
- FJD-$ 斐济，美元
- GHC-¢ 加纳，塞地
- GIP-£ 直布罗陀，磅
- GTQ-Q 危地马拉，格查尔
- GGP-£ 根西岛，磅
- GYD-$ 圭亚那，美元
- HNL-L 洪都拉斯，伦皮拉
- HKD-$ 香港，港币
- HUF-Ft 匈牙利，福林
- ISK-kr 冰岛，Kronur
- INR-₨ 印度，卢比
- IDR-Rp 印尼，卢比
- IRR-﷼ 伊朗，里亚尔
- IMP-£ 马恩岛，磅
- ILS-₪ 以色列，新谢克尔
- JMD-J$ 牙买加，美元
- JEP-£ 泽西岛，磅
- KZT-лв 哈萨克斯坦，藤戈
- KGS-лв 吉尔吉斯斯坦，索姆
- LAK-₭ 老挝，基普
- LVL-Ls 拉脱维亚，拉提
- LBP-£ 黎巴嫩，磅
- LRD-$ 利比里亚，美元
- CHF-CHF 列支敦士登，瑞士法郎
- LTL-Lt 立陶宛，利泰
- MKD-ден 马其顿，第纳尔
- MYR-RM 马来西亚，林吉特
- MUR-₨ 毛里求斯，卢比
- MXN-$ 墨西哥，比索
- MNT-₮ 蒙古图格里克
- MZN-MT 莫桑比克梅蒂卡尔
- NAD-$ 纳米比亚，美元
- NPR-₨ 尼泊尔，卢比
- ANG-ƒ 荷属安的列斯，荷兰盾
- NZD-$ 新西兰，新西兰元
- NIO-C$ 尼加拉瓜，科多巴
- NGN-₦ 尼日利亚，奈拉
- KPW-₩ 朝鲜，朝鲜元
- NOK-kr 挪威，克朗
- OMR-﷼ 阿曼，里亚尔
- PKR-₨ 巴基斯坦，卢比
- PAB-B/. 巴拿马，巴尔博亚
- PYG-Gs 巴拉圭，瓜拉尼
- PEN-S/. 秘鲁，新索尔
- PHP-Php 菲律宾，比索
- PLN-zł 波兰，罗提
- QAR-﷼ 卡塔尔，里亚尔
- RON-lei 罗马尼亚，新雷
- RUB-руб 俄罗斯，卢布
- SHP-£ 圣赫勒拿岛，磅
- SAR-﷼ 沙特阿拉伯，里亚尔
- RSD-Дин. 塞尔维亚，第纳尔
- SCR-₨ 塞舌尔，卢比
- SGD-$ 新加坡，新加坡元
- SBD-$ 所罗门群岛，美元
- SOS-S 索马里，先令
- ZAR-R 南非，兰特
- KRW-₩ 韩国，韩元
- LKR-₨ 斯里兰卡，卢比
- SEK-kr 瑞典，克郎
- SRD-$ 苏里南，美元
- SYP-£ 叙利亚，磅
- TWD-NT$ 台湾，新台币
- THB-฿ 泰国，泰铢
- TTD-TT$ 特里尼达和多巴哥，美元
- TRY-TL 土耳其，里拉
- TVD-$ 图瓦卢，美元
- UAH-₴ 乌克兰，赫夫纳
- UYU-$U 乌拉圭，比索
- UZS-лв 乌兹别克斯坦，求和
- VEF-Bs 委内瑞拉，博利瓦富尔特斯
- VND-₫ 越南，东
- YER-﷼ 也门，里亚尔
- ZWD-Z$ 津巴布韦，津元
- ALL-Lek 阿尔巴尼亚，莱凯

system.path.article()system.category.showgoods(0)商品分类列表页显示设置

- 0-显示该分类及下属子分类下所有商品
- 1-仅显示本分类下商品

system.product.alert.num(0)商品库存报警数量system.product.zendlucene()前台商品搜索是否启用zendlucenesystem.product.autobn.beginnum(100)system.product.autobn.length(6)system.product.autobn.prefix(PDT)system.send_mail_method()system.shoplang()system.shopname(点此设置您商店的名称)商店名称system.shopurl()system.admin_error_login_times(0)system.admin_error_login_time(0)system.use_cart(1)system.seo.mklink(actmapper.getlink)system.seo.parselink(actmapper.parse)system.seo.emuStatic()商店页面启用伪静态URLsystem.seo.noindex_catalog()通知搜索引擎不索引目录页system.ui.current_theme()system.ui.webslice()支持ie8的webslice特性system.backup.splitFile()site.title_format(%1 $system.shopname$)网站标题格式site.stripHtml(1)是否压缩htmlsite.url.base()主站访问地址site.url.themeres()模板资源访问地址site.url.widgetsres()版块资源访问地址site.promotion.display()商品页是否显示订单促销goods.rate_nums(10)相关商品最大数量site.level_switch(0)会员等级升级方式

- 0-按积分
- 1-按经验值

site.level_point(0)积分消费是否降会员等级

- 0-否
- 1-是

gallery.default_view(index)商品列表默认展示方式

- index-图文混排
- grid-橱窗形式
- text-文字列表

system.fast_delivery_as_progress(1)后台手工发货为"已发货"system.auto_delivery()用户到款则自动发货system.auto_delivery_physical(no)用户到款自动发货时，实体商品如何处理(auto:发货为ready,no:不发货,yes:发货为progress)system.auto_use_advance(1)自动使用预存款search.show.range(1)搜索是否显示价格区间errorpage.searchempty(

# 非常抱歉，没有找到相关商品
**建议：**<br />适当缩短您的关键词或更改关键词后重新搜索，如：将 “索尼手机X1” 改为 “索尼+X1”<br />)order.flow.payed(1)订单付款流程order.flow.consign(1)订单发货流程order.flow.refund(1)订单退款流程order.flow.reship(1)订单退货流程certificate.id()ShopEx证书编号certificate.token()ShopEx证书密钥certificate.str()ShopEx证书身份说明certificate.formal()ShopEx证书身份certificate.kft.cid(false)客服通公司idcertificate.kft.style()客服通风格号certificate.kft.action(TOAPPLY)客服通动作certificate.kft.enable(TOAPPLY)客服通开关certificate.channel.url()渠道urlcertificate.channel.name()渠道商名certificate.channel.status()渠道状态certificate.channel.service()渠道服务类型certificate.distribute()是否开通分销模块messenger.sms.config()短信sms签名b2c.wss.username()合作统计用户名b2c.wss.password()合作统计密码b2c.wss.enable(0)合作统计开关b2c.wss.show(0)合作统计前台开关b2c.wss.js()合作统计jscomment.index.listnum(4)商品首页显示评论条数comment.list.listnum(10)评论列表页显示评论条数comment.switch.ask(on)商品询问开关comment.switch.discuss(on)商品评论开关comment.switch.buy(off)商品经验评论开关comment.display.ask(reply)商品评论(询问),回复显示comment.display.discuss(reply)商品评论(评论),回复显示comment.display.buy(reply)商品评论(经验),回复显示comment.power.ask(null)商品评论(询问),发布权限comment.power.discuss(member)商品评论(评论),发布权限comment.power.buy(buyer)商品评论(经验),发布权限comment.null_notice.ask(如果您对本商品有什么问题,请提问咨询!)没有咨询记录,提示文字comment.null_notice.discuss(如果您对本商品有什么评价或经验,欢迎分享!)商品评论(经验),发布权限comment.null_notice.buy()商品评论(经验),发布权限comment.submit_display_notice.ask(您的问题已经提交成功!)没有咨询记录,提示文字comment.submit_hidden_notice.ask(您的问题已经提交成功,管理员会尽快回复!)商品评论(经验),发布权限comment.submit_display_notice.discuss(感谢您的分享!)商品评论(经验),发布权限comment.submit_hidden_notice.discuss(感谢您的分享,管理员审核后会自动显示!)没有咨询记录,提示文字comment.submit_display_notice.buy(如果您对本商品有什么问题,请提问咨询!)商品评论(经验),发布权限comment.submit_hidden_notice.buy()商品评论(经验),发布权限goodsbn.display.switch(1)是否启用商品编号goodsprop.display.position(1)属性显示位置

- 1-仅商品价格上方
- 2-仅商品详情中
- 0-两处同时显示

storeplace.display.switch(1)是否使用商品货位system.location(mainland)gallery.display.listnum(20)搜索列表显示条数gallery.display.grid.colnum(4)搜索橱窗页每行显示数gallery.deliver.time()搜索列表是否启用发布时间gallery.comment.time()搜索列表是否启用评论次数site.associate.search()前台是否启用联想搜索site.cat.select(1)列表页是否启用分类筛选plugin.passport.config.current_use()当前使用的passportsystem.message.open(off)商店留言发布

- on-会员提交后立即发布
- off-管理员回复后发布

service.wltx()system.default_storager(filesystem)site.show_storage()前台是否显示库存数量site.refer_timeout(15)推荐链接过期时间（天）site.is_open_return_product()是否开启退货功能site.api.maintenance.is_maintenance()site.api.maintenance.notify_msg()system.upload.limit(0)前台图片大小限定

- 0-500k
- 1-1M
- 2-2M
- 3-3M
- 4-5M
- 5-无限制

system.goods.freez.time(1)库存预占触发时间

- 1-下订单
- 2-订单付款

system.guide()向导设置goodsprop.display.switch()是否启用商品属性链接goods.recommend()是否开启商品推荐(商品详细页)system.enable_network()启用网络连接site.rsc_rpc(true)优化商店运营数据site.get_policy.method(1)积分计算方式：

- 1-不使用积分
- 2-按订单商品总价格计算积分
- 3-为商品单独设置积分

site.get_rate.method()积分换算比率：site.min_order_amount()订单起订金额system.event_listener()监控事件监听system.event_listener_key()监控键值is_delivery_discount_close(1)是否打开配送邮寄折扣site.get_policy.stage(1)何时结算积分

- 1-支付完毕时
- 2-支付发货后
- 3-订单完成时

site.consume_point.stage(1)何时扣除使用积分

- 1-支付完成时
- 2-支付并发货后
- 3-订单完成时

site.point_promotion_method(1)积分升级方式

- 1-只升不降
- 2-根据积分余额升级或降级

site.point_expired()积分过期设置site.point_expried_method(1)积分过期方式

- 1-设置过期结束时间
- 2-设置过期时间长度

site.point_expired_value(0)设置积分过期的值site.point_max_deductible_method(1)下订单抵扣金额

- 1-每一笔订单最大的抵扣金额。
- 2-每一笔订单最大的抵扣比例。

site.point_max_deductible_value()积分抵扣最大金额或比例site.point_deductible_value(0.01)积分抵扣金额的比例值site.get_point_interval_time(0)获得积分间隔时间site.point_usage(1)积分用途

- 1-只用于兑换
- 2-只用于抵扣

cart.show_order_sales.type(true)购物车是否显示订单促销信息cart.show_order_sales.total_limit(20)购物车未执行促销总金额区间百分比：site.imgzoom.show(false)是否启用放大镜功能site.imgzoom.width(400)宽site.imgzoom.height(300)高site.checkout.zipcode.required.open()邮编是否为必填项site.checkout.receivermore.open()是否开启配送时间system.default_dc(1)Ĭidsystem.order.tracking(false)是否启用订单跟踪查询api.local.version(2.0)

### base

---

<a name="commenterprise"></a>
### commenterprise

---


### content

---

base.use_node_path_url(true)是否启用节点名称补全URL

### desktop

---

system.admin_verycodebanner(ECOS System)format.date(Y-m-d)日期格式format.time(Y-m-d H:i:s)日期时间格式finder.thead.default.width(105)finder默认表头的宽度

### ectools

---

site.decimal_digit.count(2)金额运算精度保留位数

- 0-整数取整
- 1-取整到1位小数
- 2-取整到2位小数
- 3-取整到3位小数

site.decimal_type.count(1)金额运算精度取整方式

- 1-四舍五入
- 2-向上取整
- 3-向下取整

site.decimal_digit.display(2)金额显示保留位数

- 0-整数取整
- 1-取整到1位小数
- 2-取整到2位小数
- 3-取整到3位小数

site.decimal_type.display(1)金额显示取整方式

- 1-四舍五入
- 2-向上取整
- 3-向下取整

system.area_depth(3)地区级数site.paycenter.pay_succ([返回首页]()<br />（此为默认内容，具体内容可以在后台“页面管理-提示信息管理”中修改）)支付成功提示自定义信息site.paycenter.pay_failure([返回首页]()<br />（此为默认内容，具体内容可以在后台“页面管理-提示信息管理”中修改）)支付失败提示自定义信息

### express

---


### openid

---

<a name="pam"></a>
### pam

---


### site

---

base.site_params_separator(-)URL参数分隔符

- ---

base.site_page_cache(true)启用全页缓存base.enable_site_uri_expanded(true)启用扩展名base.site_uri_expanded_name(html)URL扩展名(例:html)base.check_uri_expanded_name(true)启用URL扩展名检查site.name(点此设置您商店的名称)站点名称page.default_title()网页默认标题page.default_keywords()网页默认关键字page.default_description()网页默认简介system.foot_edit(<br />**修改本区域内容，请到  商店管理后台  >>  站点  >>  站点配置      进行编辑**<br />© 2001～2010 All rights reserved<br />本商店顾客个人信息将不会被泄漏给其他任何机构和个人<br />本商店logo和图片都已经申请保护，不经授权不得使用  <br />有任何购物问题请联系我们在线客服 | 电话：800-800-88888800 | 工作时间：周一至周五 8:00－18:00<br />)网页底部信息system.site_icp()备案号<br />**

**ecos:**

---

net.login_handshake<br />      和服务器进行握手的md5值

