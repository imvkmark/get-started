---
description: 'shell 脚本中 echo 显示内容带颜色显示需要使用参数 -e 格式如下：例如：其中 41 的位置代表底色， 36 的位置是代表字的颜色 注： 1、字背景颜色和文字颜色之间是英文的 [2、文字颜色后面有个m 3、字符串前后可以没有空格，如果有的话，输出也是同样有空格 下面是相应的字和背景颜色，可以自己来尝试找出不同颜色搭配例字颜色：30—–37字背景颜色范围：40—–47最后面控制选项说明'
lastUpdated: '2023-12-04 19:31:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'shell 脚本中 echo 显示内容带颜色'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'shell 脚本中 echo 显示内容带颜色显示需要使用参数 -e 格式如下：例如：其中 41 的位置代表底色， 36 的位置是代表字的颜色 注： 1、字背景颜色和文字颜色之间是英文的 [2、文字颜色后面有个m 3、字符串前后可以没有空格，如果有的话，输出也是同样有空格 下面是相应的字和背景颜色，可以自己来尝试找出不同颜色搭配例字颜色：30—–37字背景颜色范围：40—–47最后面控制选项说明'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/bash/tech/echo-use-color-in-shell.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/12/12971422329b08aed35c45a5308229c1.png?x-oss-process=image/resize,m_mfit,w_400'
---
# shell 脚本中 echo 显示内容带颜色



::: info  🔗 原文地址<br />
[shell脚本中echo显示内容带颜色](https://www.cnblogs.com/lr-ting/archive/2013/02/28/2936792.html)

:::

> 改动内容: 格式

shell 脚本中 echo 显示内容带颜色显示需要使用参数  `-e`  格式如下：

```
echo -e "\033[字背景颜色;文字颜色m字符串\033[0m"
```

例如：

```
echo -e "\033[41;36m something here \033[0m"
```

![](https://file.wulicode.com/notion/12/12971422329b08aed35c45a5308229c1.png)

其中  `41`  的位置代表底色，  `36`  的位置是代表字的颜色 

注： 

1、字背景颜色和文字颜色之间是英文的  `[`

2、文字颜色后面有个m 

3、字符串前后可以没有空格，如果有的话，输出也是同样有空格 下面是相应的字和背景颜色，可以自己来尝试找出不同颜色搭配

例

```
echo -e "\033[31m 红色字 \033[0m"
echo -e "\033[33m 黄色字 \033[0m"
echo -e "\033[41;33m 红底黄字 \033[0m"
echo -e "\033[41;37m 红底白字 \033[0m"
```

![](https://file.wulicode.com/notion/99/99a6193511a87e40863b29607320796b.png)

字颜色：30—–37

```
echo -e "\033[30m 黑色字 \033[0m"
echo -e "\033[31m 红色字 \033[0m"
echo -e "\033[32m 绿色字 \033[0m"
echo -e "\033[33m 黄色字 \033[0m"
echo -e "\033[34m 蓝色字 \033[0m"
echo -e "\033[35m 紫色字 \033[0m"
echo -e "\033[36m 天蓝字 \033[0m"
echo -e "\033[37m 白色字 \033[0m"
```

![](https://file.wulicode.com/notion/70/709c173ba80388e5dede97aa46d3aab6.png)



字背景颜色范围：40—–47

```
echo -e "\033[40;37m 黑底白字 \033[0m"
echo -e "\033[41;37m 红底白字 \033[0m"
echo -e "\033[42;37m 绿底白字 \033[0m"
echo -e "\033[43;37m 黄底白字 \033[0m"
echo -e "\033[44;37m 蓝底白字 \033[0m"
echo -e "\033[45;37m 紫底白字 \033[0m"
echo -e "\033[46;37m 天蓝底白字 \033[0m"
echo -e "\033[47;30m 白底黑字 \033[0m"
```

![](https://file.wulicode.com/notion/e2/e2967847db56d9dc075a8e2a26dd911e.png)

最后面控制选项说明

```
\33[0m 关闭所有属性
\33[1m 设置高亮度
\33[4m 下划线
\33[5m 闪烁
\33[7m 反显
\33[8m 消隐
\33[30m — \33[37m 设置前景色
\33[40m — \33[47m 设置背景色
\33[nA 光标上移n行
\33[nB 光标下移n行
\33[nC 光标右移n行
\33[nD 光标左移n行
\33[y;xH设置光标位置
\33[2J 清屏
\33[K 清除从光标到行尾的内容
\33[s 保存光标位置
\33[u 恢复光标位置
\33[?25l 隐藏光标
\33[?25h 显示光标
```

