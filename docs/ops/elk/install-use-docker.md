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

![image.png](https://file.wulicode.com/yuque/202208/04/14/5901ggb3da6c.png?x-oss-process=image/resize,h_45)

下载地址 : https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm

![image.png](https://file.wulicode.com/yuque/202208/04/14/5902hlULEHBp.png?x-oss-process=image/resize,h_89)

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

`YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID` 这个地方写自己的 container_id 或者 name

运行结果

![image.png](https://file.wulicode.com/yuque/202208/04/14/5902kzC0RxPe.png?x-oss-process=image/resize,h_360)

