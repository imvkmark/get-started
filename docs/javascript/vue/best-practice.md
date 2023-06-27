# 基于 Vue3 的最佳实践

> 本文基于 vite + pinia + pnpm + eslint 来进行最佳实践的说明

## pnpm 包管理工具

https://pnpm.io/zh/

pnpm 作为快速的, 节省磁盘空间的包管理工具具有以下优点

- 快速 : pnpm 比其他包管理器快 2 倍
- 高效 : node_modules 中的文件为复制或链接自特定的内容寻址存储库
- 支持 monorepos : pnpm 内置支持单仓多包
- 严格 : pnpm 默认创建了一个非平铺的 node_modules，因此代码无法访问任意包

## typescript

https://www.typescriptlang.org/

TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript
通过类型注解提供编译时的静态类型检查

## vite 启动器

https://cn.vitejs.dev/

vite 下一代的前端工具链, 为开发提供极速响应

- 极速的服务启动 : 使用原生 ESM 文件，无需打包!
- 轻量快速的热重载 : 无论应用程序大小如何，都始终极快的模块热替换（HMR）
- 丰富的功能 : 对 TypeScript、JSX、CSS 等支持开箱即用。
- 优化的构建 : 可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建
- 通用的插件 : 在开发和构建之间共享 Rollup-superset 插件接口。
- 完全类型化的API : 灵活的 API 和完整的 TypeScript 类型。

## pinia store 管理

https://pinia.vuejs.org/zh/

符合直觉的 Vue.js 状态管理库
类型安全、可扩展性以及模块化设计。 甚至让你忘记正在使用的是一个状态库

- 所见即所得 : 与组件类似的 Store。其 API 的设计旨在让你编写出更易组织的 store。
- 类型安全 : 类型可自动推断，即使在 JavaScript 中亦可为你提供自动补全功能！
- 开发工具支持 : 不管是 Vue 2 还是 Vue 3，支持 Vue devtools 钩子的 Pinia 都能给你更好的开发体验。
- 可扩展性 : 可通过事务、同步本地存储等方式扩展 Pinia，以响应 store 的变更。
- 模块化设计 : 可构建多个 Store 并允许你的打包工具自动拆分它们。
- 极致轻量化 : Pinia 大小只有 1kb 左右，你甚至可能忘记它的存在！

## vitest 单元测试

https://cn.vitest.dev/

由 Vite 提供支持的极速单元测试框架, 一个 Vite 原生的单元测试框架。非常的快！

- Vite 支持 : 重复使用 Vite 的配置、转换器、解析器和插件 - 在您的应用程序和测试中保持一致。
- 兼容 Jest : 拥有预期、快照、覆盖等 - 从 Jest 迁移很简单。
- 智能即时浏览模式 : 智能文件监听模式，就像是测试的 HMR！
- ESM, TypeScript, JSX : 由 esbuild 提供的开箱即用 ESM、TypeScript 和 JSX 支持。

## eslint & typescript-eslint

> 让 ESLint 和 Prettier 支持 TypeScript 的工具
>
> https://typescript-eslint.io/
>
> ESLint 静态分析你的代码以快速发现问题。你可以将 ESLint 作为持续集成的一部分来运行
>
> https://eslint.org/

