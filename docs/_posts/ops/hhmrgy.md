---
title: "ES 插件 : ElasticSearch 分词/IK"
date: 2022-08-19 18:46:30
toc: true
categories:
- ["Ops","软件","ELK"]
---

## 安装
地址  : [https://github.com/medcl/elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik)


### 自动安装
1. 选择对应的`ES`的版本<br />2. 安装插件
```bash
cd /usr/share/elasticsearch/bin

./elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.5/elasticsearch-analysis-ik-7.17.5.zip
```
这个版本的 7.17.5 安装失败, 可以使用手动安装(参考 github 文档)
```bash
# ./elasticsearch-plugin install elasticsearch-analysis-ik-7.17.5.zip
-> Installing elasticsearch-analysis-ik-7.17.5.zip
-> Failed installing elasticsearch-analysis-ik-7.17.5.zip
-> Rolling back elasticsearch-analysis-ik-7.17.5.zip
-> Rolled back elasticsearch-analysis-ik-7.17.5.zip
```

### 手动安装
```yaml
# mkdir -p /usr/share/elasticsearch/plugins/ik
# wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.5/elasticsearch-analysis-ik-7.17.5.zip
# unzip elasticsearch-analysis-ik-7.17.5.zip
```

## 示例

### 创建索引
这里创建索引并创建属性, 也可以向github 中, 创建索引再创建字段
```json
{
  "content": {
    "type": "text",
    "analyzer": "ik_max_word",
    "search_analyzer": "ik_smart"
  }
}
```

### 验证分词索引
```
POST /INDEX/_analyze
{
  "text": "可恨东君，把春去春来无迹。便过眼、等闲输了，三分之一，昼永暖翻红杏雨，风晴扶起垂杨力。更天涯、芳草最关情，烘残日。湘浦岸，南塘驿。恨不尽，愁如积。算年年孤负，对他寒食",
  "tokenizer": "ik_smart"
}
```

## 自己的词库
```
# 下载安装，下载解压即可，然后复制到其他主机，需要重启es
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.10.1/elasticsearch-analysis-ik-7.10.1.zip
unzip elasticsearch-analysis-ik-7.10.1.zip -d /usr/local/servers/elasticsearch/plugins/ik

# 添加自己的分词库及停用词库
# 第一步：新建自己的文件夹和分词文件、停用词文件
cd /usr/local/servers/elasticsearch/plugins/ik/config/ik
mkdir custom
touch custom/myword.dic custom/mystopword.dic
# 第二步：在myword.dic文件中写入自己的词库，在mystopword.dic下写入自己的停用词
vi myword.dic
vi mystopword.dic
# 第三步：修改ik配置文件指向自己的分词库
vi config/IKAnalyzer.cfg.xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典 -->
        <entry key="ext_dict">custom/myword.dic</entry>  # 这里是分词库相对路径
         <!--用户可以在这里配置自己的扩展停止词字典-->
        <entry key="ext_stopwords">custom/mystopword.dic</entry>  # 这里是停用词库相对路径
        <!--用户可以在这里配置远程扩展字典 -->
        <!-- <entry key="remote_ext_dict">words_location</entry> -->
        <!--用户可以在这里配置远程扩展停止词字典-->
        <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
# 第四步：重启elasticsearch服务

```
使用分词器
```
# 一般分词（包含ik_smart和ik_max_word两种方式）
GET _analyze
{
  "analyzer": "ik_smart",  # ik_smart倾向于尽量少的分词，ik_max_word则是尽可能多的列出所有情况
  "text": "中国教育真是好啊"
}

# 实际使用IK分词器
# 首先需要定义mapping，指定字段使用IK分词器，其次就可以正常传入数据并且查询了，特殊词组则建立或新增自己的分词库
PUT news
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "ik_max_word",  # 传入数据的时候使用最详细的分词，这样匹配度会更高
        "search_analyzer": "ik_smart"  # 查询时的匹配则使用尽量少的分词，使查询结果不至于偏差太大
      }, 
      "content": {
        "type": "text", 
        "analyzer": "ik_max_word", 
        "search_analyzer": "ik_smart"
      }
    }
  }
}

```

