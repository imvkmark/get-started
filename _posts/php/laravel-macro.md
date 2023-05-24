---
title: "Laravel macro 示例"
date: 2022-04-20 19:01:05
toc: true
categories:
- ["Php","Laravel","Tips 记录"]
---

在运行时候动态添加函数



```
use Illuminate\Support\Collection;
Collection::macro('someMethod', function ($arg1 = 1, $arg2 = 1) {
    return $this->count() + $arg1 + $arg2;
});
$coll = new Collection([1, 2, 3]);
echo $coll->someMethod(1, 2);
// 6      = 3 + (1 + 2)
echo $coll->someMethod();
// 5      = 3 + (1 + 1)
```

