---
description: 'Java Live Templates是一组代码快捷方式，用于加速常见编程模式的输入，包括：循环（fori、itar、iter、itli、itm等）、条件判断（ifn、inn）、输出（sout、souf、soutm等）、异常处理（thr）、类型检测（inst）、懒加载（lazy）、主方法（psvm）、读写锁（RL/WL）、字符串转换（St）等。它们通过简短缩写自动生成完整代码块，提升编码效率。'
lastUpdated: '2026-06-30 13:33:17'
head:
  - - meta
    - name: 'og:title'
      content: 'Java Live Templates'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Java Live Templates是一组代码快捷方式，用于加速常见编程模式的输入，包括：循环（fori、itar、iter、itli、itm等）、条件判断（ifn、inn）、输出（sout、souf、soutm等）、异常处理（thr）、类型检测（inst）、懒加载（lazy）、主方法（psvm）、读写锁（RL/WL）、字符串转换（St）等。它们通过简短缩写自动生成完整代码块，提升编码效率。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/primer/live-templates.html'
---
# Java Live Templates

### `C`: 使用 Callable 包裹

```Java
java.util.concurrent.Callable<$RET$> callable = new java.util.concurrent.Callable<$RET$>() {
  public $RET$ call() throws Exception {
    $SELECTION$
    $END$ 
  }
};
```

### `else-if`

```Java
else if($CONDITION$){
$END$
} 
```

### `fori` : for 循环

```Java
for(int $INDEX$ = 0; $INDEX$ < $LIMIT$; $INDEX$++) {
  $END$
}
```

### `geti` : 获取实例

```Java
public static $CLASS_NAME$ getInstance() {
  return $VALUE$;
}
```

### `I` : 循环数组或者迭代

```Java
for ($ELEMENT_TYPE$ $VAR$ : $SELECTION$) {
  $END$
}
```

### `ifn` : 插入 `if null` 语句

```Java
if ($VAR$ == null) {
$END$
}
```

### `inn` : 插入 `if not null` 语句

```Java
if ($VAR$ != null) {
$END$
}
```

### `inst` : 检测对象类型并 `down-casts` 这个

```Java
if ($EXPR$ instanceof $TYPE$) {
  $TYPE$ $VAR$ = ($TYPE$)$EXPR$;
  $END$
}
```

### `itar` : 循环数组

```Java
for(int $INDEX$ = 0; $INDEX$ < $ARRAY$.length; $INDEX$++) {
  $ELEMENT_TYPE$ $VAR$ = $ARRAY$[$INDEX$];
  $END$
}
```

### `itco` : 循环迭代器

```Java
for($ITER_TYPE$ $ITER$ = $COLLECTION$.iterator(); $ITER$.hasNext(); ) {
  $ELEMENT_TYPE$ $VAR$ =$CAST$ $ITER$.next();
  $END$
}
```

### `iten` : 循环 Enumeration

```Java
while($ENUM$.hasMoreElements()){
  $TYPE$ $VAR$ = $CAST$ $ENUM$.nextElement();
  $END$
}
```

### `iter` : 循环迭代/数组

```Java
for ($ELEMENT_TYPE$ $VAR$ : $ITERABLE_TYPE$) {
  $END$
}
```

### `itit` : 循环 Interator

```Java
while($ITER$.hasNext()){
  $TYPE$ $VAR$ = $CAST$ $ITER$.next();
  $END$
}
```

### `itli` : 循环 list

```Java
for (int $INDEX$ = 0; $INDEX$ < $LIST$.size(); $INDEX$++) {
  $ELEMENT_TYPE$ $VAR$ = $CAST$ $LIST$.get($INDEX$);
  $END$
}
```

### `itm` : 循环 Map

```Java
for (java.util.Map.Entry<$KEY_TYPE$, $VALUE_TYPE$> $ENTRY$: $MAP$.entrySet()) {
  $KEY_TYPE$ $KEY$ = $ENTRY$.getKey();
  $VALUE_TYPE$ $VALUE$ = $ENTRY$.getValue();
  $END$
}
```

### `ittok` : 循环字符串的 StringTokenizer

```Java
for (java.util.StringTokenizer $TOKENIZER$ = new java.util.StringTokenizer($STRING$); $TOKENIZER$.hasMoreTokens(); ) {
    String $VAR$ = $TOKENIZER_COPY$.nextToken();
    $END$
}
```

### `lazy`: lazy 初始化

```Java
if ($VAR$ == null) {
  $VAR$ = new $TYPE$($END$);
}
```

### `lst` : 找到最后一个元素

```Java
$ARRAY$[$ARRAY$.length - 1]
```

### `mn` : 最小

```Java
$VAR$ = Math.min($VAR$, $END$);
```

### `mx` : 最大

```Java
$VAR$ = Math.max($VAR$, $END$);
```

### `prisf`

```Java
private static final 
```

### `psf`

```Java
public static final 
```

### `psfi`

```Java
public static final int 
```

### `psfs`

```Java
public static final String 
```

### `psvm` / `main` : main 声明

```Java
public static void main(String[] args){
  $END$
}
```

### `ritar` : 反向循环数组

```Java
for(int $INDEX$ = $ARRAY$.length - 1; $INDEX$ >= 0; $INDEX$--) {
  $ELEMENT_TYPE$ $VAR$ = $ARRAY$[$INDEX$];
  $END$
}
```

### `RL` : 读锁

```Java
$LOCK$.readLock().lock();
try { 
  $SELECTION$
} finally {
  $LOCK$.readLock().unlock();
}
```

### `WL` : 写锁

```Java
$LOCK$.writeLock().lock();
try { 
  $SELECTION$
} finally {
  $LOCK$.writeLock().unlock();
}
```

### `serr`: 系统错误

```Java
System.err.println($END$);
```

### `serrc` : 系统错误 C 风格

```Java
System.err::println
```

### `souf` : 系统输出格式

```Java
System.out.printf("$END$");
```

### `sout` : 系统输出

```Java
System.out.println($END$);
```

### `soutc` : 系统输出 c 风格

```Java
System.out::println
```

### `soutm` 输出类名称和方法名称

```Java
System.out.println("$CLASS_NAME$.$METHOD_NAME$");
```

### `soutp` : 打印参数

```Java
System.out.println($FORMAT$);
```

### `soutv` : 输出值

```Java
System.out.println("$EXPR_COPY$ = " + $EXPR$);
```

### `St` : 字符串

```Java
String 
```

### `thr` : 抛出异常

```Java
throw new 
```

### `toar` : Collection 的值转换为数组

```Java
$COLLECTION$.toArray(new $COMPONENT_TYPE$[0])$END$
```