# 使用 ApiDoc 编写接口文档

[apidoc](http://apidocjs.com/)是一个 API 文档生成工具, apidoc 可以根据代码注释生成 web api 文档, apidoc 从注释生成静态 html 网页文档，不仅支持项目版本号，还支持
api 版本号, 项目约定使用此工具来生成接口文档<br />DemoUrl :  https://i.wulicode.com/docs/web/ 

## 安装

A). 系统需要安装 nodejs(略)<br />B). 安装 apidoc

```
# 有些系统需要sudo 权限来安装
$ npm install apidoc -g
```

C). 执行生成

```
# 这个文档的生成规则是
# apidoc
#      -i code_dir
#      -o output_dir
$ apidoc -i myapp/ -o apidoc/
# 对于项目中我们使用 laravel artisan 封装了一个函数
# 生成 api doc 文档
$ php artisan py-core:doc api
```

注意: 分组名不支持中文，可修改

## 使用

A) 生成文档

```
$ apidoc -i myapp/ -o doc/api [-c ./] -f ".*\.js$"
```

B) 项目配置写在 `package.json` 中

```json
{
    "apidoc": {
        "title": "接口文档",
        "url": "https://{domain}/",
        "version": "1.0.0"
    }
}
```

我们的配置存放在根目录 `package.json` 文件中.

## 参数说明和示例

`apidoc` 支持如下关键字：(下面 [ ]<br />中括号中表示是可选写的内容，使用时不用加 [ ] 中括号。)

```
@api {method} path [title]
    只有使用@api标注的注释块才会在解析之后生成文档，title会被解析为导航菜单(@apiGroup)下的小菜单
    method可以有空格，如{POST GET}
    
@apiGroup name
    分组名称，被解析为导航栏菜单
    
@apiName name
    接口名称，在同一个@apiGroup下，名称相同的@api通过@apiVersion区分，否者后面@api会覆盖前面定义的@api
    
@apiDescription text
    接口描述，支持html语法
    
@apiParam [(group)] [{type}] [field=defaultValue] [description]
    详细介绍见: http://apidocjs.com/#param-api-param
    
@apiQuery [{type}] [field=defaultValue] [description]
    Api Query, 查询字符串
    
@apiVersion verison
    接口版本，major.minor.patch的形式
    
@apiIgnore [hint]
    apidoc会忽略使用@apiIgnore标注的接口，hint为描述
    
@apiSampleRequest url
  接口测试地址以供测试，发送请求时，@api method必须为POST/GET等其中一种
  
@apiDefine name [title] [description]
    定义一个注释块(不包含@api)，配合@apiUse使用可以引入注释块
    在@apiDefine内部不可以使用@apiUse
    
@apiUse name
     引入一个@apiDefine的注释块
     
@apiHeader [(group)] [{type}] [field=defaultValue] [description]

@apiError [(group)] [{type}] field [description]

@apiSuccess [(group)] [{type}] field [description]
    用法基本类似，分别描述请求参数、头部，响应错误和成功
    group表示参数的分组，type表示类型(不能有空格)，入参可以定义默认值(不能有空格)，field上使用[]中扩号表示该参数是可选参数
    
@apiParamExample [{type}] [title] example

@apiHeaderExample [{type}] [title] example

@apiErrorExample [{type}] [title] example

@apiSuccessExample [{type}] [title] example
    用法完全一致，但是type表示的是example的语言类型
  example书写成什么样就会解析成什么样，所以最好是书写的时候注意格式化，(许多编辑器都有列模式，可以使用列模式快速对代码添加*号)
```

## 写法规范

### 参数对齐

```php
/**
 * @api                 {get} /api_prefix/check_verification [O]验证验证码
 * @apiVersion          1.0.0
 * @apiName             HomeCheckVerification
 * @apiGroup            Home
 * @apiQuery   {string} mobile       手机号
 * @apiQuery   {string} captcha      验证码
 */
public function checkVerification(){}
```

**参数支持范围定义**

```php
/**
* @api               {get} /api_prefix/apidoc/how ApiDoc编写示例
* @apiDescription    怎样写Apidoc
* @apiVersion        1.0.0
* @apiName           DemoApidocHow
* @apiGroup          Demo
* @apiQuery {int}            number         数值
* @apiQuery {int{100-999}}   number_range   数值范围
* @apiQuery {string}         string         字串
* @apiQuery {string{..5}}    string_mx      字串最大5
* @apiQuery {string{2..5}}   string_between 字串间隔
* @apiQuery {int{2..5}}      number_between 数值间隔
* @apiQuery {int=1,2,3,99}   number_select  数值间隔
* @apiQuery {string=banana,apple,ball} string_select  字串枚举
*/
public function how()
{
    return Resp::success('返回输入值', input());
}
```

### apiName 命名规范

apiName 的命名规范是 apiGroup + functionName; apiName 的写法规范是<br />首字母大写的驼峰模式 例如上面的命名规范是

```
apiGroup : Home
apiName  : HomeCheckVerification
```

### 返回值约定

- 数字类型, 需要转换成 `int` 类型(返回的 json 串中不需要有引号包裹)
- 文字类型的, 需要转换成 `string` 类型
- 返回值中不允许存在 `null`
- 是否返回采用 `Y/N` 来标识, 不采用 `0/1` 返回
- 资金/金额等带有小数的的返回采用 `string` 类型, 不要采用 `float` 类型
- id 采用 `int` 类型返回

### 返回值对齐

返回的类型值, 参数值, 说明必须对齐<br />返回的参数值和真正返回的内容值必须填写完整

```php
/**
 * @api                  {get} /api_prefix/version [O]检测新版本(Android)
 * @apiVersion           1.0.0
 * @apiName              HomeVersion
 * @apiGroup             Home
 * @apiQuery   {string}  version        版本号
 * @apiSuccess {string}  download_url   下载地址
 * @apiSuccess {string}  description    描述
 * @apiSuccess {string}  version        版本
 * @apiSuccessExample success
 * {
 *     "download_url": "http://domain.com/1.1.1.apk",
 *     "description": "修改bug若干, 增加微信支付功能",
 *     "version": "1.1.1"
 * }
 */
public function version()
```

## 其他说明

A). 接口命名

```
lists      => 列表
establish  => 创建/编辑
delete     => 删除
```

B). 参数命名 参数采用蛇形写法命名, 采用有意义的命名方式, 并且尽量简短<br />C). 路由命名 路由的名称和所在分组还有函数名进行匹配, 使用蛇形写法

```php
/**
 * @api                 {get} /api_prefix/bank/lists [O][B]银行账户列表
 * @apiVersion          1.0.0
 * @apiName             UserBankList
 * @apiGroup            User
 * @apiSuccess {string} id                  账号ID
 * @apiSuccess {string} bank_account        账号信息
 * @apiSuccess {string} bank_true_name      真实姓名
 * @apiSuccess {string} bank_type           账号类型 : 支付宝
 * @apiSuccess {string} note                备注
 * @apiSuccessExample  success
 *  [
 *      {
 *          "id": 2,
 *          "bank_account": "123123123",
 *          "bank_true_name": "二狗",
 *          "bank_type": "支付宝",
 *          "note": ""
 *      }
 *  ]
 */
public function lists()
```

这里的命名是 `{module}:{type}.{Ctrl}.{method}`<br />D). 自营的接口无特殊返回不需要填写说明, 只返回 data 的数据即可<br />E). 接口中只能返回有意义的数据
没有用到的数据不需要返回, 数据返回越少,<br />出现问题的可能性就越小<br />F). 列表为空也需要返回分页<br />G). 如果有多个返回示例可以在注释中编写多个<br />例如:

```php
/**
 * .....
 * @apiSuccessExample type:ali_h5
 * {
 *     "h5_link": "https://openapi.alipay.com/......version=1.0",
 *     "order_no": "CHARGE201903291158246007129"
 * }
 * @apiSuccessExample type:ali_app
 * {
 *     "param": "alipay_sdk=alipay-sdk-p...D",
 *     "order_no": "CHARGE201903291158246007129"
 * }
 */
```

这里有两个返回, 一个是 支付宝 H5 (`ali_h5`)的返回,<br />一个是支付宝 App(`ali_app`) 的返回, 根据不用的类型来返回数据,<br />如果没有默认是成功,
这里的值应该是 `success`.

## 修正历史

- 2022-04-01 : 版本更新, 加入apiQuery 示例
- 2022-03-28 : 移动到博客, 并加入示例
- 2021-02-01 : 增加枚举类型的写法
- 2019-03-29 : 增加接口返回的说明标识
- 2018-08-04 : 接口返回值做了下变更, 是否采用 Y/N 返回
- 2017-02-03 : 根据易代练的版本做了第一版的整理

