---
description: 'C: 使用 Callable 包裹else-iffori : for 循环geti : 获取实例I : 循环数组或者迭代ifn : 插入 if null 语句inn : 插入 if not null 语句inst : 检测对象类型并 down-casts 这个itar : 循环数组itco : 循环迭代器iten : 循环 Enumerationiter : 循环迭代/数组itit : 循环 Interatoritli : 循环 listitm : 循环 Mapittok : 循环字符串的 StringTokenizerlaz'
lastUpdated: '2025-12-06 10:56:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Java Live Templates'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'C: 使用 Callable 包裹else-iffori : for 循环geti : 获取实例I : 循环数组或者迭代ifn : 插入 if null 语句inn : 插入 if not null 语句inst : 检测对象类型并 down-casts 这个itar : 循环数组itco : 循环迭代器iten : 循环 Enumerationiter : 循环迭代/数组itit : 循环 Interatoritli : 循环 listitm : 循环 Mapittok : 循环字符串的 StringTokenizerlaz'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/ide/idea-java-live-template.html'
---
# Java Live Templates



`C` : 使用 Callable 包裹

```java
java.util.concurrent.Callable<$RET$> callable = new java.util.concurrent.Callable<$RET$>() {
  public $RET$ call() throws Exception {
    $SELECTION$
    $END$ 
  }
};
```

`else-if`

```java
else if($CONDITION$){
$END$
} 
```

`fori`  : for 循环

```java
for(int $INDEX$ = 0; $INDEX$ < $LIMIT$; $INDEX$++) {
  $END$
}
```

`geti`  : 获取实例

```java
public static $CLASS_NAME$ getInstance() {
  return $VALUE$;
}
```

`I`  : 循环数组或者迭代

```java
for ($ELEMENT_TYPE$ $VAR$ : $SELECTION$) {
  $END$
}

```

`ifn`  : 插入  `if null`  语句

```java
if ($VAR$ == null) {
$END$
}
```

`inn`  : 插入  `if not null`  语句

```java
if ($VAR$ != null) {
$END$
}
```

`inst`  : 检测对象类型并  `down-casts`  这个

```java
if ($EXPR$ instanceof $TYPE$) {
  $TYPE$ $VAR$ = ($TYPE$)$EXPR$;
  $END$
}
```

`itar`  : 循环数组

```java
for(int $INDEX$ = 0; $INDEX$ < $ARRAY$.length; $INDEX$++) {
  $ELEMENT_TYPE$ $VAR$ = $ARRAY$[$INDEX$];
  $END$
}
```

`itco`  : 循环迭代器

```java
for($ITER_TYPE$ $ITER$ = $COLLECTION$.iterator(); $ITER$.hasNext(); ) {
  $ELEMENT_TYPE$ $VAR$ =$CAST$ $ITER$.next();
  $END$
}
```

`iten`  : 循环 Enumeration

```java
while($ENUM$.hasMoreElements()){
  $TYPE$ $VAR$ = $CAST$ $ENUM$.nextElement();
  $END$
}
```

`iter`  : 循环迭代/数组

```java
for ($ELEMENT_TYPE$ $VAR$ : $ITERABLE_TYPE$) {
  $END$
}
```

`itit`  : 循环 Interator

```java
while($ITER$.hasNext()){
  $TYPE$ $VAR$ = $CAST$ $ITER$.next();
  $END$
}
```

`itli`  : 循环 list

```java
for (int $INDEX$ = 0; $INDEX$ < $LIST$.size(); $INDEX$++) {
  $ELEMENT_TYPE$ $VAR$ = $CAST$ $LIST$.get($INDEX$);
  $END$
}
```

`itm`  : 循环 Map

```java
for (java.util.Map.Entry<$KEY_TYPE$, $VALUE_TYPE$> $ENTRY$: $MAP$.entrySet()) {
  $KEY_TYPE$ $KEY$ = $ENTRY$.getKey();
  $VALUE_TYPE$ $VALUE$ = $ENTRY$.getValue();
  $END$
}
```

`ittok`  : 循环字符串的 StringTokenizer

```java
for (java.util.StringTokenizer $TOKENIZER$ = new java.util.StringTokenizer($STRING$); $TOKENIZER$.hasMoreTokens(); ) {
    String $VAR$ = $TOKENIZER_COPY$.nextToken();
    $END$
}
```

`lazy` :  lazy 初始化

```java
if ($VAR$ == null) {
  $VAR$ = new $TYPE$($END$);
}
```

`lst`  : 找到最后一个元素

```java
$ARRAY$[$ARRAY$.length - 1]
```

`mn`  : 最小

```java
$VAR$ = Math.min($VAR$, $END$);
```

`mx`  : 最大

```java
$VAR$ = Math.max($VAR$, $END$);
```

`prisf`

```java
private static final 
```

`psf`

```java
public static final 
```

`psfi`

```java
public static final int 
```

`psfs`

```java
public static final String 
```

`psvm`  /  `main`  : main 声明

```java
public static void main(String[] args){
  $END$
}
```

`ritar`  : 反向循环数组

```java
for(int $INDEX$ = $ARRAY$.length - 1; $INDEX$ >= 0; $INDEX$--) {
  $ELEMENT_TYPE$ $VAR$ = $ARRAY$[$INDEX$];
  $END$
}
```

`RL`  : 读锁

```java
$LOCK$.readLock().lock();
try { 
  $SELECTION$
} finally {
  $LOCK$.readLock().unlock();
}

```

`WL`  : 写锁

```java
$LOCK$.writeLock().lock();
try { 
  $SELECTION$
} finally {
  $LOCK$.writeLock().unlock();
}

```

`serr` : 系统错误

```java
System.err.println($END$);
```

`serrc`  : 系统错误 C 风格

```java
System.err::println
```

`souf`  : 系统输出格式

```java
System.out.printf("$END$");
```

`sout`  : 系统输出

```java
System.out.println($END$);
```

`soutc`  : 系统输出 c 风格

```java
System.out::println
```

`soutm`  输出类名称和方法名称

```java
System.out.println("$CLASS_NAME$.$METHOD_NAME$");
```

`soutp`  : 打印参数

```java
System.out.println($FORMAT$);
```

`soutv`  : 输出值

```java
System.out.println("$EXPR_COPY$ = " + $EXPR$);
```

`St`  : 字符串

```java
String 
```

`thr`  : 抛出异常

```java
throw new 
```

`toar`  : Collection 的值转换为数组

```java
$COLLECTION$.toArray(new $COMPONENT_TYPE$[0])$END$
```

