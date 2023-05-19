---
title: "destoon 4.0 文件树"
date: 2022-04-14 22:14:55
toc: true
categories:
- ["Php","源码阅读","destoon"]
---

```
文件夹 PATH 列表
卷序列号码为 0006EE44 237D:1AF7
E:.
│  .htaccess               apache配置
│  404.php                 404
│  admin.php               管理员
│  ajax.php                ajax读取
│  baidunews.xml           新闻页面
│  city.php                城市分站
│  common.inc.php          公共加载文件, 系统初始化
│  config.inc.php          系统配置文件
│  favicon.ico             图标
│  index.html              生成的首页
│  index.php               首页
│  license.txt             协议
│  robots.txt              机器人引擎
│  search.php              搜索
│  sitemaps.xml            网站地图
│  upload.php              上传调用文件
│  version.inc.php         版本信息
│
├─wap
│      area.inc.php        区域
│      article.inc.php     文章
│      brand.inc.php       品牌
│      buy.inc.php         购买
│      category.inc.php    分类
│      company.inc.php     公司
│      contact.inc.php     
│      content.inc.php
│      exhibit.inc.php
│      global.func.php
│      group.inc.php
│      index.php
│      info.inc.php
│      job.inc.php
│      know.inc.php
│      mall.inc.php
│      member.inc.php
│      pay.inc.php
│      quote.inc.php
│      sell.inc.php
│
├─vote          投票调查
│      index.php    投票调查首页
│
├─video
│      ajax.php        本目录下的ajax模块, 这里调用的是根文件夹下的 ajax.php文件
│      config.inc.php  $moduleid的配置文件
│      index.php       首页, 列表页,搜索, 单文件显示的模块
│      list.php
│      search.php
│      show.php
│
├─template  模版文件
│  │  index.html         刷新到上一级目录
│  │  these.name.php     所有模版的列表
│  │
│  └─default
│      │  ----以下所有页面中均含有 index, list, show的页面均不做描述
│      │  footer.htm        通用页脚
│      │  header.htm        通用头部
│      │  index.htm         首页
│      │  index.html        刷新专用
│      │  these.name.php    指定了模版对应的名称, 在模版管理中可以修改这些名称,作为后台管理模版的一个注释
│      │
│      ├─wap    wap
│      │      area.htm
│      │      article.htm
│      │      brand.htm
│      │      buy.htm
│      │      category.htm
│      │      charge.htm
│      │      company.htm
│      │      contact.htm
│      │      content.htm
│      │      exhibit.htm
│      │      footer.htm
│      │      group.htm
│      │      header.htm
│      │      index.htm
│      │      info.htm
│      │      job.htm
│      │      know.htm
│      │      login.htm
│      │      mall.htm
│      │      message.htm
│      │      message_send.htm
│      │      msg.htm
│      │      quote.htm
│      │      resume.htm
│      │      sell.htm
│      │      these.name.php
│      │
│      ├─video   视频
│      │      index.htm
│      │      list.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─tag     标签
│      │      list-brand.htm
│      │      list-buy.htm
│      │      list-cat.htm
│      │      list-child.htm
│      │      list-com.htm
│      │      list-company.htm
│      │      list-down.htm
│      │      list-exhibit.htm
│      │      list-group.htm
│      │      list-hl.htm
│      │      list-hlr.htm
│      │      list-info.htm
│      │      list-job.htm
│      │      list-know.htm
│      │      list-link.htm
│      │      list-mall.htm
│      │      list-np.htm
│      │      list-photo.htm
│      │      list-quote_product.htm
│      │      list-search_kw.htm
│      │      list-search_rank.htm
│      │      list-search_relate.htm
│      │      list-search_spread.htm
│      │      list-search_tip.htm
│      │      list-sell.htm
│      │      list-special.htm
│      │      list-table.htm
│      │      list-trade.htm
│      │      list-video.htm
│      │      list-vote.htm
│      │      list-webpage.htm
│      │      list.htm
│      │      slide-focus.htm
│      │      slide.htm
│      │      table-job.htm
│      │      table-resume.htm
│      │      these.name.php
│      │      thumb-brand.htm
│      │      thumb-mall.htm
│      │      thumb-table.htm
│      │
│      ├─special   专题
│      │      header.htm
│      │      index.htm
│      │      list.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │      type.htm
│      │
│      ├─sell      供应
│      │      compare.htm
│      │      index.htm
│      │      inquiry.htm
│      │      list.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─quote     行情
│      │      index.htm
│      │      list.htm
│      │      price.htm
│      │      product.htm
│      │      quote.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─photo     图库
│      │      index.htm
│      │      list.htm
│      │      private.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │      view.htm
│      │
│      ├─message   提示信息
│      │      404.htm
│      │      alert.htm
│      │      com-notfound.htm          公司不存在
│      │      com-opening.htm
│      │      guest.htm
│      │      list-notfound.htm
│      │      message.htm
│      │      mysql.htm
│      │      noresult.htm
│      │      noright.htm
│      │      show-notfound.htm
│      │      these.name.php
│      │
│      ├─member    商务中心
│      │      ad.htm
│      │      address.htm
│      │      agreement.htm
│      │      alert.htm
│      │      ask.htm
│      │      bind.htm
│      │      cash.htm
│      │      charge.htm
│      │      chat.htm
│      │      credit.htm
│      │      edit.htm
│      │      favorite.htm
│      │      footer.htm
│      │      friend.htm
│      │      goto.htm
│      │      grade.htm
│      │      group.htm
│      │      header.htm
│      │      home.htm
│      │      honor.htm
│      │      index.htm
│      │      index.html
│      │      invite.htm
│      │      link.htm
│      │      login.htm
│      │      mail.htm
│      │      message.htm
│      │      my.htm
│      │      my_article.htm
│      │      my_brand.htm
│      │      my_buy.htm
│      │      my_down.htm
│      │      my_exhibit.htm
│      │      my_group.htm
│      │      my_info.htm
│      │      my_job.htm
│      │      my_know.htm
│      │      my_mall.htm
│      │      my_photo.htm
│      │      my_quote.htm
│      │      my_resume.htm
│      │      my_sell.htm
│      │      my_video.htm
│      │      news.htm
│      │      oauth.htm
│      │      page.htm
│      │      pay.htm
│      │      record.htm
│      │      register.htm
│      │      renew.htm
│      │      select.htm
│      │      send.htm
│      │      sendmail.htm
│      │      sms.htm
│      │      spread.htm
│      │      style.htm
│      │      support.htm
│      │      these.name.php
│      │      trade.htm
│      │      type.htm
│      │      validate.htm
│      │
│      ├─mall    商城模版
│      │      buy.htm
│      │      cart.htm
│      │      comment.htm
│      │      compare.htm
│      │      index.htm
│      │      list.htm
│      │      order.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─mail   邮件模版
│      │      alert.htm
│      │      check.htm
│      │      editemail.htm
│      │      email-default.htm
│      │      email-login.htm
│      │      email-password.htm
│      │      email.htm
│      │      emailcode.htm
│      │      message.htm
│      │      messager.htm
│      │      password.htm
│      │      payword.htm
│      │      send.htm
│      │      these.name.php
│      │      validate.htm
│      │      welcome.htm
│      │
│      ├─know   知道模版
│      │      answer.htm
│      │      faq.htm
│      │      index.htm
│      │      list.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─job    人才模版
│      │      apply.htm
│      │      index.htm
│      │      list.htm
│      │      print_resume.htm
│      │      resume.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─info   信息模版
│      │      index.htm
│      │      list.htm
│      │      message.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─homepage   公司主页
│      │      brand.htm
│      │      buy.htm
│      │      contact.htm
│      │      credit.htm
│      │      footer.htm
│      │      header.htm
│      │      honor.htm
│      │      index.htm
│      │      info.htm
│      │      introduce.htm
│      │      job.htm
│      │      link.htm
│      │      main_brand.htm
│      │      main_elite.htm
│      │      main_info.htm
│      │      main_introduce.htm
│      │      main_mall.htm
│      │      main_photo.htm
│      │      main_sell.htm
│      │      main_video.htm
│      │      mall.htm
│      │      message.htm
│      │      news.htm
│      │      photo.htm
│      │      sell.htm
│      │      side.htm
│      │      side_announce.htm
│      │      side_contact.htm
│      │      side_honor.htm
│      │      side_link.htm
│      │      side_news.htm
│      │      side_page.htm
│      │      side_search.htm
│      │      side_type.htm
│      │      these.name.php
│      │      video.htm
│      │
│      ├─group   团购
│      │      buy.htm
│      │      index.htm
│      │      list.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─extend   功能扩展
│      │      ad.htm
│      │      ad_code.htm
│      │      ad_view.htm
│      │      announce.htm
│      │      archiver.htm
│      │      comment.htm
│      │      comment_list.htm
│      │      feed.htm
│      │      gift.htm
│      │      guestbook.htm
│      │      link.htm
│      │      poll.htm
│      │      poll_show.htm
│      │      sitemap.htm
│      │      spread.htm
│      │      spread_code.htm
│      │      these.name.php
│      │      view.htm
│      │      vote.htm
│      │      webpage.htm
│      │
│      ├─exhibit   展会
│      │      index.htm
│      │      list.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─down      下载
│      │      index.htm
│      │      list.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─company    公司模版[列表,首页,公司展示]
│      │      index.htm
│      │      list.htm
│      │      news.htm
│      │      search.htm
│      │      show.htm          没有企业黄页的会员展示平台
│      │      these.name.php
│      │
│      ├─city   城市分站
│      │      city.htm
│      │      index.htm
│      │      these.name.php
│      │
│      ├─chip   模版片段
│      │      captcha.htm
│      │      catalog.htm
│      │      comment.htm
│      │      contact.htm
│      │      content.htm
│      │      guest_contact.htm
│      │      letter.htm
│      │      line.htm
│      │      password.htm
│      │      player.htm
│      │      poll.htm
│      │      property.htm
│      │      question.htm
│      │      these.name.php
│      │      user.htm
│      │      vote.htm
│      │      zoom.htm
│      │
│      ├─buy   求购
│      │      index.htm
│      │      list.htm
│      │      price.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      ├─brand  品牌
│      │      index.htm
│      │      list.htm
│      │      message.htm
│      │      product.htm
│      │      search.htm
│      │      show.htm
│      │      these.name.php
│      │
│      └─article  信息模版
│              index.htm
│              list.htm
│              search.htm
│              show.htm
│              these.name.php
│
├─spread   排名推广
│      index.php  展示排行榜
│      list.php
│
├─special  专题
│      ajax.php
│      config.inc.php
│      index.php
│      list.php
│      search.php
│      show.php
│      type.php
│
├─skin      风格皮肤
│  │  index.html
│  │  these.name.php
│  │
│  └─default     默认风格
│      │  answer.css
│      │  archiver.css
│      │  ......         相对应模块的css
│      │  catalog.css
│      │  comment.css
│      │  exhibit.css
│      │  gift.css
│      │  ie6.css
│      │  index.css
│      │  index.html
│      │  info.css
│      │  message.css
│      │  poll.css
│      │  style.css
│      │
│      └─image
│              add_job.gif
│              ......
│              add_resume.gif
│
├─sitemap     网站地图
│      index.php
│
├─sell        供求
│      ajax.php          ---
│      compare.php       对比
│      config.inc.php    ---
│      index.php         ---
│      inquiry.php       询价
│      list.php          ---
│      search.php        ---
│      show.php          ---
│
├─quote      行情
│      ajax.php          --
│      config.inc.php    --
│      index.php         --
│      list.php          --
│      price.php         行情报价
│      product.php       
│      search.php        --
│      show.php          --
│
├─poll      票选
│      index.php         --
│
├─photo     图库
│      ajax.php          --
│      config.inc.php    --
│      index.php         --
│      list.php          --
│      private.php
│      search.php        --
│      show.php          --
│      view.php          查看大图
│
├─news
│      ajax.php          --
│      config.inc.php    --
│      index.php         --
│      list.php          --
│      search.php        --
│      show.php          --
│
├─module     各个模块的分功能文件和后台管理调用文件
│  │  index.html
│  │
│  ├─video
│  │  │  common.inc.php     栏目的配置文件
│  │  │  global.func.php    模块的公共函数
│  │  │  index.htm.php      生成html的文件
│  │  │  index.html         跳转
│  │  │  index.inc.php      index的配置文件
│  │  │  list.htm.php       列表页生成html
│  │  │  list.inc.php       列表页配置
│  │  │  my.inc.php         分功能
│  │  │  search.inc.php     搜索配置
│  │  │  show.htm.php       生成html
│  │  │  show.inc.php       显示
│  │  │  task.inc.php       任务
│  │  │  video.class.php    类文件
│  │  │
│  │  └─admin
│  │      │  config.inc.php     模块的配置文件
│  │      │  html.inc.php       生成html的功能
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─special
│  │  │  common.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  item.class.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  special.class.php
│  │  │  task.inc.php
│  │  │  type.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  item.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              item.tpl.php
│  │              item_batch.tpl.php
│  │              item_edit.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─sell
│  │  │  common.inc.php
│  │  │  compare.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  inquiry.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  search.inc.php
│  │  │  sell.class.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  sphinx.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─quote
│  │  │  common.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  price.inc.php
│  │  │  product.inc.php
│  │  │  quote.class.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  product.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              product.tpl.php
│  │              setting.tpl.php
│  │
│  ├─photo
│  │  │  common.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  photo.class.php
│  │  │  private.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │  view.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              item.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─member
│  │  │  ad.inc.php
│  │  │  address.class.php
│  │  │  address.inc.php
│  │  │  admin.inc.php
│  │  │  alert.class.php
│  │  │  alert.inc.php
│  │  │  ask.inc.php
│  │  │  cash.inc.php
│  │  │  charge.inc.php
│  │  │  chat.inc.php
│  │  │  common.inc.php               定义会员表名称和公司表名称
│  │  │  credit.inc.php
│  │  │  edit.inc.php
│  │  │  favorite.class.php
│  │  │  favorite.inc.php
│  │  │  friend.class.php
│  │  │  friend.inc.php
│  │  │  global.func.php
│  │  │  goto.inc.php
│  │  │  grade.class.php
│  │  │  grade.inc.php
│  │  │  group.inc.php
│  │  │  home.inc.php
│  │  │  honor.class.php
│  │  │  honor.inc.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  invite.inc.php
│  │  │  line.inc.php
│  │  │  link.class.php
│  │  │  link.inc.php
│  │  │  login.inc.php
│  │  │  logout.inc.php
│  │  │  mail.inc.php
│  │  │  member.class.php
│  │  │  message.class.php
│  │  │  message.inc.php
│  │  │  my.inc.php
│  │  │  news.class.php
│  │  │  news.inc.php
│  │  │  oauth.inc.php
│  │  │  page.class.php
│  │  │  page.inc.php
│  │  │  pay.inc.php
│  │  │  record.inc.php
│  │  │  register.inc.php
│  │  │  renew.inc.php
│  │  │  send.inc.php
│  │  │  sendmail.inc.php
│  │  │  sms.inc.php
│  │  │  spread.inc.php
│  │  │  style.class.php
│  │  │  style.inc.php
│  │  │  support.inc.php
│  │  │  task.inc.php
│  │  │  trade.inc.php
│  │  │  type.inc.php
│  │  │  validate.inc.php
│  │  │
│  │  └─admin
│  │      │  address.inc.php
│  │      │  alert.inc.php
│  │      │  ask.inc.php
│  │      │  card.inc.php
│  │      │  cash.inc.php
│  │      │  charge.inc.php
│  │      │  chat.inc.php
│  │      │  config.inc.php          权限分配文件
│  │      │  contact.inc.php
│  │      │  credit.inc.php
│  │      │  favorite.inc.php
│  │      │  friend.inc.php
│  │      │  grade.inc.php
│  │      │  group.inc.php
│  │      │  honor.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  link.inc.php
│  │      │  loginlog.inc.php
│  │      │  mail.inc.php
│  │      │  menu.inc.php
│  │      │  message.inc.php
│  │      │  news.inc.php
│  │      │  oauth.inc.php
│  │      │  online.inc.php
│  │      │  page.inc.php
│  │      │  pay.inc.php
│  │      │  promo.inc.php
│  │      │  record.inc.php
│  │      │  sendmail.inc.php
│  │      │  setting.inc.php
│  │      │  sms.inc.php
│  │      │  style.inc.php
│  │      │  validate.inc.php
│  │      │
│  │      └─template
│  │              address.tpl.php
│  │              address_edit.tpl.php
│  │              alert.tpl.php
│  │              alert_add.tpl.php
│  │              alert_edit.tpl.php
│  │              alert_send.tpl.php
│  │              ask.tpl.php
│  │              ask_edit.tpl.php
│  │              card.tpl.php
│  │              card_add.tpl.php
│  │              cash.tpl.php
│  │              cash_edit.tpl.php
│  │              cash_show.tpl.php
│  │              charge.tpl.php
│  │              chat.tpl.php
│  │              contact.tpl.php
│  │              credit.tpl.php
│  │              credit_add.tpl.php
│  │              favorite.tpl.php
│  │              favorite_edit.tpl.php
│  │              friend.tpl.php
│  │              friend_edit.tpl.php
│  │              grade.tpl.php
│  │              grade_edit.tpl.php
│  │              group.tpl.php
│  │              group_edit.tpl.php
│  │              honor.tpl.php
│  │              honor_check.tpl.php
│  │              honor_edit.tpl.php
│  │              honor_expire.tpl.php
│  │              honor_recycle.tpl.php
│  │              honor_reject.tpl.php
│  │              index.html
│  │              link.tpl.php
│  │              link_edit.tpl.php
│  │              loginlog.tpl.php
│  │              mail.tpl.php
│  │              mail_add.tpl.php
│  │              mail_edit.tpl.php
│  │              mail_list.tpl.php
│  │              member.tpl.php
│  │              member_add.tpl.php
│  │              member_check.tpl.php
│  │              member_edit.tpl.php
│  │              member_show.tpl.php
│  │              message.tpl.php
│  │              message_clear.tpl.php
│  │              message_edit.tpl.php
│  │              message_mail.tpl.php
│  │              message_send.tpl.php
│  │              message_show.tpl.php
│  │              message_system.tpl.php
│  │              news.tpl.php
│  │              news_check.tpl.php
│  │              news_edit.tpl.php
│  │              news_push.tpl.php
│  │              news_recycle.tpl.php
│  │              news_reject.tpl.php
│  │              oauth.tpl.php
│  │              online.tpl.php
│  │              online_admin.tpl.php
│  │              page.tpl.php
│  │              page_check.tpl.php
│  │              page_edit.tpl.php
│  │              page_recycle.tpl.php
│  │              page_reject.tpl.php
│  │              pay.tpl.php
│  │              promo.tpl.php
│  │              promo_add.tpl.php
│  │              record.tpl.php
│  │              record_add.tpl.php
│  │              sendmail.tpl.php
│  │              sendmail_list.tpl.php
│  │              sendmail_make.tpl.php
│  │              sendmail_record.tpl.php
│  │              sendmail_show.tpl.php
│  │              setting.tpl.php
│  │              sms.tpl.php
│  │              sms_add.tpl.php
│  │              sms_list.tpl.php
│  │              sms_make.tpl.php
│  │              sms_record.tpl.php
│  │              sms_send.tpl.php
│  │              style.tpl.php
│  │              style_add.tpl.php
│  │              style_edit.tpl.php
│  │              validate.tpl.php
│  │
│  ├─mall
│  │  │  api.inc.php
│  │  │  buy.inc.php
│  │  │  cart.inc.php
│  │  │  common.inc.php
│  │  │  compare.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  mall.class.php
│  │  │  my.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  order.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              order.tpl.php
│  │              order_refund.tpl.php
│  │              order_show.tpl.php
│  │              setting.tpl.php
│  │
│  ├─know
│  │  │  answer.class.php
│  │  │  answer.inc.php
│  │  │  common.inc.php
│  │  │  faq.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  know.class.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  answer.inc.php
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              answer.tpl.php
│  │              answer_edit.tpl.php
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─job
│  │  │  apply.inc.php
│  │  │  common.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  job.class.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  resume.class.php
│  │  │  resume.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  talent.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  resume.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              resume_edit.tpl.php
│  │              resume_index.tpl.php
│  │              setting.tpl.php
│  │
│  ├─info
│  │  │  common.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  info.class.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  message.inc.php
│  │  │  my.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─group
│  │  │  buy.inc.php
│  │  │  common.inc.php
│  │  │  global.func.php
│  │  │  group.class.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  order.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              order.tpl.php
│  │              order_show.tpl.php
│  │              setting.tpl.php
│  │
│  ├─extend
│  │  │  ad.class.php
│  │  │  ad.htm.php
│  │  │  ad.inc.php
│  │  │  announce.class.php
│  │  │  announce.htm.php
│  │  │  announce.inc.php
│  │  │  baidunews.htm.php
│  │  │  comment.class.php
│  │  │  comment.inc.php
│  │  │  comment_list.inc.php
│  │  │  common.inc.php
│  │  │  feed.inc.php
│  │  │  gift.class.php
│  │  │  gift.inc.php
│  │  │  global.func.php
│  │  │  guestbook.class.php
│  │  │  guestbook.inc.php
│  │  │  image.inc.php
│  │  │  index.html
│  │  │  link.class.php
│  │  │  link.inc.php
│  │  │  poll.class.php
│  │  │  poll.inc.php
│  │  │  redirect.inc.php
│  │  │  rss.inc.php
│  │  │  shortcut.inc.php
│  │  │  sitemap.inc.php
│  │  │  sitemaps.htm.php
│  │  │  spread.class.php
│  │  │  spread.htm.php
│  │  │  spread.inc.php
│  │  │  task.inc.php
│  │  │  view.inc.php
│  │  │  vote.class.php
│  │  │  vote.htm.php
│  │  │  vote.inc.php
│  │  │  webpage.class.php
│  │  │  webpage.htm.php
│  │  │
│  │  └─admin
│  │      │  ad.inc.php
│  │      │  announce.inc.php
│  │      │  comment.inc.php
│  │      │  config.inc.php
│  │      │  gift.inc.php
│  │      │  guestbook.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  link.inc.php
│  │      │  menu.inc.php
│  │      │  poll.inc.php
│  │      │  setting.inc.php
│  │      │  sitemap.inc.php
│  │      │  spread.inc.php
│  │      │  vote.inc.php
│  │      │  webpage.inc.php
│  │      │
│  │      └─template
│  │              ad.tpl.php
│  │              ad_add.tpl.php
│  │              ad_add_place.tpl.php
│  │              ad_edit.tpl.php
│  │              ad_edit_place.tpl.php
│  │              ad_list.tpl.php
│  │              ad_runcode.tpl.php
│  │              announce.tpl.php
│  │              announce_edit.tpl.php
│  │              comment.tpl.php
│  │              comment_ban.tpl.php
│  │              comment_edit.tpl.php
│  │              gift.tpl.php
│  │              gift_edit.tpl.php
│  │              gift_order.tpl.php
│  │              guestbook.tpl.php
│  │              guestbook_edit.tpl.php
│  │              index.html
│  │              link.tpl.php
│  │              link_check.tpl.php
│  │              link_edit.tpl.php
│  │              poll.tpl.php
│  │              poll_edit.tpl.php
│  │              poll_item.tpl.php
│  │              poll_record.tpl.php
│  │              setting.tpl.php
│  │              spread.tpl.php
│  │              spread_edit.tpl.php
│  │              spread_price.tpl.php
│  │              vote.tpl.php
│  │              vote_edit.tpl.php
│  │              vote_record.tpl.php
│  │              webpage.tpl.php
│  │              webpage_edit.tpl.php
│  │              webpage_group.tpl.php
│  │
│  ├─exhibit
│  │  │  common.inc.php
│  │  │  exhibit.class.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─down
│  │  │  common.inc.php
│  │  │  down.class.php
│  │  │  down.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─company
│  │  │  brand.inc.php
│  │  │  buy.inc.php
│  │  │  common.inc.php
│  │  │  company.class.php
│  │  │  contact.inc.php
│  │  │  credit.inc.php
│  │  │  global.func.php
│  │  │  guest.inc.php
│  │  │  home.inc.php
│  │  │  homepage.inc.php
│  │  │  honor.inc.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  info.inc.php
│  │  │  init.inc.php
│  │  │  introduce.inc.php
│  │  │  job.inc.php
│  │  │  link.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  mall.inc.php
│  │  │  news.inc.php
│  │  │  photo.inc.php
│  │  │  search.inc.php
│  │  │  sell.inc.php
│  │  │  task.inc.php
│  │  │  tour.inc.php
│  │  │  video.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  menu.inc.php
│  │      │  setting.inc.php
│  │      │  vip.inc.php
│  │      │
│  │      └─template
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │              vip.tpl.php
│  │              vip_add.tpl.php
│  │              vip_edit.tpl.php
│  │              vip_expire.tpl.php
│  │
│  ├─buy
│  │  │  buy.class.php
│  │  │  common.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  my.inc.php
│  │  │  price.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  ├─brand
│  │  │  brand.class.php
│  │  │  common.inc.php
│  │  │  global.func.php
│  │  │  index.htm.php
│  │  │  index.html
│  │  │  index.inc.php
│  │  │  list.htm.php
│  │  │  list.inc.php
│  │  │  message.inc.php
│  │  │  my.inc.php
│  │  │  product.inc.php
│  │  │  search.inc.php
│  │  │  show.htm.php
│  │  │  show.inc.php
│  │  │  task.inc.php
│  │  │
│  │  └─admin
│  │      │  config.inc.php
│  │      │  html.inc.php
│  │      │  index.html
│  │      │  index.inc.php
│  │      │  install.inc.php
│  │      │  menu.inc.php
│  │      │  remkdir.inc.php
│  │      │  setting.inc.php
│  │      │  uninstall.inc.php
│  │      │
│  │      └─template
│  │              edit.tpl.php
│  │              html.tpl.php
│  │              index.html
│  │              index.tpl.php
│  │              move.tpl.php
│  │              setting.tpl.php
│  │
│  └─article     文章模块
│      │  article.class.php   核心类库
│      │  common.inc.php      模块初始化
│      │  global.func.php     核心函数库
│      │  index.htm.php       静态首页
│      │  index.html     
│      │  index.inc.php       首页
│      │  list.htm.php        静态列表页
│      │  list.inc.php        列表页
│      │  my.inc.php          
│      │  search.inc.php
│      │  show.htm.php        单页面静态页
│      │  show.inc.php        单页面
│      │  task.inc.php        计划任务
│      │
│      └─admin     文章管理
│          │  config.inc.php
│          │  html.inc.php
│          │  index.html
│          │  index.inc.php
│          │  install.inc.php
│          │  menu.inc.php
│          │  remkdir.inc.php
│          │  setting.inc.php
│          │  uninstall.inc.php
│          │
│          └─template     模版
│                  author.tpl.php
│                  edit.tpl.php
│                  from.tpl.php
│                  html.tpl.php
│                  index.html
│                  index.tpl.php
│                  move.tpl.php
│                  setting.tpl.php
│
├─member     会员
│  │  404.php
│  │  ad.php
│  │  address.php
│  │  ajax.php
│  │  alert.php
│  │  answer.php
│  │  ask.php
│  │  cash.php
│  │  charge.php
│  │  chat.php
│  │  config.inc.php
│  │  credit.php
│  │  edit.php
│  │  favorite.php           个人收藏
│  │  friend.php             我的好友
│  │  goto.php
│  │  grade.php
│  │  group.php
│  │  home.php               网站设置
│  │  honor.php              企业荣誉
│  │  index.php
│  │  invite.php
│  │  line.php               
│  │  link.php               友情链接
│  │  login.php
│  │  logout.php
│  │  mail.php
│  │  message.php            站内信
│  │  my.php
│  │  news.php               公司新闻
│  │  oauth.php
│  │  page.php               公司单页
│  │  pay.php
│  │  record.php
│  │  register.php
│  │  renew.php
│  │  send.php
│  │  sendmail.php
│  │  sms.php
│  │  spread.php
│  │  style.php               模版设置
│  │  support.php
│  │  trade.php               我的订单
│  │  type.php
│  │  validate.php
│  │
│  ├─image  会员所用图片
│  │      add_bg.gif
│  │      ......
│  │      arrow_o.gif
│  │
│  ├─fckeditor     编辑器
│  │
│  └─face          表情
│          index.html
│
├─mall         商城
│      ajax.php
│      api.php
│      buy.php
│      cart.php
│      compare.php
│      config.inc.php
│      index.php
│      list.php
│      search.php
│      show.php
│
├─link          友情链接
│      index.php
│
├─lang     语言包
│  │ 
│  │  these.name.php
│  │
│  └─zh-cn
│          article.inc.php
│          brand.inc.php
│          buy.inc.php
│          company.inc.php
│          down.inc.php
│          exhibit.inc.php
│          extend.inc.php
│          group.inc.php
│          homepage.inc.php
│          include.inc.php
│          index.html
│          info.inc.php
│          job.inc.php
│          know.inc.php
│          lang.inc.php
│          lang.js               JS语言文件定义
│          mall.inc.php
│          member.inc.php
│          message.inc.php
│          misc.inc.php
│          my.inc.php
│          photo.inc.php
│          quote.inc.php
│          search.inc.php
│          sell.inc.php
│          sms.inc.php
│          special.inc.php
│          video.inc.php
│          wap.inc.php
│
├─know        问答模块
│      ajax.php
│      config.inc.php
│      faq.php
│      index.php
│      list.php
│      search.php
│      show.php
│
├─job         人才招聘
│      ajax.php
│      apply.php
│      config.inc.php
│      index.php
│      list.php
│      resume.php
│      search.php
│      show.php
│      talent.php
│
├─invest      投资融资
│      ajax.php
│      config.inc.php
│      index.php
│      list.php
│      message.php
│      search.php
│      show.php
│
├─install     安装程序
│      chmod.txt
│      footer.tpl.php
│      head.gif
│      header.tpl.php
│      index.php
│      load.gif
│      logo.gif
│      msg.tpl.php
│      mysql.sql
│      step_1.tpl.php
│      step_2.tpl.php
│      step_3.tpl.php
│      step_4.tpl.php
│      step_5.tpl.php
│      step_6.tpl.php
│      style.css
│
├─include     核心类库
│      bmp.func.php                    bmp文件处理函数
│      cache.func.php                  缓存函数
│      cache_apc.class.php             缓存类
│      cache_eaccelerator.class.php    ..
│      cache_file.class.php            ..
│      cache_memcache.class.php        ..
│      cache_shmop.class.php           ..
│      cache_xcache.class.php          ..
│      captcha.class.php               验证类
│      city.inc.php                    区域,城市配置文件
│      convert.func.php                文字转换函数
│      db_access.class.php             数据库类
│      db_mssql.class.php              ...
│      db_mysql.class.php              ...
│      db_mysqli.class.php             ...
│      db_mysqlirw.class.php           mysql读写服务类
│      db_mysqlrw.class.php            ...
│      defend.inc.php                  预防攻击
│      fields.func.php                 字段验证,输出
│      file.func.php                   文件函数
│      ftp.class.php                   ftp类
│      global.func.php                 公共函数
│      image.class.php                 水印,缩略图类
│      index.htm.php                   生成index文件
│      index.html
│      ip.func.php                     IP转换/检测函数
│      mail.func.php                   邮件函数
│      module.func.php                 模块函数
│      post.func.php                   发布,生成函数
│      property.func.php               属性函数
│      remote.class.php                远程存取
│      rewrite.inc.php                 重写
│      seo.inc.php                     seo配置
│      session.class.php               session类
│      sphinx.class.php                SPHINX函数
│      sql.func.php                    SQL的导出和执行
│      tag.func.php                    tag文件处理函数
│      template.func.php               模版解析函数
│      tree.class.php
│      type.class.php
│      update.inc.php                  低优先级更新点击次数
│      upload.class.php                上传
│
├─guestbook    留言板
│      index.php
│
├─group        群组
│      ajax.php
│      buy.php
│      config.inc.php
│      index.php
│      list.php
│      search.php
│      show.php
│
├─gift
│      index.php
│
├─file          
│  │  index.html
│  │
│  ├─user
│  │  │  index.html
│  │  │
│  │  └─1
│  │      │  index.html
│  │      │
│  │      └─1
│  │              index.html
│  │              note.php
│  │
│  ├─upload     上传文件
│  │
│  ├─update     系统更新
│  │
│  ├─temp       临时目录
│  │
│  ├─table
│  │      gb-pinyin.table
│  │      gb-unicode.table
│  │      index.html
│  │
│  ├─swfupload
│  │      cancelbutton.gif
│  │      editor.inc.php
│  │      error.gif
│  │      handlers_down.js
│  │      handlers_editor.js
│  │      handlers_photo.js
│  │      handlers_video.js
│  │      ico.png
│  │      index.html
│  │      style.css
│  │      swfupload.error.js
│  │      swfupload.js
│  │      swfupload.queue.js
│  │      swfupload.speed.js
│  │      swfupload.swf
│  │      swfuploadbutton.swf
│  │      toobig.gif
│  │      upload1.png
│  │      upload2.png
│  │      uploadlimit.gif
│  │      zerobyte.gif
│  │
│  ├─setting     配置数据/[?:安装时候的配置文件]
│  │
│  ├─session     session存放路径
│  │
│  ├─script      javascript
│  │      admin.js
│  │      area.js
│  │      calendar.js
│  │      category.js
│  │      chat.js
│  │      clear.js
│  │      color.js
│  │      common.js
│  │      config.js
│  │      content.js
│  │      draft.js
│  │      fckeditor.js
│  │      homepage.js
│  │      index.html
│  │      index.js
│  │      keyboard.js
│  │      marquee.js
│  │      md5.js
│  │      member.js
│  │      page.js
│  │      player.js
│  │      profile.js
│  │      property.js
│  │
│  ├─mobile     手机列表
│  │      index.html
│  │
│  ├─md5        MD5校验
│  │      index.html
│  │      2012-08-15 11.09.php
│  │      4.0.php
│  │
│  ├─log        日志
│  │      index.html
│  │
│  ├─ipdata     IP数据库
│  │      index.html
│  │      tiny.dat
│  │
│  ├─image      公共图片
│  │
│  ├─font       字体
│  │
│  ├─flash      flash文件
│  │      chat_msg.swf
│  │      chat_new.swf
│  │      chat_tip.swf
│  │      delete.swf
│  │      flvplayer.swf
│  │      focus.swf
│  │      index.html
│  │      message_1.swf
│  │      message_2.swf
│  │      message_3.swf
│  │      ok.swf
│  │      player.swf
│  │      slide.swf
│  │      tip.swf
│  │      vcastr3.swf
│  │      vcastr3_logo.swf
│  │
│  ├─ext
│  │
│  ├─email     邮件列表
│  │
│  ├─data      表数据导入
│  │      index.html
│  │
│  ├─config    配置文件
│  │      cncaptcha.inc.php     图形验证类的配置文件
│  │      filetype.inc.php
│  │      index.html
│  │      memcache.inc.php
│  │      mirror.inc.php
│  │      mysqlrw.inc.php       mysql读写服务器的配置
│  │      robot.inc.php
│  │
│  ├─chat      聊天记录
│  │      index.html
│  │
│  ├─captcha   验证码字体
│  │      angltrr.ttf
│  │      dichtmy.ttf
│  │      index.html
│  │      nobilty.ttf
│  │      protest.ttf
│  │
│  ├─cache     缓存
│  │  │
│  │  │   catetree-1.php  返回可以选择的option
│  │  │   menu-*.php      管理员菜单
│  │  │   right-*.php     管理员后台权限控制
│  │  │   keylink-*.php   关键链接
│  │  │
│  │  ├─tpl  模版缓存
│  │  │
│  │  ├─tag  标签缓存
│  │  │
│  │  ├─php  
│  │  │     /us/username.php     
│  │  │
│  │  ├─htm
│  │  │
│  │  └─ban
│  │
│  └─backup     备份文件
│
├─feed        订阅
│      ajax.php
│      index.php
│      rss.php
│
├─extend      扩展
│      ajax.php
│      comment.php
│      config.inc.php
│      image.php
│      index.html
│      redirect.php
│      shortcut.php
│      view.php
│
├─exhibit     展览会
│      ajax.php
│      config.inc.php
│      index.php
│      list.php
│      search.php
│      show.php
│
├─down        下载
│      ajax.php
│      config.inc.php
│      down.php
│      index.php
│      list.php
│      search.php
│      show.php
│
├─company     公司界面
│  │  404.php
│  │  ajax.php
│  │  config.inc.php
│  │  favicon.ico
│  │  guest.php
│  │  home.php
│  │  index.php
│  │  list.php
│  │  news.php
│  │  robots.txt
│  │  search.php
│  │  tour.php
│  │
│  ├─video
│  │      index.php
│  │
│  ├─skin     公司模版皮肤
│  │  │  common.css
│  │  │
│  │  ├─purple       
│  │  │
│  │  └─blue
│  │
│  ├─sell
│  │      index.php
│  │
│  ├─photo
│  │      index.php
│  │
│  ├─news
│  │      index.php
│  │
│  ├─mall
│  │      index.php
│  │
│  ├─link
│  │      index.php
│  │
│  ├─job
│  │      index.php
│  │
│  ├─introduce
│  │      index.php
│  │
│  ├─info
│  │      index.php
│  │
│  ├─image   图片文件夹
│  │
│  ├─honor
│  │      index.php
│  │
│  ├─homepage
│  │      index.php
│  │
│  ├─credit
│  │      index.php
│  │
│  ├─contact
│  │      index.php
│  │
│  ├─buy
│  │      index.php
│  │
│  └─brand
│          index.php
│
├─comment    评论
│      index.php
│
├─buy        求购
│      ajax.php
│      config.inc.php
│      index.php
│      list.php
│      price.php
│      search.php
│      show.php
│
├─brand      品牌
│      ajax.php
│      config.inc.php
│      index.php
│      list.php
│      message.php
│      product.php
│      search.php
│      show.php
│
├─archiver   内容归档
│      index.php
│
├─api        系统及第三方接口
│  │  404.php
│  │  503.php
│  │  ajax.php
│  │  captcha.png.php
│  │  discuz.inc.php
│  │  extend.func.php
│  │  im.func.php
│  │  index.html
│  │  js.php
│  │  pages.default.php
│  │  pages.sample.php
│  │  phpwind.inc.php
│  │  select.php
│  │  task.js.php
│  │  uc.inc.php
│  │  uc.php
│  │  url.inc.php
│  │
│  ├─ucenter          UCENTER
│  │  │  change.log
│  │  │  client.php
│  │  │  index.htm
│  │  │
│  │  ├─model
│  │  │      app.php
│  │  │      base.php
│  │  │      cache.php
│  │  │      domain.php
│  │  │      friend.php
│  │  │      index.htm
│  │  │      mail.php
│  │  │      misc.php
│  │  │      note.php
│  │  │      pm.php
│  │  │      tag.php
│  │  │      user.php
│  │  │
│  │  ├─lib
│  │  │      db.class.php
│  │  │      index.htm
│  │  │      sendmail.inc.php
│  │  │      uccode.class.php
│  │  │      xml.class.php
│  │  │
│  │  ├─data
│  │  │  │  index.htm
│  │  │  │
│  │  │  └─cache
│  │  └─control
│  │          app.php
│  │          cache.php
│  │          domain.php
│  │          feed.php
│  │          friend.php
│  │          index.htm
│  │          mail.php
│  │          pm.php
│  │          tag.php
│  │          user.php
│  │
│  ├─trade          担保交易
│  │  │  index.html
│  │  │  setting.inc.php
│  │  │
│  │  └─alipay
│  │      │  config.inc.php
│  │      │  ico.gif
│  │      │  index.html
│  │      │  logo.gif
│  │      │  pay.gif
│  │      │  show.php
│  │      │  update.inc.php
│  │      │
│  │      ├─2
│  │      │  │  index.html
│  │      │  │  notify.php
│  │      │  │  pay.inc.php
│  │      │  │  return.php
│  │      │  │  send.inc.php
│  │      │  │
│  │      │  ├─send
│  │      │  │      alipay_core.function.php
│  │      │  │      alipay_notify.class.php
│  │      │  │      alipay_service.class.php
│  │      │  │      alipay_submit.class.php
│  │      │  │
│  │      │  └─pay
│  │      │          alipay_core.function.php
│  │      │          alipay_notify.class.php
│  │      │          alipay_service.class.php
│  │      │          alipay_submit.class.php
│  │      │
│  │      └─1
│  │          │  index.html
│  │          │  notify.php
│  │          │  pay.inc.php
│  │          │  return.php
│  │          │  send.inc.php
│  │          │
│  │          ├─send
│  │          │      alipay_core.function.php
│  │          │      alipay_notify.class.php
│  │          │      alipay_service.class.php
│  │          │      alipay_submit.class.php
│  │          │
│  │          └─pay
│  │                  alipay_core.function.php
│  │                  alipay_notify.class.php
│  │                  alipay_service.class.php
│  │                  alipay_submit.class.php
│  │
│  ├─stats          第三方统计
│  │  │  index.html
│  │  │  these.name.php
│  │  │
│  │  ├─cnzz
│  │  │      index.html
│  │  │      post.inc.php
│  │  │      show.inc.php
│  │  │
│  │  └─51la
│  │          index.html
│  │          post.inc.php
│  │          show.inc.php
│  │
│  ├─pay            支付接口
│  │  │  index.html
│  │  │  setting.inc.php
│  │  │
│  │  ├─yeepay
│  │  │      index.html
│  │  │      receive.inc.php
│  │  │      send.inc.php
│  │  │      yeepayCommon.php
│  │  │
│  │  ├─tenpay
│  │  │      index.html
│  │  │      PayRequestHandler.class.php
│  │  │      PayResponseHandler.class.php
│  │  │      receive.inc.php
│  │  │      RequestHandler.class.php
│  │  │      ResponseHandler.class.php
│  │  │      send.inc.php
│  │  │
│  │  ├─paypal
│  │  │      index.html
│  │  │      notify.php
│  │  │      receive.inc.php
│  │  │      send.inc.php
│  │  │
│  │  ├─chinapay
│  │  │      index.html
│  │  │      lib_curl.php
│  │  │      netpayclient.php
│  │  │      netpayclient_config.php
│  │  │      notify.php
│  │  │      PgPubk_test.key
│  │  │      receive.inc.php
│  │  │      send.inc.php
│  │  │
│  │  ├─chinabank
│  │  │      index.html
│  │  │      notify.php
│  │  │      receive.inc.php
│  │  │      send.inc.php
│  │  │
│  │  └─alipay
│  │          config.inc.php
│  │          index.html
│  │          notify.class.php
│  │          notify.php
│  │          receive.inc.php
│  │          send.inc.php
│  │          service.class.php
│  │
│  ├─oauth          一键登录
│  │  │  avatar.png
│  │  │  destoon.inc.php
│  │  │  index.html
│  │  │  setting.inc.php
│  │  │
│  │  ├─sina
│  │  │      callback.php
│  │  │      connect.php
│  │  │      ico.png
│  │  │      index.php
│  │  │      init.inc.php
│  │  │      login.png
│  │  │
│  │  ├─qq
│  │  │      callback.php
│  │  │      connect.php
│  │  │      ico.png
│  │  │      index.php
│  │  │      init.inc.php
│  │  │      login.png
│  │  │      login50.png
│  │  │
│  │  ├─msn
│  │  │      callback.php
│  │  │      connect.php
│  │  │      ico.png
│  │  │      index.php
│  │  │      init.inc.php
│  │  │
│  │  └─baidu
│  │          callback.php
│  │          connect.php
│  │          ico.png
│  │          index.php
│  │          init.inc.php
│  │          login.png
│  │
│  ├─map          电子地图
│  │  │  index.html
│  │  │  these.name.php
│  │  │
│  │  ├─mapabc
│  │  │      config.inc.php
│  │  │      index.html
│  │  │      mark.php
│  │  │      post.inc.php
│  │  │      show.inc.php
│  │  │      show.php
│  │  │
│  │  ├─google
│  │  │      config.inc.php
│  │  │      index.html
│  │  │      mark.php
│  │  │      post.inc.php
│  │  │      show.inc.php
│  │  │      show.php
│  │  │
│  │  ├─baidu
│  │  │      config.inc.php
│  │  │      index.html
│  │  │      mark.php
│  │  │      post.inc.php
│  │  │      show.inc.php
│  │  │      show.php
│  │  │
│  │  └─51ditu
│  │          config.inc.php
│  │          index.html
│  │          mark.php
│  │          post.inc.php
│  │          show.inc.php
│  │
│  └─kf          在线客服
│      │  index.html
│      │  these.name.php
│      │
│      ├─tq
│      │      index.html
│      │      post.inc.php
│      │      show.inc.php
│      │
│      ├─qiao
│      │      index.html
│      │      post.inc.php
│      │      show.inc.php
│      │
│      └─53kf
│              index.html
│              post.inc.php
│              show.inc.php
│
├─announce       公告中心
│      index.php
│
├─admin               系统核心后台管理
│  │  404.inc.php
│  │  admin.class.php
│  │  admin.inc.php
│  │  admin_check.inc.php
│  │  area.inc.php
│  │  banip.inc.php
│  │  banword.inc.php
│  │  category.inc.php
│  │  city.inc.php
│  │  config.inc.php
│  │  data.inc.php
│  │  database.inc.php
│  │  destoon.inc.php
│  │  doctor.inc.php
│  │  fetch.inc.php
│  │  fields.inc.php
│  │  global.func.php
│  │  html.inc.php
│  │  index.html
│  │  index.inc.php
│  │  ip.inc.php
│  │  keylink.inc.php
│  │  keyword.inc.php
│  │  log.inc.php
│  │  login.inc.php
│  │  logout.inc.php
│  │  md5.inc.php
│  │  menu.inc.php
│  │  module.inc.php
│  │  mymenu.inc.php
│  │  property.inc.php
│  │  question.inc.php
│  │  repeat.inc.php
│  │  scan.inc.php
│  │  search.inc.php
│  │  setting.inc.php
│  │  skin.inc.php
│  │  split.inc.php
│  │  tag.inc.php
│  │  template.inc.php
│  │  type.inc.php
│  │  unzip.class.php
│  │  update.inc.php
│  │  upload.inc.php
│  │  word.inc.php
│  │
│  ├─template       后台模版
│  │      404.tpl.php
│  │      admin.tpl.php
│  │      admin_add.tpl.php
│  │      admin_edit.tpl.php
│  │      admin_right.tpl.php
│  │      area.tpl.php
│  │      area_add.tpl.php
│  │      banip.tpl.php
│  │      banip_ban.tpl.php
│  │      banword.tpl.php
│  │      category.tpl.php
│  │      category_add.tpl.php
│  │      category_copy.tpl.php
│  │      category_edit.tpl.php
│  │      city.tpl.php
│  │      city_edit.tpl.php
│  │      count.tpl.php
│  │      data.tpl.php
│  │      database.tpl.php
│  │      database_comment.tpl.php
│  │      database_execute.tpl.php
│  │      database_import.tpl.php
│  │      database_move.tpl.php
│  │      database_open.tpl.php
│  │      database_process.tpl.php
│  │      database_replace.tpl.php
│  │      data_config.tpl.php
│  │      data_view.tpl.php
│  │      dialog.tpl.php
│  │      doctor.tpl.php
│  │      fetch.tpl.php
│  │      fetch_edit.tpl.php
│  │      fields.tpl.php
│  │      fields_add.tpl.php
│  │      fields_edit.tpl.php
│  │      footer.tpl.php
│  │      header.tpl.php
│  │      index.html
│  │      index.tpl.php
│  │      ip.tpl.php
│  │      keylink.tpl.php
│  │      keyword.tpl.php
│  │      left.tpl.php
│  │      log.tpl.php
│  │      login.tpl.php
│  │      main.tpl.php
│  │      md5.tpl.php
│  │      md5_add.tpl.php
│  │      menu.tpl.php
│  │      module.tpl.php
│  │      module_add.tpl.php
│  │      module_edit.tpl.php
│  │      msg.tpl.php
│  │      mymenu.tpl.php
│  │      password.tpl.php
│  │      product.tpl.php
│  │      property.tpl.php
│  │      property_edit.tpl.php
│  │      question.tpl.php
│  │      repeat.tpl.php
│  │      scan.tpl.php
│  │      search.tpl.php
│  │      setting.tpl.php
│  │      side.tpl.php
│  │      skin.tpl.php
│  │      skin_add.tpl.php
│  │      skin_edit.tpl.php
│  │      tag.tpl.php
│  │      tag_dict.tpl.php
│  │      tag_preview.tpl.php
│  │      template.tpl.php
│  │      template_add.tpl.php
│  │      template_edit.tpl.php
│  │      type.tpl.php
│  │      upload.tpl.php
│  │      upload_part.tpl.php
│  │      word.tpl.php
│  │
│  └─image     后台风格
│          add.gif
│          ......
│          view.png
│
├─ad           广告管理
│      index.php
│
└─about        生成单页的文件夹[$moduleid = 3]

```

