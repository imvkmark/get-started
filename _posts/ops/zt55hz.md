---
title: "运维相关的记录"
date: 2021-09-01 16:22:02
toc: true
categories:
- ["Ops","运维 \/ Op"]
---

## PhpMyAdmin

_config.inc.php _一定要填写 blowfish_secret



```php
<?php
$cfg['blowfish_secret'] = 'xxx'; /* YOU MUST FILL IN THIS FOR COOKIE AUTH! */
```

