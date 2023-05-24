---
title: "centos 7 service 服务"
date: 2021-06-26 10:30:16
toc: true
categories:
- ["Ops","CentOS"]
---

以754的权限保存在目录


放置位置: /usr/lib/systemd/system

/usr/bin/php /webdata/www/t.dailian/artisan workerman start --d


以下测试不成功




```
[Unit]
Description=wk-1dailian - 1dailian workerman

[Service]
Type=forking
ExecStart=/usr/bin/php /webdata/www/t.dailian/artisan workerman start --d
ExecReload=/usr/bin/php /webdata/www/t.dailian/artisan workerman reload
ExecStop=/usr/bin/php /webdata/www/t.dailian/artisan workerman stop

[Install]
WantedBy=multi-user.target
```

