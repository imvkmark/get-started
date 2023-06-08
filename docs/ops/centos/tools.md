# CentOS 的常用 Shell 脚本

## 更新 cURL 最新版(CentOS 7/8)

url : https://i.wulicode.com/op/file/centos-curl.sh

`version` : 版本号,默认: 8.1.1

```bash
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/centos-curl.sh)"
```

## 日志切割

> 作用: 写入日志切割文件

url : https://i.wulicode.com/op/file/project.logrotate

- `name` : 项目名称, 默认: example
- `user` : 用户名称, 默认: duoli

使用命令

```bash
export WULI_USER=liexiang
export WULI_NAME=wulicode
wget "https://i.wulicode.com/op/file/project.logrotate?name=$WULI_NAME&user=$WULI_USER" \
   -O "/etc/logrotate.d/nginx.$WULI_NAME"
```

## Nginx 安装(当前支持 RockyLinux)

> 作用
> - 关闭 selinux
> - 检查目标用户
> - 安装 nginx
> - 配置 nginx(附带标准化约定)
> - 开启防火墙内部端口
> - 安装 Logtail(默认:否)

url : https://i.wulicode.com/op/file/nginx.sh

`user` : 用户,默认: duoli
`logtail` : 是否安装aliyun logtail,默认: 否, 传递非空参数安装

```bash
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/nginx.sh)"
```

## Rocky 服务器完善

> 作用
> - 升级服务器
> - 禁用 selinux
> - 检查用户并创建
> - 配置 ssh, 关闭 22 端口, 启用 9022 端口, 禁用 root 登录

url : https://i.wulicode.com/op/file/rocky.sh

- `user` : 用户名称, 默认: duoli

