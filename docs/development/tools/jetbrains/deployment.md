---
description: '在JetBrains IDE中，通过“工具”“部署”“配置”设置FTP/SFTP连接，添加服务器并指定本地与远程路径映射。启用“自动上传”后，可在侧边栏（如项目视图）右键选择“部署”“浏览远程主机”查看远程文件，便于同步管理。'
lastUpdated: '2026-07-02 19:22:57'
head:
  - - meta
    - name: 'og:title'
      content: '在 Jetbrains 系 IDE 中使用部署功能'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在JetBrains IDE中，通过“工具”“部署”“配置”设置FTP/SFTP连接，添加服务器并指定本地与远程路径映射。启用“自动上传”后，可在侧边栏（如项目视图）右键选择“部署”“浏览远程主机”查看远程文件，便于同步管理。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/tools/jetbrains/deployment.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/2167bf423ba1bacb4dbcc418d82b2c2b.png'
---
# 在 Jetbrains 系 IDE 中使用部署功能

`PhpStorm` 除了能直接打开 `localhost` 相关文件之外，还可以连接 FTP 服务。除了能完成正常的数据传输任务，还支持本地文件与服务端文件的差异对比，以及同一文件按目录自动匹配后执行上传、下载操作

## 设置

设置的入口有两处

- 菜单 : `Tools->Deployment->configruation`

![](https://file.wulicode.com/feishu-images/2167bf423ba1bacb4dbcc418d82b2c2b.png)

- 配置: `Settings | Build, Execution, Deployment | Deployment`

![](https://file.wulicode.com/feishu-images/af43da7836f768d3e5c67e0f68717f49.png)

## 配置 ftp / sftp

新增配置

- 配置连接(Connection)

![](https://file.wulicode.com/feishu-images/c6aac809e6f65bd4481bad3d28be1c7a.png)

- 映射(Mappings), 用来目录的映射配置

![](https://file.wulicode.com/feishu-images/764ac774737bea763f4ea9a3264be2bf.png)

映射的配置用来对应文件夹上传的相对路径, 不配置则无法选择上传操作

## 部署

在部署配置连接成功的项目文件右键就能看到 **Deployment**

![](https://file.wulicode.com/feishu-images/b44deefc8902b6b090190982973f3cc8.png)

如下有相关选项, 文件夹和文件有不同的菜单

```Plaintext
upload to ...                         -> 上传到服务端
Download from ...                     -> 从服务器下载
Compare with Deployed Version on ...  -> 与服务端 [XX] 版本进行比较
Sync with Deployed to ...             -> 和服务端进行同步
```

## 显示侧边栏

显示扩展面板 `Tools->Deployment->configruation->Browse Remote host`

![](https://file.wulicode.com/feishu-images/ea0241d6262c9cc14de0069ae9f6be14.png)

打开之后

![](https://file.wulicode.com/feishu-images/e063563e4a72d7cc10a24db02cea7a45.png)

::: info 🔗

参考资料: 
- 🚰 <a href="https://www.cnblogs.com/jikey/p/3486621.html">如何在Webstorm/Phpstorm中设置连接FTP，并快速进行文件比较，上传下载，同步等操作</a>

:::

---

::: info 📆

更新记录
2026年03月04日
- 更新配图, 简化不必要的说明

:::