---
description: 'PhpStorm 除了能直接打开 localhost 相关文件之外，还可以连接 FTP 服务。它除了能完成正常的数据传输任务，还支持本地文件与服务端文件的差异对比，以及同一文件按目录自动匹配后执行上传、下载操作。这些功能在常规 IDE 和 FTP 软件中较为少见，而这类操作恰好是日常工作中非常耗费时间的环节。换句话说，在 WebStorm/PhpStorm 中操作 FTP，能让人找到使用版本控制工具时的熟悉体验。该功能唯一的缺点是：启动上传、下载的连接过程需要消耗少量时间，因此更适合单文件编辑的场景。不过，若网络速度足够快，这一问题通常可以忽略；且根据个人使用体验，尽管连接速度稍慢，文'
lastUpdated: '2026-03-04 16:23:00'
head: 
  - - meta
    - name: 'og:title'
      content: '🪽如何使用 Phpstorm 中的部署功能'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PhpStorm 除了能直接打开 localhost 相关文件之外，还可以连接 FTP 服务。它除了能完成正常的数据传输任务，还支持本地文件与服务端文件的差异对比，以及同一文件按目录自动匹配后执行上传、下载操作。这些功能在常规 IDE 和 FTP 软件中较为少见，而这类操作恰好是日常工作中非常耗费时间的环节。换句话说，在 WebStorm/PhpStorm 中操作 FTP，能让人找到使用版本控制工具时的熟悉体验。该功能唯一的缺点是：启动上传、下载的连接过程需要消耗少量时间，因此更适合单文件编辑的场景。不过，若网络速度足够快，这一问题通常可以忽略；且根据个人使用体验，尽管连接速度稍慢，文'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/ide/phpstorm-use-deployment.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/61/615722375475b4d1262165d9ad8700de.jpg?x-oss-process=image/resize,m_mfit,w_400'
---
# 🪽如何使用 Phpstorm 中的部署功能



`PhpStorm`  除了能直接打开  `localhost`  相关文件之外，还可以连接 FTP 服务。它除了能完成正常的数据传输任务，还支持本地文件与服务端文件的差异对比，以及同一文件按目录自动匹配后执行上传、下载操作。这些功能在常规 IDE 和 FTP 软件中较为少见，而这类操作恰好是日常工作中非常耗费时间的环节。

换句话说，在  `WebStorm` / `PhpStorm`  中操作 FTP，能让人找到使用版本控制工具时的熟悉体验。该功能唯一的缺点是：启动上传、下载的连接过程需要消耗少量时间，因此更适合单文件编辑的场景。不过，若网络速度足够快，这一问题通常可以忽略；且根据个人使用体验，尽管连接速度稍慢，文件传输速度却并不逊色。

1. 设置： 设置的入口有两处，

-  `Tools->Deployment->configruation` 

![](https://file.wulicode.com/notion/61/615722375475b4d1262165d9ad8700de.jpg)

b. `File->Settings->Deployment->configruation`

![](https://file.wulicode.com/notion/87/8722f3c26ab67dd5126ab6ebfd346ab1.jpg)

单击左上角加号新增一个FTP服务连接 然后配置FTP host,username,pwd等信息，配置好之后，可以Test FTP connection测试FTP是否连接成功。 然后点击Root path三点，如果有FTP服务端的目录读取出来，那就没问题，如果读取不出来，则在下面的Advanced options中选择Passive mode(被动模式)。 然后在Web server root URL中填写域名信息或者空间商提供的免费三级域名。 然后在Mappings 选择映射目录分别为本地，发布或web路径。

![](https://file.wulicode.com/notion/d8/d8b95f72f1a1f4c731c7e3526ae969ab.jpg)

![](https://file.wulicode.com/notion/bf/bf9a3bcaaba4847d7b4da6e9c7c7e633.jpg)

2. 部署：

在与ftp连接的项目文件右击就能发现deployment，分别有四个选项(这个选项只有在连接成功后才能显示)：

![](https://file.wulicode.com/notion/e0/e003aabc7b49238197ddefd07b8e302e.jpg)

```
upload to ...                         -> 上传到服务端
Download from ...                     -> 从服务器下载
Compare with Deployed Version on ...  -> 与服务端 [XX] 版本进行比较
```

![](https://file.wulicode.com/notion/ce/ce1ae42a9ac1bfd9fc863b0141d0b676.jpg)

-  `Sync with Deployed to ...` 

比较之外还可以直接进行操作.（3,4的差别在于，3只能浏览不能操作，4可以操作）。

![](https://file.wulicode.com/notion/ce/ce557994d1d13cbe45600dd6d7fd9f8f.jpg)

3. 显示扩展面板  `Tools->Deployment->configruation->Browse Remote host`

![](https://file.wulicode.com/notion/80/80d2598cd20db7fbf44f75dc6558d7d0.jpg)

成功打开之后：

![](https://file.wulicode.com/notion/16/16b288c650281324e2113b1c727d030a.jpg)

打开的目的在于对文件的方便编辑，可以这样操作：

![](https://file.wulicode.com/notion/03/03826d70d8c0db0c5726a6b09ca6e23d.jpg)

4. 快捷操作

a. 可以在keymap中添加相应的快捷键操作。

- 可以在toolbar上添加常用的图标以方便操作，为了防止误操作，建议操作的图标之间最好有隔离图标，虽然误操作可以利用本地历史记录找回来，但工作效率可能有所下降。

另外提供除了版本控制之外的一份本地历史记录，多次挽救我于生死边缘：

```
右键 -> localhost history -> show history
```

Pub label是对当前历史记录的一个名称记录

![](https://file.wulicode.com/notion/ed/ed56a3db7119430c8404fb9fcaab6c0d.gif)

::: warning  <img src="https://file.wulicode.com/notion/f4/f40474006bf9e2eb6f8c3dc02b97378f.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  参考资料

  - 🚰 [如何在Webstorm/Phpstorm中设置连接FTP，并快速进行文件比较，上传下载，同步等操作](https://www.cnblogs.com/jikey/p/3486621.html)
:::



