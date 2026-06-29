---
description: '该配置包含Framework层参数（如分页、消息模板、标题、描述、前缀）和核心设置（apidoc项目、JWT密钥、缓存、演示模式及环境变量：本地、测试、开发、生产）。'
lastUpdated: '2026-06-29 22:48:05'
head:
  - - meta
    - name: 'og:title'
      content: '配置'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该配置包含Framework层参数（如分页、消息模板、标题、描述、前缀）和核心设置（apidoc项目、JWT密钥、缓存、演示模式及环境变量：本地、测试、开发、生产）。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/3.x/framework/config.html'
---
# 配置

> 文件位置 config/poppy.php

## Framework 配置

配置 key 为 `framework`

### page_size

default : 15

列表默认的分页条数, 默认 15 条

影响继承了Poppy，如果需要修改分页条数可以在控制器给`$this->pagesize`赋值

### page_max

default: 3000

列表默认的最大分页条数，默认3000条

影响继承了Poppy

### message_template

default : []

根据执行内容显示不同的视图模板(例成功/失败)

接收视图地址 如 `module::xx.folder.message`   可支持多个视图地址

### title

default : ‘网站名称’

默认的网站名称, 作为默认信息会注入到 view 视图的 `$_title`  中

### description

default : ‘网站描述’

默认的网站描述信息, 作为默认信息会注入到 view 视图的 `$_description`  中

### prefix

default : ‘mgr-page’

后台的入口地址，默认mgr-page

## 核心 配置

配置 key 为 `core`

### apidoc

接口文档生成配置, 使用命令 `php artisan py-core:doc api` 生成, 访问 `/mgr-page/develop` 查看生成的接口文档

```Plaintext
/*
|--------------------------------------------------------------------------
| 接口文档的定义
|--------------------------------------------------------------------------
| 需要运行 `php artisan py-core:doc api` 来生成技术文档
*/
'apidoc' => [
    'web' => [
        'title'       => '前台接口',
        'method'      => 'post',
        'default_url' => 'api_v1/system/auth/login',

        'sign_certificate' => [
            [
                'name'        => 'timestamp',
                'title'       => 'TimeStamp',
                'type'        => 'String',
                'is_required' => 'N',   // 是否必须加密（Y/N）
                'default'     => DefaultApiSignProvider::timestamp(),
            ],
        ],
        'sign_generate'    => DefaultApiSignProvider::js(), // js加密算法
    ],
],
```

控制器方法需按 apidoc 格式添加代码注释

## 项目

项目的 `.env` 文件配置, 文件遵循 laravel 配置, 这里只列出框架需要注意的配置项目

### jwt-secret

项目中使用 jwt 进行项目授权, 必须要生成 `JWT_SECRET`

```Plaintext
$ php artisan jwt:secret
```

### cache

项目中缓存约定支持 redis, 不使用可能会导致部分功能不可用

```Plaintext
CACHE_DRIVER=redis
```

### 演示模式

演示模式下不允许修改主账号账密

```Plaintext
IS_DEMO=true
```

### env

框架对 env 环境的约定,

```Plaintext
# local|本地;test|测试;development|开发;production|生产
APP_ENV=local
```