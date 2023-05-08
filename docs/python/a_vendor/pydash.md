# Pydash 中文文档

## arrays/数组

> 对列表进行操作的函数。
>

### chunk

均匀分割函数

```
>>> chunk([1, 2, 3, 4, 5], 2)
[[1, 2], [3, 4], [5]]
```

### compact

删除列表中所有假值

```
>>>compact([' ', 1, 0, True, False, None])
[1, True]
```

### concat

将零个或多个列表连接为一个    >>> concat([1, 2], [3, 4], [[5], [6]])

```
>>> concat([1, 2], [3, 4], [[5], [6]])
[1, 2, 3, 4, [5], [6]]
```

### difference

创建其他元素中不存在的列表元素列表

```
>>> difference([1, 2, 3], [1], [2])
[3]
```

### difference_by

他的方法与difference（）类似，只是它接受一个iterate，该iterate为每个数组的每个元素调用，以生成比较它们的标准。结果值的顺序和引用由数组确定。iteratee由一个参数调用

```
>>> difference_by([1.2, 1.5, 1.7, 2.8], [0.9, 3.2], round)
[1.5, 1.7]
```

### difference_with

此方法与difference（）类似，只是它接受一个比较器，该比较器被调用来比较所有数组的元素。结果值的顺序和引用由第一个数组确定。比较器由两个参数调用：（arr_val，oth_val）。

```
>>> array = ['apple', 'banana', 'pear']
>>> others = (['avocado', 'pumpkin'], ['peach'])
>>> comparator = lambda a, b: a[0] == b[0]
>>> difference_with(array, *others, comparator=comparator)
['banana']
```

### drop

创建一个数组切片，其中从开头删除了n个元素。

```
>>> drop([1, 2, 3, 4], 2)
[3, 4]
```

### drop_right

创建一个数组切片，其中n个元素从末尾删除。

```
>>> drop_right([1, 2, 3, 4], 2)
[1, 2]
```

### drop_right_while

创建一个数组切片，不包括从末尾删除的元素。元素被丢弃，直到断言返回false。断言由三个参数调用

```
>>> drop_right_while([1, 2, 3, 4], lambda x: x >= 3)
[1, 2]
```

### drop_while

创建一个数组切片，不包括从开头删除的元素。元素被丢弃，直到断言返回false。断言由三个参数调用

```
>>> drop_right_while([1, 2, 3, 4], lambda x: x >= 3)
[1, 2]
```

### duplicates

```
duplicates([0, 1, 3, 2, 3, 1])
[3, 1]
```

### fill

用从开始到结束（但不包括结束）的值填充数组元素。

```
>>> fill([1, 2, 3, 4, 5], 0)
[0, 0, 0, 0, 0]
>>> fill([1, 2, 3, 4, 5], 0, 1, 3)
[1, 0, 0, 4, 5]
>>> fill([1, 2, 3, 4, 5], 0, 0, 100)
[0, 0, 0, 0, 0]
```

### find_index

此方法类似于pydash.collections.find（），只是它返回通过谓词检查的元素的索引，而不是元素本身。

```
>>> find_index([1, 2, 3, 4], lambda x: x >= 3)
2
>>> find_index([1, 2, 3, 4], lambda x: x > 4)
-1
```

### flatten

```
>>> flatten([[1], [2, [3]], [[4]]])
[1, 2, [3], [4]]
```

### flatten_deep

```
>>> flatten_deep([[1], [2, [3]], [[4]]])
[1, 2, 3, 4]
```

### from_pairs

从给定的对列表中返回字典

```
>>> from_pairs([['a', 1], ['b', 2]]) == {'a': 1, 'b': 2}
True
```

### head

返回数组的第一个元素

```
>>> head([1, 2, 3, 4])
1
```

### index_of

获取找到第一个值的索引

```
>>> index_of([1, 2, 3, 4], 2)
1
>>> index_of([2, 1, 2, 3], 2, from_index=1)
2
```

### initial

返回数组中除最后一个元素之外的所有元素

```
>>> initial([1, 2, 3, 4])
[1, 2, 3]
```

### intercalate

对于列表列表，类似于interrupt（），但将结果略微平坦化

```
>>> intercalate([1, [2], [3], 4], 'x')
[1, 'x', 2, 'x', 3, 'x', 4]
```

### interleave

通过将每个列表的下一个元素按顺序循环插入新列表，将多个列表合并为一个列表。

```
>>> interleave([1, 2, 3], [4, 5, 6], [7, 8, 9])
[1, 4, 7, 2, 5, 8, 3, 6, 9]
```

### intersection

计算所有传入数组的交集

```
>>> intersection([1, 2, 3], [1, 2, 3, 4, 5], [2, 3])
[2, 3]
>>> intersection([1, 2, 3])
[1, 2, 3]
```

### intersection_by

此方法与intersection（）类似，只是它接受一个iterate，该iterate为每个数组的每个元素调用，以生成比较它们的标准。结果值的顺序和引用由数组确定。iteratee由一个参数调用

```
>>> intersection_by([1.2, 1.5, 1.7, 2.8], [0.9, 3.2], round)
[1.2, 2.8]
```

### intersection_with

此方法与intersection（）类似，只是它接受一个比较器，该比较器被调用来比较所有数组的元素。结果值的顺序和引用由第一个数组确定。比较器由两个参数调用：（arr_val，oth_val)

```
>>> array = ['apple', 'banana', 'pear']
>>> others = (['avocado', 'pumpkin'], ['peach'])
>>> comparator = lambda a, b: a[0] == b[0]
>>> intersection_with(array, *others, comparator=comparator)
['pear']
```

### intersperse

在数组元素之间插入分隔元素。

```
>>> intersperse([1, [2], [3], 4], 'x')
[1, 'x', [2], 'x', [3], 'x', 4]
```

### last

返回数组的最后一个元素

```
>>> last([1, 2, 3, 4])
4
```

### last_index_of

获取找到最后一个值的索引

```
>>> last_index_of([1, 2, 2, 4], 2)
2
>>> last_index_of([1, 2, 2, 4], 2, from_index=1)
1
```

### mapcat

将iteratee映射到列表的每个元素，并使用concat（）将结果连接到单个列表中

```
>>> mapcat(range(4), lambda x: list(range(x)))
[0, 0, 1, 0, 1, 2]
```

### nth

获取数组索引n处的元素

```
>>> nth([1, 2, 3], 0)
1
>>> nth([3, 4, 5, 6], 2)
5
>>> nth([11, 22, 33], -1)
33
>>> nth([11, 22, 33])
11
```

### pull

从给定数组中删除所有提供的值。

```
>>> pull([1, 2, 2, 3, 3, 4], 2, 3)
[1, 4]
```

### pull_all

从给定数组中删除所有提供的值

```
>>> pull_all([1, 2, 2, 3, 3, 4], [2, 3])
[1, 4]
```

### pull_all_by

此方法与pull_all（）类似，只是它接受iterate，iterate是为数组的每个元素和值调用的，以生成比较它们的标准。iteratee是用一个参数调用的：（value）

```
>>> array = [{'x': 1}, {'x': 2}, {'x': 3}, {'x': 1}]
>>> pull_all_by(array, [{'x': 1}, {'x': 3}], 'x')
[{'x': 2}]
```

### pull_all_with

此方法与pull_all（）类似，不同之处在于它接受被调用以将数组元素与值进行比较的比较器。比较器由两个参数调用：（arr_val，oth_val

```
>>> array = [{'x': 1, 'y': 2}, {'x': 3, 'y': 4}, {'x': 5, 'y': 6}]
>>> res = pull_all_with(array, [{'x': 3, 'y': 4}], lambda a, b: a == b)
>>> res == [{'x': 1, 'y': 2}, {'x': 5, 'y': 6}]
True
>>> array = [{'x': 1, 'y': 2}, {'x': 3, 'y': 4}, {'x': 5, 'y': 6}]
>>> res = pull_all_with(array, [{'x': 3, 'y': 4}], lambda a, b: a != b)
>>> res == [{'x': 3, 'y': 4}]
True
```

### pull_at

从对应于指定索引的数组中删除元素，并返回已删除元素的列表。索引可以指定为索引列表或单个参数。

```
>>> pull_at([1, 2, 3, 4], 0, 2)
[2, 4]
```

### push

将项目推到数组末尾并返回修改后的数组

```
>>> array = [1, 2, 3]
>>> push(array, 4, 5, [6])
[1, 2, 3, 4, 5, [6]]
```

### remove

```
>>> array = [1, 2, 3, 4]
>>> items = remove(array, lambda x: x >= 3)
>>> items
[3, 4]
>>> array
[1, 2]
```

### reverse

按相反顺序返回数组

```
>>> reverse([1, 2, 3, 4])
[4, 3, 2, 1]
```

### shift

移除数组的第一个元素并将其返回

```
>>> array = [1, 2, 3, 4]
>>> item = shift(array)
>>> item
1
>>> array
[2, 3, 4]
```

### slice_

从开始索引到结束索引（但不包括）对数组进行切片

```
>>> slice_([1, 2, 3, 4])
[1]
>>> slice_([1, 2, 3, 4], 1)
[2]
>>> slice_([1, 2, 3, 4], 1, 3)
[2, 3]
```

### sort

使用可选的比较器、键和反转选项对数组进行排序，并返回排序后的数组

```
>>> sort([2, 1, 4, 3])
[1, 2, 3, 4]
>>> sort([2, 1, 4, 3], reverse=True)
[4, 3, 2, 1]
>>> results = sort([{'a': 2, 'b': 1},{'a': 3, 'b': 2},{'a': 0, 'b': 3}],key=lambda item: item['a'])
>>> assert results == [{'a': 0, 'b': 3},{'a': 2, 'b': 1}, {'a': 3, 'b': 2}]
```

### sorted_index

使用二进制搜索确定应将值插入数组的最低索引，以保持其排序顺序

```
>>> sorted_index([1, 2, 2, 3, 4], 2)
1
```

### sorted_index_by

此方法与sorted_index（）类似，只是它接受iteratee，iteratee是为值和数组的每个元素调用的，以计算它们的排序排名。iteratee是用一个参数调用的：（value）

```
>>> array = [{'x': 4}, {'x': 5}]
>>> sorted_index_by(array, {'x': 4}, lambda o: o['x'])
0
>>> sorted_index_by(array, {'x': 4}, 'x')
0
```

### sorted_index_of

返回排序数组中匹配值的索引，否则为-1

```
>>> sorted_index_of([3, 5, 7, 10], 3)
0
>>> sorted_index_of([10, 10, 5, 7, 3], 10)
-1
```

### sorted_last_index

此方法与sorted_index（）类似，不同之处在于它返回最高索引，在该索引处应将值插入数组以保持其排序顺序

```
>>> sorted_last_index([1, 2, 2, 3, 4], 2)
3
```

### sorted_last_index_by

此方法与sorted_last_index（）类似，不同之处在于它接受iteratee，iteratee是为值和数组的每个元素调用的，以计算它们的排序排名。iteratee由一个参数调用：（value）

```
>>> array = [{'x': 4}, {'x': 5}]
>>> sorted_last_index_by(array, {'x': 4}, lambda o: o['x'])
1
>>> sorted_last_index_by(array, {'x': 4}, 'x')
1
```

### sorted_last_index_of

该方法与last_index_of（）类似，只是它对排序数组执行二进制搜索。

```
>>> sorted_last_index_of([4, 5, 5, 5, 6], 5)
3
>>> sorted_last_index_of([6, 5, 5, 5, 4], 6)
-1
```

### sorted_uniq

返回具有唯一元素的排序数组

```
>>> sorted_uniq([4, 2, 2, 5])
[2, 4, 5]
>>> sorted_uniq([-2, -2, 4, 1])
[-2, 1, 4]
```

### sorted_uniq_by

此方法与sorted_uniq（）类似，不同的是它接受iterate，iterate为数组中的每个元素调用，以生成计算唯一性的标准。结果值的顺序由它们在数组中出现的顺序决定。iteratee是用一个参数调用的：（value）

```
>>> sorted_uniq_by([3, 2, 1, 3, 2, 1], lambda val: val % 2)
[2, 3]
```

### splice

通过在索引开始处插入元素并在之后删除元素的计数来修改数组的内容。

```
>>> array = [1, 2, 3, 4]
>>> splice(array, 1)
[2, 3, 4]
>>> array
[1]
>>> array = [1, 2, 3, 4]
>>> splice(array, 1, 2)
[2, 3]
>>> array
[1, 4]
>>> array = [1, 2, 3, 4]
>>> splice(array, 1, 2, 0, 0)
[2, 3]
>>> array
[1, 0, 0, 4]
```

### split_at

返回由索引处数组的拆分组成的两个列表的列表

```
>>> split_at([1, 2, 3, 4], 2)
[[1, 2], [3, 4]]
```

### tail

返回数组中除第一个元素以外的所有元素

```
>>> tail([1, 2, 3, 4])
[2, 3, 4]
```

### take

创建一个数组切片，其中n个元素从开头开始

```
>>> take([1, 2, 3, 4], 2)
[1, 2]
```

### take_right

创建一个数组切片，其中n个元素从末端开始

```
>>> take_right([1, 2, 3, 4], 2)
[3, 4]
```

### take_right_while

创建一个数组切片，其中元素从末端开始。在断言返回false之前，将获取元素。谓词由三个参数调用：（value、index、array）

```
>>> take_right_while([1, 2, 3, 4], lambda x: x >= 3)
[3, 4]
```

### take_while

创建一个数组切片，其中元素从开头开始。在断言返回false之前，将获取元素。谓词由三个参数调用：（value、index、array）

```
>>> take_while([1, 2, 3, 4], lambda x: x < 3)
[1, 2]
```

### union

计算传入数组的并集

```
>>> union([1, 2, 3], [2, 3, 4], [3, 4, 5])
[1, 2, 3, 4, 5]
```

### union_by

此方法与union（）类似，不同之处在于它接受iterate，iterate为每个数组的每个元素调用，以生成计算唯一性的标准

```
>>> union_by([1, 2, 3], [2, 3, 4], iteratee=lambda x: x % 2)
[1, 2]
>>> union_by([1, 2, 3], [2, 3, 4], iteratee=lambda x: x % 9)
[1, 2, 3, 4]
```

### union_with

创建数组的无重复值版本。如果传递了iteratee，则在计算唯一性之前，数组的每个元素都会通过iteratee。iteratee由三个参数调用：（value、index、array）。如果为iteratee传递了对象路径，则创建的iteratee将返回给定元素的路径值。如果为iteratee传递了对象，则创建的过滤器样式iteratee将为具有给定对象属性的元素返回True，否则返回False

```
>>> comparator = lambda a, b: (a % 2) == (b % 2)
>>> union_with([1, 2, 3], [2, 3, 4], comparator=comparator)
[1, 2]
>>> union_with([1, 2, 3], [2, 3, 4])
[1, 2, 3, 4]
```

### uniq

```
>>> uniq([1, 2, 3, 1, 2, 3])
[1, 2, 3]
```

### uniq_by

此方法与uniq（）类似，不同之处在于它接受iterate，iterate为数组中的每个元素调用，以生成计算唯一性的标准。结果值的顺序由它们在数组中出现的顺序决定。iteratee是用一个参数调用的：（value）

```
>>> uniq_by([1, 2, 3, 1, 2, 3], lambda val: val % 2)
[1, 2]
```

### uniq_with

此方法与uniq（）类似，只是它接受被调用来比较数组元素的比较器。结果值的顺序由它们在数组中出现的顺序决定。比较器由两个参数调用：（value，other）

```
>>> uniq_with([1, 2, 3, 4, 5], lambda a, b: (a % 2) == (b % 2))
[1, 2]
```

### unshift

在数组的开头插入给定的元素并返回修改后的列表

```
>>> array = [1, 2, 3, 4]
>>> unshift(array, -1, -2)
[-1, -2, 1, 2, 3, 4]
>>> array
[-1, -2, 1, 2, 3, 4]
```

### unzip

与zip_（）相反，该方法将元素组拆分为列表，列表中的每个元素组在其对应的索引处组成

```
>>> unzip([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

### unzip_with

此方法类似于unzip（），只是它接受iterate来指定应该如何组合重新分组的值。iteratee由四个参数调用：(accumulator, value, index, group）

```
>>> from pydash import add
>>> unzip_with([[1, 10, 100], [2, 20, 200]], add)
[3, 30, 300]
```

### without

创建一个数组，删除所有出现的传递值

```
>>> without([1, 2, 3, 2, 4, 4], 2, 4)
[1, 3]
```

### xor

创建一个列表，该列表是所提供列表的对称差异

```
>>> xor([1, 3, 4], [1, 2, 4], [2])
[3]
```

### xor_by

此方法与xor（）类似，不同之处在于它接受iterate，iterate为每个数组的每个元素调用，以生成比较它们的标准。结果值的顺序由它们在数组中出现的顺序决定。iteratee是用一个参数调用的：（value

```
>>> xor_by([2.1, 1.2], [2.3, 3.4], round)
[1.2, 3.4]
>>> xor_by([{'x': 1}], [{'x': 2}, {'x': 1}], 'x')
[{'x': 2}]
```

### xor_with

此方法与xor（）类似，只是它接受被调用来比较数组元素的比较器。结果值的顺序由它们在数组中出现的顺序决定。比较器由两个参数调用：（arr_val，oth_val）

```
>>> objects = [{'x': 1, 'y': 2}, {'x': 2, 'y': 1}]
>>> others = [{'x': 1, 'y': 1}, {'x': 1, 'y': 2}]
>>> expected = [{'y': 1, 'x': 2}, {'y': 1, 'x': 1}]
>>> xor_with(objects, others, lambda a, b: a == b) == expected
True
```

### zip_

将每个数组的元素按其相应的索引分组。适用于通过匹配数组索引进行协调的单独数据源

```
>>> zip_([1, 2, 3], [4, 5, 6], [7, 8, 9])
[[1, 4, 7], [2, 5, 8], [3, 6, 9]]
```

### zip_object

创建由键和值列表组成的字典。传递单个二维列表，即[[key1，value1]，[key2，value2]]，或两个列表，一个键和一个对应的值

```
>>> zip_object([1, 2, 3], [4, 5, 6])
{1: 4, 2: 5, 3: 6}
```

### zip_object_deep

此方法与zip_object（）类似，只是它支持属性路径

```
>>> expected = {'a': {'b': {'c': 1, 'd': 2}}}
>>> zip_object_deep(['a.b.c', 'a.b.d'], [1, 2]) == expected
True
```

### zip_with

此方法与zip（）类似，只是它接受iterate来指定组合值的方式。iteratee由四个参数调用(accumulator, value, index, group)：

```
>>> from pydash import add
>>> zip_with([1, 2], [10, 20], [100, 200], add)
[111, 222]
>>> zip_with([1, 2], [10, 20], [100, 200], iteratee=add)
[111, 222]
```

## Chaining/链接

> 方法链接接口
>

### chain

创建一个包装给定值的Chain对象，以实现直观的方法链接。链接是惰性的，在调用Chain.value（）之前不会计算最终值。

```
>>> chain([1, 2, 3, 4]).map(lambda x: x * 2).sum().value()
20
>>> chain().map(lambda x: x * 2).sum()([1, 2, 3, 4])
20
```

添加了Chain.plant（）以替换初始链值。

添加了Chain.commit（），用于返回用调用Chain.value（）的结果初始化的新Chain实例

### tap

使用值作为第一个参数调用拦截器，然后返回值。此方法的目的是“挖掘”方法链，以便对链中的中间结果执行操作。

```
>>> data = []
>>> def log(value): data.append(value)
>>> chain([1, 2, 3, 4]).map(lambda x: x * 2).tap(log).value()
[2, 4, 6, 8]
>>> data
[[2, 4, 6, 8]]
```

### thru

返回对值调用拦截器的结果。此方法的目的是在方法链期间通过函数传递值。

```
>>> chain([1, 2, 3, 4]).thru(lambda x: x * 2).value()
[1, 2, 3, 4, 1, 2, 3, 4]
```

## Collections/集合

对列表和字典进行操作的函数。

### at

从集合的指定索引或键创建元素列表。索引可以指定为单个参数或索引数组。

```
>>> at([1, 2, 3, 4], 0, 2)
[1, 3]
>>> at({'a': 1, 'b': 2, 'c': 3, 'd': 4}, 'a', 'c')
[1, 3]
>>> at({'a': 1, 'b': 2, 'c': {'d': {'e': 3}}}, 'a', ['c', 'd', 'e'])
[1, 3]
```

4.1.0版本中更改：支持深度路径访问。

### count_by

创建一个由通过iteratee运行集合的每个元素的结果生成的键组成的对象。

```
>>> results = count_by([1, 2, 1, 2, 3, 4])
>>> assert results == {1: 2, 2: 2, 3: 1, 4: 1}
>>> results = count_by(['a', 'A', 'B', 'b'], lambda x: x.lower())
>>> assert results == {'a': 2, 'b': 2}
>>> results = count_by({'a': 1, 'b': 1, 'c': 3, 'd': 3})
>>> assert results == {1: 2, 3: 2}
```

### every

检查谓词是否返回集合中所有元素的真值。谓词由三个参数调用：（value、index|key、collection）。如果为谓词传递了属性名，则创建的pulp（）样式谓词将返回给定元素的属性值。如果为谓词传递对象，则创建的matches（）样式谓词将为具有给定对象属性的元素返回True，否则返回False

```
>>> every([1, True, 'hello'])
True
>>> every([1, False, 'hello'])
False
>>> every([{'a': 1}, {'a': True}, {'a': 'hello'}], 'a')
True
>>> every([{'a': 1}, {'a': False}, {'a': 'hello'}], 'a')
False
>>> every([{'a': 1}, {'a': 1}], {'a': 1})
True
>>> every([{'a': 1}, {'a': 2}], {'a': 1})
False
```

### filter_

遍历集合的元素，返回谓词返回truthy的所有元素的列表。

```
>>> results = filter_([{'a': 1}, {'b': 2}, {'a': 1, 'b': 3}], {'a': 1})
>>> assert results == [{'a': 1}, {'a': 1, 'b': 3}]
>>> filter_([1, 2, 3, 4], lambda x: x >= 3)
[3, 4]
```

### find

遍历集合的元素，返回谓词返回truthy的第一个元素。

```
>>> find([1, 2, 3, 4], lambda x: x >= 3)
3
>>> find([{'a': 1}, {'b': 2}, {'a': 1, 'b': 2}], {'a': 1})
{'a': 1
```

在版本4.0.0中更改：删除了别名detect和find_where。

### find_last

此方法与find（）类似，只是它从右到左迭代集合的元素。

```
>>> find_last([1, 2, 3, 4], lambda x: x >= 3)
4
>>> results = find_last([{'a': 1}, {'b': 2}, {'a': 1, 'b': 2}],{'a': 1})
>>> assert results == {'a': 1, 'b': 2}
```

### flat_map

通过迭代运行集合中的每个元素并展平映射结果，创建一个展平的值列表。iteratee由三个参数调用：（value，index|key，collection）。

```
>>> duplicate = lambda n: [[n, n]]
>>> flat_map([1, 2], duplicate)
[[1, 1], [2, 2]]
```

### flat_map_deep

此方法与flat_map（）类似，只是它递归地展平映射结果。

```
>>> duplicate = lambda n: [[n, n]]
>>> flat_map_deep([1, 2], duplicate)
[1, 1, 2, 2]
```

### flat_map_depth

此方法与flat_map（）类似，只是它递归地将映射结果展平到深度时间。

```
>>> duplicate = lambda n: [[n, n]]
>>> flat_map_depth([1, 2], duplicate, 1)
[[1, 1], [2, 2]]
>>> flat_map_depth([1, 2], duplicate, 2)
[1, 1, 2, 2]
```

### for_each

对集合的元素进行迭代，对每个元素执行迭代。

```
>>> results = {}
>>> def cb(x): results[x] = x ** 2
>>> for_each([1, 2, 3, 4], cb)
[1, 2, 3, 4]
>>> assert results == {1: 1, 2: 4, 3: 9, 4: 16}
```

### for_each_right

此方法与for_each（）类似，只是它从右到左迭代集合的元素。

```
>>> results = {'total': 1}
>>> def cb(x): results['total'] = x * results['total']
>>> for_each_right([1, 2, 3, 4], cb)
[1, 2, 3, 4]
>>> assert results == {'total': 24}
```

在版本4.0.0中更改：删除别名each_right。

### group_by

创建一个由通过iteratee运行集合的每个元素的结果生成的键组成的对象。

```
>>> results = group_by([{'a': 1, 'b': 2}, {'a': 3, 'b': 4}], 'a')
>>> assert results == {1: [{'a': 1, 'b': 2}], 3: [{'a': 3, 'b': 4}]}
>>> results = group_by([{'a': 1, 'b': 2}, {'a': 3, 'b': 4}], {'a': 1})
>>> assert results == {False: [{'a': 3, 'b': 4}], True: [{'a': 1, 'b': 2}]}
```

### includes

检查集合中是否存在给定值。如果from_index为负，则将其用作距集合末尾的偏移量。

```
>>> includes([1, 2, 3, 4], 2)
True
>>> includes([1, 2, 3, 4], 2, from_index=2)
False
>>> includes({'a': 1, 'b': 2, 'c': 3, 'd': 4}, 2)
True
```

在版本4.0.0中更改：从contains重命名为includes，并删除别名include。

### invoke_map

在集合中每个元素的路径处调用方法，返回每个调用方法的结果列表。将为每个调用的方法提供任何其他参数。如果path是一个函数，则会为集合中的每个元素调用它。

```
>>> items = [{'a': [{'b': 1}]}, {'a': [{'c': 2}]}]
>>> expected = [{'b': 1}.items(), {'c': 2}.items()]
>>> invoke_map(items, 'a[0].items') == expected
True
```

### key_by

创建一个由通过给定iterate运行集合的每个元素的结果生成的键组成的对象。

```
>>> results = key_by([{'a': 1, 'b': 2}, {'a': 3, 'b': 4}], 'a')
>>> assert results == {1: {'a': 1, 'b': 2}, 3: {'a': 3, 'b': 4}}
```

在版本4.0.0中更改：从index_by重命名为key_by。

### map_

通过iteratee运行集合中的每个元素来创建一个值数组。iteratee由三个参数调用：（value，index|key，collection）。如果为iteratee传递了属性名，则创建的pickle（）样式iteratee将返回给定元素的属性值。如果为iteratee传递了对象，则创建的matches（）样式iteratee将为具有给定对象属性的元素返回True，否则返回False。

```
>>> map_([1, 2, 3, 4], str)
['1', '2', '3', '4']
>>> map_([{'a': 1, 'b': 2}, {'a': 3, 'b': 4}, {'a': 5, 'b': 6}], 'a')
[1, 3, 5]
>>> map_([[[0, 1]], [[2, 3]], [[4, 5]]], '0.1')
[1, 3, 5]
>>> map_([{'a': {'b': 1}}, {'a': {'b': 2}}], 'a.b')
[1, 2]
>>> map_([{'a': {'b': [0, 1]}}, {'a': {'b': [2, 3]}}], 'a.b[1]')
[1, 3]
```

在版本4.0.0中更改：已删除别名集合。

### nest

此方法与group_by（）类似，只是它支持通过多个字符串属性进行嵌套分组。如果只给定一个键，则类似于调用group_by（collection，prop）。

```
>>> results = nest([{'shape': 'square', 'color': 'red', 'qty': 5},  {'shape': 'square', 'color': 'blue', 'qty': 10},{'shape': 'square', 'color': 'orange', 'qty': 5}, {'shape': 'circle', 'color': 'yellow', 'qty': 5},{'shape': 'circle', 'color': 'pink', 'qty': 10},{'shape': 'oval', 'color': 'purple', 'qty': 5}],'shape', 'qty')
>>> expected = {'square': {5: [{'shape': 'square', 'color': 'red', 'qty': 5}, {'shape': 'square', 'color': 'orange', 'qty': 5}],10: [{'shape': 'square', 'color': 'blue', 'qty': 10}]},            'circle': {5: [{'shape': 'circle', 'color': 'yellow', 'qty': 5}], 10: [{'shape': 'circle', 'color': 'pink', 'qty': 10}]},            'oval': {5: [{'shape': 'oval', 'color': 'purple', 'qty': 5}]}}
>>> results == expected
True
```

### order_by

此方法与sort_by（）类似，只是它按键名排序，而不是按iteratee函数排序。通过在键名称前加上“-”（例如“name”将变为“-name”）或通过True为升序、False为降序的顺序传递布尔排序选项列表，可以按降序对键进行排序。

```
>>> items = [{'a': 2, 'b': 1}, {'a': 3, 'b': 2}, {'a': 1, 'b': 3}]
>>> results = order_by(items, ['b', 'a'])
>>> assert results == [{'a': 2, 'b': 1}, {'a': 3, 'b': 2},{'a': 1, 'b': 3}]
>>> results = order_by(items, ['a', 'b'])
>>> assert results == [{'a': 1, 'b': 3}, {'a': 2, 'b': 1},{'a': 3, 'b': 2}]
>>> results = order_by(items, ['-a', 'b'])
>>> assert results == [{'a': 3, 'b': 2},{'a': 2, 'b': 1}, {'a': 1, 'b': 3}]
>>> results = order_by(items, ['a', 'b'], [False, True])
>>> assert results == [{'a': 3, 'b': 2},{'a': 2, 'b': 1},{'a': 1, 'b': 3}]
```

在版本3.2.0中更改：添加订单参数。

在版本3.2.0中更改：添加了sort_by_order（）作为别名。

在版本4.0.0中更改：从order_by重命名为order_by，并删除了别名sort_byorder

### partition

创建一个分为两组的元素数组，第一组包含谓词为其返回truthy的元素，而第二组包含谓词返回false的元素。谓词由三个参数调用：（value、index|key、collection）。

如果为谓词提供了属性名，则创建的pulp（）样式谓词返回给定元素的属性值。

如果为谓词提供了对象，则所创建的matches（）样式谓词对于具有给定对象属性的元素返回True，否则返回False。

```
>>> partition([1, 2, 3, 4], lambda x: x >= 3)
[[3, 4], [1, 2]]
```

### pluck

从集合中的所有元素中检索指定属性的值。

```
>>> pluck([{'a': 1, 'b': 2}, {'a': 3, 'b': 4}, {'a': 5, 'b': 6}], 'a')
[1, 3, 5]
>>> pluck([[[0, 1]], [[2, 3]], [[4, 5]]], '0.1')
[1, 3, 5]
>>> pluck([{'a': {'b': 1}}, {'a': {'b': 2}}], 'a.b')
[1, 2]
>>> pluck([{'a': {'b': [0, 1]}}, {'a': {'b': [2, 3]}}], 'a.b.1')
[1, 3]
>>> pluck([{'a': {'b': [0, 1]}}, {'a': {'b': [2, 3]}}], ['a', 'b', 1])
[1, 3]
```

在版本4.0.0中更改：功能已删除。

在版本4.0.1中更改：使属性访问更深入。

### reduce_

将集合减少到一个值，该值是通过iteratee运行集合中的每个元素的累积结果，其中每个连续的iteratee执行都会消耗上一次执行的返回值。

```
>>> reduce_([1, 2, 3, 4], lambda total, x: total * x)
24
```

在版本4.0.0中更改：删除了别名foldl和inject。

### reduce_right

此方法与reduce_（）类似，只是它从右到左迭代集合的元素。

```
>>> reduce_right([1, 2, 3, 4], lambda total, x: total ** x)
4096
```

在版本3.2.1中进行了更改：修复了集合未正确反转的错误。

在版本4.0.0中更改：已删除别名文件夹

### reductions

此函数类似于reduce_（），只是它返回了reduce操作中每个中间值的列表。

```
>>> reductions([1, 2, 3, 4], lambda total, x: total * x)
[2, 6, 24]
```

### reductions_right

此方法与reductions（）类似，只是它从右到左迭代集合的元素。

```
>>> reductions_right([1, 2, 3, 4], lambda total, x: total ** x)
[64, 4096, 4096]
```

### reject

与filter_（）相反，此方法返回谓词不返回truthy的集合元素。

```
>>> reject([1, 2, 3, 4], lambda x: x >= 3)
[1, 2]
>>> reject([{'a': 0}, {'a': 1}, {'a': 2}], 'a')
[{'a': 0}]
>>> reject([{'a': 0}, {'a': 1}, {'a': 2}], {'a': 1})
[{'a': 0}, {'a': 2}]
```

### sample

从给定集合中检索随机元素。

```
>>> items = [1, 2, 3, 4, 5]
>>> results = sample(items)
>>> assert results in items
```

在版本4.0.0中更改：将多个示例功能移动到sample_size（）。此函数现在只返回单个随机样本。

### sample_size

从集合中检索n个随机元素的列表。

```
>>> items = [1, 2, 3, 4, 5]
>>> results = sample_size(items, 2)
>>> assert len(results) == 2
>>> assert set(items).intersection(results) == set(results)
```

### shuffle

使用Fisher Yates洗牌的版本创建一个洗牌值列表。

```
>>> items = [1, 2, 3, 4]
>>> results = shuffle(items)
>>> assert len(results) == len(items)
>>> assert set(results) == set(items)
```

### size

通过返回可迭代对象的len（集合）获取集合的大小。

```
>>> size([1, 2, 3, 4])
4
```

### some

检查谓词是否返回集合中任何元素的真值。谓词由三个参数调用：（value、index|key、collection）。如果为谓词传递了属性名，则创建的map_（）样式谓词将返回给定元素的属性值。如果为谓词传递对象，则创建的matches（）样式谓词将为具有给定对象属性的元素返回True，否则返回False。

```
>>> some([False, True, 0])
True
>>> some([False, 0, None])
False
>>> some([1, 2, 3, 4], lambda x: x >= 3)
True
>>> some([1, 2, 3, 4], lambda x: x == 0)
False
```

在版本4.0.0中更改：删除了别名any_。

### sort_by

创建元素列表，按通过iteratee运行集合中每个元素的结果升序排序。

```
>>> sort_by({'a': 2, 'b': 3, 'c': 1})
[1, 2, 3]
>>> sort_by({'a': 2, 'b': 3, 'c': 1}, reverse=True)
[3, 2, 1]
>>> sort_by([{'a': 2}, {'a': 3}, {'a': 1}], 'a')
[{'a': 1}, {'a': 2}, {'a': 3}]
```

## Functions/函数

> 包装其他函数的函数。
>

### after

创建一个函数，该函数仅在调用n次后使用所创建函数的参数执行func。

```
>>> func = lambda a, b, c: (a, b, c)
>>> after_func = after(func, 3)
>>> after_func(1, 2, 3)
>>> after_func(1, 2, 3)
>>> after_func(1, 2, 3)
(1, 2, 3)
>>> after_func(4, 5, 6)
(4, 5, 6)
```

在版本3.0.0中进行了更改：重新排列参数以首先生成func。

### ary

创建一个函数，该函数最多接受n个参数，忽略任何其他参数。只有位置参数有上限。所有关键字参数都允许通过。

```
>>> func = lambda a, b, c=0, d=5: (a, b, c, d)
>>> ary_func = ary(func, 2)
>>> ary_func(1, 2, 3, 4, 5, 6)
(1, 2, 0, 5)
>>> ary_func(1, 2, 3, 4, 5, 6, c=10, d=20)
(1, 2, 10, 20)
```

### before

使用创建的函数的参数创建一个执行func的函数，直到它被调用n次。

```
>>> func = lambda a, b, c: (a, b, c)
>>> before_func = before(func, 3)
>>> before_func(1, 2, 3)
(1, 2, 3)
>>> before_func(1, 2, 3)
(1, 2, 3)
>>> before_func(1, 2, 3)
>>> before_func(1, 2, 3)
```

在版本3.0.0中进行了更改：重新排列参数以首先生成func。

### conjoin

创建一个函数，将多个谓词函数组合成一个谓词，用于测试对象的所有元素是否通过每个谓词。

```
>>> conjoiner = conjoin(lambda x: isinstance(x, int), lambda x: x > 3)
>>> conjoiner([1, 2, 3])
False
>>> conjoiner([1.0, 2, 1])
False
>>> conjoiner([4.0, 5, 6])
False
>>> conjoiner([4, 5, 6])
True
```

### curry

创建一个接受一个或多个func参数的函数，当调用该函数时，执行func并返回其结果（如果已提供所有func参数），或返回一个接受剩余func参数中的一个或更多个的函数，依此类推。

```
>>> func = lambda a, b, c: (a, b, c)
>>> currier = curry(func)
>>> currier = currier(1)
>>> assert isinstance(currier, Curry)
>>> currier = currier(2)
>>> assert isinstance(currier, Curry)
>>> currier = currier(3)
>>> currier
(1, 2, 3)
```

### curry_right

此方法与curry（）类似，只是参数以partial_right（）而不是partial（）的方式应用于func。

```
>>> func = lambda a, b, c: (a, b, c)
>>> currier = curry_right(func)
>>> currier = currier(1)
>>> assert isinstance(currier, CurryRight)
>>> currier = currier(2)
>>> assert isinstance(currier, CurryRight)
>>> currier = currier(3)
>>> currier
(3, 2, 1)
```

### debounce

创建一个函数，该函数将延迟func的执行，直到自上次调用func以来经过了等待毫秒。对反跳函数的后续调用将返回最后一个func调用的结果。

### delay

等待毫秒后执行func函数。调用func时，将向其提供其他参数。

### disjoin

创建一个函数，将多个谓词函数组合成一个谓词，用于测试对象的任何元素是否通过每个谓词。

```
>>> disjoiner = disjoin(lambda x: isinstance(x, float), lambda x: isinstance(x, int))
>>> disjoiner([1, '2', '3'])
True
>>> disjoiner([1.0, '2', '3'])
True
>>> disjoiner(['1', '2', '3'])
False
```

### flip

创建调用参数反转的方法的函数。

```
>>> flipped = flip(lambda *args: args)
>>> flipped(1, 2, 3, 4)
(4, 3, 2, 1)
>>> flipped = flip(lambda *args: [i * 2 for i in args])
>>> flipped(1, 2, 3, 4)
[8, 6, 4, 2]
```

### flow

创建一个函数，该函数是所提供函数的组合，其中每个连续调用都提供上一个函数的返回值。例如，组合函数f（）、g（）和h（）生成h（g（f（）））。

```
>>> mult_5 = lambda x: x * 5
>>> div_10 = lambda x: x / 10.0
>>> pow_2 = lambda x: x ** 2
>>> ops = flow(sum, mult_5, div_10, pow_2)
>>> ops([1, 2, 3, 4])
25.0
```

在2.3.1版中进行了更改：添加了pipe（）作为别名。

在版本4.0.0中更改：删除了别名管道。

### flow_right

此函数类似于flow（），只是它创建了一个从右到左调用所提供函数的函数。例如，组合函数f（）、g（）和h（）生成f（g（h））。

```
>>> mult_5 = lambda x: x * 5
>>> div_10 = lambda x: x / 10.0
>>> pow_2 = lambda x: x ** 2
>>> ops = flow_right(mult_5, div_10, pow_2, sum)
>>> ops([1, 2, 3, 4])
50.0
```

在2.0.0版本中进行了更改：添加了flow_right（）并使compose（）成为别名。

在版本2.3.1中进行了更改：添加了pipe_right（）作为别名。

在版本4.0.0中更改：删除了别名pipe_right和compose。

### iterated

创建由自身组成的函数。对迭代函数的每次调用都使用前一个函数调用的结果作为输入。返回的迭代实例可以用（initial，n）调用，其中initial是为func种子的初始值，n是调用func的次数。

```
>>> doubler = iterated(lambda x: x * 2)
>>> doubler(4, 5)
128
>>> doubler(3, 9)
1536
```

### juxtapose

创建一个函数，其返回值是使用提供的参数调用每个函数的结果列表。

```
>>> double = lambda x: x * 2
>>> triple = lambda x: x * 3
>>> quadruple = lambda x: x * 4
>>> juxtapose(double, triple, quadruple)(5)
[10, 15, 20]
```

### negate

创建一个否定谓词func结果的函数。func函数使用创建的函数的参数执行。

```
>>> not_is_number = negate(lambda x: isinstance(x, (int, float)))
>>> not_is_number(1)
False
>>> not_is_number('1')
True
```

### once

创建一个限制执行func一次的函数。对函数的重复调用将返回第一次调用的值。

```
>>> oncer = once(lambda *args: args[0])
>>> oncer(5)
5
>>> oncer(6)
5
```

### over_args

创建一个函数，该函数通过相应的转换函数运行每个参数。

```
>>> squared = lambda x: x ** 2
>>> double = lambda x: x * 2
>>> modder = over_args(lambda x, y: [x, y], squared, double)
>>> modder(5, 10)
[25, 20]
```

在版本4.0.0中更改：从mod_args重命名为over_args。

### partial

创建一个函数，当调用该函数时，该函数调用func，并在提供给新函数的部分参数之前附加任何其他部分参数。

```
>>> dropper = partial(lambda array, n: array[n:], [1, 2, 3, 4])
>>> dropper(2)
[3, 4]
>>> dropper(1)
[2, 3, 4]
>>> myrest = partial(lambda array, n: array[n:], n=1)
>>> myrest([1, 2, 3, 4])
[2, 3, 4]
```

### partial_right

此方法与partial（）类似，只是将部分参数附加到提供给新函数的参数上。

```
>>> myrest = partial_right(lambda array, n: array[n:], 1)
>>> myrest([1, 2, 3, 4])
[2, 3, 4]
```

### rearg

创建一个函数，该函数使用根据指定索引排列的参数调用func，其中第一个索引处的参数值作为第一个参数提供，第二个索引处参数值作为第二个参数提供等等。

```
>>> jumble = rearg(lambda *args: args, 1, 2, 3)
>>> jumble(1, 2, 3)
(2, 3, 1)
>>> jumble('a', 'b', 'c', 'd', 'e')
('b', 'c', 'd', 'a', 'e')
```

### spread

创建一个函数，该函数使用提供给所创建函数的参数数组调用func。

```
>>> greet = spread(lambda *people: 'Hello ' + ', '.join(people) + '!')
>>> greet(['Mike', 'Don', 'Leo'])
'Hello Mike, Don, Leo!
```

### throttle

创建一个函数，该函数在执行时，每等待毫秒最多只能调用一次func函数。对节流函数的后续调用将返回上次func调用的结果。

### unary

创建最多接受一个参数的函数，忽略任何其他参数。

```
>>> func = lambda a, b=1, c=0, d=5: (a, b, c, d)
>>> unary_func = unary(func)
>>> unary_func(1, 2, 3, 4, 5, 6)
(1, 1, 0, 5)
>>> unary_func(1, 2, 3, 4, 5, 6, b=0, c=10, d=20)
(1, 0, 10, 20)
```

### wrap

创建一个函数，该函数向包装函数提供值作为其第一个参数。提供给函数的其他参数附加到提供给包装函数的参数。

```
>>> wrapper = wrap('hello', lambda *args: args)
>>> wrapper(1, 2)
('hello', 1, 2)
```

## Numerical/数字

> 数值/数学相关函数。
>

### add

添加两个数字。

```
>>> add(10, 5)
15
```

在版本3.3.0中更改：支持在作为位置参数传递时添加两个数字。

在版本4.0.0中更改：仅支持两个参数相加

### ceil

精确到整数。

```
>>> ceil(3.275) == 4.0
True
>>> ceil(3.215, 1) == 3.3
True
>>> ceil(6.004, 2) == 6.01
True
```

### clamp

在包含的下限和上限内夹紧数。

```
>>> clamp(-10, -5, 5)
-5
>>> clamp(10, -5, 5)
5
>>> clamp(10, 5)
5
>>> clamp(-10, 5)
-10
```

### divide

除以两个数字

```
>>> divide(20, 5)
4.0
>>> divide(1.5, 3)
0.5
>>> divide(None, None)
1.0
>>> divide(5, None)
5.0
```

### floor

将数字向下舍入到精度。

```
>>> floor(3.75) == 3.0
True
>>> floor(3.215, 1) == 3.2
True
>>> floor(0.046, 2) == 0.04
True
```

### max_

检索集合的最大值。

```
>>> max_([1, 2, 3, 4])
4
>>> max_([], default=-1)
-1
```

在版本4.0.0中更改：将iteratee-iteratee支持移动到max_by（）。

### max_by

检索集合的最大值。

```
>>> max_by([1.0, 1.5, 1.8], math.floor)
1.0
>>> max_by([{'a': 1}, {'a': 2}, {'a': 3}], 'a')
{'a': 3}
>>> max_by([], default=-1)
-1
```

### mean

计算集合中每个元素的算术平均值。

```
>>> mean([1, 2, 3, 4])
2.5
```

在版本4.0.0中更改：

删除了平均值和平均值别名。

将iteratee功能移动到mean_by（）。

### mean_by

计算集合中每个元素的算术平均值。如果传递了iteratee，则在计算平均值之前，集合的每个元素都会通过iteratee。

```
>>> mean_by([1, 2, 3, 4], lambda x: x ** 2)
7.5
```

### median

计算集合中每个元素的中值。如果传递了iteratee，则在计算中值之前，集合的每个元素都会通过iteratee。

```
>>> median([1, 2, 3, 4, 5])
3
>>> median([1, 2, 3, 4])
2.5
```

### min_

检索集合的最小值。

```
>>> min_([1, 2, 3, 4])
1
>>> min_([], default=100)
100
```

在版本4.0.0中更改：将iteratee-iteratee支持移动到min_by（）。

### min_by

检索集合的最小值。

```
>>> min_by([1.8, 1.5, 1.0], math.floor)
1.8
>>> min_by([{'a': 1}, {'a': 2}, {'a': 3}], 'a')
{'a': 1}
>>> min_by([], default=100)
100
```

### moving_mean

计算阵列中每个元素的移动平均值。

```
>>> moving_mean(range(10), 1)
[0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]
>>> moving_mean(range(10), 5)
[2.0, 3.0, 4.0, 5.0, 6.0, 7.0]
>>> moving_mean(range(10), 10)
[4.5]
```

在4.0.0版本中进行了更改：重命名为moving_mean并删除moving_average和moving_avg别名。

### multiply

将两个数字相乘。

```
>>> multiply(4, 5)
20
>>> multiply(10, 4)
40
>>> multiply(None, 10)
10
>>> multiply(None, None)
1
```

### power

计算x的n次幂幂。

```
>>> power(5, 2)
25
>>> power(12.5, 3)
1953.125
```

在版本4.0.0中更改：删除了别名pow_。

### round_

将数字舍入为精度。

```
>>> round_(3.275) == 3.0
True
>>> round_(3.275, 1) == 3.3
True
```

在版本4.0.0中更改：删除别名曲线。

### scale

将值列表缩放到最大值。

```
>>> scale([1, 2, 3, 4])
[0.25, 0.5, 0.75, 1.0]
>>> scale([1, 2, 3, 4], 1)
[0.25, 0.5, 0.75, 1.0]
>>> scale([1, 2, 3, 4], 4)
[1.0, 2.0, 3.0, 4.0]
>>> scale([1, 2, 3, 4], 2)
[0.5, 1.0, 1.5, 2.0]
```

### slope

计算两点之间的斜率。

```
>>> slope((1, 2), (4, 8))
2.0
```

### std_deviation

计算数字列表的标准偏差。

```
>>> round(std_deviation([1, 18, 20, 4]), 2) == 8.35
True
```

在版本4.0.0中更改：删除别名sigma。

### sum_

对集合中的每个元素求和。

```
>>> sum_([1, 2, 3, 4])
10
```

在版本3.3.0中更改：支持在作为位置参数传递时添加两个数字。

在版本4.0.0中更改：将iteratee支持移动到sum_by（）。将两个参数相加移动到add（）。

### sum_by

对集合中的每个元素求和。如果传递了iteratee，则在计算求和之前，集合的每个元素都会传递给iteratee。

```
>>> sum_by([1, 2, 3, 4], lambda x: x ** 2)
30
```

### subtract

减去两个数字。

```
>>> subtract(10, 5)
5
>>> subtract(-10, 4)
-14
>>> subtract(2, 0.5)
1.5
```

### transpose

转换数组元素。

```
>>> transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
[[1, 4, 7], [2, 5, 8], [3, 6, 9]]
```

### variance

计算数组中元素的方差。

```
>>> variance([1, 18, 20, 4])
69.6875
```

### zscore

假设正态分布，计算标准分数。如果传递了iteratee，则在计算标准分数之前，集合的每个元素都会传递给iteratee。

```
>>> results = zscore([1, 2, 3])
```

## Objects/对象

> 对列表、字典和其他对象进行操作的函数。
>

### assign

将源对象的属性指定给目标对象。

```
>>> obj = {}
>>> obj2 = assign(obj, {'a': 1}, {'b': 2}, {'c': 3})
>>> obj == {'a': 1, 'b': 2, 'c': 3}
True
>>> obj is obj2
True
```

obj被就地修改。

### assign_with

此方法与assign（）类似，只是它接受被调用以生成指定值的自定义程序。如果customizer返回None，则赋值由该方法处理。自定义程序由五个参数调用：（obj_value、src_value、key、obj、source）。

```
>>> customizer = lambda o, s: s if o is None else o
>>> results = assign({'a': 1}, {'b': 2}, {'a': 3}, customizer)
>>> results == {'a': 1, 'b': 2}
True
```

obj被就地修改。

### callables

创建可调用对象的键的排序列表。

```
>>> callables({'a': 1, 'b': lambda: 2, 'c': lambda: 3})
['b', 'c']
```

### clone

创建值的克隆。

```
>>> x = {'a': 1, 'b': 2, 'c': {'d': 3}}
>>> y = clone(x)
>>> y == y
True
>>> x is y
False
>>> x['c'] is y['c']
True
```

### clone_deep

创建价值的深度克隆。如果提供了iterate，则将执行它以生成克隆的值。

```
>>> x = {'a': 1, 'b': 2, 'c': {'d': 3}}
>>> y = clone_deep(x)
>>> y == y
True
>>> x is y
False
>>> x['c'] is y['c']
False
```

### clone_deep_with

此方法与clone_with（）类似，只是它递归地克隆值。

### clone_with

此方法与clone（）类似，只是它接受被调用以生成克隆值的自定义程序。如果customizer返回None，克隆将由该方法处理。自定义程序最多使用三个参数调用：（value、index|key、object）。

```
>>> x = {'a': 1, 'b': 2, 'c': {'d': 3}}
>>> cbk = lambda v, k: v + 2 if isinstance(v, int) and k else None
>>> y = clone_with(x, cbk)
>>> y == {'a': 3, 'b': 4, 'c': {'d': 3}}
True
```

### defaults

为解析为未定义的所有目标属性将源对象的属性分配给目标对象。

```
>>> obj = {'a': 1}
>>> obj2 = defaults(obj, {'b': 2}, {'c': 3}, {'a': 4})
>>> obj is obj2
True
>>> obj == {'a': 1, 'b': 2, 'c': 3}
True
```

### defaults_deep

此方法与defaults（）类似，只是它递归地分配默认属性。

```
>>> obj = {'a': {'b': 1}}
>>> obj2 = defaults_deep(obj, {'a': {'b': 2, 'c': 3}})
>>> obj is obj2
True
>>> obj == {'a': {'b': 1, 'c': 3}}
True
```

### find_key

此方法类似于pydash.arrays.find_index（），只是它返回通过谓词检查的第一个元素的键，而不是元素本身。

```
>>> find_key({'a': 1, 'b': 2, 'c': 3}, lambda x: x == 1)
'a'
>>> find_key([1, 2, 3, 4], lambda x: x == 1)
0
```

### find_last_key

此方法与find_key（）类似，只是它以相反的顺序迭代集合的元素。

```
>>> find_last_key({'a': 1, 'b': 2, 'c': 3}, lambda x: x == 1)
'a'
>>> find_last_key([1, 2, 3, 1], lambda x: x == 1)
3
```

### for_in

遍历obj的自身和继承的可枚举属性，为每个属性执行iterate。

```
>>> obj = {}
>>> def cb(v, k): obj[k] = v
>>> results = for_in({'a': 1, 'b': 2, 'c': 3}, cb)
>>> results == {'a': 1, 'b': 2, 'c': 3}
True
>>> obj == {'a': 1, 'b': 2, 'c': 3}
True
```

### for_in_right

此函数类似于for_in（），只是它以相反的顺序迭代属性。

```
>>> data = {'product': 1}
>>> def cb(v): data['product'] *= v
>>> for_in_right([1, 2, 3, 4], cb)
[1, 2, 3, 4]
>>> data['product'] == 24
True
```

### get

根据路径描述的路径获取嵌套对象的任何深度处的值。如果路径不存在，则返回默认值。

```
>>> get({}, 'a.b.c') is None
True
>>> get({'a': {'b': {'c': [1, 2, 3, 4]}}}, 'a.b.c[1]')
2
>>> get({'a': {'b': {'c': [1, 2, 3, 4]}}}, 'a.b.c.1')
2
>>> get({'a': {'b': [0, {'c': [1, 2]}]}}, 'a.b.1.c.1')
2
>>> get({'a': {'b': [0, {'c': [1, 2]}]}}, ['a', 'b', 1, 'c', 1])
2
>>> get({'a': {'b': [0, {'c': [1, 2]}]}}, 'a.b.1.c.2') is None
True
```

### has

检查路径是否作为obj的键存在。

```
>>> has([1, 2, 3], 1)
True
>>> has({'a': 1, 'b': 2}, 'b')
True
>>> has({'a': 1, 'b': 2}, 'c')
False
>>> has({'a': {'b': [0, {'c': [1, 2]}]}}, 'a.b.1.c.1')
True
>>> has({'a': {'b': [0, {'c': [1, 2]}]}}, 'a.b.1.c.2')
False
```

### invert

创建由反转键和给定对象的值组成的对象

```
>>> results = invert({'a': 1, 'b': 2, 'c': 3})
>>> results == {1: 'a', 2: 'b', 3: 'c'}
True
```

### invert_by

此方法与invert（）类似，不同的是，反转对象是通过iteratee运行每个对象元素的结果生成的。每个反转键的对应反转值是负责生成反转值的键的列表。iteratee是用一个参数调用的：（value）。

```
>>> obj = {'a': 1, 'b': 2, 'c': 1}
>>> results = invert_by(obj)  # {1: ['a', 'c'], 2: ['b']}
>>> set(results[1]) == set(['a', 'c'])
True
>>> set(results[2]) == set(['b'])
True
>>> results2 = invert_by(obj, lambda value: 'group' + str(value))
>>> results2['group1'] == results[1]
True
>>> results2['group2'] == results[2]
True
```

### invoke

在对象的路径处调用方法。

```
>>> obj = {'a': [{'b': {'c': [1, 2, 3, 4]}}]}
>>> invoke(obj, 'a[0].b.c.pop', 1)
2
>>> obj
{'a': [{'b': {'c': [1, 3, 4]}}]}
```

### keys

创建由obj的键组成的列表。

```
>>> keys([1, 2, 3])
[0, 1, 2]
>>> set(keys({'a': 1, 'b': 2, 'c': 3})) == set(['a', 'b', 'c'])
True
```

### map_keys

与map_values（）相反，此方法创建一个对象，该对象的值与通过iteratee运行对象的每个可枚举字符串键属性生成的对象和键相同。iteratee由三个参数调用：（value、key、object）。

```
>>> callback = lambda value, key: key * 2
>>> results = map_keys({'a': 1, 'b': 2, 'c': 3}, callback)
>>> results == {'aa': 1, 'bb': 2, 'cc': 3}
True
```

### map_values

创建一个具有与对象相同键的对象，并通过iteratee运行对象的每个字符串键属性生成值。iteratee由三个参数调用：（value、key、object）。

```
>>> results = map_values({'a': 1, 'b': 2, 'c': 3}, lambda x: x * 2)
>>> results == {'a': 2, 'b': 4, 'c': 6}
True
>>> results = map_values({'a': 1, 'b': {'d': 4}, 'c': 3}, {'d': 4})
>>> results == {'a': False, 'b': True, 'c': False}
True
```

### map_values_deep

使用iteratee的返回值映射obj中的所有非对象值。iteratee由两个参数调用：（obj_value，property_path），其中property_paath包含与obj_vvalue的路径对应的路径键列表。

```
>>> x = {'a': 1, 'b': {'c': 2}}
>>> y = map_values_deep(x, lambda val: val * 2)
>>> y == {'a': 2, 'b': {'c': 4}}
True
>>> z = map_values_deep(x, lambda val, props: props)
>>> z == {'a': ['a'], 'b': {'c': ['b', 'c']}}
True
```

### merge

递归地将源对象的属性合并到目标对象中。后续源将覆盖先前源的属性分配。

```
>>> obj = {'a': 2}
>>> obj2 = merge(obj, {'a': 1}, {'b': 2, 'c': 3}, {'d': 4})
>>> obj2 == {'a': 1, 'b': 2, 'c': 3, 'd': 4}
True
>>> obj is obj2
True
```

### merge_with

此方法与merge（）类似，只是它接受自定义程序，调用自定义程序生成目标和源属性的合并值。如果customizer返回None，则由该方法处理合并。自定义程序由五个参数调用：

```
>>> cbk = lambda obj_val, src_val: obj_val + src_val
>>> obj1 = {'a': [1], 'b': [2]}
>>> obj2 = {'a': [3], 'b': [4]}
>>> res = merge_with(obj1, obj2, cbk)
>>> obj1 == {'a': [1, 3], 'b': [2, 4]}
True
```

### omit

与pick（）相反。此方法创建一个由未省略的obj属性路径组成的对象。

```
>>> omit({'a': 1, 'b': 2, 'c': 3}, 'b', 'c') == {'a': 1}
True
>>> omit({'a': 1, 'b': 2, 'c': 3 }, ['a', 'c']) == {'b': 2}
True
>>> omit([1, 2, 3, 4], 0, 3) == {1: 2, 2: 3}
True
>>> omit({'a': {'b': {'c': 'd'}}}, 'a.b.c') == {'a': {'b': {}}}
True
```

### omit_by

与pick_by（）相反。此方法创建一个由谓词不返回truthy的对象的字符串键属性组成的对象。谓词由两个参数调用：（value，key）。

```
>>> omit_by({'a': 1, 'b': '2', 'c': 3}, lambda v: isinstance(v, int))
{'b': '2'}
```

### parse_int

将给定值转换为指定基数的整数。如果基数为假，则使用基数10，除非值为十六进制，在这种情况下使用基数16。

```
>>> parse_int('5')
5
>>> parse_int('12', 8)
10
>>> parse_int('x') is None
True
```

### pick

创建由拾取的对象属性组成的对象。

```
>>> pick({'a': 1, 'b': 2, 'c': 3}, 'a', 'b') == {'a': 1, 'b': 2}
True
```

### pick_by

创建一个由谓词返回truthy for的对象属性组成的对象。谓词由两个参数调用：（value，key）。

```
>>> obj = {'a': 1, 'b': '2', 'c': 3 }
>>> pick_by(obj, lambda v: isinstance(v, int)) == {'a': 1, 'c': 3}
True
```

### rename_keys

使用key_map重命名obj的键并返回新对象。

```
>>> obj = rename_keys({'a': 1, 'b': 2, 'c': 3}, {'a': 'A', 'b': 'B'})
>>> obj == {'A': 1, 'B': 2, 'c': 3}
True
```

### set_

设置按路径描述的对象的值。如果对象路径的任何部分不存在，将创建它。

```
>>> set_({}, 'a.b.c', 1)
{'a': {'b': {'c': 1}}}
>>> set_({}, 'a.0.c', 1)
{'a': {'0': {'c': 1}}}
>>> set_([1, 2], '[2][0]', 1)
[1, 2, [1]]
>>> set_({}, 'a.b[0].c', 1)
{'a': {'b': [{'c': 1}]}}
```

### set_with

此方法与set_（）类似，只是它接受被调用以生成路径对象的自定义程序。如果自定义程序返回未定义的路径，则由该方法处理创建。自定义程序由三个参数调用：（nested_value、key、nested_object）。

```
>>> set_with({}, '[0][1]', 'a', lambda: {})
{0: {1: 'a'}}
```

### to_boolean

将obj转换为布尔值。这与内置布尔函数不同。默认情况下，通常认为的字符串值转换为其布尔等效值，即“0”和“false”转换为false，而“1”和“true”转换为true。如果提供的字符串值未被识别为具有公共布尔转换，则返回值为None。obj的非字符串值使用bool转换。可选地，true_values和false_values可以被重写，但每个值必须是字符串。

```
>>> to_boolean('true')
True
>>> to_boolean('1')
True
>>> to_boolean('false')
False
>>> to_boolean('0')
False
>>> assert to_boolean('a') is None
```

### to_dict

通过使用obj键和值创建新的dict，将obj转换为dict。

```
>>> obj = {'a': 1, 'b': 2}
>>> obj2 = to_dict(obj)
>>> obj2 == obj
True
>>> obj2 is not obj
True
```

### to_integer

将obj转换为整数。

```
>>> to_integer(3.2)
3
>>> to_integer('3.2')
3
>>> to_integer('3.9')
3
>>> to_integer('invalid')
0
```

### to_list

将obj、可迭代项或单个项转换为列表。

```
>>> results = to_list({'a': 1, 'b': 2, 'c': 3})
>>> assert set(results) == set([1, 2, 3])
>>> to_list((1, 2, 3, 4))
[1, 2, 3, 4]
>>> to_list(1)
[1]
>>> to_list([1])
[1]
>>> to_list(a for a in [1, 2, 3])
[1, 2, 3]
>>> to_list('cat')
['c', 'a', 't']
>>> to_list('cat', split_strings=False)
['cat']
```

### to_number

将obj转换为数字。所有数字都作为浮点数重新调整。如果精度为负，则将obj舍入到最近的正整数位。如果obj无法转换为数字，则返回None。

```
>>> to_number('1234.5678')
1235.0
>>> to_number('1234.5678', 4)
1234.5678
>>> to_number(1, 2)
1.0
```

### to_pairs

创建对象键值对的二维列表

```
>>> to_pairs([1, 2, 3, 4])
[[0, 1], [1, 2], [2, 3], [3, 4]]
>>> to_pairs({'a': 1})
[['a', 1]]
```

### to_string

将对象转换为字符串。

```
>>> to_string(1) == '1'
True
>>> to_string(None) == ''
True
>>> to_string([1, 2, 3]) == '[1, 2, 3]'
True
>>> to_string('a') == 'a'
True
```

### transform

作为pydash.collection.reduce（）的替代，该方法将obj转换为一个新的累加器对象，这是通过iteratee运行其每个属性的结果，每个iteratee执行都可能使累加器的对象发生变化。iteratee由四个参数调用：（累加器、值、键、对象）。迭代者可以通过显式返回False提前退出迭代。

```
>>> transform([1, 2, 3, 4], lambda acc, v, k: acc.append((k, v)))
[(0, 1), (1, 2), (2, 3), (3, 4
```

### unset

删除obj路径处的属性。

```
>>> obj = {'a': [{'b': {'c': 7}}]}
>>> unset(obj, 'a[0].b.c')
True
>>> obj
{'a': [{'b': {}}]}
>>> unset(obj, 'a[0].b.c')
False
```

### update

此方法与set_（）类似，只是接受updater来生成要设置的值。使用update_with（）自定义路径创建。使用一个参数调用更新程序：（value）。

```
>>> update({}, ['a', 'b'], lambda value: value)
{'a': {'b': None}}
>>> update([], [0, 0], lambda value: 1)
[[1]]
```

### update_with

此方法与update（）类似，只是它接受被调用以生成路径对象的自定义程序。如果自定义程序返回None，则路径创建由该方法处理。自定义程序由三个参数调用：（nested_value、key、nested_object）。

```
>>> update_with({}, '[0][1]', lambda: 'a', lambda: {})
{0: {1: 'a'}}
```

### values

创建由obj值组成的列表。

```
>>> results = values({'a': 1, 'b': 2, 'c': 3})
>>> set(results) == set([1, 2, 3])
True
>>> values([2, 4, 6, 8])
[2, 4, 6, 8]
```

## Predicate/谓词

> 返回对象布尔求值的谓词函数。
>

### eq

检查值是否等于其他值。

```
>>> eq(None, None)
True
>>> eq(None, '')
False
>>> eq('a', 'a')
True
>>> eq(1, str(1))
False
```

### gt

检查值是否大于其他值

```
>>> gt(5, 3)
True
>>> gt(3, 5)
False
>>> gt(5, 5)
False
```

### gte

检查值是否大于或等于其他值。

```
>>> gte(5, 3)
True
>>> gte(3, 5)
False
>>> gte(5, 5)
True
```

### lt

检查值是否小于其他值

```
>>> lt(5, 3)
False
>>> lt(3, 5)
True
>>> lt(5, 5)
False
```

### lte

检查值是否小于或等于其他值。

```
>>> lte(5, 3)
False
>>> lte(3, 5)
True
>>> lte(5, 5)
True
```

### in_range

检查值是否介于开始和结束之间，但不包括结束。如果未指定结束，则默认以开始变为0开始。

```
>>> in_range(2, 4)
True
>>> in_range(4, 2)
False
>>> in_range(2, 1, 3)
True
>>> in_range(3, 1, 2)
False
>>> in_range(2.5, 3.5)
True
>>> in_range(3.5, 2.5)
False
```

### is_associative

检查值是否为关联对象，这意味着可以通过索引或键访问它。

```
>>> is_associative([])
True
>>> is_associative({})
True
>>> is_associative(1)
False
>>> is_associative(True)
False
```

### is_blank

检查文本是否仅包含空白字符。

```
>>> is_blank('')
True
>>> is_blank(' \r\n ')
True
>>> is_blank(False)
False
```

### is_boolean

检查值是否为布尔值。

```
>>> is_boolean(True)
True
>>> is_boolean(False)
True
>>> is_boolean(0)
False
```

### is_builtin

检查值是否是Python内置函数或方法。

```
>>> is_builtin(1)
True
>>> is_builtin(list)
True
>>> is_builtin('foo')
False
```

### is_date

检查值是否为日期对象。

```
>>> import datetime
>>> is_date(datetime.date.today())
True
>>> is_date(datetime.datetime.today())
True
>>> is_date('2014-01-01')
False
```

这也将为datetime对象返回True。

### is_decreasing

检查值是否单调递减。

```
>>> is_decreasing([5, 4, 4, 3])
True
>>> is_decreasing([5, 5, 5])
True
>>> is_decreasing([5, 4, 5])
False
```

### is_dict

检查值是否为字典

```
>>> is_dict({})
True
>>> is_dict([])
Fals
```

### is_empty

检查值是否为空。

```
>>> is_empty(0)
True
>>> is_empty(1)
True
>>> is_empty(True)
True
>>> is_empty('foo')
False
>>> is_empty(None)
True
>>> is_empty({})
True
```

对于布尔值和数字，返回True。

### is_equal

在两个值之间执行比较，以确定它们是否彼此相等。

```
>>> is_equal([1, 2, 3], [1, 2, 3])
True
>>> is_equal('a', 'A')
False
```

### is_equal_with

此方法与is_equal（）类似，只是它接受调用来比较值的自定义程序。提供了一个定制器，它将被执行以比较值。如果自定义程序返回None，则将由该方法处理比较。自定义程序由两个参数调用：（value，other）。

```
>>> is_equal_with([1, 2, 3], [1, 2, 3], None)
True
>>> is_equal_with('a', 'A', None)
False
>>> is_equal_with('a', 'A', lambda a, b: a.lower() == b.lower())
True
```

### is_error

检查值是否为异常。

```
>>> is_error(Exception())
True
>>> is_error(Exception)
False
>>> is_error(None)
False
```

### is_even

检查值是否为偶数。

```
>>> is_even(2)
True
>>> is_even(3)
False
>>> is_even(False)
False
```

### is_float

检查值是否为浮点值。

```
>>> is_float(1.0)
True
>>> is_float(1)
False
```

### is_function

检查值是否为函数。

```
>>> is_function(list)
True
>>> is_function(lambda: True)
True
>>> is_function(1)
False
```

### is_increasing

检查值是否单调增加。

```
>>> is_increasing([1, 3, 5])
True
>>> is_increasing([1, 1, 2, 3, 3])
True
>>> is_increasing([5, 5, 5])
True
>>> is_increasing([1, 2, 4, 3])
False
```

### is_indexed

检查值是否为整数索引，即列表、字符串或元组。

```
>>> is_indexed('')
True
>>> is_indexed([])
True
>>> is_indexed(())
True
>>> is_indexed({})
False
```

### is_instance_of

检查值是否为类型的实例。

```
>>> is_instance_of({}, dict)
True
>>> is_instance_of({}, list)
False
```

### is_integer

检查值是否为整数。

```
>>> is_integer(1)
True
>>> is_integer(1.0)
False
>>> is_integer(True)
False
```

### is_iterable

检查值是否可迭代。

```
>>> is_iterable([])
True
>>> is_iterable({})
True
>>> is_iterable(())
True
>>> is_iterable(5)
False
>>> is_iterable(True)
False
```

### is_json

检查值是否为有效的JSON字符串。

```
>>> is_json({})
False
>>> is_json('{}')
True
>>> is_json({"hello": 1, "world": 2})
False
>>> is_json('{"hello": 1, "world": 2}')
True
```

### is_list

检查值是否为列表。

```
>>> is_list([])
True
>>> is_list({})
False
>>> is_list(())
False
```

### is_match

在obj和源之间执行部分深度比较，以确定obj是否包含等效的属性值。

```
>>> is_match({'a': 1, 'b': 2}, {'b': 2})
True
>>> is_match({'a': 1, 'b': 2}, {'b': 3})
False
>>> is_match({'a': [{'b': [{'c': 3, 'd': 4}]}]},{'a': [{'b': [{'d': 4}]}]})
True
```

在版本3.2.0中更改：不要使用类型比较obj和source。仅使用isinstance

在版本4.0.0中更改：将iteratee参数移动到is_match_with（）。

### is_match_with

此方法与is_match（）类似，只是它接受调用来比较值的自定义程序。如果自定义程序返回None，则由该方法处理比较。自定义程序由五个参数调用：（obj_value、src_value、index|key、obj、source）。

```
>>> is_greeting = lambda val: val in ('hello', 'hi')
>>> customizer = lambda ov, sv: is_greeting(ov) and is_greeting(sv)
>>> obj = {'greeting': 'hello'}
>>> src = {'greeting': 'hi'}
>>> is_match_with(obj, src, customizer)
True
```

### is_monotone

检查运算符用于比较时值是否单调。

```
>>> is_monotone([1, 1, 2, 3], operator.le)
True
>>> is_monotone([1, 1, 2, 3], operator.lt)
False
```

### is_nan

检查值是否不是数字。

```
>>> is_nan('a')
True
>>> is_nan(1)
False
>>> is_nan(1.0)
False
```

### is_negative

检查值是否为负值。

```
>>> is_negative(-1)
True
>>> is_negative(0)
False
>>> is_negative(1)
False
```

### is_none

检查值是否为“无”。

```
>>> is_none(None)
True
>>> is_none(False)
False
```

### is_number

检查值是否为数字。

对于int、long（PY2）、float和decimal.decimal，返回True。

```
>>> is_number(1)
True
>>> is_number(1.0)
True
>>> is_number('a')
False
```

在版本3.0.0中更改：添加is_num作为别名。

在版本4.0.0中更改：删除了别名is_num。

### is_object

检查值是列表还是字典。

```
>>> is_object([])
True
>>> is_object({})
True
>>> is_object(())
False
>>> is_object(1)
False
```

### is_odd

检查值是否为奇数。

```
>>> is_odd(3)
True
>>> is_odd(2)
False
>>> is_odd('a')
False
```

### is_positive

检查值是否为正。

```
>>> is_positive(1)
True
>>> is_positive(0)
False
>>> is_positive(-1)
False
```

### is_reg_exp

检查值是否为RegExp对象。

```
>>> is_reg_exp(re.compile(''))
True
>>> is_reg_exp('')
False
```

在版本4.0.0中更改：删除了别名is_re。

### is_set

检查给定值是否为集合对象。

```
>>> is_set(set([1, 2]))
True
>>> is_set([1, 2, 3])
False
```

### is_strictly_decreasing

检查值是否严格递减。

```
>>> is_strictly_decreasing([4, 3, 2, 1])
True
>>> is_strictly_decreasing([4, 4, 2, 1])
False
```

### is_strictly_increasing

检查值是否严格递增。

```
>>> is_strictly_increasing([1, 2, 3, 4])
True
>>> is_strictly_increasing([1, 1, 3, 4])
False
```

### is_string

检查值是否为字符串。

```
>>> is_string('')
True
>>> is_string(1)
False
```

### is_tuple

检查值是否为元组。

```
>>> is_tuple(())
True
>>> is_tuple({})
False
>>> is_tuple([])
False
```

### is_zero

检查值是否为0。

```
>>> is_zero(0)
True
>>> is_zero(1)
False
```

## Strings/字符串

> 字符串函数。
>

### camel_case

将文本转换为驼峰大小写。

```
>>> camel_case('FOO BAR_bAz')
'fooBarBAz'
```

在版本5.0.0中进行了更改：改进了unicode单词支持。

### capitalize

将文本的第一个字符大写

```
>>> capitalize('once upon a TIME')
'Once upon a time'
>>> capitalize('once upon a TIME', False)
'Once upon a TIME'
```

在版本3.0.0中添加了严格选项。

### chop

将文本拆分为长度步长的间隔。

```
>>> chop('abcdefg', 3)
['abc', 'def', 'g']
```

### chop_right

与chop（）类似，但文本从右侧剪切。

```
>>> chop_right('abcdefg', 3)
['a', 'bcd', 'efg']
```

### chars

将文本拆分为单个字符列表。

```
>>> chars('onetwo')
['o', 'n', 'e', 't', 'w', 'o']
```

### clean

修剪多个空间并将其替换为单个空间。

```
>>> clean('a  b   c    d')
'a b c d'
```

### count_substr

计算文本中出现的次文本。

```
>>> count_substr('aabbccddaabbccdd', 'bc')
```

### deburr

通过将拉丁-1补充字母转换为基本拉丁字母来消除文本的干扰。

```
>>> deburr('déjà vu')
'...
>>> 'deja vu'
'deja vu'
```

### decapitalize

取消文本的第一个字符的优先级

```
>>> decapitalize('FOO BAR')
'fOO BAR'
```

### ends_with

检查文本是否以给定的目标字符串结尾

```
>>> ends_with('abc def', 'def')
True
>>> ends_with('abc def', 4)
False
```

### ensure_ends_with

将给定的后缀附加到字符串，但前提是源字符串不以该后缀结尾。

```
>>> ensure_ends_with('foo bar', '!')
'foo bar!'
>>> ensure_ends_with('foo bar!', '!')
'foo bar!'
```

### ensure_starts_with

在字符串前面加上给定的前缀，但前提是源字符串不以该前缀开头。

```
>>> ensure_starts_with('foo bar', 'Oh my! ')
'Oh my! foo bar'
>>> ensure_starts_with('Oh my! foo bar', 'Oh my! ')
'Oh my! foo bar'
```

### escape

将文本中的字符&、<、>、“、’和\`转换为相应的HTML实体。

```
>>> escape('"1 > 2 && 3 < 4"')
'&quot;1 &gt; 2 &amp;&amp; 3 &lt; 4&quot;'
```

1.1.0版中的更改：将函数移动到pydash.string。

### escape_reg_exp

对文本中的RegExp特殊字符进行转义。

```
>>> escape_reg_exp('[()]')
'\[\(\)\]'
```

在版本4.0.0中更改：删除了别名escape_re

### has_substr

返回文本中是否包含子文本。

```
>>> has_substr('abcdef', 'bc')
True
>>> has_substr('abcdef', 'bb')
False
```

### human_case

将文本转换为小写，其中只有第一个字母大写，每个单词用空格分隔。

```
>>> human_case('abc-def_hij lmn')
'Abc def hij lmn'
>>> human_case('user_id')
'User'
```

在版本5.0.0中进行了更改：改进了unicode单词支持。

### insert_substr

在从位置索引开始的文本中插入子文本

```
>>> insert_substr('abcdef', 3, '--')
'abc--def'
```

### join

使用每个元素之间的分隔符将可迭代元素连接到字符串中。

```
>>> join(['a', 'b', 'c']) == 'abc'
True
>>> join([1, 2, 3, 4], '&') == '1&2&3&4'
True
>>> join('abcdef', '-') == 'a-b-c-d-e-f'
True
```

在版本4.0.0中更改：删除了别名implode。

### kebab_case

将文本转换为烤肉串大小写（a.k.a. spinal case）。

```
>>> kebab_case('a b c_d-e!f')
'a-b-c-d-e-f'
```

在版本5.0.0中进行了更改：改进了unicode单词支持。

### lines

将文本中的行拆分为数组。

```
>>> lines('a\nb\r\nc')
['a', 'b', 'c']
```

### lower_case

将字符串转换为小写，作为空格分隔的单词。

```
>>> lower_case('fooBar')
'foo bar'
>>> lower_case('--foo-Bar--')
'foo bar'
>>> lower_case('/?*Foo10/;"B*Ar')
'foo 10 b ar'
```

在版本5.0.0中进行了更改：改进了unicode单词支持。

### lower_first

将字符串的第一个字符转换为小写。

```
>>> lower_first('FRED')
'fRED'
>>> lower_first('Foo Bar')
'foo Bar'
>>> lower_first('1foobar')
'1foobar'
>>> lower_first(';foobar')
';foobar'
```

### number_format

使用自定义小数和顺序分隔符格式化数字以进行缩放

```
>>> number_format(1234.5678)
'1,235'
>>> number_format(1234.5678, 2, ',', '.')
'1.234,57'
```

### pad

如果文本短于给定的填充长度，则在左侧和右侧填充文本。如果填充字符的数量不能被填充长度平均除，则字符字符串可能会被截断。

```
>>> pad('abc', 5)
' abc '
>>> pad('abc', 6, 'x')
'xabcxx'
>>> pad('abc', 5, '...')
'.abc.'
```

在版本3.0.0中进行了更改：修复了多个字符的处理，以便填充字符串不会被过度填充。

### pad_end

如果文本短于给定的填充长度，则在左侧和右侧填充文本。如果填充字符的数量不能被填充长度平均除，则字符字符串可能会被截断。

```
>>> pad('abc', 5)
' abc '
>>> pad('abc', 6, 'x')
'xabcxx'
>>> pad('abc', 5, '...')
'.abc.'
```

在版本3.0.0中进行了更改：修复了多个字符的处理，以便填充字符串不会被过度填充。

### pad_start

如果文本短于给定的填充长度，则在左侧填充文本。如果填充字符的数量不能被填充长度平均除，则字符字符串可能会被截断。

```
>>> pad_start('abc', 5)
'  abc'
>>> pad_start('abc', 5, '.')
'..abc'
```

在版本4.0.0中更改：从pad_left重命名为pad_start。

### pascal_case

与camel_case（）类似，除了第一个字母大写。

```
>>> pascal_case('FOO BAR_bAz')
'FooBarBaz'
>>> pascal_case('FOO BAR_bAz', False)
'FooBarBAz'
```

在版本5.0.0中进行了更改：改进了unicode单词支持。

### predecessor

返回char的前置字符。

```
>>> predecessor('c')
'b'
>>> predecessor('C')
'B'
>>> predecessor('3')
'2'
```

### prune

与truncate（）类似，除了它确保修剪后的字符串不超过原始长度，即在截断时避免了半截词。如果删减文本+省略文本比原始文本长，则返回原始文本。

```
>>> prune('Fe fi fo fum', 5)
'Fe fi...'
>>> prune('Fe fi fo fum', 6)
'Fe fi...'
>>> prune('Fe fi fo fum', 7)
'Fe fi...'
>>> prune('Fe fi fo fum', 8, ',,,')
'Fe fi fo,,,'
```

### quote

用另一个字符串引用一个字符串。

```
>>> quote('To be or not to be')
'"To be or not to be"'
>>> quote('To be or not to be', "'")
"'To be or not to be'"
```

### reg_exp_js_match

使用Javascript样式的正则表达式返回匹配列表。

```
>>> reg_exp_js_match('aaBBcc', '/bb/')
[]
>>> reg_exp_js_match('aaBBcc', '/bb/i')
['BB']
>>> reg_exp_js_match('aaBBccbb', '/bb/i')
['BB']
>>> reg_exp_js_match('aaBBccbb', '/bb/gi')
['BB', 'bb']
```

在版本3.0.0中进行了更改：重新排列参数以首先生成文本。

在版本4.0.0中更改：从js_match重命名为reg_exp_js_match。

### reg_exp_js_replace

使用Javascript样式的正则表达式将文本替换为repl以查找匹配项。

```
>>> reg_exp_js_replace('aaBBcc', '/bb/', 'X')
'aaBBcc'
>>> reg_exp_js_replace('aaBBcc', '/bb/i', 'X')
'aaXcc'
>>> reg_exp_js_replace('aaBBccbb', '/bb/i', 'X')
'aaXccbb'
>>> reg_exp_js_replace('aaBBccbb', '/bb/gi', 'X')
'aaXccX'
```

在版本3.0.0中进行了更改：重新排列参数以首先生成文本。

在版本4.0.0中更改：从js_replace重命名为reg_exp_js_replace。

### reg_exp_replace

用文本中的repl替换正则表达式模式的出现。替换时忽略大小写（可选）。（可选）设置count以限制替换次数。

```
>>> reg_exp_replace('aabbcc', 'b', 'X')
'aaXXcc'
>>> reg_exp_replace('aabbcc', 'B', 'X', ignore_case=True)
'aaXXcc'
>>> reg_exp_replace('aabbcc', 'b', 'X', count=1)
'aaXbcc'
>>> reg_exp_replace('aabbcc', '[ab]', 'X')
'XXXXcc'
```

在版本4.0.0中更改：从re_replace重命名为reg_exp_replace。

### repeat

将给定字符串重复n次。

```
>>> repeat('.', 5)
'.....'
```

### replace

用文本中的repl替换模式的出现。替换时忽略大小写（可选）。（可选）设置count以限制替换次数。

```
>>> replace('aabbcc', 'b', 'X')
'aaXXcc'
>>> replace('aabbcc', 'B', 'X', ignore_case=True)
'aaXXcc'
>>> replace('aabbcc', 'b', 'X', count=1)
'aaXbcc'
>>> replace('aabbcc', '[ab]', 'X')
'aabbcc'
>>> replace('aabbcc', '[ab]', 'X', escape=False)
'XXXXcc'
```

在4.1.0版中更改：添加了from_start和from_end参数。

在版本5.0.0中进行了更改：添加了对pattern作为typeing.pattern对象的支持

### replace_end

与replace（）类似，但它仅在模式匹配文本结尾时用repl替换文本。

```
>>> replace_end('aabbcc', 'b', 'X')
'aabbcc'
>>> replace_end('aabbcc', 'c', 'X')
'aabbcX'
```

### replace_start

与replace（）类似，但它仅在模式匹配文本开头时用repl替换文本。

```
>>> replace_start('aabbcc', 'b', 'X')
'aabbcc'
>>> replace_start('aabbcc', 'a', 'X')
'Xabbcc'
```

### separator_case

在单词上拆分文本，并使用分隔符连接。

```
>>> separator_case('a!!b___c.d', '-')
'a-b-c-d'
```

在版本5.0.0中进行了更改：改进了unicode单词支持。

### series_phrase_serial

使用序列分隔符将项目连接到语法序列短语中，例如“item1、item2、item3和item4”。

```
>>> series_phrase_serial(['apples', 'bananas', 'peaches'])
'apples, bananas, and peaches'
```

### slugify

将文本转换为可在URL中安全使用的ASCII段。传入的文本使用NFKD格式转换为unicode和noramzied。这会导致一些重音字符转换为ASCII“等价”（例如，é转换为e）。删除前导和尾随空格，并用-替换任何剩余的空格或其他没有ASCII等效字符的特殊字符。

```
>>> slugify('This is a slug.') == 'this-is-a-slug'
True
>>> slugify('This is a slug.', '+') == 'this+is+a+slug'
True
```

在版本5.0.0中进行了更改：改进了unicode单词支持。

### snake_case

将文本转换为大小写。

```
>>> start_case("fooBar")
'Foo Bar'
```

在版本4.0.0中更改：删除了别名underscore_case。

在版本5.0.0中进行了更改：改进了unicode单词支持。

### split

在分隔符上拆分文本。如果未提供分隔符，则文本在空白处拆分。如果分隔符为假，则文本将在每个字符上拆分。

```
>>> split('one potato, two potatoes, three potatoes, four!')
['one', 'potato,', 'two', 'potatoes,', 'three', 'potatoes,', 'four!']
>>> split('one potato, two potatoes, three potatoes, four!', ',')
['one potato', ' two potatoes', ' three potatoes', ' four!']
```

在版本3.0.0中更改：分隔符默认值更改为NoValue，默认情况下支持空格拆分。

在版本4.0.0中更改：删除别名分解。

### start_case

将文本转换为大写

```
>>> start_case("fooBar")
'Foo Bar'
```

在版本5.0.0中进行了更改：改进了unicode单词支持

### starts_with

检查文本是否以给定的目标字符串开头。

```
>>> starts_with('abcdef', 'a')
True
>>> starts_with('abcdef', 'b')
False
>>> starts_with('abcdef', 'a', 1)
False
```

### strip_tags

从文本中删除所有HTML标记。

```
>>> strip_tags('<a href="#">Some link</a>')
'Some link'
```

### substr_left

从左到右搜索文本以查找子文本，并返回由文本中位于子文本左侧的字符组成的子字符串，如果未找到匹配项，则返回所有字符串。

```
>>> substr_left('abcdefcdg', 'cd')
'ab'
```

### substr_left_end

从右到左搜索文本以查找子文本，并返回由文本中位于子文本左侧的字符组成的子字符串，如果未找到匹配项，则返回所有字符串。

```
>>> substr_left_end('abcdefcdg', 'cd')
'abcdef'
```

### substr_right

从右到左搜索文本以查找子文本，并返回由文本中位于子文本右侧的字符组成的子字符串，如果未找到匹配项，则返回所有字符串。

```
>>> substr_right('abcdefcdg', 'cd')
'efcdg'
```

### substr_right_end

从左到右搜索文本以查找子文本，并返回由文本中位于子文本右侧的字符组成的子字符串，如果未找到匹配项，则返回所有字符串。

```
>>> substr_right_end('abcdefcdg', 'cd')
'g
```

### successor

返回char的后续字符。

```
>>> successor('b')
'c'
>>> successor('B')
'C'
>>> successor('2')
'3'
```

### surround

用另一个字符串包围字符串。

```
>>> surround('abc', '"')
'"abc"'
>>> surround('abc', '!')
'!abc!'
```

### swap_case

交换文本字符的大小写。

```
>>> swap_case('aBcDeF')
'AbCdEf'
```

### title_case

将文本转换为标题大小写。

```
>>> title_case("bob's shop")
"Bob's Shop"
```

### to_lower

将给定文本转换为小写文本。

```
>>> to_lower('--Foo-Bar--')
'--foo-bar--'
>>> to_lower('fooBar')
'foobar'
>>> to_lower('__FOO_BAR__')
'__foo_bar__'
```

### to_upper

将给定文本转换为大写文本。

```
>>> to_upper('--Foo-Bar--')
'--FOO-BAR--'
>>> to_upper('fooBar')
'FOOBAR'
>>> to_upper('__FOO_BAR__')
'__FOO_BAR__'
```

### trim

从文本中删除前导和尾随空格或指定字符

```
>>> trim('  abc efg\r\n ')
'abc efg'
```

### trim_end

从文本中删除尾随空格或指定字符

```
>>> trim_end('  abc efg\r\n ')
'  abc efg'
```

在版本4.0.0中更改：从trim_right重命名为trim_end。

### trim_start

从文本中删除前导空格或指定字符。

```
>>> trim_start('  abc efg\r\n ')
'abc efg\r\n '
```

在版本4.0.0中更改：从trim_left重命名为trim_start。

### truncate

如果文本长度超过给定的最大字符串长度，则截断文本。截断字符串的最后一个字符将替换为默认为…的省略字符串。。。。

```
>>> truncate('hello world', 5)
'he...'
>>> truncate('hello world', 5, '..')
'hel..'
>>> truncate('hello world', 10)
'hello w...'
>>> truncate('hello world', 10, separator=' ')
'hello...'
```

在版本4.0.0中更改：删除了别名trunc。

### unescape

escape（）的倒数。该方法将HTML实体&amp&lt&gt&“', 和&#96；将文本中的字符转换为相应的字符。

```
>>> results = unescape('&quot;1 &gt; 2 &amp;&amp; 3 &lt; 4&quot;')
>>> results == '"1 > 2 && 3 < 4"'
True
```

在1.1.0版中更改：已移至pydash.string。

### unquote

如果文本以quote_char开头和结尾，则通过删除quote_char来取消对文本的引用。

```
>>> unquote('"abc"')
'abc'
>>> unquote('"abc"', '#')
'"abc"'
>>> unquote('#abc', '#')
'#abc'
>>> unquote('#abc#', '#')
'abc'
```

### upper_case

将字符串转换为大写，作为空格分隔的单词。

```
>>> upper_case('--foo-bar--')
'FOO BAR'
>>> upper_case('fooBar')
'FOO BAR'
>>> upper_case('/?*Foo10/;"B*Ar')
'FOO 10 B AR'
```

在版本5.0.0中进行了更改：改进了unicode单词支持。

### upper_first

将字符串的第一个字符转换为大写。

```
>>> upper_first('fred')
'Fred'
>>> upper_first('foo bar')
'Foo bar'
>>> upper_first('1foobar')
'1foobar'
>>> upper_first(';foobar')
';foobar'
```

### url

将一系列URL路径组合成一个URL。（可选）传入关键字参数以附加查询参数。

```
>>> link = url('a', 'b', ['c', 'd'], '/', q='X', y='Z')
>>> path, params = link.split('?')
>>> path == 'a/b/c/d/'
True
>>> set(params.split('&')) == set(['q=X', 'y=Z'])
True
```

### words

返回文本中包含的单词列表。

```
>>> words('a b, c; d-e')
['a', 'b', 'c', 'd', 'e']
>>> words('fred, barney, & pebbles', '/[^, ]+/g')
['fred', 'barney', '&', 'pebbles']
```

在版本3.2.0中进行了更改：添加了模式参数。

在版本3.2.0中进行了更改：改进了一个字符单词的匹配。

在版本5.0.0中进行了更改：改进了unicode单词支持。

## Utilities/公共

> 实现程序功能
>

### attempt

尝试执行func，返回结果或捕获的错误对象。

```
>>> results = attempt(lambda x: x/0, 1)
>>> assert isinstance(results, ZeroDivisionError)
```

### cond

创建一个函数，该函数对进行迭代，并调用第一个谓词的相应函数以返回truthy

```
>>> func = cond([[matches({'a': 1}), constant('matches A')], [matches({'b': 2}), constant('matches B')], [stub_true, lambda value: value]])
>>> func({'a': 1, 'b': 2})
'matches A'
>>> func({'a': 0, 'b': 2})
'matches B'
>>> func({'a': 0, 'b': 0}) == {'a': 0, 'b': 0}
True
```

在版本4.2.0中进行了更改：修复了向匹配函数传递缺少的参数，并添加了对传递单个对列表的支持，而不是仅将对作为单独的参数传递。

### conforms

创建一个函数，该函数使用给定对象的相应属性值调用源的谓词属性，如果所有谓词都返回truthy，则返回True，否则返回False。

```
>>> func = conforms({'b': lambda n: n > 1})
>>> func({'b': 2})
True
>>> func({'b': 0})
False
>>> func = conforms([lambda n: n > 1, lambda n: n == 0])
>>> func([2, 0])
True
>>> func([0, 0])
False
```

### conforms_to

通过使用obj的相应属性值调用source的谓词属性，检查obj是否符合source。

```
>>> conforms_to({'b': 2}, {'b': lambda n: n > 1})
True
>>> conforms_to({'b': 0}, {'b': lambda n: n > 1})
False
>>> conforms_to([2, 0], [lambda n: n > 1, lambda n: n == 0])
True
>>> conforms_to([0, 0], [lambda n: n > 1, lambda n: n == 0])
False
```

### constant

创建一个返回值的函数。

```
>>> pi = constant(3.14)
>>> pi() == 3.14
True
```

在版本4.0.0中更改：返回的函数忽略参数而不是引发异常。

### default_to

检查值以确定是否应在其位置返回默认值。如果值为None，则返回default_value。

```
>>> default_to(1, 10)
1
>>> default_to(None, 10)
10
```

### default_to_any

检查值以确定是否应在其位置返回默认值。返回第一个不是None的default_values。

```
>>> default_to_any(1, 10, 20)
1
>>> default_to_any(None, 10, 20)
10
>>> default_to_any(None, None, 20)
20
```

### identity

返回提供给它的第一个参数。

```
>>> identity(1)
1
>>> identity(1, 2, 3)
1
>>> identity() is None
True
```

### iteratee

返回pydash样式iteratee。如果func是属性名，则创建的iteratee将返回给定元素的属性值。如果func是一个对象，则创建的iteratee将为包含等效对象属性的元素返回True，否则将返回False。

```
>>> get_data = iteratee('data')

>>> get_data({'data': [1, 2, 3]})

[1, 2, 3]

>>> is_active = iteratee({'active': True})

>>> is_active({'active': True})

True

>>> is_active({'active': 0})

False

>>> iteratee(['a', 5])({'a': 5})

True

>>> iteratee(['a.b'])({'a.b': 5})

5

>>> iteratee('a.b')({'a': {'b': 5}})

5

>>> iteratee(('a', ['c', 'd', 'e']))({'a': 1, 'c': {'d': {'e': 3}}})

[1, 3]

>>> iteratee(lambda a, b: a + b)(1, 2)

3

>>> ident = iteratee(None)

>>> ident('a')

'a'

>>> ident(1, 2, 3)
```

在2.0.0版本中更改：将create_iteratee（）重命名为iteratee（）。

在3.0.0版本中进行了更改：使pull样式iteratee支持深度属性访问。

在版本3.1.0中进行了更改：-添加了对通过单个项目列表/元组访问浅拔式属性的支持。-添加了对通过两项列表/元组匹配属性样式iteratee的支持。

在版本4.0.0中更改：删除了别名回调。

在4.1.0版本中更改：当func是元组时，返回属性（）回调

### matches

创建匹配样式谓词函数，该函数在给定对象和源对象之间执行深度比较，如果给定对象具有等效的属性值，则返回True，否则返回False。

```
>>> matches({'a': {'b': 2}})({'a': {'b': 2, 'c':3}})

True

>>> matches({'a': 1})({'b': 2, 'a': 1})

True

>>> matches({'a': 1})({'b': 2, 'a': 2})
```

False在版本3.0.0中进行了更改：使用pydash.谓词.is_match（）作为匹配函数。

### matches_property

创建一个函数，将给定对象上键的属性值与值进行比较。

```
>>> matches_property('a', 1)({'a': 1, 'b': 2})

True

>>> matches_property(0, 1)([1, 2, 3])

True

>>> matches_property('a', 2)({'a': 1, 'b': 2})

False
```

### memoize

创建一个函数，用于记忆func的结果。如果提供了解析器，它将用于根据提供给记忆函数的参数确定用于存储结果的缓存键。默认情况下，提供给内存化函数的所有参数都用作缓存键。结果缓存作为内存化函数的缓存属性公开。

```
>>> ident = memoize(identity)
>>> ident(1)

1

>>> ident.cache['(1,){}'] == 1

True

>>> ident(1, 2, 3)

1

>>> ident.cache['(1, 2, 3){}'] == 1

True
```

### method

在给定对象的路径上创建调用方法的函数。将向调用的方法提供任何其他参数。

```
>>> obj = {'a': {'b': [None, lambda x: x]}}

>>> echo = method('a.b.1')

>>> echo(obj, 1) == 1

True

>>> echo(obj, 'one') == 'one'

True
```

### method_of

与方法method（）相反。此方法创建一个函数，该函数在对象的给定路径处调用该方法。将向调用的方法提供任何其他参数。

```
>>> obj = {'a': {'b': [None, lambda x: x]}}

>>> dispatch = method_of(obj)

>>> dispatch('a.b.1', 1) == 1

True

>>> dispatch('a.b.1', 'one') == 'one'

True
```

### noop

无操作功能。

### nth_arg

创建一个函数，该函数获取索引n处的参数。如果n为负，则返回末尾的第n个参数。

```
>>> func = nth_arg(1)

>>> func(11, 22, 33, 44)

22

>>> func = nth_arg(-1)

>>> func(11, 22, 33, 44)

44
```

### now

返回自Unix时期（1970年1月1日00:00:00 UTC）以来已过的毫秒数。在版本3.0.0中更改：使用datetime模块计算已用时间。

### over

创建一个函数，该函数使用接收的参数调用funcs中的所有函数并返回其结果。

```
>>> func = over([max, min])

>>> func(1, 2, 3, 4)

[4, 1]
```

### over_every

创建一个函数，该函数检查当使用它接收的参数调用时，funcs中的所有函数是否返回true。

```
>>> func = over_every([bool, lambda x: x is not None])

>>> func(1)

True
```

### over_some

创建一个函数，该函数检查在使用接收到的参数调用funcs中的任何函数时是否返回true。

```
>>> func = over_some([bool, lambda x: x is None])

>>> func(1)

True
```

### properties

与property_（）类似，只是它返回路径中每个路径的值列表。

```
>>> getter = properties('a', 'b', ['c', 'd', 'e'])

>>> getter({'a': 1, 'b': 2, 'c': {'d': {'e': 3}}})

[1, 2, 3]
```

### property_

创建返回给定对象路径值的函数。

```
>>> get_data = property_('data')

>>> get_data({'data': 1})

1

>>> get_data({}) is None

True

>>> get_first = property_(0)

>>> get_first([1, 2, 3])

1
```

在版本4.0.1中进行了更改：使属性访问器可用于深路径字符串。

### property_of

property_（）的倒数。此方法创建一个函数，该函数返回obj上给定键的键值。

```
>>> getter = property_of({'a': 1, 'b': 2, 'c': 3})
>>> getter('a')
1
>>> getter('b')
2
>>> getter('x') is None
True
```

在版本4.0.0中更改：删除了别名prop_of。

### random

在开始和停止之间产生一个随机数（含）。如果只提供一个参数，将返回一个介于0和给定数字之间的数字。如果floating为true，或者start或stop为floating，则返回浮点数而不是整数。

```
>>> 0 <= random() <= 1
True
>>> 5 <= random(5, 10) <= 10
True
>>> isinstance(random(floating=True), float)
True
```

### range_

创建一个数字列表（正数和/或负数），从开始到结束，但不包括结束。如果开始小于停止，则除非指定负步长，否则将创建零长度范围。

```
>>> list(range_(5))
[0, 1, 2, 3, 4]
>>> list(range_(1, 4))
[1, 2, 3]
>>> list(range_(0, 6, 2))
[0, 2, 4]
>>> list(range_(4, 1))
[4, 3, 2]
```

在1.1.0版中更改：已移至pydash.utilities。

在版本3.0.0中更改：返回生成器而不是列表。

在版本4.0.0中更改：当开始参数大于停止参数时，支持递减。

### range_right

与range_（）类似，只是它按降序填充值。

```
>>> list(range_right(5))
[4, 3, 2, 1, 0]
>>> list(range_right(1, 4))
[3, 2, 1]
>>> list(range_right(0, 6, 2))
[4, 2, 0]
```

### result

返回obj上属性键的值。如果键值是一个函数，则将调用该函数并返回其结果，否则返回属性值。如果obj为false，则返回默认值。

```
>>> result({'a': 1, 'b': lambda: 2}, 'a')
1
>>> result({'a': 1, 'b': lambda: 2}, 'b')
2
>>> result({'a': 1, 'b': lambda: 2}, 'c') is None
True
>>> result({'a': 1, 'b': lambda: 2}, 'c', default=False)
False
```

2.0.0版本中更改：添加了默认参数。

### retry

如果函数在每次尝试之间引发异常并具有可选延迟，则多次重试该函数的修饰符。

当提供延迟时，重试尝试之间有一段睡眠时间。第一延迟时间将始终等于延迟。在随后的重试之后，延迟时间将按比例缩放到max_delay。如果max_delay为0，则延迟可以无限增加。

```
>>> @retry(attempts=3, delay=0)
... def do_something():
...     print('something')
...     raise Exception('something went wrong')
>>> try: do_something()
... except Exception: print('caught something')
something
something
something
caught something
```

版本添加：：4.4.0

…版本更改：：4.5.0

添加了抖动参数。

### stub_list

返回空的“列表”。

```
>>> stub_list()
[]
```

### stub_dict

返回空的“字典”。

```
>>> stub_dict()
{}
```

### stub_false

返回False

```
>>> stub_false()
False
```

### stub_string

返回空字符串。

```
>>> stub_string()
''
```

### stub_true

返回True

```
>>> stub_true()
True
```

### times

执行迭代n次，返回每次迭代执行的结果列表。iteratee是用一个参数调用的：（index）。

```
>>> times(5, lambda i: i)
[0, 1, 2, 3, 4]
```

在版本3.0.0中进行了更改：重新排序参数以使iteratee优先。

在版本4.0.0中更改：

重新排序的参数使iteratee成为最后一个参数。

添加了处理带有零位置参数的iterate的功能。

### to_path

将值转换为属性路径数组。

```
>>> to_path('a.b.c')
['a', 'b', 'c']
>>> to_path('a[0].b.c')
['a', 0, 'b', 'c']
>>> to_path('a[0][1][2].b.c')
['a', 0, 1, 2, 'b', 'c']
```

在版本4.2.1中进行了更改：确保返回的路径始终是一个列表。

### unique_id

生成唯一的ID。如果提供了前缀，ID将附加到该ID。

```
>>> unique_id()
'1'
>>> unique_id('id_')
'id_2'
>>> unique_id()
'3'
```