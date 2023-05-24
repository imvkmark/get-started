# favicon 简要说明

个人认为, 如果不是对 icon 要求特别高可以在 header 中放置一个 png 即可

```html

<link rel="icon" type="image/png" href="/assets/icon/favicon.png"/>
```

## 浏览器中使用

**favicon.ico**

ico 格式是多个不同尺寸图标(最常使用的是 16×16 和 32×32，Mac OS X 有时使用 64×64 和 128×128)整合在一起的, 某些浏览器在访问网站的时候会自动发出一个请求给到后端,
来请求这个图标, 一般这个图标会放置在根目录下的 favicon.ico 文件

资料: [Favicon](https://zh.wikipedia.org/wiki/Favicon)

例如 : Firefox

![image.png](https://file.wulicode.com/yuque/202304/20/17/2948KLvwzyn9.png?x-oss-process=image/resize,h_129)

所以我们建议设置一个图标的位置, 一边我们更好的管理

```html

<link rel="icon" href="./assets/icon/favicon.ico"/>
```

_png icons_

对于现代浏览器, 他们同样也支持 png 的图标, 以便于显示在不同使用场景, 例如我的导航

例如 : Opera(用户使用场景较少)

![image.png](https://file.wulicode.com/yuque/202304/20/17/2948CVsKfRre.png?x-oss-process=image/resize,h_852)

这样, 这个图标的大小是不满足使用的, 我们可以使用

```html

<link rel="icon" type="image/png" href="/assets/icon/favicon.png"/>
```

在填写了 png 图片后, 取消掉 favicon.ico 图标代码, Edge (V8 引擎) 可以正常显示图标

![image.png](https://file.wulicode.com/yuque/202304/20/17/2949xDn93uQ4.png?x-oss-process=image/resize,h_325)

而且在 firefox 浏览器中也未发现 ico 格式的请求

![image.png](https://file.wulicode.com/yuque/202304/20/17/2949fjzdTP1O.png?x-oss-process=image/resize,h_118)

并且在 safri 浏览器中也是支持的

![image.png](https://file.wulicode.com/yuque/202304/20/17/29492vLEi3P1.png?x-oss-process=image/resize,h_338)

Android : 小米

![image.png](https://file.wulicode.com/yuque/202304/20/17/29496WdxBBoR.png?x-oss-process=image/resize,h_813)

iOS :

![image.png](https://file.wulicode.com/yuque/202304/20/17/2950Mem8pDak.png?x-oss-process=image/resize,h_811)

当然对于不同的图标, 在不同的浏览场景下也会区分不同的分辨率, 在 icon 属性中可以定义不同的类型,
以便浏览器选择最合适的图片大小 [链接类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types), [sizes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#attr-sizes)

定义一个在用户界面上代表这个页面的资源，通常是一个图标（包括声音和图像） media, type and sizes 属性允许浏览器选择其上下文中最合适的图标.如果多种资源符合条件，浏览器会选择最后一个。

在树型序列中，由于这些属性只是提示, 并且这这些资源在进一步检查时可能是不适合的,浏览器可能选择另一个适合的.

Note: 苹果 iOS 不支持此链接类型, 也不支持 sizes 属性, 就像其他移动端浏览器一样，为了 Web Clip 或者启动点位符选择一个页面图标。分别可使用不是标准方法的
apple-touch-icon 和 apple-touch-startup-image 替代.

在之前，经常可以看到 shortcut,但他不是标准的，应该不再使用。

**代码**[https://github.com/imvkmark/html-get-started/blob/master/link/favicon.html](https://github.com/imvkmark/html-get-started/blob/master/link/favicon.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <link rel="icon" type="image/png" href="assets/icon/favicon.png"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Empty Icon Test</title>
</head>
<body>
仅仅有 PNG ICON
<br>
在 Edge 浏览器上不生效
</body>
</html>
```

## Favicon 的生成

推荐网站 : [Favicon Generator. For real.](https://realfavicongenerator.net/)

![](https://file.wulicode.com/yuque/202304/20/17/2950UDngjJuT.png)

## 参考

- [详细介绍 HTML favicon 尺寸 格式 制作等相关知识](https://www.zhangxinxu.com/wordpress/2019/06/html-favicon-size-ico-generator/)
- [微信自定义分享链接信息](https://segmentfault.com/a/1190000012860070)

