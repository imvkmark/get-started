---
title: "ES 语法"
date: 2022-10-13 12:26:33
toc: true
categories:
- ["Ops","软件","ELK"]
---

## 类型




### 字符串
> ELasticsearch 5.x 之后的字段类型不再支持 string，由 text 或 keyword 取代

**text类型**

text 类型取代了string 类型，当一个字段需要被全文检索的时候，需要被分词器解析，生成倒排索引。text类型的字段不用于排序，很少用于集合（termsAggregation除外）
```json
{
  "title": {
    "type": "text"
  }
}
```
**keyword类型**

keyword 类型适用于索引结构化的字段，比如email地址、主机名、状态码和标签。如果字段需要进行过滤(比如查找已发布博客中 status 属性为 published 的文章)、排序、聚合。keyword 类型的字段只能通过精确值搜索到
```json
{
  "companyName": {
    "type": "text"
  }
}
```

### 数值型
| 类型 | 区域 |
| --- | --- |
| 整型 | byte、short、integer、long |
| 浮点型 | float、half_float、scaled_float、double |

| 类型 | 取值范围 |
| --- | --- |
| long | -263至263-1 |
| integer | -231至231-1 |
| short | -32768 至 32768 |
| byte | -128 至 127 |
| double | 64位双精度IEEE 754浮点类型 |
| float | 32位单精度IEEE 754浮点类型 |
| half_float | 16位半精度IEEE 754浮点类型 |
| scaled_float | 缩放类型的的浮点数（比如价格只需要精确到分，price为57.34的字段缩放因子为100，存起来就是5734） |

对于float、half_float和 scaled_float, -0.0 和 +0.0 是不同的值，使用 term 查询查找 -0.0 不会匹配 +0.0，同样range查询中上边界是 -0.0 不会匹配 +0.0，下边界是 +0.0 不会匹配 -0.0 。

对于数字类型的数据，选择以上数据类型的注意事项：

1. 在满足需求的情况下，尽可能选择范围小的数据类型。比如，某个字段的取值最大值不会超过100，那么选择byte类型即可。迄今为止吉尼斯记录的人类的年龄的最大值为134岁，对于年龄字段，short 足矣。字段的长度越短，索引和搜索的效率越高。
2. 优先考虑使用带缩放因子的浮点类型。
```json
{
  "number_of_bytes": {
    "type": "integer"
  },
  "time_in_seconds": {
    "type": "float"
  },
  "price": {
    "type": "scaled_float",
    "scaling_factor": 100
  }
}
```

### 日期类型
`date`

JSON中没有日期类型，所以在ELasticsearch中，日期类型可以是以下几种：

1. 日期格式的字符串：e.g. `2015-01-01` or `2015/01/01 12:10:30`.
2. long 类型的毫秒数( milliseconds-since-the-epoch)
3. integer 的秒数(seconds-since-the-epoch)
```json
{
  "create_date": {
    "type": "date"
  }
}
```

### 范围型
| 类型 | 范围 |
| --- | --- |
| integer_range | -231至231-1 |
| float_range | 32-bit IEEE 754 |
| long_range | -263至263-1 |
| double_range | 64-bit IEEE 754 |
| date_range | 64位整数，毫秒计时 |

```json
{
  "age_limit": {
    "type": "integer_range"
  },
  "time_frame": {
    "type": "date_range", 
    "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
  }
}
```

### 布尔
`boolean` true、false
```json
{
  "is_stop": {
    "type": "boolean"
  }
}
```

### 二进制
`binary` 会把值当做经过 base64 编码的字符串，默认不存储，且不可搜索
```json
{
  "img_head": {
    "type": "binary"
  }
}
```

### 复杂数据类型

#### 对象
`object` 对象，一个对象中可以嵌套对象。
```json
{
  "age": {
    "type": "integer"
  },
  "name": {
    "properties": {
      "first": {
        "type": "text"
      },
      "last": {
        "type": "text"
      }
    }
  }
}
```

#### 数组
ELasticsearch没有专用的数组类型，默认情况下任何字段都可以包含一个或者多个值，但是一个数组中的值要是同一种类型。例如：

1. 字符数组: `["one","two"]`
2. 整型数组：`[1,3]`
3. 嵌套数组：`[1,[2,3]]` 等价于`[1,2,3]`
4. 对象数组：`[{"name":"Mary","age":12}, {"name":"John","age":10}]`

注意事项：

- 动态添加数据时，数组的第一个值的类型决定整个数组的类型
- 混合数组类型是不支持的，比如：`[1,"abc"]`
- 数组可以包含`null`值，空数组`[]`会被当做missing field对待。

### 专用数据类型

#### IP
ip类型的字段用于存储IPV4或者IPV6的地址
```json
{
  "ip": {
    "type": "ip"
  }
}
```

#### nested类型
nested嵌套类型是object中的一个特例，可以让array类型的Object独立索引和查询。
```json
{
  "title": {
    "type": "nested"
  }
}
```

#### token_count类型
token_count用于统计词频：
```json
{
  "view_count": {
    "type": "token_count",
    "analyzer": "standard"
  }
}
```

#### geo point 类型
地理位置信息类型用于存储地理位置信息的经纬度：
```json
{
  "location": {
    "type": "geo_point"
  }
}
```

## GET _search - 搜索

### 查询表达式 QueryDSL
最简单的搜索命令，不指定索引和类型的空搜索，它将返回集群下所有索引的所有文档（默认显示10条）
```
GET /_search

---- 等价于 ----

GET /_search
{
    "query": {
        "match_all": {}
    }
}
```

#### 搜索语法
```
# 查询语句结构
{
    QUERY_NAME: {
        ARGUMENT: VALUE,
        ARGUMENT: VALUE,...
    }
}

# 针对某个字段的查询
{
    QUERY_NAME: {
        FIELD_NAME: {
            ARGUMENT: VALUE,
            ARGUMENT: VALUE,...
        }
    }
}
```

#### 复合查询
再复杂的查询语句，也是由一个一个的查询条件叠加而成的，查询语句有两种形式：

- 叶子语句：单个条件组成的语句，如match语句，类似mysql的`"id = 1"`这种。
- 复合语句：有多个条件，需要合并在一起才能组成一个完整的语句，需要使用bool进行组合，里面的条件可以用must必须匹配、must not必须不匹配、should可以匹配修饰，也可以包含过滤器filter, 类似mysql的`"(status = 1 && language != 'french' && (author = 'John' || author = 'Tom'))"`这种

举个例子 : 
```
{
    "bool": {
        "must":     { "match": { "status": 1 }},
        "must_not": { "match": { "language":  "french" }},
        "should":   { "match": { "author": "John Tom" }},
        "filter":   { "range": { "length" : { "gt" : 30 }} }
    }
}
```
复合语句可以嵌套，来实现更复杂的查询需求，在上面的例子上简单延伸一下：
```
"bool": {
    "must":     { "match": { "status": 1 }},
    "must_not": { "match": { "language":  "french" }},
    "should":   [
        {"match": { "author": "John Tom" }},
        {"bool": {
            "must":     { "match": { "name": "friend" }},
            "must_not": { "match": { "content":  "star" }}
        }}
    ],
    "filter":   { "range": { "length" : { "gt" : 30 }} }
}
```

#### 相关性分数计算
每一个子查询都独自地计算文档的相关性得分。一旦他们的得分被计算出来，bool 查询就将这些得分进行合并并且返回一个代表整个布尔操作的得分，得分高的显示在前面，filter内的条件不参与分数计算

### 过滤器 filter

- 过滤情况filtering context

仅按照搜索条件把需要的数据筛选出来，不计算相关度分数。

- 查询情况query context

匹配条件的数据，会根据搜索条件的相关度，计算每个document的分数，然后按照分数进行排序，这个才是全文搜索的情况。

- 性能差异

filter只做过滤，不作排序，并且会缓存结果到内存中，性能非常高。query匹配条件，要做评分，没有缓存，性能要低一些。

- 应用场景

filter 一个非常重要的作用就是减少不相关数据对 query 的影响，提升 query 的性能，二者常常搭配在一起使用。组合使用的时候，把期望符合条件的document 的搜索条件放在 query 里，把要滤掉的条件放在filter里

### 多个索引查询
```
GET index1,index2/_search
```

### 基础参数
不传递参数则返回所有数据

#### from - 查询起始位置
相当于 mysql 查询的 limit

#### size - 查询数量
相当于mysql 查询的 offset

相当于数据库查询的 limit / offset
```
# from,size从指定位置开始返回指定数量的记录
GET {index}/_search
{
  "from": 5,
  "size": 5
}
```

#### sort 对结果进行排序
对查询结果按字段进行排序，desc 降序，asc 升序
```
GET {index}/_search
{
  "sort": [
      {
        "price": {
          "order": "desc"
        }
      }
  ]
}
```

#### _source 返回字段
使用 `_source` 返回自定义的字段
```
GET {index}/_search
{
  "_source": ["id", "title"]
}
```

### query 查询

#### match_all 查询
查询简单的匹配所有文档
```
GET /_search
{
    "query": {
        "match_all": {}
    }
}
```

#### match 匹配
match 匹配查询，直接匹配目标字符串，不做分词处理
```
GET {index}/_search
{
  "query": {
    "match": {
      "author": "多厘"
    }
  }
}
```
需要注意索引内是否分词, 如果索引内已经分词, 这里的match 遵循分词进行全文搜索
```
# 全文搜索例子
{ "match": { "content": "寒食" }}

# 精确搜索
{ "match": { "likes":    15         }}
{ "match": { "date":   "2019-12-05" }}
{ "match": { "isOwner": true        }}
{ "match": { "keyword": "love you"  }}
```

#### range 范围
查询指定区间内的数字或时间, query 和 filter 都支持, 一般是 filter 使用的多, 允许的操作符如下

- gt 大于
- gte 大于或等于
- lt 小于
- lte 小于或等于
```
GET {index}/_search
{
  "query": {
    "range": {
      "stock": {
        "gte": 1,
        "lte": 3
      }
    }
  }
}
```

#### term 查询
用于精确值匹配, 精确值可以是数字, 日期, boolean 或 keyword 类型的字符串
```
{ "term": { "likes"  :  15         }}
{ "term": { "date"   : "2019-12-05"}}
{ "term": { "isOwner": true        }}
{ "term": { "keyword": "love you"  }}
```
建立索引时 mapping 设置为 not_analyzed 时，match 等同于 term，用得多的是 match 和 range

####  terms 多对象匹配, 对象之间是或关系
terms则是可以输入多个对象来匹配，对象之间是或关系
```
GET {index}/_search
{
  "query":{
    "terms":{
      "author" :[
        "李春梅", "柏桂兰"
      ]
    }
  }
}
```

#### match_phrase(todo) 作为输入短语来进行匹配
```
GET {index}/_search
{
  "query":{
    "match_phrase":{
      "title" :"梅"
    }
  }
}
```

#### multi_match 从多个字段中去匹配查询目标
这里的匹配是精准匹配, 也就是 `=` 匹配
```
GET {index}/_search
{
  "query":{
    "multi_match":{
      "query" :"多厘",
      "fields" : ["title", "description"]
    }
  }
}
```

#### query_string 字串之间使用 AND 和 OR 连接
针对字符串的查询，字符串之间用AND和OR连接
```
GET {index}/_search
{
  "query":{
    "query_string": {
      "default_field": "FIELD",
      "query": "this AND that OR thus"
      "default_operator": "OR"
    }
  }
}
```

#### simple_query_string 针对在多个字段中查找目标
这里是精准匹配, `default_operator`是在多个字段中采用什么样的查询操作
```
GET {index}/_search
{
  "query":{
    "simple_query_string": {
      "query": "多厘",
      "fields": ["title", "description"], 
      "default_operator": "OR"
    }
  }
}
```

#### wildcard 使用通配符来查询
这个通配符相当于 sql 查询中 `like` 的 `%`
```
GET {index}/_search
{
  "query": {
    "wildcard": {
      "title": {
         "value": "*婷*"
      }
    }
  }
}
```

#### constant_score 非相关性, 查询数据缓存
不进行相关性算分，并把查询的数据进行缓存，提升效率, 因为 must 等非 filter 查询会对文档进行分数的计算, 然后根据分数进行相关的排序, 所以这样的语句更简洁, 更清晰, 只是没有评分, 示例如下 : 
```
GET {index}/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "match": {
          "title": "梅"
        }
      },
      "boost": 1.0
    }
  }
}
```
注意 filter 内不支持 terms 语法

#### fuzzy(todo)
模糊查询, 按得分值降序
```
GET {index}/_search
{
  "query": {
    "fuzzy": {
      "title": "梅"
    }
  }
}
```
`fuzzy&fuzziness` 控制对模糊值的改变次数来匹配目标最终文档，fuzziness 的取值范围为0、1、2
```
GET {index}/_search
{
  "query": {
    "fuzzy": {
      "value": "梅",
      "fuzziness": 1
    }
  }
}
```

#### 组合查询
bool&must 多条件查询
```
GET {index}/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "simple_query_string": {
          "query": "beautiful mind",
          "fields": ["title"]
        }},
        {
          "range": {
            "year": {
              "gte": 1990,
              "lte": 1992
            }
          }
        }
      ]
    }
  }
}
```
bool&must&must not多条件查询
```
GET {index}/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "simple_query_string": {
          "query": "beautiful mind",
          "fields": ["title"]
        }},
        {
          "range": {
            "year": {
              "gte": 1990,
              "lte": 1992
            }
          }
        }
      ]
    }
  }
}
```
bool&filter筛选，和must差不多，支持多条件
```
GET {index}/_search
{
  "query": {
    "bool": {
      "filter": [
        {
          "simple_query_string": {
          "query": "beautiful",
          "fields": ["title"]
        }},
        {
          "range": {
            "year": {
              "gte": 1990,
              "lte": 1992
            }
          }
        }
      ]
    }
  }
}
```
bool&should多条件之间是或者的关系, should内是或的关系
```
GET {index}/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "simple_query_string": {
          "query": "beautiful",
          "fields": ["title"]
        }},
        {
          "range": {
            "year": {
              "gte": 1990,
              "lte": 1992
            }
          }
        }
      ]
    }
  }
}
```

### agg 聚合查询

#### sum/avg/value_count/cardinality 查询

- sum - 求和
- avg - 平均数
- value_count : 计数
- cardinality : 非重复计数
```
GET {index}/_search
{
	"size": 0,  # 只返回聚合结果，默认为20，返回20条原数据, 0 代表不返回条目数据
  "aggs": {
    "FIELD_NAME": {  # 求和后的字段名称
      "sum": {
        "field": "price"
      }
    },
    # 可以进行多个查询
    ....
  }
}
```

#### stats - 查看数据类型的数据最大最小平均值等描述性信息
返回上方所有的聚合结果，返回数据的描述性信息
```
GET {index}/_search
{
  "aggs": {
    "{FIELD_NAME}": {  # 自定义字段名称
      "stats": {
        "field": "price"
      }
    }
  }
}

------
{
  "aggregations" : {
    "{FIELD_NAME}" : {
      "count" : 25,
      "min" : 0.0,
      "max" : 8.72154882E8,
      "avg" : 6.267083224E7,
      "sum" : 1.566770806E9
    }
  }
}
```

#### terms 对 filed 中的每个类型进行分组并统计每个类型出现的次数，类似于 groupby 然后count
嵌套达到groupby两个或多个字段并count的效果
```
GET {index}/_search
{
  "aggs": {
    "{FIELD_NAME}": {  # 自定义字段名称
      "terms": {
        "field": "author"
      }
    }
  }
}

--------
{
  "took" : 1,
  "timed_out" : false,
  "hits" : {
    "total" : {
      "value" : 2034,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  },
  "aggregations" : {
    "authors" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 2010,
      "buckets" : [
        {
          "key" : "多厘",
          "doc_count" : 5
        },
        {
          "key" : "鞠正诚",
          "doc_count" : 3
        },
        ...
        {
          "key" : "屠晨",
          "doc_count" : 2
        }
      ]
    }
  }
}
```
(todo) terms&terms 嵌套达到 groupby 两个或多个字段并 count 的效果
> 未通过实验性数据达到学习的结果

```
GET {index}/_search
{
  "size": 0,
  "aggs": {
    "NAME": {
      "terms": {
        "field": "title"
      },
      "aggs": {
        "NAME": {
          "terms": {
            "field": "price"
          }
        }
      }
    }
  }
}
```

#### terms & aggs & stats  - groupby后返回每个bucket指定字段的统计信息
```
GET employee/_search
{
  "size": 0, 
  "aggs": {
    "NAME": {
      "terms": {
        "field": "job"
      },
      "aggs": {
        "NAME": {
          "stats": {
            "field": "sal"
          }
        }
      }
    }
  }
}
```

#### top_hits  - 在top_hits指定 sort 参数达到返回按列排序的前几条数据
```
# top_hits & size & sort 返回按列排序后的前几条数据
GET employee/_search
{
  "size": 0,
  "aggs": {
    "NAME": {
      "top_hits": {
        "size": 2, 
        "sort": [
          {
            "age": {
              "order": "desc"
            }
          }
        ]
      }
    }
  }
}
```

#### range -  对数值进行分桶并计算每个bucket中的数量，指定 ranges 参数
```
# range对数值进行分组并对每个区间进行计数
GET employee/_search
{
  "size": 0,
  "aggs": {
    "NAME": {
      "range": {
        "field": "sal",
        "ranges": [
          {
            "key": "0-10000", 
            "to": 10001
          },
          {
            "key": "10000-20000", 
            "from": 10001, 
            "to": 20001
          },
          {
            "key": "20000-30000", 
            "from": 20001, 
            "to": 30001
          }
        ]
      }
    }
  }
}
```

#### histogram  - 按同样的区间对字段进行分组统计数量，指定 interval 步长即可
histogram 是对数值进行分区间，sep为固定值，并对每个区间进行计数
```
GET employee/_search
{
  "size": 0,
  "aggs": {
    "NAME": {
      "histogram": {
        "field": "sal",
        "interval": 10000
      }
    }
  }
}
```

#### min_bucket - 筛选平均工资最低的工种
```
GET employee/_search
{
  "size": 0,
  "aggs": {
    "NAME1": {
      "terms": {
        "field": "job"
      },
      "aggs": {
        "NAME2": {
          "avg": {
            "field": "sal"
          }
        }
      }
    },
    "NAME": {
      "min_bucket": {
        "buckets_path": "NAME1>NAME2"  # 这里为路径，按name指定
      }
    }
  }
}
```

#### range&avg - 先分组再计算组内平均值
```
GET employee/_search
{
  "size": 0,
  "aggs": {
    "NAME": {
      "range": {
        "field": "sal",
        "ranges": [
          {
            "key": "大于30", 
            "from": 30
          }
        ]
      },
      "aggs": {
        "NAME": {
          "avg": {
            "field": "sal"
          }
        }
      }
    }
  }
}
```

#### query&aggs - 先筛选再聚合
```
GET employee/_search
{
  "query": {
    "match": {
      "job": "java"
    }
  },
  "size": 0, 
  "aggs": {
    "NAME": {
      "stats": {
        "field": "sal"
      }
    }
  }
}

# 

```

#### 针对两次聚合不同数据源的聚合，aggs下分name后filter接下来再聚合
```
GET employee/_search
{
  "size": 0,
  "aggs": {
    "平均工资": {
      "avg": {
        "field": "sal"
      }
    },
    "筛选大于30": {
      "filter": {
        "range": {
          "age": {
            "gte": 30
          }
        }
      },
      "aggs": {
        "大于30平均工资": {
          "avg": {
            "field": "sal"
          }
        }
      }
    }
  }
}
```

### Suggest - 建议高亮

#### suggest - 搜索建议，针对未添加到索引中的文本
```
GET movies/_search
{
  "suggest": {
    "NAME": {
      "text": "beauti",
      "term": {
        "field": "title"
      }
    }
  }
}









```

#### suggest 搜索建议，设置不管在不在索引中都提供搜索建议，设置suggest_mode为always
```
GET movies/_search
{
  "suggest": {
    "NAME": {
      "text": "beauty",
      "term": {
        "field": "title",
        "suggest_mode":"always"  # 默认为missing，设置为popular为常见的建议
      }
    }
  }
}
```

#### completion - 自动补全功能的实现（首先要将mapping需要补全的字段类型设置为completion，然后在传入数据）
```
GET movies_completion/_search
{
  "_source": [""],  # 不显示其他字段内容，只显示匹配的title
  "suggest": {
    "NAME": {
      "prefix":"bea",  # 前缀为bea字段为title的自动补全
      "completion": {
        "field":"title"，
        "skip_duplicates":true， # 忽略重复值，返回唯一值
        "size":10  # 默认显示5条
      }
    }
  }
}
```

#### highlight - 高亮查询出来匹配的文本
```
GET movies/_search
{
  "query": {
    "multi_match": {
      "query": "romance",
      "fields": ["title", "genre"]
    }
  }, 
  "highlight": {
    "fields": {
      "title": {},
      "genre": {
        "pre_tags": "<span>",  # 定义查询出来的标签，默认标签为em
        "post_tags": "</span>"
      }
    }
  }
}
```

#### highlight&highlight_query - 实现对筛选后的结果再对其他字段再次筛选并进行高亮
```
GET movies/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {
          "year": 2012
        }},
        {"match": {
          "title": "romance"
        }}
      ]
    }
  },
  "highlight": {
    "fields": {
      "title": {},  # 这是直接高亮上方筛选中title中包含romance
      "genre": {
        "pre_tags": "<span>",
        "post_tags": "</span>",
        "highlight_query": {  # 对上层筛选出来的结果按children进行再次筛选并高亮
          "match": {
            "genre": "children"
          }
        }
      }
    }
  }
}
```

## _cat

### GET _cat/indices - 查看所有索引及基础信息
```
GET _cat/indices

---- result ----
{
  //...
    "12": {
    "health": "green",
    "status": "open",
    "index": "duoli-misc-canal",
    "uuid": "Xt2lk0WnRN-SKWgQo2YuvQ",
    "pri": "5",
    "rep": "0",
    "docs.count": "21",
    "docs.deleted": "0",
    "store.size": "27.4kb",
    "pri.store.size": "27.4kb"
  },
  //...
}
```

### GET _cat/nodes?v - 查看所有 node
```
GET _cat/nodes?v
ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role   master name
172.20.0.1           25          57   0    0.00    0.05     0.24 cdfhilmrstw *      node-1
```

### GET _cat/shards - 查看索引存放的shards
```
GET _cat/shards

duoli-misc-canal                          2 p STARTED         5   5.6kb 172.20.0.1 node-1
duoli-misc-canal                          4 p STARTED         5   5.7kb 172.20.0.1 node-1
duoli-misc-canal                          1 p STARTED         1   4.6kb 172.20.0.1 node-1
duoli-misc-canal                          3 p STARTED         2   4.9kb 172.20.0.1 node-1
```

### GET _cat/master?v - 查看主服务器信息

## {index} - 索引

### PUT {index} - 设置索引信息
定义mapping，一般es会自动创建mapping，可以先上传测试数据，然后删除索引修改 mapping 再创建，最后再上传数据
```
PUT duoli-misc-canal
{
  "mappings" : {
    "properties" : {
      "created_at" : {
        "type" : "date",
        "format" : "yyyy-MM-dd HH:mm:ss||epoch_millis"
      },
      "id" : {
        "type" : "long"
      },
      ...
      "title" : {
        "type" : "keyword"
      }
    }
  }
}
```

#### index : 是否开启索引
`index : false` 禁止索引
```
 "{FIELD_NAME}" : {
    "type" : "keyword",
    "index": false
}
```

#### type: keyword
**null_value : 查询空值**

需要在mapping指定null_value，查询空值直接查询指定的null_value，注意只能在keyword类型使用
```
 "{FIELD_NAME}" : {
    "type" : "keyword",
    "null_value": "null"
}
```

### GET {index} - 查看索引相关的配置信息
```
GET duoli-misc-canal
{
  "duoli-misc-canal" : {
    "aliases" : { },
    "mappings" : {
      ...
    },
    "settings" : {
      ...
    }
  }
}

```

### GET {index}/_mapping - 查看索引内的映射关系
```
GET /duoli-misc-canal/_mapping
{
  "duoli-misc-canal" : {
    "mappings" : {
      "properties" : {
        "created_at" : {
          "type" : "date",
          "format" : "yyyy-MM-dd HH:mm:ss||epoch_millis"
        },
        "id" : {
          "type" : "long"
        },
        ...
        "title" : {
          "type" : "keyword"
        }
      }
    }
  }
}
```


### PUT {index}/_doc/{id} - 写入单条数据
一般情况下, 创建内容的时候便会自动创建 mapping
```
# 写入单条数据
PUT duoli-misc-canal/_doc/22
{
		"id": 2,
		"title": "不同注册市场本站质量.比较新闻必须为什.工作更新的话关于项目简介完全.",
		"price": 2,
		"stock": 33,
		"stock_at": "2022-10-10 23:18:28",
		"created_at": "2022-10-12 23:18:28"
}
```

### POST {index}/_analyze - 分析当前的分词
```
POST /index/_analyze
{
  "text": "中国驻洛杉矶领事馆遭亚裔男子枪击 嫌犯已自首",
  "tokenizer": "ik_smart"
}
```

### DELETE {index} - 删除索引

### GET {index}/type/_validate/query?explain - 分析查询语句
复杂的语句可以先使用工具来分析下查询语句, 方便定位不合法的搜索以及原因 `explain` 参数可提供更详细的查询不合法的信息, 以便于错误的语法进行定位
```
GET /index/type/_validate/query?explain
{
  "query": {
     "match": {
       "content": "寒食"
     }
  }
}

---- result ----
{
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "valid" : true,       # valid 代表语句通过验证
  "explanations" : [
    {
      "index" : "duoli-misc-canal",
      "valid" : true,
      "explanation" : """+content:寒食 #MatchNoDocsQuery("")"""
    }
  ]
}
```

## GET _sql
使用 sql 语句进行查询
```
使用sql语句进行查询
GET _sql
{
  "query": """
  SELECT sum(AvgTicketPrice) agg_sum FROM "kibana_sample_data_flights" where DestCountry = 'US'
  """
}

# translate将SQL语句解析为es查询json
GET _sql/translate
{
  "query": """
  SELECT sum(AvgTicketPrice) agg_sum FROM "kibana_sample_data_flights" where DestCountry = 'US'
  """
}

# format参数可返回多种形式的结果（json、yaml、txt、csv等）默认json
GET _sql?format=csv
{
  "query": """
  SELECT AvgTicketPrice,Cancelled,DestCountry FROM "kibana_sample_data_flights" where DestCountry = 'US' limit 10
  """
}
```

## _cluster - 集群

### GET _cluster/health - 查看集群状态
```
GET _cluster/health
{
  "cluster_name" : "elasticsearch",
  "status" : "yellow",
  "timed_out" : false,
  "number_of_nodes" : 1,
  "number_of_data_nodes" : 1,
  "active_primary_shards" : 29,
  "active_shards" : 29,
  "relocating_shards" : 0,
  "initializing_shards" : 0,
  "unassigned_shards" : 4,
  "delayed_unassigned_shards" : 0,
  "number_of_pending_tasks" : 0,
  "number_of_in_flight_fetch" : 0,
  "task_max_waiting_in_queue_millis" : 0,
  "active_shards_percent_as_number" : 87.87878787878788
}
```

### GET _cluster/stats - 查看集群详细信息

### GET _cluster/settings - 查看集群配置

## 参考链接

- [ELK常用命令和语法_汪巡的博客](https://blog.csdn.net/m0_61192794/article/details/121169816)
- [https://www.jianshu.com/p/2d0bb009063d](https://www.jianshu.com/p/2d0bb009063d)

