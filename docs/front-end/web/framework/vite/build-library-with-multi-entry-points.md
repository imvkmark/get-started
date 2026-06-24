---
description: '本文介绍了如何使用Vite 3.2+构建多入口JavaScript库，通过单一可配置的vite.config、自定义脚本导入构建、配置package.json及生成类型定义，解决多入口打包问题，并提供演示和结论。'
lastUpdated: '2026-06-21 20:31:17'
head:
  - - meta
    - name: 'og:title'
      content: '使用 Vite 构建具有多个入口点的 JavaScript 库'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了如何使用Vite 3.2+构建多入口JavaScript库，通过单一可配置的vite.config、自定义脚本导入构建、配置package.json及生成类型定义，解决多入口打包问题，并提供演示和结论。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//front-end/web/framework/vite/build-library-with-multi-entry-points.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ec79efccdbc04ee5fcca4358f2134076.gif'
---
# 使用 Vite 构建具有多个入口点的 JavaScript 库

::: info ℹ️
原文地址 :
[Build a JavaScript library with multiple entry points using Vite3 · Raul Melo](https://www.raulmelo.dev/en/blog/build-javascript-library-with-multiple-entry-points-using-vite-3#using-vite-32-or-later)
:::

## 关于Vite

Vite 是一个有自己想法的构建工具，旨在为现代网络项目提供更快的学习开发体验。

> [https://cn.vitejs.dev/](https://cn.vitejs.dev/)

它专注于 ES 模块结构（尽管我们可以将它与 Common JS 一起使用），并且它为我们提供了一个开发服务器（就像当您运行 npm run dev 时一样），它具有极快的热模块替换 (HMR)。

> 我们可以为运行开发服务器的情况定义 HMR，更改文件，再次处理该文件（以得到浏览器的支持），然后刷新服务器。

在底层，Vite 结合了用于特定文件优化的 esbuild（由于其出色的性能）和 Rollup（用于实际输出文件），总体上具有出色的性能。

如果您是 Vite 的新手，我强烈建议您浏览他们的文档并尝试使用他们的模板之一创建一个简单的应用程序，以亲眼看看它有多神奇。

## 构建一个 JS 库

如果你想构建一个 JS 库，你可能会选择 Rollup。

那是因为它是一个成熟的工具，不像 Webpack 那样复杂，而且配置起来也不难。

即使配置不太难，你仍然需要安装一堆插件，关心 TypeScript 解析（以防你在 TS 中编写你的 lib），关心转译 CommonJS 代码等。

幸运的是，Vite 有一个叫做[“库模式”](https://vitejs.dev/guide/build.html#library-mode)的东西，它允许我们指定一个入口文件（比如导出包中所有内容的 index.ts 文件）并使用所有 Vite 生态系统对其进行编译。

关于它的文档很棒，我相信这已经足够可以准备好一个库以供应用程序本身发布或使用。

唯一的问题是：***“如果我不想拥有一个入口点，而是想要多个入口点呢？”***

你可能已经注意到，一些库允许你从库中导入多个内容

```Plaintext
import { foo } from 'package'
```

从同一个库中，还给了我们一个子模块：

```Plaintext
import { bar } from 'package/another-module'
```

Next.JS 就是一个例子。接下来安装时，我们可以从主包中导入一些东西，从子模块中导入其他东西：

```Plaintext
import Link from 'next/link';
import Image from 'next/image';
import type { GetServerSideProps } from 'next';
```

对于这些情况，我们不能简单地指向一个 index.ts 并有多个输出。我们需要指向其他文件。

在之前（下一个）使用的相同示例中，它们很可能会指向多个文件，如 `src/image.tsx` 、 `src/link.tsx` 被编译为文件，如 `dist/image.js` 和 `dist/link.js` 。

> 旁注，他们因此不使用 Vite。查看他们的代码库，生态系统和构建比我们需要的更复杂，为此，他们有不同的方法和工具。

好的，但是如果 Vite 不支持多条目，我们如何实现呢？

## 攻略

解决这个问题的方法可能有很多，但在这里，我想提两个我觉得很简单的策略。

### 单一可配置的 vite.config

我在 Vite 的线程上看到了关于这个主题的[评论](https://github.com/vitejs/vite/discussions/1736#discussioncomment-2833413)，因为我喜欢编写脚本，所以我想加强它。

事情是因为我们在 Node 环境中并且我们可以访问环境变量，我们可以将它们放在一个 JavaScript 文件中，例如：

```Plaintext
console.log(process.env.MY_ENV_VAR);
```

然后，当我这样做时：

```Plaintext
MY_ENV_VAR=random-value node index.js
```

它输出了我给 `MY_ENV_VAR` 的价值：

```Plaintext
random-value
```

好的。现在，假设我想构建一个导出两个模块的库： `logger` 和 `math` （仅作为示例）：

```Plaintext
.
├── src
│ ├── lib.ts
│ └── math.ts
└── package.json
```

在我们的单个条目的 vite.config.js 中，我们会有这样的东西：

```Plaintext
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      fileName: 'my-lib',
      formats: ['cjs', 'es'],
    },
  }
})
```

在 Vite 3 上，一个 vite config 文件必须默认导出 `defineConfig` 的结果。

为了有一个更动态的构建，我们可以在我们的配置文件中有一个对象来保存 `math` 和 `logger` 之间的不同信息：

```Plaintext
const config = {
  math: {
    entry: resolve(__dirname, "./src/math.ts"),
    fileName: "math.js",
  },
  logger: {
    entry: resolve(__dirname, "./src/logger.ts"),
    fileName: "logger.js",
  },
};
```

条目和 文件名 是这两个文件之间 的 唯一区别。

这里，我们可以使用环境变量来确定应该使用哪个配置以及应该输出哪个文件：

```TypeScript
import { resolve } from "path";
import { defineConfig } from "vite";

const config = {
  math: {
    entry: resolve(__dirname, "./src/math.ts"),
    fileName: "math.js",
  },
  logger: {
    entry: resolve(__dirname, "./src/logger.ts"),
    fileName: "logger.js",
  },
};

const currentConfig = config[process.env.LIB_NAME];

if (currentConfig === undefined) {
  throw new Error('LIB_NAME is not defined or is not valid');
}

export default defineConfig({
  build: {
    outDir: "./dist",
    lib: {
      ...currentConfig,
      formats: ["cjs", "es"],
    },
    emptyOutDir: false,
  },
});
```

操作总结：

1. 我们根据运行此命令时指定的环境变量获取配置；
2. 我们添加验证以帮助我们识别我们是否拼错了环境变量并尝试构建一个未映射的库；
3. 我们用普通配置调用 defineConfig 并传播当前配置

现在，我们可以运行以下命令：

```Plaintext
$ LIB_NAME=math npx vite build

vite v3.0.4 building for production...
✓ 1 modules transformed.
dist/math.js.cjs 0.15 KiB / gzip: 0.14 KiB
dist/math.js.js 0.06 KiB / gzip: 0.08 KiB
```

> npx 命令调用 vite 的二进制文件（CLI 本身）

现在，我们也可以对 `logger` 库使用相同的命令：

```Plaintext
$ LIB_NAME=logger npx vite build

vite v3.0.4 building for production...
✓ 1 modules transformed.
dist/logger.js.cjs 0.16 KiB / gzip: 0.16 KiB
dist/logger.js.js 0.09 KiB / gzip: 0.09 KiB
```

为了让我们的生活更轻松，我们可以将这两个命令作为 npm 脚本和一个调用这两个脚本的命令：

```Plaintext
{
  "scripts": {
    "build:math": "LIB_NAME=math vite build",
    "build:logger": "LIB_NAME=logger vite build",
    "build": "npm run build:math && npm run build:logger"
  }
}
```

### 在自定义脚本中从 Vite 导入构建

在相同的讨论中，另一位用户提出了解决此问题的[不同策略](https://github.com/vitejs/vite/discussions/1736#discussioncomment-3229793)：使用Vite 构建 。

如果您不知道，Vite 公开了构建方法，因此我们可以通过编程方式进行构建：

```Plaintext
import { build } from 'vite';
```

考虑到这一点，我们需要做的就是创建一个配置数组并迭代这个数组调用构建：

```Plaintext
import { build } from "vite";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const libraries = [
  {
    entry: path.resolve(__dirname, "../src/logger.ts"),
    fileName: "logger",
  },
  {
    entry: path.resolve(__dirname, "../src/math.ts"),
    fileName: "math",
  },
];

libraries.forEach(async (lib) => {
  await build({
    build: {
      outDir: "./dist",
      lib: {
        ...lib,
        formats: ["es", "cjs"],
      },
      emptyOutDir: false,
    },
  });
});
```

这将产生与先前策略完全相同的输出。

不同的是，我们需要做的不是调用 vite build ，而是用节点调用我们的脚本：

```Plaintext
$ node scripts/build.mjs

vite v3.0.4 building for production...
vite v3.0.4 building for production... (x2)
✓ 1 modules transformed.
✓ 1 modules transformed. (x2)
dist/math.js 0.06 KiB / gzip: 0.08 KiB
dist/logger.js 0.09 KiB / gzip: 0.09 KiB
dist/math.cjs 0.15 KiB / gzip: 0.14 KiB
dist/logger.cjs 0.16 KiB / gzip: 0.16 KiB
```

> 因为我已将此文件定义为 `.mjs` 扩展名，所以我必须采取变通的方法才能获取 `__dirname` 并且我需要使用 Node 16 或更高版本。

### 使用 vite 3.2 或更高版本

在 3.2 版本中，此问题已得到解决和修复。

现在，只要你想有多个入口点，你需要做的就是指定 lib.entry 一个对象，其中 键 是输出文件名，值是该文件的源。

按照前面的示例，我们的配置将是：

```Plaintext
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: {
        math: "./src/math.ts",
        logger: "./src/logger.ts",
      },
      formats: ["es", "cjs"],
    },
  },
});
```

这将产生：

```Plaintext
vite v3.2.1 building for production...
✓ 2 modules transformed.
dist/math.cjs     0.15 KiB / gzip: 0.14 KiB
dist/math.cjs.map 0.24 KiB
dist/logger.cjs   0.16 KiB / gzip: 0.16 KiB
dist/logger.cjs.map 0.30 KiB
dist/math.js     0.06 KiB / gzip: 0.08 KiB
dist/math.js.map 0.24 KiB
dist/logger.js   0.09 KiB / gzip: 0.09 KiB
dist/logger.js.map 0.31 KiB
```

就是这样。

不过要注意的一件事是，如果您要发送到 UMD/IIFE，这种方法可能还行不通。

看起来 rollup 对输出这些开箱即用的格式有限制，需要做一些额外的工作。

在我写这个更新的那一刻，[vite 在 v3.2.1 上](https://github.com/vitejs/vite/blob/v3.2.1/packages/vite/CHANGELOG.md)，而[PR 修复](https://github.com/vitejs/vite/pull/10609)尚未合并。

如果您需要此功能，我建议您订阅此 PR 并等到它准备好返回我之前提出的解决方案。

## 配置 package.json

拥有 JavaScript 库的最关键步骤之一是在我们的 package.json 中定义节点需要如何解析文件。

在 Vite docs 上，他们有如何做到这一点的建议，这几乎是我们想要的：

```Plaintext
{
  "name": "my-lib",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-lib.umd.cjs",
  "module": "./dist/my-lib.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.js",
      "require": "./dist/my-lib.umd.cjs"
    }
  }
}
```

解释每个字段：

- `files` 是我们要发布的文件的数组（因此你可以只将必要的代码打包到您的库中）；
- `main` 是 `common.js` ( require ) 语句的入口点；
- `module` 是 ES 模块 ( `import ? from` ) 语句的入口；
- `exports` 是一种允许我们拥有多个入口文件的现代替代方案（正是我们所需要的）

  - `.` 在这种情况下代表主要入口点（ `require('my-lib') 和 import 'my-lib'` ）
  
    - `import` 实际上是针对 ES 模块的；
    - `require` 适用于 CommonJS。

`main` 、 `module` 和 `export` 具有相同的目标。不同之处在于 exports 有更灵活的映射方式来映射我们想要公开的文件，而 `main` 和 `module` 更针对单个入口点。

> 请记住， `exports` 至少需要 Node v12 才能工作，我认为现在这不是问题。

好的，现在让我们创建自己的配置。

因为我们正在创建的库没有默认入口点，所以我们可以去掉 main 和 module 并只使用 exports 。

在我们的 exports 字段中，我们现在可以定义 math 和 logger 子模块并指向构建命令将输出的文件：

```Plaintext
{
  "type": "module",
  "exports": {
    "./math": {
      "import": "./dist/math.js",
      "require": "./dist/math.cjs"
    },
    "./logger": {
      "import": "./dist/logger.js",
      "require": "./dist/logger.cjs"
    }
  },
  "files": [
    "dist/*",
  ]
}
```

> 请注意，我们指向的文件应该存在，并且当我们运行 `npm run build` 时它会存在。

另一个观察，我们正在定义 `"type": "module"` 来定义节点应该如何运行文件（使用 .mjs 扩展名或不是）。Vite 将使用此信息生成扩展名为 .mjs 或 .cjs 的文件。[在这里阅读](https://vitejs.dev/guide/build.html#library-mode:~:text=%7D%0A%20%20%7D%0A%7D-,Note,become%20.mjs%20and%20.cjs%20will%20become%20.js.,-Environment%20Variables)

就是这样。

现在，我们将能够通过以下方式使用 import/require 这个包：

```Plaintext
// ES Modules environment
import { sum } from 'my-package/math'
import { logger } from 'my-package/logger'

// CommonJS (node)
const { sum } = require('my-package/math')
const { logger } = require('my-package/logger')
```

## 生成类型定义

TypeScript 每年都变得越来越流行。

因此，库维护者最好也提供库中的类型定义，这样我们的 IDE 或文本编辑器 IntelliSense 就可以为我们提供有关函数签名等的提示。

因为这个包的代码是TypeScript的，我们可以使用 tsc 编译器自动帮我们生成。

如果您想使用 tsc 编译我们的代码，甚至将编译器用作“linter”，那么拥有一个 tsconfig.json 配置是一个好习惯。

然而，对于这种情况，因为我们只想生成类型，我们可以跳过配置部分并直接使用编译器：

```Plaintext
tsc src/*.ts --declaration --emitDeclarationOnly --declarationDir dist/
```

在这里，我们告诉编译器只为 src 上存在的所有 .ts 文件发出声明，并将它们放在 dist 文件夹中。

当我们用 Vite 构建我们的文件并运行这个命令来生成文件时，我们将有一个像这样的 dist 文件夹：

```Plaintext
.
└── dist
    ├── logger.cjs
    ├── logger.d.ts
    ├── logger.js
    ├── math.cjs
    ├── math.d.ts
    └── math.js
```

是不是很 **酷**

现在我们必须使用 package.json 属性 types 来声明我们的类型。

types 不是 Node 的标准字段，而是 TypeScript 引入的东西，Node 和 JS 生态系统已经接受了它。

这里最大的问题是 类型 只接受一个字符串，而不是一个字符串数组。那么我们如何才能真正指向多个定义呢？

### 问题

这是一个我觉得非常有趣的问题。

我读到一些人说，一旦您在我们拥有构建文件（例如 math.cjs）的同一文件夹中拥有类型定义 ( d.ts )，TypeScript 将能够自动推断出类型。

我试过了，并没有像我预期的那样成功。

可能是因为在这个 lib dist 文件夹中，我不仅有 math.cjs ，还有 math.js ，它们的导入方式不同。也许 TypeScript 在尝试猜测该定义是否来自我实际导入的文件时感到困惑。

坦诚地说，我不确定。

如果我们可以在exports 中定义类型，那就太好了：

```Plaintext
{
  "exports": {
    "./math": {
      "import": "./dist/math.js",
      "require": "./dist/math.cjs",
      "type": "./dist/math.d.ts"
    },
    "./logger": {
      "import": "./dist/logger.js",
      "require": "./dist/logger.cjs",
      "type": "./dist/logger.d.ts"
    }
  }
}
```

但这是行不通的。

正如我所说， exports 字段是来自 node 的官方字段，而 types 只是 TypeScript 提出的。

### 解决方案

我不确定解决该问题的最佳方法，但我找不到更好的方法。

再次以 Next.js 为例，他们在提供这种独立的包和类型方面做得很好，所以我去那里看看他们是怎么做的。

我意识到，尽管有源代码，但它们在每个包的主要[下](https://github.com/vercel/next.js/tree/canary/packages/next)一个包类型定义的根目录中都有。

在每一个 `.d.ts` 中，他们仅仅使用 `export * from './dist/<package-name>.js` 并且，画龙点睛，他们有一个名为 `index.d.ts` 的文件，它使用 `<reference />` 指令来自 TypeScript 并 `import` 所有这些类型。

这背后的逻辑是，我们要导出的每个子模块都将指向编译器在 dist 文件夹中生成的类型定义。

然后，我们使用TypeScript 中的 `<reference>` 指令通知编译器这些引用的文件需要包含在编译过程中。

通过这条指令，TypeScript 编译器将能够推断出该子模块的类型定义是什么。

同样，我不确定这是否是解决该问题的最佳方法，但在我的测试中，它起到了很好的作用，所以让我们来实现它。

### 亲自动手

首先，我们要在我们的根文件夹中创建两个 .d.ts 文件，一个用于 `logger` 模块，另一个用于 `math` 模块。

在两者中，我们只会导出 `dist/*.js` 中的所有内容：

```Plaintext
export * from "./dist/logger";
```

```Plaintext
export * from "./dist/math";
```

现在，我们创建一个 index.d.ts 文件，引用两种类型定义：

```TypeScript
/// <reference path="./logger.d.ts" />
/// <reference path="./math.d.ts" />
```

您可能已经注意到，现在我们的类型只有一个条目 ( index.d.ts )。

最后一步是将这个入口文件指向 类型 ，并在我们的 文件 字段中列出这 3 个新的类型定义文件：

```Plaintext
{
  "types": "./index.d.ts",
  "files": [
    "dist/*",
    "index.d.ts",
    "logger.d.ts",
    "math.d.ts"
  ]
}
```

这样就可以完成工作：

![](https://file.wulicode.com/feishu-images/ec79efccdbc04ee5fcca4358f2134076.gif)

## 演示

为了向您展示它的效果如何，我创建了一个演示应用程序，以便您可以查看并使用它作为构建您自己的库的参考。

唯一的区别是，在帖子中，我使用 npm 作为示例，但在演示中，我使用 pnpm 只是为了拥有一个工作区，我可以在其中维护构建策略和使用包的 vanilla TS 应用程序。

[https://github.com/raulfdm/vite-3-lib-multiple-entrypoints](https://github.com/raulfdm/vite-3-lib-multiple-entrypoints)

## 结论

同样，我认为这个问题可能会在 Vite 的未来版本中得到解决，但由于围绕这个问题存在争议，我认为值得发帖进行一些解释。

我希望我能以某种方式帮助你。

## 参考

- [https://github.com/raulfdm/vite-3-lib-multiple-entrypoints](https://github.com/raulfdm/vite-3-lib-multiple-entrypoints)
- [https://github.com/vitejs/vite/discussions/1736#discussioncomment-3310054](https://github.com/vitejs/vite/discussions/1736#discussioncomment-3310054)
- [https://nodejs.org/api/packages.html#package-entry-points](https://nodejs.org/api/packages.html#package-entry-points)
- [https://webpack.js.org/guides/package-exports/](https://webpack.js.org/guides/package-exports/)
- [https://nodejs.org/api/packages.html#type](https://nodejs.org/api/packages.html#type)
- [https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- [https://nodejs.org/api/packages.html#community-conditions-definitions](https://nodejs.org/api/packages.html#community-conditions-definitions)
- [https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html)
- [https://github.com/rollup/rollup](https://github.com/rollup/rollup)