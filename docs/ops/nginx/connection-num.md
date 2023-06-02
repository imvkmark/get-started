# nginx 优化连接数

![](https://file.wulicode.com/note/2021/11-11/17-25-27403.png#)

未优化之前的连接数 NotEstablished 的数量到达了一定的峰值, 然后处于持平状态, 在这个时候服务器日志会报 500 错误

![](https://file.wulicode.com/note/2021/11-11/17-25-40419.png#)

这个地方考虑到的可能性是链接数过多导致的服务器

**/etc/sysctl.conf**



```
net.ipv4.tcp_max_tw_buckets = 8000
```
**nginx.conf**
```
...
worker_processes  32;
worker_rlimit_nofile 65535;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
    worker_connections  10240;
}
...
```
优化之后的数据

![](https://file.wulicode.com/note/2021/11-11/17-25-55160.png#)

