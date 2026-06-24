---
description: '组件 : https://github.com/intlify/vue-i18n-next文档 : https://vue-i18n.intlify.dev/定义 i18n, 返回 i18n 实例在 vue 中的引入位置 : src/locales加载文件夹下的所有的文件, 这里用到了 vue3 的 glob 导入, 这里引入所有的模块, 所以第二个参数将 { eager: true } 会立即加载所有的文件, 否则会是动态导入的index.ts 文件的内容如下所示这里加载的值内容是根据加载的语言模块内容处理, 这里使用到了 浏览器的语言变量, 是一个在 B'
lastUpdated: '2025-12-18 18:43:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'i18n 在 vue3 中的实现'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '组件 : https://github.com/intlify/vue-i18n-next文档 : https://vue-i18n.intlify.dev/定义 i18n, 返回 i18n 实例在 vue 中的引入位置 : src/locales加载文件夹下的所有的文件, 这里用到了 vue3 的 glob 导入, 这里引入所有的模块, 所以第二个参数将 { eager: true } 会立即加载所有的文件, 否则会是动态导入的index.ts 文件的内容如下所示这里加载的值内容是根据加载的语言模块内容处理, 这里使用到了 浏览器的语言变量, 是一个在 B'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/javascript/vue/vue3-i18n.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/7d/7d9d167a187dfe1bbf9c1085851445e3.png?x-oss-process=image/resize,m_mfit,w_400'
---
# i18n 在 vue3 中的实现



> 通过对 TDesign 的代码阅读弄懂 i18n在 vue 中的实现, 通过导入加载完成多语言在前端的实现

组件 : [intlify/vue-i18n-next](https://github.com/intlify/vue-i18n-next)

文档 : [https://vue-i18n.intlify.dev/](https://vue-i18n.intlify.dev/)

![](https://file.wulicode.com/notion/7d/7d9d167a187dfe1bbf9c1085851445e3.png)

## 创建 i18n 实例

### 创建实例并应用

定义 i18n, 返回 i18n 实例

```typescript
// src/locales/index.ts
export const i18n = createI18n({
    // 传统模式
    legacy: false,   
    // 当前的语言模式
    locale: localStorage.getItem(localeConfigKey) || browserLanguage || 'zh_CN',
    // 无匹配语言模式的默认语言模式
    fallbackLocale: 'zh_CN',
    // 所有的 
    messages: importMessages.value,
    // 全局注入, 可以使用 $ 开始的变量
    globalInjection: true,
});
export default i18n;
```

在 vue 中的引入

```typescript
// src/main.ts
import i18n from './locales';
app.use(i18n);
```

## locales 语言加载

### 文件目录

位置 :  `src/locales`

```
.
├── index.ts       // 定义 i18n
├── lang           // 语言目录
│   ├── en_US
│   │   ├── components.ts
│   │   ├── index.ts
│   │   ├── layout.ts
│   │   └── pages
│   │       ├── ...
│   │       └── user.ts
│   └── zh_CN
│       ├── components.ts
│       ├── index.ts
│       ├── layout.ts
│       └── pages
│           ├── ...
│           └── user.ts
└── useLocale.ts   // 便捷的函数
```

### 加载步骤

加载文件夹下的所有的文件, 这里用到了 [vue3 的 glob 导入](https://cn.vitejs.dev/guide/features#glob-import), 这里引入所有的模块, 所以第二个参数将  `{ eager: true }`  会立即加载所有的文件, 否则会是动态导入的

```typescript
const langModules = import.meta.glob('./lang/*/index.ts', { eager: true });
```

index.ts 文件的内容如下所示

```typescript
export default {
  lang: "English",
  layout,
  pages,
};
```

这里加载的值内容是

```json
{
  "./lang/en_US/index.ts": {
    "default": {
      "lang": "English",
      "layout": {
        "header": {
          "code": "Code Repository",
          "...": "...",
          "setting": "Setting"
        }
      },
      "pages": {
        "user": {
          "markDay": "Good afternoon, today marks your 100th day at Tencent",
          "personalInfo": {
            "title": "Personal Info",
            "position": "Employee of the Hong Kong and Macau Business Expansion team",
            "desc": {
              "phone": "Phone"
            }
          }
        }
      }
    }
  }
}
```

根据加载的语言模块内容处理, 这里使用到了 浏览器的语言变量, 是一个在 [BCP47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) 中定义的语言字符串
🔗 [Navigator.language](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/language)


```typescript
// 语言定义存储
const langModuleMap = new Map<string, Object>();

// 语言代码
const langCode: Array<string> = [];

// 本地配置KEY
const localeConfigKey = 'tdesign-starter-locale';

// 浏览器语言
const browserLanguage = navigator.language.replace('-', '_');
```

对语言进行处理

```typescript
// 获取到所有路径
const fullPaths = Object.keys(langModules);
fullPaths.forEach((fullPath) => {
    // fullPath : ./lang/en_US/index.ts
    const k = fullPath.replace('./lang', '');
    const startIndex = 1;
    const lastIndex = k.lastIndexOf('/');
    const code = k.substring(startIndex, lastIndex);
    // langCode ['en_US']
    langCode.push(code);
    langModuleMap.set(code, langModules[fullPath]);
});
```

对拿到的语言包进行遍历, 得到和 vue-i18n 相匹配的格式

```typescript
const importMessages = computed(() => {
    const message: Recordable = {};
    langModuleMap.forEach((value: any, key) => {
        message[key] = value.default;
    });
    return message;
});
```

## useLocale 便捷函数定义

```typescript
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// 引入定义的 KEY 以及对象
import { i18n, langCode, localeConfigKey } from '@/locales';

export function useLocale() {
    // 获取 locale
    const { locale } = useI18n({ useScope: 'global' });

    // 改变 locale 并存储
    function changeLocale(lang: string) {
        // 如果切换的语言不在对应语言文件里则默认为简体中文
        if (!langCode.includes(lang)) {
            lang = 'zh_CN';
        }

        locale.value = lang;
        localStorage.setItem(localeConfigKey, lang);
    }

    // 获取指定的 KEY 内容, 指定语言变量的
    const getComponentsLocale = computed(() => {
        return i18n.global.getLocaleMessage(locale.value).componentsLocale;
    });

    return {
        changeLocale,
        getComponentsLocale,
        locale,
    };
}
```

## 使用

在 vue 中的使用, 直接使用  `$t`  函数, 这个函数在定义中被全局注入, 所以可以直接使用

```html
<t-step-item
    :title="$t('pages.detailBase.changelog.step3.title')"
    :content="$t('pages.detailBase.changelog.step3.desc')"/>
```

在 script 中使用, 这里已用 locales 中定义的 i18n

```html
<script setup lang="ts">
  import { t } from '@/locales';

  const BASE_INFO_DATA = [
      {
          name: t('constants.contract.name'),
          value: '总部办公用品采购项目',
          type: null,
      }
  ]
</script>
```

