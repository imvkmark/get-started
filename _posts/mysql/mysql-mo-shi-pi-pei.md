---
title: "mysql 模式匹配"
date: 2021-06-26 10:36:32
toc: true
categories:
- ["Mysql","Mysql 基础"]
---

### 匹配规则
| 模式 | 描述 |
| --- | --- |
| . | 匹配任意单个字符 |
| [] | 匹配括号内的任何字符, 也可以匹配一定范围的字符, [0-9] 数字 |
| * | 匹配该符号前面字符的零个或多个实例 |
| + | 匹配该符号前面字符的一个或多个实例 |
| ? | 匹配该符号前面字符的零个或多个 |
| ^ | 跟在符号后边的内容必须为值的开头 |
| $ | 跟在符号前边的内容必须为值的结尾 |
| &#124; | 或匹配 |
| {n} | 重复N次 |
| {n,m} | n-m次 |






### 示例


#### like

```
# 不区分大小写
[SELECT caluse] WHERE column LIKE '%JAVA';  
# 要想找出正好包含n个字符的名字，使用“_”模式字符：
[SELECT caluse] WHERE column LIKE '____';
```

####　REGEXP

```
# 文章中有 v 的, 不区分大小写
[SELECT caluse] WHERE column REGEXP 'v'; 
# v开始
[SELECT caluse] WHERE column REGEXP '^v'; 
# v结束
[SELECT caluse] WHERE column REGEXP 'v$';
```


#### MATCH AGAINST

```
SELECT url FROM document WHERE MATCH(title, content) AGAINST ('java');

# IN BOOLEAN MODE, 它使用的语法与搜索引擎使用的语法相同
SELECT url FROM document WHERE MATCH(content) AGAINST ('+java -MYSQL' IN BOOLEAN MODE );
```

**运算符**

| 符号 | 说明 |
| --- | --- |
| + | 单词必须在被匹配的索引中 |
| - | 单词不允许出现在被匹配的索引中 |
| ~ | 单词的相关程度逆置 |
| < | 降低该单词对整个匹配模式的贡献 |
| > | 提高该单词对整个匹配模式的贡献 |
| * | 该运算符紧跟在所修饰的单词之后, 它于通配符很相似, 匹配以指定的单词开头的任意单词 |
| () | 将单词分组为子表达式 |

