---
description: '使用phpmyredis连接Redis 7.x时出现错误：Redis处于保护模式，未设置默认用户密码，仅允许回环接口连接。解决方案包括禁用保护模式、设置密码或配置绑定地址。'
lastUpdated: '2026-06-20 11:52:34'
head:
  - - meta
    - name: 'og:title'
      content: 'Redis - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用phpmyredis连接Redis 7.x时出现错误：Redis处于保护模式，未设置默认用户密码，仅允许回环接口连接。解决方案包括禁用保护模式、设置密码或配置绑定地址。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/extend-reading/faq.html'
---
# Redis - FAQ

## Redis 取消保护模式

在使用 phpmyredis 连接 7.x 版本的 redis 的时候出现的错误

> PHP Fatal error: Uncaught Predis\Response\ServerException: DENIED Redis is running in protected mode because protected mode is enabled and no password is set for the default user.  
> In this mode connections are only accepted from the loopback interface.  
> If you want to connect from external computers to Redis you may adopt one of the following solutions:

1. Just disable protected mode sending the command 'CONFIG SET protected-mode no' from the loopback interface by connecting to Redis from the same host the server is running, however MAKE SURE Redis is not publicly accessible from internet if you do so. Use CONFIG REWRITE to make this change permanent.
2. Alternatively you can just disable the protected mode by editing the Redis configuration file, and setting the protected mode option to 'no', and then restarting the server.
3. If you started the server manually just for testing, restart it with the '--protected-mode no' option.
4. Setup a an authentication password for the default use

这里给出了 4 种解决方案

1. 通过输入命令 `CONFIG SET protected-mode no` 禁用保护模式
2. 修改 redis 配置, 然后重新启动服务器
3. 在测试模式下通过传入 `--protected-mode no` 选项禁用保护模式
4. 给默认使用的时候设置密码