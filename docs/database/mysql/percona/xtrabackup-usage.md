---
description: 'Percona XtraBackup是一款用于MySQL数据库的开源热备份工具，支持完全备份和增量备份，并提供部分备份恢复及压缩备份功能。本文介绍了其安装、用法、备份选项，并通过示例演示了完全备份、修改数据、两次增量备份等操作流程，还涵盖了备份脚本、配置文件、目录设置及错误信息处理。'
lastUpdated: '2026-07-02 13:04:56'
head:
  - - meta
    - name: 'og:title'
      content: 'Percona XtraBackup 使用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Percona XtraBackup是一款用于MySQL数据库的开源热备份工具，支持完全备份和增量备份，并提供部分备份恢复及压缩备份功能。本文介绍了其安装、用法、备份选项，并通过示例演示了完全备份、修改数据、两次增量备份等操作流程，还涵盖了备份脚本、配置文件、目录设置及错误信息处理。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/database/mysql/percona/xtrabackup-usage.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/e72a8a1e3552557a2c5039c74af247ec.png'
---
# Percona XtraBackup 使用

## 介绍

`percona-xtrabackup` 软件包中中包含了两个工具，一个是xtrabackup，另一个是 innobackupex，innobackupex 由 perl 进行封装，在对 innodb 表进行备份时会自动调用 xtrabackup 工具，所以对 InnoDB 表做备份的实际是xtrabackup这个工具，xtrabackup 也只能对innodb表做备份，这是一个专门对 innodb 开发的热备工具，而对myisam 这样的其他引擎的表则由 innobackupex 来负责备份，若是全备份加增量的方案，那每次增量 innobackupex 工具对非innodb表都是全备份且会请求读锁。

xtrabackup 对 innodb 表进行备份时不再只是简单复制文件，而是利用在innodb存储引擎层中的LSN（日志序列号）的新旧来识别这一数据页是否需要备份。

xtraback 工具对 innodb 引擎完美支持真正的热备份，备份好的数据中数据文件与事务日志的文件因innodb cache等因素的存在，所以备份好的数据和事务日志中的数据往往是不一致的，所以，在做数据恢复时需要把事务日志中已提交的事务做redo，没有提交的事务做 undo 操作，这就是在做数据恢复时要做的准备工作，即 prepare。

## 安装

下载安装程序 [https://www.percona.com/downloads/Percona-XtraBackup-2.4/LATEST/](https://www.percona.com/downloads/Percona-XtraBackup-2.4/LATEST/) , 这里需要的是 mysql 5.7 所以下载 xtraBackup 2.4 版本

```Plaintext
$ yum localinstall percona-xtrabackup-24-2.4.4-1.el7.x86_64.rpm
```

卸载可以使用

```Plaintext
$ yum remove percona-xtrabackup
```

## 用法

### 备份选项

- **xtrabackup –backup**
- **–user**: 备份账号
- **–password** : 备份账号密码
- **–host** : 备份数据库的地址
- **–databases** : 要备份的数据库, 多个数据库中间已空格分割, 如 “db1 db2”。 也可以指定某个表, 如: ‘db1.table1’.(该选项对innodb引擎表无效)
- **–default-file** : 指定从哪个文件读取mysql配置, 必须放在命令的第一个选项位置.
- **–incremental** : 创建一个增量备份, 需指定 –incremental-basedir
- **–incremental-basedir** : 上一次全备份或增量备份的目录,
- **–incremental-dir** : 还原时增量备份的目录
- **–include=name** : 指定表名
- **–compress** : 压缩备份

## 开始操作

### 备份

### 1. 完全备份

```Bash
xtrabackup --user=root --password=root --backup --databases="play" \
--target-dir=/var/www/datas/full
```

![](https://file.wulicode.com/feishu-images/e72a8a1e3552557a2c5039c74af247ec.png)

### 2. 修改数据

### 3. 进行第一次增量备份

```Bash
xtrabackup --user=root --password=root --backup --target-dir=/var/www/datas/inc1/ \
--incremental-base-dir=/var/www/datas/full/ --databases="play"
```

![](https://file.wulicode.com/feishu-images/8e297dbb700d9f12b54c30759e770a64.png)

![](https://file.wulicode.com/feishu-images/f1da698e428c688f9f3c5c695eaadd83.png)

### 4. 再次修改数据

### 5. 第二次增量备份

```Bash
xtrabackup --user=root --password=root --backup --target-dir=/var/www/datas/inc2/ \
--incremental-base-dir=/var/www/datas/inc1/ --databases="play"
```

![](https://file.wulicode.com/feishu-images/c0787b9c52da2f4e460cffb12ed61097.png)

![](https://file.wulicode.com/feishu-images/be5c5574e1e8efcd29a3d234f51cd440.png)

### 恢复

### 部分备份恢复

1. 暂停mysql 服务

```Bash
systemctl stop mysqld
```

1. 复制备份数据到数据库目录下

```Bash
cp -rf play/ /var/lib/mysql
```

1. 修改数据库文件权限

```Bash
chown -R mysql.mysql /var/lib/mysql
```

1. 启动mysql服务

```Bash
systemctl start mysqld
```

### 压缩备份

为了进行压缩备份，需要使用 选项：[`xtrabackup --compress`](https://www.percona.com/doc/percona-xtrabackup/2.4/xtrabackup_bin/xbk_option_reference.html#cmdoption-xtrabackup-compress)

如要加快压缩速度，则可以使用并行压缩，可以使用选项启用它。以下示例将使用四个线程进行压缩：[`xtrabackup --compress-threads`](https://www.percona.com/doc/percona-xtrabackup/2.4/xtrabackup_bin/xbk_option_reference.html#cmdoption-xtrabackup-compress-threads)

```Bash
xtrabackup --backup --compress --compress-threads = 4  --user=root --password=root \
--databases="play" \
--target-dir=/var/www/datas/compress
```

![](https://file.wulicode.com/feishu-images/ad2b5e1bb9bd90fd016070886c0df27f.png)

![](https://file.wulicode.com/feishu-images/58c5bce2b65121bb93928450225894a7.png)

## 备份脚本

### 配置文件

```Plaintext
user=root
password=root
databases=play
host=127.0.0.1
base_dir=/var/www/datas
```

### 运行脚本

```Bash
#!/bin/bash

config_file=`pwd`/config.conf
source $config_file

xtrabackup="xtrabackup --user=$user --password=$password --backup --databases=\"$databases\""

# 创建备份目录
full_path="$base_dir/full"
inc_path="$base_dir/inc"

if [ ! -d $full_path ]; then
    mkdir -p $full_path
fi

if [ ! -d $inc_path ]; then
    mkdir -p $inc_path
fi

# 备份文件夹名
folder=`date +%Y-%m-%d-%H-%M-%S`
# 目标文件夹
inc_target=$inc_path/$folder

# 错误信息
error() {
    echo -e "\e[1;31m$1\e[0m" 1>&2
    exit 1
}

# 获取目录最近修改信息
lastModify() {
    if [ -d $1 ]; then
        path=`ls -t $1 | head -n 1`
    if [ $path ]; then
        echo $path
    else
        error "$1 没有最新修改的信息"
    fi
    else
        error "$1 目录不存在"
    fi
}

# 执行全量备份
doFull() {
    $xtrabackup \
      --target-dir=$full_path
}

# 执行增量备份
doInc() {
    # 是否是第一次增量备份
    if [ "$(ls -A $inc_path)" ]; then
        # 不是第一次备份, 以最近的一次作为基准
        last_path=$(lastModify $inc_path);

        # 创建目录
        if [ ! -d $inc_target ]; then
            mkdir -p $inc_target
        fi

        $xtrabackup \
            --incremental-base-dir=$inc_path/$last_path \
            --target-dir=$inc_target
    else
        # 第一增量备份, 先进行全量备份
        doFull
        if [ ! -d $inc_target ]; then
            mkdir -p $inc_target
        fi

        $xtrabackup \
            --incremental-base-dir=$full_path \
            --target-dir=$inc_target
    fi
}

case $1 in
    full)
        doFull
        ;;
    inc)
        doInc
        ;;
    *)
        echo "full:全量备份"
        echo "inc:增量备份"
        ;;
esac
```