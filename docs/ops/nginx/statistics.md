---
description: '文档介绍了Nginx访问量统计的基本概念：PV为页面浏览量，UV为独立访客数，IP为独立IP数，VV为访问次数。并说明可通过查看Nginx配置文件（/etc/nginx/nginx.conf）和访问日志（/var/log/nginx/access.log），使用awk命令按IP统计UV。'
lastUpdated: '2026-06-17 23:51:42'
head:
  - - meta
    - name: 'og:title'
      content: '统计 Nginx 访问量'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '文档介绍了Nginx访问量统计的基本概念：PV为页面浏览量，UV为独立访客数，IP为独立IP数，VV为访问次数。并说明可通过查看Nginx配置文件（/etc/nginx/nginx.conf）和访问日志（/var/log/nginx/access.log），使用awk命令按IP统计UV。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/statistics.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/b7acf100529b8ed83eb9bc9290ecb2fe.png'
---
# 统计 Nginx 访问量

## 概念

**PV（Page View）**

即页面浏览量或者点击量，用户每一次对网站中每个页面访问均记录 1 个 PV。用户对同一页面的多次访问，访问量累积。

**UV（Unique Visitor）**

指通过互联网浏览这个网页的人，电脑称为一个访客、手机也称为一个访客，一天之内相同的客户端只能被计算一次。

**IP（Internet Protocol）**

指独立 IP 访问站点的 IP 总数，一天内相同 IP 只能算一次。

**VV（Visit View）**

指所有访客一天内访问网站的次数，当访客完成所有浏览并最终关闭网站的所有页面时变完成了一次访问，同一访客一天内可能有多次访问行为，访问次数累积。

**接下来看一下 Nginx 的配置文件：**

![](https://file.wulicode.com/feishu-images/b7acf100529b8ed83eb9bc9290ecb2fe.png)

/etc/nginx/nginx.conf

**再看一下 access.log：**

![](https://file.wulicode.com/feishu-images/907206482d477d3ebe610b91d90521ed.png)

/var/log/nginx/access.log

access.log 文件里面的 remote_address, remote_user…等

**查看各个访问量：**

**1.根据访问 IP 统计 UV**

```Plaintext
awk '{print $1}'  /var/log/nginx/access.log|sort | uniq -c |wc -l
```

**2.统计访问 URL 统计 PV**

```Plaintext
awk '{print $7}' /var/log/nginx/access.log|wc -l
```

**3.查询访问最频繁的 URL**

```Plaintext
awk '{print $7}' /var/log/nginx/access.log|sort | uniq -c |sort -n -k 1 -r|more
```

**4.查询访问最频繁的 IP**

```Plaintext
awk '{print $1}' /var/log/nginx/access.log|sort | uniq -c |sort -n -k 1 -r|more
```

**5.根据时间段统计查看日**志

```Plaintext
cat  /var/log/nginx/access.log| sed -n '/14/Mar/2017:21/,/14/Mar/2017:22/p'|more
```

针对每天的访问信息写一个脚本，并将统计信息输出到/pv.html 文件里面，之保留 30 天的信息。方便直接浏览此页面查看，但要限制特定 IP 才能访问此页面，其他 IP 的 403!

```Plaintext
year=`date +%Y`
month=`date +%m`
datedate=`date +%F`
date=`date +%Y%m%d`
pv=`awk '{print $7}' /xx/logs/nginx/xxx/"$year"/"$month"/"$datedate"-access.log | wc -l`
ip=`awk '{print $1}' /xx/logs/nginx/xxx/"$year"/"$month"/"$datedate"-access.log | sort -n | uniq -c | wc -l`
echo -e "\n$date Pv is $pv;; $date Ip is $ip.." >> /xx/xxx/pv.htm l sort -rn /xx/xxx/pv.html | sed -i '31d' /xx/xxx/pv.html | sort -r
```

此外还要修改 nginx 配置文件：

```Plaintext
location = /pv.html {
    allow  xxx.xxx.xxx.xxx;
    deny allow;
}
nginx -r
dervice nginx reload
```

最后，将 pv.sh 加入定时任务：

```Plaintext
crontab -e
```