# FAQ

## IMAP, SMTP 配置信息

> 126, aliyun, 腾讯云 等常见 pop, smtp 配置

```
服务器名称 : 服务器地址      ssl协议端口号   非ssl协议端口号
# 126 邮箱
IMAP     : imap.126.com   993(ssl)      143
SMTP     : smtp.126.com   465/994(ssl)  25
POP3     : pop.126.com    995(ssl)      110 
# qq邮箱
SMTP     : smtp.qq.com    465/587(ssl)  25
POP3     : pop.qq.com     995(ssl)      110
# aliyun SMTP 服务地址
# https://help.aliyun.com/document_detail/29449.html
SMTP（华东1） : smtpdm.aliyun.com                 465(ssl)  80
SMTP（新加坡）: smtpdm-ap-southeast-1.aliyun.com  465(ssl)  80
SMTP（悉尼）  : smtpdm.aliyun.com                 465(ssl)  80
# 腾讯企业邮箱
POP3/SMTP协议
接收邮件服务器：pop.exmail.qq.com ，使用SSL，端口号995
发送邮件服务器：smtp.exmail.qq.com ，使用SSL，端口号465
海外用户可使用以下服务器
接收邮件服务器：hwpop.exmail.qq.com ，使用SSL，端口号995
发送邮件服务器：hwsmtp.exmail.qq.com ，使用SSL，端口号465
 
IMAP协议
接收邮件服务器：imap.exmail.qq.com  ，使用SSL，端口号993
发送邮件服务器：smtp.exmail.qq.com ，使用SSL，端口号465
海外用户可使用以下服务器
接收邮件服务器：hwimap.exmail.qq.com ，使用SSL，端口号993
发送邮件服务器：hwsmtp.exmail.qq.com ，使用SSL，端口号465
```