---
description: 'plist 是 Apple 公司使用的一种文件格式，全称为 Property List，主要用于在 macOS 和 iOS 系统中存储结构化数据。可以用于应用程序的配置文件, 也用来设置启动项目或者定时任务, 设置为定时任务的时候可以设置最小间隔为 1 秒.存放路径有:plist 介绍 : https://zh.wikipedia.org/wiki/%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8示例配置参数说明launchctl 用于管理 macOS 的启动服务和后台任务launchctl start 启动一个指定的任务(label'
lastUpdated: '2026-02-28 00:57:00'
head: 
  - - meta
    - name: 'og:title'
      content: '🪽Mac 执行计划任务 / plist 介绍和使用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'plist 是 Apple 公司使用的一种文件格式，全称为 Property List，主要用于在 macOS 和 iOS 系统中存储结构化数据。可以用于应用程序的配置文件, 也用来设置启动项目或者定时任务, 设置为定时任务的时候可以设置最小间隔为 1 秒.存放路径有:plist 介绍 : https://zh.wikipedia.org/wiki/%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8示例配置参数说明launchctl 用于管理 macOS 的启动服务和后台任务launchctl start 启动一个指定的任务(label'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/os/mac/crontab-plist.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/56/56cb0ad1ca6b75de1ba8d36e8ee51a60.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 🪽Mac 执行计划任务 / plist 介绍和使用



`plist`  是 Apple 公司使用的一种文件格式，全称为  **Property List** ，主要用于在 macOS 和 iOS 系统中存储结构化数据。

可以用于应用程序的配置文件, 也用来设置启动项目或者定时任务, 设置为定时任务的时候可以设置最小间隔为 1 秒.

## 设置启动项目

### 启动项位置

存放路径有:

-  `~/Library/LaunchAgents` 
-  `/Library/LaunchAgents` 
-  `/Library/LaunchDaemons` 
-  `/System/Library/LaunchAgents` 
-  `/System/Library/LaunchDaemons` 

### 启动项配置

plist 介绍 : [https://zh.wikipedia.org/wiki/%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8](https://zh.wikipedia.org/wiki/%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8)

示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" 
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>EnvironmentVariables</key>
    <dict>
      <key>PATH</key>
      <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:</string>
    </dict>
    <key>Label</key><!--服务命名-->
    <string>com.jenkins-service</string>
    <key>Program</key><!--启动脚本绝对路径-->
    <string>/Users/admin/jenkins_ws/start-slave.sh</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <dict>
	    <key>SuccessfulExit</key>
	    <false/>
      <key>NetworkState</key>  
		  <true/>
    </dict>
    <key>ThrottleInterval</key>
    <integer>10</integer>
    <key>LaunchOnlyOnce</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/startup.stdout</string>
    <key>StandardErrorPath</key>
    <string>/tmp/startup.stderr</string>
    <key>UserName</key>
    <string>admin</string>
  </dict>
</plist>
```

配置参数说明

-  `KeepAlive`  
-  `Label`  
-  `Program`  
-  `ProgramArguments`  
-  `WorkingDirectory`  
-  `RunAtLoad`  
-  `UserName`  
-  `LaunchOnlyOnce` 
-  `ThrottleInterval`  
-   `StartInterval` 
-   `StartCalendarInterval` 

### launchctl 

launchctl 用于管理 macOS 的启动服务和后台任务

`launchctl start <label>`

启动一个指定的任务(label), 此命令不会修改任务的配置，仅在当前会话中有效, 如果任务未注册或未加载，需先通过 load 命令加载。

`launchctl stop <label>`

停止一个指定的任务, 如果任务被配置为自动重启（例如通过 KeepAlive），停止后可能会立即重启。不会卸载任务，任务依然会在下次启动时运行。

`launchctl remove <label>`

从 launchd 中永久移除指定任务（异步操作）。移除操作不会等待任务实际停止，因此没有错误处理。如果任务需要重新加载，需使用 load 命令。

`launchctl load <path>`

加载并启动指定的任务（基于 plist 文件）。手动加载任务，使其立即运行。如果任务被标记为  `disabled` ，则不会启动。不会修改任务的禁用状态

`launchctl unload <path>`

停止并卸载指定任务。手动停止任务，同时卸载配置。卸载后任务依然会在下次系统登录或重启时自动加载

`launchctl load -w <path>`

`-w`  参数加载并启动任务，同时将任务标记为  `不禁用`  , 确保任务在下次登录或系统重启时自动启动。将修改任务的禁用状态（即使 plist 被标记为禁用，也会被强制启用）

`launchctl unload -w <path>`

停止、卸载并禁用任务。完全关闭一个任务，并确保其不会在系统重新启动时再次运行。会将任务标记为禁用状态，需手动使用 load -w 再次启用

`-w`  参数标记该服务为  `disabled` ，不加该参数则重启仍然会启动

`launchctl list`

用来查看具体任务状态

如果任务未按预期运行, 可以通过日志查看错误

```shell
log show --predicate 'eventMessage contains "<label>"'
```

### 取消应用程序的自动加载

Mac 应用程序的启动项位置在  `/Library/LaunchAgents/`  文件夹下 我们可以看到一些默认的启动项目, 这个目录下的项目都是系统级别的, 我们不能够在用户的登陆窗体中启用或者禁用, 只能够通过命令来启用或者禁用

```
$ cd /Library/LaunchAgents/
$ ls
com.Logitech.Control Center.Daemon.plist
com.adobe.AAM.Updater-1.0.plist
com.adobe.AdobeCreativeCloud.plist
com.google.keystone.agent.plist
com.logitech.manager.daemon.plist
com.oracle.java.Java-Updater.plist
com.oray.sunlogin.agent.plist
com.oray.sunlogin.startup.plist
com.sogou.SogouServices.plist
com.teamviewer.teamviewer.plist
com.teamviewer.teamviewer_desktop.plist
homebrew.mxcl.supervisor.plist
```

我们使用以下的命令来启用或者禁用

```shell
# 禁用
launchctl unload -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist

# 启用
launchctl load -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist

# 启动
launchctl start ~/Library/LaunchAgents/com.duoli.sshadd.plist
```

## plist 编辑工具

使用 编辑器进行编辑

plist 文件本质上是 xml 文件, 可以使用文本编辑器进行编辑

使用  `plutil`  命令行工具

`plutil`  工具提供了很多的命令来管理 plist 文件, 也提供了工具来校验 plist 的文件格式

```shell
plutil ~/Library/LaunchAgents/com.duoli.sshadd.plist
/Users/duoli/Library/LaunchAgents/com.duoli.sshadd.plist: OK
```

使用 xcode 的可视化界面

![](https://file.wulicode.com/notion/56/56cb0ad1ca6b75de1ba8d36e8ee51a60.png)



## 参考文章

- [https://www.cnblogs.com/jinjiangongzuoshi/p/5373711.html](https://www.cnblogs.com/jinjiangongzuoshi/p/5373711.html)
- [https://bluepen.lazyalex.com/mac/startup/#%E5%87%86%E5%A4%87%E8%84%9A%E6%9C%AC](https://bluepen.lazyalex.com/mac/startup/#%E5%87%86%E5%A4%87%E8%84%9A%E6%9C%AC)
- [https://sre.im/mac-onlogin/](https://sre.im/mac-onlogin/)



