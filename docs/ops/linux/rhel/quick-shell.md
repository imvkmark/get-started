---
description: '为RHEL、CentOS 7/8、RockyLinux系统提供服务器完善脚本，包括更新cURL、日志切割、Nginx安装、证书配置、PHP安装（RockyLinux 9）及Laravel网站初始化等常用操作。'
lastUpdated: '2026-07-01 13:36:58'
head:
  - - meta
    - name: 'og:title'
      content: 'RHEL 常用 Shell 脚本'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '为RHEL、CentOS 7/8、RockyLinux系统提供服务器完善脚本，包括更新cURL、日志切割、Nginx安装、证书配置、PHP安装（RockyLinux 9）及Laravel网站初始化等常用操作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/linux/rhel/quick-shell.html'
---
# RHEL 常用 Shell 脚本

## 服务器完善

### 更新 cURL 最新版(CentOS 7/8)

url : [https://i.wulicode.com/op/file/centos-curl.sh](https://i.wulicode.com/op/file/centos-curl.sh)

- `version` : 版本号,默认: 8.9.1

```Bash
export WULI_VER=8.9.1
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/centos-curl.sh?version=$WULI_VER)"
```

### Rocky 服务器完善

> 作用

- 升级服务器
- 禁用 selinux
- 检查用户并创建
- 配置 ssh, 关闭 22 端口, 启用 9022 端口, 禁用 root 登录

url : [https://i.wulicode.com/op/file/rocky.sh](https://i.wulicode.com/op/file/rocky.sh)

- `user` : 用户名称, 默认: duoli

```Bash
export WR_USER=duoli
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/rocky.sh?user=$WR_USER)"
```

## 日志切割

> 作用: 写入日志切割文件

url : [https://i.wulicode.com/op/file/project.logrotate](https://i.wulicode.com/op/file/project.logrotate)

- `name` : 项目名称, 默认: example
- `user` : 用户名称, 默认: duoli

使用命令

```Bash
export WR_USER=duoli
export WR_NAME=wulicode
wget "https://i.wulicode.com/op/file/project.logrotate?name=$WR_NAME&user=$WR_USER" \\
   -O "/etc/logrotate.d/nginx.$WR_NAME"
```

## Nginx

### 安装(当前支持 RockyLinux)

作用

- 关闭 selinux
- 检查目标用户
- 安装 nginx
- 配置 nginx(附带标准化约定)
- 开启防火墙内部端口
- 安装 Logtail(默认:否)

---

url : [https://i.wulicode.com/op/file/nginx.sh](https://i.wulicode.com/op/file/nginx.sh)

- `user` : 用户,默认: duoli
- `logtail` : 是否安装aliyun logtail,默认: 否, 传递非空参数安装

```Bash
export WR_USER=duoli
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/nginx.sh?user=$WR_USER)"
```

### 安装证书

使用这个脚本来下载证书文件并且使用 `ssl.conf` 安装和更新证书

证书路径命名标准是

```Plaintext
- URL/DOMAIN/DOMAIN.key
- URL/DOMAIN/DOMAIN.pem
```

---

URL : [https://i.wulicode.com/op/file/cert.sh](https://i.wulicode.com/op/file/cert.sh)

- `name`

项目标识, 默认: `proj`

- `domain`

域名, 默认: `''`

- `url`

证书下载地址前缀, 默认: `''`

```Bash
export WULI_DOMAIN=wulicode.com
export WULI_NAME=wulicode
export WULI_URL=https://i.wulicode.com/res/cert
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/cert.sh?name=$WULI_NAME\&domain=$WULI_DOMAIN\&url=$WULI_URL)"
```

::: warning ⚠️

这个工具现存的问题是下载 oss 文件会额外在当前目录下载多余的证书, 需要手动清除这个证书

:::

## Php 安装(RockLinux 9)

> 检查用户  
> 安装 php  
> 配置 用户, 权限  
> 配置时区, 最大上传为 50M

url : [https://i.wulicode.com/op/file/php.sh](https://i.wulicode.com/op/file/php.sh)

- `user` : 用户,默认: duoli

```Bash
export WR_USER=duoli
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/php.sh?user=$WR_USER)"
```

## Laravel 网站初始化

> 创建项目目录  
> 更新项目基础配置  
> 更新资源和 web 重定向配置

url : [https://i.wulicode.com/op/file/vps.sh](https://i.wulicode.com/op/file/vps.sh)

- `name` : 项目名称
- `domain` : 项目域名
- `ssl`: 是否启用 ssl , 默认不启用, 传递任意参数启用

```Bash
export WR_DOMAIN=wulicode.com
export WR_NAME=wulicode
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/vps.sh?name=$WR_NAME\&domain=$WR_DOMAIN)"
```