---
description: '在Rocky Linux上运行Python CV相关识别系统时，因缺少libGL.so.1依赖导致ImportError。同时，在PyCharm中使用UnitTest右键运行ctrl4py/tests时，出现模块未找到错误：No module named ''ctrl4py.tests''，可能与包路径或依赖安装有关。'
lastUpdated: '2026-06-17 19:10:02'
head:
  - - meta
    - name: 'og:title'
      content: 'Python - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在Rocky Linux上运行Python CV相关识别系统时，因缺少libGL.so.1依赖导致ImportError。同时，在PyCharm中使用UnitTest右键运行ctrl4py/tests时，出现模块未找到错误：No module named ''ctrl4py.tests''，可能与包路径或依赖安装有关。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/python/extend-reading/faq.html'
---
# Python - FAQ

## 组件缺失

### **ImportError: libGL.so.1: cannot open shared object file**

```Bash
# Rocky Linux
$ dnf install mesa-libGL
```

## 安装和依赖反向写入

```Bash
OPENBLAS="$(brew --prefix openblas)" 
```

安装

```Bash
$ pip install --trusted-host mirrors.bfsu.edu.cn -i https://mirrors.bfsu.edu.cn/pypi/web/simple -r requirement.txt
```

依赖反向写入

```Bash
$ pip freeze >requirement.txt
```

## Cv 相关

提供的坐标 `590,315,720,360` 看起来是 `[x1, y1, x2, y2]` 格式，表示矩形区域的左上角和右下角坐标。但 OpenCV 的切片操作通常使用 `[y1:y2, x1:x2]` 格式

## Python 运行识别系统遇到的问题

python 3.9 无法安装, 提示

```Bash
File "/Users/duoli/.pyenv/versions/.../connection.py", line 457, in connect
    if not cert.get("subjectAltName", ()):
AttributeError: 'NoneType' object has no attribute 'get'
```

这里可能是由于 python 3.9 携带的证书在拉取的时候无法认证既定 mirror 导致的问题, 所以采用 `--trusted-host` 进行安装认证

```Bash
$ pip install --trusted-host mirrors.bfsu.edu.cn -i https://mirrors.bfsu.edu.cn/pypi/web/simple -r requirement.txt
```

## UnitTest

### 在 PyCharm 右键运行 ctrl4py/tests 的时候提示 `No module named 'ctrl4py.tests'`

```Plaintext
Error
ImportError: Failed to import test module: ctrl4py.tests
Traceback (most recent call last):
File "/Users/duoli/.local/share/uv/python/cpython-3.12.0-macos-aarch64-none/lib/python3.12/unittest/loader.py", line 415, in _find_test_path
package = self._get_module_from_name(name)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
File "/Users/duoli/.local/share/uv/python/cpython-3.12.0-macos-aarch64-none/lib/python3.12/unittest/loader.py", line 325, in _get_module_from_name
**import**(name)
ModuleNotFoundError: No module named 'ctrl4py.tests'
```

我这里的解决方案是文件夹名称和内部的模块名称一致, 导致 webstorm 无法找到这个相对应的模块导致的模块查找混乱