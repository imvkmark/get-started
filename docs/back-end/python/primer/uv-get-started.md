---
description: 'uv是一款Python项目管理工具，支持快速安装更新、项目初始化、依赖管理（增删改查、树形展示、安全升级）、缓存清理、虚拟环境管理、多Python版本切换、项目构建与发布（wheel/sdist），以及从requirements.txt迁移至pyproject.toml等，并提供国内镜像选项。'
lastUpdated: '2026-06-18 08:47:25'
head:
  - - meta
    - name: 'og:title'
      content: 'uv 的使用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'uv是一款Python项目管理工具，支持快速安装更新、项目初始化、依赖管理（增删改查、树形展示、安全升级）、缓存清理、虚拟环境管理、多Python版本切换、项目构建与发布（wheel/sdist），以及从requirements.txt迁移至pyproject.toml等，并提供国内镜像选项。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/python/primary/uv-get-started.html'
---
# uv 的使用

## 安装

```Bash
# mac 推荐
brew install uv
brew upgrade uv

# 安装 & 更新
pip install uv
pip install --upgrade uv

# 安装 & 更新
curl -LsSf https://astral.sh/uv/install.sh | sh
uv self update
```

## 使用

### 项目初始化

```Bash
# 初始化新的项目, 创建 pyproject.toml
uv init example
```

### 依赖管理

```Bash
# 安装指定包并添加到依赖（如 uv add requests）
uv add <package>
uv add ruff

# 安装指定版本的包
uv add <package>@<version>
# 安装开发依赖
uv add <package> --dev

# 移除包并从依赖中删除
uv remove <package>

# 语法检测
uv run ruff check

# lock
uv lock

# 列出已安装的依赖
uv list

# 以树形结构展示依赖关系
uv tree

# 查看为什么某个包被安装（依赖来源）
uv pip tree | grep -B 5 -A 5 jmespath

# 查看那些包可以安全升级
# ------------------------------------

# 安装 pip-review
uv add pip-review --dev

# 查看可安全升级的包(这里不要开代理)
pip-review

# 查看可安全升级的包, 仅仅输出包名和版本
pip-review --raw

# 提取可升级的包名并批量升级
pip-review --raw | xargs uv pip install --upgrade
```

### UV pip

```Bash
# 列出所有已安装但存在更新版本的依赖包
uv pip list --outdated

# pip 同步并安装包
vu pip sync requirements.txt

# 升级单个包
uv pip install --upgrade requests

# 批量升级
uv pip list --outdated | awk 'NR>2 {print $1}' | xargs uv pip install --upgrade

# 升级单个包 click
uv pip install --upgrade click

# 查看谁依赖了jmespath（使用之前提到的工具） 
pipdeptree -r -p jmespath
```

运行

```Bash
# 运行一个工具
uvx pycowsay 'hello'

# 清理缓存
uv cache clean
```

### 构建与发布

```Bash
# 构建项目分发文件（wheel 和 sdist）
uv build

# 将包发布到 PyPI
uv publish
```

### python 版本

```Bash
# 安装多版本
uv python install 3.10 3.11 3.12

# 当前目录指定 python 版本
uv python pin 3.11
```

### 环境管理

环境虚拟化

```Bash
# 创建一个虚拟环境
uv venv

# 指定python 版本虚拟化环境
uv venv --python 3.12.0

# 在虚拟环境中运行命令
uv run python
```

## QA

### 使用 uv 从 requirements.txt 迁移到 pyproject.toml

```Bash
uv init --project .
```

导入 `requirements.txt`

```Bash
uv add -r requirements.txt
```

### 运行并值守项目

```Bash
# fast api 项目
uv run uvicorn main:app --host 0.0.0.0 --port 8000

# django 项目
uv run gunicorn api.wsgi:application --bind 0.0.0.0:8000
```

### uv 使用国内的镜像

uv 加速请求

```Bash
echo 'export UV_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple' >> ~/.bashrc
source ~/.bashrc
```

或者单独安装

```Bash
uv pip install -r pyproject.toml -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 命令

### init - 创建新项目

用于创建一个新项目

```Shell
uv init [OPTIONS] [PATH]
    
    OPTIONS : 选项
    PATH : 用于项目/脚本的路径
```

#### 选项

```Plain Text
--name <NAME>
    项目的名称

--bare
    仅创建一个 `pyproject.toml` 文件

--package
    将项目设置为可构建为 Python 包

--no-package
    不将项目设置为可构建为 Python 包

--app
    创建一个应用程序项目

--lib
    创建一个库项目

--script
    创建一个脚本

--description <DESCRIPTION>
    设置项目描述

--no-description
    禁用项目描述

--vcs <VCS>
    为项目初始化版本控制系统 [可选值: git, none]

--build-backend <BUILD_BACKEND>
    为项目初始化选定的构建后端 [环境变量: UV_INIT_BUILD_BACKEND=] [可选值: uv, hatch, flit, pdm, poetry, setuptools, maturin, scikit]

--no-readme
    不创建 `README.md` 文件

--author-from <AUTHOR_FROM>
    填写 `pyproject.toml` 中的 `authors` 字段 [可选值: auto, git, none]

--no-pin-python
    不为项目创建 `.python-version` 文件

--no-workspace
    避免发现工作区并创建独立项目
```

### sync

```Plain Text
uv sync [OPTIONS]
    更新项目环境, 根据 pyproject.toml 和 uv.lock 同步依赖
```

#### 选项

```Plain Text
--extra <额外依赖组名>
    包含指定额外依赖组中的可选依赖

--output-format <输出格式>
    选择输出格式 [默认值: 文本] [可选值: 文本、JSON]

--all-extras
    包含所有可选依赖

--no-extra <排除的额外依赖组名>
    若指定了`--all-extras`，则排除该参数指定的可选依赖组

--no-dev
    禁用开发依赖组 [环境变量: UV_NO_DEV=]

--only-dev
    仅包含开发依赖组

--group <依赖组名>
    包含指定依赖组中的依赖

--no-group <排除的依赖组名>
    禁用指定的依赖组 [环境变量: UV_NO_GROUP=]

--no-default-groups
    忽略默认依赖组 [环境变量: UV_NO_DEFAULT_GROUPS=]

--only-group <仅启用的依赖组名>
    仅包含指定依赖组中的依赖

--all-groups
    包含所有依赖组中的依赖

--no-editable
    将所有可编辑依赖（包括当前项目及工作区所有成员）以非可编辑方式安装 [环境变量: UV_NO_EDITABLE=]

--inexact
    不删除环境中已存在的无关包

--active
    将依赖同步至当前激活的虚拟环境

--no-install-project
    不安装当前项目

--no-install-workspace
    不安装工作区中的任何成员（包括根项目）

--no-install-local
    不安装本地路径依赖

--no-install-package <不安装的包名>
    不安装指定的一个/多个包

--locked
    确保`uv.lock`文件内容保持不变 [环境变量: UV_LOCKED=]

--frozen
    同步依赖时不更新`uv.lock`文件 [环境变量: UV_FROZEN=]

--dry-run
    执行空运行（仅模拟操作，不写入锁文件或修改项目环境）

--all-packages
    同步工作区中的所有包

--package <指定包名>
    仅同步工作区中指定的包

--script <Python脚本路径>
    为指定Python脚本同步环境，而非当前项目

--python-platform <Python平台>
    安装依赖时适配的目标平台 [可选值: windows、linux、macos、x86_64-pc-windows-msvc、aarch64-pc-windows-msvc、i686-pc-windows-msvc、x86_64-unknown-linux-gnu、aarch64-apple-darwin、x86_64-apple-darwin、aarch64-unknown-linux-gnu、aarch64-unknown-linux-musl、x86_64-unknown-linux-musl、riscv64-unknown-linux、x86_64-manylinux2014、x86_64-manylinux_2_17、x86_64-manylinux_2_28、x86_64-manylinux_2_31、x86_64-manylinux_2_32、x86_64-manylinux_2_33、x86_64-manylinux_2_34、x86_64-manylinux_2_35、x86_64-manylinux_2_36、x86_64-manylinux_2_37、x86_64-manylinux_2_38、x86_64-manylinux_2_39、x86_64-manylinux_2_40、aarch64-manylinux2014、aarch64-manylinux_2_17、aarch64-manylinux_2_28、aarch64-manylinux_2_31、aarch64-manylinux_2_32、aarch64-manylinux_2_33、aarch64-manylinux_2_34、aarch64-manylinux_2_35、aarch64-manylinux_2_36、aarch64-manylinux_2_37、aarch64-manylinux_2_38、aarch64-manylinux_2_39、aarch64-manylinux_2_40、aarch64-linux-android、x86_64-linux-android、wasm32-pyodide2024、arm64-apple-ios、arm64-apple-ios-simulator、x86_64-apple-ios-simulator]

--check
    检查Python环境是否与项目依赖同步
```

#### 索引相关

```Plain Text
--index <索引地址>
    解析依赖时使用的额外索引地址（补充默认索引） [环境变量: UV_INDEX=]

--default-index <默认索引地址>
    默认包索引的地址（默认值：<https://pypi.org/simple>） [环境变量: UV_DEFAULT_INDEX=]

-i, --index-url <索引地址>
    （已废弃：建议使用`--default-index`）Python包索引的地址（默认值：<https://pypi.org/simple>） [环境变量: UV_INDEX_URL=]

--extra-index-url <额外索引地址>
    （已废弃：建议使用`--index`）除`--index-url`外额外使用的包索引地址 [环境变量: UV_EXTRA_INDEX_URL=]

-f, --find-links <查找路径>
    除注册表索引外，额外的候选分发包查找位置 [环境变量: UV_FIND_LINKS=]

--no-index
    忽略注册表索引（如PyPI），仅依赖直接URL依赖和`--find-links`提供的包

--index-strategy <索引策略>
    多索引地址解析时采用的策略 [环境变量: UV_INDEX_STRATEGY=] [可选值: first-index（优先首个索引）、unsafe-first-match（不安全-优先匹配项）、unsafe-best-match（不安全-最优匹配项）]

--keyring-provider <密钥环提供方>
    尝试使用`keyring`完成索引地址的身份验证 [环境变量: UV_KEYRING_PROVIDER=] [可选值: disabled（禁用）、subprocess（子进程）]
```

#### 解析器相关

```Plain Text
-U, --upgrade                                        
    允许包升级，忽略现有输出文件中的固定版本。隐含`--refresh`

-P, --upgrade-package <待升级包名>                  
    允许指定包升级，忽略现有输出文件中的固定版本。隐含`--refresh-package`

-U, --upgrade                                        
    允许包升级，忽略现有输出文件中的固定版本。隐含`--refresh`

--resolution <版本解析策略>
    为给定包依赖选择兼容版本时采用的策略 [环境变量: UV_RESOLUTION=] [可选值: highest（最高版本）、lowest（最低版本）、lowest-direct（最低直接依赖版本）]

--prerelease <预发布版本策略>
    处理预发布版本时采用的策略 [环境变量: UV_PRERELEASE=] [可选值: disallow（禁止）、allow（允许）、if-necessary（必要时）、explicit（显式指定时）、if-necessary-or-explicit（必要时或显式指定时）]

--fork-strategy <分支版本策略>
    跨Python版本和平台选择同一包的多个版本时采用的策略 [环境变量: UV_FORK_STRATEGY=] [可选值: fewest（最少版本）、requires-python（适配Python版本要求）]

--exclude-newer <截止日期>
    仅选择指定日期前上传的候选包 [环境变量: UV_EXCLUDE_NEWER=]

--exclude-newer-package <包名:截止日期>
    为指定包限定仅选择截止日期前上传的候选包

--no-sources
    解析依赖时忽略`tool.uv.sources`配置表。用于基于标准兼容的、可发布的包元数据生成锁文件，而非使用工作区、Git、URL或本地路径源 [环境变量: UV_NO_SOURCES=]

-P, --upgrade-package <待升级包名>                  
    允许指定包升级，忽略现有输出文件中的固定版本。隐含`--refresh-package`

--resolution <版本解析策略>                      
    为给定包依赖选择兼容版本时采用的策略 [环境变量: UV_RESOLUTION=] [可选值: highest（最高版本）、lowest（最低版本）、lowest-direct（最低直接依赖版本）]

--prerelease <预发布版本策略>                    
    处理预发布版本时采用的策略 [环境变量: UV_PRERELEASE=] [可选值: disallow（禁止）、allow（允许）、if-necessary（必要时）、explicit（显式指定时）、if-necessary-or-explicit（必要时或显式指定时）]

--fork-strategy <分支版本策略>                  
    跨Python版本和平台选择同一包的多个版本时采用的策略 [环境变量: UV_FORK_STRATEGY=] [可选值: fewest（最少版本）、requires-python（适配Python版本要求）]

--exclude-newer <截止日期>                      
    仅选择指定日期前上传的候选包 [环境变量: UV_EXCLUDE_NEWER=]

--exclude-newer-package <包名:截止日期>         
    为指定包限定仅选择截止日期前上传的候选包

--no-sources                                     
    解析依赖时忽略`tool.uv.sources`配置表。用于基于标准兼容的、可发布的包元数据生成锁文件，而非使用工作区、Git、URL或本地路径源 [环境变量: UV_NO_SOURCES=]
```

#### 安装器相关

```Plain Text
--reinstall
    重新安装所有包（无论是否已安装）。隐含`--refresh`

--reinstall-package <待重装包名>
    重新安装指定包（无论是否已安装）。隐含`--refresh-package`

--link-mode <链接模式>
    从全局缓存安装包时采用的方式 [环境变量: UV_LINK_MODE=] [可选值: clone（克隆）、copy（复制）、hardlink（硬链接）、symlink（符号链接）]

--compile-bytecode
    安装完成后将Python文件编译为字节码 [环境变量: UV_COMPILE_BYTECODE=]
```

#### 构建相关

```Plain Text
-C, --config-setting <配置项>
    传递给PEP 517构建后端的配置（格式为`键=值`）

--config-settings-package <包名:配置项>
    为指定包传递给PEP 517构建后端的配置（格式为`包名:键=值`）

--no-build-isolation
    构建源码分发包时禁用隔离环境 [环境变量: UV_NO_BUILD_ISOLATION=]

--no-build-isolation-package <指定包名>
    为指定包构建源码分发包时禁用隔离环境

--no-build
    不构建源码分发包 [环境变量: UV_NO_BUILD=]

--no-build-package <指定包名>
    不为指定包构建源码分发包 [环境变量: UV_NO_BUILD_PACKAGE=]

--no-binary
    不安装预构建的wheel包 [环境变量: UV_NO_BINARY=]

--no-binary-package <指定包名>
    不为指定包安装预构建的wheel包 [环境变量: UV_NO_BINARY_PACKAGE=]
```

#### 缓存相关

```Plain Text
--refresh
    刷新所有缓存数据

--refresh-package <指定包名>
    刷新指定包的缓存数据
```

## 全局选项

### 缓存选项

```Plain Text
-n, --no-cache
    不读取/写入缓存，全程使用临时目录 [环境变量: UV_NO_CACHE=]

--cache-dir <缓存目录>
    缓存目录的路径 [环境变量: UV_CACHE_DIR=]
```

### Python相关选项

```Plain Text
-p, --python <PYTHON>
    项目环境使用的Python解释器路径 [环境变量: UV_PYTHON=]

--managed-python <PYTHON>
    要求使用uv管理的Python版本 [环境变量: UV_MANAGED_PYTHON=]

--no-managed-python <PYTHON>
    禁用uv管理的Python版本 [环境变量: UV_NO_MANAGED_PYTHON=]

--no-python-downloads <PYTHON>
    禁用Python的自动下载功能 [环境变量: "UV_PYTHON_DOWNLOADS=never"]
```

### 全局选项

```Plain Text
-q, --quiet
    启用静默输出模式（多次使用可增强静默程度）

-v, --verbose
    启用详细输出模式（多次使用可增强详细程度）

--color <颜色选项>
    控制输出内容的色彩显示 [可选值: auto（自动）、always（始终显示）、never（从不显示）]

--native-tls
    是否从平台原生证书库加载TLS证书 [环境变量: UV_NATIVE_TLS=]

--offline
    禁用网络访问 [环境变量: UV_OFFLINE=]

--allow-insecure-host <允许不安全的主机>
    允许与指定主机建立不安全连接 [环境变量: UV_INSECURE_HOST=]

--no-progress
    隐藏所有进度输出 [环境变量: UV_NO_PROGRESS=]

--directory <目录路径>
    执行命令前切换到指定目录 [环境变量: UV_WORKING_DIRECTORY=]

--project <项目目录>
    在指定项目目录内执行命令 [环境变量: UV_PROJECT=]

--config-file <配置文件路径>
    指定要使用的`uv.toml`配置文件路径 [环境变量: UV_CONFIG_FILE=]

--no-config
    不自动发现配置文件（`pyproject.toml`、`uv.toml`） [环境变量: UV_NO_CONFIG=]

-h, --help
    显示本命令的精简帮助信息
```