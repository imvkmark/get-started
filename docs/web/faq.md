# Web - FAQ

## 开发

### Error: ResizeObserver loop limit exceeded 问题

> 发现一个报错 ResizeObserver loop limit exceeded，这个报错是在公司平台项目监听系统中提示的，而浏览器的 console 中却没有提示

![](https://file.wulicode.com/note/2021/10-22/11-57-04280.png)

![](https://file.wulicode.com/note/2021/10-22/11-57-30934.png)

如果要在本地开发中调试定位这个问题，可以在项目代码里加入一个方法，在控制台中输出这个错误：

```
window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, error) {
    console.log('错误', errorMessage);
};
```

对于一些说法是这个错误可以给予忽略

![](https://file.wulicode.com/note/2021/10-22/11-57-49526.png)

参考地址 : https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded

## IDE

### 不支持 nodejs 等语法提示和补全

下载 node 语法库(使用最常用的工具来安装即可)

```shell
$ yarn add @types/node -D
```

## Http

### Get 的最大的限制字符数

如果使用的是GET方法，则最多限制为2,048个字符，减去实际路径中的字符数。但是，POST方法不受用于提交名称/值对的URL大小的限制。这些 `KV对` 在报头中传输，而不是在URL中传输。

- [Maximum URL length is 2,083 characters in Internet Explorer](https://support.microsoft.com/en-us/topic/maximum-url-length-is-2-083-characters-in-internet-explorer-174e7c8a-6666-f4e0-6fd6-908b53c12246)