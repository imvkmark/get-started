# 基于 Umi 的最佳实践

- 本项目使用 yarn 进行包管理
- 全局安装的命令为 jsdoc

## 目录结构以及解释

### 目录结构

```
├── build           # 打包目录
├── config          # 配置目录
│   ├── config.dev.js
│   ├── config.js
│   └── ...
├── docs            # 文档目录
│   ├── html
│   └── jsdoc.json
├── jsconfig.json   # IDE 的代码提示 @/
├── package.json    # 版本以及依赖文件
├── public          # 附加到 public 目录 的文件
│   └── robots.txt
└── src
    ├── assets      # 资源文件
    │   ├── images  # 图片文件
    │   └── less    # 样式文件
    │       ├── style.less   # 样式主文件
    │       └── ...
    ├── build.md    # 版本定义说明
    ├── layout      # 布局文件夹
    │   └── index.js
    ├── models      # 模型文件, 用户全局的数据管理
    │   └── poppy.js
    ├── pages       # 所有页面
    ├── services    # api 服务定义页面
    │   └── poppy.js
    └── utils       # util 包, 多个项目内容应该一致
        ├── conf.js              # 配置
        ├── request.js           # 基于 axios 的请求
        ├── routes.js            # 路由定义
        ├── ui                   # UI 部件
        │   └── IconFont.js      # IconFont 字体
        └── util.js              # 辅助功能
```

### 配置文件

```jsx
import { defineConfig } from "umi";

export default defineConfig({
    // 打包路径
    outputPath: "build/proj-test",
    define: {
        // 定义的URL被覆盖
        "process.env.API_URL": "https://t.proj.domain.com",
    },
});
```

配置中使用的变量说明, 其他变量间 umi 官方文档

```jsx
export default defineConfig({
    // ...
    define: {
        // 版本号, 取 package.json 中的版本
        "process.env.VERSION": version,
        // 接口请求主地址, 尾部不包含斜线
        "process.env.API_URL": process.env.API_URL || "",
        // 打包环境, 用户 sentry 提交错误对应正确的环境
        "process.env.UMI_ENV": process.env.UMI_ENV || "",
    },
});
```

### 打包以及运行说明

命令放置在 package.json 文件中

```bash
# 运行本地环境（参考package.json启动其他环境）
$ yarn start:test
# 构建测试环境（参考package.json构建其他环境）
$ yarn build:dev
```

- UMI_ENV : 代表的是运行环境, 可以在配置中取到相应的文件并进行相应的处理

```json
{
    "scripts": {
        "start:test": "cross-env UMI_ENV=test yarn umi-dev",
        "build:test": "cross-env UMI_ENV=test umi build"
    }
}
```

打包出来的路径为 `build/proj-test`

### 文档

文档使用的 jsdoc. 这里的配置文件使用的是 `ink-docstrap`模板, 配置如下使用如下命令生成

```shell
$ jsdoc -c docs/jsdoc.json
```

```json
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": [
            "jsdoc",
            "closure"
        ]
    },
    "source": {
        "include": [
            "./src/",
            "README.md"
        ],
        "exclude": [],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": [],
    "opts": {
        "template": "./node_modules/ink-docstrap/template",
        "encoding": "utf8",
        "destination": "./docs/html",
        "recurse": true
    }
}
```

### 版本定义

项目版本放在 version 中, 每次上线或者切换分支的时候都需要更新, 便于后端进行统计*package.json*

```json
{
    "name": "proj-mobile",
    "version": "1.1.0"
}
```

### 服务的定义以及使用

使用 api 作为前缀, 便于区分

```jsx
/**
 * 国别码
 */
export function apiPamLogin(params) {
    return request({
        url: "/api_v1/system/pam/login",
        method: "post",
        data: params,
    });
}
```

使用

```jsx
apiPamLogin({ passport: country + "-" + mobile, captcha: captcha })
    .then((resp, status, message, data) => {
        // resp    : 包含完整的请求结果
        // status  : 错误码信息
        // data    : data 中的数据
        // message : 返回的信息
    });
```

### 模型的定义以及说明

### 模型定义

```jsx
import { Toast } from "antd-mobile";
import { apiAreaCountry } from "@/services/poppy";
import { storageKey } from "@/utils/conf";
import { sessionStore } from "@/utils/util";

const poppyModel = {
    namespace: "poppy",
    state: {
        // 1. 初始数据值
        countryCode: [],
    },
    effects: {
        // 2. 定义的请求
        * reqAreaCountry({ payload: params }, { call, put }) {
            // 3. 获取数据
            let storeData = sessionStore(storageKey.PY_AREA_COUNTRY);
            if (!storeData) {
                // apiAreaCountry 在 模型中的使用, 参数可以在第二个参数传入
                const { data, success, message: msg } = yield call(apiAreaCountry, {});
                if (success && data) {
                    sessionStore(storageKey.PY_AREA_COUNTRY, data);
                    storeData = data;
                } else {
                    Toast.fail(msg);
                }
            }
            // 4. 更新数据
            yield put({
                type: "UPDATE_COUNTRY_CODE",
                payload: {
                    countryCode: storeData,
                },
            });
        },
    },
    reducers: {
        // 5. 将数据写入 redux store 中
        UPDATE_COUNTRY_CODE: (state, { payload }) => {
            return {
                ...state,
                ...{
                    countryCode: payload.countryCode,
                },
            };
        },
    },
};
export default poppyModel;
```

### 数据的调用

```jsx
import React, { Component } from 'react';
import $ from 'jquery';
import { CloseCircleOutlined } from '@ant-design/icons'
import BScroll from 'better-scroll';
import { get } from 'lodash-es';
import { connect } from 'umi';

// 1. 连接 store
@connect(({ poppy }) => {
    return {
        countryCode: poppy.countryCode
    }
})
class CountryCode extends Component {
    scroll = '';
    touch = {};

    constructor(props) {
        super(props);
        this.state = {
            list: {},
            alphaList: []
        }
    }

    componentDidMount() {
        // 2. 触发数据更新
        // 这里的 dispatch 必须使用 store 之后才可以触发, 毕竟读取的是store 里边的数据
        this.props.dispatch({
            type: 'poppy/reqAreaCountry'
        })
    }

    // 3. 接收数据更新
    static getDerivedStateFromProps(nextProps, prevState) {
        const countryCode = get(nextProps, 'countryCode');
        const alphaList = get(prevState, 'alphaList');
        if (countryCode && alphaList.length === 0) {
            return CountryCode.initList(countryCode)
        }
        return null;
    }

    static initList(countryCode) {
        let alpha_li = [];
        let list_li = {};
        countryCode.length > 0 && countryCode.forEach((item) => {
            let key = item['py'];
            alpha_li.push(key);
            list_li[key] = list_li[key] ? list_li[key].concat(item) : [item];
        })
        return {
            alphaList: [...new Set(alpha_li)],
            list: list_li
        }
    }

    render() {
        const { list, alphaList } = this.state;
        return (
            // 数据渲染
            ''
        );
    }
}

export default CountryCode;
```