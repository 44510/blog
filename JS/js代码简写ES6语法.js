js代码简写.js

1.三元操作符

当想写if...else语句时，使用三元操作符来代替。
const x = 20;
let answer;
if (x > 10) {
    answer = 'is greater';
} else {
    answer = 'is lesser';
}
简写：
const answer = x > 10 ? 'is greater' : 'is lesser';
也可以嵌套if语句：
const big = x > 10 ? " greater 10" : x
/**
 * 但是多行的时候还是需要使用if...else，并且三元嵌套给人容易让人迷惑，压缩文件会自动转换的。
 * 只有一种情况的时候，可以使用短路操作 && 
 */
2.短路求值简写方式
当给一个变量分配另一个值时，想确定源始值不是null，undefined或空值。可以写撰写一个多重条件的if语句。
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}
或者可以使用短路求值方法：
const variable2 = variable1  || 'new';
/**
 * 短路操作求值,
 * 如果前面存在就取后边的值
 */
3.声明变量简写方法
let x;
let y;
let z = 3;
简写方法：
let x, y, z=3;
/**
 * 调试的时候不方便，代码压缩会自动转换
 */
4.if存在条件简写方法
if (likeJavaScript === true)
简写：
if (likeJavaScript)
只有likeJavaScript是真值时，二者语句才相等
如果判断值不是真值，则可以这样：
let a;
if ( a !== true ) {
// do something...
}
简写：
let a;
if ( !a ) {
// do something...
}
/**
 * 自动类型转换，或者可以强制转换 !!
 */
5.JavaScript循环简写方法
for (let i = 0; i < allImgs.length; i++)
简写：
for (let index in allImgs)
/**
 * 不要使用for...in来遍历数组，会出问题的
 * 原型方法也可能会被遍历出来
 */
也可以使用Array.forEach：
function logArrayElements(element, index, array) {
  console.log("a[" + index + "] = " + element);
}
[2, 5, 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[2] = 9
/**
 * forEach没问题
 */
6.短路评价
给一个变量分配的值是通过判断其值是否为null或undefined，则可以：
let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}
简写：
const dbHost = process.env.DB_HOST || 'localhost';
/**
 * 跟上边一样啊
 */
7.十进制指数
当需要写数字带有很多零时（如10000000），可以采用指数（1e7）来代替这个数字：
for (let i = 0; i < 10000; i++) {}
简写：
for (let i = 0; i < 1e7; i++) {}

// 下面都是返回true
1e0 === 1;
1e1 === 10;
1e2 === 100;
1e3 === 1000;
1e4 === 10000;
1e5 === 100000;
8.对象属性简写
如果属性名与key名相同，则可以采用ES6的方法：
const obj = { x:x, y:y };
简写：
const obj = { x, y };
/**
 * ES6简写属性
 */
9.箭头函数简写
传统函数编写方法很容易让人理解和编写，但是当嵌套在另一个函数中，则这些优势就荡然无存。
function sayHello(name) {
  console.log('Hello', name);
}

setTimeout(function() {
  console.log('Loaded')
}, 2000);

list.forEach(function(item) {
  console.log(item);
});
简写：
sayHello = name => console.log('Hello', name);

setTimeout(() => console.log('Loaded'), 2000);

list.forEach(item => console.log(item));
10.隐式返回值简写
经常使用return语句来返回函数最终结果，一个单独语句的箭头函数能隐式返回其值（函数必须省略{}为了省略return关键字）
为返回多行语句（例如对象字面表达式），则需要使用()包围函数体。
function calcCircumference(diameter) {
  return Math.PI * diameter
}
var func = function func() {

  return { foo: 1 };
};
简写：
calcCircumference = diameter => (
  Math.PI * diameter;
)

var func = () => ({ foo: 1 });
11.默认参数值
为了给函数中参数传递默认值，通常使用if语句来编写，但是使用ES6定义默认值，则会很简洁：
function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}
简写：
volume = (l, w = 3, h = 4 ) => (l * w * h);

volume(2) //output: 24
/**
 * 似乎很有用啊，不用再在函数内初始化参数
 */
12.模板字符串
传统的JavaScript语言，输出模板通常是这样写的。
const welcome = 'You have logged in as ' + first + ' ' + last + '.'

const db = 'http://' + host + ':' + port + '/' + database;
ES6可以使用反引号和${}简写：
const welcome = `You have logged in as ${first} ${last}`;

const db = `http://${host}:${port}/${database}`;
/**
 * 下次试一下，最终还是被编译为字符串拼接
 */

13.解构赋值简写方法
在web框架中，经常需要从组件和API之间来回传递数组或对象字面形式的数据，然后需要解构它
const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');

const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;

简写：
import { observable, action, runInAction } from 'mobx';
/**
 * 之后变量直接可用
 */
const { store, form, loading, errors, entity } = this.props;
也可以分配变量名：
const { store, form, loading, errors, entity:contact } = this.props;
//最后一个变量名为contact
14.多行字符串简写
需要输出多行字符串，需要使用+来拼接：
const lorem = 'Lorem ipsum dolor sit amet, consectetur\n\t'
    + 'adipisicing elit, sed do eiusmod tempor incididunt\n\t'
    + 'ut labore et dolore magna aliqua. Ut enim ad minim\n\t'
    + 'veniam, quis nostrud exercitation ullamco laboris\n\t'
    + 'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t'
    + 'irure dolor in reprehenderit in voluptate velit esse.\n\t'
使用反引号，则可以达到简写作用：
const lorem = `Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse.`
/**
 * ajax拼接应该可以用
 */
15.扩展运算符简写
扩展运算符有几种用例让JavaScript代码更加有效使用，可以用来代替某个数组函数。
// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice()
简写：
// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
/**
 * 拼接字符串
 */
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];
不像concat()函数，可以使用扩展运算符来在一个数组中任意处插入另一个数组。
const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];
也可以使用扩展运算符解构：
const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a) // 1
console.log(b) // 2
console.log(z) // { c: 3, d: 4 }
/**
 * concat可以新生成一个数组，不改变原数组
 * 这里的原理一样 ， 不改变原数组，生成一个新的数组并返回
 */
16.强制参数简写
JavaScript中如果没有向函数参数传递值，则参数为undefined。为了增强参数赋值，可以使用if语句来抛出异常，或使用强制参数简写方法。
function foo(bar) {
  if(bar === undefined) {
    throw new Error('Missing parameter!');
  }
  return bar;
}
简写：
mandatory = () => {
  throw new Error('Missing parameter!');
}

foo = (bar = mandatory()) => {
  return bar;
}
17.Array.find简写
想从数组中查找某个值，则需要循环。在ES6中，find()函数能实现同样效果。
const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
]

function findDog(name) {
  for(let i = 0; i<pets.length; ++i) {
    if(pets[i].type === 'Dog' && pets[i].name === name) {
      return pets[i];
    }
  }
}
简写：
pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }
/**
 * find
 * function isBigEnough(element) {
 *     return element >= 15;
 * }
 * [12, 5, 8, 130, 44].find(isBigEnough); // 130
 */
18.Object[key]简写
考虑一个验证函数
function validate(values) {
  if(!values.first)
    return false;
  if(!values.last)
    return false;
  return true;
}

console.log(validate({first:'Bruce',last:'Wayne'})); // true
假设当需要不同域和规则来验证，能否编写一个通用函数在运行时确认？
// 对象验证规则
const schema = {
  first: {
    required:true
  },
  last: {
    required:true
  }
}
/**
 * required：这里自定义的一个属性
 */
// 通用验证函数
const validate = (schema, values) => {
  for(field in schema) {
    if(schema[field].required) {
      if(!values[field]) {
        return false;
      }
    }
  }
  return true;
}


console.log(validate(schema, {first:'Bruce'})); // false
console.log(validate(schema, {first:'Bruce',last:'Wayne'})); // true
现在可以有适用于各种情况的验证函数，不需要为了每个而编写自定义验证函数了
19.双重非位运算简写
有一个有效用例用于双重非运算操作符。可以用来代替Math.floor()，其优势在于运行更快，可以阅读此文章了解更多位运算。
Math.floor(4.9) === 4  //true
简写
~~4.9 === 4  //true
/**
 * surprise
 */
20、交换变量
var a = 12, b = 45;
[a, b] = [b, a];
/**
 * 这里必须是var声明的变量， const已经声明不可改变；
 */