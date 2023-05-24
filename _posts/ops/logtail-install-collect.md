---
title: "logtail 安装并且采集 nginx 日志"
date: 2020-04-17 10:08:51
toc: true
categories:
- ["Ops","Nginx","入门"]
---

文档地址: [Logtail简介](https://help.aliyun.com/document_detail/28979.html)




### 日志采集流程
![image.png](https://file.wulicode.com/yuque/202208/04/14/5034VDV0Sxfs.png)

### 安装 logtail
详细操作 : [安装方式](https://help.aliyun.com/document_detail/28982.html)

内网安装:
```bash
# 下载
$ wget http://logtail-release-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com/linux64/logtail.sh -O logtail.sh; chmod 755 logtail.sh
# 安装
$ ./logtail.sh install auto
# 升级
$ ./logtail.sh upgrade
# 启动
$ /etc/init.d/ilogtaild start
# 重启
$ /etc/init.d/ilogtaild restart
# 停止
$ /etc/init.d/ilogtaild stop
# 卸载
$ ./logtail.sh uninstall
```
相关目录
```
# 开发目录
/usr/local/ilogtail/

# 配置目录
/etc/ilogtail/
```

### 跨账号调用
![image.png](https://file.wulicode.com/yuque/202208/04/14/5034VLJY889n.png)

如果需要通过Logtail采集日志的服务器并非阿里云ECS，或非本账号购买的ECS时，需要在服务器上安装Logtail之后，配置主账号AliUid作为用户标识，证明这台服务器有权限被该账号访问、采集日志。否则在机器组中会显示服务器心跳失败，无法采集数据到日志服务。

**查看阿里云主账号ID。**

登录日志服务控制台。单击页面右上角的控制台图标，进入CloudShell（详细内容参考云命令行）。在页面下方的命令框中输入`echo $ALIBABA_CLOUD_ACCOUNT_ID`获取主账号ID。

查看主账号ID

![](https://file.wulicode.com/yuque/202208/04/14/50355x4KpLNt.jpg)

**创建主账号ID**

创建主账号ID同名文件到/etc/ilogtail/users目录，如目录不存在请手动创建目录。一台服务器上可以配置多个主账号ID，例如：

```
touch /etc/ilogtail/users/1**************
touch /etc/ilogtail/users/1**************
```

当不需要Logtail收集数据到该用户的日志服务Project后，可使用如下命令删除该用户标识：

```
rm /etc/ilogtail/users/1**************
```

## 对外服务
对于 aliyun 机器如果涉及到对外访问, 需要外网地址, 这里需要设置启动参数

