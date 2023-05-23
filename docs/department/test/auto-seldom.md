# 接口自动化测试框架 Seldom

## 安装

参考 : [https://pipenv.pypa.io/en/latest/](https://pipenv.pypa.io/en/latest/), 安装使用 pipenv 进行环境管理和版本管理

```
$ pip install pipenv
$ pipenv install --pypi-mirror <https://mirrors.aliyun.com/pypi/simple/> --skip-lock
...
Installing dependencies from Pipfile.lock (c5e5dd)...
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
```

设置 pycharm 的运行环境 Preferences | Project: {project-name} | Python Interpreter, 设置 Python Interpreter , 为刚刚安装的虚拟环境的目录

![image.png](https://file.wulicode.com/yuque/202304/28/17/2509lvxPmx6u.png?x-oss-process=image/resize,h_85)

## 文件目录和规范

### 文件树

```
.
├── Pipfile                 # 环境文件
├── README.md               # Readme
├── __init__.py
├── assets                  # 资源文件
├── poppy                   # 框架方法定义
│   ├── api_url.py
│   ├── fake.py
│   ├── params.py
│   └── system
│       ├── __init__.py
│       ├── captcha.py
│       └── user_login.py
├── reports                 # 报告
├── run.py                  # 支持环境的运行
├── test.py                 # 测试运行
├── test.py.sample
└── tests                   # 测试文件
    ├── 1-base              # 基础
    │   ├── __init__.py
    │   └── test_sign.py    # 基础 - 验证签名
    ........
```

### tests 文件命名规范

### 文件命名

文件名称参考 tests/1-base/test_sign.py说明:

```
tests/
1-base/          #  1 可以约定执行顺序外并无其他用途
test_sign.py     # 文件名需要以 test_ 作为前缀, 来作为自动化执行的遍历(框架约定)
```

### class 命名

例如上面的 tests/1-base/test_sign.py , class 类名应当为 TestBaseSignclass 名称组合示例

```
tests/1-base/test_sign.py
TestBaseSign
Base : 文件夹名称的驼峰模式
Sign : 文件名称的驼峰模式(去除test)
```

### 方法命名

方法需要以 test_ 作为函数前缀

```python
class TestBaseSign(seldom.TestCase):
    """
    测试用例查询
    """
    def test_secret(self):
        """
        项目不使用签名也可以进行访问
        """
        self.post(PySystem.authLogin, data={
            "_py_secret": cache.get('_py_secret')
        })
        self.assertStatusCode(200)
```

## 编写请求

因为请求继承自 requests, 所以传递的参数遵循 requests
约定 [Developer Interface — Requests 2.28.1 documentation](https://requests.readthedocs.io/en/latest/api/#requests.request)

### 编写 http 请求

```python
# getself.get("<http://httpbin.org/get>", params=payload)
# postself.get("<http://httpbin.org/post>", data=payload)
```

### 编写 request 请求

对于当前版本来讲, get 请求可能返回乱码, 所以可以用 requests 替代

```python
def test_pc(self, _, url):
    """
    测试 Pc
    """
    resp = requests.get(Seldom.base_url + url))
    self.assertTrue(resp.status_code, 200)
```

因为 requests 返回的内容和 seldom 框架不一致, 需要用 requests 提供的方法进行校验

```python
>>> r = requests.get('<https://api.github.com/user>', auth=('user', 'pass'))
>>> r.status_code200
>>> r.headers
['content-type']'application/json; charset=utf8'
>>> r.encoding
'utf-8'
>>> r.text
'{"type":"User"...'
>>> r.json()
{'private_gists': 419, 'total_private_repos': 77, ...}
```

## 运行

### 运行单个测试

虽然 seldom 继承了 unittest, 但是直接在 ide 中运行单元测试则会丢失 seldom 的使用便捷性, 所以不允许使用 ide 进行代码运行复制 test.py.sample并重命名为 test.py,
可以调整 seldom.main 的参数来运行单个例子:
使用方法参考: [快速开始 | seldom文档](https://seldomqa.github.io/getting-started/quick_start.html#main-%E6%96%B9%E6%B3%95)

```python
if __name__ == "__main__":
    # 清理缓存
    cache.clear()
    # 设置 secret
    cache.set({
        '_device_id': '11223344',
        '_device_type': 'webapp',
    })
    # 执行测试用例目录
    seldom.main(
        case="tests.1-base.test_sign.TestBaseSign",
        base_url="<http://poppy.duoli.com>",
        title="Poppy 接口测试",
        tester="多厘",
        language="zh-CN",
        # debug=True,
        description="基本的接口测试"
    )
```

运行方式

```
$ python test.py
```

### 运行环境测试

在开发过程中, 我们不可避免的会对不同的环境进行完整测试, 这里用到了 seldom 的 [平台化支持 | seldom文档](https://seldomqa.github.io/platform/platform.html)
我们可以在注释中添加 @label(’prod’) 来区分运行环境

如果这里存在 @data , 则 label 应当在贴近函数的定义

```python
from seldom import label

class TestSeoProdOther(seldom.TestCase):
    """
    测试其他蜘蛛的访问
    """

    
    @label('prod')
    @label('dev')
    def test_link_has_wechat_link(self):
        """
        通用链接验证
        """
        self.get(url)
        self.assertStatusCode(200, f"{_}地址不存在")
```

运行

```
$ python run.py --env dev
```

### 日志

如果需要手动对日志进行记录则需要使用函数 logging

```python
import logging
import seldom

class KfList(seldom.TestCase):
    """
    售后客服列表/中介微信客服列表
    """

    def test_after_sales_kf_list(self):
        """
        售后客服列表
        """
        self.post(UrlMisc.afterSalesKfList, headers=x_headers(), params=x_params({}))

        # 这里需要有条件进行判定
        logging.warning('未配置, 需要进行手工测试')

        # 验证接口请求是否成功
        self.assertStatusCode(200)
        self.assertPath("status", 0)
```

## 断言

断言继承与 unittest, 这里做一个简单的说明

### seldom.case(框架断言)

```
assertAlertText
assertElement
assertInPath
assertInTitle
assertInUrl
assertJSON
     断言接口返回的某部分数据
assertNotElement
assertNotText
assertPath
     是基于 jmespath 实现的断言
assertSchema
assertStatusCode
assertText
assertTitle
assertUrl
```

### unittest

| 方法                  | 检查对象                 | 引入版本 |
|---------------------|----------------------|------|
| assertEqual         | a == b               |      |
| assertNotEqual      | a != b               |      |
| assertTrue          | bool(x) is True      |      |
| assertFalse         | bool(x) is False     |      |
| assertIs            | a is b               | 3.1  |
| assertIsNot         | a is not b           | 3.1  |
| assertIsNone        | x is None            | 3.1  |
| assertIsNotNone     | x is not None        | 3.1  |
| assertIn            | a in b               | 3.1  |
| assertNotIn         | a not in b           | 3.1  |
| assertIsInstance    | isinstance(a, b)     | 3.2  |
| assertNotIsInstance | not isinstance(a, b) | 3.2  |

| 方法                | 用作比较                                          | 引入版本 |
|-------------------|-----------------------------------------------|------|
| assertRaises      | fun(*args, **kwds) 引发了 exc                    |      |
| assertRaisesRegex | fun(*args, **kwds) 引发了 exc 并且消息可与正则表达式 r 相匹配  | 3.1  |
| assertWarns       | fun(*args, **kwds) 引发了 warn                   | 3.2  |
| assertWarnsRegex  | fun(*args, **kwds) 引发了 warn 并且消息可与正则表达式 r 相匹配 | 3.2  |
| assertLogs        | with 代码块在 logger 上使用了最小的 level 级别写入日志         | 3.4  |
| assertNoLogs      | with 代码块没有在                                   | 3.10 |

| 方法                   | 用作比较                       | 引入版本 |
|----------------------|----------------------------|------|
| assertAlmostEqual    | round(a-b, 7) == 0         |      |
| assertNotAlmostEqual | round(a-b, 7) != 0         |      |
| assertGreater        | a > b                      | 3.1  |
| assertGreaterEqual   | a >= b                     | 3.1  |
| assertLess           | a < b                      | 3.1  |
| assertLessEqual      | a <= b                     | 3.1  |
| assertRegex          | r.search(s)                | 3.1  |
| assertNotRegex       | not r.search(s)            | 3.2  |
| assertCountEqual     | a 和 b 具有同样数量的相同元素，无论其顺序如何。 | 3.2  |

| 方法                   | 用作比较 | 引入版本 |
|----------------------|------|------|
| assertMultiLineEqual | 字符串  | 3.1  |
| assertSequenceEqual  | 序列   | 3.1  |
| assertListEqual      | 列表   | 3.1  |
| assertTupleEqual     | 元组   | 3.1  |
| assertSetEqual       | 集合   | 3.1  |
| assertDictEqual      | 字典   | 3.1  |

## 相关框架

- jmespath(路径提取) : [JMESPath Specification](https://jmespath.org/specification.html)
- faker(假数据): [Faker 15.0.0 documentation](https://faker.readthedocs.io/en/master/)
- pydash : [pydash 5.1.1 documentation](https://pydash.readthedocs.io/en/latest/)
- jsonschema: [https://json-schema.org/learn/](https://json-schema.org/learn/)

