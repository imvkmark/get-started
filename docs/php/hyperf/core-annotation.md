# 注解

![](https://file.wulicode.com/doc/20230508/1683539592503.png)

这个图是基于丝路项目的流程逻辑, 并不和下边的类相符, 下边的类是用 Hyperf 原生进行定义的

## 注解

### Class 注解

注解是将一系列的数据进行关联的一种方式类的注解以及生成的数据(全部)

```
array(2) {
  ["App\Service\AnClass\ClassAllIn"]=>
  object(App\Annotation\AnClass)#25 (1) {
    ["name"]=>
    string(5) "allin"
  }
  ["App\Service\AnClass\ClassQ"]=>
  object(App\Annotation\AnClass)#49 (1) {
    ["name"]=>
    string(1) "q"
  }
}
```

这里有一个注解类, 两个注解实现类这里表明注册在 class 中可用, 传入的参数代表可以将参数初始化到 公共变量中, 在变量初始化的时候是进行如此设定的

```php
# file : AbstractAnnotation.php
# 初始化
public function __construct($value = null)
{
    if (is_array($value)) {
        foreach ($value as $key => $val) {
            if (property_exists($this, $key)) {
                $this->{$key} = $val;
            }
        }
    }
}
```

```php
# file : ClassQ.php
# 使用
/**
 * @AnClass(name="q")
 */
class ClassQ
{
}
```

注解的传参 : Url : [Hyperf](https://hyperf.wiki/2.2/#/zh-cn/annotation?id=%E6%B3%A8%E8%A7%A3%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92)

- 传递主要的单个参数 `@DemoAnnotation("value")`
- 传递字符串参数 `@DemoAnnotation(key1="value1", key2="value2")`
- 传递数组参数 `@DemoAnnotation(key={"value1", "value2"})`

```php
/**
 * @Annotation
 * @Target({"CLASS"})
 */
class AnClass extends AbstractAnnotation
{
    public string $name = '';
}
```

### property (属性)

将属性/方法/定义传参

```php
[
  [
    ["class"]=> "App\Service\Annotation\PropertyAllIn"
    ["property"]=> "actionName"
    ["annotation"]=>
      object(App\Annotation\AnProperty)#22 (1) {
        ["name"]=>  "allin"
      }
  ]
]
```

### Method(方法)

```php
[
  "App\Annotation\AnMethodByParams"=>
    object(App\Annotation\AnMethodByParams)#24 (2) {
    ["method"]=> "allin"
    ["params"]=> [
      [0]=>  string(2) "id"
    ]
  }
]
```

## 注解的分类

切面单独独立出来

### @Annotation 注解的标识

### @Target 注解的解析位置 CLASS, METHOD, PROPERTY, ALL

### @Constants 常量数据

### @Inject 标记属性, Hyperf 会自动注入对应的对象和值

### *@*AutoController **以及控制器相关的代码 路由的注解

```
@Controller : 表明当前类是一个控制器类 
@RequestMapping(path=“index”, methods=“get,post”) : 定义路由访问, 路径是控制器 + 当前定义的 path
@GetMapping : Get 方法
@PostMapping : Post 
@PutMapping : Put
@PatchMapping : Patch 方法(对资源进行部分修改) 
@DeleteMapping : Delete 删除
```

### @Controller 生成控制器

> 这里出现了一个问题, 等待官方的回复 , 是关于自动生成路径的 https://github.com/hyperf/hyperf/issues/5123
>

### @Listener