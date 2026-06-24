---
description: 'logtail用于采集nginx日志，流程包括下载、安装、升级、启动、重启、停止、卸载等步骤，涉及开发目录与配置目录，支持跨账号调用和对外服务。'
lastUpdated: '2026-06-18 08:18:12'
head:
  - - meta
    - name: 'og:title'
      content: 'logtail 安装并且采集 nginx 日志'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'logtail用于采集nginx日志，流程包括下载、安装、升级、启动、重启、停止、卸载等步骤，涉及开发目录与配置目录，支持跨账号调用和对外服务。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/logtail.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/2b449483a2a465f91c27573f9f306d4d.png'
---
# logtail 安装并且采集 nginx 日志

文档地址: [Logtail简介](https://help.aliyun.com/zh/sls/user-guide/use-logtail-to-collect-data)

### 日志采集流程

![](https://file.wulicode.com/feishu-images/2b449483a2a465f91c27573f9f306d4d.png)

### 安装 logtail

详细操作 : [安装方式](https://help.aliyun.com/document_detail/28982.html)内网安装:

```Bash
# 下载
wget http://logtail-release-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com/linux64/logtail.sh -O logtail.sh && chmod 755 logtail.sh

# 安装
./logtail.sh install auto

# 升级
./logtail.sh upgrade

# 启动
/etc/init.d/ilogtaild start

# 重启
/etc/init.d/ilogtaild restart

# 停止
/etc/init.d/ilogtaild stop

# 卸载
./logtail.sh uninstall
```

相关目录

```Plaintext
# 开发目录
/usr/local/ilogtail/

# 配置目录
/etc/ilogtail/
```

### 跨账号调用

![](https://file.wulicode.com/feishu-images/fa9707b65765c58185f3a5c69900e687.png)

如果需要通过 Logtail 采集日志的服务器并非阿里云ECS，或非本账号购买的ECS时，需要在服务器上安装Logtail之后，配置主账号AliUid作为用户标识，证明这台服务器有权限被该账号访问、采集日志。否则在机器组中会显示服务器心跳失败，无法采集数据到日志服务

**查看阿里云主账号ID**

登录日志服务控制台。单击页面右上角的控制台图标，进入CloudShell（详细内容参考云命令行）。在页面下方的命令框中输入`echo $ALIBABA_CLOUD_ACCOUNT_ID`获取主账号ID, 查看主账号ID

![](https://file.wulicode.com/feishu-images/b044cbc7312ff37b5bd6291eba81ca87.png)

或者是查看主账号右上角头像下方的账号 ID 来获取

**创建主账号ID**

创建主账号ID同名文件到 `/etc/ilogtail/users` 目录，如目录不存在请手动创建目录。一台服务器上可以配置多个主账号ID，例如：

```Plaintext
touch /etc/ilogtail/users/1**************
touch /etc/ilogtail/users/1**************
```

当不需要Logtail收集数据到该用户的日志服务Project后，可使用如下命令删除该用户标识：

```Plaintext
rm /etc/ilogtail/users/1**************
```

## 对外服务

对于 aliyun 机器如果涉及到对外访问, 需要外网地址, 这里需要设置启动参数