---
title: "[转] 几分钟实现 PHP 登录 QQ，支付宝等网站"
date: 2022-04-20 19:01:11
toc: true
categories:
  - [ "Php","扩展" ]
---

原文地址: [几分钟实现 PHP 登录 QQ，支付宝等网站](https://blog.haitun.me/selenium-login-qq/)

### 小记

这一阵在做一个小东西，用 fiddler 抓包分析之后，发现 QQ 旗下的东西只要集成了一键登录的业务，Cookie 里面会有一个登录状态的会话标识
skey，去请求业务的时候带上 skey 就行了。

github 搜索一通，模拟登录 QQ 有 python 实现，V8 解析 JS 的实现。

https://github.com/LeoHuang2015/qqloginjs

本来作为一个有追求的人，应该自己用 PHP 实现 QQ 登录密码加密过程的，但想到 QQ 登录 JS 改下加密规则，我就要跟着改，太累。我核心需求只是要一个账号的
Cookie 而已，就放弃了，还是以不变应万变吧。

### 性感的 selenium

最终选择 selenium 来实现，结果使用过程真是不要太爽，几行代码就搞定了。。。感谢 github 上大家的轮子。

使用 FaceBook 家 PHP 驱动 selenium 的包，  https://github.com/facebook/php-webdriver

大家如果用到 php-webdriver，有个小细节要注意，

如果报这个错：
> The path to the driver executable must be set by the webdriver.chrome.driver system property; for more information,
> see  https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver . The latest version can be downloaded
> from [http://chromedriver.storage.googleapis.com/index.html]()

要让设置浏览器的驱动程序路径，其实是因为你没有这个驱动，这个不是浏览器，是需要专门下载的。
去 https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver   找到 chromedriver
的下载地址   https://sites.google.com/a/chromium.org/chromedriver/downloads

放到 selenium jar 包的同级目录

贴个小代码：

```
namespace App\Helpers;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\WebDriverBy;
class QQHelper
{
    static protected $users=[];
    static protected $cookieJar;
    static protected $host = 'http://localhost:4444/wd/hub';
    static protected $driver;
    static protected $loginUrl='http://ui.ptlogin2.qq.com/cgi-bin/login?style=9&pt_ttype=1&appid=549000929&pt_no_auth=1&pt_wxtest=1&daid=5&s_url=https%3A%2F%2Fh5.qzone.qq.com%2Fmqzone%2Findex';
    static public function login(){
        self::$driver = RemoteWebDriver::create(self::$host, DesiredCapabilities::chrome(),5000);
        self::$driver->get(self::$loginUrl);
        self::$driver->findElement(WebDriverBy::id('guideSkip'))->click();
        self::$driver->findElement(WebDriverBy::id("u"))->sendKeys('10000');//账号
        self::$driver->findElement(WebDriverBy::id("p"))->sendKeys('password');//密码
        self::$driver->findElement(WebDriverBy::id('go'))->click();
        self::$cookieJar=self::$driver->manage()->getCookies();
        print_r(self::$cookieJar);
        //self::$driver->quit();
    }
}
```

### 演示

![](https://file.wulicode.com/note/topic/qq-auto-login/demo.gif#)

### 小结

selenium 是真真实实开浏览器去浏览，所以并发性能极差，在大规模的场景下是不可以使用的，所以我们要取长补短，用 selenium 突破 JS
实现比较复杂的地方，用 curl，Gouttle，Guzzle，这些东西去实现高并发。

selenium 虽然用法简单，但用处极大，有兴趣的同学可以玩玩。

