# CentOS 的常用 Shell 脚本

## 更新 cURL 最新版(CentOS 7/8)

url : https://i.wulicode.com/op/file/centos-curl.sh

`version` : 版本号,默认: 8.1.1

## 日志切割

url : https://i.wulicode.com/op/file/project.logrotate

- `name` : 项目名称, 默认: example
- `user` : 用户名称, 默认: user

使用命令

```bash
export WULI_USER=liexiang
export WULI_NAME=wulicode
echo 
wget "https://i.wulicode.com/op/file/project.logrotate?name=$WULI_NAME&user=$WULI_USER" \
   -O "/etc/logrotate.d/nginx.$WULI_NAME"
```