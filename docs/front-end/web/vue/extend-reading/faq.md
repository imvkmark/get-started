---
description: 'Vue常见问题FAQ：解决globalThis及低版本手机白屏；组件自动加载、移除console日志、开发环境HTTPS证书；组件名需多词；路由新窗口打开；服务端缓存致前端数据不更新；CSS变量、TypeScript导入错误、scoped影响子元素；proxy代理注意、路由死循环、store中commit不触发变更。'
lastUpdated: '2026-06-30 17:06:00'
head:
  - - meta
    - name: 'og:title'
      content: 'Vue - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Vue常见问题FAQ：解决globalThis及低版本手机白屏；组件自动加载、移除console日志、开发环境HTTPS证书；组件名需多词；路由新窗口打开；服务端缓存致前端数据不更新；CSS变量、TypeScript导入错误、scoped影响子元素；proxy代理注意、路由死循环、store中commit不触发变更。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/web/vue/extend-reading/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/1fff6ab991190ea2af26d962f892357f.png'
---
# Vue - FAQ

## 解决 globalThis 的问题

> 基本结构能加载出来但是页面不会发起其他网络请求。用 vConsole 调试也看不到报错，最后安卓开发同事调试才发现报错

参考 : [解决浏览器端 globalThis is not defined 报错](https://juejin.cn/post/7022929947933179917)

**解决方案**

在 `<head>` 中加入

```HTML
<script>
    this.globalThis || (this.globalThis = this);
</script>
```

## 在低版本手机上出现白屏的问题

> 在低版本手机上访问页面需要对代码打包进行 es2015 转义

```TypeScript
// ...
build: {
    target: "es2015";
}
// ...
```

## 组件的自动加载

使用

[https://github.com/antfu/unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

> 自动加载的弱项 如果组件使用自动加载也可以, 但是需要自动引入 app.use(Comp) 这种方式, 并在配置文件中加入 components 全部加载的弱项 全部加载会在打包的时候 minify 会解析所有的 css 样式, 导致时间过长 (10min+)

```JavaScript
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver, ElementPlusResolver, VantResolver } from "unplugin-vue-components/resolvers";
export default defineConfig(({ mode }) => {
  return {
    // ...
    plugins: [
      // ...
      Components({
        resolvers: [AntDesignVueResolver(), ElementPlusResolver(), VantResolver()],
        dts: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
      // ...
    ],
    // ...
  };
});
```

对于个别组件是函数式写法的, `unplugin-vue-components` 无法自动引入对应的样式, 因此需要手动引入样式 [引入函数组件的样式 - Vant 4 (vant-ui.github.io)](https://vant-ui.github.io/vant/#/zh-CN/quickstart%234.-yin-ru-han-shu-zu-jian-de-yang-shi)

```JavaScript
// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';
```

## 移除 console 日志

打包启用 terser, 配置 tersor 的选项

```JavaScript
export default defineConfig(({ mode }) => {
        return {
                build: {
                        // ...
                        minify: "terser",
                        terserOptions: {
                                compress: {
                                        drop_console: true,
                                },
                        },
                },
        };
});
```

## 为开发环境提供 https 证书

在开发的时候有时候需要 https 证书(例如浏览器通知需要在 https 证书下才可以打开)插件 :[vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert#readme)安装插件

```Plaintext
yarn add vite-plugin-mkcert -D
```

配置证书

```TypeScript
import {defineConfig} from'vite'
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true
  },
  plugins: [mkcert()]
})
```

## Component name “XXX“ should always be multi-word

找到根目录下的 `.eslintrc.js`, 加入如下行, 对于文件名不是多文件名称的可以关闭提示

```Plaintext
module.exports = {
   ...
   rules: {
    ...
+     'vue/multi-word-component-names': 'off',
    ...
   }
   ...
 };
```

## vue router 新窗口打开页面

```JavaScript
const { href } = router.resolve({ name: 'pc.chat' });
window.open(href, "_blank");
```

## 因为命中服务端缓存导致前端无法渲染出来重新打包的数据

1. 不缓存 html 数据, 每次打开 html 数据都是最新的(服务端设定)
2. 保证入口文件每次打包都是唯一的名称值

```JavaScript
const timestamp = Math.floor(Date.now() / 1000);
return {
                build: {
                    rollupOptions: {
                        output: {
                            entryFileNames: 'assets/[name]-' + timestamp + '-[hash].js'
                        }
                    }
                }
}
```

## **vue 项目中的 css 变量**

对于 vue3 + vite 项目, 使用 var 变量来替代 less 中的变量

## **Typescript: IDE reports TS2307: Cannot find module error for Vue components imports**

在 `src` 目录下添加 `vue-shim.d.ts` 文件, 文件内容如下

```TypeScript
declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}
```

## 引入文件不存在

> [plugin:vite:import-analysis] Failed to resolve import “./views/Home” from “src.js”. Does the file exist?

解决办法

写代码引入 `.vue` 文件不加后缀，现在vite分析器要这个后缀导致！

所以,我们引用的时候，需要更改增加 vue 后缀

```Plaintext
- import Home from './views/Home'
+ import Home from './views/Home.vue'
```

参考地址 : [https://www.cnblogs.com/hy999/p/vue-vite-import01.html](https://www.cnblogs.com/hy999/p/vue-vite-import01.html)

## scoped 使用对子元素的影响

> 使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式

地址 : [子组件的根元素](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%E6%A0%B9%E5%85%83%E7%B4%A0)

![](https://file.wulicode.com/feishu-images/1fff6ab991190ea2af26d962f892357f.png)

## Vue 使用代理(proxy) 注意

- [devServer.proxy](https://cli.vuejs.org/zh/config/#devserver-proxy)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#proxycontext-config)

首先记录两个地址, 在 vue/vue-cli/axios 中经常会遇到代理以及请求的问题, 为了这个, 我们需要设置代理服务器等信息便于开发调试注意, 在设置 axios 的 baseUrl 之后 proxy 就不可用了. 需要注意这一点

```JavaScript
// 这里设置代理, 根据环境来设定
const baseUrl = "development" === process.env.NODE_ENV ? "/api" : process.env.VUE_APP_URL;
```

## 路由死循环

```Plaintext
vue-router.esm.js?8c4f:2257 RangeError: Maximum call stack size exceeded
    at JSON.stringify (<anonymous>)
    at eval (vuex-persistedstate.es.js?0e44:1)
    at eval (vuex-persistedstate.es.js?0e44:1)
    at eval (vuex.esm.js?2f62:472)
    at Array.forEach (<anonymous>)
    at Store.commit (vuex.esm.js?2f62:472)
    at Store.boundCommit [as commit] (vuex.esm.js?2f62:409)
    at Object.vue__WEBPACK_IMPORTED_MODULE_0__.default.$hideLoading (use.js?2e7e:13)
    at eval (router.js?41cb:141)
    at iterator (vue-router.esm.js?8c4f:2300)
```

## store 中使用 commit 无法触发数据的变更

流程: 初始化 -> 网络请求 -> 调用 muation 修改数据不会触发 store 数据的变更, 在页面中使用 computed 的时候数据无法获取到数据, 在 action 则可