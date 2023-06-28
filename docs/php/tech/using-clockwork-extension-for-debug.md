# 「译」在 web 应用中集成 chrome 的 clockwork 插件

原文地址: [Integrating Chrome’s Clockwork into your web-app](http://hotcashew.com/2013/12/integrating-chromes-clockwork-custom-web-app/)

## 在 开发者工具 中查看 clockwork 插件

[chrome clockwork 下载地址](https://chrome.google.com/webstore/detail/clockwork/dmggabnehkmmfmdffgajcflpdjlnoemp)

![](https://file.wulicode.com/note/2021/11-11/15-54-51705.png)

Clockwork 是个很帅的工具, 他能运行在任何服务端的平台/框架, 我会带你在你的 php 应用中集成这个插件.

## Part.1 安装

**使用 Composer 安装**

- 在 `composer.json` 添加 `“itsgoingd/clockwork”: “dev-master”`
- 运行 `composer.phar update`更新

**下载安装**

作为另外一种替代方式, 你可以使用最古老的方式来下载 或者 克隆 ` https://github.com/itsgoingd/clockwork/ ` 来安装

## Part.2: 和 Web App 集成

讲这个函数库放在你的项目的调用的范围内, 最好和 `controller/router` 放到一块, `header()`方法需要在未输出任何内容的前提下使用这个函数, 这个方法会告知 `Clockwork`
插件来向服务端请求 clockwork 数据.

最后两行 `resolveRequest()` 和 `storeRequest()` 必须在你 的 web app 执行完成之后运行, 否则不会出现完整的调用日志, 每个 DataSource 都需要有 `resolve()` 方法,
这个方法在每个数据源执行的时候进行调用. 这个会分析和保存所有的执行时间, 查询, 日志来供 `Clockwork` 调用.

```
// this sends out headers, so unless you are buffering output
// you may want to place this early in your app
$clockwork = new Clockwork();
header("X-Clockwork-Id: " . $clockwork->getRequest()->id);
header("X-Clockwork-Version: " . Clockwork::VERSION);
// spawn your own custom DataSource (explained below)
$clockwork->addDataSource(new YourCustomDataSource($yourAppContext));
// attach a sample datasource that comes with
// the Clockwork library (grabs session info, etc)
$clockwork->addDataSource(new PhpDataSource());
// we could write a custom APC, MemCached, etc here
// or just use the FileStorage that comes with Clockwork
$clockwork->setStorage(new FileStorage("some/path/"));
// run your web-app here
// ...
// once your app is done, tell Clockwork to resolve and store
// data in a file on your server; it will call the resolve()
// method on YourCustomDataSource and PhpDataSource
$clockwork->resolveRequest();
$clockwork->storeRequest();
```

这会在 `some/path/` 目录下创建一个新文件.

在页面加载完成之后, Chrome 的 Clockwork 扩展获取 `X-Clockwork` 的头信息, 并且向服务器发送一条请求来获取生成的文件, 这个文件的 `id` 值会存在服务器返回的 `header`
中, 这个 `header` 的标识符是 `X-Clockwork-Id`.

例如: 如果 `X-Clockwork-Id` 是 `1387208177.8923.1394938488`, 然后 Chrome 的 Clockwork 扩展会请求 `/__clockwork/1387208177.8923.1394938488` 这个地址来获取服务器存储的
json 文件.

你可以通过处理 `/__clockwork/[*:id]` 这个请求来返回这个插件所需要的数据.

```
$storage = new FileStorage("/some/path/");
$data = $storage->retrieve($ctx->parameters->id);
$data->toJson();
```

`Klein` 或者 `AltoRouter` 路由类能够处理类似于以上的语法, 并且通过控制器文件来获取 request-id, 否则的话你可以通过 `$_SERVER[‘REQUEST_URI’]` 来手动的获取
request-id , 然后 `FileStorage` 将会处理后边的事情.

## Part.3: 自定义数据源

```
class YourCustomDataSource extends DataSource
{
	protected $context;
	/**
	 * YourAppContext should link to your main web-app
         * and fetch timings, queries, and logs
	 */
	function __construct(YourAppContext $context)
	{
		$this->context = $context;
	}
	/**
	 * the entry-point. called by Clockwork itself.
	 */
	function resolve(Request $request)
	{
		$timings = $this->context->getTimings();
		// optionally: pre-sort the timeline
		uasort($timeline, function($a, $b) {
			if($a['start'] > $b['start'])
				return 1;
			if($a['start'] == $b['start']) {
				if($a['end'] > $b['end'])
					return 1;
				elseif ($a['end'] < $b['end'])
					return -1;
				return 0;
			}
			return -1;
		});
		$queries = $this->context->getQueries();
		$request->timelineData = $timeline;
		$request->databaseQueries = $queries;
		return $request;
	}
}
```

例如:

```
$timings[0] = ['start' => 1387208058.1, 'end' => 1387208058.5, 'duration' => 40, 'description' => 'parsing tweets']
```

`start` 和 `end` 标签使用 秒 作为单位, `duration` 使用毫秒作为单位,  `start` 和 `end` 标签的时间乘以 1000 ($_SERVER[‘REQUEST_TIME_FLOAT’] * 1000) .
所以使用 `microtime(true)` 作为时间相对单位好于从 0 开始

```
$queries[0] = ['query' => "SELECT awesomeness FROM cereals WHERE name = `Captain Crunch`", 'duration' => 13]
```

这里放了一条查询数据库的语句, 仅供参考, 时间以毫秒记.

更多开发见 [clockwork development-notes](https://github.com/itsgoingd/clockwork/wiki/Development-notes)

### Url 重写

这里使用了路由机制使插件访问服务器, 而且地址和请求方式都是写好在 代码中的, 所以需要在服务器中配置重写, 对于不是单入口和不支持路由访问的来说, 需要配置 url 重写

Nginx:

```
server{
    ...
    rewrite ^/__clockwork/(.*)$ somefile.php?id=$1
    ...
}
```

Apache: vhosts 模式

```
<VirtualHost *:80>
    ServerAdmin admin@qq.com
    DocumentRoot "/var/www/project"
    ServerName project.test.com
    ErrorLog "logs/project.test.com-error.log"
    CustomLog "logs/project.test.com-access.log" common
    RewriteEngine on
    RewriteRule ^/__clockwork/(.*)$   /extend/debug.php?action=cw&id=$1
</VirtualHost>
```


