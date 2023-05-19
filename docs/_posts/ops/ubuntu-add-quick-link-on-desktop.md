---
title: "[转+] 将程序桌面图标加到ubuntu启动器的方法"
date: 2022-04-14 22:26:41
toc: true
categories:
- ["Ops","Ubuntu"]
---

原文地址： [将程序桌面图标加到ubuntu启动器的方法(图解)](http://www.jb51.net/os/Ubuntu/123320.html)<br />Ubuntu安装一些程序的时候图标可能没有放到启动器中，不方便使用，下面给出解决方法，大家参考使用<br />因为 phpstorm 这个程序是直接解压缩之后便可以使用的，每次都需要到文件所在目录 `/data/program/phpstorm10` 下双击执行，太麻烦，若直接使用软链接的话也可以实现，`sudo ln -s /data/program/phpstorm10/bin/phpstorm.sh ~/桌面/phpstorm`, 因为我的是 `ubuntu kylin 15.10 中文版`， 所以这个目录必须要写 `桌面`， 否则是无法链接到的，  但是如下图，没有图标，实在是太丑。<br />![](https://file.wulicode.com/yuque/202208/04/14/4848IGWorQ9T.jpg?x-oss-process=image/resize,h_110)<br />于是我们建立一个 `phpstorm10.desktop`, 输入如下内容

```
[Desktop Entry]
Version=1.0
Type=Application
Name=PhpStorm
Icon=/data/program/phpstorm10/bin/webide.png
Exec="/data/program/phpstorm10/bin/phpstorm.sh" %f
Comment=Develop with pleasure!
Categories=Development;IDE;
Terminal=false
StartupWMClass=jetbrains-phpstorm
```
其中，`Exec`是程序的执行文件，`Icon`是程序的图标文件，`Name`是程序的名称<br />修改文件权限: `sudo chmod 744 phpstorm.desktop`, 之后便可以看到该文件变成了程序的快捷启动图标,如下图<br />![](https://file.wulicode.com/yuque/202208/04/14/4849RzlzpF1e.jpg?x-oss-process=image/resize,h_232)<br />启动器中的文件都是存放在 `/usr/share/applications` 中的, 所以使用命令移动该文件到目标目录下：
```
sudo cp phpstorm.desktop /usr/share/applications
```
４. 之后便可以在启动器中搜索到该程序， 同样锁定之后也可以在启动栏中打开这个程序了。<br />由于phpstorm10 更改了验证机制， 之前的注册码不能使用了。 请点击 [http://idea.lanyus.com/](http://idea.lanyus.com/) 来使用。<br />![](https://file.wulicode.com/yuque/202208/04/14/4849ybjzTzMv.jpg?x-oss-process=image/resize,h_412)

### 附: Amazon 的快捷链接
```
#!/usr/bin/env xdg-open
[Desktop Entry]
Name=Amazon
Type=Application
Icon=amazon-store
Exec=unity-webapps-runner --amazon --app-id=ubuntu-amazon-default
```

