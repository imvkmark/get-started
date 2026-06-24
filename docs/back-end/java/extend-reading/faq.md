---
description: 'IDE问题：Ctrl+左键无法进入代码（Cannot find declaration），对比PHP异同及Debug配置。Gradle同步报错Could not get resource，涉及HTTP代理与Socket5方法。'
lastUpdated: '2026-06-21 20:43:23'
head:
  - - meta
    - name: 'og:title'
      content: 'Java - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'IDE问题：Ctrl+左键无法进入代码（Cannot find declaration），对比PHP异同及Debug配置。Gradle同步报错Could not get resource，涉及HTTP代理与Socket5方法。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/extend-reading/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/70c22b86ffd28d3f2e58c1e5984ca4f4.png'
---
# Java - FAQ

## IDE

### idea Cannot find declaration to go to ，ctrl+左键无法进入代码

打开 `File | Project Structure`

![](https://file.wulicode.com/feishu-images/70c22b86ffd28d3f2e58c1e5984ca4f4.png)

打开 `Modules | java`, 选中 `src`(代码目录), 右键设置为 `Sources`(源代码) 即可

![](https://file.wulicode.com/feishu-images/b2b50c60b3d816ef5e4af58b9380cca9.png)

### 对比

### 和 PHP 异同

- 建议每个自定义类都添加一个 toString 方法

### 配置 Debug 模式

IDEA Debug 模式设置的一次性配置（Settings）  

| 路径 | 选项 | 作用 |
|-|-|-|
| Build → Compiler |  ✅ Build project automatically | 保存文件自动编译 |
| Advanced Settings  | ✅ Allow auto-make to start even if developed  application is running  | 运行中也能触发编译 |

启动方式： 点击 🐛(Debug) 图标（而非 ▶️ ），或 Shift+F9 

| 改动类型 | 操作  | 效果 |
|-|-|-|
|  方法体内改逻辑   （if 判断、返回值等） | Ctrl+Shift+F9  <br/> (Recompile 当前文件) |  HotSwap，< 1秒，无重启 |
| 新增方法 / 改字段 / 新 Bean  | 保存文件即触发  <br/>（自动编译 → devtools 检测）    | devtools 快速重启，\~2秒 |
| 改 application.yml  | 保存即触发   | devtools 快速重启，\~2秒          |
| 新增类 / 改继承关系 | 同上  | devtools 快速重启，\~2秒  |

  断点调试（Debug 模式独有）                                

```Plain Text
  F9   → 继续运行到下一个断点
  F8   → 单步执行（不进入方法）
  F7   → 单步进入方法
  F8   → 跳出当前方法（Shift+F8）                                                                       

  断点右键 → Condition   设置条件断点（只在特定条件下暂停）
  断点右键 → Log message 不暂停，只打印日志（非侵入式观察）    
```

  一句话记忆                                                                                            

> Debug 模式 = 断点 + HotSwap + devtools 三合一，Run 模式只有 devtools。日常开发直接用 Debug 启动即可，没有性能损耗需要担心。                   

## Gradle

### Gradle Sync 时候出现 Could not get resource

需要查看代理的方式

**1. 使用代理**

**1. gradle 文件夹**

```Plaintext
$ vim ~/.gradle/gradle.properties
```

**2. 项目中的 gradle.properties**

```Plaintext
$ vim /path/to/project/gradle.properties
```

把这几个值根据相应的要求进行处理

```Plaintext
# 这个是 http 代理
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1086
systemProp.https.nonProxyHosts=192.168.*
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1086
# 这个是 socket5 方法
org.gradle.jvmargs=-DsocksProxyHost=127.0.0.1 -DsocksProxyPort=1087
```

**2.下载大小和存储位置**

在gradle-wrapper.properties中查看gradle下载地址和版本

去查看所有分发的gradle版本地址: https://services.gradle.org/distributions

在这里可以查看到最新的gradle版本，点击可下载.

存储位置:

如果这里文件内容有变化, 便是在下载的. 不要心焦, 慢慢等待

```Plaintext
$ ~/.gradle/wrapper/dists/gradle-5.1.1-all/97z1ksx6lirer3kbvdnh7jtjg/
```

**耐心等待**

等待构建

![](https://file.wulicode.com/feishu-images/ae24b8cbcdd35c2275c518c64f818953.png)