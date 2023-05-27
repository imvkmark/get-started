# Taro - FAQ

## Error message "error:0308010C:digital envelope routines::unsupported"

方法 1 : 启用 `legacy OpenSSL provider`

```
export NODE_OPTIONS=--openssl-legacy-provider
```

在 package.json 文件中设置

```json
{
    "scripts": {
        "dev:weapp": "export NODE_OPTIONS=--openssl-legacy-provider && npm run build:weapp -- --watch"
    }
}
```

方法 2: 降级到 Node.js v16(不推荐)

- 使用 [pnpm](./../npm/pkg-use-pnpm.md) 的环境变量部分来管理
- 使用 [nvm](./../npm/version-manager-nvm.md) 来管理环境