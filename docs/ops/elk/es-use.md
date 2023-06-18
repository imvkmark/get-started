---
title: "Es 使用"
date: 2021-02-07 23:16:49
toc: true
categories:
- ["开发","Es"]
---

From 澎涛




# index


### create

PUT `/<index>`


### delete

PUT `/<index>`


### 查看


#### 查看所有

GET `/_cat/indices`


#### 查看指定

GET `/_cat/indices/<index>`


## _doc


### 创建


#### post

POST `/<index>/_doc`

- api params
```json
{
    // 文档内容
}
```


#### put

**put方式需指定id**

PUT `/<index>/_doc/<id>`


### 修改


#### put

PUT `/<index>/_doc/<id>`

**同put方式创建,put方式修改,会覆盖掉原的所有字段**, 如只想修改某个字段的值, 该方式则不能满足


#### post

- POST `/<index>/_doc/<id>`

**该方式与put相同,会覆盖掉原的字段**

- POST `/<index>/_update/<id>`
- params
```json
{
    "doc": {
        // 需要修改的数据
    }
}
```

**该方式只会修改指定的字段, 不会覆盖所有字段**


### 删除


#### delete

DELETE `/<index>/_doc/<id>`


### 查询


#### 请求方式

- GET `/<index>/_search`
- GET `/_search`
- POST `/<index>/_search`
- POST `/_search`


#### 常用查询参数

查询参数,有**地址传递**和**请求体(body)传递**两种方式,此处只介绍body方式

- `query`
   - 查询条件
- `from`
   - 偏移量,默认为0
- `size`
   - 每页条数限制
- `_source`

需要查询返回的字段
- `sort`
   - 排序


### 复合查询条件


#### bool

基于布尔条件的匹配查询, 基于一个或多个布尔条件构建, 可能出现的类型有:

| 类型 | 描述 |
| --- | --- |
| must | 查询结果必须全部符合查询条件,并给查询结果`计算分值`, 每个子条件的关系相当于`AND` |
| must_not | 与must查询的结果相反,相当于`NOT`, 与must不同,`分数将会被省略` |
| should | 查询结果符合任意一个查询条件即可, 相当于`OR` |
| filter | 结果必须符合全部与must不同点是忽略`分数` |


- must

以下语句,只会搜索出 `name:3333, sex:female`的用户, 并计算分值

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name": "3333"
          }
        },
        {
          "match": {
            "sex": "female"
          }
        }
      ]
    }
  }, 
  "_source": [
      "scores.*",
      "name"
  ]
}
```

- filter (不计算分值)

```json
{
  "query": {
    "bool": {
      "filter": [
        {
          "match": {
            "name": "3333"
          }
        },
        {
          "match": {
            "sex": "female"
          }
        }
      ]
    }
  }, 
}
```

- should

搜索`name:乌拉`或者`sex:female`, 计算分值

```json
GET /search/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "name": "乌拉"
          }
        },
        {
          "match": {
            "sex": "female"
          }
        }
      ]
    }
  }
}
```

- must_not

搜索`name!=乌拉`并且`sex!=female`的数据, 计算分值

```json
{
  "query": {
    "bool": {
      "must_not": [
        {
          "match": {
            "name": "乌拉"
          }
        },
        {
          "match": {
            "sex": "female"
          }
        }
      ]
    }
  }
}
```

- **多种条件复合使用**

搜索`sex:male`并且`name:3333 或者name:乌拉`的数据.

以下两种写法皆可实现, 注意嵌套写法的`层级关系`

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "sex": "male"
          }
        },
        {
          "match": {
            "name": "乌拉 3333" // 多个关键词空格分隔
          }
        }
      ]
    }
  }
}
```

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "sex": "male"
          }
        },
        {
          "bool": {
            "should": [
              {
                "match": {
                  "name": "3333"
                }
              },
              {
                "match": {
                  "name": "乌拉"
                }
              }
            ]
          }
        }
      ]
    }
  }
}
```


#### boostring

<a name="constant_score"></a>
#### constant_score


#### dis_max

<a name="function_score"></a>
#### function_score


#### query_string 方式查询

使用`query_string`拼接查询条件, **注意AND|OR的大小写形式**

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "query_string": {
            "query": "sex:male AND ( name:3333 OR name:乌拉)"
          }
        }
      ]
    }
  }
}
```


### 全文查询


#### match 全文检索

返回与关键词(**文本,数字,日期,布尔**)匹配的文档,

```json
{
  "query": {
   "match": {
     "name": "乌拉"
   }
  }
}
```


#### match_phase 处理分词


#### term 词条查询

查找包含指定字段中**精确匹配**查询字符串的文档。

- **exists** 返回包含指定字段的文档

```json
GET /search/_search
{
  "query": {
    "exists": {
      "field": "name"
    }
  }
}
```

- **ids** 根据ids查询文档

```json
{
  "query": {
    "ids": {
      "values": [1, 2]
    }
  }
}
```

- **range** 根据数据范围查询文档

```json
{
  "query": {
    "range": {
      "scores.math": {
        "lt": 80
      }
    }
  }
}
```

- **term** 根据词条准确查找(价格,id...)

**不要使用`term`对`text`字段进行查询, 要搜索`text`字段,是用`match`查询**

```json
{
  "query": {
   "term": {
     "sex": {
       "value": "male"
     }
   }
  }
}
```

- **terms** 根据多个词条进行精确查找

```json
{
  "query": {
   "terms": {
     "scores.math": [
       "60",
       "120"
     ]
   }
  }
}
```

- **wildcard通配符查询**

```json
{
  "query": {
    "wildcard": {
      "name": {
        "value": "*拉"
      }
    }
  }
}
```

- **关键词准确搜索**

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "name.keyword": {
              "value": "乌拉"
            }
          }
        }
      ]
    }
  }
}
```

