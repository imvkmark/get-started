---
title: "Mac 安装 ruby"
date: 2021-05-20 16:09:24
toc: true
categories:
- ["Lang","Ruby"]
---

未安装之前


```
➜ ruby -v
ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.x86_64-darwin19]
➜ gem -v
3.0.3
```

```
$ brew install ruby
```

vim `~/.zshrc`

```
# ruby
export PATH="/usr/local/opt/ruby/bin:$PATH"
```

```
➜ ruby -v
ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x86_64-darwin19]
➜ gem -v
3.1.4
```

ruby 更换源 : [https://gems.ruby-china.com/](https://gems.ruby-china.com/)

更多可参考 [How do I install ruby gems on Mac](https://stackoverflow.com/questions/39381360/how-do-i-install-ruby-gems-on-mac)

用来管理环境
```
$ curl -sSL https://get.rvm.io | bash -s stable
```
安装完成后会在 `~/.bashrc` 中加入 `bin` 变量, 无需自己添加, 使用 `source ~/.bashrc` 使其生效

```
# 安装指定版本
$ rvm install 2.7.5 

# 设为默认
$ rvm use 2.7.5 --default
```

