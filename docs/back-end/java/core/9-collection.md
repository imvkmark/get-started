---
description: '在集合中定义了接口, 实现和接口分离可以更好的为程序编写更多可能性的算法体系在 Java 类库中, 集合类的基本接口是 Collection 接口迭代器包含 4 个方法迭代器可以通过 while 来进行循环也可以使用 foreach 循环可以使用 lambda 表达式链表的图形化表示链表删除元素会比较轻松, 只需更新删除元素周围的链接即可多线程同时访问的时候使用 Vector, 非线程安全的时候使用 ArrayList有序集合, TreeSet 使用红黑树生成的数据有序集合将最小的数据从队列中移除HashMap , TreeMap 都实现了 Ma'
lastUpdated: '2025-12-06 14:57:00'
head: 
  - - meta
    - name: 'og:title'
      content: '9. 集合'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在集合中定义了接口, 实现和接口分离可以更好的为程序编写更多可能性的算法体系在 Java 类库中, 集合类的基本接口是 Collection 接口迭代器包含 4 个方法迭代器可以通过 while 来进行循环也可以使用 foreach 循环可以使用 lambda 表达式链表的图形化表示链表删除元素会比较轻松, 只需更新删除元素周围的链接即可多线程同时访问的时候使用 Vector, 非线程安全的时候使用 ArrayList有序集合, TreeSet 使用红黑树生成的数据有序集合将最小的数据从队列中移除HashMap , TreeMap 都实现了 Ma'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/core/9-collection.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/a5/a55d62a8d74fe42c9eb755a5c61575e8.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 9. 集合



## 9.1 Java 集合框架

### 9.1.1 集合接口和实现分离

在集合中定义了接口, 实现和接口分离可以更好的为程序编写更多可能性的算法体系

### 9.1.2 Collection 接口

在 Java 类库中, 集合类的基本接口是 Collection 接口

```java
public interface Collection<E> {
    boolean add(E element); 
    Iterator‹E> iterator ();
}
```

### 9.1.3 迭代器

迭代器包含 4 个方法

```java
public interface Iterator<E>
{
    E next ();
    boolean hasNext();
    void remove();
    default void forEachRemaining(Consumer<? super E> action);
}
```

迭代器可以通过 while 来进行循环

```java
CollectionString> c= . . 
Iterator<String> iter = c.iterator (); 
while (iter.hasNext ()) {
    String element = iter.next (); 
    // do something with element
}
```

也可以使用 foreach 循环

```
for(String element : c){
    // do something with element
}
```

可以使用 lambda 表达式

```
iterator.forEachRemaining(element -> do something with element);
```

### 9.1.4 泛型实用方法

## 9.2 集合框架中的接口

![](https://file.wulicode.com/notion/a5/a55d62a8d74fe42c9eb755a5c61575e8.png)

## 9.3 具体集合

![](https://file.wulicode.com/notion/73/7313dee3e958951765956c396338a8ac.png)

### 9.3.1 链表(LinkedList)

![](https://file.wulicode.com/notion/f2/f2fdeb6896781cbdaeb0a5adb40b1650.png)

链表的图形化表示

![](https://file.wulicode.com/notion/a2/a2a8d6601acf532f170be3e26101b869.png)

链表删除元素会比较轻松, 只需更新删除元素周围的链接即可

### 9.3.2 数组列表(ArrayList)

多线程同时访问的时候使用 Vector, 非线程安全的时候使用 ArrayList

### 9.3.3 散列集(HashSet)

- 根据散列码来存储数据
- bucket 数量一般设计为预计元素的 75%-150%
- 装填因子在达到指定预期的时候会扩充为 2 的下一个幂值

### 9.3.4 树集(TreeSet)

有序集合, TreeSet 使用红黑树生成的数据有序集合

- 树集必须可以比较元素

### 9.3.5 队列(Queue)与双端队列(Deque)

### 9.3.6 优先队列

将最小的数据从队列中移除

## 9.4 映射

### 9.4.1 基本映射操作

HashMap , TreeMap 都实现了 Map 接口

### 9.4.2 更新映射条目

### 9.4.3 映射视图

### 9.4.4 弱散列映射

