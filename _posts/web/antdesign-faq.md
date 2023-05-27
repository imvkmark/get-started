# AntDesign FAQ

## 1. 设置语言为默认中文

查看文档 : [快速上手 -> 使用组件](https://ant.design/docs/react/getting-started-cn#2.-%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6)

这里注意的是

```javascript
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

// ...

const App = () => {
// ...
    return (
        <ConfigProvider locale={zhCN}>
            // ...
        </ConfigProvider>
    );
};
```

## 2. 修改主题色

修改主题色的时候有时候找不准颜色, 我们可以下载 antd 的官方代码, 然后从中找到需要的颜色内容.

