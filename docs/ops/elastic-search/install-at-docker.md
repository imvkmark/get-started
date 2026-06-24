---
description: '安装浏览器工具 ElasticSearch Head下载地址 :https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegmYOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID 这个地方写自己的 container_id 或者 name运行结果'
lastUpdated: '2025-12-19 14:27:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Docker 方式 安装 ElasticSearch / Kibana 安装'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '安装浏览器工具 ElasticSearch Head下载地址 :https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegmYOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID 这个地方写自己的 container_id 或者 name运行结果'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/elastic-search/install-at-docker.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/f8/f8d5a75ae265404e26487168e649c67f.png?x-oss-process=image/resize,m_mfit,w_400'
---
# Docker 方式 安装 ElasticSearch / Kibana 安装



## 安装 elasticsearch

```
$ docker pull docker.elastic.co/elasticsearch/elasticsearch:7.10.2
$ docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.2

$ docker ps
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED         STATUS         PORTS                                            NAMES
2249f918cc81   docker.elastic.co/elasticsearch/elasticsearch:7.10.2   "/tini -- /usr/local…"   8 minutes ago   Up 7 minutes   0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp   nervous_jones

# 重命名
$ docker rename 2249f918cc81 es7
```

**安装浏览器工具 ElasticSearch Head**

![](https://file.wulicode.com/notion/f8/f8d5a75ae265404e26487168e649c67f.png)

下载地址 :

[https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm](https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm)

![](https://file.wulicode.com/notion/e6/e6e2ad1bb6f165931319dd6a78c42e4e.png)

## 安装 Kibana

```
$ docker pull docker.elastic.co/kibana/kibana:7.10.2
$ docker run --link YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:7.10.2

$ docker run --link es7:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:7.10.2
$ docker ps
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED          STATUS          PORTS                                            NAMES
65a5e4739050   docker.elastic.co/kibana/kibana:7.10.2                 "/usr/local/bin/dumb…"   36 seconds ago   Up 5 seconds    0.0.0.0:5601->5601/tcp                           brave_hodgkin

$ docker rename 65a5e4739050 kibana7
```

`YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID`  这个地方写自己的 container_id 或者 name

运行结果

![](https://file.wulicode.com/notion/1b/1b0ac4d141865cdc5049cd23df9fa8eb.png)

