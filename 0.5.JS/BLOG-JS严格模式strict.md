---
title: BLOG-JS严格模式strict
date: 2016-12-12
tags:
  - JS
  - 严格模式
categories:
  - [JS, 严格模式]
---

[TOC]

## 严格模式

`"use strict"`

严格模式是可选择的一个**限制 JavaScript 的变体一种方式**。
严格模式不仅仅是一个子集：**它故意地具有与正常代码不同的语义**。
严格模式对正常的 JavaScript 语义做了一些更改。

- 首先，严格模式消除了一些 JavaScript 的**静默错误**，通过改变它们来抛出错误。
- 其次，严格的模式修复了 JavaScript 引擎难以执行优化的错误：有时候，严格模式代码可以比非严格模式的相同的**代码运行得更快**。
- 第三，严格模式禁用了在 ECMAScript 的未来版本中可能会定义的一些语法。

## 应用对象

1. **对整个文件使用严格模式**，头部添加声明，注意合并文件的时候会不会造成别的文件也开启了严格模式；
2. **对某个函数开启严格模式，{}内添加声明**。

```js
function usestrict(func) {
  'use strict';
  if (typeof func !== 'function') {
    return;
  }
  func();
}
function log() {
  var a = 100;
  console.log(a);
}
usestrict(log);
```

## 有哪些不同

**将问题直接转化为错误**（如语法错误或运行时错误）, 简化了如何为给定名称的特定变量计算，简化了 eval 以及 arguments,
将写"安全“JavaScript 的步骤变得更简单，以及改变了预测未来 ECMAScript 行为的方式。

- 首先，严格模式下无法再意外创建全局变量，直接抛出错误，停止运行。函数内未声明直接赋值的变量；
- 严格模式会使引起静默失败(silently fail,注:不报错也没有任何效果)的赋值操抛出异常；
- 给只读属性赋值会报错，非严格模式下，不会报错，不会执行；

```js
'use strict';
// 给不可写属性赋值
var obj1 = {};
Object.defineProperty(obj1, 'x', { value: 42, writable: false });
obj1.x = 9; // 抛出TypeError错误
```

- 第三, 在严格模式下, 试图删除不可删除的属性时会抛出异常(之前这种操作不会产生任何效果)。

```js
'use strict';
delete Object.prototype; // 抛出TypeError错误
```

- 第五, 严格模式要求**函数的参数名唯一**。
- 第六, 严格模式禁止八进制数字语法。
- 不再支持 arguments.callee。
