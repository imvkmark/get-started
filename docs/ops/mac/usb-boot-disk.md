# Mac上制作Ubuntu USB启动盘

原文地址 :  http://jiangbo.me/blog/2011/11/09/create_ubuntu_usb_startdisk_on_mac/

## 一、下载ubuntu iso镜像

下载地址:

http://www.ubuntu.org.cn/download/desktop

## 二、将iso转换为img文件

```
$ hdiutil convert -format UDRW -o /path/to/generate/img/file /path/to/your/iso/file
```

该命令会生成一个.img的磁盘镜像文件，但是mac osx会默认追加一个.dmg，即生成的文件后缀是.img.dmg，这个后缀没关系，可以忽略

###三、查看USB的盘符

```
$ diskutil list
/dev/disk0
#:                        TYPE NAME                     SIZE        IDENTIFIER
0:       GUID_partition_scheme                         *250.1 GB    disk0
1:                         EFI                          209.7 MB    disk0s1
2:                   Apple_HFS Macintosh HD             249.2 GB    disk0s2
3:                  Apple_Boot Recovery HD              650.0 MB    disk0s3
/dev/disk1
#:                        TYPE NAME                     SIZE        IDENTIFIER
0:      FDisk_partition_scheme                         *4.0 GB      disk1
1:                  DOS_FAT_32 UNTITLED                 4.0 GB      disk1s1
```

该命令查看当前系统上挂载的磁盘，其中/dev/disk1是我的USB磁盘。不同的系统disk后的数字可能不一样，但一般都是diskN的模式

## 四、卸载USB磁盘

```
$ diskutil unmountDisk /dev/disk1
Unmount of all volumes on disk1 was successful
```

使用 `diskutil unmountDisk` 卸载USB磁盘，注意卸载（umount）与弹出(eject)的区别:)

## 五、将镜像写入USB

```
$ sudo dd if=ubuntu.img.dmg of=/dev/rdisk1 bs=1m
```

将第二步生成的img文件写入到USB磁盘/dev/rdisk1。

## 六、弹出USB

```
$ diskutil eject /dev/disk1
```

