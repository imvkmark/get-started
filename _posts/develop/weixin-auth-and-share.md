---
title: "微信公众号获取授权"
date: 2021-02-02 23:15:08
toc: true
categories:
- ["开发","微信"]
---

## 微信公众号通过 js 获取配置

微信 JSSDK 官方文档：[https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)

需要添加公众号白名单



```json
{
    "errcode": 40164,
    "errmsg": "invalid ip 118.190.42.90 ipv6 ::ffff:118.190.42.90, not in whitelist rid: 60196b9b-4c5ba79c-066b49c8"
}
```
添加白名的位置 : `开发 -> 基本配置 -> 公众号开发信息 -> IP白名单` 

PHP 代码吊起
```json
$appId     = sys_setting('cash.wx_service_app_id');
$appSecret = sys_setting('cash.wx_service_app_secret');
self::$instance = Factory::officialAccount([
    'app_id' => $appId,
    'secret' => $appSecret,
]);
$config = $Official->jssdk->buildConfig([])
```

## 微信公众号 OAuth 获取

### 发起用户授权

请求微信地址 [https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect](https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect)

返回 code

[**REDIRECT_URI**](https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect)

返回的URL 形如
```
REDIRECT_URI?code=091MY61w31vBNV2TZ01w3Q5yeu4MY61V&state=STATE
```
这里注意的地址是授权回调域名, 否则回调的域名不正确

[**SCOPE**](https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect)

关于 scope 的授权参考这里 : [https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
> 1、以snsapi_base为scope发起的网页授权，是用来获取进入页面的用户的openid的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）
> 2、以snsapi_userinfo为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。


**STATE**

> 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节


### 通过 code 获取用户OpenID

- 服务端请求微信地址[https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code](https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code)
- 成功返回里面带有openid
- 给前端返回openid


## 微信进行朋友圈分享和转发分享仅仅能够分享链接的原因
1，在公众号菜单中的链接打开，才能正常分享卡片；

2，可以通过收藏链接，再打开分享也是卡片；

3，把链接换成二维码，扫码后进入分享也是卡片。
> 但是 : 如果是用微信直接打开链接分享会是链接

