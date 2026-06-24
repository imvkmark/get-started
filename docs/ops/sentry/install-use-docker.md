---
description: '本文介绍通过Docker安装ElasticSearch和Kibana的步骤，包括相关重命名操作。'
lastUpdated: '2026-06-21 17:35:07'
head:
  - - meta
    - name: 'og:title'
      content: 'Docker 方式 安装 ElasticSearch / Kibana'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍通过Docker安装ElasticSearch和Kibana的步骤，包括相关重命名操作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/sentry/install-use-docker.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/4ec27dbde81014df1987d05ab241b820.png'
---
# Docker 方式 安装 ElasticSearch / Kibana

## 安装 elasticsearch

```Plaintext
$ docker pull docker.elastic.co/elasticsearch/elasticsearch:7.10.2
$ docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.2

$ docker ps
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED         STATUS         PORTS                                            NAMES
2249f918cc81   docker.elastic.co/elasticsearch/elasticsearch:7.10.2   "/tini -- /usr/local…"   8 minutes ago   Up 7 minutes   0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp   nervous_jones

# 重命名
$ docker rename 2249f918cc81 es7
```

**安装浏览器工具** [**ElasticSearch Head**](https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm)

![](https://file.wulicode.com/feishu-images/4ec27dbde81014df1987d05ab241b820.png)

## 安装 Kibana

```Plaintext
$ docker pull docker.elastic.co/kibana/kibana:7.10.2
$ docker run --link YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:7.10.2

$ docker run --link es7:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:7.10.2
$ docker ps
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED          STATUS          PORTS                                            NAMES
65a5e4739050   docker.elastic.co/kibana/kibana:7.10.2                 "/usr/local/bin/dumb…"   36 seconds ago   Up 5 seconds    0.0.0.0:5601->5601/tcp                           brave_hodgkin

$ docker rename 65a5e4739050 kibana7
```

`YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID` 这个地方写自己的 container_id 或者 name

运行结果

![](https://file.wulicode.com/feishu-images/46d14374ea439c65aee63f0a8e5ac21c.png)