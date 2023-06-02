# CentOS 7 中安装和卸载 Docker

## 卸载

1. 杀死所有运行容器

```
# docker kill $(docker ps -a -q)
```

2. 删除所有容器

```
# docker rm $(docker ps -a -q)
```

3. 删除所有镜像

```
# docker rmi $(docker images -q)
```

4. 停止 docker 服务

```
# systemctl stop docker
```

5. 删除存储目录

```
# rm -rf /etc/docker  
# rm -rf /run/docker  
# rm -rf /var/lib/dockershim  
# rm -rf /var/lib/docker
```

如果发现删除不掉，需要先 umount，如

```
# umount /var/lib/docker/devicemapper
```

6. 卸载 docker

查看已安装的 docker 包

```
# yum list installed | grep docker
```

卸载相关包

```
# yum remove docker-engine docker-engine-selinux.noarch
```

