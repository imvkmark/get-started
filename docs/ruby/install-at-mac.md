# Mac 安装 ruby

## 安装和对比

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

## 设置 Gem 镜像

### tsinghua edu

以下内容复制自 : [Ruby Gems 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/rubygems/)

**gem**

使用以下命令替换 gems 默认源

```shell
# 添加 TUNA 源并移除默认源
$ gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/
# 列出已有源
$ gem sources -l
# 应该只有 TUNA 一个
```

或者，编辑 `~/.gemrc`，将 ` https://mirrors.tuna.tsinghua.edu.cn/rubygems/ ` 加到 `sources` 字段。

**bundler**

使用以下命令替换 bundler 默认源

```shell
$ bundle config mirror.https://rubygems.org https://mirrors.tuna.tsinghua.edu.cn/rubygems
```

官方文档：  http://bundler.io/v1.16/man/bundle-config.1.html#MIRRORS-OF-GEM-SOURCES

### ruby-china

ruby 更换源 : https://gems.ruby-china.com/

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

