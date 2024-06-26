---
title: 数组结构Array
date: 2017-4-5
tags:
  - JS
  - Array
categories:
  - [JS, Array]
  - [post, 数组结构Array]
---

[TOC]

## 是什么

1. JavaScript 的 Array 对象是用于构造数组的全局对象，**数组是类似于列表的高阶对象**。

2. 数组常用方法
   1. 是否会修改原数组；
   2. 返回值是什么；
      1. 原数组；
      2. 新数组；
      3. 元素值；
      4. 数组长度；
   3. 操作类型：
      1. 增删改查；
      2. 遍历；
      3. 排序。

## 会修改原数组的方法

### 增删改

1. `arr.push(element1, ..., elementN)`
   1. 尾部插入元素
   2. 当调用该方法时，**新的 length 属性值**将被返回。
2. `arr.pop()`
   1. 删除最后一个元素，并**返回该元素的值**
   2. 从数组中**删除的元素**(当数组为**空时返回 undefined**)。
3. `arr.unshift(element1, ..., elementN)`
   1. 要添加到数组开头的元素或**多个元素**。
   2. 当一个对象调用该方法时，返回**其 length 属性值**。
4. `arr.shift()`，从数组中移除索**引为 0**的元素; 如果数组为空则返回 undefined 。
5. `array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`

   1. splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。
   2. 此方法会改变原数组。
   3. 由被删除的元素**组成的一个数组**。

6. `arr.fill(value[, start[, end]])`
   1. 会修改原数组的 start 到 end 位置的元素；
   2. 返回修改后的数组；
7. `arr.copyWithin(target[, start[, end]])`
   1. 方法**浅复制数组的一部分到同一数组中的另一个位置，并返回它**，不会改变原数组的长度。
   2. 返回改变后的数组。

### 数组生成操作

1. `Array.from(arrayLike[, mapFn[, thisArg]])`

   1. 方法从一个**类似数组或可迭代对象创建一个新的，浅拷贝的数组实例**。
   2. 返回一个**新的数组实例**。

2. `Array.of(element0[, element1[, ...[, elementN]]])`
   1. 新的 Array 实例。

```js
console.log(Array.from({ length: 7 }));

console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// expected output: Array [2, 4, 6]

const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);
// [ "foo", "bar", "baz" ]

Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // [ , , , , , , ]
Array(1, 2, 3); // [1, 2, 3]
```

### 排序操作

1. `arr.reverse()`
   1. 方法将数组中元素的**位置颠倒，并返回该数组**，会修改原数组。
   2. 返回修改后的原数组。
2. `arr.sort([compareFunction])`
   1. 用原地算法对数组的元素进行排序。
   2. 排序后的数组。请注意，数组已原地排序，并且不进行复制。

```js
var arr = [1, 2, 3, 5, 6, 7, 8];

console.log('push: \n返回值: ', arr.push(4), '\n原数组：', arr);

console.log('pop: \n返回值: ', arr.pop(), '\n原数组：', arr);

console.log('unshift: \n返回值: ', arr.unshift(5), '\n原数组：', arr);

console.log('shift: \n返回值: ', arr.shift(), '\n原数组：', arr);

console.log('splice: \n返回值: ', arr.splice(1, 1, 9, 10), '\n原数组：', arr);

// 表示复制3-5，不包括5位置的元素到索引1位置开始的索引
console.log('copyWithin: \n返回值: ', arr.copyWithin(1, 3, 5), '\n原数组：', arr);

// 数组必须被初始化了
console.log('fill: \n返回值: ', arr.fill(0, 4, 6), '\n原数组：', arr);

console.log('reverse: \n返回值: ', arr.reverse(), '\n原数组：', arr);
console.log(
  'sort: \n返回值: ',
  arr.sort((a, b) => a - b),
  '\n原数组：',
  arr,
);
```

## 不会修改原数组的方法

### 数组遍历方法

1. `arr.map(function callback(currentValue[, index[, array]])`
   1. 方法创建一个新数组，其结果是该数组中的每个元素**都调用一次提供的函数后的返回值**。
   2. 回调函数的结果组成了新数组的每一个元素。
2. `arr.forEach(callback(currentValue [, index [, array]])[, thisArg])`
   1. 方法对数组的每个元素执行一次给定的函数。
   2. 无法中断。
   3. 返回 undefined。
3. `arr.every(callback[, thisArg])`
   1. 如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。
   2. 中断很容易，返回 false 就好了，方便迭代；
   3. 返回一个 boolean 值；
4. `arr.some(callback(element[, index[, array]])[, thisArg])`
   1. 数组中**有至少一个元素通过回调函数的测试就会返回 true**；所有元素都没有通过回调函数的测试返回值才会为 false。
   2. 方便迭代中断。
   3. 返回一个 boolean 值。
5. `arr.filter(callback(element[, index[, array]])[, thisArg])`
   1. filter() 方法创建一个**新数组**, 其包含通过所提供函数实现的测试的所有元素。
   2. 返回**一个新的、由通过测试的元素组成的数组**，如果没有任何数组元素通过测试，则返回空数组。
6. `arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])/arr.reduceRight`
   1. 返回函数**累计处理的结果**；
7. `arr.find(callback[, thisArg])/arr.findIndex(callback[, thisArg])`
   1. 返回：数组中**第一个满足所提供测试函数的元素的值/索引**，否则返回 undefined。
   2. 如果你需要找到一个元素的位置或者一个元素是否存在于数组中，使用 Array.**prototype.indexOf()** 或 Array.prototype.**includes()**。
8. `var newArray = arr.flat([depth]) / var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {`
   1. flat() 方法会按照一个**可指定的深度递归遍历数组**，
   2. 并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
9. `arr.indexOf(searchElement[, fromIndex])/arr.lastIndexOf(searchElement[, fromIndex])/lastIndexOf`
   1. 返回**首个被找到的元素在数组中的索引位置**;
   2. 若没有找到则返回 -1

```js
var arr = [1, 2, 3];
console.log(
  'find: \n返回值: ',
  arr.find((item) => item % 2),
  '\n原数组：',
  arr,
);

var arr2 = [[1], [2, [3]], 5];
console.log('flat: \n返回值: ', arr2.flat(1), arr2.flat(2), '\n原数组：', arr2);
```

### 返回数组的信息

1. `arr.entries()`
   1. 方法返回一个**新的 Array Iterator 对象**，该对象包含数组中每个索引的键/值对。
   2. 一个新的 Array 迭代器对象。**Array Iterator 是对象**，它的原型（**proto**:**Array Iterator**）上有一个 next 方法，可用用于遍历迭代器取得原数组的[key,value]。
2. `arr.keys()/arr.values()`
   1. 方法返回一个包含数组中**每个索引键/值的 Array Iterator 对象**。
   2. 返回一个新的 Array 迭代器对象。

```js
var arr = [1, 2, 3];

console.log('entries: \n返回值: ', arr.entries(), [...arr.entries()], '\n原数组：', arr);
console.log('keys: \n返回值: ', arr.keys(), [...arr.keys()], '\n原数组：', arr);
```

### 数组合并操作

1. `var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])`
   1. 将**数组**和/或**值**连接成新数组。

```js
var alpha = ['a', 'b', 'c'];
var numeric = [1, 2, 3];

console.log('concat: \n返回值: ', alpha.concat(numeric), '\n原数组：', alpha);
// result in ['a', 'b', 'c', 1, 2, 3]

// 这里数组只能一维展开
console.log(
  'concat: \n返回值: ',
  alpha.concat(1, 2, [3, [30]], [4, 5], numeric),
  '\n原数组：',
  alpha,
);
// ["a", "b", "c", 1, 2, 3, Array(1), 4, 5, 1, 2, 3]
```

### 判断方法

1. `Array.isArray()`
   1. 如果值是 Array，则为 true; 否则为 false。

## 一定注意reduce的用法

```js
const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
// 这里的前一个参数是accumulator，而不是accumulator.x，因为是保留的是上次的结果
const sum = objects.reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  0,
);

console.log(sum); // 6

//  ！如下的方式是错误的，谨记，大概率会得到一个非数
const objects2 = [{ x: 1 }, { x: 2 }, { x: 3 }];
const sum = objects2.reduce(
  (accumulator, currentValue) => accumulator.x + currentValue.x,
   {x: 0},
);

console.log(sum); // 6
```

**这里有个明显的特征，初始值的结果与最终的目标的结果格式是一样的**，比如初始为为一个数值，就会得到一个数值。如果初始化一个对象，就会得到一个对象。

```js
const goods = [{type: 'plate', No: 123}, {type: 'bowl', No: 321}]
 
const result = goods.reduce((prev, cur) => {
  !prev[cur.No] && (prev[cur.No] = cur)
  return prev
}, {})
 
console.log(result ) // {123: {type: "plate", No: 123}, 321: {type: "bowl", No: 321}}
```

```js
// 合并/操作一些属性，这里可以连续操作所有的item
const goods = [{type: 'plate', No: 123}, {type: 'bowl', No: 321}]
 
const result = goods.reduce((prev, cur) => {
  console.log(prev, cur);
  return {No: prev?.No + cur?.No}
}, {No: 0})
 
console.log(result.No);
```

## [为什么forEach要比for循环慢](https://juejin.cn/post/7018097650687803422)

1. for循环是js提出时就有的循环方法。forEach是ES5提出的，挂载在可迭代对象原型上的方法，例如Array Set Map。
2. forEach是一个迭代器，负责遍历可迭代对象。
   1. forEach 其实是一个迭代器，他与 for 循环本质上的区别是 forEach 是负责遍历（Array Set Map）可迭代对象的，而 for 循环是一种循环机制，只是能通过它遍历出数组。
3. **Symbol.iterator 都会提供一个迭代器，并根据迭代器返回的next方法来访问内部**，这也是 for...of 的实现原理。
   1. 所以for...of的性能与这些迭代器方法是接近的，是要低于for循环的；
4. forEach属于迭代器，只能按序依次遍历完成，**所以不支持上述的中断行为**。

### for循环和forEach的性能区别

1. 性能比较：for > forEach > map；
2. for循环没有额外的函数调用栈和上下文，所以它的实现最为简单。
3. forEach：对于forEach来说，它的函数签名中包含了参数和上下文，所以性能会低于 for 循环。
4. map 最慢的原因是因为 map 会返回一个新的数组，数组的创建和赋值会导致分配内存空间，因此会带来较大的性能开销。
   1. **它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考虑进来**，这里可能拖慢性能。
5. 数据结构上：**for循环是随机访问元素，foreach是顺序链表访问元素**。

```js
var l = [];
for (var i = 0; i < 100000000; i++) {
    l.push(i);
}

var a = Date.now();
for (var i = 0, len = l.length; i < len; i++) {
    (function f(item) {}());
}
var b = Date.now();
console.log('for: ', b - a);

var a = Date.now();
l.forEach(function (item) {});
var b = Date.now();
console.log('forEach: ', b - a);
```

### forEach的源码

[分析源码](https://zhuanlan.zhihu.com/p/385521894)。

FastArrayForEach 的核心逻辑是 for 循环，在 for 循环中对每一个元素，都调用 callbackfn，但是不要 callbackfn 的返回结果。最后整个函数 return Undefined。

**forEach() 遍历的范围在第一次调用 callback 前就会确定**。调用 forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach() 遍历到他们那一刻的值。已删除的项不会被遍历到。

```js
// 简易版 forEach
function forEach(callback, thisArg) {
  const array = this
  const len = array.length
  for (i = 0; i < len; i++) {
    callback.call(thisArg, array[i], i, array)
  }
  return undefined
}
```

## contact

[github 源文件地址](https://github.com/qiuwww/blog/blob/master/0.5.JS/BLOG-%E6%95%B0%E7%BB%84%E7%BB%93%E6%9E%84Array.md)
