# 「译」 怎样在 JavaScript 中检测 null

::: info 原文
[How to Check for null in JavaScript](https://javascript.plainenglish.io/how-to-check-for-null-in-javascript-dffab64d8ed5)
:::


因为一些历史 bug, `typeof null` 在 JavaScript 中返回 `object` -- 那么我们怎么检测 `null` 呢?

## 什么是 `null` ?

> 这个值 `null` 故意表现为没有任何值的对象, 这个是 Javascript 设计的初衷之一 -- MDN Docs

Javascript 的基础类型 `null` 表示为故意设置的 - 来表示指示变量已被声明但尚未分配任何值。

和 `null`相比, 相似的值是 `undefined`, 没有任何对象的值,  `undefined`是指的一个变量已经被声明但是没有赋值任何内容, 并不是 `null`值.

不幸的是 `type of null`永远返回 `object`, 这是一个永远不会修复的[历史性的bug](https://alexanderell.is/posts/typeof-null/) , 这就意味着不能够使用 `typeof`
来验证 `null`值.

## `null` 是一个 false 类型的值

> “`null` 是一个 `假`值,  (i.e. 也就是当他转换成 bool 类型时候, 会变成 `false`)” — Josh Clanton at A Drip of JavaScript

最简单的方法来检测 `null`值是把 `null`使用在条件变量中, `null` 会转换成 `false`进行条件运算

```javascript
const maybeNull = null
if (maybeNull) {
    console.log("Not null")
} else {
    console.log("Could be null")
} // Could be null

for (let i = 0; null; i++) {
    console.log("Won't run")
}

maybeNull ? console.log("truthy value") : console.log("Falsy value") // falsy value
```

当然这并不能表明 `null` 和 [其他 falsy 值](https://medium.com/coding-at-dawn/what-are-falsy-values-in-javascript-ca0faa34feb4) 的差别, 接下来我们来探究下 `==`
和 `===`在检测 `null` 值的区别

### `==` 松散相等

> "尽管事实上 `null` 是一个 [假] 值, 但是在 JavaScript 中并不能将这个值和其他的 [假] 值可以进行松散的相等, 事实上, `null` 和 `undefined`
> 和他自身可以松散相等"  -- Josh Clanton at A Drip of JavaScript

一个检测 `null` 的方法是将这个值和 `null`进行 `==`([双等号](https://medium.com/better-programming/making-sense-of-vs-in-javascript-f9dbbc6352e3)) 比较

```javascript
console.log("The 7 falsy values")
0 ? console.log("truthy") : console.log("falsy") // falsy
0n ? console.log("truthy") : console.log("falsy") // falsy
null ? console.log("truthy") : console.log("falsy") // falsy
undefined ? console.log("truthy") : console.log("falsy") // falsy
false ? console.log("truthy") : console.log("falsy") // falsy
NaN ? console.log("truthy") : console.log("falsy") // falsy
"" ? console.log("truthy") : console.log("falsy") // falsy

console.log("The value null")
console.log(null == 0) // false
console.log(null == 0n) // false
console.log(null == null) // true
console.log(null == undefined) // true
console.log(null == false) // false
console.log(null == NaN) // false
console.log(null == "") // false
```

像上边展示出来的结果似的, `null` 仅仅和他自身还有 `undefined`可以松散相等, 但是和其他的 [假] 值不等.

这对于检查值的缺失很有用 --  `null` 和 `undefined`两者都表示没有值, 因此他们可以 松散相等(他们拥有相同的值, 但是类型不同).

所以我们写代码的时候如果要验证一个值是否存在值可以使用 `== null` 来检测他是 `null` 还是 `undefined`

### `===` 全等于

为了确认我们确实定义了一个 `null` 值, 而不是 `undefined`的值,
我们需要使用 `===`([全等于](https://medium.com/better-programming/making-sense-of-vs-in-javascript-f9dbbc6352e3))  来达到期望的效果

```javascript
console.log("The value null")
console.log(null === 0) // false
console.log(null === 0n) // false
console.log(null === null) // true
console.log(null === undefined) // false
console.log(null === false) // false
console.log(null === NaN) // false
console.log(null === "") // false
```

通常来讲, 捕获 `null` 和 `undefined`是一个比较好的方式, 都代表的是没有值. 也就是说使用 `==`来和 `null` 进行对比是 JavaScript 中为数不多的推荐的使用方式之一,
否则的话则使用 `===`进行全等值的对比

## 检查 null 值时候使用 == 和 === 进行对比

有些开发者喜欢在任何情况下都使用 `===` 来进行清晰的对比, 所以也没有错啊.

确实在代码检查工具 [JSLint](https://jslint.com/help.html) 中不允许使用 `==`因为类型强制来避免潜在的 bug 问题.

另一个代码检查工具 ESLint 则存在可以配置在什么情况使用 `==` 和 `===`

也就是说如果你(或者检查工具) 习惯于使用 `===`(全等于), 那么你可以使用 `item === null || item === undefined`来替代 `==`

```javascript
let maybeNull = null
// The following is equivalent to maybeNull == null or maybeNull == undefined:
console.log(maybeNull === undefined || maybeNull === null) // true
// Compare to the following:
console.log(maybeNull == null) // true
console.log(maybeNull == undefined) // true
console.log(maybeNull === null) // true
console.log(maybeNull === undefined) // false

maybeNull = undefined
console.log(maybeNull === undefined || maybeNull === null) // true
console.log(maybeNull == null) // true
console.log(maybeNull == undefined) // true
console.log(maybeNull === null) // false
console.log(maybeNull === undefined) // true
```

这样写比 `==` 操作符更清晰, 但是每个读代码的人都会清楚的知道检查了 `null` and `undefined` 两个值.

## 在现实世界中检测 null 的例子

> "在实际使用过程中可能会出现这样的错误 [‘null is not an object’] , 这因为你在元素加载完成之前调用这个 dom 元素导致的, 因为 DOM API
> 在对象是空的情况下会返回 `null`" -- —[ Rollbar](https://rollbar.com/blog/top-10-javascript-errors/) on the Top 10 JavaScript errors

如果是在加载 scirpt 之前尚未创建 dom 元素,
则会发生  [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) (“`null` is not an object”) , 因为脚本的位置先于
html 元素出现, 而页面的解释则是从上到下的.

解决这个问题的办法是使用 event listener 来在页面加载完毕之后通知我们, 然后再运行脚本.

综上所述, 在尝试访问元素之前来检查 dom 元素是否为空是一个非常明智的做法.

## 使用 typeof 和 [假] 值检测

> "庆幸的是，由于它不是真正的对象，它是唯一一个 [假]值的'对象'，空的对象都是 [真]
> 值" -- — [Casey Morris](https://medium.com/u/c194ff39a976?source=post_page-----dffab64d8ed5----------------------)
> in [Daily JS](https://medium.com/dailyjs/rant-js-undefined-vs-null-7f90f203063b)

另一个方法来检测 `null` 基于 `null`是 [假] 值, 但是空对象是 [真] 值, 所以 `null`是唯一一个 [假] 值的对象.

这可以很方便的使用 `!` (非运算符) 来进行检查

```javascript
// The value null is the only falsy value with the typeof "object":
console.log(typeof null === "object" && !null) // true
console.log(typeof {} === "object" && !{}) // false

// This can be used to create a simple isNull() function:
const isNull = (value) => typeof value === "object" && !value
console.log(isNull(null)) // true

// To also check for an undeclared value, which will have typeof undefined, tweak the comparison slightly:
console.log(typeof maybeUndeclared === "undefined" || (typeof maybeUndeclared === "object" && !maybeUndeclared))
const isNullOrUndeclared = (value) => typeof value === "undefined" || (typeof value === "object" && !value)
)
const isNullOrUndeclared
(undeclaredVariable) // true

// Otherwise, referencing an undeclared variable will throw a ReferenceError:
try {
    undeclaredVariable == null
} catch (e) {
    console.log(e)
} // ReferenceError: undeclaredVariable is not defined
```

使用 `typeof`是一个很有帮助的技巧, 因为一个变量未声明, 在引用的时候会抛出一个 `ReferenceError`

但是 `typeof` 一个未声明的变量结果是 `undefined`, 所以使用 `typeof` 是一个很好检测 `null`, `undefined`, 和未声明变量的方法.

```javascript
// This will safely check a value to make sure it has been declared and assigned a value other than null or undefined:
console.log(typeof undeclaredVariable !== "undefined" &&
    (typeof undeclaredVariable !== "object" || !undeclaredVariable)) // false

// Compare to checking for null using ==, which will only work for declared variables:
try {
    undeclaredVariable == null
} catch (e) {
    console.log(e)
} // ReferenceError: undeclaredVariable is not defined
try {
    undeclaredVariable === null
} catch (e) {
    console.log(e)
} // ReferenceError: undeclaredVariable is not defined
try {
    undeclaredVariable === undefined
} catch (e) {
    console.log(e)
} // ReferenceError: undeclaredVariable is not defined

let declaredButUndefinedVariable
// Values that have been declared but not assigned a value will have the value undefined, which has a typeof undefined:
console.log(typeof declaredButUndefinedVariable !== "undefined" &&
    (typeof declaredButUndefinedVariable !== "object" || !declaredButUndefinedVariable)) // false

let stringVariable = "Here's Johnny!"
// If the variable has been both declared and assigned a value that is neither null or undefined, we will get true:
console.log(typeof stringVariable !== "undefined" &&
    (typeof stringVariable !== "object" || !stringVariable)) // true

// This can be used to create a function that will return false for undefined, undeclared, and null values:
const isNotNullNorUndefined = (value) => typeof value !== "undefined" && (typeof value !== "object" || !value)
console.log(isNotNullNorUndefined(stringVariable)) // true
```

## 使用 `Object.is()`

ES6 函数 [Object.is()](https://medium.com/coding-at-dawn/es6-object-is-vs-in-javascript-7ce873064719) 不同于 全等于 `===`  和 松散相等 `==`的地方是检查 `NaN`
和 `-0`

对于 `null` 来讲,  `Object.is()` 和  `===` 结果一致

```javascript
let maybeNull = null
// The following is equivalent to maybeNull == null or maybeNull == undefined:
console.log(Object.is(maybeNull, undefined) || Object.is(maybeNull, null)) // true
// Compare to the following:
console.log(maybeNull == null) // true
console.log(maybeNull == undefined) // true
console.log(maybeNull === null) // true
console.log(Object.is(maybeNull, null)) // true
console.log(maybeNull === undefined) // false
console.log(Object.is(maybeNull, undefined)) // false

maybeNull = undefined
console.log(maybeNull === undefined || maybeNull === null) // true
console.log(maybeNull == null) // true
console.log(maybeNull == undefined) // true
console.log(maybeNull === null) // false
console.log(Object.is(maybeNull, null)) // false
console.log(maybeNull === undefined) // true
console.log(Object.is(maybeNull, undefined)) // true
```

这意味着在使用 `Object.is()` 的时候需要严格检查 `null` 和 `undefined`, `Object.is()` 值在 React 中检查 state 变化的帮助方法.

## 总结

`null` 值检测是每一个 JavaScript 开发者在某个时候不许执行的常见任务

`typeof null === 'object'`意味着需要做更多的工作才能才能拿达到预期结果.

`null === null` 可以严格检查 null 值, `null == undefined`可以松散的检测null 或 undefined

`null` 是一个 [假] 值, 但是 空对象是一个 [真] 值, 所以 `typeof maybeNull === "object" && !maybeNull` 是一个比较简单的验证方式

最后, 如果检测一个值是不是已经声明了并且赋值, 但是

最后，要检查是否已声明值并分配了一个既不是 `null` 或 `undefined` 的值，请使用  `typeof`

```javascript
typeof maybeUndeclared !== "undefined" && (typeof maybeUndeclared !== "object" || !maybeUndeclared)
```

下面可以放心的检查 `null` 了

