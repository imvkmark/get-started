---
description: 'Upsource 作为一个代码审查工具, 有很多有益的特性.下载下载并解压到指定的文件夹目录树可用命令命令的位置详细文档查看这里我们运行根据在命令行显示的信息, 我们打开这个地址 http://macbook-pro.local:8080?wizard_token=UwxfxNH1OxGS75l3DO9p, 如果在服务器上这里我们点击 Set Up 来进行安装这里来配置访问的地址, 如果是外网, 这里的地址应该是域名, 局域网替换成 IP, 如果是本地则可以替换成 localhost, 这里我替换为 localhost创建账号密码生成授权文件'
lastUpdated: '2025-12-06 10:56:00'
head: 
  - - meta
    - name: 'og:title'
      content: '使用 Upsource 实现代码审查-CodeReview'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Upsource 作为一个代码审查工具, 有很多有益的特性.下载下载并解压到指定的文件夹目录树可用命令命令的位置详细文档查看这里我们运行根据在命令行显示的信息, 我们打开这个地址 http://macbook-pro.local:8080?wizard_token=UwxfxNH1OxGS75l3DO9p, 如果在服务器上这里我们点击 Set Up 来进行安装这里来配置访问的地址, 如果是外网, 这里的地址应该是域名, 局域网替换成 IP, 如果是本地则可以替换成 localhost, 这里我替换为 localhost创建账号密码生成授权文件'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/ide/use-upsource-to-codereview.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/cc/cc8a68c0d714021b4b48d4b3305366b8.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 使用 Upsource 实现代码审查-CodeReview



::: danger  <img src="https://file.wulicode.com/notion/73/73587d3b044dd65bcaa6e2686af6e0fc.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  
Upsource is no longer available as a commercial product as of February 1, 2022.

:::

![](https://file.wulicode.com/notion/cc/cc8a68c0d714021b4b48d4b3305366b8.png)

## 安装

### Upsource 是什么

Upsource 作为一个代码审查工具, 有很多有益的特性.

- 执行高效的代码审查
- 从 IDE 审阅
- 通过浏览器跟踪重要的变化
- 发现设计缺陷, 找出项目中需要开发人员注意的部分
- 检测项目范围的风险, 分散责任
- 快速面板, 便于新成员了解项目并了解其他人的职责范围
- @回应, 讨论变化, 帮助队友
- 可与持续交付/问题跟踪/github 同步
- 不用担心团队成员人数, 团队项目, 不限量~

### 下载

[下载](https://www.jetbrains.com/upsource/)

### 安装

下载并解压到指定的文件夹

**目录树**

```
├── api
├── apps
├── backups      # 备份目录
├── bin          # 应用目录
├── conf         # 配置文件
├── data
├── internal
├── launcher
├── lib
├── logs         # 日志
├── sonarqube
└── temp         # 临时文件
```

**可用命令**

命令的位置

```
$ ./bin/upsource.sh

# 调用 help <command> 来查看详细
```

```
configure      : 配置 Upsource
start          : 后台启动
run            : 在当前命令行运行
status         : 查看运行状态
stop           : 停止
restart        : 重启
rerun          : 当前命令行重新运行
dump           : 输出 debug info
kill           : 杀死 upsource 进程
java           : 管理java的路径
help <command> : 显示帮助信息

help <command name>
prints usage text for the specified command
```

详细文档[查看](https://www.jetbrains.com/help/upsource/getting-started.html)

这里我们运行

```
$ ./bin/upsource.sh start
Starting Upsource...
* Configuring JetBrains Upsource 2018.1
* Made default base-url 'http://macbook-pro-2.local:8080/' from hostname 'macbook-pro-2.local' and listen port '8080'
* JetBrains Upsource 2018.1 runtime environment is successfully configured
* Loading logging configuration from /Users/duoli/Downloads/upsource-2018.1.357/lib/ext/log4j.xml
* Redirecting JetBrains Upsource 2018.1 logging to /Users/duoli/Downloads/upsource-2018.1.357/logs/internal/services/bundleProcess
* Configuring Service-Container[bundleProcess]
* Configuring Bundle Backend Service
* Configuring Configuration Wizard
* Starting Service-Container[bundleProcess]
* Starting Bundle Backend Service
* Starting Configuration Wizard
* JetBrains Upsource 2018.1 Configuration Wizard will be available on [http://macbook-pro.local:8080?wizard_token=UwxfxNH1OxGS75l3DO9p] after start
Upsource is running
```

### 配置项目

根据在命令行显示的信息, 我们打开这个地址 http://macbook-pro.local:8080?wizard_token=UwxfxNH1OxGS75l3DO9p, 如果在服务器上

![](https://file.wulicode.com/notion/b7/b7db1c8ec288599aca09337595484609.png)

这里我们点击 Set Up 来进行安装

![](https://file.wulicode.com/notion/c5/c5c27d267ec4d7d8d52846949051eb51.png)

这里来配置访问的地址, 如果是外网, 这里的地址应该是域名, 局域网替换成 IP, 如果是本地则可以替换成 localhost, 这里我替换为 localhost

**创建账号密码**

![](https://file.wulicode.com/notion/a1/a1b9e1a12a89d92542a88b417f18e99f.png)

**生成授权文件**

![](https://file.wulicode.com/notion/a1/a1845cda1bacef9ded0f835b8ea40c9c.png)

**进行安装**

![](https://file.wulicode.com/notion/79/79c30f38af7957d0205ce37117b8004a.png)

开始启动, 启动完成就可以登录了

![](https://file.wulicode.com/notion/47/47d07960428f848b177b7ac815bb2b3d.png)

## 在 phpstorm/jetbrains 系列中集成

这里我只是在 phpstorm 中进行测试的, 但是是支持全系的, 只不过对代码部分的支持可能不太完善

### 配置代码审查项目

这里以 git 作为版本控制

**配置基础信息**

![](https://file.wulicode.com/notion/c6/c60a559d1450f80dc12a977d6a05943c.png)

配置代码集成

![](https://file.wulicode.com/notion/62/624f7f5dc743d2df72b55e91f8606e99.png)

其他两项的配置根据自己的喜好来进行, 这里不进行详细描述. 这样我们保存之后他就可以进行对项目初始化.

初始化完成后可以在项目中进行集成了.

### 安装 upsource plugin

Settings -> 搜索 Plugin -> Browse repositories -> 搜索 upsource 安装并重启

![](https://file.wulicode.com/notion/f4/f46f25ea4a96475213d33d357cffc79c.png)

### 关联项目

重启之后在设置中搜索 UpSource , 在 Connection 菜单中填写 Server Url 为安装完成访问的根目录. 点击 Test Connection 来进行填写账号密码授权, 授权成功后我们便可以在项目中使用了

设置完成后在右下角有个标识代表已经启动了 Upsource 服务

![](https://file.wulicode.com/notion/66/66d41ac97f76f2171c20113129213bca.png)

在这里我们可以关联项目, 切换项目, 映射路径, 配置通知, 更改用户等信息

![](https://file.wulicode.com/notion/97/976e2a76838e3c4c87718a3cedce6a3f.png)

这样我们就可以在 IDE 中进行代码的 review 和标识了. 这里的标识和 upsource 系统中的显示的数据是实时同步的. 并且支持 @ 某个人.

### 使用和查看

这里的这里的快捷键是 ctrl + alt + /, 我们选中指定的行, 填写 review 代码

![](https://file.wulicode.com/notion/f4/f4e1500f073316a74fc519b3f4cee5dc.png)

填写之后就会在 IDE 行号旁边和编辑区 右上角 显示评论图标, 点击即可显示需要修改的内容, 并高亮指定的区域

![](https://file.wulicode.com/notion/48/481a5b549aa7dbd4c52617a5bf2a1408.png)

同样在平台上也会存在这一项目

![](https://file.wulicode.com/notion/db/dbbfcc37f1b350a3587f75dc63be047f.png)

这里有几个技巧

支持 @ 来指定人

![](https://file.wulicode.com/notion/c3/c3f720ce39ce718954fe620b01dd53c6.png)

支持标签标注

![](https://file.wulicode.com/notion/97/970b47257c6ef10414c1b2dcb1046816.png)

好了, 团队中开始试用..

## 其他

### 错误 : 无法将数据保存到数据库

Updating project : An error occurred during flushing data to database upsource这里内存必须在 8G 以上, 否则会报上面的错误.

### 错误 : 用户没有看到这个项目

一般来讲就是没有把这个用户添加到所属项目中.

### 更换 Upsource 的地址

正确方式

```html
./bin/upsource.sh stop./bin/upsource.sh configure --base-url=http://(server-name).com:(port) --listen-port=(port)./bin/upsource.sh start# Head to http://(server-name).com:(port)
```

### 参考文章

- [如何使代码审查更高效](http://www.infoq.com/cn/articles/effective-code-reviews)

### 特性 : 支持自定义标签

这些标签可以同步到 IDE 中.

![](https://file.wulicode.com/notion/bd/bd8835bd8f767714f624377f5b55a322.png)

### 特性 : 多用户账户可以归到一个用户下进行管理

比如一个用户有多个 git global 标识, 可能是不同时期的用户的昵称, 这里可以识别为一个账户, 更方便进行管理

![](https://file.wulicode.com/notion/c4/c414fe76ec3dc3ee38accd75253d59ae.png)

