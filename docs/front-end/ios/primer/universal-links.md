---
description: 'iOS通用链接（Universal Links）需在Xcode启用Associated Domains，配置域名并上传apple-app-site-association文件至服务器，工程内添加处理方法。注意微信支付等场景需配合AppleCDN配置。'
lastUpdated: '2026-06-30 22:19:07'
head:
  - - meta
    - name: 'og:title'
      content: 'iOS 通用链接 Universal Links'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'iOS通用链接（Universal Links）需在Xcode启用Associated Domains，配置域名并上传apple-app-site-association文件至服务器，工程内添加处理方法。注意微信支付等场景需配合AppleCDN配置。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/ios/primer/universal-links.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/724ad88c12acf148a4355c0f4445e24c.png'
---
# iOS 通用链接 Universal Links

在 iOS9 之前，要在浏览器中唤醒 APP，我们通常使用 scheme。这种方式需要提前判断系统中是否安装了能够响应此 scheme 的 app，并且这种方式在微信被禁用。

- Universal Links 可以链接到您应用中的内容并安全地共享数据. 当用户点击 Universal Links 时，iOS 会将链接直接重定向到您的应用程序，而无需通过 Safari 或您的网站进行路由。此外，由于 Universal Links 是标准 HTTP 或 HTTPS 链接，因此一个 URL 既适用于您的网站，也适用于您的应用程序。如果未安装您的应用程序，则系统会在 Safari 中打开 URL，以使您的网站能够处理它。当用户安装您的应用程序时，iOS 会检查存储在 Web 服务器上的文件，以验证您的网站是否允许您的应用程序代表其打开 URL。只有您才能将此文件存储在服务器上，以确保网站和应用程序之间的关联。
- UIKit 应用程序可以通过通用链接进行通信。支持通用链接的功能允许其他应用直接将少量数据发送到您的应用，而无需使用第三方服务器。

> 设置支持 Universal Links 你必须有一个支持 https 的域名

## 官方说明

请按照以下步骤将您的应用和网站相关联以获取 Universal Links：

- 将添加 [Associated Domains Entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_associated-domains) 到您的应用。使用 applinks 服务前缀包含您的应用程序将支持的所有域。请参阅[添加关联的域权利](https://developer.apple.com/documentation/safariservices/supporting_associated_domains#3001207)。
- 将 Apple App Site Association 文件添加到您的网站。请参阅[添加 Apple App Site Association 文件](https://developer.apple.com/documentation/safariservices/supporting_associated_domains#3001215)。
- 将 applinks 密钥添加到 Apple App Site Association 文件中。指定每个应用程序将处理的网站部分。

以上是从苹果文档翻译而来。

## 具体操作

### 启用 Associated Domains

登录苹果开发者后台，在设置证书的页面找到 Identifiers -> App ID（设置包名）里，在对应的 BundleId 下勾选 Associated Domains 如下图

![](https://file.wulicode.com/feishu-images/724ad88c12acf148a4355c0f4445e24c.png)

### 在 Xcode(11)里面添加 Associated Domains

按照图中的步骤添加好 Universal Links

![](https://file.wulicode.com/feishu-images/335e780353d757374a4ca236f36d5e37.png)

注意点:在 Associated Domains 里面配置的 Universal Links 必须要以 applinks:开头，后面写上域名，例如

```Objective-C
applinks:www.apple.com
```

### 配置 apple-app-site-association

自己创建一个名叫 apple-app-site-association 的 json 格式文件，**注意文件命不需要添加的后缀。**

```JSON
{
        "applinks": {
                "apps": [],
                "details": [
                        {
                                "appID": "ZJ9LQ7SV4M.net.mixinkeji.mixin",
                                "paths": ["*"]
                        }
                ]
        }
}
```

- details– 键的值添加为字典数组的 JSON 表示，每个应用程序一个字典。对于每个特定于应用程序的词典(上面就表示了同一个 teamid 下的 4 个不同的应用)，包括和 键：appID paths
- appID– 将处理格式为的链接的应用程序的标识 TeamIdentifier.bundleidentifier(开发者账号 teamID.app 的 bundle identifier)。
- paths– 应用程序支持的网站各个部分，以路径字符串数组形式指定。只有这些指定的路径的链接，才能被 app 所处理，\*符号写法代表了可识别域名下所有链接。

### 上传到服务器

上传 apple-app-site-association 到服务器(服务器需要支持 https)上传 apple-app-site-association 文件到域名的根目录或者.well-known 子目录下能打开 https:///apple-app-site-association 或 https:///.well-known/apple-app-site-association 当我们的 App 在设备上第一次运行时，如果支持 Associated Domains 功能，那么 iOS 会自动去获取域名下的 apple-app-site-association 文件上传成功后，我们可以用苹果提供的[验证网址](https://search.developer.apple.com/appsearch-validation-tool/)来直接验证 apple-app-site-association 设置是否生效。注意事项 ：

- iOS 9.2 之前，不用跨域都可以跳转， iOS 9.2 之后，必须跨域才能进行跳转到原生 app 上。
- iOS 只会在 App 第一次启动时请求一次 apple-app-site-association 文件，服务器上该文件的更新不会让 iOS 本地的文件同步更新。

### 工程中添加处理方法

现在用户点击我们配置的域名下的匹配的链接,直接可以进我们的 app 了。但是，如果想要能够获取到用户进来的链接,根据链接来处理，需要展示给用户的信息，那么需要在工程里的 AppDelegate 里实现方法。

```Objective-C
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler
{
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        NSURL *webpageURL = userActivity.webpageURL;
        NSString *host = webpageURL.host;
        if ([host isEqualToString:@"apple..com"]) {
            //进行我们需要的处理
        }
        else {
            [[UIApplication sharedApplication]openURL:webpageURL];
        }
    }
    return YES;
}
```

当 userActivity 是 NSUserActivityTypeBrowsingWeb 类型, 则意味着它是由 Universal Links 进来,也就是处理逻辑的时候。

## 注意事项

### 微信支付配置

**微信支付流程**

![](https://file.wulicode.com/feishu-images/d63ab4c2309cec8c8178a5962a0a71e6.png)

ios 中的相关配置

在 xcode 的 info.plist 里面配置一下，配置如下图

![](https://file.wulicode.com/feishu-images/ac44b902db2e3cc8c10b84e93031cfed.png)

**向微信注册你的应用程序 id 和 Universal Links**

在开发者应用登记页面 进行登记，登记并选择移动应用进行设置后，将获得 AppID，可立即用于开发。但应用登记完成后还需要提交审核，只有审核通过的应用才能正式发布使用。

配置的地方如下图所示

![](https://file.wulicode.com/feishu-images/d5592f82e9b24c9aff713a2e6001b3c2.png)

微信中提供的 UniversalLink 就是放在服务器上文件的地址

### AppleCDN

在服务器上存在AppleCDN 对服务器的请求

```Plain Text
agent : AASA-BOT/1.0.0
method=GET path="/.well-known/apple-app-site-association"
```

这代表 apple 服务器依旧对我们服务器发送相关的请求, 可能和 apple 验证我们的 schema 文件有关系, 所以建议的解决方案就是存在这两个文件并且内容保持一致

```Plain Text
/apple-app-site-association
/.well-known/apple-app-site-association
```

**参考**

- [Requests to /.well-known/apple-app… | Apple Developer Forums](https://developer.apple.com/forums/thread/43342)
- [RFC 5785: Defining Well-Known Uniform Resource Identifiers (URIs) (rfc-editor.org)](https://www.rfc-editor.org/rfc/rfc5785)