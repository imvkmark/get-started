---
description: '在Mac上安装Ruby并指定版本设为默认，配置gem镜像：添加TUNA源并移除默认源，确保仅保留TUNA源，最后配置bundler使用该源。'
lastUpdated: '2026-06-21 20:37:09'
head:
  - - meta
    - name: 'og:title'
      content: 'Mac 安装 ruby'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在Mac上安装Ruby并指定版本设为默认，配置gem镜像：添加TUNA源并移除默认源，确保仅保留TUNA源，最后配置bundler使用该源。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/ruby/install-at-mac.html'
---
# Mac 安装 ruby

未安装之前

```Plaintext
➜ ruby -v
ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.x86_64-darwin19]
➜ gem -v
3.0.3
```

```Plaintext
$ brew install ruby
```

vim `~/.zshrc`

```Plaintext
# ruby
export PATH="/usr/local/opt/ruby/bin:$PATH"
```

```Plaintext
➜ ruby -v
ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x86_64-darwin19]
➜ gem -v
3.1.4
```

ruby 更换源 : [https://gems.ruby-china.com/](https://gems.ruby-china.com/)

更多可参考 [How do I install ruby gems on Mac](https://stackoverflow.com/questions/39381360/how-do-i-install-ruby-gems-on-mac)

用来管理环境

```Plaintext
$ curl -sSL https://get.rvm.io | bash -s stable
```

安装完成后会在 `~/.bashrc` 中加入 `bin` 变量, 无需自己添加, 使用 `source ~/.bashrc` 使其生效

```Plaintext
# 安装指定版本
$ rvm install 2.7.5

# 设为默认
$ rvm use 2.7.5 --default
```

## 设置 gem 镜像

以下内容复制自 : [Ruby Gems 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/rubygems/)

## gem

使用以下命令替换 gems 默认源

```Plaintext
# 添加 TUNA 源并移除默认源
$ gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/
# 列出已有源
$ gem sources -l
# 应该只有 TUNA 一个
```

或者，编辑 `~/.gemrc`，将 `https://mirrors.tuna.tsinghua.edu.cn/rubygems/` 加到 `sources` 字段。

## bundler

使用以下命令替换 bundler 默认源

```Plaintext
$ bundle config mirror.https://rubygems.org https://mirrors.tuna.tsinghua.edu.cn/rubygems
```

官方文档： [http://bundler.io/v1.16/man/bundle-config.1.html#MIRRORS-OF-GEM-SOURCES](http://bundler.io/v1.16/man/bundle-config.1.html#MIRRORS-OF-GEM-SOURCES)